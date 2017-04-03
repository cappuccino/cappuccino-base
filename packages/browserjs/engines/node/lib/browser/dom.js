"use strict";
// exports DOMParser and XMLSerializer
// usage:
//
//   new DOMParser().parseFromString(xmlsource,mimeType)
//
//   new XMLSerializer().serializeToString(node)

// Thanks to 'npm install xmldom'.
const xmldom = global.system.nodejs.require('xmldom');

exports.XMLSerializer = xmldom.XMLSerializer;

// The user should have called new on DOMParser().  Here we replace the
// instance with the one from the xmldom package, but with the options object
// passed to it so that warnings and errors are not printed to stderr during
// the jake build when non XML files are passed to it.  The jsc engine handles
// such errors silently too.  To see the warnings and errors, remove the
// errorHandler entry or don't pass anything to the DOMParser constructor.

exports.DOMParser = function DOMParser() {
    return new xmldom.DOMParser({
		/**
		 * locator is always needed for error position info
		 */
		locator: {},
		/**
		 * you can override the errorHandler for xml parser
		 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
		 */
		errorHandler: {
            warning: function(){},
            error:   function(){},
            //fatalError: function(){},
        }
	});
};

// Node does not define a global document like webkit does.  What is its purpose?

if (typeof global.document === 'undefined') {
    // Copy of hack used for rhino.  Don't know what is really needed yet.
    global.document = { createElement: function(x) { return { innerText: "", style: {}}}};
}
