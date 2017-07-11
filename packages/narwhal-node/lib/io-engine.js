"use strict";

const nodejs        = global.system.nodejs;
const stream        = nodejs.require('stream'); // access the node stream module.
const sync          = nodejs.sync;

const bootstrap       = global.system.bootstrap; // access functions defined in the node bootstrap.js.
const isString        = bootstrap.isString;
const assertIsEncoding= bootstrap.assertIsEncoding;
const assertInstanceOf = bootstrap.assertInstanceOf;


const ByteString = require("binary").ByteString,
    binary_engine = require("binary-engine"),
    B_ALLOC = binary_engine.B_ALLOC,
    B_COPY = binary_engine.B_COPY;

var IO = exports.IO = function(inputStream, outputStream) {
    throw Error("who is creating an IO and why?");
};

// Keep internal to this module.  To RawReadable actually.
const BufCache = function() {
    this.buffers = [];
};

BufCache.prototype.isEmpty = function() {
    return (this.buffers.length === 0);
};
BufCache.prototype.remaining = function(buffer) {
    let l = 0;
    this.buffers.forEach(function(b) {
        l += b.length;
    });
    return l;
};

BufCache.prototype.pushBuffer = function(buffer) {
    // Add a Buffer to our internal cache.

    if (!Buffer.isBuffer(buffer))
        throw new Error(`pushBuffer bad type ${typeof buffer}`);

    this.buffers.push(buffer);
}

BufCache.prototype.next = function(n) {
    if (typeof n !== 'number' || n <= 0)
        throw new Error("BufCache.next(n) only takes positive numbers.  n is " + n);

    const len = this.remaining();

    if (len < n) {
        return null;
    }

    const buf = Buffer.concat(this.buffers);

    if (len === n) {
        this.buffers = [];
        return buf;
    }

    const remainder = buf.length - n;
    const b1 = Buffer.allocUnsafe(n);
    const b2 = Buffer.allocUnsafe(remainder);
    buf.copy(b1, 0, 0, n); // copy into b1 the first n
    buf.copy(b2, 0, n);    // copy into b2 from n onwards
    this.buffers = [b2];
    return b1;
}

/*
 * The BSE class (Bufferer String Extraction class).
 * Given an encoding, consume node Buffers, and return strings.
 *
 * new BSE(encoding) creates instance.
 * bse.pushBuffer(buffer) adds Buffer presumably received from a stream.
 * bse.popString(n)      returns next 'n' code points, or next string ending in 'n', or null.
 * bse.remaining()  returns number of code points  in string.
 * bse.isEmpty()    returns true if no buffer and no string remain.
 *
 * Properties:
 *  this.encoding
 *  this.buffer
 *  this.string
 *
 * Invariant: any node Buffers that have been pushed have been decoded into strings
 *    as much as possible.  Barring data corruption, the reason all the binary
 *    data would not decode to a string is that a multi-byte encoded character
 *    was split between buffers and the subsequent buffer has not yet been
 *    received.
 */

// Keep internal to this module.  To RawReadable actually.
const BSE = function(encoding) {
    this.encoding = encoding;
};

BSE.prototype.isEmpty = function() {
    return (!this.buffer) && (!this.string);
};
BSE.prototype.remaining = function(buffer) {
    return this.string ? this.string.length : 0;
};

BSE.prototype.pushBuffer = function(buffer) {
    // Add a Buffer to our internal buffering scheme.
    //
    // // not Use Buffer.toString(buffer, start, end) with various ends.
    // Use buf.toString(encoding)
    // Use Buffer.from(str, encoding) to create tmpbuf
    // Use tmpbuf.compare(target, targetStart, targetEnd) to see how much was right

    if (!Buffer.isBuffer(buffer))
        throw new Error(`push only accepting type Buffer, not type ${typeof buffer}`);

    this.buffer = this.buffer ? Buffer.concat([this.buffer, buffer]) : buffer;

    const tmpstr = this.buffer.toString(this.encoding);

    // tmpstr may have garbage at the end of it
    const tmpbuf = Buffer.from(tmpstr, this.encoding);

    let goodlen = Math.min(tmpbuf.length, this.buffer.length);

    // Here's the magic ...
    for (; goodlen > 0; goodlen--) {
        // Backup only as far as necessary to find matching bytes.

        if (tmpbuf[goodlen-1] === this.buffer[goodlen-1])
            break;
    }


    if (goodlen === 0) {
        throw new Error(`How does no part of tmpbuf match? lengths ${tmpbuf.length} and ${this.buffer.length}`);
        // Something happened earlier.  Either a previous chunk wasn't handled properly or some data was
        // corrupted leading to an incorrect number of bytes being decoded.  An algorithm could be written to
        // try sliding the decoding process forward from the beginning of the current buffer until most of the
        // code points would line up when encoded back.
    }

    if (goodlen === this.buffer.length) {
        // The str totally consumed the buffer.  Just save the string.
        this.string = this.string ? this.string.concat(tmpstr) : tmpstr;
        delete this.buffer;
    } else {
        // This is an important event.  (Aren't they all.)
        // Here is a case where node would have given us garbage.
        // It's hard to believe and I still hold out hope that
        // there is a cleaner solution that I just haven't grasped.
        //
        //console.log('cross boundary code point');

        const str = this.buffer.toString(this.encoding, 0, goodlen);

        this.string = this.string ? this.string.concat(str) : str;

        // Save the portion of the buffer that isn't in string.

        this.buffer = this.buffer.slice(goodlen);
    }
}

BSE.prototype.popString = function(n) {
    // returns a string of n characters, or ending in 'n', or null if not found.
    // usage: bse.popString(4) returns the next four characters, if the internal string is long enough.
    // usage: bse.popString('\n') returns a string, ending in a newline.
    // usage: bse.popString('\r\n') returns a string, ending in a carriage-return and newline.
    if (! this.string)
        return null;

    let cut = null;
    switch(typeof n) {
        case 'number':
            if (n <= this.string.length)
                cut = n;
            break;
        case 'string':
            const index = this.string.indexOf(n);
            if (index >= 0) {
                cut = n.length + index;
            }
            break;
        default:
            throw new Error(`n must be a number or a string, not ${typeof n}`);
    }
    if (! cut) {
        return null;
    }

    if (cut == this.string.length) {
        const r = this.string;
        delete this.string;
        return r;
    }
    const r = this.string.slice(0, cut);
    this.string = this.string.slice(cut);
    return r;
}



const _write = function (writable, buf, encoding) {
    // A synchronous write.
    let str
    if (isString(buf) || Buffer.isBuffer(buf)) {
        // the RawReadable.copy() passes a Buffer directly to the RawWritable.
        str = buf;
    } else if (typeof buf === 'object') {
        if (buf._bytes) { // test for buf being ByteString.
            str = buf._bytes;
        } else {
            throw new Error("buf is an unrecognized object");
        }
    } else {
        // coerce to a string
        str = "" + buf;
    }
    sync.await( writable.write(str, encoding, sync.defer()) );
}

const _readAllBuffers = function(readable) {
    const fn = function(readable, oncecb) {
        // create a callback that calls oncecb once, and afterwards is a noop.
        // The sync.defer() callback may only be called once.  There are several
        // readable events we are interested in, and not knowing which will fire,
        // and knowing that if things go well, 'end' fires and later 'close' fires,
        // means we have several points where the sync.defer() callback is needed.
        let cb = function(a, b) {
            cb = function() {}; // make it noop
            oncecb(a, b);
        };
        const chunks = [];
        let totlen = 0;
        readable.on('data', (chunk) => {
            // log(`event data chunk length ${chunk.length}`); // were 8192 bytes in my test
            chunks.push(chunk);
            totlen += chunk.length;
        });
        readable.on('end', () => {
            // log(`event end, ${chunks.length} chunks, ${totlen} bytes total`);
            let buffer = Buffer.allocUnsafe(totlen);
            let next = 0;
            chunks.forEach( (chunk) => {
                chunk.copy(buffer, next);
                next += chunk.length;
            });
            cb(null, buffer);
        });
        readable.on('error', (e) => {
            // log('event error');
            cb(e, null);
        });
        readable.on('close', () => {
            // log('event close');
            cb(null, 'close');
        });
    };
    return sync.await( fn(readable, sync.defer()) );
};

const _getNextBuffer = function(readable) {
    const fifo = [];   // use fifo.push() and fifo.shift()

    if (fifo.length > 0) {
        return fifo.shift();
    }

    const fn = function(oncecb) {
        // create a callback that calls oncecb once, and afterwards is a noop.
        // The sync.defer() callback may only be called once.  There are several
        // readable events we are interested in, and not knowing which will fire,
        // and knowing that if things go well, 'end' fires and later 'close' fires,
        // means we have several points where the sync.defer() callback is needed.
        let cb = function(a, b) {
            cb = function() {}; // make it callback.
            //readable.removeListener('data',  datacb);
            //readable.removeListener('end',   endcb);

            //readable.removeListener('error', errorcb);
            //readable.removeListener('close', closecb);
            oncecb(a, b);
        };
        const datacb = function(chunk) {
            console.error(`data event sees chunk.length ${chunk.length} str.length ${chunk.toString('utf-8').length}`);
            fifo.push(chunk);
            cb(null);
        };
        const endcb = function() {
            fifo.push(null);
            cb(null);
        };
        /*
        const errorcb = function(e) {
            cb(e, null);
        };
        const closecb = function() {
            cb(null, null);
        };
        */
        readable.on('data',  datacb);
        readable.on('end',   endcb);
        //readable.on('error', errorcb);
        //readable.on('close', closecb);
    };
    return sync.await( fn(sync.defer()) );
};

const SyncReadable = function(readable) {
    // Supports syncReadable = new SyncReadable(readable)
    // buffer = syncReadable.nextBuffer()

    const self = this; // The callbacks that we register have to refer to this object, so 'self'.

    self._fifo = [];   // use fifo.push() and fifo.shift().

    self._defer = null;

    const cb = function(chunk) {
        //console.error('one of the syncReadable callbacks invoked');
        if (self._fifo) {
            self._fifo.push(chunk);  // push the data onto the fifo, regardless of whether we have a defer cb or not.
        }
        if (self._defer) {
            const cb = self._defer;
            self._defer = null;
            cb(); // no data to pass back via the defer.  The data has already been pushed onto the fifo.
        }
    }
    readable.on('data',  cb);
    readable.on('end',   cb); // the chunk argument is undefined in this case.
    //readable.on('error', cb); // careful, this will push an exception onto the fifo.
    //readable.on('close', cb); // the chunk argument is undefined in this case.

    self.removeListeners = function() {
        // Doesn't seem we need to remove the listeners,
        // except for the ones put on process.stdin.
        // This self.removeListeners() is expressly proved
        // so the bootstrap routine can remove the listeners
        // after it is all done, so node don't hang around,
        // waiting for stdin to be closed.
        readable.removeListener('data', cb);
        readable.removeListener('end', cb);
    }

    const popfifo = function() {
        const chunk = self._fifo.shift();
        if (chunk)
            return chunk;

        // Take this to mean the end was reached.

        delete self._fifo; // Signal to any future calls to callbacks or nextBuffer() that we're closed.

        return null;
    }
    self.nextBuffer = function() {
        if (! self._fifo) {
            return null;  // we've shut ourselves down already.  No more reads going to happen.
        }

        if (self._fifo.length > 0) {
            return popfifo();
        }

        const ignore = sync.await( function(defercb) {
            self._defer = defercb;
            // Now we wait for one of the event handlers added above to kick in and invoke the defer callback.
        }(sync.defer()) );

        // The callbacks all add something to the fifo, even the 'end' event handler adds an undefined to the array.
        return popfifo();
    };
};


const _awaitReadable = function(readable) {
    const fn = function(readable, oncecb) {
        // create a callback that calls oncecb once, and afterwards is a noop.
        // The sync.defer() callback may only be called once.  There are several
        // readable events we are interested in, and not knowing which will fire,
        // and knowing that if things go well, 'end' fires and later 'close' fires,
        // means we have several points where the sync.defer() callback is needed.
        let cb = function(a, b) {
            readable.removeListener('readable',  cb);
            oncecb(a, b);
        };
        readable.addListener('readable', cb);
    };
    return sync.await( fn(readable, sync.defer()) );
};

var RawWritable = exports.RawWritable = function (writable) {
    assertInstanceOf(writable, stream.Writable, 'writable', 'stream.Writable');
    this._writable = writable;
}

RawWritable.prototype.write = function(buf, encoding) { // null encoding for raw.write(buf).
    _write(this._writable, buf, encoding)
    return this;
}
RawWritable.prototype.flush = function() {
    // no cork, so no uncork.
    return this;
}
RawWritable.prototype.close = function() {
    this._writable.end(); // multiple end calls are allowed
}

var RawReadable = exports.RawReadable = function (readable, charset) {
    assertInstanceOf(readable, stream.Readable, 'readable', 'stream.Readable');
    this._readable = readable;

    // In case the user calls raw.read(n) to read just n string characters,
    // record the charset.
    if (charset)
        this._charset = charset;

    this.encoding = assertIsEncoding(charset) || 'utf-8';

    this.syncReadable = new SyncReadable(readable);
}
RawReadable.prototype._readline = function(delimiter) {
    // The version called from BufferedReadable.
    return this._bsePopString(delimiter);
}
RawReadable.prototype._enterBseMode = function() {
    if (this._bufcache)
        throw new Error('Cannot enter string mode after having entered binary mode');
    let bse = this._bse;
    if (bse)
        return bse;

    bse = new BSE(this.encoding);
    this._bse = bse;
    return bse;
}
RawReadable.prototype._enterBufCacheMode = function() {
    if (this._bse)
        throw new Error('Cannot enter binary mode after having entered string mode');

    let bufcache = this._bufcache;
    if (bufcache)
        return bufcache;

    bufcache = new BufCache();
    this._bufcache = bufcache;
    return bufcache;
}

RawReadable.prototype._binPopBytes = function(n) {
    const bufcache = this._enterBufCacheMode();
    const readable = this._readable;
    let buf;
    while ((buf = bufcache.next(n)) === null) {

        const buf = this.syncReadable.nextBuffer();

        if (buf === null) {
            // stream is closed without getting what we were looking for.
            const rem = bufcache.remaining();
            if (rem === 0)
                return null;
            return bufcache.next(rem); // return what we have.
        }

        if (!Buffer.isBuffer(buf)) {
            throw new Error('expecting a Buffer');
        }
        bufcache.pushBuffer(buf);
    }

    return buf;
}

RawReadable.prototype._bsePopString = function(n) {
    if (typeof n === 'number' && n <= 0)
        throw new Error('Invalid number to read: ' + n);

    const bse = this._enterBseMode();
    const readable = this._readable;
    let s;
    while ((s = bse.popString(n)) === null) {

        // Wait for a 'readable' event to signal more data or no more data coming.
        /* This worked except for the utf-16le an error event about stream.push() after EOF was received.
            _awaitReadable(readable);
            const buf = readable.read();
            console.warn(`readable.read() typeof ${typeof buf} length ${buf.length}`);
            */
        //const buf = _getNextBuffer(readable);
        const buf = this.syncReadable.nextBuffer();

        if (buf === null) {
            // stream is closed without getting what we were looking for.
            return bse.popString(bse.remaining()); // return what we have.
        }

        if (!Buffer.isBuffer(buf)) {
            throw new Error('expecting a Buffer');
        }
        bse.pushBuffer(buf);
    }

    return s;
}
RawReadable.prototype.read = function(n) {

    const readable = this._readable;

    // get and set the read counter.
    //const readCount = this._readCount || 0;
    //this._readCount = readCount + 1;

    switch (typeof n) {
        case 'number':
            {
                const buf = this._binPopBytes(n);
                if (buf === null) {
                    return new ByteString(); // jsc returns this
                }
                return new ByteString(buf, 0, buf.length); // return a ByteString for raw.read(4), as StaticResource/Shrink requires
            }
        case 'string':
            {
                const result = this._bsePopString(n);
                if (result === null) {
                    return new ByteString(); // jsc returns this
                }
                return result;  // This is a string, that okay?  A string terminator was asked for.
            }
        case 'null':
        case 'undefined':
            break;
        default:
            throw new Error(`what is n in raw.read(n)?  ${typeof n}, expecting undefined or a number`);
    }

    // Enter the read as encoded string mode.
    const bse = this._enterBseMode();

    if (bse.remaining() == 0) {
        // load the next Buffer.
        const buf = this.syncReadable.nextBuffer();

        if (buf === null) {
            // We receive a null indicating the stream has ended.
            return new ByteString();
        }

        if (!Buffer.isBuffer(buf)) {
            throw new Error('expecting a Buffer');
        }
        bse.pushBuffer(buf);
    }

    const str = bse.popString(bse.remaining());  // Take everything that could be decoded to a string.
    const buf = Buffer.from(str, this.encoding); // Convert this back to Buffer, the lingua franca of our ByteString.


    return new ByteString(buf, 0, buf.length);
}
RawReadable.prototype.close = function() {
    // Node doesn't offer a close.
}
RawReadable.prototype.copy = function (output, mode, options) {
    assertInstanceOf(output, RawWritable, 'output', 'RawWritable');

    if (mode)
        throw new Error('RawReadable.prototype.copy what mode?'); // TBD
    if (options)
        throw new Error('RawReadable.prototype.copy what options?'); // TBD

    while (true) {
        const buf = this.syncReadable.nextBuffer();
        if (! buf) break;
        output.write(buf); // Pass a node Buffer directly to RawWritable.
    }
    output.flush();
    return this; // chain
};


// Takes process or child_process.stdout or stderr as raw input.
// Also takes a readable stream creating from opening a file.  As with the .png files for example.
var BufferedReadable = exports.BufferedReadable = function (rawReadable, lineBuffering, buffering, charset, options) {

    assertInstanceOf(this, BufferedReadable, 'this', 'BufferedReadable');

    assertInstanceOf(rawReadable, RawReadable, 'rawReadable', 'RawReadable');

    this.charset = charset; // TBD
    this.buffering = buffering; // TBD
    this.delimiter = '\n';  // TBD what about windows?

    this.raw = rawReadable;
};

BufferedReadable.prototype.readLine = function () {
    // The narwhal unittest case, iterator.js, indicates that the BufferedReadable.readLine() should
    // return a string with newline still at the end of it.  In the case of windows, I expect it
    // should end in \r\n.  We'll let the raw._readline handle the details.
    const s = this.raw._readline(this.delimiter); // returns a string
    return s ? s : "";
};

BufferedReadable.prototype.next = function () {
    var line = this.readLine().slice(0, -1);
    if (!line.length)
        throw StopIteration;
    return line;
};

BufferedReadable.prototype.iterator = function () {
    return this;
};

BufferedReadable.prototype.forEach = function (block, context) {
    var line;
    while (true) {
        try {
            line = this.next();
        } catch (exception) {
            break;
        }
        block.call(context, line);
    }
};

BufferedReadable.prototype.input = function () {
    throw "NYI input";
};

BufferedReadable.prototype.readLines = function () {
    var lines = [];
    do {
        var line = this.readLine();
        if (line.length)
            lines.push(line);
    } while (line.length);
    return lines;
};

BufferedReadable.prototype.readInto = function (buffer) {
    throw "NYI readInto";
};

BufferedReadable.prototype.copy = function (output, mode, options) {
    do {
        var line = this.readLine();
        output.write(line).flush();
    } while (line.length);
    return this;
};

BufferedReadable.prototype.read = function () {
    if (arguments.length > 0)
        throw new Error('BufferedReadable.prototype.read called with extra argument, is it the length to read?');
    // If there is a length to read, then we need to buffer the results here, and return 'n' bytes at a time.

    const bytestring = this.raw.read(); // returns a ByteString

    // Return an empty string when Readable has ended.

    return bytestring.decodeToString(this.charset); // have node encode from 'encoding' to js utf-16 string
};

BufferedReadable.prototype.close = function () {
    // Most likely gets the asynchronous end() called.
    // node child_process.stderr writable.end([chunk][, encoding][, callback])
    this.raw.close();
};

// Takes child_process.stdin as raw input.
var BufferedWritable = exports.BufferedWritable = function (rawWritable, lineBuffering, buffering, charset, options) {

    assertInstanceOf(this, BufferedWritable, 'this', 'BufferedWritable');

    assertInstanceOf(rawWritable, RawWritable, 'raw', 'RawWritable');

    // Three interesting arguments.
    // lineBuffering: both jsc and rhino ignore this
    // buffering    : jsc ignores but rhino puts its java stream into buffering mode unless undefined (not even unless not true).
    // options      : both jsc and rhino ignore this
    lineBuffering = null;
    buffering = null;
    options = null;

    this.charset = charset;
    this.encoding = assertIsEncoding(charset);
    this.delimiter = '\n';  // TBD what about windows?

    this.raw = rawWritable;
}

BufferedWritable.prototype.write = function (buf) {
    // This function and writeLine raise a new question or a new point: should I add buffering.
    this.raw.write(buf, this.encoding); // encoding only used if buf is in fact still a string

    return this;
};

BufferedWritable.prototype.writeLine = function (line) {
    // TBD is this an important function?  This coersion  back to a string from a ByteString may be done with an encoding.
    this.write(line + this.delimiter);
    return this;
};

BufferedWritable.prototype.writeLines = function (lines) {
    lines.forEach(this.writeLine, this);
    return this;
};

BufferedWritable.prototype.print = function () {
    this.write(Array.prototype.join.call(arguments, " ") + this.delimiter);
    this.flush();
    return this;
};

BufferedWritable.prototype.flush = function () {
    // node flushes all its writes unless uncork has been called first.
    // No calls to stream.cork() so no need to uncork().
    return this;
};

BufferedWritable.prototype.close = function () {
    this.raw.close();
    return this;
};

// ByteIO copied from jsc version.
var ByteIO = exports.ByteIO = function(binary) {
    this.buffer = []; // list of ByteString
    this.length = 0;

    if (binary) this.write(binary);
}

ByteIO.prototype.toByteString = function() {
    var result = this.read();

    // replace the buffer with the collapsed ByteString
    this.buffer = [result];
    this.length = result.length;

    return result;
}

ByteIO.prototype.decodeToString = function(charset) {
    return charset ?
        this.toByteString().decodeToString(charset) :
        this.toByteString().decodeToString();
}

ByteIO.prototype.read = function(length) {
    if (typeof length !== "number") length = this.length;

    if (length <= 0)
        return new ByteString();

    var bytes = B_ALLOC(length),
        position = 0;

    while (position < length && this.length > 0) {
        var segment = this.buffer[0];

        var len = Math.min(segment._length, length - position);

        B_COPY(segment._bytes, segment._offset, bytes, position, len);

        position += len;
        this.length -= len;

        if (len < segment._length) {
            this.buffer[0] = segment.slice(len);
        } else {
            this.buffer.shift();
        }
    }

    return new ByteString(bytes, 0, position);
}

ByteIO.prototype.write = function(object) {
    var segment = object.toByteString();

    this.buffer.push(segment);
    this.length += segment.length;

    return this;
}

ByteIO.prototype.flush = function() {
    return this;
}

ByteIO.prototype.close = function() {
}

exports.TextIOWrapper = function (raw, mode, lineBuffering, buffering, charset, options) {
    if (mode.update) {
        // TBD this is not implemented.  Is it necessary?  What does buffering to a read/write fd even mean?
        // Neither jsc or rhino implement this either.
        return new exports.TextIOStream(raw, lineBuffering, buffering, charset, options);
    } else if (mode.write || mode.append) {
        return new exports.BufferedWritable(raw, lineBuffering, buffering, charset, options);
    } else if (mode.read) {
        return new exports.BufferedReadable(raw, lineBuffering, buffering, charset, options);
    } else {
        throw new Error("file must be opened for read, write, or append mode.");
    }
};

