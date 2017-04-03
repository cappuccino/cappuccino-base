"use strict";

// Use node's Buffer class.  This maps very well to the engine's binary requirement.

const nodejs           = global.system.nodejs;
const nodebuffer       = nodejs.require('buffer'); // access the node buffer module.

const bootstrap        = global.system.bootstrap; // access functions defined in the node bootstrap.js.
const assertIsEncoding = bootstrap.assertIsEncoding;

const assertIsBuffer = function(buf) {
    if (! Buffer.isBuffer(buf)) {
        throw Error("not a node buffer, typeof " + (typeof buf));
    }
}

const assertIsNumber = function(n) {
    if (typeof n != 'number') {
        throw Error("not a number, typeof " + (typeof n));
    }
}

exports.B_LENGTH = function(buffer) {
    assertIsBuffer(buffer);
    return buffer.length;
}

exports.B_ALLOC = function(length) {
    return Buffer.alloc(length);
}

exports.B_FILL = function(buffer, from, to, value) {
    assertIsBuffer(buffer);
    buffer.fill(value, from, to); // treating 'to' as non inclusive, jsc seems to do same.
}

exports.B_COPY = function(src, srcOffset, dst, dstOffset, length) {
    assertIsBuffer(src);
    assertIsBuffer(dst);
    assertIsNumber(srcOffset);
    assertIsNumber(dstOffset);
    assertIsNumber(length);

    if ((srcOffset + length) > src.length || (dstOffset + length) > dst.length)
        throw Error("B_COPY: tried to copy beyond bounds");

    src.copy(dst, dstOffset, srcOffset, srcOffset + length);
}

exports.B_GET = function(buffer, index) {
    assertIsBuffer(buffer);
    return buffer[index];
}

exports.B_SET = function(buffer, index, value) {
    assertIsBuffer(buffer);
    return buffer[index] = value;
}

exports.B_DECODE = function(buffer, offset, length, codec) {
    assertIsBuffer(buffer);
    assertIsNumber(offset);
    assertIsNumber(length);
	const encoding = assertIsEncoding(codec);
    return buffer.toString(encoding, offset, offset + length);
}

exports.B_DECODE_DEFAULT = function(buffer, offset, length) {
    assertIsBuffer(buffer);
    assertIsNumber(offset);
    assertIsNumber(length);
    return buffer.toString('utf8', offset, offset + length);
}

exports.B_ENCODE = function(string, codec) {
    return Buffer.from(string, assertIsEncoding(codec));
}

exports.B_ENCODE_DEFAULT = function(string) {
    return Buffer.from(string, 'utf8');
}

exports.B_TRANSCODE = function(buffer, offset, length, sourceCodec, targetCodec) {
    assertIsBuffer(buffer);
    assertIsNumber(offset);
    assertIsNumber(length);

    if (offset != 0 && length != buffer.length)
        buffer = Buffer.from(buffer, offset, length);

    const fromEnc = assertIsEncoding(sourceCodec);
    const toEnc = assertIsEncoding(targetCodec);

    return nodebuffer.transcode(buffer, fromEnc, toEnc);
}
