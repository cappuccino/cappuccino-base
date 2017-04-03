const io = require("./io");

// N.B. The RawReadable taking process.stdin causes event listeners to be added
// to the event queue.  Hence the cleanup below.

exports.stdin  = new io.BufferedReadable(new io.RawReadable(process.stdin));  // nodejs process.stdin  is a readable stream
exports.stdout = new io.BufferedWritable(new io.RawWritable(process.stdout)); // nodejs process.stdout is a writable stream
exports.stderr = new io.BufferedWritable(new io.RawWritable(process.stderr)); // nodejs process.stderr is a writable stream

function removeStdinHandlers() {
    // Remove the Listeners that have been attached to the process.stdin.
    // exports.stdin is setup here as
    // = new io.BufferedReadable(new io.RawReadable(process.stdin))
    // And a RawReadable calls new SyncReadable(readable) so we have
    // effectively called SyncReadable(process.stdin).
    // And now node can't shutdown gracefully because stdin hasn't been closed
    // and there are event listeners hanging around.

    // Two ways allow for a graceful shutdown.

    exports.stdin.raw.syncReadable.removeListeners();
    process.stdin.pause();

    // The second works but is undocumented.  Remove any event listeners that
    // have been attached to the process stdin.  Namely the ones created by the
    // SyncReadable class.
    // process.stdin.unref();
}
system.requireCleanup(removeStdinHandlers);

exports.fs = require('./file');

// default logger
var Logger = require("logger").Logger;
exports.log = new Logger(exports.stderr);
