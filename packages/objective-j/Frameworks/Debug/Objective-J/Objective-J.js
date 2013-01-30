/*
 * Objective-J.js
 * Objective-J
 *
 * Created by Francisco Tolmasky.
 * Copyright 2008-2010, 280 North, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */




var ObjectiveJ = { };

(function (global, exports)
{
if (!this.JSON) {
    JSON = {};
}
(function () {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return this.getUTCFullYear() + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate()) + 'T' +
                 f(this.getUTCHours()) + ':' +
                 f(this.getUTCMinutes()) + ':' +
                 f(this.getUTCSeconds()) + 'Z';
        };
        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = new RegExp('[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
    var escapable = new RegExp('[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
    var gap,
        indent,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }
    function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
var formatRegex = new RegExp("([^%]+|%(?:\\d+\\$)?[\\+\\-\\ \\#0]*[0-9\\*]*(.[0-9\\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])", "g");
var tagRegex = new RegExp("(%)(?:(\\d+)\\$)?([\\+\\-\\ \\#0]*)([0-9\\*]*)((?:.[0-9\\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])");
exports.sprintf = function(format)
{
    var format = arguments[0],
        tokens = format.match(formatRegex),
        index = 0,
        result = "",
        arg = 1;
    for (var i = 0; i < tokens.length; i++)
    {
        var t = tokens[i];
        if (format.substring(index, index + t.length) != t)
        {
            return result;
        }
        index += t.length;
        if (t.charAt(0) !== "%")
            result += t;
        else if (t === "%%")
            result += "%";
        else
        {
            var subtokens = t.match(tagRegex);
            if (subtokens.length != 8 || subtokens[0] != t)
            {
                return result;
            }
            var percentSign = subtokens[1],
                argIndex = subtokens[2],
                flags = subtokens[3],
                widthString = subtokens[4],
                precisionString = subtokens[5],
                length = subtokens[6],
                specifier = subtokens[7];
            if (argIndex === undefined || argIndex === null || argIndex === "")
                argIndex = arg++;
            else
                argIndex = Number(argIndex);
            var width = null;
            if (widthString == "*")
                width = arguments[argIndex];
            else if (widthString != "")
                width = Number(widthString);
            var precision = null;
            if (precisionString == ".*")
                precision = arguments[argIndex];
            else if (precisionString != "")
                precision = Number(precisionString.substring(1));
            var leftJustify = (flags.indexOf("-") >= 0);
            var padZeros = (flags.indexOf("0") >= 0);
            var subresult = "";
            if (RegExp("[bBdiufeExXo]").test(specifier))
            {
                var num = Number(arguments[argIndex]);
                var sign = "";
                if (num < 0)
                {
                    sign = "-";
                }
                else
                {
                    if (flags.indexOf("+") >= 0)
                        sign = "+";
                    else if (flags.indexOf(" ") >= 0)
                        sign = " ";
                }
                if (specifier == "d" || specifier == "i" || specifier == "u")
                {
                    var number = String(Math.abs(Math.floor(num)));
                    subresult = justify(sign, "", number, "", width, leftJustify, padZeros)
                }
                if (specifier == "f")
                {
                    var number = String((precision != null) ? Math.abs(num).toFixed(precision) : Math.abs(num));
                    var suffix = (flags.indexOf("#") >= 0 && number.indexOf(".") < 0) ? "." : "";
                    subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                }
                if (specifier == "e" || specifier == "E")
                {
                    var number = String(Math.abs(num).toExponential(precision != null ? precision : 21));
                    var suffix = (flags.indexOf("#") >= 0 && number.indexOf(".") < 0) ? "." : "";
                    subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                }
                if (specifier == "x" || specifier == "X")
                {
                    var number = String(Math.abs(num).toString(16));
                    var prefix = (flags.indexOf("#") >= 0 && num != 0) ? "0x" : "";
                    subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                }
                if (specifier == "b" || specifier == "B")
                {
                    var number = String(Math.abs(num).toString(2));
                    var prefix = (flags.indexOf("#") >= 0 && num != 0) ? "0b" : "";
                    subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                }
                if (specifier == "o")
                {
                    var number = String(Math.abs(num).toString(8));
                    var prefix = (flags.indexOf("#") >= 0 && num != 0) ? "0" : "";
                    subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                }
                if (RegExp("[A-Z]").test(specifier))
                    subresult = subresult.toUpperCase();
                else
                    subresult = subresult.toLowerCase();
            }
            else
            {
                var subresult = "";
                if (specifier == "%")
                    subresult = "%";
                else if (specifier == "c")
                    subresult = String(arguments[argIndex]).charAt(0);
                else if (specifier == "s" || specifier == "@")
                    subresult = String(arguments[argIndex]);
                else if (specifier == "p" || specifier == "n")
                {
                    subresult = "";
                }
                subresult = justify("", "", subresult, "", width, leftJustify, false);
            }
            result += subresult;
        }
    }
    return result;
}
function justify(sign, prefix, string, suffix, width, leftJustify, padZeros)
{
    var length = (sign.length + prefix.length + string.length + suffix.length);
    if (leftJustify)
    {
        return sign + prefix + string + suffix + pad(width - length, " ");
    }
    else
    {
        if (padZeros)
            return sign + prefix + pad(width - length, "0") + string + suffix;
        else
            return pad(width - length, " ") + sign + prefix + string + suffix;
    }
}
function pad(n, ch)
{
    return Array(MAX(0,n)+1).join(ch);
}
CPLogDisable = false;
var CPLogDefaultTitle = "Cappuccino";
var CPLogLevels = ["fatal", "error", "warn", "info", "debug", "trace"];
var CPLogDefaultLevel = CPLogLevels[3];
var _CPLogLevelsInverted = {};
for (var i = 0; i < CPLogLevels.length; i++)
    _CPLogLevelsInverted[CPLogLevels[i]] = i;
var _CPLogRegistrations = {};
CPLogRegister = function(aProvider, aMaxLevel, aFormatter)
{
    CPLogRegisterRange(aProvider, CPLogLevels[0], aMaxLevel || CPLogLevels[CPLogLevels.length-1], aFormatter);
}
CPLogRegisterRange = function(aProvider, aMinLevel, aMaxLevel, aFormatter)
{
    var min = _CPLogLevelsInverted[aMinLevel];
    var max = _CPLogLevelsInverted[aMaxLevel];
    if (min !== undefined && max !== undefined && min <= max)
        for (var i = min; i <= max; i++)
            CPLogRegisterSingle(aProvider, CPLogLevels[i], aFormatter);
}
CPLogRegisterSingle = function(aProvider, aLevel, aFormatter)
{
    if (!_CPLogRegistrations[aLevel])
        _CPLogRegistrations[aLevel] = [];
    for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
        if (_CPLogRegistrations[aLevel][i][0] === aProvider)
        {
            _CPLogRegistrations[aLevel][i][1] = aFormatter;
            return;
        }
    _CPLogRegistrations[aLevel].push([aProvider, aFormatter]);
}
CPLogUnregister = function(aProvider) {
    for (var aLevel in _CPLogRegistrations)
        for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
            if (_CPLogRegistrations[aLevel][i][0] === aProvider)
                _CPLogRegistrations[aLevel].splice(i--, 1);
}
function _CPLogDispatch(parameters, aLevel, aTitle)
{
    if (aTitle == undefined)
        aTitle = CPLogDefaultTitle;
    if (aLevel == undefined)
        aLevel = CPLogDefaultLevel;
    var message = (typeof parameters[0] == "string" && parameters.length > 1) ? exports.sprintf.apply(null, parameters) : String(parameters[0]);
    if (_CPLogRegistrations[aLevel])
        for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
        {
            var logger = _CPLogRegistrations[aLevel][i];
            logger[0](message, aLevel, aTitle, logger[1]);
        }
}
CPLog = function() { _CPLogDispatch(arguments); }
for (var i = 0; i < CPLogLevels.length; i++)
    CPLog[CPLogLevels[i]] = (function(level) { return function() { _CPLogDispatch(arguments, level); }; })(CPLogLevels[i]);
var _CPFormatLogMessage = function(aString, aLevel, aTitle)
{
    var now = new Date(),
        titleAndLevel;
    if (aLevel === null)
        aLevel = "";
    else
    {
        aLevel = aLevel || "info";
        aLevel = "[" + CPLogColorize(aLevel, aLevel) + "]";
    }
    aTitle = aTitle || "";
    if (aTitle && aLevel)
        aTitle += " ";
    titleAndLevel = aTitle + aLevel;
    if (titleAndLevel)
        titleAndLevel += ": ";
    if (typeof exports.sprintf == "function")
        return exports.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s",
            now.getFullYear(), now.getMonth() + 1, now.getDate(),
            now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds(),
            titleAndLevel, aString);
    else
        return now + " " + titleAndLevel + ": " + aString;
}
CPLogConsole = function(aString, aLevel, aTitle, aFormatter)
{
    if (typeof console != "undefined")
    {
        var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle),
            logger = {
                "fatal": "error",
                "error": "error",
                "warn": "warn",
                "info": "info",
                "debug": "debug",
                "trace": "debug"
            }[aLevel];
        if (logger && console[logger])
            console[logger](message);
        else if (console.log)
            console.log(message);
    }
}
CPLogColorize = function(aString, aLevel)
{
    return aString;
}
CPLogAlert = function(aString, aLevel, aTitle, aFormatter)
{
    if (typeof alert != "undefined" && !CPLogDisable)
    {
        var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle);
        CPLogDisable = !confirm(message + "\n\n(Click cancel to stop log alerts)");
    }
}
var CPLogWindow = null;
CPLogPopup = function(aString, aLevel, aTitle, aFormatter)
{
    try {
        if (CPLogDisable || window.open == undefined)
            return;
        if (!CPLogWindow || !CPLogWindow.document)
        {
            CPLogWindow = window.open("", "_blank", "width=600,height=400,status=no,resizable=yes,scrollbars=yes");
            if (!CPLogWindow) {
                CPLogDisable = !confirm(aString + "\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
                return;
            }
            _CPLogInitPopup(CPLogWindow);
        }
        var logDiv = CPLogWindow.document.createElement("div");
        logDiv.setAttribute("class", aLevel || "fatal");
        var message = (aFormatter || _CPFormatLogMessage)(aString, aFormatter ? aLevel : null, aTitle);
        logDiv.appendChild(CPLogWindow.document.createTextNode(message));
        CPLogWindow.log.appendChild(logDiv);
        if (CPLogWindow.focusEnabled.checked)
            CPLogWindow.focus();
        if (CPLogWindow.blockEnabled.checked)
            CPLogWindow.blockEnabled.checked = CPLogWindow.confirm(message+"\nContinue blocking?");
        if (CPLogWindow.scrollEnabled.checked)
            CPLogWindow.scrollToBottom();
    } catch(e) {
    }
}
var CPLogPopupStyle ='<style type="text/css" media="screen"> body{font:10px Monaco,Courier,"Courier New",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap="yes"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled="no"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>';
function _CPLogInitPopup(logWindow)
{
    var doc = logWindow.document;
    doc.writeln("<html><head><title></title>"+CPLogPopupStyle+"</head><body></body></html>");
    doc.title = CPLogDefaultTitle + " Run Log";
    var head = doc.getElementsByTagName("head")[0];
    var body = doc.getElementsByTagName("body")[0];
    var base = window.location.protocol + "//" + window.location.host + window.location.pathname;
    base = base.substring(0,base.lastIndexOf("/")+1);
    var div = doc.createElement("div");
    div.setAttribute("id", "header");
    body.appendChild(div);
    var ul = doc.createElement("ul");
    ul.setAttribute("id", "enablers");
    div.appendChild(ul);
    for (var i = 0; i < CPLogLevels.length; i++) {
        var li = doc.createElement("li");
        li.setAttribute("id", "en"+CPLogLevels[i]);
        li.setAttribute("class", CPLogLevels[i]);
        li.setAttribute("onclick", "toggle(this);");
        li.setAttribute("enabled", "yes");
        li.appendChild(doc.createTextNode(CPLogLevels[i]));
        ul.appendChild(li);
    }
    var ul = doc.createElement("ul");
    ul.setAttribute("id", "options");
    div.appendChild(ul);
    var options = {"focus":["Focus",false], "block":["Block",false], "wrap":["Wrap",false], "scroll":["Scroll",true], "close":["Close",true]};
    for (o in options) {
        var li = doc.createElement("li");
        ul.appendChild(li);
        logWindow[o+"Enabled"] = doc.createElement("input");
        logWindow[o+"Enabled"].setAttribute("id", o);
        logWindow[o+"Enabled"].setAttribute("type", "checkbox");
        if (options[o][1])
            logWindow[o+"Enabled"].setAttribute("checked", "checked");
        li.appendChild(logWindow[o+"Enabled"]);
        var label = doc.createElement("label");
        label.setAttribute("for", o);
        label.appendChild(doc.createTextNode(options[o][0]));
        li.appendChild(label);
    }
    logWindow.log = doc.createElement("div");
    logWindow.log.setAttribute("class", "enerror endebug enwarn eninfo enfatal entrace");
    body.appendChild(logWindow.log);
    logWindow.toggle = function(elem) {
        var enabled = (elem.getAttribute("enabled") == "yes") ? "no" : "yes";
        elem.setAttribute("enabled", enabled);
        if (enabled == "yes")
            logWindow.log.className += " " + elem.id
        else
            logWindow.log.className = logWindow.log.className.replace(new RegExp("[\\s]*"+elem.id, "g"), "");
    }
    logWindow.scrollToBottom = function() {
        logWindow.scrollTo(0, body.offsetHeight);
    }
    logWindow.wrapEnabled.addEventListener("click", function() {
        logWindow.log.setAttribute("wrap", logWindow.wrapEnabled.checked ? "yes" : "no");
    }, false);
    logWindow.addEventListener("keydown", function(e) {
        var e = e || logWindow.event;
        if (e.keyCode == 75 && (e.ctrlKey || e.metaKey)) {
            while (logWindow.log.firstChild) {
                logWindow.log.removeChild(logWindow.log.firstChild);
            }
            e.preventDefault();
        }
    }, "false");
    window.addEventListener("unload", function() {
        if (logWindow && logWindow.closeEnabled && logWindow.closeEnabled.checked) {
            CPLogDisable = true;
            logWindow.close();
        }
    }, false);
    logWindow.addEventListener("unload", function() {
        if (!CPLogDisable) {
            CPLogDisable = !confirm("Click cancel to stop logging");
        }
    }, false);
}
CPLogDefault = (typeof window === "object" && window.console) ? CPLogConsole : CPLogPopup;
var undefined;
if (typeof window !== "undefined")
{
    window.setNativeTimeout = window.setTimeout;
    window.clearNativeTimeout = window.clearTimeout;
    window.setNativeInterval = window.setInterval;
    window.clearNativeInterval = window.clearInterval;
}
NO = false;
YES = true;
nil = null;
Nil = null;
NULL = null;
ABS = Math.abs;
ASIN = Math.asin;
ACOS = Math.acos;
ATAN = Math.atan;
ATAN2 = Math.atan2;
SIN = Math.sin;
COS = Math.cos;
TAN = Math.tan;
EXP = Math.exp;
POW = Math.pow;
CEIL = Math.ceil;
FLOOR = Math.floor;
ROUND = Math.round;
MIN = Math.min;
MAX = Math.max;
RAND = Math.random;
SQRT = Math.sqrt;
E = Math.E;
LN2 = Math.LN2;
LN10 = Math.LN10;
LOG = Math.log;
LOG2E = Math.LOG2E;
LOG10E = Math.LOG10E;
PI = Math.PI;
PI2 = Math.PI * 2.0;
PI_2 = Math.PI / 2.0;
SQRT1_2 = Math.SQRT1_2;
SQRT2 = Math.SQRT2;
function EventDispatcher( anOwner)
{
    this._eventListenersForEventNames = { };
    this._owner = anOwner;
}
EventDispatcher.prototype.addEventListener = function( anEventName, anEventListener)
{
    var eventListenersForEventNames = this._eventListenersForEventNames;
    if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
    {
        var eventListenersForEventName = [];
        eventListenersForEventNames[anEventName] = eventListenersForEventName;
    }
    else
        var eventListenersForEventName = eventListenersForEventNames[anEventName];
    var index = eventListenersForEventName.length;
    while (index--)
        if (eventListenersForEventName[index] === anEventListener)
            return;
    eventListenersForEventName.push(anEventListener);
}
EventDispatcher.prototype.removeEventListener = function( anEventName, anEventListener)
{
    var eventListenersForEventNames = this._eventListenersForEventNames;
    if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
        return;
    var eventListenersForEventName = eventListenersForEventNames[anEventName],
        index = eventListenersForEventName.length;
    while (index--)
        if (eventListenersForEventName[index] === anEventListener)
            return eventListenersForEventName.splice(index, 1);
}
EventDispatcher.prototype.dispatchEvent = function( anEvent)
{
    var type = anEvent.type,
        eventListenersForEventNames = this._eventListenersForEventNames;
    if (hasOwnProperty.call(eventListenersForEventNames, type))
    {
        var eventListenersForEventName = this._eventListenersForEventNames[type],
            index = 0,
            count = eventListenersForEventName.length;
        for (; index < count; ++index)
            eventListenersForEventName[index](anEvent);
    }
    var manual = (this._owner || this)["on" + type];
    if (manual)
        manual(anEvent);
}
var asynchronousTimeoutCount = 0,
    asynchronousTimeoutId = null,
    asynchronousFunctionQueue = [];
function Asynchronous( aFunction)
{
    var currentAsynchronousTimeoutCount = asynchronousTimeoutCount;
    if (asynchronousTimeoutId === null)
    {
        window.setNativeTimeout(function()
        {
            var queue = asynchronousFunctionQueue,
                index = 0,
                count = asynchronousFunctionQueue.length;
            ++asynchronousTimeoutCount;
            asynchronousTimeoutId = null;
            asynchronousFunctionQueue = [];
            for (; index < count; ++index)
                queue[index]();
        }, 0);
    }
    return function()
    {
        var args = arguments;
        if (asynchronousTimeoutCount > currentAsynchronousTimeoutCount)
            aFunction.apply(this, args);
        else
            asynchronousFunctionQueue.push(function()
            {
                aFunction.apply(this, args);
            });
    };
}
var NativeRequest = null;
if (window.ActiveXObject !== undefined)
{
    var MSXML_XMLHTTP_OBJECTS = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.6.0"],
        index = MSXML_XMLHTTP_OBJECTS.length;
    while (index--)
    {
        try
        {
            var MSXML_XMLHTTP = MSXML_XMLHTTP_OBJECTS[index];
            new ActiveXObject(MSXML_XMLHTTP);
            NativeRequest = function()
            {
                return new ActiveXObject(MSXML_XMLHTTP);
            };
            break;
        }
        catch (anException)
        {
        }
    }
}
if (!NativeRequest)
    NativeRequest = window.XMLHttpRequest;
CFHTTPRequest = function()
{
    this._isOpen = false;
    this._requestHeaders = {};
    this._mimeType = null;
    this._eventDispatcher = new EventDispatcher(this);
    this._nativeRequest = new NativeRequest();
    var self = this;
    this._stateChangeHandler = function()
    {
        determineAndDispatchHTTPRequestEvents(self);
    };
    this._nativeRequest.onreadystatechange = this._stateChangeHandler;
    if (CFHTTPRequest.AuthenticationDelegate !== nil)
        this._eventDispatcher.addEventListener("HTTP403", function()
            {
                CFHTTPRequest.AuthenticationDelegate(self);
            });
}
CFHTTPRequest.UninitializedState = 0;
CFHTTPRequest.LoadingState = 1;
CFHTTPRequest.LoadedState = 2;
CFHTTPRequest.InteractiveState = 3;
CFHTTPRequest.CompleteState = 4;
CFHTTPRequest.AuthenticationDelegate = nil;
CFHTTPRequest.prototype.status = function()
{
    try
    {
        return this._nativeRequest.status || 0;
    }
    catch (anException)
    {
        return 0;
    }
};
CFHTTPRequest.prototype.statusText = function()
{
    try
    {
        return this._nativeRequest.statusText || "";
    }
    catch (anException)
    {
        return "";
    }
};
CFHTTPRequest.prototype.readyState = function()
{
    return this._nativeRequest.readyState;
};
CFHTTPRequest.prototype.success = function()
{
    var status = this.status();
    if (status >= 200 && status < 300)
        return YES;
    return status === 0 && this.responseText() && this.responseText().length;
};
CFHTTPRequest.prototype.responseXML = function()
{
    var responseXML = this._nativeRequest.responseXML;
    if (responseXML && (NativeRequest === window.XMLHttpRequest))
        return responseXML;
    return parseXML(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList = function()
{
    var responseText = this.responseText();
    if (CFPropertyList.sniffedFormatOfString(responseText) === CFPropertyList.FormatXML_v1_0)
        return CFPropertyList.propertyListFromXML(this.responseXML());
    return CFPropertyList.propertyListFromString(responseText);
};
CFHTTPRequest.prototype.responseText = function()
{
    return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader = function( aHeader, aValue)
{
    this._requestHeaders[aHeader] = aValue;
};
CFHTTPRequest.prototype.getResponseHeader = function( aHeader)
{
    return this._nativeRequest.getResponseHeader(aHeader);
};
CFHTTPRequest.prototype.getAllResponseHeaders = function()
{
    return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType = function( aMimeType)
{
    this._mimeType = aMimeType;
};
CFHTTPRequest.prototype.open = function( aMethod, aURL, isAsynchronous, aUser, aPassword)
{
    this._isOpen = true;
    this._URL = aURL;
    this._async = isAsynchronous;
    this._method = aMethod;
    this._user = aUser;
    this._password = aPassword;
    return this._nativeRequest.open(aMethod, aURL, isAsynchronous, aUser, aPassword);
};
CFHTTPRequest.prototype.send = function( aBody)
{
    if (!this._isOpen)
    {
        delete this._nativeRequest.onreadystatechange;
        this._nativeRequest.open(this._method, this._URL, this._async, this._user, this._password);
        this._nativeRequest.onreadystatechange = this._stateChangeHandler;
    }
    for (var i in this._requestHeaders)
    {
        if (this._requestHeaders.hasOwnProperty(i))
            this._nativeRequest.setRequestHeader(i, this._requestHeaders[i]);
    }
    if (this._mimeType && "overrideMimeType" in this._nativeRequest)
        this._nativeRequest.overrideMimeType(this._mimeType);
    this._isOpen = false;
    try
    {
        return this._nativeRequest.send(aBody);
    }
    catch (anException)
    {
        this._eventDispatcher.dispatchEvent({ type:"failure", request:this });
    }
};
CFHTTPRequest.prototype.abort = function()
{
    this._isOpen = false;
    return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.addEventListener(anEventName, anEventListener);
};
CFHTTPRequest.prototype.removeEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.removeEventListener(anEventName, anEventListener);
};
function determineAndDispatchHTTPRequestEvents( aRequest)
{
    var eventDispatcher = aRequest._eventDispatcher;
    eventDispatcher.dispatchEvent({ type:"readystatechange", request:aRequest});
    var nativeRequest = aRequest._nativeRequest,
        readyStates = ["uninitialized", "loading", "loaded", "interactive", "complete"];
    if (readyStates[aRequest.readyState()] === "complete")
    {
        var status = "HTTP" + aRequest.status();
        eventDispatcher.dispatchEvent({ type:status, request:aRequest });
        var result = aRequest.success() ? "success" : "failure";
        eventDispatcher.dispatchEvent({ type:result, request:aRequest });
        eventDispatcher.dispatchEvent({ type:readyStates[aRequest.readyState()], request:aRequest});
    }
    else
        eventDispatcher.dispatchEvent({ type:readyStates[aRequest.readyState()], request:aRequest});
}
function FileRequest( aURL, onsuccess, onfailure)
{
    var request = new CFHTTPRequest();
    if (aURL.pathExtension() === "plist")
        request.overrideMimeType("text/xml");
    if (exports.asyncLoader)
    {
        request.onsuccess = Asynchronous(onsuccess);
        request.onfailure = Asynchronous(onfailure);
    }
    else
    {
        request.onsuccess = onsuccess;
        request.onfailure = onfailure;
    }
    request.open("GET", aURL.absoluteString(), exports.asyncLoader);
    request.send("");
}
exports.asyncLoader = YES;
exports.Asynchronous = Asynchronous;
exports.determineAndDispatchHTTPRequestEvents = determineAndDispatchHTTPRequestEvents;
var OBJECT_COUNT = 0;
objj_generateObjectUID = function()
{
    return OBJECT_COUNT++;
}
CFPropertyList = function()
{
    this._UID = objj_generateObjectUID();
}
CFPropertyList.DTDRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i
CFPropertyList.XMLRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber = "280NPLIST";
CFPropertyList.FormatOpenStep = 1,
CFPropertyList.FormatXML_v1_0 = 100,
CFPropertyList.FormatBinary_v1_0 = 200,
CFPropertyList.Format280North_v1_0 = -1000;
CFPropertyList.sniffedFormatOfString = function( aString)
{
    if (aString.match(CFPropertyList.XMLRE))
        return CFPropertyList.FormatXML_v1_0;
    if (aString.substr(0, CFPropertyList.Format280NorthMagicNumber.length) === CFPropertyList.Format280NorthMagicNumber)
       return CFPropertyList.Format280North_v1_0;
    return NULL;
}
CFPropertyList.dataFromPropertyList = function( aPropertyList, aFormat)
{
    var data = new CFMutableData();
    data.setRawString(CFPropertyList.stringFromPropertyList(aPropertyList, aFormat));
    return data;
}
CFPropertyList.stringFromPropertyList = function( aPropertyList, aFormat)
{
    if (!aFormat)
        aFormat = CFPropertyList.Format280North_v1_0;
    var serializers = CFPropertyListSerializers[aFormat];
    return serializers["start"]() +
            serializePropertyList(aPropertyList, serializers) +
            serializers["finish"]();
}
function serializePropertyList( aPropertyList, serializers)
{
    var type = typeof aPropertyList,
        valueOf = aPropertyList.valueOf(),
        typeValueOf = typeof valueOf;
    if (type !== typeValueOf)
    {
        type = typeValueOf;
        aPropertyList = valueOf;
    }
    if (aPropertyList === YES || aPropertyList === NO)
        type = "boolean";
    else if (type === "number")
    {
        if (FLOOR(aPropertyList) === aPropertyList && ("" + aPropertyList).indexOf('e') == -1)
            type = "integer";
        else
            type = "real";
    }
    else if (type !== "string")
    {
        if (aPropertyList.slice)
            type = "array";
        else
            type = "dictionary";
    }
    return serializers[type](aPropertyList, serializers);
}
var CFPropertyListSerializers = { };
CFPropertyListSerializers[CFPropertyList.FormatXML_v1_0] =
{
    "start": function()
                    {
                        return CFPropertyList.FormatXMLDTD + "<plist version = \"1.0\">";
                    },
    "finish": function()
                    {
                        return "</plist>";
                    },
    "string": function( aString)
                    {
                        return "<string>" + encodeHTMLComponent(aString) + "</string>";
                    },
    "boolean" : function( aBoolean)
                    {
                        return aBoolean ? "<true/>" : "<false/>";
                    },
    "integer": function( anInteger)
                    {
                        return "<integer>" + anInteger + "</integer>";
                    },
    "real": function( aFloat)
                    {
                        return "<real>" + aFloat + "</real>";
                    },
    "array": function( anArray, serializers)
                    {
                        var index = 0,
                            count = anArray.length,
                            string = "<array>";
                        for (; index < count; ++index)
                            string += serializePropertyList(anArray[index], serializers);
                        return string + "</array>";
                    },
    "dictionary": function( aDictionary, serializers)
                    {
                        var keys = aDictionary._keys,
                            index = 0,
                            count = keys.length,
                            string = "<dict>";
                        for (; index < count; ++index)
                        {
                            var key = keys[index];
                            string += "<key>" + key + "</key>";
                            string += serializePropertyList(aDictionary.valueForKey(key), serializers);
                        }
                        return string + "</dict>";
                    }
}
var ARRAY_MARKER = "A",
    DICTIONARY_MARKER = "D",
    FLOAT_MARKER = "f",
    INTEGER_MARKER = "d",
    STRING_MARKER = "S",
    TRUE_MARKER = "T",
    FALSE_MARKER = "F",
    KEY_MARKER = "K",
    END_MARKER = "E";
CFPropertyListSerializers[CFPropertyList.Format280North_v1_0] =
{
    "start": function()
                    {
                        return CFPropertyList.Format280NorthMagicNumber + ";1.0;";
                    },
    "finish": function()
                    {
                        return "";
                    },
    "string" : function( aString)
                    {
                        return STRING_MARKER + ';' + aString.length + ';' + aString;
                    },
    "boolean" : function( aBoolean)
                    {
                        return (aBoolean ? TRUE_MARKER : FALSE_MARKER) + ';';
                    },
    "integer": function( anInteger)
                    {
                        var string = "" + anInteger;
                        return INTEGER_MARKER + ';' + string.length + ';' + string;
                    },
    "real": function( aFloat)
                    {
                        var string = "" + aFloat;
                        return FLOAT_MARKER + ';' + string.length + ';' + string;
                    },
    "array": function( anArray, serializers)
                    {
                        var index = 0,
                            count = anArray.length,
                            string = ARRAY_MARKER + ';';
                        for (; index < count; ++index)
                            string += serializePropertyList(anArray[index], serializers);
                        return string + END_MARKER + ';';
                    },
    "dictionary": function( aDictionary, serializers)
                    {
                        var keys = aDictionary._keys,
                            index = 0,
                            count = keys.length,
                            string = DICTIONARY_MARKER +';';
                        for (; index < count; ++index)
                        {
                            var key = keys[index];
                            string += KEY_MARKER + ';' + key.length + ';' + key;
                            string += serializePropertyList(aDictionary.valueForKey(key), serializers);
                        }
                        return string + END_MARKER + ';';
                    }
}
var XML_XML = "xml",
    XML_DOCUMENT = "#document",
    PLIST_PLIST = "plist",
    PLIST_KEY = "key",
    PLIST_DICTIONARY = "dict",
    PLIST_ARRAY = "array",
    PLIST_STRING = "string",
    PLIST_DATE = "date",
    PLIST_BOOLEAN_TRUE = "true",
    PLIST_BOOLEAN_FALSE = "false",
    PLIST_NUMBER_REAL = "real",
    PLIST_NUMBER_INTEGER = "integer",
    PLIST_DATA = "data";
var textContent = function(nodes)
{
    var text = "",
        index = 0,
        count = nodes.length;
    for (; index < count; ++index)
    {
        var node = nodes[index];
        if (node.nodeType === 3 || node.nodeType === 4)
            text += node.nodeValue;
        else if (node.nodeType !== 8)
            text += textContent(node.childNodes);
    }
    return text;
}
var _plist_traverseNextNode = function(anXMLNode, stayWithin, stack)
{
    var node = anXMLNode;
    node = (node.firstChild); if (node !== NULL && ((node.nodeType) === 8 || (node.nodeType) === 3)) while ((node = (node.nextSibling)) && ((node.nodeType) === 8 || (node.nodeType) === 3)) ;;
    if (node)
        return node;
    if ((String(anXMLNode.nodeName)) === PLIST_ARRAY || (String(anXMLNode.nodeName)) === PLIST_DICTIONARY)
        stack.pop();
    else
    {
        if (node === stayWithin)
            return NULL;
        node = anXMLNode;
        while ((node = (node.nextSibling)) && ((node.nodeType) === 8 || (node.nodeType) === 3)) ;;
        if (node)
            return node;
    }
    node = anXMLNode;
    while (node)
    {
        var next = node;
        while ((next = (next.nextSibling)) && ((next.nodeType) === 8 || (next.nodeType) === 3)) ;;
        if (next)
            return next;
        var node = (node.parentNode);
        if (stayWithin && node === stayWithin)
            return NULL;
        stack.pop();
    }
    return NULL;
}
CFPropertyList.propertyListFromData = function( aData, aFormat)
{
    return CFPropertyList.propertyListFromString(aData.rawString(), aFormat);
}
CFPropertyList.propertyListFromString = function( aString, aFormat)
{
    if (!aFormat)
        aFormat = CFPropertyList.sniffedFormatOfString(aString);
    if (aFormat === CFPropertyList.FormatXML_v1_0)
        return CFPropertyList.propertyListFromXML(aString);
    if (aFormat === CFPropertyList.Format280North_v1_0)
        return propertyListFrom280NorthString(aString);
    return NULL;
}
var ARRAY_MARKER = "A",
    DICTIONARY_MARKER = "D",
    FLOAT_MARKER = "f",
    INTEGER_MARKER = "d",
    STRING_MARKER = "S",
    TRUE_MARKER = "T",
    FALSE_MARKER = "F",
    KEY_MARKER = "K",
    END_MARKER = "E";
function propertyListFrom280NorthString( aString)
{
    var stream = new MarkedStream(aString),
        marker = NULL,
        key = "",
        object = NULL,
        plistObject = NULL,
        containers = [],
        currentContainer = NULL;
    while (marker = stream.getMarker())
    {
        if (marker === END_MARKER)
        {
            containers.pop();
            continue;
        }
        var count = containers.length;
        if (count)
            currentContainer = containers[count - 1];
        if (marker === KEY_MARKER)
        {
            key = stream.getString();
            marker = stream.getMarker();
        }
        switch (marker)
        {
            case ARRAY_MARKER: object = []
                                    containers.push(object);
                                    break;
            case DICTIONARY_MARKER: object = new CFMutableDictionary();
                                    containers.push(object);
                                    break;
            case FLOAT_MARKER: object = parseFloat(stream.getString());
                                    break;
            case INTEGER_MARKER: object = parseInt(stream.getString(), 10);
                                    break;
            case STRING_MARKER: object = stream.getString();
                                    break;
            case TRUE_MARKER: object = YES;
                                    break;
            case FALSE_MARKER: object = NO;
                                    break;
            default: throw new Error("*** " + marker + " marker not recognized in Plist.");
        }
        if (!plistObject)
            plistObject = object;
        else if (currentContainer)
            if (currentContainer.slice)
                currentContainer.push(object);
            else
                currentContainer.setValueForKey(key, object);
    }
    return plistObject;
}
function encodeHTMLComponent( aString)
{
    return aString.replace(/&/g,'&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function decodeHTMLComponent( aString)
{
    return aString.replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}
function parseXML( aString)
{
    if (window.DOMParser)
        return (new window.DOMParser().parseFromString(aString, "text/xml").documentElement);
    else if (window.ActiveXObject)
    {
        XMLNode = new ActiveXObject("Microsoft.XMLDOM");
        var matches = aString.match(CFPropertyList.DTDRE);
        if (matches)
            aString = aString.substr(matches[0].length);
        XMLNode.loadXML(aString);
        return XMLNode
    }
    return NULL;
}
CFPropertyList.propertyListFromXML = function( aStringOrXMLNode)
{
    var XMLNode = aStringOrXMLNode;
    if (aStringOrXMLNode.valueOf && typeof aStringOrXMLNode.valueOf() === "string")
        XMLNode = parseXML(aStringOrXMLNode);
    while (((String(XMLNode.nodeName)) === XML_DOCUMENT) || ((String(XMLNode.nodeName)) === XML_XML))
        XMLNode = (XMLNode.firstChild); if (XMLNode !== NULL && ((XMLNode.nodeType) === 8 || (XMLNode.nodeType) === 3)) while ((XMLNode = (XMLNode.nextSibling)) && ((XMLNode.nodeType) === 8 || (XMLNode.nodeType) === 3)) ;;
    if (((XMLNode.nodeType) === 10))
        while ((XMLNode = (XMLNode.nextSibling)) && ((XMLNode.nodeType) === 8 || (XMLNode.nodeType) === 3)) ;;
    if (!((String(XMLNode.nodeName)) === PLIST_PLIST))
        return NULL;
    var key = "",
        object = NULL,
        plistObject = NULL,
        plistNode = XMLNode,
        containers = [],
        currentContainer = NULL;
    while (XMLNode = _plist_traverseNextNode(XMLNode, plistNode, containers))
    {
        var count = containers.length;
        if (count)
            currentContainer = containers[count - 1];
        if ((String(XMLNode.nodeName)) === PLIST_KEY)
        {
            key = (XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode])));
            while ((XMLNode = (XMLNode.nextSibling)) && ((XMLNode.nodeType) === 8 || (XMLNode.nodeType) === 3)) ;;
        }
        switch (String((String(XMLNode.nodeName))))
        {
            case PLIST_ARRAY: object = []
                                        containers.push(object);
                                        break;
            case PLIST_DICTIONARY: object = new CFMutableDictionary();
                                        containers.push(object);
                                        break;
            case PLIST_NUMBER_REAL: object = parseFloat((XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode]))));
                                        break;
            case PLIST_NUMBER_INTEGER: object = parseInt((XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode]))), 10);
                                        break;
            case PLIST_STRING: if ((XMLNode.getAttribute("type") === "base64"))
                                            object = (XMLNode.firstChild) ? CFData.decodeBase64ToString((XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode])))) : "";
                                        else
                                            object = decodeHTMLComponent((XMLNode.firstChild) ? (XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode]))) : "");
                                        break;
            case PLIST_DATE: var timestamp = Date.parseISO8601((XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode]))));
                                        object = isNaN(timestamp) ? new Date() : new Date(timestamp);
                                        break;
            case PLIST_BOOLEAN_TRUE: object = YES;
                                        break;
            case PLIST_BOOLEAN_FALSE: object = NO;
                                        break;
            case PLIST_DATA: object = new CFMutableData();
                                        var data_bytes = (XMLNode.firstChild) ? CFData.decodeBase64ToArray((XMLNode.textContent || (XMLNode.textContent !== "" && textContent([XMLNode]))), YES) : [];
                                        object.setBytes(data_bytes);
                                        break;
            default: throw new Error("*** " + (String(XMLNode.nodeName)) + " tag not recognized in Plist.");
        }
        if (!plistObject)
            plistObject = object;
        else if (currentContainer)
            if (currentContainer.slice)
                currentContainer.push(object);
            else
                currentContainer.setValueForKey(key, object);
    }
    return plistObject;
}
kCFPropertyListOpenStepFormat = CFPropertyList.FormatOpenStep;
kCFPropertyListXMLFormat_v1_0 = CFPropertyList.FormatXML_v1_0;
kCFPropertyListBinaryFormat_v1_0 = CFPropertyList.FormatBinary_v1_0;
kCFPropertyList280NorthFormat_v1_0 = CFPropertyList.Format280North_v1_0;
CFPropertyListCreate = function()
{
    return new CFPropertyList();
}
CFPropertyListCreateFromXMLData = function( data)
{
    return CFPropertyList.propertyListFromData(data, CFPropertyList.FormatXML_v1_0);
}
CFPropertyListCreateXMLData = function( aPropertyList)
{
    return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.FormatXML_v1_0);
}
CFPropertyListCreateFrom280NorthData = function( data)
{
    return CFPropertyList.propertyListFromData(data, CFPropertyList.Format280North_v1_0);
}
CFPropertyListCreate280NorthData = function( aPropertyList)
{
    return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.Format280North_v1_0);
}
CPPropertyListCreateFromData = function( data, aFormat)
{
    return CFPropertyList.propertyListFromData(data, aFormat);
}
CPPropertyListCreateData = function( aPropertyList, aFormat)
{
    return CFPropertyList.dataFromPropertyList(aPropertyList, aFormat);
}
CFDictionary = function( aDictionary)
{
    this._keys = [];
    this._count = 0;
    this._buckets = { };
    this._UID = objj_generateObjectUID();
}
var indexOf = Array.prototype.indexOf,
    hasOwnProperty = Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy = function()
{
    return this;
};
CFDictionary.prototype.mutableCopy = function()
{
    var newDictionary = new CFMutableDictionary(),
        keys = this._keys,
        count = this._count;
    newDictionary._keys = keys.slice();
    newDictionary._count = count;
    var index = 0,
        buckets = this._buckets,
        newBuckets = newDictionary._buckets;
    for (; index < count; ++index)
    {
        var key = keys[index];
        newBuckets[key] = buckets[key];
    }
    return newDictionary;
};
CFDictionary.prototype.containsKey = function( aKey)
{
    return hasOwnProperty.apply(this._buckets, [aKey]);
};
CFDictionary.prototype.containsKey.displayName = "CFDictionary.prototype.containsKey";
CFDictionary.prototype.containsValue = function( anObject)
{
    var keys = this._keys,
        buckets = this._buckets,
        index = 0,
        count = keys.length;
    for (; index < count; ++index)
        if (buckets[keys[index]] === anObject)
            return YES;
    return NO;
};
CFDictionary.prototype.containsValue.displayName = "CFDictionary.prototype.containsValue";
CFDictionary.prototype.count = function()
{
    return this._count;
};
CFDictionary.prototype.count.displayName = "CFDictionary.prototype.count";
CFDictionary.prototype.countOfKey = function( aKey)
{
    return this.containsKey(aKey) ? 1 : 0;
};
CFDictionary.prototype.countOfKey.displayName = "CFDictionary.prototype.countOfKey";
CFDictionary.prototype.countOfValue = function( anObject)
{
    var keys = this._keys,
        buckets = this._buckets,
        index = 0,
        count = keys.length,
        countOfValue = 0;
    for (; index < count; ++index)
        if (buckets[keys[index]] === anObject)
            ++countOfValue;
    return countOfValue;
};
CFDictionary.prototype.countOfValue.displayName = "CFDictionary.prototype.countOfValue";
CFDictionary.prototype.keys = function()
{
    return this._keys.slice();
};
CFDictionary.prototype.keys.displayName = "CFDictionary.prototype.keys";
CFDictionary.prototype.valueForKey = function( aKey)
{
    var buckets = this._buckets;
    if (!hasOwnProperty.apply(buckets, [aKey]))
        return nil;
    return buckets[aKey];
};
CFDictionary.prototype.valueForKey.displayName = "CFDictionary.prototype.valueForKey";
CFDictionary.prototype.toString = function()
{
    var string = "{\n",
        keys = this._keys,
        index = 0,
        count = this._count;
    for (; index < count; ++index)
    {
        var key = keys[index];
        string += "\t" + key + " = \"" + String(this.valueForKey(key)).split('\n').join("\n\t") + "\"\n";
    }
    return string + "}";
};
CFDictionary.prototype.toString.displayName = "CFDictionary.prototype.toString";
CFMutableDictionary = function( aDictionary)
{
    CFDictionary.apply(this, []);
}
CFMutableDictionary.prototype = new CFDictionary();
CFMutableDictionary.prototype.copy = function()
{
    return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey = function( aKey, aValue)
{
    if (this.containsKey(aKey))
        return;
    ++this._count;
    this._keys.push(aKey);
    this._buckets[aKey] = aValue;
};
CFMutableDictionary.prototype.addValueForKey.displayName = "CFMutableDictionary.prototype.addValueForKey";
CFMutableDictionary.prototype.removeValueForKey = function( aKey)
{
    var indexOfKey = -1;
    if (indexOf)
        indexOfKey = indexOf.call(this._keys, aKey);
    else
    {
        var keys = this._keys,
            index = 0,
            count = keys.length;
        for (; index < count; ++index)
            if (keys[index] === aKey)
            {
                indexOfKey = index;
                break;
            }
    }
    if (indexOfKey === -1)
        return;
    --this._count;
    this._keys.splice(indexOfKey, 1);
    delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeValueForKey.displayName = "CFMutableDictionary.prototype.removeValueForKey";
CFMutableDictionary.prototype.removeAllValues = function()
{
    this._count = 0;
    this._keys = [];
    this._buckets = { };
};
CFMutableDictionary.prototype.removeAllValues.displayName = "CFMutableDictionary.prototype.removeAllValues";
CFMutableDictionary.prototype.replaceValueForKey = function( aKey, aValue)
{
    if (!this.containsKey(aKey))
        return;
    this._buckets[aKey] = aValue;
};
CFMutableDictionary.prototype.replaceValueForKey.displayName = "CFMutableDictionary.prototype.replaceValueForKey";
CFMutableDictionary.prototype.setValueForKey = function( aKey, aValue)
{
    if (aValue === nil || aValue === undefined)
        this.removeValueForKey(aKey);
    else if (this.containsKey(aKey))
        this.replaceValueForKey(aKey, aValue);
    else
        this.addValueForKey(aKey, aValue);
};
CFMutableDictionary.prototype.setValueForKey.displayName = "CFMutableDictionary.prototype.setValueForKey";
CFData = function()
{
    this._rawString = NULL;
    this._propertyList = NULL;
    this._propertyListFormat = NULL;
    this._JSONObject = NULL;
    this._bytes = NULL;
    this._base64 = NULL;
};
CFData.prototype.propertyList = function()
{
    if (!this._propertyList)
        this._propertyList = CFPropertyList.propertyListFromString(this.rawString());
    return this._propertyList;
};
CFData.prototype.JSONObject = function()
{
    if (!this._JSONObject)
    {
        try
        {
            this._JSONObject = JSON.parse(this.rawString());
        }
        catch (anException)
        {
        }
    }
    return this._JSONObject;
};
CFData.prototype.rawString = function()
{
    if (this._rawString === NULL)
    {
        if (this._propertyList)
            this._rawString = CFPropertyList.stringFromPropertyList(this._propertyList, this._propertyListFormat);
        else if (this._JSONObject)
            this._rawString = JSON.stringify(this._JSONObject);
        else if (this._bytes)
            this._rawString = CFData.bytesToString(this._bytes);
        else if (this._base64)
            this._rawString = CFData.decodeBase64ToString(this._base64, true);
        else
            throw new Error("Can't convert data to string.");
    }
    return this._rawString;
};
CFData.prototype.bytes = function()
{
    if (this._bytes === NULL)
    {
        var bytes = CFData.stringToBytes(this.rawString());
        this.setBytes(bytes);
    }
    return this._bytes;
};
CFData.prototype.base64 = function()
{
    if (this._base64 === NULL)
    {
        var base64;
        if (this._bytes)
            base64 = CFData.encodeBase64Array(this._bytes);
        else
            base64 = CFData.encodeBase64String(this.rawString());
        this.setBase64String(base64);
    }
    return this._base64;
};
CFMutableData = function()
{
    CFData.call(this);
};
CFMutableData.prototype = new CFData();
function clearMutableData( aData)
{
    this._rawString = NULL;
    this._propertyList = NULL;
    this._propertyListFormat = NULL;
    this._JSONObject = NULL;
    this._bytes = NULL;
    this._base64 = NULL;
}
CFMutableData.prototype.setPropertyList = function( aPropertyList, aFormat)
{
    clearMutableData(this);
    this._propertyList = aPropertyList;
    this._propertyListFormat = aFormat;
};
CFMutableData.prototype.setJSONObject = function( anObject)
{
    clearMutableData(this);
    this._JSONObject = anObject;
};
CFMutableData.prototype.setRawString = function( aString)
{
    clearMutableData(this);
    this._rawString = aString;
};
CFMutableData.prototype.setBytes = function( bytes)
{
    clearMutableData(this);
    this._bytes = bytes;
};
CFMutableData.prototype.setBase64String = function( aBase64String)
{
    clearMutableData(this);
    this._base64 = aBase64String;
};
var base64_map_to = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
        "0","1","2","3","4","5","6","7","8","9","+","/","="],
    base64_map_from = [];
for (var i = 0; i < base64_map_to.length; i++)
    base64_map_from[base64_map_to[i].charCodeAt(0)] = i;
CFData.decodeBase64ToArray = function(input, strip)
{
    if (strip)
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    var pad = (input[input.length-1] == "=" ? 1 : 0) + (input[input.length-2] == "=" ? 1 : 0),
        length = input.length,
        output = [];
    var i = 0;
    while (i < length)
    {
        var bits = (base64_map_from[input.charCodeAt(i++)] << 18) |
                    (base64_map_from[input.charCodeAt(i++)] << 12) |
                    (base64_map_from[input.charCodeAt(i++)] << 6) |
                    (base64_map_from[input.charCodeAt(i++)]);
        output.push((bits & 0xFF0000) >> 16);
        output.push((bits & 0xFF00) >> 8);
        output.push(bits & 0xFF);
    }
    if (pad > 0)
        return output.slice(0, -1 * pad);
    return output;
};
CFData.encodeBase64Array = function(input)
{
    var pad = (3 - (input.length % 3)) % 3,
        length = input.length + pad,
        output = [];
    if (pad > 0) input.push(0);
    if (pad > 1) input.push(0);
    var i = 0;
    while (i < length)
    {
        var bits = (input[i++] << 16) |
                    (input[i++] << 8) |
                    (input[i++]);
        output.push(base64_map_to[(bits & 0xFC0000) >> 18]);
        output.push(base64_map_to[(bits & 0x3F000) >> 12]);
        output.push(base64_map_to[(bits & 0xFC0) >> 6]);
        output.push(base64_map_to[bits & 0x3F]);
    }
    if (pad > 0)
    {
        output[output.length - 1] = "=";
        input.pop();
    }
    if (pad > 1)
    {
        output[output.length - 2] = "=";
        input.pop();
    }
    return output.join("");
};
CFData.decodeBase64ToString = function(input, strip)
{
    return CFData.bytesToString(CFData.decodeBase64ToArray(input, strip));
};
CFData.decodeBase64ToUtf16String = function(input, strip)
{
    return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(input, strip));
};
CFData.bytesToString = function(bytes)
{
    return String.fromCharCode.apply(NULL, bytes);
};
CFData.stringToBytes = function(input)
{
    var temp = [];
    for (var i = 0; i < input.length; i++)
        temp.push(input.charCodeAt(i));
    return temp;
};
CFData.encodeBase64String = function(input)
{
    var temp = [];
    for (var i = 0; i < input.length; i++)
        temp.push(input.charCodeAt(i));
    return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String = function(bytes)
{
    var temp = [];
    for (var i = 0; i < bytes.length; i += 2)
        temp.push(bytes[i + 1] << 8 | bytes[i]);
    return String.fromCharCode.apply(NULL, temp);
};
CFData.encodeBase64Utf16String = function(input)
{
    var temp = [];
    for (var i = 0; i < input.length; i++)
    {
        var c = input.charCodeAt(i);
        temp.push(c & 0xFF);
        temp.push((c & 0xFF00) >> 8);
    }
    return CFData.encodeBase64Array(temp);
};
var CFURLsForCachedUIDs,
    CFURLPartsForURLStrings,
    CFURLCachingEnableCount = 0;
function enableCFURLCaching()
{
    if (++CFURLCachingEnableCount !== 1)
        return;
    CFURLsForCachedUIDs = { };
    CFURLPartsForURLStrings = { };
}
function disableCFURLCaching()
{
    CFURLCachingEnableCount = MAX(CFURLCachingEnableCount - 1, 0);
    if (CFURLCachingEnableCount !== 0)
        return;
    delete CFURLsForCachedUIDs;
    delete CFURLPartsForURLStrings;
}
var URL_RE = new RegExp(
    "^" +
    "(?:" +
        "([^:/?#]+):" +
    ")?" +
    "(?:" +
        "(//)" +
        "(" +
            "(?:" +
                "(" +
                    "([^:@]*)" +
                    ":?" +
                    "([^:@]*)" +
                ")?" +
                "@" +
            ")?" +
            "([^:/?#]*)" +
            "(?::(\\d*))?" +
        ")" +
    ")?" +
    "([^?#]*)" +
    "(?:\\?([^#]*))?" +
    "(?:#(.*))?"
);
var URI_KEYS =
[
    "url",
    "scheme",
    "authorityRoot",
    "authority",
        "userInfo",
            "user",
            "password",
        "domain",
        "portNumber",
    "path",
    "queryString",
    "fragment"
];
function CFURLGetParts( aURL)
{
    if (aURL._parts)
        return aURL._parts;
    var URLString = aURL.string(),
        isMHTMLURL = URLString.match(/^mhtml:/);
    if (isMHTMLURL)
        URLString = URLString.substr("mhtml:".length);
    if (CFURLCachingEnableCount > 0 && hasOwnProperty.call(CFURLPartsForURLStrings, URLString))
    {
        aURL._parts = CFURLPartsForURLStrings[URLString];
        return aURL._parts;
    }
    aURL._parts = { };
    var parts = aURL._parts,
        results = URL_RE.exec(URLString),
        index = results.length;
    while (index--)
        parts[URI_KEYS[index]] = results[index] || NULL;
    parts.portNumber = parseInt(parts.portNumber, 10);
    if (isNaN(parts.portNumber))
        parts.portNumber = -1;
    parts.pathComponents = [];
    if (parts.path)
    {
        var split = parts.path.split("/"),
            pathComponents = parts.pathComponents,
            count = split.length;
        for (index = 0; index < count; ++index)
        {
            var component = split[index];
            if (component)
                pathComponents.push(component);
            else if (index === 0)
                pathComponents.push("/");
        }
        parts.pathComponents = pathComponents;
    }
    if (isMHTMLURL)
    {
        parts.url = "mhtml:" + parts.url;
        parts.scheme = "mhtml:" + parts.scheme;
    }
    if (CFURLCachingEnableCount > 0)
        CFURLPartsForURLStrings[URLString] = parts;
    return parts;
}
CFURL = function( aURL, aBaseURL)
{
    aURL = aURL || "";
    if (aURL instanceof CFURL)
    {
        if (!aBaseURL)
            return new CFURL(aURL.absoluteString());
        var existingBaseURL = aURL.baseURL();
        if (existingBaseURL)
            aBaseURL = new CFURL(existingBaseURL.absoluteURL(), aBaseURL);
        aURL = aURL.string();
    }
    if (CFURLCachingEnableCount > 0)
    {
        var cacheUID = aURL + " " + (aBaseURL && aBaseURL.UID() || "");
        if (hasOwnProperty.call(CFURLsForCachedUIDs, cacheUID))
            return CFURLsForCachedUIDs[cacheUID];
        CFURLsForCachedUIDs[cacheUID] = this;
    }
    if (aURL.match(/^data:/))
    {
        var parts = { },
            index = URI_KEYS.length;
        while (index--)
            parts[URI_KEYS[index]] = "";
        parts.url = aURL;
        parts.scheme = "data";
        parts.pathComponents = [];
        this._parts = parts;
        this._standardizedURL = this;
        this._absoluteURL = this;
    }
    this._UID = objj_generateObjectUID();
    this._string = aURL;
    this._baseURL = aBaseURL;
}
CFURL.displayName = "CFURL";
CFURL.prototype.UID = function()
{
    return this._UID;
};
CFURL.prototype.UID.displayName = "CFURL.prototype.UID";
var URLMap = { };
CFURL.prototype.mappedURL = function()
{
    return URLMap[this.absoluteString()] || this;
};
CFURL.prototype.mappedURL.displayName = "CFURL.prototype.mappedURL";
CFURL.setMappedURLForURL = function( fromURL, toURL)
{
    URLMap[fromURL.absoluteString()] = toURL;
};
CFURL.setMappedURLForURL.displayName = "CFURL.setMappedURLForURL";
CFURL.prototype.schemeAndAuthority = function()
{
    var string = "",
        scheme = this.scheme();
    if (scheme)
        string += scheme + ":";
    var authority = this.authority();
    if (authority)
        string += "//" + authority;
    return string;
};
CFURL.prototype.schemeAndAuthority.displayName = "CFURL.prototype.schemeAndAuthority";
CFURL.prototype.absoluteString = function()
{
    if (this._absoluteString === undefined)
        this._absoluteString = this.absoluteURL().string();
    return this._absoluteString;
};
CFURL.prototype.absoluteString.displayName = "CFURL.prototype.absoluteString";
CFURL.prototype.toString = function()
{
    return this.absoluteString();
};
CFURL.prototype.toString.displayName = "CFURL.prototype.toString";
function resolveURL(aURL)
{
    aURL = aURL.standardizedURL();
    var baseURL = aURL.baseURL();
    if (!baseURL)
        return aURL;
    var parts = ((aURL)._parts || CFURLGetParts(aURL)),
        resolvedParts,
        absoluteBaseURL = baseURL.absoluteURL(),
        baseParts = ((absoluteBaseURL)._parts || CFURLGetParts(absoluteBaseURL));
    if (parts.scheme || parts.authority)
        resolvedParts = parts;
    else
    {
        resolvedParts = { };
        resolvedParts.scheme = baseParts.scheme;
        resolvedParts.authority = baseParts.authority;
        resolvedParts.userInfo = baseParts.userInfo;
        resolvedParts.user = baseParts.user;
        resolvedParts.password = baseParts.password;
        resolvedParts.domain = baseParts.domain;
        resolvedParts.portNumber = baseParts.portNumber;
        resolvedParts.queryString = parts.queryString;
        resolvedParts.fragment = parts.fragment;
        var pathComponents = parts.pathComponents;
        if (pathComponents.length && pathComponents[0] === "/")
        {
            resolvedParts.path = parts.path;
            resolvedParts.pathComponents = pathComponents;
        }
        else
        {
            var basePathComponents = baseParts.pathComponents,
                resolvedPathComponents = basePathComponents.concat(pathComponents);
            if (!baseURL.hasDirectoryPath() && basePathComponents.length)
                resolvedPathComponents.splice(basePathComponents.length - 1, 1);
            if (pathComponents.length && (pathComponents[0] === ".." || pathComponents[0] === "."))
                standardizePathComponents(resolvedPathComponents, YES);
            resolvedParts.pathComponents = resolvedPathComponents;
            resolvedParts.path = pathFromPathComponents(resolvedPathComponents, pathComponents.length <= 0 || aURL.hasDirectoryPath());
        }
    }
    var resolvedString = URLStringFromParts(resolvedParts),
        resolvedURL = new CFURL(resolvedString);
    resolvedURL._parts = resolvedParts;
    resolvedURL._standardizedURL = resolvedURL;
    resolvedURL._standardizedString = resolvedString;
    resolvedURL._absoluteURL = resolvedURL;
    resolvedURL._absoluteString = resolvedString;
    return resolvedURL;
}
function pathFromPathComponents( pathComponents, isDirectoryPath)
{
    var path = pathComponents.join("/");
    if (path.length && path.charAt(0) === "/")
        path = path.substr(1);
    if (isDirectoryPath)
        path += "/";
    return path;
}
function standardizePathComponents( pathComponents, inPlace)
{
    var index = 0,
        resultIndex = 0,
        count = pathComponents.length,
        result = inPlace ? pathComponents : [],
        startsWithPeriod = NO;
    for (; index < count; ++index)
    {
        var component = pathComponents[index];
        if (component === "")
            continue;
        if (component === ".")
        {
            startsWithPeriod = resultIndex === 0;
            continue;
        }
        if (component !== ".." || resultIndex === 0 || result[resultIndex - 1] === "..")
        {
            result[resultIndex] = component;
            resultIndex++;
            continue;
        }
        if (resultIndex > 0 && result[resultIndex - 1] !== "/")
            --resultIndex;
    }
    if (startsWithPeriod && resultIndex === 0)
        result[resultIndex++] = ".";
    result.length = resultIndex;
    return result;
}
function URLStringFromParts( parts)
{
    var string = "",
        scheme = parts.scheme;
    if (scheme)
        string += scheme + ":";
    var authority = parts.authority;
    if (authority)
        string += "//" + authority;
    string += parts.path;
    var queryString = parts.queryString;
    if (queryString)
        string += "?" + queryString;
    var fragment = parts.fragment;
    if (fragment)
        string += "#" + fragment;
    return string;
}
CFURL.prototype.absoluteURL = function()
{
    if (this._absoluteURL === undefined)
        this._absoluteURL = resolveURL(this);
    return this._absoluteURL;
};
CFURL.prototype.absoluteURL.displayName = "CFURL.prototype.absoluteURL";
CFURL.prototype.standardizedURL = function()
{
    if (this._standardizedURL === undefined)
    {
        var parts = ((this)._parts || CFURLGetParts(this)),
            pathComponents = parts.pathComponents,
            standardizedPathComponents = standardizePathComponents(pathComponents, NO);
        var standardizedPath = pathFromPathComponents(standardizedPathComponents, this.hasDirectoryPath());
        if (parts.path === standardizedPath)
            this._standardizedURL = this;
        else
        {
            var standardizedParts = CFURLPartsCreateCopy(parts);
            standardizedParts.pathComponents = standardizedPathComponents;
            standardizedParts.path = standardizedPath;
            var standardizedURL = new CFURL(URLStringFromParts(standardizedParts), this.baseURL());
            standardizedURL._parts = standardizedParts;
            standardizedURL._standardizedURL = standardizedURL;
            this._standardizedURL = standardizedURL;
        }
    }
    return this._standardizedURL;
};
CFURL.prototype.standardizedURL.displayName = "CFURL.prototype.standardizedURL";
function CFURLPartsCreateCopy(parts)
{
    var copiedParts = { },
        count = URI_KEYS.length;
    while (count--)
    {
        var partName = URI_KEYS[count];
        copiedParts[partName] = parts[partName];
    }
    return copiedParts;
}
CFURL.prototype.string = function()
{
    return this._string;
};
CFURL.prototype.string.displayName = "CFURL.prototype.string";
CFURL.prototype.authority = function()
{
    var authority = ((this)._parts || CFURLGetParts(this)).authority;
    if (authority)
        return authority;
    var baseURL = this.baseURL();
    return baseURL && baseURL.authority() || "";
};
CFURL.prototype.authority.displayName = "CFURL.prototype.authority";
CFURL.prototype.hasDirectoryPath = function()
{
    var hasDirectoryPath = this._hasDirectoryPath;
    if (hasDirectoryPath === undefined)
    {
        var path = this.path();
        if (!path)
            return NO;
        if (path.charAt(path.length - 1) === "/")
            return YES;
        var lastPathComponent = this.lastPathComponent();
        hasDirectoryPath = lastPathComponent === "." || lastPathComponent === "..";
        this._hasDirectoryPath = hasDirectoryPath;
    }
    return hasDirectoryPath;
};
CFURL.prototype.hasDirectoryPath.displayName = "CFURL.prototype.hasDirectoryPath";
CFURL.prototype.hostName = function()
{
    return this.authority();
};
CFURL.prototype.hostName.displayName = "CFURL.prototype.hostName";
CFURL.prototype.fragment = function()
{
    return ((this)._parts || CFURLGetParts(this)).fragment;
};
CFURL.prototype.fragment.displayName = "CFURL.prototype.fragment";
CFURL.prototype.lastPathComponent = function()
{
    if (this._lastPathComponent === undefined)
    {
        var pathComponents = this.pathComponents(),
            pathComponentCount = pathComponents.length;
        if (!pathComponentCount)
            this._lastPathComponent = "";
        else
            this._lastPathComponent = pathComponents[pathComponentCount - 1];
    }
    return this._lastPathComponent;
};
CFURL.prototype.lastPathComponent.displayName = "CFURL.prototype.lastPathComponent";
CFURL.prototype.path = function()
{
    return ((this)._parts || CFURLGetParts(this)).path;
};
CFURL.prototype.path.displayName = "CFURL.prototype.path";
CFURL.prototype.createCopyDeletingLastPathComponent = function()
{
    var parts = ((this)._parts || CFURLGetParts(this)),
        components = standardizePathComponents(parts.pathComponents, NO);
    if (components.length > 0)
        if (components.length > 1 || components[0] !== "/")
            components.pop();
    var isRoot = components.length === 1 && components[0] === "/";
    parts.pathComponents = components;
    parts.path = isRoot ? "/" : pathFromPathComponents(components, NO);
    return new CFURL(URLStringFromParts(parts));
};
CFURL.prototype.createCopyDeletingLastPathComponent.displayName = "CFURL.prototype.createCopyDeletingLastPathComponent";
CFURL.prototype.pathComponents = function()
{
    return ((this)._parts || CFURLGetParts(this)).pathComponents;
};
CFURL.prototype.pathComponents.displayName = "CFURL.prototype.pathComponents";
CFURL.prototype.pathExtension = function()
{
    var lastPathComponent = this.lastPathComponent();
    if (!lastPathComponent)
        return NULL;
    lastPathComponent = lastPathComponent.replace(/^\.*/, '');
    var index = lastPathComponent.lastIndexOf(".");
    return index <= 0 ? "" : lastPathComponent.substring(index + 1);
};
CFURL.prototype.pathExtension.displayName = "CFURL.prototype.pathExtension";
CFURL.prototype.queryString = function()
{
    return ((this)._parts || CFURLGetParts(this)).queryString;
};
CFURL.prototype.queryString.displayName = "CFURL.prototype.queryString";
CFURL.prototype.scheme = function()
{
    var scheme = this._scheme;
    if (scheme === undefined)
    {
        scheme = ((this)._parts || CFURLGetParts(this)).scheme;
        if (!scheme)
        {
            var baseURL = this.baseURL();
            scheme = baseURL && baseURL.scheme();
        }
        this._scheme = scheme;
    }
    return scheme;
};
CFURL.prototype.scheme.displayName = "CFURL.prototype.scheme";
CFURL.prototype.user = function()
{
    return ((this)._parts || CFURLGetParts(this)).user;
};
CFURL.prototype.user.displayName = "CFURL.prototype.user";
CFURL.prototype.password = function()
{
    return ((this)._parts || CFURLGetParts(this)).password;
};
CFURL.prototype.password.displayName = "CFURL.prototype.password";
CFURL.prototype.portNumber = function()
{
    return ((this)._parts || CFURLGetParts(this)).portNumber;
};
CFURL.prototype.portNumber.displayName = "CFURL.prototype.portNumber";
CFURL.prototype.domain = function()
{
    return ((this)._parts || CFURLGetParts(this)).domain;
};
CFURL.prototype.domain.displayName = "CFURL.prototype.domain";
CFURL.prototype.baseURL = function()
{
    return this._baseURL;
};
CFURL.prototype.baseURL.displayName = "CFURL.prototype.baseURL";
CFURL.prototype.asDirectoryPathURL = function()
{
    if (this.hasDirectoryPath())
        return this;
    var lastPathComponent = this.lastPathComponent();
    if (lastPathComponent !== "/")
        lastPathComponent = "./" + lastPathComponent;
    return new CFURL(lastPathComponent + "/", this);
};
CFURL.prototype.asDirectoryPathURL.displayName = "CFURL.prototype.asDirectoryPathURL";
function CFURLGetResourcePropertiesForKeys( aURL)
{
    if (!aURL._resourcePropertiesForKeys)
        aURL._resourcePropertiesForKeys = new CFMutableDictionary();
    return aURL._resourcePropertiesForKeys;
}
CFURL.prototype.resourcePropertyForKey = function( aKey)
{
    return CFURLGetResourcePropertiesForKeys(this).valueForKey(aKey);
};
CFURL.prototype.resourcePropertyForKey.displayName = "CFURL.prototype.resourcePropertyForKey";
CFURL.prototype.setResourcePropertyForKey = function( aKey, aValue)
{
    CFURLGetResourcePropertiesForKeys(this).setValueForKey(aKey, aValue);
};
CFURL.prototype.setResourcePropertyForKey.displayName = "CFURL.prototype.setResourcePropertyForKey";
CFURL.prototype.staticResourceData = function()
{
    var data = new CFMutableData();
    data.setRawString(StaticResource.resourceAtURL(this).contents());
    return data;
};
CFURL.prototype.staticResourceData.displayName = "CFURL.prototype.staticResourceData";
function MarkedStream( aString)
{
    this._string = aString;
    var index = aString.indexOf(";");
    this._magicNumber = aString.substr(0, index);
    this._location = aString.indexOf(";", ++index);
    this._version = aString.substring(index, this._location++);
}
MarkedStream.prototype.magicNumber = function()
{
    return this._magicNumber;
}
MarkedStream.prototype.magicNumber.displayName = "MarkedStream.prototype.magicNumber";
MarkedStream.prototype.version = function()
{
    return this._version;
}
MarkedStream.prototype.version.displayName = "MarkedStream.prototype.version";
MarkedStream.prototype.getMarker = function()
{
    var string = this._string,
        location = this._location;
    if (location >= string.length)
        return null;
    var next = string.indexOf(';', location);
    if (next < 0)
        return null;
    var marker = string.substring(location, next);
    if (marker === 'e')
        return null;
    this._location = next + 1;
    return marker;
}
MarkedStream.prototype.getMarker.displayName = "MarkedStream.prototype.getMarker";
MarkedStream.prototype.getString = function()
{
    var string = this._string,
        location = this._location;
    if (location >= string.length)
        return null;
    var next = string.indexOf(';', location);
    if (next < 0)
        return null;
    var size = parseInt(string.substring(location, next), 10),
        text = string.substr(next + 1, size);
    this._location = next + 1 + size;
    return text;
}
MarkedStream.prototype.getString.displayName = "MarkedStream.prototype.getString";
var CFBundleUnloaded = 0,
    CFBundleLoading = 1 << 0,
    CFBundleLoadingInfoPlist = 1 << 1,
    CFBundleLoadingExecutable = 1 << 2,
    CFBundleLoadingSpritedImages = 1 << 3,
    CFBundleLoaded = 1 << 4;
var CFBundlesForURLStrings = { },
    CFBundlesForClasses = { },
    CFCacheBuster = new Date().getTime(),
    CFTotalBytesLoaded = 0,
    CPApplicationSizeInBytes = 0;
CFBundle = function( aURL)
{
    aURL = makeAbsoluteURL(aURL).asDirectoryPathURL();
    var URLString = aURL.absoluteString(),
        existingBundle = CFBundlesForURLStrings[URLString];
    if (existingBundle)
        return existingBundle;
    CFBundlesForURLStrings[URLString] = this;
    this._bundleURL = aURL;
    this._resourcesDirectoryURL = new CFURL("Resources/", aURL);
    this._staticResource = NULL;
    this._isValid = NO;
    this._loadStatus = CFBundleUnloaded;
    this._loadRequests = [];
    this._infoDictionary = new CFDictionary();
    this._eventDispatcher = new EventDispatcher(this);
}
CFBundle.displayName = "CFBundle";
CFBundle.environments = function()
{
    return ["Browser","ObjJ"];
};
CFBundle.environments.displayName = "CFBundle.environments";
CFBundle.bundleContainingURL = function( aURL)
{
    aURL = new CFURL(".", makeAbsoluteURL(aURL));
    var previousURLString,
        URLString = aURL.absoluteString();
    while (!previousURLString || previousURLString !== URLString)
    {
        var bundle = CFBundlesForURLStrings[URLString];
        if (bundle && bundle._isValid)
            return bundle;
        aURL = new CFURL("..", aURL);
        previousURLString = URLString;
        URLString = aURL.absoluteString();
    }
    return NULL;
};
CFBundle.bundleContainingURL.displayName = "CFBundle.bundleContainingURL";
CFBundle.mainBundle = function()
{
    return new CFBundle(mainBundleURL);
};
CFBundle.mainBundle.displayName = "CFBundle.mainBundle";
function addClassToBundle(aClass, aBundle)
{
    if (aBundle)
        CFBundlesForClasses[aClass.name] = aBundle;
}
function resetBundle()
{
    CFBundlesForURLStrings = { };
    CFBundlesForClasses = { };
    CFTotalBytesLoaded = 0;
    CPApplicationSizeInBytes = 0;
}
CFBundle.bundleForClass = function( aClass)
{
    return CFBundlesForClasses[aClass.name] || CFBundle.mainBundle();
};
CFBundle.bundleForClass.displayName = "CFBundle.bundleForClass";
CFBundle.prototype.bundleURL = function()
{
    return this._bundleURL;
};
CFBundle.prototype.bundleURL.displayName = "CFBundle.prototype.bundleURL";
CFBundle.prototype.resourcesDirectoryURL = function()
{
    return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourcesDirectoryURL.displayName = "CFBundle.prototype.resourcesDirectoryURL";
CFBundle.prototype.resourceURL = function( aResourceName, aType, aSubDirectory)
 {
    if (aType)
        aResourceName = aResourceName + "." + aType;
    if (aSubDirectory)
        aResourceName = aSubDirectory + "/" + aResourceName;
    var resourceURL = (new CFURL(aResourceName, this.resourcesDirectoryURL())).mappedURL();
    return resourceURL.absoluteURL();
};
CFBundle.prototype.resourceURL.displayName = "CFBundle.prototype.resourceURL";
CFBundle.prototype.mostEligibleEnvironmentURL = function()
{
    if (this._mostEligibleEnvironmentURL === undefined)
        this._mostEligibleEnvironmentURL = new CFURL(this.mostEligibleEnvironment() + ".environment/", this.bundleURL());
    return this._mostEligibleEnvironmentURL;
}
CFBundle.prototype.mostEligibleEnvironmentURL.displayName = "CFBundle.prototype.mostEligibleEnvironmentURL";
CFBundle.prototype.executableURL = function()
{
    if (this._executableURL === undefined)
    {
        var executableSubPath = this.valueForInfoDictionaryKey("CPBundleExecutable");
        if (!executableSubPath)
            this._executableURL = NULL;
        else
            this._executableURL = new CFURL(executableSubPath, this.mostEligibleEnvironmentURL());
    }
    return this._executableURL;
};
CFBundle.prototype.executableURL.displayName = "CFBundle.prototype.executableURL";
CFBundle.prototype.infoDictionary = function()
{
    return this._infoDictionary;
};
CFBundle.prototype.infoDictionary.displayName = "CFBundle.prototype.infoDictionary";
CFBundle.prototype.valueForInfoDictionaryKey = function( aKey)
{
    return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.valueForInfoDictionaryKey.displayName = "CFBundle.prototype.valueForInfoDictionaryKey";
CFBundle.prototype.hasSpritedImages = function()
{
    var environments = this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites") || [],
        index = environments.length,
        mostEligibleEnvironment = this.mostEligibleEnvironment();
    while (index--)
        if (environments[index] === mostEligibleEnvironment)
            return YES;
    return NO;
};
CFBundle.prototype.hasSpritedImages.displayName = "CFBundle.prototype.hasSpritedImages";
CFBundle.prototype.environments = function()
{
    return this._infoDictionary.valueForKey("CPBundleEnvironments") || ["ObjJ"];
};
CFBundle.prototype.environments.displayName = "CFBundle.prototype.environments";
CFBundle.prototype.mostEligibleEnvironment = function( environments)
{
    environments = environments || this.environments();
    var objj_environments = CFBundle.environments(),
        index = 0,
        count = objj_environments.length,
        innerCount = environments.length;
    for(; index < count; ++index)
    {
        var innerIndex = 0,
            environment = objj_environments[index];
        for (; innerIndex < innerCount; ++innerIndex)
            if(environment === environments[innerIndex])
                return environment;
    }
    return NULL;
};
CFBundle.prototype.mostEligibleEnvironment.displayName = "CFBundle.prototype.mostEligibleEnvironment";
CFBundle.prototype.isLoading = function()
{
    return this._loadStatus & CFBundleLoading;
};
CFBundle.prototype.isLoading.displayName = "CFBundle.prototype.isLoading";
CFBundle.prototype.isLoaded = function()
{
    return !!(this._loadStatus & CFBundleLoaded);
};
CFBundle.prototype.isLoaded.displayName = "CFBundle.prototype.isLoaded";
CFBundle.prototype.load = function( shouldExecute)
{
    if (this._loadStatus !== CFBundleUnloaded)
        return;
    this._loadStatus = CFBundleLoading | CFBundleLoadingInfoPlist;
    var self = this,
        bundleURL = this.bundleURL(),
        parentURL = new CFURL("..", bundleURL);
    if (parentURL.absoluteString() === bundleURL.absoluteString())
        parentURL = parentURL.schemeAndAuthority();
    StaticResource.resolveResourceAtURL(parentURL, YES, function(aStaticResource)
    {
        var resourceName = bundleURL.absoluteURL().lastPathComponent();
        self._staticResource = aStaticResource._children[resourceName] ||
                                new StaticResource(bundleURL, aStaticResource, YES, NO);
        function onsuccess( anEvent)
        {
            self._loadStatus &= ~CFBundleLoadingInfoPlist;
            var infoDictionary = anEvent.request.responsePropertyList();
            self._isValid = !!infoDictionary || CFBundle.mainBundle() === self;
            if (infoDictionary)
                self._infoDictionary = infoDictionary;
            if (!self._infoDictionary)
            {
                finishBundleLoadingWithError(self, new Error("Could not load bundle at \"" + path + "\""));
                return;
            }
            if (self === CFBundle.mainBundle() && self.valueForInfoDictionaryKey("CPApplicationSize"))
                CPApplicationSizeInBytes = self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable") || 0;
            loadExecutableAndResources(self, shouldExecute);
        }
        function onfailure()
        {
            self._isValid = CFBundle.mainBundle() === self;
            self._loadStatus = CFBundleUnloaded;
            finishBundleLoadingWithError(self, new Error("Could not load bundle at \"" + self.bundleURL() + "\""));
        }
        new FileRequest(new CFURL("Info.plist", self.bundleURL()), onsuccess, onfailure);
    });
};
CFBundle.prototype.load.displayName = "CFBundle.prototype.load";
function finishBundleLoadingWithError( aBundle, anError)
{
    resolveStaticResource(aBundle._staticResource);
    aBundle._eventDispatcher.dispatchEvent(
    {
        type:"error",
        error:anError,
        bundle:aBundle
    });
}
function loadExecutableAndResources( aBundle, shouldExecute)
{
    if (!aBundle.mostEligibleEnvironment())
        return failure();
    loadExecutableForBundle(aBundle, success, failure);
    loadSpritedImagesForBundle(aBundle, success, failure);
    if (aBundle._loadStatus === CFBundleLoading)
        return success();
    function failure( anError)
    {
        var loadRequests = aBundle._loadRequests,
            count = loadRequests.length;
        while (count--)
            loadRequests[count].abort();
        this._loadRequests = [];
        aBundle._loadStatus = CFBundleUnloaded;
        finishBundleLoadingWithError(aBundle, anError || new Error("Could not recognize executable code format in Bundle " + aBundle));
    }
    function success()
    {
        if ((typeof CPApp === "undefined" || !CPApp || !CPApp._finishedLaunching) &&
             typeof OBJJ_PROGRESS_CALLBACK === "function" && CPApplicationSizeInBytes)
        {
            OBJJ_PROGRESS_CALLBACK(MAX(MIN(1.0, CFTotalBytesLoaded / CPApplicationSizeInBytes), 0.0), CPApplicationSizeInBytes, aBundle.bundlePath());
        }
        if (aBundle._loadStatus === CFBundleLoading)
            aBundle._loadStatus = CFBundleLoaded;
        else
            return;
        resolveStaticResource(aBundle._staticResource);
        function complete()
        {
            aBundle._eventDispatcher.dispatchEvent(
            {
                type:"load",
                bundle:aBundle
            });
        }
        if (shouldExecute)
            executeBundle(aBundle, complete);
        else
            complete();
    }
}
function loadExecutableForBundle( aBundle, success, failure)
{
    var executableURL = aBundle.executableURL();
    if (!executableURL)
        return;
    aBundle._loadStatus |= CFBundleLoadingExecutable;
    new FileRequest(executableURL, function( anEvent)
    {
        try
        {
            CFTotalBytesLoaded += anEvent.request.responseText().length;
            decompileStaticFile(aBundle, anEvent.request.responseText(), executableURL);
            aBundle._loadStatus &= ~CFBundleLoadingExecutable;
            success();
        }
        catch(anException)
        {
            failure(anException);
        }
    }, failure);
}
function spritedImagesTestURLStringForBundle( aBundle)
{
    return "mhtml:" + new CFURL("MHTMLTest.txt", aBundle.mostEligibleEnvironmentURL());
}
function spritedImagesURLForBundle( aBundle)
{
    if (CFBundleSupportedSpriteType === CFBundleDataURLSpriteType)
        return new CFURL("dataURLs.txt", aBundle.mostEligibleEnvironmentURL());
    if (CFBundleSupportedSpriteType === CFBundleMHTMLSpriteType ||
        CFBundleSupportedSpriteType === CFBundleMHTMLUncachedSpriteType)
        return new CFURL("MHTMLPaths.txt", aBundle.mostEligibleEnvironmentURL());
    return NULL;
}
function loadSpritedImagesForBundle( aBundle, success, failure)
{
    if (!aBundle.hasSpritedImages())
        return;
    aBundle._loadStatus |= CFBundleLoadingSpritedImages;
    if (!CFBundleHasTestedSpriteSupport())
        return CFBundleTestSpriteSupport(spritedImagesTestURLStringForBundle(aBundle), function()
        {
            loadSpritedImagesForBundle(aBundle, success, failure);
        });
    var spritedImagesURL = spritedImagesURLForBundle(aBundle);
    if (!spritedImagesURL)
    {
        aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
        return success();
    }
    new FileRequest(spritedImagesURL, function( anEvent)
    {
        try
        {
            CFTotalBytesLoaded += anEvent.request.responseText().length;
            decompileStaticFile(aBundle, anEvent.request.responseText(), spritedImagesURL);
            aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
        }
        catch(anException)
        {
            failure(anException);
        }
        success();
    }, failure);
}
var CFBundleSpriteSupportListeners = [],
    CFBundleSupportedSpriteType = -1,
    CFBundleNoSpriteType = 0,
    CFBundleDataURLSpriteType = 1,
    CFBundleMHTMLSpriteType = 2,
    CFBundleMHTMLUncachedSpriteType = 3;
function CFBundleHasTestedSpriteSupport()
{
    return CFBundleSupportedSpriteType !== -1;
}
function CFBundleTestSpriteSupport( MHTMLPath, aCallback)
{
    if (CFBundleHasTestedSpriteSupport())
        return;
    CFBundleSpriteSupportListeners.push(aCallback);
    if (CFBundleSpriteSupportListeners.length > 1)
        return;
    CFBundleSpriteSupportListeners.push(function()
    {
        var size = 0,
            sizeDictionary = CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
        if (!sizeDictionary)
            return;
        switch (CFBundleSupportedSpriteType)
        {
            case CFBundleDataURLSpriteType:
                size = sizeDictionary.valueForKey("data");
                break;
            case CFBundleMHTMLSpriteType:
            case CFBundleMHTMLUncachedSpriteType:
                size = sizeDictionary.valueForKey("mhtml");
                break;
        }
        CPApplicationSizeInBytes += size;
    });
    CFBundleTestSpriteTypes([
        CFBundleDataURLSpriteType,
        "data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        CFBundleMHTMLSpriteType,
        MHTMLPath+"!test",
        CFBundleMHTMLUncachedSpriteType,
        MHTMLPath+"?"+CFCacheBuster+"!test"
    ]);
}
function CFBundleNotifySpriteSupportListeners()
{
    var count = CFBundleSpriteSupportListeners.length;
    while (count--)
        CFBundleSpriteSupportListeners[count]();
}
function CFBundleTestSpriteTypes( spriteTypes)
{
    if (!("Image" in global) || spriteTypes.length < 2)
    {
        CFBundleSupportedSpriteType = CFBundleNoSpriteType;
        CFBundleNotifySpriteSupportListeners();
        return;
    }
    var image = new Image();
    image.onload = function()
    {
        if (image.width === 1 && image.height === 1)
        {
            CFBundleSupportedSpriteType = spriteTypes[0];
            CFBundleNotifySpriteSupportListeners();
        }
        else
            image.onerror();
    };
    image.onerror = function()
    {
        CFBundleTestSpriteTypes(spriteTypes.slice(2));
    };
    image.src = spriteTypes[1];
}
function executeBundle( aBundle, aCallback)
{
    var staticResources = [aBundle._staticResource];
    function executeStaticResources(index)
    {
        for (; index < staticResources.length; ++index)
        {
            var staticResource = staticResources[index];
            if (staticResource.isNotFound())
                continue;
            if (staticResource.isFile())
            {
                var executable = new FileExecutable(staticResource.URL());
                if (executable.hasLoadedFileDependencies())
                    executable.execute();
                else
                {
                    executable.loadFileDependencies(function()
                    {
                        executeStaticResources(index);
                    });
                    return;
                }
            }
            else
            {
                if (staticResource.URL().absoluteString() === aBundle.resourcesDirectoryURL().absoluteString())
                    continue;
                var children = staticResource.children();
                for (var name in children)
                    if (hasOwnProperty.call(children, name))
                        staticResources.push(children[name]);
            }
        }
        aCallback();
    }
    executeStaticResources(0);
}
var STATIC_MAGIC_NUMBER = "@STATIC",
    MARKER_PATH = "p",
    MARKER_URI = "u",
    MARKER_CODE = "c",
    MARKER_TEXT = "t",
    MARKER_IMPORT_STD = 'I',
    MARKER_IMPORT_LOCAL = 'i';
function decompileStaticFile( aBundle, aString, aPath)
{
    var stream = new MarkedStream(aString);
    if (stream.magicNumber() !== STATIC_MAGIC_NUMBER)
        throw new Error("Could not read static file: " + aPath);
    if (stream.version() !== "1.0")
        throw new Error("Could not read static file: " + aPath);
    var marker,
        bundleURL = aBundle.bundleURL(),
        file = NULL;
    while (marker = stream.getMarker())
    {
        var text = stream.getString();
        if (marker === MARKER_PATH)
        {
            var fileURL = new CFURL(text, bundleURL),
                parent = StaticResource.resourceAtURL(new CFURL(".", fileURL), YES);
            file = new StaticResource(fileURL, parent, NO, YES);
        }
        else if (marker === MARKER_URI)
        {
            var URL = new CFURL(text, bundleURL),
                mappedURLString = stream.getString();
            if (mappedURLString.indexOf("mhtml:") === 0)
            {
                mappedURLString = "mhtml:" + new CFURL(mappedURLString.substr("mhtml:".length), bundleURL);
                if (CFBundleSupportedSpriteType === CFBundleMHTMLUncachedSpriteType)
                {
                    var exclamationIndex = mappedURLString.indexOf("!"),
                        firstPart = mappedURLString.substring(0, exclamationIndex),
                        lastPart = mappedURLString.substring(exclamationIndex);
                    mappedURLString = firstPart + "?" + CFCacheBuster + lastPart;
                }
            }
            CFURL.setMappedURLForURL(URL, new CFURL(mappedURLString));
            var parent = StaticResource.resourceAtURL(new CFURL(".", URL), YES);
            new StaticResource(URL, parent, NO, YES);
        }
        else if (marker === MARKER_TEXT)
            file.write(text);
    }
}
CFBundle.prototype.addEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.addEventListener(anEventName, anEventListener);
};
CFBundle.prototype.addEventListener.displayName = "CFBundle.prototype.addEventListener";
CFBundle.prototype.removeEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.removeEventListener(anEventName, anEventListener);
};
CFBundle.prototype.removeEventListener.displayName = "CFBundle.prototype.removeEventListener";
CFBundle.prototype.onerror = function( anEvent)
{
    throw anEvent.error;
};
CFBundle.prototype.onerror.displayName = "CFBundle.prototype.onerror";
CFBundle.prototype.bundlePath = function()
{
    return this._bundleURL.absoluteURL().path();
};
CFBundle.prototype.path = function()
{
    CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
    return this.bundlePath.apply(this, arguments);
};
CFBundle.prototype.pathForResource = function(aResource)
{
    return this.resourceURL(aResource).absoluteString();
};
var rootResources = { };
function StaticResource( aURL, aParent, isDirectory, isResolved, aFilenameTranslateDictionary)
{
    this._parent = aParent;
    this._eventDispatcher = new EventDispatcher(this);
    var name = aURL.absoluteURL().lastPathComponent() || aURL.schemeAndAuthority();
    this._name = name;
    this._URL = aURL;
    this._isResolved = !!isResolved;
    this._filenameTranslateDictionary = aFilenameTranslateDictionary;
    if (isDirectory)
        this._URL = this._URL.asDirectoryPathURL();
    if (!aParent)
        rootResources[name] = this;
    this._isDirectory = !!isDirectory;
    this._isNotFound = NO;
    if (aParent)
        aParent._children[name] = this;
    if (isDirectory)
        this._children = { };
    else
        this._contents = "";
}
StaticResource.rootResources = function()
{
    return rootResources;
};
function countProp(x) {
    var count = 0;
    for (var k in x) {
        if (x.hasOwnProperty(k)) {
            ++count;
        }
    }
    return count;
}
StaticResource.resetRootResources = function()
{
    rootResources = {};
};
StaticResource.prototype.filenameTranslateDictionary = function()
{
    return this._filenameTranslateDictionary || {};
};
exports.StaticResource = StaticResource;
function resolveStaticResource( aResource)
{
    aResource._isResolved = YES;
    aResource._eventDispatcher.dispatchEvent(
    {
        type:"resolve",
        staticResource:aResource
    });
}
StaticResource.prototype.resolve = function()
{
    if (this.isDirectory())
    {
        var bundle = new CFBundle(this.URL());
        bundle.onerror = function() { };
        bundle.load(NO);
    }
    else
    {
        var self = this;
        function onsuccess( anEvent)
        {
            self._contents = anEvent.request.responseText();
            resolveStaticResource(self);
        }
        function onfailure()
        {
            self._isNotFound = YES;
            resolveStaticResource(self);
        }
        var url = this.URL(),
            aFilenameTranslateDictionary = this.filenameTranslateDictionary();
        if (aFilenameTranslateDictionary)
        {
            var urlString = url.toString(),
                lastPathComponent = url.lastPathComponent(),
                basePath = urlString.substring(0, urlString.length - lastPathComponent.length),
                translatedName = aFilenameTranslateDictionary[lastPathComponent];
            if (translatedName && urlString.slice(-translatedName.length) !== translatedName)
                url = new CFURL(basePath + translatedName);
        }
        new FileRequest(url, onsuccess, onfailure);
    }
};
StaticResource.prototype.name = function()
{
    return this._name;
};
StaticResource.prototype.URL = function()
{
    return this._URL;
};
StaticResource.prototype.contents = function()
{
    return this._contents;
};
StaticResource.prototype.children = function()
{
    return this._children;
};
StaticResource.prototype.parent = function()
{
    return this._parent;
};
StaticResource.prototype.isResolved = function()
{
    return this._isResolved;
};
StaticResource.prototype.write = function( aString)
{
    this._contents += aString;
};
function rootResourceForAbsoluteURL( anAbsoluteURL)
{
    var schemeAndAuthority = anAbsoluteURL.schemeAndAuthority(),
        resource = rootResources[schemeAndAuthority];
    if (!resource)
        resource = new StaticResource(new CFURL(schemeAndAuthority), NULL, YES, YES);
    return resource;
}
StaticResource.resourceAtURL = function( aURL, resolveAsDirectoriesIfNecessary)
{
    aURL = makeAbsoluteURL(aURL).absoluteURL();
    var resource = rootResourceForAbsoluteURL(aURL),
        components = aURL.pathComponents(),
        index = 0,
        count = components.length;
    for (; index < count; ++index)
    {
        var name = components[index];
        if (hasOwnProperty.call(resource._children, name))
            resource = resource._children[name];
        else if (resolveAsDirectoriesIfNecessary)
        {
            if (name !== "/")
                name = "./" + name;
            resource = new StaticResource(new CFURL(name, resource.URL()), resource, YES, YES);
        }
        else
            throw new Error("Static Resource at " + aURL + " is not resolved (\"" + name + "\")");
    }
    return resource;
};
StaticResource.prototype.resourceAtURL = function( aURL, resolveAsDirectoriesIfNecessary)
{
    return StaticResource.resourceAtURL(new CFURL(aURL, this.URL()), resolveAsDirectoriesIfNecessary);
};
StaticResource.resolveResourceAtURL = function( aURL, isDirectory, aCallback, aFilenameTranslateDictionary)
{
    aURL = makeAbsoluteURL(aURL).absoluteURL();
    resolveResourceComponents(rootResourceForAbsoluteURL(aURL), isDirectory, aURL.pathComponents(), 0, aCallback, aFilenameTranslateDictionary);
};
StaticResource.prototype.resolveResourceAtURL = function( aURL, isDirectory, aCallback)
{
    StaticResource.resolveResourceAtURL(new CFURL(aURL, this.URL()).absoluteURL(), isDirectory, aCallback);
};
function resolveResourceComponents( aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary)
{
    var count = components.length;
    for (; index < count; ++index)
    {
        var name = components[index],
            child = hasOwnProperty.call(aResource._children, name) && aResource._children[name];
        if (!child)
        {
            child = new StaticResource(new CFURL(name, aResource.URL()), aResource, index + 1 < count || isDirectory , NO, aFilenameTranslateDictionary);
            child.resolve();
        }
        if (!child.isResolved())
            return child.addEventListener("resolve", function()
            {
                resolveResourceComponents(aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary);
            });
        if (child.isNotFound())
            return aCallback(null, new Error("File not found: " + components.join("/")));
        if ((index + 1 < count) && child.isFile())
            return aCallback(null, new Error("File is not a directory: " + components.join("/")));
        aResource = child;
    }
    aCallback(aResource);
}
function resolveResourceAtURLSearchingIncludeURLs( aURL, anIndex, aCallback)
{
    var includeURLs = StaticResource.includeURLs(),
        searchURL = new CFURL(aURL, includeURLs[anIndex]).absoluteURL();
    StaticResource.resolveResourceAtURL(searchURL, NO, function( aStaticResource)
    {
        if (!aStaticResource)
        {
            if (anIndex + 1 < includeURLs.length)
                resolveResourceAtURLSearchingIncludeURLs(aURL, anIndex + 1, aCallback);
            else
                aCallback(NULL);
            return;
        }
        aCallback(aStaticResource);
    });
}
StaticResource.resolveResourceAtURLSearchingIncludeURLs = function( aURL, aCallback)
{
    resolveResourceAtURLSearchingIncludeURLs(aURL, 0, aCallback);
};
StaticResource.prototype.addEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.addEventListener(anEventName, anEventListener);
};
StaticResource.prototype.removeEventListener = function( anEventName, anEventListener)
{
    this._eventDispatcher.removeEventListener(anEventName, anEventListener);
};
StaticResource.prototype.isNotFound = function()
{
    return this._isNotFound;
};
StaticResource.prototype.isFile = function()
{
    return !this._isDirectory;
};
StaticResource.prototype.isDirectory = function()
{
    return this._isDirectory;
};
StaticResource.prototype.toString = function( includeNotFounds)
{
    if (this.isNotFound())
        return "<file not found: " + this.name() + ">";
    var string = this.name();
    if (this.isDirectory())
    {
        var children = this._children;
        for (var name in children)
            if (children.hasOwnProperty(name))
            {
                var child = children[name];
                if (includeNotFounds || !child.isNotFound())
                    string += "\n\t" + children[name].toString(includeNotFounds).split('\n').join("\n\t");
            }
    }
    return string;
};
var includeURLs = NULL;
StaticResource.includeURLs = function()
{
    if (includeURLs !== NULL)
        return includeURLs;
    includeURLs = [];
    if (!global.OBJJ_INCLUDE_PATHS && !global.OBJJ_INCLUDE_URLS)
        includeURLs = ["Frameworks", "Frameworks/Debug"];
    else
        includeURLs = (global.OBJJ_INCLUDE_PATHS || []).concat(global.OBJJ_INCLUDE_URLS || []);
    var count = includeURLs.length;
    while (count--)
        includeURLs[count] = new CFURL(includeURLs[count]).asDirectoryPathURL();
    return includeURLs;
};
var TOKEN_ACCESSORS = "accessors",
    TOKEN_CLASS = "class",
    TOKEN_END = "end",
    TOKEN_FUNCTION = "function",
    TOKEN_IMPLEMENTATION = "implementation",
    TOKEN_IMPORT = "import",
    TOKEN_EACH = "each",
    TOKEN_OUTLET = "outlet",
    TOKEN_ACTION = "action",
    TOKEN_NEW = "new",
    TOKEN_SELECTOR = "selector",
    TOKEN_SUPER = "super",
    TOKEN_VAR = "var",
    TOKEN_IN = "in",
    TOKEN_PRAGMA = "pragma",
    TOKEN_MARK = "mark",
    TOKEN_EQUAL = '=',
    TOKEN_PLUS = '+',
    TOKEN_MINUS = '-',
    TOKEN_COLON = ':',
    TOKEN_COMMA = ',',
    TOKEN_PERIOD = '.',
    TOKEN_ASTERISK = '*',
    TOKEN_SEMICOLON = ';',
    TOKEN_LESS_THAN = '<',
    TOKEN_OPEN_BRACE = '{',
    TOKEN_CLOSE_BRACE = '}',
    TOKEN_GREATER_THAN = '>',
    TOKEN_OPEN_BRACKET = '[',
    TOKEN_DOUBLE_QUOTE = '"',
    TOKEN_PREPROCESSOR = '@',
    TOKEN_HASH = '#',
    TOKEN_CLOSE_BRACKET = ']',
    TOKEN_QUESTION_MARK = '?',
    TOKEN_OPEN_PARENTHESIS = '(',
    TOKEN_CLOSE_PARENTHESIS = ')',
    TOKEN_WHITESPACE = /^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,
    TOKEN_NUMBER = /^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,
    TOKEN_IDENTIFIER = /^[a-zA-Z_$](\w|$)*$/;
function Lexer( aString)
{
    this._index = -1;
    this._tokens = (aString + '\n').match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
    this._context = [];
    return this;
}
Lexer.prototype.push = function()
{
    this._context.push(this._index);
}
Lexer.prototype.pop = function()
{
    this._index = this._context.pop();
}
Lexer.prototype.peek = function(shouldSkipWhitespace)
{
    if (shouldSkipWhitespace)
    {
        this.push();
        var token = this.skip_whitespace();
        this.pop();
        return token;
    }
    return this._tokens[this._index + 1];
}
Lexer.prototype.next = function()
{
    return this._tokens[++this._index];
}
Lexer.prototype.previous = function()
{
    return this._tokens[--this._index];
}
Lexer.prototype.last = function()
{
    if (this._index < 0)
        return NULL;
    return this._tokens[this._index - 1];
}
Lexer.prototype.skip_whitespace = function(shouldMoveBackwards)
{
    var token;
    if (shouldMoveBackwards)
        while ((token = this.previous()) && TOKEN_WHITESPACE.test(token)) ;
    else
        while ((token = this.next()) && TOKEN_WHITESPACE.test(token)) ;
    return token;
}
exports.Lexer = Lexer;
function StringBuffer()
{
    this.atoms = [];
}
StringBuffer.prototype.toString = function()
{
    return this.atoms.join("");
}
exports.preprocess = function( aString, aURL, flags)
{
    return new Preprocessor(aString, aURL, flags).executable();
}
exports.eval = function( aString)
{
    return eval(exports.preprocess(aString).code());
}
var Preprocessor = function( aString, aURL, flags)
{
    this._URL = new CFURL(aURL);
    aString = aString.replace(/^#[^\n]+\n/, "\n");
    this._currentSelector = "";
    this._currentClass = "";
    this._currentSuperClass = "";
    this._currentSuperMetaClass = "";
    this._buffer = new StringBuffer();
    this._preprocessed = NULL;
    this._dependencies = [];
    this._tokens = new Lexer(aString);
    this._flags = flags;
    this._classMethod = false;
    this._executable = NULL;
    this._classLookupTable = {};
    this._classVars = {};
    var classObject = new objj_class();
    for (var i in classObject)
        this._classVars[i] = 1;
    this.preprocess(this._tokens, this._buffer);
}
Preprocessor.prototype.setClassInfo = function(className, superClassName, ivars)
{
    this._classLookupTable[className] = { superClassName:superClassName, ivars:ivars };
}
Preprocessor.prototype.getClassInfo = function(className)
{
    return this._classLookupTable[className];
}
Preprocessor.prototype.allIvarNamesForClassName = function(className)
{
    var names = {},
        classInfo = this.getClassInfo(className);
    while (classInfo)
    {
        for (var i in classInfo.ivars)
            names[i] = 1;
        classInfo = this.getClassInfo(classInfo.superClassName);
    }
    return names;
}
exports.Preprocessor = Preprocessor;
Preprocessor.Flags = { };
Preprocessor.Flags.IncludeDebugSymbols = 1 << 0;
Preprocessor.Flags.IncludeTypeSignatures = 1 << 1;
Preprocessor.prototype.executable = function()
{
    if (!this._executable)
        this._executable = new Executable(this._buffer.toString(), this._dependencies, this._URL);
    return this._executable;
}
Preprocessor.prototype.accessors = function(tokens)
{
    var token = tokens.skip_whitespace(),
        attributes = {};
    if (token != TOKEN_OPEN_PARENTHESIS)
    {
        tokens.previous();
        return attributes;
    }
    while ((token = tokens.skip_whitespace()) != TOKEN_CLOSE_PARENTHESIS)
    {
        var name = token,
            value = true;
        if (!/^\w+$/.test(name))
            throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
        if ((token = tokens.skip_whitespace()) == TOKEN_EQUAL)
        {
            value = tokens.skip_whitespace();
            if (!/^\w+$/.test(value))
                throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
            if (name == "setter")
            {
                if ((token = tokens.next()) != TOKEN_COLON)
                    throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
                value += ":";
            }
            token = tokens.skip_whitespace();
        }
        attributes[name] = value;
        if (token == TOKEN_CLOSE_PARENTHESIS)
            break;
        if (token != TOKEN_COMMA)
            throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
    }
    return attributes;
}
Preprocessor.prototype.brackets = function( tokens, aStringBuffer)
{
    var tuples = [];
    while (this.preprocess(tokens, NULL, NULL, NULL, tuples[tuples.length] = [])) ;
    if (tuples[0].length === 1)
    {
        aStringBuffer.atoms[aStringBuffer.atoms.length] = '[';
        aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
        aStringBuffer.atoms[aStringBuffer.atoms.length] = ']';
    }
    else
    {
        var selector = new StringBuffer();
        if (tuples[0][0].atoms[0] == TOKEN_SUPER)
        {
            aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSendSuper(";
            aStringBuffer.atoms[aStringBuffer.atoms.length] = "{ receiver:self, super_class:" + (this._classMethod ? this._currentSuperMetaClass : this._currentSuperClass ) + " }";
        }
        else
        {
            aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSend(";
            aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
        }
        selector.atoms[selector.atoms.length] = tuples[0][1];
        var index = 1,
            count = tuples.length,
            marg_list = new StringBuffer();
        for(; index < count; ++index)
        {
            var pair = tuples[index];
            selector.atoms[selector.atoms.length] = pair[1];
            marg_list.atoms[marg_list.atoms.length] = ", " + pair[0];
        }
        aStringBuffer.atoms[aStringBuffer.atoms.length] = ", \"";
        aStringBuffer.atoms[aStringBuffer.atoms.length] = selector;
        aStringBuffer.atoms[aStringBuffer.atoms.length] = '\"';
        aStringBuffer.atoms[aStringBuffer.atoms.length] = marg_list;
        aStringBuffer.atoms[aStringBuffer.atoms.length] = ')';
    }
}
Preprocessor.prototype.directive = function(tokens, aStringBuffer, allowedDirectivesFlags)
{
    var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
        token = tokens.next();
    if (token.charAt(0) == TOKEN_DOUBLE_QUOTE)
        buffer.atoms[buffer.atoms.length] = token;
    else if (token === TOKEN_CLASS)
    {
        tokens.skip_whitespace();
        return;
    }
    else if (token === TOKEN_IMPLEMENTATION)
        this.implementation(tokens, buffer);
    else if (token === TOKEN_IMPORT)
        this._import(tokens);
    else if (token === TOKEN_SELECTOR)
        this.selector(tokens, buffer);
    if (!aStringBuffer)
        return buffer;
}
Preprocessor.prototype.hash = function(tokens, aStringBuffer)
{
    var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
        token = tokens.next();
    if (token === TOKEN_PRAGMA)
    {
        token = tokens.skip_whitespace();
        if (token === TOKEN_MARK)
        {
            while ((token = tokens.next()).indexOf("\n") < 0);
        }
    }
    else
        throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \"" + token + "\"."));
}
Preprocessor.prototype.implementation = function(tokens, aStringBuffer)
{
    var buffer = aStringBuffer,
        token = "",
        category = NO,
        class_name = tokens.skip_whitespace(),
        superclass_name = "Nil",
        instance_methods = new StringBuffer(),
        class_methods = new StringBuffer();
    if (!(/^\w/).test(class_name))
        throw new Error(this.error_message("*** Expected class name, found \"" + class_name + "\"."));
    this._currentSuperClass = "objj_getClass(\"" + class_name + "\").super_class";
    this._currentSuperMetaClass = "objj_getMetaClass(\"" + class_name + "\").super_class";
    this._currentClass = class_name;
    this._currentSelector = "";
    if ((token = tokens.skip_whitespace()) == TOKEN_OPEN_PARENTHESIS)
    {
        token = tokens.skip_whitespace();
        if (token == TOKEN_CLOSE_PARENTHESIS)
            throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \"" + class_name + "\"."));
        if (tokens.skip_whitespace() != TOKEN_CLOSE_PARENTHESIS)
            throw new SyntaxError(this.error_message("*** Improper Category Definition for class \"" + class_name + "\"."));
        buffer.atoms[buffer.atoms.length] = "{\nvar the_class = objj_getClass(\"" + class_name + "\")\n";
        buffer.atoms[buffer.atoms.length] = "if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\"" + class_name + "\\\"\");\n";
        buffer.atoms[buffer.atoms.length] = "var meta_class = the_class.isa;";
    }
    else
    {
        if(token == TOKEN_COLON)
        {
            token = tokens.skip_whitespace();
            if (!TOKEN_IDENTIFIER.test(token))
                throw new SyntaxError(this.error_message("*** Expected class name, found \"" + token + "\"."));
            superclass_name = token;
            token = tokens.skip_whitespace();
        }
        buffer.atoms[buffer.atoms.length] = "{var the_class = objj_allocateClassPair(" + superclass_name + ", \"" + class_name + "\"),\nmeta_class = the_class.isa;";
        if (token == TOKEN_OPEN_BRACE)
        {
            var ivar_names = {},
                ivar_count = 0,
                declaration = [],
                attributes,
                accessors = {},
                types = [];
            while((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_BRACE)
            {
                if (token === TOKEN_PREPROCESSOR)
                {
                    token = tokens.next();
                    if (token === TOKEN_ACCESSORS)
                        attributes = this.accessors(tokens);
                    else if (token !== TOKEN_OUTLET)
                        throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+token+"')."));
                    else
                        types.push("@" + token);
                }
                else if (token == TOKEN_SEMICOLON)
                {
                    if (ivar_count++ === 0)
                        buffer.atoms[buffer.atoms.length] = "class_addIvars(the_class, [";
                    else
                        buffer.atoms[buffer.atoms.length] = ", ";
                    var name = declaration[declaration.length - 1];
                    if (this._flags & Preprocessor.Flags.IncludeTypeSignatures)
                        buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\", \"" + types.slice(0, types.length - 1). join(" ") + "\")";
                    else
                        buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\")";
                    ivar_names[name] = 1;
                    declaration = [];
                    types = [];
                    if (attributes)
                    {
                        accessors[name] = attributes;
                        attributes = NULL;
                    }
                }
                else
                {
                    declaration.push(token);
                    types.push(token);
                }
            }
            if (declaration.length)
                throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
            if (ivar_count)
                buffer.atoms[buffer.atoms.length] = "]);\n";
            if (!token)
                throw new SyntaxError(this.error_message("*** Expected '}'"));
            this.setClassInfo(class_name, superclass_name === "Nil" ? null : superclass_name, ivar_names);
            var ivar_names = this.allIvarNamesForClassName(class_name);
            for (ivar_name in accessors)
            {
                var accessor = accessors[ivar_name],
                    property = accessor["property"] || ivar_name;
                var getterName = accessor["getter"] || property,
                    getterCode = "(id)" + getterName + "\n{\nreturn " + ivar_name + ";\n}";
                if (instance_methods.atoms.length !== 0)
                    instance_methods.atoms[instance_methods.atoms.length] = ",\n";
                instance_methods.atoms[instance_methods.atoms.length] = this.method(new Lexer(getterCode), ivar_names);
                if (accessor["readonly"])
                    continue;
                var setterName = accessor["setter"];
                if (!setterName)
                {
                    var start = property.charAt(0) == '_' ? 1 : 0;
                    setterName = (start ? "_" : "") + "set" + property.substr(start, 1).toUpperCase() + property.substring(start + 1) + ":";
                }
                var setterCode = "(void)" + setterName + "(id)newValue\n{\n";
                if (accessor["copy"])
                    setterCode += "if (" + ivar_name + " !== newValue)\n" + ivar_name + " = [newValue copy];\n}";
                else
                    setterCode += ivar_name + " = newValue;\n}";
                if (instance_methods.atoms.length !== 0)
                    instance_methods.atoms[instance_methods.atoms.length] = ",\n";
                instance_methods.atoms[instance_methods.atoms.length] = this.method(new Lexer(setterCode), ivar_names);
            }
        }
        else
            tokens.previous();
        buffer.atoms[buffer.atoms.length] = "objj_registerClassPair(the_class);\n";
    }
    if (!ivar_names)
        var ivar_names = this.allIvarNamesForClassName(class_name);
    while ((token = tokens.skip_whitespace()))
    {
        if (token == TOKEN_PLUS)
        {
            this._classMethod = true;
            if (class_methods.atoms.length !== 0)
                class_methods.atoms[class_methods.atoms.length] = ", ";
            class_methods.atoms[class_methods.atoms.length] = this.method(tokens, this._classVars);
        }
        else if (token == TOKEN_MINUS)
        {
            this._classMethod = false;
            if (instance_methods.atoms.length !== 0)
                instance_methods.atoms[instance_methods.atoms.length] = ", ";
            instance_methods.atoms[instance_methods.atoms.length] = this.method(tokens, ivar_names);
        }
        else if (token == TOKEN_HASH)
        {
            this.hash(tokens, buffer);
        }
        else if (token == TOKEN_PREPROCESSOR)
        {
            if ((token = tokens.next()) == TOKEN_END)
                break;
            else
                throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@" + token + "\"."));
        }
    }
    if (instance_methods.atoms.length !== 0)
    {
        buffer.atoms[buffer.atoms.length] = "class_addMethods(the_class, [";
        buffer.atoms[buffer.atoms.length] = instance_methods;
        buffer.atoms[buffer.atoms.length] = "]);\n";
    }
    if (class_methods.atoms.length !== 0)
    {
        buffer.atoms[buffer.atoms.length] = "class_addMethods(meta_class, [";
        buffer.atoms[buffer.atoms.length] = class_methods;
        buffer.atoms[buffer.atoms.length] = "]);\n";
    }
    buffer.atoms[buffer.atoms.length] = '}';
    this._currentClass = "";
}
Preprocessor.prototype._import = function(tokens)
{
    var URLString = "",
        token = tokens.skip_whitespace(),
        isQuoted = (token !== TOKEN_LESS_THAN);
    if (token === TOKEN_LESS_THAN)
    {
        while ((token = tokens.next()) && token !== TOKEN_GREATER_THAN)
            URLString += token;
        if (!token)
            throw new SyntaxError(this.error_message("*** Unterminated import statement."));
    }
    else if (token.charAt(0) === TOKEN_DOUBLE_QUOTE)
        URLString = token.substr(1, token.length - 2);
    else
        throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \"" + token + "\"."));
    this._buffer.atoms[this._buffer.atoms.length] = "objj_executeFile(\"";
    this._buffer.atoms[this._buffer.atoms.length] = URLString;
    this._buffer.atoms[this._buffer.atoms.length] = isQuoted ? "\", YES);" : "\", NO);";
    this._dependencies.push(new FileDependency(new CFURL(URLString), isQuoted));
}
Preprocessor.prototype.method = function( tokens, ivar_names)
{
    var buffer = new StringBuffer(),
        token,
        selector = "",
        parameters = [],
        types = [null];
    ivar_names = ivar_names || {};
    while ((token = tokens.skip_whitespace()) && token !== TOKEN_OPEN_BRACE && token !== TOKEN_SEMICOLON)
    {
        if (token == TOKEN_COLON)
        {
            var type = "";
            selector += token;
            token = tokens.skip_whitespace();
            if (token == TOKEN_OPEN_PARENTHESIS)
            {
                while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_PARENTHESIS)
                    type += token;
                token = tokens.skip_whitespace();
            }
            types[parameters.length + 1] = type || null;
            parameters[parameters.length] = token;
            if (token in ivar_names)
                CPLog.warn(this.error_message("*** Warning: Method ( "+selector+" ) uses a parameter name that is already in use ( "+token+" )"));
        }
        else if (token == TOKEN_OPEN_PARENTHESIS)
        {
            var type = "";
            while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_PARENTHESIS)
                type += token;
            types[0] = type || null;
        }
        else if (token == TOKEN_COMMA)
        {
            if ((token = tokens.skip_whitespace()) != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD)
                throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
        }
        else
            selector += token;
    }
    if (token === TOKEN_SEMICOLON)
    {
        token = tokens.skip_whitespace();
        if (token !== TOKEN_OPEN_BRACE)
        {
            throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+
            "Semi-colons are allowed only to terminate the method signature, before the open brace."));
        }
    }
    var index = 0,
        count = parameters.length;
    buffer.atoms[buffer.atoms.length] = "new objj_method(sel_getUid(\"";
    buffer.atoms[buffer.atoms.length] = selector;
    buffer.atoms[buffer.atoms.length] = "\"), function";
    this._currentSelector = selector;
    if (this._flags & Preprocessor.Flags.IncludeDebugSymbols)
        buffer.atoms[buffer.atoms.length] = " $" + this._currentClass + "__" + selector.replace(/:/g, "_");
    buffer.atoms[buffer.atoms.length] = "(self, _cmd";
    for (; index < count; ++index)
    {
        buffer.atoms[buffer.atoms.length] = ", ";
        buffer.atoms[buffer.atoms.length] = parameters[index];
    }
    buffer.atoms[buffer.atoms.length] = ")\n{ with(self)\n{";
    buffer.atoms[buffer.atoms.length] = this.preprocess(tokens, NULL, TOKEN_CLOSE_BRACE, TOKEN_OPEN_BRACE);
    buffer.atoms[buffer.atoms.length] = "}\n}";
    if (this._flags & Preprocessor.Flags.IncludeDebugSymbols)
        buffer.atoms[buffer.atoms.length] = ","+JSON.stringify(types);
    buffer.atoms[buffer.atoms.length] = ")";
    this._currentSelector = "";
    return buffer;
}
Preprocessor.prototype.preprocess = function(tokens, aStringBuffer, terminator, instigator, tuple)
{
    var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
        count = 0,
        token = "";
    if (tuple)
    {
        tuple[0] = buffer;
        var bracket = false,
            closures = [0, 0, 0];
    }
    while ((token = tokens.next()) && ((token !== terminator) || count))
    {
        if (tuple)
        {
            if (token === TOKEN_QUESTION_MARK)
                ++closures[2];
            else if (token === TOKEN_OPEN_BRACE)
                ++closures[0];
            else if (token === TOKEN_CLOSE_BRACE)
                --closures[0];
            else if (token === TOKEN_OPEN_PARENTHESIS)
                ++closures[1];
            else if (token === TOKEN_CLOSE_PARENTHESIS)
                --closures[1];
            else if ((token === TOKEN_COLON && closures[2]-- === 0 ||
                    (bracket = (token === TOKEN_CLOSE_BRACKET))) &&
                    closures[0] === 0 && closures[1] === 0)
            {
                tokens.push();
                var label = bracket ? tokens.skip_whitespace(true) : tokens.previous(),
                    isEmptyLabel = TOKEN_WHITESPACE.test(label);
                if (isEmptyLabel || TOKEN_IDENTIFIER.test(label) && TOKEN_WHITESPACE.test(tokens.previous()))
                {
                    tokens.push();
                    var last = tokens.skip_whitespace(true),
                        operatorCheck = true,
                        isDoubleOperator = false;
                    if (last === '+' || last === '-'){
                        if (tokens.previous() !== last)
                            operatorCheck = false;
                        else
                        {
                            last = tokens.skip_whitespace(true);
                            isDoubleOperator = true;
                        }}
                    tokens.pop();
                    tokens.pop();
                    if (operatorCheck && (
                        (!isDoubleOperator && (last === TOKEN_CLOSE_BRACE)) ||
                        last === TOKEN_CLOSE_PARENTHESIS || last === TOKEN_CLOSE_BRACKET ||
                        last === TOKEN_PERIOD || TOKEN_NUMBER.test(last) ||
                        last.charAt(last.length - 1) === '\"' || last.charAt(last.length - 1) === '\'' ||
                        TOKEN_IDENTIFIER.test(last) && !/^(new|return|case|var)$/.test(last)))
                    {
                        if (isEmptyLabel)
                            tuple[1] = ':';
                        else
                        {
                            tuple[1] = label;
                            if (!bracket)
                                tuple[1] += ':';
                            var count = buffer.atoms.length;
                            while (buffer.atoms[count--] !== label) ;
                            buffer.atoms.length = count;
                        }
                        return !bracket;
                    }
                    if (bracket)
                        return NO;
                }
                tokens.pop();
                if (bracket)
                    return NO;
            }
            closures[2] = MAX(closures[2], 0);
        }
        if (instigator)
        {
            if (token === instigator)
                ++count;
            else if (token === terminator)
                --count;
        }
        if (token === TOKEN_FUNCTION)
        {
            var accumulator = "";
            while ((token = tokens.next()) && token !== TOKEN_OPEN_PARENTHESIS && !(/^\w/).test(token))
                accumulator += token;
            if (token === TOKEN_OPEN_PARENTHESIS)
            {
                if (instigator === TOKEN_OPEN_PARENTHESIS)
                    ++count;
                buffer.atoms[buffer.atoms.length] = "function" + accumulator + '(';
                if (tuple)
                    ++closures[1];
            }
            else
            {
                buffer.atoms[buffer.atoms.length] = token + " = function";
            }
        }
        else if (token == TOKEN_PREPROCESSOR)
            this.directive(tokens, buffer);
        else if (token == TOKEN_HASH)
            this.hash(tokens, buffer);
        else if (token == TOKEN_OPEN_BRACKET)
            this.brackets(tokens, buffer);
        else
            buffer.atoms[buffer.atoms.length] = token;
    }
    if (tuple)
        throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
    if (!aStringBuffer)
        return buffer;
}
Preprocessor.prototype.selector = function(tokens, aStringBuffer)
{
    var buffer = aStringBuffer ? aStringBuffer : new StringBuffer();
    buffer.atoms[buffer.atoms.length] = "sel_getUid(\"";
    if (tokens.skip_whitespace() != TOKEN_OPEN_PARENTHESIS)
        throw new SyntaxError(this.error_message("*** Expected '('"));
    var selector = tokens.skip_whitespace();
    if (selector == TOKEN_CLOSE_PARENTHESIS)
        throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
    aStringBuffer.atoms[aStringBuffer.atoms.length] = selector;
    var token,
        starting = true;
    while ((token = tokens.next()) && token != TOKEN_CLOSE_PARENTHESIS)
    {
        if (starting && /^\d+$/.test(token) || !(/^(\w|$|\:)/.test(token)))
        {
            if (!(/\S/).test(token))
                if (tokens.skip_whitespace() == TOKEN_CLOSE_PARENTHESIS)
                    break;
                else
                    throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
            else
                throw new SyntaxError(this.error_message("*** Illegal character '" + token + "' in @selector()."));
        }
        buffer.atoms[buffer.atoms.length] = token;
        starting = (token == TOKEN_COLON);
    }
    buffer.atoms[buffer.atoms.length] = "\")";
    if (!aStringBuffer)
        return buffer;
}
Preprocessor.prototype.error_message = function(errorMessage)
{
    return errorMessage + " <Context File: "+ this._URL +
                                (this._currentClass ? " Class: "+this._currentClass : "") +
                                (this._currentSelector ? " Method: "+this._currentSelector : "") +">";
}
if (!exports.acorn) {
  exports.acorn = {};
  exports.acorn.walk = {};
}
(function(exports) {
  "use strict";
  exports.version = "0.0.1";
  var options, input, inputLen, sourceFile;
  exports.parse = function(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    options = opts || {};
    for (var opt in defaultOptions) if (!options.hasOwnProperty(opt))
      options[opt] = defaultOptions[opt];
    sourceFile = options.sourceFile || null;
    return parseTopLevel(options.program);
  };
  var defaultOptions = exports.defaultOptions = {
    ecmaVersion: 5,
    strictSemicolons: false,
    allowTrailingCommas: true,
    forbidReserved: false,
    trackComments: false,
    trackSpaces: false,
    locations: false,
    ranges: false,
    program: null,
    sourceFile: null,
    objj: true
  };
  var getLineInfo = exports.getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return {line: line, column: offset - cur, lineStart: cur, lineEnd: (match ? match.index + match[0].length : input.length)};
  };
  var tokPos;
  var tokStart, tokEnd;
  var tokStartLoc, tokEndLoc;
  var tokType, tokVal;
  var tokCommentsBefore, tokCommentsAfter, lastTokCommentsAfter;
  var tokSpacesBefore, tokSpacesAfter, lastTokSpacesAfter;
  var tokRegexpAllowed, tokComments, tokSpaces;
  var tokCurLine, tokLineStart, tokLineStartNext;
  var lastStart, lastEnd, lastEndLoc;
  var tokAfterImport;
  var nodeMessageSendObjectExpression;
  var inFunction, labels, strict;
  function raise(pos, message) {
    if (typeof pos == "number") pos = getLineInfo(input, pos);
    var syntaxError = new SyntaxError(message);
    syntaxError.line = pos.line;
    syntaxError.column = pos.column;
    syntaxError.lineStart = pos.lineStart;
    syntaxError.lineEnd = pos.lineEnd;
    throw syntaxError;
  }
  var _num = {type: "num"}, _regexp = {type: "regexp"}, _string = {type: "string"};
  var _name = {type: "name"}, _eof = {type: "eof"};
  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true}, _catch = {keyword: "catch"};
  var _continue = {keyword: "continue"}, _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
  var _do = {keyword: "do", isLoop: true}, _else = {keyword: "else", beforeExpr: true};
  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true}, _function = {keyword: "function"};
  var _if = {keyword: "if"}, _return = {keyword: "return", beforeExpr: true}, _switch = {keyword: "switch"};
  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"}, _var = {keyword: "var"};
  var _while = {keyword: "while", isLoop: true}, _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
  var _this = {keyword: "this"};
  var _void = {keyword: "void", prefix: true};
  var _null = {keyword: "null", atomValue: null}, _true = {keyword: "true", atomValue: true};
  var _false = {keyword: "false", atomValue: false};
  var _in = {keyword: "in", binop: 7, beforeExpr: true};
  var _implementation = {keyword: "implementation"}, _outlet = {keyword: "outlet"}, _accessors = {keyword: "accessors"};
  var _end = {keyword: "end"}, _import = {keyword: "import", afterImport: true};
  var _action = {keyword: "action"}, _selector = {keyword: "selector"}, _class = {keyword: "class"}, _global = {keyword: "global"};
  var _filename = {keyword: "filename"}, _unsigned = {keyword: "unsigned", okAsIdent: true}, _signed = {keyword: "signed", okAsIdent: true};
  var _byte = {keyword: "byte", okAsIdent: true}, _char = {keyword: "char", okAsIdent: true}, _short = {keyword: "short", okAsIdent: true};
  var _int = {keyword: "int", okAsIdent: true}, _long = {keyword: "long", okAsIdent: true}, _preprocess = {keyword: "#"};
  var keywordTypes = {"break": _break, "case": _case, "catch": _catch,
                      "continue": _continue, "debugger": _debugger, "default": _default,
                      "do": _do, "else": _else, "finally": _finally, "for": _for,
                      "function": _function, "if": _if, "return": _return, "switch": _switch,
                      "throw": _throw, "try": _try, "var": _var, "while": _while, "with": _with,
                      "null": _null, "true": _true, "false": _false, "new": _new, "in": _in,
                      "instanceof": {keyword: "instanceof", binop: 7}, "this": _this,
                      "typeof": {keyword: "typeof", prefix: true},
                      "void": _void,
                      "delete": {keyword: "delete", prefix: true} };
  var keywordTypesObjJ = {"IBAction": _action, "unsigned": _unsigned, "signed": _signed, "byte": _byte, "char": _char,
                          "short": _short, "int": _int, "long": _long };
  var objJAtKeywordTypes = {"implementation": _implementation, "outlet": _outlet, "accessors": _accessors, "end": _end,
                            "import": _import, "action": _action, "selector": _selector, "class": _class, "global": _global};
  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true};
  var _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"};
  var _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true};
  var _colon = {type: ":", beforeExpr: true}, _dot = {type: "."}, _question = {type: "?", beforeExpr: true};
  var _at = {type: "@"}, _dotdotdot = {type: "..."}, _numberSign = {type: "#"};
  var _slash = {binop: 10, beforeExpr: true}, _eq = {isAssign: true, beforeExpr: true};
  var _assign = {isAssign: true, beforeExpr: true}, _plusmin = {binop: 9, prefix: true, beforeExpr: true};
  var _incdec = {postfix: true, prefix: true, isUpdate: true}, _prefix = {prefix: true, beforeExpr: true};
  var _bin1 = {binop: 1, beforeExpr: true}, _bin2 = {binop: 2, beforeExpr: true};
  var _bin3 = {binop: 3, beforeExpr: true}, _bin4 = {binop: 4, beforeExpr: true};
  var _bin5 = {binop: 5, beforeExpr: true}, _bin6 = {binop: 6, beforeExpr: true};
  var _bin7 = {binop: 7, beforeExpr: true}, _bin8 = {binop: 8, beforeExpr: true};
  var _bin10 = {binop: 10, beforeExpr: true};
  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [];
    out: for (var i = 0; i < words.length; ++i) {
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          continue out;
        }
      cats.push([words[i]]);
    }
    function compareTo(arr) {
      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }
    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";
    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }
  exports.makePredicate = makePredicate;
  var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");
  var isReservedWord5 = makePredicate("class enum extends super const export import");
  var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");
  var isStrictBadIdWord = makePredicate("eval arguments");
  var isKeyword = makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this");
  var isKeywordObjJ = makePredicate("IBAction byte char short int long unsigned signed");
  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u0371-\u0374\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  var newline = /[\n\r\u2028\u2029]/;
  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
  function isIdentifierStart(code) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  function isIdentifierChar(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  function nextLineStart() {
    lineBreak.lastIndex = tokLineStart;
    var match = lineBreak.exec(input);
    return match ? match.index + match[0].length : input.length + 1;
  }
  var line_loc_t = function() {
    this.line = tokCurLine;
    this.column = tokPos - tokLineStart;
  }
  function curLineLoc() {
    while (tokLineStartNext <= tokPos) {
      ++tokCurLine;
      tokLineStart = tokLineStartNext;
      tokLineStartNext = nextLineStart();
    }
    return new line_loc_t();
  }
  function initTokenState() {
    tokCurLine = 1;
    tokPos = tokLineStart = 0;
    tokLineStartNext = nextLineStart();
    tokRegexpAllowed = true;
    tokComments = null;
    tokSpaces = null;
    skipSpace();
  }
  function finishToken(type, val) {
    tokEnd = tokPos;
    if (options.locations) tokEndLoc = curLineLoc();
    tokType = type;
    skipSpace();
    tokVal = val;
    lastTokCommentsAfter = tokCommentsAfter;
    lastTokSpacesAfter = tokSpacesAfter;
    tokCommentsAfter = tokComments;
    tokSpacesAfter = tokSpaces;
    tokRegexpAllowed = type.beforeExpr;
    tokAfterImport = type.afterImport;
  }
  function skipBlockComment() {
    var end = input.indexOf("*/", tokPos += 2);
    if (end === -1) raise(tokPos - 2, "Unterminated comment");
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(input.slice(tokPos, end));
    tokPos = end + 2;
  }
  function skipLineComment(skipCharacters) {
    var start = tokPos;
    var ch = input.charCodeAt(tokPos+=skipCharacters);
    while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8329) {
      ++tokPos;
      ch = input.charCodeAt(tokPos);
    }
    if (options.trackComments)
      (tokComments || (tokComments = [])).push(input.slice(start, tokPos));
  }
  function skipWhiteSpaces() {
    var start = tokPos;
    var ch = input.charCodeAt(++tokPos);
    while ((ch < 14 && ch > 8) || ch === 32 || ch === 160 || (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))))
      ch = input.charCodeAt(++tokPos);
    if (options.trackSpaces)
      (tokSpaces || (tokSpaces = [])).push(input.slice(start, tokPos));
  }
  function skipSpace() {
    tokComments = null;
    tokSpaces = null;
    while (tokPos < inputLen) {
      var ch = input.charCodeAt(tokPos);
      if (ch === 47) {
        var next = input.charCodeAt(tokPos+1);
        if (next === 42) {
          skipBlockComment();
        } else if (next === 47) {
          skipLineComment(2);
        } else break;
      } else if ((ch < 14 && ch > 8) || ch === 32 || ch === 160 || (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))) {
        skipWhiteSpaces();
      } else {
        break;
      }
    }
  }
  function readToken_dot(code) {
    var next = input.charCodeAt(tokPos+1);
    if (next >= 48 && next <= 57) return readNumber(String.fromCharCode(code));
    if (next === 46 && options.objj && input.charCodeAt(tokPos+2) === 46) {
      tokPos += 3;
      return finishToken(_dotdotdot);
    }
    ++tokPos;
    return finishToken(_dot);
  }
  function readToken_slash() {
    var next = input.charCodeAt(tokPos+1);
    if (tokRegexpAllowed) {++tokPos; return readRegexp();}
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_slash, 1);
  }
  function readToken_mult_modulo() {
    var next = input.charCodeAt(tokPos+1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_bin10, 1);
  }
  function readToken_pipe_amp(code) {
    var next = input.charCodeAt(tokPos+1);
    if (next === code) return finishOp(code === 124 ? _bin1 : _bin2, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(code === 124 ? _bin3 : _bin5, 1);
  }
  function readToken_caret() {
    var next = input.charCodeAt(tokPos+1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_bin4, 1);
  }
  function readToken_plus_min(code) {
    var next = input.charCodeAt(tokPos+1);
    if (next === code) return finishOp(_incdec, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_plusmin, 1);
  }
  function readToken_lt_gt(code) {
    if (tokAfterImport && options.objj && code === 60) {
      var str = [];
      for (;;) {
        if (tokPos >= inputLen) raise(tokStart, "Unterminated import statement");
        var ch = input.charCodeAt(++tokPos);
        if (ch === 62) {
          ++tokPos;
          return finishToken(_filename, String.fromCharCode.apply(null, str));
        }
        str.push(ch);
      }
    }
    var next = input.charCodeAt(tokPos+1);
    var size = 1;
    if (next === code) {
      size = code === 62 && input.charCodeAt(tokPos+2) === 62 ? 3 : 2;
      if (input.charCodeAt(tokPos + size) === 61) return finishOp(_assign, size + 1);
      return finishOp(_bin8, size);
    }
    if (next === 61)
      size = input.charCodeAt(tokPos+2) === 61 ? 3 : 2;
    return finishOp(_bin7, size);
  }
  function readToken_eq_excl(code) {
    var next = input.charCodeAt(tokPos+1);
    if (next === 61) return finishOp(_bin6, input.charCodeAt(tokPos+2) === 61 ? 3 : 2);
    return finishOp(code === 61 ? _eq : _prefix, 1);
  }
  function readToken_at(code) {
    var next = input.charCodeAt(++tokPos);
    if (next === 34 || next === 39)
      return readString(next);
    var word = readWord1(),
        token = objJAtKeywordTypes[word];
    if (!token) raise(tokStart, "Unrecognized Objective-J keyword '@" + word + "'");
    return finishToken(token);
  }
  function getTokenFromCode(code) {
    switch(code) {
    case 46:
      return readToken_dot(code);
    case 40: ++tokPos; return finishToken(_parenL);
    case 41: ++tokPos; return finishToken(_parenR);
    case 59: ++tokPos; return finishToken(_semi);
    case 44: ++tokPos; return finishToken(_comma);
    case 91: ++tokPos; return finishToken(_bracketL);
    case 93: ++tokPos; return finishToken(_bracketR);
    case 123: ++tokPos; return finishToken(_braceL);
    case 125: ++tokPos; return finishToken(_braceR);
    case 58: ++tokPos; return finishToken(_colon);
    case 63: ++tokPos; return finishToken(_question);
    case 48:
      var next = input.charCodeAt(tokPos+1);
      if (next === 120 || next === 88) return readHexNumber();
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
      return readNumber(String.fromCharCode(code));
    case 34: case 39:
      return readString(code);
    case 47:
      return readToken_slash(code);
    case 37: case 42:
      return readToken_mult_modulo();
    case 124: case 38:
      return readToken_pipe_amp(code);
    case 94:
      return readToken_caret();
    case 43: case 45:
      return readToken_plus_min(code);
    case 60: case 62:
      return readToken_lt_gt(code);
    case 61: case 33:
      return readToken_eq_excl(code);
    case 64:
      if (options.objj)
        return readToken_at(code);
      return false;
    case 35:
      if (options.objj) {
        var start = tokPos;
        var ch = input.charCodeAt(++tokPos);
        while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8329)
          ch = input.charCodeAt(++tokPos);
        return finishToken(_preprocess, input.slice(start, tokPos));
      }
      return false;
    case 126:
      return finishOp(_prefix, 1);
    }
    return false;
  }
  function readToken(forceRegexp) {
    tokStart = tokPos;
    if (options.locations) tokStartLoc = curLineLoc();
    tokCommentsBefore = tokComments;
    tokSpacesBefore = tokSpaces;
    if (forceRegexp) return readRegexp();
    if (tokPos >= inputLen) return finishToken(_eof);
    var code = input.charCodeAt(tokPos);
    if (isIdentifierStart(code) || code === 92 ) return readWord();
    var tok = getTokenFromCode(code);
    if(tok === false) {
      var ch = String.fromCharCode(code);
      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord();
      raise(tokPos, "Unexpected character '" + ch + "'");
    }
    return tok;
  }
  function finishOp(type, size) {
    var str = input.slice(tokPos, tokPos + size);
    tokPos += size;
    finishToken(type, str);
  }
  function readRegexp() {
    var content = "", escaped, inClass, start = tokPos;
    for (;;) {
      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
      var ch = input.charAt(tokPos);
      if (newline.test(ch)) raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++tokPos;
    }
    var content = input.slice(start, tokPos);
    ++tokPos;
    var mods = readWord1();
    if (mods && !/^[gmsiy]*$/.test(mods)) raise(start, "Invalid regexp flag");
    return finishToken(_regexp, new RegExp(content, mods));
  }
  function readInt(radix, len) {
    var start = tokPos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = input.charCodeAt(tokPos), val;
      if (code >= 97) val = code - 97 + 10;
      else if (code >= 65) val = code - 65 + 10;
      else if (code >= 48 && code <= 57) val = code - 48;
      else val = Infinity;
      if (val >= radix) break;
      ++tokPos;
      total = total * radix + val;
    }
    if (tokPos === start || len != null && tokPos - start !== len) return null;
    return total;
  }
  function readHexNumber() {
    tokPos += 2;
    var val = readInt(16);
    if (val == null) raise(tokStart + 2, "Expected hexadecimal number");
    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");
    return finishToken(_num, val);
  }
  function readNumber(ch) {
    var start = tokPos, isFloat = ch === ".";
    if (!isFloat && readInt(10) == null) raise(start, "Invalid number");
    if (isFloat || input.charAt(tokPos) === ".") {
      var next = input.charAt(++tokPos);
      if (next === "-" || next === "+") ++tokPos;
      if (readInt(10) === null && ch === ".") raise(start, "Invalid number");
      isFloat = true;
    }
    if (/e/i.test(input.charAt(tokPos))) {
      var next = input.charAt(++tokPos);
      if (next === "-" || next === "+") ++tokPos;
      if (readInt(10) === null) raise(start, "Invalid number")
      isFloat = true;
    }
    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");
    var str = input.slice(start, tokPos), val;
    if (isFloat) val = parseFloat(str);
    else if (ch !== "0" || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return finishToken(_num, val);
  }
  var rs_str = [];
  function readString(quote) {
    tokPos++;
    rs_str.length = 0;
    for (;;) {
      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
      var ch = input.charCodeAt(tokPos);
      if (ch === quote) {
        ++tokPos;
        return finishToken(_string, String.fromCharCode.apply(null, rs_str));
      }
      if (ch === 92) {
        ch = input.charCodeAt(++tokPos);
        var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
        if (octal) octal = octal[0];
        while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, octal.length - 1);
        if (octal === "0") octal = null;
        ++tokPos;
        if (octal) {
          if (strict) raise(tokPos - 2, "Octal literal in strict mode");
          rs_str.push(parseInt(octal, 8));
          tokPos += octal.length - 1;
        } else {
          switch (ch) {
          case 110: rs_str.push(10); break;
          case 114: rs_str.push(13); break;
          case 120: rs_str.push(readHexChar(2)); break;
          case 117: rs_str.push(readHexChar(4)); break;
          case 85: rs_str.push(readHexChar(8)); break;
          case 116: rs_str.push(9); break;
          case 98: rs_str.push(8); break;
          case 118: rs_str.push(11); break;
          case 102: rs_str.push(12); break;
          case 48: rs_str.push(0); break;
          case 13: if (input.charCodeAt(tokPos) === 10) ++tokPos;
          case 10: break;
          default: rs_str.push(ch); break;
          }
        }
      } else {
        if (ch === 13 || ch === 10 || ch === 8232 || ch === 8329) raise(tokStart, "Unterminated string constant");
        if (ch !== 92) rs_str.push(ch);
        ++tokPos;
      }
    }
  }
  function readHexChar(len) {
    var n = readInt(16, len);
    if (n === null) raise(tokStart, "Bad character escape sequence");
    return n;
  }
  var containsEsc;
  function readWord1() {
    containsEsc = false;
    var word, first = true, start = tokPos;
    for (;;) {
      var ch = input.charCodeAt(tokPos);
      if (isIdentifierChar(ch)) {
        if (containsEsc) word += input.charAt(tokPos);
        ++tokPos;
      } else if (ch === 92) {
        if (!containsEsc) word = input.slice(start, tokPos);
        containsEsc = true;
        if (input.charCodeAt(++tokPos) != 117)
          raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
        ++tokPos;
        var esc = readHexChar(4);
        var escStr = String.fromCharCode(esc);
        if (!escStr) raise(tokPos - 1, "Invalid Unicode escape");
        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
          raise(tokPos - 4, "Invalid Unicode escape");
        word += escStr;
      } else {
        break;
      }
      first = false;
    }
    return containsEsc ? word : input.slice(start, tokPos);
  }
  function readWord() {
    var word = readWord1();
    var type = _name;
    if (!containsEsc) {
      if (isKeyword(word)) type = keywordTypes[word];
      else if (options.objj && isKeywordObjJ(word)) type = keywordTypesObjJ[word];
      else if (options.forbidReserved &&
               (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(word) ||
               strict && isStrictReservedWord(word))
        raise(tokStart, "The keyword '" + word + "' is reserved");
    }
    return finishToken(type, word);
  }
  function next() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    lastEndLoc = tokEndLoc;
    nodeMessageSendObjectExpression = null;
    readToken();
  }
  function setStrict(strct) {
    strict = strct;
    tokPos = lastEnd;
    skipSpace();
    readToken();
  }
  var node_t = function(s) {
    this.type = null;
    this.start = tokStart;
    this.end = null;
  };
  var node_loc_t = function(s) {
    this.start = tokStartLoc;
    this.end = null;
    if (sourceFile !== null) this.source = sourceFile;
  };
  function startNode() {
    var node = new node_t();
    if (options.trackComments && tokCommentsBefore) {
      node.commentsBefore = tokCommentsBefore;
      tokCommentsBefore = null;
    }
    if (options.trackSpaces && tokSpacesBefore) {
      node.spacesBefore = tokSpacesBefore;
      tokSpacesBefore = null;
    }
    if (options.locations)
      node.loc = new node_loc_t();
    if (options.ranges)
      node.range = [tokStart, 0];
    return node;
  }
  function startNodeFrom(other) {
    var node = new node_t();
    node.start = other.start;
    if (other.commentsBefore) {
      node.commentsBefore = other.commentsBefore;
      delete other.commentsBefore;
    }
    if (other.spacesBefore) {
      node.spacesBefore = other.spacesBefore;
      delete other.spacesBefore;
    }
    if (options.locations) {
      node.loc = new node_loc_t();
      node.loc.start = other.loc.start;
    }
    if (options.ranges)
      node.range = [other.range[0], 0];
    return node;
  }
  var lastFinishedNode;
  function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    if (options.trackComments) {
      if (lastTokCommentsAfter) {
        node.commentsAfter = lastTokCommentsAfter;
        tokCommentsAfter = null;
      } else if (lastFinishedNode && lastFinishedNode.end === lastEnd &&
                 lastFinishedNode.commentsAfter) {
        node.commentsAfter = lastFinishedNode.commentsAfter;
        delete lastFinishedNode.commentsAfter;
      }
      if (!options.trackSpaces)
        lastFinishedNode = node;
    }
    if (options.trackSpaces) {
      if (lastTokSpacesAfter) {
        node.spacesAfter = lastTokSpacesAfter;
        lastTokSpacesAfter = null;
      } else if (lastFinishedNode && lastFinishedNode.end === lastEnd &&
                 lastFinishedNode.spacesAfter) {
        node.spacesAfter = lastFinishedNode.spacesAfter;
        delete lastFinishedNode.spacesAfter;
      }
      lastFinishedNode = node;
    }
    if (options.locations)
      node.loc.end = lastEndLoc;
    if (options.ranges)
      node.range[1] = lastEnd;
    return node;
  }
  function isUseStrict(stmt) {
    return options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
  }
  function eat(type) {
    if (tokType === type) {
      next();
      return true;
    }
  }
  function canInsertSemicolon() {
    return !options.strictSemicolons &&
      (tokType === _eof || tokType === _braceR || newline.test(input.slice(lastEnd, tokStart)) ||
        (nodeMessageSendObjectExpression && options.objj));
  }
  function semicolon() {
    if (!eat(_semi) && !canInsertSemicolon()) raise(lastEnd, "Expected a semicolon");
  }
  function expect(type, errorMessage) {
    if (tokType === type) next();
    else errorMessage ? raise(tokStart, errorMessage) : unexpected();
  }
  function unexpected() {
    raise(tokStart, "Unexpected token");
  }
  function checkLVal(expr) {
    if (expr.type !== "Identifier" && expr.type !== "MemberExpression")
      raise(expr.start, "Assigning to rvalue");
    if (strict && expr.type === "Identifier" && isStrictBadIdWord(expr.name))
      raise(expr.start, "Assigning to " + expr.name + " in strict mode");
  }
  function parseTopLevel(program) {
    initTokenState();
    lastStart = lastEnd = tokPos;
    if (options.locations) lastEndLoc = curLineLoc();
    inFunction = strict = null;
    labels = [];
    readToken();
    var node = program || startNode(), first = true;
    if (!program) node.body = [];
    while (tokType !== _eof) {
      var stmt = parseStatement();
      node.body.push(stmt);
      if (first && isUseStrict(stmt)) setStrict(true);
      first = false;
    }
    return finishNode(node, "Program");
  };
  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};
  function parseStatement() {
    if (nodeMessageSendObjectExpression)
      return parseMessageSendExpression(nodeMessageSendObjectExpression, nodeMessageSendObjectExpression.object);
    if (tokType === _slash)
      readToken(true);
    var starttype = tokType, node = startNode();
    switch (starttype) {
    case _break: case _continue:
      next();
      var isBreak = starttype === _break;
      if (eat(_semi) || canInsertSemicolon()) node.label = null;
      else if (tokType !== _name) unexpected();
      else {
        node.label = parseIdent();
        semicolon();
      }
      for (var i = 0; i < labels.length; ++i) {
        var lab = labels[i];
        if (node.label == null || lab.name === node.label.name) {
          if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
          if (node.label && isBreak) break;
        }
      }
      if (i === labels.length) raise(node.start, "Unsyntactic " + starttype.keyword);
      return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
    case _debugger:
      next();
      semicolon();
      return finishNode(node, "DebuggerStatement");
    case _do:
      next();
      labels.push(loopLabel);
      node.body = parseStatement();
      labels.pop();
      expect(_while, "Expected 'while' at end of do statement");
      node.test = parseParenExpression();
      semicolon();
      return finishNode(node, "DoWhileStatement");
    case _for:
      next();
      labels.push(loopLabel);
      expect(_parenL, "Expected '(' after 'for'");
      if (tokType === _semi) return parseFor(node, null);
      if (tokType === _var) {
        var init = startNode();
        next();
        parseVar(init, true);
        if (init.declarations.length === 1 && eat(_in))
          return parseForIn(node, init);
        return parseFor(node, init);
      }
      var init = parseExpression(false, true);
      if (eat(_in)) {checkLVal(init); return parseForIn(node, init);}
      return parseFor(node, init);
    case _function:
      next();
      return parseFunction(node, true);
    case _if:
      next();
      node.test = parseParenExpression();
      node.consequent = parseStatement();
      node.alternate = eat(_else) ? parseStatement() : null;
      return finishNode(node, "IfStatement");
    case _return:
      if (!inFunction) raise(tokStart, "'return' outside of function");
      next();
      if (eat(_semi) || canInsertSemicolon()) node.argument = null;
      else { node.argument = parseExpression(); semicolon(); }
      return finishNode(node, "ReturnStatement");
    case _switch:
      next();
      node.discriminant = parseParenExpression();
      node.cases = [];
      expect(_braceL, "Expected '{' in switch statement");
      labels.push(switchLabel);
      for (var cur, sawDefault; tokType != _braceR;) {
        if (tokType === _case || tokType === _default) {
          var isCase = tokType === _case;
          if (cur) finishNode(cur, "SwitchCase");
          node.cases.push(cur = startNode());
          cur.consequent = [];
          next();
          if (isCase) cur.test = parseExpression();
          else {
            if (sawDefault) raise(lastStart, "Multiple default clauses"); sawDefault = true;
            cur.test = null;
          }
          expect(_colon, "Expected ':' after case clause");
        } else {
          if (!cur) unexpected();
          cur.consequent.push(parseStatement());
        }
      }
      if (cur) finishNode(cur, "SwitchCase");
      next();
      labels.pop();
      return finishNode(node, "SwitchStatement");
    case _throw:
      next();
      if (newline.test(input.slice(lastEnd, tokStart)))
        raise(lastEnd, "Illegal newline after throw");
      node.argument = parseExpression();
      semicolon();
      return finishNode(node, "ThrowStatement");
    case _try:
      next();
      node.block = parseBlock();
      node.handlers = [];
      while (tokType === _catch) {
        var clause = startNode();
        next();
        expect(_parenL, "Expected '(' after 'catch'");
        clause.param = parseIdent();
        if (strict && isStrictBadIdWord(clause.param.name))
          raise(clause.param.start, "Binding " + clause.param.name + " in strict mode");
        expect(_parenR, "Expected closing ')' after catch");
        clause.guard = null;
        clause.body = parseBlock();
        node.handlers.push(finishNode(clause, "CatchClause"));
      }
      node.finalizer = eat(_finally) ? parseBlock() : null;
      if (!node.handlers.length && !node.finalizer)
        raise(node.start, "Missing catch or finally clause");
      return finishNode(node, "TryStatement");
    case _var:
      next();
      node = parseVar(node);
      semicolon();
      return node;
    case _while:
      next();
      node.test = parseParenExpression();
      labels.push(loopLabel);
      node.body = parseStatement();
      labels.pop();
      return finishNode(node, "WhileStatement");
    case _with:
      if (strict) raise(tokStart, "'with' in strict mode");
      next();
      node.object = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WithStatement");
    case _braceL:
      return parseBlock();
    case _semi:
      next();
      return finishNode(node, "EmptyStatement");
    case _implementation:
      if (options.objj) {
        next();
        node.classname = parseIdent(true);
        if (eat(_colon))
          node.superclassname = parseIdent(true);
        else if (eat(_parenL)) {
          node.categoryname = parseIdent(true);
          expect(_parenR, "Expected closing ')' after category name");
        }
        if (eat(_braceL)) {
          node.ivardeclarations = [];
          for (;;) {
            if (eat(_braceR)) break;
            parseIvarDeclaration(node);
          }
          node.endOfIvars = tokStart;
        }
        node.body = [];
        while(!eat(_end)) {
          if (tokType === _eof) raise(tokPos, "Expected '@end' after '@implementation'");
          node.body.push(parseClassElement());
        }
      }
      return finishNode(node, "ClassDeclarationStatement");
    case _import:
      next();
      if (tokType === _string)
        node.localfilepath = true;
      else if (tokType ===_filename)
        node.localfilepath = false;
      else
        unexpected();
      node.filename = parseStringNumRegExpLiteral();
      return finishNode(node, "ImportStatement");
    case _preprocess:
      next();
      return finishNode(node, "PreprocessStatement");
    case _class:
      next();
      node.id = parseIdent(false);
      return finishNode(node, "ClassStatement");
    case _global:
      next();
      node.id = parseIdent(false);
      return finishNode(node, "GlobalStatement");
    default:
      var maybeName = tokVal, expr = parseExpression();
      if (starttype === _name && expr.type === "Identifier" && eat(_colon)) {
        for (var i = 0; i < labels.length; ++i)
          if (labels[i].name === maybeName) raise(expr.start, "Label '" + maybeName + "' is already declared");
        var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
        labels.push({name: maybeName, kind: kind});
        node.body = parseStatement();
        labels.pop();
        node.label = expr;
        return finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        semicolon();
        return finishNode(node, "ExpressionStatement");
      }
    }
  }
  function parseIvarDeclaration(node) {
    var outlet;
    if (eat(_outlet))
      outlet = true;
    var type = parseObjectiveJType();
    if (strict && isStrictBadIdWord(type.name))
      raise(type.start, "Binding " + type.name + " in strict mode");
    for (;;) {
      var decl = startNode();
      if (outlet)
        decl.outlet = outlet;
      decl.ivartype = type;
      decl.id = parseIdent();
      if (strict && isStrictBadIdWord(decl.id.name))
        raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
      if (eat(_accessors)) {
        decl.accessors = {};
        if (eat(_parenL)) {
          if (!eat(_parenR)) {
            for (;;) {
              var config = parseIdent(true);
              switch(config.name) {
                case "property":
                case "getter":
                  expect(_eq, "Expected '=' after 'getter' accessor attribute");
                  decl.accessors[config.name] = parseIdent(true);
                  break;
                case "setter":
                  expect(_eq, "Expected '=' after 'setter' accessor attribute");
                  var setter = parseIdent(true);
                  decl.accessors[config.name] = setter;
                  if (eat(_colon))
                    setter.end = tokStart;
                  setter.name += ":"
                  break;
                case "readwrite":
                case "readonly":
                case "copy":
                  decl.accessors[config.name] = true;
                  break;
                default:
                  raise(config.start, "Unknown accessors attribute '" + config.name + "'");
              }
              if (!eat(_comma)) break;
            }
            expect(_parenR, "Expected closing ')' after accessor attributes");
          }
        }
      }
      finishNode(decl, "IvarDeclaration")
      node.ivardeclarations.push(decl);
      if (!eat(_comma)) break;
    }
    semicolon();
  }
  function parseClassElement() {
    var methodType = tokVal,
        element = startNode();
    if (eat(_plusmin)) {
      element.methodtype = methodType;
      if (eat(_parenL)) {
        if (eat(_action))
          element.action = true;
        if (!eat(_parenR)) {
          element.returntype = parseObjectiveJType();
          expect(_parenR, "Expected closing ')' after method return type");
        }
      }
      var first = true,
          selectors = [],
          args = [];
      element.selectors = selectors;
      element.arguments = args;
      for (;;) {
        if (tokType !== _colon) {
          selectors.push(parseIdent(true));
          if (first && tokType !== _colon) break;
        } else
          selectors.push(null);
        expect(_colon, "Expected ':' in selector");
        var argument = {};
        args.push(argument);
        if (eat(_parenL)) {
          argument.type = parseObjectiveJType();
          expect(_parenR, "Expected closing ')' after method argument type");
        }
        argument.identifier = parseIdent(false);
        if (tokType === _braceL || eat(_semi)) break;
        if (eat(_comma)) {
          expect(_dotdotdot, "Expected '...' after ',' in method declaration");
          element.parameters = true;
          break;
        }
        first = false;
      }
      element.startOfBody = lastEnd;
      var oldInFunc = inFunction, oldLabels = labels;
      inFunction = true; labels = [];
      element.body = parseBlock(true);
      inFunction = oldInFunc; labels = oldLabels;
      return finishNode(element, "MethodDeclarationStatement");
    } else
      return parseStatement();
  }
  function parseParenExpression() {
    expect(_parenL, "Expected '(' before expression");
    var val = parseExpression();
    expect(_parenR, "Expected closing ')' after expression");
    return val;
  }
  function parseBlock(allowStrict) {
    var node = startNode(), first = true, strict = false, oldStrict;
    node.body = [];
    expect(_braceL, "Expected '{' before block");
    while (!eat(_braceR)) {
      var stmt = parseStatement();
      node.body.push(stmt);
      if (first && isUseStrict(stmt)) {
        oldStrict = strict;
        setStrict(strict = true);
      }
      first = false
    }
    if (strict && !oldStrict) setStrict(false);
    return finishNode(node, "BlockStatement");
  }
  function parseFor(node, init) {
    node.init = init;
    expect(_semi, "Expected ';' in for statement");
    node.test = tokType === _semi ? null : parseExpression();
    expect(_semi, "Expected ';' in for statement");
    node.update = tokType === _parenR ? null : parseExpression();
    expect(_parenR, "Expected closing ')' in for statement");
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForStatement");
  }
  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    expect(_parenR, "Expected closing ')' in for statement");
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForInStatement");
  }
  function parseVar(node, noIn) {
    node.declarations = [];
    node.kind = "var";
    for (;;) {
      var decl = startNode();
      decl.id = parseIdent();
      if (strict && isStrictBadIdWord(decl.id.name))
        raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
      decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
      node.declarations.push(finishNode(decl, "VariableDeclarator"));
      if (!eat(_comma)) break;
    }
    return finishNode(node, "VariableDeclaration");
  }
  function parseExpression(noComma, noIn) {
    var expr = parseMaybeAssign(noIn);
    if (!noComma && tokType === _comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    return expr;
  }
  function parseMaybeAssign(noIn) {
    var left = parseMaybeConditional(noIn);
    if (tokType.isAssign) {
      var node = startNodeFrom(left);
      node.operator = tokVal;
      node.left = left;
      next();
      node.right = parseMaybeAssign(noIn);
      checkLVal(left);
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }
  function parseMaybeConditional(noIn) {
    var expr = parseExprOps(noIn);
    if (eat(_question)) {
      var node = startNodeFrom(expr);
      node.test = expr;
      node.consequent = parseExpression(true);
      expect(_colon, "Expected ':' in conditional expression");
      node.alternate = parseExpression(true, noIn);
      return finishNode(node, "ConditionalExpression");
    }
    return expr;
  }
  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }
  function parseExprOp(left, minPrec, noIn) {
    var prec = tokType.binop;
    if (prec != null && (!noIn || tokType !== _in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = tokVal;
        next();
        node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
        var node = finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
        return parseExprOp(node, minPrec, noIn);
      }
    }
    return left;
  }
  function parseMaybeUnary(noIn) {
    if (tokType.prefix) {
      var node = startNode(), update = tokType.isUpdate;
      node.operator = tokVal;
      node.prefix = true;
      next();
      node.argument = parseMaybeUnary(noIn);
      if (update) checkLVal(node.argument);
      else if (strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        raise(node.start, "Deleting local variable in strict mode");
      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var expr = parseExprSubscripts();
    while (tokType.postfix && !canInsertSemicolon()) {
      var node = startNodeFrom(expr);
      node.operator = tokVal;
      node.prefix = false;
      node.argument = expr;
      checkLVal(expr);
      next();
      expr = finishNode(node, "UpdateExpression");
    }
    return expr;
  }
  function parseExprSubscripts() {
    return parseSubscripts(parseExprAtom());
  }
  function parseSubscripts(base, noCalls) {
    if (eat(_dot)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseIdent(true);
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else {
      if (options.objj) var messageSendNode = startNode();
      if (eat(_bracketL)) {
        var expr = parseExpression();
        if (options.objj && tokType !== _bracketR) {
          messageSendNode.object = expr;
          nodeMessageSendObjectExpression = messageSendNode;
          return base;
        }
        var node = startNodeFrom(base);
        node.object = base;
        node.property = expr;
        node.computed = true;
        expect(_bracketR, "Expected closing ']' in subscript");
        return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
      } else if (!noCalls && eat(_parenL)) {
        var node = startNodeFrom(base);
        node.callee = base;
        node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
        return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
      }
    }
    return base;
  }
  function parseExprAtom() {
    switch (tokType) {
    case _this:
      var node = startNode();
      next();
      return finishNode(node, "ThisExpression");
    case _name:
      return parseIdent();
    case _num: case _string: case _regexp:
      return parseStringNumRegExpLiteral();
    case _null: case _true: case _false:
      var node = startNode();
      node.value = tokType.atomValue;
      node.raw = tokType.keyword
      next();
      return finishNode(node, "Literal");
    case _parenL:
      var tokStartLoc1 = tokStartLoc, tokStart1 = tokStart;
      next();
      var val = parseExpression();
      val.start = tokStart1;
      val.end = tokEnd;
      if (options.locations) {
        val.loc.start = tokStartLoc1;
        val.loc.end = tokEndLoc;
      }
      if (options.ranges)
        val.range = [tokStart1, tokEnd];
      expect(_parenR, "Expected closing ')' in expression");
      return val;
    case _bracketL:
      var node = startNode(),
          firstExpr = null;
      next();
      if (tokType !== _comma && tokType !== _bracketR) {
        firstExpr = parseExpression(true, true);
        if (tokType !== _comma && tokType !== _bracketR)
          return parseMessageSendExpression(node, firstExpr);
      }
      node.elements = parseExprList(_bracketR, firstExpr, true, true);
      return finishNode(node, "ArrayExpression");
    case _braceL:
      return parseObj();
    case _function:
      var node = startNode();
      next();
      return parseFunction(node, false);
    case _new:
      return parseNew();
    case _selector:
      var node = startNode();
      next();
      expect(_parenL, "Expected '(' after '@selector'");
      parseSelector(node, _parenR);
      expect(_parenR, "Expected closing ')' after selector");
      return finishNode(node, "SelectorLiteralExpression");
    default:
      unexpected();
    }
  }
  function parseMessageSendExpression(node, firstExpr) {
    parseSelectorWithArguments(node, _bracketR);
    if (firstExpr.type === "Identifier" && firstExpr.name === "super")
      node.superObject = true;
    else
      node.object = firstExpr;
    return finishNode(node, "MessageSendExpression");
  }
  function parseSelector(node, close) {
      var first = true,
          selectors = [];
      for (;;) {
        if (tokType !== _colon) {
          selectors.push(parseIdent(true).name);
          if (first && tokType === close) break;
        }
        expect(_colon, "Expected ':' in selector");
        selectors.push(":");
        if (tokType === close) break;
        first = false;
      }
      node.selector = selectors.join("");
  }
  function parseSelectorWithArguments(node, close) {
      var first = true,
          selectors = [],
          args = [],
          parameters = [];
      node.selectors = selectors;
      node.arguments = args;
      for (;;) {
        if (tokType !== _colon) {
          selectors.push(parseIdent(true));
          if (first && eat(close))
            break;
        } else {
          selectors.push(null);
        }
        expect(_colon, "Expected ':' in selector");
        args.push(parseExpression(true, true));
        if (eat(close))
          break;
        if (tokType === _comma) {
          node.parameters = [];
          while(eat(_comma)) {
            node.parameters.push(parseExpression(true, true));
          }
          eat(close);
          break;
        }
        first = false;
      }
  }
  function parseNew() {
    var node = startNode();
    next();
    node.callee = parseSubscripts(parseExprAtom(false), true);
    if (eat(_parenL))
      node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
    else node.arguments = [];
    return finishNode(node, "NewExpression");
  }
  function parseObj() {
    var node = startNode(), first = true, sawGetSet = false;
    node.properties = [];
    next();
    while (!eat(_braceR)) {
      if (!first) {
        expect(_comma, "Expected ',' in object literal");
        if (options.allowTrailingCommas && eat(_braceR)) break;
      } else first = false;
      var prop = {key: parsePropertyName()}, isGetSet = false, kind;
      if (eat(_colon)) {
        prop.value = parseExpression(true);
        kind = prop.kind = "init";
      } else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set")) {
        isGetSet = sawGetSet = true;
        kind = prop.kind = prop.key.name;
        prop.key = parsePropertyName();
        if (!tokType === _parenL) unexpected();
        prop.value = parseFunction(startNode(), false);
      } else unexpected();
      if (prop.key.type === "Identifier" && (strict || sawGetSet)) {
        for (var i = 0; i < node.properties.length; ++i) {
          var other = node.properties[i];
          if (other.key.name === prop.key.name) {
            var conflict = kind == other.kind || isGetSet && other.kind === "init" ||
              kind === "init" && (other.kind === "get" || other.kind === "set");
            if (conflict && !strict && kind === "init" && other.kind === "init") conflict = false;
            if (conflict) raise(prop.key.start, "Redefinition of property");
          }
        }
      }
      node.properties.push(prop);
    }
    return finishNode(node, "ObjectExpression");
  }
  function parsePropertyName() {
    if (tokType === _num || tokType === _string) return parseExprAtom();
    return parseIdent(true);
  }
  function parseFunction(node, isStatement) {
    if (tokType === _name) node.id = parseIdent();
    else if (isStatement) unexpected();
    else node.id = null;
    node.params = [];
    var first = true;
    expect(_parenL, "Expected '(' before function parameters");
    while (!eat(_parenR)) {
      if (!first) expect(_comma, "Expected ',' between function parameters"); else first = false;
      node.params.push(parseIdent());
    }
    var oldInFunc = inFunction, oldLabels = labels;
    inFunction = true; labels = [];
    node.body = parseBlock(true);
    inFunction = oldInFunc; labels = oldLabels;
    if (strict || node.body.body.length && isUseStrict(node.body.body[0])) {
      for (var i = node.id ? -1 : 0; i < node.params.length; ++i) {
        var id = i < 0 ? node.id : node.params[i];
        if (isStrictReservedWord(id.name) || isStrictBadIdWord(id.name))
          raise(id.start, "Defining '" + id.name + "' in strict mode");
        if (i >= 0) for (var j = 0; j < i; ++j) if (id.name === node.params[j].name)
          raise(id.start, "Argument name clash in strict mode");
      }
    }
    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
  }
  function parseExprList(close, firstExpr, allowTrailingComma, allowEmpty) {
    if (firstExpr && eat(close))
      return [firstExpr];
    var elts = [], first = true;
    while (!eat(close)) {
      if (first) {
        first = false;
        if (allowEmpty && tokType === _comma && !firstExpr) elts.push(null);
        else elts.push(firstExpr);
      } else {
        expect(_comma, "Expected ',' between expressions");
        if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
        if (allowEmpty && tokType === _comma) elts.push(null);
        else elts.push(parseExpression(true));
      }
    }
    return elts;
  }
  function parseIdent(liberal) {
    var node = startNode();
    node.name = tokType === _name ? tokVal : (((liberal && !options.forbidReserved) || tokType.okAsIdent) && tokType.keyword) || unexpected();
    next();
    return finishNode(node, "Identifier");
  }
  function parseStringNumRegExpLiteral() {
    var node = startNode();
    node.value = tokVal;
    node.raw = input.slice(tokStart, tokEnd);
    next();
    return finishNode(node, "Literal");
  }
  function parseObjectiveJType() {
    var node = startNode();
    if (tokType === _name) {
      node.name = tokVal;
      next();
      if (tokVal === '<') {
        next();
        node.protocol = parseIdent(true);
        if (tokVal !== '>') unexpected();
        next();
      }
    } else {
      node.name = tokType.keyword;
      if (!eat(_void)) {
        var nextKeyWord;
        if (eat(_signed) || eat(_unsigned))
          nextKeyWord = tokType.keyword || true;
        if (eat(_char) || eat(_byte) || eat(_short)) {
          if (nextKeyWord)
            node.name += " " + nextKeyWord;
          nextKeyWord = tokType.keyword || true;
        } else {
          if (eat(_int)) {
            if (nextKeyWord)
              node.name += " " + nextKeyWord;
            nextKeyWord = tokType.keyword || true;
          }
          if (eat(_long)) {
            if (nextKeyWord)
              node.name += " " + nextKeyWord;
            nextKeyWord = tokType.keyword || true;
            if (eat(_long)) {
              node.name += " " + nextKeyWord;
            }
          }
        }
        if (!nextKeyWord) {
          node.name = (!options.forbidReserved && tokType.keyword) || unexpected();
          next();
        }
      }
    }
   return finishNode(node, "ObjectiveJType");
  }
})(typeof exports === "undefined" ? (self.acorn = {}) : exports.acorn);
if (!exports.acorn) {
  exports.acorn = {};
  exports.acorn.walk = {};
}
(function(exports) {
  "use strict";
  exports.simple = function(node, visitors, base, state) {
    if (!base) base = exports;
    function c(node, st, override) {
      var type = override || node.type, found = visitors[type];
      if (found) found(node, st);
      base[type](node, st, c);
    }
    c(node, state);
  };
  exports.recursive = function(node, state, funcs, base) {
    var visitor = exports.make(funcs, base);
    function c(node, st, override) {
      visitor[override || node.type](node, st, c);
    }
    c(node, state);
  };
  exports.make = function(funcs, base) {
    if (!base) base = exports;
    var visitor = {};
    for (var type in base) visitor[type] = base[type];
    for (var type in funcs) visitor[type] = funcs[type];
    return visitor;
  };
  function skipThrough(node, st, c) { c(node, st); }
  function ignore(node, st, c) {}
  exports.Program = exports.BlockStatement = function(node, st, c) {
    for (var i = 0; i < node.body.length; ++i) {
      c(node.body[i], st, "Statement");
    }
  };
  exports.Statement = skipThrough;
  exports.EmptyStatement = ignore;
  exports.ExpressionStatement = function(node, st, c) {
    c(node.expression, st, "Expression");
  };
  exports.IfStatement = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.consequent, st, "Statement");
    if (node.alternate) c(node.alternate, st, "Statement");
  };
  exports.LabeledStatement = function(node, st, c) {
    c(node.body, st, "Statement");
  };
  exports.BreakStatement = exports.ContinueStatement = ignore;
  exports.WithStatement = function(node, st, c) {
    c(node.object, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.SwitchStatement = function(node, st, c) {
    c(node.discriminant, st, "Expression");
    for (var i = 0; i < node.cases.length; ++i) {
      var cs = node.cases[i];
      if (cs.test) c(cs.test, st, "Expression");
      for (var j = 0; j < cs.consequent.length; ++j)
        c(cs.consequent[j], st, "Statement");
    }
  };
  exports.ReturnStatement = function(node, st, c) {
    if (node.argument) c(node.argument, st, "Expression");
  };
  exports.ThrowStatement = function(node, st, c) {
    c(node.argument, st, "Expression");
  };
  exports.TryStatement = function(node, st, c) {
    c(node.block, st, "Statement");
    for (var i = 0; i < node.handlers.length; ++i)
      c(node.handlers[i].body, st, "ScopeBody");
    if (node.finalizer) c(node.finalizer, st, "Statement");
  };
  exports.WhileStatement = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.DoWhileStatement = function(node, st, c) {
    c(node.body, st, "Statement");
    c(node.test, st, "Expression");
  };
  exports.ForStatement = function(node, st, c) {
    if (node.init) c(node.init, st, "ForInit");
    if (node.test) c(node.test, st, "Expression");
    if (node.update) c(node.update, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.ForInStatement = function(node, st, c) {
    c(node.left, st, "ForInit");
    c(node.right, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.ForInit = function(node, st, c) {
    if (node.type == "VariableDeclaration") c(node, st);
    else c(node, st, "Expression");
  };
  exports.DebuggerStatement = ignore;
  exports.FunctionDeclaration = function(node, st, c) {
    c(node, st, "Function");
  };
  exports.VariableDeclaration = function(node, st, c) {
    for (var i = 0; i < node.declarations.length; ++i) {
      var decl = node.declarations[i];
      if (decl.init) c(decl.init, st, "Expression");
    }
  };
  exports.Function = function(node, st, c) {
    c(node.body, st, "ScopeBody");
  };
  exports.ScopeBody = function(node, st, c) {
    c(node, st, "Statement");
  };
  exports.Expression = skipThrough;
  exports.ThisExpression = ignore;
  exports.ArrayExpression = function(node, st, c) {
    for (var i = 0; i < node.elements.length; ++i) {
      var elt = node.elements[i];
      if (elt) c(elt, st, "Expression");
    }
  };
  exports.ObjectExpression = function(node, st, c) {
    for (var i = 0; i < node.properties.length; ++i)
      c(node.properties[i].value, st, "Expression");
  };
  exports.FunctionExpression = exports.FunctionDeclaration;
  exports.SequenceExpression = function(node, st, c) {
    for (var i = 0; i < node.expressions.length; ++i)
      c(node.expressions[i], st, "Expression");
  };
  exports.UnaryExpression = exports.UpdateExpression = function(node, st, c) {
    c(node.argument, st, "Expression");
  };
  exports.BinaryExpression = exports.AssignmentExpression = exports.LogicalExpression = function(node, st, c) {
    c(node.left, st, "Expression");
    c(node.right, st, "Expression");
  };
  exports.ConditionalExpression = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.consequent, st, "Expression");
    c(node.alternate, st, "Expression");
  };
  exports.NewExpression = exports.CallExpression = function(node, st, c) {
    c(node.callee, st, "Expression");
    if (node.arguments) for (var i = 0; i < node.arguments.length; ++i)
      c(node.arguments[i], st, "Expression");
  };
  exports.MemberExpression = function(node, st, c) {
    c(node.object, st, "Expression");
    if (node.computed) c(node.property, st, "Expression");
  };
  exports.Identifier = exports.Literal = ignore;
  exports.ClassDeclarationStatement = function(node, st, c) {
    if (node.ivardeclarations) for (var i = 0; i < node.ivardeclarations.length; ++i) {
      c(node.ivardeclarations[i], st, "IvarDeclaration");
    }
    for (var i = 0; i < node.body.length; ++i) {
      c(node.body[i], st, "Statement");
    }
  }
  exports.ImportStatement = ignore;
  exports.IvarDeclaration = ignore;
  exports.MethodDeclarationStatement = ignore;
  exports.PreprocessStatement = ignore;
  exports.ClassStatement = ignore;
  exports.GlobalStatement = ignore;
  exports.MethodDeclarationStatement = function(node, st, c) {
    c(node.body, st, "Statement");
  }
  exports.MessageSendExpression = function(node, st, c) {
    if (!node.superObject) c(node.object, st, "Expression");
    if (node.arguments) for (var i = 0; i < node.arguments.length; ++i)
      c(node.arguments[i], st, "Expression");
    if (node.parameters) for (var i = 0; i < node.parameters.length; ++i)
      c(node.parameters[i], st, "Expression");
  }
  exports.SelectorLiteralExpression = ignore;
  function makeScope(prev) {
    return {vars: Object.create(null), prev: prev};
  }
  exports.scopeVisitor = exports.make({
    Function: function(node, scope, c) {
      var inner = makeScope(scope);
      for (var i = 0; i < node.params.length; ++i)
        inner.vars[node.params[i].name] = {type: "argument", node: node.params[i]};
      if (node.id) {
        var decl = node.type == "FunctionDeclaration";
        (decl ? scope : inner).vars[node.id.name] =
          {type: decl ? "function" : "function name", node: node.id};
      }
      c(node.body, inner, "ScopeBody");
    },
    TryStatement: function(node, scope, c) {
      c(node.block, scope, "Statement");
      for (var i = 0; i < node.handlers.length; ++i) {
        var handler = node.handlers[i], inner = makeScope(scope);
        inner.vars[handler.param.name] = {type: "catch clause", node: handler.param};
        c(handler.body, inner, "ScopeBody");
      }
      if (node.finalizer) c(node.finalizer, scope, "Statement");
    },
    VariableDeclaration: function(node, scope, c) {
      for (var i = 0; i < node.declarations.length; ++i) {
        var decl = node.declarations[i];
        scope.vars[decl.id.name] = {type: "var", node: decl.id};
        if (decl.init) c(decl.init, scope, "Expression");
      }
    }
  });
})(typeof exports == "undefined" ? acorn.walk = {} : exports.acorn.walk);
var Scope = function(prev, base)
{
    this.vars = Object.create(null);
    if (base) for (var key in base) this[key] = base[key];
    this.prev = prev;
    if (prev) this.compiler = prev.compiler;
}
Scope.prototype.compiler = function()
{
    return this.compiler;
}
Scope.prototype.rootScope = function()
{
    return this.prev ? this.prev.rootScope() : this;
}
Scope.prototype.isRootScope = function()
{
    return !this.prev;
}
Scope.prototype.currentClassName = function()
{
    return this.classDef ? this.classDef.className : this.prev ? this.prev.currentClassName() : null;
}
Scope.prototype.getIvarForCurrentClass = function( ivarName)
{
    if (this.ivars)
    {
        var ivar = this.ivars[ivarName];
        if (ivar)
            return ivar;
    }
    var prev = this.prev;
    if (prev && !this.classDef)
        return prev.getIvarForCurrentClass(ivarName);
    return null;
}
Scope.prototype.getLvar = function( lvarName, stopAtMethod)
{
    if (this.vars)
    {
        var lvar = this.vars[lvarName];
        if (lvar)
            return lvar;
    }
    var prev = this.prev;
    if (prev && (!stopAtMethod || !this.methodtype))
        return prev.getLvar(lvarName, stopAtMethod);
    return null;
}
Scope.prototype.currentMethodType = function()
{
    return this.methodType ? this.methodType : this.prev ? this.prev.currentMethodType() : null;
}
Scope.prototype.copyAddedSelfToIvarsToParent = function()
{
  if (this.prev && this.addedSelfToIvars) for (var key in this.addedSelfToIvars)
  {
    var addedSelfToIvar = this.addedSelfToIvars[key],
        scopeAddedSelfToIvar = (this.prev.addedSelfToIvars || (this.prev.addedSelfToIvars = Object.create(null)))[key] || (this.prev.addedSelfToIvars[key] = []);
    scopeAddedSelfToIvar.push.apply(scopeAddedSelfToIvar, addedSelfToIvar);
  }
}
Scope.prototype.addMaybeWarning = function(warning)
{
    var rootScope = this.rootScope();
    (rootScope._maybeWarnings || (rootScope._maybeWarnings = [])).push(warning);
}
Scope.prototype.maybeWarnings = function()
{
    return this.rootScope()._maybeWarnings;
}
var currentCompilerFlags = "";
var reservedIdentifiers = exports.acorn.makePredicate("self _cmd undefined localStorage arguments");
var ObjJAcornCompiler = function( aString, aURL, flags, pass, classDefs)
{
    this.source = aString;
    this.URL = new CFURL(aURL);
 this.pass = pass;
 this.jsBuffer = new StringBuffer();
    this.imBuffer = null;
    this.cmBuffer = null;
    this.warnings = [];
    try {
        this.tokens = exports.acorn.parse(aString);
    }
    catch (e) {
        if (e.lineStart)
        {
            var message = this.prettifyMessage(e, "ERROR");
            console.log(message);
        }
        throw e;
    }
    this.dependencies = [];
    this.flags = flags | ObjJAcornCompiler.Flags.IncludeDebugSymbols;
    this.classDefs = classDefs ? classDefs : Object.create(null);
    this.lastPos = 0;
    compile(this.tokens, new Scope(null ,{ compiler: this }), pass === 2 ? pass2 : pass1);
}
exports.ObjJAcornCompiler = ObjJAcornCompiler;
exports.ObjJAcornCompiler.compileToExecutable = function( aString, aURL, flags)
{
    ObjJAcornCompiler.currentCompileFile = aURL;
    return new ObjJAcornCompiler(aString, aURL, flags, 2).executable();
}
exports.ObjJAcornCompiler.compileToIMBuffer = function( aString, aURL, flags, classDefs)
{
    return new ObjJAcornCompiler(aString, aURL, flags, 2, classDefs).IMBuffer();
}
exports.ObjJAcornCompiler.compileFileDependencies = function( aString, aURL, flags)
{
    ObjJAcornCompiler.currentCompileFile = aURL;
    return new ObjJAcornCompiler(aString, aURL, flags, 1).executable();
}
ObjJAcornCompiler.prototype.compilePass2 = function()
{
    ObjJAcornCompiler.currentCompileFile = this.URL;
 this.pass = 2;
 this.jsBuffer = new StringBuffer();
    this.warnings = [];
    compile(this.tokens, new Scope(null ,{ compiler: this }), pass2);
    for (var i = 0; i < this.warnings.length; i++)
    {
       var message = this.prettifyMessage(this.warnings[i], "WARNING");
        console.log(message);
    }
 return this.jsBuffer.toString();
}
var currentCompilerFlags = "";
exports.setCurrentCompilerFlags = function( compilerFlags)
{
    currentCompilerFlags = compilerFlags;
}
exports.currentCompilerFlags = function( compilerFlags)
{
    return currentCompilerFlags;
}
ObjJAcornCompiler.Flags = { };
ObjJAcornCompiler.Flags.IncludeDebugSymbols = 1 << 0;
ObjJAcornCompiler.Flags.IncludeTypeSignatures = 1 << 1;
ObjJAcornCompiler.prototype.addWarning = function( aWarning)
{
    this.warnings.push(aWarning);
}
ObjJAcornCompiler.prototype.getIvarForClass = function( ivarName, scope)
{
    var ivar = scope.getIvarForCurrentClass(ivarName);
    if (ivar)
        return ivar;
    var c = this.getClassDef(scope.currentClassName());
    while (c)
    {
        var ivars = c.ivars;
        if (ivars)
        {
            var ivarDef = ivars[ivarName];
            if (ivarDef)
                return ivarDef;
        }
        c = this.getClassDef(c.superClassName);
    }
}
ObjJAcornCompiler.prototype.getClassDef = function( aClassName)
{
    if (!aClassName) return null;
 var c = this.classDefs[aClassName];
 if (c) return c;
 if (objj_getClass)
 {
  var aClass = objj_getClass(aClassName);
  if (aClass)
  {
   var ivars = class_copyIvarList(aClass),
    ivarSize = ivars.length,
    myIvars = Object.create(null),
    superClass = aClass.super_class;
   for (var i = 0; i < ivarSize; i++)
   {
    var ivar = ivars[i];
       myIvars[ivar.name] = {"type": ivar.type, "name": ivar.name};
   }
   c = {"className": aClassName, "ivars": myIvars};
   if (superClass)
    c.superClassName = superClass.name;
   this.classDefs[aClassName] = c;
   return c;
  }
 }
 return null;
}
ObjJAcornCompiler.prototype.executable = function()
{
    if (!this._executable)
        this._executable = new Executable(this.jsBuffer ? this.jsBuffer.toString() : null, this.dependencies, this.URL, null, this);
    return this._executable;
}
ObjJAcornCompiler.prototype.IMBuffer = function()
{
    return this.imBuffer;
}
ObjJAcornCompiler.prototype.JSBuffer = function()
{
    return this.jsBuffer;
}
ObjJAcornCompiler.prototype.prettifyMessage = function( aMessage, messageType)
{
    var line = this.source.substring(aMessage.lineStart, aMessage.lineEnd),
        message = "\n" + line;
    message += (new Array(aMessage.column + 1)).join(" ");
    message += (new Array(Math.min(1, line.length) + 1)).join("^") + "\n";
    message += messageType + " line " + aMessage.line + " in " + this.URL + ": " + aMessage.message;
    return message;
}
ObjJAcornCompiler.prototype.error_message = function(errorMessage, node)
{
    var pos = exports.acorn.getLineInfo(this.source, node.start),
        syntaxError = {message: errorMessage, line: pos.line, column: pos.column, lineStart: pos.lineStart, lineEnd: pos.lineEnd};
    return new SyntaxError(this.prettifyMessage(syntaxError, "ERROR"));
}
ObjJAcornCompiler.prototype.pushImport = function(url)
{
    if (!ObjJAcornCompiler.importStack) ObjJAcornCompiler.importStack = [];
    ObjJAcornCompiler.importStack.push(url);
}
ObjJAcornCompiler.prototype.popImport = function()
{
    ObjJAcornCompiler.importStack.pop();
}
function createMessage( aMessage, node, code)
{
    var message = exports.acorn.getLineInfo(code, node.start);
    message.message = aMessage;
    return message;
}
function compile(node, state, visitor) {
    function c(node, st, override) {
      visitor[override || node.type](node, st, c);
    }
    c(node, state);
};
var pass1 = exports.acorn.walk.make({
ImportStatement: function(node, st, c) {
    var urlString = node.filename.value;
    st.compiler.dependencies.push(new FileDependency(new CFURL(urlString), node.localfilepath));
}
});
var pass2 = exports.acorn.walk.make({
Program: function(node, st, c) {
    for (var i = 0; i < node.body.length; ++i) {
      c(node.body[i], st, "Statement");
    }
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.end);
    var maybeWarnings = st.maybeWarnings();
    if (maybeWarnings) for (var i = 0; i < maybeWarnings.length; i++) {
        var maybeWarning = maybeWarnings[i];
        if (!st.getLvar(maybeWarning.identifier) && typeof global[maybeWarning.identifier] === "undefined" && typeof window[maybeWarning.identifier] === "undefined" && !st.compiler.getClassDef(maybeWarning.identifier)) {
            st.compiler.addWarning(maybeWarning.message);
        }
    }
},
Function: function(node, scope, c) {
  var inner = new Scope(scope);
  for (var i = 0; i < node.params.length; ++i)
    inner.vars[node.params[i].name] = {type: "argument", node: node.params[i]};
  if (node.id) {
    var decl = node.type == "FunctionDeclaration";
    (decl ? scope : inner).vars[node.id.name] =
      {type: decl ? "function" : "function name", node: node.id};
    scope.compiler.jsBuffer.atoms[scope.compiler.jsBuffer.atoms.length] = scope.compiler.source.substring(scope.compiler.lastPos, node.start);
    scope.compiler.jsBuffer.atoms[scope.compiler.jsBuffer.atoms.length] = node.id.name;
    scope.compiler.jsBuffer.atoms[scope.compiler.jsBuffer.atoms.length] = " = function";
    scope.compiler.lastPos = node.id.end;
  }
  c(node.body, inner, "ScopeBody");
  inner.copyAddedSelfToIvarsToParent();
},
TryStatement: function(node, scope, c) {
  c(node.block, scope, "Statement");
  for (var i = 0; i < node.handlers.length; ++i) {
    var handler = node.handlers[i], inner = new Scope(scope);
    inner.vars[handler.param.name] = {type: "catch clause", node: handler.param};
    c(handler.body, inner, "ScopeBody");
    inner.copyAddedSelfToIvarsToParent();
  }
  if (node.finalizer) c(node.finalizer, scope, "Statement");
},
VariableDeclaration: function(node, scope, c) {
  for (var i = 0; i < node.declarations.length; ++i) {
    var decl = node.declarations[i],
        identifier = decl.id.name;
    scope.vars[identifier] = {type: "var", node: decl.id};
    if (decl.init) c(decl.init, scope, "Expression");
    if (scope.addedSelfToIvars) {
      var addedSelfToIvar = scope.addedSelfToIvars[identifier];
      if (addedSelfToIvar) {
        var buffer = scope.compiler.jsBuffer.atoms;
        for (var i = 0; i < addedSelfToIvar.length; i++) {
          var dict = addedSelfToIvar[i];
          buffer[dict.index] = "";
          scope.compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", dict.node, scope.compiler.source));
        }
        scope.addedSelfToIvars[identifier] = [];
      }
    }
  }
},
AssignmentExpression: function(node, st, c) {
    var saveAssignment = st.assignment;
    st.assignment = true;
    c(node.left, st, "Expression");
    st.assignment = saveAssignment;
    c(node.right, st, "Expression");
    if (st.isRootScope() && node.left.type === "Identifier" && !st.getLvar(node.left.name))
        st.vars[node.left.name] = {type: "global", node: node.left};
},
MemberExpression: function(node, st, c) {
    c(node.object, st, "Expression");
    st.secondMemberExpression = !node.computed;
    c(node.property, st, "Expression");
    st.secondMemberExpression = false;
},
ImportStatement: function(node, st, c) {
    var buffer = st.compiler.jsBuffer;
    if (!buffer) return;
    buffer.atoms[buffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    buffer.atoms[buffer.atoms.length] = "objj_executeFile(\"";
    buffer.atoms[buffer.atoms.length] = node.filename.value;
    buffer.atoms[buffer.atoms.length] = node.localfilepath ? "\", YES);" : "\", NO);";
    st.compiler.lastPos = node.end;
},
ClassDeclarationStatement: function(node, st, c) {
    var classDef,
        saveJSBuffer = st.compiler.jsBuffer,
        className = node.classname.name,
        classScope = new Scope(st);
    st.compiler.imBuffer = new StringBuffer();
    st.compiler.cmBuffer = new StringBuffer();
    st.compiler.classBodyBuffer = new StringBuffer();
    saveJSBuffer.atoms[saveJSBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    if (node.superclassname)
    {
        classDef = st.compiler.getClassDef(className);
        if (classDef && classDef.ivars)
            throw st.compiler.error_message("Duplicate class " + className, node.classname);
        if (!st.compiler.getClassDef(node.superclassname.name))
        {
            var errorMessage = "Can't find superclass " + node.superclassname.name;
            for (var i = ObjJAcornCompiler.importStack.length; --i >= 0;)
                errorMessage += "\n" + Array((ObjJAcornCompiler.importStack.length - i) * 2 + 1).join(" ") + "Imported by: " + ObjJAcornCompiler.importStack[i];
            throw st.compiler.error_message(errorMessage, node.superclassname);
        }
        classDef = {"className": className, "superClassName": node.superclassname.name, "ivars": Object.create(null), "methods": Object.create(null)};
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "{var the_class = objj_allocateClassPair(" + node.superclassname.name + ", \"" + className + "\"),\nmeta_class = the_class.isa;";
    }
    else if (node.categoryname)
    {
        classDef = st.compiler.getClassDef(className);
        if (!classDef)
            throw st.compiler.error_message("Class " + className + " not found ", node.classname);
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "{\nvar the_class = objj_getClass(\"" + className + "\")\n";
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\"" + className + "\\\"\");\n";
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "var meta_class = the_class.isa;";
    }
    else
    {
        classDef = {"className": className, "superClassName": null, "ivars": Object.create(null), "methods": Object.create(null)};
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "{var the_class = objj_allocateClassPair(Nil, \"" + className + "\"),\nmeta_class = the_class.isa;";
    }
    classScope.classDef = classDef;
    st.compiler.currentSuperClass = "objj_getClass(\"" + className + "\").super_class";
    st.compiler.currentSuperMetaClass = "objj_getMetaClass(\"" + className + "\").super_class";
    var firstIvarDeclaration = true,
        hasAccessors = false;
    if (node.ivardeclarations) for (var i = 0; i < node.ivardeclarations.length; ++i)
    {
        var ivarDecl = node.ivardeclarations[i],
            ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null,
            ivarName = ivarDecl.id.name,
            ivar = {"type": ivarType, "name": ivarName};
        if (firstIvarDeclaration)
        {
            firstIvarDeclaration = false;
            saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "class_addIvars(the_class, [";
        }
        else
            saveJSBuffer.atoms[saveJSBuffer.atoms.length] = ", ";
        if (st.compiler.flags & ObjJAcornCompiler.Flags.IncludeTypeSignatures)
            saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "new objj_ivar(\"" + ivarName + "\", \"" + ivarType + "\")";
        else
            saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "new objj_ivar(\"" + ivarName + "\")";
        if (ivarDecl.outlet)
            ivar.outlet = true;
        classDef.ivars[ivarName] = ivar;
        if (!classScope.ivars)
            classScope.ivars = Object.create(null);
        classScope.ivars[ivarName] = {type: "ivar", name: ivarName, node: ivarDecl.id, ivar: ivar};
        if (!hasAccessors && ivarDecl.accessors)
            hasAccessors = true;
    }
    if (!firstIvarDeclaration)
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "]);";
    if (hasAccessors)
    {
        var getterSetterBuffer = new StringBuffer();
        getterSetterBuffer.atoms[getterSetterBuffer.atoms.length] = st.compiler.source.substring(node.start, node.endOfIvars);
        getterSetterBuffer.atoms[getterSetterBuffer.atoms.length] = "\n";
        for (var i = 0; i < node.ivardeclarations.length; ++i)
        {
            var ivarDecl = node.ivardeclarations[i],
                ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null,
                ivarName = ivarDecl.id.name,
                accessors = ivarDecl.accessors;
            if (!accessors)
                continue;
            var property = (accessors.property && accessors.property.name) || ivarName,
                getterName = (accessors.getter && accessors.getter.name) || property,
                getterCode = "- (" + (ivarType ? ivarType : "id") + ")" + getterName + "\n{\nreturn " + ivarName + ";\n}\n";
            getterSetterBuffer.atoms[getterSetterBuffer.atoms.length] = getterCode;
            if (accessors.readonly)
                continue;
            var setterName = accessors.setter ? accessors.setter.name : null;
            if (!setterName)
            {
                var start = property.charAt(0) == '_' ? 1 : 0;
                setterName = (start ? "_" : "") + "set" + property.substr(start, 1).toUpperCase() + property.substring(start + 1) + ":";
            }
            var setterCode = "- (void)" + setterName + "(" + (ivarType ? ivarType : "id") + ")newValue\n{\n";
            if (accessors.copy)
                setterCode += "if (" + ivarName + " !== newValue)\n" + ivarName + " = [newValue copy];\n}\n";
            else
                setterCode += ivarName + " = newValue;\n}\n";
            getterSetterBuffer.atoms[getterSetterBuffer.atoms.length] = setterCode;
        }
        getterSetterBuffer.atoms[getterSetterBuffer.atoms.length] = "\n@end";
        var b = getterSetterBuffer.toString().replace(/@accessors(\(.*\))?/g, "");
        var imBuffer = ObjJAcornCompiler.compileToIMBuffer(b, "Accessors", st.compiler.flags, st.compiler.classDefs);
        st.compiler.imBuffer.atoms[st.compiler.imBuffer.atoms.length] = imBuffer;
    }
    st.compiler.classDefs[className] = classDef;
    if (node.body.length > 0)
    {
        st.compiler.lastPos = node.body[0].start;
        for (var i = 0; i < node.body.length; ++i) {
            var body = node.body[i];
            c(body, classScope, "Statement");
        }
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, body.end);
    }
    if (!node.categoryname) {
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "objj_registerClassPair(the_class);\n";
    }
    if (st.compiler.imBuffer.atoms.length !== 0)
    {
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "class_addMethods(the_class, [";
        saveJSBuffer.atoms.push.apply(saveJSBuffer.atoms, st.compiler.imBuffer.atoms);
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "]);\n";
    }
    if (st.compiler.cmBuffer.atoms.length !== 0)
    {
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "class_addMethods(meta_class, [";
        saveJSBuffer.atoms.push.apply(saveJSBuffer.atoms, st.compiler.cmBuffer.atoms);
        saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "]);\n";
    }
    saveJSBuffer.atoms[saveJSBuffer.atoms.length] = "}";
    st.compiler.jsBuffer = saveJSBuffer;
    st.compiler.lastPos = node.end;
},
MethodDeclarationStatement: function(node, st, c) {
    var saveJSBuffer = st.compiler.jsBuffer,
        methodScope = new Scope(st),
        selectors = node.selectors,
        arguments = node.arguments,
        types = [node.returntype ? node.returntype.name : "id"],
        selector = selectors[0].name;
    saveJSBuffer.atoms[saveJSBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.jsBuffer = node.methodtype === '-' ? st.compiler.imBuffer : st.compiler.cmBuffer;
    for (var i = 0; i < arguments.length; i++) {
        if (i === 0)
            selector += ":";
        else
            selector += (selectors[i] ? selectors[i].name : "") + ":";
    }
    if (st.compiler.jsBuffer.atoms.length !== 0)
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ", ";
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "new objj_method(sel_getUid(\"";
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = selector;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "\"), function";
    if (st.compiler.flags & ObjJAcornCompiler.Flags.IncludeDebugSymbols)
    {
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = " $" + st.currentClassName() + "__" + selector.replace(/:/g, "_");
    }
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "(self, _cmd";
    methodScope.methodType = node.methodtype;
    if (arguments) for (var i = 0; i < arguments.length; i++)
    {
        var argument = arguments[i],
            argumentName = argument.identifier.name;
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ", ";
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = argumentName;
        types.push(argument.type ? argument.type.name : null);
        methodScope.vars[argumentName] = {type: "method argument", node: argument};
    }
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ")";
    st.compiler.lastPos = node.startOfBody;
    c(node.body, methodScope, "Statement");
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.body.end);
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "\n";
    if (st.compiler.flags & ObjJAcornCompiler.Flags.IncludeDebugSymbols)
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ","+JSON.stringify(types);
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ")";
    st.compiler.jsBuffer = saveJSBuffer;
    st.compiler.lastPos = node.end;
},
MessageSendExpression: function(node, st, c) {
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.lastPos = node.object ? node.object.start : node.arguments.length ? node.arguments[0].start : node.end;
    if (node.superObject)
    {
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "objj_msgSendSuper(";
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "{ receiver:self, super_class:" + (st.currentMethodType() === "+" ? st.compiler.currentSuperMetaClass : st.compiler.currentSuperClass ) + " }";
    }
    else
    {
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "objj_msgSend(";
        c(node.object, st, "Expression");
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.object.end);
    }
    var selectors = node.selectors,
        arguments = node.arguments,
        selector = selectors[0].name;
    for (var i = 0; i < arguments.length; i++)
        if (i === 0)
            selector += ":";
        else
            selector += (selectors[i] ? selectors[i].name : "") + ":";
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ", \"";
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = selector;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "\"";
    if (node.arguments) for (var i = 0; i < node.arguments.length; i++)
    {
        var argument = node.arguments[i];
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ", ";
        st.compiler.lastPos = argument.start;
        c(argument, st, "Expression");
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, argument.end);
        st.compiler.lastPos = argument.end;
    }
    if (node.parameters) for (var i = 0; i < node.parameters.length; ++i)
    {
        var parameter = node.parameters[i];
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ", ";
        st.compiler.lastPos = parameter.start;
        c(parameter, st, "Expression");
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, parameter.end);
        st.compiler.lastPos = parameter.end;
    }
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = ")";
    st.compiler.lastPos = node.end;
},
Identifier: function(node, st, c) {
    if (st.currentMethodType() === "-" && !st.secondMemberExpression)
    {
        var identifier = node.name,
            lvar = st.getLvar(identifier, true),
            ivar = st.compiler.getIvarForClass(identifier, st);
        if (ivar)
        {
            if (lvar)
                st.compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", node, st.compiler.source));
            else
            {
                var nodeStart = node.start,
                    compiler = st.compiler;
                do {
                    compiler.jsBuffer.atoms[compiler.jsBuffer.atoms.length] = compiler.source.substring(compiler.lastPos, nodeStart);
                    compiler.lastPos = nodeStart;
                } while (compiler.source.substr(nodeStart++, 1) === "(")
                ((st.addedSelfToIvars || (st.addedSelfToIvars = Object.create(null)))[identifier] || (st.addedSelfToIvars[identifier] = [])).push({node: node, index: compiler.jsBuffer.atoms.length});
                compiler.jsBuffer.atoms[compiler.jsBuffer.atoms.length] = "self.";
            }
        } else {
            if (!reservedIdentifiers(identifier) && !st.getLvar(identifier) && typeof global[identifier] === "undefined" && typeof window[identifier] === "undefined" && !st.compiler.getClassDef(identifier)) {
                var message;
                if (st.assignment) {
                    message = createMessage("Creating global variable inside function or method '" + identifier + "'", node, st.compiler.source);
                    st.vars[identifier] = {type: "global", node: node};
                } else
                    message = createMessage("Using unknown class or uninitialized global variable '" + identifier + "'", node, st.compiler.source);
                st.addMaybeWarning({identifier: identifier, message: message});
            }
        }
    }
},
SelectorLiteralExpression: function(node, st, c) {
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "sel_getUid(\"";
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = node.selector;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "\")";
    st.compiler.lastPos = node.end;
},
Literal: function(node, st, c) {
    if (node.raw && node.raw.charAt(0) === "@")
    {
        st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
        st.compiler.lastPos = node.start + 1;
    }
},
ObjectExpression: function(node, st, c) {
    for (var i = 0; i < node.properties.length; ++i)
    {
        var prop = node.properties[i];
        if (prop.key.raw && prop.key.raw.charAt(0) === "@")
        {
            st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, prop.key.start);
            st.compiler.lastPos = prop.key.start + 1;
        }
        c(prop.value, st, "Expression");
    }
},
PreprocessStatement: function(node, st, c) {
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.lastPos = node.start;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "//";
},
ClassStatement: function(node, st, c) {
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.lastPos = node.start;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "//";
    var className = node.id.name;
    if (!st.compiler.getClassDef(className)) {
        classDef = {"className": className};
        st.compiler.classDefs[className] = classDef;
    }
    st.vars[node.id.name] = {type: "class", node: node.id};
},
GlobalStatement: function(node, st, c) {
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = st.compiler.source.substring(st.compiler.lastPos, node.start);
    st.compiler.lastPos = node.start;
    st.compiler.jsBuffer.atoms[st.compiler.jsBuffer.atoms.length] = "//";
    st.rootScope().vars[node.id.name] = {type: "global", node: node.id};
}
});
function FileDependency( aURL, isLocal)
{
    this._URL = aURL;
    this._isLocal = isLocal;
}
exports.FileDependency = FileDependency;
FileDependency.prototype.URL = function()
{
    return this._URL;
}
FileDependency.prototype.isLocal = function()
{
    return this._isLocal;
}
FileDependency.prototype.toMarkedString = function()
{
    var URLString = this.URL().absoluteString();
    return (this.isLocal() ? MARKER_IMPORT_LOCAL : MARKER_IMPORT_STD) + ";" +
            URLString.length + ";" + URLString;
}
FileDependency.prototype.toString = function()
{
    return (this.isLocal() ? "LOCAL: " : "STD: ") + this.URL();
}
var ExecutableUnloadedFileDependencies = 0,
    ExecutableLoadingFileDependencies = 1,
    ExecutableLoadedFileDependencies = 2,
    AnonymousExecutableCount = 0;
function Executable( aCode, fileDependencies, aURL, aFunction, aCompiler, aFilenameTranslateDictionary)
{
    if (arguments.length === 0)
        return this;
    this._code = aCode;
    this._function = aFunction || null;
    this._URL = makeAbsoluteURL(aURL || new CFURL("(Anonymous" + (AnonymousExecutableCount++) + ")"));
    this._compiler = aCompiler || null;
    this._fileDependencies = fileDependencies;
    this._filenameTranslateDictionary = aFilenameTranslateDictionary;
    if (fileDependencies.length)
    {
        this._fileDependencyStatus = ExecutableUnloadedFileDependencies;
        this._fileDependencyCallbacks = [];
    }
    else
        this._fileDependencyStatus = ExecutableLoadedFileDependencies;
    if (this._function)
        return;
    if (!aCompiler)
        this.setCode(aCode);
}
exports.Executable = Executable;
Executable.prototype.path = function()
{
    return this.URL().path();
};
Executable.prototype.URL = function()
{
    return this._URL;
};
Executable.prototype.URL.displayName = "Executable.prototype.URL";
Executable.prototype.functionParameters = function()
{
    var functionParameters = ["global", "objj_executeFile", "objj_importFile"];
    return functionParameters;
};
Executable.prototype.functionParameters.displayName = "Executable.prototype.functionParameters";
Executable.prototype.functionArguments = function()
{
    var functionArguments = [global, this.fileExecuter(), this.fileImporter()];
    return functionArguments;
};
Executable.prototype.functionArguments.displayName = "Executable.prototype.functionArguments";
Executable.prototype.execute = function()
{
    if (this._compiler)
    {
        var fileDependencies = this.fileDependencies(),
            index = 0,
            count = fileDependencies.length;
        this._compiler.pushImport(this.URL().lastPathComponent());
        for (; index < count; ++index)
        {
            var fileDependency = fileDependencies[index],
                isQuoted = fileDependency.isLocal(),
                URL = fileDependency.URL();
            this.fileExecuter()(URL, isQuoted);
        }
        this._compiler.popImport();
        this.setCode(this._compiler.compilePass2());
        this._compiler = null;
    }
    var oldContextBundle = CONTEXT_BUNDLE;
    CONTEXT_BUNDLE = CFBundle.bundleContainingURL(this.URL());
    var result = this._function.apply(global, this.functionArguments());
    CONTEXT_BUNDLE = oldContextBundle;
    return result;
};
Executable.prototype.execute.displayName = "Executable.prototype.execute";
Executable.prototype.code = function()
{
    return this._code;
};
Executable.prototype.code.displayName = "Executable.prototype.code";
Executable.prototype.setCode = function(code)
{
    this._code = code;
    var parameters = this.functionParameters().join(",");
        var absoluteString = this.URL().absoluteString();
        code += "/**/\n//@ sourceURL=" + absoluteString;
        this._function = new Function(parameters, code);
    this._function.displayName = absoluteString;
}
Executable.prototype.setCode.displayName = "Executable.prototype.setCode";
Executable.prototype.fileDependencies = function()
{
    return this._fileDependencies;
}
Executable.prototype.fileDependencies.displayName = "Executable.prototype.fileDependencies";
Executable.prototype.hasLoadedFileDependencies = function()
{
    return this._fileDependencyStatus === ExecutableLoadedFileDependencies;
}
Executable.prototype.hasLoadedFileDependencies.displayName = "Executable.prototype.hasLoadedFileDependencies";
var fileDependencyLoadCount = 0,
    fileDependencyExecutables = [],
    fileDependencyMarkers = { };
Executable.prototype.loadFileDependencies = function(aCallback)
{
    var status = this._fileDependencyStatus;
    if (aCallback)
    {
        if (status === ExecutableLoadedFileDependencies)
            return aCallback();
        this._fileDependencyCallbacks.push(aCallback);
    }
    if (status === ExecutableUnloadedFileDependencies)
    {
        if (fileDependencyLoadCount)
            throw "Can't load";
        loadFileDependenciesForExecutable(this);
    }
}
Executable.prototype.loadFileDependencies.displayName = "Executable.prototype.loadFileDependencies";
function loadFileDependenciesForExecutable( anExecutable)
{
    fileDependencyExecutables.push(anExecutable);
    anExecutable._fileDependencyStatus = ExecutableLoadingFileDependencies;
    var fileDependencies = anExecutable.fileDependencies(),
        index = 0,
        count = fileDependencies.length,
        referenceURL = anExecutable.referenceURL(),
        referenceURLString = referenceURL.absoluteString(),
        fileExecutableSearcher = anExecutable.fileExecutableSearcher();
    fileDependencyLoadCount += count;
    for (; index < count; ++index)
    {
        var fileDependency = fileDependencies[index],
            isQuoted = fileDependency.isLocal(),
            URL = fileDependency.URL(),
            marker = (isQuoted && (referenceURLString + " ") || "") + URL;
        if (fileDependencyMarkers[marker])
        {
            if (--fileDependencyLoadCount === 0)
                fileExecutableDependencyLoadFinished();
            continue;
        }
        fileDependencyMarkers[marker] = YES;
        fileExecutableSearcher(URL, isQuoted, fileExecutableSearchFinished);
    }
}
function fileExecutableSearchFinished( aFileExecutable)
{
    --fileDependencyLoadCount;
    if (aFileExecutable._fileDependencyStatus === ExecutableUnloadedFileDependencies)
        loadFileDependenciesForExecutable(aFileExecutable);
    else if (fileDependencyLoadCount === 0)
        fileExecutableDependencyLoadFinished();
}
function fileExecutableDependencyLoadFinished()
{
    var executables = fileDependencyExecutables,
        index = 0,
        count = executables.length;
    fileDependencyExecutables = [];
    for (; index < count; ++index)
        executables[index]._fileDependencyStatus = ExecutableLoadedFileDependencies;
    for (index = 0; index < count; ++index)
    {
        var executable = executables[index],
            callbacks = executable._fileDependencyCallbacks,
            callbackIndex = 0,
            callbackCount = callbacks.length;
        for (; callbackIndex < callbackCount; ++callbackIndex)
            callbacks[callbackIndex]();
        executable._fileDependencyCallbacks = [];
    }
}
Executable.prototype.referenceURL = function()
{
    if (this._referenceURL === undefined)
        this._referenceURL = new CFURL(".", this.URL());
    return this._referenceURL;
}
Executable.prototype.referenceURL.displayName = "Executable.prototype.referenceURL";
Executable.prototype.fileImporter = function()
{
    return Executable.fileImporterForURL(this.referenceURL());
}
Executable.prototype.fileImporter.displayName = "Executable.prototype.fileImporter";
Executable.prototype.fileExecuter = function()
{
    return Executable.fileExecuterForURL(this.referenceURL());
}
Executable.prototype.fileExecuter.displayName = "Executable.prototype.fileExecuter";
Executable.prototype.fileExecutableSearcher = function()
{
    return Executable.fileExecutableSearcherForURL(this.referenceURL());
}
Executable.prototype.fileExecutableSearcher.displayName = "Executable.prototype.fileExecutableSearcher";
var cachedFileExecuters = { };
Executable.fileExecuterForURL = function( aURL)
{
    var referenceURL = makeAbsoluteURL(aURL),
        referenceURLString = referenceURL.absoluteString(),
        cachedFileExecuter = cachedFileExecuters[referenceURLString];
    if (!cachedFileExecuter)
    {
        cachedFileExecuter = function( aURL, isQuoted, shouldForce)
        {
            Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,
            function( aFileExecutable)
            {
                if (!aFileExecutable.hasLoadedFileDependencies())
                    throw "No executable loaded for file at URL " + aURL;
                aFileExecutable.execute(shouldForce);
            });
        }
        cachedFileExecuters[referenceURLString] = cachedFileExecuter;
    }
    return cachedFileExecuter;
}
Executable.fileExecuterForURL.displayName = "Executable.fileExecuterForURL";
var cachedFileImporters = { };
Executable.fileImporterForURL = function( aURL)
{
    var referenceURL = makeAbsoluteURL(aURL),
        referenceURLString = referenceURL.absoluteString(),
        cachedFileImporter = cachedFileImporters[referenceURLString];
    if (!cachedFileImporter)
    {
        cachedFileImporter = function( aURL, isQuoted, aCallback)
        {
            enableCFURLCaching();
            Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,
            function( aFileExecutable)
            {
                aFileExecutable.loadFileDependencies(function()
                {
                    aFileExecutable.execute();
                    disableCFURLCaching();
                    if (aCallback)
                        aCallback();
                });
            });
        }
        cachedFileImporters[referenceURLString] = cachedFileImporter;
    }
    return cachedFileImporter;
}
Executable.fileImporterForURL.displayName = "Executable.fileImporterForURL";
var cachedFileExecutableSearchers = { },
    cachedFileExecutableSearchResults = { };
function countProp(x) {
    var count = 0;
    for (var k in x) {
        if (x.hasOwnProperty(k)) {
            ++count;
        }
    }
    return count;
}
Executable.resetCachedFileExecutableSearchers = function()
{
    cachedFileExecutableSearchers = { };
    cachedFileExecutableSearchResults = { };
    cachedFileImporters = { };
    cachedFileExecuters = { };
    fileDependencyMarkers = { };
}
Executable.fileExecutableSearcherForURL = function( referenceURL)
{
    var referenceURLString = referenceURL.absoluteString(),
        cachedFileExecutableSearcher = cachedFileExecutableSearchers[referenceURLString],
        aFilenameTranslateDictionary = Executable.filenameTranslateDictionary ? Executable.filenameTranslateDictionary() : null;
        cachedSearchResults = { };
    if (!cachedFileExecutableSearcher)
    {
        cachedFileExecutableSearcher = function( aURL, isQuoted, success)
        {
            var cacheUID = (isQuoted && referenceURL || "") + aURL,
                cachedResult = cachedFileExecutableSearchResults[cacheUID];
            if (cachedResult)
                return completed(cachedResult);
            var isAbsoluteURL = (aURL instanceof CFURL) && aURL.scheme();
            if (isQuoted || isAbsoluteURL)
            {
                if (!isAbsoluteURL)
                    aURL = new CFURL(aURL, referenceURL);
                StaticResource.resolveResourceAtURL(aURL, NO, completed, aFilenameTranslateDictionary);
            }
            else
                StaticResource.resolveResourceAtURLSearchingIncludeURLs(aURL, completed);
            function completed( aStaticResource)
            {
                if (!aStaticResource)
                {
                    var compilingFileUrl = ObjJAcornCompiler ? ObjJAcornCompiler.currentCompileFile : null;
                    throw new Error("Could not load file at " + aURL + (compilingFileUrl ? " when compiling " + compilingFileUrl : ""));
                }
                cachedFileExecutableSearchResults[cacheUID] = aStaticResource;
                success(new FileExecutable(aStaticResource.URL(), aFilenameTranslateDictionary));
            }
        };
        cachedFileExecutableSearchers[referenceURLString] = cachedFileExecutableSearcher;
    }
    return cachedFileExecutableSearcher;
}
Executable.fileExecutableSearcherForURL.displayName = "Executable.fileExecutableSearcherForURL";
var FileExecutablesForURLStrings = { };
function FileExecutable( aURL, aFilenameTranslateDictionary)
{
    aURL = makeAbsoluteURL(aURL);
    var URLString = aURL.absoluteString(),
        existingFileExecutable = FileExecutablesForURLStrings[URLString];
    if (existingFileExecutable)
        return existingFileExecutable;
    FileExecutablesForURLStrings[URLString] = this;
    var fileContents = StaticResource.resourceAtURL(aURL).contents(),
        executable = NULL,
        extension = aURL.pathExtension();
    if (fileContents.match(/^@STATIC;/))
        executable = decompile(fileContents, aURL);
    else if ((extension === "j" || !extension) && !fileContents.match(/^{/))
        executable = exports.ObjJAcornCompiler.compileFileDependencies(fileContents, aURL, ObjJAcornCompiler.Flags.IncludeDebugSymbols);
    else
        executable = new Executable(fileContents, [], aURL);
    Executable.apply(this, [executable.code(), executable.fileDependencies(), aURL, executable._function, executable._compiler, aFilenameTranslateDictionary]);
    this._hasExecuted = NO;
}
exports.FileExecutable = FileExecutable;
FileExecutable.prototype = new Executable();
FileExecutable.resetFileExecutables = function()
{
    FileExecutablesForURLStrings = { };
    FunctionCache = { };
}
FileExecutable.prototype.execute = function( shouldForce)
{
    if (this._hasExecuted && !shouldForce)
        return;
    this._hasExecuted = YES;
    Executable.prototype.execute.call(this);
}
FileExecutable.prototype.execute.displayName = "FileExecutable.prototype.execute";
FileExecutable.prototype.hasExecuted = function()
{
    return this._hasExecuted;
}
FileExecutable.prototype.hasExecuted.displayName = "FileExecutable.prototype.hasExecuted";
function decompile( aString, aURL)
{
    var stream = new MarkedStream(aString);
    var marker = NULL,
        code = "",
        dependencies = [];
    while (marker = stream.getMarker())
    {
        var text = stream.getString();
        if (marker === MARKER_TEXT)
            code += text;
        else if (marker === MARKER_IMPORT_STD)
            dependencies.push(new FileDependency(new CFURL(text), NO));
        else if (marker === MARKER_IMPORT_LOCAL)
            dependencies.push(new FileDependency(new CFURL(text), YES));
    }
    var fn = FileExecutable._lookupCachedFunction(aURL)
    if (fn)
        return new Executable(code, dependencies, aURL, fn);
    return new Executable(code, dependencies, aURL);
}
var FunctionCache = { };
FileExecutable._cacheFunction = function( aURL, fn)
{
    aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
    FunctionCache[aURL] = fn;
}
FileExecutable._lookupCachedFunction = function( aURL)
{
    aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
    return FunctionCache[aURL];
}
var CLS_CLASS = 0x1,
    CLS_META = 0x2,
    CLS_INITIALIZED = 0x4,
    CLS_INITIALIZING = 0x8;
objj_ivar = function( aName, aType)
{
    this.name = aName;
    this.type = aType;
}
objj_ivar.displayName = "objj_ivar";
objj_method = function( aName, anImplementation, types)
{
    this.name = aName;
    this.method_imp = anImplementation;
    this.types = types;
}
objj_method.displayName = "objj_method";
objj_class = function(displayName)
{
    this.isa = NULL;
    this.version = 0;
    this.super_class = NULL;
    this.sub_classes = [];
    this.name = NULL;
    this.info = 0;
    this.ivar_list = [];
    this.ivar_store = function() { };
    this.ivar_dtable = this.ivar_store.prototype;
    this.method_list = [];
    this.method_store = function() { };
    this.method_dtable = this.method_store.prototype;
    eval("this.allocator = function " + (displayName || "OBJJ_OBJECT").replace(/\W/g, "_") + "() { }");
    this._UID = -1;
}
objj_class.displayName = "objj_class";
objj_object = function()
{
    this.isa = NULL;
    this._UID = -1;
}
objj_object.displayName = "objj_object";
class_getName = function( aClass)
{
    if (aClass == Nil)
        return "";
    return aClass.name;
}
class_getName.displayName = "class_getName";
class_isMetaClass = function( aClass)
{
    if (!aClass)
        return NO;
    return ((aClass.info & (CLS_META)));
}
class_isMetaClass.displayName = "class_isMetaClass";
class_getSuperclass = function( aClass)
{
    if (aClass == Nil)
        return Nil;
    return aClass.super_class;
}
class_getSuperclass.displayName = "class_getSuperclass"
class_setSuperclass = function( aClass, aSuperClass)
{
    aClass.super_class = aSuperClass;
    aClass.isa.super_class = aSuperClass.isa;
}
class_setSuperclass.displayName = "class_setSuperclass";
class_addIvar = function( aClass, aName, aType)
{
    var thePrototype = aClass.allocator.prototype;
    if (typeof thePrototype[aName] != "undefined")
        return NO;
    var ivar = new objj_ivar(aName, aType);
    aClass.ivar_list.push(ivar);
    aClass.ivar_dtable[aName] = ivar;
    thePrototype[aName] = NULL;
    return YES;
}
class_addIvar.displayName = "class_addIvar";
class_addIvars = function( aClass, ivars)
{
    var index = 0,
        count = ivars.length,
        thePrototype = aClass.allocator.prototype;
    for (; index < count; ++index)
    {
        var ivar = ivars[index],
            name = ivar.name;
        if (typeof thePrototype[name] === "undefined")
        {
            aClass.ivar_list.push(ivar);
            aClass.ivar_dtable[name] = ivar;
            thePrototype[name] = NULL;
        }
    }
}
class_addIvars.displayName = "class_addIvars";
class_copyIvarList = function( aClass)
{
    return aClass.ivar_list.slice(0);
}
class_copyIvarList.displayName = "class_copyIvarList";
class_addMethod = function( aClass, aName, anImplementation, types)
{
    var method = new objj_method(aName, anImplementation, types);
    aClass.method_list.push(method);
    aClass.method_dtable[aName] = method;
    method.method_imp.displayName = (((aClass.info & (CLS_META))) ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
    if (!((aClass.info & (CLS_META))) && (((aClass.info & (CLS_META))) ? aClass : aClass.isa).isa === (((aClass.info & (CLS_META))) ? aClass : aClass.isa))
        class_addMethod((((aClass.info & (CLS_META))) ? aClass : aClass.isa), aName, anImplementation, types);
    return YES;
}
class_addMethod.displayName = "class_addMethod";
class_addMethods = function( aClass, methods)
{
    var index = 0,
        count = methods.length,
        method_list = aClass.method_list,
        method_dtable = aClass.method_dtable;
    for (; index < count; ++index)
    {
        var method = methods[index];
        method_list.push(method);
        method_dtable[method.name] = method;
        method.method_imp.displayName = (((aClass.info & (CLS_META))) ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
    }
    if (!((aClass.info & (CLS_META))) && (((aClass.info & (CLS_META))) ? aClass : aClass.isa).isa === (((aClass.info & (CLS_META))) ? aClass : aClass.isa))
        class_addMethods((((aClass.info & (CLS_META))) ? aClass : aClass.isa), methods);
}
class_addMethods.displayName = "class_addMethods";
class_getInstanceMethod = function( aClass, aSelector)
{
    if (!aClass || !aSelector)
        return NULL;
    var method = aClass.method_dtable[aSelector];
    return method ? method : NULL;
}
class_getInstanceMethod.displayName = "class_getInstanceMethod";
class_getInstanceVariable = function( aClass, aName)
{
    if (!aClass || !aName)
        return NULL;
    var variable = aClass.ivar_dtable[aName];
    return variable;
}
class_getInstanceVariable.displayName = "class_getInstanceVariable";
class_getClassMethod = function( aClass, aSelector)
{
    if (!aClass || !aSelector)
        return NULL;
    var method = (((aClass.info & (CLS_META))) ? aClass : aClass.isa).method_dtable[aSelector];
    return method ? method : NULL;
}
class_getClassMethod.displayName = "class_getClassMethod";
class_respondsToSelector = function( aClass, aSelector)
{
    return class_getClassMethod(aClass, aSelector) != NULL;
}
class_respondsToSelector.displayName = "class_respondsToSelector";
class_copyMethodList = function( aClass)
{
    return aClass.method_list.slice(0);
}
class_copyMethodList.displayName = "class_copyMethodList";
class_getVersion = function( aClass)
{
    return aClass.version;
}
class_getVersion.displayName = "class_getVersion";
class_setVersion = function( aClass, aVersion)
{
    aClass.version = parseInt(aVersion, 10);
}
class_setVersion.displayName = "class_setVersion";
class_replaceMethod = function( aClass, aSelector, aMethodImplementation)
{
    if (!aClass || !aSelector)
        return NULL;
    var method = aClass.method_dtable[aSelector],
        method_imp = NULL;
    if (method)
        method_imp = method.method_imp;
    method.method_imp = aMethodImplementation;
    return method_imp;
}
class_replaceMethod.displayName = "class_replaceMethod";
var _class_initialize = function( aClass)
{
    var meta = (((aClass.info & (CLS_META))) ? aClass : aClass.isa);
    if ((aClass.info & (CLS_META)))
        aClass = objj_getClass(aClass.name);
    if (aClass.super_class && !((((aClass.super_class.info & (CLS_META))) ? aClass.super_class : aClass.super_class.isa).info & (CLS_INITIALIZED)))
        _class_initialize(aClass.super_class);
    if (!(meta.info & (CLS_INITIALIZED)) && !(meta.info & (CLS_INITIALIZING)))
    {
        meta.info = (meta.info | (CLS_INITIALIZING)) & ~(0);
        objj_msgSend(aClass, "initialize");
        meta.info = (meta.info | (CLS_INITIALIZED)) & ~(CLS_INITIALIZING);
    }
}
var _objj_forward = function(self, _cmd)
{
    var isa = self.isa,
        implementation = isa.method_dtable[SEL_forwardingTargetForSelector_];
    if (implementation)
    {
        var target = implementation.method_imp.call(this, self, SEL_forwardingTargetForSelector_, _cmd);
        if (target && target !== self)
        {
            arguments[0] = target;
            return objj_msgSend.apply(this, arguments);
        }
    }
    implementation = isa.method_dtable[SEL_methodSignatureForSelector_];
    if (implementation)
    {
        var forwardInvocationImplementation = isa.method_dtable[SEL_forwardInvocation_];
        if (forwardInvocationImplementation)
        {
            var signature = implementation.method_imp.call(this, self, SEL_methodSignatureForSelector_, _cmd);
            if (signature)
            {
                var invocationClass = objj_lookUpClass("CPInvocation");
                if (invocationClass)
                {
                    var invocation = objj_msgSend(invocationClass, SEL_invocationWithMethodSignature_, signature),
                        index = 0,
                        count = arguments.length;
                    for (; index < count; ++index)
                        objj_msgSend(invocation, SEL_setArgument_atIndex_, arguments[index], index);
                    forwardInvocationImplementation.method_imp.call(this, self, SEL_forwardInvocation_, invocation);
                    return objj_msgSend(invocation, SEL_returnValue);
                }
            }
        }
    }
    implementation = isa.method_dtable[SEL_doesNotRecognizeSelector_];
    if (implementation)
        return implementation.method_imp.call(this, self, SEL_doesNotRecognizeSelector_, _cmd);
    throw class_getName(isa) + " does not implement doesNotRecognizeSelector:. Did you forget a superclass for " + class_getName(isa) + "?";
};
class_getMethodImplementation = function( aClass, aSelector)
{
    if (!((((aClass.info & (CLS_META))) ? aClass : aClass.isa).info & (CLS_INITIALIZED))) _class_initialize(aClass); var method = aClass.method_dtable[aSelector]; var implementation = method ? method.method_imp : _objj_forward;;
    return implementation;
}
class_getMethodImplementation.displayName = "class_getMethodImplementation";
var REGISTERED_CLASSES = { };
objj_allocateClassPair = function( superclass, aName)
{
    var classObject = new objj_class(aName),
        metaClassObject = new objj_class(aName),
        rootClassObject = classObject;
    if (superclass)
    {
        rootClassObject = superclass;
        while (rootClassObject.superclass)
            rootClassObject = rootClassObject.superclass;
        classObject.allocator.prototype = new superclass.allocator;
        classObject.ivar_dtable = classObject.ivar_store.prototype = new superclass.ivar_store;
        classObject.method_dtable = classObject.method_store.prototype = new superclass.method_store;
        metaClassObject.method_dtable = metaClassObject.method_store.prototype = new superclass.isa.method_store;
        classObject.super_class = superclass;
        metaClassObject.super_class = superclass.isa;
    }
    else
        classObject.allocator.prototype = new objj_object();
    classObject.isa = metaClassObject;
    classObject.name = aName;
    classObject.info = CLS_CLASS;
    classObject._UID = objj_generateObjectUID();
    metaClassObject.isa = rootClassObject.isa;
    metaClassObject.name = aName;
    metaClassObject.info = CLS_META;
    metaClassObject._UID = objj_generateObjectUID();
    return classObject;
}
objj_allocateClassPair.displayName = "objj_allocateClassPair";
var CONTEXT_BUNDLE = nil;
objj_registerClassPair = function( aClass)
{
    global[aClass.name] = aClass;
    REGISTERED_CLASSES[aClass.name] = aClass;
    addClassToBundle(aClass, CONTEXT_BUNDLE);
}
objj_registerClassPair.displayName = "objj_registerClassPair";
objj_resetRegisterClasses = function()
{
    for (var key in REGISTERED_CLASSES)
        delete global[key];
    REGISTERED_CLASSES = {};
    resetBundle();
}
objj_resetRegisterClasses.displayName = "objj_resetRegisterClasses";
class_createInstance = function( aClass)
{
    if (!aClass)
        throw new Error("*** Attempting to create object with Nil class.");
    var object = new aClass.allocator();
    object.isa = aClass;
    object._UID = objj_generateObjectUID();
    return object;
}
class_createInstance.displayName = "class_createInstance";
var prototype_bug = function() { }
prototype_bug.prototype.member = false;
with (new prototype_bug())
    member = true;
if (new prototype_bug().member)
{
var fast_class_createInstance = class_createInstance;
class_createInstance = function( aClass)
{
    var object = fast_class_createInstance(aClass);
    if (object)
    {
        var theClass = object.isa,
            actualClass = theClass;
        while (theClass)
        {
            var ivars = theClass.ivar_list,
                count = ivars.length;
            while (count--)
                object[ivars[count].name] = NULL;
            theClass = theClass.super_class;
        }
        object.isa = actualClass;
    }
    return object;
}
}
object_getClassName = function( anObject)
{
    if (!anObject)
        return "";
    var theClass = anObject.isa;
    return theClass ? class_getName(theClass) : "";
}
object_getClassName.displayName = "object_getClassName";
objj_lookUpClass = function( aName)
{
    var theClass = REGISTERED_CLASSES[aName];
    return theClass ? theClass : Nil;
}
objj_lookUpClass.displayName = "objj_lookUpClass";
objj_getClass = function( aName)
{
    var theClass = REGISTERED_CLASSES[aName];
    if (!theClass)
    {
    }
    return theClass ? theClass : Nil;
}
objj_getClass.displayName = "objj_getClass";
objj_getMetaClass = function( aName)
{
    var theClass = objj_getClass(aName);
    return (((theClass.info & (CLS_META))) ? theClass : theClass.isa);
}
objj_getMetaClass.displayName = "objj_getMetaClass";
ivar_getName = function(anIvar)
{
    return anIvar.name;
}
ivar_getName.displayName = "ivar_getName";
ivar_getTypeEncoding = function(anIvar)
{
    return anIvar.type;
}
ivar_getTypeEncoding.displayName = "ivar_getTypeEncoding";
objj_msgSend = function( aReceiver, aSelector)
{
    if (aReceiver == nil)
        return nil;
    var isa = aReceiver.isa;
    if (!((((isa.info & (CLS_META))) ? isa : isa.isa).info & (CLS_INITIALIZED))) _class_initialize(isa); var method = isa.method_dtable[aSelector]; var implementation = method ? method.method_imp : _objj_forward;;
    switch(arguments.length)
    {
        case 2: return implementation(aReceiver, aSelector);
        case 3: return implementation(aReceiver, aSelector, arguments[2]);
        case 4: return implementation(aReceiver, aSelector, arguments[2], arguments[3]);
    }
    return implementation.apply(aReceiver, arguments);
}
objj_msgSend.displayName = "objj_msgSend";
objj_msgSendSuper = function( aSuper, aSelector)
{
    var super_class = aSuper.super_class;
    arguments[0] = aSuper.receiver;
    if (!((((super_class.info & (CLS_META))) ? super_class : super_class.isa).info & (CLS_INITIALIZED))) _class_initialize(super_class); var method = super_class.method_dtable[aSelector]; var implementation = method ? method.method_imp : _objj_forward;;
    return implementation.apply(aSuper.receiver, arguments);
}
objj_msgSendSuper.displayName = "objj_msgSendSuper";
method_getName = function( aMethod)
{
    return aMethod.name;
}
method_getName.displayName = "method_getName";
method_getImplementation = function( aMethod)
{
    return aMethod.method_imp;
}
method_getImplementation.displayName = "method_getImplementation";
method_setImplementation = function( aMethod, anImplementation)
{
    var oldImplementation = aMethod.method_imp;
    aMethod.method_imp = anImplementation;
    return oldImplementation;
}
method_setImplementation.displayName = "method_setImplementation";
method_exchangeImplementations = function( lhs, rhs)
{
    var lhs_imp = method_getImplementation(lhs),
        rhs_imp = method_getImplementation(rhs);
    method_setImplementation(lhs, rhs_imp);
    method_setImplementation(rhs, lhs_imp);
}
method_exchangeImplementations.displayName = "method_exchangeImplementations";
sel_getName = function(aSelector)
{
    return aSelector ? aSelector : "<null selector>";
}
sel_getName.displayName = "sel_getName";
sel_getUid = function( aName)
{
    return aName;
}
sel_getUid.displayName = "sel_getUid";
sel_isEqual = function( lhs, rhs)
{
    return lhs === rhs;
}
sel_isEqual.displayName = "sel_isEqual";
sel_registerName = function( aName)
{
    return aName;
}
sel_registerName.displayName = "sel_registerName";
objj_class.prototype.toString = objj_object.prototype.toString = function()
{
    var isa = this.isa;
    if (class_getInstanceMethod(isa, SEL_description))
        return objj_msgSend(this, SEL_description);
    if (class_isMetaClass(isa))
        return this.name;
    return "[" + isa.name + " Object](-description not implemented)";
}
var SEL_description = sel_getUid("description"),
    SEL_forwardingTargetForSelector_ = sel_getUid("forwardingTargetForSelector:"),
    SEL_methodSignatureForSelector_ = sel_getUid("methodSignatureForSelector:"),
    SEL_forwardInvocation_ = sel_getUid("forwardInvocation:"),
    SEL_doesNotRecognizeSelector_ = sel_getUid("doesNotRecognizeSelector:"),
    SEL_invocationWithMethodSignature_ = sel_getUid("invocationWithMethodSignature:"),
    SEL_setTarget_ = sel_getUid("setTarget:"),
    SEL_setSelector_ = sel_getUid("setSelector:"),
    SEL_setArgument_atIndex_ = sel_getUid("setArgument:atIndex:"),
    SEL_returnValue = sel_getUid("returnValue");
objj_eval = function( aString)
{
    var url = exports.pageURL;
    var asyncLoaderSaved = exports.asyncLoader;
    exports.asyncLoader = NO;
    var executable = exports.preprocess(aString, url, 0);
    if (!executable.hasLoadedFileDependencies())
        executable.loadFileDependencies();
    global._objj_eval_scope = {};
    global._objj_eval_scope.objj_executeFile = Executable.fileExecuterForURL(url);
    global._objj_eval_scope.objj_importFile = Executable.fileImporterForURL(url);
    var code = "with(_objj_eval_scope){" + executable._code + "\n//*/\n}";
    var result;
        result = eval(code);
    exports.asyncLoader = asyncLoaderSaved;
    return result;
}
exports.objj_eval = objj_eval;
CPLogRegister(CPLogDefault);
function objj_debug_object_format(aReceiver)
{
    return (aReceiver && aReceiver.isa) ? exports.sprintf("<%s %#08x>", (((aReceiver.info & (CLS_META))) ? aReceiver : aReceiver.isa).name, aReceiver._UID) : String(aReceiver);
}
function objj_debug_message_format(aReceiver, aSelector)
{
    return exports.sprintf("[%s %s]", objj_debug_object_format(aReceiver), aSelector);
}
var objj_msgSend_original = objj_msgSend,
    objj_msgSendSuper_original = objj_msgSendSuper;
objj_msgSend_reset = function()
{
    objj_msgSend = objj_msgSend_original;
    objj_msgSendSuper = objj_msgSendSuper_original;
}
objj_msgSend_decorate = function()
{
    var index = 0,
        count = arguments.length;
    for (; index < count; ++index)
    {
        objj_msgSend = arguments[index](objj_msgSend);
        objj_msgSendSuper = arguments[index](objj_msgSendSuper);
    }
}
objj_msgSend_set_decorators = function()
{
    objj_msgSend_reset();
    objj_msgSend_decorate.apply(NULL, arguments);
}
var objj_backtrace = [];
objj_backtrace_print = function( aStream)
{
    var index = 0,
        count = objj_backtrace.length;
    for (; index < count; ++index)
    {
        var frame = objj_backtrace[index];
        aStream(objj_debug_message_format(frame.receiver, frame.selector));
    }
}
objj_backtrace_decorator = function(msgSend)
{
    return function(aReceiverOrSuper, aSelector)
    {
        var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
        objj_backtrace.push({ receiver: aReceiver, selector : aSelector });
        try
        {
            return msgSend.apply(NULL, arguments);
        }
        catch (anException)
        {
            if (objj_backtrace.length)
            {
                CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
                objj_backtrace_print(CPLog.warn);
                objj_backtrace = [];
            }
            throw anException;
        }
        finally
        {
            objj_backtrace.pop();
        }
    };
}
objj_supress_exceptions_decorator = function(msgSend)
{
    return function(aReceiverOrSuper, aSelector)
    {
        var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
        try
        {
            return msgSend.apply(NULL, arguments);
        }
        catch (anException)
        {
            CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
        }
    };
}
var objj_typechecks_reported = {},
    objj_typecheck_prints_backtrace = NO;
objj_typecheck_decorator = function(msgSend)
{
    return function(aReceiverOrSuper, aSelector)
    {
        var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
        if (!aReceiver)
            return msgSend.apply(NULL, arguments);
        var types = aReceiver.isa.method_dtable[aSelector].types;
        for (var i = 2; i < arguments.length; i++)
        {
            try
            {
                objj_debug_typecheck(types[i-1], arguments[i]);
            }
            catch (e)
            {
                var key = [(((aReceiver.info & (CLS_META))) ? aReceiver : aReceiver.isa).name, aSelector, i, e].join(";");
                if (!objj_typechecks_reported[key]) {
                    objj_typechecks_reported[key] = YES;
                    CPLog.warn("Type check failed on argument " + (i-2) + " of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                    if (objj_typecheck_prints_backtrace)
                        objj_backtrace_print(CPLog.warn);
                }
            }
        }
        var result = msgSend.apply(NULL, arguments);
        try
        {
            objj_debug_typecheck(types[0], result);
        }
        catch (e)
        {
            var key = [(((aReceiver.info & (CLS_META))) ? aReceiver : aReceiver.isa).name, aSelector, "ret", e].join(";");
            if (!objj_typechecks_reported[key]) {
                objj_typechecks_reported[key] = YES;
                CPLog.warn("Type check failed on return val of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                if (objj_typecheck_prints_backtrace)
                    objj_backtrace_print(CPLog.warn);
            }
        }
        return result;
    };
}
objj_debug_typecheck = function(expectedType, object)
{
    var objjClass;
    if (!expectedType)
    {
        return;
    }
    else if (expectedType === "id")
    {
        if (object !== undefined)
            return;
    }
    else if (expectedType === "void")
    {
        if (object === undefined)
            return;
    }
    else if (objjClass = objj_getClass(expectedType))
    {
        if (object === nil)
        {
            return;
        }
        else if (object !== undefined && object.isa)
        {
            var theClass = object.isa;
            for (; theClass; theClass = theClass.super_class)
                if (theClass === objjClass)
                    return;
        }
    }
    else
    {
        return;
    }
    var actualType;
    if (object === NULL)
        actualType = "null";
    else if (object === undefined)
        actualType = "void";
    else if (object.isa)
        actualType = (((object.info & (CLS_META))) ? object : object.isa).name;
    else
        actualType = typeof object;
    throw ("expected=" + expectedType + ", actual=" + actualType);
}
enableCFURLCaching();
var pageURL = new CFURL(window.location.href),
    DOMBaseElements = document.getElementsByTagName("base"),
    DOMBaseElementsCount = DOMBaseElements.length;
if (DOMBaseElementsCount > 0)
{
    var DOMBaseElement = DOMBaseElements[DOMBaseElementsCount - 1],
        DOMBaseElementHref = DOMBaseElement && DOMBaseElement.getAttribute("href");
    if (DOMBaseElementHref)
        pageURL = new CFURL(DOMBaseElementHref, pageURL);
}
var mainFileURL = new CFURL(window.OBJJ_MAIN_FILE || "main.j"),
    mainBundleURL = new CFURL(".", new CFURL(mainFileURL, pageURL)).absoluteURL(),
    assumedResolvedURL = new CFURL("..", mainBundleURL).absoluteURL();
if (mainBundleURL === assumedResolvedURL)
    assumedResolvedURL = new CFURL(assumedResolvedURL.schemeAndAuthority());
StaticResource.resourceAtURL(assumedResolvedURL, YES);
exports.pageURL = pageURL;
exports.bootstrap = function()
{
    resolveMainBundleURL();
}
function resolveMainBundleURL()
{
    StaticResource.resolveResourceAtURL(mainBundleURL, YES, function( aResource)
    {
        var includeURLs = StaticResource.includeURLs(),
            index = 0,
            count = includeURLs.length;
        for (; index < count; ++index)
            aResource.resourceAtURL(includeURLs[index], YES);
        Executable.fileImporterForURL(mainBundleURL)(mainFileURL.lastPathComponent(), YES, function()
        {
            disableCFURLCaching();
            afterDocumentLoad(function()
            {
                var hashString = window.location.hash.substring(1),
                    args = [];
                if (hashString.length)
                {
                    args = hashString.split("/");
                    for (var i = 0, count = args.length; i < count; i++)
                        args[i] = decodeURIComponent(args[i]);
                }
                var namedArgsArray = window.location.search.substring(1).split("&"),
                    namedArgs = new CFMutableDictionary();
                for (var i = 0, count = namedArgsArray.length; i < count; i++)
                {
                    var thisArg = namedArgsArray[i].split("=");
                    if (!thisArg[0])
                        continue;
                    if (thisArg[1] == null)
                        thisArg[1] = true;
                    namedArgs.setValueForKey(decodeURIComponent(thisArg[0]), decodeURIComponent(thisArg[1]));
                }
                main(args, namedArgs);
            });
        });
    });
}
var documentLoaded = NO;
function afterDocumentLoad( aFunction)
{
    if (documentLoaded)
        return aFunction();
    if (window.addEventListener)
        window.addEventListener("load", aFunction, NO);
    else if (window.attachEvent)
        window.attachEvent("onload", aFunction);
}
afterDocumentLoad(function()
{
    documentLoaded = YES;
});
if (typeof OBJJ_AUTO_BOOTSTRAP === "undefined" || OBJJ_AUTO_BOOTSTRAP)
    exports.bootstrap();
function makeAbsoluteURL( aURL)
{
    if (aURL instanceof CFURL && aURL.scheme())
        return aURL;
    return new CFURL(aURL, mainBundleURL);
}
objj_importFile = Executable.fileImporterForURL(mainBundleURL);
objj_executeFile = Executable.fileExecuterForURL(mainBundleURL);
objj_import = function()
{
    CPLog.warn("objj_import is deprecated, use objj_importFile instead");
    objj_importFile.apply(this, arguments);
}
})(window, ObjectiveJ);
