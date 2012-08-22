var OS = require("os");
var FILE = require("file");
var ByteString = require("binary").ByteString;

var packageDir = FILE.path(module.path).dirname().dirname().dirname();
exports.jarPath = packageDir.join("yuicompressor", "build", "yuicompressor-2.4.3.jar");

exports.compress = function(code, options) {
    options = options || {};
    options.charset = options.charset || "UTF-8";

    if (options.useServer)
        return compressUsingServer(code, options);
    else
        return compressSingle(code, options);
}

function compressSingle(code, options) {
    var cmd = [
        "java",
        "-jar", exports.jarPath,
        "--type", "js",
        "--charset", options.charset,
        "/dev/stdin"
    ];
    
    var p = OS.popen(cmd, { charset : options.charset });
    try {
        p.stdin.write(code).close();
        
        if (p.wait() !== 0)
            throw new Error("YUI Compressor error: " + p.stderr.read());
    
        return p.stdout.read();
    } finally {
        p.stdin.close();
        p.stdout.close();
        p.stderr.close();
    }
}

var servers = {};

function compressUsingServer(code, options) {
    if (!servers[options.charset]) {
        var cmd = [
            "java",
            "-server",
            "-jar", exports.jarPath,
            "--type", "js",
            "--charset", options.charset,
            "--server"
        ];
        servers[options.charset] = OS.popen(cmd, { charset : options.charset });
    }
    var server = servers[options.charset];

    var request = code.toByteString(options.charset);
    exports.sendLengthPrefixMessage(server.stdin.raw, request);

    var response = exports.receiveLengthPrefixMessage(server.stdout.raw);
    return response.decodeToString(options.charset);
}

// TODO: move these methods somewhere else?

exports.bytesToNumberLE = function(bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++)
        acc += bytes.get(i) << (8*i);
    return acc;
}

exports.bytesToNumberBE = function(bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++)
        acc = (acc << 8) + bytes.get(i);
    return acc;
}

exports.numberToBytesLE = function(number, length) {
    var bytes = [];
    for (var i = 0; i < length; i++)
        bytes[i] = (number >> (8*i)) & 0xFF;
    return new ByteString(bytes);
}

exports.numberToBytesBE = function(number, length) {
    var bytes = [];
    for (var i = 0; i < length; i++)
        bytes[length-i-1] = (number >> (8*i)) & 0xFF;
    return new ByteString(bytes);
}

exports.lengthPrefixServer = function(stream, callback, prefixLength) {
    var bytes;
    do {
        bytes = exports.receiveLengthPrefixMessage(stream, prefixLength);
        callback(bytes);
    } while (bytes);
}

exports.receiveLengthPrefixMessage = function(stream, prefixLength) {
    var prefixBytes = stream.read(prefixLength || 4);
    var length = exports.bytesToNumberBE(prefixBytes);
    var bytes = stream.read(length);
    return bytes;
}

exports.sendLengthPrefixMessage = function(stream, bytes, prefixLength) {
    var lengthBytes = exports.numberToBytesBE(bytes.length, prefixLength || 4);
    stream.write(lengthBytes).write(bytes).flush();
}
