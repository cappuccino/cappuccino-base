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

var ObjectiveJ = {};
(function(global, exports)
{
    if (!Object.create)
    {
        Object.create =         function(o)
        {
            if (arguments.length > 1)
                throw new Error('Object.create implementation only accepts the first parameter.');
            function F()
            {
            }
            F.prototype = o;
            return new F();
        };
    }    if (!Object.keys)
    {
        Object.keys = (        function()
        {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !{toString: null}.propertyIsEnumerable('toString'),
                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                dontEnumsLength = dontEnums.length;
            return             function(obj)
            {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null)
                    throw new TypeError('Object.keys called on non-object');
                var result = [];
                for (var prop in obj)
                {
                    if (hasOwnProperty.call(obj, prop))
                        result.push(prop);
                }                if (hasDontEnumBug)
                {
                    for (var i = 0; i < dontEnumsLength; i++)
                    {
                        if (hasOwnProperty.call(obj, dontEnums[i]))
                            result.push(dontEnums[i]);
                    }                }                return result;
            };
        })();
    }    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf =         function(searchElement)
        {
            "use strict";
            if (this === null)
                throw new TypeError();
            var t = new Object(this),
                len = t.length >>> 0;
            if (len === 0)
                return -1;
            var n = 0;
            if (arguments.length > 1)
            {
                n = Number(arguments[1]);
                if (n != n)
                    n = 0;
                else if (n !== 0 && n != Infinity && n != -Infinity)
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }            if (n >= len)
                return -1;
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++)
            {
                if (k in t && t[k] === searchElement)
                    return k;
            }            return -1;
        };
    }    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith =         function(searchString, position)
        {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }    if (!String.prototype.endsWith)
    {
        String.prototype.endsWith =         function(searchString, position)
        {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
            {
                position = subjectString.length;
            }            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }    if (!this.JSON)
    {
        JSON = {};
    }    (    function()
    {
        function f(n)
        {
            return n < 10 ? '0' + n : n;
        }
        if (typeof Date.prototype.toJSON !== 'function')
        {
            Date.prototype.toJSON =             function(key)
            {
                return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z';
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON =             function(key)
            {
                return this.valueOf();
            };
        }        var cx = new RegExp('[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
        var escapable = new RegExp('[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
        var gap,
            indent,
            meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'},
            rep;
        function quote(string)
        {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable,             function(a)
            {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + (a.charCodeAt(0)).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }
        function str(key, holder)
        {
            var i,
                k,
                v,
                length,
                mind = gap,
                partial,
                value = holder[key];
            if (value && typeof value === 'object' && typeof value.toJSON === 'function')
            {
                value = value.toJSON(key);
            }
            if (typeof rep === 'function')
            {
                value = rep.call(holder, key, value);
            }
            switch(typeof value) {
                case 'string':
                    return quote(value);
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value)
                    {
                        return 'null';
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]')
                    {
                        length = value.length;
                        for (i = 0; i < length; i += 1)
                        {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === 'object')
                    {
                        length = rep.length;
                        for (i = 0; i < length; i += 1)
                        {
                            k = rep[i];
                            if (typeof k === 'string')
                            {
                                v = str(k, value);
                                if (v)
                                {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    else
                    {
                        for (k in value)
                        {
                            if (Object.hasOwnProperty.call(value, k))
                            {
                                v = str(k, value);
                                if (v)
                                {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }
        if (typeof JSON.stringify !== 'function')
        {
            JSON.stringify =             function(value, replacer, space)
            {
                var i;
                gap = '';
                indent = '';
                if (typeof space === 'number')
                {
                    for (i = 0; i < space; i += 1)
                    {
                        indent += ' ';
                    }                }                else if (typeof space === 'string')
                {
                    indent = space;
                }                rep = replacer;
                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number'))
                {
                    throw new Error('JSON.stringify');
                }                return str('', {'': value});
            };
        }        if (typeof JSON.parse !== 'function')
        {
            JSON.parse =             function(text, reviver)
            {
                var j;
                function walk(holder, key)
                {
                    var k,
                        v,
                        value = holder[key];
                    if (value && typeof value === 'object')
                    {
                        for (k in value)
                        {
                            if (Object.hasOwnProperty.call(value, k))
                            {
                                v = walk(value, k);
                                if (v !== undefined)
                                {
                                    value[k] = v;
                                }
                                else
                                {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                cx.lastIndex = 0;
                if (cx.test(text))
                {
                    text = text.replace(cx,                     function(a)
                    {
                        return '\\u' + ('0000' + (a.charCodeAt(0)).toString(16)).slice(-4);
                    });
                }                if (/^[\],:{}\s]*$/.test(((text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')).replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
                {
                    j = eval('(' + text + ')');
                    return typeof reviver === 'function' ? walk({'': j}, '') : j;
                }                throw new SyntaxError('JSON.parse');
            };
        }    })();
    var formatRegex = /([^%]+|%(?:\d+\$)?[\+\-\ \#0]*[0-9\*]*(.[0-9\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])/g,
        tagRegex = /(%)(?:(\d+)\$)?([\+\-\ \#0]*)([0-9\*]*)((?:.[0-9\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])/;
    exports.sprintf =     function(format)
    {
        var format = arguments[0],
            tokens = format.match(formatRegex),
            index = 0,
            result = "",
            arg = 1;
        for (var i = 0; i < tokens.length; i++)
        {
            var t = tokens[i];
            if (format.substring(index, index + t.length) !== t)
                return result;
            index += t.length;
            if (t.charAt(0) !== "%")
                result += t;
            else if (t === "%%")
                result += "%";
            else
            {
                var subtokens = t.match(tagRegex);
                if (subtokens.length !== 8 || subtokens[0] !== t)
                    return result;
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
                else if (widthString !== "")
                    width = Number(widthString);
                var precision = null;
                if (precisionString === ".*")
                    precision = arguments[argIndex];
                else if (precisionString !== "")
                    precision = Number(precisionString.substring(1));
                var leftJustify = flags.indexOf("-") >= 0,
                    padZeros = flags.indexOf("0") >= 0,
                    subresult = "";
                if (/[bBdiufeExXo]/.test(specifier))
                {
                    var num = Number(arguments[argIndex]),
                        sign = "";
                    if (num < 0)
                    {
                        sign = "-";
                    }                    else
                    {
                        if (flags.indexOf("+") >= 0)
                            sign = "+";
                        else if (flags.indexOf(" ") >= 0)
                            sign = " ";
                    }                    if (specifier === "d" || specifier === "i" || specifier === "u")
                    {
                        var number = String(Math.abs(Math.floor(num)));
                        subresult = justify(sign, "", number, "", width, leftJustify, padZeros);
                    }                    if (specifier == "f")
                    {
                        var number = String(precision !== null ? (Math.abs(num)).toFixed(precision) : Math.abs(num)),
                            suffix = flags.indexOf("#") >= 0 && number.indexOf(".") < 0 ? "." : "";
                        subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                    }                    if (specifier === "e" || specifier === "E")
                    {
                        var number = String((Math.abs(num)).toExponential(precision !== null ? precision : 21)),
                            suffix = flags.indexOf("#") >= 0 && number.indexOf(".") < 0 ? "." : "";
                        subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                    }                    if (specifier == "x" || specifier == "X")
                    {
                        var number = String((Math.abs(num)).toString(16));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0x" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }                    if (specifier == "b" || specifier == "B")
                    {
                        var number = String((Math.abs(num)).toString(2));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0b" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }                    if (specifier == "o")
                    {
                        var number = String((Math.abs(num)).toString(8));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }                    if (/[A-Z]/.test(specifier))
                        subresult = subresult.toUpperCase();
                    else
                        subresult = subresult.toLowerCase();
                }                else
                {
                    var subresult = "";
                    if (specifier === "%")
                        subresult = "%";
                    else if (specifier === "c")
                        subresult = (String(arguments[argIndex])).charAt(0);
                    else if (specifier === "s" || specifier === "@")
                        subresult = String(arguments[argIndex]);
                    else if (specifier === "p" || specifier === "n")
                        subresult = "";
                    subresult = justify("", "", subresult, "", width, leftJustify, false);
                }                result += subresult;
            }        }        return result;
    };
    function justify(sign, prefix, string, suffix, width, leftJustify, padZeros)
    {
        var length = sign.length + prefix.length + string.length + suffix.length;
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
        return (Array(MAX(0, n) + 1)).join(ch);
    }
    CPLogDisable = false;
    var CPLogDefaultTitle = "Cappuccino";
    var CPLogLevels = ["fatal", "error", "warn", "info", "debug", "trace"];
    var CPLogDefaultLevel = CPLogLevels[3];
    var _CPLogLevelsInverted = {};
    for (var i = 0; i < CPLogLevels.length; i++)
        _CPLogLevelsInverted[CPLogLevels[i]] = i;
    var _CPLogRegistrations = {};
    CPLogRegister =     function(aProvider, aMaxLevel, aFormatter)
    {
        CPLogRegisterRange(aProvider, CPLogLevels[0], aMaxLevel || CPLogLevels[CPLogLevels.length - 1], aFormatter);
    };
    CPLogRegisterRange =     function(aProvider, aMinLevel, aMaxLevel, aFormatter)
    {
        var min = _CPLogLevelsInverted[aMinLevel];
        var max = _CPLogLevelsInverted[aMaxLevel];
        if (min !== undefined && max !== undefined && min <= max)
            for (var i = min; i <= max; i++)
                CPLogRegisterSingle(aProvider, CPLogLevels[i], aFormatter);
    };
    CPLogRegisterSingle =     function(aProvider, aLevel, aFormatter)
    {
        if (!_CPLogRegistrations[aLevel])
            _CPLogRegistrations[aLevel] = [];
        for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
            if (_CPLogRegistrations[aLevel][i][0] === aProvider)
            {
                _CPLogRegistrations[aLevel][i][1] = aFormatter;
                return;
            }        _CPLogRegistrations[aLevel].push([aProvider, aFormatter]);
    };
    CPLogUnregister =     function(aProvider)
    {
        for (var aLevel in _CPLogRegistrations)
            for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
                if (_CPLogRegistrations[aLevel][i][0] === aProvider)
                    _CPLogRegistrations[aLevel].splice(i--, 1);
    };
    function _CPLogDispatch(parameters, aLevel, aTitle)
    {
        if (aTitle == undefined)
            aTitle = CPLogDefaultTitle;
        if (aLevel == undefined)
            aLevel = CPLogDefaultLevel;
        var message = typeof parameters[0] == "string" && parameters.length > 1 ? exports.sprintf.apply(null, parameters) : String(parameters[0]);
        if (_CPLogRegistrations[aLevel])
            for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
            {
                var logger = _CPLogRegistrations[aLevel][i];
                logger[0](message, aLevel, aTitle, logger[1]);
            }
    }
    CPLog =     function()
    {
        _CPLogDispatch(arguments);
    };
    for (var i = 0; i < CPLogLevels.length; i++)
        CPLog[CPLogLevels[i]] = (        function(level)
        {
            return             function()
            {
                _CPLogDispatch(arguments, level);
            };
        })(CPLogLevels[i]);
    var _CPFormatLogMessage =     function(aString, aLevel, aTitle)
    {
        var now = new Date(),
            titleAndLevel;
        if (aLevel === null)
            aLevel = "";
        else
        {
            aLevel = aLevel || "info";
            aLevel = "[" + CPLogColorize(aLevel, aLevel) + "]";
        }        aTitle = aTitle || "";
        if (aTitle && aLevel)
            aTitle += " ";
        titleAndLevel = aTitle + aLevel;
        if (titleAndLevel)
            titleAndLevel += ": ";
        if (typeof exports.sprintf == "function")
            return exports.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s", now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds(), titleAndLevel, aString);
        else
            return now + " " + titleAndLevel + ": " + aString;
    };
    CPLogConsole =     function(aString, aLevel, aTitle, aFormatter)
    {
        if (typeof console != "undefined")
        {
            var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle),
                logger = {"fatal": "error", "error": "error", "warn": "warn", "info": "info", "debug": "debug", "trace": "debug"}[aLevel];
            if (logger && console[logger])
                console[logger](message);
            else if (console.log)
                console.log(message);
        }    };
    CPLogColorize =     function(aString, aLevel)
    {
        return aString;
    };
    CPLogAlert =     function(aString, aLevel, aTitle, aFormatter)
    {
        if (typeof alert != "undefined" && !CPLogDisable)
        {
            var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle);
            CPLogDisable = !confirm(message + "\n\n(Click cancel to stop log alerts)");
        }    };
    var CPLogWindow = null;
    CPLogPopup =     function(aString, aLevel, aTitle, aFormatter)
    {
        try {
            if (CPLogDisable || window.open == undefined)
                return;
            if (!CPLogWindow || !CPLogWindow.document)
            {
                CPLogWindow = window.open("", "_blank", "width=600,height=400,status=no,resizable=yes,scrollbars=yes");
                if (!CPLogWindow)
                {
                    CPLogDisable = !confirm(aString + "\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
                    return;
                }                _CPLogInitPopup(CPLogWindow);
            }            var logDiv = CPLogWindow.document.createElement("div");
            logDiv.setAttribute("class", aLevel || "fatal");
            var message = (aFormatter || _CPFormatLogMessage)(aString, aFormatter ? aLevel : null, aTitle);
            logDiv.appendChild(CPLogWindow.document.createTextNode(message));
            CPLogWindow.log.appendChild(logDiv);
            if (CPLogWindow.focusEnabled.checked)
                CPLogWindow.focus();
            if (CPLogWindow.blockEnabled.checked)
                CPLogWindow.blockEnabled.checked = CPLogWindow.confirm(message + "\nContinue blocking?");
            if (CPLogWindow.scrollEnabled.checked)
                CPLogWindow.scrollToBottom();
        }
        catch(e) {
        }
    };
    var CPLogPopupStyle = '<style type="text/css" media="screen"> \
body{font:10px Monaco,Courier,"Courier New",monospace,mono;padding-top:15px;} \
div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} \
div[wrap="yes"] > div{white-space:normal;} \
.fatal{background-color:#ffb2b3;} \
.error{background-color:#ffe2b2;} \
.warn{background-color:#fdffb2;} \
.info{background-color:#e4ffb2;} \
.debug{background-color:#a0e5a0;} \
.trace{background-color:#99b9ff;} \
.enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} \
div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} \
ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} \
ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} \
[enabled="no"]{opacity:0.25;} \
ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} \
ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} \
</style>';
    function _CPLogInitPopup(logWindow)
    {
        var doc = logWindow.document;
        doc.writeln("<html><head><title></title>" + CPLogPopupStyle + "</head><body></body></html>");
        doc.title = CPLogDefaultTitle + " Run Log";
        var head = (doc.getElementsByTagName("head"))[0];
        var body = (doc.getElementsByTagName("body"))[0];
        var base = window.location.protocol + "//" + window.location.host + window.location.pathname;
        base = base.substring(0, base.lastIndexOf("/") + 1);
        var div = doc.createElement("div");
        div.setAttribute("id", "header");
        body.appendChild(div);
        var ul = doc.createElement("ul");
        ul.setAttribute("id", "enablers");
        div.appendChild(ul);
        for (var i = 0; i < CPLogLevels.length; i++)
        {
            var li = doc.createElement("li");
            li.setAttribute("id", "en" + CPLogLevels[i]);
            li.setAttribute("class", CPLogLevels[i]);
            li.setAttribute("onclick", "toggle(this);");
            li.setAttribute("enabled", "yes");
            li.appendChild(doc.createTextNode(CPLogLevels[i]));
            ul.appendChild(li);
        }
        var ul = doc.createElement("ul");
        ul.setAttribute("id", "options");
        div.appendChild(ul);
        var options = {"focus": ["Focus", false], "block": ["Block", false], "wrap": ["Wrap", false], "scroll": ["Scroll", true], "close": ["Close", true]};
        for (o in options)
        {
            var li = doc.createElement("li");
            ul.appendChild(li);
            logWindow[o + "Enabled"] = doc.createElement("input");
            logWindow[o + "Enabled"].setAttribute("id", o);
            logWindow[o + "Enabled"].setAttribute("type", "checkbox");
            if (options[o][1])
                logWindow[o + "Enabled"].setAttribute("checked", "checked");
            li.appendChild(logWindow[o + "Enabled"]);
            var label = doc.createElement("label");
            label.setAttribute("for", o);
            label.appendChild(doc.createTextNode(options[o][0]));
            li.appendChild(label);
        }
        logWindow.log = doc.createElement("div");
        logWindow.log.setAttribute("class", "enerror endebug enwarn eninfo enfatal entrace");
        body.appendChild(logWindow.log);
        logWindow.toggle =         function(elem)
        {
            var enabled = elem.getAttribute("enabled") == "yes" ? "no" : "yes";
            elem.setAttribute("enabled", enabled);
            if (enabled == "yes")
                logWindow.log.className += " " + elem.id;
            else
                logWindow.log.className = logWindow.log.className.replace(new RegExp("[\\s]*" + elem.id, "g"), "");
        };
        logWindow.scrollToBottom =         function()
        {
            logWindow.scrollTo(0, body.offsetHeight);
        };
        logWindow.wrapEnabled.addEventListener("click",         function()
        {
            logWindow.log.setAttribute("wrap", logWindow.wrapEnabled.checked ? "yes" : "no");
        }, false);
        logWindow.addEventListener("keydown",         function(e)
        {
            var e = e || logWindow.event;
            if (e.keyCode == 75 && (e.ctrlKey || e.metaKey))
            {
                while (logWindow.log.firstChild)
                {
                    logWindow.log.removeChild(logWindow.log.firstChild);
                }                e.preventDefault();
            }        }, "false");
        window.addEventListener("unload",         function()
        {
            if (logWindow && logWindow.closeEnabled && logWindow.closeEnabled.checked)
            {
                CPLogDisable = true;
                logWindow.close();
            }        }, false);
        logWindow.addEventListener("unload",         function()
        {
            if (!CPLogDisable)
            {
                CPLogDisable = !confirm("Click cancel to stop logging");
            }        }, false);
    }
    CPLogDefault = typeof window === "object" && window.console ? CPLogConsole : CPLogPopup;
    var undefined;
    if (typeof window !== "undefined")
    {
        window.setNativeTimeout = window.setTimeout;
        window.clearNativeTimeout = window.clearTimeout;
        window.setNativeInterval = window.setInterval;
        window.clearNativeInterval = window.clearInterval;
    }    NO = false;
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
    function EventDispatcher(anOwner)
    {
        this._eventListenersForEventNames = {};
        this._owner = anOwner;
    }
    EventDispatcher.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        var eventListenersForEventNames = this._eventListenersForEventNames;
        if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
        {
            var eventListenersForEventName = [];
            eventListenersForEventNames[anEventName] = eventListenersForEventName;
        }        else
            var eventListenersForEventName = eventListenersForEventNames[anEventName];
        var index = eventListenersForEventName.length;
        while (index--)
            if (eventListenersForEventName[index] === anEventListener)
                return;
        eventListenersForEventName.push(anEventListener);
    };
    EventDispatcher.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        var eventListenersForEventNames = this._eventListenersForEventNames;
        if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
            return;
        var eventListenersForEventName = eventListenersForEventNames[anEventName],
            index = eventListenersForEventName.length;
        while (index--)
            if (eventListenersForEventName[index] === anEventListener)
                return eventListenersForEventName.splice(index, 1);
    };
    EventDispatcher.prototype.dispatchEvent =     function(anEvent)
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
        }        var manual = (this._owner || this)["on" + type];
        if (manual)
            manual(anEvent);
    };
    var asynchronousTimeoutCount = 0,
        asynchronousTimeoutId = null,
        asynchronousFunctionQueue = [];
    function Asynchronous(aFunction)
    {
        var currentAsynchronousTimeoutCount = asynchronousTimeoutCount;
        if (asynchronousTimeoutId === null)
        {
            window.setNativeTimeout(            function()
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
        return         function()
        {
            var args = arguments;
            if (asynchronousTimeoutCount > currentAsynchronousTimeoutCount)
                aFunction.apply(this, args);
            else
                asynchronousFunctionQueue.push(                function()
                {
                    aFunction.apply(this, args);
                });
        };
    }
    var NativeRequest = null;
    if (window.XMLHttpRequest)
    {
        NativeRequest = window.XMLHttpRequest;
    }    else if (window.ActiveXObject !== undefined)
    {
        var MSXML_XMLHTTP_OBJECTS = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.6.0"],
            index = MSXML_XMLHTTP_OBJECTS.length;
        while (index--)
        {
            try {
                var MSXML_XMLHTTP = MSXML_XMLHTTP_OBJECTS[index];
                new ActiveXObject(MSXML_XMLHTTP);
                NativeRequest =                 function()
                {
                    return new ActiveXObject(MSXML_XMLHTTP);
                };
                break;
            }
            catch(anException) {
            }
        }    }    CFHTTPRequest =     function()
    {
        this._isOpen = false;
        this._requestHeaders = {};
        this._mimeType = null;
        this._eventDispatcher = new EventDispatcher(this);
        this._nativeRequest = new NativeRequest();
        this._withCredentials = false;
        this._timeout = 60000;
        var self = this;
        this._stateChangeHandler =         function()
        {
            determineAndDispatchHTTPRequestEvents(self);
        };
        this._timeoutHandler =         function()
        {
            dispatchTimeoutHTTPRequestEvents(self);
        };
        this._nativeRequest.onreadystatechange = this._stateChangeHandler;
        this._nativeRequest.ontimeout = this._timeoutHandler;
        if (CFHTTPRequest.AuthenticationDelegate !== nil)
            this._eventDispatcher.addEventListener("HTTP403",             function()
            {
                CFHTTPRequest.AuthenticationDelegate(self);
            });
    };
    CFHTTPRequest.UninitializedState = 0;
    CFHTTPRequest.LoadingState = 1;
    CFHTTPRequest.LoadedState = 2;
    CFHTTPRequest.InteractiveState = 3;
    CFHTTPRequest.CompleteState = 4;
    CFHTTPRequest.AuthenticationDelegate = nil;
    CFHTTPRequest.prototype.status =     function()
    {
        try {
            return this._nativeRequest.status || 0;
        }
        catch(anException) {
            return 0;
        }
    };
    CFHTTPRequest.prototype.statusText =     function()
    {
        try {
            return this._nativeRequest.statusText || "";
        }
        catch(anException) {
            return "";
        }
    };
    CFHTTPRequest.prototype.readyState =     function()
    {
        return this._nativeRequest.readyState;
    };
    CFHTTPRequest.prototype.success =     function()
    {
        var status = this.status();
        if (status >= 200 && status < 300)
            return YES;
        return status === 0 && this.responseText() && (this.responseText()).length;
    };
    CFHTTPRequest.prototype.responseXML =     function()
    {
        var responseXML = this._nativeRequest.responseXML;
        if (responseXML && NativeRequest === window.XMLHttpRequest && responseXML.documentRoot)
            return responseXML;
        return parseXML(this.responseText());
    };
    CFHTTPRequest.prototype.responsePropertyList =     function()
    {
        var responseText = this.responseText();
        if (CFPropertyList.sniffedFormatOfString(responseText) === CFPropertyList.FormatXML_v1_0)
            return CFPropertyList.propertyListFromXML(this.responseXML());
        return CFPropertyList.propertyListFromString(responseText);
    };
    CFHTTPRequest.prototype.responseText =     function()
    {
        return this._nativeRequest.responseText;
    };
    CFHTTPRequest.prototype.setRequestHeader =     function(aHeader, aValue)
    {
        this._requestHeaders[aHeader] = aValue;
    };
    CFHTTPRequest.prototype.getResponseHeader =     function(aHeader)
    {
        return this._nativeRequest.getResponseHeader(aHeader);
    };
    CFHTTPRequest.prototype.setTimeout =     function(aTimeout)
    {
        this._timeout = aTimeout;
        if (this._isOpen)
            this._nativeRequest.timeout = aTimeout;
    };
    CFHTTPRequest.prototype.getTimeout =     function(aTimeout)
    {
        return this._timeout;
    };
    CFHTTPRequest.prototype.getAllResponseHeaders =     function()
    {
        return this._nativeRequest.getAllResponseHeaders();
    };
    CFHTTPRequest.prototype.overrideMimeType =     function(aMimeType)
    {
        this._mimeType = aMimeType;
    };
    CFHTTPRequest.prototype.open =     function(aMethod, aURL, isAsynchronous, aUser, aPassword)
    {
        var retval;
        this._isOpen = true;
        this._URL = aURL;
        this._async = isAsynchronous;
        this._method = aMethod;
        this._user = aUser;
        this._password = aPassword;
        requestReturnValue = this._nativeRequest.open(aMethod, aURL, isAsynchronous, aUser, aPassword);
        if (this._async)
        {
            this._nativeRequest.withCredentials = this._withCredentials;
            this._nativeRequest.timeout = this._timeout;
        }        return requestReturnValue;
    };
    CFHTTPRequest.prototype.send =     function(aBody)
    {
        if (!this._isOpen)
        {
            delete this._nativeRequest.onreadystatechange;
            delete this._nativeRequest.ontimeout;
            this._nativeRequest.open(this._method, this._URL, this._async, this._user, this._password);
            this._nativeRequest.ontimeout = this._timeoutHandler;
            this._nativeRequest.onreadystatechange = this._stateChangeHandler;
        }        for (var i in this._requestHeaders)
        {
            if (this._requestHeaders.hasOwnProperty(i))
                this._nativeRequest.setRequestHeader(i, this._requestHeaders[i]);
        }        if (this._mimeType && "overrideMimeType" in this._nativeRequest)
            this._nativeRequest.overrideMimeType(this._mimeType);
        this._isOpen = false;
        try {
            return this._nativeRequest.send(aBody);
        }
        catch(anException) {
            this._eventDispatcher.dispatchEvent({type: "failure", request: this});
        }
    };
    CFHTTPRequest.prototype.abort =     function()
    {
        this._isOpen = false;
        return this._nativeRequest.abort();
    };
    CFHTTPRequest.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    CFHTTPRequest.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    CFHTTPRequest.prototype.setWithCredentials =     function(willSendWithCredentials)
    {
        this._withCredentials = willSendWithCredentials;
        if (this._isOpen && this._async)
            this._nativeRequest.withCredentials = willSendWithCredentials;
    };
    CFHTTPRequest.prototype.withCredentials =     function()
    {
        return this._withCredentials;
    };
    CFHTTPRequest.prototype.isTimeoutRequest =     function()
    {
        return !this.success() && !this._nativeRequest.response && !this._nativeRequest.responseText && !this._nativeRequest.responseType && !this._nativeRequest.responseURL && !this._nativeRequest.responseXML;
    };
    function dispatchTimeoutHTTPRequestEvents(aRequest)
    {
        aRequest._eventDispatcher.dispatchEvent({type: "timeout", request: aRequest});
    }
    function determineAndDispatchHTTPRequestEvents(aRequest)
    {
        var eventDispatcher = aRequest._eventDispatcher,
            readyStates = ["uninitialized", "loading", "loaded", "interactive", "complete"];
        eventDispatcher.dispatchEvent({type: "readystatechange", request: aRequest});
        if (readyStates[aRequest.readyState()] === "complete")
        {
            var status = "HTTP" + aRequest.status();
            eventDispatcher.dispatchEvent({type: status, request: aRequest});
            var result = aRequest.success() ? "success" : "failure";
            eventDispatcher.dispatchEvent({type: result, request: aRequest});
            eventDispatcher.dispatchEvent({type: readyStates[aRequest.readyState()], request: aRequest});
        }
        else
        {
            eventDispatcher.dispatchEvent({type: readyStates[aRequest.readyState()], request: aRequest});
        }
    }
    function FileRequest(aURL, onsuccess, onfailure, onprogress)
    {
        var request = new CFHTTPRequest();
        if (aURL.pathExtension() === "plist")
            request.overrideMimeType("text/xml");
        var loaded = 0,
            progressHandler = null;
        function progress(progressEvent)
        {
            onprogress(progressEvent.loaded - loaded);
            loaded = progressEvent.loaded;
        }
        function success(anEvent)
        {
            if (onprogress && progressHandler === null)
                onprogress((anEvent.request.responseText()).length);
            onsuccess(anEvent);
        }
        if (exports.asyncLoader)
        {
            request.onsuccess = Asynchronous(success);
            request.onfailure = Asynchronous(onfailure);
        }
        else
        {
            request.onsuccess = success;
            request.onfailure = onfailure;
        }
        if (onprogress)
        {
            var supportsProgress = true;
            if (document.all)
                supportsProgress = !!window.atob;
            if (supportsProgress)
            {
                try {
                    progressHandler = exports.asyncLoader ? Asynchronous(progress) : progress;
                    request._nativeRequest.onprogress = progressHandler;
                }
                catch(anException) {
                    progressHandler = null;
                }
            }
        }
        request.open("GET", aURL.absoluteString(), exports.asyncLoader);
        request.send("");
    }
    exports.asyncLoader = YES;
    exports.Asynchronous = Asynchronous;
    exports.determineAndDispatchHTTPRequestEvents = determineAndDispatchHTTPRequestEvents;
    var OBJECT_COUNT = 0;
    objj_generateObjectUID =     function()
    {
        return OBJECT_COUNT++;
    };
    CFPropertyList =     function()
    {
        this._UID = objj_generateObjectUID();
    };
    CFPropertyList.DTDRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
    CFPropertyList.XMLRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
    CFPropertyList.FormatXMLDTD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
    CFPropertyList.Format280NorthMagicNumber = "280NPLIST";
    (CFPropertyList.FormatOpenStep = 1, CFPropertyList.FormatXML_v1_0 = 100, CFPropertyList.FormatBinary_v1_0 = 200, CFPropertyList.Format280North_v1_0 = -1000);
    CFPropertyList.sniffedFormatOfString =     function(aString)
    {
        if (aString.match(CFPropertyList.XMLRE))
            return CFPropertyList.FormatXML_v1_0;
        if (aString.substr(0, CFPropertyList.Format280NorthMagicNumber.length) === CFPropertyList.Format280NorthMagicNumber)
            return CFPropertyList.Format280North_v1_0;
        return NULL;
    };
    CFPropertyList.dataFromPropertyList =     function(aPropertyList, aFormat)
    {
        var data = new CFMutableData();
        data.setRawString(CFPropertyList.stringFromPropertyList(aPropertyList, aFormat));
        return data;
    };
    CFPropertyList.stringFromPropertyList =     function(aPropertyList, aFormat)
    {
        if (!aFormat)
            aFormat = CFPropertyList.Format280North_v1_0;
        var serializers = CFPropertyListSerializers[aFormat];
        return serializers["start"]() + serializePropertyList(aPropertyList, serializers) + serializers["finish"]();
    };
    function serializePropertyList(aPropertyList, serializers)
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
    var CFPropertyListSerializers = {};
    CFPropertyListSerializers[CFPropertyList.FormatXML_v1_0] = {"start":     function()
    {
        return CFPropertyList.FormatXMLDTD + "<plist version = \"1.0\">";
    }, "finish":     function()
    {
        return "</plist>";
    }, "string":     function(aString)
    {
        return "<string>" + encodeHTMLComponent(aString) + "</string>";
    }, "boolean":     function(aBoolean)
    {
        return aBoolean ? "<true/>" : "<false/>";
    }, "integer":     function(anInteger)
    {
        return "<integer>" + anInteger + "</integer>";
    }, "real":     function(aFloat)
    {
        return "<real>" + aFloat + "</real>";
    }, "array":     function(anArray, serializers)
    {
        var index = 0,
            count = anArray.length,
            string = "<array>";
        for (; index < count; ++index)
            string += serializePropertyList(anArray[index], serializers);
        return string + "</array>";
    }, "dictionary":     function(aDictionary, serializers)
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
        }        return string + "</dict>";
    }};
    var ARRAY_MARKER = "A",
        DICTIONARY_MARKER = "D",
        FLOAT_MARKER = "f",
        INTEGER_MARKER = "d",
        STRING_MARKER = "S",
        TRUE_MARKER = "T",
        FALSE_MARKER = "F",
        KEY_MARKER = "K",
        END_MARKER = "E";
    CFPropertyListSerializers[CFPropertyList.Format280North_v1_0] = {"start":     function()
    {
        return CFPropertyList.Format280NorthMagicNumber + ";1.0;";
    }, "finish":     function()
    {
        return "";
    }, "string":     function(aString)
    {
        return STRING_MARKER + ';' + aString.length + ';' + aString;
    }, "boolean":     function(aBoolean)
    {
        return (aBoolean ? TRUE_MARKER : FALSE_MARKER) + ';';
    }, "integer":     function(anInteger)
    {
        var string = "" + anInteger;
        return INTEGER_MARKER + ';' + string.length + ';' + string;
    }, "real":     function(aFloat)
    {
        var string = "" + aFloat;
        return FLOAT_MARKER + ';' + string.length + ';' + string;
    }, "array":     function(anArray, serializers)
    {
        var index = 0,
            count = anArray.length,
            string = ARRAY_MARKER + ';';
        for (; index < count; ++index)
            string += serializePropertyList(anArray[index], serializers);
        return string + END_MARKER + ';';
    }, "dictionary":     function(aDictionary, serializers)
    {
        var keys = aDictionary._keys,
            index = 0,
            count = keys.length,
            string = DICTIONARY_MARKER + ';';
        for (; index < count; ++index)
        {
            var key = keys[index];
            string += KEY_MARKER + ';' + key.length + ';' + key;
            string += serializePropertyList(aDictionary.valueForKey(key), serializers);
        }        return string + END_MARKER + ';';
    }};
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
    var textContent =     function(nodes)
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
        }        return text;
    };
    var _plist_traverseNextNode =     function(anXMLNode, stayWithin, stack)
    {
        var node = anXMLNode;
    {
        node = node.firstChild;
        if (node != NULL && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7))
            while ((node = node.nextSibling) && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7));
    }        if (node)
            return node;
        if (String(anXMLNode.nodeName) === PLIST_ARRAY || String(anXMLNode.nodeName) === PLIST_DICTIONARY)
            stack.pop();
        else
        {
            if (node === stayWithin)
                return NULL;
            node = anXMLNode;
            while ((node = node.nextSibling) && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7));
            if (node)
                return node;
        }        node = anXMLNode;
        while (node)
        {
            var next = node;
            while ((next = next.nextSibling) && (next.nodeType === 8 || next.nodeType === 3 || next.nodeType === 7));
            if (next)
                return next;
            var node = node.parentNode;
            if (stayWithin && node === stayWithin)
                return NULL;
            stack.pop();
        }        return NULL;
    };
    CFPropertyList.propertyListFromData =     function(aData, aFormat)
    {
        return CFPropertyList.propertyListFromString(aData.rawString(), aFormat);
    };
    CFPropertyList.propertyListFromString =     function(aString, aFormat)
    {
        if (!aFormat)
            aFormat = CFPropertyList.sniffedFormatOfString(aString);
        if (aFormat === CFPropertyList.FormatXML_v1_0)
            return CFPropertyList.propertyListFromXML(aString);
        if (aFormat === CFPropertyList.Format280North_v1_0)
            return propertyListFrom280NorthString(aString);
        return NULL;
    };
    var ARRAY_MARKER = "A",
        DICTIONARY_MARKER = "D",
        FLOAT_MARKER = "f",
        INTEGER_MARKER = "d",
        STRING_MARKER = "S",
        TRUE_MARKER = "T",
        FALSE_MARKER = "F",
        KEY_MARKER = "K",
        END_MARKER = "E";
    function propertyListFrom280NorthString(aString)
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
            switch(marker) {
                case ARRAY_MARKER:
                    object = [];
                    containers.push(object);
                    break;
                case DICTIONARY_MARKER:
                    object = new CFMutableDictionary();
                    containers.push(object);
                    break;
                case FLOAT_MARKER:
                    object = parseFloat(stream.getString());
                    break;
                case INTEGER_MARKER:
                    object = parseInt(stream.getString(), 10);
                    break;
                case STRING_MARKER:
                    object = stream.getString();
                    break;
                case TRUE_MARKER:
                    object = YES;
                    break;
                case FALSE_MARKER:
                    object = NO;
                    break;
default:
                    throw new Error("*** " + marker + " marker not recognized in Plist.");
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
    function encodeHTMLComponent(aString)
    {
        return ((((aString.replace(/&/g, '&amp;')).replace(/"/g, '&quot;')).replace(/'/g, '&apos;')).replace(/</g, '&lt;')).replace(/>/g, '&gt;');
    }
    function decodeHTMLComponent(aString)
    {
        return ((((aString.replace(/&quot;/g, '"')).replace(/&apos;/g, '\'')).replace(/&lt;/g, '<')).replace(/&gt;/g, '>')).replace(/&amp;/g, '&');
    }
    function parseXML(aString)
    {
        if (window.DOMParser)
            return (new window.DOMParser()).parseFromString(aString, "text/xml") && ((new window.DOMParser()).parseFromString(aString, "text/xml")).documentElement;
        else if (window.ActiveXObject)
        {
            XMLNode = new ActiveXObject("Microsoft.XMLDOM");
            var matches = aString.match(CFPropertyList.DTDRE);
            if (matches)
                aString = aString.substr(matches[0].length);
            XMLNode.loadXML(aString);
            return XMLNode;
        }
        return NULL;
    }
    CFPropertyList.propertyListFromXML =     function(aStringOrXMLNode)
    {
        var XMLNode = aStringOrXMLNode;
        if (aStringOrXMLNode.valueOf && typeof aStringOrXMLNode.valueOf() === "string")
            XMLNode = parseXML(aStringOrXMLNode);
        while (XMLNode && (String(XMLNode.nodeName) === XML_DOCUMENT || String(XMLNode.nodeName) === XML_XML))
        {
        {
            XMLNode = XMLNode.firstChild;
            if (XMLNode != NULL && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7))
                while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
        }        }        if (XMLNode && XMLNode.nodeType === 10)
            while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
        if (!XMLNode || !(String(XMLNode.nodeName) === PLIST_PLIST))
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
            if (String(XMLNode.nodeName) === PLIST_KEY)
            {
                key = XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]);
                while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
            }            switch(String(String(XMLNode.nodeName))) {
                case PLIST_ARRAY:
                    object = [];
                    containers.push(object);
                    break;
                case PLIST_DICTIONARY:
                    object = new CFMutableDictionary();
                    containers.push(object);
                    break;
                case PLIST_NUMBER_REAL:
                    object = parseFloat(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]));
                    break;
                case PLIST_NUMBER_INTEGER:
                    object = parseInt(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]), 10);
                    break;
                case PLIST_STRING:
                    if (XMLNode.getAttribute("type") === "base64")
                        object = XMLNode.firstChild ? CFData.decodeBase64ToString(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode])) : "";
                    else
                        object = decodeHTMLComponent(XMLNode.firstChild ? XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]) : "");
                    break;
                case PLIST_DATE:
                    var timestamp = Date.parseISO8601(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]));
                    object = isNaN(timestamp) ? new Date() : new Date(timestamp);
                    break;
                case PLIST_BOOLEAN_TRUE:
                    object = YES;
                    break;
                case PLIST_BOOLEAN_FALSE:
                    object = NO;
                    break;
                case PLIST_DATA:
                    object = new CFMutableData();
                    var data_bytes = XMLNode.firstChild ? CFData.decodeBase64ToArray(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]), YES) : [];
                    object.setBytes(data_bytes);
                    break;
default:
                    throw new Error("*** " + String(XMLNode.nodeName) + " tag not recognized in Plist.");
            }
            if (!plistObject)
                plistObject = object;
            else if (currentContainer)
                if (currentContainer.slice)
                    currentContainer.push(object);
                else
                    currentContainer.setValueForKey(key, object);
        }        return plistObject;
    };
    kCFPropertyListOpenStepFormat = CFPropertyList.FormatOpenStep;
    kCFPropertyListXMLFormat_v1_0 = CFPropertyList.FormatXML_v1_0;
    kCFPropertyListBinaryFormat_v1_0 = CFPropertyList.FormatBinary_v1_0;
    kCFPropertyList280NorthFormat_v1_0 = CFPropertyList.Format280North_v1_0;
    CFPropertyListCreate =     function()
    {
        return new CFPropertyList();
    };
    CFPropertyListCreateFromXMLData =     function(data)
    {
        return CFPropertyList.propertyListFromData(data, CFPropertyList.FormatXML_v1_0);
    };
    CFPropertyListCreateXMLData =     function(aPropertyList)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.FormatXML_v1_0);
    };
    CFPropertyListCreateFrom280NorthData =     function(data)
    {
        return CFPropertyList.propertyListFromData(data, CFPropertyList.Format280North_v1_0);
    };
    CFPropertyListCreate280NorthData =     function(aPropertyList)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.Format280North_v1_0);
    };
    CPPropertyListCreateFromData =     function(data, aFormat)
    {
        return CFPropertyList.propertyListFromData(data, aFormat);
    };
    CPPropertyListCreateData =     function(aPropertyList, aFormat)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, aFormat);
    };
    CFDictionary =     function(aDictionary)
    {
        this._keys = [];
        this._count = 0;
        this._buckets = {};
        this._UID = objj_generateObjectUID();
    };
    var indexOf = Array.prototype.indexOf,
        hasOwnProperty = Object.prototype.hasOwnProperty;
    CFDictionary.prototype.copy =     function()
    {
        return this;
    };
    CFDictionary.prototype.mutableCopy =     function()
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
        }        return newDictionary;
    };
    CFDictionary.prototype.containsKey =     function(aKey)
    {
        return hasOwnProperty.apply(this._buckets, [aKey]);
    };
    CFDictionary.prototype.containsKey.displayName = "CFDictionary.prototype.containsKey";
    CFDictionary.prototype.containsValue =     function(anObject)
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
    CFDictionary.prototype.count =     function()
    {
        return this._count;
    };
    CFDictionary.prototype.count.displayName = "CFDictionary.prototype.count";
    CFDictionary.prototype.countOfKey =     function(aKey)
    {
        return this.containsKey(aKey) ? 1 : 0;
    };
    CFDictionary.prototype.countOfKey.displayName = "CFDictionary.prototype.countOfKey";
    CFDictionary.prototype.countOfValue =     function(anObject)
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
    CFDictionary.prototype.keys =     function()
    {
        return this._keys.slice();
    };
    CFDictionary.prototype.keys.displayName = "CFDictionary.prototype.keys";
    CFDictionary.prototype.valueForKey =     function(aKey)
    {
        var buckets = this._buckets;
        if (!hasOwnProperty.apply(buckets, [aKey]))
            return nil;
        return buckets[aKey];
    };
    CFDictionary.prototype.valueForKey.displayName = "CFDictionary.prototype.valueForKey";
    CFDictionary.prototype.toString =     function()
    {
        var string = "{\n",
            keys = this._keys,
            index = 0,
            count = this._count;
        for (; index < count; ++index)
        {
            var key = keys[index];
            string += "\t" + key + " = \"" + ((String(this.valueForKey(key))).split('\n')).join("\n\t") + "\"\n";
        }        return string + "}";
    };
    CFDictionary.prototype.toString.displayName = "CFDictionary.prototype.toString";
    CFMutableDictionary =     function(aDictionary)
    {
        CFDictionary.apply(this, []);
    };
    CFMutableDictionary.prototype = new CFDictionary();
    CFMutableDictionary.prototype.copy =     function()
    {
        return this.mutableCopy();
    };
    CFMutableDictionary.prototype.addValueForKey =     function(aKey, aValue)
    {
        if (this.containsKey(aKey))
            return;
        ++this._count;
        this._keys.push(aKey);
        this._buckets[aKey] = aValue;
    };
    CFMutableDictionary.prototype.addValueForKey.displayName = "CFMutableDictionary.prototype.addValueForKey";
    CFMutableDictionary.prototype.removeValueForKey =     function(aKey)
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
                }        }        if (indexOfKey === -1)
            return;
        --this._count;
        this._keys.splice(indexOfKey, 1);
        delete this._buckets[aKey];
    };
    CFMutableDictionary.prototype.removeValueForKey.displayName = "CFMutableDictionary.prototype.removeValueForKey";
    CFMutableDictionary.prototype.removeAllValues =     function()
    {
        this._count = 0;
        this._keys = [];
        this._buckets = {};
    };
    CFMutableDictionary.prototype.removeAllValues.displayName = "CFMutableDictionary.prototype.removeAllValues";
    CFMutableDictionary.prototype.replaceValueForKey =     function(aKey, aValue)
    {
        if (!this.containsKey(aKey))
            return;
        this._buckets[aKey] = aValue;
    };
    CFMutableDictionary.prototype.replaceValueForKey.displayName = "CFMutableDictionary.prototype.replaceValueForKey";
    CFMutableDictionary.prototype.setValueForKey =     function(aKey, aValue)
    {
        if (aValue === nil || aValue === undefined)
            this.removeValueForKey(aKey);
        else if (this.containsKey(aKey))
            this.replaceValueForKey(aKey, aValue);
        else
            this.addValueForKey(aKey, aValue);
    };
    CFMutableDictionary.prototype.setValueForKey.displayName = "CFMutableDictionary.prototype.setValueForKey";
    kCFErrorLocalizedDescriptionKey = "CPLocalizedDescription";
    kCFErrorLocalizedFailureReasonKey = "CPLocalizedFailureReason";
    kCFErrorLocalizedRecoverySuggestionKey = "CPLocalizedRecoverySuggestion";
    kCFErrorDescriptionKey = "CPDescription";
    kCFErrorUnderlyingErrorKey = "CPUnderlyingError";
    kCFErrorURLKey = "CPURL";
    kCFErrorFilePathKey = "CPFilePath";
    kCFErrorDomainCappuccino = "CPCappuccinoErrorDomain";
    kCFErrorDomainCocoa = kCFErrorDomainCappuccino;
    CFError =     function(domain, code, userInfo)
    {
        this._domain = domain || NULL;
        this._code = code || 0;
        this._userInfo = userInfo || new CFDictionary();
        this._UID = objj_generateObjectUID();
    };
    CFError.prototype.domain =     function()
    {
        return this._domain;
    };
    CFError.prototype.domain.displayName = "CFError.prototype.domain";
    CFError.prototype.code =     function()
    {
        return this._code;
    };
    CFError.prototype.code.displayName = "CFError.prototype.code";
    CFError.prototype.description =     function()
    {
        var localizedDesc = this._userInfo.valueForKey(kCFErrorLocalizedDescriptionKey);
        if (localizedDesc)
            return localizedDesc;
        var reason = this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
        if (reason)
        {
            var operationFailedStr = "The operation couldn\u2019t be completed. " + reason;
            return operationFailedStr;
        }        var result = "",
            desc = this._userInfo.valueForKey(kCFErrorDescriptionKey);
        if (desc)
        {
            var result = "The operation couldn\u2019t be completed. (error " + this._code + " - " + desc + ")";
        }        else
        {
            var result = "The operation couldn\u2019t be completed. (error " + this._code + ")";
        }        return result;
    };
    CFError.prototype.description.displayName = "CFError.prototype.description";
    CFError.prototype.failureReason =     function()
    {
        return this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
    };
    CFError.prototype.failureReason.displayName = "CFError.prototype.failureReason";
    CFError.prototype.recoverySuggestion =     function()
    {
        return this._userInfo.valueForKey(kCFErrorLocalizedRecoverySuggestionKey);
    };
    CFError.prototype.recoverySuggestion.displayName = "CFError.prototype.recoverySuggestion";
    CFError.prototype.userInfo =     function()
    {
        return this._userInfo;
    };
    CFError.prototype.userInfo.displayName = "CFError.prototype.userInfo";
    CFErrorCreate =     function(domain, code, userInfo)
    {
        return new CFError(domain, code, userInfo);
    };
    CFErrorCreateWithUserInfoKeysAndValues =     function(domain, code, userInfoKeys, userInfoValues, numUserInfoValues)
    {
        var userInfo = new CFMutableDictionary();
        while (numUserInfoValues--)
            userInfo.setValueForKey(userInfoKeys[numUserInfoValues], userInfoValues[numUserInfoValues]);
        return new CFError(domain, code, userInfo);
    };
    CFErrorGetCode =     function(err)
    {
        return err.code();
    };
    CFErrorGetDomain =     function(err)
    {
        return err.domain();
    };
    CFErrorCopyDescription =     function(err)
    {
        return err.description();
    };
    CFErrorCopyUserInfo =     function(err)
    {
        return err.userInfo();
    };
    CFErrorCopyFailureReason =     function(err)
    {
        return err.failureReason();
    };
    CFErrorCopyRecoverySuggestion =     function(err)
    {
        return err.recoverySuggestion();
    };
    kCFURLErrorUnknown = -998;
    kCFURLErrorCancelled = -999;
    kCFURLErrorBadURL = -1000;
    kCFURLErrorTimedOut = -1001;
    kCFURLErrorUnsupportedURL = -1002;
    kCFURLErrorCannotFindHost = -1003;
    kCFURLErrorCannotConnectToHost = -1004;
    kCFURLErrorNetworkConnectionLost = -1005;
    kCFURLErrorDNSLookupFailed = -1006;
    kCFURLErrorHTTPTooManyRedirects = -1007;
    kCFURLErrorResourceUnavailable = -1008;
    kCFURLErrorNotConnectedToInternet = -1009;
    kCFURLErrorRedirectToNonExistentLocation = -1010;
    kCFURLErrorBadServerResponse = -1011;
    kCFURLErrorUserCancelledAuthentication = -1012;
    kCFURLErrorUserAuthenticationRequired = -1013;
    kCFURLErrorZeroByteResource = -1014;
    kCFURLErrorCannotDecodeRawData = -1015;
    kCFURLErrorCannotDecodeContentData = -1016;
    kCFURLErrorCannotParseResponse = -1017;
    kCFURLErrorRequestBodyStreamExhausted = -1021;
    kCFURLErrorFileDoesNotExist = -1100;
    kCFURLErrorFileIsDirectory = -1101;
    kCFURLErrorNoPermissionsToReadFile = -1102;
    kCFURLErrorDataLengthExceedsMaximum = -1103;
    CFData =     function()
    {
        this._rawString = NULL;
        this._propertyList = NULL;
        this._propertyListFormat = NULL;
        this._JSONObject = NULL;
        this._bytes = NULL;
        this._base64 = NULL;
    };
    CFData.prototype.propertyList =     function()
    {
        if (!this._propertyList)
            this._propertyList = CFPropertyList.propertyListFromString(this.rawString());
        return this._propertyList;
    };
    CFData.prototype.JSONObject =     function()
    {
        if (!this._JSONObject)
        {
            try {
                this._JSONObject = JSON.parse(this.rawString());
            }
            catch(anException) {
            }
        }        return this._JSONObject;
    };
    CFData.prototype.rawString =     function()
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
        }        return this._rawString;
    };
    CFData.prototype.bytes =     function()
    {
        if (this._bytes === NULL)
        {
            var bytes = CFData.stringToBytes(this.rawString());
            this.setBytes(bytes);
        }        return this._bytes;
    };
    CFData.prototype.base64 =     function()
    {
        if (this._base64 === NULL)
        {
            var base64;
            if (this._bytes)
                base64 = CFData.encodeBase64Array(this._bytes);
            else
                base64 = CFData.encodeBase64String(this.rawString());
            this.setBase64String(base64);
        }        return this._base64;
    };
    CFMutableData =     function()
    {
        CFData.call(this);
    };
    CFMutableData.prototype = new CFData();
    function clearMutableData(aData)
    {
        this._rawString = NULL;
        this._propertyList = NULL;
        this._propertyListFormat = NULL;
        this._JSONObject = NULL;
        this._bytes = NULL;
        this._base64 = NULL;
    }
    CFMutableData.prototype.setPropertyList =     function(aPropertyList, aFormat)
    {
        clearMutableData(this);
        this._propertyList = aPropertyList;
        this._propertyListFormat = aFormat;
    };
    CFMutableData.prototype.setJSONObject =     function(anObject)
    {
        clearMutableData(this);
        this._JSONObject = anObject;
    };
    CFMutableData.prototype.setRawString =     function(aString)
    {
        clearMutableData(this);
        this._rawString = aString;
    };
    CFMutableData.prototype.setBytes =     function(bytes)
    {
        clearMutableData(this);
        this._bytes = bytes;
    };
    CFMutableData.prototype.setBase64String =     function(aBase64String)
    {
        clearMutableData(this);
        this._base64 = aBase64String;
    };
    var base64_map_to = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "="],
        base64_map_from = [];
    for (var i = 0; i < base64_map_to.length; i++)
        base64_map_from[base64_map_to[i].charCodeAt(0)] = i;
    CFData.decodeBase64ToArray =     function(input, strip)
    {
        if (strip)
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var pad = (input[input.length - 1] == "=" ? 1 : 0) + (input[input.length - 2] == "=" ? 1 : 0),
            length = input.length,
            output = [];
        var i = 0;
        while (i < length)
        {
            var bits = base64_map_from[input.charCodeAt(i++)] << 18 | base64_map_from[input.charCodeAt(i++)] << 12 | base64_map_from[input.charCodeAt(i++)] << 6 | base64_map_from[input.charCodeAt(i++)];
            output.push((bits & 0xFF0000) >> 16);
            output.push((bits & 0xFF00) >> 8);
            output.push(bits & 0xFF);
        }        if (pad > 0)
            return output.slice(0, -1 * pad);
        return output;
    };
    CFData.encodeBase64Array =     function(input)
    {
        var pad = (3 - input.length % 3) % 3,
            length = input.length + pad,
            output = [];
        if (pad > 0)
            input.push(0);
        if (pad > 1)
            input.push(0);
        var i = 0;
        while (i < length)
        {
            var bits = input[i++] << 16 | input[i++] << 8 | input[i++];
            output.push(base64_map_to[(bits & 0xFC0000) >> 18]);
            output.push(base64_map_to[(bits & 0x3F000) >> 12]);
            output.push(base64_map_to[(bits & 0xFC0) >> 6]);
            output.push(base64_map_to[bits & 0x3F]);
        }        if (pad > 0)
        {
            output[output.length - 1] = "=";
            input.pop();
        }        if (pad > 1)
        {
            output[output.length - 2] = "=";
            input.pop();
        }        return output.join("");
    };
    CFData.decodeBase64ToString =     function(input, strip)
    {
        return CFData.bytesToString(CFData.decodeBase64ToArray(input, strip));
    };
    CFData.decodeBase64ToUtf16String =     function(input, strip)
    {
        return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(input, strip));
    };
    CFData.bytesToString =     function(bytes)
    {
        return String.fromCharCode.apply(NULL, bytes);
    };
    CFData.stringToBytes =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
            temp.push(input.charCodeAt(i));
        return temp;
    };
    CFData.encodeBase64String =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
            temp.push(input.charCodeAt(i));
        return CFData.encodeBase64Array(temp);
    };
    CFData.bytesToUtf16String =     function(bytes)
    {
        var temp = [];
        for (var i = 0; i < bytes.length; i += 2)
            temp.push(bytes[i + 1] << 8 | bytes[i]);
        return String.fromCharCode.apply(NULL, temp);
    };
    CFData.encodeBase64Utf16String =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
        {
            var c = input.charCodeAt(i);
            temp.push(c & 0xFF);
            temp.push((c & 0xFF00) >> 8);
        }        return CFData.encodeBase64Array(temp);
    };
    var CFURLsForCachedUIDs,
        CFURLPartsForURLStrings,
        CFURLCachingEnableCount = 0;
    function enableCFURLCaching()
    {
        if (++CFURLCachingEnableCount !== 1)
            return;
        CFURLsForCachedUIDs = {};
        CFURLPartsForURLStrings = {};
    }
    function disableCFURLCaching()
    {
        CFURLCachingEnableCount = MAX(CFURLCachingEnableCount - 1, 0);
        if (CFURLCachingEnableCount !== 0)
            return;
        delete CFURLsForCachedUIDs;
        delete CFURLPartsForURLStrings;
    }
    var URL_RE = new RegExp("^" + "(?:" + "([^:/?#]+):" + ")?" + "(?:" + "(//)" + "(" + "(?:" + "(" + "([^:@]*)" + ":?" + "([^:@]*)" + ")?" + "@" + ")?" + "([^:/?#]*)" + "(?::(\\d*))?" + ")" + ")?" + "([^?#]*)" + "(?:\\?([^#]*))?" + "(?:#(.*))?");
    var URI_KEYS = ["url", "scheme", "authorityRoot", "authority", "userInfo", "user", "password", "domain", "portNumber", "path", "queryString", "fragment"];
    function CFURLGetParts(aURL)
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
        aURL._parts = {};
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
    CFURL =     function(aURL, aBaseURL)
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
        }        if (CFURLCachingEnableCount > 0)
        {
            var cacheUID = aURL + " " + (aBaseURL && aBaseURL.UID() || "");
            if (hasOwnProperty.call(CFURLsForCachedUIDs, cacheUID))
                return CFURLsForCachedUIDs[cacheUID];
            CFURLsForCachedUIDs[cacheUID] = this;
        }        if (aURL.match(/^data:/))
        {
            var parts = {},
                index = URI_KEYS.length;
            while (index--)
                parts[URI_KEYS[index]] = "";
            parts.url = aURL;
            parts.scheme = "data";
            parts.pathComponents = [];
            this._parts = parts;
            this._standardizedURL = this;
            this._absoluteURL = this;
        }        this._UID = objj_generateObjectUID();
        this._string = aURL;
        this._baseURL = aBaseURL;
    };
    CFURL.displayName = "CFURL";
    CFURL.prototype.UID =     function()
    {
        return this._UID;
    };
    CFURL.prototype.UID.displayName = "CFURL.prototype.UID";
    var URLMap = {};
    CFURL.prototype.mappedURL =     function()
    {
        return URLMap[this.absoluteString()] || this;
    };
    CFURL.prototype.mappedURL.displayName = "CFURL.prototype.mappedURL";
    CFURL.setMappedURLForURL =     function(fromURL, toURL)
    {
        URLMap[fromURL.absoluteString()] = toURL;
    };
    CFURL.setMappedURLForURL.displayName = "CFURL.setMappedURLForURL";
    CFURL.prototype.schemeAndAuthority =     function()
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
    CFURL.prototype.absoluteString =     function()
    {
        if (this._absoluteString === undefined)
            this._absoluteString = (this.absoluteURL()).string();
        return this._absoluteString;
    };
    CFURL.prototype.absoluteString.displayName = "CFURL.prototype.absoluteString";
    CFURL.prototype.toString =     function()
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
        var parts = aURL._parts || CFURLGetParts(aURL),
            resolvedParts,
            absoluteBaseURL = baseURL.absoluteURL(),
            baseParts = absoluteBaseURL._parts || CFURLGetParts(absoluteBaseURL);
        if (!parts.scheme && parts.authorityRoot)
        {
            resolvedParts = CFURLPartsCreateCopy(parts);
            resolvedParts.scheme = baseURL.scheme();
        }
        else if (parts.scheme || parts.authority)
        {
            resolvedParts = parts;
        }
        else
        {
            resolvedParts = {};
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
    function pathFromPathComponents(pathComponents, isDirectoryPath)
    {
        var path = pathComponents.join("/");
        if (path.length && path.charAt(0) === "/")
            path = path.substr(1);
        if (isDirectoryPath)
            path += "/";
        return path;
    }
    function standardizePathComponents(pathComponents, inPlace)
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
    function URLStringFromParts(parts)
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
    CFURL.prototype.absoluteURL =     function()
    {
        if (this._absoluteURL === undefined)
            this._absoluteURL = resolveURL(this);
        return this._absoluteURL;
    };
    CFURL.prototype.absoluteURL.displayName = "CFURL.prototype.absoluteURL";
    CFURL.prototype.standardizedURL =     function()
    {
        if (this._standardizedURL === undefined)
        {
            var parts = this._parts || CFURLGetParts(this),
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
            }        }        return this._standardizedURL;
    };
    CFURL.prototype.standardizedURL.displayName = "CFURL.prototype.standardizedURL";
    function CFURLPartsCreateCopy(parts)
    {
        var copiedParts = {},
            count = URI_KEYS.length;
        while (count--)
        {
            var partName = URI_KEYS[count];
            copiedParts[partName] = parts[partName];
        }
        return copiedParts;
    }
    CFURL.prototype.string =     function()
    {
        return this._string;
    };
    CFURL.prototype.string.displayName = "CFURL.prototype.string";
    CFURL.prototype.authority =     function()
    {
        var authority = (this._parts || CFURLGetParts(this)).authority;
        if (authority)
            return authority;
        var baseURL = this.baseURL();
        return baseURL && baseURL.authority() || "";
    };
    CFURL.prototype.authority.displayName = "CFURL.prototype.authority";
    CFURL.prototype.hasDirectoryPath =     function()
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
        }        return hasDirectoryPath;
    };
    CFURL.prototype.hasDirectoryPath.displayName = "CFURL.prototype.hasDirectoryPath";
    CFURL.prototype.hostName =     function()
    {
        return this.authority();
    };
    CFURL.prototype.hostName.displayName = "CFURL.prototype.hostName";
    CFURL.prototype.fragment =     function()
    {
        return (this._parts || CFURLGetParts(this)).fragment;
    };
    CFURL.prototype.fragment.displayName = "CFURL.prototype.fragment";
    CFURL.prototype.lastPathComponent =     function()
    {
        if (this._lastPathComponent === undefined)
        {
            var pathComponents = this.pathComponents(),
                pathComponentCount = pathComponents.length;
            if (!pathComponentCount)
                this._lastPathComponent = "";
            else
                this._lastPathComponent = pathComponents[pathComponentCount - 1];
        }        return this._lastPathComponent;
    };
    CFURL.prototype.lastPathComponent.displayName = "CFURL.prototype.lastPathComponent";
    CFURL.prototype.path =     function()
    {
        return (this._parts || CFURLGetParts(this)).path;
    };
    CFURL.prototype.path.displayName = "CFURL.prototype.path";
    CFURL.prototype.createCopyDeletingLastPathComponent =     function()
    {
        var parts = this._parts || CFURLGetParts(this),
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
    CFURL.prototype.pathComponents =     function()
    {
        return (this._parts || CFURLGetParts(this)).pathComponents;
    };
    CFURL.prototype.pathComponents.displayName = "CFURL.prototype.pathComponents";
    CFURL.prototype.pathExtension =     function()
    {
        var lastPathComponent = this.lastPathComponent();
        if (!lastPathComponent)
            return NULL;
        lastPathComponent = lastPathComponent.replace(/^\.*/, '');
        var index = lastPathComponent.lastIndexOf(".");
        return index <= 0 ? "" : lastPathComponent.substring(index + 1);
    };
    CFURL.prototype.pathExtension.displayName = "CFURL.prototype.pathExtension";
    CFURL.prototype.queryString =     function()
    {
        return (this._parts || CFURLGetParts(this)).queryString;
    };
    CFURL.prototype.queryString.displayName = "CFURL.prototype.queryString";
    CFURL.prototype.scheme =     function()
    {
        var scheme = this._scheme;
        if (scheme === undefined)
        {
            scheme = (this._parts || CFURLGetParts(this)).scheme;
            if (!scheme)
            {
                var baseURL = this.baseURL();
                scheme = baseURL && baseURL.scheme();
            }            this._scheme = scheme;
        }        return scheme;
    };
    CFURL.prototype.scheme.displayName = "CFURL.prototype.scheme";
    CFURL.prototype.user =     function()
    {
        return (this._parts || CFURLGetParts(this)).user;
    };
    CFURL.prototype.user.displayName = "CFURL.prototype.user";
    CFURL.prototype.password =     function()
    {
        return (this._parts || CFURLGetParts(this)).password;
    };
    CFURL.prototype.password.displayName = "CFURL.prototype.password";
    CFURL.prototype.portNumber =     function()
    {
        return (this._parts || CFURLGetParts(this)).portNumber;
    };
    CFURL.prototype.portNumber.displayName = "CFURL.prototype.portNumber";
    CFURL.prototype.domain =     function()
    {
        return (this._parts || CFURLGetParts(this)).domain;
    };
    CFURL.prototype.domain.displayName = "CFURL.prototype.domain";
    CFURL.prototype.baseURL =     function()
    {
        return this._baseURL;
    };
    CFURL.prototype.baseURL.displayName = "CFURL.prototype.baseURL";
    CFURL.prototype.asDirectoryPathURL =     function()
    {
        if (this.hasDirectoryPath())
            return this;
        var lastPathComponent = this.lastPathComponent();
        if (lastPathComponent !== "/")
            lastPathComponent = "./" + lastPathComponent;
        return new CFURL(lastPathComponent + "/", this);
    };
    CFURL.prototype.asDirectoryPathURL.displayName = "CFURL.prototype.asDirectoryPathURL";
    function CFURLGetResourcePropertiesForKeys(aURL)
    {
        if (!aURL._resourcePropertiesForKeys)
            aURL._resourcePropertiesForKeys = new CFMutableDictionary();
        return aURL._resourcePropertiesForKeys;
    }
    CFURL.prototype.resourcePropertyForKey =     function(aKey)
    {
        return (CFURLGetResourcePropertiesForKeys(this)).valueForKey(aKey);
    };
    CFURL.prototype.resourcePropertyForKey.displayName = "CFURL.prototype.resourcePropertyForKey";
    CFURL.prototype.setResourcePropertyForKey =     function(aKey, aValue)
    {
        (CFURLGetResourcePropertiesForKeys(this)).setValueForKey(aKey, aValue);
    };
    CFURL.prototype.setResourcePropertyForKey.displayName = "CFURL.prototype.setResourcePropertyForKey";
    CFURL.prototype.staticResourceData =     function()
    {
        var data = new CFMutableData();
        data.setRawString((StaticResource.resourceAtURL(this)).contents());
        return data;
    };
    CFURL.prototype.staticResourceData.displayName = "CFURL.prototype.staticResourceData";
    function MarkedStream(aString)
    {
        this._string = aString;
        var index = aString.indexOf(";");
        this._magicNumber = aString.substr(0, index);
        this._location = aString.indexOf(";", ++index);
        this._version = aString.substring(index, this._location++);
    }
    MarkedStream.prototype.magicNumber =     function()
    {
        return this._magicNumber;
    };
    MarkedStream.prototype.magicNumber.displayName = "MarkedStream.prototype.magicNumber";
    MarkedStream.prototype.version =     function()
    {
        return this._version;
    };
    MarkedStream.prototype.version.displayName = "MarkedStream.prototype.version";
    MarkedStream.prototype.getMarker =     function()
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
    };
    MarkedStream.prototype.getMarker.displayName = "MarkedStream.prototype.getMarker";
    MarkedStream.prototype.getString =     function()
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
    };
    MarkedStream.prototype.getString.displayName = "MarkedStream.prototype.getString";
    var CFBundleUnloaded = 0,
        CFBundleLoading = 1 << 0,
        CFBundleLoadingInfoPlist = 1 << 1,
        CFBundleLoadingExecutable = 1 << 2,
        CFBundleLoadingSpritedImages = 1 << 3,
        CFBundleLoadingLocalizableStrings = 1 << 4,
        CFBundleLoaded = 1 << 5;
    var CFBundlesForURLStrings = {},
        CFBundlesForClasses = {},
        CFBundlesWithIdentifiers = {},
        CFCacheBuster = (new Date()).getTime(),
        CFTotalBytesLoaded = 0,
        CPApplicationSizeInBytes = 0;
    var CPBundleDefaultBrowserLanguage = "CPBundleDefaultBrowserLanguage",
        CPBundleDefaultLanguage = "CPBundleDefaultLanguage";
    CFBundle =     function(aURL)
    {
        aURL = (makeAbsoluteURL(aURL)).asDirectoryPathURL();
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
        this._localizableStrings = [];
        this._loadedLanguage = NULL;
    };
    CFBundle.displayName = "CFBundle";
    CFBundle.environments =     function()
    {
        return ["Browser", "ObjJ"];
    };
    CFBundle.environments.displayName = "CFBundle.environments";
    CFBundle.bundleContainingURL =     function(aURL)
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
        }        return NULL;
    };
    CFBundle.bundleContainingURL.displayName = "CFBundle.bundleContainingURL";
    CFBundle.mainBundle =     function()
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
        CFBundlesForURLStrings = {};
        CFBundlesForClasses = {};
        CFBundlesWithIdentifiers = {};
        CFTotalBytesLoaded = 0;
        CPApplicationSizeInBytes = 0;
    }
    CFBundle.bundleForClass =     function(aClass)
    {
        return CFBundlesForClasses[aClass.name] || CFBundle.mainBundle();
    };
    CFBundle.bundleForClass.displayName = "CFBundle.bundleForClass";
    CFBundle.bundleWithIdentifier =     function(bundleID)
    {
        return CFBundlesWithIdentifiers[bundleID] || NULL;
    };
    CFBundle.bundleWithIdentifier.displayName = "CFBundle.bundleWithIdentifier";
    CFBundle.prototype.bundleURL =     function()
    {
        return this._bundleURL.absoluteURL();
    };
    CFBundle.prototype.bundleURL.displayName = "CFBundle.prototype.bundleURL";
    CFBundle.prototype.resourcesDirectoryURL =     function()
    {
        return this._resourcesDirectoryURL;
    };
    CFBundle.prototype.resourcesDirectoryURL.displayName = "CFBundle.prototype.resourcesDirectoryURL";
    CFBundle.prototype.resourceURL =     function(aResourceName, aType, aSubDirectory, localizationName)
    {
        if (aType)
            aResourceName = aResourceName + "." + aType;
        if (localizationName)
            aResourceName = localizationName + aResourceName;
        if (aSubDirectory)
            aResourceName = aSubDirectory + "/" + aResourceName;
        var resourceURL = (new CFURL(aResourceName, this.resourcesDirectoryURL())).mappedURL();
        return resourceURL.absoluteURL();
    };
    CFBundle.prototype.resourceURL.displayName = "CFBundle.prototype.resourceURL";
    CFBundle.prototype.mostEligibleEnvironmentURL =     function()
    {
        if (this._mostEligibleEnvironmentURL === undefined)
            this._mostEligibleEnvironmentURL = new CFURL(this.mostEligibleEnvironment() + ".environment/", this.bundleURL());
        return this._mostEligibleEnvironmentURL;
    };
    CFBundle.prototype.mostEligibleEnvironmentURL.displayName = "CFBundle.prototype.mostEligibleEnvironmentURL";
    CFBundle.prototype.executableURL =     function()
    {
        if (this._executableURL === undefined)
        {
            var executableSubPath = this.valueForInfoDictionaryKey("CPBundleExecutable");
            if (!executableSubPath)
                this._executableURL = NULL;
            else
                this._executableURL = new CFURL(executableSubPath, this.mostEligibleEnvironmentURL());
        }        return this._executableURL;
    };
    CFBundle.prototype.executableURL.displayName = "CFBundle.prototype.executableURL";
    CFBundle.prototype.infoDictionary =     function()
    {
        return this._infoDictionary;
    };
    CFBundle.prototype.infoDictionary.displayName = "CFBundle.prototype.infoDictionary";
    CFBundle.prototype.loadedLanguage =     function()
    {
        return this._loadedLanguage;
    };
    CFBundle.prototype.valueForInfoDictionaryKey =     function(aKey)
    {
        return this._infoDictionary.valueForKey(aKey);
    };
    CFBundle.prototype.valueForInfoDictionaryKey.displayName = "CFBundle.prototype.valueForInfoDictionaryKey";
    CFBundle.prototype.identifier =     function()
    {
        return this._infoDictionary.valueForKey("CPBundleIdentifier");
    };
    CFBundle.prototype.identifier.displayName = "CFBundle.prototype.identifier";
    CFBundle.prototype.hasSpritedImages =     function()
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
    CFBundle.prototype.environments =     function()
    {
        return this._infoDictionary.valueForKey("CPBundleEnvironments") || ["ObjJ"];
    };
    CFBundle.prototype.environments.displayName = "CFBundle.prototype.environments";
    CFBundle.prototype.mostEligibleEnvironment =     function(environments)
    {
        environments = environments || this.environments();
        var objj_environments = CFBundle.environments(),
            index = 0,
            count = objj_environments.length,
            innerCount = environments.length;
        for (; index < count; ++index)
        {
            var innerIndex = 0,
                environment = objj_environments[index];
            for (; innerIndex < innerCount; ++innerIndex)
                if (environment === environments[innerIndex])
                    return environment;
        }        return NULL;
    };
    CFBundle.prototype.mostEligibleEnvironment.displayName = "CFBundle.prototype.mostEligibleEnvironment";
    CFBundle.prototype.isLoading =     function()
    {
        return this._loadStatus & CFBundleLoading;
    };
    CFBundle.prototype.isLoading.displayName = "CFBundle.prototype.isLoading";
    CFBundle.prototype.isLoaded =     function()
    {
        return !!(this._loadStatus & CFBundleLoaded);
    };
    CFBundle.prototype.isLoaded.displayName = "CFBundle.prototype.isLoaded";
    CFBundle.prototype.load =     function(shouldExecute)
    {
        if (this._loadStatus !== CFBundleUnloaded)
            return;
        this._loadStatus = CFBundleLoading | CFBundleLoadingInfoPlist;
        var self = this,
            bundleURL = this.bundleURL(),
            parentURL = new CFURL("..", bundleURL);
        if (parentURL.absoluteString() === bundleURL.absoluteString())
            parentURL = parentURL.schemeAndAuthority();
        StaticResource.resolveResourceAtURL(parentURL, YES,         function(aStaticResource)
        {
            var resourceName = bundleURL.lastPathComponent();
            self._staticResource = aStaticResource._children[resourceName] || new StaticResource(bundleURL, aStaticResource, YES, NO);
            function onsuccess(anEvent)
            {
                self._loadStatus &= ~CFBundleLoadingInfoPlist;
                var infoDictionary = anEvent.request.responsePropertyList();
                self._isValid = !!infoDictionary || CFBundle.mainBundle() === self;
                if (infoDictionary)
                {
                    self._infoDictionary = infoDictionary;
                    var identifier = self._infoDictionary.valueForKey("CPBundleIdentifier");
                    if (identifier)
                        CFBundlesWithIdentifiers[identifier] = self;
                }
                if (!self._infoDictionary)
                {
                    finishBundleLoadingWithError(self, new Error("Could not load bundle at \"" + path + "\""));
                    return;
                }
                if (self === CFBundle.mainBundle() && self.valueForInfoDictionaryKey("CPApplicationSize"))
                    CPApplicationSizeInBytes = (self.valueForInfoDictionaryKey("CPApplicationSize")).valueForKey("executable") || 0;
                loadLanguageForBundle(self);
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
    function finishBundleLoadingWithError(aBundle, anError)
    {
        resolveStaticResource(aBundle._staticResource);
        aBundle._eventDispatcher.dispatchEvent({type: "error", error: anError, bundle: aBundle});
    }
    function loadExecutableAndResources(aBundle, shouldExecute)
    {
        if (!aBundle.mostEligibleEnvironment())
            return failure();
        loadExecutableForBundle(aBundle, success, failure, progress);
        loadSpritedImagesForBundle(aBundle, success, failure, progress);
        loadLocalizableStringsForBundle(aBundle, success, failure, progress);
        if (aBundle._loadStatus === CFBundleLoading)
            return success();
        function failure(anError)
        {
            var loadRequests = aBundle._loadRequests,
                count = loadRequests.length;
            while (count--)
                loadRequests[count].abort();
            this._loadRequests = [];
            aBundle._loadStatus = CFBundleUnloaded;
            finishBundleLoadingWithError(aBundle, anError || new Error("Could not recognize executable code format in Bundle " + aBundle));
        }
        function progress(bytesLoaded)
        {
            if ((typeof CPApp === "undefined" || !CPApp || !CPApp._finishedLaunching) && typeof OBJJ_PROGRESS_CALLBACK === "function")
            {
                CFTotalBytesLoaded += bytesLoaded;
                var percent = CPApplicationSizeInBytes ? MAX(MIN(1.0, CFTotalBytesLoaded / CPApplicationSizeInBytes), 0.0) : 0;
                OBJJ_PROGRESS_CALLBACK(percent, CPApplicationSizeInBytes, aBundle.bundlePath());
            }
        }
        function success()
        {
            if (aBundle._loadStatus === CFBundleLoading)
                aBundle._loadStatus = CFBundleLoaded;
            else
                return;
            resolveStaticResource(aBundle._staticResource);
            function complete()
            {
                aBundle._eventDispatcher.dispatchEvent({type: "load", bundle: aBundle});
            }
            if (shouldExecute)
                executeBundle(aBundle, complete);
            else
                complete();
        }
    }
    function loadExecutableForBundle(aBundle, success, failure, progress)
    {
        var executableURL = aBundle.executableURL();
        if (!executableURL)
            return;
        aBundle._loadStatus |= CFBundleLoadingExecutable;
        new FileRequest(executableURL,         function(anEvent)
        {
            try {
                decompileStaticFile(aBundle, anEvent.request.responseText(), executableURL);
                aBundle._loadStatus &= ~CFBundleLoadingExecutable;
                success();
            }
            catch(anException) {
                failure(anException);
            }
        }, failure, progress);
    }
    function spritedImagesTestURLStringForBundle(aBundle)
    {
        return "mhtml:" + new CFURL("MHTMLTest.txt", aBundle.mostEligibleEnvironmentURL());
    }
    function spritedImagesURLForBundle(aBundle)
    {
        if (CFBundleSupportedSpriteType === CFBundleDataURLSpriteType)
            return new CFURL("dataURLs.txt", aBundle.mostEligibleEnvironmentURL());
        if (CFBundleSupportedSpriteType === CFBundleMHTMLSpriteType || CFBundleSupportedSpriteType === CFBundleMHTMLUncachedSpriteType)
            return new CFURL("MHTMLPaths.txt", aBundle.mostEligibleEnvironmentURL());
        return NULL;
    }
    function loadSpritedImagesForBundle(aBundle, success, failure, progress)
    {
        if (!aBundle.hasSpritedImages())
            return;
        aBundle._loadStatus |= CFBundleLoadingSpritedImages;
        if (!CFBundleHasTestedSpriteSupport())
            return CFBundleTestSpriteSupport(spritedImagesTestURLStringForBundle(aBundle),             function()
            {
                loadSpritedImagesForBundle(aBundle, success, failure, progress);
            });
        var spritedImagesURL = spritedImagesURLForBundle(aBundle);
        if (!spritedImagesURL)
        {
            aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
            return success();
        }
        new FileRequest(spritedImagesURL,         function(anEvent)
        {
            try {
                decompileStaticFile(aBundle, anEvent.request.responseText(), spritedImagesURL);
                aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
                success();
            }
            catch(anException) {
                failure(anException);
            }
        }, failure, progress);
    }
    function loadLocalizableStringsForBundle(aBundle, success, failure, progress)
    {
        var language = aBundle._loadedLanguage;
        if (!language)
            return;
        var localizableStrings = aBundle.valueForInfoDictionaryKey("CPBundleLocalizableStrings");
        if (!localizableStrings)
            return;
        var self = aBundle,
            length = localizableStrings.length,
            languagePathURL = new CFURL(language + ".lproj/", self.resourcesDirectoryURL()),
            fileSuccessed = 0;
        for (var i = 0; i < length; i++)
        {
            var localizableString = localizableStrings[i];
            function onsuccess(anEvent)
            {
                var contentFile = anEvent.request.responseText(),
                    tableName = (new CFURL(anEvent.request._URL)).lastPathComponent();
                try {
                    loadLocalizableContentForFileInBundle(self, contentFile, tableName);
                    if (++fileSuccessed == length)
                    {
                        aBundle._loadStatus &= ~CFBundleLoadingLocalizableStrings;
                        success();
                    }
                }
                catch(e) {
                    failure(new Error("Error when parsing the localizable file " + tableName));
                }
            }
            aBundle._loadStatus |= CFBundleLoadingLocalizableStrings;
            new FileRequest(new CFURL(localizableString, languagePathURL), onsuccess, failure, progress);
        }
    }
    function loadLocalizableContentForFileInBundle(bundle, contentFile, tableName)
    {
        var values = {},
            lines = contentFile.split("\n"),
            currentContext;
        bundle._localizableStrings[tableName] = values;
        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];
            if (line[0] == "/")
            {
                currentContext = (line.substring(2, line.length - 2)).trim();
                continue;
            }
            if (line[0] == "\"")
            {
                var split = line.split("\"");
                var key = split[1];
                if (!(key in values))
                    values[key] = split[3];
                key += currentContext;
                if (!(key in values))
                    values[key] = split[3];
                continue;
            }
        }
    }
    function loadLanguageForBundle(aBundle)
    {
        if (aBundle._loadedLanguage)
            return;
        var defaultLanguage = aBundle.valueForInfoDictionaryKey(CPBundleDefaultLanguage);
        if (defaultLanguage != CPBundleDefaultBrowserLanguage && defaultLanguage)
        {
            aBundle._loadedLanguage = defaultLanguage;
            return;
        }
        if (typeof navigator == "undefined")
            return;
        var language = typeof navigator.language !== "undefined" ? navigator.language : navigator.userLanguage;
        if (!language)
            return;
        aBundle._loadedLanguage = language.substring(0, 2);
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
    function CFBundleTestSpriteSupport(MHTMLPath, aCallback)
    {
        if (CFBundleHasTestedSpriteSupport())
            return;
        CFBundleSpriteSupportListeners.push(aCallback);
        if (CFBundleSpriteSupportListeners.length > 1)
            return;
        CFBundleSpriteSupportListeners.push(        function()
        {
            var size = 0,
                sizeDictionary = (CFBundle.mainBundle()).valueForInfoDictionaryKey("CPApplicationSize");
            if (!sizeDictionary)
                return;
            switch(CFBundleSupportedSpriteType) {
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
        CFBundleTestSpriteTypes([CFBundleDataURLSpriteType, "data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==", CFBundleMHTMLSpriteType, MHTMLPath + "!test", CFBundleMHTMLUncachedSpriteType, MHTMLPath + "?" + CFCacheBuster + "!test"]);
    }
    function CFBundleNotifySpriteSupportListeners()
    {
        var count = CFBundleSpriteSupportListeners.length;
        while (count--)
            CFBundleSpriteSupportListeners[count]();
    }
    function CFBundleTestSpriteTypes(spriteTypes)
    {
        if (!("Image" in global) || spriteTypes.length < 2)
        {
            CFBundleSupportedSpriteType = CFBundleNoSpriteType;
            CFBundleNotifySpriteSupportListeners();
            return;
        }
        var image = new Image();
        image.onload =         function()
        {
            if (image.width === 1 && image.height === 1)
            {
                CFBundleSupportedSpriteType = spriteTypes[0];
                CFBundleNotifySpriteSupportListeners();
            }            else
                image.onerror();
        };
        image.onerror =         function()
        {
            CFBundleTestSpriteTypes(spriteTypes.slice(2));
        };
        image.src = spriteTypes[1];
    }
    function executeBundle(aBundle, aCallback)
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
                        executable.loadFileDependencies(                        function()
                        {
                            executeStaticResources(index);
                        });
                        return;
                    }
                }
                else
                {
                    if ((staticResource.URL()).absoluteString() === (aBundle.resourcesDirectoryURL()).absoluteString())
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
    MARKER_SOURCE_MAP = 'S';
    function decompileStaticFile(aBundle, aString, aPath)
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
    CFBundle.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    CFBundle.prototype.addEventListener.displayName = "CFBundle.prototype.addEventListener";
    CFBundle.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    CFBundle.prototype.removeEventListener.displayName = "CFBundle.prototype.removeEventListener";
    CFBundle.prototype.onerror =     function(anEvent)
    {
        throw anEvent.error;
    };
    CFBundle.prototype.onerror.displayName = "CFBundle.prototype.onerror";
    CFBundle.prototype.bundlePath =     function()
    {
        return (this.bundleURL()).path();
    };
    CFBundle.prototype.path =     function()
    {
        CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
        return this.bundlePath.apply(this, arguments);
    };
    CFBundle.prototype.pathForResource =     function(aResource, aType, aSubDirectory, localizationName)
    {
        return (this.resourceURL(aResource, aType, aSubDirectory, localizationName)).absoluteString();
    };
    CFBundleCopyLocalizedString =     function(bundle, key, value, tableName)
    {
        return CFCopyLocalizedStringWithDefaultValue(key, tableName, bundle, value, "");
    };
    CFBundleCopyBundleLocalizations =     function(aBundle)
    {
        return [this._loadedLanguage];
    };
    CFCopyLocalizedString =     function(key, comment)
    {
        return CFCopyLocalizedStringFromTable(key, "Localizable", comment);
    };
    CFCopyLocalizedStringFromTable =     function(key, tableName, comment)
    {
        return CFCopyLocalizedStringFromTableInBundle(key, tableName, CFBundleGetMainBundle(), comment);
    };
    CFCopyLocalizedStringFromTableInBundle =     function(key, tableName, bundle, comment)
    {
        return CFCopyLocalizedStringWithDefaultValue(key, tableName, bundle, null, comment);
    };
    CFCopyLocalizedStringWithDefaultValue =     function(key, tableName, bundle, value, comment)
    {
        var string;
        if (!tableName)
            tableName = "Localizable";
        tableName += ".strings";
        var localizableString = bundle._localizableStrings[tableName];
        string = localizableString ? localizableString[key + comment] : null;
        return string || (value || key);
    };
    CFBundleGetMainBundle =     function()
    {
        return CFBundle.mainBundle();
    };
    var rootResources = {};
    function StaticResource(aURL, aParent, isDirectory, isResolved, aFilenameTranslateDictionary)
    {
        this._parent = aParent;
        this._eventDispatcher = new EventDispatcher(this);
        var name = (aURL.absoluteURL()).lastPathComponent() || aURL.schemeAndAuthority();
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
            this._children = {};
        else
            this._contents = "";
    }
    StaticResource.rootResources =     function()
    {
        return rootResources;
    };
    function countProp(x)
    {
        var count = 0;
        for (var k in x)
        {
            if (x.hasOwnProperty(k))
            {
                ++count;
            }
        }
        return count;
    }
    StaticResource.resetRootResources =     function()
    {
        rootResources = {};
    };
    StaticResource.prototype.filenameTranslateDictionary =     function()
    {
        return this._filenameTranslateDictionary || {};
    };
    exports.StaticResource = StaticResource;
    function resolveStaticResource(aResource)
    {
        aResource._isResolved = YES;
        aResource._eventDispatcher.dispatchEvent({type: "resolve", staticResource: aResource});
    }
    StaticResource.prototype.resolve =     function()
    {
        if (this.isDirectory())
        {
            var bundle = new CFBundle(this.URL());
            bundle.onerror =             function()
            {
            };
            bundle.load(NO);
        }        else
        {
            var self = this;
            function onsuccess(anEvent)
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
            }            new FileRequest(url, onsuccess, onfailure);
        }    };
    StaticResource.prototype.name =     function()
    {
        return this._name;
    };
    StaticResource.prototype.URL =     function()
    {
        return this._URL;
    };
    StaticResource.prototype.contents =     function()
    {
        return this._contents;
    };
    StaticResource.prototype.children =     function()
    {
        return this._children;
    };
    StaticResource.prototype.parent =     function()
    {
        return this._parent;
    };
    StaticResource.prototype.isResolved =     function()
    {
        return this._isResolved;
    };
    StaticResource.prototype.write =     function(aString)
    {
        this._contents += aString;
    };
    function rootResourceForAbsoluteURL(anAbsoluteURL)
    {
        var schemeAndAuthority = anAbsoluteURL.schemeAndAuthority(),
            resource = rootResources[schemeAndAuthority];
        if (!resource)
            resource = new StaticResource(new CFURL(schemeAndAuthority), NULL, YES, YES);
        return resource;
    }
    StaticResource.resourceAtURL =     function(aURL, resolveAsDirectoriesIfNecessary)
    {
        aURL = (makeAbsoluteURL(aURL)).absoluteURL();
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
            }            else
                throw new Error("Static Resource at " + aURL + " is not resolved (\"" + name + "\")");
        }        return resource;
    };
    StaticResource.prototype.resourceAtURL =     function(aURL, resolveAsDirectoriesIfNecessary)
    {
        return StaticResource.resourceAtURL(new CFURL(aURL, this.URL()), resolveAsDirectoriesIfNecessary);
    };
    StaticResource.resolveResourcesAtURLs =     function(URLs, aCallback)
    {
        var count = URLs.length,
            allResources = {};
        for (var i = 0, size = count; i < size; i++)
        {
            var url = URLs[i];
            StaticResource.resolveResourceAtURL(url, NO,             function(aResource)
            {
                allResources[url] = aResource;
                if (--count === 0)
                    aCallback(allResources);
            });
        }    };
    StaticResource.resolveResourceAtURL =     function(aURL, isDirectory, aCallback, aFilenameTranslateDictionary)
    {
        aURL = (makeAbsoluteURL(aURL)).absoluteURL();
        resolveResourceComponents(rootResourceForAbsoluteURL(aURL), isDirectory, aURL.pathComponents(), 0, aCallback, aFilenameTranslateDictionary);
    };
    StaticResource.prototype.resolveResourceAtURL =     function(aURL, isDirectory, aCallback)
    {
        StaticResource.resolveResourceAtURL((new CFURL(aURL, this.URL())).absoluteURL(), isDirectory, aCallback);
    };
    function resolveResourceComponents(aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary)
    {
        var count = components.length;
        for (; index < count; ++index)
        {
            var name = components[index],
                child = hasOwnProperty.call(aResource._children, name) && aResource._children[name];
            if (!child)
            {
                child = new StaticResource(new CFURL(name, aResource.URL()), aResource, index + 1 < count || isDirectory, NO, aFilenameTranslateDictionary);
                child.resolve();
            }
            if (!child.isResolved())
                return child.addEventListener("resolve",                 function()
                {
                    resolveResourceComponents(aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary);
                });
            if (child.isNotFound())
                return aCallback(null, new Error("File not found: " + components.join("/")));
            if (index + 1 < count && child.isFile())
                return aCallback(null, new Error("File is not a directory: " + components.join("/")));
            aResource = child;
        }
        aCallback(aResource);
    }
    function resolveResourceAtURLSearchingIncludeURLs(aURL, anIndex, aCallback)
    {
        var includeURLs = StaticResource.includeURLs(),
            searchURL = (new CFURL(aURL, includeURLs[anIndex])).absoluteURL();
        StaticResource.resolveResourceAtURL(searchURL, NO,         function(aStaticResource)
        {
            if (!aStaticResource)
            {
                if (anIndex + 1 < includeURLs.length)
                    resolveResourceAtURLSearchingIncludeURLs(aURL, anIndex + 1, aCallback);
                else
                    aCallback(NULL);
                return;
            }            aCallback(aStaticResource);
        });
    }
    StaticResource.resolveResourceAtURLSearchingIncludeURLs =     function(aURL, aCallback)
    {
        resolveResourceAtURLSearchingIncludeURLs(aURL, 0, aCallback);
    };
    StaticResource.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    StaticResource.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    StaticResource.prototype.isNotFound =     function()
    {
        return this._isNotFound;
    };
    StaticResource.prototype.isFile =     function()
    {
        return !this._isDirectory;
    };
    StaticResource.prototype.isDirectory =     function()
    {
        return this._isDirectory;
    };
    StaticResource.prototype.toString =     function(includeNotFounds)
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
                        string += "\n\t" + ((children[name].toString(includeNotFounds)).split('\n')).join("\n\t");
                }        }        return string;
    };
    var includeURLs = NULL;
    StaticResource.includeURLs =     function()
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
            includeURLs[count] = (new CFURL(includeURLs[count])).asDirectoryPathURL();
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
    function Lexer(aString)
    {
        this._index = -1;
        this._tokens = (aString + '\n').match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
        this._context = [];
        return this;
    }
    Lexer.prototype.push =     function()
    {
        this._context.push(this._index);
    };
    Lexer.prototype.pop =     function()
    {
        this._index = this._context.pop();
    };
    Lexer.prototype.peek =     function(shouldSkipWhitespace)
    {
        if (shouldSkipWhitespace)
        {
            this.push();
            var token = this.skip_whitespace();
            this.pop();
            return token;
        }        return this._tokens[this._index + 1];
    };
    Lexer.prototype.next =     function()
    {
        return this._tokens[++this._index];
    };
    Lexer.prototype.previous =     function()
    {
        return this._tokens[--this._index];
    };
    Lexer.prototype.last =     function()
    {
        if (this._index < 0)
            return NULL;
        return this._tokens[this._index - 1];
    };
    Lexer.prototype.skip_whitespace =     function(shouldMoveBackwards)
    {
        var token;
        if (shouldMoveBackwards)
            while ((token = this.previous()) && TOKEN_WHITESPACE.test(token));
        else
            while ((token = this.next()) && TOKEN_WHITESPACE.test(token));
        return token;
    };
    exports.Lexer = Lexer;
    function StringBuffer()
    {
        this.atoms = [];
    }
    StringBuffer.prototype.toString =     function()
    {
        return this.atoms.join("");
    };
    exports.preprocess =     function(aString, aURL, flags)
    {
        return (new Preprocessor(aString, aURL, flags)).executable();
    };
    exports.eval =     function(aString)
    {
        return eval((exports.preprocess(aString)).code());
    };
    var Preprocessor =     function(aString, aURL, flags)
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
    };
    Preprocessor.prototype.setClassInfo =     function(className, superClassName, ivars)
    {
        this._classLookupTable[className] = {superClassName: superClassName, ivars: ivars};
    };
    Preprocessor.prototype.getClassInfo =     function(className)
    {
        return this._classLookupTable[className];
    };
    Preprocessor.prototype.allIvarNamesForClassName =     function(className)
    {
        var names = {},
            classInfo = this.getClassInfo(className);
        while (classInfo)
        {
            for (var i in classInfo.ivars)
                names[i] = 1;
            classInfo = this.getClassInfo(classInfo.superClassName);
        }        return names;
    };
    exports.Preprocessor = Preprocessor;
    Preprocessor.Flags = {};
    Preprocessor.Flags.IncludeDebugSymbols = 1 << 0;
    Preprocessor.Flags.IncludeTypeSignatures = 1 << 1;
    Preprocessor.prototype.executable =     function()
    {
        if (!this._executable)
            this._executable = new Executable(this._buffer.toString(), this._dependencies, this._URL);
        return this._executable;
    };
    Preprocessor.prototype.accessors =     function(tokens)
    {
        var token = tokens.skip_whitespace(),
            attributes = {};
        if (token != TOKEN_OPEN_PARENTHESIS)
        {
            tokens.previous();
            return attributes;
        }        while ((token = tokens.skip_whitespace()) != TOKEN_CLOSE_PARENTHESIS)
        {
            var name = token,
                value = true;
            if (!/^ w+$/.test(name))
                throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
            if ((token = tokens.skip_whitespace()) == TOKEN_EQUAL)
            {
                value = tokens.skip_whitespace();
                if (!/^ w+$/.test(value))
                    throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
                if (name == "setter")
                {
                    if ((token = tokens.next()) != TOKEN_COLON)
                        throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
                    value += ":";
                }                token = tokens.skip_whitespace();
            }            attributes[name] = value;
            if (token == TOKEN_CLOSE_PARENTHESIS)
                break;
            if (token != TOKEN_COMMA)
                throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
        }        return attributes;
    };
    Preprocessor.prototype.brackets =     function(tokens, aStringBuffer)
    {
        var tuples = [];
        while (this.preprocess(tokens, NULL, NULL, NULL, tuples[tuples.length] = []));
        if (tuples[0].length === 1)
        {
            aStringBuffer.atoms[aStringBuffer.atoms.length] = '[';
            aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
            aStringBuffer.atoms[aStringBuffer.atoms.length] = ']';
        }        else
        {
            var selector = new StringBuffer();
            if (tuples[0][0].atoms[0] == TOKEN_SUPER)
            {
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSendSuper(";
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "{ receiver:self, super_class:" + (this._classMethod ? this._currentSuperMetaClass : this._currentSuperClass) + " }";
            }            else
            {
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSend(";
                aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
            }            selector.atoms[selector.atoms.length] = tuples[0][1];
            var index = 1,
                count = tuples.length,
                marg_list = new StringBuffer();
            for (; index < count; ++index)
            {
                var pair = tuples[index];
                selector.atoms[selector.atoms.length] = pair[1];
                marg_list.atoms[marg_list.atoms.length] = ", " + pair[0];
            }            aStringBuffer.atoms[aStringBuffer.atoms.length] = ", \"";
            aStringBuffer.atoms[aStringBuffer.atoms.length] = selector;
            aStringBuffer.atoms[aStringBuffer.atoms.length] = '\"';
            aStringBuffer.atoms[aStringBuffer.atoms.length] = marg_list;
            aStringBuffer.atoms[aStringBuffer.atoms.length] = ')';
        }    };
    Preprocessor.prototype.directive =     function(tokens, aStringBuffer, allowedDirectivesFlags)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            token = tokens.next();
        if (token.charAt(0) == TOKEN_DOUBLE_QUOTE)
            buffer.atoms[buffer.atoms.length] = token;
        else if (token === TOKEN_CLASS)
        {
            tokens.skip_whitespace();
            return;
        }        else if (token === TOKEN_IMPLEMENTATION)
            this.implementation(tokens, buffer);
        else if (token === TOKEN_IMPORT)
            this._import(tokens);
        else if (token === TOKEN_SELECTOR)
            this.selector(tokens, buffer);
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.hash =     function(tokens, aStringBuffer)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            token = tokens.next();
        if (token === TOKEN_PRAGMA)
        {
            token = tokens.skip_whitespace();
            if (token === TOKEN_MARK)
            {
                while ((token = tokens.next()).indexOf("\n") < 0);
            }        }        else
            throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \"" + token + "\"."));
    };
    Preprocessor.prototype.implementation =     function(tokens, aStringBuffer)
    {
        var buffer = aStringBuffer,
            token = "",
            category = NO,
            class_name = tokens.skip_whitespace(),
            superclass_name = "Nil",
            instance_methods = new StringBuffer(),
            class_methods = new StringBuffer();
        if (!/^\w/.test(class_name))
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
        }        else
        {
            if (token == TOKEN_COLON)
            {
                token = tokens.skip_whitespace();
                if (!TOKEN_IDENTIFIER.test(token))
                    throw new SyntaxError(this.error_message("*** Expected class name, found \"" + token + "\"."));
                superclass_name = token;
                token = tokens.skip_whitespace();
            }            buffer.atoms[buffer.atoms.length] = "{var the_class = objj_allocateClassPair(" + superclass_name + ", \"" + class_name + "\"),\nmeta_class = the_class.isa;";
            if (token == TOKEN_OPEN_BRACE)
            {
                var ivar_names = {},
                    ivar_count = 0,
                    declaration = [],
                    attributes,
                    accessors = {},
                    types = [];
                while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_BRACE)
                {
                    if (token === TOKEN_PREPROCESSOR)
                    {
                        token = tokens.next();
                        if (token === TOKEN_ACCESSORS)
                            attributes = this.accessors(tokens);
                        else if (token !== TOKEN_OUTLET)
                            throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@" + token + "')."));
                        else
                            types.push("@" + token);
                    }                    else if (token == TOKEN_SEMICOLON)
                    {
                        if (ivar_count++ === 0)
                            buffer.atoms[buffer.atoms.length] = "class_addIvars(the_class, [";
                        else
                            buffer.atoms[buffer.atoms.length] = ", ";
                        var name = declaration[declaration.length - 1];
                        if (this._flags & Preprocessor.Flags.IncludeTypeSignatures)
                            buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\", \"" + (types.slice(0, types.length - 1)).join(" ") + "\")";
                        else
                            buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\")";
                        ivar_names[name] = 1;
                        declaration = [];
                        types = [];
                        if (attributes)
                        {
                            accessors[name] = attributes;
                            attributes = NULL;
                        }                    }                    else
                    {
                        declaration.push(token);
                        types.push(token);
                    }                }                if (declaration.length)
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
                        setterName = (start ? "_" : "") + "set" + (property.substr(start, 1)).toUpperCase() + property.substring(start + 1) + ":";
                    }                    var setterCode = "(void)" + setterName + "(id)newValue\n{\n";
                    if (accessor["copy"])
                        setterCode += "if (" + ivar_name + " !== newValue)\n" + ivar_name + " = [newValue copy];\n}";
                    else
                        setterCode += ivar_name + " = newValue;\n}";
                    if (instance_methods.atoms.length !== 0)
                        instance_methods.atoms[instance_methods.atoms.length] = ",\n";
                    instance_methods.atoms[instance_methods.atoms.length] = this.method(new Lexer(setterCode), ivar_names);
                }            }            else
                tokens.previous();
            buffer.atoms[buffer.atoms.length] = "objj_registerClassPair(the_class);\n";
        }        if (!ivar_names)
            var ivar_names = this.allIvarNamesForClassName(class_name);
        while (token = tokens.skip_whitespace())
        {
            if (token == TOKEN_PLUS)
            {
                this._classMethod = true;
                if (class_methods.atoms.length !== 0)
                    class_methods.atoms[class_methods.atoms.length] = ", ";
                class_methods.atoms[class_methods.atoms.length] = this.method(tokens, this._classVars);
            }            else if (token == TOKEN_MINUS)
            {
                this._classMethod = false;
                if (instance_methods.atoms.length !== 0)
                    instance_methods.atoms[instance_methods.atoms.length] = ", ";
                instance_methods.atoms[instance_methods.atoms.length] = this.method(tokens, ivar_names);
            }            else if (token == TOKEN_HASH)
            {
                this.hash(tokens, buffer);
            }            else if (token == TOKEN_PREPROCESSOR)
            {
                if ((token = tokens.next()) == TOKEN_END)
                    break;
                else
                    throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@" + token + "\"."));
            }        }        if (instance_methods.atoms.length !== 0)
        {
            buffer.atoms[buffer.atoms.length] = "class_addMethods(the_class, [";
            buffer.atoms[buffer.atoms.length] = instance_methods;
            buffer.atoms[buffer.atoms.length] = "]);\n";
        }        if (class_methods.atoms.length !== 0)
        {
            buffer.atoms[buffer.atoms.length] = "class_addMethods(meta_class, [";
            buffer.atoms[buffer.atoms.length] = class_methods;
            buffer.atoms[buffer.atoms.length] = "]);\n";
        }        buffer.atoms[buffer.atoms.length] = '}';
        this._currentClass = "";
    };
    Preprocessor.prototype._import =     function(tokens)
    {
        var URLString = "",
            token = tokens.skip_whitespace(),
            isQuoted = token !== TOKEN_LESS_THAN;
        if (token === TOKEN_LESS_THAN)
        {
            while ((token = tokens.next()) && token !== TOKEN_GREATER_THAN)
                URLString += token;
            if (!token)
                throw new SyntaxError(this.error_message("*** Unterminated import statement."));
        }        else if (token.charAt(0) === TOKEN_DOUBLE_QUOTE)
            URLString = token.substr(1, token.length - 2);
        else
            throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \"" + token + "\"."));
        this._buffer.atoms[this._buffer.atoms.length] = "objj_executeFile(\"";
        this._buffer.atoms[this._buffer.atoms.length] = URLString;
        this._buffer.atoms[this._buffer.atoms.length] = isQuoted ? "\", YES);" : "\", NO);";
        this._dependencies.push(new FileDependency(new CFURL(URLString), isQuoted));
    };
    Preprocessor.prototype.method =     function(tokens, ivar_names)
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
                }                types[parameters.length + 1] = type || null;
                parameters[parameters.length] = token;
                if (token in ivar_names)
                    CPLog.warn(this.error_message("*** Warning: Method ( " + selector + " ) uses a parameter name that is already in use ( " + token + " )"));
            }            else if (token == TOKEN_OPEN_PARENTHESIS)
            {
                var type = "";
                while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_PARENTHESIS)
                    type += token;
                types[0] = type || null;
            }            else if (token == TOKEN_COMMA)
            {
                if ((token = tokens.skip_whitespace()) != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD)
                    throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
            }            else
                selector += token;
        }        if (token === TOKEN_SEMICOLON)
        {
            token = tokens.skip_whitespace();
            if (token !== TOKEN_OPEN_BRACE)
            {
                throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. " + "Semi-colons are allowed only to terminate the method signature, before the open brace."));
            }        }        var index = 0,
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
        }        buffer.atoms[buffer.atoms.length] = ")\n{ with(self)\n{";
        buffer.atoms[buffer.atoms.length] = this.preprocess(tokens, NULL, TOKEN_CLOSE_BRACE, TOKEN_OPEN_BRACE);
        buffer.atoms[buffer.atoms.length] = "}\n}";
        if (this._flags & Preprocessor.Flags.IncludeDebugSymbols)
            buffer.atoms[buffer.atoms.length] = "," + JSON.stringify(types);
        buffer.atoms[buffer.atoms.length] = ")";
        this._currentSelector = "";
        return buffer;
    };
    Preprocessor.prototype.preprocess =     function(tokens, aStringBuffer, terminator, instigator, tuple)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            count = 0,
            token = "";
        if (tuple)
        {
            tuple[0] = buffer;
            var bracket = false,
                closures = [0, 0, 0];
        }        while ((token = tokens.next()) && (token !== terminator || count))
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
                else if ((token === TOKEN_COLON && closures[2]-- === 0 || (bracket = token === TOKEN_CLOSE_BRACKET)) && closures[0] === 0 && closures[1] === 0)
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
                        if (last === '+' || last === '-')
                        {
                            if (tokens.previous() !== last)
                                operatorCheck = false;
                            else
                            {
                                last = tokens.skip_whitespace(true);
                                isDoubleOperator = true;
                            }                        }                        tokens.pop();
                        tokens.pop();
                        if (operatorCheck && (!isDoubleOperator && last === TOKEN_CLOSE_BRACE || last === TOKEN_CLOSE_PARENTHESIS || last === TOKEN_CLOSE_BRACKET || last === TOKEN_PERIOD || TOKEN_NUMBER.test(last) || last.charAt(last.length - 1) === '\"' || last.charAt(last.length - 1) === '\'' || TOKEN_IDENTIFIER.test(last) && !/^(new|return|case|var)$/.test(last)))
                        {
                            if (isEmptyLabel)
                                tuple[1] = ':';
                            else
                            {
                                tuple[1] = label;
                                if (!bracket)
                                    tuple[1] += ':';
                                var count = buffer.atoms.length;
                                while (buffer.atoms[count--] !== label);
                                buffer.atoms.length = count;
                            }                            return !bracket;
                        }                        if (bracket)
                            return NO;
                    }                    tokens.pop();
                    if (bracket)
                        return NO;
                }                closures[2] = MAX(closures[2], 0);
            }            if (instigator)
            {
                if (token === instigator)
                    ++count;
                else if (token === terminator)
                    --count;
            }            if (token === TOKEN_FUNCTION)
            {
                var accumulator = "";
                while ((token = tokens.next()) && token !== TOKEN_OPEN_PARENTHESIS && !/^\w/.test(token))
                    accumulator += token;
                if (token === TOKEN_OPEN_PARENTHESIS)
                {
                    if (instigator === TOKEN_OPEN_PARENTHESIS)
                        ++count;
                    buffer.atoms[buffer.atoms.length] = "function" + accumulator + '(';
                    if (tuple)
                        ++closures[1];
                }                else
                {
                    buffer.atoms[buffer.atoms.length] = token + " = function";
                }            }            else if (token == TOKEN_PREPROCESSOR)
                this.directive(tokens, buffer);
            else if (token == TOKEN_HASH)
                this.hash(tokens, buffer);
            else if (token == TOKEN_OPEN_BRACKET)
                this.brackets(tokens, buffer);
            else
                buffer.atoms[buffer.atoms.length] = token;
        }        if (tuple)
            throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.selector =     function(tokens, aStringBuffer)
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
            if (starting && /^\d+$/.test(token) || !/^(\w|$|\:)/.test(token))
            {
                if (!/\S/.test(token))
                    if (tokens.skip_whitespace() == TOKEN_CLOSE_PARENTHESIS)
                        break;
                    else
                        throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
                else
                    throw new SyntaxError(this.error_message("*** Illegal character '" + token + "' in @selector()."));
            }            buffer.atoms[buffer.atoms.length] = token;
            starting = token == TOKEN_COLON;
        }        buffer.atoms[buffer.atoms.length] = "\")";
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.error_message =     function(errorMessage)
    {
        return errorMessage + " <Context File: " + this._URL + (this._currentClass ? " Class: " + this._currentClass : "") + (this._currentSelector ? " Method: " + this._currentSelector : "") + ">";
    };
    (    function webpackUniversalModuleDefinition(root, factory)
    {
        function DescriptionOfObject(anObject, maximumRecursionDepth)
        {
            if (anObject === nil)
                return "nil";
            if (anObject === undefined)
                return "undefined";
            if (anObject === window)
                return "window";
            if (maximumRecursionDepth === 0)
                return "...";
            if (typeof anObject !== "object")
                return String(anObject);
            var properties = [],
                desc;
            for (var property in anObject)
                if (anObject.hasOwnProperty(property))
                    properties.push(property);
            properties.sort();
            desc = "{";
            for (var i = 0; i < properties.length; ++i)
            {
                if (i === 0)
                    desc += "\n";
                var value = anObject[properties[i]],
                    valueDescription = ((DescriptionOfObject(value, maximumRecursionDepth !== undefined ? maximumRecursionDepth - 1 : maximumRecursionDepth)).split("\n")).join("\n    ");
                desc += "    " + properties[i] + ": " + valueDescription;
                if (i < properties.length - 1)
                    desc += ",\n";
                else
                    desc += "\n";
            }
            desc += "}";
            return desc;
        }
        if (typeof exports === 'object' && typeof module === 'object')
        {
            module.exports = factory();
        }        else if (typeof define === 'function' && define.amd)
        {
            define([], factory);
        }        else if (typeof exports === 'object')
        {
            exports["sourceMap"] = factory();
        }        else
        {
            root["sourceMap"] = factory();
        }    })(this,     function()
    {
        return (        function(modules)
        {
            var installedModules = {};
            function __webpack_require__(moduleId)
            {
                if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                var module = installedModules[moduleId] = {exports: {}, id: moduleId, loaded: false};
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                module.loaded = true;
                return module.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.p = "";
            return __webpack_require__(0);
        })([        function(module, exports, __webpack_require__)
        {
            exports.SourceMapGenerator = (__webpack_require__(1)).SourceMapGenerator;
            exports.SourceMapConsumer = (__webpack_require__(7)).SourceMapConsumer;
            exports.SourceNode = (__webpack_require__(10)).SourceNode;
        },         function(module, exports, __webpack_require__)
        {
            var base64VLQ = __webpack_require__(2);
            var util = __webpack_require__(4);
            var ArraySet = (__webpack_require__(5)).ArraySet;
            var MappingList = (__webpack_require__(6)).MappingList;
            function SourceMapGenerator(aArgs)
            {
                if (!aArgs)
                {
                    aArgs = {};
                }
                this._file = util.getArg(aArgs, 'file', null);
                this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
                this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
                this._sources = new ArraySet();
                this._names = new ArraySet();
                this._mappings = new MappingList();
                this._sourcesContents = null;
            }
            SourceMapGenerator.prototype._version = 3;
            SourceMapGenerator.fromSourceMap =             function SourceMapGenerator_fromSourceMap(aSourceMapConsumer)
            {
                var sourceRoot = aSourceMapConsumer.sourceRoot;
                var generator = new SourceMapGenerator({file: aSourceMapConsumer.file, sourceRoot: sourceRoot});
                aSourceMapConsumer.eachMapping(                function(mapping)
                {
                    var newMapping = {generated: {line: mapping.generatedLine, column: mapping.generatedColumn}};
                    if (mapping.source != null)
                    {
                        newMapping.source = mapping.source;
                        if (sourceRoot != null)
                        {
                            newMapping.source = util.relative(sourceRoot, newMapping.source);
                        }                        newMapping.original = {line: mapping.originalLine, column: mapping.originalColumn};
                        if (mapping.name != null)
                        {
                            newMapping.name = mapping.name;
                        }                    }                    generator.addMapping(newMapping);
                });
                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        generator.setSourceContent(sourceFile, content);
                    }                });
                return generator;
            };
            SourceMapGenerator.prototype.addMapping =             function SourceMapGenerator_addMapping(aArgs)
            {
                var generated = util.getArg(aArgs, 'generated');
                var original = util.getArg(aArgs, 'original', null);
                var source = util.getArg(aArgs, 'source', null);
                var name = util.getArg(aArgs, 'name', null);
                if (!this._skipValidation)
                {
                    this._validateMapping(generated, original, source, name);
                }                if (source != null)
                {
                    source = String(source);
                    if (!this._sources.has(source))
                    {
                        this._sources.add(source);
                    }                }                if (name != null)
                {
                    name = String(name);
                    if (!this._names.has(name))
                    {
                        this._names.add(name);
                    }                }                this._mappings.add({generatedLine: generated.line, generatedColumn: generated.column, originalLine: original != null && original.line, originalColumn: original != null && original.column, source: source, name: name});
            };
            SourceMapGenerator.prototype.setSourceContent =             function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent)
            {
                var source = aSourceFile;
                if (this._sourceRoot != null)
                {
                    source = util.relative(this._sourceRoot, source);
                }                if (aSourceContent != null)
                {
                    if (!this._sourcesContents)
                    {
                        this._sourcesContents = Object.create(null);
                    }                    this._sourcesContents[util.toSetString(source)] = aSourceContent;
                }                else if (this._sourcesContents)
                {
                    delete this._sourcesContents[util.toSetString(source)];
                    if ((Object.keys(this._sourcesContents)).length === 0)
                    {
                        this._sourcesContents = null;
                    }                }            };
            SourceMapGenerator.prototype.applySourceMap =             function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath)
            {
                var sourceFile = aSourceFile;
                if (aSourceFile == null)
                {
                    if (aSourceMapConsumer.file == null)
                    {
                        throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
                    }                    sourceFile = aSourceMapConsumer.file;
                }                var sourceRoot = this._sourceRoot;
                if (sourceRoot != null)
                {
                    sourceFile = util.relative(sourceRoot, sourceFile);
                }                var newSources = new ArraySet();
                var newNames = new ArraySet();
                this._mappings.unsortedForEach(                function(mapping)
                {
                    if (mapping.source === sourceFile && mapping.originalLine != null)
                    {
                        var original = aSourceMapConsumer.originalPositionFor({line: mapping.originalLine, column: mapping.originalColumn});
                        if (original.source != null)
                        {
                            mapping.source = original.source;
                            if (aSourceMapPath != null)
                            {
                                mapping.source = util.join(aSourceMapPath, mapping.source);
                            }                            if (sourceRoot != null)
                            {
                                mapping.source = util.relative(sourceRoot, mapping.source);
                            }                            mapping.originalLine = original.line;
                            mapping.originalColumn = original.column;
                            if (original.name != null)
                            {
                                mapping.name = original.name;
                            }                        }                    }                    var source = mapping.source;
                    if (source != null && !newSources.has(source))
                    {
                        newSources.add(source);
                    }                    var name = mapping.name;
                    if (name != null && !newNames.has(name))
                    {
                        newNames.add(name);
                    }                }, this);
                this._sources = newSources;
                this._names = newNames;
                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        if (aSourceMapPath != null)
                        {
                            sourceFile = util.join(aSourceMapPath, sourceFile);
                        }                        if (sourceRoot != null)
                        {
                            sourceFile = util.relative(sourceRoot, sourceFile);
                        }                        this.setSourceContent(sourceFile, content);
                    }                }, this);
            };
            SourceMapGenerator.prototype._validateMapping =             function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName)
            {
                if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName)
                {
                    return;
                }                else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource)
                {
                    return;
                }                else
                {
                    throw new Error('Invalid mapping: ' + JSON.stringify({generated: aGenerated, source: aSource, original: aOriginal, name: aName}));
                }            };
            SourceMapGenerator.prototype._serializeMappings =             function SourceMapGenerator_serializeMappings()
            {
                var previousGeneratedColumn = 0;
                var previousGeneratedLine = 1;
                var previousOriginalColumn = 0;
                var previousOriginalLine = 0;
                var previousName = 0;
                var previousSource = 0;
                var result = '';
                var next;
                var mapping;
                var nameIdx;
                var sourceIdx;
                var mappings = this._mappings.toArray();
                for (var i = 0, len = mappings.length; i < len; i++)
                {
                    mapping = mappings[i];
                    next = '';
                    if (mapping.generatedLine !== previousGeneratedLine)
                    {
                        previousGeneratedColumn = 0;
                        while (mapping.generatedLine !== previousGeneratedLine)
                        {
                            next += ';';
                            previousGeneratedLine++;
                        }                    }                    else
                    {
                        if (i > 0)
                        {
                            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1]))
                            {
                                continue;
                            }                            next += ',';
                        }                    }                    next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
                    previousGeneratedColumn = mapping.generatedColumn;
                    if (mapping.source != null)
                    {
                        sourceIdx = this._sources.indexOf(mapping.source);
                        next += base64VLQ.encode(sourceIdx - previousSource);
                        previousSource = sourceIdx;
                        next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
                        previousOriginalLine = mapping.originalLine - 1;
                        next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
                        previousOriginalColumn = mapping.originalColumn;
                        if (mapping.name != null)
                        {
                            nameIdx = this._names.indexOf(mapping.name);
                            next += base64VLQ.encode(nameIdx - previousName);
                            previousName = nameIdx;
                        }                    }                    result += next;
                }                return result;
            };
            SourceMapGenerator.prototype._generateSourcesContent =             function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot)
            {
                return aSources.map(                function(source)
                {
                    if (!this._sourcesContents)
                    {
                        return null;
                    }                    if (aSourceRoot != null)
                    {
                        source = util.relative(aSourceRoot, source);
                    }                    var key = util.toSetString(source);
                    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
                }, this);
            };
            SourceMapGenerator.prototype.toJSON =             function SourceMapGenerator_toJSON()
            {
                var map = {version: this._version, sources: this._sources.toArray(), names: this._names.toArray(), mappings: this._serializeMappings()};
                if (this._file != null)
                {
                    map.file = this._file;
                }                if (this._sourceRoot != null)
                {
                    map.sourceRoot = this._sourceRoot;
                }                if (this._sourcesContents)
                {
                    map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
                }                return map;
            };
            SourceMapGenerator.prototype.toString =             function SourceMapGenerator_toString()
            {
                return JSON.stringify(this.toJSON());
            };
            exports.SourceMapGenerator = SourceMapGenerator;
        },         function(module, exports, __webpack_require__)
        {
            var base64 = __webpack_require__(3);
            var VLQ_BASE_SHIFT = 5;
            var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
            var VLQ_BASE_MASK = VLQ_BASE - 1;
            var VLQ_CONTINUATION_BIT = VLQ_BASE;
            function toVLQSigned(aValue)
            {
                return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
            }
            function fromVLQSigned(aValue)
            {
                var isNegative = (aValue & 1) === 1;
                var shifted = aValue >> 1;
                return isNegative ? -shifted : shifted;
            }
            exports.encode =             function base64VLQ_encode(aValue)
            {
                var encoded = "";
                var digit;
                var vlq = toVLQSigned(aValue);
                do
                {
                    digit = vlq & VLQ_BASE_MASK;
                    vlq >>>= VLQ_BASE_SHIFT;
                    if (vlq > 0)
                    {
                        digit |= VLQ_CONTINUATION_BIT;
                    }                    encoded += base64.encode(digit);
                }                while (vlq > 0);
                                return encoded;
            };
            exports.decode =             function base64VLQ_decode(aStr, aIndex, aOutParam)
            {
                var strLen = aStr.length;
                var result = 0;
                var shift = 0;
                var continuation,
                    digit;
                do
                {
                    if (aIndex >= strLen)
                    {
                        throw new Error("Expected more digits in base 64 VLQ value.");
                    }                    digit = base64.decode(aStr.charCodeAt(aIndex++));
                    if (digit === -1)
                    {
                        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
                    }                    continuation = !!(digit & VLQ_CONTINUATION_BIT);
                    digit &= VLQ_BASE_MASK;
                    result = result + (digit << shift);
                    shift += VLQ_BASE_SHIFT;
                }                while (continuation);
                                aOutParam.value = fromVLQSigned(result);
                aOutParam.rest = aIndex;
            };
        },         function(module, exports)
        {
            var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
            exports.encode =             function(number)
            {
                if (0 <= number && number < intToCharMap.length)
                {
                    return intToCharMap[number];
                }                throw new TypeError("Must be between 0 and 63: " + number);
            };
            exports.decode =             function(charCode)
            {
                var bigA = 65;
                var bigZ = 90;
                var littleA = 97;
                var littleZ = 122;
                var zero = 48;
                var nine = 57;
                var plus = 43;
                var slash = 47;
                var littleOffset = 26;
                var numberOffset = 52;
                if (bigA <= charCode && charCode <= bigZ)
                {
                    return charCode - bigA;
                }                if (littleA <= charCode && charCode <= littleZ)
                {
                    return charCode - littleA + littleOffset;
                }                if (zero <= charCode && charCode <= nine)
                {
                    return charCode - zero + numberOffset;
                }                if (charCode == plus)
                {
                    return 62;
                }                if (charCode == slash)
                {
                    return 63;
                }                return -1;
            };
        },         function(module, exports)
        {
            function getArg(aArgs, aName, aDefaultValue)
            {
                if (aName in aArgs)
                {
                    return aArgs[aName];
                }
                else if (arguments.length === 3)
                {
                    return aDefaultValue;
                }
                else
                {
                    throw new Error('"' + aName + '" is a required argument.');
                }
            }
            exports.getArg = getArg;
            var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
            var dataUrlRegexp = /^data:.+\,.+$/;
            function urlParse(aUrl)
            {
                var match = aUrl.match(urlRegexp);
                if (!match)
                {
                    return null;
                }
                return {scheme: match[1], auth: match[2], host: match[3], port: match[4], path: match[5]};
            }
            exports.urlParse = urlParse;
            function urlGenerate(aParsedUrl)
            {
                var url = '';
                if (aParsedUrl.scheme)
                {
                    url += aParsedUrl.scheme + ':';
                }
                url += '//';
                if (aParsedUrl.auth)
                {
                    url += aParsedUrl.auth + '@';
                }
                if (aParsedUrl.host)
                {
                    url += aParsedUrl.host;
                }
                if (aParsedUrl.port)
                {
                    url += ":" + aParsedUrl.port;
                }
                if (aParsedUrl.path)
                {
                    url += aParsedUrl.path;
                }
                return url;
            }
            exports.urlGenerate = urlGenerate;
            function normalize(aPath)
            {
                var path = aPath;
                var url = urlParse(aPath);
                if (url)
                {
                    if (!url.path)
                    {
                        return aPath;
                    }
                    path = url.path;
                }
                var isAbsolute = exports.isAbsolute(path);
                var parts = path.split(/\/+/);
                for (var part, up = 0, i = parts.length - 1; i >= 0; i--)
                {
                    part = parts[i];
                    if (part === '.')
                    {
                        parts.splice(i, 1);
                    }
                    else if (part === '..')
                    {
                        up++;
                    }
                    else if (up > 0)
                    {
                        if (part === '')
                        {
                            parts.splice(i + 1, up);
                            up = 0;
                        }
                        else
                        {
                            parts.splice(i, 2);
                            up--;
                        }
                    }
                }
                path = parts.join('/');
                if (path === '')
                {
                    path = isAbsolute ? '/' : '.';
                }
                if (url)
                {
                    url.path = path;
                    return urlGenerate(url);
                }
                return path;
            }
            exports.normalize = normalize;
            function join(aRoot, aPath)
            {
                if (aRoot === "")
                {
                    aRoot = ".";
                }
                if (aPath === "")
                {
                    aPath = ".";
                }
                var aPathUrl = urlParse(aPath);
                var aRootUrl = urlParse(aRoot);
                if (aRootUrl)
                {
                    aRoot = aRootUrl.path || '/';
                }
                if (aPathUrl && !aPathUrl.scheme)
                {
                    if (aRootUrl)
                    {
                        aPathUrl.scheme = aRootUrl.scheme;
                    }
                    return urlGenerate(aPathUrl);
                }
                if (aPathUrl || aPath.match(dataUrlRegexp))
                {
                    return aPath;
                }
                if (aRootUrl && !aRootUrl.host && !aRootUrl.path)
                {
                    aRootUrl.host = aPath;
                    return urlGenerate(aRootUrl);
                }
                var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
                if (aRootUrl)
                {
                    aRootUrl.path = joined;
                    return urlGenerate(aRootUrl);
                }
                return joined;
            }
            exports.join = join;
            exports.isAbsolute =             function(aPath)
            {
                return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
            };
            function relative(aRoot, aPath)
            {
                if (aRoot === "")
                {
                    aRoot = ".";
                }
                aRoot = aRoot.replace(/\/$/, '');
                var level = 0;
                while (aPath.indexOf(aRoot + '/') !== 0)
                {
                    var index = aRoot.lastIndexOf("/");
                    if (index < 0)
                    {
                        return aPath;
                    }
                    aRoot = aRoot.slice(0, index);
                    if (aRoot.match(/^([^\/]+:\/)?\/*$/))
                    {
                        return aPath;
                    }
                    ++level;
                }
                return (Array(level + 1)).join("../") + aPath.substr(aRoot.length + 1);
            }
            exports.relative = relative;
            var supportsNullProto = (            function()
            {
                var obj = Object.create(null);
                return !('__proto__' in obj);
            })();
            function identity(s)
            {
                return s;
            }
            function toSetString(aStr)
            {
                if (isProtoString(aStr))
                {
                    return '$' + aStr;
                }
                return aStr;
            }
            exports.toSetString = supportsNullProto ? identity : toSetString;
            function fromSetString(aStr)
            {
                if (isProtoString(aStr))
                {
                    return aStr.slice(1);
                }
                return aStr;
            }
            exports.fromSetString = supportsNullProto ? identity : fromSetString;
            function isProtoString(s)
            {
                if (!s)
                {
                    return false;
                }
                var length = s.length;
                if (length < 9)
                {
                    return false;
                }
                if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95)
                {
                    return false;
                }
                for (var i = length - 10; i >= 0; i--)
                {
                    if (s.charCodeAt(i) !== 36)
                    {
                        return false;
                    }
                }
                return true;
            }
            function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal)
            {
                var cmp = mappingA.source - mappingB.source;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0 || onlyCompareOriginal)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return mappingA.name - mappingB.name;
            }
            exports.compareByOriginalPositions = compareByOriginalPositions;
            function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated)
            {
                var cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0 || onlyCompareGenerated)
                {
                    return cmp;
                }
                cmp = mappingA.source - mappingB.source;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return mappingA.name - mappingB.name;
            }
            exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
            function strcmp(aStr1, aStr2)
            {
                if (aStr1 === aStr2)
                {
                    return 0;
                }
                if (aStr1 > aStr2)
                {
                    return 1;
                }
                return -1;
            }
            function compareByGeneratedPositionsInflated(mappingA, mappingB)
            {
                var cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = strcmp(mappingA.source, mappingB.source);
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return strcmp(mappingA.name, mappingB.name);
            }
            exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            var has = Object.prototype.hasOwnProperty;
            function ArraySet()
            {
                this._array = [];
                this._set = Object.create(null);
            }
            ArraySet.fromArray =             function ArraySet_fromArray(aArray, aAllowDuplicates)
            {
                var set = new ArraySet();
                for (var i = 0, len = aArray.length; i < len; i++)
                {
                    set.add(aArray[i], aAllowDuplicates);
                }                return set;
            };
            ArraySet.prototype.size =             function ArraySet_size()
            {
                return (Object.getOwnPropertyNames(this._set)).length;
            };
            ArraySet.prototype.add =             function ArraySet_add(aStr, aAllowDuplicates)
            {
                var sStr = util.toSetString(aStr);
                var isDuplicate = has.call(this._set, sStr);
                var idx = this._array.length;
                if (!isDuplicate || aAllowDuplicates)
                {
                    this._array.push(aStr);
                }                if (!isDuplicate)
                {
                    this._set[sStr] = idx;
                }            };
            ArraySet.prototype.has =             function ArraySet_has(aStr)
            {
                var sStr = util.toSetString(aStr);
                return has.call(this._set, sStr);
            };
            ArraySet.prototype.indexOf =             function ArraySet_indexOf(aStr)
            {
                var sStr = util.toSetString(aStr);
                if (has.call(this._set, sStr))
                {
                    return this._set[sStr];
                }                throw new Error('"' + aStr + '" is not in the set.');
            };
            ArraySet.prototype.at =             function ArraySet_at(aIdx)
            {
                if (aIdx >= 0 && aIdx < this._array.length)
                {
                    return this._array[aIdx];
                }                throw new Error('No element indexed by ' + aIdx);
            };
            ArraySet.prototype.toArray =             function ArraySet_toArray()
            {
                return this._array.slice();
            };
            exports.ArraySet = ArraySet;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            function generatedPositionAfter(mappingA, mappingB)
            {
                var lineA = mappingA.generatedLine;
                var lineB = mappingB.generatedLine;
                var columnA = mappingA.generatedColumn;
                var columnB = mappingB.generatedColumn;
                return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
            }
            function MappingList()
            {
                this._array = [];
                this._sorted = true;
                this._last = {generatedLine: -1, generatedColumn: 0};
            }
            MappingList.prototype.unsortedForEach =             function MappingList_forEach(aCallback, aThisArg)
            {
                this._array.forEach(aCallback, aThisArg);
            };
            MappingList.prototype.add =             function MappingList_add(aMapping)
            {
                if (generatedPositionAfter(this._last, aMapping))
                {
                    this._last = aMapping;
                    this._array.push(aMapping);
                }                else
                {
                    this._sorted = false;
                    this._array.push(aMapping);
                }            };
            MappingList.prototype.toArray =             function MappingList_toArray()
            {
                if (!this._sorted)
                {
                    this._array.sort(util.compareByGeneratedPositionsInflated);
                    this._sorted = true;
                }                return this._array;
            };
            exports.MappingList = MappingList;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            var binarySearch = __webpack_require__(8);
            var ArraySet = (__webpack_require__(5)).ArraySet;
            var base64VLQ = __webpack_require__(2);
            var quickSort = (__webpack_require__(9)).quickSort;
            function SourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
            }
            SourceMapConsumer.fromSourceMap =             function(aSourceMap)
            {
                return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
            };
            SourceMapConsumer.prototype._version = 3;
            SourceMapConsumer.prototype.__generatedMappings = null;
            Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {get:             function()
            {
                if (!this.__generatedMappings)
                {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }                return this.__generatedMappings;
            }});
            SourceMapConsumer.prototype.__originalMappings = null;
            Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {get:             function()
            {
                if (!this.__originalMappings)
                {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }                return this.__originalMappings;
            }});
            SourceMapConsumer.prototype._charIsMappingSeparator =             function SourceMapConsumer_charIsMappingSeparator(aStr, index)
            {
                var c = aStr.charAt(index);
                return c === ";" || c === ",";
            };
            SourceMapConsumer.prototype._parseMappings =             function SourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                throw new Error("Subclasses must implement _parseMappings");
            };
            SourceMapConsumer.GENERATED_ORDER = 1;
            SourceMapConsumer.ORIGINAL_ORDER = 2;
            SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
            SourceMapConsumer.LEAST_UPPER_BOUND = 2;
            SourceMapConsumer.prototype.eachMapping =             function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder)
            {
                var context = aContext || null;
                var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
                var mappings;
                switch(order) {
                    case SourceMapConsumer.GENERATED_ORDER:
                        mappings = this._generatedMappings;
                        break;
                    case SourceMapConsumer.ORIGINAL_ORDER:
                        mappings = this._originalMappings;
                        break;
default:
                        throw new Error("Unknown order of iteration.");
                }
                var sourceRoot = this.sourceRoot;
                (mappings.map(                function(mapping)
                {
                    var source = mapping.source === null ? null : this._sources.at(mapping.source);
                    if (source != null && sourceRoot != null)
                    {
                        source = util.join(sourceRoot, source);
                    }                    return {source: source, generatedLine: mapping.generatedLine, generatedColumn: mapping.generatedColumn, originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name: mapping.name === null ? null : this._names.at(mapping.name)};
                }, this)).forEach(aCallback, context);
            };
            SourceMapConsumer.prototype.allGeneratedPositionsFor =             function SourceMapConsumer_allGeneratedPositionsFor(aArgs)
            {
                var line = util.getArg(aArgs, 'line');
                var needle = {source: util.getArg(aArgs, 'source'), originalLine: line, originalColumn: util.getArg(aArgs, 'column', 0)};
                if (this.sourceRoot != null)
                {
                    needle.source = util.relative(this.sourceRoot, needle.source);
                }                if (!this._sources.has(needle.source))
                {
                    return [];
                }                needle.source = this._sources.indexOf(needle.source);
                var mappings = [];
                var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
                if (index >= 0)
                {
                    var mapping = this._originalMappings[index];
                    if (aArgs.column === undefined)
                    {
                        var originalLine = mapping.originalLine;
                        while (mapping && mapping.originalLine === originalLine)
                        {
                            mappings.push({line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)});
                            mapping = this._originalMappings[++index];
                        }                    }                    else
                    {
                        var originalColumn = mapping.originalColumn;
                        while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn)
                        {
                            mappings.push({line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)});
                            mapping = this._originalMappings[++index];
                        }                    }                }                return mappings;
            };
            exports.SourceMapConsumer = SourceMapConsumer;
            function BasicSourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                var version = util.getArg(sourceMap, 'version');
                var sources = util.getArg(sourceMap, 'sources');
                var names = util.getArg(sourceMap, 'names', []);
                var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
                var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
                var mappings = util.getArg(sourceMap, 'mappings');
                var file = util.getArg(sourceMap, 'file', null);
                if (version != this._version)
                {
                    throw new Error('Unsupported version: ' + version);
                }
                sources = ((sources.map(String)).map(util.normalize)).map(                function(source)
                {
                    return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
                });
                this._names = ArraySet.fromArray(names.map(String), true);
                this._sources = ArraySet.fromArray(sources, true);
                this.sourceRoot = sourceRoot;
                this.sourcesContent = sourcesContent;
                this._mappings = mappings;
                this.file = file;
            }
            BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
            BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
            BasicSourceMapConsumer.fromSourceMap =             function SourceMapConsumer_fromSourceMap(aSourceMap)
            {
                var smc = Object.create(BasicSourceMapConsumer.prototype);
                var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
                var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
                smc.sourceRoot = aSourceMap._sourceRoot;
                smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
                smc.file = aSourceMap._file;
                var generatedMappings = (aSourceMap._mappings.toArray()).slice();
                var destGeneratedMappings = smc.__generatedMappings = [];
                var destOriginalMappings = smc.__originalMappings = [];
                for (var i = 0, length = generatedMappings.length; i < length; i++)
                {
                    var srcMapping = generatedMappings[i];
                    var destMapping = new Mapping();
                    destMapping.generatedLine = srcMapping.generatedLine;
                    destMapping.generatedColumn = srcMapping.generatedColumn;
                    if (srcMapping.source)
                    {
                        destMapping.source = sources.indexOf(srcMapping.source);
                        destMapping.originalLine = srcMapping.originalLine;
                        destMapping.originalColumn = srcMapping.originalColumn;
                        if (srcMapping.name)
                        {
                            destMapping.name = names.indexOf(srcMapping.name);
                        }                        destOriginalMappings.push(destMapping);
                    }                    destGeneratedMappings.push(destMapping);
                }                quickSort(smc.__originalMappings, util.compareByOriginalPositions);
                return smc;
            };
            BasicSourceMapConsumer.prototype._version = 3;
            Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {get:             function()
            {
                return (this._sources.toArray()).map(                function(s)
                {
                    return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
                }, this);
            }});
            function Mapping()
            {
                this.generatedLine = 0;
                this.generatedColumn = 0;
                this.source = null;
                this.originalLine = null;
                this.originalColumn = null;
                this.name = null;
            }
            BasicSourceMapConsumer.prototype._parseMappings =             function SourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                var generatedLine = 1;
                var previousGeneratedColumn = 0;
                var previousOriginalLine = 0;
                var previousOriginalColumn = 0;
                var previousSource = 0;
                var previousName = 0;
                var length = aStr.length;
                var index = 0;
                var cachedSegments = {};
                var temp = {};
                var originalMappings = [];
                var generatedMappings = [];
                var mapping,
                    str,
                    segment,
                    end,
                    value;
                while (index < length)
                {
                    if (aStr.charAt(index) === ';')
                    {
                        generatedLine++;
                        index++;
                        previousGeneratedColumn = 0;
                    }                    else if (aStr.charAt(index) === ',')
                    {
                        index++;
                    }                    else
                    {
                        mapping = new Mapping();
                        mapping.generatedLine = generatedLine;
                        for (end = index; end < length; end++)
                        {
                            if (this._charIsMappingSeparator(aStr, end))
                            {
                                break;
                            }                        }                        str = aStr.slice(index, end);
                        segment = cachedSegments[str];
                        if (segment)
                        {
                            index += str.length;
                        }                        else
                        {
                            segment = [];
                            while (index < end)
                            {
                                base64VLQ.decode(aStr, index, temp);
                                value = temp.value;
                                index = temp.rest;
                                segment.push(value);
                            }                            if (segment.length === 2)
                            {
                                throw new Error('Found a source, but no line and column');
                            }                            if (segment.length === 3)
                            {
                                throw new Error('Found a source and line, but no column');
                            }                            cachedSegments[str] = segment;
                        }                        mapping.generatedColumn = previousGeneratedColumn + segment[0];
                        previousGeneratedColumn = mapping.generatedColumn;
                        if (segment.length > 1)
                        {
                            mapping.source = previousSource + segment[1];
                            previousSource += segment[1];
                            mapping.originalLine = previousOriginalLine + segment[2];
                            previousOriginalLine = mapping.originalLine;
                            mapping.originalLine += 1;
                            mapping.originalColumn = previousOriginalColumn + segment[3];
                            previousOriginalColumn = mapping.originalColumn;
                            if (segment.length > 4)
                            {
                                mapping.name = previousName + segment[4];
                                previousName += segment[4];
                            }                        }                        generatedMappings.push(mapping);
                        if (typeof mapping.originalLine === 'number')
                        {
                            originalMappings.push(mapping);
                        }                    }                }                quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
                this.__generatedMappings = generatedMappings;
                quickSort(originalMappings, util.compareByOriginalPositions);
                this.__originalMappings = originalMappings;
            };
            BasicSourceMapConsumer.prototype._findMapping =             function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias)
            {
                if (aNeedle[aLineName] <= 0)
                {
                    throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
                }                if (aNeedle[aColumnName] < 0)
                {
                    throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
                }                return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
            };
            BasicSourceMapConsumer.prototype.computeColumnSpans =             function SourceMapConsumer_computeColumnSpans()
            {
                for (var index = 0; index < this._generatedMappings.length; ++index)
                {
                    var mapping = this._generatedMappings[index];
                    if (index + 1 < this._generatedMappings.length)
                    {
                        var nextMapping = this._generatedMappings[index + 1];
                        if (mapping.generatedLine === nextMapping.generatedLine)
                        {
                            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
                            continue;
                        }                    }                    mapping.lastGeneratedColumn = Infinity;
                }            };
            BasicSourceMapConsumer.prototype.originalPositionFor =             function SourceMapConsumer_originalPositionFor(aArgs)
            {
                var needle = {generatedLine: util.getArg(aArgs, 'line'), generatedColumn: util.getArg(aArgs, 'column')};
                var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
                if (index >= 0)
                {
                    var mapping = this._generatedMappings[index];
                    if (mapping.generatedLine === needle.generatedLine)
                    {
                        var source = util.getArg(mapping, 'source', null);
                        if (source !== null)
                        {
                            source = this._sources.at(source);
                            if (this.sourceRoot != null)
                            {
                                source = util.join(this.sourceRoot, source);
                            }                        }                        var name = util.getArg(mapping, 'name', null);
                        if (name !== null)
                        {
                            name = this._names.at(name);
                        }                        return {source: source, line: util.getArg(mapping, 'originalLine', null), column: util.getArg(mapping, 'originalColumn', null), name: name};
                    }                }                return {source: null, line: null, column: null, name: null};
            };
            BasicSourceMapConsumer.prototype.hasContentsOfAllSources =             function BasicSourceMapConsumer_hasContentsOfAllSources()
            {
                if (!this.sourcesContent)
                {
                    return false;
                }                return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(                function(sc)
                {
                    return sc == null;
                });
            };
            BasicSourceMapConsumer.prototype.sourceContentFor =             function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing)
            {
                if (!this.sourcesContent)
                {
                    return null;
                }                if (this.sourceRoot != null)
                {
                    aSource = util.relative(this.sourceRoot, aSource);
                }                if (this._sources.has(aSource))
                {
                    return this.sourcesContent[this._sources.indexOf(aSource)];
                }                var url;
                if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot)))
                {
                    var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
                    if (url.scheme == "file" && this._sources.has(fileUriAbsPath))
                    {
                        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
                    }                    if ((!url.path || url.path == "/") && this._sources.has("/" + aSource))
                    {
                        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
                    }                }                if (nullOnMissing)
                {
                    return null;
                }                else
                {
                    throw new Error('"' + aSource + '" is not in the SourceMap.');
                }            };
            BasicSourceMapConsumer.prototype.generatedPositionFor =             function SourceMapConsumer_generatedPositionFor(aArgs)
            {
                var source = util.getArg(aArgs, 'source');
                if (this.sourceRoot != null)
                {
                    source = util.relative(this.sourceRoot, source);
                }                if (!this._sources.has(source))
                {
                    return {line: null, column: null, lastColumn: null};
                }                source = this._sources.indexOf(source);
                var needle = {source: source, originalLine: util.getArg(aArgs, 'line'), originalColumn: util.getArg(aArgs, 'column')};
                var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
                if (index >= 0)
                {
                    var mapping = this._originalMappings[index];
                    if (mapping.source === needle.source)
                    {
                        return {line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)};
                    }                }                return {line: null, column: null, lastColumn: null};
            };
            exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
            function IndexedSourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                var version = util.getArg(sourceMap, 'version');
                var sections = util.getArg(sourceMap, 'sections');
                if (version != this._version)
                {
                    throw new Error('Unsupported version: ' + version);
                }
                this._sources = new ArraySet();
                this._names = new ArraySet();
                var lastOffset = {line: -1, column: 0};
                this._sections = sections.map(                function(s)
                {
                    if (s.url)
                    {
                        throw new Error('Support for url field in sections not implemented.');
                    }                    var offset = util.getArg(s, 'offset');
                    var offsetLine = util.getArg(offset, 'line');
                    var offsetColumn = util.getArg(offset, 'column');
                    if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
                    {
                        throw new Error('Section offsets must be ordered and non-overlapping.');
                    }                    lastOffset = offset;
                    return {generatedOffset: {generatedLine: offsetLine + 1, generatedColumn: offsetColumn + 1}, consumer: new SourceMapConsumer(util.getArg(s, 'map'))};
                });
            }
            IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
            IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
            IndexedSourceMapConsumer.prototype._version = 3;
            Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {get:             function()
            {
                var sources = [];
                for (var i = 0; i < this._sections.length; i++)
                {
                    for (var j = 0; j < this._sections[i].consumer.sources.length; j++)
                    {
                        sources.push(this._sections[i].consumer.sources[j]);
                    }                }                return sources;
            }});
            IndexedSourceMapConsumer.prototype.originalPositionFor =             function IndexedSourceMapConsumer_originalPositionFor(aArgs)
            {
                var needle = {generatedLine: util.getArg(aArgs, 'line'), generatedColumn: util.getArg(aArgs, 'column')};
                var sectionIndex = binarySearch.search(needle, this._sections,                 function(needle, section)
                {
                    var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
                    if (cmp)
                    {
                        return cmp;
                    }                    return needle.generatedColumn - section.generatedOffset.generatedColumn;
                });
                var section = this._sections[sectionIndex];
                if (!section)
                {
                    return {source: null, line: null, column: null, name: null};
                }                return section.consumer.originalPositionFor({line: needle.generatedLine - (section.generatedOffset.generatedLine - 1), column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), bias: aArgs.bias});
            };
            IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =             function IndexedSourceMapConsumer_hasContentsOfAllSources()
            {
                return this._sections.every(                function(s)
                {
                    return s.consumer.hasContentsOfAllSources();
                });
            };
            IndexedSourceMapConsumer.prototype.sourceContentFor =             function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing)
            {
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    var content = section.consumer.sourceContentFor(aSource, true);
                    if (content)
                    {
                        return content;
                    }                }                if (nullOnMissing)
                {
                    return null;
                }                else
                {
                    throw new Error('"' + aSource + '" is not in the SourceMap.');
                }            };
            IndexedSourceMapConsumer.prototype.generatedPositionFor =             function IndexedSourceMapConsumer_generatedPositionFor(aArgs)
            {
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1)
                    {
                        continue;
                    }                    var generatedPosition = section.consumer.generatedPositionFor(aArgs);
                    if (generatedPosition)
                    {
                        var ret = {line: generatedPosition.line + (section.generatedOffset.generatedLine - 1), column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)};
                        return ret;
                    }                }                return {line: null, column: null};
            };
            IndexedSourceMapConsumer.prototype._parseMappings =             function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                this.__generatedMappings = [];
                this.__originalMappings = [];
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    var sectionMappings = section.consumer._generatedMappings;
                    for (var j = 0; j < sectionMappings.length; j++)
                    {
                        var mapping = sectionMappings[j];
                        var source = section.consumer._sources.at(mapping.source);
                        if (section.consumer.sourceRoot !== null)
                        {
                            source = util.join(section.consumer.sourceRoot, source);
                        }                        this._sources.add(source);
                        source = this._sources.indexOf(source);
                        var name = section.consumer._names.at(mapping.name);
                        this._names.add(name);
                        name = this._names.indexOf(name);
                        var adjustedMapping = {source: source, generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1), generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name: name};
                        this.__generatedMappings.push(adjustedMapping);
                        if (typeof adjustedMapping.originalLine === 'number')
                        {
                            this.__originalMappings.push(adjustedMapping);
                        }                    }                }                quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
                quickSort(this.__originalMappings, util.compareByOriginalPositions);
            };
            exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
        },         function(module, exports)
        {
            exports.GREATEST_LOWER_BOUND = 1;
            exports.LEAST_UPPER_BOUND = 2;
            function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias)
            {
                var mid = Math.floor((aHigh - aLow) / 2) + aLow;
                var cmp = aCompare(aNeedle, aHaystack[mid], true);
                if (cmp === 0)
                {
                    return mid;
                }
                else if (cmp > 0)
                {
                    if (aHigh - mid > 1)
                    {
                        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
                    }
                    if (aBias == exports.LEAST_UPPER_BOUND)
                    {
                        return aHigh < aHaystack.length ? aHigh : -1;
                    }
                    else
                    {
                        return mid;
                    }
                }
                else
                {
                    if (mid - aLow > 1)
                    {
                        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
                    }
                    if (aBias == exports.LEAST_UPPER_BOUND)
                    {
                        return mid;
                    }
                    else
                    {
                        return aLow < 0 ? -1 : aLow;
                    }
                }
            }
            exports.search =             function search(aNeedle, aHaystack, aCompare, aBias)
            {
                if (aHaystack.length === 0)
                {
                    return -1;
                }                var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
                if (index < 0)
                {
                    return -1;
                }                while (index - 1 >= 0)
                {
                    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0)
                    {
                        break;
                    }                    --index;
                }                return index;
            };
        },         function(module, exports)
        {
            function swap(ary, x, y)
            {
                var temp = ary[x];
                ary[x] = ary[y];
                ary[y] = temp;
            }
            function randomIntInRange(low, high)
            {
                return Math.round(low + Math.random() * (high - low));
            }
            function doQuickSort(ary, comparator, p, r)
            {
                if (p < r)
                {
                    var pivotIndex = randomIntInRange(p, r);
                    var i = p - 1;
                    swap(ary, pivotIndex, r);
                    var pivot = ary[r];
                    for (var j = p; j < r; j++)
                    {
                        if (comparator(ary[j], pivot) <= 0)
                        {
                            i += 1;
                            swap(ary, i, j);
                        }
                    }
                    swap(ary, i + 1, j);
                    var q = i + 1;
                    doQuickSort(ary, comparator, p, q - 1);
                    doQuickSort(ary, comparator, q + 1, r);
                }
            }
            exports.quickSort =             function(ary, comparator)
            {
                doQuickSort(ary, comparator, 0, ary.length - 1);
            };
        },         function(module, exports, __webpack_require__)
        {
            var SourceMapGenerator = (__webpack_require__(1)).SourceMapGenerator;
            var util = __webpack_require__(4);
            var REGEX_NEWLINE = /(\r?\n)/;
            var NEWLINE_CODE = 10;
            var isSourceNode = "$$$isSourceNode$$$";
            function SourceNode(aLine, aColumn, aSource, aChunks, aName)
            {
                this.children = [];
                this.sourceContents = {};
                this.line = aLine == null ? null : aLine;
                this.column = aColumn == null ? null : aColumn;
                this.source = aSource == null ? null : aSource;
                this.name = aName == null ? null : aName;
                this[isSourceNode] = true;
                if (aChunks != null)
                    this.add(aChunks);
            }
            SourceNode.fromStringWithSourceMap =             function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath)
            {
                var node = new SourceNode();
                var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
                var shiftNextLine =                 function()
                {
                    var lineContents = remainingLines.shift();
                    var newLine = remainingLines.shift() || "";
                    return lineContents + newLine;
                };
                var lastGeneratedLine = 1,
                    lastGeneratedColumn = 0;
                var lastMapping = null;
                aSourceMapConsumer.eachMapping(                function(mapping)
                {
                    if (lastMapping !== null)
                    {
                        if (lastGeneratedLine < mapping.generatedLine)
                        {
                            addMappingWithCode(lastMapping, shiftNextLine());
                            lastGeneratedLine++;
                            lastGeneratedColumn = 0;
                        }                        else
                        {
                            var nextLine = remainingLines[0];
                            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                            remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                            lastGeneratedColumn = mapping.generatedColumn;
                            addMappingWithCode(lastMapping, code);
                            lastMapping = mapping;
                            return;
                        }                    }                    while (lastGeneratedLine < mapping.generatedLine)
                    {
                        node.add(shiftNextLine());
                        lastGeneratedLine++;
                    }                    if (lastGeneratedColumn < mapping.generatedColumn)
                    {
                        var nextLine = remainingLines[0];
                        node.add(nextLine.substr(0, mapping.generatedColumn));
                        remainingLines[0] = nextLine.substr(mapping.generatedColumn);
                        lastGeneratedColumn = mapping.generatedColumn;
                    }                    lastMapping = mapping;
                }, this);
                if (remainingLines.length > 0)
                {
                    if (lastMapping)
                    {
                        addMappingWithCode(lastMapping, shiftNextLine());
                    }                    node.add(remainingLines.join(""));
                }                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        if (aRelativePath != null)
                        {
                            sourceFile = util.join(aRelativePath, sourceFile);
                        }                        node.setSourceContent(sourceFile, content);
                    }                });
                return node;
                function addMappingWithCode(mapping, code)
                {
                    if (mapping === null || mapping.source === undefined)
                    {
                        node.add(code);
                    }
                    else
                    {
                        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
                        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
                    }
                }
            };
            SourceNode.prototype.add =             function SourceNode_add(aChunk)
            {
                if (Array.isArray(aChunk))
                {
                    aChunk.forEach(                    function(chunk)
                    {
                        this.add(chunk);
                    }, this);
                }                else if (aChunk[isSourceNode] || typeof aChunk === "string")
                {
                    if (aChunk)
                    {
                        this.children.push(aChunk);
                    }                }                else
                {
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                }                return this;
            };
            SourceNode.prototype.prepend =             function SourceNode_prepend(aChunk)
            {
                if (Array.isArray(aChunk))
                {
                    for (var i = aChunk.length - 1; i >= 0; i--)
                    {
                        this.prepend(aChunk[i]);
                    }                }                else if (aChunk[isSourceNode] || typeof aChunk === "string")
                {
                    this.children.unshift(aChunk);
                }                else
                {
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                }                return this;
            };
            SourceNode.prototype.walk =             function SourceNode_walk(aFn)
            {
                var chunk;
                for (var i = 0, len = this.children.length; i < len; i++)
                {
                    chunk = this.children[i];
                    if (chunk[isSourceNode])
                    {
                        chunk.walk(aFn);
                    }                    else
                    {
                        if (chunk !== '')
                        {
                            aFn(chunk, {source: this.source, line: this.line, column: this.column, name: this.name});
                        }                    }                }            };
            SourceNode.prototype.join =             function SourceNode_join(aSep)
            {
                var newChildren;
                var i;
                var len = this.children.length;
                if (len > 0)
                {
                    newChildren = [];
                    for (i = 0; i < len - 1; i++)
                    {
                        newChildren.push(this.children[i]);
                        newChildren.push(aSep);
                    }                    newChildren.push(this.children[i]);
                    this.children = newChildren;
                }                return this;
            };
            SourceNode.prototype.replaceRight =             function SourceNode_replaceRight(aPattern, aReplacement)
            {
                var lastChild = this.children[this.children.length - 1];
                if (lastChild[isSourceNode])
                {
                    lastChild.replaceRight(aPattern, aReplacement);
                }                else if (typeof lastChild === 'string')
                {
                    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
                }                else
                {
                    this.children.push(''.replace(aPattern, aReplacement));
                }                return this;
            };
            SourceNode.prototype.setSourceContent =             function SourceNode_setSourceContent(aSourceFile, aSourceContent)
            {
                this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
            };
            SourceNode.prototype.walkSourceContents =             function SourceNode_walkSourceContents(aFn)
            {
                for (var i = 0, len = this.children.length; i < len; i++)
                {
                    if (this.children[i][isSourceNode])
                    {
                        this.children[i].walkSourceContents(aFn);
                    }                }                var sources = Object.keys(this.sourceContents);
                for (var i = 0, len = sources.length; i < len; i++)
                {
                    aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
                }            };
            SourceNode.prototype.toString =             function SourceNode_toString()
            {
                var str = "";
                this.walk(                function(chunk)
                {
                    str += chunk;
                });
                return str;
            };
            SourceNode.prototype.toStringWithSourceMap =             function SourceNode_toStringWithSourceMap(aArgs)
            {
                var generated = {code: "", line: 1, column: 0};
                var map = new SourceMapGenerator(aArgs);
                var sourceMappingActive = false;
                var lastOriginalSource = null;
                var lastOriginalLine = null;
                var lastOriginalColumn = null;
                var lastOriginalName = null;
                this.walk(                function(chunk, original)
                {
                    generated.code += chunk;
                    if (original.source !== null && original.line !== null && original.column !== null)
                    {
                        if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name)
                        {
                            map.addMapping({source: original.source, original: {line: original.line, column: original.column}, generated: {line: generated.line, column: generated.column}, name: original.name});
                        }                        lastOriginalSource = original.source;
                        lastOriginalLine = original.line;
                        lastOriginalColumn = original.column;
                        lastOriginalName = original.name;
                        sourceMappingActive = true;
                    }                    else if (sourceMappingActive)
                    {
                        map.addMapping({generated: {line: generated.line, column: generated.column}});
                        lastOriginalSource = null;
                        sourceMappingActive = false;
                    }                    for (var idx = 0, length = chunk.length; idx < length; idx++)
                    {
                        if (chunk.charCodeAt(idx) === NEWLINE_CODE)
                        {
                            generated.line++;
                            generated.column = 0;
                            if (idx + 1 === length)
                            {
                                lastOriginalSource = null;
                                sourceMappingActive = false;
                            }                            else if (sourceMappingActive)
                            {
                                map.addMapping({source: original.source, original: {line: original.line, column: original.column}, generated: {line: generated.line, column: generated.column}, name: original.name});
                            }                        }                        else
                        {
                            generated.column++;
                        }                    }                });
                this.walkSourceContents(                function(sourceFile, sourceContent)
                {
                    map.setSourceContent(sourceFile, sourceContent);
                });
                return {code: generated.code, map: map};
            };
            exports.SourceNode = SourceNode;
        }]);
    });
    (    function(exports, walk)
    {
        "use strict";
        exports.version = "0.3.3-objj-3";
        var options,
            input,
            inputLen,
            sourceFile;
        exports.parse =         function(inpt, opts)
        {
            input = String(inpt);
            inputLen = input.length;
            setOptions(opts);
            initPreprocessorState();
            if (options.macros)
                defineMacros(options.macros);
            initTokenState();
            return parseTopLevel(options.program);
        };
        var defaultOptions = exports.defaultOptions = {ecmaVersion: 5, strictSemicolons: false, allowTrailingCommas: true, forbidReserved: false, trackComments: false, trackCommentsIncludeLineBreak: false, trackSpaces: false, locations: false, onComment: null, ranges: false, program: null, sourceFile: null, objj: true, preprocess: true, preprocessGetIncludeFile: defaultGetIncludeFile, preprocessAddMacro: defaultAddMacro, preprocessGetMacro: defaultGetMacro, preprocessUndefineMacro: defaultUndefineMacro, preprocessIsMacro: defaultIsMacro, macros: null, lineNoInErrorMessage: true, preIncludeFiles: null};
        function setOptions(opts)
        {
            options = opts || {};
            for (var opt in defaultOptions)
                if (!Object.prototype.hasOwnProperty.call(options, opt))
                    options[opt] = defaultOptions[opt];
            sourceFile = options.sourceFile || null;
        }
        var macros;
        var macrosIsPredicate;
        var macrosMakeBuiltin =         function(name, macro, endPos)
        {
            return new Macro(name, macro, null, endPos - name.length);
        };
        var macrosBuiltinMacros = {1:         function()
        {
            return macrosMakeBuiltin("__OBJJ__", options.objj ? "1" : null, tokPos);
        }};
        macrosBuiltinMacros["__" + "BROWSER" + "__"] =         function()
        {
            return macrosMakeBuiltin("__BROWSER__", typeof window !== "undefined" ? "1" : null, tokPos);
        };
        macrosBuiltinMacros["__" + "LINE" + "__"] =         function()
        {
            return macrosMakeBuiltin("__LINE__", String(options.locations ? tokCurLine : (getLineInfo(input, tokPos)).line), tokPos);
        };
        macrosBuiltinMacros["__" + "DATE" + "__"] =         function()
        {
            var date,
                day;
            return macrosMakeBuiltin("__DATE__", (date = new Date(), day = String(date.getDate()), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] + (day.length > 1 ? " " : "  ") + day + " " + date.getFullYear()), tokPos);
        };
        macrosBuiltinMacros["__" + "TIME" + "__"] =         function()
        {
            var date;
            return macrosMakeBuiltin("__TIME__", (date = new Date(), ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2)), tokPos);
        };
        function defaultGetIncludeFile(filename)
        {
            return {include: "#define FOO(x) x\n", sourceFile: filename};
        }
        function defaultAddMacro(macro)
        {
            macros[macro.identifier] = macro;
            macrosIsPredicate = null;
        }
        function defaultGetMacro(macroIdentifier)
        {
            return macros[macroIdentifier];
        }
        function defaultUndefineMacro(macroIdentifier)
        {
            delete macros[macroIdentifier];
            macrosIsPredicate = null;
        }
        function defaultIsMacro(macroIdentifier)
        {
            return (macrosIsPredicate || (macrosIsPredicate = makePredicate(((Object.keys(macros)).concat((Object.keys(macrosBuiltinMacros)).filter(            function(key)
            {
                return (this[key]()).macro != null;
            }, macrosBuiltinMacros))).join(" "))))(macroIdentifier);
        }
        function preprocessBuiltinMacro(macroIdentifier)
        {
            var builtinMacro = macrosBuiltinMacros[macroIdentifier];
            return builtinMacro ? builtinMacro() : null;
        }
        function defineMacros(macroArray)
        {
            for (var i = 0, size = macroArray.length; i < size; i++)
            {
                var savedInput = input;
                var macroDefinition = macroArray[i].trim();
                var pos = macroDefinition.indexOf("=");
                if (pos === 0)
                    raise(0, "Invalid macro definition: '" + macroDefinition + "'");
                var name,
                    body;
                if (pos > 0)
                {
                    name = macroDefinition.slice(0, pos);
                    body = macroDefinition.slice(pos + 1);
                }
                else
                {
                    name = macroDefinition;
                }
                if (macrosBuiltinMacros.hasOwnProperty(name))
                    raise(0, "'" + name + "' is a predefined macro name");
                input = name + (body != null ? " " + body : "");
                inputLen = input.length;
                initTokenState();
                preprocessParseDefine();
                input = savedInput;
                inputLen = input.length;
            }
        }
        var getLineInfo = exports.getLineInfo =         function(input, offset)
        {
            for (var line = 1, cur = 0; ; )
            {
                lineBreak.lastIndex = cur;
                var match = lineBreak.exec(input);
                if (match && match.index < offset)
                {
                    ++line;
                    cur = match.index + match[0].length;
                }                else
                    break;
            }            return {line: line, column: offset - cur, lineStart: cur, lineEnd: match ? match.index + match[0].length : input.length};
        };
        exports.tokenize =         function(inpt, opts)
        {
            input = String(inpt);
            inputLen = input.length;
            setOptions(opts);
            initTokenState();
            initPreprocessorState();
            var t = {};
            function getToken(forceRegexp)
            {
                readToken(forceRegexp);
                t.start = tokStart;
                t.end = tokEnd;
                t.startLoc = tokStartLoc;
                t.endLoc = tokEndLoc;
                t.type = tokType;
                t.value = tokVal;
                return t;
            }
            getToken.jumpTo =             function(pos, reAllowed)
            {
                tokPos = pos;
                if (options.locations)
                {
                    tokCurLine = 1;
                    tokLineStart = lineBreak.lastIndex = 0;
                    var match;
                    while ((match = lineBreak.exec(input)) && match.index < pos)
                    {
                        ++tokCurLine;
                        tokLineStart = match.index + match[0].length;
                    }                }                tokRegexpAllowed = reAllowed;
                skipSpace();
            };
            return getToken;
        };
        var tokPos;
        var tokFirstStart,
            firstTokEnd,
            tokStart,
            tokEnd,
            tokMacroOffset,
            tokPosMacroOffset,
            lastTokMacroOffset;
        var localLastEnd;
        var firstEndOfFile,
            lastEndOfFile;
        var tokStartLoc,
            tokEndLoc;
        var tokType,
            tokVal;
        var tokCommentsBefore,
            tokCommentsAfter,
            lastTokCommentsAfter;
        var tokSpacesBefore,
            tokSpacesAfter,
            lastTokSpacesAfter;
        var tokRegexpAllowed,
            tokComments,
            tokSpaces;
        var tokCurLine,
            tokLineStart;
        var tokInput,
            preTokInput,
            lastEndInput;
        var lastStart,
            lastEnd,
            lastEndLoc;
        var nodeMessageSendObjectExpression;
        var inFunction,
            labels,
            strict;
        var preTokPos,
            preTokType,
            preTokVal,
            preTokStart,
            preTokEnd;
        var preLastStart,
            preLastEnd;
        var preprocessStack;
        var preprocessStackLastItem;
        var preprocessOnlyTransformArgumentsForLastToken;
        var preprocessMacroParameterListMode;
        var preprocessIsParsingPreprocess;
        var preprocessParameterScope;
        var preTokParameterScope;
        var preprocessOverrideTokEndLoc;
        var preprocessDontConcatenate;
        var preConcatenating;
        var preNotSkipping;
        var preIfLevel;
        function raise(pos, message)
        {
            if (typeof pos == "number")
                pos = getLineInfo(input, pos);
            if (options.lineNoInErrorMessage)
                message += " (" + pos.line + ":" + pos.column + ")";
            var syntaxError = new SyntaxError(message);
            syntaxError.messageOnLine = pos.line;
            syntaxError.messageOnColumn = pos.column;
            syntaxError.lineStart = pos.lineStart;
            syntaxError.lineEnd = pos.lineEnd;
            syntaxError.fileName = sourceFile;
            throw syntaxError;
        }
        var empty = [];
        var _num = {type: "num"},
            _regexp = {type: "regexp"},
            _string = {type: "string"};
        var _name = {type: "name"},
            _eof = {type: "eof"},
            _eol = {type: "eol"};
        var _break = {keyword: "break"},
            _case = {keyword: "case", beforeExpr: true},
            _catch = {keyword: "catch"};
        var _continue = {keyword: "continue"},
            _debugger = {keyword: "debugger"},
            _default = {keyword: "default"};
        var _do = {keyword: "do", isLoop: true},
            _else = {keyword: "else", beforeExpr: true};
        var _finally = {keyword: "finally"},
            _for = {keyword: "for", isLoop: true},
            _function = {keyword: "function"};
        var _if = {keyword: "if"},
            _return = {keyword: "return", beforeExpr: true},
            _switch = {keyword: "switch"};
        var _throw = {keyword: "throw", beforeExpr: true},
            _try = {keyword: "try"},
            _var = {keyword: "var"};
        var _while = {keyword: "while", isLoop: true},
            _with = {keyword: "with"},
            _new = {keyword: "new", beforeExpr: true};
        var _this = {keyword: "this"};
        var _void = {keyword: "void", prefix: true, beforeExpr: true};
        var _null = {keyword: "null", atomValue: null},
            _true = {keyword: "true", atomValue: true};
        var _false = {keyword: "false", atomValue: false};
        var _in = {keyword: "in", binop: 7, beforeExpr: true};
        var _implementation = {keyword: "implementation"},
            _outlet = {keyword: "outlet"},
            _accessors = {keyword: "accessors"};
        var _end = {keyword: "end"},
            _import = {keyword: "import"};
        var _action = {keyword: "action"},
            _selector = {keyword: "selector"},
            _class = {keyword: "class"},
            _global = {keyword: "global"};
        var _dictionaryLiteral = {keyword: "{"},
            _arrayLiteral = {keyword: "["};
        var _ref = {keyword: "ref"},
            _deref = {keyword: "deref"};
        var _protocol = {keyword: "protocol"},
            _optional = {keyword: "optional"},
            _required = {keyword: "required"};
        var _interface = {keyword: "interface"};
        var _typedef = {keyword: "typedef"};
        var _filename = {keyword: "filename"},
            _unsigned = {keyword: "unsigned", okAsIdent: true},
            _signed = {keyword: "signed", okAsIdent: true};
        var _byte = {keyword: "byte", okAsIdent: true},
            _char = {keyword: "char", okAsIdent: true},
            _short = {keyword: "short", okAsIdent: true};
        var _int = {keyword: "int", okAsIdent: true},
            _long = {keyword: "long", okAsIdent: true},
            _id = {keyword: "id", okAsIdent: true};
        var _boolean = {keyword: "BOOL", okAsIdent: true},
            _SEL = {keyword: "SEL", okAsIdent: true},
            _float = {keyword: "float", okAsIdent: true};
        var _double = {keyword: "double", okAsIdent: true};
        var _preprocess = {keyword: "#"};
        var _preDefine = {keyword: "define"};
        var _preUndef = {keyword: "undef"};
        var _preIfdef = {keyword: "ifdef"};
        var _preIfndef = {keyword: "ifndef"};
        var _preIf = {keyword: "if"};
        var _preElse = {keyword: "else"};
        var _preEndif = {keyword: "endif"};
        var _preElseIf = {keyword: "elif"};
        var _preElseIfTrue = {keyword: "elif (True)"};
        var _preElseIfFalse = {keyword: "elif (false)"};
        var _prePragma = {keyword: "pragma"};
        var _preDefined = {keyword: "defined"};
        var _preBackslash = {keyword: "\\"};
        var _preError = {keyword: "error"};
        var _preWarning = {keyword: "warning"};
        var _preprocessParamItem = {type: "preprocessParamItem"};
        var _preprocessSkipLine = {type: "skipLine"};
        var _preInclude = {keyword: "include"};
        var keywordTypes = {"break": _break, "case": _case, "catch": _catch, "continue": _continue, "debugger": _debugger, "default": _default, "do": _do, "else": _else, "finally": _finally, "for": _for, "function": _function, "if": _if, "return": _return, "switch": _switch, "throw": _throw, "try": _try, "var": _var, "while": _while, "with": _with, "null": _null, "true": _true, "false": _false, "new": _new, "in": _in, "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: true}, "this": _this, "typeof": {keyword: "typeof", prefix: true, beforeExpr: true}, "void": _void, "delete": {keyword: "delete", prefix: true, beforeExpr: true}};
        var keywordTypesObjJ = {"IBAction": _action, "IBOutlet": _outlet, "unsigned": _unsigned, "signed": _signed, "byte": _byte, "char": _char, "short": _short, "int": _int, "long": _long, "id": _id, "float": _float, "BOOL": _boolean, "SEL": _SEL, "double": _double};
        var objJAtKeywordTypes = {"implementation": _implementation, "outlet": _outlet, "accessors": _accessors, "end": _end, "import": _import, "action": _action, "selector": _selector, "class": _class, "global": _global, "ref": _ref, "deref": _deref, "protocol": _protocol, "optional": _optional, "required": _required, "interface": _interface, "typedef": _typedef};
        var keywordTypesPreprocessor = {"define": _preDefine, "pragma": _prePragma, "ifdef": _preIfdef, "ifndef": _preIfndef, "undef": _preUndef, "if": _preIf, "endif": _preEndif, "else": _preElse, "elif": _preElseIf, "defined": _preDefined, "warning": _preWarning, "error": _preError, "include": _preInclude};
        var _bracketL = {type: "[", beforeExpr: true},
            _bracketR = {type: "]"},
            _braceL = {type: "{", beforeExpr: true};
        var _braceR = {type: "}"},
            _parenL = {type: "(", beforeExpr: true},
            _parenR = {type: ")"};
        var _comma = {type: ",", beforeExpr: true},
            _semi = {type: ";", beforeExpr: true};
        var _colon = {type: ":", beforeExpr: true},
            _dot = {type: "."},
            _question = {type: "?", beforeExpr: true};
        var _at = {type: "@"},
            _dotdotdot = {type: "..."},
            _numberSign = {type: "#"};
        var _slash = {binop: 10, beforeExpr: true, preprocess: true},
            _eq = {isAssign: true, beforeExpr: true, preprocess: true};
        var _assign = {isAssign: true, beforeExpr: true},
            _plusmin = {binop: 9, prefix: true, beforeExpr: true, preprocess: true};
        var _incdec = {postfix: true, prefix: true, isUpdate: true},
            _prefix = {prefix: true, beforeExpr: true, preprocess: true};
        var _bin1 = {binop: 1, beforeExpr: true, preprocess: true},
            _bin2 = {binop: 2, beforeExpr: true, preprocess: true};
        var _bin3 = {binop: 3, beforeExpr: true, preprocess: true},
            _bin4 = {binop: 4, beforeExpr: true, preprocess: true};
        var _bin5 = {binop: 5, beforeExpr: true, preprocess: true},
            _bin6 = {binop: 6, beforeExpr: true, preprocess: true};
        var _bin7 = {binop: 7, beforeExpr: true, preprocess: true},
            _bin8 = {binop: 8, beforeExpr: true, preprocess: true};
        var _bin10 = {binop: 10, beforeExpr: true, preprocess: true};
        exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR, parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon, dot: _dot, question: _question, slash: _slash, eq: _eq, name: _name, eof: _eof, num: _num, regexp: _regexp, string: _string};
        for (var kw in keywordTypes)
            exports.tokTypes["_" + kw] = keywordTypes[kw];
        function makePredicate(words)
        {
            words = words.split(" ");
            var f = "",
                cats = [];
            out:             for (var i = 0; i < words.length; ++i)
            {
                for (var j = 0; j < cats.length; ++j)
                    if (cats[j][0].length == words[i].length)
                    {
                        cats[j].push(words[i]);
                        continue out;
                    }
                cats.push([words[i]]);
            }
            function compareTo(arr)
            {
                if (arr.length == 1)
                    return f += "return str === " + JSON.stringify(arr[0]) + ";";
                f += "switch(str){";
                for (var i = 0; i < arr.length; ++i)
                    f += "case " + JSON.stringify(arr[i]) + ":";
                f += "return true}return false;";
            }
            if (cats.length > 3)
            {
                cats.sort(                function(a, b)
                {
                    return b.length - a.length;
                });
                f += "switch(str.length){";
                for (var i = 0; i < cats.length; ++i)
                {
                    var cat = cats[i];
                    f += "case " + cat[0].length + ":";
                    compareTo(cat);
                }
                f += "}";
            }
            else
            {
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
        var isKeywordObjJ = makePredicate("IBAction IBOutlet byte char short int long float unsigned signed id BOOL SEL double");
        var isKeywordPreprocessor = makePredicate("define undef pragma if ifdef ifndef else elif endif defined error warning include");
        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
        var nonASCIIwhitespaceNoNewLine = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
        var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
        var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
        var newline = /[\n\r\u2028\u2029]/;
        var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
        var isIdentifierStart = exports.isIdentifierStart =         function(code)
        {
            if (code < 65)
                return code === 36;
            if (code < 91)
                return true;
            if (code < 97)
                return code === 95;
            if (code < 123)
                return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };
        var isIdentifierChar = exports.isIdentifierChar =         function(code)
        {
            if (code < 48)
                return code === 36;
            if (code < 58)
                return true;
            if (code < 65)
                return false;
            if (code < 91)
                return true;
            if (code < 97)
                return code === 95;
            if (code < 123)
                return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };
        function line_loc_t()
        {
            this.line = tokCurLine;
            this.column = tokPos - tokLineStart;
            if (preprocessStackLastItem)
            {
                var macro = preprocessStackLastItem.macro;
                var locationOffset = macro.locationOffset;
                if (locationOffset)
                {
                    var macroCurrentLine = locationOffset.line;
                    if (macroCurrentLine)
                        this.line += macroCurrentLine;
                    var macroCurrentLineStart = locationOffset.column;
                    if (macroCurrentLineStart)
                        this.column += tokPosMacroOffset - (tokCurLine === 1 ? macroCurrentLineStart : 0);
                }
            }
        }
        function PositionOffset(line, column)
        {
            this.line = line - 1;
            this.column = column;
            if (preprocessStackLastItem)
            {
                var macro = preprocessStackLastItem.macro;
                var locationOffset = macro.locationOffset;
                if (locationOffset)
                {
                    var macroCurrentLine = locationOffset.line;
                    if (macroCurrentLine)
                        this.line += macroCurrentLine;
                    var macroCurrentLineStart = locationOffset.column;
                    if (macroCurrentLineStart)
                        this.column += macroCurrentLineStart;
                }
            }
        }
        function initTokenState()
        {
            tokCurLine = 1;
            tokPos = tokLineStart = lastTokMacroOffset = tokMacroOffset = tokPosMacroOffset = 0;
            tokRegexpAllowed = true;
            tokComments = null;
            tokSpaces = null;
            skipSpace();
        }
        function initPreprocessorState()
        {
            macros = Object.create(null);
            macrosIsPredicate = null;
            preprocessParameterScope = null;
            preTokParameterScope = null;
            preprocessMacroParameterListMode = false;
            preprocessIsParsingPreprocess = false;
            preprocessStack = [];
            preprocessStackLastItem = null;
            preprocessOnlyTransformArgumentsForLastToken = null;
            preprocessDontConcatenate = false;
            preNotSkipping = true;
            preConcatenating = false;
            preIfLevel = [];
        }
        function finishToken(type, val, overrideTokEnd)
        {
            if (overrideTokEnd)
            {
                firstTokEnd = tokEnd = overrideTokEnd;
                if (options.locations)
                    tokEndLoc = preprocessOverrideTokLoc;
            }
            else
            {
                firstTokEnd = tokEnd = tokPos;
                if (options.locations)
                    tokEndLoc = new line_loc_t();
            }
            tokType = type;
            var ch = skipSpace();
            if (ch === 35 && options.preprocess && input.charCodeAt(tokPos + 1) === 35)
            {
                var val1 = val != null ? val : type.keyword || type.type;
                tokPos += 2;
                if (val1 != null)
                {
                    var positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
                    var saveTokInput = tokInput,
                        saveTokEnd = tokEnd,
                        saveTokStart = tokStart,
                        start = tokStart + tokMacroOffset,
                        variadicName = preprocessStackLastItem && preprocessStackLastItem.macro && preprocessStackLastItem.macro.variadicName;
                    skipSpace();
                    if (variadicName && variadicName === input.slice(tokPos, tokPos + variadicName.length))
                        var isVariadic = true;
                    preConcatenating = true;
                    readToken(null, 2);
                    preConcatenating = false;
                    var val2 = tokVal != null ? tokVal : tokType.keyword || tokType.type;
                    if (val2 != null)
                    {
                        if (isVariadic && val1 === "," && val2 === "")
                            return readToken();
                        var concat = "" + val1 + val2,
                            val2TokStart = tokStart + tokPosMacroOffset;
                        var concatMacro = new Macro(null, concat, null, start, false, null, false, positionOffset);
                        var r = readTokenFromMacro(concatMacro, tokPosMacroOffset, preprocessStackLastItem ? preprocessStackLastItem.parameterDict : null, null, tokPos, next, null);
                        if (preprocessStackLastItem && preprocessStackLastItem.macro === concatMacro)
                        {
                            tokType = type;
                            tokStart = saveTokStart;
                            tokEnd = saveTokEnd;
                            tokInput = saveTokInput;
                            tokPosMacroOffset = val2TokStart - val1.length;
                            if (!isVariadic)
                                console.log("Warning: pasting formed '" + concat + "', an invalid preprocessing token");
                        }
                        else
                            return r;
                    }
                }
            }
            tokVal = val;
            lastTokCommentsAfter = tokCommentsAfter;
            lastTokSpacesAfter = tokSpacesAfter;
            tokCommentsAfter = tokComments;
            tokSpacesAfter = tokSpaces;
            tokRegexpAllowed = type.beforeExpr;
        }
        function skipBlockComment(lastIsNewlinePos, dontTrack)
        {
            var startLoc = options.onComment && options.locations && new line_loc_t();
            var start = tokPos,
                end = input.indexOf("*/", tokPos += 2);
            if (end === -1)
                raise(tokPos - 2, "Unterminated comment");
            tokPos = end + 2;
            if (options.locations)
            {
                lineBreak.lastIndex = start;
                var match;
                while ((match = lineBreak.exec(input)) && match.index < tokPos)
                {
                    ++tokCurLine;
                    tokLineStart = match.index + match[0].length;
                }
            }
            if (!dontTrack)
            {
                if (options.onComment)
                    options.onComment(true, input.slice(start + 2, end), start, tokPos, startLoc, options.locations && new line_loc_t());
                if (options.trackComments)
                    (tokComments || (tokComments = [])).push(input.slice(lastIsNewlinePos != null && options.trackCommentsIncludeLineBreak ? lastIsNewlinePos : start, tokPos));
            }
        }
        function skipLineComment(lastIsNewlinePos, dontTrack)
        {
            var start = tokPos;
            var startLoc = options.onComment && options.locations && new line_loc_t();
            var ch = input.charCodeAt(tokPos += 2);
            while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233)
            {
                ++tokPos;
                ch = input.charCodeAt(tokPos);
            }
            if (!dontTrack)
            {
                if (options.onComment)
                    options.onComment(false, input.slice(start + 2, tokPos), start, tokPos, startLoc, options.locations && new line_loc_t());
                if (options.trackComments)
                    (tokComments || (tokComments = [])).push(input.slice(lastIsNewlinePos != null && options.trackCommentsIncludeLineBreak ? lastIsNewlinePos : start, tokPos));
            }
        }
        function preprocesSkipRestOfLine()
        {
            var ch = input.charCodeAt(tokPos);
            var last;
            while (tokPos < inputLen && (ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233 || last === 92))
            {
                if (ch != 32 && ch != 9 && ch != 160 && (ch < 5760 || !nonASCIIwhitespaceNoNewLine.test(String.fromCharCode(ch))))
                    last = ch;
                ch = input.charCodeAt(++tokPos);
            }
        }
        function skipSpace()
        {
            tokComments = null;
            tokSpaces = null;
            return onlySkipSpace();
        }
        function onlySkipSpace(dontSkipEOL, dontSkipMacroBoundary, dontSkipComments)
        {
            var spaceStart = tokPos,
                lastIsNewlinePos,
                ch;
            for (; ; )
            {
                ch = input.charCodeAt(tokPos);
                if (ch === 32)
                {
                    ++tokPos;
                }
                else if (ch === 13)
                {
                    if (dontSkipEOL)
                        break;
                    lastIsNewlinePos = tokPos;
                    ++tokPos;
                    var next = input.charCodeAt(tokPos);
                    if (next === 10)
                    {
                        ++tokPos;
                    }
                    if (options.locations)
                    {
                        ++tokCurLine;
                        tokLineStart = tokPos;
                    }
                }
                else if (ch === 10)
                {
                    if (dontSkipEOL)
                        break;
                    lastIsNewlinePos = tokPos;
                    ++tokPos;
                    if (options.locations)
                    {
                        ++tokCurLine;
                        tokLineStart = tokPos;
                    }
                }
                else if (ch === 9)
                {
                    ++tokPos;
                }
                else if (ch === 47)
                {
                    if (dontSkipComments)
                        break;
                    var next = input.charCodeAt(tokPos + 1);
                    if (next === 42)
                    {
                        if (options.trackSpaces)
                            (tokSpaces || (tokSpaces = [])).push(input.slice(spaceStart, tokPos));
                        skipBlockComment(lastIsNewlinePos);
                        spaceStart = tokPos;
                    }
                    else if (next === 47)
                    {
                        if (options.trackSpaces)
                            (tokSpaces || (tokSpaces = [])).push(input.slice(spaceStart, tokPos));
                        skipLineComment(lastIsNewlinePos);
                        spaceStart = tokPos;
                    }
                    else
                        break;
                }
                else if (ch === 160 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
                {
                    ++tokPos;
                }
                else if (tokPos >= inputLen)
                {
                    if (options.preprocess)
                    {
                        if (dontSkipMacroBoundary)
                            return true;
                        if (!preprocessStack.length)
                            break;
                        if (firstEndOfFile == null)
                            firstEndOfFile = tokPos;
                        var lastItem = preprocessStack.pop();
                        var saveInputForPrint = input;
                        var saveSourceFileForPrint = sourceFile;
                        tokPos = lastItem.end;
                        input = lastItem.input;
                        inputLen = lastItem.inputLen;
                        tokCurLine = lastItem.currentLine;
                        tokLineStart = lastItem.currentLineStart;
                        preprocessOnlyTransformArgumentsForLastToken = lastItem.onlyTransformArgumentsForLastToken;
                        preprocessParameterScope = lastItem.parameterScope;
                        tokPosMacroOffset = lastItem.macroOffset;
                        sourceFile = lastItem.sourceFile;
                        firstTokEnd = lastItem.lastEnd;
                        var lastIndex = preprocessStack.length;
                        preprocessStackLastItem = lastIndex ? preprocessStack[lastIndex - 1] : null;
                        return onlySkipSpace(dontSkipEOL);
                    }
                    else
                    {
                        break;
                    }
                }
                else if (ch === 92)
                {
                    if (!options.preprocess)
                        break;
                    var pos = tokPos + 1;
                    ch = input.charCodeAt(pos);
                    while (pos < inputLen && (ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespaceNoNewLine.test(String.fromCharCode(ch))))
                        ch = input.charCodeAt(++pos);
                    lineBreak.lastIndex = 0;
                    var match = lineBreak.exec(input.slice(pos, pos + 2));
                    if (match && match.index === 0)
                    {
                        tokPos = pos + match[0].length;
                        if (options.locations)
                        {
                            ++tokCurLine;
                            tokLineStart = tokPos;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                else
                {
                    break;
                }
            }
            return ch;
        }
        function readToken_dot(code, finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next >= 48 && next <= 57)
                return readNumber(String.fromCharCode(code), finisher);
            if (next === 46 && options.objj && input.charCodeAt(tokPos + 2) === 46)
            {
                tokPos += 3;
                return finisher(_dotdotdot);
            }
            ++tokPos;
            return finisher(_dot);
        }
        function readToken_slash(finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (tokRegexpAllowed)
            {
                ++tokPos;
                return readRegexp();
            }
            if (next === 61)
                return finishOp(_assign, 2, finisher);
            return finishOp(_slash, 1, finisher);
        }
        function readToken_mult_modulo(finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next === 61)
                return finishOp(_assign, 2, finisher);
            return finishOp(_bin10, 1, finisher);
        }
        function readToken_pipe_amp(code, finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next === code)
                return finishOp(code === 124 ? _bin1 : _bin2, 2, finisher);
            if (next === 61)
                return finishOp(_assign, 2, finisher);
            return finishOp(code === 124 ? _bin3 : _bin5, 1, finisher);
        }
        function readToken_caret(finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next === 61)
                return finishOp(_assign, 2, finisher);
            return finishOp(_bin4, 1, finisher);
        }
        function readToken_plus_min(code, finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next === code)
                return finishOp(_incdec, 2, finisher);
            if (next === 61)
                return finishOp(_assign, 2, finisher);
            return finishOp(_plusmin, 1, finisher);
        }
        function readToken_lt_gt(code, finisher)
        {
            if (code === 60 && (tokType === _import || preTokType === _preInclude) && options.objj)
            {
                for (var start = tokPos + 1; ; )
                {
                    var ch = input.charCodeAt(++tokPos);
                    if (ch === 62)
                        return finisher(_filename, input.slice(start, tokPos++));
                    if (tokPos >= inputLen || ch === 13 || ch === 10 || ch === 8232 || ch === 8233)
                        raise(tokStart, "Unterminated import statement");
                }
            }
            var next = input.charCodeAt(tokPos + 1);
            var size = 1;
            if (next === code)
            {
                size = code === 62 && input.charCodeAt(tokPos + 2) === 62 ? 3 : 2;
                if (input.charCodeAt(tokPos + size) === 61)
                    return finishOp(_assign, size + 1, finisher);
                return finishOp(_bin8, size, finisher);
            }
            if (next === 61)
                size = input.charCodeAt(tokPos + 2) === 61 ? 3 : 2;
            return finishOp(_bin7, size, finisher);
        }
        function readToken_eq_excl(code, finisher)
        {
            var next = input.charCodeAt(tokPos + 1);
            if (next === 61)
                return finishOp(_bin6, input.charCodeAt(tokPos + 2) === 61 ? 3 : 2, finisher);
            return finishOp(code === 61 ? _eq : _prefix, 1, finisher);
        }
        function readToken_at(code, finisher)
        {
            var next = input.charCodeAt(++tokPos);
            if (next === 34 || next === 39)
                return readString(next, finisher);
            if (next === 123)
                return finisher(_dictionaryLiteral);
            if (next === 91)
                return finisher(_arrayLiteral);
            var word = readWord1(),
                token = objJAtKeywordTypes[word];
            if (!token)
                raise(tokStart, "Unrecognized Objective-J keyword '@" + word + "'");
            return finisher(token);
        }
        function readToken_preprocess(finisher)
        {
            ++tokPos;
            preprocessSkipSpace();
            preprocessReadToken(false, true);
            switch(preTokType) {
                case _preDefine:
                    if (preNotSkipping)
                    {
                        preprocessParseDefine();
                    }
                    else
                    {
                        return finisher(_preDefine);
                    }
                    break;
                case _preUndef:
                    preprocessReadToken();
                    options.preprocessUndefineMacro(preprocessGetIdent());
                    break;
                case _preIf:
                    if (preNotSkipping)
                    {
                        var saveTokRegexpAllowed = tokRegexpAllowed;
                        tokRegexpAllowed = false;
                        preIfLevel.push(_preIf);
                        preprocessReadToken(false, false, true);
                        var expr = preprocessParseExpression(true);
                        var test = preprocessEvalExpression(expr);
                        if (!test)
                        {
                            preNotSkipping = false;
                            preprocessSkipToElseOrEndif();
                        }
                        tokRegexpAllowed = saveTokRegexpAllowed;
                    }
                    else
                    {
                        return finisher(_preIf);
                    }
                    break;
                case _preIfdef:
                    if (preNotSkipping)
                    {
                        preIfLevel.push(_preIf);
                        preprocessReadToken();
                        var ident = preprocessGetIdent();
                        var test = options.preprocessIsMacro(ident);
                        if (!test)
                        {
                            preNotSkipping = false;
                            preprocessSkipToElseOrEndif();
                        }
                    }
                    else
                    {
                        return finisher(_preIfdef);
                    }
                    break;
                case _preIfndef:
                    if (preNotSkipping)
                    {
                        preIfLevel.push(_preIf);
                        preprocessReadToken();
                        var ident = preprocessGetIdent();
                        var test = options.preprocessIsMacro(ident);
                        if (test)
                        {
                            preNotSkipping = false;
                            preprocessSkipToElseOrEndif();
                        }
                    }
                    else
                    {
                        return finisher(_preIfndef);
                    }
                    break;
                case _preElse:
                    if (preIfLevel.length)
                    {
                        if (preNotSkipping)
                        {
                            if (preIfLevel[preIfLevel.length - 1] === _preIf)
                            {
                                preIfLevel[preIfLevel.length - 1] = _preElse;
                                preNotSkipping = false;
                                finisher(_preElse);
                                preprocessReadToken();
                                preprocessSkipToElseOrEndif(true);
                            }
                            else
                                raise(preTokStart, "#else after #else");
                        }
                        else
                        {
                            preIfLevel[preIfLevel.length - 1] = _preElse;
                            return finisher(_preElse);
                        }
                    }
                    else
                        raise(preTokStart, "#else without #if");
                    break;
                case _preElseIf:
                    if (preIfLevel.length)
                    {
                        if (preNotSkipping)
                        {
                            if (preIfLevel[preIfLevel.length - 1] === _preIf)
                            {
                                preNotSkipping = false;
                                finisher(_preElseIf);
                                preprocessReadToken();
                                preprocessSkipToElseOrEndif(true);
                            }
                            else
                                raise(preTokStart, "#elsif after #else");
                        }
                        else
                        {
                            var saveTokRegexpAllowed = tokRegexpAllowed;
                            tokRegexpAllowed = false;
                            preNotSkipping = true;
                            preprocessReadToken(false, false, true);
                            var expr = preprocessParseExpression(true);
                            preNotSkipping = false;
                            tokRegexpAllowed = saveTokRegexpAllowed;
                            var test = preprocessEvalExpression(expr);
                            return finisher(test ? _preElseIfTrue : _preElseIfFalse);
                        }
                    }
                    else
                        raise(preTokStart, "#elif without #if");
                    break;
                case _preEndif:
                    if (preIfLevel.length)
                    {
                        if (preNotSkipping)
                        {
                            preIfLevel.pop();
                            break;
                        }
                    }
                    else
                    {
                        raise(preTokStart, "#endif without #if");
                    }
                    return finisher(_preEndif);
                    break;
                case _prePragma:
                    preprocesSkipRestOfLine();
                    break;
                case _prefix:
                    preprocesSkipRestOfLine();
                    break;
                case _preWarning:
                    preprocessReadToken(false, false, true);
                    var expr = preprocessParseExpression();
                    console.log("Warning: " + String(preprocessEvalExpression(expr)));
                    break;
                case _preError:
                    var start = preTokStart;
                    preprocessReadToken(false, false, true);
                    var expr = preprocessParseExpression();
                    raise(start, "Error: " + String(preprocessEvalExpression(expr)));
                    break;
                case _preInclude:
                    if (!preNotSkipping)
                    {
                        return finisher(_preInclude);
                    }
                    preprocessReadToken();
                    if (preTokType === _string)
                        var localfilepath = true;
                    else if (preTokType === _filename)
                        var localfilepath = false;
                    else
                        raise(preTokStart, "Expected \"FILENAME\" or <FILENAME>: " + (preTokType.keyword || preTokType.type));
                    var theFileName = preTokVal;
                    var includeDict = options.preprocessGetIncludeFile(preTokVal, localfilepath) || raise(preTokStart, "'" + theFileName + "' file not found");
                    var includeString = includeDict.include;
                    var includeMacro = new Macro(null, includeString, null, 0, false, null, false, null, includeDict.sourceFile);
                    preprocessFinishToken(_preprocess, null, null, true);
                    pushMacroToStack(includeMacro, includeMacro.macro, tokPosMacroOffset, null, null, tokPos, null, true);
                    skipSpace();
                    readToken(null, null, true);
                    return;
                    break;
default:
                    if (preprocessStackLastItem)
                    {
                        if (preprocessStackLastItem.parameterDict && preprocessStackLastItem.macro.isParameterFunction()(preTokVal))
                        {
                            var macro = preprocessStackLastItem.parameterDict[preTokVal];
                            if (macro)
                            {
                                return finishToken(_string, macro.macro);
                            }
                        }
                    }
                    raise(preTokStart, "Invalid preprocessing directive");
                    preprocesSkipRestOfLine();
                    return finisher(_preprocess);
            }
            if (preTokType === _eol && options.trackSpaces)
            {
                if (tokSpaces && tokSpaces.length)
                    tokSpaces.push("\n" + tokSpaces.pop());
                else
                    tokSpaces = ["\n"];
            }
            preprocessFinishToken(preTokType, null, null, true);
            return next(true);
        }
        function preprocessParseDefine()
        {
            preprocessIsParsingPreprocess = true;
            preprocessReadToken();
            var macroIdentifierEnd = preTokEnd;
            preprocessDontConcatenate = true;
            var positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
            var macroIdentifier = preprocessGetIdent();
            if (input.charCodeAt(macroIdentifierEnd) === 40)
            {
                preprocessExpect(_parenL);
                var parameters = [];
                var variadic = false;
                var first = true;
                while (!preprocessEat(_parenR))
                {
                    if (variadic)
                        raise(preTokStart, "Variadic parameter must be last");
                    if (!first)
                        preprocessExpect(_comma, "Expected ',' between macro parameters");
                    else
                        first = false;
                    parameters.push(preprocessEat(_dotdotdot) ? variadic = true && "__VA_ARGS__" : preprocessGetIdent());
                    if (preprocessEat(_dotdotdot))
                        variadic = true;
                    positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
                }
            }
            var start = preTokStart;
            while (preTokType !== _eol && preTokType !== _eof)
                preprocessReadToken();
            preprocessDontConcatenate = false;
            var macroString = preTokInput.slice(start, preTokStart);
            macroString = macroString.replace(/\\/g, " ");
            options.preprocessAddMacro(new Macro(macroIdentifier, macroString, parameters, start, false, null, variadic && parameters[parameters.length - 1], positionOffset));
            preprocessIsParsingPreprocess = false;
        }
        function preprocessEvalExpression(expr)
        {
            return walk.recursive(expr, {}, {LogicalExpression:             function(node, st, c)
            {
                var left = node.left,
                    right = node.right;
                switch(node.operator) {
                    case "||":
                        return c(left, st) || c(right, st);
                    case "&&":
                        return c(left, st) && c(right, st);
                }
            }, BinaryExpression:             function(node, st, c)
            {
                var left = node.left,
                    right = node.right;
                switch(node.operator) {
                    case "+":
                        return c(left, st) + c(right, st);
                    case "-":
                        return c(left, st) - c(right, st);
                    case "*":
                        return c(left, st) * c(right, st);
                    case "/":
                        return c(left, st) / c(right, st);
                    case "%":
                        return c(left, st) % c(right, st);
                    case "<":
                        return c(left, st) < c(right, st);
                    case ">":
                        return c(left, st) > c(right, st);
                    case "^":
                        return c(left, st) ^ c(right, st);
                    case "&":
                        return c(left, st) & c(right, st);
                    case "|":
                        return c(left, st) | c(right, st);
                    case "==":
                        return c(left, st) == c(right, st);
                    case "===":
                        return c(left, st) === c(right, st);
                    case "!=":
                        return c(left, st) != c(right, st);
                    case "!==":
                        return c(left, st) !== c(right, st);
                    case "<=":
                        return c(left, st) <= c(right, st);
                    case ">=":
                        return c(left, st) >= c(right, st);
                    case ">>":
                        return c(left, st) >> c(right, st);
                    case ">>>":
                        return c(left, st) >>> c(right, st);
                    case "<<":
                        return c(left, st) << c(right, st);
                }
            }, UnaryExpression:             function(node, st, c)
            {
                var arg = node.argument;
                switch(node.operator) {
                    case "-":
                        return -c(arg, st);
                    case "+":
                        return +c(arg, st);
                    case "!":
                        return !c(arg, st);
                    case "~":
                        return ~c(arg, st);
                }
            }, Literal:             function(node, st, c)
            {
                return node.value;
            }, Identifier:             function(node, st, c)
            {
                return 0;
            }, DefinedExpression:             function(node, st, c)
            {
                var objectNode = node.object;
                if (objectNode.type === "Identifier")
                {
                    var name = objectNode.name,
                        macro = options.preprocessGetMacro(name) || preprocessBuiltinMacro(name);
                    return macro || 0;
                }                else
                {
                    return c(objectNode, st);
                }            }}, {});
        }
        function getTokenFromCode(code, finisher, allowEndOfLineToken)
        {
            switch(code) {
                case 46:
                    return readToken_dot(code, finisher);
                case 40:
                    ++tokPos;
                    return finisher(_parenL);
                case 41:
                    ++tokPos;
                    return finisher(_parenR);
                case 59:
                    ++tokPos;
                    return finisher(_semi);
                case 44:
                    ++tokPos;
                    return finisher(_comma);
                case 91:
                    ++tokPos;
                    return finisher(_bracketL);
                case 93:
                    ++tokPos;
                    return finisher(_bracketR);
                case 123:
                    ++tokPos;
                    return finisher(_braceL);
                case 125:
                    ++tokPos;
                    return finisher(_braceR);
                case 58:
                    ++tokPos;
                    return finisher(_colon);
                case 63:
                    ++tokPos;
                    return finisher(_question);
                case 48:
                    var next = input.charCodeAt(tokPos + 1);
                    if (next === 120 || next === 88)
                        return readHexNumber(finisher);
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    return readNumber(false, finisher);
                case 34:
                case 39:
                    return readString(code, finisher);
                case 47:
                    return readToken_slash(finisher);
                case 37:
                case 42:
                    return readToken_mult_modulo(finisher);
                case 124:
                case 38:
                    return readToken_pipe_amp(code, finisher);
                case 94:
                    return readToken_caret(finisher);
                case 43:
                case 45:
                    return readToken_plus_min(code, finisher);
                case 60:
                case 62:
                    return readToken_lt_gt(code, finisher);
                case 61:
                case 33:
                    return readToken_eq_excl(code, finisher);
                case 126:
                    return finishOp(_prefix, 1, finisher);
                case 64:
                    if (options.objj)
                        return readToken_at(code, finisher);
                    return false;
                case 35:
                    if (options.preprocess)
                    {
                        if (preprocessIsParsingPreprocess)
                        {
                            ++tokPos;
                            return finisher(_preprocess);
                        }
                        lineBreak.lastIndex = 0;
                        var match = lineBreak.exec(input.slice(localLastEnd, tokPos));
                        if (lastEnd !== 0 && lastEnd !== tokPos && !match && (preprocessStackLastItem && !preprocessStackLastItem.isIncludeFile || tokPos !== 0))
                        {
                            if (preprocessStackLastItem)
                            {
                                return preprocessStringify();
                            }
                            else
                            {
                                raise(tokPos, "Preprocessor directives may only be used at the beginning of a line");
                            }
                        }
                        return readToken_preprocess(finisher);
                    }
                    return false;
                case 92:
                    if (options.preprocess)
                    {
                        return finishOp(_preBackslash, 1, finisher);
                    }
                    return false;
            }
            if (allowEndOfLineToken)
            {
                var r;
                if (code === 13 || code === 10 || code === 8232 || code === 8233)
                {
                    if (options.locations)
                    {
                        ++tokCurLine;
                        tokLineStart = tokPos;
                    }
                    return finishOp(_eol, code === 13 && input.charCodeAt(tokPos + 1) === 10 ? 2 : 1, finisher);
                }
            }
            return false;
        }
        function preprocessStringify()
        {
            var saveStackLength = preprocessStack.length,
                saveLastItem = preprocessStackLastItem;
            tokPos++;
            preConcatenating = true;
            next(false, 2);
            preConcatenating = false;
            var start = tokStart + tokMacroOffset;
            var positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
            var string;
            if (tokType === _string)
            {
                var quote = tokInput.slice(tokStart, tokStart + 1);
                var escapedQuote = quote === '"' ? '\\"' : "'";
                string = escapedQuote;
                string += preprocessStringifyEscape(tokVal);
                string += escapedQuote;
            }
            else
            {
                string = tokVal != null ? tokVal : tokType.keyword || tokType.type;
            }
            while (preprocessStack.length > saveStackLength && saveLastItem === preprocessStack[saveStackLength - 1])
            {
                preConcatenating = true;
                next(false, 2);
                preConcatenating = false;
                if (lastEnd !== tokStart)
                    string += " ";
                if (tokType === _string)
                {
                    var quote = tokInput.slice(tokStart, tokStart + 1);
                    var escapedQuote = quote === '"' ? '\\"' : "'";
                    string += escapedQuote;
                    string += preprocessStringifyEscape(tokVal);
                    string += escapedQuote;
                }
                else
                {
                    string += tokVal != null ? tokVal : tokType.keyword || tokType.type;
                }
            }
            var stringifyMacro = new Macro(null, '"' + string + '"', null, start, false, null, false, positionOffset);
            return readTokenFromMacro(stringifyMacro, tokPosMacroOffset, null, null, tokPos, next);
        }
        function preprocessStringifyEscape(aString)
        {
            for (var escaped = "", pos = 0, size = aString.length, ch = aString.charCodeAt(pos); pos < size; ch = aString.charCodeAt(++pos))
            {
                switch(ch) {
                    case 34:
                        escaped += '\\\\\\"';
                        break;
                    case 10:
                        escaped += "\\\\n";
                        break;
                    case 13:
                        escaped += "\\\\r";
                        break;
                    case 9:
                        escaped += "\\\\t";
                        break;
                    case 8:
                        escaped += "\\\\b";
                        break;
                    case 11:
                        escaped += "\\\\v";
                        break;
                    case 0x00A0:
                        escaped += "\\\\u00A0";
                        break;
                    case 0x2028:
                        escaped += "\\\\u2028";
                        break;
                    case 0x2029:
                        escaped += "\\\\u2029";
                        break;
                    case 92:
                        escaped += "\\\\";
                        break;
default:
                        escaped += aString.charAt(pos);
                        break;
                }
            }
            return escaped;
        }
        function preprocessSkipSpace(dontSkipComments, skipEOL)
        {
            var ch = onlySkipSpace(!skipEOL, false, dontSkipComments);
            return ch;
        }
        function preprocessSkipToElseOrEndif(skipElse)
        {
            var ifLevel = [];
            while (ifLevel.length > 0 || preTokType !== _preEndif && (preTokType !== _preElse && preTokType !== _preElseIfTrue || skipElse))
            {
                switch(preTokType) {
                    case _preIf:
                    case _preIfdef:
                    case _preIfndef:
                        ifLevel.push(_preIf);
                        break;
                    case _preElse:
                        if (ifLevel[ifLevel.length - 1] !== _preIf)
                            raise(preTokStart, "#else after #else");
                        else
                            ifLevel[ifLevel.length - 1] = _preElse;
                        break;
                    case _preElseIf:
                        if (ifLevel[ifLevel.length - 1] !== _preIf)
                            raise(preTokStart, "#elif after #else");
                        break;
                    case _preEndif:
                        ifLevel.pop();
                        break;
                    case _eof:
                        preNotSkipping = true;
                        raise(preTokStart, "Missing #endif");
                }
                preprocessReadToken(true);
            }
            preNotSkipping = true;
            if (preTokType === _preEndif)
                preIfLevel.pop();
        }
        function preprocessReadToken(skipComments, preprocessToken, processMacros, onlyTransformMacroArguments)
        {
            preTokStart = tokPos;
            preTokInput = input;
            preTokParameterScope = preprocessParameterScope;
            if (tokPos >= inputLen)
                return preprocessFinishToken(_eof);
            var code = input.charCodeAt(tokPos);
            if (!preprocessToken && !preNotSkipping && code !== 35)
            {
                preprocesSkipRestOfLine();
                preprocessFinishToken(_preprocessSkipLine, input.slice(preTokStart, tokPos));
                preprocessSkipSpace(true, true);
                return;
            }
            else if (preprocessMacroParameterListMode && code !== 41 && code !== 44)
            {
                var parenLevel = 0;
                while (tokPos < inputLen && (parenLevel || code !== 41 && code !== 44))
                {
                    if (code === 40)
                        parenLevel++;
                    if (code === 41)
                        parenLevel--;
                    if (code === 34 || code === 39)
                    {
                        var quote = code;
                        code = input.charCodeAt(++tokPos);
                        while (tokPos < inputLen && code !== quote)
                        {
                            if (code === 92)
                            {
                                code = input.charCodeAt(++tokPos);
                                if (code !== quote)
                                    continue;
                            }
                            code = input.charCodeAt(++tokPos);
                        }
                    }
                    code = input.charCodeAt(++tokPos);
                }
                return preprocessFinishToken(_preprocessParamItem, input.slice(preTokStart, tokPos));
            }
            if (isIdentifierStart(code) || code === 92 && input.charCodeAt(tokPos + 1) === 117)
                return preprocessReadWord(processMacros);
            if (getTokenFromCode(code, skipComments ? preprocessFinishTokenSkipComments : preprocessFinishToken, true) === false)
            {
                var ch = String.fromCharCode(code);
                if (ch === "\\" || nonASCIIidentifierStart.test(ch))
                    return preprocessReadWord(processMacros);
                raise(tokPos, "Unexpected character '" + ch + "'");
            }
        }
        function preprocessReadWord(processMacros, onlyTransformMacroArguments)
        {
            var word = readWord1();
            var type = _name;
            if (processMacros && options.preprocess)
            {
                var readMacroWordReturn = readMacroWord(word, preprocessNext, onlyTransformMacroArguments);
                if (readMacroWordReturn === true)
                    return true;
            }
            if (!containsEsc && isKeywordPreprocessor(word))
                type = keywordTypesPreprocessor[word];
            preprocessFinishToken(type, word, readMacroWordReturn, false, processMacros);
        }
        function preprocessFinishToken(type, val, overrideTokEnd, skipEOL, processMacros)
        {
            preTokType = type;
            preTokVal = val;
            preTokEnd = overrideTokEnd || tokPos;
            if (type !== _eol)
                firstTokEnd = preTokEnd;
            var ch = preprocessSkipSpace(false, skipEOL);
            if (ch === 35 && options.preprocess && !preprocessDontConcatenate && input.charCodeAt(tokPos + 1) === 35)
            {
                var val1 = val != null ? val : type.keyword || type.type;
                tokPos += 2;
                if (val1 != null)
                {
                    var positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
                    var saveTokInput = tokInput,
                        saveTokEnd = preTokEnd,
                        saveTokStart = preTokStart,
                        start = preTokStart + tokMacroOffset,
                        variadicName = preprocessStackLastItem && preprocessStackLastItem.macro && preprocessStackLastItem.macro.variadicName;
                    skipSpace();
                    if (variadicName && variadicName === input.slice(tokPos, tokPos + variadicName.length))
                        var isVariadic = true;
                    preConcatenating = true;
                    preprocessReadToken(null, null, processMacros, 2);
                    preConcatenating = false;
                    var val2 = preTokVal != null ? preTokVal : preTokType.keyword || preTokType.type;
                    if (val2 != null)
                    {
                        if (isVariadic && val1 === "," && val2 === "")
                            return preprocessReadToken();
                        var concat = "" + val1 + val2,
                            val2TokStart = preTokStart + tokPosMacroOffset;
                        var concatMacro = new Macro(null, concat, null, start, false, null, false, positionOffset);
                        var r = readTokenFromMacro(concatMacro, tokPosMacroOffset, preprocessStackLastItem ? preprocessStackLastItem.parameterDict : null, null, tokPos, preprocessNext, null);
                        if (preprocessStackLastItem && preprocessStackLastItem.macro === concatMacro)
                        {
                            preTokType = type;
                            preTokStart = saveTokStart;
                            preTokEnd = saveTokEnd;
                            tokInput = saveTokInput;
                            tokPosMacroOffset = val2TokStart - val1.length;
                            if (!isVariadic)
                                console.log("Warning: pasting formed '" + concat + "', an invalid preprocessing token");
                        }
                        else
                            return r;
                    }
                }
            }
        }
        function preprocessFinishTokenSkipComments(type, val)
        {
            preTokType = type;
            preTokVal = val;
            firstTokEnd = preTokEnd = tokPos;
            preprocessSkipSpace(true);
        }
        function preprocessNext(stealth, onlyTransformArguments, forceRegexp, processMacros)
        {
            if (!stealth)
            {
                preLastStart = preTokStart;
                preLastEnd = preTokEnd;
            }
            localLastEnd = firstTokEnd;
            return preprocessReadToken(false, false, processMacros, onlyTransformArguments);
        }
        function preprocessEat(type, processMacros)
        {
            if (preTokType === type)
            {
                preprocessNext(false, false, null, processMacros);
                return true;
            }
        }
        function preprocessExpect(type, errorMessage, processMacros)
        {
            if (preTokType === type)
                preprocessNext(false, undefined, null, processMacros);
            else
                raise(preTokStart, errorMessage || "Unexpected token");
        }
        function debug()
        {
        }
        function preprocessGetIdent(processMacros)
        {
            var ident = preTokType === _name ? preTokVal : (!options.forbidReserved || preTokType.okAsIdent) && preTokType.keyword || debug();
            preprocessNext(false, false, null, processMacros);
            return ident;
        }
        function preprocessParseIdent(processMacros)
        {
            var node = startNode();
            node.name = preprocessGetIdent(processMacros);
            return preprocessFinishNode(node, "Identifier");
        }
        function preprocessParseExpression(processMacros)
        {
            return preprocessParseExprOps(processMacros);
        }
        function preprocessParseExprOps(processMacros)
        {
            return preprocessParseExprOp(preprocessParseMaybeUnary(processMacros), -1, processMacros);
        }
        function preprocessParseExprOp(left, minPrec, processMacros)
        {
            var prec = preTokType.binop;
            if (prec)
            {
                if (!preTokType.preprocess)
                    raise(preTokStart, "Unsupported macro operator");
                if (prec > minPrec)
                {
                    var node = startNodeFrom(left);
                    node.left = left;
                    node.operator = preTokVal;
                    preprocessNext(false, false, null, processMacros);
                    node.right = preprocessParseExprOp(preprocessParseMaybeUnary(processMacros), prec, processMacros);
                    var node = preprocessFinishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
                    return preprocessParseExprOp(node, minPrec, processMacros);
                }
            }
            return left;
        }
        function preprocessParseMaybeUnary(processMacros)
        {
            if (preTokType.preprocess && preTokType.prefix)
            {
                var node = startNode();
                node.operator = preTokVal;
                node.prefix = true;
                preprocessNext(false, false, null, processMacros);
                node.argument = preprocessParseMaybeUnary(processMacros);
                return preprocessFinishNode(node, "UnaryExpression");
            }
            return preprocessParseExprAtom(processMacros);
        }
        function preprocessParseExprAtom(processMacros)
        {
            switch(preTokType) {
                case _name:
                    return preprocessParseIdent(processMacros);
                case _num:
                case _string:
                    return preprocessParseStringNumLiteral(processMacros);
                case _parenL:
                    var tokStart1 = preTokStart;
                    preprocessNext(false, false, null, processMacros);
                    var val = preprocessParseExpression(processMacros);
                    val.start = tokStart1;
                    val.end = preTokEnd;
                    preprocessExpect(_parenR, "Expected closing ')' in macro expression", processMacros);
                    return val;
                case _preDefined:
                    var node = startNode();
                    preprocessNext(false, false, null, processMacros);
                    node.object = preprocessParseDefinedExpression(processMacros);
                    return preprocessFinishNode(node, "DefinedExpression");
default:
                    unexpected();
            }
        }
        function preprocessParseDefinedExpression(processMacros)
        {
            switch(preTokType) {
                case _name:
                    return preprocessParseIdent(processMacros);
                case _num:
                case _string:
                    return preprocessParseStringNumLiteral(processMacros);
                case _parenL:
                    var tokStart1 = preTokStart;
                    preprocessNext(false, false, null, processMacros);
                    var val = preprocessParseDefinedExpression(processMacros);
                    val.start = tokStart1;
                    val.end = preTokEnd;
                    preprocessExpect(_parenR, "Expected closing ')' in macro expression", processMacros);
                    return val;
default:
                    unexpected();
            }
        }
        function preprocessParseStringNumLiteral(processMacros)
        {
            var node = startNode();
            node.value = preTokVal;
            node.raw = preTokInput.slice(preTokStart, preTokEnd);
            preprocessNext(false, false, null, processMacros);
            return preprocessFinishNode(node, "Literal");
        }
        function preprocessFinishNode(node, type)
        {
            node.type = type;
            node.end = preLastEnd;
            return node;
        }
        function readToken(forceRegexp, onlyTransformMacroArguments, stealth)
        {
            tokCommentsBefore = tokComments;
            tokSpacesBefore = tokSpaces;
            if (!forceRegexp)
                tokStart = tokPos;
            else
                tokPos = tokStart + 1;
            if (!stealth)
            {
                tokFirstStart = tokStart;
            }
            tokInput = input;
            tokMacroOffset = tokPosMacroOffset;
            preTokParameterScope = preprocessParameterScope;
            if (options.locations)
                tokStartLoc = new line_loc_t();
            if (forceRegexp)
                return readRegexp();
            if (tokPos >= inputLen)
                return finishToken(_eof);
            var code = input.charCodeAt(tokPos);
            if (isIdentifierStart(code) || code === 92)
                return readWord(null, onlyTransformMacroArguments, forceRegexp);
            var tok = getTokenFromCode(code, finishToken);
            if (tok === false)
            {
                var ch = String.fromCharCode(code);
                if (ch === "\\" || nonASCIIidentifierStart.test(ch))
                    return readWord(null, onlyTransformMacroArguments, forceRegexp);
                raise(tokPos, "Unexpected character '" + ch + "'");
            }
            return tok;
        }
        function finishOp(type, size, finisher)
        {
            var str = input.slice(tokPos, tokPos + size);
            tokPos += size;
            finisher(type, str);
        }
        function readRegexp()
        {
            var content = "",
                escaped,
                inClass,
                start = tokPos;
            for (; ; )
            {
                if (tokPos >= inputLen)
                    raise(start, "Unterminated regular expression");
                var ch = input.charAt(tokPos);
                if (newline.test(ch))
                    raise(start, "Unterminated regular expression");
                if (!escaped)
                {
                    if (ch === "[")
                        inClass = true;
                    else if (ch === "]" && inClass)
                        inClass = false;
                    else if (ch === "/" && !inClass)
                        break;
                    escaped = ch === "\\";
                }
                else
                    escaped = false;
                ++tokPos;
            }
            var content = input.slice(start, tokPos);
            ++tokPos;
            var mods = readWord1();
            if (mods && !/^[gmsiy]*$/.test(mods))
                raise(start, "Invalid regexp flag");
            return finishToken(_regexp, new RegExp(content, mods));
        }
        function readInt(radix, len)
        {
            var start = tokPos,
                total = 0;
            for (var i = 0, e = len == null ? Infinity : len; i < e; ++i)
            {
                var code = input.charCodeAt(tokPos),
                    val;
                if (code >= 97)
                    val = code - 97 + 10;
                else if (code >= 65)
                    val = code - 65 + 10;
                else if (code >= 48 && code <= 57)
                    val = code - 48;
                else
                    val = Infinity;
                if (val >= radix)
                    break;
                ++tokPos;
                total = total * radix + val;
            }
            if (tokPos === start || len != null && tokPos - start !== len)
                return null;
            return total;
        }
        function readHexNumber(finisher)
        {
            tokPos += 2;
            var val = readInt(16);
            if (val == null)
                raise(tokStart + 2, "Expected hexadecimal number");
            if (isIdentifierStart(input.charCodeAt(tokPos)))
                raise(tokPos, "Identifier directly after number");
            return finisher(_num, val);
        }
        function readNumber(startsWithDot, finisher)
        {
            var start = tokPos,
                isFloat = false,
                octal = input.charCodeAt(tokPos) === 48;
            if (!startsWithDot && readInt(10) === null)
                raise(start, "Invalid number");
            if (input.charCodeAt(tokPos) === 46)
            {
                ++tokPos;
                readInt(10);
                isFloat = true;
            }
            var next = input.charCodeAt(tokPos);
            if (next === 69 || next === 101)
            {
                next = input.charCodeAt(++tokPos);
                if (next === 43 || next === 45)
                    ++tokPos;
                if (readInt(10) === null)
                    raise(start, "Invalid number");
                isFloat = true;
            }
            if (isIdentifierStart(input.charCodeAt(tokPos)))
                raise(tokPos, "Identifier directly after number");
            var str = input.slice(start, tokPos),
                val;
            if (isFloat)
                val = parseFloat(str);
            else if (!octal || str.length === 1)
                val = parseInt(str, 10);
            else if (/[89]/.test(str) || strict)
                raise(start, "Invalid number");
            else
                val = parseInt(str, 8);
            return finisher(_num, val);
        }
        function readString(quote, finisher)
        {
            tokPos++;
            var out = "";
            for (; ; )
            {
                if (tokPos >= inputLen)
                    raise(tokStart, "Unterminated string constant");
                var ch = input.charCodeAt(tokPos);
                if (ch === quote)
                {
                    ++tokPos;
                    return finisher(_string, out);
                }
                if (ch === 92)
                {
                    ch = input.charCodeAt(++tokPos);
                    var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
                    if (octal)
                        octal = octal[0];
                    while (octal && parseInt(octal, 8) > 255)
                        octal = octal.slice(0, octal.length - 1);
                    if (octal === "0")
                        octal = null;
                    ++tokPos;
                    if (octal)
                    {
                        if (strict)
                            raise(tokPos - 2, "Octal literal in strict mode");
                        out += String.fromCharCode(parseInt(octal, 8));
                        tokPos += octal.length - 1;
                    }
                    else
                    {
                        switch(ch) {
                            case 110:
                                out += "\n";
                                break;
                            case 114:
                                out += "\r";
                                break;
                            case 120:
                                out += String.fromCharCode(readHexChar(2));
                                break;
                            case 117:
                                out += String.fromCharCode(readHexChar(4));
                                break;
                            case 85:
                                out += String.fromCharCode(readHexChar(8));
                                break;
                            case 116:
                                out += "\t";
                                break;
                            case 98:
                                out += "\b";
                                break;
                            case 118:
                                out += "\u000b";
                                break;
                            case 102:
                                out += "\f";
                                break;
                            case 48:
                                out += "\0";
                                break;
                            case 13:
                                if (input.charCodeAt(tokPos) === 10)
                                    ++tokPos;
                            case 10:
                                if (options.locations)
                                {
                                    tokLineStart = tokPos;
                                    ++tokCurLine;
                                }
                                break;
default:
                                out += String.fromCharCode(ch);
                                break;
                        }
                    }
                }
                else
                {
                    if (ch === 13 || ch === 10 || ch === 8232 || ch === 8233)
                        raise(tokStart, "Unterminated string constant");
                    out += String.fromCharCode(ch);
                    ++tokPos;
                }
            }
        }
        function readHexChar(len)
        {
            var n = readInt(16, len);
            if (n === null)
                raise(tokStart, "Bad character escape sequence");
            return n;
        }
        var containsEsc;
        function readWord1()
        {
            containsEsc = false;
            var word,
                first = true,
                start = tokPos;
            for (; ; )
            {
                var ch = input.charCodeAt(tokPos);
                if (isIdentifierChar(ch))
                {
                    if (containsEsc)
                        word += input.charAt(tokPos);
                    ++tokPos;
                }
                else if (ch === 92)
                {
                    if (!containsEsc)
                        word = input.slice(start, tokPos);
                    containsEsc = true;
                    if (input.charCodeAt(++tokPos) != 117)
                        raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
                    ++tokPos;
                    var esc = readHexChar(4);
                    var escStr = String.fromCharCode(esc);
                    if (!escStr)
                        raise(tokPos - 1, "Invalid Unicode escape");
                    if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
                        raise(tokPos - 4, "Invalid Unicode escape");
                    word += escStr;
                }
                else
                {
                    break;
                }
                first = false;
            }
            return containsEsc ? word : input.slice(start, tokPos);
        }
        function readWord(preReadWord, onlyTransformMacroArguments, forceRegexp)
        {
            var word = preReadWord || readWord1();
            var type = _name;
            if (options.preprocess)
            {
                var readMacroWordReturn = readMacroWord(word, next, onlyTransformMacroArguments, forceRegexp);
                if (readMacroWordReturn === true)
                    return true;
            }
            if (!containsEsc)
            {
                if (isKeyword(word))
                    type = keywordTypes[word];
                else if (options.objj && isKeywordObjJ(word))
                    type = keywordTypesObjJ[word];
                else if (options.forbidReserved && (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(word) || strict && isStrictReservedWord(word))
                    raise(tokStart, "The keyword '" + word + "' is reserved");
            }
            return finishToken(type, word, readMacroWordReturn);
        }
        function readMacroWord(word, nextFinisher, onlyTransformArguments, forceRegexp)
        {
            var macro,
                lastStackItem = preprocessStackLastItem,
                oldParameterScope = preprocessParameterScope;
            if (lastStackItem)
            {
                var scope = preTokParameterScope || preprocessStackLastItem;
                if (scope.parameterDict && scope.macro.isParameterFunction()(word))
                {
                    macro = scope.parameterDict[word];
                    if (!macro && scope.macro.variadicName === word)
                    {
                        if (preConcatenating)
                        {
                            finishToken(_name, "");
                            return true;
                        }
                        else
                        {
                            onlySkipSpace();
                            nextFinisher(true, onlyTransformArguments, forceRegexp, true);
                        }
                        return true;
                    }
                    if (onlySkipSpace(true, true) === true)
                    {
                        if (preprocessPrescanFor(35, 35))
                            onlyTransformArguments = 2;
                    }
                    else if (input.charCodeAt(tokPos) === 35 && input.charCodeAt(tokPos + 1) === 35)
                    {
                        onlyTransformArguments = 2;
                    }
                    preprocessParameterScope = macro && macro.parameterScope;
                    onlyTransformArguments--;
                }
            }
            if (!macro && (!onlyTransformArguments && !preprocessOnlyTransformArgumentsForLastToken || tokPos < inputLen) && options.preprocessIsMacro(word))
            {
                preprocessParameterScope = null;
                macro = options.preprocessGetMacro(word);
                if (macro)
                {
                    if (!preprocessStackLastItem || !preprocessStackLastItem.macro.isArgument)
                    {
                        var i = preprocessStack.length,
                            lastMacroItem;
                        while (i > 0)
                        {
                            var item = preprocessStack[--i],
                                macroItem = item.macro;
                            if (macroItem.identifier === word && !(lastMacroItem && lastMacroItem.isArgument))
                            {
                                macro = null;
                            }
                            lastMacroItem = macroItem;
                        }
                    }
                }
                else
                {
                    macro = preprocessBuiltinMacro(word);
                }
            }
            if (macro)
            {
                var macroStart = tokStart;
                var parameters;
                var hasParameters = macro.parameters;
                var nextIsParenL;
                if (hasParameters)
                {
                    var pos = tokPos;
                    var loc;
                    if (options.locations)
                        loc = new line_loc_t();
                    if (onlySkipSpace(true, true) === true && preprocessPrescanFor(40) || input.charCodeAt(tokPos) === 40)
                    {
                        nextIsParenL = true;
                    }
                    else
                    {
                        preprocessOverrideTokEndLoc = loc;
                        return pos;
                    }
                }
                if (!hasParameters || nextIsParenL)
                {
                    var macroString = macro.macro;
                    if (nextIsParenL)
                    {
                        var variadicName = macro.variadicName;
                        var first = true;
                        var noParams = 0;
                        parameters = Object.create(null);
                        onlySkipSpace(true);
                        if (input.charCodeAt(tokPos++) !== 40)
                            raise(tokPos - 1, "Expected '(' before macro prarameters");
                        onlySkipSpace(true, true, true);
                        var code = input.charCodeAt(tokPos++);
                        while (tokPos < inputLen && code !== 41)
                        {
                            if (first)
                                first = false;
                            else if (code === 44)
                            {
                                onlySkipSpace(true, true, true);
                                code = input.charCodeAt(tokPos++);
                            }
                            else
                                raise(tokPos - 1, "Expected ',' between macro parameters");
                            var ident = hasParameters[noParams++];
                            var variadicAndLastParameter = variadicName && hasParameters.length === noParams;
                            var paramStart = tokPos - 1,
                                parenLevel = 0;
                            var positionOffset = options.locations && new PositionOffset(tokCurLine, tokLineStart);
                            while (tokPos < inputLen && (parenLevel || code !== 41 && (code !== 44 || variadicAndLastParameter)))
                            {
                                if (code === 40)
                                    parenLevel++;
                                if (code === 41)
                                    parenLevel--;
                                if (code === 34 || code === 39)
                                {
                                    var quote = code;
                                    code = input.charCodeAt(tokPos++);
                                    while (tokPos < inputLen && code !== quote)
                                    {
                                        if (code === 92)
                                        {
                                            code = input.charCodeAt(tokPos++);
                                            if (code !== quote)
                                                continue;
                                        }
                                        code = input.charCodeAt(tokPos++);
                                    }
                                }
                                code = input.charCodeAt(tokPos++);
                            }
                            var val = input.slice(paramStart, tokPos - 1);
                            parameters[ident] = new Macro(ident, val, null, paramStart + tokMacroOffset, true, preTokParameterScope || preprocessStackLastItem, false, positionOffset);
                        }
                        if (code !== 41)
                            raise(tokPos, "Expected ')' after macro prarameters");
                        onlySkipSpace(true, true);
                    }
                    return readTokenFromMacro(macro, tokPosMacroOffset, parameters, oldParameterScope, tokPos, nextFinisher, onlyTransformArguments, forceRegexp);
                }
            }
        }
        function preprocessPrescanFor(first, second)
        {
            var i = preprocessStack.length;
            stackloop:             while (i-- > 0)
            {
                var stackItem = preprocessStack[i],
                    scanPos = stackItem.end,
                    scanInput = stackItem.input,
                    scanInputLen = stackItem.inputLen;
                for (; ; )
                {
                    var ch = scanInput.charCodeAt(scanPos);
                    if (ch === 32)
                    {
                        ++scanPos;
                    }
                    else if (ch === 13)
                    {
                        ++scanPos;
                        var next = scanInput.charCodeAt(scanPos);
                        if (next === 10)
                        {
                            ++scanPos;
                        }
                    }
                    else if (ch === 10)
                    {
                        ++scanPos;
                    }
                    else if (ch === 9)
                    {
                        ++scanPos;
                    }
                    else if (ch === 47)
                    {
                        var next = scanInput.charCodeAt(scanPos + 1);
                        if (next === 42)
                        {
                            var end = scanInput.indexOf("*/", scanPos += 2);
                            if (end === -1)
                                raise(scanPos - 2, "Unterminated comment");
                            scanPos = end + 2;
                        }
                        else if (next === 47)
                        {
                            ch = scanInput.charCodeAt(scanPos += 2);
                            while (scanPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233)
                            {
                                ++scanPos;
                                ch = scanInput.charCodeAt(scanPos);
                            }
                        }
                        else
                            break stackloop;
                    }
                    else if (ch === 160 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
                    {
                        ++scanPos;
                    }
                    else if (scanPos >= scanInputLen)
                    {
                        continue stackloop;
                    }
                    else if (ch === 92)
                    {
                        var pos = scanPos + 1;
                        ch = scanInput.charCodeAt(pos);
                        while (pos < scanInputLen && (ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespaceNoNewLine.test(String.fromCharCode(ch))))
                            ch = scanInput.charCodeAt(++pos);
                        lineBreak.lastIndex = 0;
                        var match = lineBreak.exec(scanInput.slice(pos, pos + 2));
                        if (match && match.index === 0)
                        {
                            scanPos = pos + match[0].length;
                        }
                        else
                        {
                            break stackloop;
                        }
                    }
                    else
                    {
                        break stackloop;
                    }
                }
            }
            return scanInput && scanInput.charCodeAt(scanPos) === first && (second == null || scanInput.charCodeAt(scanPos + 1) === second);
        }
        function readTokenFromMacro(macro, macroOffset, parameters, parameterScope, end, nextFinisher, onlyTransformArguments, forceRegexp)
        {
            var macroString = macro.macro;
            if (!macroString && nextFinisher === preprocessNext)
                macroString = "1";
            if (macroString)
            {
                pushMacroToStack(macro, macroString, macroOffset, parameters, parameterScope, end, onlyTransformArguments);
            }
            else if (preConcatenating)
            {
                (nextFinisher === next ? finishToken : preprocessFinishToken)(_name, "");
                return true;
            }
            onlySkipSpace();
            nextFinisher(true, onlyTransformArguments, forceRegexp, true);
            return true;
        }
        function pushMacroToStack(macro, macroString, macroOffset, parameters, parameterScope, end, onlyTransformArguments, isIncludeFile)
        {
            preprocessStackLastItem = {macro: macro, macroOffset: macroOffset, parameterDict: parameters, end: end, lastEnd: localLastEnd, inputLen: inputLen, tokStart: tokStart, onlyTransformArgumentsForLastToken: preprocessOnlyTransformArgumentsForLastToken, currentLine: tokCurLine, currentLineStart: tokLineStart, sourceFile: sourceFile};
            if (parameterScope)
                preprocessStackLastItem.parameterScope = parameterScope;
            if (isIncludeFile)
                preprocessStackLastItem.isIncludeFile = isIncludeFile;
            preprocessStackLastItem.input = input;
            preprocessStack.push(preprocessStackLastItem);
            preprocessOnlyTransformArgumentsForLastToken = onlyTransformArguments;
            input = macroString;
            inputLen = macroString.length;
            tokPosMacroOffset = macro.start;
            tokPos = 0;
            tokCurLine = 1;
            tokLineStart = 0;
            firstTokEnd = 0;
            localLastEnd = 0;
            if (macro.sourceFile)
                sourceFile = macro.sourceFile;
        }
        var Macro = exports.Macro =         function Macro(ident, macro, parameters, start, isArgument, parameterScope, variadicName, locationOffset, aSourceFile)
        {
            this.identifier = ident;
            if (macro != null)
                this.macro = macro;
            if (parameters)
                this.parameters = parameters;
            if (start != null)
                this.start = start;
            if (isArgument)
                this.isArgument = true;
            if (parameterScope)
                this.parameterScope = parameterScope;
            if (variadicName)
                this.variadicName = variadicName;
            if (locationOffset)
                this.locationOffset = locationOffset;
            if (aSourceFile)
                this.sourceFile = aSourceFile;
        };
        Macro.prototype.isParameterFunction =         function()
        {
            return this.isParameterFunctionVar || (this.isParameterFunctionVar = makePredicate((this.parameters || []).join(" ")));
        };
        function next(stealth, onlyTransformArguments, forceRegexp)
        {
            if (!stealth)
            {
                lastStart = tokStart;
                lastEnd = tokEnd;
                lastEndInput = tokInput;
                lastEndOfFile = firstEndOfFile;
                lastEndLoc = tokEndLoc;
                lastTokMacroOffset = tokMacroOffset;
            }
            localLastEnd = firstTokEnd;
            firstEndOfFile = nodeMessageSendObjectExpression = null;
            return readToken(forceRegexp, onlyTransformArguments, stealth);
        }
        function setStrict(strct)
        {
            strict = strct;
            tokPos = lastEnd;
            while (tokPos < tokLineStart)
            {
                tokLineStart = input.lastIndexOf("\n", tokLineStart - 2) + 1;
                --tokCurLine;
            }
            skipSpace();
            readToken();
        }
        function node_t()
        {
            this.type = null;
            this.start = tokStart + tokMacroOffset;
            this.end = null;
        }
        function node_loc_t()
        {
            this.start = tokStartLoc;
            this.end = null;
            if (sourceFile != null)
                this.source = sourceFile;
        }
        function startNode()
        {
            var node = new node_t();
            if (options.trackComments && tokCommentsBefore)
            {
                node.commentsBefore = tokCommentsBefore;
                tokCommentsBefore = null;
            }
            if (options.trackSpaces && tokSpacesBefore)
            {
                node.spacesBefore = tokSpacesBefore;
                tokSpacesBefore = null;
            }
            if (options.locations)
                node.loc = new node_loc_t();
            if (options.ranges)
                node.range = [tokStart, 0];
            return node;
        }
        function startNodeFrom(other)
        {
            var node = new node_t();
            node.start = other.start;
            if (other.commentsBefore)
            {
                node.commentsBefore = other.commentsBefore;
                delete other.commentsBefore;
            }
            if (other.spacesBefore)
            {
                node.spacesBefore = other.spacesBefore;
                delete other.spacesBefore;
            }
            if (options.locations)
            {
                node.loc = new node_loc_t();
                node.loc.start = other.loc.start;
            }
            if (options.ranges)
                node.range = [other.range[0], 0];
            return node;
        }
        var lastFinishedNode;
        function finishNode(node, type)
        {
            var nodeEnd = lastEnd + lastTokMacroOffset;
            node.type = type;
            node.end = nodeEnd;
            if (options.trackComments)
            {
                if (lastTokCommentsAfter)
                {
                    node.commentsAfter = lastTokCommentsAfter;
                    lastTokCommentsAfter = null;
                }
                else if (lastFinishedNode && lastFinishedNode.end === lastEnd && lastFinishedNode.commentsAfter)
                {
                    node.commentsAfter = lastFinishedNode.commentsAfter;
                    delete lastFinishedNode.commentsAfter;
                }
                if (!options.trackSpaces)
                    lastFinishedNode = node;
            }
            if (options.trackSpaces)
            {
                if (lastTokSpacesAfter)
                {
                    node.spacesAfter = lastTokSpacesAfter;
                    lastTokSpacesAfter = null;
                }
                else if (lastFinishedNode && lastFinishedNode.end === lastEnd && lastFinishedNode.spacesAfter)
                {
                    node.spacesAfter = lastFinishedNode.spacesAfter;
                    delete lastFinishedNode.spacesAfter;
                }
                lastFinishedNode = node;
            }
            if (options.locations)
                node.loc.end = lastEndLoc;
            if (options.ranges)
                node.range[1] = nodeEnd;
            return node;
        }
        function isUseStrict(stmt)
        {
            return options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
        }
        function eat(type)
        {
            if (tokType === type)
            {
                next();
                return true;
            }
        }
        function canInsertSemicolon()
        {
            return !options.strictSemicolons && (tokType === _eof || tokType === _braceR || newline.test(lastEndInput.slice(lastEnd, lastEndOfFile || tokFirstStart)) || nodeMessageSendObjectExpression && options.objj || lastEndOfFile != null);
        }
        function semicolon()
        {
            if (!eat(_semi) && !canInsertSemicolon())
                raise(tokStart, "Expected a semicolon");
        }
        function expect(type, errorMessage)
        {
            if (tokType === type)
                next();
            else
                errorMessage ? raise(tokStart, errorMessage) : unexpected();
        }
        function unexpected()
        {
            raise(tokStart, "Unexpected token");
        }
        function checkLVal(expr)
        {
            if (expr.type !== "Identifier" && expr.type !== "MemberExpression" && expr.type !== "Dereference")
                raise(expr.start, "Assigning to rvalue");
            if (strict && expr.type === "Identifier" && isStrictBadIdWord(expr.name))
                raise(expr.start, "Assigning to " + expr.name + " in strict mode");
        }
        function parseTopLevel(program)
        {
            lastStart = localLastEnd = lastEnd = 0;
            if (options.preprocess)
            {
                var preIncludeFiles = options.preIncludeFiles;
                if (preIncludeFiles && preIncludeFiles.length)
                    for (var i = preIncludeFiles.length - 1; i >= 0; i--)
                    {
                        var preIncludeFile = preIncludeFiles[i];
                        var preIncludeMacro = new Macro(null, preIncludeFile.include, null, 0, false, null, false, null, preIncludeFile.sourceFile);
                        pushMacroToStack(preIncludeMacro, preIncludeMacro.macro, 0, null, null, tokPos, null, true);
                        skipSpace();
                    }
            }
            if (options.locations)
                lastEndLoc = new line_loc_t();
            inFunction = strict = null;
            labels = [];
            readToken();
            var node = program || startNode(),
                first = true;
            if (!program)
                node.body = [];
            while (tokType !== _eof)
            {
                var stmt = parseStatement();
                node.body.push(stmt);
                if (first && isUseStrict(stmt))
                    setStrict(true);
                first = false;
            }
            return finishNode(node, "Program");
        }
        var loopLabel = {kind: "loop"},
            switchLabel = {kind: "switch"};
        function parseStatement()
        {
            if (tokType === _slash || tokType === _assign && tokVal == "/=")
                readToken(true);
            var starttype = tokType,
                node = startNode();
            if (nodeMessageSendObjectExpression)
            {
                node.expression = parseMessageSendExpression(nodeMessageSendObjectExpression, nodeMessageSendObjectExpression.object);
                semicolon();
                return finishNode(node, "ExpressionStatement");
            }
            switch(starttype) {
                case _break:
                case _continue:
                    next();
                    var isBreak = starttype === _break;
                    if (eat(_semi) || canInsertSemicolon())
                        node.label = null;
                    else if (tokType !== _name)
                        unexpected();
                    else
                    {
                        node.label = parseIdent();
                        semicolon();
                    }
                    for (var i = 0; i < labels.length; ++i)
                    {
                        var lab = labels[i];
                        if (node.label == null || lab.name === node.label.name)
                        {
                            if (lab.kind != null && (isBreak || lab.kind === "loop"))
                                break;
                            if (node.label && isBreak)
                                break;
                        }
                    }
                    if (i === labels.length)
                        raise(node.start, "Unsyntactic " + starttype.keyword);
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
                    if (tokType === _semi)
                        return parseFor(node, null);
                    if (tokType === _var)
                    {
                        var init = startNode();
                        next();
                        parseVar(init, true);
                        if (init.declarations.length === 1 && eat(_in))
                            return parseForIn(node, init);
                        return parseFor(node, init);
                    }
                    var init = parseExpression(false, true);
                    if (eat(_in))
                    {
                        checkLVal(init);
                        return parseForIn(node, init);
                    }
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
                    if (!inFunction)
                        raise(tokStart, "'return' outside of function");
                    next();
                    if (eat(_semi) || canInsertSemicolon())
                        node.argument = null;
                    else
                    {
                        node.argument = parseExpression();
                        semicolon();
                    }
                    return finishNode(node, "ReturnStatement");
                case _switch:
                    next();
                    node.discriminant = parseParenExpression();
                    node.cases = [];
                    expect(_braceL, "Expected '{' in switch statement");
                    labels.push(switchLabel);
                    for (var cur, sawDefault; tokType != _braceR; )
                    {
                        if (tokType === _case || tokType === _default)
                        {
                            var isCase = tokType === _case;
                            if (cur)
                                finishNode(cur, "SwitchCase");
                            node.cases.push(cur = startNode());
                            cur.consequent = [];
                            next();
                            if (isCase)
                                cur.test = parseExpression();
                            else
                            {
                                if (sawDefault)
                                    raise(lastStart, "Multiple default clauses");
                                sawDefault = true;
                                cur.test = null;
                            }
                            expect(_colon, "Expected ':' after case clause");
                        }
                        else
                        {
                            if (!cur)
                                unexpected();
                            cur.consequent.push(parseStatement());
                        }
                    }
                    if (cur)
                        finishNode(cur, "SwitchCase");
                    next();
                    labels.pop();
                    return finishNode(node, "SwitchStatement");
                case _throw:
                    next();
                    if (newline.test(tokInput.slice(lastEnd, tokStart)))
                        raise(lastEnd, "Illegal newline after throw");
                    node.argument = parseExpression();
                    semicolon();
                    return finishNode(node, "ThrowStatement");
                case _try:
                    next();
                    node.block = parseBlock();
                    node.handler = null;
                    if (tokType === _catch)
                    {
                        var clause = startNode();
                        next();
                        expect(_parenL, "Expected '(' after 'catch'");
                        clause.param = parseIdent();
                        if (strict && isStrictBadIdWord(clause.param.name))
                            raise(clause.param.start, "Binding " + clause.param.name + " in strict mode");
                        expect(_parenR, "Expected closing ')' after catch");
                        clause.guard = null;
                        clause.body = parseBlock();
                        node.handler = finishNode(clause, "CatchClause");
                    }
                    node.guardedHandlers = empty;
                    node.finalizer = eat(_finally) ? parseBlock() : null;
                    if (!node.handler && !node.finalizer)
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
                    if (strict)
                        raise(tokStart, "'with' in strict mode");
                    next();
                    node.object = parseParenExpression();
                    node.body = parseStatement();
                    return finishNode(node, "WithStatement");
                case _braceL:
                    return parseBlock();
                case _semi:
                    next();
                    return finishNode(node, "EmptyStatement");
                case _interface:
                    if (options.objj)
                    {
                        next();
                        node.classname = parseIdent(true);
                        if (eat(_colon))
                            node.superclassname = parseIdent(true);
                        else if (eat(_parenL))
                        {
                            node.categoryname = parseIdent(true);
                            expect(_parenR, "Expected closing ')' after category name");
                        }
                        if (tokVal === '<')
                        {
                            next();
                            var protocols = [],
                                first = true;
                            node.protocols = protocols;
                            while (tokVal !== '>')
                            {
                                if (!first)
                                    expect(_comma, "Expected ',' between protocol names");
                                else
                                    first = false;
                                protocols.push(parseIdent(true));
                            }
                            next();
                        }
                        if (eat(_braceL))
                        {
                            node.ivardeclarations = [];
                            for (; ; )
                            {
                                if (eat(_braceR))
                                    break;
                                parseIvarDeclaration(node);
                            }
                            node.endOfIvars = tokStart;
                        }
                        node.body = [];
                        while (!eat(_end))
                        {
                            if (tokType === _eof)
                                raise(tokPos, "Expected '@end' after '@interface'");
                            node.body.push(parseClassElement());
                        }
                        return finishNode(node, "InterfaceDeclarationStatement");
                    }
                    break;
                case _implementation:
                    if (options.objj)
                    {
                        next();
                        node.classname = parseIdent(true);
                        if (eat(_colon))
                            node.superclassname = parseIdent(true);
                        else if (eat(_parenL))
                        {
                            node.categoryname = parseIdent(true);
                            expect(_parenR, "Expected closing ')' after category name");
                        }
                        if (tokVal === '<')
                        {
                            next();
                            var protocols = [],
                                first = true;
                            node.protocols = protocols;
                            while (tokVal !== '>')
                            {
                                if (!first)
                                    expect(_comma, "Expected ',' between protocol names");
                                else
                                    first = false;
                                protocols.push(parseIdent(true));
                            }
                            next();
                        }
                        if (eat(_braceL))
                        {
                            node.ivardeclarations = [];
                            for (; ; )
                            {
                                if (eat(_braceR))
                                    break;
                                parseIvarDeclaration(node);
                            }
                            node.endOfIvars = tokStart;
                        }
                        node.body = [];
                        while (!eat(_end))
                        {
                            if (tokType === _eof)
                                raise(tokPos, "Expected '@end' after '@implementation'");
                            node.body.push(parseClassElement());
                        }
                        return finishNode(node, "ClassDeclarationStatement");
                    }
                    break;
                case _protocol:
                    if (options.objj && input.charCodeAt(tokPos) !== 40)
                    {
                        next();
                        node.protocolname = parseIdent(true);
                        if (tokVal === '<')
                        {
                            next();
                            var protocols = [],
                                first = true;
                            node.protocols = protocols;
                            while (tokVal !== '>')
                            {
                                if (!first)
                                    expect(_comma, "Expected ',' between protocol names");
                                else
                                    first = false;
                                protocols.push(parseIdent(true));
                            }
                            next();
                        }
                        while (!eat(_end))
                        {
                            if (tokType === _eof)
                                raise(tokPos, "Expected '@end' after '@protocol'");
                            if (eat(_required))
                                continue;
                            if (eat(_optional))
                            {
                                while (!eat(_required) && tokType !== _end)
                                {
                                    (node.optional || (node.optional = [])).push(parseProtocolClassElement());
                                }
                            }
                            else
                            {
                                (node.required || (node.required = [])).push(parseProtocolClassElement());
                            }
                        }
                        return finishNode(node, "ProtocolDeclarationStatement");
                    }
                    break;
                case _import:
                    if (options.objj)
                    {
                        next();
                        if (tokType === _string)
                            node.localfilepath = true;
                        else if (tokType === _filename)
                            node.localfilepath = false;
                        else
                            unexpected();
                        node.filename = parseStringNumRegExpLiteral();
                        return finishNode(node, "ImportStatement");
                    }
                    break;
                case _preprocess:
                    if (options.objj)
                    {
                        next();
                        return finishNode(node, "PreprocessStatement");
                    }
                    break;
                case _class:
                    if (options.objj)
                    {
                        next();
                        node.id = parseIdent(false);
                        return finishNode(node, "ClassStatement");
                    }
                    break;
                case _global:
                    if (options.objj)
                    {
                        next();
                        node.id = parseIdent(false);
                        return finishNode(node, "GlobalStatement");
                    }
                    break;
                case _typedef:
                    if (options.objj)
                    {
                        next();
                        node.typedefname = parseIdent(true);
                        return finishNode(node, "TypeDefStatement");
                    }
                    break;
            }
            var maybeName = tokVal,
                expr = parseExpression();
            if (starttype === _name && expr.type === "Identifier" && eat(_colon))
            {
                for (var i = 0; i < labels.length; ++i)
                    if (labels[i].name === maybeName)
                        raise(expr.start, "Label '" + maybeName + "' is already declared");
                var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
                labels.push({name: maybeName, kind: kind});
                node.body = parseStatement();
                labels.pop();
                node.label = expr;
                return finishNode(node, "LabeledStatement");
            }
            else
            {
                node.expression = expr;
                semicolon();
                return finishNode(node, "ExpressionStatement");
            }
        }
        function parseIvarDeclaration(node)
        {
            var outlet;
            if (eat(_outlet))
                outlet = true;
            var type = parseObjectiveJType();
            if (strict && isStrictBadIdWord(type.name))
                raise(type.start, "Binding " + type.name + " in strict mode");
            for (; ; )
            {
                var decl = startNode();
                if (outlet)
                    decl.outlet = outlet;
                decl.ivartype = type;
                decl.id = parseIdent();
                if (strict && isStrictBadIdWord(decl.id.name))
                    raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
                if (eat(_accessors))
                {
                    decl.accessors = {};
                    if (eat(_parenL))
                    {
                        if (!eat(_parenR))
                        {
                            for (; ; )
                            {
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
                                        setter.name += ":";
                                        break;
                                    case "readwrite":
                                    case "readonly":
                                    case "copy":
                                        decl.accessors[config.name] = true;
                                        break;
default:
                                        raise(config.start, "Unknown accessors attribute '" + config.name + "'");
                                }
                                if (!eat(_comma))
                                    break;
                            }
                            expect(_parenR, "Expected closing ')' after accessor attributes");
                        }
                    }
                }
                finishNode(decl, "IvarDeclaration");
                node.ivardeclarations.push(decl);
                if (!eat(_comma))
                    break;
            }
            semicolon();
        }
        function parseMethodDeclaration(node)
        {
            node.methodtype = tokVal;
            expect(_plusmin, "Method declaration must start with '+' or '-'");
            if (eat(_parenL))
            {
                var typeNode = startNode();
                if (eat(_action))
                {
                    node.action = finishNode(typeNode, "ObjectiveJActionType");
                    typeNode = startNode();
                }
                if (!eat(_parenR))
                {
                    node.returntype = parseObjectiveJType(typeNode);
                    expect(_parenR, "Expected closing ')' after method return type");
                }
            }
            var first = true,
                selectors = [],
                args = [];
            node.selectors = selectors;
            node.arguments = args;
            for (; ; )
            {
                if (tokType !== _colon)
                {
                    selectors.push(parseIdent(true));
                    if (first && tokType !== _colon)
                        break;
                }
                else
                    selectors.push(null);
                expect(_colon, "Expected ':' in selector");
                var argument = {};
                args.push(argument);
                if (eat(_parenL))
                {
                    argument.type = parseObjectiveJType();
                    expect(_parenR, "Expected closing ')' after method argument type");
                }
                argument.identifier = parseIdent(false);
                if (tokType === _braceL || tokType === _semi)
                    break;
                if (eat(_comma))
                {
                    expect(_dotdotdot, "Expected '...' after ',' in method declaration");
                    node.parameters = true;
                    break;
                }
                first = false;
            }
        }
        function parseClassElement()
        {
            var element = startNode();
            if (tokVal === '+' || tokVal === '-')
            {
                parseMethodDeclaration(element);
                eat(_semi);
                element.startOfBody = lastEnd;
                var oldInFunc = inFunction,
                    oldLabels = labels;
                inFunction = true;
                labels = [];
                element.body = parseBlock(true);
                inFunction = oldInFunc;
                labels = oldLabels;
                return finishNode(element, "MethodDeclarationStatement");
            }
            else
                return parseStatement();
        }
        function parseProtocolClassElement()
        {
            var element = startNode();
            parseMethodDeclaration(element);
            semicolon();
            return finishNode(element, "MethodDeclarationStatement");
        }
        function parseParenExpression()
        {
            expect(_parenL, "Expected '(' before expression");
            var val = parseExpression();
            expect(_parenR, "Expected closing ')' after expression");
            return val;
        }
        function parseBlock(allowStrict)
        {
            var node = startNode(),
                first = true,
                strict = false,
                oldStrict;
            node.body = [];
            expect(_braceL, "Expected '{' before block");
            while (!eat(_braceR))
            {
                var stmt = parseStatement();
                node.body.push(stmt);
                if (first && allowStrict && isUseStrict(stmt))
                {
                    oldStrict = strict;
                    setStrict(strict = true);
                }
                first = false;
            }
            if (strict && !oldStrict)
                setStrict(false);
            return finishNode(node, "BlockStatement");
        }
        function parseFor(node, init)
        {
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
        function parseForIn(node, init)
        {
            node.left = init;
            node.right = parseExpression();
            expect(_parenR, "Expected closing ')' in for statement");
            node.body = parseStatement();
            labels.pop();
            return finishNode(node, "ForInStatement");
        }
        function parseVar(node, noIn)
        {
            node.declarations = [];
            node.kind = "var";
            for (; ; )
            {
                var decl = startNode();
                decl.id = parseIdent();
                if (strict && isStrictBadIdWord(decl.id.name))
                    raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
                decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
                node.declarations.push(finishNode(decl, "VariableDeclarator"));
                if (!eat(_comma))
                    break;
            }
            return finishNode(node, "VariableDeclaration");
        }
        function parseExpression(noComma, noIn)
        {
            var expr = parseMaybeAssign(noIn);
            if (!noComma && tokType === _comma)
            {
                var node = startNodeFrom(expr);
                node.expressions = [expr];
                while (eat(_comma))
                    node.expressions.push(parseMaybeAssign(noIn));
                return finishNode(node, "SequenceExpression");
            }
            return expr;
        }
        function parseMaybeAssign(noIn)
        {
            var left = parseMaybeConditional(noIn);
            if (tokType.isAssign)
            {
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
        function parseMaybeConditional(noIn)
        {
            var expr = parseExprOps(noIn);
            if (eat(_question))
            {
                var node = startNodeFrom(expr);
                node.test = expr;
                node.consequent = parseExpression(true);
                expect(_colon, "Expected ':' in conditional expression");
                node.alternate = parseExpression(true, noIn);
                return finishNode(node, "ConditionalExpression");
            }
            return expr;
        }
        function parseExprOps(noIn)
        {
            return parseExprOp(parseMaybeUnary(), -1, noIn);
        }
        function parseExprOp(left, minPrec, noIn)
        {
            var prec = tokType.binop;
            if (prec != null && (!noIn || tokType !== _in))
            {
                if (prec > minPrec)
                {
                    var node = startNodeFrom(left);
                    node.left = left;
                    node.operator = tokVal;
                    next();
                    node.right = parseExprOp(parseMaybeUnary(), prec, noIn);
                    var node = finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
                    return parseExprOp(node, minPrec, noIn);
                }
            }
            return left;
        }
        function parseMaybeUnary()
        {
            if (tokType.prefix)
            {
                var node = startNode(),
                    update = tokType.isUpdate;
                node.operator = tokVal;
                node.prefix = true;
                tokRegexpAllowed = true;
                next();
                node.argument = parseMaybeUnary();
                if (update)
                    checkLVal(node.argument);
                else if (strict && node.operator === "delete" && node.argument.type === "Identifier")
                    raise(node.start, "Deleting local variable in strict mode");
                return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
            }
            var expr = parseExprSubscripts();
            while (tokType.postfix && !canInsertSemicolon())
            {
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
        function parseExprSubscripts()
        {
            return parseSubscripts(parseExprAtom());
        }
        function parseSubscripts(base, noCalls)
        {
            if (eat(_dot))
            {
                var node = startNodeFrom(base);
                node.object = base;
                node.property = parseIdent(true);
                node.computed = false;
                return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
            }
            else
            {
                if (options.objj)
                    var messageSendNode = startNode();
                if (eat(_bracketL))
                {
                    var expr = parseExpression();
                    if (options.objj && tokType !== _bracketR)
                    {
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
                }
                else if (!noCalls && eat(_parenL))
                {
                    var node = startNodeFrom(base);
                    node.callee = base;
                    node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
                    return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
                }
            }
            return base;
        }
        function parseExprAtom()
        {
            switch(tokType) {
                case _this:
                    var node = startNode();
                    next();
                    return finishNode(node, "ThisExpression");
                case _name:
                    return parseIdent();
                case _num:
                case _string:
                case _regexp:
                    return parseStringNumRegExpLiteral();
                case _null:
                case _true:
                case _false:
                    var node = startNode();
                    node.value = tokType.atomValue;
                    node.raw = tokType.keyword;
                    next();
                    return finishNode(node, "Literal");
                case _parenL:
                    var tokStartLoc1 = tokStartLoc,
                        macroOffset = tokMacroOffset,
                        tokStart1 = tokStart + macroOffset;
                    next();
                    var val = parseExpression();
                    val.start = tokStart1;
                    val.end = tokEnd + macroOffset;
                    if (options.locations)
                    {
                        val.loc.start = tokStartLoc1;
                        val.loc.end = tokEndLoc;
                    }
                    if (options.ranges)
                        val.range = [tokStart1, tokEnd + lastTokMacroOffset];
                    expect(_parenR, "Expected closing ')' in expression");
                    return val;
                case _arrayLiteral:
                    var node = startNode(),
                        firstExpr = null;
                    next();
                    expect(_bracketL, "Expected '[' at beginning of array literal");
                    if (tokType !== _bracketR)
                        firstExpr = parseExpression(true, true);
                    node.elements = parseExprList(_bracketR, firstExpr, true, true);
                    return finishNode(node, "ArrayLiteral");
                case _bracketL:
                    var node = startNode(),
                        firstExpr = null;
                    next();
                    if (tokType !== _comma && tokType !== _bracketR)
                    {
                        firstExpr = parseExpression(true, true);
                        if (tokType !== _comma && tokType !== _bracketR)
                            return parseMessageSendExpression(node, firstExpr);
                    }
                    node.elements = parseExprList(_bracketR, firstExpr, true, true);
                    return finishNode(node, "ArrayExpression");
                case _dictionaryLiteral:
                    var node = startNode();
                    next();
                    var r = parseDictionary();
                    node.keys = r[0];
                    node.values = r[1];
                    return finishNode(node, "DictionaryLiteral");
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
                case _protocol:
                    var node = startNode();
                    next();
                    expect(_parenL, "Expected '(' after '@protocol'");
                    node.id = parseIdent(true);
                    expect(_parenR, "Expected closing ')' after protocol name");
                    return finishNode(node, "ProtocolLiteralExpression");
                case _ref:
                    var node = startNode();
                    next();
                    expect(_parenL, "Expected '(' after '@ref'");
                    node.element = parseIdent(node, _parenR);
                    expect(_parenR, "Expected closing ')' after ref");
                    return finishNode(node, "Reference");
                case _deref:
                    var node = startNode();
                    next();
                    expect(_parenL, "Expected '(' after '@deref'");
                    node.expr = parseExpression(true, true);
                    expect(_parenR, "Expected closing ')' after deref");
                    return finishNode(node, "Dereference");
default:
                    if (tokType.okAsIdent)
                        return parseIdent();
                    unexpected();
            }
        }
        function parseMessageSendExpression(node, firstExpr)
        {
            parseSelectorWithArguments(node, _bracketR);
            if (firstExpr.type === "Identifier" && firstExpr.name === "super")
                node.superObject = true;
            else
                node.object = firstExpr;
            return finishNode(node, "MessageSendExpression");
        }
        function parseSelector(node, close)
        {
            var first = true,
                selectors = [];
            for (; ; )
            {
                if (tokType !== _colon)
                {
                    selectors.push((parseIdent(true)).name);
                    if (first && tokType === close)
                        break;
                }
                expect(_colon, "Expected ':' in selector");
                selectors.push(":");
                if (tokType === close)
                    break;
                first = false;
            }
            node.selector = selectors.join("");
        }
        function parseSelectorWithArguments(node, close)
        {
            var first = true,
                selectors = [],
                args = [],
                parameters = [];
            node.selectors = selectors;
            node.arguments = args;
            for (; ; )
            {
                if (tokType !== _colon)
                {
                    selectors.push(parseIdent(true));
                    if (first && eat(close))
                        break;
                }
                else
                {
                    selectors.push(null);
                }
                expect(_colon, "Expected ':' in selector");
                args.push(parseExpression(true, true));
                if (eat(close))
                    break;
                if (tokType === _comma)
                {
                    node.parameters = [];
                    while (eat(_comma))
                    {
                        node.parameters.push(parseExpression(true, true));
                    }
                    eat(close);
                    break;
                }
                first = false;
            }
        }
        function parseNew()
        {
            var node = startNode();
            next();
            node.callee = parseSubscripts(parseExprAtom(false), true);
            if (eat(_parenL))
                node.arguments = parseExprList(_parenR, tokType === _parenR ? null : parseExpression(true), false);
            else
                node.arguments = empty;
            return finishNode(node, "NewExpression");
        }
        function parseObj()
        {
            var node = startNode(),
                first = true,
                sawGetSet = false;
            node.properties = [];
            next();
            while (!eat(_braceR))
            {
                if (!first)
                {
                    expect(_comma, "Expected ',' in object literal");
                    if (options.allowTrailingCommas && eat(_braceR))
                        break;
                }
                else
                    first = false;
                var prop = {key: parsePropertyName()},
                    isGetSet = false,
                    kind;
                if (eat(_colon))
                {
                    prop.value = parseExpression(true);
                    kind = prop.kind = "init";
                }
                else if (options.ecmaVersion >= 5 && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set"))
                {
                    isGetSet = sawGetSet = true;
                    kind = prop.kind = prop.key.name;
                    prop.key = parsePropertyName();
                    if (tokType !== _parenL)
                        unexpected();
                    prop.value = parseFunction(startNode(), false);
                }
                else
                    unexpected();
                if (prop.key.type === "Identifier" && (strict || sawGetSet))
                {
                    for (var i = 0; i < node.properties.length; ++i)
                    {
                        var other = node.properties[i];
                        if (other.key.name === prop.key.name)
                        {
                            var conflict = kind == other.kind || isGetSet && other.kind === "init" || kind === "init" && (other.kind === "get" || other.kind === "set");
                            if (conflict && !strict && kind === "init" && other.kind === "init")
                                conflict = false;
                            if (conflict)
                                raise(prop.key.start, "Redefinition of property");
                        }
                    }
                }
                node.properties.push(prop);
            }
            return finishNode(node, "ObjectExpression");
        }
        function parsePropertyName()
        {
            if (tokType === _num || tokType === _string)
                return parseExprAtom();
            return parseIdent(true);
        }
        function parseFunction(node, isStatement)
        {
            if (tokType === _name)
                node.id = parseIdent();
            else if (isStatement)
                unexpected();
            else
                node.id = null;
            node.params = [];
            var first = true;
            expect(_parenL, "Expected '(' before function parameters");
            while (!eat(_parenR))
            {
                if (!first)
                    expect(_comma, "Expected ',' between function parameters");
                else
                    first = false;
                node.params.push(parseIdent());
            }
            var oldInFunc = inFunction,
                oldLabels = labels;
            inFunction = true;
            labels = [];
            node.body = parseBlock(true);
            inFunction = oldInFunc;
            labels = oldLabels;
            if (strict || node.body.body.length && isUseStrict(node.body.body[0]))
            {
                for (var i = node.id ? -1 : 0; i < node.params.length; ++i)
                {
                    var id = i < 0 ? node.id : node.params[i];
                    if (isStrictReservedWord(id.name) || isStrictBadIdWord(id.name))
                        raise(id.start, "Defining '" + id.name + "' in strict mode");
                    if (i >= 0)
                        for (var j = 0; j < i; ++j)
                            if (id.name === node.params[j].name)
                                raise(id.start, "Argument name clash in strict mode");
                }
            }
            return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
        }
        function parseExprList(close, firstExpr, allowTrailingComma, allowEmpty)
        {
            if (firstExpr && eat(close))
                return [firstExpr];
            var elts = [],
                first = true;
            while (!eat(close))
            {
                if (first)
                {
                    first = false;
                    if (allowEmpty && tokType === _comma && !firstExpr)
                        elts.push(null);
                    else
                        elts.push(firstExpr);
                }
                else
                {
                    expect(_comma, "Expected ',' between expressions");
                    if (allowTrailingComma && options.allowTrailingCommas && eat(close))
                        break;
                    if (allowEmpty && tokType === _comma)
                        elts.push(null);
                    else
                        elts.push(parseExpression(true));
                }
            }
            return elts;
        }
        function parseDictionary()
        {
            expect(_braceL, "Expected '{' before dictionary");
            var keys = [],
                values = [],
                first = true;
            while (!eat(_braceR))
            {
                if (!first)
                {
                    expect(_comma, "Expected ',' between expressions");
                    if (options.allowTrailingCommas && eat(_braceR))
                        break;
                }
                keys.push(parseExpression(true, true));
                expect(_colon, "Expected ':' between dictionary key and value");
                values.push(parseExpression(true, true));
                first = false;
            }
            return [keys, values];
        }
        function parseIdent(liberal)
        {
            var node = startNode();
            node.name = tokType === _name ? tokVal : (liberal && !options.forbidReserved || tokType.okAsIdent) && tokType.keyword || unexpected();
            tokRegexpAllowed = false;
            next();
            return finishNode(node, "Identifier");
        }
        function parseStringNumRegExpLiteral()
        {
            var node = startNode();
            node.value = tokVal;
            node.raw = tokInput.slice(tokStart, tokEnd);
            next();
            return finishNode(node, "Literal");
        }
        function parseObjectiveJType(startFrom)
        {
            var node = startFrom ? startNodeFrom(startFrom) : startNode(),
                allowProtocol = false;
            if (tokType === _name)
            {
                node.name = tokVal;
                node.typeisclass = true;
                allowProtocol = true;
                next();
            }
            else
            {
                node.typeisclass = false;
                node.name = tokType.keyword;
                if (!eat(_void))
                {
                    if (eat(_id))
                    {
                        allowProtocol = true;
                    }
                    else
                    {
                        var nextKeyWord;
                        if (eat(_float) || eat(_boolean) || eat(_SEL) || eat(_double))
                        {
                            nextKeyWord = tokType.keyword;
                        }
                        else
                        {
                            if (eat(_signed) || eat(_unsigned))
                                nextKeyWord = tokType.keyword || true;
                            if (eat(_char) || eat(_byte) || eat(_short))
                            {
                                if (nextKeyWord)
                                    node.name += " " + nextKeyWord;
                                nextKeyWord = tokType.keyword || true;
                            }
                            else
                            {
                                if (eat(_int))
                                {
                                    if (nextKeyWord)
                                        node.name += " " + nextKeyWord;
                                    nextKeyWord = tokType.keyword || true;
                                }
                                if (eat(_long))
                                {
                                    if (nextKeyWord)
                                        node.name += " " + nextKeyWord;
                                    nextKeyWord = tokType.keyword || true;
                                    if (eat(_long))
                                    {
                                        node.name += " " + nextKeyWord;
                                    }
                                }
                            }
                            if (!nextKeyWord)
                            {
                                node.name = !options.forbidReserved && tokType.keyword || unexpected();
                                node.typeisclass = true;
                                allowProtocol = true;
                                next();
                            }
                        }
                    }
                }
            }
            if (allowProtocol)
            {
                if (tokVal === '<')
                {
                    var first = true,
                        protocols = [];
                    node.protocols = protocols;
                    do
                    {
                        next();
                        if (first)
                            first = false;
                        else
                            eat(_comma);
                        protocols.push(parseIdent(true));
                    }
                    while (tokVal !== '>');
                                        next();
                }
            }
            return finishNode(node, "ObjectiveJType");
        }
    })(exports.acorn || (exports.acorn = {}), exports.acorn.walk || (exports.acorn.walk = typeof acorn !== 'undefined' && acorn.walk) || (exports.acorn.walk = {}));
    if (!exports.acorn)
    {
        exports.acorn = {};
        exports.acorn.walk = {};
    }    (    function(exports)
    {
        "use strict";
        exports.simple =         function(node, visitors, base, state)
        {
            if (!base)
                base = exports;
            function c(node, st, override)
            {
                var type = override || node.type,
                    found = visitors[type];
                if (found)
                    found(node, st);
                base[type](node, st, c);
            }
            c(node, state);
        };
        exports.recursive =         function(node, state, funcs, base)
        {
            var visitor = exports.make(funcs, base);
            function c(node, st, override)
            {
                return visitor[override || node.type](node, st, c);
            }
            return c(node, state);
        };
        exports.make =         function(funcs, base)
        {
            if (!base)
                base = exports;
            var visitor = {};
            for (var type in base)
                visitor[type] = base[type];
            for (var type in funcs)
                visitor[type] = funcs[type];
            return visitor;
        };
        function skipThrough(node, st, c)
        {
            c(node, st);
        }
        function ignore(node, st, c)
        {
        }
        exports.Program = exports.BlockStatement =         function(node, st, c)
        {
            for (var i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, "Statement");
            }        };
        exports.Statement = skipThrough;
        exports.EmptyStatement = ignore;
        exports.ExpressionStatement =         function(node, st, c)
        {
            c(node.expression, st, "Expression");
        };
        exports.IfStatement =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.consequent, st, "Statement");
            if (node.alternate)
                c(node.alternate, st, "Statement");
        };
        exports.LabeledStatement =         function(node, st, c)
        {
            c(node.body, st, "Statement");
        };
        exports.BreakStatement = exports.ContinueStatement = ignore;
        exports.WithStatement =         function(node, st, c)
        {
            c(node.object, st, "Expression");
            c(node.body, st, "Statement");
        };
        exports.SwitchStatement =         function(node, st, c)
        {
            c(node.discriminant, st, "Expression");
            for (var i = 0; i < node.cases.length; ++i)
            {
                var cs = node.cases[i];
                if (cs.test)
                    c(cs.test, st, "Expression");
                for (var j = 0; j < cs.consequent.length; ++j)
                    c(cs.consequent[j], st, "Statement");
            }        };
        exports.ReturnStatement =         function(node, st, c)
        {
            if (node.argument)
                c(node.argument, st, "Expression");
        };
        exports.ThrowStatement =         function(node, st, c)
        {
            c(node.argument, st, "Expression");
        };
        exports.TryStatement =         function(node, st, c)
        {
            c(node.block, st, "Statement");
            if (node.handler)
                c(node.handler.body, st, "ScopeBody");
            if (node.finalizer)
                c(node.finalizer, st, "Statement");
        };
        exports.WhileStatement =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.body, st, "Statement");
        };
        exports.DoWhileStatement =         function(node, st, c)
        {
            c(node.body, st, "Statement");
            c(node.test, st, "Expression");
        };
        exports.ForStatement =         function(node, st, c)
        {
            if (node.init)
                c(node.init, st, "ForInit");
            if (node.test)
                c(node.test, st, "Expression");
            if (node.update)
                c(node.update, st, "Expression");
            c(node.body, st, "Statement");
        };
        exports.ForInStatement =         function(node, st, c)
        {
            c(node.left, st, "ForInit");
            c(node.right, st, "Expression");
            c(node.body, st, "Statement");
        };
        exports.ForInit =         function(node, st, c)
        {
            if (node.type == "VariableDeclaration")
                c(node, st);
            else
                c(node, st, "Expression");
        };
        exports.DebuggerStatement = ignore;
        exports.FunctionDeclaration =         function(node, st, c)
        {
            c(node, st, "Function");
        };
        exports.VariableDeclaration =         function(node, st, c)
        {
            for (var i = 0; i < node.declarations.length; ++i)
            {
                var decl = node.declarations[i];
                if (decl.init)
                    c(decl.init, st, "Expression");
            }        };
        exports.Function =         function(node, st, c)
        {
            c(node.body, st, "ScopeBody");
        };
        exports.ScopeBody =         function(node, st, c)
        {
            c(node, st, "Statement");
        };
        exports.Expression = skipThrough;
        exports.ThisExpression = ignore;
        exports.ArrayExpression = exports.ArrayLiteral =         function(node, st, c)
        {
            for (var i = 0; i < node.elements.length; ++i)
            {
                var elt = node.elements[i];
                if (elt)
                    c(elt, st, "Expression");
            }        };
        exports.DictionaryLiteral =         function(node, st, c)
        {
            for (var i = 0; i < node.keys.length; i++)
            {
                var key = node.keys[i];
                c(key, st, "Expression");
                var value = node.values[i];
                c(value, st, "Expression");
            }        };
        exports.ObjectExpression =         function(node, st, c)
        {
            for (var i = 0; i < node.properties.length; ++i)
                c(node.properties[i].value, st, "Expression");
        };
        exports.FunctionExpression = exports.FunctionDeclaration;
        exports.SequenceExpression =         function(node, st, c)
        {
            for (var i = 0; i < node.expressions.length; ++i)
                c(node.expressions[i], st, "Expression");
        };
        exports.UnaryExpression = exports.UpdateExpression =         function(node, st, c)
        {
            c(node.argument, st, "Expression");
        };
        exports.BinaryExpression = exports.AssignmentExpression = exports.LogicalExpression =         function(node, st, c)
        {
            c(node.left, st, "Expression");
            c(node.right, st, "Expression");
        };
        exports.ConditionalExpression =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.consequent, st, "Expression");
            c(node.alternate, st, "Expression");
        };
        exports.NewExpression = exports.CallExpression =         function(node, st, c)
        {
            c(node.callee, st, "Expression");
            if (node.arguments)
                for (var i = 0; i < node.arguments.length; ++i)
                    c(node.arguments[i], st, "Expression");
        };
        exports.MemberExpression =         function(node, st, c)
        {
            c(node.object, st, "Expression");
            if (node.computed)
                c(node.property, st, "Expression");
        };
        exports.Identifier = exports.Literal = ignore;
        exports.ClassDeclarationStatement =         function(node, st, c)
        {
            if (node.ivardeclarations)
                for (var i = 0; i < node.ivardeclarations.length; ++i)
                {
                    c(node.ivardeclarations[i], st, "IvarDeclaration");
                }            for (var i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, "Statement");
            }        };
        exports.ImportStatement = ignore;
        exports.IvarDeclaration = ignore;
        exports.PreprocessStatement = ignore;
        exports.ClassStatement = ignore;
        exports.GlobalStatement = ignore;
        exports.ProtocolDeclarationStatement =         function(node, st, c)
        {
            if (node.required)
                for (var i = 0; i < node.required.length; ++i)
                {
                    c(node.required[i], st, "Statement");
                }            if (node.optional)
                for (var i = 0; i < node.optional.length; ++i)
                {
                    c(node.optional[i], st, "Statement");
                }        };
        exports.TypeDefStatement = ignore;
        exports.MethodDeclarationStatement =         function(node, st, c)
        {
            var body = node.body;
            if (body)
                c(body, st, "Statement");
        };
        exports.MessageSendExpression =         function(node, st, c)
        {
            if (!node.superObject)
                c(node.object, st, "Expression");
            if (node.arguments)
                for (var i = 0; i < node.arguments.length; ++i)
                    c(node.arguments[i], st, "Expression");
            if (node.parameters)
                for (var i = 0; i < node.parameters.length; ++i)
                    c(node.parameters[i], st, "Expression");
        };
        exports.SelectorLiteralExpression = ignore;
        exports.ProtocolLiteralExpression = ignore;
        exports.Reference =         function(node, st, c)
        {
            c(node.element, st, "Identifier");
        };
        exports.Dereference =         function(node, st, c)
        {
            c(node.expr, st, "Expression");
        };
        function makeScope(prev)
        {
            return {vars: Object.create(null), prev: prev};
        }
        exports.scopeVisitor = exports.make({Function:         function(node, scope, c)
        {
            var inner = makeScope(scope);
            for (var i = 0; i < node.params.length; ++i)
                inner.vars[node.params[i].name] = {type: "argument", node: node.params[i]};
            if (node.id)
            {
                var decl = node.type == "FunctionDeclaration";
                (decl ? scope : inner).vars[node.id.name] = {type: decl ? "function" : "function name", node: node.id};
            }            c(node.body, inner, "ScopeBody");
        }, TryStatement:         function(node, scope, c)
        {
            c(node.block, scope, "Statement");
            if (node.handler)
            {
                var inner = makeScope(scope);
                inner.vars[node.handler.param.name] = {type: "catch clause", node: node.handler.param};
                c(node.handler.body, inner, "ScopeBody");
            }            if (node.finalizer)
                c(node.finalizer, scope, "Statement");
        }, VariableDeclaration:         function(node, scope, c)
        {
            for (var i = 0; i < node.declarations.length; ++i)
            {
                var decl = node.declarations[i];
                scope.vars[decl.id.name] = {type: "var", node: decl.id};
                if (decl.init)
                    c(decl.init, scope, "Expression");
            }        }});
    })(typeof exports == "undefined" ? acorn.walk = {} : exports.acorn.walk);
    (    function(mod)
    {
        mod(exports.ObjJCompiler || (exports.ObjJCompiler = {}), exports.acorn || acorn, (exports.acorn || acorn).walk, typeof exports.sourceMap != "undefined" ? exports.sourceMap : typeof module != "undefined" && typeof module.exports === "object" ? module.exports : null);
    })(    function(exports, acorn, walk, sourceMap)
    {
        "use strict";
        exports.version = "0.3.7";
        var Scope =         function(prev, base)
        {
            this.vars = Object.create(null);
            if (base)
                for (var key in base)
                    this[key] = base[key];
            this.prev = prev;
            if (prev)
            {
                this.compiler = prev.compiler;
                this.nodeStack = prev.nodeStack.slice(0);
                this.nodePriorStack = prev.nodePriorStack.slice(0);
                this.nodeStackOverrideType = prev.nodeStackOverrideType.slice(0);
            }            else
            {
                this.nodeStack = [];
                this.nodePriorStack = [];
                this.nodeStackOverrideType = [];
            }        };
        Scope.prototype.toString =         function()
        {
            return this.ivars ? "ivars: " + JSON.stringify(this.ivars) : "<No ivars>";
        };
        Scope.prototype.compiler =         function()
        {
            return this.compiler;
        };
        Scope.prototype.rootScope =         function()
        {
            return this.prev ? this.prev.rootScope() : this;
        };
        Scope.prototype.isRootScope =         function()
        {
            return !this.prev;
        };
        Scope.prototype.currentClassName =         function()
        {
            return this.classDef ? this.classDef.name : this.prev ? this.prev.currentClassName() : null;
        };
        Scope.prototype.currentProtocolName =         function()
        {
            return this.protocolDef ? this.protocolDef.name : this.prev ? this.prev.currentProtocolName() : null;
        };
        Scope.prototype.getIvarForCurrentClass =         function(ivarName)
        {
            if (this.ivars)
            {
                var ivar = this.ivars[ivarName];
                if (ivar)
                    return ivar;
            }            var prev = this.prev;
            if (prev && !this.classDef)
                return prev.getIvarForCurrentClass(ivarName);
            return null;
        };
        Scope.prototype.getLvar =         function(lvarName, stopAtMethod)
        {
            if (this.vars)
            {
                var lvar = this.vars[lvarName];
                if (lvar)
                    return lvar;
            }            var prev = this.prev;
            if (prev && (!stopAtMethod || !this.methodType))
                return prev.getLvar(lvarName, stopAtMethod);
            return null;
        };
        Scope.prototype.currentMethodType =         function()
        {
            return this.methodType ? this.methodType : this.prev ? this.prev.currentMethodType() : null;
        };
        Scope.prototype.copyAddedSelfToIvarsToParent =         function()
        {
            if (this.prev && this.addedSelfToIvars)
                for (var key in this.addedSelfToIvars)
                {
                    var addedSelfToIvar = this.addedSelfToIvars[key],
                        scopeAddedSelfToIvar = (this.prev.addedSelfToIvars || (this.prev.addedSelfToIvars = Object.create(null)))[key] || (this.prev.addedSelfToIvars[key] = []);
                    scopeAddedSelfToIvar.push.apply(scopeAddedSelfToIvar, addedSelfToIvar);
                }        };
        Scope.prototype.addMaybeWarning =         function(warning)
        {
            var rootScope = this.rootScope(),
                maybeWarnings = rootScope._maybeWarnings;
            if (!maybeWarnings)
                rootScope._maybeWarnings = maybeWarnings = [warning];
            else
            {
                var lastWarning = maybeWarnings[maybeWarnings.length - 1];
                if (!lastWarning.isEqualTo(warning))
                    maybeWarnings.push(warning);
            }        };
        Scope.prototype.maybeWarnings =         function()
        {
            return (this.rootScope())._maybeWarnings;
        };
        Scope.prototype.pushNode =         function(node, overrideType)
        {
            var nodePriorStack = this.nodePriorStack,
                length = nodePriorStack.length,
                lastPriorList = length ? nodePriorStack[length - 1] : null,
                lastNode = length ? this.nodeStack[length - 1] : null;
            if (lastPriorList)
            {
                if (lastNode !== node)
                {
                    lastPriorList.push(node);
                }            }            nodePriorStack.push(lastNode === node ? lastPriorList : []);
            this.nodeStack.push(node);
            this.nodeStackOverrideType.push(overrideType);
        };
        Scope.prototype.popNode =         function()
        {
            this.nodeStackOverrideType.pop();
            this.nodePriorStack.pop();
            return this.nodeStack.pop();
        };
        Scope.prototype.currentNode =         function()
        {
            var nodeStack = this.nodeStack;
            return nodeStack[nodeStack.length - 1];
        };
        Scope.prototype.currentOverrideType =         function()
        {
            var nodeStackOverrideType = this.nodeStackOverrideType;
            return nodeStackOverrideType[nodeStackOverrideType.length - 1];
        };
        Scope.prototype.priorNode =         function()
        {
            var nodePriorStack = this.nodePriorStack,
                length = nodePriorStack.length;
            if (length > 1)
            {
                var parent = nodePriorStack[length - 2],
                    l = parent.length;
                return parent[l - 2] || null;
            }            return null;
        };
        Scope.prototype.formatDescription =         function(index, formatDescription, useOverrideForNode)
        {
            var nodeStack = this.nodeStack,
                length = nodeStack.length;
            index = index || 0;
            if (index >= length)
                return null;
            var i = length - index - 1;
            var currentNode = nodeStack[i];
            var currentFormatDescription = formatDescription || this.compiler.formatDescription;
            var parentFormatDescriptions = formatDescription ? formatDescription.parent : currentFormatDescription;
            var nextFormatDescription;
            if (parentFormatDescriptions)
            {
                var nodeType = useOverrideForNode === currentNode ? this.nodeStackOverrideType[i] : currentNode.type;
                nextFormatDescription = parentFormatDescriptions[nodeType];
                if (useOverrideForNode === currentNode && !nextFormatDescription)
                {
                    return null;
                }            }            if (nextFormatDescription)
            {
                return this.formatDescription(index + 1, nextFormatDescription);
            }            else
            {
                nextFormatDescription = this.formatDescription(index + 1, formatDescription, currentNode);
                if (nextFormatDescription)
                    return nextFormatDescription;
                else
                {
                    var priorFormatDescriptions = currentFormatDescription.prior;
                    if (priorFormatDescriptions)
                    {
                        var priorNode = this.priorNode(),
                            priorFormatDescription = priorFormatDescriptions[priorNode ? priorNode.type : "None"];
                        if (priorFormatDescription)
                            return priorFormatDescription;
                    }                    return currentFormatDescription;
                }            }        };
        var GlobalVariableMaybeWarning =         function(aMessage, node, code)
        {
            this.message = createMessage(aMessage, node, code);
            this.node = node;
        };
        GlobalVariableMaybeWarning.prototype.checkIfWarning =         function(st)
        {
            var identifier = this.node.name;
            return !st.getLvar(identifier) && typeof global[identifier] === "undefined" && (typeof window === 'undefined' || typeof window[identifier] === "undefined") && !st.compiler.getClassDef(identifier);
        };
        GlobalVariableMaybeWarning.prototype.isEqualTo =         function(aWarning)
        {
            if (this.message.message !== aWarning.message.message)
                return false;
            if (this.node.start !== aWarning.node.start)
                return false;
            if (this.node.end !== aWarning.node.end)
                return false;
            return true;
        };
        function StringBuffer(useSourceNode, file, sourceContent)
        {
            if (useSourceNode)
            {
                this.rootNode = new sourceMap.SourceNode();
                this.concat = this.concatSourceNode;
                this.toString = this.toStringSourceNode;
                this.isEmpty = this.isEmptySourceNode;
                this.appendStringBuffer = this.appendStringBufferSourceNode;
                this.length = this.lengthSourceNode;
                if (file)
                {
                    var fileString = file.toString(),
                        filename = fileString.substr(fileString.lastIndexOf('/') + 1),
                        sourceRoot = fileString.substr(0, fileString.lastIndexOf('/') + 1);
                    this.filename = filename;
                    if (sourceRoot.length > 0)
                        this.sourceRoot = sourceRoot;
                    if (sourceContent != null)
                        this.rootNode.setSourceContent(filename, sourceContent);
                }
                if (sourceContent != null)
                    this.sourceContent = sourceContent;
            }
            else
            {
                this.atoms = [];
                this.concat = this.concatString;
                this.toString = this.toStringString;
                this.isEmpty = this.isEmptyString;
                this.appendStringBuffer = this.appendStringBufferString;
                this.length = this.lengthString;
            }
        }
        StringBuffer.prototype.toStringString =         function()
        {
            return this.atoms.join("");
        };
        StringBuffer.prototype.toStringSourceNode =         function()
        {
            return this.rootNode.toStringWithSourceMap({file: this.filename + "s", sourceRoot: this.sourceRoot});
        };
        StringBuffer.prototype.concatString =         function(aString)
        {
            this.atoms.push(aString);
        };
        StringBuffer.prototype.concatSourceNode =         function(aString, node, originalName)
        {
            if (node)
            {
                this.rootNode.add(new sourceMap.SourceNode(node.loc.start.line, node.loc.start.column, node.loc.source, aString, originalName));
            }            else
                this.rootNode.add(aString);
            if (!this.notEmpty)
                this.notEmpty = true;
        };
        StringBuffer.prototype.concatFormat =         function(aString)
        {
            if (!aString)
                return;
            var lines = aString.split("\n"),
                size = lines.length;
            if (size > 1)
            {
                this.concat(lines[0]);
                for (var i = 1; i < size; i++)
                {
                    var line = lines[i];
                    this.concat("\n");
                    if (line.slice(0, 1) === "\\")
                    {
                        var numberLength = 1;
                        var indent = line.slice(1, 1 + numberLength);
                        if (indent === '-')
                        {
                            numberLength = 2;
                            indent = line.slice(1, 1 + numberLength);
                        }                        var indentationNumber = parseInt(indent);
                        if (indentationNumber)
                        {
                            this.concat(indentationNumber > 0 ? indentation + (Array(indentationNumber * indentationSpaces + 1)).join(indentType) : indentation.substring(indentationSize * -indentationNumber));
                        }                        line = line.slice(1 + numberLength);
                    }                    else if (line || i === size - 1)
                    {
                        this.concat(indentation);
                    }                    if (line)
                        this.concat(line);
                }            }            else
                this.concat(aString);
        };
        StringBuffer.prototype.isEmptyString =         function()
        {
            return this.atoms.length !== 0;
        };
        StringBuffer.prototype.isEmptySourceNode =         function()
        {
            return this.notEmpty;
        };
        StringBuffer.prototype.appendStringBufferString =         function(stringBuffer)
        {
            this.atoms.push.apply(this.atoms, stringBuffer.atoms);
        };
        StringBuffer.prototype.appendStringBufferSourceNode =         function(stringBuffer)
        {
            this.rootNode.add(stringBuffer.rootNode);
        };
        StringBuffer.prototype.lengthString =         function()
        {
            return this.atoms.length;
        };
        StringBuffer.prototype.lengthSourceNode =         function()
        {
            return this.rootNode.children.length;
        };
        var ClassDef =         function(isImplementationDeclaration, name, superClass, ivars, instanceMethods, classMethods, protocols)
        {
            this.name = name;
            if (superClass)
                this.superClass = superClass;
            if (ivars)
                this.ivars = ivars;
            if (isImplementationDeclaration)
            {
                this.instanceMethods = instanceMethods || Object.create(null);
                this.classMethods = classMethods || Object.create(null);
            }            if (protocols)
                this.protocols = protocols;
        };
        ClassDef.prototype.addInstanceMethod =         function(methodDef)
        {
            this.instanceMethods[methodDef.name] = methodDef;
        };
        ClassDef.prototype.addClassMethod =         function(methodDef)
        {
            this.classMethods[methodDef.name] = methodDef;
        };
        ClassDef.prototype.listOfNotImplementedMethodsForProtocols =         function(protocolDefs)
        {
            var resultList = [],
                instanceMethods = this.getInstanceMethods(),
                classMethods = this.getClassMethods();
            for (var i = 0, size = protocolDefs.length; i < size; i++)
            {
                var protocolDef = protocolDefs[i],
                    protocolInstanceMethods = protocolDef.requiredInstanceMethods,
                    protocolClassMethods = protocolDef.requiredClassMethods,
                    inheritFromProtocols = protocolDef.protocols;
                if (protocolInstanceMethods)
                    for (var methodName in protocolInstanceMethods)
                    {
                        var methodDef = protocolInstanceMethods[methodName];
                        if (!instanceMethods[methodName])
                            resultList.push({"methodDef": methodDef, "protocolDef": protocolDef});
                    }                if (protocolClassMethods)
                    for (var methodName in protocolClassMethods)
                    {
                        var methodDef = protocolClassMethods[methodName];
                        if (!classMethods[methodName])
                            resultList.push({"methodDef": methodDef, "protocolDef": protocolDef});
                    }                if (inheritFromProtocols)
                    resultList = resultList.concat(this.listOfNotImplementedMethodsForProtocols(inheritFromProtocols));
            }            return resultList;
        };
        ClassDef.prototype.getInstanceMethod =         function(name)
        {
            var instanceMethods = this.instanceMethods;
            if (instanceMethods)
            {
                var method = instanceMethods[name];
                if (method)
                    return method;
            }            var superClass = this.superClass;
            if (superClass)
                return superClass.getInstanceMethod(name);
            return null;
        };
        ClassDef.prototype.getClassMethod =         function(name)
        {
            var classMethods = this.classMethods;
            if (classMethods)
            {
                var method = classMethods[name];
                if (method)
                    return method;
            }            var superClass = this.superClass;
            if (superClass)
                return superClass.getClassMethod(name);
            return null;
        };
        ClassDef.prototype.getInstanceMethods =         function()
        {
            var instanceMethods = this.instanceMethods;
            if (instanceMethods)
            {
                var superClass = this.superClass,
                    returnObject = Object.create(null);
                if (superClass)
                {
                    var superClassMethods = superClass.getInstanceMethods();
                    for (var methodName in superClassMethods)
                        returnObject[methodName] = superClassMethods[methodName];
                }                for (var methodName in instanceMethods)
                    returnObject[methodName] = instanceMethods[methodName];
                return returnObject;
            }            return [];
        };
        ClassDef.prototype.getClassMethods =         function()
        {
            var classMethods = this.classMethods;
            if (classMethods)
            {
                var superClass = this.superClass,
                    returnObject = Object.create(null);
                if (superClass)
                {
                    var superClassMethods = superClass.getClassMethods();
                    for (var methodName in superClassMethods)
                        returnObject[methodName] = superClassMethods[methodName];
                }                for (var methodName in classMethods)
                    returnObject[methodName] = classMethods[methodName];
                return returnObject;
            }            return [];
        };
        var ProtocolDef =         function(name, protocols, requiredInstanceMethodDefs, requiredClassMethodDefs)
        {
            this.name = name;
            this.protocols = protocols;
            if (requiredInstanceMethodDefs)
                this.requiredInstanceMethods = requiredInstanceMethodDefs;
            if (requiredClassMethodDefs)
                this.requiredClassMethods = requiredClassMethodDefs;
        };
        ProtocolDef.prototype.addInstanceMethod =         function(methodDef)
        {
            (this.requiredInstanceMethods || (this.requiredInstanceMethods = Object.create(null)))[methodDef.name] = methodDef;
        };
        ProtocolDef.prototype.addClassMethod =         function(methodDef)
        {
            (this.requiredClassMethods || (this.requiredClassMethods = Object.create(null)))[methodDef.name] = methodDef;
        };
        ProtocolDef.prototype.getInstanceMethod =         function(name)
        {
            var instanceMethods = this.requiredInstanceMethods;
            if (instanceMethods)
            {
                var method = instanceMethods[name];
                if (method)
                    return method;
            }            var protocols = this.protocols;
            for (var i = 0, size = protocols.length; i < size; i++)
            {
                var protocol = protocols[i],
                    method = protocol.getInstanceMethod(name);
                if (method)
                    return method;
            }            return null;
        };
        ProtocolDef.prototype.getClassMethod =         function(name)
        {
            var classMethods = this.requiredClassMethods;
            if (classMethods)
            {
                var method = classMethods[name];
                if (method)
                    return method;
            }            var protocols = this.protocols;
            for (var i = 0, size = protocols.length; i < size; i++)
            {
                var protocol = protocols[i],
                    method = protocol.getClassMethod(name);
                if (method)
                    return method;
            }            return null;
        };
        var TypeDef =         function(name)
        {
            this.name = name;
        };
        var MethodDef =         function(name, types)
        {
            this.name = name;
            this.types = types;
        };
        var reservedIdentifiers = acorn.makePredicate("self _cmd undefined localStorage arguments");
        var wordPrefixOperators = acorn.makePredicate("delete in instanceof new typeof void");
        var isLogicalBinary = acorn.makePredicate("LogicalExpression BinaryExpression");
        var isInInstanceof = acorn.makePredicate("in instanceof");
        var defaultOptions = {acornOptions:         function()
        {
            return Object.create(null);
        }, sourceMap: false, sourceMapIncludeSource: false, pass: 2, classDefs:         function()
        {
            return Object.create(null);
        }, protocolDefs:         function()
        {
            return Object.create(null);
        }, typeDefs:         function()
        {
            return Object.create(null);
        }, generate: true, generateObjJ: false, formatDescription: null, indentationSpaces: 4, indentationType: " ", includeComments: false, transformNamedFunctionDeclarationToAssignment: false, includeMethodFunctionNames: true, includeMethodArgumentTypeSignatures: true, includeIvarTypeSignatures: true, inlineMsgSendFunctions: true, macros: null};
        function setupOptions(opts)
        {
            var options = Object.create(null);
            for (var opt in defaultOptions)
            {
                if (opts && Object.prototype.hasOwnProperty.call(opts, opt))
                {
                    var incomingOpt = opts[opt];
                    options[opt] = typeof incomingOpt === 'function' ? incomingOpt() : incomingOpt;
                }
                else if (defaultOptions.hasOwnProperty(opt))
                {
                    var defaultOpt = defaultOptions[opt];
                    options[opt] = typeof defaultOpt === 'function' ? defaultOpt() : defaultOpt;
                }
            }
            return options;
        }
        var ObjJAcornCompiler =         function(aString, aURL, options)
        {
            this.source = aString;
            this.URL = aURL && aURL.toString();
            options = setupOptions(options);
            this.options = options;
            this.pass = options.pass;
            this.classDefs = options.classDefs;
            this.protocolDefs = options.protocolDefs;
            this.typeDefs = options.typeDefs;
            this.generate = options.generate;
            this.createSourceMap = options.sourceMap;
            this.formatDescription = options.formatDescription;
            this.includeComments = options.includeComments;
            this.transformNamedFunctionDeclarationToAssignment = options.transformNamedFunctionDeclarationToAssignment;
            this.jsBuffer = new StringBuffer(this.createSourceMap, aURL, options.sourceMap && options.sourceMapIncludeSource ? this.source : null);
            this.imBuffer = null;
            this.cmBuffer = null;
            this.dependencies = [];
            this.warningsAndErrors = [];
            this.lastPos = 0;
            var acornOptions = options.acornOptions;
            if (acornOptions)
            {
                if (this.URL)
                    acornOptions.sourceFile = this.URL.substr(this.URL.lastIndexOf('/') + 1);
                if (options.sourceMap && !acornOptions.locations)
                    acornOptions.locations = true;
            }            else
            {
                acornOptions = options.acornOptions = this.URL && {sourceFile: this.URL.substr(this.URL.lastIndexOf('/') + 1)};
                if (options.sourceMap)
                    acornOptions.locations = true;
            }            if (options.macros)
            {
                if (acornOptions.macros)
                    acornOptions.macros.concat(options.macros);
                else
                    acornOptions.macros = options.macros;
            }            try {
                this.tokens = acorn.parse(aString, options.acornOptions);
                (this.pass === 2 && (options.includeComments || options.formatDescription) ? compileWithFormat : compile)(this.tokens, new Scope(null, {compiler: this}), this.pass === 2 ? pass2 : pass1);
            }
            catch(e) {
                if (e.lineStart != null)
                {
                    e.messageForLine = aString.substring(e.lineStart, e.lineEnd);
                }
                this.addWarning(e);
                return;
            }
            this.setCompiledCode(this.jsBuffer);
        };
        ObjJAcornCompiler.prototype.setCompiledCode =         function(stringBuffer)
        {
            if (this.createSourceMap)
            {
                var s = stringBuffer.toString();
                this.compiledCode = s.code;
                this.sourceMap = s.map;
            }            else
            {
                this.compiledCode = stringBuffer.toString();
            }        };
        exports.compileToExecutable =         function(aString, aURL, options)
        {
            exports.currentCompileFile = aURL;
            return (new ObjJAcornCompiler(aString, aURL, options)).executable();
        };
        exports.compileToIMBuffer =         function(aString, aURL, options)
        {
            return (new ObjJAcornCompiler(aString, aURL, options)).IMBuffer();
        };
        exports.compile =         function(aString, aURL, options)
        {
            return new ObjJAcornCompiler(aString, aURL, options);
        };
        exports.compileFileDependencies =         function(aString, aURL, options)
        {
            exports.currentCompileFile = aURL;
            (options || (options = {})).pass = 1;
            return new ObjJAcornCompiler(aString, aURL, options);
        };
        exports.numberOfLinesAtTopOfFunction =         function()
        {
            var f = new Function("x", "return x;");
            var fString = f.toString();
            var index = fString.indexOf("return x;");
            var firstPart = fString.substring(0, index);
            var numberOfLines = (firstPart.match(/\n/g) || []).length;
            ObjJAcornCompiler.numberOfLinesAtTopOfFunction =             function()
            {
                return numberOfLines;
            };
            return numberOfLines;
        };
        ObjJAcornCompiler.prototype.compilePass2 =         function()
        {
            var options = this.options;
            exports.currentCompileFile = this.URL;
            this.pass = options.pass = 2;
            this.jsBuffer = new StringBuffer(this.createSourceMap, this.URL, options.sourceMap && options.sourceMapIncludeSource ? this.source : null);
            if (this.createSourceMap)
                this.jsBuffer.concat("\n\n");
            this.warningsAndErrors = [];
            try {
                compile(this.tokens, new Scope(null, {compiler: this}), pass2);
            }
            catch(e) {
                this.addWarning(e);
                return null;
            }
            this.setCompiledCode(this.jsBuffer);
            return this.compiledCode;
        };
        ObjJAcornCompiler.prototype.addWarning =         function(aWarning)
        {
            if (aWarning.path == null)
                aWarning.path = this.URL;
            this.warningsAndErrors.push(aWarning);
        };
        ObjJAcornCompiler.prototype.getIvarForClass =         function(ivarName, scope)
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
                }                c = c.superClass;
            }        };
        ObjJAcornCompiler.prototype.getClassDef =         function(aClassName)
        {
            if (!aClassName)
                return null;
            var c = this.classDefs[aClassName];
            if (c)
                return c;
            if (typeof objj_getClass === 'function')
            {
                var aClass = objj_getClass(aClassName);
                if (aClass)
                {
                    var ivars = class_copyIvarList(aClass),
                        ivarSize = ivars.length,
                        myIvars = Object.create(null),
                        protocols = class_copyProtocolList(aClass),
                        protocolSize = protocols.length,
                        myProtocols = Object.create(null),
                        instanceMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(class_copyMethodList(aClass)),
                        classMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(class_copyMethodList(aClass.isa)),
                        superClass = class_getSuperclass(aClass);
                    for (var i = 0; i < ivarSize; i++)
                    {
                        var ivar = ivars[i];
                        myIvars[ivar.name] = {"type": ivar.type, "name": ivar.name};
                    }                    for (var i = 0; i < protocolSize; i++)
                    {
                        var protocol = protocols[i],
                            protocolName = protocol_getName(protocol),
                            protocolDef = this.getProtocolDef(protocolName);
                        myProtocols[protocolName] = protocolDef;
                    }                    c = new ClassDef(true, aClassName, superClass ? this.getClassDef(superClass.name) : null, myIvars, instanceMethodDefs, classMethodDefs, myProtocols);
                    this.classDefs[aClassName] = c;
                    return c;
                }            }            return null;
        };
        ObjJAcornCompiler.prototype.getProtocolDef =         function(aProtocolName)
        {
            if (!aProtocolName)
                return null;
            var p = this.protocolDefs[aProtocolName];
            if (p)
                return p;
            if (typeof objj_getProtocol === 'function')
            {
                var aProtocol = objj_getProtocol(aProtocolName);
                if (aProtocol)
                {
                    var protocolName = protocol_getName(aProtocol),
                        requiredInstanceMethods = protocol_copyMethodDescriptionList(aProtocol, true, true),
                        requiredInstanceMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(requiredInstanceMethods),
                        requiredClassMethods = protocol_copyMethodDescriptionList(aProtocol, true, false),
                        requiredClassMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(requiredClassMethods),
                        protocols = aProtocol.protocols,
                        inheritFromProtocols = [];
                    if (protocols)
                        for (var i = 0, size = protocols.length; i < size; i++)
                            inheritFromProtocols.push(compiler.getProtocolDef(protocols[i].name));
                    p = new ProtocolDef(protocolName, inheritFromProtocols, requiredInstanceMethodDefs, requiredClassMethodDefs);
                    this.protocolDefs[aProtocolName] = p;
                    return p;
                }            }            return null;
        };
        ObjJAcornCompiler.prototype.getTypeDef =         function(aTypeDefName)
        {
            if (!aTypeDefName)
                return null;
            var t = this.typeDefs[aTypeDefName];
            if (t)
                return t;
            if (typeof objj_getTypeDef === 'function')
            {
                var aTypeDef = objj_getTypeDef(aTypeDefName);
                if (aTypeDef)
                {
                    var typeDefName = typeDef_getName(aTypeDef);
                    t = new TypeDef(typeDefName);
                    this.typeDefs[typeDefName] = t;
                    return t;
                }            }            return null;
        };
        exports.parseGccCompilerFlags =         function(compilerFlags)
        {
            var args = (compilerFlags || "").split(" "),
                count = args.length,
                objjcFlags = {};
            for (var index = 0; index < count; ++index)
            {
                var argument = args[index];
                if (argument.indexOf("-g") === 0)
                    objjcFlags.includeMethodFunctionNames = true;
                else if (argument.indexOf("-O") === 0)
                {
                    objjcFlags.compress = true;
                    if (argument.length > 2)
                        objjcFlags.inlineMsgSendFunctions = true;
                }                else if (argument.indexOf("-T") === 0)
                {
                    objjcFlags.includeIvarTypeSignatures = false;
                    objjcFlags.includeMethodArgumentTypeSignatures = false;
                }                else if (argument.indexOf("-S") === 0)
                {
                    objjcFlags.sourceMap = true;
                    objjcFlags.sourceMapIncludeSource = true;
                }                else if (argument.indexOf("--include") === 0)
                {
                    var includeUrl = args[++index],
                        firstChar = includeUrl && includeUrl.charCodeAt(0);
                    if (firstChar === 34 || firstChar === 39)
                        includeUrl = includeUrl.substring(1, includeUrl.length - 1);
                    (objjcFlags.includeFiles || (objjcFlags.includeFiles = [])).push(includeUrl);
                }                else if (argument.indexOf("--inline-msg-send") === 0)
                {
                    objjcFlags.inlineMsgSendFunctions = true;
                }                else if (argument.indexOf("-D") === 0)
                {
                    var macroDefinition = argument.substring(2);
                    (objjcFlags.macros || (objjcFlags.macros = [])).push(macroDefinition);
                }            }            return objjcFlags;
        };
        ObjJAcornCompiler.methodDefsFromMethodList =         function(methodList)
        {
            var methodSize = methodList.length,
                myMethods = Object.create(null);
            for (var i = 0; i < methodSize; i++)
            {
                var method = methodList[i],
                    methodName = method_getName(method);
                myMethods[methodName] = new MethodDef(methodName, method.types);
            }            return myMethods;
        };
        ObjJAcornCompiler.prototype.executable =         function()
        {
            if (!this._executable)
                this._executable = new Executable(this.jsBuffer ? this.jsBuffer.toString() : null, this.dependencies, this.URL, null, this);
            return this._executable;
        };
        ObjJAcornCompiler.prototype.IMBuffer =         function()
        {
            return this.imBuffer;
        };
        ObjJAcornCompiler.prototype.code =         function()
        {
            return this.compiledCode;
        };
        ObjJAcornCompiler.prototype.ast =         function()
        {
            return JSON.stringify(this.tokens, null, indentationSpaces);
        };
        ObjJAcornCompiler.prototype.map =         function()
        {
            return JSON.stringify(this.sourceMap);
        };
        ObjJAcornCompiler.prototype.prettifyMessage =         function(aMessage)
        {
            var line = aMessage.messageForLine,
                message = "\n" + (line || "");
            message += (new Array((aMessage.messageOnColumn || 0) + 1)).join(" ");
            if (line)
                message += (new Array(Math.min(1, line.length || 1) + 1)).join("^") + "\n";
            message += aMessage.messageType + " line " + aMessage.messageOnLine + " in " + this.URL + ": " + aMessage.message;
            return message;
        };
        ObjJAcornCompiler.prototype.error_message =         function(errorMessage, node)
        {
            var pos = acorn.getLineInfo(this.source, node.start),
                syntaxError = new SyntaxError(errorMessage);
            syntaxError.messageOnLine = pos.line;
            syntaxError.messageOnColumn = pos.column;
            syntaxError.path = this.URL;
            syntaxError.messageForNode = node;
            syntaxError.messageType = "ERROR";
            syntaxError.messageForLine = this.source.substring(pos.lineStart, pos.lineEnd);
            return syntaxError;
        };
        ObjJAcornCompiler.prototype.pushImport =         function(url)
        {
            if (!ObjJAcornCompiler.importStack)
                ObjJAcornCompiler.importStack = [];
            ObjJAcornCompiler.importStack.push(url);
        };
        ObjJAcornCompiler.prototype.popImport =         function()
        {
            ObjJAcornCompiler.importStack.pop();
        };
        function createMessage(aMessage, node, code)
        {
            var message = acorn.getLineInfo(code, node.start);
            message.message = aMessage;
            message.messageOnLine = message.line;
            message.messageOnColumn = message.column;
            message.messageForNode = node;
            message.messageType = "WARNING";
            message.messageForLine = code.substring(message.lineStart, message.lineEnd);
            return message;
        }
        function compile(node, state, visitor)
        {
            function c(node, st, override)
            {
                visitor[override || node.type](node, st, c);
            }
            c(node, state);
        }
        function compileWithFormat(node, state, visitor)
        {
            var lastNode,
                lastComment;
            function c(node, st, override)
            {
                var compiler = st.compiler,
                    includeComments = compiler.includeComments,
                    parentNode = st.currentNode(),
                    localLastNode = lastNode,
                    sameNode = localLastNode === node;
                lastNode = node;
                if (includeComments && !sameNode && node.commentsBefore && node.commentsBefore !== lastComment)
                {
                    for (var i = 0; i < node.commentsBefore.length; i++)
                        compiler.jsBuffer.concat(node.commentsBefore[i]);
                }
                st.pushNode(node, override);
                var formatDescription = st.formatDescription();
                if (!sameNode && formatDescription && formatDescription.before)
                    compiler.jsBuffer.concatFormat(formatDescription.before);
                visitor[override || node.type](node, st, c, formatDescription);
                if (!sameNode && formatDescription && formatDescription.after)
                    compiler.jsBuffer.concatFormat(formatDescription.after);
                st.popNode();
                if (includeComments && !sameNode && node.commentsAfter)
                {
                    for (var i = 0; i < node.commentsAfter.length; i++)
                        compiler.jsBuffer.concat(node.commentsAfter[i]);
                    lastComment = node.commentsAfter;
                }
                else
                {
                    lastComment = null;
                }
            }
            c(node, state);
        }
        function isIdempotentExpression(node)
        {
            switch(node.type) {
                case "Literal":
                case "Identifier":
                    return true;
                case "ArrayExpression":
                    for (var i = 0; i < node.elements.length; ++i)
                    {
                        if (!isIdempotentExpression(node.elements[i]))
                            return false;
                    }
                    return true;
                case "DictionaryLiteral":
                    for (var i = 0; i < node.keys.length; ++i)
                    {
                        if (!isIdempotentExpression(node.keys[i]))
                            return false;
                        if (!isIdempotentExpression(node.values[i]))
                            return false;
                    }
                    return true;
                case "ObjectExpression":
                    for (var i = 0; i < node.properties.length; ++i)
                        if (!isIdempotentExpression(node.properties[i].value))
                            return false;
                    return true;
                case "FunctionExpression":
                    for (var i = 0; i < node.params.length; ++i)
                        if (!isIdempotentExpression(node.params[i]))
                            return false;
                    return true;
                case "SequenceExpression":
                    for (var i = 0; i < node.expressions.length; ++i)
                        if (!isIdempotentExpression(node.expressions[i]))
                            return false;
                    return true;
                case "UnaryExpression":
                    return isIdempotentExpression(node.argument);
                case "BinaryExpression":
                    return isIdempotentExpression(node.left) && isIdempotentExpression(node.right);
                case "ConditionalExpression":
                    return isIdempotentExpression(node.test) && isIdempotentExpression(node.consequent) && isIdempotentExpression(node.alternate);
                case "MemberExpression":
                    return isIdempotentExpression(node.object) && (!node.computed || isIdempotentExpression(node.property));
                case "Dereference":
                    return isIdempotentExpression(node.expr);
                case "Reference":
                    return isIdempotentExpression(node.element);
default:
                    return false;
            }
        }
        function checkCanDereference(st, node)
        {
            if (!isIdempotentExpression(node))
                throw st.compiler.error_message("Dereference of expression with side effects", node);
        }
        function surroundExpression(c)
        {
            return             function(node, st, override, format)
            {
                st.compiler.jsBuffer.concat("(");
                c(node, st, override, format);
                st.compiler.jsBuffer.concat(")");
            };
        }
        var operatorPrecedence = {"*": 3, "/": 3, "%": 3, "+": 4, "-": 4, "<<": 5, ">>": 5, ">>>": 5, "<": 6, "<=": 6, ">": 6, ">=": 6, "in": 6, "instanceof": 6, "==": 7, "!=": 7, "===": 7, "!==": 7, "&": 8, "^": 9, "|": 10, "&&": 11, "||": 12};
        var expressionTypePrecedence = {MemberExpression: 0, CallExpression: 1, NewExpression: 2, FunctionExpression: 3, UnaryExpression: 4, UpdateExpression: 4, BinaryExpression: 5, LogicalExpression: 6, ConditionalExpression: 7, AssignmentExpression: 8};
        function nodePrecedence(node, subNode, right)
        {
            var nodeType = node.type,
                nodePrecedence = expressionTypePrecedence[nodeType] || -1,
                subNodePrecedence = expressionTypePrecedence[subNode.type] || -1,
                nodeOperatorPrecedence,
                subNodeOperatorPrecedence;
            return nodePrecedence < subNodePrecedence || nodePrecedence === subNodePrecedence && isLogicalBinary(nodeType) && ((nodeOperatorPrecedence = operatorPrecedence[node.operator]) < (subNodeOperatorPrecedence = operatorPrecedence[subNode.operator]) || right && nodeOperatorPrecedence === subNodeOperatorPrecedence);
        }
        var pass1 = walk.make({ImportStatement:         function(node, st, c)
        {
            var urlString = node.filename.value;
            st.compiler.dependencies.push({url: urlString, isLocal: node.localfilepath});
        }});
        var indentType = " ";
        var indentationSpaces = 4;
        var indentationSize = indentationSpaces * indentType.length;
        var indentStep = (Array(indentationSpaces + 1)).join(indentType);
        var indentation = "";
        var pass2 = walk.make({Program:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate;
            indentType = compiler.options.indentationType;
            indentationSpaces = compiler.options.indentationSpaces;
            indentationSize = indentationSpaces * indentType.length;
            indentStep = (Array(indentationSpaces + 1)).join(indentType);
            indentation = "";
            for (var i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, "Statement");
            }            if (!generate)
                compiler.jsBuffer.concat(compiler.source.substring(compiler.lastPos, node.end));
            var maybeWarnings = st.maybeWarnings();
            if (maybeWarnings)
                for (var i = 0; i < maybeWarnings.length; i++)
                {
                    var maybeWarning = maybeWarnings[i];
                    if (maybeWarning.checkIfWarning(st))
                    {
                        compiler.addWarning(maybeWarning.message);
                    }                }        }, BlockStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                endOfScopeBody = st.endOfScopeBody,
                buffer;
            if (endOfScopeBody)
                delete st.endOfScopeBody;
            if (generate)
            {
                var skipIndentation = st.skipIndentation;
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("{", node);
                    buffer.concatFormat(format.afterLeftBrace);
                }                else
                {
                    if (skipIndentation)
                        delete st.skipIndentation;
                    else
                        buffer.concat(indentation.substring(indentationSize));
                    buffer.concat("{\n", node);
                }            }            for (var i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, "Statement");
            }            if (generate)
            {
                var maxReceiverLevel = st.maxReceiverLevel;
                if (endOfScopeBody && maxReceiverLevel)
                {
                    buffer.concat(indentation);
                    buffer.concat("var ");
                    for (var i = 0; i < maxReceiverLevel; i++)
                    {
                        if (i)
                            buffer.concat(", ");
                        buffer.concat("___r");
                        buffer.concat(i + 1 + "");
                    }                    buffer.concat(";\n");
                }                if (format)
                {
                    buffer.concatFormat(format.beforeRightBrace);
                    buffer.concat("}", node);
                }                else
                {
                    buffer.concat(indentation.substring(indentationSize));
                    buffer.concat("}", node);
                    if (!skipIndentation && st.isDecl !== false)
                        buffer.concat("\n");
                    st.indentBlockLevel--;
                }            }        }, ExpressionStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate && !format;
            if (generate)
                compiler.jsBuffer.concat(indentation);
            c(node.expression, st, "Expression");
            if (generate)
                compiler.jsBuffer.concat(";\n", node);
        }, IfStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("if", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    if (!st.superNodeIsElse)
                        buffer.concat(indentation);
                    else
                        delete st.superNodeIsElse;
                    buffer.concat("if (", node);
                }            }            c(node.test, st, "Expression");
            if (generate)
            {
                if (format)
                {
                    buffer.concat(")", node);
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(node.consequent.type === "EmptyStatement" ? ");\n" : ")\n", node);
                }            }            indentation += indentStep;
            c(node.consequent, st, "Statement");
            indentation = indentation.substring(indentationSize);
            var alternate = node.alternate;
            if (alternate)
            {
                var alternateNotIf = alternate.type !== "IfStatement";
                if (generate)
                {
                    if (format)
                    {
                        buffer.concatFormat(format.beforeElse);
                        buffer.concat("else", node);
                        buffer.concatFormat(format.afterElse);
                    }                    else
                    {
                        var emptyStatement = alternate.type === "EmptyStatement";
                        buffer.concat(indentation);
                        buffer.concat(alternateNotIf ? emptyStatement ? "else;\n" : "else\n" : "else ", node);
                    }                }                if (alternateNotIf)
                    indentation += indentStep;
                else
                    st.superNodeIsElse = true;
                c(alternate, st, "Statement");
                if (alternateNotIf)
                    indentation = indentation.substring(indentationSize);
            }        }, LabeledStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler;
            if (compiler.generate)
            {
                var buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                c(node.label, st, "IdentifierName");
                if (format)
                {
                    buffer.concat(":", node);
                    buffer.concatFormat(format.afterColon);
                }                else
                {
                    buffer.concat(": ", node);
                }            }            c(node.body, st, "Statement");
        }, BreakStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler;
            if (compiler.generate)
            {
                var label = node.label,
                    buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                if (label)
                {
                    if (format)
                    {
                        buffer.concat("break", node);
                        buffer.concatFormat(format.beforeLabel);
                    }                    else
                    {
                        buffer.concat("break ", node);
                    }                    c(label, st, "IdentifierName");
                    if (!format)
                        buffer.concat(";\n");
                }                else
                    buffer.concat(format ? "break" : "break;\n", node);
            }        }, ContinueStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler;
            if (compiler.generate)
            {
                var label = node.label,
                    buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                if (label)
                {
                    if (format)
                    {
                        buffer.concat("continue", node);
                        buffer.concatFormat(format.beforeLabel);
                    }                    else
                    {
                        buffer.concat("continue ", node);
                    }                    c(label, st, "IdentifierName");
                    if (!format)
                        buffer.concat(";\n");
                }                else
                    buffer.concat(format ? "continue" : "continue;\n", node);
            }        }, WithStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("with", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("with(", node);
                }            }            c(node.object, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concat(")", node);
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(")\n", node);
                }            indentation += indentStep;
            c(node.body, st, "Statement");
            indentation = indentation.substring(indentationSize);
        }, SwitchStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("switch", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(", node);
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("switch(", node);
                }            }            c(node.discriminant, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concat(")");
                    buffer.concatFormat(format.afterRightParenthesis);
                    buffer.concat("{");
                    buffer.concatFormat(format.afterLeftBrace);
                }                else
                {
                    buffer.concat(") {\n");
                }            indentation += indentStep;
            for (var i = 0; i < node.cases.length; ++i)
            {
                var cs = node.cases[i];
                if (cs.test)
                {
                    if (generate)
                    {
                        if (format)
                        {
                            buffer.concatFormat(format.beforeCase);
                            buffer.concat("case", node);
                            buffer.concatFormat(format.afterCase);
                        }                        else
                        {
                            buffer.concat(indentation);
                            buffer.concat("case ");
                        }                    }                    c(cs.test, st, "Expression");
                    if (generate)
                        if (format)
                        {
                            buffer.concat(":");
                            buffer.concatFormat(format.afterColon);
                        }                        else
                        {
                            buffer.concat(":\n");
                        }                }                else if (generate)
                    if (format)
                    {
                        buffer.concatFormat(format.beforeCase);
                        buffer.concat("default");
                        buffer.concatFormat(format.afterCase);
                        buffer.concat(":");
                        buffer.concatFormat(format.afterColon);
                    }                    else
                    {
                        buffer.concat("default:\n");
                    }                indentation += indentStep;
                for (var j = 0; j < cs.consequent.length; ++j)
                    c(cs.consequent[j], st, "Statement");
                indentation = indentation.substring(indentationSize);
            }            indentation = indentation.substring(indentationSize);
            if (generate)
            {
                if (format)
                {
                    buffer.concatFormat(format.beforeRightBrace);
                    buffer.concat("}");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("}\n");
                }            }        }, ReturnStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                buffer.concat("return", node);
            }            if (node.argument)
            {
                if (generate)
                    buffer.concatFormat(format ? format.beforeExpression : " ");
                c(node.argument, st, "Expression");
            }            if (generate && !format)
                buffer.concat(";\n");
        }, ThrowStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                buffer.concat("throw", node);
                buffer.concatFormat(format ? format.beforeExpression : " ");
            }            c(node.argument, st, "Expression");
            if (generate && !format)
                buffer.concat(";\n");
        }, TryStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (!format)
                    buffer.concat(indentation);
                buffer.concat("try", node);
                buffer.concatFormat(format ? format.beforeStatement : " ");
            }            indentation += indentStep;
            if (!format)
                st.skipIndentation = true;
            c(node.block, st, "Statement");
            indentation = indentation.substring(indentationSize);
            if (node.handler)
            {
                var handler = node.handler,
                    inner = new Scope(st),
                    param = handler.param,
                    name = param.name;
                inner.vars[name] = {type: "catch clause", node: param};
                if (generate)
                {
                    if (format)
                    {
                        buffer.concatFormat(format.beforeCatch);
                        buffer.concat("catch");
                        buffer.concatFormat(format.afterCatch);
                        buffer.concat("(");
                        c(param, st, "IdentifierName");
                        buffer.concat(")");
                        buffer.concatFormat(format.beforeCatchStatement);
                    }                    else
                    {
                        buffer.concat("\n");
                        buffer.concat(indentation);
                        buffer.concat("catch(");
                        buffer.concat(name);
                        buffer.concat(") ");
                    }                }                indentation += indentStep;
                inner.skipIndentation = true;
                inner.endOfScopeBody = true;
                c(handler.body, inner, "ScopeBody");
                indentation = indentation.substring(indentationSize);
                inner.copyAddedSelfToIvarsToParent();
            }            if (node.finalizer)
            {
                if (generate)
                {
                    if (format)
                    {
                        buffer.concatFormat(format.beforeCatch);
                        buffer.concat("finally");
                        buffer.concatFormat(format.beforeCatchStatement);
                    }                    else
                    {
                        buffer.concat("\n");
                        buffer.concat(indentation);
                        buffer.concat("finally ");
                    }                }                indentation += indentStep;
                st.skipIndentation = true;
                c(node.finalizer, st, "Statement");
                indentation = indentation.substring(indentationSize);
            }            if (generate && !format)
                buffer.concat("\n");
        }, WhileStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                body = node.body,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("while", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("while (", node);
                }            }            c(node.test, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concat(")");
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(body.type === "EmptyStatement" ? ");\n" : ")\n");
                }            indentation += indentStep;
            c(body, st, "Statement");
            indentation = indentation.substring(indentationSize);
        }, DoWhileStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("do", node);
                    buffer.concatFormat(format.beforeStatement);
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("do\n", node);
                }            }            indentation += indentStep;
            c(node.body, st, "Statement");
            indentation = indentation.substring(indentationSize);
            if (generate)
            {
                if (format)
                {
                    buffer.concat("while");
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("while (");
                }            }            c(node.test, st, "Expression");
            if (generate)
                buffer.concatFormat(format ? ")" : ");\n");
        }, ForStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                body = node.body,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("for", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("for (", node);
                }            }            if (node.init)
                c(node.init, st, "ForInit");
            if (generate)
                buffer.concat(format ? ";" : "; ");
            if (node.test)
                c(node.test, st, "Expression");
            if (generate)
                buffer.concat(format ? ";" : "; ");
            if (node.update)
                c(node.update, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concat(")");
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(body.type === "EmptyStatement" ? ");\n" : ")\n");
                }            indentation += indentStep;
            c(body, st, "Statement");
            indentation = indentation.substring(indentationSize);
        }, ForInStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                body = node.body,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("for", node);
                    buffer.concatFormat(format.beforeLeftParenthesis);
                    buffer.concat("(");
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("for (", node);
                }            }            c(node.left, st, "ForInit");
            if (generate)
                if (format)
                {
                    buffer.concatFormat(format.beforeIn);
                    buffer.concat("in");
                    buffer.concatFormat(format.afterIn);
                }                else
                {
                    buffer.concat(" in ");
                }            c(node.right, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concat(")");
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(body.type === "EmptyStatement" ? ");\n" : ")\n");
                }            indentation += indentStep;
            c(body, st, "Statement");
            indentation = indentation.substring(indentationSize);
        }, ForInit:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate;
            if (node.type === "VariableDeclaration")
            {
                st.isFor = true;
                c(node, st);
                delete st.isFor;
            }            else
                c(node, st, "Expression");
        }, DebuggerStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler;
            if (compiler.generate)
            {
                var buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concat("debugger", node);
                }                else
                {
                    buffer.concat(indentation);
                    buffer.concat("debugger;\n", node);
                }            }        }, Function:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                inner = new Scope(st),
                decl = node.type == "FunctionDeclaration",
                id = node.id;
            inner.isDecl = decl;
            for (var i = 0; i < node.params.length; ++i)
                inner.vars[node.params[i].name] = {type: "argument", node: node.params[i]};
            if (generate && !format)
                buffer.concat(indentation);
            if (id)
            {
                var name = id.name;
                (decl ? st : inner).vars[name] = {type: decl ? "function" : "function name", node: id};
                if (compiler.transformNamedFunctionDeclarationToAssignment)
                {
                    if (generate)
                    {
                        buffer.concat(name);
                        buffer.concat(" = ");
                    }                    else
                    {
                        buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                        buffer.concat(name);
                        buffer.concat(" = function");
                        compiler.lastPos = id.end;
                    }                }            }            if (generate)
            {
                buffer.concat("function", node);
                if (!compiler.transformNamedFunctionDeclarationToAssignment && id)
                {
                    if (!format)
                        buffer.concat(" ");
                    c(id, st, "IdentifierName");
                }                if (format)
                    buffer.concatFormat(format.beforeLeftParenthesis);
                buffer.concat("(");
                for (var i = 0; i < node.params.length; ++i)
                {
                    if (i)
                        buffer.concat(format ? "," : ", ");
                    c(node.params[i], st, "IdentifierName");
                }                if (format)
                {
                    buffer.concat(")");
                    buffer.concatFormat(format.afterRightParenthesis);
                }                else
                {
                    buffer.concat(")\n");
                }            }            indentation += indentStep;
            inner.endOfScopeBody = true;
            c(node.body, inner, "ScopeBody");
            indentation = indentation.substring(indentationSize);
            inner.copyAddedSelfToIvarsToParent();
        }, VariableDeclaration:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (!st.isFor && !format)
                    buffer.concat(indentation);
                buffer.concat(format ? "var" : "var ", node);
            }            for (var i = 0; i < node.declarations.length; ++i)
            {
                var decl = node.declarations[i],
                    identifier = decl.id.name;
                if (i)
                    if (generate)
                    {
                        if (format)
                        {
                            buffer.concat(",");
                        }                        else
                        {
                            if (st.isFor)
                                buffer.concat(", ");
                            else
                            {
                                buffer.concat(",\n");
                                buffer.concat(indentation);
                                buffer.concat("    ");
                            }                        }                    }                st.vars[identifier] = {type: "var", node: decl.id};
                c(decl.id, st, "IdentifierName");
                if (decl.init)
                {
                    if (generate)
                    {
                        if (format)
                        {
                            buffer.concatFormat(format.beforeEqual);
                            buffer.concat("=");
                            buffer.concatFormat(format.afterEqual);
                        }                        else
                        {
                            buffer.concat(" = ");
                        }                    }                    c(decl.init, st, "Expression");
                }                if (st.addedSelfToIvars)
                {
                    var addedSelfToIvar = st.addedSelfToIvars[identifier];
                    if (addedSelfToIvar)
                    {
                        var atoms = st.compiler.jsBuffer.atoms;
                        for (var i = 0, size = addedSelfToIvar.length; i < size; i++)
                        {
                            var dict = addedSelfToIvar[i];
                            atoms[dict.index] = "";
                            compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", dict.node, compiler.source));
                        }                        st.addedSelfToIvars[identifier] = [];
                    }                }            }            if (generate && !format && !st.isFor)
                buffer.concat(";\n", node);
        }, ThisExpression:         function(node, st, c)
        {
            var compiler = st.compiler;
            if (compiler.generate)
                compiler.jsBuffer.concat("this", node);
        }, ArrayExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                buffer.concat("[", node);
            }            for (var i = 0; i < node.elements.length; ++i)
            {
                var elt = node.elements[i];
                if (generate && i !== 0)
                    if (format)
                    {
                        buffer.concatFormat(format.beforeComma);
                        buffer.concat(",");
                        buffer.concatFormat(format.afterComma);
                    }                    else
                        buffer.concat(", ");
                if (elt)
                    c(elt, st, "Expression");
            }            if (generate)
                buffer.concat("]");
        }, ObjectExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                properties = node.properties,
                buffer = compiler.jsBuffer;
            if (generate)
                buffer.concat("{", node);
            for (var i = 0, size = properties.length; i < size; ++i)
            {
                var prop = properties[i];
                if (generate)
                {
                    if (i)
                        if (format)
                        {
                            buffer.concatFormat(format.beforeComma);
                            buffer.concat(",");
                            buffer.concatFormat(format.afterComma);
                        }                        else
                            buffer.concat(", ");
                    st.isPropertyKey = true;
                    c(prop.key, st, "Expression");
                    delete st.isPropertyKey;
                    if (format)
                    {
                        buffer.concatFormat(format.beforeColon);
                        buffer.concat(":");
                        buffer.concatFormat(format.afterColon);
                    }                    else
                    {
                        buffer.concat(": ");
                    }                }                else if (prop.key.raw && prop.key.raw.charAt(0) === "@")
                {
                    buffer.concat(compiler.source.substring(compiler.lastPos, prop.key.start));
                    compiler.lastPos = prop.key.start + 1;
                }                c(prop.value, st, "Expression");
            }            if (generate)
                buffer.concat("}");
        }, SequenceExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                buffer.concat("(", node);
            }            for (var i = 0; i < node.expressions.length; ++i)
            {
                if (generate && i !== 0)
                    if (format)
                    {
                        buffer.concatFormat(format.beforeComma);
                        buffer.concat(",");
                        buffer.concatFormat(format.afterComma);
                    }                    else
                        buffer.concat(", ");
                c(node.expressions[i], st, "Expression");
            }            if (generate)
                buffer.concat(")");
        }, UnaryExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                argument = node.argument;
            if (generate)
            {
                var buffer = compiler.jsBuffer;
                if (node.prefix)
                {
                    buffer.concat(node.operator, node);
                    if (wordPrefixOperators(node.operator))
                        buffer.concat(" ");
                    (nodePrecedence(node, argument) ? surroundExpression(c) : c)(argument, st, "Expression");
                }                else
                {
                    (nodePrecedence(node, argument) ? surroundExpression(c) : c)(argument, st, "Expression");
                    buffer.concat(node.operator);
                }            }            else
            {
                c(argument, st, "Expression");
            }        }, UpdateExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer;
            if (node.argument.type === "Dereference")
            {
                checkCanDereference(st, node.argument);
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                buffer.concat((node.prefix ? "" : "(") + "(");
                if (!generate)
                    compiler.lastPos = node.argument.expr.start;
                c(node.argument.expr, st, "Expression");
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.argument.expr.end));
                buffer.concat(")(");
                if (!generate)
                    compiler.lastPos = node.argument.start;
                c(node.argument, st, "Expression");
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.argument.end));
                buffer.concat(" " + node.operator.substring(0, 1) + " 1)" + (node.prefix ? "" : node.operator == '++' ? " - 1)" : " + 1)"));
                if (!generate)
                    compiler.lastPos = node.end;
                return;
            }            if (node.prefix)
            {
                if (generate)
                {
                    buffer.concat(node.operator, node);
                    if (wordPrefixOperators(node.operator))
                        buffer.concat(" ");
                }                (generate && nodePrecedence(node, node.argument) ? surroundExpression(c) : c)(node.argument, st, "Expression");
            }            else
            {
                (generate && nodePrecedence(node, node.argument) ? surroundExpression(c) : c)(node.argument, st, "Expression");
                if (generate)
                    buffer.concat(node.operator);
            }        }, BinaryExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                operatorType = isInInstanceof(node.operator);
            (generate && nodePrecedence(node, node.left) ? surroundExpression(c) : c)(node.left, st, "Expression");
            if (generate)
            {
                var buffer = compiler.jsBuffer;
                buffer.concatFormat(format ? format.beforeOperator : " ");
                buffer.concat(node.operator, node);
                buffer.concatFormat(format ? format.afterOperator : " ");
            }            (generate && nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, "Expression");
        }, LogicalExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate;
            (generate && nodePrecedence(node, node.left) ? surroundExpression(c) : c)(node.left, st, "Expression");
            if (generate)
            {
                var buffer = compiler.jsBuffer;
                buffer.concatFormat(format ? format.beforeOperator : " ");
                buffer.concat(node.operator);
                buffer.concatFormat(format ? format.afterOperator : " ");
            }            (generate && nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, "Expression");
        }, AssignmentExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                saveAssignment = st.assignment,
                buffer = compiler.jsBuffer;
            if (node.left.type === "Dereference")
            {
                checkCanDereference(st, node.left);
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                buffer.concat("(", node);
                if (!generate)
                    compiler.lastPos = node.left.expr.start;
                c(node.left.expr, st, "Expression");
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.left.expr.end));
                buffer.concat(")(");
                if (node.operator !== "=")
                {
                    if (!generate)
                        compiler.lastPos = node.left.start;
                    c(node.left, st, "Expression");
                    if (!generate)
                        buffer.concat(compiler.source.substring(compiler.lastPos, node.left.end));
                    buffer.concat(" " + node.operator.substring(0, 1) + " ");
                }                if (!generate)
                    compiler.lastPos = node.right.start;
                c(node.right, st, "Expression");
                if (!generate)
                    buffer.concat(compiler.source.substring(compiler.lastPos, node.right.end));
                buffer.concat(")");
                if (!generate)
                    compiler.lastPos = node.end;
                return;
            }            var saveAssignment = st.assignment,
                nodeLeft = node.left;
            st.assignment = true;
            if (nodeLeft.type === "Identifier" && nodeLeft.name === "self")
            {
                var lVar = st.getLvar("self", true);
                if (lVar)
                {
                    var lVarScope = lVar.scope;
                    if (lVarScope)
                        lVarScope.assignmentToSelf = true;
                }            }            (generate && nodePrecedence(node, nodeLeft) ? surroundExpression(c) : c)(nodeLeft, st, "Expression");
            if (generate)
            {
                buffer.concatFormat(format ? format.beforeOperator : " ");
                buffer.concat(node.operator);
                buffer.concatFormat(format ? format.afterOperator : " ");
            }            st.assignment = saveAssignment;
            (generate && nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, "Expression");
            if (st.isRootScope() && nodeLeft.type === "Identifier" && !st.getLvar(nodeLeft.name))
                st.vars[nodeLeft.name] = {type: "global", node: nodeLeft};
        }, ConditionalExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer;
            (generate && nodePrecedence(node, node.test) ? surroundExpression(c) : c)(node.test, st, "Expression");
            if (generate)
            {
                buffer = compiler.jsBuffer;
                if (format)
                {
                    buffer.concatFormat(format.beforeOperator);
                    buffer.concat("?");
                    buffer.concatFormat(format.afterOperator);
                }                else
                {
                    buffer.concat(" ? ");
                }            }            c(node.consequent, st, "Expression");
            if (generate)
                if (format)
                {
                    buffer.concatFormat(format.beforeOperator);
                    buffer.concat(":");
                    buffer.concatFormat(format.afterOperator);
                }                else
                {
                    buffer.concat(" : ");
                }            c(node.alternate, st, "Expression");
        }, NewExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                nodeArguments = node.arguments,
                generate = compiler.generate,
                buffer;
            if (generate)
            {
                buffer = compiler.jsBuffer;
                buffer.concat("new ", node);
            }            (generate && nodePrecedence(node, node.callee) ? surroundExpression(c) : c)(node.callee, st, "Expression");
            if (generate)
                buffer.concat("(");
            if (nodeArguments)
            {
                for (var i = 0, size = nodeArguments.length; i < size; ++i)
                {
                    if (i && generate)
                        buffer.concatFormat(format ? "," : ", ");
                    c(nodeArguments[i], st, "Expression");
                }            }            if (generate)
                buffer.concat(")");
        }, CallExpression:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                nodeArguments = node.arguments,
                generate = compiler.generate,
                callee = node.callee,
                buffer;
            if (callee.type === "Identifier" && callee.name === "eval")
            {
                var selfLvar = st.getLvar("self", true);
                if (selfLvar)
                {
                    var selfScope = selfLvar.scope;
                    if (selfScope)
                    {
                        selfScope.assignmentToSelf = true;
                    }                }            }            (generate && nodePrecedence(node, callee) ? surroundExpression(c) : c)(callee, st, "Expression");
            if (generate)
            {
                buffer = compiler.jsBuffer;
                buffer.concat("(");
            }            if (nodeArguments)
            {
                for (var i = 0, size = nodeArguments.length; i < size; ++i)
                {
                    if (i && generate)
                        buffer.concat(format ? "," : ", ");
                    c(nodeArguments[i], st, "Expression");
                }            }            if (generate)
                buffer.concat(")");
        }, MemberExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                computed = node.computed;
            (generate && nodePrecedence(node, node.object) ? surroundExpression(c) : c)(node.object, st, "Expression");
            if (generate)
                compiler.jsBuffer.concat(computed ? "[" : ".", node);
            st.secondMemberExpression = !computed;
            (generate && !computed && nodePrecedence(node, node.property) ? surroundExpression(c) : c)(node.property, st, "Expression");
            st.secondMemberExpression = false;
            if (generate && computed)
                compiler.jsBuffer.concat("]");
        }, Identifier:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                identifier = node.name;
            if (st.currentMethodType() === "-" && !st.secondMemberExpression && !st.isPropertyKey)
            {
                var lvar = st.getLvar(identifier, true),
                    ivar = compiler.getIvarForClass(identifier, st);
                if (ivar)
                {
                    if (lvar)
                        compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", node, compiler.source));
                    else
                    {
                        var nodeStart = node.start;
                        if (!generate)
                            do
                            {
                                compiler.jsBuffer.concat(compiler.source.substring(compiler.lastPos, nodeStart));
                                compiler.lastPos = nodeStart;
                            }                            while (compiler.source.substr(nodeStart++, 1) === "(");
                                                    ((st.addedSelfToIvars || (st.addedSelfToIvars = Object.create(null)))[identifier] || (st.addedSelfToIvars[identifier] = [])).push({node: node, index: compiler.jsBuffer.length()});
                        compiler.jsBuffer.concat("self.", node);
                    }                }                else if (!reservedIdentifiers(identifier))
                {
                    var message,
                        classOrGlobal = typeof global[identifier] !== "undefined" || typeof window !== 'undefined' && typeof window[identifier] !== "undefined" || compiler.getClassDef(identifier),
                        globalVar = st.getLvar(identifier);
                    if (classOrGlobal && (!globalVar || globalVar.type !== "class"))
                    {
                    }                    else if (!globalVar)
                    {
                        if (st.assignment)
                        {
                            message = new GlobalVariableMaybeWarning("Creating global variable inside function or method '" + identifier + "'", node, compiler.source);
                            st.vars[identifier] = {type: "remove global warning", node: node};
                        }                        else
                        {
                            message = new GlobalVariableMaybeWarning("Using unknown class or uninitialized global variable '" + identifier + "'", node, compiler.source);
                        }                    }                    if (message)
                        st.addMaybeWarning(message);
                }            }            if (generate)
                compiler.jsBuffer.concat(identifier, node, identifier === "self" ? "self" : null);
        }, IdentifierName:         function(node, st, c)
        {
            var compiler = st.compiler;
            if (compiler.generate)
                compiler.jsBuffer.concat(node.name, node);
        }, Literal:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate;
            if (generate)
            {
                if (node.raw)
                    if (node.raw.charAt(0) === "@")
                        compiler.jsBuffer.concat(node.raw.substring(1), node);
                    else
                        compiler.jsBuffer.concat(node.raw, node);
                else
                {
                    var value = node.value,
                        doubleQuote = value.indexOf('"') !== -1;
                    compiler.jsBuffer.concat(doubleQuote ? "'" : '"', node);
                    compiler.jsBuffer.concat(value);
                    compiler.jsBuffer.concat(doubleQuote ? "'" : '"');
                }            }            else if (node.raw.charAt(0) === "@")
            {
                compiler.jsBuffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start + 1;
            }        }, ArrayLiteral:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                generateObjJ = compiler.options.generateObjJ,
                elementLength = node.elements.length;
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start;
            }            if (!generate)
                buffer.concat(" ");
            if (!st.receiverLevel)
                st.receiverLevel = 0;
            if (generateObjJ)
            {
                buffer.concat("@[");
            }            else if (!elementLength)
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = (CPArray.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPArray, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : (___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.method_msgSend[\"init\"] || _objj_forward)(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"init\"))");
                }                else
                {
                    buffer.concat("(___r");
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = CPArray.isa.objj_msgSend0(CPArray, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.objj_msgSend0(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"init\"))");
                }                if (!(st.maxReceiverLevel >= st.receiverLevel))
                    st.maxReceiverLevel = st.receiverLevel;
            }            else
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = (CPArray.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPArray, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : (___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.method_msgSend[\"initWithObjects:count:\"] || _objj_forward)(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"initWithObjects:count:\", [");
                }                else
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = CPArray.isa.objj_msgSend0(CPArray, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.objj_msgSend2(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"initWithObjects:count:\", [");
                }                if (!(st.maxReceiverLevel >= st.receiverLevel))
                    st.maxReceiverLevel = st.receiverLevel;
            }            if (elementLength)
            {
                for (var i = 0; i < elementLength; i++)
                {
                    var elt = node.elements[i];
                    if (i)
                        buffer.concat(", ");
                    if (!generate)
                        compiler.lastPos = elt.start;
                    c(elt, st, "Expression");
                    if (!generate)
                        buffer.concat(compiler.source.substring(compiler.lastPos, elt.end));
                }                if (!generateObjJ)
                    buffer.concat("], " + elementLength + "))");
            }            if (generateObjJ)
                buffer.concat("]");
            else
                st.receiverLevel--;
            if (!generate)
                compiler.lastPos = node.end;
        }, DictionaryLiteral:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                generateObjJ = compiler.options.generateObjJ,
                keyLength = node.keys.length;
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start;
            }            if (!generate)
                buffer.concat(" ");
            if (!st.receiverLevel)
                st.receiverLevel = 0;
            if (generateObjJ)
            {
                buffer.concat("@{");
                for (var i = 0; i < keyLength; i++)
                {
                    if (i !== 0)
                        buffer.concat(",");
                    c(node.keys[i], st, "Expression");
                    buffer.concat(":");
                    c(node.values[i], st, "Expression");
                }                buffer.concat("}");
            }            else if (!keyLength)
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = (CPDictionary.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPDictionary, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : (___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.method_msgSend[\"init\"] || _objj_forward)(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"init\"))");
                }                else
                {
                    buffer.concat("(___r");
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = CPDictionary.isa.objj_msgSend0(CPDictionary, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.objj_msgSend0(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"init\"))");
                }                if (!(st.maxReceiverLevel >= st.receiverLevel))
                    st.maxReceiverLevel = st.receiverLevel;
            }            else
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = (CPDictionary.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPDictionary, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : (___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.method_msgSend[\"initWithObjects:forKeys:\"] || _objj_forward)(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"initWithObjects:forKeys:\", [");
                }                else
                {
                    buffer.concat("(___r", node);
                    buffer.concat(++st.receiverLevel + "");
                    buffer.concat(" = CPDictionary.isa.objj_msgSend0(CPDictionary, \"alloc\"), ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(" == null ? null : ___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(".isa.objj_msgSend2(___r");
                    buffer.concat(st.receiverLevel + "");
                    buffer.concat(", \"initWithObjects:forKeys:\", [");
                }                if (!(st.maxReceiverLevel >= st.receiverLevel))
                    st.maxReceiverLevel = st.receiverLevel;
                for (var i = 0; i < keyLength; i++)
                {
                    var value = node.values[i];
                    if (i)
                        buffer.concat(", ");
                    if (!generate)
                        compiler.lastPos = value.start;
                    c(value, st, "Expression");
                    if (!generate)
                        buffer.concat(compiler.source.substring(compiler.lastPos, value.end));
                }                buffer.concat("], [");
                for (var i = 0; i < keyLength; i++)
                {
                    var key = node.keys[i];
                    if (i)
                        buffer.concat(", ");
                    if (!generate)
                        compiler.lastPos = key.start;
                    c(key, st, "Expression");
                    if (!generate)
                        buffer.concat(compiler.source.substring(compiler.lastPos, key.end));
                }                buffer.concat("]))");
            }            if (!generateObjJ)
                st.receiverLevel--;
            if (!generate)
                compiler.lastPos = node.end;
        }, ImportStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                localfilepath = node.localfilepath,
                generateObjJ = compiler.options.generateObjJ;
            if (!generate)
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
            if (generateObjJ)
            {
                buffer.concat("@import ");
                buffer.concat(localfilepath ? "\"" : "<");
                buffer.concat(node.filename.value);
                buffer.concat(localfilepath ? "\"" : ">");
            }            else
            {
                buffer.concat("objj_executeFile(\"", node);
                buffer.concat(node.filename.value);
                buffer.concat(localfilepath ? "\", YES);" : "\", NO);");
            }            if (!generate)
                compiler.lastPos = node.end;
        }, ClassDeclarationStatement:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                saveJSBuffer = compiler.jsBuffer,
                className = node.classname.name,
                classDef = compiler.getClassDef(className),
                classScope = new Scope(st),
                isInterfaceDeclaration = node.type === "InterfaceDeclarationStatement",
                protocols = node.protocols,
                options = compiler.options,
                generateObjJ = options.generateObjJ;
            compiler.imBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL, options.sourceMap && options.sourceMapIncludeSource ? compiler.source : null);
            compiler.cmBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            compiler.classBodyBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            if (compiler.getTypeDef(className))
                throw compiler.error_message(className + " is already declared as a type", node.classname);
            if (!generate)
                saveJSBuffer.concat(compiler.source.substring(compiler.lastPos, node.start));
            if (node.superclassname)
            {
                if (classDef && classDef.ivars)
                    throw compiler.error_message("Duplicate class " + className, node.classname);
                if (isInterfaceDeclaration && classDef && classDef.instanceMethods && classDef.classMethods)
                    throw compiler.error_message("Duplicate interface definition for class " + className, node.classname);
                var superClassDef = compiler.getClassDef(node.superclassname.name);
                if (!superClassDef)
                {
                    var errorMessage = "Can't find superclass " + node.superclassname.name;
                    if (ObjJAcornCompiler.importStack)
                        for (var i = ObjJAcornCompiler.importStack.length; --i >= 0; )
                            errorMessage += "\n" + (Array((ObjJAcornCompiler.importStack.length - i) * 2 + 1)).join(" ") + "Imported by: " + ObjJAcornCompiler.importStack[i];
                    throw compiler.error_message(errorMessage, node.superclassname);
                }                classDef = new ClassDef(!isInterfaceDeclaration, className, superClassDef, Object.create(null));
                if (!generateObjJ)
                    saveJSBuffer.concat("\n{var the_class = objj_allocateClassPair(" + node.superclassname.name + ", \"" + className + "\"),\nmeta_class = the_class.isa;", node);
            }            else if (node.categoryname)
            {
                classDef = compiler.getClassDef(className);
                if (!classDef)
                    throw compiler.error_message("Class " + className + " not found ", node.classname);
                if (!generateObjJ)
                {
                    saveJSBuffer.concat("{\nvar the_class = objj_getClass(\"" + className + "\")\n", node);
                    saveJSBuffer.concat("if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\"" + className + "\\\"\");\n");
                    saveJSBuffer.concat("var meta_class = the_class.isa;");
                }            }            else
            {
                classDef = new ClassDef(!isInterfaceDeclaration, className, null, Object.create(null));
                if (!generateObjJ)
                    saveJSBuffer.concat("{var the_class = objj_allocateClassPair(Nil, \"" + className + "\"),\nmeta_class = the_class.isa;", node);
            }            if (generateObjJ)
            {
                saveJSBuffer.concat(isInterfaceDeclaration ? "@interface " : "@implementation ");
                saveJSBuffer.concat(className);
                if (node.superclassname)
                {
                    saveJSBuffer.concat(" : ");
                    c(node.superclassname, st, "IdentifierName");
                }                else if (node.categoryname)
                {
                    saveJSBuffer.concat(" (");
                    c(node.categoryname, st, "IdentifierName");
                    saveJSBuffer.concat(")");
                }            }            if (protocols)
                for (var i = 0, size = protocols.length; i < size; i++)
                {
                    if (generateObjJ)
                    {
                        if (i)
                            saveJSBuffer.concat(", ");
                        else
                            saveJSBuffer.concat(" <");
                        c(protocols[i], st, "IdentifierName");
                        if (i === size - 1)
                            saveJSBuffer.concat(">");
                    }                    else
                    {
                        saveJSBuffer.concat("\nvar aProtocol = objj_getProtocol(\"" + protocols[i].name + "\");", protocols[i]);
                        saveJSBuffer.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\"" + protocols[i].name + "\\\"\");");
                        saveJSBuffer.concat("\nclass_addProtocol(the_class, aProtocol);");
                    }                }            classScope.classDef = classDef;
            compiler.currentSuperClass = "objj_getClass(\"" + className + "\").super_class";
            compiler.currentSuperMetaClass = "objj_getMetaClass(\"" + className + "\").super_class";
            var firstIvarDeclaration = true,
                ivars = classDef.ivars,
                classDefIvars = [],
                hasAccessors = false;
            if (node.ivardeclarations)
            {
                if (generateObjJ)
                {
                    saveJSBuffer.concat("{");
                    indentation += indentStep;
                }                for (var i = 0; i < node.ivardeclarations.length; ++i)
                {
                    var ivarDecl = node.ivardeclarations[i],
                        ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null,
                        ivarTypeIsClass = ivarDecl.ivartype ? ivarDecl.ivartype.typeisclass : false,
                        ivarIdentifier = ivarDecl.id,
                        ivarName = ivarIdentifier.name,
                        ivar = {"type": ivarType, "name": ivarName},
                        accessors = ivarDecl.accessors;
                    var checkIfIvarIsAlreadyDeclaredAndInSuperClass =                     function(aClassDef, recursiveFunction)
                    {
                        if (aClassDef.ivars[ivarName])
                            throw compiler.error_message("Instance variable '" + ivarName + "' is already declared for class " + className + (aClassDef.name !== className ? " in superclass " + aClassDef.name : ""), ivarDecl.id);
                        if (aClassDef.superClass)
                            recursiveFunction(aClassDef.superClass, recursiveFunction);
                    };
                    checkIfIvarIsAlreadyDeclaredAndInSuperClass(classDef, checkIfIvarIsAlreadyDeclaredAndInSuperClass);
                    var isTypeDefined = !ivarTypeIsClass || typeof global[ivarType] !== "undefined" || typeof window[ivarType] !== "undefined" || compiler.getClassDef(ivarType) || compiler.getTypeDef(ivarType) || ivarType == classDef.name;
                    if (!isTypeDefined)
                        compiler.addWarning(createMessage("Unknown type '" + ivarType + "' for ivar '" + ivarName + "'", ivarDecl.ivartype, compiler.source));
                    if (generateObjJ)
                    {
                        c(ivarDecl, st, "IvarDeclaration");
                    }                    else
                    {
                        if (firstIvarDeclaration)
                        {
                            firstIvarDeclaration = false;
                            saveJSBuffer.concat("class_addIvars(the_class, [");
                        }                        else
                            saveJSBuffer.concat(", ");
                        if (options.includeIvarTypeSignatures)
                            saveJSBuffer.concat("new objj_ivar(\"" + ivarName + "\", \"" + ivarType + "\")", node);
                        else
                            saveJSBuffer.concat("new objj_ivar(\"" + ivarName + "\")", node);
                    }                    if (ivarDecl.outlet)
                        ivar.outlet = true;
                    classDefIvars.push(ivar);
                    if (!classScope.ivars)
                        classScope.ivars = Object.create(null);
                    classScope.ivars[ivarName] = {type: "ivar", name: ivarName, node: ivarIdentifier, ivar: ivar};
                    if (accessors)
                    {
                        var property = accessors.property && accessors.property.name || ivarName,
                            getterName = accessors.getter && accessors.getter.name || property;
                        classDef.addInstanceMethod(new MethodDef(getterName, [ivarType]));
                        if (!accessors.readonly)
                        {
                            var setterName = accessors.setter ? accessors.setter.name : null;
                            if (!setterName)
                            {
                                var start = property.charAt(0) == '_' ? 1 : 0;
                                setterName = (start ? "_" : "") + "set" + (property.substr(start, 1)).toUpperCase() + property.substring(start + 1) + ":";
                            }                            classDef.addInstanceMethod(new MethodDef(setterName, ["void", ivarType]));
                        }                        hasAccessors = true;
                    }                }            }            if (generateObjJ)
            {
                indentation = indentation.substring(indentationSize);
                saveJSBuffer.concatFormat("\n}");
            }            else if (!firstIvarDeclaration)
                saveJSBuffer.concat("]);");
            if (!generateObjJ && !isInterfaceDeclaration && hasAccessors)
            {
                var getterSetterBuffer = new StringBuffer(false);
                getterSetterBuffer.concat((compiler.source.substring(node.start, node.endOfIvars)).replace(/<.*>/g, ""));
                getterSetterBuffer.concat("\n");
                for (var i = 0; i < node.ivardeclarations.length; ++i)
                {
                    var ivarDecl = node.ivardeclarations[i],
                        ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null,
                        ivarName = ivarDecl.id.name,
                        accessors = ivarDecl.accessors;
                    if (!accessors)
                        continue;
                    var property = accessors.property && accessors.property.name || ivarName,
                        getterName = accessors.getter && accessors.getter.name || property,
                        getterCode = "- (" + (ivarType ? ivarType : "id") + ")" + getterName + "\n{\n    return " + ivarName + ";\n}\n";
                    getterSetterBuffer.concat(getterCode);
                    if (accessors.readonly)
                        continue;
                    var setterName = accessors.setter ? accessors.setter.name : null;
                    if (!setterName)
                    {
                        var start = property.charAt(0) == '_' ? 1 : 0;
                        setterName = (start ? "_" : "") + "set" + (property.substr(start, 1)).toUpperCase() + property.substring(start + 1) + ":";
                    }                    var setterCode = "- (void)" + setterName + "(" + (ivarType ? ivarType : "id") + ")newValue\n{\n    ";
                    if (accessors.copy)
                        setterCode += "if (" + ivarName + " !== newValue)\n        " + ivarName + " = [newValue copy];\n}\n";
                    else
                        setterCode += ivarName + " = newValue;\n}\n";
                    getterSetterBuffer.concat(setterCode);
                }                getterSetterBuffer.concat("\n@end");
                var b = (getterSetterBuffer.toString()).replace(/@accessors(\(.*\))?/g, "");
                var compilerOptions = setupOptions(options);
                compilerOptions.sourceMapIncludeSource = true;
                var url = compiler.url;
                var filename = url && compiler.URL.substr(compiler.URL.lastIndexOf('/') + 1);
                var dotIndex = filename && filename.lastIndexOf(".");
                var filenameNoExt = filename && filename.substr(0, dotIndex === -1 ? filename.length : dotIndex);
                var filenameExt = filename && filename.substr(dotIndex === -1 ? filename.length : dotIndex);
                var categoryname = node.categoryname && node.categoryname.id;
                var imBuffer = exports.compileToIMBuffer(b, filenameNoExt + "_" + className + (categoryname ? "_" + categoryname : "") + "_Accessors" + (filenameExt || ""), compilerOptions);
                var generatedCode = imBuffer.toString();
                if (compiler.createSourceMap)
                {
                    compiler.imBuffer.concat(sourceMap.SourceNode.fromStringWithSourceMap(generatedCode.code, sourceMap.SourceMapConsumer(generatedCode.map.toString())));
                }                else
                {
                    compiler.imBuffer.concat(generatedCode);
                }            }            for (var ivarSize = classDefIvars.length, i = 0; i < ivarSize; i++)
            {
                var ivar = classDefIvars[i],
                    ivarName = ivar.name;
                ivars[ivarName] = ivar;
            }            compiler.classDefs[className] = classDef;
            var bodies = node.body,
                bodyLength = bodies.length;
            if (bodyLength > 0)
            {
                if (!generate)
                    compiler.lastPos = bodies[0].start;
                for (var i = 0; i < bodyLength; ++i)
                {
                    var body = bodies[i];
                    c(body, classScope, "Statement");
                }                if (!generate)
                    saveJSBuffer.concat(compiler.source.substring(compiler.lastPos, body.end));
            }            if (!generateObjJ && !isInterfaceDeclaration && !node.categoryname)
            {
                saveJSBuffer.concat("objj_registerClassPair(the_class);\n");
            }            if (!generateObjJ && compiler.imBuffer.isEmpty())
            {
                saveJSBuffer.concat("class_addMethods(the_class, [");
                saveJSBuffer.appendStringBuffer(compiler.imBuffer);
                saveJSBuffer.concat("]);\n");
            }            if (!generateObjJ && compiler.cmBuffer.isEmpty())
            {
                saveJSBuffer.concat("class_addMethods(meta_class, [");
                saveJSBuffer.appendStringBuffer(compiler.cmBuffer);
                saveJSBuffer.concat("]);\n");
            }            if (!generateObjJ)
                saveJSBuffer.concat("}\n");
            compiler.jsBuffer = saveJSBuffer;
            if (!generate)
                compiler.lastPos = node.end;
            if (generateObjJ)
                saveJSBuffer.concat("\n@end");
            if (protocols)
            {
                var protocolDefs = [];
                for (var i = 0, size = protocols.length; i < size; i++)
                {
                    var protocol = protocols[i],
                        protocolDef = compiler.getProtocolDef(protocol.name);
                    if (!protocolDef)
                        throw compiler.error_message("Cannot find protocol declaration for '" + protocol.name + "'", protocol);
                    protocolDefs.push(protocolDef);
                }                var unimplementedMethods = classDef.listOfNotImplementedMethodsForProtocols(protocolDefs);
                if (unimplementedMethods && unimplementedMethods.length > 0)
                    for (var j = 0, unimpSize = unimplementedMethods.length; j < unimpSize; j++)
                    {
                        var unimplementedMethod = unimplementedMethods[j],
                            methodDef = unimplementedMethod.methodDef,
                            protocolDef = unimplementedMethod.protocolDef;
                        compiler.addWarning(createMessage("Method '" + methodDef.name + "' in protocol '" + protocolDef.name + "' is not implemented", node.classname, compiler.source));
                    }            }        }, ProtocolDeclarationStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                protocolName = node.protocolname.name,
                protocolDef = compiler.getProtocolDef(protocolName),
                protocols = node.protocols,
                protocolScope = new Scope(st),
                inheritFromProtocols = [],
                generateObjJ = compiler.options.generateObjJ;
            if (protocolDef)
                throw compiler.error_message("Duplicate protocol " + protocolName, node.protocolname);
            compiler.imBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            compiler.cmBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            if (!generate)
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
            if (generateObjJ)
            {
                buffer.concat("@protocol ");
                c(node.protocolname, st, "IdentifierName");
            }            else
            {
                buffer.concat("{var the_protocol = objj_allocateProtocol(\"" + protocolName + "\");", node);
            }            if (protocols)
            {
                if (generateObjJ)
                    buffer.concat(" <");
                for (var i = 0, size = protocols.length; i < size; i++)
                {
                    var protocol = protocols[i],
                        inheritFromProtocolName = protocol.name,
                        inheritProtocolDef = compiler.getProtocolDef(inheritFromProtocolName);
                    if (!inheritProtocolDef)
                        throw compiler.error_message("Can't find protocol " + inheritFromProtocolName, protocol);
                    if (generateObjJ)
                    {
                        if (i)
                            buffer.concat(", ");
                        c(protocol, st, "IdentifierName");
                    }                    else
                    {
                        buffer.concat("\nvar aProtocol = objj_getProtocol(\"" + inheritFromProtocolName + "\");", node);
                        buffer.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\"" + protocolName + "\\\"\");", node);
                        buffer.concat("\nprotocol_addProtocol(the_protocol, aProtocol);", node);
                    }                    inheritFromProtocols.push(inheritProtocolDef);
                }                if (generateObjJ)
                    buffer.concat(">");
            }            protocolDef = new ProtocolDef(protocolName, inheritFromProtocols);
            compiler.protocolDefs[protocolName] = protocolDef;
            protocolScope.protocolDef = protocolDef;
            var someRequired = node.required;
            if (someRequired)
            {
                var requiredLength = someRequired.length;
                if (requiredLength > 0)
                {
                    for (var i = 0; i < requiredLength; ++i)
                    {
                        var required = someRequired[i];
                        if (!generate)
                            compiler.lastPos = required.start;
                        c(required, protocolScope, "Statement");
                    }                    if (!generate)
                        buffer.concat(compiler.source.substring(compiler.lastPos, required.end));
                }            }            if (generateObjJ)
            {
                buffer.concatFormat("\n@end");
            }            else
            {
                buffer.concat("\nobjj_registerProtocol(the_protocol);\n");
                if (compiler.imBuffer.isEmpty())
                {
                    buffer.concat("protocol_addMethodDescriptions(the_protocol, [");
                    buffer.appendStringBuffer(compiler.imBuffer);
                    buffer.concat("], true, true);\n");
                }                if (compiler.cmBuffer.isEmpty())
                {
                    buffer.concat("protocol_addMethodDescriptions(the_protocol, [");
                    buffer.appendStringBuffer(compiler.cmBuffer);
                    buffer.concat("], true, false);\n");
                }                buffer.concat("}");
            }            compiler.jsBuffer = buffer;
            if (!generate)
                compiler.lastPos = node.end;
        }, IvarDeclaration:         function(node, st, c, format)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer;
            if (node.outlet)
                buffer.concat("@outlet ");
            c(node.ivartype, st, "IdentifierName");
            buffer.concat(" ");
            c(node.id, st, "IdentifierName");
            if (node.accessors)
                buffer.concat(" @accessors");
        }, MethodDeclarationStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                saveJSBuffer = compiler.jsBuffer,
                methodScope = new Scope(st),
                isInstanceMethodType = node.methodtype === '-',
                selectors = node.selectors,
                nodeArguments = node.arguments,
                returnType = node.returntype,
                types = [returnType ? returnType.name : node.action ? "void" : "id"],
                returnTypeProtocols = returnType ? returnType.protocols : null,
                selector = selectors[0].name,
                generateObjJ = compiler.options.generateObjJ;
            if (returnTypeProtocols)
                for (var i = 0, size = returnTypeProtocols.length; i < size; i++)
                {
                    var returnTypeProtocol = returnTypeProtocols[i];
                    if (!compiler.getProtocolDef(returnTypeProtocol.name))
                    {
                        compiler.addWarning(createMessage("Cannot find protocol declaration for '" + returnTypeProtocol.name + "'", returnTypeProtocol, compiler.source));
                    }                }            if (!generate)
                saveJSBuffer.concat(compiler.source.substring(compiler.lastPos, node.start));
            if (generateObjJ)
            {
                compiler.jsBuffer.concat(isInstanceMethodType ? "- (" : "+ (");
                compiler.jsBuffer.concat(types[0]);
                compiler.jsBuffer.concat(")");
            }            else
            {
                compiler.jsBuffer = isInstanceMethodType ? compiler.imBuffer : compiler.cmBuffer;
            }            var size = nodeArguments.length;
            if (size > 0)
            {
                for (var i = 0; i < nodeArguments.length; i++)
                {
                    var argument = nodeArguments[i],
                        argumentType = argument.type,
                        argumentTypeName = argumentType ? argumentType.name : "id",
                        argumentProtocols = argumentType ? argumentType.protocols : null;
                    types.push(argumentTypeName);
                    if (i === 0)
                        selector += ":";
                    else
                        selector += (selectors[i] ? selectors[i].name : "") + ":";
                    if (argumentProtocols)
                        for (var j = 0, size = argumentProtocols.length; j < size; j++)
                        {
                            var argumentProtocol = argumentProtocols[j];
                            if (!compiler.getProtocolDef(argumentProtocol.name))
                            {
                                compiler.addWarning(createMessage("Cannot find protocol declaration for '" + argumentProtocol.name + "'", argumentProtocol, compiler.source));
                            }                        }                    if (generateObjJ)
                    {
                        var aSelector = selectors[i];
                        if (i)
                            compiler.jsBuffer.concat(" ");
                        compiler.jsBuffer.concat((aSelector ? aSelector.name : "") + ":");
                        compiler.jsBuffer.concat("(");
                        compiler.jsBuffer.concat(argumentTypeName);
                        if (argumentProtocols)
                        {
                            compiler.jsBuffer.concat(" <");
                            for (var j = 0, size = argumentProtocols.length; j < size; j++)
                            {
                                var argumentProtocol = argumentProtocols[j];
                                if (j)
                                    compiler.jsBuffer.concat(", ");
                                compiler.jsBuffer.concat(argumentProtocol.name);
                            }                            compiler.jsBuffer.concat(">");
                        }                        compiler.jsBuffer.concat(")");
                        c(argument.identifier, st, "IdentifierName");
                    }                }            }            else if (generateObjJ)
            {
                var selectorNode = selectors[0];
                compiler.jsBuffer.concat(selectorNode.name, selectorNode);
            }            if (generateObjJ)
            {
                if (node.parameters)
                {
                    compiler.jsBuffer.concat(", ...");
                }            }            else
            {
                if (compiler.jsBuffer.isEmpty())
                    compiler.jsBuffer.concat(", ");
                compiler.jsBuffer.concat("new objj_method(sel_getUid(\"", node);
                compiler.jsBuffer.concat(selector);
                compiler.jsBuffer.concat("\"), ");
            }            if (node.body)
            {
                if (!generateObjJ)
                {
                    compiler.jsBuffer.concat("function");
                    if (compiler.options.includeMethodFunctionNames)
                    {
                        compiler.jsBuffer.concat(" $" + st.currentClassName() + "__" + selector.replace(/:/g, "_"));
                    }                    compiler.jsBuffer.concat("(self, _cmd");
                }                methodScope.methodType = node.methodtype;
                methodScope.vars["self"] = {type: "method base", scope: methodScope};
                methodScope.vars["_cmd"] = {type: "method base", scope: methodScope};
                if (nodeArguments)
                    for (var i = 0; i < nodeArguments.length; i++)
                    {
                        var argument = nodeArguments[i],
                            argumentName = argument.identifier.name;
                        if (!generateObjJ)
                        {
                            compiler.jsBuffer.concat(", ");
                            compiler.jsBuffer.concat(argumentName, argument.identifier);
                        }                        methodScope.vars[argumentName] = {type: "method argument", node: argument};
                    }                if (!generateObjJ)
                    compiler.jsBuffer.concat(")\n");
                if (!generate)
                    compiler.lastPos = node.startOfBody;
                indentation += indentStep;
                methodScope.endOfScopeBody = true;
                c(node.body, methodScope, "Statement");
                indentation = indentation.substring(indentationSize);
                if (!generate)
                    compiler.jsBuffer.concat(compiler.source.substring(compiler.lastPos, node.body.end));
                if (!generateObjJ)
                    compiler.jsBuffer.concat("\n");
            }            else
            {
                if (generateObjJ)
                    compiler.jsBuffer.concat(";");
                else
                    compiler.jsBuffer.concat("Nil\n");
            }            if (!generateObjJ)
            {
                if (compiler.options.includeMethodArgumentTypeSignatures)
                    compiler.jsBuffer.concat("," + JSON.stringify(types));
                compiler.jsBuffer.concat(")");
                compiler.jsBuffer = saveJSBuffer;
            }            if (!generate)
                compiler.lastPos = node.end;
            var def = st.classDef,
                alreadyDeclared;
            if (def)
                alreadyDeclared = isInstanceMethodType ? def.getInstanceMethod(selector) : def.getClassMethod(selector);
            else
                def = st.protocolDef;
            if (!def)
                throw "InternalError: MethodDeclaration without ClassDeclaration or ProtocolDeclaration at line: " + (acorn.getLineInfo(compiler.source, node.start)).line;
            if (!alreadyDeclared)
            {
                var protocols = def.protocols;
                if (protocols)
                    for (var i = 0, size = protocols.length; i < size; i++)
                    {
                        var protocol = protocols[i],
                            alreadyDeclared = isInstanceMethodType ? protocol.getInstanceMethod(selector) : protocol.getClassMethod(selector);
                        if (alreadyDeclared)
                            break;
                    }            }            if (alreadyDeclared)
            {
                var declaredTypes = alreadyDeclared.types;
                if (declaredTypes)
                {
                    var typeSize = declaredTypes.length;
                    if (typeSize > 0)
                    {
                        var declaredReturnType = declaredTypes[0];
                        if (declaredReturnType !== types[0] && !(declaredReturnType === 'id' && returnType && returnType.typeisclass))
                            compiler.addWarning(createMessage("Conflicting return type in implementation of '" + selector + "': '" + declaredReturnType + "' vs '" + types[0] + "'", returnType || node.action || selectors[0], compiler.source));
                        for (var i = 1; i < typeSize; i++)
                        {
                            var parameterType = declaredTypes[i];
                            if (parameterType !== types[i] && !(parameterType === 'id' && nodeArguments[i - 1].type.typeisclass))
                                compiler.addWarning(createMessage("Conflicting parameter types in implementation of '" + selector + "': '" + parameterType + "' vs '" + types[i] + "'", nodeArguments[i - 1].type || nodeArguments[i - 1].identifier, compiler.source));
                        }                    }                }            }            var methodDef = new MethodDef(selector, types);
            if (isInstanceMethodType)
                def.addInstanceMethod(methodDef);
            else
                def.addClassMethod(methodDef);
        }, MessageSendExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                inlineMsgSend = compiler.options.inlineMsgSendFunctions,
                buffer = compiler.jsBuffer,
                nodeObject = node.object,
                selectors = node.selectors,
                nodeArguments = node.arguments,
                argumentsLength = nodeArguments.length,
                firstSelector = selectors[0],
                selector = firstSelector ? firstSelector.name : "",
                parameters = node.parameters,
                options = compiler.options,
                generateObjJ = options.generateObjJ;
            for (var i = 0; i < argumentsLength; i++)
            {
                if (i !== 0)
                {
                    var nextSelector = selectors[i];
                    if (nextSelector)
                        selector += nextSelector.name;
                }                selector += ":";
            }            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = nodeObject ? nodeObject.start : node.arguments.length ? node.arguments[0].start : node.end;
            }            else if (!inlineMsgSend)
            {
                var totalNoOfParameters = argumentsLength;
                if (parameters)
                    totalNoOfParameters += parameters.length;
            }            if (node.superObject)
            {
                if (!generate)
                    buffer.concat(" ");
                if (generateObjJ)
                {
                    buffer.concat("[super ");
                }                else
                {
                    if (inlineMsgSend)
                    {
                        buffer.concat("(", node);
                        buffer.concat(st.currentMethodType() === "+" ? compiler.currentSuperMetaClass : compiler.currentSuperClass);
                        buffer.concat(".method_dtable[\"", node);
                        buffer.concat(selector);
                        buffer.concat("\"] || _objj_forward)(self", node);
                    }                    else
                    {
                        buffer.concat("objj_msgSendSuper", node);
                        if (totalNoOfParameters < 4)
                        {
                            buffer.concat("" + totalNoOfParameters);
                        }                        buffer.concat("({ receiver:self, super_class:" + (st.currentMethodType() === "+" ? compiler.currentSuperMetaClass : compiler.currentSuperClass) + " }", node);
                    }                }            }            else
            {
                if (generate)
                {
                    var receiverIsIdentifier = nodeObject.type === "Identifier" && !(st.currentMethodType() === "-" && compiler.getIvarForClass(nodeObject.name, st) && !st.getLvar(nodeObject.name, true)),
                        selfLvar,
                        receiverIsNotSelf;
                    if (receiverIsIdentifier)
                    {
                        var name = nodeObject.name,
                            selfLvar = st.getLvar(name);
                        if (name === "self")
                        {
                            receiverIsNotSelf = !selfLvar || !selfLvar.scope || selfLvar.scope.assignmentToSelf;
                        }                        else
                        {
                            receiverIsNotSelf = !!selfLvar || !compiler.getClassDef(name);
                        }                        if (receiverIsNotSelf)
                        {
                            buffer.concat("(", node);
                            c(nodeObject, st, "Expression");
                            buffer.concat(" == null ? null : ", node);
                        }                        if (inlineMsgSend)
                            buffer.concat("(", node);
                        c(nodeObject, st, "Expression");
                    }                    else
                    {
                        receiverIsNotSelf = true;
                        if (!st.receiverLevel)
                            st.receiverLevel = 0;
                        buffer.concat("((___r" + ++st.receiverLevel, node);
                        buffer.concat(" = ", node);
                        c(nodeObject, st, "Expression");
                        buffer.concat(")", node);
                        buffer.concat(", ___r" + st.receiverLevel, node);
                        buffer.concat(" == null ? null : ", node);
                        if (inlineMsgSend)
                            buffer.concat("(", node);
                        buffer.concat("___r" + st.receiverLevel, node);
                        if (!(st.maxReceiverLevel >= st.receiverLevel))
                            st.maxReceiverLevel = st.receiverLevel;
                    }                    if (inlineMsgSend)
                    {
                        buffer.concat(".isa.method_msgSend[\"", node);
                        buffer.concat(selector, node);
                        buffer.concat("\"] || _objj_forward)", node);
                    }                    else
                    {
                        buffer.concat(".isa.objj_msgSend", node);
                    }                }                else
                {
                    buffer.concat(" ");
                    buffer.concat("objj_msgSend(");
                    buffer.concat(compiler.source.substring(compiler.lastPos, nodeObject.end));
                }            }            if (generateObjJ)
            {
                for (var i = 0; i < argumentsLength || argumentsLength === 0 && i === 0; i++)
                {
                    var selector = selectors[i];
                    buffer.concat(" ");
                    buffer.concat(selector ? selector.name : "");
                    if (argumentsLength > 0)
                    {
                        var argument = nodeArguments[i];
                        buffer.concat(":");
                        c(argument, st, "Expression");
                    }                }                if (parameters)
                    for (var i = 0, size = parameters.length; i < size; ++i)
                    {
                        var parameter = parameters[i];
                        buffer.concat(", ");
                        c(parameter, st, "Expression");
                    }                buffer.concat("]");
            }            else
            {
                var selectorJSPath;
                if (generate && !node.superObject)
                {
                    if (!inlineMsgSend)
                    {
                        if (totalNoOfParameters < 4)
                        {
                            buffer.concat("" + totalNoOfParameters, node);
                        }                    }                    if (receiverIsIdentifier)
                    {
                        buffer.concat("(", node);
                        c(nodeObject, st, "Expression");
                    }                    else
                    {
                        buffer.concat("(___r" + st.receiverLevel, node);
                    }                    if (options.sourceMap && nodeObject.type === "Identifier")
                    {
                        compiler.jsBuffer = new StringBuffer();
                        c(nodeObject, st, "Expression");
                        var aTarget = compiler.jsBuffer.toString();
                        selectorJSPath = aTarget + ".isa.method_dtable[\"" + selector + "\"]";
                        compiler.jsBuffer = buffer;
                    }                }                buffer.concat(", ", node);
                if (selectorJSPath)
                {
                    buffer.concat("(", node);
                    for (var i = 0; i < selectors.length; i++)
                    {
                        var nextSelector = selectors[i];
                        if (nextSelector)
                        {
                            buffer.concat(selectorJSPath, nextSelector);
                            buffer.concat(", ", node);
                        }                    }                }                buffer.concat("\"", node);
                buffer.concat(selector, node);
                buffer.concat(selectorJSPath ? "\")" : "\"", node);
                if (nodeArguments)
                    for (var i = 0; i < nodeArguments.length; i++)
                    {
                        var argument = nodeArguments[i];
                        buffer.concat(", ", node);
                        if (!generate)
                            compiler.lastPos = argument.start;
                        c(argument, st, "Expression");
                        if (!generate)
                        {
                            buffer.concat(compiler.source.substring(compiler.lastPos, argument.end));
                            compiler.lastPos = argument.end;
                        }                    }                if (parameters)
                    for (var i = 0; i < parameters.length; ++i)
                    {
                        var parameter = parameters[i];
                        buffer.concat(", ", node);
                        if (!generate)
                            compiler.lastPos = parameter.start;
                        c(parameter, st, "Expression");
                        if (!generate)
                        {
                            buffer.concat(compiler.source.substring(compiler.lastPos, parameter.end));
                            compiler.lastPos = parameter.end;
                        }                    }                if (generate && !node.superObject)
                {
                    if (receiverIsNotSelf)
                        buffer.concat(")", node);
                    if (!receiverIsIdentifier)
                        st.receiverLevel--;
                }                buffer.concat(")", node);
            }            if (!generate)
                compiler.lastPos = node.end;
        }, SelectorLiteralExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generate = compiler.generate,
                generateObjJ = compiler.options.generateObjJ;
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                buffer.concat(" ");
            }            buffer.concat(generateObjJ ? "@selector(" : "sel_getUid(\"", node);
            buffer.concat(node.selector);
            buffer.concat(generateObjJ ? ")" : "\")");
            if (!generate)
                compiler.lastPos = node.end;
        }, ProtocolLiteralExpression:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generate = compiler.generate,
                generateObjJ = compiler.options.generateObjJ;
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                buffer.concat(" ");
            }            buffer.concat(generateObjJ ? "@protocol(" : "objj_getProtocol(\"", node);
            c(node.id, st, "IdentifierName");
            buffer.concat(generateObjJ ? ")" : "\")");
            if (!generate)
                compiler.lastPos = node.end;
        }, Reference:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generate = compiler.generate,
                generateObjJ = compiler.options.generateObjJ;
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                buffer.concat(" ");
            }            if (generateObjJ)
            {
                buffer.concat("@ref(", node);
                buffer.concat(node.element.name, node.element);
                buffer.concat(")", node);
            }            else
            {
                buffer.concat("function(__input) { if (arguments.length) return ", node);
                c(node.element, st, "Expression");
                buffer.concat(" = __input; return ");
                c(node.element, st, "Expression");
                buffer.concat("; }");
            }            if (!generate)
                compiler.lastPos = node.end;
        }, Dereference:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generate = compiler.generate,
                generateObjJ = compiler.options.generateObjJ;
            checkCanDereference(st, node.expr);
            if (!generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.expr.start;
            }            if (generateObjJ)
                buffer.concat("@deref(");
            c(node.expr, st, "Expression");
            if (!generate)
                buffer.concat(compiler.source.substring(compiler.lastPos, node.expr.end));
            if (generateObjJ)
                buffer.concat(")");
            else
                buffer.concat("()");
            if (!generate)
                compiler.lastPos = node.end;
        }, ClassStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generateObjJ = compiler.options.generateObjJ;
            if (!compiler.generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start;
                buffer.concat("//");
            }            if (generateObjJ)
            {
                buffer.concat("@class ");
                c(node.id, st, "IdentifierName");
            }            var className = node.id.name;
            if (compiler.getTypeDef(className))
                throw compiler.error_message(className + " is already declared as a type", node.id);
            if (!compiler.getClassDef(className))
            {
                compiler.classDefs[className] = new ClassDef(false, className);
            }            st.vars[node.id.name] = {type: "class", node: node.id};
        }, GlobalStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                buffer = compiler.jsBuffer,
                generateObjJ = compiler.options.generateObjJ;
            if (!compiler.generate)
            {
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start;
                buffer.concat("//");
            }            if (generateObjJ)
            {
                buffer.concat("@global ");
                c(node.id, st, "IdentifierName");
            }            (st.rootScope()).vars[node.id.name] = {type: "global", node: node.id};
        }, PreprocessStatement:         function(node, st, c)
        {
            var compiler = st.compiler;
            if (!compiler.generate)
            {
                compiler.jsBuffer.concat(compiler.source.substring(compiler.lastPos, node.start));
                compiler.lastPos = node.start;
                compiler.jsBuffer.concat("//");
            }        }, TypeDefStatement:         function(node, st, c)
        {
            var compiler = st.compiler,
                generate = compiler.generate,
                buffer = compiler.jsBuffer,
                typeDefName = node.typedefname.name,
                typeDef = compiler.getTypeDef(typeDefName),
                typeDefScope = new Scope(st);
            if (typeDef)
                throw compiler.error_message("Duplicate type definition " + typeDefName, node.typedefname);
            if (compiler.getClassDef(typeDefName))
                throw compiler.error_message(typeDefName + " is already declared as class", node.typedefname);
            if (!generate)
                buffer.concat(compiler.source.substring(compiler.lastPos, node.start));
            buffer.concat("{var the_typedef = objj_allocateTypeDef(\"" + typeDefName + "\");", node);
            typeDef = new TypeDef(typeDefName);
            compiler.typeDefs[typeDefName] = typeDef;
            typeDefScope.typeDef = typeDef;
            buffer.concat("\nobjj_registerTypeDef(the_typedef);\n");
            buffer.concat("}");
            if (!generate)
                compiler.lastPos = node.end;
        }});
    });
    function FileDependency(aURL, isLocal)
    {
        this._URL = aURL;
        this._isLocal = isLocal;
    }
    exports.FileDependency = FileDependency;
    FileDependency.prototype.URL =     function()
    {
        return this._URL;
    };
    FileDependency.prototype.isLocal =     function()
    {
        return this._isLocal;
    };
    FileDependency.prototype.toMarkedString =     function()
    {
        var URLString = (this.URL()).absoluteString();
        return (this.isLocal() ? MARKER_IMPORT_LOCAL : MARKER_IMPORT_STD) + ";" + URLString.length + ";" + URLString;
    };
    FileDependency.prototype.toString =     function()
    {
        return (this.isLocal() ? "LOCAL: " : "STD: ") + this.URL();
    };
    var ExecutableUnloadedFileDependencies = 0,
        ExecutableLoadingFileDependencies = 1,
        ExecutableLoadedFileDependencies = 2,
        ExecutableCantStartLoadYetFileDependencies = 3,
        AnonymousExecutableCount = 0;
    function Executable(aCode, fileDependencies, aURL, aFunction, aCompiler, aFilenameTranslateDictionary, sourceMap)
    {
        if (arguments.length === 0)
            return this;
        this._code = aCode;
        this._function = aFunction || null;
        this._URL = makeAbsoluteURL(aURL || new CFURL("(Anonymous" + AnonymousExecutableCount++ + ")"));
        this._compiler = aCompiler || null;
        this._fileDependencies = fileDependencies;
        this._filenameTranslateDictionary = aFilenameTranslateDictionary;
        if (sourceMap)
            this._base64EncodedSourceMap = sourceMap;
        if (!fileDependencies)
        {
            this._fileDependencyStatus = ExecutableCantStartLoadYetFileDependencies;
            this._fileDependencyCallbacks = [];
        }
        else if (fileDependencies.length)
        {
            this._fileDependencyStatus = ExecutableUnloadedFileDependencies;
            this._fileDependencyCallbacks = [];
        }
        else
        {
            this._fileDependencyStatus = ExecutableLoadedFileDependencies;
        }
        if (this._function)
            return;
        if (!aCompiler)
            this.setCode(aCode);
    }
    exports.Executable = Executable;
    Executable.prototype.path =     function()
    {
        return (this.URL()).path();
    };
    Executable.prototype.URL =     function()
    {
        return this._URL;
    };
    Executable.prototype.URL.displayName = "Executable.prototype.URL";
    Executable.prototype.functionParameters =     function()
    {
        var functionParameters = ["global", "objj_executeFile", "objj_importFile"];
        return functionParameters;
    };
    Executable.prototype.functionParameters.displayName = "Executable.prototype.functionParameters";
    Executable.prototype.functionArguments =     function()
    {
        var functionArguments = [global, this.fileExecuter(), this.fileImporter()];
        return functionArguments;
    };
    Executable.prototype.functionArguments.displayName = "Executable.prototype.functionArguments";
    Executable.prototype.execute =     function()
    {
        if (this._compiler)
        {
            var fileDependencies = this.fileDependencies(),
                index = 0,
                count = fileDependencies.length;
            this._compiler.pushImport((this.URL()).lastPathComponent());
            for (; index < count; ++index)
            {
                var fileDependency = fileDependencies[index],
                    isQuoted = fileDependency.isLocal(),
                    URL = fileDependency.URL();
                this.fileExecuter()(URL, isQuoted);
            }            this._compiler.popImport();
            this.setCode(this._compiler.compilePass2(), this._compiler.map());
            if (FileExecutable.printWarningsAndErrors(this._compiler, exports.messageOutputFormatInXML))
                throw "Compilation error";
            this._compiler = null;
        }        var oldContextBundle = CONTEXT_BUNDLE;
        CONTEXT_BUNDLE = CFBundle.bundleContainingURL(this.URL());
        var result = this._function.apply(global, this.functionArguments());
        CONTEXT_BUNDLE = oldContextBundle;
        return result;
    };
    Executable.prototype.execute.displayName = "Executable.prototype.execute";
    Executable.prototype.code =     function()
    {
        return this._code;
    };
    Executable.prototype.code.displayName = "Executable.prototype.code";
    Executable.prototype.setCode =     function(code, sourceMap)
    {
        this._code = code;
        var parameters = (this.functionParameters()).join(",");
        var sourceMapBase64;
        sourceMapBase64 = this._base64EncodedSourceMap;
        var absoluteString = (this.URL()).absoluteString();
        code += "/**/\n//# sourceURL=" + absoluteString + "s";
        if (sourceMap)
        {
            if (typeof btoa === 'function')
                sourceMapBase64 = btoa(UTF16ToUTF8(sourceMap));
            else if (typeof Buffer === 'function')
                sourceMapBase64 = (new Buffer(sourceMap)).toString("base64");
        }        if (sourceMapBase64)
        {
            code = code.substring(exports.ObjJCompiler.numberOfLinesAtTopOfFunction());
            this._base64EncodedSourceMap = sourceMapBase64;
            code += "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64," + sourceMapBase64;
        }        this._function = new Function(parameters, code);
        this._function.displayName = absoluteString;
    };
    Executable.prototype.setCode.displayName = "Executable.prototype.setCode";
    Executable.prototype.fileDependencies =     function()
    {
        return this._fileDependencies;
    };
    Executable.prototype.fileDependencies.displayName = "Executable.prototype.fileDependencies";
    Executable.prototype.setFileDependencies =     function(newValue)
    {
        this._fileDependencies = newValue;
    };
    Executable.prototype.setFileDependencies.displayName = "Executable.prototype.setFileDependencies";
    Executable.prototype.hasLoadedFileDependencies =     function()
    {
        return this._fileDependencyStatus === ExecutableLoadedFileDependencies;
    };
    Executable.prototype.hasLoadedFileDependencies.displayName = "Executable.prototype.hasLoadedFileDependencies";
    var fileDependencyLoadCount = 0,
        fileDependencyExecutables = [],
        fileDependencyMarkers = {};
    Executable.prototype.loadFileDependencies =     function(aCallback)
    {
        var status = this._fileDependencyStatus;
        if (aCallback)
        {
            if (status === ExecutableLoadedFileDependencies)
                return aCallback();
            this._fileDependencyCallbacks.push(aCallback);
        }        if (status === ExecutableUnloadedFileDependencies)
        {
            if (fileDependencyLoadCount)
                throw "Can't load";
            loadFileDependenciesForExecutable(this);
        }    };
    Executable.prototype.loadFileDependencies.displayName = "Executable.prototype.loadFileDependencies";
    Executable.prototype.setExecutableUnloadedFileDependencies =     function()
    {
        if (this._fileDependencyStatus === ExecutableCantStartLoadYetFileDependencies)
            this._fileDependencyStatus = ExecutableUnloadedFileDependencies;
    };
    Executable.prototype.setExecutableUnloadedFileDependencies.displayName = "Executable.prototype.setExecutableUnloadedFileDependencies";
    Executable.prototype.isExecutableCantStartLoadYetFileDependencies =     function()
    {
        return this._fileDependencyStatus === ExecutableCantStartLoadYetFileDependencies;
    };
    Executable.prototype.setExecutableUnloadedFileDependencies.displayName = "Executable.prototype.setExecutableUnloadedFileDependencies";
    function loadFileDependenciesForExecutable(anExecutable)
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
                marker = (isQuoted && referenceURLString + " " || "") + URL;
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
    function fileExecutableSearchFinished(aFileExecutable)
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
    Executable.prototype.referenceURL =     function()
    {
        if (this._referenceURL === undefined)
            this._referenceURL = new CFURL(".", this.URL());
        return this._referenceURL;
    };
    Executable.prototype.referenceURL.displayName = "Executable.prototype.referenceURL";
    Executable.prototype.fileImporter =     function()
    {
        return Executable.fileImporterForURL(this.referenceURL());
    };
    Executable.prototype.fileImporter.displayName = "Executable.prototype.fileImporter";
    Executable.prototype.fileExecuter =     function()
    {
        return Executable.fileExecuterForURL(this.referenceURL());
    };
    Executable.prototype.fileExecuter.displayName = "Executable.prototype.fileExecuter";
    Executable.prototype.fileExecutableSearcher =     function()
    {
        return Executable.fileExecutableSearcherForURL(this.referenceURL());
    };
    Executable.prototype.fileExecutableSearcher.displayName = "Executable.prototype.fileExecutableSearcher";
    var cachedFileExecuters = {};
    Executable.fileExecuterForURL =     function(aURL)
    {
        var referenceURL = makeAbsoluteURL(aURL),
            referenceURLString = referenceURL.absoluteString(),
            cachedFileExecuter = cachedFileExecuters[referenceURLString];
        if (!cachedFileExecuter)
        {
            cachedFileExecuter =             function(aURL, isQuoted, shouldForce)
            {
                Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,                 function(aFileExecutable)
                {
                    if (!aFileExecutable.hasLoadedFileDependencies())
                        throw "No executable loaded for file at URL " + aURL;
                    aFileExecutable.execute(shouldForce);
                });
            };
            cachedFileExecuters[referenceURLString] = cachedFileExecuter;
        }        return cachedFileExecuter;
    };
    Executable.fileExecuterForURL.displayName = "Executable.fileExecuterForURL";
    var cachedFileImporters = {};
    Executable.fileImporterForURL =     function(aURL)
    {
        var referenceURL = makeAbsoluteURL(aURL),
            referenceURLString = referenceURL.absoluteString(),
            cachedFileImporter = cachedFileImporters[referenceURLString];
        if (!cachedFileImporter)
        {
            cachedFileImporter =             function(aURL, isQuoted, aCallback)
            {
                enableCFURLCaching();
                Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,                 function(aFileExecutable)
                {
                    aFileExecutable.loadFileDependencies(                    function()
                    {
                        aFileExecutable.execute();
                        disableCFURLCaching();
                        if (aCallback)
                            aCallback();
                    });
                });
            };
            cachedFileImporters[referenceURLString] = cachedFileImporter;
        }        return cachedFileImporter;
    };
    Executable.fileImporterForURL.displayName = "Executable.fileImporterForURL";
    var cachedFileExecutableSearchers = {},
        cachedFileExecutableSearchResults = {};
    function countProp(x)
    {
        var count = 0;
        for (var k in x)
        {
            if (x.hasOwnProperty(k))
            {
                ++count;
            }
        }
        return count;
    }
    Executable.resetCachedFileExecutableSearchers =     function()
    {
        cachedFileExecutableSearchers = {};
        cachedFileExecutableSearchResults = {};
        cachedFileImporters = {};
        cachedFileExecuters = {};
        fileDependencyMarkers = {};
    };
    Executable.fileExecutableSearcherForURL =     function(referenceURL)
    {
        var referenceURLString = referenceURL.absoluteString(),
            cachedFileExecutableSearcher = cachedFileExecutableSearchers[referenceURLString];
        if (!cachedFileExecutableSearcher)
        {
            var aFilenameTranslateDictionary = Executable.filenameTranslateDictionary ? Executable.filenameTranslateDictionary() : null;
            cachedFileExecutableSearcher =             function(aURL, isQuoted, success)
            {
                var cacheUID = (isQuoted && referenceURL || "") + aURL,
                    cachedResult = cachedFileExecutableSearchResults[cacheUID];
                if (cachedResult)
                    return completed(cachedResult);
                var isAbsoluteURL = aURL instanceof CFURL && aURL.scheme();
                if (isQuoted || isAbsoluteURL)
                {
                    if (!isAbsoluteURL)
                        aURL = new CFURL(aURL, referenceURL);
                    StaticResource.resolveResourceAtURL(aURL, NO, completed, aFilenameTranslateDictionary);
                }                else
                    StaticResource.resolveResourceAtURLSearchingIncludeURLs(aURL, completed);
                function completed(aStaticResource)
                {
                    if (!aStaticResource)
                    {
                        var compilingFileUrl = exports.ObjJCompiler ? exports.ObjJCompiler.currentCompileFile : null;
                        throw new Error("Could not load file at " + aURL + (compilingFileUrl ? " when compiling " + compilingFileUrl : "") + "\nwith includeURLs: " + StaticResource.includeURLs());
                    }
                    cachedFileExecutableSearchResults[cacheUID] = aStaticResource;
                    success(new FileExecutable(aStaticResource.URL(), aFilenameTranslateDictionary));
                }
            };
            cachedFileExecutableSearchers[referenceURLString] = cachedFileExecutableSearcher;
        }        return cachedFileExecutableSearcher;
    };
    Executable.fileExecutableSearcherForURL.displayName = "Executable.fileExecutableSearcherForURL";
    var SURROGATE_HIGH_START = 0xD800;
    var SURROGATE_HIGH_END = 0xDBFF;
    var SURROGATE_LOW_START = 0xDC00;
    var SURROGATE_LOW_END = 0xDFFF;
    var REPLACEMENT_CHAR = 0xFFFD;
    var FIRSTBYTEMARK = [0x00, 0xC0, 0xE0, 0xF0, 0xF8, 0xFC];
    function UTF16ToUTF8(source)
    {
        var target = "";
        var currentPos = 0;
        for (var i = 0; i < source.length; i++)
        {
            var c = source.charCodeAt(i);
            if (c < 0x80)
                continue;
            if (i > currentPos)
                target += source.substring(currentPos, i);
            if (c >= SURROGATE_HIGH_START && c <= SURROGATE_HIGH_END)
            {
                i++;
                if (i < source.length)
                {
                    var c2 = source.charCodeAt(i);
                    if (c2 >= SURROGATE_LOW_START && c2 <= SURROGATE_LOW_END)
                    {
                        c = (c - SURROGATE_HIGH_START << 10) + (c2 - SURROGATE_LOW_START) + 0x10000;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else if (c >= SURROGATE_LOW_START && c <= SURROGATE_LOW_END)
            {
                return null;
            }
            currentPos = i + 1;
            enc = [];
            var cc = c;
            if (cc >= 0x110000)
            {
                cc = 0x800;
                c = REPLACEMENT_CHAR;
            }
            if (cc >= 0x10000)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            if (cc >= 0x800)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            if (cc >= 0x80)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            enc.unshift(String.fromCharCode(c | FIRSTBYTEMARK[enc.length]));
            target += enc.join("");
        }
        if (currentPos === 0)
            return source;
        if (i > currentPos)
            target += source.substring(currentPos, i);
        return target;
    }
    UTF16ToUTF8.displayName = "UTF16ToUTF8";
    var FileExecutablesForURLStrings = {};
    var currentCompilerFlags = {};
    var currentGccCompilerFlags = "";
    function FileExecutable(aURL, aFilenameTranslateDictionary)
    {
        aURL = makeAbsoluteURL(aURL);
        var URLString = aURL.absoluteString(),
            existingFileExecutable = FileExecutablesForURLStrings[URLString];
        if (existingFileExecutable)
            return existingFileExecutable;
        FileExecutablesForURLStrings[URLString] = this;
        var fileContents = (StaticResource.resourceAtURL(aURL)).contents(),
            executable = NULL,
            extension = (aURL.pathExtension()).toLowerCase();
        this._hasExecuted = NO;
        if (fileContents.match(/^@STATIC;/))
            executable = decompile(fileContents, aURL);
        else if ((extension === "j" || !extension) && !fileContents.match(/^{/))
        {
            var compilerOptions = currentCompilerFlags || {};
            this.cachedIncludeFileSearchResultsContent = {};
            this.cachedIncludeFileSearchResultsURL = {};
            compile(this, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
            return;
        }
        else
            executable = new Executable(fileContents, [], aURL);
        Executable.apply(this, [executable.code(), executable.fileDependencies(), aURL, executable._function, executable._compiler, aFilenameTranslateDictionary]);
    }
    exports.FileExecutable = FileExecutable;
    FileExecutable.prototype = new Executable();
    var compile =     function(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary)
    {
        var acornOptions = compilerOptions.acornOptions || (compilerOptions.acornOptions = {});
        acornOptions.preprocessGetIncludeFile =         function(filePath, isQuoted)
        {
            var referenceURL = new CFURL(".", aURL),
                includeURL = new CFURL(filePath);
            var cacheUID = (isQuoted && referenceURL || "") + includeURL,
                cachedResult = self.cachedIncludeFileSearchResultsContent[cacheUID];
            if (!cachedResult)
            {
                var isAbsoluteURL = includeURL instanceof CFURL && includeURL.scheme(),
                    compileWhenCompleted = NO;
                function completed(aStaticResource)
                {
                    var includeString = aStaticResource && aStaticResource.contents(),
                        lastCharacter = includeString && includeString.charCodeAt(includeString.length - 1);
                    if (includeString == null)
                        throw new Error("Can't load file " + includeURL);
                    if (lastCharacter !== 10 && lastCharacter !== 13 && lastCharacter !== 8232 && lastCharacter !== 8233)
                    {
                        includeString += '\n';
                    }
                    self.cachedIncludeFileSearchResultsContent[cacheUID] = includeString;
                    self.cachedIncludeFileSearchResultsURL[cacheUID] = aStaticResource.URL();
                    if (compileWhenCompleted)
                        compile(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
                }
                if (isQuoted || isAbsoluteURL)
                {
                    if (!isAbsoluteURL)
                        includeURL = new CFURL(includeURL, new CFURL(aFilenameTranslateDictionary[aURL.lastPathComponent()] || ".", referenceURL));
                    StaticResource.resolveResourceAtURL(includeURL, NO, completed);
                }                else
                    StaticResource.resolveResourceAtURLSearchingIncludeURLs(includeURL, completed);
                cachedResult = self.cachedIncludeFileSearchResultsContent[cacheUID];
            }            if (cachedResult)
            {
                return {include: cachedResult, sourceFile: self.cachedIncludeFileSearchResultsURL[cacheUID]};
            }            else
            {
                compileWhenCompleted = YES;
                return null;
            }        };
        var includeFiles = currentCompilerFlags && currentCompilerFlags.includeFiles,
            allPreIncludesResolved = true;
        acornOptions.preIncludeFiles = [];
        if (includeFiles)
            for (var i = 0, size = includeFiles.length; i < size; i++)
            {
                var includeFileUrl = makeAbsoluteURL(includeFiles[i]);
                try {
                    var aResource = StaticResource.resourceAtURL(makeAbsoluteURL(includeFileUrl));
                }
                catch(e) {
                    StaticResource.resolveResourcesAtURLs(includeFiles.map(                    function(u)
                    {
                        return makeAbsoluteURL(u);
                    }),                     function()
                    {
                        compile(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
                    });
                    allPreIncludesResolved = false;
                    break;
                }
                if (aResource)
                {
                    if (aResource.isNotFound())
                    {
                        throw new Error("--include file not found " + includeUrl);
                    }                    var includeString = aResource.contents();
                    var lastCharacter = includeString.charCodeAt(includeString.length - 1);
                    if (lastCharacter !== 10 && lastCharacter !== 13 && lastCharacter !== 8232 && lastCharacter !== 8233)
                        includeString += '\n';
                    acornOptions.preIncludeFiles.push({include: includeString, sourceFile: includeFileUrl.toString()});
                }            }        if (allPreIncludesResolved)
        {
            var compiler = exports.ObjJCompiler.compileFileDependencies(fileContents, aURL, compilerOptions);
            var warningsAndErrors = compiler.warningsAndErrors;
            if (warningsAndErrors && warningsAndErrors.length === 1 && warningsAndErrors[0].message.indexOf("file not found") > -1)
                return;
            if (FileExecutable.printWarningsAndErrors(compiler, exports.messageOutputFormatInXML))
                throw "Compilation error";
            var fileDependencies = compiler.dependencies.map(            function(aFileDep)
            {
                return new FileDependency(new CFURL(aFileDep.url), aFileDep.isLocal);
            });
        }        if (self.isExecutableCantStartLoadYetFileDependencies())
        {
            self.setFileDependencies(fileDependencies);
            self.setExecutableUnloadedFileDependencies();
            self.loadFileDependencies();
        }        else if (self._fileDependencyStatus == null)
        {
            executable = new Executable(compiler && compiler.jsBuffer ? compiler.jsBuffer.toString() : null, fileDependencies, aURL, null, compiler);
            Executable.apply(self, [executable.code(), executable.fileDependencies(), aURL, executable._function, executable._compiler, aFilenameTranslateDictionary]);
        }    };
    compile.displayName = "compile";
    FileExecutable.resetFileExecutables =     function()
    {
        FileExecutablesForURLStrings = {};
        FunctionCache = {};
    };
    FileExecutable.prototype.execute =     function(shouldForce)
    {
        if (this._hasExecuted && !shouldForce)
            return;
        this._hasExecuted = YES;
        Executable.prototype.execute.call(this);
    };
    FileExecutable.prototype.execute.displayName = "FileExecutable.prototype.execute";
    FileExecutable.prototype.hasExecuted =     function()
    {
        return this._hasExecuted;
    };
    FileExecutable.prototype.hasExecuted.displayName = "FileExecutable.prototype.hasExecuted";
    function decompile(aString, aURL)
    {
        var stream = new MarkedStream(aString);
        var marker = NULL,
            code = "",
            dependencies = [],
            sourceMap;
        while (marker = stream.getMarker())
        {
            var text = stream.getString();
            if (marker === MARKER_TEXT)
                code += text;
            else if (marker === MARKER_IMPORT_STD)
                dependencies.push(new FileDependency(new CFURL(text), NO));
            else if (marker === MARKER_IMPORT_LOCAL)
                dependencies.push(new FileDependency(new CFURL(text), YES));
            else if (marker === MARKER_SOURCE_MAP)
                sourceMap = text;
        }
        var fn = FileExecutable._lookupCachedFunction(aURL);
        if (fn)
            return new Executable(code, dependencies, aURL, fn, null, null, sourceMap);
        return new Executable(code, dependencies, aURL, null, null, null, sourceMap);
    }
    var FunctionCache = {};
    FileExecutable._cacheFunction =     function(aURL, fn)
    {
        aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
        FunctionCache[aURL] = fn;
    };
    FileExecutable._lookupCachedFunction =     function(aURL)
    {
        aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
        return FunctionCache[aURL];
    };
    FileExecutable.setCurrentGccCompilerFlags =     function(compilerFlags)
    {
        if (currentGccCompilerFlags === compilerFlags)
            return;
        currentGccCompilerFlags = compilerFlags;
        var objjcFlags = exports.ObjJCompiler.parseGccCompilerFlags(compilerFlags);
        FileExecutable.setCurrentCompilerFlags(objjcFlags);
    };
    FileExecutable.currentGccCompilerFlags =     function(compilerFlags)
    {
        return currentGccCompilerFlags;
    };
    FileExecutable.setCurrentCompilerFlags =     function(compilerFlags)
    {
        currentCompilerFlags = compilerFlags;
        if (currentCompilerFlags.transformNamedFunctionDeclarationToAssignment == null)
            currentCompilerFlags.transformNamedFunctionDeclarationToAssignment = true;
        if (currentCompilerFlags.sourceMap == null)
            currentCompilerFlags.sourceMap = false;
        if (currentCompilerFlags.inlineMsgSendFunctions == null)
            currentCompilerFlags.inlineMsgSendFunctions = false;
    };
    FileExecutable.currentCompilerFlags =     function(compilerFlags)
    {
        return currentCompilerFlags;
    };
    FileExecutable.printWarningsAndErrors =     function(compiler, printXML)
    {
        var warnings = [],
            anyErrors = false;
        for (var i = 0; i < compiler.warningsAndErrors.length; i++)
        {
            var warning = compiler.warningsAndErrors[i],
                message = compiler.prettifyMessage(warning);
            anyErrors = anyErrors || warning.messageType === "ERROR";
            console.log(message);
        }        return anyErrors;
    };
    FileExecutable.setCurrentCompilerFlags({});
    var CLS_CLASS = 0x1,
        CLS_META = 0x2,
        CLS_INITIALIZED = 0x4,
        CLS_INITIALIZING = 0x8;
    objj_ivar =     function(aName, aType)
    {
        this.name = aName;
        this.type = aType;
    };
    objj_method =     function(aName, anImplementation, types)
    {
        var method = anImplementation ||         function(aReceiver, aSelector)
        {
            CPException.isa.objj_msgSend2(CPException, "raise:reason:", CPInternalInconsistencyException, aReceiver.isa.method_msgSend0(self, "className") + " does not have an implementation for selector '" + aSelector + "'");
        };
        method.method_name = aName;
        method.method_imp = anImplementation;
        method.method_types = types;
        return method;
    };
    objj_class =     function(displayName)
    {
        this.isa = NULL;
        this.version = 0;
        this.super_class = NULL;
        this.name = NULL;
        this.info = 0;
        this.ivar_list = [];
        this.ivar_store =         function()
        {
        };
        this.ivar_dtable = this.ivar_store.prototype;
        this.method_list = [];
        this.method_store =         function()
        {
        };
        this.method_dtable = this.method_store.prototype;
        this.protocol_list = [];
        eval("this.allocator = function " + (displayName || "OBJJ_OBJECT").replace(/\W/g, "_") + "() { }");
        this._UID = -1;
    };
    objj_protocol =     function(aName)
    {
        this.name = aName;
        this.instance_methods = {};
        this.class_methods = {};
    };
    objj_object =     function()
    {
        this.isa = NULL;
        this._UID = -1;
    };
    objj_typeDef =     function(aName)
    {
        this.name = aName;
    };
    class_getName =     function(aClass)
    {
        if (aClass == Nil)
            return "";
        return aClass.name;
    };
    class_isMetaClass =     function(aClass)
    {
        if (!aClass)
            return NO;
        return aClass.info & CLS_META;
    };
    class_getSuperclass =     function(aClass)
    {
        if (aClass == Nil)
            return Nil;
        return aClass.super_class;
    };
    class_setSuperclass =     function(aClass, aSuperClass)
    {
        aClass.super_class = aSuperClass;
        aClass.isa.super_class = aSuperClass.isa;
    };
    class_addIvar =     function(aClass, aName, aType)
    {
        var thePrototype = aClass.allocator.prototype;
        if (typeof thePrototype[aName] != "undefined")
            return NO;
        var ivar = new objj_ivar(aName, aType);
        aClass.ivar_list.push(ivar);
        aClass.ivar_dtable[aName] = ivar;
        thePrototype[aName] = NULL;
        return YES;
    };
    class_addIvars =     function(aClass, ivars)
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
            }        }    };
    class_copyIvarList =     function(aClass)
    {
        return aClass.ivar_list.slice(0);
    };
    class_addMethod =     function(aClass, aName, anImplementation, types)
    {
        var method = new objj_method(aName, anImplementation, types);
        aClass.method_list.push(method);
        aClass.method_dtable[aName] = method;
        method.displayName = (aClass.info & CLS_META ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
        if (!(aClass.info & CLS_META) && (aClass.info & CLS_META ? aClass : aClass.isa).isa === (aClass.info & CLS_META ? aClass : aClass.isa))
            class_addMethod(aClass.info & CLS_META ? aClass : aClass.isa, aName, anImplementation, types);
        return YES;
    };
    class_addMethods =     function(aClass, methods)
    {
        var index = 0,
            count = methods.length,
            method_list = aClass.method_list,
            method_dtable = aClass.method_dtable;
        for (; index < count; ++index)
        {
            var method = methods[index];
            method_list.push(method);
            method_dtable[method.method_name] = method;
            method.displayName = (aClass.info & CLS_META ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
        }        if (!(aClass.info & CLS_META) && (aClass.info & CLS_META ? aClass : aClass.isa).isa === (aClass.info & CLS_META ? aClass : aClass.isa))
            class_addMethods(aClass.info & CLS_META ? aClass : aClass.isa, methods);
    };
    class_getInstanceMethod =     function(aClass, aSelector)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = aClass.method_dtable[aSelector];
        return method ? method : NULL;
    };
    class_getInstanceVariable =     function(aClass, aName)
    {
        if (!aClass || !aName)
            return NULL;
        var variable = aClass.ivar_dtable[aName];
        return variable;
    };
    class_getClassMethod =     function(aClass, aSelector)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = (aClass.info & CLS_META ? aClass : aClass.isa).method_dtable[aSelector];
        return method ? method : NULL;
    };
    class_respondsToSelector =     function(aClass, aSelector)
    {
        return class_getClassMethod(aClass, aSelector) != NULL;
    };
    class_copyMethodList =     function(aClass)
    {
        return aClass.method_list.slice(0);
    };
    class_getVersion =     function(aClass)
    {
        return aClass.version;
    };
    class_setVersion =     function(aClass, aVersion)
    {
        aClass.version = parseInt(aVersion, 10);
    };
    class_replaceMethod =     function(aClass, aSelector, aMethodImplementation)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = aClass.method_dtable[aSelector],
            method_imp = method.method_imp,
            new_method = new objj_method(method.method_name, aMethodImplementation, method.method_types);
        new_method.displayName = method.displayName;
        aClass.method_dtable[aSelector] = new_method;
        var index = aClass.method_list.indexOf(method);
        if (index !== -1)
        {
            aClass.method_list[index] = new_method;
        }        else
        {
            aClass.method_list.push(new_method);
        }        return method_imp;
    };
    class_addProtocol =     function(aClass, aProtocol)
    {
        if (!aProtocol || class_conformsToProtocol(aClass, aProtocol))
        {
            return;
        }        (aClass.protocol_list || (aClass.protocol_list = [])).push(aProtocol);
        return true;
    };
    class_conformsToProtocol =     function(aClass, aProtocol)
    {
        if (!aProtocol)
            return false;
        while (aClass)
        {
            var protocols = aClass.protocol_list,
                size = protocols ? protocols.length : 0;
            for (var i = 0; i < size; i++)
            {
                var p = protocols[i];
                if (p.name === aProtocol.name)
                {
                    return true;
                }                if (protocol_conformsToProtocol(p, aProtocol))
                {
                    return true;
                }            }            aClass = class_getSuperclass(aClass);
        }        return false;
    };
    class_copyProtocolList =     function(aClass)
    {
        var protocols = aClass.protocol_list;
        return protocols ? protocols.slice(0) : [];
    };
    protocol_conformsToProtocol =     function(p1, p2)
    {
        if (!p1 || !p2)
            return false;
        if (p1.name === p2.name)
            return true;
        var protocols = p1.protocol_list,
            size = protocols ? protocols.length : 0;
        for (var i = 0; i < size; i++)
        {
            var p = protocols[i];
            if (p.name === p2.name)
            {
                return true;
            }            if (protocol_conformsToProtocol(p, p2))
            {
                return true;
            }        }        return false;
    };
    var REGISTERED_PROTOCOLS = Object.create(null);
    objj_allocateProtocol =     function(aName)
    {
        var protocol = new objj_protocol(aName);
        return protocol;
    };
    objj_registerProtocol =     function(proto)
    {
        REGISTERED_PROTOCOLS[proto.name] = proto;
    };
    protocol_getName =     function(proto)
    {
        return proto.name;
    };
    protocol_addMethodDescription =     function(proto, selector, types, isRequiredMethod, isInstanceMethod)
    {
        if (!proto || !selector)
            return;
        if (isRequiredMethod)
            (isInstanceMethod ? proto.instance_methods : proto.class_methods)[selector] = new objj_method(selector, null, types);
    };
    protocol_addMethodDescriptions =     function(proto, methods, isRequiredMethod, isInstanceMethod)
    {
        if (!isRequiredMethod)
            return;
        var index = 0,
            count = methods.length,
            method_dtable = isInstanceMethod ? proto.instance_methods : proto.class_methods;
        for (; index < count; ++index)
        {
            var method = methods[index];
            method_dtable[method.method_name] = method;
        }    };
    protocol_copyMethodDescriptionList =     function(proto, isRequiredMethod, isInstanceMethod)
    {
        if (!isRequiredMethod)
            return [];
        var method_dtable = isInstanceMethod ? proto.instance_methods : proto.class_methods,
            methodList = [];
        for (var selector in method_dtable)
            if (method_dtable.hasOwnProperty(selector))
                methodList.push(method_dtable[selector]);
        return methodList;
    };
    protocol_addProtocol =     function(proto, addition)
    {
        if (!proto || !addition)
            return;
        (proto.protocol_list || (proto.protocol_list = [])).push(addition);
    };
    var REGISTERED_TYPEDEFS = Object.create(null);
    objj_allocateTypeDef =     function(aName)
    {
        var typeDef = new objj_typeDef(aName);
        return typeDef;
    };
    objj_registerTypeDef =     function(typeDef)
    {
        REGISTERED_TYPEDEFS[typeDef.name] = typeDef;
    };
    typeDef_getName =     function(typeDef)
    {
        return typeDef.name;
    };
    var _class_initialize =     function(aClass)
    {
        var meta = aClass.info & CLS_META ? aClass : aClass.isa;
        if (aClass.info & CLS_META)
            aClass = objj_getClass(aClass.name);
        if (aClass.super_class && !((aClass.super_class.info & CLS_META ? aClass.super_class : aClass.super_class.isa).info & CLS_INITIALIZED))
            _class_initialize(aClass.super_class);
        if (!(meta.info & CLS_INITIALIZED) && !(meta.info & CLS_INITIALIZING))
        {
            meta.info = (meta.info | CLS_INITIALIZING) & ~0;
            aClass.objj_msgSend = objj_msgSendFast;
            aClass.objj_msgSend0 = objj_msgSendFast0;
            aClass.objj_msgSend1 = objj_msgSendFast1;
            aClass.objj_msgSend2 = objj_msgSendFast2;
            aClass.objj_msgSend3 = objj_msgSendFast3;
            meta.objj_msgSend = objj_msgSendFast;
            meta.objj_msgSend0 = objj_msgSendFast0;
            meta.objj_msgSend1 = objj_msgSendFast1;
            meta.objj_msgSend2 = objj_msgSendFast2;
            meta.objj_msgSend3 = objj_msgSendFast3;
            aClass.method_msgSend = aClass.method_dtable;
            meta.method_msgSend = meta.method_dtable;
            meta.objj_msgSend0(aClass, "initialize");
            meta.info = (meta.info | CLS_INITIALIZED) & ~CLS_INITIALIZING;
        }    };
    _objj_forward =     function(self, _cmd)
    {
        var isa = self.isa,
            meta = isa.info & CLS_META ? isa : isa.isa;
        if (!(meta.info & CLS_INITIALIZED) && !(meta.info & CLS_INITIALIZING))
        {
            _class_initialize(isa);
        }        var implementation = isa.method_msgSend[_cmd];
        if (implementation)
        {
            return implementation.apply(isa, arguments);
        }        implementation = isa.method_dtable[SEL_forwardingTargetForSelector_];
        if (implementation)
        {
            var target = implementation(self, SEL_forwardingTargetForSelector_, _cmd);
            if (target && target !== self)
            {
                arguments[0] = target;
                return target.isa.objj_msgSend.apply(target.isa, arguments);
            }        }        implementation = isa.method_dtable[SEL_methodSignatureForSelector_];
        if (implementation)
        {
            var forwardInvocationImplementation = isa.method_dtable[SEL_forwardInvocation_];
            if (forwardInvocationImplementation)
            {
                var signature = implementation(self, SEL_methodSignatureForSelector_, _cmd);
                if (signature)
                {
                    var invocationClass = objj_lookUpClass("CPInvocation");
                    if (invocationClass)
                    {
                        var invocation = invocationClass.isa.objj_msgSend1(invocationClass, SEL_invocationWithMethodSignature_, signature),
                            index = 0,
                            count = arguments.length;
                        if (invocation != null)
                        {
                            var invocationIsa = invocation.isa;
                            for (; index < count; ++index)
                                invocationIsa.objj_msgSend2(invocation, SEL_setArgument_atIndex_, arguments[index], index);
                        }                        forwardInvocationImplementation(self, SEL_forwardInvocation_, invocation);
                        return invocation == null ? null : invocationIsa.objj_msgSend0(invocation, SEL_returnValue);
                    }                }            }        }        implementation = isa.method_dtable[SEL_doesNotRecognizeSelector_];
        if (implementation)
            return implementation(self, SEL_doesNotRecognizeSelector_, _cmd);
        throw class_getName(isa) + " does not implement doesNotRecognizeSelector:. Did you forget a superclass for " + class_getName(isa) + "?";
    };
    class_getMethodImplementation =     function(aClass, aSelector)
    {
        if (!((aClass.info & CLS_META ? aClass : aClass.isa).info & CLS_INITIALIZED))
            _class_initialize(aClass);
        var implementation = aClass.method_dtable[aSelector] || _objj_forward;
        return implementation;
    };
    var REGISTERED_CLASSES = Object.create(null);
    objj_enumerateClassesUsingBlock =     function(aBlock)
    {
        for (var key in REGISTERED_CLASSES)
        {
            aBlock(REGISTERED_CLASSES[key]);
        }    };
    objj_allocateClassPair =     function(superclass, aName)
    {
        var classObject = new objj_class(aName),
            metaClassObject = new objj_class(aName),
            rootClassObject = classObject;
        if (superclass)
        {
            rootClassObject = superclass;
            while (rootClassObject.superclass)
                rootClassObject = rootClassObject.superclass;
            classObject.allocator.prototype = new superclass.allocator();
            classObject.ivar_dtable = classObject.ivar_store.prototype = new superclass.ivar_store();
            classObject.method_dtable = classObject.method_store.prototype = new superclass.method_store();
            metaClassObject.method_dtable = metaClassObject.method_store.prototype = new superclass.isa.method_store();
            classObject.super_class = superclass;
            metaClassObject.super_class = superclass.isa;
        }        else
            classObject.allocator.prototype = new objj_object();
        classObject.isa = metaClassObject;
        classObject.name = aName;
        classObject.info = CLS_CLASS;
        classObject._UID = objj_generateObjectUID();
        classObject.init = true;
        metaClassObject.isa = rootClassObject.isa;
        metaClassObject.name = aName;
        metaClassObject.info = CLS_META;
        metaClassObject._UID = objj_generateObjectUID();
        metaClassObject.init = true;
        return classObject;
    };
    var CONTEXT_BUNDLE = nil;
    objj_registerClassPair =     function(aClass)
    {
        global[aClass.name] = aClass;
        REGISTERED_CLASSES[aClass.name] = aClass;
        addClassToBundle(aClass, CONTEXT_BUNDLE);
    };
    objj_resetRegisterClasses =     function()
    {
        for (var key in REGISTERED_CLASSES)
            delete global[key];
        REGISTERED_CLASSES = Object.create(null);
        REGISTERED_PROTOCOLS = Object.create(null);
        REGISTERED_TYPEDEFS = Object.create(null);
        resetBundle();
    };
    class_createInstance =     function(aClass)
    {
        if (!aClass)
            throw new Error("*** Attempting to create object with Nil class.");
        var object = new aClass.allocator();
        object.isa = aClass;
        object._UID = objj_generateObjectUID();
        return object;
    };
    var prototype_bug =     function()
    {
    };
    prototype_bug.prototype.member = false;
    with(new prototype_bug())
        member = true;
    if ((new prototype_bug()).member)
    {
        var fast_class_createInstance = class_createInstance;
        class_createInstance =         function(aClass)
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
                }                object.isa = actualClass;
            }            return object;
        };
    }    object_getClassName =     function(anObject)
    {
        if (!anObject)
            return "";
        var theClass = anObject.isa;
        return theClass ? class_getName(theClass) : "";
    };
    objj_lookUpClass =     function(aName)
    {
        var theClass = REGISTERED_CLASSES[aName];
        return theClass ? theClass : Nil;
    };
    objj_getClass =     function(aName)
    {
        var theClass = REGISTERED_CLASSES[aName];
        if (!theClass)
        {
        }        return theClass ? theClass : Nil;
    };
    objj_getClassList =     function(buffer, bufferLen)
    {
        for (var aName in REGISTERED_CLASSES)
        {
            buffer.push(REGISTERED_CLASSES[aName]);
            if (bufferLen && --bufferLen === 0)
                break;
        }        return buffer.length;
    };
    objj_getMetaClass =     function(aName)
    {
        var theClass = objj_getClass(aName);
        return theClass.info & CLS_META ? theClass : theClass.isa;
    };
    objj_getProtocol =     function(aName)
    {
        return REGISTERED_PROTOCOLS[aName];
    };
    objj_getTypeDef =     function(aName)
    {
        return REGISTERED_TYPEDEFS[aName];
    };
    ivar_getName =     function(anIvar)
    {
        return anIvar.name;
    };
    ivar_getTypeEncoding =     function(anIvar)
    {
        return anIvar.type;
    };
    objj_msgSend =     function(aReceiver, aSelector)
    {
        if (aReceiver == nil)
            return nil;
        var isa = aReceiver.isa;
        if (isa.init)
            _class_initialize(isa);
        var method = isa.method_dtable[aSelector];
        var implementation = method ? method.method_imp : _objj_forward;
        switch(arguments.length) {
            case 2:
                return implementation(aReceiver, aSelector);
            case 3:
                return implementation(aReceiver, aSelector, arguments[2]);
            case 4:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3]);
            case 5:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4]);
            case 6:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4], arguments[5]);
            case 7:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        }
        return implementation.apply(aReceiver, arguments);
    };
    objj_msgSendSuper =     function(aSuper, aSelector)
    {
        var super_class = aSuper.super_class;
        arguments[0] = aSuper.receiver;
        if (!((super_class.info & CLS_META ? super_class : super_class.isa).info & CLS_INITIALIZED))
            _class_initialize(super_class);
        var implementation = super_class.method_dtable[aSelector] || _objj_forward;
        return implementation.apply(aSuper.receiver, arguments);
    };
    objj_msgSendSuper0 =     function(aSuper, aSelector)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector);
    };
    objj_msgSendSuper1 =     function(aSuper, aSelector, arg0)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0);
    };
    objj_msgSendSuper2 =     function(aSuper, aSelector, arg0, arg1)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0, arg1);
    };
    objj_msgSendSuper3 =     function(aSuper, aSelector, arg0, arg1, arg2)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0, arg1, arg2);
    };
    objj_msgSendFast =     function(aReceiver, aSelector)
    {
        return (this.method_dtable[aSelector] || _objj_forward).apply(aReceiver, arguments);
    };
    var objj_msgSendFastInitialize =     function(aReceiver, aSelector)
    {
        _class_initialize(this);
        return this.objj_msgSend.apply(this, arguments);
    };
    objj_msgSendFast0 =     function(aReceiver, aSelector)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector);
    };
    var objj_msgSendFast0Initialize =     function(aReceiver, aSelector)
    {
        _class_initialize(this);
        return this.objj_msgSend0(aReceiver, aSelector);
    };
    objj_msgSendFast1 =     function(aReceiver, aSelector, arg0)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0);
    };
    var objj_msgSendFast1Initialize =     function(aReceiver, aSelector, arg0)
    {
        _class_initialize(this);
        return this.objj_msgSend1(aReceiver, aSelector, arg0);
    };
    objj_msgSendFast2 =     function(aReceiver, aSelector, arg0, arg1)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0, arg1);
    };
    var objj_msgSendFast2Initialize =     function(aReceiver, aSelector, arg0, arg1)
    {
        _class_initialize(this);
        return this.objj_msgSend2(aReceiver, aSelector, arg0, arg1);
    };
    objj_msgSendFast3 =     function(aReceiver, aSelector, arg0, arg1, arg2)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0, arg1, arg2);
    };
    var objj_msgSendFast3Initialize =     function(aReceiver, aSelector, arg0, arg1, arg2)
    {
        _class_initialize(this);
        return this.objj_msgSend3(aReceiver, aSelector, arg0, arg1, arg2);
    };
    method_getName =     function(aMethod)
    {
        return aMethod.method_name;
    };
    method_copyReturnType =     function(aMethod)
    {
        var types = aMethod.method_types;
        if (types)
        {
            var argType = types[0];
            return argType != NULL ? argType : NULL;
        }        else
            return NULL;
    };
    method_copyArgumentType =     function(aMethod, index)
    {
        switch(index) {
            case 0:
                return "id";
            case 1:
                return "SEL";
default:
                var types = aMethod.method_types;
                if (types)
                {
                    var argType = types[index - 1];
                    return argType != NULL ? argType : NULL;
                }                else
                    return NULL;
        }
    };
    method_getNumberOfArguments =     function(aMethod)
    {
        var types = aMethod.method_types;
        return types ? types.length + 1 : (aMethod.method_name.match(/:/g) || []).length + 2;
    };
    method_getImplementation =     function(aMethod)
    {
        return aMethod.method_imp;
    };
    method_setImplementation =     function(aMethod, anImplementation)
    {
        var oldImplementation = aMethod.method_imp;
        aMethod.method_imp = anImplementation;
        return oldImplementation;
    };
    method_exchangeImplementations =     function(lhs, rhs)
    {
        var lhs_imp = method_getImplementation(lhs),
            rhs_imp = method_getImplementation(rhs);
        method_setImplementation(lhs, rhs_imp);
        method_setImplementation(rhs, lhs_imp);
    };
    sel_getName =     function(aSelector)
    {
        return aSelector ? aSelector : "<null selector>";
    };
    sel_getUid =     function(aName)
    {
        return aName;
    };
    sel_isEqual =     function(lhs, rhs)
    {
        return lhs === rhs;
    };
    sel_registerName =     function(aName)
    {
        return aName;
    };
    objj_class.prototype.toString = objj_object.prototype.toString =     function()
    {
        var isa = this.isa;
        if (class_getInstanceMethod(isa, SEL_description))
            return isa.objj_msgSend0(this, SEL_description);
        if (class_isMetaClass(isa))
            return this.name;
        return "[" + isa.name + " Object](-description not implemented)";
    };
    objj_class.prototype.objj_msgSend = objj_msgSendFastInitialize;
    objj_class.prototype.objj_msgSend0 = objj_msgSendFast0Initialize;
    objj_class.prototype.objj_msgSend1 = objj_msgSendFast1Initialize;
    objj_class.prototype.objj_msgSend2 = objj_msgSendFast2Initialize;
    objj_class.prototype.objj_msgSend3 = objj_msgSendFast3Initialize;
    objj_class.prototype.method_msgSend = Object.create(null);
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
    objj_eval =     function(aString)
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
    };
    exports.objj_eval = objj_eval;
    CPLogRegister(CPLogDefault);
    function objj_debug_object_format(aReceiver)
    {
        return aReceiver && aReceiver.isa ? exports.sprintf("<%s %#08x>", (aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aReceiver._UID) : String(aReceiver);
    }
    function objj_debug_message_format(aReceiver, aSelector)
    {
        return exports.sprintf("[%s %s]", objj_debug_object_format(aReceiver), aSelector);
    }
    var objj_msgSend_original = objj_msgSend,
        objj_msgSendSuper_original = objj_msgSendSuper,
        objj_msgSendFast_original = objj_msgSendFast,
        objj_msgSendFast0_original = objj_msgSendFast0,
        objj_msgSendFast1_original = objj_msgSendFast1,
        objj_msgSendFast2_original = objj_msgSendFast2,
        objj_msgSendFast3_original = objj_msgSendFast3;
    function objj_msgSend_reset_all_classes()
    {
        objj_enumerateClassesUsingBlock(        function(aClass)
        {
            if (aClass.hasOwnProperty("objj_msgSend"))
            {
                aClass.objj_msgSend = objj_msgSendFast;
                aClass.objj_msgSend0 = objj_msgSendFast0;
                aClass.objj_msgSend1 = objj_msgSendFast1;
                aClass.objj_msgSend2 = objj_msgSendFast2;
                aClass.objj_msgSend3 = objj_msgSendFast3;
            }        });
    }
    objj_msgSend_reset =     function()
    {
        objj_msgSend = objj_msgSend_original;
        objj_msgSendSuper = objj_msgSendSuper_original;
        objj_msgSendFast = objj_msgSendFast_original;
        objj_msgSendFast0 = objj_msgSendFast0_original;
        objj_msgSendFast1 = objj_msgSendFast1_original;
        objj_msgSendFast2 = objj_msgSendFast2_original;
        objj_msgSendFast3 = objj_msgSendFast3_original;
        objj_msgSend_reset_all_classes();
    };
    objj_msgSend_decorate =     function()
    {
        var index = 0,
            count = arguments.length;
        for (; index < count; ++index)
        {
            objj_msgSend = arguments[index](objj_msgSend);
            objj_msgSendSuper = arguments[index](objj_msgSendSuper);
            objj_msgSendFast = arguments[index](objj_msgSendFast);
            objj_msgSendFast0 = arguments[index](objj_msgSendFast0);
            objj_msgSendFast1 = arguments[index](objj_msgSendFast1);
            objj_msgSendFast2 = arguments[index](objj_msgSendFast2);
            objj_msgSendFast3 = arguments[index](objj_msgSendFast3);
        }        if (count)
            objj_msgSend_reset_all_classes();
    };
    objj_msgSend_set_decorators =     function()
    {
        objj_msgSend_reset();
        objj_msgSend_decorate.apply(NULL, arguments);
    };
    var objj_backtrace = [];
    objj_backtrace_print =     function(aStream)
    {
        var index = 0,
            count = objj_backtrace.length;
        for (; index < count; ++index)
        {
            var frame = objj_backtrace[index];
            aStream(objj_debug_message_format(frame.receiver, frame.selector));
        }    };
    objj_backtrace_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            objj_backtrace.push({receiver: aReceiver, selector: aSelector});
            try {
                return msgSend.apply(this, arguments);
            }
            catch(anException) {
                if (objj_backtrace.length)
                {
                    CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
                    objj_backtrace_print(CPLog.warn);
                    objj_backtrace = [];
                }
                throw anException;
            }
            finally {
                objj_backtrace.pop();
            }
        };
    };
    objj_supress_exceptions_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            try {
                return msgSend.apply(this, arguments);
            }
            catch(anException) {
                CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
            }
        };
    };
    var objj_typechecks_reported = {},
        objj_typecheck_prints_backtrace = NO;
    objj_typecheck_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            if (!aReceiver)
                return msgSend.apply(this, arguments);
            var types = aReceiver.isa.method_dtable[aSelector].method_types;
            for (var i = 2; i < arguments.length; i++)
            {
                try {
                    objj_debug_typecheck(types[i - 1], arguments[i]);
                }
                catch(e) {
                    var key = [(aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aSelector, i, e].join(";");
                    if (!objj_typechecks_reported[key])
                    {
                        objj_typechecks_reported[key] = YES;
                        CPLog.warn("Type check failed on argument " + (i - 2) + " of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                        if (objj_typecheck_prints_backtrace)
                            objj_backtrace_print(CPLog.warn);
                    }
                }
            }            var result = msgSend.apply(NULL, arguments);
            try {
                objj_debug_typecheck(types[0], result);
            }
            catch(e) {
                var key = [(aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aSelector, "ret", e].join(";");
                if (!objj_typechecks_reported[key])
                {
                    objj_typechecks_reported[key] = YES;
                    CPLog.warn("Type check failed on return val of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                    if (objj_typecheck_prints_backtrace)
                        objj_backtrace_print(CPLog.warn);
                }
            }
            return result;
        };
    };
    objj_debug_typecheck =     function(expectedType, object)
    {
        var objjClass;
        if (!expectedType)
        {
            return;
        }        else if (expectedType === "id")
        {
            if (object !== undefined)
                return;
        }        else if (expectedType === "void")
        {
            if (object === undefined)
                return;
        }        else if (objjClass = objj_getClass(expectedType))
        {
            if (object === nil)
            {
                return;
            }            else if (object !== undefined && object.isa)
            {
                var theClass = object.isa;
                for (; theClass; theClass = theClass.super_class)
                    if (theClass === objjClass)
                        return;
            }        }        else
        {
            return;
        }        var actualType;
        if (object === NULL)
            actualType = "null";
        else if (object === undefined)
            actualType = "void";
        else if (object.isa)
            actualType = (object.info & CLS_META ? object : object.isa).name;
        else
            actualType = typeof object;
        throw "expected=" + expectedType + ", actual=" + actualType;
    };
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
    }    if (typeof OBJJ_COMPILER_FLAGS !== 'undefined')
    {
        var flags = {};
        for (var i = 0; i < OBJJ_COMPILER_FLAGS.length; i++)
        {
            switch(OBJJ_COMPILER_FLAGS[i]) {
                case "IncludeDebugSymbols":
                    flags.includeMethodFunctionNames = true;
                    break;
                case "IncludeTypeSignatures":
                    flags.includeIvarTypeSignatures = true;
                    flags.includeMethodArgumentTypeSignatures = true;
                    break;
                case "InlineMsgSend":
                    flags.inlineMsgSendFunctions = true;
                    break;
                case "SourceMap":
                    flags.sourceMap = true;
                    break;
            }
        }        FileExecutable.setCurrentCompilerFlags(flags);
    }    var mainFileURL = new CFURL(window.OBJJ_MAIN_FILE || "main.j"),
        mainBundleURL = (new CFURL(".", new CFURL(mainFileURL, pageURL))).absoluteURL(),
        assumedResolvedURL = (new CFURL("..", mainBundleURL)).absoluteURL();
    if (mainBundleURL === assumedResolvedURL)
        assumedResolvedURL = new CFURL(assumedResolvedURL.schemeAndAuthority());
    StaticResource.resourceAtURL(assumedResolvedURL, YES);
    exports.pageURL = pageURL;
    exports.bootstrap =     function()
    {
        resolveMainBundleURL();
    };
    function resolveMainBundleURL()
    {
        StaticResource.resolveResourceAtURL(mainBundleURL, YES,         function(aResource)
        {
            var includeURLs = StaticResource.includeURLs(),
                index = 0,
                count = includeURLs.length;
            for (; index < count; ++index)
                aResource.resourceAtURL(includeURLs[index], YES);
            Executable.fileImporterForURL(mainBundleURL)(mainFileURL.lastPathComponent(), YES,             function()
            {
                disableCFURLCaching();
                afterDocumentLoad(                function()
                {
                    var hashString = window.location.hash.substring(1),
                        args = [];
                    if (hashString.length)
                    {
                        args = hashString.split("/");
                        for (var i = 0, count = args.length; i < count; i++)
                            args[i] = decodeURIComponent(args[i]);
                    }                    var namedArgsArray = (window.location.search.substring(1)).split("&"),
                        namedArgs = new CFMutableDictionary();
                    for (var i = 0, count = namedArgsArray.length; i < count; i++)
                    {
                        var thisArg = namedArgsArray[i].split("=");
                        if (!thisArg[0])
                            continue;
                        if (thisArg[1] == null)
                            thisArg[1] = true;
                        namedArgs.setValueForKey(decodeURIComponent(thisArg[0]), decodeURIComponent(thisArg[1]));
                    }                    main(args, namedArgs);
                });
            });
        });
    }
    var documentLoaded = NO;
    function afterDocumentLoad(aFunction)
    {
        if (documentLoaded || document.readyState === "complete")
            return aFunction();
        if (window.addEventListener)
            window.addEventListener("load", aFunction, NO);
        else if (window.attachEvent)
            window.attachEvent("onload", aFunction);
    }
    afterDocumentLoad(    function()
    {
        documentLoaded = YES;
    });
    if (typeof OBJJ_AUTO_BOOTSTRAP === "undefined" || OBJJ_AUTO_BOOTSTRAP)
        exports.bootstrap();
    function makeAbsoluteURL(aURL)
    {
        if (aURL instanceof CFURL && aURL.scheme())
            return aURL;
        return new CFURL(aURL, mainBundleURL);
    }
    objj_importFile = Executable.fileImporterForURL(mainBundleURL);
    objj_executeFile = Executable.fileExecuterForURL(mainBundleURL);
    objj_import =     function()
    {
        CPLog.warn("objj_import is deprecated, use objj_importFile instead");
        objj_importFile.apply(this, arguments);
    };
})(window, ObjectiveJ);
