"use strict";

// Thanks to 'npm install jsdom', and some of 91 packages that are pulled in with it.
const DOMParser = global.system.nodejs.require('jsdom/lib/jsdom/living').DOMParser;
exports.DOMParser = DOMParser;

const jsdom = global.system.nodejs.require("jsdom").jsdom;
exports.Document = jsdom();

// node does not define a global document like webkit does.
if (typeof global.document === 'undefined') {
    // Copy of hack used for rhino.  Don't know what is really needed yet.  Should think
    // the jsdom module can give us what is needed.
    global.document = { createElement: function(x) { return { innerText: "", style: {}}}};
}

