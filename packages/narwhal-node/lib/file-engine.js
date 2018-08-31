"use strict";

const file = require('./file');
const io   = require('./io');

// use the "file" module as the exports object, we're adding to it.
exports = file;

const ByteString = require("binary").ByteString;

const nodefs = global.system.nodejs.require('fs'); // access the node fs module.

const bootstrap = global.system.bootstrap; // access functions defined in the node bootstrap.js.
const throwIfAbnormal = bootstrap.throwIfAbnormal;
const stringify       = bootstrap.stringify;

exports.cwd = function () {
    return process.cwd();
}


exports.list = function (path) {
    path = String(path || '') || "."; // taken from file.js's list implementation.
    try {
        const result = nodefs.readdirSync(path, "utf8");
        // Rather than simply return the result array, sort them to ignore case
        // to match the jsc behavior.  This also sorts . before characters which
        // also matches jsc.
        return result.sort(function(a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return (a > b ? 1 : (a == b ? 0 : -1));
        });
    } catch (e) {
        throwIfAbnormal(e);
    }
    return [];
}

exports.mkdirs = function(path) {
    var components = file.Path(path).split();
    for (var i = 0; i < components.length; i++) {
        var dir = file.join.apply(null, components.slice(0, i+1));
        if (!file.isDirectory(dir))
            file.mkdir(dir);
    }
}

exports.touch = function (path, mtime) {
    const nomtime = (mtime === undefined || mtime === null);

    if (mtime === undefined || mtime === null)
        mtime = new Date();

    const fd = nodefs.openSync(path, "a"); // create if doesn't exist, don't overwrite if it does.
    nodefs.futimesSync(fd, mtime, mtime);  // jsc updates atime and mtime, so we do too.
    nodefs.closeSync(fd);
}

exports.rename = function(source, target) {
    source = file.path(source);
    target = source.resolve(target);

    if (typeof source !== 'string')
        source = source.toString();
    if (typeof target !== 'string')
        target = target.toString();

    // Don't unlink the target if the source can't even be found.
    if (! exports.exists(source))
        throw new Error(`rename failed: ${source} not found`);

    try {
        nodefs.unlinkSync(target);
    } catch (e) { ; }

    // see also exports.move()
    nodefs.renameSync(source, target); // throws an exception if source not found
}

exports.canonical = function (path) {
    // an implementation in terms of readlink, cwd, and the pure-js
    // methods provided by Narwhal's file-bootstrap, join, split,
    // and isDrive, which depends on system.os to distinguish
    // windows and unix drives

    var paths = [process.cwd(), path];
    var outs = [];
    var prev;
    for (var i = 0, ii = paths.length; i < ii; i++) {
        var path = paths[i];
        var ins = exports.split(path);
        if (exports.isDrive(ins[0]))
            outs = [ins.shift()];
        while (ins.length) {
            var leaf = ins.shift();
            var consider = exports.join.apply(
                undefined,
                outs.concat([leaf])
            );

            // cycle breaker; does not throw an error since every
            // invalid path must also have an intrinsic canonical
            // name.
            if (consider == prev) {
                ins.unshift.apply(ins, exports.split(link));
                break;
            }
            prev = consider;

            try {
                var link = exports.readlink(consider);
            } catch (exception) {
                link = null;
            }
            if (link != null) {
                ins.unshift.apply(ins, exports.split(link));
            } else {
                outs.push(leaf)
            }
        }
    }
    return exports.join.apply(undefined, outs);
}

exports.readlink = function (path) {
    try {
        return nodefs.readlinkSync(path);
    } catch (e) {
        throwIfAbnormal(e);
    }
    return null;
}

exports.exists = function (path) {
    try {
        return nodefs.existsSync(path);
    } catch (e) {
        throwIfAbnormal(e);
    }
    return null;
}

exports.mtime = function (path) {
    try {
        return nodefs.statSync(path).mtime; // node returns Date instance.
    } catch (e) {
        throwIfAbnormal(e);
    }
    return null;
}

exports.size = function (path) {
    return nodefs.statSync(path).size;
}

exports.stat = function (path) {
    return nodefs.statSync(path);
}

exports.isDirectory = function (path) {
    path = path.toString();
    if (path === "")
        return true; // seems by definition.  At least it's one of the test cases.

    try {
        return nodefs.statSync(path).isDirectory();
    } catch (e) {
        throwIfAbnormal(e);
    }
    return false;
}

exports.isFile = bootstrap.isFile;

exports.isLink = function (path) {
        try {
            const lstat = nodefs.lstatSync(path)
            return lstat && lstat.isSymbolicLink();
        } catch (e) {
            throwIfAbnormal(e);
        }
        return false;
}

exports.isReadable = function (path) {
    try {
        return nodefs.statSync(path) && nodefs.accessSync(path, nodefs.R_OK);
    } catch (e) {
        //throwIfAbnormal(e);
    }
    return false;
}

exports.isWritable = function (path) {
    return nodefs.statSync(path) && nodefs.accessSync(path, nodefs.W_OK);
}

exports.move = function (source, target) {
    // see also exports.rename();
    nodefs.renameSync(source, target); // throws an exception if source not found
}

exports.remove = function (path) {
    nodefs.unlinkSync(path);
}

exports.mkdir = function (path) {
    if (typeof path === 'object')
        path = path.toString();
    nodefs.mkdirSync(path);
}

exports.rmdir = function(path) {
    nodefs.rmdirSync(path);
}

exports.symlink = function(source, target) {
    source = source.toString();
    target = target.toString();
    nodefs.symlinkSync(source, target); // files only for now
}

exports.chmod = function(path, mode) {
    path = path.toString();
    nodefs.chmodSync(path, mode);
}

// TBD this read was defined with only a single path argument.
// But bootstrap version defines an optional options parameter.

exports.read = function(path, options) {
    const result = bootstrap.read(path, options); // from bootstrap.js
    if (typeof result === 'string') {
        return result; // Return as ungarnished string.
    }

    if (options === 'b') {
        // The textInputString.js test case requires a ByteString come back.  The options was the string 'b'.
        // At other times, the options is an object.
        const buffer = result;  // Must be a node Buffer
        return new ByteString(buffer, 0, buffer.length); // buffer should be a node Buffer
    } else {
        // jsc seems to return a string in this case, so we return a string.
        const str = result.toString();
        return str;
    }
}

exports.FileIO = function (path, mode, permissions) {
    // Return a RawWritable or RawReadable object, what narwhal calls a 'raw' object.
    // file.js does not call this with 'new' so its not used as a constructor.

    // TBD seems permissions not used yet.
    if (permissions)
        throw new Error("what do permissions look like? typeof " + (typeof permissions) + ", " + permissions);

    const mmode = exports.mode(mode);
    const read = mmode.read,
         write = mmode.write,
         append = mmode.append;
         //update = mmode.update;

    if (write || append) {
        const options = {
                flags: write ? 'w' : 'a',
            };

        const writable = nodefs.createWriteStream(path, options);

        return new io.RawWritable(writable);

    } else if (read) {

        // N.B.  This line does not fail for a non existent path.  The read will throw an exception later.
        const readable = nodefs.createReadStream(path); // Leave encoding null so this returns buffers.

        // Not sure if this error callback should do something more context aware.
        // For now, do nothing.
        readable.on('error', function(er) {
            // Unit tests try to open non existent files all the time.  jsc does not report when they fail.
            // no need to report error from callback, the next read or write will thrown an exception.
            // console.error(`createReadStream cb: ${String(er)}`);
        });

        return new io.RawReadable(readable);
    } else {
        // Update has not been implemented.  Didn't see the use case.  Node has the 'r+' flags value that might
        // be useful in this case if it is needed.
        throw new Error("Files must be opened either for read, write, or append mode.");
    }
}

