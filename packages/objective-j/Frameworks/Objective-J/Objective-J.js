var ObjectiveJ={};
(function(_1,_2){
if(!Object.create){
Object.create=function(o){
if(arguments.length>1){
throw new Error("Object.create implementation only accepts the first parameter.");
}
function F(){
};
F.prototype=o;
return new F();
};
}
if(!Object.keys){
Object.keys=(function(){
var _3=Object.prototype.hasOwnProperty,_4=!({toString:null}).propertyIsEnumerable("toString"),_5=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],_6=_5.length;
return function(_7){
if(typeof _7!=="object"&&typeof _7!=="function"||_7===null){
throw new TypeError("Object.keys called on non-object");
}
var _8=[];
for(var _9 in _7){
if(_3.call(_7,_9)){
_8.push(_9);
}
}
if(_4){
for(var i=0;i<_6;i++){
if(_3.call(_7,_5[i])){
_8.push(_5[i]);
}
}
}
return _8;
};
})();
}
if(!Array.prototype.indexOf){
Array.prototype.indexOf=function(_a){
"use strict";
if(this===null){
throw new TypeError();
}
var t=new Object(this),_b=t.length>>>0;
if(_b===0){
return -1;
}
var n=0;
if(arguments.length>1){
n=Number(arguments[1]);
if(n!=n){
n=0;
}else{
if(n!==0&&n!=Infinity&&n!=-Infinity){
n=(n>0||-1)*Math.floor(Math.abs(n));
}
}
}
if(n>=_b){
return -1;
}
var k=n>=0?n:Math.max(_b-Math.abs(n),0);
for(;k<_b;k++){
if(k in t&&t[k]===_a){
return k;
}
}
return -1;
};
}
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_c){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_d){
return this.valueOf();
};
}
var cx=new RegExp("[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _e=new RegExp("[\\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _f,_10,_11={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},rep;
function _12(_13){
_e.lastIndex=0;
return _e.test(_13)?"\""+_13.replace(_e,function(a){
var c=_11[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_13+"\"";
};
function str(key,_14){
var i,k,v,_15,_16=_f,_17,_18=_14[key];
if(_18&&typeof _18==="object"&&typeof _18.toJSON==="function"){
_18=_18.toJSON(key);
}
if(typeof rep==="function"){
_18=rep.call(_14,key,_18);
}
switch(typeof _18){
case "string":
return _12(_18);
case "number":
return isFinite(_18)?String(_18):"null";
case "boolean":
case "null":
return String(_18);
case "object":
if(!_18){
return "null";
}
_f+=_10;
_17=[];
if(Object.prototype.toString.apply(_18)==="[object Array]"){
_15=_18.length;
for(i=0;i<_15;i+=1){
_17[i]=str(i,_18)||"null";
}
v=_17.length===0?"[]":_f?"[\n"+_f+_17.join(",\n"+_f)+"\n"+_16+"]":"["+_17.join(",")+"]";
_f=_16;
return v;
}
if(rep&&typeof rep==="object"){
_15=rep.length;
for(i=0;i<_15;i+=1){
k=rep[i];
if(typeof k==="string"){
v=str(k,_18);
if(v){
_17.push(_12(k)+(_f?": ":":")+v);
}
}
}
}else{
for(k in _18){
if(Object.hasOwnProperty.call(_18,k)){
v=str(k,_18);
if(v){
_17.push(_12(k)+(_f?": ":":")+v);
}
}
}
}
v=_17.length===0?"{}":_f?"{\n"+_f+_17.join(",\n"+_f)+"\n"+_16+"}":"{"+_17.join(",")+"}";
_f=_16;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_19,_1a,_1b){
var i;
_f="";
_10="";
if(typeof _1b==="number"){
for(i=0;i<_1b;i+=1){
_10+=" ";
}
}else{
if(typeof _1b==="string"){
_10=_1b;
}
}
rep=_1a;
if(_1a&&typeof _1a!=="function"&&(typeof _1a!=="object"||typeof _1a.length!=="number")){
throw new Error("JSON.stringify");
}
return str("",{"":_19});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_1c,_1d){
var j;
function _1e(_1f,key){
var k,v,_20=_1f[key];
if(_20&&typeof _20==="object"){
for(k in _20){
if(Object.hasOwnProperty.call(_20,k)){
v=_1e(_20,k);
if(v!==_2f){
_20[k]=v;
}else{
delete _20[k];
}
}
}
}
return _1d.call(_1f,key,_20);
};
cx.lastIndex=0;
if(cx.test(_1c)){
_1c=_1c.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_1c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_1c+")");
return typeof _1d==="function"?_1e({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var _21=/([^%]+|%(?:\d+\$)?[\+\-\ \#0]*[0-9\*]*(.[0-9\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])/g,_22=/(%)(?:(\d+)\$)?([\+\-\ \#0]*)([0-9\*]*)((?:.[0-9\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])/;
_2.sprintf=function(_23){
var _23=arguments[0],_24=_23.match(_21),_25=0,_26="",arg=1;
for(var i=0;i<_24.length;i++){
var t=_24[i];
if(_23.substring(_25,_25+t.length)!==t){
return _26;
}
_25+=t.length;
if(t.charAt(0)!=="%"){
_26+=t;
}else{
if(t==="%%"){
_26+="%";
}else{
var _27=t.match(_22);
if(_27.length!==8||_27[0]!==t){
return _26;
}
var _28=_27[1],_29=_27[2],_2a=_27[3],_2b=_27[4],_2c=_27[5],_2d=_27[6],_2e=_27[7];
if(_29===_2f||_29===null||_29===""){
_29=arg++;
}else{
_29=Number(_29);
}
var _30=null;
if(_2b=="*"){
_30=arguments[_29];
}else{
if(_2b!==""){
_30=Number(_2b);
}
}
var _31=null;
if(_2c===".*"){
_31=arguments[_29];
}else{
if(_2c!==""){
_31=Number(_2c.substring(1));
}
}
var _32=(_2a.indexOf("-")>=0),_33=(_2a.indexOf("0")>=0),_34="";
if(/[bBdiufeExXo]/.test(_2e)){
var num=Number(arguments[_29]),_35="";
if(num<0){
_35="-";
}else{
if(_2a.indexOf("+")>=0){
_35="+";
}else{
if(_2a.indexOf(" ")>=0){
_35=" ";
}
}
}
if(_2e==="d"||_2e==="i"||_2e==="u"){
var _36=String(Math.abs(Math.floor(num)));
_34=_37(_35,"",_36,"",_30,_32,_33);
}
if(_2e=="f"){
var _36=String((_31!==null)?Math.abs(num).toFixed(_31):Math.abs(num)),_38=(_2a.indexOf("#")>=0&&_36.indexOf(".")<0)?".":"";
_34=_37(_35,"",_36,_38,_30,_32,_33);
}
if(_2e==="e"||_2e==="E"){
var _36=String(Math.abs(num).toExponential(_31!==null?_31:21)),_38=(_2a.indexOf("#")>=0&&_36.indexOf(".")<0)?".":"";
_34=_37(_35,"",_36,_38,_30,_32,_33);
}
if(_2e=="x"||_2e=="X"){
var _36=String(Math.abs(num).toString(16));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0x":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(_2e=="b"||_2e=="B"){
var _36=String(Math.abs(num).toString(2));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0b":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(_2e=="o"){
var _36=String(Math.abs(num).toString(8));
var _39=(_2a.indexOf("#")>=0&&num!=0)?"0":"";
_34=_37(_35,_39,_36,"",_30,_32,_33);
}
if(/[A-Z]/.test(_2e)){
_34=_34.toUpperCase();
}else{
_34=_34.toLowerCase();
}
}else{
var _34="";
if(_2e==="%"){
_34="%";
}else{
if(_2e==="c"){
_34=String(arguments[_29]).charAt(0);
}else{
if(_2e==="s"||_2e==="@"){
_34=String(arguments[_29]);
}else{
if(_2e==="p"||_2e==="n"){
_34="";
}
}
}
}
_34=_37("","",_34,"",_30,_32,false);
}
_26+=_34;
}
}
}
return _26;
};
function _37(_3a,_3b,_3c,_3d,_3e,_3f,_40){
var _41=(_3a.length+_3b.length+_3c.length+_3d.length);
if(_3f){
return _3a+_3b+_3c+_3d+pad(_3e-_41," ");
}else{
if(_40){
return _3a+_3b+pad(_3e-_41,"0")+_3c+_3d;
}else{
return pad(_3e-_41," ")+_3a+_3b+_3c+_3d;
}
}
};
function pad(n,ch){
return Array(MAX(0,n)+1).join(ch);
};
CPLogDisable=false;
var _42="Cappuccino";
var _43=["fatal","error","warn","info","debug","trace"];
var _44=_43[3];
var _45={};
for(var i=0;i<_43.length;i++){
_45[_43[i]]=i;
}
var _46={};
CPLogRegister=function(_47,_48,_49){
CPLogRegisterRange(_47,_43[0],_48||_43[_43.length-1],_49);
};
CPLogRegisterRange=function(_4a,_4b,_4c,_4d){
var min=_45[_4b];
var max=_45[_4c];
if(min!==_2f&&max!==_2f&&min<=max){
for(var i=min;i<=max;i++){
CPLogRegisterSingle(_4a,_43[i],_4d);
}
}
};
CPLogRegisterSingle=function(_4e,_4f,_50){
if(!_46[_4f]){
_46[_4f]=[];
}
for(var i=0;i<_46[_4f].length;i++){
if(_46[_4f][i][0]===_4e){
_46[_4f][i][1]=_50;
return;
}
}
_46[_4f].push([_4e,_50]);
};
CPLogUnregister=function(_51){
for(var _52 in _46){
for(var i=0;i<_46[_52].length;i++){
if(_46[_52][i][0]===_51){
_46[_52].splice(i--,1);
}
}
}
};
function _53(_54,_55,_56){
if(_56==_2f){
_56=_42;
}
if(_55==_2f){
_55=_44;
}
var _57=(typeof _54[0]=="string"&&_54.length>1)?_2.sprintf.apply(null,_54):String(_54[0]);
if(_46[_55]){
for(var i=0;i<_46[_55].length;i++){
var _58=_46[_55][i];
_58[0](_57,_55,_56,_58[1]);
}
}
};
CPLog=function(){
_53(arguments);
};
for(var i=0;i<_43.length;i++){
CPLog[_43[i]]=(function(_59){
return function(){
_53(arguments,_59);
};
})(_43[i]);
}
var _5a=function(_5b,_5c,_5d){
var now=new Date(),_5e;
if(_5c===null){
_5c="";
}else{
_5c=_5c||"info";
_5c="["+CPLogColorize(_5c,_5c)+"]";
}
_5d=_5d||"";
if(_5d&&_5c){
_5d+=" ";
}
_5e=_5d+_5c;
if(_5e){
_5e+=": ";
}
if(typeof _2.sprintf=="function"){
return _2.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s",now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds(),_5e,_5b);
}else{
return now+" "+_5e+": "+_5b;
}
};
CPLogConsole=function(_5f,_60,_61,_62){
if(typeof console!="undefined"){
var _63=(_62||_5a)(_5f,_60,_61),_64={"fatal":"error","error":"error","warn":"warn","info":"info","debug":"debug","trace":"debug"}[_60];
if(_64&&console[_64]){
console[_64](_63);
}else{
if(console.log){
console.log(_63);
}
}
}
};
CPLogColorize=function(_65,_66){
return _65;
};
CPLogAlert=function(_67,_68,_69,_6a){
if(typeof alert!="undefined"&&!CPLogDisable){
var _6b=(_6a||_5a)(_67,_68,_69);
CPLogDisable=!confirm(_6b+"\n\n(Click cancel to stop log alerts)");
}
};
var _6c=null;
CPLogPopup=function(_6d,_6e,_6f,_70){
try{
if(CPLogDisable||window.open==_2f){
return;
}
if(!_6c||!_6c.document){
_6c=window.open("","_blank","width=600,height=400,status=no,resizable=yes,scrollbars=yes");
if(!_6c){
CPLogDisable=!confirm(_6d+"\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
return;
}
_71(_6c);
}
var _72=_6c.document.createElement("div");
_72.setAttribute("class",_6e||"fatal");
var _73=(_70||_5a)(_6d,_70?_6e:null,_6f);
_72.appendChild(_6c.document.createTextNode(_73));
_6c.log.appendChild(_72);
if(_6c.focusEnabled.checked){
_6c.focus();
}
if(_6c.blockEnabled.checked){
_6c.blockEnabled.checked=_6c.confirm(_73+"\nContinue blocking?");
}
if(_6c.scrollEnabled.checked){
_6c.scrollToBottom();
}
}
catch(e){
}
};
var _74="<style type=\"text/css\" media=\"screen\"> body{font:10px Monaco,Courier,\"Courier New\",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap=\"yes\"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled=\"no\"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>";
function _71(_75){
var doc=_75.document;
doc.writeln("<html><head><title></title>"+_74+"</head><body></body></html>");
doc.title=_42+" Run Log";
var _76=doc.getElementsByTagName("head")[0];
var _77=doc.getElementsByTagName("body")[0];
var _78=window.location.protocol+"//"+window.location.host+window.location.pathname;
_78=_78.substring(0,_78.lastIndexOf("/")+1);
var div=doc.createElement("div");
div.setAttribute("id","header");
_77.appendChild(div);
var ul=doc.createElement("ul");
ul.setAttribute("id","enablers");
div.appendChild(ul);
for(var i=0;i<_43.length;i++){
var li=doc.createElement("li");
li.setAttribute("id","en"+_43[i]);
li.setAttribute("class",_43[i]);
li.setAttribute("onclick","toggle(this);");
li.setAttribute("enabled","yes");
li.appendChild(doc.createTextNode(_43[i]));
ul.appendChild(li);
}
var ul=doc.createElement("ul");
ul.setAttribute("id","options");
div.appendChild(ul);
var _79={"focus":["Focus",false],"block":["Block",false],"wrap":["Wrap",false],"scroll":["Scroll",true],"close":["Close",true]};
for(o in _79){
var li=doc.createElement("li");
ul.appendChild(li);
_75[o+"Enabled"]=doc.createElement("input");
_75[o+"Enabled"].setAttribute("id",o);
_75[o+"Enabled"].setAttribute("type","checkbox");
if(_79[o][1]){
_75[o+"Enabled"].setAttribute("checked","checked");
}
li.appendChild(_75[o+"Enabled"]);
var _7a=doc.createElement("label");
_7a.setAttribute("for",o);
_7a.appendChild(doc.createTextNode(_79[o][0]));
li.appendChild(_7a);
}
_75.log=doc.createElement("div");
_75.log.setAttribute("class","enerror endebug enwarn eninfo enfatal entrace");
_77.appendChild(_75.log);
_75.toggle=function(_7b){
var _7c=(_7b.getAttribute("enabled")=="yes")?"no":"yes";
_7b.setAttribute("enabled",_7c);
if(_7c=="yes"){
_75.log.className+=" "+_7b.id;
}else{
_75.log.className=_75.log.className.replace(new RegExp("[\\s]*"+_7b.id,"g"),"");
}
};
_75.scrollToBottom=function(){
_75.scrollTo(0,_77.offsetHeight);
};
_75.wrapEnabled.addEventListener("click",function(){
_75.log.setAttribute("wrap",_75.wrapEnabled.checked?"yes":"no");
},false);
_75.addEventListener("keydown",function(e){
var e=e||_75.event;
if(e.keyCode==75&&(e.ctrlKey||e.metaKey)){
while(_75.log.firstChild){
_75.log.removeChild(_75.log.firstChild);
}
e.preventDefault();
}
},"false");
window.addEventListener("unload",function(){
if(_75&&_75.closeEnabled&&_75.closeEnabled.checked){
CPLogDisable=true;
_75.close();
}
},false);
_75.addEventListener("unload",function(){
if(!CPLogDisable){
CPLogDisable=!confirm("Click cancel to stop logging");
}
},false);
};
CPLogDefault=(typeof window==="object"&&window.console)?CPLogConsole:CPLogPopup;
var _2f;
if(typeof window!=="undefined"){
window.setNativeTimeout=window.setTimeout;
window.clearNativeTimeout=window.clearTimeout;
window.setNativeInterval=window.setInterval;
window.clearNativeInterval=window.clearInterval;
}
NO=false;
YES=true;
nil=null;
Nil=null;
NULL=null;
ABS=Math.abs;
ASIN=Math.asin;
ACOS=Math.acos;
ATAN=Math.atan;
ATAN2=Math.atan2;
SIN=Math.sin;
COS=Math.cos;
TAN=Math.tan;
EXP=Math.exp;
POW=Math.pow;
CEIL=Math.ceil;
FLOOR=Math.floor;
ROUND=Math.round;
MIN=Math.min;
MAX=Math.max;
RAND=Math.random;
SQRT=Math.sqrt;
E=Math.E;
LN2=Math.LN2;
LN10=Math.LN10;
LOG=Math.log;
LOG2E=Math.LOG2E;
LOG10E=Math.LOG10E;
PI=Math.PI;
PI2=Math.PI*2;
PI_2=Math.PI/2;
SQRT1_2=Math.SQRT1_2;
SQRT2=Math.SQRT2;
function _7d(_7e){
this._eventListenersForEventNames={};
this._owner=_7e;
};
_7d.prototype.addEventListener=function(_7f,_80){
var _81=this._eventListenersForEventNames;
if(!_82.call(_81,_7f)){
var _83=[];
_81[_7f]=_83;
}else{
var _83=_81[_7f];
}
var _84=_83.length;
while(_84--){
if(_83[_84]===_80){
return;
}
}
_83.push(_80);
};
_7d.prototype.removeEventListener=function(_85,_86){
var _87=this._eventListenersForEventNames;
if(!_82.call(_87,_85)){
return;
}
var _88=_87[_85],_89=_88.length;
while(_89--){
if(_88[_89]===_86){
return _88.splice(_89,1);
}
}
};
_7d.prototype.dispatchEvent=function(_8a){
var _8b=_8a.type,_8c=this._eventListenersForEventNames;
if(_82.call(_8c,_8b)){
var _8d=this._eventListenersForEventNames[_8b],_8e=0,_8f=_8d.length;
for(;_8e<_8f;++_8e){
_8d[_8e](_8a);
}
}
var _90=(this._owner||this)["on"+_8b];
if(_90){
_90(_8a);
}
};
var _91=0,_92=null,_93=[];
function _94(_95){
var _96=_91;
if(_92===null){
window.setNativeTimeout(function(){
var _97=_93,_98=0,_99=_93.length;
++_91;
_92=null;
_93=[];
for(;_98<_99;++_98){
_97[_98]();
}
},0);
}
return function(){
var _9a=arguments;
if(_91>_96){
_95.apply(this,_9a);
}else{
_93.push(function(){
_95.apply(this,_9a);
});
}
};
};
var _9b=null;
if(window.XMLHttpRequest){
_9b=window.XMLHttpRequest;
}else{
if(window.ActiveXObject!==_2f){
var _9c=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.6.0"],_9d=_9c.length;
while(_9d--){
try{
var _9e=_9c[_9d];
new ActiveXObject(_9e);
_9b=function(){
return new ActiveXObject(_9e);
};
break;
}
catch(anException){
}
}
}
}
CFHTTPRequest=function(){
this._isOpen=false;
this._requestHeaders={};
this._mimeType=null;
this._eventDispatcher=new _7d(this);
this._nativeRequest=new _9b();
this._withCredentials=false;
this._timeout=60000;
var _9f=this;
this._stateChangeHandler=function(){
_b8(_9f);
};
this._timeoutHandler=function(){
_b6(_9f);
};
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
this._nativeRequest.ontimeout=this._timeoutHandler;
if(CFHTTPRequest.AuthenticationDelegate!==nil){
this._eventDispatcher.addEventListener("HTTP403",function(){
CFHTTPRequest.AuthenticationDelegate(_9f);
});
}
};
CFHTTPRequest.UninitializedState=0;
CFHTTPRequest.LoadingState=1;
CFHTTPRequest.LoadedState=2;
CFHTTPRequest.InteractiveState=3;
CFHTTPRequest.CompleteState=4;
CFHTTPRequest.AuthenticationDelegate=nil;
CFHTTPRequest.prototype.status=function(){
try{
return this._nativeRequest.status||0;
}
catch(anException){
return 0;
}
};
CFHTTPRequest.prototype.statusText=function(){
try{
return this._nativeRequest.statusText||"";
}
catch(anException){
return "";
}
};
CFHTTPRequest.prototype.readyState=function(){
return this._nativeRequest.readyState;
};
CFHTTPRequest.prototype.success=function(){
var _a0=this.status();
if(_a0>=200&&_a0<300){
return YES;
}
return _a0===0&&this.responseText()&&this.responseText().length;
};
CFHTTPRequest.prototype.responseXML=function(){
var _a1=this._nativeRequest.responseXML;
if(_a1&&(_9b===window.XMLHttpRequest)&&_a1.documentRoot){
return _a1;
}
return _a2(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList=function(){
var _a3=this.responseText();
if(CFPropertyList.sniffedFormatOfString(_a3)===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(this.responseXML());
}
return CFPropertyList.propertyListFromString(_a3);
};
CFHTTPRequest.prototype.responseText=function(){
return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader=function(_a4,_a5){
this._requestHeaders[_a4]=_a5;
};
CFHTTPRequest.prototype.getResponseHeader=function(_a6){
return this._nativeRequest.getResponseHeader(_a6);
};
CFHTTPRequest.prototype.setTimeout=function(_a7){
this._timeout=_a7;
if(this._isOpen){
this._nativeRequest.timeout=_a7;
}
};
CFHTTPRequest.prototype.getTimeout=function(_a8){
return this._timeout;
};
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_a9){
this._mimeType=_a9;
};
CFHTTPRequest.prototype.open=function(_aa,_ab,_ac,_ad,_ae){
var _af;
this._isOpen=true;
this._URL=_ab;
this._async=_ac;
this._method=_aa;
this._user=_ad;
this._password=_ae;
requestReturnValue=this._nativeRequest.open(_aa,_ab,_ac,_ad,_ae);
if(this._async){
this._nativeRequest.withCredentials=this._withCredentials;
this._nativeRequest.timeout=this._timeout;
}
return requestReturnValue;
};
CFHTTPRequest.prototype.send=function(_b0){
if(!this._isOpen){
delete this._nativeRequest.onreadystatechange;
delete this._nativeRequest.ontimeout;
this._nativeRequest.open(this._method,this._URL,this._async,this._user,this._password);
this._nativeRequest.ontimeout=this._timeoutHandler;
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
}
for(var i in this._requestHeaders){
if(this._requestHeaders.hasOwnProperty(i)){
this._nativeRequest.setRequestHeader(i,this._requestHeaders[i]);
}
}
if(this._mimeType&&"overrideMimeType" in this._nativeRequest){
this._nativeRequest.overrideMimeType(this._mimeType);
}
this._isOpen=false;
try{
return this._nativeRequest.send(_b0);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
this._isOpen=false;
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_b1,_b2){
this._eventDispatcher.addEventListener(_b1,_b2);
};
CFHTTPRequest.prototype.removeEventListener=function(_b3,_b4){
this._eventDispatcher.removeEventListener(_b3,_b4);
};
CFHTTPRequest.prototype.setWithCredentials=function(_b5){
this._withCredentials=_b5;
if(this._isOpen&&this._async){
this._nativeRequest.withCredentials=_b5;
}
};
CFHTTPRequest.prototype.withCredentials=function(){
return this._withCredentials;
};
CFHTTPRequest.prototype.isTimeoutRequest=function(){
return !this.success()&&!this._nativeRequest.response&&!this._nativeRequest.responseText&&!this._nativeRequest.responseType&&!this._nativeRequest.responseURL&&!this._nativeRequest.responseXML;
};
function _b6(_b7){
_b7._eventDispatcher.dispatchEvent({type:"timeout",request:_b7});
};
function _b8(_b9){
var _ba=_b9._eventDispatcher,_bb=["uninitialized","loading","loaded","interactive","complete"];
_ba.dispatchEvent({type:"readystatechange",request:_b9});
if(_bb[_b9.readyState()]==="complete"){
var _bc="HTTP"+_b9.status();
_ba.dispatchEvent({type:_bc,request:_b9});
var _bd=_b9.success()?"success":"failure";
_ba.dispatchEvent({type:_bd,request:_b9});
_ba.dispatchEvent({type:_bb[_b9.readyState()],request:_b9});
}else{
_ba.dispatchEvent({type:_bb[_b9.readyState()],request:_b9});
}
};
function _be(_bf,_c0,_c1,_c2){
var _c3=new CFHTTPRequest();
if(_bf.pathExtension()==="plist"){
_c3.overrideMimeType("text/xml");
}
var _c4=0,_c5=null;
function _c6(_c7){
_c2(_c7.loaded-_c4);
_c4=_c7.loaded;
};
function _c8(_c9){
if(_c2&&_c5===null){
_c2(_c9.request.responseText().length);
}
_c0(_c9);
};
if(_2.asyncLoader){
_c3.onsuccess=_94(_c8);
_c3.onfailure=_94(_c1);
}else{
_c3.onsuccess=_c8;
_c3.onfailure=_c1;
}
if(_c2){
var _ca=true;
if(document.all){
_ca=!!window.atob;
}
if(_ca){
try{
_c5=_2.asyncLoader?_94(_c6):_c6;
_c3._nativeRequest.onprogress=_c5;
}
catch(anException){
_c5=null;
}
}
}
_c3.open("GET",_bf.absoluteString(),_2.asyncLoader);
_c3.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_94;
_2.determineAndDispatchHTTPRequestEvents=_b8;
var _cb=0;
objj_generateObjectUID=function(){
return _cb++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_cc){
if(_cc.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_cc.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_cd,_ce){
var _cf=new CFMutableData();
_cf.setRawString(CFPropertyList.stringFromPropertyList(_cd,_ce));
return _cf;
};
CFPropertyList.stringFromPropertyList=function(_d0,_d1){
if(!_d1){
_d1=CFPropertyList.Format280North_v1_0;
}
var _d2=_d3[_d1];
return _d2["start"]()+_d4(_d0,_d2)+_d2["finish"]();
};
function _d4(_d5,_d6){
var _d7=typeof _d5,_d8=_d5.valueOf(),_d9=typeof _d8;
if(_d7!==_d9){
_d7=_d9;
_d5=_d8;
}
if(_d5===YES||_d5===NO){
_d7="boolean";
}else{
if(_d7==="number"){
if(FLOOR(_d5)===_d5&&(""+_d5).indexOf("e")==-1){
_d7="integer";
}else{
_d7="real";
}
}else{
if(_d7!=="string"){
if(_d5.slice){
_d7="array";
}else{
_d7="dictionary";
}
}
}
}
return _d6[_d7](_d5,_d6);
};
var _d3={};
_d3[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_da){
return "<string>"+_db(_da)+"</string>";
},"boolean":function(_dc){
return _dc?"<true/>":"<false/>";
},"integer":function(_dd){
return "<integer>"+_dd+"</integer>";
},"real":function(_de){
return "<real>"+_de+"</real>";
},"array":function(_df,_e0){
var _e1=0,_e2=_df.length,_e3="<array>";
for(;_e1<_e2;++_e1){
_e3+=_d4(_df[_e1],_e0);
}
return _e3+"</array>";
},"dictionary":function(_e4,_e5){
var _e6=_e4._keys,_9d=0,_e7=_e6.length,_e8="<dict>";
for(;_9d<_e7;++_9d){
var key=_e6[_9d];
_e8+="<key>"+key+"</key>";
_e8+=_d4(_e4.valueForKey(key),_e5);
}
return _e8+"</dict>";
}};
var _e9="A",_ea="D",_eb="f",_ec="d",_ed="S",_ee="T",_ef="F",_f0="K",_f1="E";
_d3[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_f2){
return _ed+";"+_f2.length+";"+_f2;
},"boolean":function(_f3){
return (_f3?_ee:_ef)+";";
},"integer":function(_f4){
var _f5=""+_f4;
return _ec+";"+_f5.length+";"+_f5;
},"real":function(_f6){
var _f7=""+_f6;
return _eb+";"+_f7.length+";"+_f7;
},"array":function(_f8,_f9){
var _fa=0,_fb=_f8.length,_fc=_e9+";";
for(;_fa<_fb;++_fa){
_fc+=_d4(_f8[_fa],_f9);
}
return _fc+_f1+";";
},"dictionary":function(_fd,_fe){
var _ff=_fd._keys,_9d=0,_100=_ff.length,_101=_ea+";";
for(;_9d<_100;++_9d){
var key=_ff[_9d];
_101+=_f0+";"+key.length+";"+key;
_101+=_d4(_fd.valueForKey(key),_fe);
}
return _101+_f1+";";
}};
var _102="xml",_103="#document",_104="plist",_105="key",_106="dict",_107="array",_108="string",_109="date",_10a="true",_10b="false",_10c="real",_10d="integer",_10e="data";
var _10f=function(_110){
var text="",_9d=0,_111=_110.length;
for(;_9d<_111;++_9d){
var node=_110[_9d];
if(node.nodeType===3||node.nodeType===4){
text+=node.nodeValue;
}else{
if(node.nodeType!==8){
text+=_10f(node.childNodes);
}
}
}
return text;
};
var _112=function(_113,_114,_115){
var node=_113;
node=(node.firstChild);
if(node!==NULL&&((node.nodeType)===8||(node.nodeType)===3)){
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
}
if(node){
return node;
}
if((String(_113.nodeName))===_107||(String(_113.nodeName))===_106){
_115.pop();
}else{
if(node===_114){
return NULL;
}
node=_113;
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
if(node){
return node;
}
}
node=_113;
while(node){
var next=node;
while((next=(next.nextSibling))&&((next.nodeType)===8||(next.nodeType)===3)){
}
if(next){
return next;
}
var node=(node.parentNode);
if(_114&&node===_114){
return NULL;
}
_115.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_116,_117){
return CFPropertyList.propertyListFromString(_116.rawString(),_117);
};
CFPropertyList.propertyListFromString=function(_118,_119){
if(!_119){
_119=CFPropertyList.sniffedFormatOfString(_118);
}
if(_119===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_118);
}
if(_119===CFPropertyList.Format280North_v1_0){
return _11a(_118);
}
return NULL;
};
var _e9="A",_ea="D",_eb="f",_ec="d",_ed="S",_ee="T",_ef="F",_f0="K",_f1="E";
function _11a(_11b){
var _11c=new _11d(_11b),_11e=NULL,key="",_11f=NULL,_120=NULL,_121=[],_122=NULL;
while(_11e=_11c.getMarker()){
if(_11e===_f1){
_121.pop();
continue;
}
var _123=_121.length;
if(_123){
_122=_121[_123-1];
}
if(_11e===_f0){
key=_11c.getString();
_11e=_11c.getMarker();
}
switch(_11e){
case _e9:
_11f=[];
_121.push(_11f);
break;
case _ea:
_11f=new CFMutableDictionary();
_121.push(_11f);
break;
case _eb:
_11f=parseFloat(_11c.getString());
break;
case _ec:
_11f=parseInt(_11c.getString(),10);
break;
case _ed:
_11f=_11c.getString();
break;
case _ee:
_11f=YES;
break;
case _ef:
_11f=NO;
break;
default:
throw new Error("*** "+_11e+" marker not recognized in Plist.");
}
if(!_120){
_120=_11f;
}else{
if(_122){
if(_122.slice){
_122.push(_11f);
}else{
_122.setValueForKey(key,_11f);
}
}
}
}
return _120;
};
function _db(_124){
return _124.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _125(_126){
return _126.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _a2(_127){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_127,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _128=_127.match(CFPropertyList.DTDRE);
if(_128){
_127=_127.substr(_128[0].length);
}
XMLNode.loadXML(_127);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_129){
var _12a=_129;
if(_129.valueOf&&typeof _129.valueOf()==="string"){
_12a=_a2(_129);
}
while(((String(_12a.nodeName))===_103)||((String(_12a.nodeName))===_102)){
_12a=(_12a.firstChild);
if(_12a!==NULL&&((_12a.nodeType)===8||(_12a.nodeType)===3)){
while((_12a=(_12a.nextSibling))&&((_12a.nodeType)===8||(_12a.nodeType)===3)){
}
}
}
if(((_12a.nodeType)===10)){
while((_12a=(_12a.nextSibling))&&((_12a.nodeType)===8||(_12a.nodeType)===3)){
}
}
if(!((String(_12a.nodeName))===_104)){
return NULL;
}
var key="",_12b=NULL,_12c=NULL,_12d=_12a,_12e=[],_12f=NULL;
while(_12a=_112(_12a,_12d,_12e)){
var _130=_12e.length;
if(_130){
_12f=_12e[_130-1];
}
if((String(_12a.nodeName))===_105){
key=(_12a.textContent||(_12a.textContent!==""&&_10f([_12a])));
while((_12a=(_12a.nextSibling))&&((_12a.nodeType)===8||(_12a.nodeType)===3)){
}
}
switch(String((String(_12a.nodeName)))){
case _107:
_12b=[];
_12e.push(_12b);
break;
case _106:
_12b=new CFMutableDictionary();
_12e.push(_12b);
break;
case _10c:
_12b=parseFloat((_12a.textContent||(_12a.textContent!==""&&_10f([_12a]))));
break;
case _10d:
_12b=parseInt((_12a.textContent||(_12a.textContent!==""&&_10f([_12a]))),10);
break;
case _108:
if((_12a.getAttribute("type")==="base64")){
_12b=(_12a.firstChild)?CFData.decodeBase64ToString((_12a.textContent||(_12a.textContent!==""&&_10f([_12a])))):"";
}else{
_12b=_125((_12a.firstChild)?(_12a.textContent||(_12a.textContent!==""&&_10f([_12a]))):"");
}
break;
case _109:
var _131=Date.parseISO8601((_12a.textContent||(_12a.textContent!==""&&_10f([_12a]))));
_12b=isNaN(_131)?new Date():new Date(_131);
break;
case _10a:
_12b=YES;
break;
case _10b:
_12b=NO;
break;
case _10e:
_12b=new CFMutableData();
var _132=(_12a.firstChild)?CFData.decodeBase64ToArray((_12a.textContent||(_12a.textContent!==""&&_10f([_12a]))),YES):[];
_12b.setBytes(_132);
break;
default:
throw new Error("*** "+(String(_12a.nodeName))+" tag not recognized in Plist.");
}
if(!_12c){
_12c=_12b;
}else{
if(_12f){
if(_12f.slice){
_12f.push(_12b);
}else{
_12f.setValueForKey(key,_12b);
}
}
}
}
return _12c;
};
kCFPropertyListOpenStepFormat=CFPropertyList.FormatOpenStep;
kCFPropertyListXMLFormat_v1_0=CFPropertyList.FormatXML_v1_0;
kCFPropertyListBinaryFormat_v1_0=CFPropertyList.FormatBinary_v1_0;
kCFPropertyList280NorthFormat_v1_0=CFPropertyList.Format280North_v1_0;
CFPropertyListCreate=function(){
return new CFPropertyList();
};
CFPropertyListCreateFromXMLData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateXMLData=function(_133){
return CFPropertyList.dataFromPropertyList(_133,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_134){
return CFPropertyList.dataFromPropertyList(_134,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_135){
return CFPropertyList.propertyListFromData(data,_135);
};
CPPropertyListCreateData=function(_136,_137){
return CFPropertyList.dataFromPropertyList(_136,_137);
};
CFDictionary=function(_138){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _139=Array.prototype.indexOf,_82=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _13a=new CFMutableDictionary(),keys=this._keys,_13b=this._count;
_13a._keys=keys.slice();
_13a._count=_13b;
var _13c=0,_13d=this._buckets,_13e=_13a._buckets;
for(;_13c<_13b;++_13c){
var key=keys[_13c];
_13e[key]=_13d[key];
}
return _13a;
};
CFDictionary.prototype.containsKey=function(aKey){
return _82.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_13f){
var keys=this._keys,_140=this._buckets,_9d=0,_141=keys.length;
for(;_9d<_141;++_9d){
if(_140[keys[_9d]]===_13f){
return YES;
}
}
return NO;
};
CFDictionary.prototype.count=function(){
return this._count;
};
CFDictionary.prototype.countOfKey=function(aKey){
return this.containsKey(aKey)?1:0;
};
CFDictionary.prototype.countOfValue=function(_142){
var keys=this._keys,_143=this._buckets,_9d=0,_144=keys.length,_145=0;
for(;_9d<_144;++_9d){
if(_143[keys[_9d]]===_142){
++_145;
}
}
return _145;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _146=this._buckets;
if(!_82.apply(_146,[aKey])){
return nil;
}
return _146[aKey];
};
CFDictionary.prototype.toString=function(){
var _147="{\n",keys=this._keys,_9d=0,_148=this._count;
for(;_9d<_148;++_9d){
var key=keys[_9d];
_147+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _147+"}";
};
CFMutableDictionary=function(_149){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_14a){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_14a;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _14b=-1;
if(_139){
_14b=_139.call(this._keys,aKey);
}else{
var keys=this._keys,_9d=0,_14c=keys.length;
for(;_9d<_14c;++_9d){
if(keys[_9d]===aKey){
_14b=_9d;
break;
}
}
}
if(_14b===-1){
return;
}
--this._count;
this._keys.splice(_14b,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_14d){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_14d;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_14e){
if(_14e===nil||_14e===_2f){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_14e);
}else{
this.addValueForKey(aKey,_14e);
}
}
};
kCFErrorLocalizedDescriptionKey="CPLocalizedDescription";
kCFErrorLocalizedFailureReasonKey="CPLocalizedFailureReason";
kCFErrorLocalizedRecoverySuggestionKey="CPLocalizedRecoverySuggestion";
kCFErrorDescriptionKey="CPDescription";
kCFErrorUnderlyingErrorKey="CPUnderlyingError";
kCFErrorURLKey="CPURL";
kCFErrorFilePathKey="CPFilePath";
kCFErrorDomainCappuccino="CPCappuccinoErrorDomain";
kCFErrorDomainCocoa=kCFErrorDomainCappuccino;
CFError=function(_14f,code,_150){
this._domain=_14f||NULL;
this._code=code||0;
this._userInfo=_150||new CFDictionary();
this._UID=objj_generateObjectUID();
};
CFError.prototype.domain=function(){
return this._domain;
};
CFError.prototype.code=function(){
return this._code;
};
CFError.prototype.description=function(){
var _151=this._userInfo.valueForKey(kCFErrorLocalizedDescriptionKey);
if(_151){
return _151;
}
var _152=this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
if(_152){
var _153="The operation couldn’t be completed. "+_152;
return _153;
}
var _154="",desc=this._userInfo.valueForKey(kCFErrorDescriptionKey);
if(desc){
var _154="The operation couldn’t be completed. (error "+this._code+" - "+desc+")";
}else{
var _154="The operation couldn’t be completed. (error "+this._code+")";
}
return _154;
};
CFError.prototype.failureReason=function(){
return this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
};
CFError.prototype.recoverySuggestion=function(){
return this._userInfo.valueForKey(kCFErrorLocalizedRecoverySuggestionKey);
};
CFError.prototype.userInfo=function(){
return this._userInfo;
};
CFErrorCreate=function(_155,code,_156){
return new CFError(_155,code,_156);
};
CFErrorCreateWithUserInfoKeysAndValues=function(_157,code,_158,_159,_15a){
var _15b=new CFMutableDictionary();
while(_15a--){
_15b.setValueForKey(_158[_15a],_159[_15a]);
}
return new CFError(_157,code,_15b);
};
CFErrorGetCode=function(err){
return err.code();
};
CFErrorGetDomain=function(err){
return err.domain();
};
CFErrorCopyDescription=function(err){
return err.description();
};
CFErrorCopyUserInfo=function(err){
return err.userInfo();
};
CFErrorCopyFailureReason=function(err){
return err.failureReason();
};
CFErrorCopyRecoverySuggestion=function(err){
return err.recoverySuggestion();
};
kCFURLErrorUnknown=-998;
kCFURLErrorCancelled=-999;
kCFURLErrorBadURL=-1000;
kCFURLErrorTimedOut=-1001;
kCFURLErrorUnsupportedURL=-1002;
kCFURLErrorCannotFindHost=-1003;
kCFURLErrorCannotConnectToHost=-1004;
kCFURLErrorNetworkConnectionLost=-1005;
kCFURLErrorDNSLookupFailed=-1006;
kCFURLErrorHTTPTooManyRedirects=-1007;
kCFURLErrorResourceUnavailable=-1008;
kCFURLErrorNotConnectedToInternet=-1009;
kCFURLErrorRedirectToNonExistentLocation=-1010;
kCFURLErrorBadServerResponse=-1011;
kCFURLErrorUserCancelledAuthentication=-1012;
kCFURLErrorUserAuthenticationRequired=-1013;
kCFURLErrorZeroByteResource=-1014;
kCFURLErrorCannotDecodeRawData=-1015;
kCFURLErrorCannotDecodeContentData=-1016;
kCFURLErrorCannotParseResponse=-1017;
kCFURLErrorRequestBodyStreamExhausted=-1021;
kCFURLErrorFileDoesNotExist=-1100;
kCFURLErrorFileIsDirectory=-1101;
kCFURLErrorNoPermissionsToReadFile=-1102;
kCFURLErrorDataLengthExceedsMaximum=-1103;
CFData=function(){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFData.prototype.propertyList=function(){
if(!this._propertyList){
this._propertyList=CFPropertyList.propertyListFromString(this.rawString());
}
return this._propertyList;
};
CFData.prototype.JSONObject=function(){
if(!this._JSONObject){
try{
this._JSONObject=JSON.parse(this.rawString());
}
catch(anException){
}
}
return this._JSONObject;
};
CFData.prototype.rawString=function(){
if(this._rawString===NULL){
if(this._propertyList){
this._rawString=CFPropertyList.stringFromPropertyList(this._propertyList,this._propertyListFormat);
}else{
if(this._JSONObject){
this._rawString=JSON.stringify(this._JSONObject);
}else{
if(this._bytes){
this._rawString=CFData.bytesToString(this._bytes);
}else{
if(this._base64){
this._rawString=CFData.decodeBase64ToString(this._base64,true);
}else{
throw new Error("Can't convert data to string.");
}
}
}
}
}
return this._rawString;
};
CFData.prototype.bytes=function(){
if(this._bytes===NULL){
var _15c=CFData.stringToBytes(this.rawString());
this.setBytes(_15c);
}
return this._bytes;
};
CFData.prototype.base64=function(){
if(this._base64===NULL){
var _15d;
if(this._bytes){
_15d=CFData.encodeBase64Array(this._bytes);
}else{
_15d=CFData.encodeBase64String(this.rawString());
}
this.setBase64String(_15d);
}
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _15e(_15f){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_160,_161){
_15e(this);
this._propertyList=_160;
this._propertyListFormat=_161;
};
CFMutableData.prototype.setJSONObject=function(_162){
_15e(this);
this._JSONObject=_162;
};
CFMutableData.prototype.setRawString=function(_163){
_15e(this);
this._rawString=_163;
};
CFMutableData.prototype.setBytes=function(_164){
_15e(this);
this._bytes=_164;
};
CFMutableData.prototype.setBase64String=function(_165){
_15e(this);
this._base64=_165;
};
var _166=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_167=[];
for(var i=0;i<_166.length;i++){
_167[_166[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_168,_169){
if(_169){
_168=_168.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_168[_168.length-1]=="="?1:0)+(_168[_168.length-2]=="="?1:0),_16a=_168.length,_16b=[];
var i=0;
while(i<_16a){
var bits=(_167[_168.charCodeAt(i++)]<<18)|(_167[_168.charCodeAt(i++)]<<12)|(_167[_168.charCodeAt(i++)]<<6)|(_167[_168.charCodeAt(i++)]);
_16b.push((bits&16711680)>>16);
_16b.push((bits&65280)>>8);
_16b.push(bits&255);
}
if(pad>0){
return _16b.slice(0,-1*pad);
}
return _16b;
};
CFData.encodeBase64Array=function(_16c){
var pad=(3-(_16c.length%3))%3,_16d=_16c.length+pad,_16e=[];
if(pad>0){
_16c.push(0);
}
if(pad>1){
_16c.push(0);
}
var i=0;
while(i<_16d){
var bits=(_16c[i++]<<16)|(_16c[i++]<<8)|(_16c[i++]);
_16e.push(_166[(bits&16515072)>>18]);
_16e.push(_166[(bits&258048)>>12]);
_16e.push(_166[(bits&4032)>>6]);
_16e.push(_166[bits&63]);
}
if(pad>0){
_16e[_16e.length-1]="=";
_16c.pop();
}
if(pad>1){
_16e[_16e.length-2]="=";
_16c.pop();
}
return _16e.join("");
};
CFData.decodeBase64ToString=function(_16f,_170){
return CFData.bytesToString(CFData.decodeBase64ToArray(_16f,_170));
};
CFData.decodeBase64ToUtf16String=function(_171,_172){
return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(_171,_172));
};
CFData.bytesToString=function(_173){
return String.fromCharCode.apply(NULL,_173);
};
CFData.stringToBytes=function(_174){
var temp=[];
for(var i=0;i<_174.length;i++){
temp.push(_174.charCodeAt(i));
}
return temp;
};
CFData.encodeBase64String=function(_175){
var temp=[];
for(var i=0;i<_175.length;i++){
temp.push(_175.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String=function(_176){
var temp=[];
for(var i=0;i<_176.length;i+=2){
temp.push(_176[i+1]<<8|_176[i]);
}
return String.fromCharCode.apply(NULL,temp);
};
CFData.encodeBase64Utf16String=function(_177){
var temp=[];
for(var i=0;i<_177.length;i++){
var c=_177.charCodeAt(i);
temp.push(c&255);
temp.push((c&65280)>>8);
}
return CFData.encodeBase64Array(temp);
};
var _178,_179,_17a=0;
function _17b(){
if(++_17a!==1){
return;
}
_178={};
_179={};
};
function _17c(){
_17a=MAX(_17a-1,0);
if(_17a!==0){
return;
}
delete _178;
delete _179;
};
var _17d=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _17e=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _17f(aURL){
if(aURL._parts){
return aURL._parts;
}
var _180=aURL.string(),_181=_180.match(/^mhtml:/);
if(_181){
_180=_180.substr("mhtml:".length);
}
if(_17a>0&&_82.call(_179,_180)){
aURL._parts=_179[_180];
return aURL._parts;
}
aURL._parts={};
var _182=aURL._parts,_183=_17d.exec(_180),_9d=_183.length;
while(_9d--){
_182[_17e[_9d]]=_183[_9d]||NULL;
}
_182.portNumber=parseInt(_182.portNumber,10);
if(isNaN(_182.portNumber)){
_182.portNumber=-1;
}
_182.pathComponents=[];
if(_182.path){
var _184=_182.path.split("/"),_185=_182.pathComponents,_186=_184.length;
for(_9d=0;_9d<_186;++_9d){
var _187=_184[_9d];
if(_187){
_185.push(_187);
}else{
if(_9d===0){
_185.push("/");
}
}
}
_182.pathComponents=_185;
}
if(_181){
_182.url="mhtml:"+_182.url;
_182.scheme="mhtml:"+_182.scheme;
}
if(_17a>0){
_179[_180]=_182;
}
return _182;
};
CFURL=function(aURL,_188){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_188){
return new CFURL(aURL.absoluteString());
}
var _189=aURL.baseURL();
if(_189){
_188=new CFURL(_189.absoluteURL(),_188);
}
aURL=aURL.string();
}
if(_17a>0){
var _18a=aURL+" "+(_188&&_188.UID()||"");
if(_82.call(_178,_18a)){
return _178[_18a];
}
_178[_18a]=this;
}
if(aURL.match(/^data:/)){
var _18b={},_9d=_17e.length;
while(_9d--){
_18b[_17e[_9d]]="";
}
_18b.url=aURL;
_18b.scheme="data";
_18b.pathComponents=[];
this._parts=_18b;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_188;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _18c={};
CFURL.prototype.mappedURL=function(){
return _18c[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_18d,_18e){
_18c[_18d.absoluteString()]=_18e;
};
CFURL.prototype.schemeAndAuthority=function(){
var _18f="",_190=this.scheme();
if(_190){
_18f+=_190+":";
}
var _191=this.authority();
if(_191){
_18f+="//"+_191;
}
return _18f;
};
CFURL.prototype.absoluteString=function(){
if(this._absoluteString===_2f){
this._absoluteString=this.absoluteURL().string();
}
return this._absoluteString;
};
CFURL.prototype.toString=function(){
return this.absoluteString();
};
function _192(aURL){
aURL=aURL.standardizedURL();
var _193=aURL.baseURL();
if(!_193){
return aURL;
}
var _194=((aURL)._parts||_17f(aURL)),_195,_196=_193.absoluteURL(),_197=((_196)._parts||_17f(_196));
if(!_194.scheme&&_194.authorityRoot){
_195=_198(_194);
_195.scheme=_193.scheme();
}else{
if(_194.scheme||_194.authority){
_195=_194;
}else{
_195={};
_195.scheme=_197.scheme;
_195.authority=_197.authority;
_195.userInfo=_197.userInfo;
_195.user=_197.user;
_195.password=_197.password;
_195.domain=_197.domain;
_195.portNumber=_197.portNumber;
_195.queryString=_194.queryString;
_195.fragment=_194.fragment;
var _199=_194.pathComponents;
if(_199.length&&_199[0]==="/"){
_195.path=_194.path;
_195.pathComponents=_199;
}else{
var _19a=_197.pathComponents,_19b=_19a.concat(_199);
if(!_193.hasDirectoryPath()&&_19a.length){
_19b.splice(_19a.length-1,1);
}
if(_199.length&&(_199[0]===".."||_199[0]===".")){
_19c(_19b,YES);
}
_195.pathComponents=_19b;
_195.path=_19d(_19b,_199.length<=0||aURL.hasDirectoryPath());
}
}
}
var _19e=_19f(_195),_1a0=new CFURL(_19e);
_1a0._parts=_195;
_1a0._standardizedURL=_1a0;
_1a0._standardizedString=_19e;
_1a0._absoluteURL=_1a0;
_1a0._absoluteString=_19e;
return _1a0;
};
function _19d(_1a1,_1a2){
var path=_1a1.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_1a2){
path+="/";
}
return path;
};
function _19c(_1a3,_1a4){
var _1a5=0,_1a6=0,_1a7=_1a3.length,_1a8=_1a4?_1a3:[],_1a9=NO;
for(;_1a5<_1a7;++_1a5){
var _1aa=_1a3[_1a5];
if(_1aa===""){
continue;
}
if(_1aa==="."){
_1a9=_1a6===0;
continue;
}
if(_1aa!==".."||_1a6===0||_1a8[_1a6-1]===".."){
_1a8[_1a6]=_1aa;
_1a6++;
continue;
}
if(_1a6>0&&_1a8[_1a6-1]!=="/"){
--_1a6;
}
}
if(_1a9&&_1a6===0){
_1a8[_1a6++]=".";
}
_1a8.length=_1a6;
return _1a8;
};
function _19f(_1ab){
var _1ac="",_1ad=_1ab.scheme;
if(_1ad){
_1ac+=_1ad+":";
}
var _1ae=_1ab.authority;
if(_1ae){
_1ac+="//"+_1ae;
}
_1ac+=_1ab.path;
var _1af=_1ab.queryString;
if(_1af){
_1ac+="?"+_1af;
}
var _1b0=_1ab.fragment;
if(_1b0){
_1ac+="#"+_1b0;
}
return _1ac;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_2f){
this._absoluteURL=_192(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_2f){
var _1b1=((this)._parts||_17f(this)),_1b2=_1b1.pathComponents,_1b3=_19c(_1b2,NO);
var _1b4=_19d(_1b3,this.hasDirectoryPath());
if(_1b1.path===_1b4){
this._standardizedURL=this;
}else{
var _1b5=_198(_1b1);
_1b5.pathComponents=_1b3;
_1b5.path=_1b4;
var _1b6=new CFURL(_19f(_1b5),this.baseURL());
_1b6._parts=_1b5;
_1b6._standardizedURL=_1b6;
this._standardizedURL=_1b6;
}
}
return this._standardizedURL;
};
function _198(_1b7){
var _1b8={},_1b9=_17e.length;
while(_1b9--){
var _1ba=_17e[_1b9];
_1b8[_1ba]=_1b7[_1ba];
}
return _1b8;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _1bb=((this)._parts||_17f(this)).authority;
if(_1bb){
return _1bb;
}
var _1bc=this.baseURL();
return _1bc&&_1bc.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _1bd=this._hasDirectoryPath;
if(_1bd===_2f){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _1be=this.lastPathComponent();
_1bd=_1be==="."||_1be==="..";
this._hasDirectoryPath=_1bd;
}
return _1bd;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_17f(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_2f){
var _1bf=this.pathComponents(),_1c0=_1bf.length;
if(!_1c0){
this._lastPathComponent="";
}else{
this._lastPathComponent=_1bf[_1c0-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_17f(this)).path;
};
CFURL.prototype.createCopyDeletingLastPathComponent=function(){
var _1c1=((this)._parts||_17f(this)),_1c2=_19c(_1c1.pathComponents,NO);
if(_1c2.length>0){
if(_1c2.length>1||_1c2[0]!=="/"){
_1c2.pop();
}
}
var _1c3=_1c2.length===1&&_1c2[0]==="/";
_1c1.pathComponents=_1c2;
_1c1.path=_1c3?"/":_19d(_1c2,NO);
return new CFURL(_19f(_1c1));
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_17f(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _1c4=this.lastPathComponent();
if(!_1c4){
return NULL;
}
_1c4=_1c4.replace(/^\.*/,"");
var _1c5=_1c4.lastIndexOf(".");
return _1c5<=0?"":_1c4.substring(_1c5+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_17f(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _1c6=this._scheme;
if(_1c6===_2f){
_1c6=((this)._parts||_17f(this)).scheme;
if(!_1c6){
var _1c7=this.baseURL();
_1c6=_1c7&&_1c7.scheme();
}
this._scheme=_1c6;
}
return _1c6;
};
CFURL.prototype.user=function(){
return ((this)._parts||_17f(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_17f(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_17f(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_17f(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _1c8=this.lastPathComponent();
if(_1c8!=="/"){
_1c8="./"+_1c8;
}
return new CFURL(_1c8+"/",this);
};
function _1c9(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _1c9(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_1ca){
_1c9(this).setValueForKey(aKey,_1ca);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_1cb.resourceAtURL(this).contents());
return data;
};
function _11d(_1cc){
this._string=_1cc;
var _1cd=_1cc.indexOf(";");
this._magicNumber=_1cc.substr(0,_1cd);
this._location=_1cc.indexOf(";",++_1cd);
this._version=_1cc.substring(_1cd,this._location++);
};
_11d.prototype.magicNumber=function(){
return this._magicNumber;
};
_11d.prototype.version=function(){
return this._version;
};
_11d.prototype.getMarker=function(){
var _1ce=this._string,_1cf=this._location;
if(_1cf>=_1ce.length){
return null;
}
var next=_1ce.indexOf(";",_1cf);
if(next<0){
return null;
}
var _1d0=_1ce.substring(_1cf,next);
if(_1d0==="e"){
return null;
}
this._location=next+1;
return _1d0;
};
_11d.prototype.getString=function(){
var _1d1=this._string,_1d2=this._location;
if(_1d2>=_1d1.length){
return null;
}
var next=_1d1.indexOf(";",_1d2);
if(next<0){
return null;
}
var size=parseInt(_1d1.substring(_1d2,next),10),text=_1d1.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _1d3=0,_1d4=1<<0,_1d5=1<<1,_1d6=1<<2,_1d7=1<<3,_1d8=1<<4,_1d9=1<<5;
var _1da={},_1db={},_1dc={},_1dd=new Date().getTime(),_1de=0,_1df=0;
var _1e0="CPBundleDefaultBrowserLanguage",_1e1="CPBundleDefaultLanguage";
CFBundle=function(aURL){
aURL=_1e2(aURL).asDirectoryPathURL();
var _1e3=aURL.absoluteString(),_1e4=_1da[_1e3];
if(_1e4){
return _1e4;
}
_1da[_1e3]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_1d3;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _7d(this);
this._localizableStrings=[];
this._loadedLanguage=NULL;
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1e2(aURL));
var _1e5,_1e6=aURL.absoluteString();
while(!_1e5||_1e5!==_1e6){
var _1e7=_1da[_1e6];
if(_1e7&&_1e7._isValid){
return _1e7;
}
aURL=new CFURL("..",aURL);
_1e5=_1e6;
_1e6=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1e8);
};
function _1e9(_1ea,_1eb){
if(_1eb){
_1db[_1ea.name]=_1eb;
}
};
function _1ec(){
_1da={};
_1db={};
_1dc={};
_1de=0;
_1df=0;
};
CFBundle.bundleForClass=function(_1ed){
return _1db[_1ed.name]||CFBundle.mainBundle();
};
CFBundle.bundleWithIdentifier=function(_1ee){
return _1dc[_1ee]||NULL;
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL.absoluteURL();
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1ef,_1f0,_1f1,_1f2){
if(_1f0){
_1ef=_1ef+"."+_1f0;
}
if(_1f2){
_1ef=_1f2+_1ef;
}
if(_1f1){
_1ef=_1f1+"/"+_1ef;
}
var _1f3=(new CFURL(_1ef,this.resourcesDirectoryURL())).mappedURL();
return _1f3.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_2f){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_2f){
var _1f4=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1f4){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1f4,this.mostEligibleEnvironmentURL());
}
}
return this._executableURL;
};
CFBundle.prototype.infoDictionary=function(){
return this._infoDictionary;
};
CFBundle.prototype.loadedLanguage=function(){
return this._loadedLanguage;
};
CFBundle.prototype.valueForInfoDictionaryKey=function(aKey){
return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.identifier=function(){
return this._infoDictionary.valueForKey("CPBundleIdentifier");
};
CFBundle.prototype.hasSpritedImages=function(){
var _1f5=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_9d=_1f5.length,_1f6=this.mostEligibleEnvironment();
while(_9d--){
if(_1f5[_9d]===_1f6){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1f7){
_1f7=_1f7||this.environments();
var _1f8=CFBundle.environments(),_9d=0,_1f9=_1f8.length,_1fa=_1f7.length;
for(;_9d<_1f9;++_9d){
var _1fb=0,_1fc=_1f8[_9d];
for(;_1fb<_1fa;++_1fb){
if(_1fc===_1f7[_1fb]){
return _1fc;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_1d4;
};
CFBundle.prototype.isLoaded=function(){
return !!(this._loadStatus&_1d9);
};
CFBundle.prototype.load=function(_1fd){
if(this._loadStatus!==_1d3){
return;
}
this._loadStatus=_1d4|_1d5;
var self=this,_1fe=this.bundleURL(),_1ff=new CFURL("..",_1fe);
if(_1ff.absoluteString()===_1fe.absoluteString()){
_1ff=_1ff.schemeAndAuthority();
}
_1cb.resolveResourceAtURL(_1ff,YES,function(_200){
var _201=_1fe.lastPathComponent();
self._staticResource=_200._children[_201]||new _1cb(_1fe,_200,YES,NO);
function _202(_203){
self._loadStatus&=~_1d5;
var _204=_203.request.responsePropertyList();
self._isValid=!!_204||CFBundle.mainBundle()===self;
if(_204){
self._infoDictionary=_204;
var _205=self._infoDictionary.valueForKey("CPBundleIdentifier");
if(_205){
_1dc[_205]=self;
}
}
if(!self._infoDictionary){
_207(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1df=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_248(self);
_20b(self,_1fd);
};
function _206(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_1d3;
_207(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _be(new CFURL("Info.plist",self.bundleURL()),_202,_206);
});
};
function _207(_208,_209){
_20a(_208._staticResource);
_208._eventDispatcher.dispatchEvent({type:"error",error:_209,bundle:_208});
};
function _20b(_20c,_20d){
if(!_20c.mostEligibleEnvironment()){
return _20e();
}
_20f(_20c,_210,_20e,_211);
_212(_20c,_210,_20e,_211);
_213(_20c,_210,_20e,_211);
if(_20c._loadStatus===_1d4){
return _210();
}
function _20e(_214){
var _215=_20c._loadRequests,_216=_215.length;
while(_216--){
_215[_216].abort();
}
this._loadRequests=[];
_20c._loadStatus=_1d3;
_207(_20c,_214||new Error("Could not recognize executable code format in Bundle "+_20c));
};
function _211(_217){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"){
_1de+=_217;
var _218=_1df?MAX(MIN(1,_1de/_1df),0):0;
OBJJ_PROGRESS_CALLBACK(_218,_1df,_20c.bundlePath());
}
};
function _210(){
if(_20c._loadStatus===_1d4){
_20c._loadStatus=_1d9;
}else{
return;
}
_20a(_20c._staticResource);
function _219(){
_20c._eventDispatcher.dispatchEvent({type:"load",bundle:_20c});
};
if(_20d){
_21a(_20c,_219);
}else{
_219();
}
};
};
function _20f(_21b,_21c,_21d,_21e){
var _21f=_21b.executableURL();
if(!_21f){
return;
}
_21b._loadStatus|=_1d6;
new _be(_21f,function(_220){
try{
_221(_21b,_220.request.responseText(),_21f);
_21b._loadStatus&=~_1d6;
_21c();
}
catch(anException){
_21d(anException);
}
},_21d,_21e);
};
function _222(_223){
return "mhtml:"+new CFURL("MHTMLTest.txt",_223.mostEligibleEnvironmentURL());
};
function _224(_225){
if(_226===_227){
return new CFURL("dataURLs.txt",_225.mostEligibleEnvironmentURL());
}
if(_226===_228||_226===_229){
return new CFURL("MHTMLPaths.txt",_225.mostEligibleEnvironmentURL());
}
return NULL;
};
function _212(_22a,_22b,_22c,_22d){
if(!_22a.hasSpritedImages()){
return;
}
_22a._loadStatus|=_1d7;
if(!_22e()){
return _22f(_222(_22a),function(){
_212(_22a,_22b,_22c,_22d);
});
}
var _230=_224(_22a);
if(!_230){
_22a._loadStatus&=~_1d7;
return _22b();
}
new _be(_230,function(_231){
try{
_221(_22a,_231.request.responseText(),_230);
_22a._loadStatus&=~_1d7;
_22b();
}
catch(anException){
_22c(anException);
}
},_22c,_22d);
};
function _213(_232,_233,_234,_235){
var _236=_232._loadedLanguage;
if(!_236){
return;
}
var _237=_232.valueForInfoDictionaryKey("CPBundleLocalizableStrings");
if(!_237){
return;
}
var self=_232,_238=_237.length,_239=new CFURL(_236+".lproj/",self.resourcesDirectoryURL()),_23a=0;
for(var i=0;i<_238;i++){
var _23b=_237[i];
function _23c(_23d){
var _23e=_23d.request.responseText(),_23f=new CFURL(_23d.request._URL).lastPathComponent();
try{
_240(self,_23e,_23f);
if(++_23a==_238){
_232._loadStatus&=~_1d8;
_233();
}
}
catch(e){
_234(new Error("Error when parsing the localizable file "+_23f));
}
};
_232._loadStatus|=_1d8;
new _be(new CFURL(_23b,_239),_23c,_234,_235);
}
};
function _240(_241,_242,_243){
var _244={},_245=_242.split("\n"),_246;
_241._localizableStrings[_243]=_244;
for(var i=0;i<_245.length;i++){
var line=_245[i];
if(line[0]=="/"){
_246=line.substring(2,line.length-2).trim();
continue;
}
if(line[0]=="\""){
var _247=line.split("\"");
var key=_247[1];
if(!(key in _244)){
_244[key]=_247[3];
}
key+=_246;
if(!(key in _244)){
_244[key]=_247[3];
}
continue;
}
}
};
function _248(_249){
if(_249._loadedLanguage){
return;
}
var _24a=_249.valueForInfoDictionaryKey(_1e1);
if(_24a!=_1e0&&_24a){
_249._loadedLanguage=_24a;
return;
}
if(typeof navigator=="undefined"){
return;
}
var _24b=(typeof navigator.language!=="undefined")?navigator.language:navigator.userLanguage;
if(!_24b){
return;
}
_249._loadedLanguage=_24b.substring(0,2);
};
var _24c=[],_226=-1,_24d=0,_227=1,_228=2,_229=3;
function _22e(){
return _226!==-1;
};
function _22f(_24e,_24f){
if(_22e()){
return;
}
_24c.push(_24f);
if(_24c.length>1){
return;
}
_24c.push(function(){
var size=0,_250=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_250){
return;
}
switch(_226){
case _227:
size=_250.valueForKey("data");
break;
case _228:
case _229:
size=_250.valueForKey("mhtml");
break;
}
_1df+=size;
});
_251([_227,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_228,_24e+"!test",_229,_24e+"?"+_1dd+"!test"]);
};
function _252(){
var _253=_24c.length;
while(_253--){
_24c[_253]();
}
};
function _251(_254){
if(!("Image" in _1)||_254.length<2){
_226=_24d;
_252();
return;
}
var _255=new Image();
_255.onload=function(){
if(_255.width===1&&_255.height===1){
_226=_254[0];
_252();
}else{
_255.onerror();
}
};
_255.onerror=function(){
_251(_254.slice(2));
};
_255.src=_254[1];
};
function _21a(_256,_257){
var _258=[_256._staticResource];
function _259(_25a){
for(;_25a<_258.length;++_25a){
var _25b=_258[_25a];
if(_25b.isNotFound()){
continue;
}
if(_25b.isFile()){
var _25c=new _6eb(_25b.URL());
if(_25c.hasLoadedFileDependencies()){
_25c.execute();
}else{
_25c.loadFileDependencies(function(){
_259(_25a);
});
return;
}
}else{
if(_25b.URL().absoluteString()===_256.resourcesDirectoryURL().absoluteString()){
continue;
}
var _25d=_25b.children();
for(var name in _25d){
if(_82.call(_25d,name)){
_258.push(_25d[name]);
}
}
}
}
_257();
};
_259(0);
};
var _25e="@STATIC",_25f="p",_260="u",_261="c",_262="t",_263="I",_264="i";
function _221(_265,_266,_267){
var _268=new _11d(_266);
if(_268.magicNumber()!==_25e){
throw new Error("Could not read static file: "+_267);
}
if(_268.version()!=="1.0"){
throw new Error("Could not read static file: "+_267);
}
var _269,_26a=_265.bundleURL(),file=NULL;
while(_269=_268.getMarker()){
var text=_268.getString();
if(_269===_25f){
var _26b=new CFURL(text,_26a),_26c=_1cb.resourceAtURL(new CFURL(".",_26b),YES);
file=new _1cb(_26b,_26c,NO,YES);
}else{
if(_269===_260){
var URL=new CFURL(text,_26a),_26d=_268.getString();
if(_26d.indexOf("mhtml:")===0){
_26d="mhtml:"+new CFURL(_26d.substr("mhtml:".length),_26a);
if(_226===_229){
var _26e=_26d.indexOf("!"),_26f=_26d.substring(0,_26e),_270=_26d.substring(_26e);
_26d=_26f+"?"+_1dd+_270;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_26d));
var _26c=_1cb.resourceAtURL(new CFURL(".",URL),YES);
new _1cb(URL,_26c,NO,YES);
}else{
if(_269===_262){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_271,_272){
this._eventDispatcher.addEventListener(_271,_272);
};
CFBundle.prototype.removeEventListener=function(_273,_274){
this._eventDispatcher.removeEventListener(_273,_274);
};
CFBundle.prototype.onerror=function(_275){
throw _275.error;
};
CFBundle.prototype.bundlePath=function(){
return this.bundleURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_276,_277,_278,_279){
return this.resourceURL(_276,_277,_278,_279).absoluteString();
};
CFBundleCopyLocalizedString=function(_27a,key,_27b,_27c){
return CFCopyLocalizedStringWithDefaultValue(key,_27c,_27a,_27b,"");
};
CFBundleCopyBundleLocalizations=function(_27d){
return [this._loadedLanguage];
};
CFCopyLocalizedString=function(key,_27e){
return CFCopyLocalizedStringFromTable(key,"Localizable",_27e);
};
CFCopyLocalizedStringFromTable=function(key,_27f,_280){
return CFCopyLocalizedStringFromTableInBundle(key,_27f,CFBundleGetMainBundle(),_280);
};
CFCopyLocalizedStringFromTableInBundle=function(key,_281,_282,_283){
return CFCopyLocalizedStringWithDefaultValue(key,_281,_282,null,_283);
};
CFCopyLocalizedStringWithDefaultValue=function(key,_284,_285,_286,_287){
var _288;
if(!_284){
_284="Localizable";
}
_284+=".strings";
var _289=_285._localizableStrings[_284];
_288=_289?_289[key+_287]:null;
return _288||(_286||key);
};
CFBundleGetMainBundle=function(){
return CFBundle.mainBundle();
};
var _28a={};
function _1cb(aURL,_28b,_28c,_28d,_28e){
this._parent=_28b;
this._eventDispatcher=new _7d(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_28d;
this._filenameTranslateDictionary=_28e;
if(_28c){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_28b){
_28a[name]=this;
}
this._isDirectory=!!_28c;
this._isNotFound=NO;
if(_28b){
_28b._children[name]=this;
}
if(_28c){
this._children={};
}else{
this._contents="";
}
};
_1cb.rootResources=function(){
return _28a;
};
function _28f(x){
var _290=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_290;
}
}
return _290;
};
_1cb.resetRootResources=function(){
_28a={};
};
_1cb.prototype.filenameTranslateDictionary=function(){
return this._filenameTranslateDictionary||{};
};
_2.StaticResource=_1cb;
function _20a(_291){
_291._isResolved=YES;
_291._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_291});
};
_1cb.prototype.resolve=function(){
if(this.isDirectory()){
var _292=new CFBundle(this.URL());
_292.onerror=function(){
};
_292.load(NO);
}else{
var self=this;
function _293(_294){
self._contents=_294.request.responseText();
_20a(self);
};
function _295(){
self._isNotFound=YES;
_20a(self);
};
var url=this.URL(),_296=this.filenameTranslateDictionary();
if(_296){
var _297=url.toString(),_298=url.lastPathComponent(),_299=_297.substring(0,_297.length-_298.length),_29a=_296[_298];
if(_29a&&_297.slice(-_29a.length)!==_29a){
url=new CFURL(_299+_29a);
}
}
new _be(url,_293,_295);
}
};
_1cb.prototype.name=function(){
return this._name;
};
_1cb.prototype.URL=function(){
return this._URL;
};
_1cb.prototype.contents=function(){
return this._contents;
};
_1cb.prototype.children=function(){
return this._children;
};
_1cb.prototype.parent=function(){
return this._parent;
};
_1cb.prototype.isResolved=function(){
return this._isResolved;
};
_1cb.prototype.write=function(_29b){
this._contents+=_29b;
};
function _29c(_29d){
var _29e=_29d.schemeAndAuthority(),_29f=_28a[_29e];
if(!_29f){
_29f=new _1cb(new CFURL(_29e),NULL,YES,YES);
}
return _29f;
};
_1cb.resourceAtURL=function(aURL,_2a0){
aURL=_1e2(aURL).absoluteURL();
var _2a1=_29c(aURL),_2a2=aURL.pathComponents(),_9d=0,_2a3=_2a2.length;
for(;_9d<_2a3;++_9d){
var name=_2a2[_9d];
if(_82.call(_2a1._children,name)){
_2a1=_2a1._children[name];
}else{
if(_2a0){
if(name!=="/"){
name="./"+name;
}
_2a1=new _1cb(new CFURL(name,_2a1.URL()),_2a1,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _2a1;
};
_1cb.prototype.resourceAtURL=function(aURL,_2a4){
return _1cb.resourceAtURL(new CFURL(aURL,this.URL()),_2a4);
};
_1cb.resolveResourceAtURL=function(aURL,_2a5,_2a6,_2a7){
aURL=_1e2(aURL).absoluteURL();
_2a8(_29c(aURL),_2a5,aURL.pathComponents(),0,_2a6,_2a7);
};
_1cb.prototype.resolveResourceAtURL=function(aURL,_2a9,_2aa){
_1cb.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_2a9,_2aa);
};
function _2a8(_2ab,_2ac,_2ad,_2ae,_2af,_2b0){
var _2b1=_2ad.length;
for(;_2ae<_2b1;++_2ae){
var name=_2ad[_2ae],_2b2=_82.call(_2ab._children,name)&&_2ab._children[name];
if(!_2b2){
_2b2=new _1cb(new CFURL(name,_2ab.URL()),_2ab,_2ae+1<_2b1||_2ac,NO,_2b0);
_2b2.resolve();
}
if(!_2b2.isResolved()){
return _2b2.addEventListener("resolve",function(){
_2a8(_2ab,_2ac,_2ad,_2ae,_2af,_2b0);
});
}
if(_2b2.isNotFound()){
return _2af(null,new Error("File not found: "+_2ad.join("/")));
}
if((_2ae+1<_2b1)&&_2b2.isFile()){
return _2af(null,new Error("File is not a directory: "+_2ad.join("/")));
}
_2ab=_2b2;
}
_2af(_2ab);
};
function _2b3(aURL,_2b4,_2b5){
var _2b6=_1cb.includeURLs(),_2b7=new CFURL(aURL,_2b6[_2b4]).absoluteURL();
_1cb.resolveResourceAtURL(_2b7,NO,function(_2b8){
if(!_2b8){
if(_2b4+1<_2b6.length){
_2b3(aURL,_2b4+1,_2b5);
}else{
_2b5(NULL);
}
return;
}
_2b5(_2b8);
});
};
_1cb.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_2b9){
_2b3(aURL,0,_2b9);
};
_1cb.prototype.addEventListener=function(_2ba,_2bb){
this._eventDispatcher.addEventListener(_2ba,_2bb);
};
_1cb.prototype.removeEventListener=function(_2bc,_2bd){
this._eventDispatcher.removeEventListener(_2bc,_2bd);
};
_1cb.prototype.isNotFound=function(){
return this._isNotFound;
};
_1cb.prototype.isFile=function(){
return !this._isDirectory;
};
_1cb.prototype.isDirectory=function(){
return this._isDirectory;
};
_1cb.prototype.toString=function(_2be){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _2bf=this.name();
if(this.isDirectory()){
var _2c0=this._children;
for(var name in _2c0){
if(_2c0.hasOwnProperty(name)){
var _2c1=_2c0[name];
if(_2be||!_2c1.isNotFound()){
_2bf+="\n\t"+_2c0[name].toString(_2be).split("\n").join("\n\t");
}
}
}
}
return _2bf;
};
var _2c2=NULL;
_1cb.includeURLs=function(){
if(_2c2!==NULL){
return _2c2;
}
_2c2=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_2c2=["Frameworks","Frameworks/Debug"];
}else{
_2c2=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _2c3=_2c2.length;
while(_2c3--){
_2c2[_2c3]=new CFURL(_2c2[_2c3]).asDirectoryPathURL();
}
return _2c2;
};
var _2c4="accessors",_2c5="class",_2c6="end",_2c7="function",_2c8="implementation",_2c9="import",_2ca="each",_2cb="outlet",_2cc="action",_2cd="new",_2ce="selector",_2cf="super",_2d0="var",_2d1="in",_2d2="pragma",_2d3="mark",_2d4="=",_2d5="+",_2d6="-",_2d7=":",_2d8=",",_2d9=".",_2da="*",_2db=";",_2dc="<",_2dd="{",_2de="}",_2df=">",_2e0="[",_2e1="\"",_2e2="@",_2e3="#",_2e4="]",_2e5="?",_2e6="(",_2e7=")",_2e8=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_2e9=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_2ea=/^[a-zA-Z_$](\w|$)*$/;
function _2eb(_2ec){
this._index=-1;
this._tokens=(_2ec+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_2eb.prototype.push=function(){
this._context.push(this._index);
};
_2eb.prototype.pop=function(){
this._index=this._context.pop();
};
_2eb.prototype.peek=function(_2ed){
if(_2ed){
this.push();
var _2ee=this.skip_whitespace();
this.pop();
return _2ee;
}
return this._tokens[this._index+1];
};
_2eb.prototype.next=function(){
return this._tokens[++this._index];
};
_2eb.prototype.previous=function(){
return this._tokens[--this._index];
};
_2eb.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_2eb.prototype.skip_whitespace=function(_2ef){
var _2f0;
if(_2ef){
while((_2f0=this.previous())&&_2e8.test(_2f0)){
}
}else{
while((_2f0=this.next())&&_2e8.test(_2f0)){
}
}
return _2f0;
};
_2.Lexer=_2eb;
function _2f1(){
this.atoms=[];
};
_2f1.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_2f2,aURL,_2f3){
return new _2f4(_2f2,aURL,_2f3).executable();
};
_2.eval=function(_2f5){
return eval(_2.preprocess(_2f5).code());
};
var _2f4=function(_2f6,aURL,_2f7){
this._URL=new CFURL(aURL);
_2f6=_2f6.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _2f1();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _2eb(_2f6);
this._flags=_2f7;
this._classMethod=false;
this._executable=NULL;
this._classLookupTable={};
this._classVars={};
var _2f8=new objj_class();
for(var i in _2f8){
this._classVars[i]=1;
}
this.preprocess(this._tokens,this._buffer);
};
_2f4.prototype.setClassInfo=function(_2f9,_2fa,_2fb){
this._classLookupTable[_2f9]={superClassName:_2fa,ivars:_2fb};
};
_2f4.prototype.getClassInfo=function(_2fc){
return this._classLookupTable[_2fc];
};
_2f4.prototype.allIvarNamesForClassName=function(_2fd){
var _2fe={},_2ff=this.getClassInfo(_2fd);
while(_2ff){
for(var i in _2ff.ivars){
_2fe[i]=1;
}
_2ff=this.getClassInfo(_2ff.superClassName);
}
return _2fe;
};
_2.Preprocessor=_2f4;
_2f4.Flags={};
_2f4.Flags.IncludeDebugSymbols=1<<0;
_2f4.Flags.IncludeTypeSignatures=1<<1;
_2f4.prototype.executable=function(){
if(!this._executable){
this._executable=new _300(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_2f4.prototype.accessors=function(_301){
var _302=_301.skip_whitespace(),_303={};
if(_302!=_2e6){
_301.previous();
return _303;
}
while((_302=_301.skip_whitespace())!=_2e7){
var name=_302,_304=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
}
if((_302=_301.skip_whitespace())==_2d4){
_304=_301.skip_whitespace();
if(!/^\w+$/.test(_304)){
throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
}
if(name=="setter"){
if((_302=_301.next())!=_2d7){
throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
}
_304+=":";
}
_302=_301.skip_whitespace();
}
_303[name]=_304;
if(_302==_2e7){
break;
}
if(_302!=_2d8){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
}
}
return _303;
};
_2f4.prototype.brackets=function(_305,_306){
var _307=[];
while(this.preprocess(_305,NULL,NULL,NULL,_307[_307.length]=[])){
}
if(_307[0].length===1){
_306.atoms[_306.atoms.length]="[";
_306.atoms[_306.atoms.length]=_307[0][0];
_306.atoms[_306.atoms.length]="]";
}else{
var _308=new _2f1();
if(_307[0][0].atoms[0]==_2cf){
_306.atoms[_306.atoms.length]="objj_msgSendSuper(";
_306.atoms[_306.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_306.atoms[_306.atoms.length]="objj_msgSend(";
_306.atoms[_306.atoms.length]=_307[0][0];
}
_308.atoms[_308.atoms.length]=_307[0][1];
var _309=1,_30a=_307.length,_30b=new _2f1();
for(;_309<_30a;++_309){
var pair=_307[_309];
_308.atoms[_308.atoms.length]=pair[1];
_30b.atoms[_30b.atoms.length]=", "+pair[0];
}
_306.atoms[_306.atoms.length]=", \"";
_306.atoms[_306.atoms.length]=_308;
_306.atoms[_306.atoms.length]="\"";
_306.atoms[_306.atoms.length]=_30b;
_306.atoms[_306.atoms.length]=")";
}
};
_2f4.prototype.directive=function(_30c,_30d,_30e){
var _30f=_30d?_30d:new _2f1(),_310=_30c.next();
if(_310.charAt(0)==_2e1){
_30f.atoms[_30f.atoms.length]=_310;
}else{
if(_310===_2c5){
_30c.skip_whitespace();
return;
}else{
if(_310===_2c8){
this.implementation(_30c,_30f);
}else{
if(_310===_2c9){
this._import(_30c);
}else{
if(_310===_2ce){
this.selector(_30c,_30f);
}
}
}
}
}
if(!_30d){
return _30f;
}
};
_2f4.prototype.hash=function(_311,_312){
var _313=_312?_312:new _2f1(),_314=_311.next();
if(_314===_2d2){
_314=_311.skip_whitespace();
if(_314===_2d3){
while((_314=_311.next()).indexOf("\n")<0){
}
}
}else{
throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \""+_314+"\"."));
}
};
_2f4.prototype.implementation=function(_315,_316){
var _317=_316,_318="",_319=NO,_31a=_315.skip_whitespace(),_31b="Nil",_31c=new _2f1(),_31d=new _2f1();
if(!(/^\w/).test(_31a)){
throw new Error(this.error_message("*** Expected class name, found \""+_31a+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_31a+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_31a+"\").super_class";
this._currentClass=_31a;
this._currentSelector="";
if((_318=_315.skip_whitespace())==_2e6){
_318=_315.skip_whitespace();
if(_318==_2e7){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_31a+"\"."));
}
if(_315.skip_whitespace()!=_2e7){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_31a+"\"."));
}
_317.atoms[_317.atoms.length]="{\nvar the_class = objj_getClass(\""+_31a+"\")\n";
_317.atoms[_317.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_31a+"\\\"\");\n";
_317.atoms[_317.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_318==_2d7){
_318=_315.skip_whitespace();
if(!_2ea.test(_318)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_318+"\"."));
}
_31b=_318;
_318=_315.skip_whitespace();
}
_317.atoms[_317.atoms.length]="{var the_class = objj_allocateClassPair("+_31b+", \""+_31a+"\"),\nmeta_class = the_class.isa;";
if(_318==_2dd){
var _31e={},_31f=0,_320=[],_321,_322={},_323=[];
while((_318=_315.skip_whitespace())&&_318!=_2de){
if(_318===_2e2){
_318=_315.next();
if(_318===_2c4){
_321=this.accessors(_315);
}else{
if(_318!==_2cb){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_318+"')."));
}else{
_323.push("@"+_318);
}
}
}else{
if(_318==_2db){
if(_31f++===0){
_317.atoms[_317.atoms.length]="class_addIvars(the_class, [";
}else{
_317.atoms[_317.atoms.length]=", ";
}
var name=_320[_320.length-1];
if(this._flags&_2f4.Flags.IncludeTypeSignatures){
_317.atoms[_317.atoms.length]="new objj_ivar(\""+name+"\", \""+_323.slice(0,_323.length-1).join(" ")+"\")";
}else{
_317.atoms[_317.atoms.length]="new objj_ivar(\""+name+"\")";
}
_31e[name]=1;
_320=[];
_323=[];
if(_321){
_322[name]=_321;
_321=NULL;
}
}else{
_320.push(_318);
_323.push(_318);
}
}
}
if(_320.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_31f){
_317.atoms[_317.atoms.length]="]);\n";
}
if(!_318){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
this.setClassInfo(_31a,_31b==="Nil"?null:_31b,_31e);
var _31e=this.allIvarNamesForClassName(_31a);
for(ivar_name in _322){
var _324=_322[ivar_name],_325=_324["property"]||ivar_name;
var _326=_324["getter"]||_325,_327="(id)"+_326+"\n{\nreturn "+ivar_name+";\n}";
if(_31c.atoms.length!==0){
_31c.atoms[_31c.atoms.length]=",\n";
}
_31c.atoms[_31c.atoms.length]=this.method(new _2eb(_327),_31e);
if(_324["readonly"]){
continue;
}
var _328=_324["setter"];
if(!_328){
var _329=_325.charAt(0)=="_"?1:0;
_328=(_329?"_":"")+"set"+_325.substr(_329,1).toUpperCase()+_325.substring(_329+1)+":";
}
var _32a="(void)"+_328+"(id)newValue\n{\n";
if(_324["copy"]){
_32a+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_32a+=ivar_name+" = newValue;\n}";
}
if(_31c.atoms.length!==0){
_31c.atoms[_31c.atoms.length]=",\n";
}
_31c.atoms[_31c.atoms.length]=this.method(new _2eb(_32a),_31e);
}
}else{
_315.previous();
}
_317.atoms[_317.atoms.length]="objj_registerClassPair(the_class);\n";
}
if(!_31e){
var _31e=this.allIvarNamesForClassName(_31a);
}
while((_318=_315.skip_whitespace())){
if(_318==_2d5){
this._classMethod=true;
if(_31d.atoms.length!==0){
_31d.atoms[_31d.atoms.length]=", ";
}
_31d.atoms[_31d.atoms.length]=this.method(_315,this._classVars);
}else{
if(_318==_2d6){
this._classMethod=false;
if(_31c.atoms.length!==0){
_31c.atoms[_31c.atoms.length]=", ";
}
_31c.atoms[_31c.atoms.length]=this.method(_315,_31e);
}else{
if(_318==_2e3){
this.hash(_315,_317);
}else{
if(_318==_2e2){
if((_318=_315.next())==_2c6){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_318+"\"."));
}
}
}
}
}
}
if(_31c.atoms.length!==0){
_317.atoms[_317.atoms.length]="class_addMethods(the_class, [";
_317.atoms[_317.atoms.length]=_31c;
_317.atoms[_317.atoms.length]="]);\n";
}
if(_31d.atoms.length!==0){
_317.atoms[_317.atoms.length]="class_addMethods(meta_class, [";
_317.atoms[_317.atoms.length]=_31d;
_317.atoms[_317.atoms.length]="]);\n";
}
_317.atoms[_317.atoms.length]="}";
this._currentClass="";
};
_2f4.prototype._import=function(_32b){
var _32c="",_32d=_32b.skip_whitespace(),_32e=(_32d!==_2dc);
if(_32d===_2dc){
while((_32d=_32b.next())&&_32d!==_2df){
_32c+=_32d;
}
if(!_32d){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_32d.charAt(0)===_2e1){
_32c=_32d.substr(1,_32d.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_32d+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_32c;
this._buffer.atoms[this._buffer.atoms.length]=_32e?"\", YES);":"\", NO);";
this._dependencies.push(new _32f(new CFURL(_32c),_32e));
};
_2f4.prototype.method=function(_330,_331){
var _332=new _2f1(),_333,_334="",_335=[],_336=[null];
_331=_331||{};
while((_333=_330.skip_whitespace())&&_333!==_2dd&&_333!==_2db){
if(_333==_2d7){
var type="";
_334+=_333;
_333=_330.skip_whitespace();
if(_333==_2e6){
while((_333=_330.skip_whitespace())&&_333!=_2e7){
type+=_333;
}
_333=_330.skip_whitespace();
}
_336[_335.length+1]=type||null;
_335[_335.length]=_333;
if(_333 in _331){
CPLog.warn(this.error_message("*** Warning: Method ( "+_334+" ) uses a parameter name that is already in use ( "+_333+" )"));
}
}else{
if(_333==_2e6){
var type="";
while((_333=_330.skip_whitespace())&&_333!=_2e7){
type+=_333;
}
_336[0]=type||null;
}else{
if(_333==_2d8){
if((_333=_330.skip_whitespace())!=_2d9||_330.next()!=_2d9||_330.next()!=_2d9){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_334+=_333;
}
}
}
}
if(_333===_2db){
_333=_330.skip_whitespace();
if(_333!==_2dd){
throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+"Semi-colons are allowed only to terminate the method signature, before the open brace."));
}
}
var _337=0,_338=_335.length;
_332.atoms[_332.atoms.length]="new objj_method(sel_getUid(\"";
_332.atoms[_332.atoms.length]=_334;
_332.atoms[_332.atoms.length]="\"), function";
this._currentSelector=_334;
if(this._flags&_2f4.Flags.IncludeDebugSymbols){
_332.atoms[_332.atoms.length]=" $"+this._currentClass+"__"+_334.replace(/:/g,"_");
}
_332.atoms[_332.atoms.length]="(self, _cmd";
for(;_337<_338;++_337){
_332.atoms[_332.atoms.length]=", ";
_332.atoms[_332.atoms.length]=_335[_337];
}
_332.atoms[_332.atoms.length]=")\n{ with(self)\n{";
_332.atoms[_332.atoms.length]=this.preprocess(_330,NULL,_2de,_2dd);
_332.atoms[_332.atoms.length]="}\n}";
if(this._flags&_2f4.Flags.IncludeDebugSymbols){
_332.atoms[_332.atoms.length]=","+JSON.stringify(_336);
}
_332.atoms[_332.atoms.length]=")";
this._currentSelector="";
return _332;
};
_2f4.prototype.preprocess=function(_339,_33a,_33b,_33c,_33d){
var _33e=_33a?_33a:new _2f1(),_33f=0,_340="";
if(_33d){
_33d[0]=_33e;
var _341=false,_342=[0,0,0];
}
while((_340=_339.next())&&((_340!==_33b)||_33f)){
if(_33d){
if(_340===_2e5){
++_342[2];
}else{
if(_340===_2dd){
++_342[0];
}else{
if(_340===_2de){
--_342[0];
}else{
if(_340===_2e6){
++_342[1];
}else{
if(_340===_2e7){
--_342[1];
}else{
if((_340===_2d7&&_342[2]--===0||(_341=(_340===_2e4)))&&_342[0]===0&&_342[1]===0){
_339.push();
var _343=_341?_339.skip_whitespace(true):_339.previous(),_344=_2e8.test(_343);
if(_344||_2ea.test(_343)&&_2e8.test(_339.previous())){
_339.push();
var last=_339.skip_whitespace(true),_345=true,_346=false;
if(last==="+"||last==="-"){
if(_339.previous()!==last){
_345=false;
}else{
last=_339.skip_whitespace(true);
_346=true;
}
}
_339.pop();
_339.pop();
if(_345&&((!_346&&(last===_2de))||last===_2e7||last===_2e4||last===_2d9||_2e9.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_2ea.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_344){
_33d[1]=":";
}else{
_33d[1]=_343;
if(!_341){
_33d[1]+=":";
}
var _33f=_33e.atoms.length;
while(_33e.atoms[_33f--]!==_343){
}
_33e.atoms.length=_33f;
}
return !_341;
}
if(_341){
return NO;
}
}
_339.pop();
if(_341){
return NO;
}
}
}
}
}
}
}
_342[2]=MAX(_342[2],0);
}
if(_33c){
if(_340===_33c){
++_33f;
}else{
if(_340===_33b){
--_33f;
}
}
}
if(_340===_2c7){
var _347="";
while((_340=_339.next())&&_340!==_2e6&&!(/^\w/).test(_340)){
_347+=_340;
}
if(_340===_2e6){
if(_33c===_2e6){
++_33f;
}
_33e.atoms[_33e.atoms.length]="function"+_347+"(";
if(_33d){
++_342[1];
}
}else{
_33e.atoms[_33e.atoms.length]=_340+" = function";
}
}else{
if(_340==_2e2){
this.directive(_339,_33e);
}else{
if(_340==_2e3){
this.hash(_339,_33e);
}else{
if(_340==_2e0){
this.brackets(_339,_33e);
}else{
_33e.atoms[_33e.atoms.length]=_340;
}
}
}
}
}
if(_33d){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_33a){
return _33e;
}
};
_2f4.prototype.selector=function(_348,_349){
var _34a=_349?_349:new _2f1();
_34a.atoms[_34a.atoms.length]="sel_getUid(\"";
if(_348.skip_whitespace()!=_2e6){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _34b=_348.skip_whitespace();
if(_34b==_2e7){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_349.atoms[_349.atoms.length]=_34b;
var _34c,_34d=true;
while((_34c=_348.next())&&_34c!=_2e7){
if(_34d&&/^\d+$/.test(_34c)||!(/^(\w|$|\:)/.test(_34c))){
if(!(/\S/).test(_34c)){
if(_348.skip_whitespace()==_2e7){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_34c+"' in @selector()."));
}
}
_34a.atoms[_34a.atoms.length]=_34c;
_34d=(_34c==_2d7);
}
_34a.atoms[_34a.atoms.length]="\")";
if(!_349){
return _34a;
}
};
_2f4.prototype.error_message=function(_34e){
return _34e+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
if(typeof _2!="undefined"&&!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_34f){
"use strict";
_34f.version="0.1.01";
var _350,_351,_352,_353;
_34f.parse=function(inpt,opts){
_351=String(inpt);
_352=_351.length;
_354(opts);
_355();
return _356(_350.program);
};
var _357=_34f.defaultOptions={ecmaVersion:5,strictSemicolons:false,allowTrailingCommas:true,forbidReserved:false,trackComments:false,trackSpaces:false,locations:false,ranges:false,program:null,sourceFile:null,objj:true,preprocess:true,preprocessAddMacro:_358,preprocessGetMacro:_359,preprocessUndefineMacro:_35a,preprocessIsMacro:_35b};
function _354(opts){
_350=opts||{};
for(var opt in _357){
if(!_350.hasOwnProperty(opt)){
_350[opt]=_357[opt];
}
}
_353=_350.sourceFile||null;
};
var _35c;
var _35d;
function _358(_35e){
_35c[_35e.identifier]=_35e;
_35d=null;
};
function _359(_35f){
return _35c[_35f];
};
function _35a(_360){
delete _35c[_360];
_35d=null;
};
function _35b(_361){
var x=Object.keys(_35c).join(" ");
return (_35d||(_35d=_362(x)))(_361);
};
var _363=_34f.getLineInfo=function(_364,_365){
for(var line=1,cur=0;;){
_366.lastIndex=cur;
var _367=_366.exec(_364);
if(_367&&_367.index<_365){
++line;
cur=_367.index+_367[0].length;
}else{
break;
}
}
return {line:line,column:_365-cur,lineStart:cur,lineEnd:(_367?_367.index+_367[0].length:_364.length)};
};
_34f.tokenize=function(inpt,opts){
_351=String(inpt);
_352=_351.length;
_354(opts);
_355();
var t={};
function _368(_369){
_418(_369);
t.start=_371;
t.end=_372;
t.startLoc=_373;
t.endLoc=_374;
t.type=_375;
t.value=_376;
return t;
};
_368.jumpTo=function(pos,_36a){
_36b=pos;
if(_350.locations){
_36c=_36d=_366.lastIndex=0;
var _36e;
while((_36e=_366.exec(_351))&&_36e.index<pos){
++_36c;
_36d=_36e.index+_36e[0].length;
}
}
var ch=_351.charAt(pos-1);
_36f=_36a;
_370();
};
return _368;
};
var _36b;
var _371,_372;
var _373,_374;
var _375,_376;
var _377,_378,_379;
var _37a,_37b,_37c;
var _36f,_37d,_37e;
var _36c,_36d,_37f;
var _380,_381;
var _382,_383,_384;
var _385;
var _386;
var _387,_388,_389;
var _38a,_38b,_38c,_38d,_38e;
var _38f,_390;
var _391=[];
var _392=false;
function _393(pos,_394){
if(typeof pos=="number"){
pos=_363(_351,pos);
}
var _395=new SyntaxError(_394);
_395.line=pos.line;
_395.column=pos.column;
_395.lineStart=pos.lineStart;
_395.lineEnd=pos.lineEnd;
_395.fileName=_353;
throw _395;
};
var _396={type:"num"},_397={type:"regexp"},_398={type:"string"};
var _399={type:"name"},_39a={type:"eof"},_39b={type:"eol"};
var _39c={keyword:"break"},_39d={keyword:"case",beforeExpr:true},_39e={keyword:"catch"};
var _39f={keyword:"continue"},_3a0={keyword:"debugger"},_3a1={keyword:"default"};
var _3a2={keyword:"do",isLoop:true},_3a3={keyword:"else",beforeExpr:true};
var _3a4={keyword:"finally"},_3a5={keyword:"for",isLoop:true},_3a6={keyword:"function"};
var _3a7={keyword:"if"},_3a8={keyword:"return",beforeExpr:true},_3a9={keyword:"switch"};
var _3aa={keyword:"throw",beforeExpr:true},_3ab={keyword:"try"},_3ac={keyword:"var"};
var _3ad={keyword:"while",isLoop:true},_3ae={keyword:"with"},_3af={keyword:"new",beforeExpr:true};
var _3b0={keyword:"this"};
var _3b1={keyword:"void",prefix:true,beforeExpr:true};
var _3b2={keyword:"null",atomValue:null},_3b3={keyword:"true",atomValue:true};
var _3b4={keyword:"false",atomValue:false};
var _3b5={keyword:"in",binop:7,beforeExpr:true};
var _3b6={keyword:"implementation"},_3b7={keyword:"outlet"},_3b8={keyword:"accessors"};
var _3b9={keyword:"end"},_3ba={keyword:"import",afterImport:true};
var _3bb={keyword:"action"},_3bc={keyword:"selector"},_3bd={keyword:"class"},_3be={keyword:"global"};
var _3bf={keyword:"{"},_3c0={keyword:"["};
var _3c1={keyword:"ref"},_3c2={keyword:"deref"};
var _3c3={keyword:"protocol"},_3c4={keyword:"optional"},_3c5={keyword:"required"};
var _3c6={keyword:"interface"};
var _3c7={keyword:"typedef"};
var _3c8={keyword:"filename"},_3c9={keyword:"unsigned",okAsIdent:true},_3ca={keyword:"signed",okAsIdent:true};
var _3cb={keyword:"byte",okAsIdent:true},_3cc={keyword:"char",okAsIdent:true},_3cd={keyword:"short",okAsIdent:true};
var _3ce={keyword:"int",okAsIdent:true},_3cf={keyword:"long",okAsIdent:true},_3d0={keyword:"id",okAsIdent:true};
var _3d1={keyword:"BOOL",okAsIdent:true},_3d2={keyword:"SEL",okAsIdent:true},_3d3={keyword:"float",okAsIdent:true};
var _3d4={keyword:"double",okAsIdent:true};
var _3d5={keyword:"#"};
var _3d6={keyword:"define"};
var _3d7={keyword:"undef"};
var _3d8={keyword:"ifdef"};
var _3d9={keyword:"ifndef"};
var _3da={keyword:"if"};
var _3db={keyword:"else"};
var _3dc={keyword:"endif"};
var _3dd={keyword:"elif"};
var _3de={keyword:"pragma"};
var _3df={keyword:"defined"};
var _3e0={keyword:"\\"};
var _3e1={type:"preprocessParamItem"};
var _3e2={"break":_39c,"case":_39d,"catch":_39e,"continue":_39f,"debugger":_3a0,"default":_3a1,"do":_3a2,"else":_3a3,"finally":_3a4,"for":_3a5,"function":_3a6,"if":_3a7,"return":_3a8,"switch":_3a9,"throw":_3aa,"try":_3ab,"var":_3ac,"while":_3ad,"with":_3ae,"null":_3b2,"true":_3b3,"false":_3b4,"new":_3af,"in":_3b5,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:true},"this":_3b0,"typeof":{keyword:"typeof",prefix:true,beforeExpr:true},"void":_3b1,"delete":{keyword:"delete",prefix:true,beforeExpr:true}};
var _3e3={"IBAction":_3bb,"IBOutlet":_3b7,"unsigned":_3c9,"signed":_3ca,"byte":_3cb,"char":_3cc,"short":_3cd,"int":_3ce,"long":_3cf,"id":_3d0,"float":_3d3,"BOOL":_3d1,"SEL":_3d2,"double":_3d4};
var _3e4={"implementation":_3b6,"outlet":_3b7,"accessors":_3b8,"end":_3b9,"import":_3ba,"action":_3bb,"selector":_3bc,"class":_3bd,"global":_3be,"ref":_3c1,"deref":_3c2,"protocol":_3c3,"optional":_3c4,"required":_3c5,"interface":_3c6,"typedef":_3c7};
var _3e5={"define":_3d6,"pragma":_3de,"ifdef":_3d8,"ifndef":_3d9,"undef":_3d7,"if":_3da,"endif":_3dc,"else":_3db,"elif":_3dd,"defined":_3df};
var _3e6={type:"[",beforeExpr:true},_3e7={type:"]"},_3e8={type:"{",beforeExpr:true};
var _3e9={type:"}"},_3ea={type:"(",beforeExpr:true},_3eb={type:")"};
var _3ec={type:",",beforeExpr:true},_3ed={type:";",beforeExpr:true};
var _3ee={type:":",beforeExpr:true},_3ef={type:"."},_3f0={type:"?",beforeExpr:true};
var _3f1={type:"@"},_3f2={type:"..."},_3f3={type:"#"};
var _3f4={binop:10,beforeExpr:true,preprocess:true},_3f5={isAssign:true,beforeExpr:true,preprocess:true};
var _3f6={isAssign:true,beforeExpr:true},_3f7={binop:9,prefix:true,beforeExpr:true,preprocess:true};
var _3f8={postfix:true,prefix:true,isUpdate:true},_3f9={prefix:true,beforeExpr:true};
var _3fa={binop:1,beforeExpr:true,preprocess:true},_3fb={binop:2,beforeExpr:true,preprocess:true};
var _3fc={binop:3,beforeExpr:true,preprocess:true},_3fd={binop:4,beforeExpr:true,preprocess:true};
var _3fe={binop:5,beforeExpr:true,preprocess:true},_3ff={binop:6,beforeExpr:true,preprocess:true};
var _400={binop:7,beforeExpr:true,preprocess:true},_401={binop:8,beforeExpr:true,preprocess:true};
var _402={binop:10,beforeExpr:true,preprocess:true};
_34f.tokTypes={bracketL:_3e6,bracketR:_3e7,braceL:_3e8,braceR:_3e9,parenL:_3ea,parenR:_3eb,comma:_3ec,semi:_3ed,colon:_3ee,dot:_3ef,question:_3f0,slash:_3f4,eq:_3f5,name:_399,eof:_39a,num:_396,regexp:_397,string:_398};
for(var kw in _3e2){
_34f.tokTypes[kw]=_3e2[kw];
}
function _362(_403){
_403=_403.split(" ");
var f="",cats=[];
out:
for(var i=0;i<_403.length;++i){
for(var j=0;j<cats.length;++j){
if(cats[j][0].length==_403[i].length){
cats[j].push(_403[i]);
continue out;
}
}
cats.push([_403[i]]);
}
function _404(arr){
if(arr.length==1){
return f+="return str === "+JSON.stringify(arr[0])+";";
}
f+="switch(str){";
for(var i=0;i<arr.length;++i){
f+="case "+JSON.stringify(arr[i])+":";
}
f+="return true}return false;";
};
if(cats.length>3){
cats.sort(function(a,b){
return b.length-a.length;
});
f+="switch(str.length){";
for(var i=0;i<cats.length;++i){
var cat=cats[i];
f+="case "+cat[0].length+":";
_404(cat);
}
f+="}";
}else{
_404(_403);
}
return new Function("str",f);
};
_34f.makePredicate=_362;
var _405=_362("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");
var _406=_362("class enum extends super const export import");
var _407=_362("implements interface let package private protected public static yield");
var _408=_362("eval arguments");
var _409=_362("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this");
var _40a=_362("IBAction IBOutlet byte char short int long float unsigned signed id BOOL SEL double");
var _40b=_362("define pragma if ifdef ifndef else elif endif defined");
var _40c=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/;
var _40d=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]/;
var _40e="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
var _40f="ͱ-ʹ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";
var _410=new RegExp("["+_40e+"]");
var _411=new RegExp("["+_40e+_40f+"]");
var _412=/[\n\r\u2028\u2029]/;
var _366=/\r\n|[\n\r\u2028\u2029]/g;
function _413(code){
if(code<65){
return code===36;
}
if(code<91){
return true;
}
if(code<97){
return code===95;
}
if(code<123){
return true;
}
return code>=170&&_410.test(String.fromCharCode(code));
};
function _414(code){
if(code<48){
return code===36;
}
if(code<58){
return true;
}
if(code<65){
return false;
}
if(code<91){
return true;
}
if(code<97){
return code===95;
}
if(code<123){
return true;
}
return code>=170&&_411.test(String.fromCharCode(code));
};
function _415(){
this.line=_36c;
this.column=_36b-_36d;
};
function _355(){
_35c=Object.create(null);
_36c=1;
_36b=_36d=0;
_36f=true;
_37d=null;
_37e=null;
_370();
};
var _416=[_3da,_3d8,_3d9,_3db,_3dd,_3dc];
function _417(type,val){
if(type in _416){
return _418();
}
_372=_36b;
if(_350.locations){
_374=new _415;
}
_375=type;
_370();
if(_350.preprocess&&_351.charCodeAt(_36b)===35&&_351.charCodeAt(_36b+1)===35){
var val1=type===_399?val:type.keyword;
_36b+=2;
if(val1){
_370();
_418();
var val2=_375===_399?_376:_375.keyword;
if(val2){
var _419=""+val1+val2,code=_419.charCodeAt(0),tok;
if(_413(code)){
tok=_41a(_419)!==false;
}
if(tok){
return tok;
}
tok=_41b(code,_417);
if(tok===false){
_41c();
}
return tok;
}else{
}
}
}
_376=val;
_379=_378;
_37c=_37b;
_378=_37d;
_37b=_37e;
_36f=type.beforeExpr;
_385=type.afterImport;
};
function _41d(){
var _41e=_350.onComment&&_350.locations&&new _415;
var _41f=_36b,end=_351.indexOf("*/",_36b+=2);
if(end===-1){
_393(_36b-2,"Unterminated comment");
}
_36b=end+2;
if(_350.locations){
_366.lastIndex=_41f;
var _420;
while((_420=_366.exec(_351))&&_420.index<_36b){
++_36c;
_36d=_420.index+_420[0].length;
}
}
if(_350.onComment){
_350.onComment(true,_351.slice(_41f+2,end),_41f,_36b,_41e,_350.locations&&new _415);
}
if(_350.trackComments){
(_37d||(_37d=[])).push(_351.slice(_41f,end));
}
};
function _421(){
var _422=_36b;
var _423=_350.onComment&&_350.locations&&new _415;
var ch=_351.charCodeAt(_36b+=2);
while(_36b<_352&&ch!==10&&ch!==13&&ch!==8232&&ch!==8329){
++_36b;
ch=_351.charCodeAt(_36b);
}
if(_350.onComment){
_350.onComment(false,_351.slice(_422+2,_36b),_422,_36b,_423,_350.locations&&new _415);
}
if(_350.trackComments){
(_37d||(_37d=[])).push(_351.slice(_422,_36b));
}
};
function _424(){
var ch=_351.charCodeAt(_36b);
var last;
while(_36b<_352&&((ch!==10&&ch!==13&&ch!==8232&&ch!==8329)||last===92)){
if(ch!=32&&ch!=9&&ch!=160&&(ch<5760||!_40d.test(String.fromCharCode(ch)))){
last=ch;
}
ch=_351.charCodeAt(++_36b);
}
};
function _370(){
_37d=null;
_37e=null;
var _425=_36b;
for(;;){
var ch=_351.charCodeAt(_36b);
if(ch===32){
++_36b;
}else{
if(ch===13){
++_36b;
var next=_351.charCodeAt(_36b);
if(next===10){
++_36b;
}
if(_350.locations){
++_36c;
_36d=_36b;
}
}else{
if(ch===10){
++_36b;
++_36c;
_36d=_36b;
}else{
if(ch<14&&ch>8){
++_36b;
}else{
if(ch===47){
var next=_351.charCodeAt(_36b+1);
if(next===42){
if(_350.trackSpaces){
(_37e||(_37e=[])).push(_351.slice(_425,_36b));
}
_41d();
_425=_36b;
}else{
if(next===47){
if(_350.trackSpaces){
(_37e||(_37e=[])).push(_351.slice(_425,_36b));
}
_421();
_425=_36b;
}else{
break;
}
}
}else{
if(ch===160){
++_36b;
}else{
if(ch>=5760&&_40c.test(String.fromCharCode(ch))){
++_36b;
}else{
if(_36b>=_352){
if(_350.preprocess&&_391.length){
var _426=_391.pop();
_36b=_426.end;
_351=_426.input;
_352=_426.inputLen;
_383=_426.lastEnd;
_382=_426.lastStart;
}else{
break;
}
}else{
break;
}
}
}
}
}
}
}
}
}
};
function _427(code,_428){
var next=_351.charCodeAt(_36b+1);
if(next>=48&&next<=57){
return _429(String.fromCharCode(code),_428);
}
if(next===46&&_350.objj&&_351.charCodeAt(_36b+2)===46){
_36b+=3;
return _428(_3f2);
}
++_36b;
return _428(_3ef);
};
function _42a(_42b){
var next=_351.charCodeAt(_36b+1);
if(_36f){
++_36b;
return _42c();
}
if(next===61){
return _42d(_3f6,2,_42b);
}
return _42d(_3f4,1,_42b);
};
function _42e(_42f){
var next=_351.charCodeAt(_36b+1);
if(next===61){
return _42d(_3f6,2,_42f);
}
return _42d(_402,1,_42f);
};
function _430(code,_431){
var next=_351.charCodeAt(_36b+1);
if(next===code){
return _42d(code===124?_3fa:_3fb,2,_431);
}
if(next===61){
return _42d(_3f6,2,_431);
}
return _42d(code===124?_3fc:_3fe,1,_431);
};
function _432(_433){
var next=_351.charCodeAt(_36b+1);
if(next===61){
return _42d(_3f6,2,_433);
}
return _42d(_3fd,1,_433);
};
function _434(code,_435){
var next=_351.charCodeAt(_36b+1);
if(next===code){
return _42d(_3f8,2,_435);
}
if(next===61){
return _42d(_3f6,2,_435);
}
return _42d(_3f7,1,_435);
};
function _436(code,_437){
if(_385&&_350.objj&&code===60){
var str=[];
for(;;){
if(_36b>=_352){
_393(_371,"Unterminated import statement");
}
var ch=_351.charCodeAt(++_36b);
if(ch===62){
++_36b;
return _437(_3c8,String.fromCharCode.apply(null,str));
}
str.push(ch);
}
}
var next=_351.charCodeAt(_36b+1);
var size=1;
if(next===code){
size=code===62&&_351.charCodeAt(_36b+2)===62?3:2;
if(_351.charCodeAt(_36b+size)===61){
return _42d(_3f6,size+1,_437);
}
return _42d(_401,size,_437);
}
if(next===61){
size=_351.charCodeAt(_36b+2)===61?3:2;
}
return _42d(_400,size,_437);
};
function _438(code,_439){
var next=_351.charCodeAt(_36b+1);
if(next===61){
return _42d(_3ff,_351.charCodeAt(_36b+2)===61?3:2,_439);
}
return _42d(code===61?_3f5:_3f9,1,_439);
};
function _43a(code,_43b){
var next=_351.charCodeAt(++_36b);
if(next===34||next===39){
return _43c(next,_43b);
}
if(next===123){
return _43b(_3bf);
}
if(next===91){
return _43b(_3c0);
}
var word=_43d(),_43e=_3e4[word];
if(!_43e){
_393(_36b,"Unrecognized Objective-J keyword '@"+word+"'");
}
return _43b(_43e);
};
var _43f=true;
var _440=0;
function _441(_442){
++_36b;
_443();
switch(_38b){
case _3d6:
_443();
var _444=_38e;
var _445=_446();
if(_351.charCodeAt(_444)===40){
_447(_3ea);
var _448=[];
var _449=true;
while(!_44a(_3eb)){
if(!_449){
_447(_3ec,"Expected ',' between macro parameters");
}else{
_449=false;
}
_448.push(_446());
}
}
var _44b=_36b=_38d;
_424();
var _44c=_351.slice(_44b,_36b);
_44c=_44c.replace(/\\/g," ");
_350.preprocessAddMacro(new _44d(_445,_44c,_448));
break;
case _3d7:
_443();
_350.preprocessUndefineMacro(_446());
_424();
break;
case _3da:
if(_43f){
_440++;
_443();
var expr=_44e();
var test=_44f(expr);
if(!test){
_43f=false;
}
_450(!test);
}else{
return _442(_3da);
}
break;
case _3d8:
if(_43f){
_440++;
_443();
var _451=_446();
var test=_350.preprocessGetMacro(_451);
if(!test){
_43f=false;
}
_450(!test);
}else{
return _442(_3d8);
}
break;
case _3d9:
if(_43f){
_440++;
_443();
var _451=_446();
var test=_350.preprocessGetMacro(_451);
if(test){
_43f=false;
}
_450(test);
}else{
return _442(_3d9);
}
break;
case _3db:
if(_440){
if(_43f){
_43f=false;
_442(_3db);
_443();
_450(true,true);
}else{
return _442(_3db);
}
}else{
_393(_38d,"#else without #if");
}
break;
case _3dc:
if(_440){
if(_43f){
_440--;
break;
}
}else{
_393(_38d,"#endif without #if");
}
return _442(_3dc);
break;
case _3de:
_424();
break;
case _3f9:
_424();
break;
default:
_393(_38d,"Invalid preprocessing directive");
_424();
return _442(_3d5);
}
_417(_3d5);
return _418();
};
function _44f(expr){
return _34f.walk.recursive(expr,{},{BinaryExpression:function(node,st,c){
var left=node.left,_452=node.right;
switch(node.operator){
case "+":
return c(left,st)+c(_452,st);
case "-":
return c(left,st)-c(_452,st);
case "*":
return c(left,st)*c(_452,st);
case "/":
return c(left,st)/c(_452,st);
case "%":
return c(left,st)%c(_452,st);
case "<":
return c(left,st)<c(_452,st);
case ">":
return c(left,st)>c(_452,st);
case "=":
case "==":
case "===":
return c(left,st)===c(_452,st);
case "<=":
return c(left,st)<=c(_452,st);
case ">=":
return c(left,st)>=c(_452,st);
case "&&":
return c(left,st)&&c(_452,st);
case "||":
return c(left,st)||c(_452,st);
}
},Literal:function(node,st,c){
return node.value;
},Identifier:function(node,st,c){
var name=node.name,_453=_350.preprocessGetMacro(name);
return (_453&&parseInt(_453.macro))||0;
},DefinedExpression:function(node,st,c){
return !!_350.preprocessGetMacro(node.id.name);
}},{});
};
function _41b(code,_454,_455){
switch(code){
case 46:
return _427(code,_454);
case 40:
++_36b;
return _454(_3ea);
case 41:
++_36b;
return _454(_3eb);
case 59:
++_36b;
return _454(_3ed);
case 44:
++_36b;
return _454(_3ec);
case 91:
++_36b;
return _454(_3e6);
case 93:
++_36b;
return _454(_3e7);
case 123:
++_36b;
return _454(_3e8);
case 125:
++_36b;
return _454(_3e9);
case 58:
++_36b;
return _454(_3ee);
case 63:
++_36b;
return _454(_3f0);
case 48:
var next=_351.charCodeAt(_36b+1);
if(next===120||next===88){
return _456(_454);
}
case 49:
case 50:
case 51:
case 52:
case 53:
case 54:
case 55:
case 56:
case 57:
return _429(false,_454);
case 34:
case 39:
return _43c(code,_454);
case 47:
return _42a(_454);
case 37:
case 42:
return _42e(_454);
case 124:
case 38:
return _430(code,_454);
case 94:
return _432(_454);
case 43:
case 45:
return _434(code,_454);
case 60:
case 62:
return _436(code,_454,_454);
case 61:
case 33:
return _438(code,_454);
case 126:
return _42d(_3f9,1,_454);
case 64:
if(_350.objj){
return _43a(code,_454);
}
return false;
case 35:
if(_350.preprocess){
return _441(_454);
}
return false;
case 92:
if(_350.preprocess){
return _42d(_3e0,1,_454);
}
return false;
}
if(_455&&_412.test(String.fromCharCode(code))){
return _42d(_39b,1,_454);
}
return false;
};
function _457(){
while(_36b<_352){
var ch=_351.charCodeAt(_36b);
if(ch===32||ch===9||ch===160||(ch>=5760&&_40d.test(String.fromCharCode(ch)))){
++_36b;
}else{
if(ch===92){
var pos=_36b+1;
ch=_351.charCodeAt(pos);
while(pos<_352&&(ch===32||ch===9||ch===11||ch===12||(ch>=5760&&_40d.test(String.fromCharCode(ch))))){
ch=_351.charCodeAt(++pos);
}
_366.lastIndex=0;
var _458=_366.exec(_351.slice(pos,pos+2));
if(_458&&_458.index===0){
_36b=pos+_458[0].length;
}else{
return false;
}
}else{
_366.lastIndex=0;
var _458=_366.exec(_351.slice(_36b,_36b+2));
return _458&&_458.index===0;
}
}
}
};
function _450(test,_459){
if(test){
var _45a=0;
while(_45a>0||(_38b!=_3dc&&(_38b!=_3db||_459))){
switch(_38b){
case _3da:
case _3d8:
case _3d9:
_45a++;
break;
case _3dc:
_45a--;
break;
case _39a:
_43f=true;
_393(_38d,"Missing #endif");
}
_443();
}
_43f=true;
if(_38b===_3dc){
_440--;
}
}
};
function _443(){
_38d=_36b;
_381=_351;
if(_36b>=_352){
return _39a;
}
var code=_351.charCodeAt(_36b);
if(_392&&code!==41&&code!==44){
var _45b=0;
while(_36b<_352&&(_45b||(code!==41&&code!==44))){
if(code===40){
_45b++;
}
if(code===41){
_45b--;
}
code=_351.charCodeAt(++_36b);
}
return _45c(_3e1,_351.slice(_38d,_36b));
}
if(_413(code)||(code===92&&_351.charCodeAt(_36b+1)===117)){
return _45d();
}
if(_41b(code,_45c,true)===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_410.test(ch)){
return _45d();
}
_393(_36b,"Unexpected character '"+ch+"'");
}
};
function _45d(){
var word=_43d();
_45c(_40b(word)?_3e5[word]:_399,word);
};
function _45c(type,val){
_38b=type;
_38c=val;
_38e=_36b;
_457();
};
function _45e(){
_38f=_371;
_390=_372;
return _443();
};
function _44a(type){
if(_38b===type){
_45e();
return true;
}
};
function _447(type,_45f){
if(_38b===type){
_443();
}else{
_393(_38d,_45f||"Unexpected token");
}
};
function _446(){
var _460=_38b===_399?_38c:((!_350.forbidReserved||_38b.okAsIdent)&&_38b.keyword)||_393(_38d,"Expected Macro identifier");
_45e();
return _460;
};
function _461(){
var node=_462();
node.name=_446();
return _463(node,"Identifier");
};
function _44e(){
return _464();
};
function _464(){
return _465(_466(),-1);
};
function _465(left,_467){
var prec=_38b.binop;
if(prec){
if(!_38b.preprocess){
_393(_38d,"Unsupported macro operator");
}
if(prec>_467){
var node=_468(left);
node.left=left;
node.operator=_38c;
_45e();
node.right=_465(_466(),prec);
var node=_463(node,"BinaryExpression");
return _465(node,_467);
}
}
return left;
};
function _466(){
if(_38b.preprocess&&_38b.prefix){
var node=_462();
node.operator=_376;
node.prefix=true;
_45e();
node.argument=_466();
return _463(node,"UnaryExpression");
}
return _469();
};
function _469(){
switch(_38b){
case _399:
return _461();
case _396:
case _398:
return _46a();
case _3ea:
var _46b=_38d;
_45e();
var val=_44e();
val.start=_46b;
val.end=_38e;
_447(_3eb,"Expected closing ')' in macro expression");
return val;
case _3df:
var node=_462();
_45e();
node.id=_461();
return _463(node,"DefinedExpression");
default:
_41c();
}
};
function _46a(){
var node=_462();
node.value=_38c;
node.raw=_381.slice(_38d,_38e);
_45e();
return _463(node,"Literal");
};
function _463(node,type){
node.type=type;
node.end=_390;
return node;
};
function _418(_46c){
_371=_36b;
_380=_351;
if(_350.locations){
_373=new _415;
}
_377=_37d;
_37a=_37e;
if(_46c){
return _42c();
}
if(_36b>=_352){
return _417(_39a);
}
var code=_351.charCodeAt(_36b);
if(_413(code)||code===92){
return _41a();
}
var tok=_41b(code,_417);
if(tok===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_410.test(ch)){
return _41a();
}
_393(_36b,"Unexpected character '"+ch+"'");
}
return tok;
};
function _42d(type,size,_46d){
var str=_351.slice(_36b,_36b+size);
_36b+=size;
_46d(type,str);
};
function _42c(){
var _46e="",_46f,_470,_471=_36b;
for(;;){
if(_36b>=_352){
_393(_471,"Unterminated regular expression");
}
var ch=_351.charAt(_36b);
if(_412.test(ch)){
_393(_471,"Unterminated regular expression");
}
if(!_46f){
if(ch==="["){
_470=true;
}else{
if(ch==="]"&&_470){
_470=false;
}else{
if(ch==="/"&&!_470){
break;
}
}
}
_46f=ch==="\\";
}else{
_46f=false;
}
++_36b;
}
var _46e=_351.slice(_471,_36b);
++_36b;
var mods=_43d();
if(mods&&!/^[gmsiy]*$/.test(mods)){
_393(_471,"Invalid regexp flag");
}
return _417(_397,new RegExp(_46e,mods));
};
function _472(_473,len){
var _474=_36b,_475=0;
for(var i=0,e=len==null?Infinity:len;i<e;++i){
var code=_351.charCodeAt(_36b),val;
if(code>=97){
val=code-97+10;
}else{
if(code>=65){
val=code-65+10;
}else{
if(code>=48&&code<=57){
val=code-48;
}else{
val=Infinity;
}
}
}
if(val>=_473){
break;
}
++_36b;
_475=_475*_473+val;
}
if(_36b===_474||len!=null&&_36b-_474!==len){
return null;
}
return _475;
};
function _456(_476){
_36b+=2;
var val=_472(16);
if(val==null){
_393(_371+2,"Expected hexadecimal number");
}
if(_413(_351.charCodeAt(_36b))){
_393(_36b,"Identifier directly after number");
}
return _476(_396,val);
};
function _429(_477,_478){
var _479=_36b,_47a=false,_47b=_351.charCodeAt(_36b)===48;
if(!_477&&_472(10)===null){
_393(_479,"Invalid number");
}
if(_351.charCodeAt(_36b)===46){
++_36b;
_472(10);
_47a=true;
}
var next=_351.charCodeAt(_36b);
if(next===69||next===101){
next=_351.charCodeAt(++_36b);
if(next===43||next===45){
++_36b;
}
if(_472(10)===null){
_393(_479,"Invalid number");
}
_47a=true;
}
if(_413(_351.charCodeAt(_36b))){
_393(_36b,"Identifier directly after number");
}
var str=_351.slice(_479,_36b),val;
if(_47a){
val=parseFloat(str);
}else{
if(!_47b||str.length===1){
val=parseInt(str,10);
}else{
if(/[89]/.test(str)||_389){
_393(_479,"Invalid number");
}else{
val=parseInt(str,8);
}
}
}
return _478(_396,val);
};
var _47c=[];
function _43c(_47d,_47e){
_36b++;
_47c.length=0;
for(;;){
if(_36b>=_352){
_393(_371,"Unterminated string constant");
}
var ch=_351.charCodeAt(_36b);
if(ch===_47d){
++_36b;
return _47e(_398,String.fromCharCode.apply(null,_47c));
}
if(ch===92){
ch=_351.charCodeAt(++_36b);
var _47f=/^[0-7]+/.exec(_351.slice(_36b,_36b+3));
if(_47f){
_47f=_47f[0];
}
while(_47f&&parseInt(_47f,8)>255){
_47f=_47f.slice(0,_47f.length-1);
}
if(_47f==="0"){
_47f=null;
}
++_36b;
if(_47f){
if(_389){
_393(_36b-2,"Octal literal in strict mode");
}
_47c.push(parseInt(_47f,8));
_36b+=_47f.length-1;
}else{
switch(ch){
case 110:
_47c.push(10);
break;
case 114:
_47c.push(13);
break;
case 120:
_47c.push(_480(2));
break;
case 117:
_47c.push(_480(4));
break;
case 85:
_47c.push(_480(8));
break;
case 116:
_47c.push(9);
break;
case 98:
_47c.push(8);
break;
case 118:
_47c.push(11);
break;
case 102:
_47c.push(12);
break;
case 48:
_47c.push(0);
break;
case 13:
if(_351.charCodeAt(_36b)===10){
++_36b;
}
case 10:
if(_350.locations){
_36d=_36b;
++_36c;
}
break;
default:
_47c.push(ch);
break;
}
}
}else{
if(ch===13||ch===10||ch===8232||ch===8329){
_393(_371,"Unterminated string constant");
}
_47c.push(ch);
++_36b;
}
}
};
function _480(len){
var n=_472(16,len);
if(n===null){
_393(_371,"Bad character escape sequence");
}
return n;
};
var _481;
function _43d(){
_481=false;
var word,_482=true,_483=_36b;
for(;;){
var ch=_351.charCodeAt(_36b);
if(_414(ch)){
if(_481){
word+=_351.charAt(_36b);
}
++_36b;
}else{
if(ch===92){
if(!_481){
word=_351.slice(_483,_36b);
}
_481=true;
if(_351.charCodeAt(++_36b)!=117){
_393(_36b,"Expecting Unicode escape sequence \\uXXXX");
}
++_36b;
var esc=_480(4);
var _484=String.fromCharCode(esc);
if(!_484){
_393(_36b-1,"Invalid Unicode escape");
}
if(!(_482?_413(esc):_414(esc))){
_393(_36b-4,"Invalid Unicode escape");
}
word+=_484;
}else{
break;
}
}
_482=false;
}
return _481?word:_351.slice(_483,_36b);
};
function _41a(_485){
var word=_485||_43d();
var type=_399;
var _486;
if(_350.preprocess){
var _487;
var i=_391.length;
if(i>0){
var _488=_391[i-1];
if(_488.parameterDict&&_488.macro.isParameterFunction()(word)){
_487=_488.parameterDict[word];
}
}
if(!_487&&_350.preprocessIsMacro(word)){
_487=_350.preprocessGetMacro(word);
}
if(_487){
var _489=_371;
var _48a;
var _48b=_487.parameters;
var _48c;
if(_48b){
_48c=_36b<_352&&_351.charCodeAt(_36b)===40;
}
if(!_48b||_48c){
var _48d=_487.macro;
var _48e=_36b;
if(_48c){
var _48f=true;
var _490=0;
_48a=Object.create(null);
_443();
_392=true;
_447(_3ea);
_48e=_36b;
while(!_44a(_3eb)){
if(!_48f){
_447(_3ec,"Expected ',' between macro parameters");
}else{
_48f=false;
}
var _491=_48b[_490++];
var val=_38c;
_447(_3e1);
_48a[_491]=new _44d(_491,val);
_48e=_36b;
}
_392=false;
}
if(_48d){
_391.push({macro:_487,parameterDict:_48a,start:_489,end:_48e,input:_351,inputLen:_352,lastStart:_371,lastEnd:_48e});
_351=_48d;
_352=_48d.length;
_36b=0;
}
return next();
}
}
}
if(!_481){
if(_409(word)){
type=_3e2[word];
}else{
if(_350.objj&&_40a(word)){
type=_3e3[word];
}else{
if(_350.forbidReserved&&(_350.ecmaVersion===3?_405:_406)(word)||_389&&_407(word)){
_393(_371,"The keyword '"+word+"' is reserved");
}
}
}
}
return _417(type,word);
};
function _44d(_492,_493,_494){
this.identifier=_492;
if(_493){
this.macro=_493;
}
if(_494){
this.parameters=_494;
}
};
_44d.prototype.isParameterFunction=function(){
var y=(this.parameters||[]).join(" ");
return this.isParameterFunctionVar||(this.isParameterFunctionVar=_362(y));
};
function next(){
_382=_371;
_383=_372;
_384=_374;
_386=null;
return _418();
};
function _495(_496){
_389=_496;
_36b=_383;
_370();
_418();
};
function _497(){
this.type=null;
this.start=_371;
this.end=null;
};
function _498(){
this.start=_373;
this.end=null;
if(_353!==null){
this.source=_353;
}
};
function _462(){
var node=new _497();
if(_350.trackComments&&_377){
node.commentsBefore=_377;
_377=null;
}
if(_350.trackSpaces&&_37a){
node.spacesBefore=_37a;
_37a=null;
}
if(_350.locations){
node.loc=new _498();
}
if(_350.ranges){
node.range=[_371,0];
}
return node;
};
function _468(_499){
var node=new _497();
node.start=_499.start;
if(_499.commentsBefore){
node.commentsBefore=_499.commentsBefore;
delete _499.commentsBefore;
}
if(_499.spacesBefore){
node.spacesBefore=_499.spacesBefore;
delete _499.spacesBefore;
}
if(_350.locations){
node.loc=new _498();
node.loc.start=_499.loc.start;
}
if(_350.ranges){
node.range=[_499.range[0],0];
}
return node;
};
var _49a;
function _49b(node,type){
node.type=type;
node.end=_383;
if(_350.trackComments){
if(_379){
node.commentsAfter=_379;
_378=null;
}else{
if(_49a&&_49a.end===_383&&_49a.commentsAfter){
node.commentsAfter=_49a.commentsAfter;
delete _49a.commentsAfter;
}
}
if(!_350.trackSpaces){
_49a=node;
}
}
if(_350.trackSpaces){
if(_37c){
node.spacesAfter=_37c;
_37c=null;
}else{
if(_49a&&_49a.end===_383&&_49a.spacesAfter){
node.spacesAfter=_49a.spacesAfter;
delete _49a.spacesAfter;
}
}
_49a=node;
}
if(_350.locations){
node.loc.end=_384;
}
if(_350.ranges){
node.range[1]=_383;
}
return node;
};
function _49c(stmt){
return _350.ecmaVersion>=5&&stmt.type==="ExpressionStatement"&&stmt.expression.type==="Literal"&&stmt.expression.value==="use strict";
};
function eat(type){
if(_375===type){
next();
return true;
}
};
function _49d(){
return !_350.strictSemicolons&&(_375===_39a||_375===_3e9||_412.test(_380.slice(_383,_371))||(_386&&_350.objj));
};
function _49e(){
if(!eat(_3ed)&&!_49d()){
_393(_371,"Expected a semicolon");
}
};
function _49f(type,_4a0){
if(_375===type){
next();
}else{
_4a0?_393(_371,_4a0):_41c();
}
};
function _41c(){
_393(_371,"Unexpected token");
};
function _4a1(expr){
if(expr.type!=="Identifier"&&expr.type!=="MemberExpression"&&expr.type!=="Dereference"){
_393(expr.start,"Assigning to rvalue");
}
if(_389&&expr.type==="Identifier"&&_408(expr.name)){
_393(expr.start,"Assigning to "+expr.name+" in strict mode");
}
};
function _356(_4a2){
_382=_383=_36b;
if(_350.locations){
_384=new _415;
}
_387=_389=null;
_388=[];
_418();
var node=_4a2||_462(),_4a3=true;
if(!_4a2){
node.body=[];
}
while(_375!==_39a){
var stmt=_4a4();
node.body.push(stmt);
if(_4a3&&_49c(stmt)){
_495(true);
}
_4a3=false;
}
return _49b(node,"Program");
};
var _4a5={kind:"loop"},_4a6={kind:"switch"};
function _4a4(){
if(_375===_3f4){
_418(true);
}
var _4a7=_375,node=_462();
if(_386){
node.expression=_4a8(_386,_386.object);
_49e();
return _49b(node,"ExpressionStatement");
}
switch(_4a7){
case _39c:
case _39f:
next();
var _4a9=_4a7===_39c;
if(eat(_3ed)||_49d()){
node.label=null;
}else{
if(_375!==_399){
_41c();
}else{
node.label=_4aa();
_49e();
}
}
for(var i=0;i<_388.length;++i){
var lab=_388[i];
if(node.label==null||lab.name===node.label.name){
if(lab.kind!=null&&(_4a9||lab.kind==="loop")){
break;
}
if(node.label&&_4a9){
break;
}
}
}
if(i===_388.length){
_393(node.start,"Unsyntactic "+_4a7.keyword);
}
return _49b(node,_4a9?"BreakStatement":"ContinueStatement");
case _3a0:
next();
_49e();
return _49b(node,"DebuggerStatement");
case _3a2:
next();
_388.push(_4a5);
node.body=_4a4();
_388.pop();
_49f(_3ad,"Expected 'while' at end of do statement");
node.test=_4ab();
_49e();
return _49b(node,"DoWhileStatement");
case _3a5:
next();
_388.push(_4a5);
_49f(_3ea,"Expected '(' after 'for'");
if(_375===_3ed){
return _4ac(node,null);
}
if(_375===_3ac){
var init=_462();
next();
_4ad(init,true);
if(init.declarations.length===1&&eat(_3b5)){
return _4ae(node,init);
}
return _4ac(node,init);
}
var init=_4af(false,true);
if(eat(_3b5)){
_4a1(init);
return _4ae(node,init);
}
return _4ac(node,init);
case _3a6:
next();
return _4b0(node,true);
case _3a7:
next();
node.test=_4ab();
node.consequent=_4a4();
node.alternate=eat(_3a3)?_4a4():null;
return _49b(node,"IfStatement");
case _3a8:
if(!_387){
_393(_371,"'return' outside of function");
}
next();
if(eat(_3ed)||_49d()){
node.argument=null;
}else{
node.argument=_4af();
_49e();
}
return _49b(node,"ReturnStatement");
case _3a9:
next();
node.discriminant=_4ab();
node.cases=[];
_49f(_3e8,"Expected '{' in switch statement");
_388.push(_4a6);
for(var cur,_4b1;_375!=_3e9;){
if(_375===_39d||_375===_3a1){
var _4b2=_375===_39d;
if(cur){
_49b(cur,"SwitchCase");
}
node.cases.push(cur=_462());
cur.consequent=[];
next();
if(_4b2){
cur.test=_4af();
}else{
if(_4b1){
_393(_382,"Multiple default clauses");
}
_4b1=true;
cur.test=null;
}
_49f(_3ee,"Expected ':' after case clause");
}else{
if(!cur){
_41c();
}
cur.consequent.push(_4a4());
}
}
if(cur){
_49b(cur,"SwitchCase");
}
next();
_388.pop();
return _49b(node,"SwitchStatement");
case _3aa:
next();
if(_412.test(_380.slice(_383,_371))){
_393(_383,"Illegal newline after throw");
}
node.argument=_4af();
_49e();
return _49b(node,"ThrowStatement");
case _3ab:
next();
node.block=_4b3();
node.handlers=[];
while(_375===_39e){
var _4b4=_462();
next();
_49f(_3ea,"Expected '(' after 'catch'");
_4b4.param=_4aa();
if(_389&&_408(_4b4.param.name)){
_393(_4b4.param.start,"Binding "+_4b4.param.name+" in strict mode");
}
_49f(_3eb,"Expected closing ')' after catch");
_4b4.guard=null;
_4b4.body=_4b3();
node.handlers.push(_49b(_4b4,"CatchClause"));
}
node.finalizer=eat(_3a4)?_4b3():null;
if(!node.handlers.length&&!node.finalizer){
_393(node.start,"Missing catch or finally clause");
}
return _49b(node,"TryStatement");
case _3ac:
next();
node=_4ad(node);
_49e();
return node;
case _3ad:
next();
node.test=_4ab();
_388.push(_4a5);
node.body=_4a4();
_388.pop();
return _49b(node,"WhileStatement");
case _3ae:
if(_389){
_393(_371,"'with' in strict mode");
}
next();
node.object=_4ab();
node.body=_4a4();
return _49b(node,"WithStatement");
case _3e8:
return _4b3();
case _3ed:
next();
return _49b(node,"EmptyStatement");
case _3c6:
if(_350.objj){
next();
node.classname=_4aa(true);
if(eat(_3ee)){
node.superclassname=_4aa(true);
}else{
if(eat(_3ea)){
node.categoryname=_4aa(true);
_49f(_3eb,"Expected closing ')' after category name");
}
}
if(_376==="<"){
next();
var _4b5=[],_4b6=true;
node.protocols=_4b5;
while(_376!==">"){
if(!_4b6){
_49f(_3ec,"Expected ',' between protocol names");
}else{
_4b6=false;
}
_4b5.push(_4aa(true));
}
next();
}
if(eat(_3e8)){
node.ivardeclarations=[];
for(;;){
if(eat(_3e9)){
break;
}
_4b7(node);
}
node.endOfIvars=_371;
}
node.body=[];
while(!eat(_3b9)){
if(_375===_39a){
_393(_36b,"Expected '@end' after '@interface'");
}
node.body.push(_4b8());
}
return _49b(node,"InterfaceDeclarationStatement");
}
break;
case _3b6:
if(_350.objj){
next();
node.classname=_4aa(true);
if(eat(_3ee)){
node.superclassname=_4aa(true);
}else{
if(eat(_3ea)){
node.categoryname=_4aa(true);
_49f(_3eb,"Expected closing ')' after category name");
}
}
if(_376==="<"){
next();
var _4b5=[],_4b6=true;
node.protocols=_4b5;
while(_376!==">"){
if(!_4b6){
_49f(_3ec,"Expected ',' between protocol names");
}else{
_4b6=false;
}
_4b5.push(_4aa(true));
}
next();
}
if(_376==="<"){
next();
var _4b5=[],_4b6=true;
node.protocols=_4b5;
while(_376!==">"){
if(!_4b6){
_49f(_3ec,"Expected ',' between protocol names");
}else{
_4b6=false;
}
_4b5.push(_4aa(true));
}
next();
}
if(eat(_3e8)){
node.ivardeclarations=[];
for(;;){
if(eat(_3e9)){
break;
}
_4b7(node);
}
node.endOfIvars=_371;
}
node.body=[];
while(!eat(_3b9)){
if(_375===_39a){
_393(_36b,"Expected '@end' after '@implementation'");
}
node.body.push(_4b8());
}
return _49b(node,"ClassDeclarationStatement");
}
break;
case _3c3:
if(_350.objj&&_351.charCodeAt(_36b)!==40){
next();
node.protocolname=_4aa(true);
if(_376==="<"){
next();
var _4b5=[],_4b6=true;
node.protocols=_4b5;
while(_376!==">"){
if(!_4b6){
_49f(_3ec,"Expected ',' between protocol names");
}else{
_4b6=false;
}
_4b5.push(_4aa(true));
}
next();
}
while(!eat(_3b9)){
if(_375===_39a){
_393(_36b,"Expected '@end' after '@protocol'");
}
if(eat(_3c5)){
continue;
}
if(eat(_3c4)){
while(!eat(_3c5)&&_375!==_3b9){
(node.optional||(node.optional=[])).push(_4b9());
}
}else{
(node.required||(node.required=[])).push(_4b9());
}
}
return _49b(node,"ProtocolDeclarationStatement");
}
break;
case _3ba:
if(_350.objj){
next();
if(_375===_398){
node.localfilepath=true;
}else{
if(_375===_3c8){
node.localfilepath=false;
}else{
_41c();
}
}
node.filename=_4ba();
return _49b(node,"ImportStatement");
}
break;
case _3d5:
if(_350.objj){
next();
return _49b(node,"PreprocessStatement");
}
break;
case _3bd:
if(_350.objj){
next();
node.id=_4aa(false);
return _49b(node,"ClassStatement");
}
break;
case _3be:
if(_350.objj){
next();
node.id=_4aa(false);
return _49b(node,"GlobalStatement");
}
break;
case _3c7:
if(_350.objj){
next();
node.typedefname=_4aa(true);
return _49b(node,"TypeDefStatement");
}
break;
}
var _4bb=_376,expr=_4af();
if(_4a7===_399&&expr.type==="Identifier"&&eat(_3ee)){
for(var i=0;i<_388.length;++i){
if(_388[i].name===_4bb){
_393(expr.start,"Label '"+_4bb+"' is already declared");
}
}
var kind=_375.isLoop?"loop":_375===_3a9?"switch":null;
_388.push({name:_4bb,kind:kind});
node.body=_4a4();
_388.pop();
node.label=expr;
return _49b(node,"LabeledStatement");
}else{
node.expression=expr;
_49e();
return _49b(node,"ExpressionStatement");
}
};
function _4b7(node){
var _4bc;
if(eat(_3b7)){
_4bc=true;
}
var type=_4bd();
if(_389&&_408(type.name)){
_393(type.start,"Binding "+type.name+" in strict mode");
}
for(;;){
var decl=_462();
if(_4bc){
decl.outlet=_4bc;
}
decl.ivartype=type;
decl.id=_4aa();
if(_389&&_408(decl.id.name)){
_393(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
if(eat(_3b8)){
decl.accessors={};
if(eat(_3ea)){
if(!eat(_3eb)){
for(;;){
var _4be=_4aa(true);
switch(_4be.name){
case "property":
case "getter":
_49f(_3f5,"Expected '=' after 'getter' accessor attribute");
decl.accessors[_4be.name]=_4aa(true);
break;
case "setter":
_49f(_3f5,"Expected '=' after 'setter' accessor attribute");
var _4bf=_4aa(true);
decl.accessors[_4be.name]=_4bf;
if(eat(_3ee)){
_4bf.end=_371;
}
_4bf.name+=":";
break;
case "readwrite":
case "readonly":
case "copy":
decl.accessors[_4be.name]=true;
break;
default:
_393(_4be.start,"Unknown accessors attribute '"+_4be.name+"'");
}
if(!eat(_3ec)){
break;
}
}
_49f(_3eb,"Expected closing ')' after accessor attributes");
}
}
}
_49b(decl,"IvarDeclaration");
node.ivardeclarations.push(decl);
if(!eat(_3ec)){
break;
}
}
_49e();
};
function _4c0(node){
node.methodtype=_376;
_49f(_3f7,"Method declaration must start with '+' or '-'");
if(eat(_3ea)){
var _4c1=_462();
if(eat(_3bb)){
node.action=_49b(_4c1,"ObjectiveJActionType");
_4c1=_462();
}
if(!eat(_3eb)){
node.returntype=_4bd(_4c1);
_49f(_3eb,"Expected closing ')' after method return type");
}
}
var _4c2=true,_4c3=[],args=[];
node.selectors=_4c3;
node.arguments=args;
for(;;){
if(_375!==_3ee){
_4c3.push(_4aa(true));
if(_4c2&&_375!==_3ee){
break;
}
}else{
_4c3.push(null);
}
_49f(_3ee,"Expected ':' in selector");
var _4c4={};
args.push(_4c4);
if(eat(_3ea)){
_4c4.type=_4bd();
_49f(_3eb,"Expected closing ')' after method argument type");
}
_4c4.identifier=_4aa(false);
if(_375===_3e8||_375===_3ed){
break;
}
if(eat(_3ec)){
_49f(_3f2,"Expected '...' after ',' in method declaration");
node.parameters=true;
break;
}
_4c2=false;
}
};
function _4b8(){
var _4c5=_462();
if(_376==="+"||_376==="-"){
_4c0(_4c5);
eat(_3ed);
_4c5.startOfBody=_383;
var _4c6=_387,_4c7=_388;
_387=true;
_388=[];
_4c5.body=_4b3(true);
_387=_4c6;
_388=_4c7;
return _49b(_4c5,"MethodDeclarationStatement");
}else{
return _4a4();
}
};
function _4b9(){
var _4c8=_462();
_4c0(_4c8);
_49e();
return _49b(_4c8,"MethodDeclarationStatement");
};
function _4ab(){
_49f(_3ea,"Expected '(' before expression");
var val=_4af();
_49f(_3eb,"Expected closing ')' after expression");
return val;
};
function _4b3(_4c9){
var node=_462(),_4ca=true,_389=false,_4cb;
node.body=[];
_49f(_3e8,"Expected '{' before block");
while(!eat(_3e9)){
var stmt=_4a4();
node.body.push(stmt);
if(_4ca&&_49c(stmt)){
_4cb=_389;
_495(_389=true);
}
_4ca=false;
}
if(_389&&!_4cb){
_495(false);
}
return _49b(node,"BlockStatement");
};
function _4ac(node,init){
node.init=init;
_49f(_3ed,"Expected ';' in for statement");
node.test=_375===_3ed?null:_4af();
_49f(_3ed,"Expected ';' in for statement");
node.update=_375===_3eb?null:_4af();
_49f(_3eb,"Expected closing ')' in for statement");
node.body=_4a4();
_388.pop();
return _49b(node,"ForStatement");
};
function _4ae(node,init){
node.left=init;
node.right=_4af();
_49f(_3eb,"Expected closing ')' in for statement");
node.body=_4a4();
_388.pop();
return _49b(node,"ForInStatement");
};
function _4ad(node,noIn){
node.declarations=[];
node.kind="var";
for(;;){
var decl=_462();
decl.id=_4aa();
if(_389&&_408(decl.id.name)){
_393(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
decl.init=eat(_3f5)?_4af(true,noIn):null;
node.declarations.push(_49b(decl,"VariableDeclarator"));
if(!eat(_3ec)){
break;
}
}
return _49b(node,"VariableDeclaration");
};
function _4af(_4cc,noIn){
var expr=_4cd(noIn);
if(!_4cc&&_375===_3ec){
var node=_468(expr);
node.expressions=[expr];
while(eat(_3ec)){
node.expressions.push(_4cd(noIn));
}
return _49b(node,"SequenceExpression");
}
return expr;
};
function _4cd(noIn){
var left=_4ce(noIn);
if(_375.isAssign){
var node=_468(left);
node.operator=_376;
node.left=left;
next();
node.right=_4cd(noIn);
_4a1(left);
return _49b(node,"AssignmentExpression");
}
return left;
};
function _4ce(noIn){
var expr=_4cf(noIn);
if(eat(_3f0)){
var node=_468(expr);
node.test=expr;
node.consequent=_4af(true);
_49f(_3ee,"Expected ':' in conditional expression");
node.alternate=_4af(true,noIn);
return _49b(node,"ConditionalExpression");
}
return expr;
};
function _4cf(noIn){
return _4d0(_4d1(noIn),-1,noIn);
};
function _4d0(left,_4d2,noIn){
var prec=_375.binop;
if(prec!=null&&(!noIn||_375!==_3b5)){
if(prec>_4d2){
var node=_468(left);
node.left=left;
node.operator=_376;
next();
node.right=_4d0(_4d1(noIn),prec,noIn);
var node=_49b(node,/&&|\|\|/.test(node.operator)?"LogicalExpression":"BinaryExpression");
return _4d0(node,_4d2,noIn);
}
}
return left;
};
function _4d1(noIn){
if(_375.prefix){
var node=_462(),_4d3=_375.isUpdate;
node.operator=_376;
node.prefix=true;
next();
node.argument=_4d1(noIn);
if(_4d3){
_4a1(node.argument);
}else{
if(_389&&node.operator==="delete"&&node.argument.type==="Identifier"){
_393(node.start,"Deleting local variable in strict mode");
}
}
return _49b(node,_4d3?"UpdateExpression":"UnaryExpression");
}
var expr=_4d4();
while(_375.postfix&&!_49d()){
var node=_468(expr);
node.operator=_376;
node.prefix=false;
node.argument=expr;
_4a1(expr);
next();
expr=_49b(node,"UpdateExpression");
}
return expr;
};
function _4d4(){
return _4d5(_4d6());
};
function _4d5(base,_4d7){
if(eat(_3ef)){
var node=_468(base);
node.object=base;
node.property=_4aa(true);
node.computed=false;
return _4d5(_49b(node,"MemberExpression"),_4d7);
}else{
if(_350.objj){
var _4d8=_462();
}
if(eat(_3e6)){
var expr=_4af();
if(_350.objj&&_375!==_3e7){
_4d8.object=expr;
_386=_4d8;
return base;
}
var node=_468(base);
node.object=base;
node.property=expr;
node.computed=true;
_49f(_3e7,"Expected closing ']' in subscript");
return _4d5(_49b(node,"MemberExpression"),_4d7);
}else{
if(!_4d7&&eat(_3ea)){
var node=_468(base);
node.callee=base;
node.arguments=_4d9(_3eb,_375===_3eb?null:_4af(true),false);
return _4d5(_49b(node,"CallExpression"),_4d7);
}
}
}
return base;
};
function _4d6(){
switch(_375){
case _3b0:
var node=_462();
next();
return _49b(node,"ThisExpression");
case _399:
return _4aa();
case _396:
case _398:
case _397:
return _4ba();
case _3b2:
case _3b3:
case _3b4:
var node=_462();
node.value=_375.atomValue;
node.raw=_375.keyword;
next();
return _49b(node,"Literal");
case _3ea:
var _4da=_373,_4db=_371;
next();
var val=_4af();
val.start=_4db;
val.end=_372;
if(_350.locations){
val.loc.start=_4da;
val.loc.end=_374;
}
if(_350.ranges){
val.range=[_4db,_372];
}
_49f(_3eb,"Expected closing ')' in expression");
return val;
case _3c0:
var node=_462(),_4dc=null;
next();
_49f(_3e6,"Expected '[' at beginning of array literal");
if(_375!==_3e7){
_4dc=_4af(true,true);
}
node.elements=_4d9(_3e7,_4dc,true,true);
return _49b(node,"ArrayLiteral");
case _3e6:
var node=_462(),_4dc=null;
next();
if(_375!==_3ec&&_375!==_3e7){
_4dc=_4af(true,true);
if(_375!==_3ec&&_375!==_3e7){
return _4a8(node,_4dc);
}
}
node.elements=_4d9(_3e7,_4dc,true,true);
return _49b(node,"ArrayExpression");
case _3bf:
var node=_462();
next();
var r=_4dd();
node.keys=r[0];
node.values=r[1];
return _49b(node,"DictionaryLiteral");
case _3e8:
return _4de();
case _3a6:
var node=_462();
next();
return _4b0(node,false);
case _3af:
return _4df();
case _3bc:
var node=_462();
next();
_49f(_3ea,"Expected '(' after '@selector'");
_4e0(node,_3eb);
_49f(_3eb,"Expected closing ')' after selector");
return _49b(node,"SelectorLiteralExpression");
case _3c3:
var node=_462();
next();
_49f(_3ea,"Expected '(' after '@protocol'");
node.id=_4aa(true);
_49f(_3eb,"Expected closing ')' after protocol name");
return _49b(node,"ProtocolLiteralExpression");
case _3c1:
var node=_462();
next();
_49f(_3ea,"Expected '(' after '@ref'");
node.element=_4aa(node,_3eb);
_49f(_3eb,"Expected closing ')' after ref");
return _49b(node,"Reference");
case _3c2:
var node=_462();
next();
_49f(_3ea,"Expected '(' after '@deref'");
node.expr=_4af(true,true);
_49f(_3eb,"Expected closing ')' after deref");
return _49b(node,"Dereference");
default:
if(_375.okAsIdent){
return _4aa();
}
_41c();
}
};
function _4a8(node,_4e1){
_4e2(node,_3e7);
if(_4e1.type==="Identifier"&&_4e1.name==="super"){
node.superObject=true;
}else{
node.object=_4e1;
}
return _49b(node,"MessageSendExpression");
};
function _4e0(node,_4e3){
var _4e4=true,_4e5=[];
for(;;){
if(_375!==_3ee){
_4e5.push(_4aa(true).name);
if(_4e4&&_375===_4e3){
break;
}
}
_49f(_3ee,"Expected ':' in selector");
_4e5.push(":");
if(_375===_4e3){
break;
}
_4e4=false;
}
node.selector=_4e5.join("");
};
function _4e2(node,_4e6){
var _4e7=true,_4e8=[],args=[],_4e9=[];
node.selectors=_4e8;
node.arguments=args;
for(;;){
if(_375!==_3ee){
_4e8.push(_4aa(true));
if(_4e7&&eat(_4e6)){
break;
}
}else{
_4e8.push(null);
}
_49f(_3ee,"Expected ':' in selector");
args.push(_4af(true,true));
if(eat(_4e6)){
break;
}
if(_375===_3ec){
node.parameters=[];
while(eat(_3ec)){
node.parameters.push(_4af(true,true));
}
eat(_4e6);
break;
}
_4e7=false;
}
};
function _4df(){
var node=_462();
next();
node.callee=_4d5(_4d6(false),true);
if(eat(_3ea)){
node.arguments=_4d9(_3eb,_375===_3eb?null:_4af(true),false);
}else{
node.arguments=[];
}
return _49b(node,"NewExpression");
};
function _4de(){
var node=_462(),_4ea=true,_4eb=false;
node.properties=[];
next();
while(!eat(_3e9)){
if(!_4ea){
_49f(_3ec,"Expected ',' in object literal");
if(_350.allowTrailingCommas&&eat(_3e9)){
break;
}
}else{
_4ea=false;
}
var prop={key:_4ec()},_4ed=false,kind;
if(eat(_3ee)){
prop.value=_4af(true);
kind=prop.kind="init";
}else{
if(_350.ecmaVersion>=5&&prop.key.type==="Identifier"&&(prop.key.name==="get"||prop.key.name==="set")){
_4ed=_4eb=true;
kind=prop.kind=prop.key.name;
prop.key=_4ec();
if(_375!==_3ea){
_41c();
}
prop.value=_4b0(_462(),false);
}else{
_41c();
}
}
if(prop.key.type==="Identifier"&&(_389||_4eb)){
for(var i=0;i<node.properties.length;++i){
var _4ee=node.properties[i];
if(_4ee.key.name===prop.key.name){
var _4ef=kind==_4ee.kind||_4ed&&_4ee.kind==="init"||kind==="init"&&(_4ee.kind==="get"||_4ee.kind==="set");
if(_4ef&&!_389&&kind==="init"&&_4ee.kind==="init"){
_4ef=false;
}
if(_4ef){
_393(prop.key.start,"Redefinition of property");
}
}
}
}
node.properties.push(prop);
}
return _49b(node,"ObjectExpression");
};
function _4ec(){
if(_375===_396||_375===_398){
return _4d6();
}
return _4aa(true);
};
function _4b0(node,_4f0){
if(_375===_399){
node.id=_4aa();
}else{
if(_4f0){
_41c();
}else{
node.id=null;
}
}
node.params=[];
var _4f1=true;
_49f(_3ea,"Expected '(' before function parameters");
while(!eat(_3eb)){
if(!_4f1){
_49f(_3ec,"Expected ',' between function parameters");
}else{
_4f1=false;
}
node.params.push(_4aa());
}
var _4f2=_387,_4f3=_388;
_387=true;
_388=[];
node.body=_4b3(true);
_387=_4f2;
_388=_4f3;
if(_389||node.body.body.length&&_49c(node.body.body[0])){
for(var i=node.id?-1:0;i<node.params.length;++i){
var id=i<0?node.id:node.params[i];
if(_407(id.name)||_408(id.name)){
_393(id.start,"Defining '"+id.name+"' in strict mode");
}
if(i>=0){
for(var j=0;j<i;++j){
if(id.name===node.params[j].name){
_393(id.start,"Argument name clash in strict mode");
}
}
}
}
}
return _49b(node,_4f0?"FunctionDeclaration":"FunctionExpression");
};
function _4d9(_4f4,_4f5,_4f6,_4f7){
if(_4f5&&eat(_4f4)){
return [_4f5];
}
var elts=[],_4f8=true;
while(!eat(_4f4)){
if(_4f8){
_4f8=false;
if(_4f7&&_375===_3ec&&!_4f5){
elts.push(null);
}else{
elts.push(_4f5);
}
}else{
_49f(_3ec,"Expected ',' between expressions");
if(_4f6&&_350.allowTrailingCommas&&eat(_4f4)){
break;
}
if(_4f7&&_375===_3ec){
elts.push(null);
}else{
elts.push(_4af(true));
}
}
}
return elts;
};
function _4dd(){
_49f(_3e8,"Expected '{' before dictionary");
var keys=[],_4f9=[],_4fa=true;
while(!eat(_3e9)){
if(!_4fa){
_49f(_3ec,"Expected ',' between expressions");
if(_350.allowTrailingCommas&&eat(_3e9)){
break;
}
}
keys.push(_4af(true,true));
_49f(_3ee,"Expected ':' between dictionary key and value");
_4f9.push(_4af(true,true));
_4fa=false;
}
return [keys,_4f9];
};
function _4aa(_4fb){
var node=_462();
node.name=_375===_399?_376:(((_4fb&&!_350.forbidReserved)||_375.okAsIdent)&&_375.keyword)||_41c();
next();
return _49b(node,"Identifier");
};
function _4ba(){
var node=_462();
node.value=_376;
node.raw=_380.slice(_371,_372);
next();
return _49b(node,"Literal");
};
function _4bd(_4fc){
var node=_4fc?_468(_4fc):_462();
if(_375===_399){
node.name=_376;
node.typeisclass=true;
next();
}else{
node.typeisclass=false;
node.name=_375.keyword;
if(!eat(_3b1)){
if(eat(_3d0)){
if(_376==="<"){
var _4fd=true,_4fe=[];
node.protocols=_4fe;
do{
next();
if(_4fd){
_4fd=false;
}else{
eat(_3ec);
}
_4fe.push(_4aa(true));
}while(_376!==">");
next();
}
}else{
var _4ff;
if(eat(_3d3)||eat(_3d1)||eat(_3d2)||eat(_3d4)){
_4ff=_375.keyword;
}else{
if(eat(_3ca)||eat(_3c9)){
_4ff=_375.keyword||true;
}
if(eat(_3cc)||eat(_3cb)||eat(_3cd)){
if(_4ff){
node.name+=" "+_4ff;
}
_4ff=_375.keyword||true;
}else{
if(eat(_3ce)){
if(_4ff){
node.name+=" "+_4ff;
}
_4ff=_375.keyword||true;
}
if(eat(_3cf)){
if(_4ff){
node.name+=" "+_4ff;
}
_4ff=_375.keyword||true;
if(eat(_3cf)){
node.name+=" "+_4ff;
}
}
}
if(!_4ff){
node.name=(!_350.forbidReserved&&_375.keyword)||_41c();
node.typeisclass=true;
next();
}
}
}
}
}
return _49b(node,"ObjectiveJType");
};
})(typeof _2==="undefined"?(self.acorn={}):_2.acorn);
if(!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_500){
"use strict";
_500.simple=function(node,_501,base,_502){
if(!base){
base=_500;
}
function c(node,st,_503){
var type=_503||node.type,_504=_501[type];
if(_504){
_504(node,st);
}
base[type](node,st,c);
};
c(node,_502);
};
_500.recursive=function(node,_505,_506,base){
var _507=_500.make(_506,base);
function c(node,st,_508){
return _507[_508||node.type](node,st,c);
};
return c(node,_505);
};
_500.make=function(_509,base){
if(!base){
base=_500;
}
var _50a={};
for(var type in base){
_50a[type]=base[type];
}
for(var type in _509){
_50a[type]=_509[type];
}
return _50a;
};
function _50b(node,st,c){
c(node,st);
};
function _50c(node,st,c){
};
_500.Program=_500.BlockStatement=function(node,st,c){
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_500.Statement=_50b;
_500.EmptyStatement=_50c;
_500.ExpressionStatement=function(node,st,c){
c(node.expression,st,"Expression");
};
_500.IfStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Statement");
if(node.alternate){
c(node.alternate,st,"Statement");
}
};
_500.LabeledStatement=function(node,st,c){
c(node.body,st,"Statement");
};
_500.BreakStatement=_500.ContinueStatement=_50c;
_500.WithStatement=function(node,st,c){
c(node.object,st,"Expression");
c(node.body,st,"Statement");
};
_500.SwitchStatement=function(node,st,c){
c(node.discriminant,st,"Expression");
for(var i=0;i<node.cases.length;++i){
var cs=node.cases[i];
if(cs.test){
c(cs.test,st,"Expression");
}
for(var j=0;j<cs.consequent.length;++j){
c(cs.consequent[j],st,"Statement");
}
}
};
_500.ReturnStatement=function(node,st,c){
if(node.argument){
c(node.argument,st,"Expression");
}
};
_500.ThrowStatement=function(node,st,c){
c(node.argument,st,"Expression");
};
_500.TryStatement=function(node,st,c){
c(node.block,st,"Statement");
for(var i=0;i<node.handlers.length;++i){
c(node.handlers[i].body,st,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,st,"Statement");
}
};
_500.WhileStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.body,st,"Statement");
};
_500.DoWhileStatement=function(node,st,c){
c(node.body,st,"Statement");
c(node.test,st,"Expression");
};
_500.ForStatement=function(node,st,c){
if(node.init){
c(node.init,st,"ForInit");
}
if(node.test){
c(node.test,st,"Expression");
}
if(node.update){
c(node.update,st,"Expression");
}
c(node.body,st,"Statement");
};
_500.ForInStatement=function(node,st,c){
c(node.left,st,"ForInit");
c(node.right,st,"Expression");
c(node.body,st,"Statement");
};
_500.ForInit=function(node,st,c){
if(node.type=="VariableDeclaration"){
c(node,st);
}else{
c(node,st,"Expression");
}
};
_500.DebuggerStatement=_50c;
_500.FunctionDeclaration=function(node,st,c){
c(node,st,"Function");
};
_500.VariableDeclaration=function(node,st,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
if(decl.init){
c(decl.init,st,"Expression");
}
}
};
_500.Function=function(node,st,c){
c(node.body,st,"ScopeBody");
};
_500.ScopeBody=function(node,st,c){
c(node,st,"Statement");
};
_500.Expression=_50b;
_500.ThisExpression=_50c;
_500.ArrayExpression=_500.ArrayLiteral=function(node,st,c){
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(elt){
c(elt,st,"Expression");
}
}
};
_500.DictionaryLiteral=function(node,st,c){
for(var i=0;i<node.keys.length;i++){
var key=node.keys[i];
c(key,st,"Expression");
var _50d=node.values[i];
c(_50d,st,"Expression");
}
};
_500.ObjectExpression=function(node,st,c){
for(var i=0;i<node.properties.length;++i){
c(node.properties[i].value,st,"Expression");
}
};
_500.FunctionExpression=_500.FunctionDeclaration;
_500.SequenceExpression=function(node,st,c){
for(var i=0;i<node.expressions.length;++i){
c(node.expressions[i],st,"Expression");
}
};
_500.UnaryExpression=_500.UpdateExpression=function(node,st,c){
c(node.argument,st,"Expression");
};
_500.BinaryExpression=_500.AssignmentExpression=_500.LogicalExpression=function(node,st,c){
c(node.left,st,"Expression");
c(node.right,st,"Expression");
};
_500.ConditionalExpression=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Expression");
c(node.alternate,st,"Expression");
};
_500.NewExpression=_500.CallExpression=function(node,st,c){
c(node.callee,st,"Expression");
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
c(node.arguments[i],st,"Expression");
}
}
};
_500.MemberExpression=function(node,st,c){
c(node.object,st,"Expression");
if(node.computed){
c(node.property,st,"Expression");
}
};
_500.Identifier=_500.Literal=_50c;
_500.ClassDeclarationStatement=function(node,st,c){
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
c(node.ivardeclarations[i],st,"IvarDeclaration");
}
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_500.ImportStatement=_50c;
_500.IvarDeclaration=_50c;
_500.PreprocessStatement=_50c;
_500.ClassStatement=_50c;
_500.GlobalStatement=_50c;
_500.ProtocolDeclarationStatement=function(node,st,c){
if(node.required){
for(var i=0;i<node.required.length;++i){
c(node.required[i],st,"Statement");
}
}
if(node.optional){
for(var i=0;i<node.optional.length;++i){
c(node.optional[i],st,"Statement");
}
}
};
_500.TypeDefStatement=_50c;
_500.MethodDeclarationStatement=function(node,st,c){
var body=node.body;
if(body){
c(body,st,"Statement");
}
};
_500.MessageSendExpression=function(node,st,c){
if(!node.superObject){
c(node.object,st,"Expression");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
c(node.arguments[i],st,"Expression");
}
}
if(node.parameters){
for(var i=0;i<node.parameters.length;++i){
c(node.parameters[i],st,"Expression");
}
}
};
_500.SelectorLiteralExpression=_50c;
_500.ProtocolLiteralExpression=_50c;
_500.Reference=function(node,st,c){
c(node.element,st,"Identifier");
};
_500.Dereference=function(node,st,c){
c(node.expr,st,"Expression");
};
function _50e(prev){
return {vars:Object.create(null),prev:prev};
};
_500.scopeVisitor=_500.make({Function:function(node,_50f,c){
var _510=_50e(_50f);
for(var i=0;i<node.params.length;++i){
_510.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
var decl=node.type=="FunctionDeclaration";
(decl?_50f:_510).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
}
c(node.body,_510,"ScopeBody");
},TryStatement:function(node,_511,c){
c(node.block,_511,"Statement");
for(var i=0;i<node.handlers.length;++i){
var _512=node.handlers[i],_513=_50e(_511);
_513.vars[_512.param.name]={type:"catch clause",node:_512.param};
c(_512.body,_513,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,_511,"Statement");
}
},VariableDeclaration:function(node,_514,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
_514.vars[decl.id.name]={type:"var",node:decl.id};
if(decl.init){
c(decl.init,_514,"Expression");
}
}
}});
})(typeof _2=="undefined"?acorn.walk={}:_2.acorn.walk);
var _515=function(prev,base){
this.vars=Object.create(null);
if(base){
for(var key in base){
this[key]=base[key];
}
}
this.prev=prev;
if(prev){
this.compiler=prev.compiler;
}
};
_515.prototype.compiler=function(){
return this.compiler;
};
_515.prototype.rootScope=function(){
return this.prev?this.prev.rootScope():this;
};
_515.prototype.isRootScope=function(){
return !this.prev;
};
_515.prototype.currentClassName=function(){
return this.classDef?this.classDef.name:this.prev?this.prev.currentClassName():null;
};
_515.prototype.currentProtocolName=function(){
return this.protocolDef?this.protocolDef.name:this.prev?this.prev.currentProtocolName():null;
};
_515.prototype.getIvarForCurrentClass=function(_516){
if(this.ivars){
var ivar=this.ivars[_516];
if(ivar){
return ivar;
}
}
var prev=this.prev;
if(prev&&!this.classDef){
return prev.getIvarForCurrentClass(_516);
}
return null;
};
_515.prototype.getLvar=function(_517,_518){
if(this.vars){
var lvar=this.vars[_517];
if(lvar){
return lvar;
}
}
var prev=this.prev;
if(prev&&(!_518||!this.methodType)){
return prev.getLvar(_517,_518);
}
return null;
};
_515.prototype.currentMethodType=function(){
return this.methodType?this.methodType:this.prev?this.prev.currentMethodType():null;
};
_515.prototype.copyAddedSelfToIvarsToParent=function(){
if(this.prev&&this.addedSelfToIvars){
for(var key in this.addedSelfToIvars){
var _519=this.addedSelfToIvars[key],_51a=(this.prev.addedSelfToIvars||(this.prev.addedSelfToIvars=Object.create(null)))[key]||(this.prev.addedSelfToIvars[key]=[]);
_51a.push.apply(_51a,_519);
}
}
};
_515.prototype.addMaybeWarning=function(_51b){
var _51c=this.rootScope();
(_51c._maybeWarnings||(_51c._maybeWarnings=[])).push(_51b);
};
_515.prototype.maybeWarnings=function(){
return this.rootScope()._maybeWarnings;
};
var _51d=function(_51e,node,code){
this.message=_51f(_51e,node,code);
this.node=node;
};
_51d.prototype.checkIfWarning=function(st){
var _520=this.node.name;
return !st.getLvar(_520)&&typeof _1[_520]==="undefined"&&typeof window[_520]==="undefined"&&!st.compiler.getClassDef(_520);
};
function _2f1(){
this.atoms=[];
};
_2f1.prototype.toString=function(){
return this.atoms.join("");
};
_2f1.prototype.concat=function(_521){
this.atoms.push(_521);
};
_2f1.prototype.isEmpty=function(){
return this.atoms.length!==0;
};
var _522=function(_523,name,_524,_525,_526,_527,_528){
this.name=name;
if(_524){
this.superClass=_524;
}
if(_525){
this.ivars=_525;
}
if(_523){
this.instanceMethods=_526||Object.create(null);
this.classMethods=_527||Object.create(null);
}
if(_528){
this.protocols=_528;
}
};
_522.prototype.addInstanceMethod=function(_529){
this.instanceMethods[_529.name]=_529;
};
_522.prototype.addClassMethod=function(_52a){
this.classMethods[_52a.name]=_52a;
};
_522.prototype.listOfNotImplementedMethodsForProtocols=function(_52b){
var _52c=[],_52d=this.getInstanceMethods(),_52e=this.getClassMethods();
for(var i=0,size=_52b.length;i<size;i++){
var _52f=_52b[i],_530=_52f.requiredInstanceMethods,_531=_52f.requiredClassMethods,_532=_52f.protocols;
if(_530){
for(var _533 in _530){
var _534=_530[_533];
if(!_52d[_533]){
_52c.push({"methodDef":_534,"protocolDef":_52f});
}
}
}
if(_531){
for(var _533 in _531){
var _534=_531[_533];
if(!_52e[_533]){
_52c.push({"methodDef":_534,"protocolDef":_52f});
}
}
}
if(_532){
_52c=_52c.concat(this.listOfNotImplementedMethodsForProtocols(_532));
}
}
return _52c;
};
_522.prototype.getInstanceMethod=function(name){
var _535=this.instanceMethods;
if(_535){
var _536=_535[name];
if(_536){
return _536;
}
}
var _537=this.superClass;
if(_537){
return _537.getInstanceMethod(name);
}
return null;
};
_522.prototype.getClassMethod=function(name){
var _538=this.classMethods;
if(_538){
var _539=_538[name];
if(_539){
return _539;
}
}
var _53a=this.superClass;
if(_53a){
return _53a.getClassMethod(name);
}
return null;
};
_522.prototype.getInstanceMethods=function(){
var _53b=this.instanceMethods;
if(_53b){
var _53c=this.superClass,_53d=Object.create(null);
if(_53c){
var _53e=_53c.getInstanceMethods();
for(var _53f in _53e){
_53d[_53f]=_53e[_53f];
}
}
for(var _53f in _53b){
_53d[_53f]=_53b[_53f];
}
return _53d;
}
return [];
};
_522.prototype.getClassMethods=function(){
var _540=this.classMethods;
if(_540){
var _541=this.superClass,_542=Object.create(null);
if(_541){
var _543=_541.getClassMethods();
for(var _544 in _543){
_542[_544]=_543[_544];
}
}
for(var _544 in _540){
_542[_544]=_540[_544];
}
return _542;
}
return [];
};
var _545=function(name,_546,_547,_548){
this.name=name;
this.protocols=_546;
if(_547){
this.requiredInstanceMethods=_547;
}
if(_548){
this.requiredClassMethods=_548;
}
};
_545.prototype.addInstanceMethod=function(_549){
(this.requiredInstanceMethods||(this.requiredInstanceMethods=Object.create(null)))[_549.name]=_549;
};
_545.prototype.addClassMethod=function(_54a){
(this.requiredClassMethods||(this.requiredClassMethods=Object.create(null)))[_54a.name]=_54a;
};
_545.prototype.getInstanceMethod=function(name){
var _54b=this.requiredInstanceMethods;
if(_54b){
var _54c=_54b[name];
if(_54c){
return _54c;
}
}
var _54d=this.protocols;
for(var i=0,size=_54d.length;i<size;i++){
var _54e=_54d[i],_54c=_54e.getInstanceMethod(name);
if(_54c){
return _54c;
}
}
return null;
};
_545.prototype.getClassMethod=function(name){
var _54f=this.requiredClassMethods;
if(_54f){
var _550=_54f[name];
if(_550){
return _550;
}
}
var _551=this.protocols;
for(var i=0,size=_551.length;i<size;i++){
var _552=_551[i],_550=_552.getInstanceMethod(name);
if(_550){
return _550;
}
}
return null;
};
var _553=function(name){
this.name=name;
};
var _554=function(name,_555){
this.name=name;
this.types=_555;
};
var _556=_2.acorn.makePredicate("self _cmd undefined localStorage arguments");
var _557=_2.acorn.makePredicate("delete in instanceof new typeof void");
var _558=_2.acorn.makePredicate("LogicalExpression BinaryExpression");
var _559=_2.acorn.makePredicate("in instanceof");
var _55a=function(_55b,aURL,_55c,pass,_55d,_55e,_55f){
this.source=_55b;
this.URL=new CFURL(aURL);
this.pass=pass;
this.jsBuffer=new _2f1();
this.imBuffer=null;
this.cmBuffer=null;
this.warnings=[];
try{
this.tokens=_2.acorn.parse(_55b);
}
catch(e){
if(e.lineStart!=null){
var _560=this.prettifyMessage(e,"ERROR");
console.log(_560);
}
throw e;
}
this.dependencies=[];
this.flags=_55c&(_55a.Flags.IncludeDebugSymbols|_55a.Flags.InlineMsgSend|_55a.Flags.IncludeTypeSignatures);
this.classDefs=_55d?_55d:Object.create(null);
this.protocolDefs=_55e?_55e:Object.create(null);
this.typeDefs=_55f?_55f:Object.create(null);
this.lastPos=0;
this.generate=true;
_561(this.tokens,new _515(null,{compiler:this}),pass===2?_562:_563);
};
_55a.Flags={};
_55a.Flags.IncludeDebugSymbols=1<<0;
_55a.Flags.IncludeTypeSignatures=1<<1;
_55a.Flags.Generate=1<<2;
_55a.Flags.InlineMsgSend=1<<3;
var _564=_55a.Flags.IncludeTypeSignatures;
var _565="";
_2.ObjJAcornCompiler=_55a;
_2.ObjJAcornCompiler.compileToExecutable=function(_566,aURL,_567){
_55a.currentCompileFile=aURL;
return new _55a(_566,aURL,_567,2).executable();
};
_2.ObjJAcornCompiler.compileToIMBuffer=function(_568,aURL,_569,_56a,_56b,_56c){
return new _55a(_568,aURL,_569,2,_56a,_56b,_56c).IMBuffer();
};
_2.ObjJAcornCompiler.compileFileDependencies=function(_56d,aURL,_56e){
_55a.currentCompileFile=aURL;
return new _55a(_56d,aURL,_56e,1).executable();
};
_55a.prototype.compilePass2=function(){
var _56f=[];
_55a.currentCompileFile=this.URL;
this.pass=2;
this.jsBuffer=new _2f1();
this.warnings=[];
_561(this.tokens,new _515(null,{compiler:this}),_562);
for(var i=0;i<this.warnings.length;i++){
var _570=this.warnings[i],type="WARNING";
var _571=this.prettifyMessage(_570,type);
console.log(_571);
}
if(_56f.length&&_2.outputFormatInXML){
print(CFPropertyListCreateXMLData(_56f,kCFPropertyListXMLFormat_v1_0).rawString());
}
return this.jsBuffer.toString();
};
_2.setCurrentGccCompilerFlags=function(_572){
if(_565===_572){
return;
}
_565=_572;
var args=_572.split(" "),_573=args.length,_574=_55a.Flags.IncludeTypeSignatures;
for(var _575=0;_575<_573;++_575){
var _576=args[_575];
if(_576.indexOf("-g")===0){
_574|=_55a.Flags.IncludeDebugSymbols;
}else{
if(_576.indexOf("-O")===0){
_574|=_55a.Flags.Compress;
if(_576.length>2){
_574|=_55a.Flags.InlineMsgSend;
}
}else{
if(_576.indexOf("-G")===0){
_574|=_55a.Flags.Generate;
}else{
if(_576.indexOf("-T")===0){
_574&=~_55a.Flags.IncludeTypeSignatures;
}
}
}
}
}
_564=_574;
};
_2.currentGccCompilerFlags=function(_577){
return _565;
};
_2.setCurrentCompilerFlags=function(_578){
_564=_578;
};
_2.currentCompilerFlags=function(_579){
return _564;
};
_55a.prototype.addWarning=function(_57a){
this.warnings.push(_57a);
};
_55a.prototype.getIvarForClass=function(_57b,_57c){
var ivar=_57c.getIvarForCurrentClass(_57b);
if(ivar){
return ivar;
}
var c=this.getClassDef(_57c.currentClassName());
while(c){
var _57d=c.ivars;
if(_57d){
var _57e=_57d[_57b];
if(_57e){
return _57e;
}
}
c=c.superClass;
}
};
_55a.prototype.getClassDef=function(_57f){
if(!_57f){
return null;
}
var c=this.classDefs[_57f];
if(c){
return c;
}
if(typeof objj_getClass==="function"){
var _580=objj_getClass(_57f);
if(_580){
var _581=class_copyIvarList(_580),_582=_581.length,_583=Object.create(null),_584=class_copyProtocolList(_580),_585=_584.length,_586=Object.create(null),_587=_55a.methodDefsFromMethodList(class_copyMethodList(_580)),_588=_55a.methodDefsFromMethodList(class_copyMethodList(_580.isa)),_589=class_getSuperclass(_580);
for(var i=0;i<_582;i++){
var ivar=_581[i];
_583[ivar.name]={"type":ivar.type,"name":ivar.name};
}
for(var i=0;i<_585;i++){
var _58a=_584[i],_58b=protocol_getName(_58a),_58c=this.getProtocolDef(_58b);
_586[_58b]=_58c;
}
c=new _522(true,_57f,_589?this.getClassDef(_589.name):null,_583,_587,_588,_586);
this.classDefs[_57f]=c;
return c;
}
}
return null;
};
_55a.prototype.getProtocolDef=function(_58d){
if(!_58d){
return null;
}
var p=this.protocolDefs[_58d];
if(p){
return p;
}
if(typeof objj_getProtocol==="function"){
var _58e=objj_getProtocol(_58d);
if(_58e){
var _58f=protocol_getName(_58e),_590=protocol_copyMethodDescriptionList(_58e,true,true),_591=_55a.methodDefsFromMethodList(_590),_592=protocol_copyMethodDescriptionList(_58e,true,false),_593=_55a.methodDefsFromMethodList(_592),_594=_58e.protocols,_595=[];
if(_594){
for(var i=0,size=_594.length;i<size;i++){
_595.push(compiler.getProtocolDef(_594[i].name));
}
}
p=new _545(_58f,_595,_591,_593);
this.protocolDefs[_58d]=p;
return p;
}
}
return null;
};
_55a.prototype.getTypeDef=function(_596){
if(!_596){
return null;
}
var t=this.typeDefs[_596];
if(t){
return t;
}
if(typeof objj_getTypeDef==="function"){
var _597=objj_getTypeDef(_596);
if(_597){
var _598=typeDef_getName(_597);
t=new _553(_598);
this.typeDefs[_598]=t;
return t;
}
}
return null;
};
_55a.methodDefsFromMethodList=function(_599){
var _59a=_599.length,_59b=Object.create(null);
for(var i=0;i<_59a;i++){
var _59c=_599[i],_59d=method_getName(_59c);
_59b[_59d]=new _554(_59d,_59c.types);
}
return _59b;
};
_55a.prototype.executable=function(){
if(!this._executable){
this._executable=new _300(this.jsBuffer?this.jsBuffer.toString():null,this.dependencies,this.URL,null,this);
}
return this._executable;
};
_55a.prototype.IMBuffer=function(){
return this.imBuffer;
};
_55a.prototype.JSBuffer=function(){
return this.jsBuffer;
};
_55a.prototype.prettifyMessage=function(_59e,_59f){
var line=this.source.substring(_59e.lineStart,_59e.lineEnd),_5a0="\n"+line;
_5a0+=(new Array(_59e.column+1)).join(" ");
_5a0+=(new Array(Math.min(1,line.length)+1)).join("^")+"\n";
_5a0+=_59f+" line "+_59e.line+" in "+this.URL+": "+_59e.message;
return _5a0;
};
_55a.prototype.error_message=function(_5a1,node){
var pos=_2.acorn.getLineInfo(this.source,node.start),_5a2={message:_5a1,line:pos.line,column:pos.column,lineStart:pos.lineStart,lineEnd:pos.lineEnd},_5a3=new SyntaxError(this.prettifyMessage(_5a2,"ERROR"));
_5a3.line=pos.line;
_5a3.path=this.URL.path();
return _5a3;
};
_55a.prototype.pushImport=function(url){
if(!_55a.importStack){
_55a.importStack=[];
}
_55a.importStack.push(url);
};
_55a.prototype.popImport=function(){
_55a.importStack.pop();
};
function _51f(_5a4,node,code){
var _5a5=_2.acorn.getLineInfo(code,node.start);
_5a5.message=_5a4;
return _5a5;
};
function _561(node,_5a6,_5a7){
function c(node,st,_5a8){
_5a7[_5a8||node.type](node,st,c);
};
c(node,_5a6);
};
function _5a9(node){
switch(node.type){
case "Literal":
case "Identifier":
return true;
case "ArrayExpression":
for(var i=0;i<node.elements.length;++i){
if(!_5a9(node.elements[i])){
return false;
}
}
return true;
case "DictionaryLiteral":
for(var i=0;i<node.keys.length;++i){
if(!_5a9(node.keys[i])){
return false;
}
if(!_5a9(node.values[i])){
return false;
}
}
return true;
case "ObjectExpression":
for(var i=0;i<node.properties.length;++i){
if(!_5a9(node.properties[i].value)){
return false;
}
}
return true;
case "FunctionExpression":
for(var i=0;i<node.params.length;++i){
if(!_5a9(node.params[i])){
return false;
}
}
return true;
case "SequenceExpression":
for(var i=0;i<node.expressions.length;++i){
if(!_5a9(node.expressions[i])){
return false;
}
}
return true;
case "UnaryExpression":
return _5a9(node.argument);
case "BinaryExpression":
return _5a9(node.left)&&_5a9(node.right);
case "ConditionalExpression":
return _5a9(node.test)&&_5a9(node.consequent)&&_5a9(node.alternate);
case "MemberExpression":
return _5a9(node.object)&&(!node.computed||_5a9(node.property));
case "Dereference":
return _5a9(node.expr);
case "Reference":
return _5a9(node.element);
default:
return false;
}
};
function _5aa(st,node){
if(!_5a9(node)){
throw st.compiler.error_message("Dereference of expression with side effects",node);
}
};
function _5ab(c){
return function(node,st,_5ac){
st.compiler.jsBuffer.concat("(");
c(node,st,_5ac);
st.compiler.jsBuffer.concat(")");
};
};
var _5ad={"*":3,"/":3,"%":3,"+":4,"-":4,"<<":5,">>":5,">>>":5,"<":6,"<=":6,">":6,">=":6,"in":6,"instanceof":6,"==":7,"!=":7,"===":7,"!==":7,"&":8,"^":9,"|":10,"&&":11,"||":12};
var _5ae={MemberExpression:0,CallExpression:1,NewExpression:2,FunctionExpression:3,UnaryExpression:4,UpdateExpression:4,BinaryExpression:5,LogicalExpression:6,ConditionalExpression:7,AssignmentExpression:8};
function _5af(node,_5b0,_5b1){
var _5b2=node.type,_5af=_5ae[_5b2]||-1,_5b3=_5ae[_5b0.type]||-1,_5b4,_5b5;
return _5af<_5b3||(_5af===_5b3&&_558(_5b2)&&((_5b4=_5ad[node.operator])<(_5b5=_5ad[_5b0.operator])||(_5b1&&_5b4===_5b5)));
};
var _563=_2.acorn.walk.make({ImportStatement:function(node,st,c){
var _5b6=node.filename.value;
st.compiler.dependencies.push(new _32f(new CFURL(_5b6),node.localfilepath));
}});
var _5b7=4;
var _5b8=Array(_5b7+1).join(" ");
var _5b9="";
var _562=_2.acorn.walk.make({Program:function(node,st,c){
var _5ba=st.compiler,_5bb=_5ba.generate;
_5b9="";
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(!_5bb){
_5ba.jsBuffer.concat(_5ba.source.substring(_5ba.lastPos,node.end));
}
var _5bc=st.maybeWarnings();
if(_5bc){
for(var i=0;i<_5bc.length;i++){
var _5bd=_5bc[i];
if(_5bd.checkIfWarning(st)){
_5ba.addWarning(_5bd.message);
}
}
}
},BlockStatement:function(node,st,c){
var _5be=st.compiler,_5bf=_5be.generate,_5c0=st.endOfScopeBody,_5c1;
if(_5c0){
delete st.endOfScopeBody;
}
if(_5bf){
st.indentBlockLevel=typeof st.indentBlockLevel==="undefined"?0:st.indentBlockLevel+1;
_5c1=_5be.jsBuffer;
_5c1.concat(_5b9.substring(_5b7));
_5c1.concat("{\n");
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(_5bf){
var _5c2=st.maxReceiverLevel;
if(_5c0&&_5c2){
_5c1.concat(_5b9);
_5c1.concat("var ");
for(var i=0;i<_5c2;i++){
if(i){
_5c1.concat(", ");
}
_5c1.concat("___r");
_5c1.concat((i+1)+"");
}
_5c1.concat(";\n");
}
_5c1.concat(_5b9.substring(_5b7));
_5c1.concat("}");
if(st.isDecl||st.indentBlockLevel>0){
_5c1.concat("\n");
}
st.indentBlockLevel--;
}
},ExpressionStatement:function(node,st,c){
var _5c3=st.compiler,_5c4=_5c3.generate;
if(_5c4){
_5c3.jsBuffer.concat(_5b9);
}
c(node.expression,st,"Expression");
if(_5c4){
_5c3.jsBuffer.concat(";\n");
}
},IfStatement:function(node,st,c){
var _5c5=st.compiler,_5c6=_5c5.generate,_5c7;
if(_5c6){
_5c7=_5c5.jsBuffer;
if(!st.superNodeIsElse){
_5c7.concat(_5b9);
}else{
delete st.superNodeIsElse;
}
_5c7.concat("if (");
}
c(node.test,st,"Expression");
if(_5c6){
_5c7.concat(node.consequent.type==="EmptyStatement"?");\n":")\n");
}
_5b9+=_5b8;
c(node.consequent,st,"Statement");
_5b9=_5b9.substring(_5b7);
var _5c8=node.alternate;
if(_5c8){
var _5c9=_5c8.type!=="IfStatement";
if(_5c6){
var _5ca=_5c8.type==="EmptyStatement";
_5c7.concat(_5b9);
_5c7.concat(_5c9?_5ca?"else;\n":"else\n":"else ");
}
if(_5c9){
_5b9+=_5b8;
}else{
st.superNodeIsElse=true;
}
c(_5c8,st,"Statement");
if(_5c9){
_5b9=_5b9.substring(_5b7);
}
}
},LabeledStatement:function(node,st,c){
var _5cb=st.compiler;
if(_5cb.generate){
var _5cc=_5cb.jsBuffer;
_5cc.concat(_5b9);
_5cc.concat(node.label.name);
_5cc.concat(": ");
}
c(node.body,st,"Statement");
},BreakStatement:function(node,st,c){
var _5cd=st.compiler;
if(_5cd.generate){
_5cd.jsBuffer.concat(_5b9);
if(node.label){
_5cd.jsBuffer.concat("break ");
_5cd.jsBuffer.concat(node.label.name);
_5cd.jsBuffer.concat(";\n");
}else{
_5cd.jsBuffer.concat("break;\n");
}
}
},ContinueStatement:function(node,st,c){
var _5ce=st.compiler;
if(_5ce.generate){
var _5cf=_5ce.jsBuffer;
_5cf.concat(_5b9);
if(node.label){
_5cf.concat("continue ");
_5cf.concat(node.label.name);
_5cf.concat(";\n");
}else{
_5cf.concat("continue;\n");
}
}
},WithStatement:function(node,st,c){
var _5d0=st.compiler,_5d1=_5d0.generate,_5d2;
if(_5d1){
_5d2=_5d0.jsBuffer;
_5d2.concat(_5b9);
_5d2.concat("with(");
}
c(node.object,st,"Expression");
if(_5d1){
_5d2.concat(")\n");
}
_5b9+=_5b8;
c(node.body,st,"Statement");
_5b9=_5b9.substring(_5b7);
},SwitchStatement:function(node,st,c){
var _5d3=st.compiler,_5d4=_5d3.generate,_5d5;
if(_5d4){
_5d5=_5d3.jsBuffer;
_5d5.concat(_5b9);
_5d5.concat("switch(");
}
c(node.discriminant,st,"Expression");
if(_5d4){
_5d5.concat(") {\n");
}
for(var i=0;i<node.cases.length;++i){
var cs=node.cases[i];
if(cs.test){
if(_5d4){
_5d5.concat(_5b9);
_5d5.concat("case ");
}
c(cs.test,st,"Expression");
if(_5d4){
_5d5.concat(":\n");
}
}else{
if(_5d4){
_5d5.concat("default:\n");
}
}
_5b9+=_5b8;
for(var j=0;j<cs.consequent.length;++j){
c(cs.consequent[j],st,"Statement");
}
_5b9=_5b9.substring(_5b7);
}
if(_5d4){
_5d5.concat(_5b9);
_5d5.concat("}\n");
}
},ReturnStatement:function(node,st,c){
var _5d6=st.compiler,_5d7=_5d6.generate,_5d8;
if(_5d7){
_5d8=_5d6.jsBuffer;
_5d8.concat(_5b9);
_5d8.concat("return");
}
if(node.argument){
if(_5d7){
_5d8.concat(" ");
}
c(node.argument,st,"Expression");
}
if(_5d7){
_5d8.concat(";\n");
}
},ThrowStatement:function(node,st,c){
var _5d9=st.compiler,_5da=_5d9.generate,_5db;
if(_5da){
_5db=_5d9.jsBuffer;
_5db.concat(_5b9);
_5db.concat("throw ");
}
c(node.argument,st,"Expression");
if(_5da){
_5db.concat(";\n");
}
},TryStatement:function(node,st,c){
var _5dc=st.compiler,_5dd=_5dc.generate,_5de;
if(_5dd){
_5de=_5dc.jsBuffer;
_5de.concat(_5b9);
_5de.concat("try");
}
_5b9+=_5b8;
c(node.block,st,"Statement");
_5b9=_5b9.substring(_5b7);
for(var i=0;i<node.handlers.length;++i){
var _5df=node.handlers[i],_5e0=new _515(st),_5e1=_5df.param,name=_5e1.name;
_5e0.vars[name]={type:"catch clause",node:_5e1};
if(_5dd){
_5de.concat(_5b9);
_5de.concat("catch(");
_5de.concat(name);
_5de.concat(") ");
}
_5b9+=_5b8;
_5e0.endOfScopeBody=true;
c(_5df.body,_5e0,"ScopeBody");
_5b9=_5b9.substring(_5b7);
_5e0.copyAddedSelfToIvarsToParent();
}
if(node.finalizer){
if(_5dd){
_5de.concat(_5b9);
_5de.concat("finally ");
}
_5b9+=_5b8;
c(node.finalizer,st,"Statement");
_5b9=_5b9.substring(_5b7);
}
},WhileStatement:function(node,st,c){
var _5e2=st.compiler,_5e3=_5e2.generate,body=node.body,_5e4;
if(_5e3){
_5e4=_5e2.jsBuffer;
_5e4.concat(_5b9);
_5e4.concat("while (");
}
c(node.test,st,"Expression");
if(_5e3){
_5e4.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_5b9+=_5b8;
c(body,st,"Statement");
_5b9=_5b9.substring(_5b7);
},DoWhileStatement:function(node,st,c){
var _5e5=st.compiler,_5e6=_5e5.generate,_5e7;
if(_5e6){
_5e7=_5e5.jsBuffer;
_5e7.concat(_5b9);
_5e7.concat("do\n");
}
_5b9+=_5b8;
c(node.body,st,"Statement");
_5b9=_5b9.substring(_5b7);
if(_5e6){
_5e7.concat(_5b9);
_5e7.concat("while (");
}
c(node.test,st,"Expression");
if(_5e6){
_5e7.concat(");\n");
}
},ForStatement:function(node,st,c){
var _5e8=st.compiler,_5e9=_5e8.generate,body=node.body,_5ea;
if(_5e9){
_5ea=_5e8.jsBuffer;
_5ea.concat(_5b9);
_5ea.concat("for (");
}
if(node.init){
c(node.init,st,"ForInit");
}
if(_5e9){
_5ea.concat("; ");
}
if(node.test){
c(node.test,st,"Expression");
}
if(_5e9){
_5ea.concat("; ");
}
if(node.update){
c(node.update,st,"Expression");
}
if(_5e9){
_5ea.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_5b9+=_5b8;
c(body,st,"Statement");
_5b9=_5b9.substring(_5b7);
},ForInStatement:function(node,st,c){
var _5eb=st.compiler,_5ec=_5eb.generate,body=node.body,_5ed;
if(_5ec){
_5ed=_5eb.jsBuffer;
_5ed.concat(_5b9);
_5ed.concat("for (");
}
c(node.left,st,"ForInit");
if(_5ec){
_5ed.concat(" in ");
}
c(node.right,st,"Expression");
if(_5ec){
_5ed.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_5b9+=_5b8;
c(body,st,"Statement");
_5b9=_5b9.substring(_5b7);
},ForInit:function(node,st,c){
var _5ee=st.compiler,_5ef=_5ee.generate;
if(node.type==="VariableDeclaration"){
st.isFor=true;
c(node,st);
delete st.isFor;
}else{
c(node,st,"Expression");
}
},DebuggerStatement:function(node,st,c){
var _5f0=st.compiler;
if(_5f0.generate){
var _5f1=_5f0.jsBuffer;
_5f1.concat(_5b9);
_5f1.concat("debugger;\n");
}
},Function:function(node,st,c){
var _5f2=st.compiler,_5f3=_5f2.generate,_5f4=_5f2.jsBuffer;
inner=new _515(st),decl=node.type=="FunctionDeclaration";
inner.isDecl=decl;
for(var i=0;i<node.params.length;++i){
inner.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
(decl?st:inner).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
if(_5f3){
_5f4.concat(node.id.name);
_5f4.concat(" = ");
}else{
_5f4.concat(_5f2.source.substring(_5f2.lastPos,node.start));
_5f4.concat(node.id.name);
_5f4.concat(" = function");
_5f2.lastPos=node.id.end;
}
}
if(_5f3){
_5f4.concat("function(");
for(var i=0;i<node.params.length;++i){
if(i){
_5f4.concat(", ");
}
_5f4.concat(node.params[i].name);
}
_5f4.concat(")\n");
}
_5b9+=_5b8;
inner.endOfScopeBody=true;
c(node.body,inner,"ScopeBody");
_5b9=_5b9.substring(_5b7);
inner.copyAddedSelfToIvarsToParent();
},VariableDeclaration:function(node,st,c){
var _5f5=st.compiler,_5f6=_5f5.generate,_5f7;
if(_5f6){
_5f7=_5f5.jsBuffer;
if(!st.isFor){
_5f7.concat(_5b9);
}
_5f7.concat("var ");
}
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i],_5f8=decl.id.name;
if(i){
if(_5f6){
if(st.isFor){
_5f7.concat(", ");
}else{
_5f7.concat(",\n");
_5f7.concat(_5b9);
_5f7.concat("    ");
}
}
}
st.vars[_5f8]={type:"var",node:decl.id};
if(_5f6){
_5f7.concat(_5f8);
}
if(decl.init){
if(_5f6){
_5f7.concat(" = ");
}
c(decl.init,st,"Expression");
}
if(st.addedSelfToIvars){
var _5f9=st.addedSelfToIvars[_5f8];
if(_5f9){
var _5f7=st.compiler.jsBuffer.atoms;
for(var i=0;i<_5f9.length;i++){
var dict=_5f9[i];
_5f7[dict.index]="";
_5f5.addWarning(_51f("Local declaration of '"+_5f8+"' hides instance variable",dict.node,_5f5.source));
}
st.addedSelfToIvars[_5f8]=[];
}
}
}
if(_5f6&&!st.isFor){
_5f5.jsBuffer.concat(";\n");
}
},ThisExpression:function(node,st,c){
var _5fa=st.compiler;
if(_5fa.generate){
_5fa.jsBuffer.concat("this");
}
},ArrayExpression:function(node,st,c){
var _5fb=st.compiler,_5fc=_5fb.generate;
if(_5fc){
_5fb.jsBuffer.concat("[");
}
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(i!==0){
if(_5fc){
_5fb.jsBuffer.concat(", ");
}
}
if(elt){
c(elt,st,"Expression");
}
}
if(_5fc){
_5fb.jsBuffer.concat("]");
}
},ObjectExpression:function(node,st,c){
var _5fd=st.compiler,_5fe=_5fd.generate;
if(_5fe){
_5fd.jsBuffer.concat("{");
}
for(var i=0;i<node.properties.length;++i){
var prop=node.properties[i];
if(_5fe){
if(i){
_5fd.jsBuffer.concat(", ");
}
st.isPropertyKey=true;
c(prop.key,st,"Expression");
delete st.isPropertyKey;
_5fd.jsBuffer.concat(": ");
}else{
if(prop.key.raw&&prop.key.raw.charAt(0)==="@"){
_5fd.jsBuffer.concat(_5fd.source.substring(_5fd.lastPos,prop.key.start));
_5fd.lastPos=prop.key.start+1;
}
}
c(prop.value,st,"Expression");
}
if(_5fe){
_5fd.jsBuffer.concat("}");
}
},SequenceExpression:function(node,st,c){
var _5ff=st.compiler,_600=_5ff.generate;
if(_600){
_5ff.jsBuffer.concat("(");
}
for(var i=0;i<node.expressions.length;++i){
if(_600&&i!==0){
_5ff.jsBuffer.concat(", ");
}
c(node.expressions[i],st,"Expression");
}
if(_600){
_5ff.jsBuffer.concat(")");
}
},UnaryExpression:function(node,st,c){
var _601=st.compiler,_602=_601.generate,_603=node.argument;
if(_602){
if(node.prefix){
_601.jsBuffer.concat(node.operator);
if(_557(node.operator)){
_601.jsBuffer.concat(" ");
}
(_5af(node,_603)?_5ab(c):c)(_603,st,"Expression");
}else{
(_5af(node,_603)?_5ab(c):c)(_603,st,"Expression");
_601.jsBuffer.concat(node.operator);
}
}else{
c(_603,st,"Expression");
}
},UpdateExpression:function(node,st,c){
var _604=st.compiler,_605=_604.generate;
if(node.argument.type==="Dereference"){
_5aa(st,node.argument);
if(!_605){
_604.jsBuffer.concat(_604.source.substring(_604.lastPos,node.start));
}
_604.jsBuffer.concat((node.prefix?"":"(")+"(");
if(!_605){
_604.lastPos=node.argument.expr.start;
}
c(node.argument.expr,st,"Expression");
if(!_605){
_604.jsBuffer.concat(_604.source.substring(_604.lastPos,node.argument.expr.end));
}
_604.jsBuffer.concat(")(");
if(!_605){
_604.lastPos=node.argument.start;
}
c(node.argument,st,"Expression");
if(!_605){
_604.jsBuffer.concat(_604.source.substring(_604.lastPos,node.argument.end));
}
_604.jsBuffer.concat(" "+node.operator.substring(0,1)+" 1)"+(node.prefix?"":node.operator=="++"?" - 1)":" + 1)"));
if(!_605){
_604.lastPos=node.end;
}
return;
}
if(node.prefix){
if(_605){
_604.jsBuffer.concat(node.operator);
if(_557(node.operator)){
_604.jsBuffer.concat(" ");
}
}
(_605&&_5af(node,node.argument)?_5ab(c):c)(node.argument,st,"Expression");
}else{
(_605&&_5af(node,node.argument)?_5ab(c):c)(node.argument,st,"Expression");
if(_605){
_604.jsBuffer.concat(node.operator);
}
}
},BinaryExpression:function(node,st,c){
var _606=st.compiler,_607=_606.generate,_608=_559(node.operator);
(_607&&_5af(node,node.left)?_5ab(c):c)(node.left,st,"Expression");
if(_607){
var _609=_606.jsBuffer;
_609.concat(" ");
_609.concat(node.operator);
_609.concat(" ");
}
(_607&&_5af(node,node.right,true)?_5ab(c):c)(node.right,st,"Expression");
},LogicalExpression:function(node,st,c){
var _60a=st.compiler,_60b=_60a.generate;
(_60b&&_5af(node,node.left)?_5ab(c):c)(node.left,st,"Expression");
if(_60b){
var _60c=_60a.jsBuffer;
_60c.concat(" ");
_60c.concat(node.operator);
_60c.concat(" ");
}
(_60b&&_5af(node,node.right,true)?_5ab(c):c)(node.right,st,"Expression");
},AssignmentExpression:function(node,st,c){
var _60d=st.compiler,_60e=_60d.generate,_60f=st.assignment,_610=_60d.jsBuffer;
if(node.left.type==="Dereference"){
_5aa(st,node.left);
if(!_60e){
_610.concat(_60d.source.substring(_60d.lastPos,node.start));
}
_610.concat("(");
if(!_60e){
_60d.lastPos=node.left.expr.start;
}
c(node.left.expr,st,"Expression");
if(!_60e){
_610.concat(_60d.source.substring(_60d.lastPos,node.left.expr.end));
}
_610.concat(")(");
if(node.operator!=="="){
if(!_60e){
_60d.lastPos=node.left.start;
}
c(node.left,st,"Expression");
if(!_60e){
_610.concat(_60d.source.substring(_60d.lastPos,node.left.end));
}
_610.concat(" "+node.operator.substring(0,1)+" ");
}
if(!_60e){
_60d.lastPos=node.right.start;
}
c(node.right,st,"Expression");
if(!_60e){
_610.concat(_60d.source.substring(_60d.lastPos,node.right.end));
}
_610.concat(")");
if(!_60e){
_60d.lastPos=node.end;
}
return;
}
var _60f=st.assignment,_611=node.left;
st.assignment=true;
if(_611.type==="Identifier"&&_611.name==="self"){
var lVar=st.getLvar("self",true);
if(lVar){
var _612=lVar.scope;
if(_612){
_612.assignmentToSelf=true;
}
}
}
(_60e&&_5af(node,_611)?_5ab(c):c)(_611,st,"Expression");
if(_60e){
_610.concat(" ");
_610.concat(node.operator);
_610.concat(" ");
}
st.assignment=_60f;
(_60e&&_5af(node,node.right,true)?_5ab(c):c)(node.right,st,"Expression");
if(st.isRootScope()&&_611.type==="Identifier"&&!st.getLvar(_611.name)){
st.vars[_611.name]={type:"global",node:_611};
}
},ConditionalExpression:function(node,st,c){
var _613=st.compiler,_614=_613.generate;
(_614&&_5af(node,node.test)?_5ab(c):c)(node.test,st,"Expression");
if(_614){
_613.jsBuffer.concat(" ? ");
}
c(node.consequent,st,"Expression");
if(_614){
_613.jsBuffer.concat(" : ");
}
c(node.alternate,st,"Expression");
},NewExpression:function(node,st,c){
var _615=st.compiler,_616=_615.generate;
if(_616){
_615.jsBuffer.concat("new ");
}
(_616&&_5af(node,node.callee)?_5ab(c):c)(node.callee,st,"Expression");
if(_616){
_615.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_616&&i){
_615.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_616){
_615.jsBuffer.concat(")");
}
},CallExpression:function(node,st,c){
var _617=st.compiler,_618=_617.generate,_619=node.callee;
if(_619.type==="Identifier"&&_619.name==="eval"){
var _61a=st.getLvar("self",true);
if(_61a){
var _61b=_61a.scope;
if(_61b){
_61b.assignmentToSelf=true;
}
}
}
(_618&&_5af(node,_619)?_5ab(c):c)(_619,st,"Expression");
if(_618){
_617.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_618&&i){
_617.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_618){
_617.jsBuffer.concat(")");
}
},MemberExpression:function(node,st,c){
var _61c=st.compiler,_61d=_61c.generate,_61e=node.computed;
(_61d&&_5af(node,node.object)?_5ab(c):c)(node.object,st,"Expression");
if(_61d){
if(_61e){
_61c.jsBuffer.concat("[");
}else{
_61c.jsBuffer.concat(".");
}
}
st.secondMemberExpression=!_61e;
(_61d&&!_61e&&_5af(node,node.property)?_5ab(c):c)(node.property,st,"Expression");
st.secondMemberExpression=false;
if(_61d&&_61e){
_61c.jsBuffer.concat("]");
}
},Identifier:function(node,st,c){
var _61f=st.compiler,_620=_61f.generate,_621=node.name;
if(st.currentMethodType()==="-"&&!st.secondMemberExpression&&!st.isPropertyKey){
var lvar=st.getLvar(_621,true),ivar=_61f.getIvarForClass(_621,st);
if(ivar){
if(lvar){
_61f.addWarning(_51f("Local declaration of '"+_621+"' hides instance variable",node,_61f.source));
}else{
var _622=node.start;
if(!_620){
do{
_61f.jsBuffer.concat(_61f.source.substring(_61f.lastPos,_622));
_61f.lastPos=_622;
}while(_61f.source.substr(_622++,1)==="(");
}
((st.addedSelfToIvars||(st.addedSelfToIvars=Object.create(null)))[_621]||(st.addedSelfToIvars[_621]=[])).push({node:node,index:_61f.jsBuffer.atoms.length});
_61f.jsBuffer.concat("self.");
}
}else{
if(!_556(_621)){
var _623,_624=typeof _1[_621]!=="undefined"||typeof window[_621]!=="undefined"||_61f.getClassDef(_621),_625=st.getLvar(_621);
if(_624&&(!_625||_625.type!=="class")){
}else{
if(!_625){
if(st.assignment){
_623=new _51d("Creating global variable inside function or method '"+_621+"'",node,_61f.source);
st.vars[_621]={type:"remove global warning",node:node};
}else{
_623=new _51d("Using unknown class or uninitialized global variable '"+_621+"'",node,_61f.source);
}
}
}
if(_623){
st.addMaybeWarning(_623);
}
}
}
}
if(_620){
_61f.jsBuffer.concat(_621);
}
},Literal:function(node,st,c){
var _626=st.compiler,_627=_626.generate;
if(_627){
if(node.raw&&node.raw.charAt(0)==="@"){
_626.jsBuffer.concat(node.raw.substring(1));
}else{
_626.jsBuffer.concat(node.raw);
}
}else{
if(node.raw.charAt(0)==="@"){
_626.jsBuffer.concat(_626.source.substring(_626.lastPos,node.start));
_626.lastPos=node.start+1;
}
}
},ArrayLiteral:function(node,st,c){
var _628=st.compiler,_629=_628.generate,_62a=_628.jsBuffer;
if(!_629){
_62a.concat(_628.source.substring(_628.lastPos,node.start));
_628.lastPos=node.start;
}
if(!_629){
_62a.concat(" ");
}
if(!st.receiverLevel){
st.receiverLevel=0;
}
if(!node.elements.length){
if(_628.flags&_55a.Flags.InlineMsgSend){
_62a.concat("(___r");
_62a.concat(++st.receiverLevel+"");
_62a.concat(" = (CPArray.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPArray, \"alloc\"), ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(" == null ? null : (___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(".isa.method_msgSend[\"init\"] || _objj_forward)(___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(", \"init\"))");
}else{
_62a.concat("(___r");
_62a.concat(++st.receiverLevel+"");
_62a.concat(" = CPArray.isa.objj_msgSend0(CPArray, \"alloc\"), ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(" == null ? null : ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(".isa.objj_msgSend0(___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(", \"init\"))");
}
if(!(st.maxReceiverLevel>=st.receiverLevel)){
st.maxReceiverLevel=st.receiverLevel;
}
}else{
if(_628.flags&_55a.Flags.InlineMsgSend){
_62a.concat("(___r");
_62a.concat(++st.receiverLevel+"");
_62a.concat(" = (CPArray.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPArray, \"alloc\"), ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(" == null ? null : (___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(".isa.method_msgSend[\"initWithObjects:count:\"] || _objj_forward)(___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(", \"initWithObjects:count:\", [");
}else{
_62a.concat("(___r");
_62a.concat(++st.receiverLevel+"");
_62a.concat(" = CPArray.isa.objj_msgSend0(CPArray, \"alloc\"), ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(" == null ? null : ___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(".isa.objj_msgSend2(___r");
_62a.concat(st.receiverLevel+"");
_62a.concat(", \"initWithObjects:count:\", [");
}
if(!(st.maxReceiverLevel>=st.receiverLevel)){
st.maxReceiverLevel=st.receiverLevel;
}
for(var i=0;i<node.elements.length;i++){
var elt=node.elements[i];
if(i){
_62a.concat(", ");
}
if(!_629){
_628.lastPos=elt.start;
}
c(elt,st,"Expression");
if(!_629){
_62a.concat(_628.source.substring(_628.lastPos,elt.end));
}
}
_62a.concat("], "+node.elements.length+"))");
}
st.receiverLevel--;
if(!_629){
_628.lastPos=node.end;
}
},DictionaryLiteral:function(node,st,c){
var _62b=st.compiler,_62c=_62b.generate,_62d=_62b.jsBuffer,_62e=node.keys.length;
if(!_62c){
_62d.concat(_62b.source.substring(_62b.lastPos,node.start));
_62b.lastPos=node.start;
}
if(!_62c){
_62d.concat(" ");
}
if(!st.receiverLevel){
st.receiverLevel=0;
}
if(!_62e){
if(_62b.flags&_55a.Flags.InlineMsgSend){
_62d.concat("(___r");
_62d.concat(++st.receiverLevel+"");
_62d.concat(" = (CPDictionary.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPDictionary, \"alloc\"), ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(" == null ? null : (___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(".isa.method_msgSend[\"init\"] || _objj_forward)(___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(", \"init\"))");
}else{
_62d.concat("(___r");
_62d.concat(++st.receiverLevel+"");
_62d.concat(" = CPDictionary.isa.objj_msgSend0(CPDictionary, \"alloc\"), ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(" == null ? null : ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(".isa.objj_msgSend0(___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(", \"init\"))");
}
if(!(st.maxReceiverLevel>=st.receiverLevel)){
st.maxReceiverLevel=st.receiverLevel;
}
}else{
if(_62b.flags&_55a.Flags.InlineMsgSend){
_62d.concat("(___r");
_62d.concat(++st.receiverLevel+"");
_62d.concat(" = (CPDictionary.isa.method_msgSend[\"alloc\"] || _objj_forward)(CPDictionary, \"alloc\"), ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(" == null ? null : (___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(".isa.method_msgSend[\"initWithObjects:forKeys:\"] || _objj_forward)(___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(", \"initWithObjects:forKeys:\", [");
}else{
_62d.concat("(___r");
_62d.concat(++st.receiverLevel+"");
_62d.concat(" = CPDictionary.isa.objj_msgSend0(CPDictionary, \"alloc\"), ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(" == null ? null : ___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(".isa.objj_msgSend2(___r");
_62d.concat(st.receiverLevel+"");
_62d.concat(", \"initWithObjects:forKeys:\", [");
}
if(!(st.maxReceiverLevel>=st.receiverLevel)){
st.maxReceiverLevel=st.receiverLevel;
}
for(var i=0;i<_62e;i++){
var _62f=node.values[i];
if(i){
_62d.concat(", ");
}
if(!_62c){
_62b.lastPos=_62f.start;
}
c(_62f,st,"Expression");
if(!_62c){
_62d.concat(_62b.source.substring(_62b.lastPos,_62f.end));
}
}
_62d.concat("], [");
for(var i=0;i<_62e;i++){
var key=node.keys[i];
if(i){
_62d.concat(", ");
}
if(!_62c){
_62b.lastPos=key.start;
}
c(key,st,"Expression");
if(!_62c){
_62d.concat(_62b.source.substring(_62b.lastPos,key.end));
}
}
_62d.concat("]))");
}
st.receiverLevel--;
if(!_62c){
_62b.lastPos=node.end;
}
},ImportStatement:function(node,st,c){
var _630=st.compiler,_631=_630.generate,_632=_630.jsBuffer;
if(!_631){
_632.concat(_630.source.substring(_630.lastPos,node.start));
}
_632.concat("objj_executeFile(\"");
_632.concat(node.filename.value);
_632.concat(node.localfilepath?"\", YES);":"\", NO);");
if(!_631){
_630.lastPos=node.end;
}
},ClassDeclarationStatement:function(node,st,c){
var _633=st.compiler,_634=_633.generate,_635=_633.jsBuffer,_636=node.classname.name,_637=_633.getClassDef(_636),_638=new _515(st),_639=node.type==="InterfaceDeclarationStatement",_63a=node.protocols;
_633.imBuffer=new _2f1();
_633.cmBuffer=new _2f1();
_633.classBodyBuffer=new _2f1();
if(_633.getTypeDef(_636)){
throw _633.error_message(_636+" is already declared as a type",node.classname);
}
if(!_634){
_635.concat(_633.source.substring(_633.lastPos,node.start));
}
if(node.superclassname){
if(_637&&_637.ivars){
throw _633.error_message("Duplicate class "+_636,node.classname);
}
if(_639&&_637&&_637.instanceMethods&&_637.classMethods){
throw _633.error_message("Duplicate interface definition for class "+_636,node.classname);
}
var _63b=_633.getClassDef(node.superclassname.name);
if(!_63b){
var _63c="Can't find superclass "+node.superclassname.name;
for(var i=_55a.importStack.length;--i>=0;){
_63c+="\n"+Array((_55a.importStack.length-i)*2+1).join(" ")+"Imported by: "+_55a.importStack[i];
}
throw _633.error_message(_63c,node.superclassname);
}
_637=new _522(!_639,_636,_63b,Object.create(null));
_635.concat("{var the_class = objj_allocateClassPair("+node.superclassname.name+", \""+_636+"\"),\nmeta_class = the_class.isa;");
}else{
if(node.categoryname){
_637=_633.getClassDef(_636);
if(!_637){
throw _633.error_message("Class "+_636+" not found ",node.classname);
}
_635.concat("{\nvar the_class = objj_getClass(\""+_636+"\")\n");
_635.concat("if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_636+"\\\"\");\n");
_635.concat("var meta_class = the_class.isa;");
}else{
_637=new _522(!_639,_636,null,Object.create(null));
_635.concat("{var the_class = objj_allocateClassPair(Nil, \""+_636+"\"),\nmeta_class = the_class.isa;");
}
}
if(_63a){
for(var i=0,size=_63a.length;i<size;i++){
_635.concat("\nvar aProtocol = objj_getProtocol(\""+_63a[i].name+"\");");
_635.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\""+_63a[i].name+"\\\"\");");
_635.concat("\nclass_addProtocol(the_class, aProtocol);");
}
}
_638.classDef=_637;
_633.currentSuperClass="objj_getClass(\""+_636+"\").super_class";
_633.currentSuperMetaClass="objj_getMetaClass(\""+_636+"\").super_class";
var _63d=true,_63e=_637.ivars,_63f=[],_640=false;
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
var _641=node.ivardeclarations[i],_642=_641.ivartype?_641.ivartype.name:null,_643=_641.ivartype?_641.ivartype.typeisclass:false,_644=_641.id.name,ivar={"type":_642,"name":_644},_645=_641.accessors;
var _646=function(_647,_648){
if(_647.ivars[_644]){
throw _633.error_message("Instance variable '"+_644+"' is already declared for class "+_636+(_647.name!==_636?" in superclass "+_647.name:""),_641.id);
}
if(_647.superClass){
_648(_647.superClass,_648);
}
};
_646(_637,_646);
var _649=!_643||typeof _1[_642]!=="undefined"||typeof window[_642]!=="undefined"||_633.getClassDef(_642)||_633.getTypeDef(_642)||_642==_637.name;
if(!_649){
_633.addWarning(_51f("Unknown type '"+_642+"' for ivar '"+_644+"'",_641.id,_633.source));
}
if(_63d){
_63d=false;
_635.concat("class_addIvars(the_class, [");
}else{
_635.concat(", ");
}
if(_633.flags&_55a.Flags.IncludeTypeSignatures){
_635.concat("new objj_ivar(\""+_644+"\", \""+_642+"\")");
}else{
_635.concat("new objj_ivar(\""+_644+"\")");
}
if(_641.outlet){
ivar.outlet=true;
}
_63f.push(ivar);
if(!_638.ivars){
_638.ivars=Object.create(null);
}
_638.ivars[_644]={type:"ivar",name:_644,node:_641.id,ivar:ivar};
if(_645){
var _64a=(_645.property&&_645.property.name)||_644,_64b=(_645.getter&&_645.getter.name)||_64a;
_637.addInstanceMethod(new _554(_64b,[_642]));
if(!_645.readonly){
var _64c=_645.setter?_645.setter.name:null;
if(!_64c){
var _64d=_64a.charAt(0)=="_"?1:0;
_64c=(_64d?"_":"")+"set"+_64a.substr(_64d,1).toUpperCase()+_64a.substring(_64d+1)+":";
}
_637.addInstanceMethod(new _554(_64c,["void",_642]));
}
_640=true;
}
}
}
if(!_63d){
_635.concat("]);");
}
if(!_639&&_640){
var _64e=new _2f1();
_64e.concat(_633.source.substring(node.start,node.endOfIvars).replace(/<.*>/g,""));
_64e.concat("\n");
for(var i=0;i<node.ivardeclarations.length;++i){
var _641=node.ivardeclarations[i],_642=_641.ivartype?_641.ivartype.name:null,_644=_641.id.name,_645=_641.accessors;
if(!_645){
continue;
}
var _64a=(_645.property&&_645.property.name)||_644,_64b=(_645.getter&&_645.getter.name)||_64a,_64f="- ("+(_642?_642:"id")+")"+_64b+"\n{\nreturn "+_644+";\n}\n";
_64e.concat(_64f);
if(_645.readonly){
continue;
}
var _64c=_645.setter?_645.setter.name:null;
if(!_64c){
var _64d=_64a.charAt(0)=="_"?1:0;
_64c=(_64d?"_":"")+"set"+_64a.substr(_64d,1).toUpperCase()+_64a.substring(_64d+1)+":";
}
var _650="- (void)"+_64c+"("+(_642?_642:"id")+")newValue\n{\n";
if(_645.copy){
_650+="if ("+_644+" !== newValue)\n"+_644+" = [newValue copy];\n}\n";
}else{
_650+=_644+" = newValue;\n}\n";
}
_64e.concat(_650);
}
_64e.concat("\n@end");
var b=_64e.toString().replace(/@accessors(\(.*\))?/g,"");
var _651=_55a.compileToIMBuffer(b,"Accessors",_633.flags,_633.classDefs,_633.protocolDefs,_633.typeDefs);
_633.imBuffer.concat(_651);
}
for(var _652=_63f.length,i=0;i<_652;i++){
var ivar=_63f[i],_644=ivar.name;
_63e[_644]=ivar;
}
_633.classDefs[_636]=_637;
var _653=node.body,_654=_653.length;
if(_654>0){
if(!_634){
_633.lastPos=_653[0].start;
}
for(var i=0;i<_654;++i){
var body=_653[i];
c(body,_638,"Statement");
}
if(!_634){
_635.concat(_633.source.substring(_633.lastPos,body.end));
}
}
if(!_639&&!node.categoryname){
_635.concat("objj_registerClassPair(the_class);\n");
}
if(_633.imBuffer.isEmpty()){
_635.concat("class_addMethods(the_class, [");
_635.atoms.push.apply(_635.atoms,_633.imBuffer.atoms);
_635.concat("]);\n");
}
if(_633.cmBuffer.isEmpty()){
_635.concat("class_addMethods(meta_class, [");
_635.atoms.push.apply(_635.atoms,_633.cmBuffer.atoms);
_635.concat("]);\n");
}
_635.concat("}");
_633.jsBuffer=_635;
if(!_634){
_633.lastPos=node.end;
}
if(_63a){
var _655=[];
for(var i=0,size=_63a.length;i<size;i++){
var _656=_63a[i],_657=_633.getProtocolDef(_656.name);
if(!_657){
throw _633.error_message("Cannot find protocol declaration for '"+_656.name+"'",_656);
}
_655.push(_657);
}
var _658=_637.listOfNotImplementedMethodsForProtocols(_655);
if(_658&&_658.length>0){
for(var i=0,size=_658.length;i<size;i++){
var _659=_658[i],_65a=_659.methodDef,_657=_659.protocolDef;
_633.addWarning(_51f("Method '"+_65a.name+"' in protocol '"+_657.name+"' is not implemented",node.classname,_633.source));
}
}
}
},ProtocolDeclarationStatement:function(node,st,c){
var _65b=st.compiler,_65c=_65b.generate,_65d=_65b.jsBuffer,_65e=node.protocolname.name,_65f=_65b.getProtocolDef(_65e),_660=node.protocols,_661=new _515(st),_662=[];
if(_65f){
throw _65b.error_message("Duplicate protocol "+_65e,node.protocolname);
}
_65b.imBuffer=new _2f1();
_65b.cmBuffer=new _2f1();
if(!_65c){
_65d.concat(_65b.source.substring(_65b.lastPos,node.start));
}
_65d.concat("{var the_protocol = objj_allocateProtocol(\""+_65e+"\");");
if(_660){
for(var i=0,size=_660.length;i<size;i++){
var _663=_660[i],_664=_663.name;
inheritProtocolDef=_65b.getProtocolDef(_664);
if(!inheritProtocolDef){
throw _65b.error_message("Can't find protocol "+_664,_663);
}
_65d.concat("\nvar aProtocol = objj_getProtocol(\""+_664+"\");");
_65d.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\""+_65e+"\\\"\");");
_65d.concat("\nprotocol_addProtocol(the_protocol, aProtocol);");
_662.push(inheritProtocolDef);
}
}
_65f=new _545(_65e,_662);
_65b.protocolDefs[_65e]=_65f;
_661.protocolDef=_65f;
var _665=node.required;
if(_665){
var _666=_665.length;
if(_666>0){
for(var i=0;i<_666;++i){
var _667=_665[i];
if(!_65c){
_65b.lastPos=_667.start;
}
c(_667,_661,"Statement");
}
if(!_65c){
_65d.concat(_65b.source.substring(_65b.lastPos,_667.end));
}
}
}
_65d.concat("\nobjj_registerProtocol(the_protocol);\n");
if(_65b.imBuffer.isEmpty()){
_65d.concat("protocol_addMethodDescriptions(the_protocol, [");
_65d.atoms.push.apply(_65d.atoms,_65b.imBuffer.atoms);
_65d.concat("], true, true);\n");
}
if(_65b.cmBuffer.isEmpty()){
_65d.concat("protocol_addMethodDescriptions(the_protocol, [");
_65d.atoms.push.apply(_65d.atoms,_65b.cmBuffer.atoms);
_65d.concat("], true, false);\n");
}
_65d.concat("}");
_65b.jsBuffer=_65d;
if(!_65c){
_65b.lastPos=node.end;
}
},MethodDeclarationStatement:function(node,st,c){
var _668=st.compiler,_669=_668.generate,_66a=_668.jsBuffer,_66b=new _515(st),_66c=node.methodtype==="-";
selectors=node.selectors,nodeArguments=node.arguments,returnType=node.returntype,types=[returnType?returnType.name:(node.action?"void":"id")],returnTypeProtocols=returnType?returnType.protocols:null;
selector=selectors[0].name;
if(returnTypeProtocols){
for(var i=0,size=returnTypeProtocols.length;i<size;i++){
var _66d=returnTypeProtocols[i];
if(!_668.getProtocolDef(_66d.name)){
_668.addWarning(_51f("Cannot find protocol declaration for '"+_66d.name+"'",_66d,_668.source));
}
}
}
if(!_669){
_66a.concat(_668.source.substring(_668.lastPos,node.start));
}
_668.jsBuffer=_66c?_668.imBuffer:_668.cmBuffer;
for(var i=0;i<nodeArguments.length;i++){
var _66e=nodeArguments[i],_66f=_66e.type,_670=_66f?_66f.name:"id",_671=_66f?_66f.protocols:null;
types.push(_66f?_66f.name:"id");
if(_671){
for(var j=0,size=_671.length;j<size;j++){
var _672=_671[j];
if(!_668.getProtocolDef(_672.name)){
_668.addWarning(_51f("Cannot find protocol declaration for '"+_672.name+"'",_672,_668.source));
}
}
}
if(i===0){
selector+=":";
}else{
selector+=(selectors[i]?selectors[i].name:"")+":";
}
}
if(_668.jsBuffer.isEmpty()){
_668.jsBuffer.concat(", ");
}
_668.jsBuffer.concat("new objj_method(sel_getUid(\"");
_668.jsBuffer.concat(selector);
_668.jsBuffer.concat("\"), ");
if(node.body){
_668.jsBuffer.concat("function");
if(_668.flags&_55a.Flags.IncludeDebugSymbols){
_668.jsBuffer.concat(" $"+st.currentClassName()+"__"+selector.replace(/:/g,"_"));
}
_668.jsBuffer.concat("(self, _cmd");
_66b.methodType=node.methodtype;
_66b.vars["self"]={type:"method base",scope:_66b};
_66b.vars["_cmd"]={type:"method base",scope:_66b};
if(nodeArguments){
for(var i=0;i<nodeArguments.length;i++){
var _66e=nodeArguments[i],_673=_66e.identifier.name;
_668.jsBuffer.concat(", ");
_668.jsBuffer.concat(_673);
_66b.vars[_673]={type:"method argument",node:_66e};
}
}
_668.jsBuffer.concat(")\n");
if(!_669){
_668.lastPos=node.startOfBody;
}
_5b9+=_5b8;
_66b.endOfScopeBody=true;
c(node.body,_66b,"Statement");
_5b9=_5b9.substring(_5b7);
if(!_669){
_668.jsBuffer.concat(_668.source.substring(_668.lastPos,node.body.end));
}
_668.jsBuffer.concat("\n");
}else{
_668.jsBuffer.concat("Nil\n");
}
if(_668.flags&_55a.Flags.IncludeTypeSignatures){
_668.jsBuffer.concat(","+JSON.stringify(types));
}
_668.jsBuffer.concat(")");
_668.jsBuffer=_66a;
if(!_669){
_668.lastPos=node.end;
}
var def=st.classDef,_674;
if(def){
_674=_66c?def.getInstanceMethod(selector):def.getClassMethod(selector);
}else{
def=st.protocolDef;
}
if(!def){
throw "InternalError: MethodDeclaration without ClassDeclaration or ProtocolDeclaration at line: "+_2.acorn.getLineInfo(_668.source,node.start).line;
}
if(!_674){
var _675=def.protocols;
if(_675){
for(var i=0,size=_675.length;i<size;i++){
var _676=_675[i],_674=_66c?_676.getInstanceMethod(selector):_676.getClassMethod(selector);
if(_674){
break;
}
}
}
}
if(_674){
var _677=_674.types;
if(_677){
var _678=_677.length;
if(_678>0){
var _679=_677[0];
if(_679!==types[0]&&!(_679==="id"&&returnType&&returnType.typeisclass)){
_668.addWarning(_51f("Conflicting return type in implementation of '"+selector+"': '"+_679+"' vs '"+types[0]+"'",returnType||node.action||selectors[0],_668.source));
}
for(var i=1;i<_678;i++){
var _67a=_677[i];
if(_67a!==types[i]&&!(_67a==="id"&&nodeArguments[i-1].type.typeisclass)){
_668.addWarning(_51f("Conflicting parameter types in implementation of '"+selector+"': '"+_67a+"' vs '"+types[i]+"'",nodeArguments[i-1].type||nodeArguments[i-1].identifier,_668.source));
}
}
}
}
}
var _67b=new _554(selector,types);
if(_66c){
def.addInstanceMethod(_67b);
}else{
def.addClassMethod(_67b);
}
},MessageSendExpression:function(node,st,c){
var _67c=st.compiler,_67d=_67c.generate,_67e=_67c.flags&_55a.Flags.InlineMsgSend,_67f=_67c.jsBuffer,_680=node.object,_681=node.selectors,_682=node.arguments,_683=_682.length,_684=_681[0],_685=_684?_684.name:"";
for(var i=0;i<_683;i++){
if(i===0){
_685+=":";
}else{
_685+=(_681[i]?_681[i].name:"")+":";
}
}
if(!_67d){
_67f.concat(_67c.source.substring(_67c.lastPos,node.start));
_67c.lastPos=_680?_680.start:node.arguments.length?node.arguments[0].start:node.end;
}else{
if(!_67e){
var _686=_683;
if(node.parameters){
_686+=node.parameters.length;
}
}
}
if(node.superObject){
if(!_67d){
_67f.concat(" ");
}
if(_67e){
_67f.concat("(");
_67f.concat(st.currentMethodType()==="+"?_67c.currentSuperMetaClass:_67c.currentSuperClass);
_67f.concat(".method_dtable[\"");
_67f.concat(_685);
_67f.concat("\"] || _objj_forward)(self");
}else{
_67f.concat("objj_msgSendSuper");
if(_686<4){
_67f.concat(""+_686);
}
_67f.concat("({ receiver:self, super_class:"+(st.currentMethodType()==="+"?_67c.currentSuperMetaClass:_67c.currentSuperClass)+" }");
}
}else{
if(_67d){
var _687=_680.type==="Identifier"&&!(st.currentMethodType()==="-"&&_67c.getIvarForClass(_680.name,st)&&!st.getLvar(_680.name,true)),_688,_689;
if(_687){
var name=_680.name,_688=st.getLvar(name);
if(name==="self"){
_689=!_688||!_688.scope||_688.scope.assignmentToSelf;
}else{
_689=!!_688||!_67c.getClassDef(name);
}
if(_689){
_67f.concat("(");
c(_680,st,"Expression");
_67f.concat(" == null ? null : ");
}
if(_67e){
_67f.concat("(");
}
c(_680,st,"Expression");
}else{
_689=true;
if(!st.receiverLevel){
st.receiverLevel=0;
}
_67f.concat("((___r");
_67f.concat(++st.receiverLevel+"");
_67f.concat(" = ");
c(_680,st,"Expression");
_67f.concat("), ___r");
_67f.concat(st.receiverLevel+"");
_67f.concat(" == null ? null : ");
if(_67e){
_67f.concat("(");
}
_67f.concat("___r");
_67f.concat(st.receiverLevel+"");
if(!(st.maxReceiverLevel>=st.receiverLevel)){
st.maxReceiverLevel=st.receiverLevel;
}
}
if(_67e){
_67f.concat(".isa.method_msgSend[\"");
_67f.concat(_685);
_67f.concat("\"] || _objj_forward)");
}else{
_67f.concat(".isa.objj_msgSend");
}
}else{
_67f.concat(" ");
_67f.concat("objj_msgSend(");
_67f.concat(_67c.source.substring(_67c.lastPos,_680.end));
}
}
if(_67d&&!node.superObject){
if(!_67e){
if(_686<4){
_67f.concat(""+_686);
}
}
if(_687){
_67f.concat("(");
c(_680,st,"Expression");
}else{
_67f.concat("(___r");
_67f.concat(st.receiverLevel+"");
}
}
_67f.concat(", \"");
_67f.concat(_685);
_67f.concat("\"");
if(node.arguments){
for(var i=0;i<node.arguments.length;i++){
var _68a=node.arguments[i];
_67f.concat(", ");
if(!_67d){
_67c.lastPos=_68a.start;
}
c(_68a,st,"Expression");
if(!_67d){
_67f.concat(_67c.source.substring(_67c.lastPos,_68a.end));
_67c.lastPos=_68a.end;
}
}
}
if(node.parameters){
for(var i=0;i<node.parameters.length;++i){
var _68b=node.parameters[i];
_67f.concat(", ");
if(!_67d){
_67c.lastPos=_68b.start;
}
c(_68b,st,"Expression");
if(!_67d){
_67f.concat(_67c.source.substring(_67c.lastPos,_68b.end));
_67c.lastPos=_68b.end;
}
}
}
if(_67d&&!node.superObject){
if(_689){
_67f.concat(")");
}
if(!_687){
st.receiverLevel--;
}
}
_67f.concat(")");
if(!_67d){
_67c.lastPos=node.end;
}
},SelectorLiteralExpression:function(node,st,c){
var _68c=st.compiler,_68d=_68c.jsBuffer,_68e=_68c.generate;
if(!_68e){
_68d.concat(_68c.source.substring(_68c.lastPos,node.start));
_68d.concat(" ");
}
_68d.concat("sel_getUid(\"");
_68d.concat(node.selector);
_68d.concat("\")");
if(!_68e){
_68c.lastPos=node.end;
}
},ProtocolLiteralExpression:function(node,st,c){
var _68f=st.compiler,_690=_68f.jsBuffer,_691=_68f.generate;
if(!_691){
_690.concat(_68f.source.substring(_68f.lastPos,node.start));
_690.concat(" ");
}
_690.concat("objj_getProtocol(\"");
_690.concat(node.id.name);
_690.concat("\")");
if(!_691){
_68f.lastPos=node.end;
}
},Reference:function(node,st,c){
var _692=st.compiler,_693=_692.jsBuffer,_694=_692.generate;
if(!_694){
_693.concat(_692.source.substring(_692.lastPos,node.start));
_693.concat(" ");
}
_693.concat("function(__input) { if (arguments.length) return ");
c(node.element,st,"Expression");
_693.concat(" = __input; return ");
c(node.element,st,"Expression");
_693.concat("; }");
if(!_694){
_692.lastPos=node.end;
}
},Dereference:function(node,st,c){
var _695=st.compiler,_696=_695.generate;
_5aa(st,node.expr);
if(!_696){
_695.jsBuffer.concat(_695.source.substring(_695.lastPos,node.start));
_695.lastPos=node.expr.start;
}
c(node.expr,st,"Expression");
if(!_696){
_695.jsBuffer.concat(_695.source.substring(_695.lastPos,node.expr.end));
}
_695.jsBuffer.concat("()");
if(!_696){
_695.lastPos=node.end;
}
},ClassStatement:function(node,st,c){
var _697=st.compiler;
if(!_697.generate){
_697.jsBuffer.concat(_697.source.substring(_697.lastPos,node.start));
_697.lastPos=node.start;
_697.jsBuffer.concat("//");
}
var _698=node.id.name;
if(_697.getTypeDef(_698)){
throw _697.error_message(_698+" is already declared as a type",node.id);
}
if(!_697.getClassDef(_698)){
classDef=new _522(false,_698);
_697.classDefs[_698]=classDef;
}
st.vars[node.id.name]={type:"class",node:node.id};
},GlobalStatement:function(node,st,c){
var _699=st.compiler;
if(!_699.generate){
_699.jsBuffer.concat(_699.source.substring(_699.lastPos,node.start));
_699.lastPos=node.start;
_699.jsBuffer.concat("//");
}
st.rootScope().vars[node.id.name]={type:"global",node:node.id};
},PreprocessStatement:function(node,st,c){
var _69a=st.compiler;
if(!_69a.generate){
_69a.jsBuffer.concat(_69a.source.substring(_69a.lastPos,node.start));
_69a.lastPos=node.start;
_69a.jsBuffer.concat("//");
}
},TypeDefStatement:function(node,st,c){
var _69b=st.compiler,_69c=_69b.generate,_69d=_69b.jsBuffer,_69e=node.typedefname.name,_69f=_69b.getTypeDef(_69e),_6a0=new _515(st);
if(_69f){
throw _69b.error_message("Duplicate type definition "+_69e,node.typedefname);
}
if(_69b.getClassDef(_69e)){
throw _69b.error_message(_69e+" is already declared as class",node.typedefname);
}
_69b.imBuffer=new _2f1();
_69b.cmBuffer=new _2f1();
if(!_69c){
_69d.concat(_69b.source.substring(_69b.lastPos,node.start));
}
_69d.concat("{var the_typedef = objj_allocateTypeDef(\""+_69e+"\");");
_69f=new _553(_69e);
_69b.typeDefs[_69e]=_69f;
_6a0.typeDef=_69f;
_69d.concat("\nobjj_registerTypeDef(the_typedef);\n");
_69d.concat("}");
_69b.jsBuffer=_69d;
if(!_69c){
_69b.lastPos=node.end;
}
}});
function _32f(aURL,_6a1){
this._URL=aURL;
this._isLocal=_6a1;
};
_2.FileDependency=_32f;
_32f.prototype.URL=function(){
return this._URL;
};
_32f.prototype.isLocal=function(){
return this._isLocal;
};
_32f.prototype.toMarkedString=function(){
var _6a2=this.URL().absoluteString();
return (this.isLocal()?_264:_263)+";"+_6a2.length+";"+_6a2;
};
_32f.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _6a3=0,_6a4=1,_6a5=2,_6a6=0;
function _300(_6a7,_6a8,aURL,_6a9,_6aa,_6ab){
if(arguments.length===0){
return this;
}
this._code=_6a7;
this._function=_6a9||null;
this._URL=_1e2(aURL||new CFURL("(Anonymous"+(_6a6++)+")"));
this._compiler=_6aa||null;
this._fileDependencies=_6a8;
this._filenameTranslateDictionary=_6ab;
if(_6a8.length){
this._fileDependencyStatus=_6a3;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_6a5;
}
if(this._function){
return;
}
if(!_6aa){
this.setCode(_6a7);
}
};
_2.Executable=_300;
_300.prototype.path=function(){
return this.URL().path();
};
_300.prototype.URL=function(){
return this._URL;
};
_300.prototype.functionParameters=function(){
var _6ac=["global","objj_executeFile","objj_importFile"];
return _6ac;
};
_300.prototype.functionArguments=function(){
var _6ad=[_1,this.fileExecuter(),this.fileImporter()];
return _6ad;
};
_300.prototype.execute=function(){
if(this._compiler){
var _6ae=this.fileDependencies(),_9d=0,_6af=_6ae.length;
this._compiler.pushImport(this.URL().lastPathComponent());
for(;_9d<_6af;++_9d){
var _6b0=_6ae[_9d],_6b1=_6b0.isLocal(),URL=_6b0.URL();
this.fileExecuter()(URL,_6b1);
}
this._compiler.popImport();
this.setCode(this._compiler.compilePass2());
this._compiler=null;
}
var _6b2=_6b3;
_6b3=CFBundle.bundleContainingURL(this.URL());
var _6b4=this._function.apply(_1,this.functionArguments());
_6b3=_6b2;
return _6b4;
};
_300.prototype.code=function(){
return this._code;
};
_300.prototype.setCode=function(code){
this._code=code;
var _6b5=this.functionParameters().join(",");
this._function=new Function(_6b5,code);
};
_300.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_300.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_6a5;
};
var _6b6=0,_6b7=[],_6b8={};
_300.prototype.loadFileDependencies=function(_6b9){
var _6ba=this._fileDependencyStatus;
if(_6b9){
if(_6ba===_6a5){
return _6b9();
}
this._fileDependencyCallbacks.push(_6b9);
}
if(_6ba===_6a3){
if(_6b6){
throw "Can't load";
}
_6bb(this);
}
};
function _6bb(_6bc){
_6b7.push(_6bc);
_6bc._fileDependencyStatus=_6a4;
var _6bd=_6bc.fileDependencies(),_9d=0,_6be=_6bd.length,_6bf=_6bc.referenceURL(),_6c0=_6bf.absoluteString(),_6c1=_6bc.fileExecutableSearcher();
_6b6+=_6be;
for(;_9d<_6be;++_9d){
var _6c2=_6bd[_9d],_6c3=_6c2.isLocal(),URL=_6c2.URL(),_6c4=(_6c3&&(_6c0+" ")||"")+URL;
if(_6b8[_6c4]){
if(--_6b6===0){
_6c5();
}
continue;
}
_6b8[_6c4]=YES;
_6c1(URL,_6c3,_6c6);
}
};
function _6c6(_6c7){
--_6b6;
if(_6c7._fileDependencyStatus===_6a3){
_6bb(_6c7);
}else{
if(_6b6===0){
_6c5();
}
}
};
function _6c5(){
var _6c8=_6b7,_9d=0,_6c9=_6c8.length;
_6b7=[];
for(;_9d<_6c9;++_9d){
_6c8[_9d]._fileDependencyStatus=_6a5;
}
for(_9d=0;_9d<_6c9;++_9d){
var _6ca=_6c8[_9d],_6cb=_6ca._fileDependencyCallbacks,_6cc=0,_6cd=_6cb.length;
for(;_6cc<_6cd;++_6cc){
_6cb[_6cc]();
}
_6ca._fileDependencyCallbacks=[];
}
};
_300.prototype.referenceURL=function(){
if(this._referenceURL===_2f){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_300.prototype.fileImporter=function(){
return _300.fileImporterForURL(this.referenceURL());
};
_300.prototype.fileExecuter=function(){
return _300.fileExecuterForURL(this.referenceURL());
};
_300.prototype.fileExecutableSearcher=function(){
return _300.fileExecutableSearcherForURL(this.referenceURL());
};
var _6ce={};
_300.fileExecuterForURL=function(aURL){
var _6cf=_1e2(aURL),_6d0=_6cf.absoluteString(),_6d1=_6ce[_6d0];
if(!_6d1){
_6d1=function(aURL,_6d2,_6d3){
_300.fileExecutableSearcherForURL(_6cf)(aURL,_6d2,function(_6d4){
if(!_6d4.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_6d4.execute(_6d3);
});
};
_6ce[_6d0]=_6d1;
}
return _6d1;
};
var _6d5={};
_300.fileImporterForURL=function(aURL){
var _6d6=_1e2(aURL),_6d7=_6d6.absoluteString(),_6d8=_6d5[_6d7];
if(!_6d8){
_6d8=function(aURL,_6d9,_6da){
_17b();
_300.fileExecutableSearcherForURL(_6d6)(aURL,_6d9,function(_6db){
_6db.loadFileDependencies(function(){
_6db.execute();
_17c();
if(_6da){
_6da();
}
});
});
};
_6d5[_6d7]=_6d8;
}
return _6d8;
};
var _6dc={},_6dd={};
function _28f(x){
var _6de=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_6de;
}
}
return _6de;
};
_300.resetCachedFileExecutableSearchers=function(){
_6dc={};
_6dd={};
_6d5={};
_6ce={};
_6b8={};
};
_300.fileExecutableSearcherForURL=function(_6df){
var _6e0=_6df.absoluteString(),_6e1=_6dc[_6e0],_6e2=_300.filenameTranslateDictionary?_300.filenameTranslateDictionary():null;
cachedSearchResults={};
if(!_6e1){
_6e1=function(aURL,_6e3,_6e4){
var _6e5=(_6e3&&_6df||"")+aURL,_6e6=_6dd[_6e5];
if(_6e6){
return _6e7(_6e6);
}
var _6e8=(aURL instanceof CFURL)&&aURL.scheme();
if(_6e3||_6e8){
if(!_6e8){
aURL=new CFURL(aURL,_6df);
}
_1cb.resolveResourceAtURL(aURL,NO,_6e7,_6e2);
}else{
_1cb.resolveResourceAtURLSearchingIncludeURLs(aURL,_6e7);
}
function _6e7(_6e9){
if(!_6e9){
var _6ea=_55a?_55a.currentCompileFile:null;
throw new Error("Could not load file at "+aURL+(_6ea?" when compiling "+_6ea:""));
}
_6dd[_6e5]=_6e9;
_6e4(new _6eb(_6e9.URL(),_6e2));
};
};
_6dc[_6e0]=_6e1;
}
return _6e1;
};
var _6ec={};
function _6eb(aURL,_6ed){
aURL=_1e2(aURL);
var _6ee=aURL.absoluteString(),_6ef=_6ec[_6ee];
if(_6ef){
return _6ef;
}
_6ec[_6ee]=this;
var _6f0=_1cb.resourceAtURL(aURL).contents(),_6f1=NULL,_6f2=aURL.pathExtension().toLowerCase();
if(_6f0.match(/^@STATIC;/)){
_6f1=_6f3(_6f0,aURL);
}else{
if((_6f2==="j"||!_6f2)&&!_6f0.match(/^{/)){
_6f1=_2.ObjJAcornCompiler.compileFileDependencies(_6f0,aURL,_2.currentCompilerFlags());
}else{
_6f1=new _300(_6f0,[],aURL);
}
}
_300.apply(this,[_6f1.code(),_6f1.fileDependencies(),aURL,_6f1._function,_6f1._compiler,_6ed]);
this._hasExecuted=NO;
};
_2.FileExecutable=_6eb;
_6eb.prototype=new _300();
_6eb.resetFileExecutables=function(){
_6ec={};
_6f4={};
};
_6eb.prototype.execute=function(_6f5){
if(this._hasExecuted&&!_6f5){
return;
}
this._hasExecuted=YES;
_300.prototype.execute.call(this);
};
_6eb.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _6f3(_6f6,aURL){
var _6f7=new _11d(_6f6);
var _6f8=NULL,code="",_6f9=[];
while(_6f8=_6f7.getMarker()){
var text=_6f7.getString();
if(_6f8===_262){
code+=text;
}else{
if(_6f8===_263){
_6f9.push(new _32f(new CFURL(text),NO));
}else{
if(_6f8===_264){
_6f9.push(new _32f(new CFURL(text),YES));
}
}
}
}
var fn=_6eb._lookupCachedFunction(aURL);
if(fn){
return new _300(code,_6f9,aURL,fn);
}
return new _300(code,_6f9,aURL);
};
var _6f4={};
_6eb._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_6f4[aURL]=fn;
};
_6eb._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _6f4[aURL];
};
var _6fa=1,_6fb=2,_6fc=4,_6fd=8;
objj_ivar=function(_6fe,_6ff){
this.name=_6fe;
this.type=_6ff;
};
objj_method=function(_700,_701,_702){
var _703=_701||function(_704,_705){
CPException.isa.objj_msgSend2(CPException,"raise:reason:",CPInternalInconsistencyException,_704.isa.method_msgSend0(self,"className")+" does not have an implementation for selector '"+_705+"'");
};
_703.method_name=_700;
_703.method_imp=_701;
_703.method_types=_702;
return _703;
};
objj_class=function(_706){
this.isa=NULL;
this.version=0;
this.super_class=NULL;
this.sub_classes=[];
this.name=NULL;
this.info=0;
this.ivar_list=[];
this.ivar_store=function(){
};
this.ivar_dtable=this.ivar_store.prototype;
this.method_list=[];
this.method_store=function(){
};
this.method_dtable=this.method_store.prototype;
this.protocol_list=[];
this.allocator=function(){
};
this._UID=-1;
};
objj_protocol=function(_707){
this.name=_707;
this.instance_methods={};
this.class_methods={};
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
objj_typeDef=function(_708){
this.name=_708;
};
class_getName=function(_709){
if(_709==Nil){
return "";
}
return _709.name;
};
class_isMetaClass=function(_70a){
if(!_70a){
return NO;
}
return ((_70a.info&(_6fb)));
};
class_getSuperclass=function(_70b){
if(_70b==Nil){
return Nil;
}
return _70b.super_class;
};
class_setSuperclass=function(_70c,_70d){
_70c.super_class=_70d;
_70c.isa.super_class=_70d.isa;
};
class_addIvar=function(_70e,_70f,_710){
var _711=_70e.allocator.prototype;
if(typeof _711[_70f]!="undefined"){
return NO;
}
var ivar=new objj_ivar(_70f,_710);
_70e.ivar_list.push(ivar);
_70e.ivar_dtable[_70f]=ivar;
_711[_70f]=NULL;
return YES;
};
class_addIvars=function(_712,_713){
var _714=0,_715=_713.length,_716=_712.allocator.prototype;
for(;_714<_715;++_714){
var ivar=_713[_714],name=ivar.name;
if(typeof _716[name]==="undefined"){
_712.ivar_list.push(ivar);
_712.ivar_dtable[name]=ivar;
_716[name]=NULL;
}
}
};
class_copyIvarList=function(_717){
return _717.ivar_list.slice(0);
};
class_addMethod=function(_718,_719,_71a,_71b){
var _71c=new objj_method(_719,_71a,_71b);
_718.method_list.push(_71c);
_718.method_dtable[_719]=_71c;
if(!((_718.info&(_6fb)))&&(((_718.info&(_6fb)))?_718:_718.isa).isa===(((_718.info&(_6fb)))?_718:_718.isa)){
class_addMethod((((_718.info&(_6fb)))?_718:_718.isa),_719,_71a,_71b);
}
return YES;
};
class_addMethods=function(_71d,_71e){
var _71f=0,_720=_71e.length,_721=_71d.method_list,_722=_71d.method_dtable;
for(;_71f<_720;++_71f){
var _723=_71e[_71f];
_721.push(_723);
_722[_723.method_name]=_723;
}
if(!((_71d.info&(_6fb)))&&(((_71d.info&(_6fb)))?_71d:_71d.isa).isa===(((_71d.info&(_6fb)))?_71d:_71d.isa)){
class_addMethods((((_71d.info&(_6fb)))?_71d:_71d.isa),_71e);
}
};
class_getInstanceMethod=function(_724,_725){
if(!_724||!_725){
return NULL;
}
var _726=_724.method_dtable[_725];
return _726?_726:NULL;
};
class_getInstanceVariable=function(_727,_728){
if(!_727||!_728){
return NULL;
}
var _729=_727.ivar_dtable[_728];
return _729;
};
class_getClassMethod=function(_72a,_72b){
if(!_72a||!_72b){
return NULL;
}
var _72c=(((_72a.info&(_6fb)))?_72a:_72a.isa).method_dtable[_72b];
return _72c?_72c:NULL;
};
class_respondsToSelector=function(_72d,_72e){
return class_getClassMethod(_72d,_72e)!=NULL;
};
class_copyMethodList=function(_72f){
return _72f.method_list.slice(0);
};
class_getVersion=function(_730){
return _730.version;
};
class_setVersion=function(_731,_732){
_731.version=parseInt(_732,10);
};
class_replaceMethod=function(_733,_734,_735){
if(!_733||!_734){
return NULL;
}
var _736=_733.method_dtable[_734],_737=_736.method_imp,_738=new objj_method(_736.method_name,_735,_736.method_types);
_738.displayName=_736.displayName;
_733.method_dtable[_734]=_738;
var _739=_733.method_list.indexOf(_736);
if(_739!==-1){
_733.method_list[_739]=_738;
}else{
_733.method_list.push(_738);
}
return _737;
};
class_addProtocol=function(_73a,_73b){
if(!_73b||class_conformsToProtocol(_73a,_73b)){
return;
}
(_73a.protocol_list||(_73a.protocol_list==[])).push(_73b);
return true;
};
class_conformsToProtocol=function(_73c,_73d){
if(!_73d){
return false;
}
while(_73c){
var _73e=_73c.protocol_list,size=_73e?_73e.length:0;
for(var i=0;i<size;i++){
var p=_73e[i];
if(p.name===_73d.name){
return true;
}
if(protocol_conformsToProtocol(p,_73d)){
return true;
}
}
_73c=class_getSuperclass(_73c);
}
return false;
};
class_copyProtocolList=function(_73f){
var _740=_73f.protocol_list;
return _740?_740.slice(0):[];
};
protocol_conformsToProtocol=function(p1,p2){
if(!p1||!p2){
return false;
}
if(p1.name===p2.name){
return true;
}
var _741=p1.protocol_list,size=_741?_741.length:0;
for(var i=0;i<size;i++){
var p=_741[i];
if(p.name===p2.name){
return true;
}
if(protocol_conformsToProtocol(p,p2)){
return true;
}
}
return false;
};
var _742=Object.create(null);
objj_allocateProtocol=function(_743){
var _744=new objj_protocol(_743);
return _744;
};
objj_registerProtocol=function(_745){
_742[_745.name]=_745;
};
protocol_getName=function(_746){
return _746.name;
};
protocol_addMethodDescription=function(_747,_748,_749,_74a,_74b){
if(!_747||!_748){
return;
}
if(_74a){
(_74b?_747.instance_methods:_747.class_methods)[_748]=new objj_method(_748,null,_749);
}
};
protocol_addMethodDescriptions=function(_74c,_74d,_74e,_74f){
if(!_74e){
return;
}
var _750=0,_751=_74d.length,_752=_74f?_74c.instance_methods:_74c.class_methods;
for(;_750<_751;++_750){
var _753=_74d[_750];
_752[_753.method_name]=_753;
}
};
protocol_copyMethodDescriptionList=function(_754,_755,_756){
if(!_755){
return [];
}
var _757=_756?_754.instance_methods:_754.class_methods,_758=[];
for(var _759 in _757){
if(_757.hasOwnProperty(_759)){
_758.push(_757[_759]);
}
}
return _758;
};
protocol_addProtocol=function(_75a,_75b){
if(!_75a||!_75b){
return;
}
(_75a.protocol_list||(_75a.protocol_list=[])).push(_75b);
};
var _75c=Object.create(null);
objj_allocateTypeDef=function(_75d){
var _75e=new objj_typeDef(_75d);
return _75e;
};
objj_registerTypeDef=function(_75f){
_75c[_75f.name]=_75f;
};
typeDef_getName=function(_760){
return _760.name;
};
var _761=function(_762){
var meta=(((_762.info&(_6fb)))?_762:_762.isa);
if((_762.info&(_6fb))){
_762=objj_getClass(_762.name);
}
if(_762.super_class&&!((((_762.super_class.info&(_6fb)))?_762.super_class:_762.super_class.isa).info&(_6fc))){
_761(_762.super_class);
}
if(!(meta.info&(_6fc))&&!(meta.info&(_6fd))){
meta.info=(meta.info|(_6fd))&~(0);
_762.objj_msgSend=objj_msgSendFast;
_762.objj_msgSend0=objj_msgSendFast0;
_762.objj_msgSend1=objj_msgSendFast1;
_762.objj_msgSend2=objj_msgSendFast2;
_762.objj_msgSend3=objj_msgSendFast3;
meta.objj_msgSend=objj_msgSendFast;
meta.objj_msgSend0=objj_msgSendFast0;
meta.objj_msgSend1=objj_msgSendFast1;
meta.objj_msgSend2=objj_msgSendFast2;
meta.objj_msgSend3=objj_msgSendFast3;
_762.method_msgSend=_762.method_dtable;
meta.method_msgSend=meta.method_dtable;
meta.objj_msgSend0(_762,"initialize");
meta.info=(meta.info|(_6fc))&~(_6fd);
}
};
_objj_forward=function(self,_763){
var isa=self.isa,meta=(((isa.info&(_6fb)))?isa:isa.isa);
if(!(meta.info&(_6fc))&&!(meta.info&(_6fd))){
_761(isa);
}
var _764=isa.method_msgSend[_763];
if(_764){
return _764.apply(isa,arguments);
}
_764=isa.method_dtable[_765];
if(_764){
var _766=_764(self,_765,_763);
if(_766&&_766!==self){
arguments[0]=_766;
return _766.isa.objj_msgSend.apply(_766.isa,arguments);
}
}
_764=isa.method_dtable[_767];
if(_764){
var _768=isa.method_dtable[_769];
if(_768){
var _76a=_764(self,_767,_763);
if(_76a){
var _76b=objj_lookUpClass("CPInvocation");
if(_76b){
var _76c=_76b.isa.objj_msgSend1(_76b,_76d,_76a),_9d=0,_76e=arguments.length;
if(_76c!=null){
var _76f=_76c.isa;
for(;_9d<_76e;++_9d){
_76f.objj_msgSend2(_76c,_770,arguments[_9d],_9d);
}
}
_768(self,_769,_76c);
return _76c==null?null:_76f.objj_msgSend0(_76c,_771);
}
}
}
}
_764=isa.method_dtable[_772];
if(_764){
return _764(self,_772,_763);
}
throw class_getName(isa)+" does not implement doesNotRecognizeSelector:. Did you forget a superclass for "+class_getName(isa)+"?";
};
class_getMethodImplementation=function(_773,_774){
if(!((((_773.info&(_6fb)))?_773:_773.isa).info&(_6fc))){
_761(_773);
}
var _775=_773.method_dtable[_774]||_objj_forward;
return _775;
};
var _776=Object.create(null);
objj_enumerateClassesUsingBlock=function(_777){
for(var key in _776){
_777(_776[key]);
}
};
objj_allocateClassPair=function(_778,_779){
var _77a=new objj_class(_779),_77b=new objj_class(_779),_77c=_77a;
if(_778){
_77c=_778;
while(_77c.superclass){
_77c=_77c.superclass;
}
_77a.allocator.prototype=new _778.allocator;
_77a.ivar_dtable=_77a.ivar_store.prototype=new _778.ivar_store;
_77a.method_dtable=_77a.method_store.prototype=new _778.method_store;
_77b.method_dtable=_77b.method_store.prototype=new _778.isa.method_store;
_77a.super_class=_778;
_77b.super_class=_778.isa;
}else{
_77a.allocator.prototype=new objj_object();
}
_77a.isa=_77b;
_77a.name=_779;
_77a.info=_6fa;
_77a._UID=objj_generateObjectUID();
_77b.isa=_77c.isa;
_77b.name=_779;
_77b.info=_6fb;
_77b._UID=objj_generateObjectUID();
return _77a;
};
var _6b3=nil;
objj_registerClassPair=function(_77d){
_1[_77d.name]=_77d;
_776[_77d.name]=_77d;
_1e9(_77d,_6b3);
};
objj_resetRegisterClasses=function(){
for(var key in _776){
delete _1[key];
}
_776=Object.create(null);
_742=Object.create(null);
_75c=Object.create(null);
_1ec();
};
class_createInstance=function(_77e){
if(!_77e){
throw new Error("*** Attempting to create object with Nil class.");
}
var _77f=new _77e.allocator();
_77f.isa=_77e;
_77f._UID=objj_generateObjectUID();
return _77f;
};
var _780=function(){
};
_780.prototype.member=false;
with(new _780()){
member=true;
}
if(new _780().member){
var _781=class_createInstance;
class_createInstance=function(_782){
var _783=_781(_782);
if(_783){
var _784=_783.isa,_785=_784;
while(_784){
var _786=_784.ivar_list,_787=_786.length;
while(_787--){
_783[_786[_787].name]=NULL;
}
_784=_784.super_class;
}
_783.isa=_785;
}
return _783;
};
}
object_getClassName=function(_788){
if(!_788){
return "";
}
var _789=_788.isa;
return _789?class_getName(_789):"";
};
objj_lookUpClass=function(_78a){
var _78b=_776[_78a];
return _78b?_78b:Nil;
};
objj_getClass=function(_78c){
var _78d=_776[_78c];
if(!_78d){
}
return _78d?_78d:Nil;
};
objj_getClassList=function(_78e,_78f){
for(var _790 in _776){
_78e.push(_776[_790]);
if(_78f&&--_78f===0){
break;
}
}
return _78e.length;
};
objj_getMetaClass=function(_791){
var _792=objj_getClass(_791);
return (((_792.info&(_6fb)))?_792:_792.isa);
};
objj_getProtocol=function(_793){
return _742[_793];
};
objj_getTypeDef=function(_794){
return _75c[_794];
};
ivar_getName=function(_795){
return _795.name;
};
ivar_getTypeEncoding=function(_796){
return _796.type;
};
objj_msgSend=function(_797,_798){
if(_797==nil){
return nil;
}
var isa=_797.isa;
if(!((((isa.info&(_6fb)))?isa:isa.isa).info&(_6fc))){
_761(isa);
}
var _799=isa.method_dtable[_798]||_objj_forward;
switch(arguments.length){
case 2:
return _799(_797,_798);
case 3:
return _799(_797,_798,arguments[2]);
case 4:
return _799(_797,_798,arguments[2],arguments[3]);
}
return _799.apply(_797,arguments);
};
objj_msgSendSuper=function(_79a,_79b){
var _79c=_79a.super_class;
arguments[0]=_79a.receiver;
if(!((((_79c.info&(_6fb)))?_79c:_79c.isa).info&(_6fc))){
_761(_79c);
}
var _79d=_79c.method_dtable[_79b]||_objj_forward;
return _79d.apply(_79a.receiver,arguments);
};
objj_msgSendSuper0=function(_79e,_79f){
return (_79e.super_class.method_dtable[_79f]||_objj_forward)(_79e.receiver,_79f);
};
objj_msgSendSuper1=function(_7a0,_7a1,arg0){
return (_7a0.super_class.method_dtable[_7a1]||_objj_forward)(_7a0.receiver,_7a1,arg0);
};
objj_msgSendSuper2=function(_7a2,_7a3,arg0,arg1){
return (_7a2.super_class.method_dtable[_7a3]||_objj_forward)(_7a2.receiver,_7a3,arg0,arg1);
};
objj_msgSendSuper3=function(_7a4,_7a5,arg0,arg1,arg2){
return (_7a4.super_class.method_dtable[_7a5]||_objj_forward)(_7a4.receiver,_7a5,arg0,arg1,arg2);
};
objj_msgSendFast=function(_7a6,_7a7){
return (this.method_dtable[_7a7]||_objj_forward).apply(_7a6,arguments);
};
var _7a8=function(_7a9,_7aa){
_761(this);
return this.objj_msgSend.apply(this,arguments);
};
objj_msgSendFast0=function(_7ab,_7ac){
return (this.method_dtable[_7ac]||_objj_forward)(_7ab,_7ac);
};
var _7ad=function(_7ae,_7af){
_761(this);
return this.objj_msgSend0(_7ae,_7af);
};
objj_msgSendFast1=function(_7b0,_7b1,arg0){
return (this.method_dtable[_7b1]||_objj_forward)(_7b0,_7b1,arg0);
};
var _7b2=function(_7b3,_7b4,arg0){
_761(this);
return this.objj_msgSend1(_7b3,_7b4,arg0);
};
objj_msgSendFast2=function(_7b5,_7b6,arg0,arg1){
return (this.method_dtable[_7b6]||_objj_forward)(_7b5,_7b6,arg0,arg1);
};
var _7b7=function(_7b8,_7b9,arg0,arg1){
_761(this);
return this.objj_msgSend2(_7b8,_7b9,arg0,arg1);
};
objj_msgSendFast3=function(_7ba,_7bb,arg0,arg1,arg2){
return (this.method_dtable[_7bb]||_objj_forward)(_7ba,_7bb,arg0,arg1,arg2);
};
var _7bc=function(_7bd,_7be,arg0,arg1,arg2){
_761(this);
return this.objj_msgSend3(_7bd,_7be,arg0,arg1,arg2);
};
method_getName=function(_7bf){
return _7bf.method_name;
};
method_copyReturnType=function(_7c0){
var _7c1=_7c0.method_types;
if(_7c1){
var _7c2=_7c1[0];
return _7c2!=NULL?_7c2:NULL;
}else{
return NULL;
}
};
method_copyArgumentType=function(_7c3,_7c4){
switch(_7c4){
case 0:
return "id";
case 1:
return "SEL";
default:
var _7c5=_7c3.method_types;
if(_7c5){
var _7c6=_7c5[_7c4-1];
return _7c6!=NULL?_7c6:NULL;
}else{
return NULL;
}
}
};
method_getNumberOfArguments=function(_7c7){
var _7c8=_7c7.method_types;
return _7c8?_7c8.length+1:((_7c7.method_name.match(/:/g)||[]).length+2);
};
method_getImplementation=function(_7c9){
return _7c9.method_imp;
};
method_setImplementation=function(_7ca,_7cb){
var _7cc=_7ca.method_imp;
_7ca.method_imp=_7cb;
return _7cc;
};
method_exchangeImplementations=function(lhs,rhs){
var _7cd=method_getImplementation(lhs),_7ce=method_getImplementation(rhs);
method_setImplementation(lhs,_7ce);
method_setImplementation(rhs,_7cd);
};
sel_getName=function(_7cf){
return _7cf?_7cf:"<null selector>";
};
sel_getUid=function(_7d0){
return _7d0;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_7d1){
return _7d1;
};
objj_class.prototype.toString=objj_object.prototype.toString=function(){
var isa=this.isa;
if(class_getInstanceMethod(isa,_7d2)){
return isa.objj_msgSend0(this,_7d2);
}
if(class_isMetaClass(isa)){
return this.name;
}
return "["+isa.name+" Object](-description not implemented)";
};
objj_class.prototype.objj_msgSend=_7a8;
objj_class.prototype.objj_msgSend0=_7ad;
objj_class.prototype.objj_msgSend1=_7b2;
objj_class.prototype.objj_msgSend2=_7b7;
objj_class.prototype.objj_msgSend3=_7bc;
objj_class.prototype.method_msgSend=Object.create(null);
var _7d2=sel_getUid("description"),_765=sel_getUid("forwardingTargetForSelector:"),_767=sel_getUid("methodSignatureForSelector:"),_769=sel_getUid("forwardInvocation:"),_772=sel_getUid("doesNotRecognizeSelector:"),_76d=sel_getUid("invocationWithMethodSignature:"),_7d3=sel_getUid("setTarget:"),_7d4=sel_getUid("setSelector:"),_770=sel_getUid("setArgument:atIndex:"),_771=sel_getUid("returnValue");
objj_eval=function(_7d5){
var url=_2.pageURL;
var _7d6=_2.asyncLoader;
_2.asyncLoader=NO;
var _7d7=_2.preprocess(_7d5,url,0);
if(!_7d7.hasLoadedFileDependencies()){
_7d7.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_300.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_300.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_7d7._code+"\n//*/\n}";
var _7d8;
_7d8=eval(code);
_2.asyncLoader=_7d6;
return _7d8;
};
_2.objj_eval=objj_eval;
_17b();
var _7d9=new CFURL(window.location.href),_7da=document.getElementsByTagName("base"),_7db=_7da.length;
if(_7db>0){
var _7dc=_7da[_7db-1],_7dd=_7dc&&_7dc.getAttribute("href");
if(_7dd){
_7d9=new CFURL(_7dd,_7d9);
}
}
if(typeof OBJJ_COMPILER_FLAGS!=="undefined"){
var _7de=0;
for(var i=0;i<OBJJ_COMPILER_FLAGS.length;i++){
var flag=_55a.Flags[OBJJ_COMPILER_FLAGS[i]];
if(flag!=null){
_7de|=flag;
}
}
_2.setCurrentCompilerFlags(_7de);
}
var _7df=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1e8=new CFURL(".",new CFURL(_7df,_7d9)).absoluteURL(),_7e0=new CFURL("..",_1e8).absoluteURL();
if(_1e8===_7e0){
_7e0=new CFURL(_7e0.schemeAndAuthority());
}
_1cb.resourceAtURL(_7e0,YES);
_2.pageURL=_7d9;
_2.bootstrap=function(){
_7e1();
};
function _7e1(){
_1cb.resolveResourceAtURL(_1e8,YES,function(_7e2){
var _7e3=_1cb.includeURLs(),_9d=0,_7e4=_7e3.length;
for(;_9d<_7e4;++_9d){
_7e2.resourceAtURL(_7e3[_9d],YES);
}
_300.fileImporterForURL(_1e8)(_7df.lastPathComponent(),YES,function(){
_17c();
_7ea(function(){
var _7e5=window.location.hash.substring(1),args=[];
if(_7e5.length){
args=_7e5.split("/");
for(var i=0,_7e4=args.length;i<_7e4;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _7e6=window.location.search.substring(1).split("&"),_7e7=new CFMutableDictionary();
for(var i=0,_7e4=_7e6.length;i<_7e4;i++){
var _7e8=_7e6[i].split("=");
if(!_7e8[0]){
continue;
}
if(_7e8[1]==null){
_7e8[1]=true;
}
_7e7.setValueForKey(decodeURIComponent(_7e8[0]),decodeURIComponent(_7e8[1]));
}
main(args,_7e7);
});
});
});
};
var _7e9=NO;
function _7ea(_7eb){
if(_7e9||document.readyState==="complete"){
return _7eb();
}
if(window.addEventListener){
window.addEventListener("load",_7eb,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_7eb);
}
}
};
_7ea(function(){
_7e9=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1e2(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1e8);
};
objj_importFile=_300.fileImporterForURL(_1e8);
objj_executeFile=_300.fileExecuterForURL(_1e8);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
