"use strict";

exports = require("os-engine");

const io = require("io");
//const OS = require("os");

const nodejs        = global.system.nodejs;
const child_process = nodejs.require('child_process'); // access the node child_process module.
const spawn         = child_process.spawn;
const process       = nodejs.require('process'); // access the node process module.

const bootstrap       = global.system.bootstrap; // access functions defined in the node bootstrap.js.
const trace           = bootstrap.trace;
const msSleepSync     = bootstrap.msSleepSync;
const isString        = bootstrap.isString;
const stringify       = bootstrap.stringify;

const waitForSpawnResultCode = function(spawnResults, start, name) {
    let count = 0;
    msSleepSync(1); // Just give node a chance to process the event queue before we check the first time.
    while (! spawnResults.event) {
        count = count + 1;
        msSleepSync(5); // 2 results in 7% cpu core, 5 results in 4.5% cpu core
    }
    if (start) console.error(name+" wait()", "delta", ((new Date) - start), "loops", count, ", code " + spawnResults.code);
    const code = spawnResults.code;
    if (code === null) {
        if (name) print(`${name} wait() signale ${spawnResults.signal}`);
        return -1; // If code is null, signal is non null but should we interpret it?
    }
    if (name) print(`${name} wait() code ${code}`);
    return code;
};

exports.system = function (command) {

    const tr = trace.all || trace.os_engine || trace.os_engine_system;
    if (tr)
        print("system("+command+")\n");

    let cmd;
    let args;
    const spawnOptions = {stdio: 'inherit'};
    if (isString(command)) {
        // fsr TBD do something else on windows
        cmd = "/bin/sh";
        args = ["-c", command];
    } else if (Array.isArray(command)) {
        args = command.slice();
        cmd = args.shift();
        spawnOptions['shell'] = true; // TBD is this necessary and does it even help?
    } else {
        throw Error("'system' requires string or array of strings");
    }

    const start = tr ? new Date : null;
    if (tr)
        console.error(`system spawn(cmd='${cmd}', args=[${args}], options=${stringify(spawnOptions)})`);

    const child = spawn(cmd, args, spawnOptions);

    // fsr maybe look at this again in light of fibers and the sync await/defer model.
    const spawnResults = {}; // Used to communicate completion in asynchronous world.
	child.on('error', (code, signal) => {
        if (! spawnResults.event) {
            spawnResults.event = 'error';
            spawnResults.code = code;
            spawnResults.signal = signal;
        }
        if (tr) console.error('system child error', code, signal, "delta", ((new Date) - start));
	});

	child.on('exit', (code, signal) => {
        if (! spawnResults.event) {
            spawnResults.event = 'exit';
            spawnResults.code = code;
            spawnResults.signal = signal;
        }
        if (tr) console.error('system child exit', code, signal, "delta", ((new Date) - start));
	});

    return waitForSpawnResultCode(spawnResults, start, (tr ? 'system' : null));
};


exports.popen = function (command, options) {
    options = options || {};

    const tr = trace.all || trace.os_engine || trace.os_engine_popen;
    if (tr) console.error(`popen(${command})`);

    let cmd;
    let args;
    const spawnOptions = {stdio: 'pipe'};
    if (isString(command)) {
        // fsr TBD do something else on windows
        args = ["-c", command];
        cmd = "/bin/sh";
    } else if (Array.isArray(command)) {
        args = command.slice(); // modify a copy of input array
        cmd = args.shift();
        spawnOptions['shell'] = true;
        //throw new Error('fsr where is this form of popen?');
    } else {
        throw Error("'popen' requires string or array of strings");
    }

    const start = tr ? new Date : null;
    if (tr) console.error(`popen spawn(cmd='${cmd}', args=[${args}], options=${stringify(spawnOptions)})`);

    const child = spawn(cmd, args, spawnOptions);

    const spawnResults = {}; // Used to communicate completion in asynchronous world.
	child.on('error', (code, signal) => {
        if (! spawnResults.event) {
            spawnResults.event = 'error';
            spawnResults.code = code;
            spawnResults.signal = signal;
        }
        if (tr) console.error(`popen '${cmd}' child error`, code, signal, "delta", ((new Date) - start));
	});

	child.on('exit', (code, signal) => {
        if (! spawnResults.event) {
            spawnResults.event = 'exit';
            spawnResults.code = code;
            spawnResults.signal = signal;
        }
        if (tr) console.error(`popen '${cmd}' exit`, code, signal, "delta", ((new Date) - start));
	});
	child.stdin.on('error', (er) => {
        console.error(`popen '${cmd}' stdin error ${er}`);
	});
	child.stdin.on('close', (er) => {
        ; // console.error(`popen '${cmd}' stdin close`);
	});
	child.stdout.on('error', (er) => {
        console.error(`popen '${cmd}' stdout error ${er}`);
	});
	child.stderr.on('error', (er) => {
        console.error(`popen '${cmd}' stderr error ${er}`);
	});

    return {
        wait : function() {
            return waitForSpawnResultCode(spawnResults, start, (tr ? 'popen' : null));
        },
        // Node's child.stdin is a stream.Writable
        stdin : new io.BufferedWritable(new io.RawWritable(child.stdin),
            options.buffering, options.lineBuffering, options.charset),

        // Pass the RawReadable the options.charset, so it can recognize split code points.
        stdout : new io.BufferedReadable(new io.RawReadable(child.stdout, options.charset),
            options.buffering, options.lineBuffering, options.charset),

        // Node's child.stdout and stderr are stream.Readable
        stderr : new io.BufferedReadable(new io.RawReadable(child.stderr, options.charset),
            options.buffering, options.lineBuffering, options.charset),

        // jsc didn't define a communicate either.
        // communicate : function(stdin_opt, stdout_opt, stderr_opt) {},
    }
};

exports.exit = function(status) {
    if (trace.all || trace.os_engine || trace.os_engine_exit)
        print("exit("+(status<< 0)+")");

    process.exit(status << 0);
}
