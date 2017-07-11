var assert = require("test/assert");
var os = require("os");
var io = require("io");

var charsets = ["UTF-8", "UTF-16"];
var testString = "I ♥ JS";

exports.testRawStreams = function() {
    charsets.forEach(function(charset) {
        var p = os.popen(["cat"]);
        p.stdin.raw.write(testString.toByteString(charset)).flush().close();
        var result = p.stdout.raw.read().decodeToString(charset);
        assert.eq(testString, result);
    });
};

exports.testCharsetInputStream = function() {
    charsets.forEach(function(charset) {
        var p = os.popen(["cat"], { charset : charset });
        p.stdin.write(testString).flush().close();
        var result = p.stdout.raw.read().decodeToString(charset);
        assert.eq(testString, result);
        p.stdout.close();
        p.stderr.close();
    });
};

exports.testCharsetOutputStream = function() {
    charsets.forEach(function(charset) {
        var p = os.popen(["cat"], { charset : charset });
        p.stdin.raw.write(testString.toByteString(charset)).flush().close();
        var result = p.stdout.read();
        assert.eq(testString, result);
        p.stdout.close();
        p.stderr.close();
    });
};


if (require.main == module.id)
    os.exit(require("test/runner").run(exports));

