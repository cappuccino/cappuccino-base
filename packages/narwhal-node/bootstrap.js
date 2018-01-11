// The node bootstrap.js.  The first script that starts to make node work for narwhal.
// Unlike the other engines, node won't run a script.js file from its command line and
// put the results into its global space.  It loads it as a module. The difference is
// dealt with in this file.
//
// This file is also built to be run directly (manually) from the node command line:
//
// $ node ~/narwhal/packages/narwhal-node/bootstrap.js
//
// N.B.  We are in a node module environment.  So 'this' has no properties.
//
// Look for sync.fiber, sync.await and sync.defer functions.
"use strict";

const sync = require('synchronize'); // using node's require()

const isString = function(v) {
    const tov = typeof v;
    return (tov === 'string') || (tov === 'object' && (v instanceof String));
}

const assertInstanceOf = function (s, c, sname, cname) {
    if (! (s instanceof c)) {
        throw new Error(`${sname} is not an instance of ${cname}`);
    }
}

const stringify = function(o) {
    if (isString(o))
        return String(o);

    return JSON.stringify(o, null, 4);
}


const bootstrap = function() {

    const console = require("console"); // using node's require()
    const fs      = require("fs");      // using node's require()
    const path    = require("path");    // using node's require()

    const args = process.argv.slice(); // make copy
    args.shift();                      // drop the node name

    const nodeBootstrapVersion = "1.0"; // just for fun at the moment.

    const print = function() {
        // Allow print() to take multiple arguments

        console.log(Array.prototype.slice.call(arguments).join(" "));
    };

    const assertIsEncoding = function(codec) {
        if (! codec) {
            return null;
        }
        if (typeof codec != 'string') {
            throw Error("not a string, typeof " + (typeof n));
        }

        switch(codec) {
            case 'ascii':   // - for 7-bit ASCII data only. This encoding is fast and will strip the high bit if set.
            case 'utf8':    // - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
            case 'utf16le': // - 2 or 4 bytes, little-endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.
            case 'ucs2':    // - Alias of 'utf16le'.
            case 'base64':  // - Base64 encoding. When creating a Buffer from a string, this encoding will also correctly accept "URL and Filename Safe Alphabet" as specified in RFC4648, Section 5.
            case 'latin1':  // - A way of encoding the Buffer into a one-byte encoded string (as defined by the IANA in RFC1345, page 63, to be the Latin-1 supplement block and C0/C1 control codes).
            case 'binary':  // - Alias for 'latin1'.
            case 'hex':     // - Encode each byte as two hexadecimal characters.
                return codec;

            case 'UTF8':
            case 'UTF-8':
            case 'utf-8':
                return 'utf8';

            case 'UTF16':
            case 'UTF-16':
            case 'utf-16':
                return 'utf16le';

            case 'US-ASCII':
            case 'ASCII':
                return 'ascii';
        }
        throw Error("unsupported/unexpected codec: " + codec);
    };

    const msSleepSync = function(ms) {
        // Here the setTimeout is an asynchrous function, i.e. it takes a callback
        // argument.  This one happens not to be of the (err, cb) form.  It is (cb,
        // timeoutvalue), so we follow the sync.await and sync.defer usage pattern.
        sync.await(setTimeout(sync.defer(), ms));
    };

    const throwIfAbnormal = function(e) {
        // node exceptions that have an errno in them are considered normal
        // so do not get thrown recusively.  Anything else would see to a bug
        // that needs our attention.
        if (! e.hasOwnProperty('errno')) {
            throw e;
        }
    };

    const isFile = function (file) {
        try {
            const stat = fs.statSync(file)
            return stat && stat.isFile();
        } catch (e) {
            throwIfAbnormal(e);
        }
        return false;
    };

    const read = function (file, options) {
        // Read a file.  'options' is optional.

        if (options) {
            if (options.charset) {
                options = options.charset; // get the string
            }
            if (typeof options === 'string') {
                switch(options) {
                    case "b":
                        options = null;
                        break;
                    case "utf8":
                    case "UTF8":
                    case "utf-8":
                    case "UTF-8":
                        options = "utf8";
                        break;
                    case "utf16":
                    case "UTF16":
                    case "utf-16":
                    case "UTF-16":
                        options = "utf16";
                        break;
                    default:
                        throw Error("what kind of string options is passed to our read? " + options);
                }
            }
        }
        return fs.readFileSync(file, options);
    }

    const searchTree = function(dirpath, file) {
        // Search backwards along dirpath for file, if found, return completed file path.

        const parts = dirpath.split(path.sep);

        while (parts.length > 0) {
            parts.push(file);
            const filepath = parts.join(path.sep); // likely needs work for windows
            if (isFile(filepath)) {
                return filepath;
            }

            parts.pop(); // pop file that was pushed above
            parts.pop(); // pop next part of tree
        }
        return null;
    };

    // Can access this within the node REPL via '> system.nodejs' if the runShell code executes below.
    const nodejs = {
        require   : require, // in case user wants access to original node require function.
        console   : console,
        fs        : fs,
        process   : process,
        sync      : sync,
    };

    const sea             = process.env["SEA"];
    const debug           = process.env["NARWHAL_DEBUG"];
    const verbose         = process.env["NARWHAL_VERBOSE"];
    const narwhalFileName = "narwhal.js";
    const runShell        = args.length == 1;
    let   prefix          = process.env["NARWHAL_HOME"];
    let   enginePrefix    = process.env["NARWHAL_ENGINE_HOME"];
    let   narwhalFilePath;

    if (prefix) {
        narwhalFilePath = prefix + path.sep + narwhalFileName;
    } else {
        narwhalFilePath = searchTree(__dirname, narwhalFileName);

        const a = narwhalFilePath.split(path.sep)
        a.pop();
        prefix = a.join(path.sep);
    }

    if (!enginePrefix) {
        enginePrefix = __dirname; // The directory where this bootstrap.js file exists in the first place.
    }

    const evaluate = function (text, fileName, lineNumber) {
        const sourceURLTag = "\n//# sourceURL=" + fileName;
        return eval.call(global, "(function(require,exports,module,system,print){" + text + "/**/\n})"+sourceURLTag);
    };
    const cleanupList = [];
    const requireCleanup = function(cleanupfn) {
        const index = cleanupList.indexOf(cleanupfn);
        if (index === -1) {
            // Will run through the cleanup in reverse order so add to the front.
            cleanupList.unshift(cleanupfn);
        }
    };
    const performCleanup = function() {
        cleanupList.forEach(function(fn) {
            fn();
        });
    };

    const evalGlobal = function(a) {
        return eval.call(global, a);
    };

    const sourceURLTag = "\n//# sourceURL="+prefix+"/narwhal.js";
    const narwhal = evalGlobal(read(narwhalFilePath) + "/**/" + sourceURLTag);
    narwhal.displayName = "narwhal";

    // Sanity check, before handing control over to narwhal proper.
    if (this !== global)
        throw Error("this !== global");

    try {
        narwhal({
			// Properties put into system are available to the node REPL below too.
			system        : {
				global        : global,
				nodejs        : nodejs,
                requireCleanup: requireCleanup,
                bootstrap: {
                    isString        : isString,
                    assertInstanceOf: assertInstanceOf,
                    assertIsEncoding: assertIsEncoding,
                    stringify       : stringify,
                    print           : print,
                    isFile          : isFile,
                    read            : read,
                    throwIfAbnormal : throwIfAbnormal,
                    msSleepSync     : msSleepSync,
                    trace : {
                        //all: true,
                        //os_engine: true,
                        //os_engine_system: true,
                        //os_engine_popen: true,
                        //os_engine_exit: true,
                    },
                },
				evalGlobal    : evalGlobal,
				engine        : 'node',
				engines       : ['node', 'default'],
				prefix        : prefix,
				prefixes      : [enginePrefix, prefix],
				print         : print,
				evaluate      : evaluate,
				os            : process.platform,
				args          : args,
				env	          : process.env,
				debug         : debug,
				verbose       : verbose,
			},
            file: {
                read: read,
                isFile: isFile,
            }
        });

    } catch (e) {
        if (e && (e.line || e.sourceURL))
            print("Error on line " + (e.line || "[unknown]") + " of file " + (e.sourceURL || "[unknown]"));
        print("Throw caught by top level try in narwhal-node/bootstrap.js");
        print(e);
        throw e;
    }

    // First user: the ./lib/system.js,  to remove handlers placed on stdin.
    // Second user: the shrinksafe/lib/minify/shrinksafe.js, to close children's stdin.
    performCleanup();

    if (runShell) {
        print("Narwhal, Nodejs engine, bootstrap.js version", nodeBootstrapVersion);
        print("N.B. narwhal/node has two distinct implementations of require.");
        print("p=print;k=Object.keys;");
        print("p(require); k(require);                                 // inspect the node require");
        print("p(system.global.require); k.keys(system.global.require);// inspect the narwhal require");
        print("");
        print("To keep them straight: narwhalrequire=system.global.require; noderequire=require;");
        print("noderequire('jake') will fail.");
        print("narwhalrequire('jake') will succeed.");
        print("");
        print("Note this shell has tab completion.");
		const repl = require('repl');
		const r = repl.start('> '); // At the prompt, try '> system' and '> system.nodejs'.

	    // Here node's asynchronous nature shows.  The repl.start() is asynchronous.
	    // Code after this gets executed immediately.
        // print("continue");
    }

};

// Call the bootstrap function with global set to 'this'.
// Call the bootstrap function in its own fiber, so we can leverage the
// sync.await and sync.defer calls, to use node calls synchronously.

sync.fiber( function() {bootstrap.call(global);} );
