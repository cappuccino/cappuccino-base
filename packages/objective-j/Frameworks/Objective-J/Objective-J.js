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
var _9f=this;
this._stateChangeHandler=function(){
_b2(_9f);
};
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
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
if(_a1&&(_9b===window.XMLHttpRequest)){
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
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_a7){
this._mimeType=_a7;
};
CFHTTPRequest.prototype.open=function(_a8,_a9,_aa,_ab,_ac){
this._isOpen=true;
this._URL=_a9;
this._async=_aa;
this._method=_a8;
this._user=_ab;
this._password=_ac;
return this._nativeRequest.open(_a8,_a9,_aa,_ab,_ac);
};
CFHTTPRequest.prototype.send=function(_ad){
if(!this._isOpen){
delete this._nativeRequest.onreadystatechange;
this._nativeRequest.open(this._method,this._URL,this._async,this._user,this._password);
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
return this._nativeRequest.send(_ad);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
this._isOpen=false;
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_ae,_af){
this._eventDispatcher.addEventListener(_ae,_af);
};
CFHTTPRequest.prototype.removeEventListener=function(_b0,_b1){
this._eventDispatcher.removeEventListener(_b0,_b1);
};
function _b2(_b3){
var _b4=_b3._eventDispatcher;
_b4.dispatchEvent({type:"readystatechange",request:_b3});
var _b5=_b3._nativeRequest,_b6=["uninitialized","loading","loaded","interactive","complete"];
if(_b6[_b3.readyState()]==="complete"){
var _b7="HTTP"+_b3.status();
_b4.dispatchEvent({type:_b7,request:_b3});
var _b8=_b3.success()?"success":"failure";
_b4.dispatchEvent({type:_b8,request:_b3});
_b4.dispatchEvent({type:_b6[_b3.readyState()],request:_b3});
}else{
_b4.dispatchEvent({type:_b6[_b3.readyState()],request:_b3});
}
};
function _b9(_ba,_bb,_bc,_bd){
var _be=new CFHTTPRequest();
if(_ba.pathExtension()==="plist"){
_be.overrideMimeType("text/xml");
}
var _bf=0,_c0=null;
function _c1(_c2){
_bd(_c2.loaded-_bf);
_bf=_c2.loaded;
};
function _c3(_c4){
if(_bd&&_c0===null){
_bd(_c4.request.responseText().length);
}
_bb(_c4);
};
if(_2.asyncLoader){
_be.onsuccess=_94(_c3);
_be.onfailure=_94(_bc);
}else{
_be.onsuccess=_c3;
_be.onfailure=_bc;
}
if(_bd){
var _c5=true;
if(document.all){
_c5=!!window.atob;
}
if(_c5){
try{
_c0=_2.asyncLoader?_94(_c1):_c1;
_be._nativeRequest.onprogress=_c0;
}
catch(anException){
_c0=null;
}
}
}
_be.open("GET",_ba.absoluteString(),_2.asyncLoader);
_be.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_94;
_2.determineAndDispatchHTTPRequestEvents=_b2;
var _c6=0;
objj_generateObjectUID=function(){
return _c6++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_c7){
if(_c7.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_c7.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_c8,_c9){
var _ca=new CFMutableData();
_ca.setRawString(CFPropertyList.stringFromPropertyList(_c8,_c9));
return _ca;
};
CFPropertyList.stringFromPropertyList=function(_cb,_cc){
if(!_cc){
_cc=CFPropertyList.Format280North_v1_0;
}
var _cd=_ce[_cc];
return _cd["start"]()+_cf(_cb,_cd)+_cd["finish"]();
};
function _cf(_d0,_d1){
var _d2=typeof _d0,_d3=_d0.valueOf(),_d4=typeof _d3;
if(_d2!==_d4){
_d2=_d4;
_d0=_d3;
}
if(_d0===YES||_d0===NO){
_d2="boolean";
}else{
if(_d2==="number"){
if(FLOOR(_d0)===_d0&&(""+_d0).indexOf("e")==-1){
_d2="integer";
}else{
_d2="real";
}
}else{
if(_d2!=="string"){
if(_d0.slice){
_d2="array";
}else{
_d2="dictionary";
}
}
}
}
return _d1[_d2](_d0,_d1);
};
var _ce={};
_ce[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_d5){
return "<string>"+_d6(_d5)+"</string>";
},"boolean":function(_d7){
return _d7?"<true/>":"<false/>";
},"integer":function(_d8){
return "<integer>"+_d8+"</integer>";
},"real":function(_d9){
return "<real>"+_d9+"</real>";
},"array":function(_da,_db){
var _dc=0,_dd=_da.length,_de="<array>";
for(;_dc<_dd;++_dc){
_de+=_cf(_da[_dc],_db);
}
return _de+"</array>";
},"dictionary":function(_df,_e0){
var _e1=_df._keys,_9d=0,_e2=_e1.length,_e3="<dict>";
for(;_9d<_e2;++_9d){
var key=_e1[_9d];
_e3+="<key>"+key+"</key>";
_e3+=_cf(_df.valueForKey(key),_e0);
}
return _e3+"</dict>";
}};
var _e4="A",_e5="D",_e6="f",_e7="d",_e8="S",_e9="T",_ea="F",_eb="K",_ec="E";
_ce[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_ed){
return _e8+";"+_ed.length+";"+_ed;
},"boolean":function(_ee){
return (_ee?_e9:_ea)+";";
},"integer":function(_ef){
var _f0=""+_ef;
return _e7+";"+_f0.length+";"+_f0;
},"real":function(_f1){
var _f2=""+_f1;
return _e6+";"+_f2.length+";"+_f2;
},"array":function(_f3,_f4){
var _f5=0,_f6=_f3.length,_f7=_e4+";";
for(;_f5<_f6;++_f5){
_f7+=_cf(_f3[_f5],_f4);
}
return _f7+_ec+";";
},"dictionary":function(_f8,_f9){
var _fa=_f8._keys,_9d=0,_fb=_fa.length,_fc=_e5+";";
for(;_9d<_fb;++_9d){
var key=_fa[_9d];
_fc+=_eb+";"+key.length+";"+key;
_fc+=_cf(_f8.valueForKey(key),_f9);
}
return _fc+_ec+";";
}};
var _fd="xml",_fe="#document",_ff="plist",_100="key",_101="dict",_102="array",_103="string",_104="date",_105="true",_106="false",_107="real",_108="integer",_109="data";
var _10a=function(_10b){
var text="",_9d=0,_10c=_10b.length;
for(;_9d<_10c;++_9d){
var node=_10b[_9d];
if(node.nodeType===3||node.nodeType===4){
text+=node.nodeValue;
}else{
if(node.nodeType!==8){
text+=_10a(node.childNodes);
}
}
}
return text;
};
var _10d=function(_10e,_10f,_110){
var node=_10e;
node=(node.firstChild);
if(node!==NULL&&((node.nodeType)===8||(node.nodeType)===3)){
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
}
if(node){
return node;
}
if((String(_10e.nodeName))===_102||(String(_10e.nodeName))===_101){
_110.pop();
}else{
if(node===_10f){
return NULL;
}
node=_10e;
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
if(node){
return node;
}
}
node=_10e;
while(node){
var next=node;
while((next=(next.nextSibling))&&((next.nodeType)===8||(next.nodeType)===3)){
}
if(next){
return next;
}
var node=(node.parentNode);
if(_10f&&node===_10f){
return NULL;
}
_110.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_111,_112){
return CFPropertyList.propertyListFromString(_111.rawString(),_112);
};
CFPropertyList.propertyListFromString=function(_113,_114){
if(!_114){
_114=CFPropertyList.sniffedFormatOfString(_113);
}
if(_114===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_113);
}
if(_114===CFPropertyList.Format280North_v1_0){
return _115(_113);
}
return NULL;
};
var _e4="A",_e5="D",_e6="f",_e7="d",_e8="S",_e9="T",_ea="F",_eb="K",_ec="E";
function _115(_116){
var _117=new _118(_116),_119=NULL,key="",_11a=NULL,_11b=NULL,_11c=[],_11d=NULL;
while(_119=_117.getMarker()){
if(_119===_ec){
_11c.pop();
continue;
}
var _11e=_11c.length;
if(_11e){
_11d=_11c[_11e-1];
}
if(_119===_eb){
key=_117.getString();
_119=_117.getMarker();
}
switch(_119){
case _e4:
_11a=[];
_11c.push(_11a);
break;
case _e5:
_11a=new CFMutableDictionary();
_11c.push(_11a);
break;
case _e6:
_11a=parseFloat(_117.getString());
break;
case _e7:
_11a=parseInt(_117.getString(),10);
break;
case _e8:
_11a=_117.getString();
break;
case _e9:
_11a=YES;
break;
case _ea:
_11a=NO;
break;
default:
throw new Error("*** "+_119+" marker not recognized in Plist.");
}
if(!_11b){
_11b=_11a;
}else{
if(_11d){
if(_11d.slice){
_11d.push(_11a);
}else{
_11d.setValueForKey(key,_11a);
}
}
}
}
return _11b;
};
function _d6(_11f){
return _11f.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _120(_121){
return _121.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _a2(_122){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_122,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _123=_122.match(CFPropertyList.DTDRE);
if(_123){
_122=_122.substr(_123[0].length);
}
XMLNode.loadXML(_122);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_124){
var _125=_124;
if(_124.valueOf&&typeof _124.valueOf()==="string"){
_125=_a2(_124);
}
while(((String(_125.nodeName))===_fe)||((String(_125.nodeName))===_fd)){
_125=(_125.firstChild);
}
if(_125!==NULL&&((_125.nodeType)===8||(_125.nodeType)===3)){
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
if(((_125.nodeType)===10)){
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
if(!((String(_125.nodeName))===_ff)){
return NULL;
}
var key="",_126=NULL,_127=NULL,_128=_125,_129=[],_12a=NULL;
while(_125=_10d(_125,_128,_129)){
var _12b=_129.length;
if(_12b){
_12a=_129[_12b-1];
}
if((String(_125.nodeName))===_100){
key=(_125.textContent||(_125.textContent!==""&&_10a([_125])));
while((_125=(_125.nextSibling))&&((_125.nodeType)===8||(_125.nodeType)===3)){
}
}
switch(String((String(_125.nodeName)))){
case _102:
_126=[];
_129.push(_126);
break;
case _101:
_126=new CFMutableDictionary();
_129.push(_126);
break;
case _107:
_126=parseFloat((_125.textContent||(_125.textContent!==""&&_10a([_125]))));
break;
case _108:
_126=parseInt((_125.textContent||(_125.textContent!==""&&_10a([_125]))),10);
break;
case _103:
if((_125.getAttribute("type")==="base64")){
_126=(_125.firstChild)?CFData.decodeBase64ToString((_125.textContent||(_125.textContent!==""&&_10a([_125])))):"";
}else{
_126=_120((_125.firstChild)?(_125.textContent||(_125.textContent!==""&&_10a([_125]))):"");
}
break;
case _104:
var _12c=Date.parseISO8601((_125.textContent||(_125.textContent!==""&&_10a([_125]))));
_126=isNaN(_12c)?new Date():new Date(_12c);
break;
case _105:
_126=YES;
break;
case _106:
_126=NO;
break;
case _109:
_126=new CFMutableData();
var _12d=(_125.firstChild)?CFData.decodeBase64ToArray((_125.textContent||(_125.textContent!==""&&_10a([_125]))),YES):[];
_126.setBytes(_12d);
break;
default:
throw new Error("*** "+(String(_125.nodeName))+" tag not recognized in Plist.");
}
if(!_127){
_127=_126;
}else{
if(_12a){
if(_12a.slice){
_12a.push(_126);
}else{
_12a.setValueForKey(key,_126);
}
}
}
}
return _127;
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
CFPropertyListCreateXMLData=function(_12e){
return CFPropertyList.dataFromPropertyList(_12e,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_12f){
return CFPropertyList.dataFromPropertyList(_12f,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_130){
return CFPropertyList.propertyListFromData(data,_130);
};
CPPropertyListCreateData=function(_131,_132){
return CFPropertyList.dataFromPropertyList(_131,_132);
};
CFDictionary=function(_133){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _134=Array.prototype.indexOf,_82=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _135=new CFMutableDictionary(),keys=this._keys,_136=this._count;
_135._keys=keys.slice();
_135._count=_136;
var _137=0,_138=this._buckets,_139=_135._buckets;
for(;_137<_136;++_137){
var key=keys[_137];
_139[key]=_138[key];
}
return _135;
};
CFDictionary.prototype.containsKey=function(aKey){
return _82.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_13a){
var keys=this._keys,_13b=this._buckets,_9d=0,_13c=keys.length;
for(;_9d<_13c;++_9d){
if(_13b[keys[_9d]]===_13a){
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
CFDictionary.prototype.countOfValue=function(_13d){
var keys=this._keys,_13e=this._buckets,_9d=0,_13f=keys.length,_140=0;
for(;_9d<_13f;++_9d){
if(_13e[keys[_9d]]===_13d){
++_140;
}
}
return _140;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _141=this._buckets;
if(!_82.apply(_141,[aKey])){
return nil;
}
return _141[aKey];
};
CFDictionary.prototype.toString=function(){
var _142="{\n",keys=this._keys,_9d=0,_143=this._count;
for(;_9d<_143;++_9d){
var key=keys[_9d];
_142+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _142+"}";
};
CFMutableDictionary=function(_144){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_145){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_145;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _146=-1;
if(_134){
_146=_134.call(this._keys,aKey);
}else{
var keys=this._keys,_9d=0,_147=keys.length;
for(;_9d<_147;++_9d){
if(keys[_9d]===aKey){
_146=_9d;
break;
}
}
}
if(_146===-1){
return;
}
--this._count;
this._keys.splice(_146,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_148){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_148;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_149){
if(_149===nil||_149===_2f){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_149);
}else{
this.addValueForKey(aKey,_149);
}
}
};
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
var _14a=CFData.stringToBytes(this.rawString());
this.setBytes(_14a);
}
return this._bytes;
};
CFData.prototype.base64=function(){
if(this._base64===NULL){
var _14b;
if(this._bytes){
_14b=CFData.encodeBase64Array(this._bytes);
}else{
_14b=CFData.encodeBase64String(this.rawString());
}
this.setBase64String(_14b);
}
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _14c(_14d){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_14e,_14f){
_14c(this);
this._propertyList=_14e;
this._propertyListFormat=_14f;
};
CFMutableData.prototype.setJSONObject=function(_150){
_14c(this);
this._JSONObject=_150;
};
CFMutableData.prototype.setRawString=function(_151){
_14c(this);
this._rawString=_151;
};
CFMutableData.prototype.setBytes=function(_152){
_14c(this);
this._bytes=_152;
};
CFMutableData.prototype.setBase64String=function(_153){
_14c(this);
this._base64=_153;
};
var _154=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_155=[];
for(var i=0;i<_154.length;i++){
_155[_154[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_156,_157){
if(_157){
_156=_156.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_156[_156.length-1]=="="?1:0)+(_156[_156.length-2]=="="?1:0),_158=_156.length,_159=[];
var i=0;
while(i<_158){
var bits=(_155[_156.charCodeAt(i++)]<<18)|(_155[_156.charCodeAt(i++)]<<12)|(_155[_156.charCodeAt(i++)]<<6)|(_155[_156.charCodeAt(i++)]);
_159.push((bits&16711680)>>16);
_159.push((bits&65280)>>8);
_159.push(bits&255);
}
if(pad>0){
return _159.slice(0,-1*pad);
}
return _159;
};
CFData.encodeBase64Array=function(_15a){
var pad=(3-(_15a.length%3))%3,_15b=_15a.length+pad,_15c=[];
if(pad>0){
_15a.push(0);
}
if(pad>1){
_15a.push(0);
}
var i=0;
while(i<_15b){
var bits=(_15a[i++]<<16)|(_15a[i++]<<8)|(_15a[i++]);
_15c.push(_154[(bits&16515072)>>18]);
_15c.push(_154[(bits&258048)>>12]);
_15c.push(_154[(bits&4032)>>6]);
_15c.push(_154[bits&63]);
}
if(pad>0){
_15c[_15c.length-1]="=";
_15a.pop();
}
if(pad>1){
_15c[_15c.length-2]="=";
_15a.pop();
}
return _15c.join("");
};
CFData.decodeBase64ToString=function(_15d,_15e){
return CFData.bytesToString(CFData.decodeBase64ToArray(_15d,_15e));
};
CFData.decodeBase64ToUtf16String=function(_15f,_160){
return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(_15f,_160));
};
CFData.bytesToString=function(_161){
return String.fromCharCode.apply(NULL,_161);
};
CFData.stringToBytes=function(_162){
var temp=[];
for(var i=0;i<_162.length;i++){
temp.push(_162.charCodeAt(i));
}
return temp;
};
CFData.encodeBase64String=function(_163){
var temp=[];
for(var i=0;i<_163.length;i++){
temp.push(_163.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String=function(_164){
var temp=[];
for(var i=0;i<_164.length;i+=2){
temp.push(_164[i+1]<<8|_164[i]);
}
return String.fromCharCode.apply(NULL,temp);
};
CFData.encodeBase64Utf16String=function(_165){
var temp=[];
for(var i=0;i<_165.length;i++){
var c=_165.charCodeAt(i);
temp.push(c&255);
temp.push((c&65280)>>8);
}
return CFData.encodeBase64Array(temp);
};
var _166,_167,_168=0;
function _169(){
if(++_168!==1){
return;
}
_166={};
_167={};
};
function _16a(){
_168=MAX(_168-1,0);
if(_168!==0){
return;
}
delete _166;
delete _167;
};
var _16b=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _16c=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _16d(aURL){
if(aURL._parts){
return aURL._parts;
}
var _16e=aURL.string(),_16f=_16e.match(/^mhtml:/);
if(_16f){
_16e=_16e.substr("mhtml:".length);
}
if(_168>0&&_82.call(_167,_16e)){
aURL._parts=_167[_16e];
return aURL._parts;
}
aURL._parts={};
var _170=aURL._parts,_171=_16b.exec(_16e),_9d=_171.length;
while(_9d--){
_170[_16c[_9d]]=_171[_9d]||NULL;
}
_170.portNumber=parseInt(_170.portNumber,10);
if(isNaN(_170.portNumber)){
_170.portNumber=-1;
}
_170.pathComponents=[];
if(_170.path){
var _172=_170.path.split("/"),_173=_170.pathComponents,_174=_172.length;
for(_9d=0;_9d<_174;++_9d){
var _175=_172[_9d];
if(_175){
_173.push(_175);
}else{
if(_9d===0){
_173.push("/");
}
}
}
_170.pathComponents=_173;
}
if(_16f){
_170.url="mhtml:"+_170.url;
_170.scheme="mhtml:"+_170.scheme;
}
if(_168>0){
_167[_16e]=_170;
}
return _170;
};
CFURL=function(aURL,_176){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_176){
return new CFURL(aURL.absoluteString());
}
var _177=aURL.baseURL();
if(_177){
_176=new CFURL(_177.absoluteURL(),_176);
}
aURL=aURL.string();
}
if(_168>0){
var _178=aURL+" "+(_176&&_176.UID()||"");
if(_82.call(_166,_178)){
return _166[_178];
}
_166[_178]=this;
}
if(aURL.match(/^data:/)){
var _179={},_9d=_16c.length;
while(_9d--){
_179[_16c[_9d]]="";
}
_179.url=aURL;
_179.scheme="data";
_179.pathComponents=[];
this._parts=_179;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_176;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _17a={};
CFURL.prototype.mappedURL=function(){
return _17a[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_17b,_17c){
_17a[_17b.absoluteString()]=_17c;
};
CFURL.prototype.schemeAndAuthority=function(){
var _17d="",_17e=this.scheme();
if(_17e){
_17d+=_17e+":";
}
var _17f=this.authority();
if(_17f){
_17d+="//"+_17f;
}
return _17d;
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
function _180(aURL){
aURL=aURL.standardizedURL();
var _181=aURL.baseURL();
if(!_181){
return aURL;
}
var _182=((aURL)._parts||_16d(aURL)),_183,_184=_181.absoluteURL(),_185=((_184)._parts||_16d(_184));
if(!_182.scheme&&_182.authorityRoot){
_183=_186(_182);
_183.scheme=_181.scheme();
}else{
if(_182.scheme||_182.authority){
_183=_182;
}else{
_183={};
_183.scheme=_185.scheme;
_183.authority=_185.authority;
_183.userInfo=_185.userInfo;
_183.user=_185.user;
_183.password=_185.password;
_183.domain=_185.domain;
_183.portNumber=_185.portNumber;
_183.queryString=_182.queryString;
_183.fragment=_182.fragment;
var _187=_182.pathComponents;
if(_187.length&&_187[0]==="/"){
_183.path=_182.path;
_183.pathComponents=_187;
}else{
var _188=_185.pathComponents,_189=_188.concat(_187);
if(!_181.hasDirectoryPath()&&_188.length){
_189.splice(_188.length-1,1);
}
if(_187.length&&(_187[0]===".."||_187[0]===".")){
_18a(_189,YES);
}
_183.pathComponents=_189;
_183.path=_18b(_189,_187.length<=0||aURL.hasDirectoryPath());
}
}
}
var _18c=_18d(_183),_18e=new CFURL(_18c);
_18e._parts=_183;
_18e._standardizedURL=_18e;
_18e._standardizedString=_18c;
_18e._absoluteURL=_18e;
_18e._absoluteString=_18c;
return _18e;
};
function _18b(_18f,_190){
var path=_18f.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_190){
path+="/";
}
return path;
};
function _18a(_191,_192){
var _193=0,_194=0,_195=_191.length,_196=_192?_191:[],_197=NO;
for(;_193<_195;++_193){
var _198=_191[_193];
if(_198===""){
continue;
}
if(_198==="."){
_197=_194===0;
continue;
}
if(_198!==".."||_194===0||_196[_194-1]===".."){
_196[_194]=_198;
_194++;
continue;
}
if(_194>0&&_196[_194-1]!=="/"){
--_194;
}
}
if(_197&&_194===0){
_196[_194++]=".";
}
_196.length=_194;
return _196;
};
function _18d(_199){
var _19a="",_19b=_199.scheme;
if(_19b){
_19a+=_19b+":";
}
var _19c=_199.authority;
if(_19c){
_19a+="//"+_19c;
}
_19a+=_199.path;
var _19d=_199.queryString;
if(_19d){
_19a+="?"+_19d;
}
var _19e=_199.fragment;
if(_19e){
_19a+="#"+_19e;
}
return _19a;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_2f){
this._absoluteURL=_180(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_2f){
var _19f=((this)._parts||_16d(this)),_1a0=_19f.pathComponents,_1a1=_18a(_1a0,NO);
var _1a2=_18b(_1a1,this.hasDirectoryPath());
if(_19f.path===_1a2){
this._standardizedURL=this;
}else{
var _1a3=_186(_19f);
_1a3.pathComponents=_1a1;
_1a3.path=_1a2;
var _1a4=new CFURL(_18d(_1a3),this.baseURL());
_1a4._parts=_1a3;
_1a4._standardizedURL=_1a4;
this._standardizedURL=_1a4;
}
}
return this._standardizedURL;
};
function _186(_1a5){
var _1a6={},_1a7=_16c.length;
while(_1a7--){
var _1a8=_16c[_1a7];
_1a6[_1a8]=_1a5[_1a8];
}
return _1a6;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _1a9=((this)._parts||_16d(this)).authority;
if(_1a9){
return _1a9;
}
var _1aa=this.baseURL();
return _1aa&&_1aa.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _1ab=this._hasDirectoryPath;
if(_1ab===_2f){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _1ac=this.lastPathComponent();
_1ab=_1ac==="."||_1ac==="..";
this._hasDirectoryPath=_1ab;
}
return _1ab;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_16d(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_2f){
var _1ad=this.pathComponents(),_1ae=_1ad.length;
if(!_1ae){
this._lastPathComponent="";
}else{
this._lastPathComponent=_1ad[_1ae-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_16d(this)).path;
};
CFURL.prototype.createCopyDeletingLastPathComponent=function(){
var _1af=((this)._parts||_16d(this)),_1b0=_18a(_1af.pathComponents,NO);
if(_1b0.length>0){
if(_1b0.length>1||_1b0[0]!=="/"){
_1b0.pop();
}
}
var _1b1=_1b0.length===1&&_1b0[0]==="/";
_1af.pathComponents=_1b0;
_1af.path=_1b1?"/":_18b(_1b0,NO);
return new CFURL(_18d(_1af));
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_16d(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _1b2=this.lastPathComponent();
if(!_1b2){
return NULL;
}
_1b2=_1b2.replace(/^\.*/,"");
var _1b3=_1b2.lastIndexOf(".");
return _1b3<=0?"":_1b2.substring(_1b3+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_16d(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _1b4=this._scheme;
if(_1b4===_2f){
_1b4=((this)._parts||_16d(this)).scheme;
if(!_1b4){
var _1b5=this.baseURL();
_1b4=_1b5&&_1b5.scheme();
}
this._scheme=_1b4;
}
return _1b4;
};
CFURL.prototype.user=function(){
return ((this)._parts||_16d(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_16d(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_16d(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_16d(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _1b6=this.lastPathComponent();
if(_1b6!=="/"){
_1b6="./"+_1b6;
}
return new CFURL(_1b6+"/",this);
};
function _1b7(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _1b7(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_1b8){
_1b7(this).setValueForKey(aKey,_1b8);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_1b9.resourceAtURL(this).contents());
return data;
};
function _118(_1ba){
this._string=_1ba;
var _1bb=_1ba.indexOf(";");
this._magicNumber=_1ba.substr(0,_1bb);
this._location=_1ba.indexOf(";",++_1bb);
this._version=_1ba.substring(_1bb,this._location++);
};
_118.prototype.magicNumber=function(){
return this._magicNumber;
};
_118.prototype.version=function(){
return this._version;
};
_118.prototype.getMarker=function(){
var _1bc=this._string,_1bd=this._location;
if(_1bd>=_1bc.length){
return null;
}
var next=_1bc.indexOf(";",_1bd);
if(next<0){
return null;
}
var _1be=_1bc.substring(_1bd,next);
if(_1be==="e"){
return null;
}
this._location=next+1;
return _1be;
};
_118.prototype.getString=function(){
var _1bf=this._string,_1c0=this._location;
if(_1c0>=_1bf.length){
return null;
}
var next=_1bf.indexOf(";",_1c0);
if(next<0){
return null;
}
var size=parseInt(_1bf.substring(_1c0,next),10),text=_1bf.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _1c1=0,_1c2=1<<0,_1c3=1<<1,_1c4=1<<2,_1c5=1<<3,_1c6=1<<4;
var _1c7={},_1c8={},_1c9={},_1ca=new Date().getTime(),_1cb=0,_1cc=0;
CFBundle=function(aURL){
aURL=_1cd(aURL).asDirectoryPathURL();
var _1ce=aURL.absoluteString(),_1cf=_1c7[_1ce];
if(_1cf){
return _1cf;
}
_1c7[_1ce]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_1c1;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _7d(this);
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1cd(aURL));
var _1d0,_1d1=aURL.absoluteString();
while(!_1d0||_1d0!==_1d1){
var _1d2=_1c7[_1d1];
if(_1d2&&_1d2._isValid){
return _1d2;
}
aURL=new CFURL("..",aURL);
_1d0=_1d1;
_1d1=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1d3);
};
function _1d4(_1d5,_1d6){
if(_1d6){
_1c8[_1d5.name]=_1d6;
}
};
function _1d7(){
_1c7={};
_1c8={};
_1c9={};
_1cb=0;
_1cc=0;
};
CFBundle.bundleForClass=function(_1d8){
return _1c8[_1d8.name]||CFBundle.mainBundle();
};
CFBundle.bundleWithIdentifier=function(_1d9){
return _1c9[_1d9]||NULL;
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL.absoluteURL();
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1da,_1db,_1dc){
if(_1db){
_1da=_1da+"."+_1db;
}
if(_1dc){
_1da=_1dc+"/"+_1da;
}
var _1dd=(new CFURL(_1da,this.resourcesDirectoryURL())).mappedURL();
return _1dd.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_2f){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_2f){
var _1de=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1de){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1de,this.mostEligibleEnvironmentURL());
}
}
return this._executableURL;
};
CFBundle.prototype.infoDictionary=function(){
return this._infoDictionary;
};
CFBundle.prototype.valueForInfoDictionaryKey=function(aKey){
return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.identifier=function(){
return this._infoDictionary.valueForKey("CPBundleIdentifier");
};
CFBundle.prototype.hasSpritedImages=function(){
var _1df=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_9d=_1df.length,_1e0=this.mostEligibleEnvironment();
while(_9d--){
if(_1df[_9d]===_1e0){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1e1){
_1e1=_1e1||this.environments();
var _1e2=CFBundle.environments(),_9d=0,_1e3=_1e2.length,_1e4=_1e1.length;
for(;_9d<_1e3;++_9d){
var _1e5=0,_1e6=_1e2[_9d];
for(;_1e5<_1e4;++_1e5){
if(_1e6===_1e1[_1e5]){
return _1e6;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_1c2;
};
CFBundle.prototype.isLoaded=function(){
return !!(this._loadStatus&_1c6);
};
CFBundle.prototype.load=function(_1e7){
if(this._loadStatus!==_1c1){
return;
}
this._loadStatus=_1c2|_1c3;
var self=this,_1e8=this.bundleURL(),_1e9=new CFURL("..",_1e8);
if(_1e9.absoluteString()===_1e8.absoluteString()){
_1e9=_1e9.schemeAndAuthority();
}
_1b9.resolveResourceAtURL(_1e9,YES,function(_1ea){
var _1eb=_1e8.lastPathComponent();
self._staticResource=_1ea._children[_1eb]||new _1b9(_1e8,_1ea,YES,NO);
function _1ec(_1ed){
self._loadStatus&=~_1c3;
var _1ee=_1ed.request.responsePropertyList();
self._isValid=!!_1ee||CFBundle.mainBundle()===self;
if(_1ee){
self._infoDictionary=_1ee;
var _1ef=self._infoDictionary.valueForKey("CPBundleIdentifier");
if(_1ef){
_1c9[_1ef]=self;
}
}
if(!self._infoDictionary){
_1f1(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1cc=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_1f5(self,_1e7);
};
function _1f0(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_1c1;
_1f1(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _b9(new CFURL("Info.plist",self.bundleURL()),_1ec,_1f0);
});
};
function _1f1(_1f2,_1f3){
_1f4(_1f2._staticResource);
_1f2._eventDispatcher.dispatchEvent({type:"error",error:_1f3,bundle:_1f2});
};
function _1f5(_1f6,_1f7){
if(!_1f6.mostEligibleEnvironment()){
return _1f8();
}
_1f9(_1f6,_1fa,_1f8,_1fb);
_1fc(_1f6,_1fa,_1f8,_1fb);
if(_1f6._loadStatus===_1c2){
return _1fa();
}
function _1f8(_1fd){
var _1fe=_1f6._loadRequests,_1ff=_1fe.length;
while(_1ff--){
_1fe[_1ff].abort();
}
this._loadRequests=[];
_1f6._loadStatus=_1c1;
_1f1(_1f6,_1fd||new Error("Could not recognize executable code format in Bundle "+_1f6));
};
function _1fb(_200){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"){
_1cb+=_200;
var _201=_1cc?MAX(MIN(1,_1cb/_1cc),0):0;
OBJJ_PROGRESS_CALLBACK(_201,_1cc,_1f6.bundlePath());
}
};
function _1fa(){
if(_1f6._loadStatus===_1c2){
_1f6._loadStatus=_1c6;
}else{
return;
}
_1f4(_1f6._staticResource);
function _202(){
_1f6._eventDispatcher.dispatchEvent({type:"load",bundle:_1f6});
};
if(_1f7){
_203(_1f6,_202);
}else{
_202();
}
};
};
function _1f9(_204,_205,_206,_207){
var _208=_204.executableURL();
if(!_208){
return;
}
_204._loadStatus|=_1c4;
new _b9(_208,function(_209){
try{
_20a(_204,_209.request.responseText(),_208);
_204._loadStatus&=~_1c4;
_205();
}
catch(anException){
_206(anException);
}
},_206,_207);
};
function _20b(_20c){
return "mhtml:"+new CFURL("MHTMLTest.txt",_20c.mostEligibleEnvironmentURL());
};
function _20d(_20e){
if(_20f===_210){
return new CFURL("dataURLs.txt",_20e.mostEligibleEnvironmentURL());
}
if(_20f===_211||_20f===_212){
return new CFURL("MHTMLPaths.txt",_20e.mostEligibleEnvironmentURL());
}
return NULL;
};
function _1fc(_213,_214,_215,_216){
if(!_213.hasSpritedImages()){
return;
}
_213._loadStatus|=_1c5;
if(!_217()){
return _218(_20b(_213),function(){
_1fc(_213,_214,_215,_216);
});
}
var _219=_20d(_213);
if(!_219){
_213._loadStatus&=~_1c5;
return _214();
}
new _b9(_219,function(_21a){
try{
_20a(_213,_21a.request.responseText(),_219);
_213._loadStatus&=~_1c5;
_214();
}
catch(anException){
_215(anException);
}
},_215,_216);
};
var _21b=[],_20f=-1,_21c=0,_210=1,_211=2,_212=3;
function _217(){
return _20f!==-1;
};
function _218(_21d,_21e){
if(_217()){
return;
}
_21b.push(_21e);
if(_21b.length>1){
return;
}
_21b.push(function(){
var size=0,_21f=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_21f){
return;
}
switch(_20f){
case _210:
size=_21f.valueForKey("data");
break;
case _211:
case _212:
size=_21f.valueForKey("mhtml");
break;
}
_1cc+=size;
});
_220([_210,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_211,_21d+"!test",_212,_21d+"?"+_1ca+"!test"]);
};
function _221(){
var _222=_21b.length;
while(_222--){
_21b[_222]();
}
};
function _220(_223){
if(!("Image" in _1)||_223.length<2){
_20f=_21c;
_221();
return;
}
var _224=new Image();
_224.onload=function(){
if(_224.width===1&&_224.height===1){
_20f=_223[0];
_221();
}else{
_224.onerror();
}
};
_224.onerror=function(){
_220(_223.slice(2));
};
_224.src=_223[1];
};
function _203(_225,_226){
var _227=[_225._staticResource];
function _228(_229){
for(;_229<_227.length;++_229){
var _22a=_227[_229];
if(_22a.isNotFound()){
continue;
}
if(_22a.isFile()){
var _22b=new _673(_22a.URL());
if(_22b.hasLoadedFileDependencies()){
_22b.execute();
}else{
_22b.loadFileDependencies(function(){
_228(_229);
});
return;
}
}else{
if(_22a.URL().absoluteString()===_225.resourcesDirectoryURL().absoluteString()){
continue;
}
var _22c=_22a.children();
for(var name in _22c){
if(_82.call(_22c,name)){
_227.push(_22c[name]);
}
}
}
}
_226();
};
_228(0);
};
var _22d="@STATIC",_22e="p",_22f="u",_230="c",_231="t",_232="I",_233="i";
function _20a(_234,_235,_236){
var _237=new _118(_235);
if(_237.magicNumber()!==_22d){
throw new Error("Could not read static file: "+_236);
}
if(_237.version()!=="1.0"){
throw new Error("Could not read static file: "+_236);
}
var _238,_239=_234.bundleURL(),file=NULL;
while(_238=_237.getMarker()){
var text=_237.getString();
if(_238===_22e){
var _23a=new CFURL(text,_239),_23b=_1b9.resourceAtURL(new CFURL(".",_23a),YES);
file=new _1b9(_23a,_23b,NO,YES);
}else{
if(_238===_22f){
var URL=new CFURL(text,_239),_23c=_237.getString();
if(_23c.indexOf("mhtml:")===0){
_23c="mhtml:"+new CFURL(_23c.substr("mhtml:".length),_239);
if(_20f===_212){
var _23d=_23c.indexOf("!"),_23e=_23c.substring(0,_23d),_23f=_23c.substring(_23d);
_23c=_23e+"?"+_1ca+_23f;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_23c));
var _23b=_1b9.resourceAtURL(new CFURL(".",URL),YES);
new _1b9(URL,_23b,NO,YES);
}else{
if(_238===_231){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_240,_241){
this._eventDispatcher.addEventListener(_240,_241);
};
CFBundle.prototype.removeEventListener=function(_242,_243){
this._eventDispatcher.removeEventListener(_242,_243);
};
CFBundle.prototype.onerror=function(_244){
throw _244.error;
};
CFBundle.prototype.bundlePath=function(){
return this.bundleURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_245){
return this.resourceURL(_245).absoluteString();
};
var _246={};
function _1b9(aURL,_247,_248,_249,_24a){
this._parent=_247;
this._eventDispatcher=new _7d(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_249;
this._filenameTranslateDictionary=_24a;
if(_248){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_247){
_246[name]=this;
}
this._isDirectory=!!_248;
this._isNotFound=NO;
if(_247){
_247._children[name]=this;
}
if(_248){
this._children={};
}else{
this._contents="";
}
};
_1b9.rootResources=function(){
return _246;
};
function _24b(x){
var _24c=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_24c;
}
}
return _24c;
};
_1b9.resetRootResources=function(){
_246={};
};
_1b9.prototype.filenameTranslateDictionary=function(){
return this._filenameTranslateDictionary||{};
};
_2.StaticResource=_1b9;
function _1f4(_24d){
_24d._isResolved=YES;
_24d._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_24d});
};
_1b9.prototype.resolve=function(){
if(this.isDirectory()){
var _24e=new CFBundle(this.URL());
_24e.onerror=function(){
};
_24e.load(NO);
}else{
var self=this;
function _24f(_250){
self._contents=_250.request.responseText();
_1f4(self);
};
function _251(){
self._isNotFound=YES;
_1f4(self);
};
var url=this.URL(),_252=this.filenameTranslateDictionary();
if(_252){
var _253=url.toString(),_254=url.lastPathComponent(),_255=_253.substring(0,_253.length-_254.length),_256=_252[_254];
if(_256&&_253.slice(-_256.length)!==_256){
url=new CFURL(_255+_256);
}
}
new _b9(url,_24f,_251);
}
};
_1b9.prototype.name=function(){
return this._name;
};
_1b9.prototype.URL=function(){
return this._URL;
};
_1b9.prototype.contents=function(){
return this._contents;
};
_1b9.prototype.children=function(){
return this._children;
};
_1b9.prototype.parent=function(){
return this._parent;
};
_1b9.prototype.isResolved=function(){
return this._isResolved;
};
_1b9.prototype.write=function(_257){
this._contents+=_257;
};
function _258(_259){
var _25a=_259.schemeAndAuthority(),_25b=_246[_25a];
if(!_25b){
_25b=new _1b9(new CFURL(_25a),NULL,YES,YES);
}
return _25b;
};
_1b9.resourceAtURL=function(aURL,_25c){
aURL=_1cd(aURL).absoluteURL();
var _25d=_258(aURL),_25e=aURL.pathComponents(),_9d=0,_25f=_25e.length;
for(;_9d<_25f;++_9d){
var name=_25e[_9d];
if(_82.call(_25d._children,name)){
_25d=_25d._children[name];
}else{
if(_25c){
if(name!=="/"){
name="./"+name;
}
_25d=new _1b9(new CFURL(name,_25d.URL()),_25d,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _25d;
};
_1b9.prototype.resourceAtURL=function(aURL,_260){
return _1b9.resourceAtURL(new CFURL(aURL,this.URL()),_260);
};
_1b9.resolveResourceAtURL=function(aURL,_261,_262,_263){
aURL=_1cd(aURL).absoluteURL();
_264(_258(aURL),_261,aURL.pathComponents(),0,_262,_263);
};
_1b9.prototype.resolveResourceAtURL=function(aURL,_265,_266){
_1b9.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_265,_266);
};
function _264(_267,_268,_269,_26a,_26b,_26c){
var _26d=_269.length;
for(;_26a<_26d;++_26a){
var name=_269[_26a],_26e=_82.call(_267._children,name)&&_267._children[name];
if(!_26e){
_26e=new _1b9(new CFURL(name,_267.URL()),_267,_26a+1<_26d||_268,NO,_26c);
_26e.resolve();
}
if(!_26e.isResolved()){
return _26e.addEventListener("resolve",function(){
_264(_267,_268,_269,_26a,_26b,_26c);
});
}
if(_26e.isNotFound()){
return _26b(null,new Error("File not found: "+_269.join("/")));
}
if((_26a+1<_26d)&&_26e.isFile()){
return _26b(null,new Error("File is not a directory: "+_269.join("/")));
}
_267=_26e;
}
_26b(_267);
};
function _26f(aURL,_270,_271){
var _272=_1b9.includeURLs(),_273=new CFURL(aURL,_272[_270]).absoluteURL();
_1b9.resolveResourceAtURL(_273,NO,function(_274){
if(!_274){
if(_270+1<_272.length){
_26f(aURL,_270+1,_271);
}else{
_271(NULL);
}
return;
}
_271(_274);
});
};
_1b9.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_275){
_26f(aURL,0,_275);
};
_1b9.prototype.addEventListener=function(_276,_277){
this._eventDispatcher.addEventListener(_276,_277);
};
_1b9.prototype.removeEventListener=function(_278,_279){
this._eventDispatcher.removeEventListener(_278,_279);
};
_1b9.prototype.isNotFound=function(){
return this._isNotFound;
};
_1b9.prototype.isFile=function(){
return !this._isDirectory;
};
_1b9.prototype.isDirectory=function(){
return this._isDirectory;
};
_1b9.prototype.toString=function(_27a){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _27b=this.name();
if(this.isDirectory()){
var _27c=this._children;
for(var name in _27c){
if(_27c.hasOwnProperty(name)){
var _27d=_27c[name];
if(_27a||!_27d.isNotFound()){
_27b+="\n\t"+_27c[name].toString(_27a).split("\n").join("\n\t");
}
}
}
}
return _27b;
};
var _27e=NULL;
_1b9.includeURLs=function(){
if(_27e!==NULL){
return _27e;
}
_27e=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_27e=["Frameworks","Frameworks/Debug"];
}else{
_27e=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _27f=_27e.length;
while(_27f--){
_27e[_27f]=new CFURL(_27e[_27f]).asDirectoryPathURL();
}
return _27e;
};
var _280="accessors",_281="class",_282="end",_283="function",_284="implementation",_285="import",_286="each",_287="outlet",_288="action",_289="new",_28a="selector",_28b="super",_28c="var",_28d="in",_28e="pragma",_28f="mark",_290="=",_291="+",_292="-",_293=":",_294=",",_295=".",_296="*",_297=";",_298="<",_299="{",_29a="}",_29b=">",_29c="[",_29d="\"",_29e="@",_29f="#",_2a0="]",_2a1="?",_2a2="(",_2a3=")",_2a4=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_2a5=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_2a6=/^[a-zA-Z_$](\w|$)*$/;
function _2a7(_2a8){
this._index=-1;
this._tokens=(_2a8+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_2a7.prototype.push=function(){
this._context.push(this._index);
};
_2a7.prototype.pop=function(){
this._index=this._context.pop();
};
_2a7.prototype.peek=function(_2a9){
if(_2a9){
this.push();
var _2aa=this.skip_whitespace();
this.pop();
return _2aa;
}
return this._tokens[this._index+1];
};
_2a7.prototype.next=function(){
return this._tokens[++this._index];
};
_2a7.prototype.previous=function(){
return this._tokens[--this._index];
};
_2a7.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_2a7.prototype.skip_whitespace=function(_2ab){
var _2ac;
if(_2ab){
while((_2ac=this.previous())&&_2a4.test(_2ac)){
}
}else{
while((_2ac=this.next())&&_2a4.test(_2ac)){
}
}
return _2ac;
};
_2.Lexer=_2a7;
function _2ad(){
this.atoms=[];
};
_2ad.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_2ae,aURL,_2af){
return new _2b0(_2ae,aURL,_2af).executable();
};
_2.eval=function(_2b1){
return eval(_2.preprocess(_2b1).code());
};
var _2b0=function(_2b2,aURL,_2b3){
this._URL=new CFURL(aURL);
_2b2=_2b2.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _2ad();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _2a7(_2b2);
this._flags=_2b3;
this._classMethod=false;
this._executable=NULL;
this._classLookupTable={};
this._classVars={};
var _2b4=new objj_class();
for(var i in _2b4){
this._classVars[i]=1;
}
this.preprocess(this._tokens,this._buffer);
};
_2b0.prototype.setClassInfo=function(_2b5,_2b6,_2b7){
this._classLookupTable[_2b5]={superClassName:_2b6,ivars:_2b7};
};
_2b0.prototype.getClassInfo=function(_2b8){
return this._classLookupTable[_2b8];
};
_2b0.prototype.allIvarNamesForClassName=function(_2b9){
var _2ba={},_2bb=this.getClassInfo(_2b9);
while(_2bb){
for(var i in _2bb.ivars){
_2ba[i]=1;
}
_2bb=this.getClassInfo(_2bb.superClassName);
}
return _2ba;
};
_2.Preprocessor=_2b0;
_2b0.Flags={};
_2b0.Flags.IncludeDebugSymbols=1<<0;
_2b0.Flags.IncludeTypeSignatures=1<<1;
_2b0.prototype.executable=function(){
if(!this._executable){
this._executable=new _2bc(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_2b0.prototype.accessors=function(_2bd){
var _2be=_2bd.skip_whitespace(),_2bf={};
if(_2be!=_2a2){
_2bd.previous();
return _2bf;
}
while((_2be=_2bd.skip_whitespace())!=_2a3){
var name=_2be,_2c0=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
}
if((_2be=_2bd.skip_whitespace())==_290){
_2c0=_2bd.skip_whitespace();
if(!/^\w+$/.test(_2c0)){
throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
}
if(name=="setter"){
if((_2be=_2bd.next())!=_293){
throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
}
_2c0+=":";
}
_2be=_2bd.skip_whitespace();
}
_2bf[name]=_2c0;
if(_2be==_2a3){
break;
}
if(_2be!=_294){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
}
}
return _2bf;
};
_2b0.prototype.brackets=function(_2c1,_2c2){
var _2c3=[];
while(this.preprocess(_2c1,NULL,NULL,NULL,_2c3[_2c3.length]=[])){
}
if(_2c3[0].length===1){
_2c2.atoms[_2c2.atoms.length]="[";
_2c2.atoms[_2c2.atoms.length]=_2c3[0][0];
_2c2.atoms[_2c2.atoms.length]="]";
}else{
var _2c4=new _2ad();
if(_2c3[0][0].atoms[0]==_28b){
_2c2.atoms[_2c2.atoms.length]="objj_msgSendSuper(";
_2c2.atoms[_2c2.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_2c2.atoms[_2c2.atoms.length]="objj_msgSend(";
_2c2.atoms[_2c2.atoms.length]=_2c3[0][0];
}
_2c4.atoms[_2c4.atoms.length]=_2c3[0][1];
var _2c5=1,_2c6=_2c3.length,_2c7=new _2ad();
for(;_2c5<_2c6;++_2c5){
var pair=_2c3[_2c5];
_2c4.atoms[_2c4.atoms.length]=pair[1];
_2c7.atoms[_2c7.atoms.length]=", "+pair[0];
}
_2c2.atoms[_2c2.atoms.length]=", \"";
_2c2.atoms[_2c2.atoms.length]=_2c4;
_2c2.atoms[_2c2.atoms.length]="\"";
_2c2.atoms[_2c2.atoms.length]=_2c7;
_2c2.atoms[_2c2.atoms.length]=")";
}
};
_2b0.prototype.directive=function(_2c8,_2c9,_2ca){
var _2cb=_2c9?_2c9:new _2ad(),_2cc=_2c8.next();
if(_2cc.charAt(0)==_29d){
_2cb.atoms[_2cb.atoms.length]=_2cc;
}else{
if(_2cc===_281){
_2c8.skip_whitespace();
return;
}else{
if(_2cc===_284){
this.implementation(_2c8,_2cb);
}else{
if(_2cc===_285){
this._import(_2c8);
}else{
if(_2cc===_28a){
this.selector(_2c8,_2cb);
}
}
}
}
}
if(!_2c9){
return _2cb;
}
};
_2b0.prototype.hash=function(_2cd,_2ce){
var _2cf=_2ce?_2ce:new _2ad(),_2d0=_2cd.next();
if(_2d0===_28e){
_2d0=_2cd.skip_whitespace();
if(_2d0===_28f){
while((_2d0=_2cd.next()).indexOf("\n")<0){
}
}
}else{
throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \""+_2d0+"\"."));
}
};
_2b0.prototype.implementation=function(_2d1,_2d2){
var _2d3=_2d2,_2d4="",_2d5=NO,_2d6=_2d1.skip_whitespace(),_2d7="Nil",_2d8=new _2ad(),_2d9=new _2ad();
if(!(/^\w/).test(_2d6)){
throw new Error(this.error_message("*** Expected class name, found \""+_2d6+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_2d6+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_2d6+"\").super_class";
this._currentClass=_2d6;
this._currentSelector="";
if((_2d4=_2d1.skip_whitespace())==_2a2){
_2d4=_2d1.skip_whitespace();
if(_2d4==_2a3){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_2d6+"\"."));
}
if(_2d1.skip_whitespace()!=_2a3){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_2d6+"\"."));
}
_2d3.atoms[_2d3.atoms.length]="{\nvar the_class = objj_getClass(\""+_2d6+"\")\n";
_2d3.atoms[_2d3.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_2d6+"\\\"\");\n";
_2d3.atoms[_2d3.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_2d4==_293){
_2d4=_2d1.skip_whitespace();
if(!_2a6.test(_2d4)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_2d4+"\"."));
}
_2d7=_2d4;
_2d4=_2d1.skip_whitespace();
}
_2d3.atoms[_2d3.atoms.length]="{var the_class = objj_allocateClassPair("+_2d7+", \""+_2d6+"\"),\nmeta_class = the_class.isa;";
if(_2d4==_299){
var _2da={},_2db=0,_2dc=[],_2dd,_2de={},_2df=[];
while((_2d4=_2d1.skip_whitespace())&&_2d4!=_29a){
if(_2d4===_29e){
_2d4=_2d1.next();
if(_2d4===_280){
_2dd=this.accessors(_2d1);
}else{
if(_2d4!==_287){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_2d4+"')."));
}else{
_2df.push("@"+_2d4);
}
}
}else{
if(_2d4==_297){
if(_2db++===0){
_2d3.atoms[_2d3.atoms.length]="class_addIvars(the_class, [";
}else{
_2d3.atoms[_2d3.atoms.length]=", ";
}
var name=_2dc[_2dc.length-1];
if(this._flags&_2b0.Flags.IncludeTypeSignatures){
_2d3.atoms[_2d3.atoms.length]="new objj_ivar(\""+name+"\", \""+_2df.slice(0,_2df.length-1).join(" ")+"\")";
}else{
_2d3.atoms[_2d3.atoms.length]="new objj_ivar(\""+name+"\")";
}
_2da[name]=1;
_2dc=[];
_2df=[];
if(_2dd){
_2de[name]=_2dd;
_2dd=NULL;
}
}else{
_2dc.push(_2d4);
_2df.push(_2d4);
}
}
}
if(_2dc.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_2db){
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
if(!_2d4){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
this.setClassInfo(_2d6,_2d7==="Nil"?null:_2d7,_2da);
var _2da=this.allIvarNamesForClassName(_2d6);
for(ivar_name in _2de){
var _2e0=_2de[ivar_name],_2e1=_2e0["property"]||ivar_name;
var _2e2=_2e0["getter"]||_2e1,_2e3="(id)"+_2e2+"\n{\nreturn "+ivar_name+";\n}";
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=",\n";
}
_2d8.atoms[_2d8.atoms.length]=this.method(new _2a7(_2e3),_2da);
if(_2e0["readonly"]){
continue;
}
var _2e4=_2e0["setter"];
if(!_2e4){
var _2e5=_2e1.charAt(0)=="_"?1:0;
_2e4=(_2e5?"_":"")+"set"+_2e1.substr(_2e5,1).toUpperCase()+_2e1.substring(_2e5+1)+":";
}
var _2e6="(void)"+_2e4+"(id)newValue\n{\n";
if(_2e0["copy"]){
_2e6+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_2e6+=ivar_name+" = newValue;\n}";
}
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=",\n";
}
_2d8.atoms[_2d8.atoms.length]=this.method(new _2a7(_2e6),_2da);
}
}else{
_2d1.previous();
}
_2d3.atoms[_2d3.atoms.length]="objj_registerClassPair(the_class);\n";
}
if(!_2da){
var _2da=this.allIvarNamesForClassName(_2d6);
}
while((_2d4=_2d1.skip_whitespace())){
if(_2d4==_291){
this._classMethod=true;
if(_2d9.atoms.length!==0){
_2d9.atoms[_2d9.atoms.length]=", ";
}
_2d9.atoms[_2d9.atoms.length]=this.method(_2d1,this._classVars);
}else{
if(_2d4==_292){
this._classMethod=false;
if(_2d8.atoms.length!==0){
_2d8.atoms[_2d8.atoms.length]=", ";
}
_2d8.atoms[_2d8.atoms.length]=this.method(_2d1,_2da);
}else{
if(_2d4==_29f){
this.hash(_2d1,_2d3);
}else{
if(_2d4==_29e){
if((_2d4=_2d1.next())==_282){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_2d4+"\"."));
}
}
}
}
}
}
if(_2d8.atoms.length!==0){
_2d3.atoms[_2d3.atoms.length]="class_addMethods(the_class, [";
_2d3.atoms[_2d3.atoms.length]=_2d8;
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
if(_2d9.atoms.length!==0){
_2d3.atoms[_2d3.atoms.length]="class_addMethods(meta_class, [";
_2d3.atoms[_2d3.atoms.length]=_2d9;
_2d3.atoms[_2d3.atoms.length]="]);\n";
}
_2d3.atoms[_2d3.atoms.length]="}";
this._currentClass="";
};
_2b0.prototype._import=function(_2e7){
var _2e8="",_2e9=_2e7.skip_whitespace(),_2ea=(_2e9!==_298);
if(_2e9===_298){
while((_2e9=_2e7.next())&&_2e9!==_29b){
_2e8+=_2e9;
}
if(!_2e9){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_2e9.charAt(0)===_29d){
_2e8=_2e9.substr(1,_2e9.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_2e9+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_2e8;
this._buffer.atoms[this._buffer.atoms.length]=_2ea?"\", YES);":"\", NO);";
this._dependencies.push(new _2eb(new CFURL(_2e8),_2ea));
};
_2b0.prototype.method=function(_2ec,_2ed){
var _2ee=new _2ad(),_2ef,_2f0="",_2f1=[],_2f2=[null];
_2ed=_2ed||{};
while((_2ef=_2ec.skip_whitespace())&&_2ef!==_299&&_2ef!==_297){
if(_2ef==_293){
var type="";
_2f0+=_2ef;
_2ef=_2ec.skip_whitespace();
if(_2ef==_2a2){
while((_2ef=_2ec.skip_whitespace())&&_2ef!=_2a3){
type+=_2ef;
}
_2ef=_2ec.skip_whitespace();
}
_2f2[_2f1.length+1]=type||null;
_2f1[_2f1.length]=_2ef;
if(_2ef in _2ed){
CPLog.warn(this.error_message("*** Warning: Method ( "+_2f0+" ) uses a parameter name that is already in use ( "+_2ef+" )"));
}
}else{
if(_2ef==_2a2){
var type="";
while((_2ef=_2ec.skip_whitespace())&&_2ef!=_2a3){
type+=_2ef;
}
_2f2[0]=type||null;
}else{
if(_2ef==_294){
if((_2ef=_2ec.skip_whitespace())!=_295||_2ec.next()!=_295||_2ec.next()!=_295){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_2f0+=_2ef;
}
}
}
}
if(_2ef===_297){
_2ef=_2ec.skip_whitespace();
if(_2ef!==_299){
throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+"Semi-colons are allowed only to terminate the method signature, before the open brace."));
}
}
var _2f3=0,_2f4=_2f1.length;
_2ee.atoms[_2ee.atoms.length]="new objj_method(sel_getUid(\"";
_2ee.atoms[_2ee.atoms.length]=_2f0;
_2ee.atoms[_2ee.atoms.length]="\"), function";
this._currentSelector=_2f0;
if(this._flags&_2b0.Flags.IncludeDebugSymbols){
_2ee.atoms[_2ee.atoms.length]=" $"+this._currentClass+"__"+_2f0.replace(/:/g,"_");
}
_2ee.atoms[_2ee.atoms.length]="(self, _cmd";
for(;_2f3<_2f4;++_2f3){
_2ee.atoms[_2ee.atoms.length]=", ";
_2ee.atoms[_2ee.atoms.length]=_2f1[_2f3];
}
_2ee.atoms[_2ee.atoms.length]=")\n{ with(self)\n{";
_2ee.atoms[_2ee.atoms.length]=this.preprocess(_2ec,NULL,_29a,_299);
_2ee.atoms[_2ee.atoms.length]="}\n}";
if(this._flags&_2b0.Flags.IncludeDebugSymbols){
_2ee.atoms[_2ee.atoms.length]=","+JSON.stringify(_2f2);
}
_2ee.atoms[_2ee.atoms.length]=")";
this._currentSelector="";
return _2ee;
};
_2b0.prototype.preprocess=function(_2f5,_2f6,_2f7,_2f8,_2f9){
var _2fa=_2f6?_2f6:new _2ad(),_2fb=0,_2fc="";
if(_2f9){
_2f9[0]=_2fa;
var _2fd=false,_2fe=[0,0,0];
}
while((_2fc=_2f5.next())&&((_2fc!==_2f7)||_2fb)){
if(_2f9){
if(_2fc===_2a1){
++_2fe[2];
}else{
if(_2fc===_299){
++_2fe[0];
}else{
if(_2fc===_29a){
--_2fe[0];
}else{
if(_2fc===_2a2){
++_2fe[1];
}else{
if(_2fc===_2a3){
--_2fe[1];
}else{
if((_2fc===_293&&_2fe[2]--===0||(_2fd=(_2fc===_2a0)))&&_2fe[0]===0&&_2fe[1]===0){
_2f5.push();
var _2ff=_2fd?_2f5.skip_whitespace(true):_2f5.previous(),_300=_2a4.test(_2ff);
if(_300||_2a6.test(_2ff)&&_2a4.test(_2f5.previous())){
_2f5.push();
var last=_2f5.skip_whitespace(true),_301=true,_302=false;
if(last==="+"||last==="-"){
if(_2f5.previous()!==last){
_301=false;
}else{
last=_2f5.skip_whitespace(true);
_302=true;
}
}
_2f5.pop();
_2f5.pop();
if(_301&&((!_302&&(last===_29a))||last===_2a3||last===_2a0||last===_295||_2a5.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_2a6.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_300){
_2f9[1]=":";
}else{
_2f9[1]=_2ff;
if(!_2fd){
_2f9[1]+=":";
}
var _2fb=_2fa.atoms.length;
while(_2fa.atoms[_2fb--]!==_2ff){
}
_2fa.atoms.length=_2fb;
}
return !_2fd;
}
if(_2fd){
return NO;
}
}
_2f5.pop();
if(_2fd){
return NO;
}
}
}
}
}
}
}
_2fe[2]=MAX(_2fe[2],0);
}
if(_2f8){
if(_2fc===_2f8){
++_2fb;
}else{
if(_2fc===_2f7){
--_2fb;
}
}
}
if(_2fc===_283){
var _303="";
while((_2fc=_2f5.next())&&_2fc!==_2a2&&!(/^\w/).test(_2fc)){
_303+=_2fc;
}
if(_2fc===_2a2){
if(_2f8===_2a2){
++_2fb;
}
_2fa.atoms[_2fa.atoms.length]="function"+_303+"(";
if(_2f9){
++_2fe[1];
}
}else{
_2fa.atoms[_2fa.atoms.length]=_2fc+" = function";
}
}else{
if(_2fc==_29e){
this.directive(_2f5,_2fa);
}else{
if(_2fc==_29f){
this.hash(_2f5,_2fa);
}else{
if(_2fc==_29c){
this.brackets(_2f5,_2fa);
}else{
_2fa.atoms[_2fa.atoms.length]=_2fc;
}
}
}
}
}
if(_2f9){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_2f6){
return _2fa;
}
};
_2b0.prototype.selector=function(_304,_305){
var _306=_305?_305:new _2ad();
_306.atoms[_306.atoms.length]="sel_getUid(\"";
if(_304.skip_whitespace()!=_2a2){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _307=_304.skip_whitespace();
if(_307==_2a3){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_305.atoms[_305.atoms.length]=_307;
var _308,_309=true;
while((_308=_304.next())&&_308!=_2a3){
if(_309&&/^\d+$/.test(_308)||!(/^(\w|$|\:)/.test(_308))){
if(!(/\S/).test(_308)){
if(_304.skip_whitespace()==_2a3){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_308+"' in @selector()."));
}
}
_306.atoms[_306.atoms.length]=_308;
_309=(_308==_293);
}
_306.atoms[_306.atoms.length]="\")";
if(!_305){
return _306;
}
};
_2b0.prototype.error_message=function(_30a){
return _30a+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
if(typeof _2!="undefined"&&!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_30b){
"use strict";
_30b.version="0.1.01";
var _30c,_30d,_30e,_30f;
_30b.parse=function(inpt,opts){
_30d=String(inpt);
_30e=_30d.length;
_310(opts);
_311();
return _312(_30c.program);
};
var _313=_30b.defaultOptions={ecmaVersion:5,strictSemicolons:false,allowTrailingCommas:true,forbidReserved:false,trackComments:false,trackSpaces:false,locations:false,ranges:false,program:null,sourceFile:null,objj:true,preprocess:true,preprocessAddMacro:_314,preprocessGetMacro:_315,preprocessUndefineMacro:_316,preprocessIsMacro:_317};
function _310(opts){
_30c=opts||{};
for(var opt in _313){
if(!_30c.hasOwnProperty(opt)){
_30c[opt]=_313[opt];
}
}
_30f=_30c.sourceFile||null;
};
var _318;
var _319;
function _314(_31a){
_318[_31a.identifier]=_31a;
_319=null;
};
function _315(_31b){
return _318[_31b];
};
function _316(_31c){
delete _318[_31c];
_319=null;
};
function _317(_31d){
var x=Object.keys(_318).join(" ");
return (_319||(_319=_31e(x)))(_31d);
};
var _31f=_30b.getLineInfo=function(_320,_321){
for(var line=1,cur=0;;){
_322.lastIndex=cur;
var _323=_322.exec(_320);
if(_323&&_323.index<_321){
++line;
cur=_323.index+_323[0].length;
}else{
break;
}
}
return {line:line,column:_321-cur,lineStart:cur,lineEnd:(_323?_323.index+_323[0].length:_320.length)};
};
_30b.tokenize=function(inpt,opts){
_30d=String(inpt);
_30e=_30d.length;
_310(opts);
_311();
var t={};
function _324(_325){
_3cf(_325);
t.start=_32d;
t.end=_32e;
t.startLoc=_32f;
t.endLoc=_330;
t.type=_331;
t.value=_332;
return t;
};
_324.jumpTo=function(pos,_326){
_327=pos;
if(_30c.locations){
_328=_329=_322.lastIndex=0;
var _32a;
while((_32a=_322.exec(_30d))&&_32a.index<pos){
++_328;
_329=_32a.index+_32a[0].length;
}
}
var ch=_30d.charAt(pos-1);
_32b=_326;
_32c();
};
return _324;
};
var _327;
var _32d,_32e;
var _32f,_330;
var _331,_332;
var _333,_334,_335;
var _336,_337,_338;
var _32b,_339,_33a;
var _328,_329,_33b;
var _33c,_33d;
var _33e,_33f,_340;
var _341;
var _342;
var _343,_344,_345;
var _346,_347,_348,_349,_34a;
var _34b,_34c;
var _34d=[];
var _34e=false;
function _34f(pos,_350){
if(typeof pos=="number"){
pos=_31f(_30d,pos);
}
var _351=new SyntaxError(_350);
_351.line=pos.line;
_351.column=pos.column;
_351.lineStart=pos.lineStart;
_351.lineEnd=pos.lineEnd;
_351.fileName=_30f;
throw _351;
};
var _352={type:"num"},_353={type:"regexp"},_354={type:"string"};
var _355={type:"name"},_356={type:"eof"},_357={type:"eol"};
var _358={keyword:"break"},_359={keyword:"case",beforeExpr:true},_35a={keyword:"catch"};
var _35b={keyword:"continue"},_35c={keyword:"debugger"},_35d={keyword:"default"};
var _35e={keyword:"do",isLoop:true},_35f={keyword:"else",beforeExpr:true};
var _360={keyword:"finally"},_361={keyword:"for",isLoop:true},_362={keyword:"function"};
var _363={keyword:"if"},_364={keyword:"return",beforeExpr:true},_365={keyword:"switch"};
var _366={keyword:"throw",beforeExpr:true},_367={keyword:"try"},_368={keyword:"var"};
var _369={keyword:"while",isLoop:true},_36a={keyword:"with"},_36b={keyword:"new",beforeExpr:true};
var _36c={keyword:"this"};
var _36d={keyword:"void",prefix:true,beforeExpr:true};
var _36e={keyword:"null",atomValue:null},_36f={keyword:"true",atomValue:true};
var _370={keyword:"false",atomValue:false};
var _371={keyword:"in",binop:7,beforeExpr:true};
var _372={keyword:"implementation"},_373={keyword:"outlet"},_374={keyword:"accessors"};
var _375={keyword:"end"},_376={keyword:"import",afterImport:true};
var _377={keyword:"action"},_378={keyword:"selector"},_379={keyword:"class"},_37a={keyword:"global"};
var _37b={keyword:"{"},_37c={keyword:"["};
var _37d={keyword:"ref"},_37e={keyword:"deref"};
var _37f={keyword:"protocol"},_380={keyword:"optional"},_381={keyword:"required"};
var _382={keyword:"interface"};
var _383={keyword:"filename"},_384={keyword:"unsigned",okAsIdent:true},_385={keyword:"signed",okAsIdent:true};
var _386={keyword:"byte",okAsIdent:true},_387={keyword:"char",okAsIdent:true},_388={keyword:"short",okAsIdent:true};
var _389={keyword:"int",okAsIdent:true},_38a={keyword:"long",okAsIdent:true},_38b={keyword:"id",okAsIdent:true};
var _38c={keyword:"#"};
var _38d={keyword:"define"};
var _38e={keyword:"undef"};
var _38f={keyword:"ifdef"};
var _390={keyword:"ifndef"};
var _391={keyword:"if"};
var _392={keyword:"else"};
var _393={keyword:"endif"};
var _394={keyword:"elif"};
var _395={keyword:"pragma"};
var _396={keyword:"defined"};
var _397={keyword:"\\"};
var _398={type:"preprocessParamItem"};
var _399={"break":_358,"case":_359,"catch":_35a,"continue":_35b,"debugger":_35c,"default":_35d,"do":_35e,"else":_35f,"finally":_360,"for":_361,"function":_362,"if":_363,"return":_364,"switch":_365,"throw":_366,"try":_367,"var":_368,"while":_369,"with":_36a,"null":_36e,"true":_36f,"false":_370,"new":_36b,"in":_371,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:true},"this":_36c,"typeof":{keyword:"typeof",prefix:true,beforeExpr:true},"void":_36d,"delete":{keyword:"delete",prefix:true,beforeExpr:true}};
var _39a={"IBAction":_377,"IBOutlet":_373,"unsigned":_384,"signed":_385,"byte":_386,"char":_387,"short":_388,"int":_389,"long":_38a,"id":_38b};
var _39b={"implementation":_372,"outlet":_373,"accessors":_374,"end":_375,"import":_376,"action":_377,"selector":_378,"class":_379,"global":_37a,"ref":_37d,"deref":_37e,"protocol":_37f,"optional":_380,"required":_381,"interface":_382};
var _39c={"define":_38d,"pragma":_395,"ifdef":_38f,"ifndef":_390,"undef":_38e,"if":_391,"endif":_393,"else":_392,"elif":_394,"defined":_396};
var _39d={type:"[",beforeExpr:true},_39e={type:"]"},_39f={type:"{",beforeExpr:true};
var _3a0={type:"}"},_3a1={type:"(",beforeExpr:true},_3a2={type:")"};
var _3a3={type:",",beforeExpr:true},_3a4={type:";",beforeExpr:true};
var _3a5={type:":",beforeExpr:true},_3a6={type:"."},_3a7={type:"?",beforeExpr:true};
var _3a8={type:"@"},_3a9={type:"..."},_3aa={type:"#"};
var _3ab={binop:10,beforeExpr:true,preprocess:true},_3ac={isAssign:true,beforeExpr:true,preprocess:true};
var _3ad={isAssign:true,beforeExpr:true},_3ae={binop:9,prefix:true,beforeExpr:true,preprocess:true};
var _3af={postfix:true,prefix:true,isUpdate:true},_3b0={prefix:true,beforeExpr:true};
var _3b1={binop:1,beforeExpr:true,preprocess:true},_3b2={binop:2,beforeExpr:true,preprocess:true};
var _3b3={binop:3,beforeExpr:true,preprocess:true},_3b4={binop:4,beforeExpr:true,preprocess:true};
var _3b5={binop:5,beforeExpr:true,preprocess:true},_3b6={binop:6,beforeExpr:true,preprocess:true};
var _3b7={binop:7,beforeExpr:true,preprocess:true},_3b8={binop:8,beforeExpr:true,preprocess:true};
var _3b9={binop:10,beforeExpr:true,preprocess:true};
_30b.tokTypes={bracketL:_39d,bracketR:_39e,braceL:_39f,braceR:_3a0,parenL:_3a1,parenR:_3a2,comma:_3a3,semi:_3a4,colon:_3a5,dot:_3a6,question:_3a7,slash:_3ab,eq:_3ac,name:_355,eof:_356,num:_352,regexp:_353,string:_354};
for(var kw in _399){
_30b.tokTypes[kw]=_399[kw];
}
function _31e(_3ba){
_3ba=_3ba.split(" ");
var f="",cats=[];
out:
for(var i=0;i<_3ba.length;++i){
for(var j=0;j<cats.length;++j){
if(cats[j][0].length==_3ba[i].length){
cats[j].push(_3ba[i]);
continue out;
}
}
cats.push([_3ba[i]]);
}
function _3bb(arr){
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
_3bb(cat);
}
f+="}";
}else{
_3bb(_3ba);
}
return new Function("str",f);
};
_30b.makePredicate=_31e;
var _3bc=_31e("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");
var _3bd=_31e("class enum extends super const export import");
var _3be=_31e("implements interface let package private protected public static yield");
var _3bf=_31e("eval arguments");
var _3c0=_31e("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this");
var _3c1=_31e("IBAction IBOutlet byte char short int long unsigned signed id");
var _3c2=_31e("define pragma if ifdef ifndef else elif endif defined");
var _3c3=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
var _3c4=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var _3c5="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
var _3c6="ͱ-ʹ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";
var _3c7=new RegExp("["+_3c5+"]");
var _3c8=new RegExp("["+_3c5+_3c6+"]");
var _3c9=/[\n\r\u2028\u2029]/;
var _322=/\r\n|[\n\r\u2028\u2029]/g;
function _3ca(code){
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
return code>=170&&_3c7.test(String.fromCharCode(code));
};
function _3cb(code){
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
return code>=170&&_3c8.test(String.fromCharCode(code));
};
function _3cc(){
this.line=_328;
this.column=_327-_329;
};
function _311(){
_318=Object.create(null);
_328=1;
_327=_329=0;
_32b=true;
_339=null;
_33a=null;
_32c();
};
var _3cd=[_391,_38f,_390,_392,_394,_393];
function _3ce(type,val){
if(type in _3cd){
return _3cf();
}
_32e=_327;
if(_30c.locations){
_330=new _3cc;
}
_331=type;
_32c();
if(_30c.preprocess&&_30d.charCodeAt(_327)===35&&_30d.charCodeAt(_327+1)===35){
var val1=type===_355?val:type.keyword;
_327+=2;
if(val1){
_32c();
_3cf();
var val2=_331===_355?_332:_331.keyword;
if(val2){
var _3d0=""+val1+val2,code=_3d0.charCodeAt(0),tok;
if(_3ca(code)){
tok=_3d1(_3d0)!==false;
}
if(tok){
return tok;
}
tok=_3d2(code,_3ce);
if(tok===false){
_3d3();
}
return tok;
}else{
}
}
}
_332=val;
_335=_334;
_338=_337;
_334=_339;
_337=_33a;
_32b=type.beforeExpr;
_341=type.afterImport;
};
function _3d4(){
var _3d5=_30c.onComment&&_30c.locations&&new _3cc;
var _3d6=_327,end=_30d.indexOf("*/",_327+=2);
if(end===-1){
_34f(_327-2,"Unterminated comment");
}
_327=end+2;
if(_30c.locations){
_322.lastIndex=_3d6;
var _3d7;
while((_3d7=_322.exec(_30d))&&_3d7.index<_327){
++_328;
_329=_3d7.index+_3d7[0].length;
}
}
if(_30c.onComment){
_30c.onComment(true,_30d.slice(_3d6+2,end),_3d6,_327,_3d5,_30c.locations&&new _3cc);
}
if(_30c.trackComments){
(_339||(_339=[])).push(_30d.slice(_3d6,end));
}
};
function _3d8(){
var _3d9=_327;
var _3da=_30c.onComment&&_30c.locations&&new _3cc;
var ch=_30d.charCodeAt(_327+=2);
while(_327<_30e&&ch!==10&&ch!==13&&ch!==8232&&ch!==8329){
++_327;
ch=_30d.charCodeAt(_327);
}
if(_30c.onComment){
_30c.onComment(false,_30d.slice(_3d9+2,_327),_3d9,_327,_3da,_30c.locations&&new _3cc);
}
if(_30c.trackComments){
(_339||(_339=[])).push(_30d.slice(_3d9,_327));
}
};
function _3db(){
var ch=_30d.charCodeAt(_327);
var last;
while(_327<_30e&&((ch!==10&&ch!==13&&ch!==8232&&ch!==8329)||last===92)){
if(ch!=32&&ch!=9&&ch!=160&&(ch<5760||!_3c4.test(String.fromCharCode(ch)))){
last=ch;
}
ch=_30d.charCodeAt(++_327);
}
};
function _32c(){
_339=null;
_33a=null;
var _3dc=_327;
for(;;){
var ch=_30d.charCodeAt(_327);
if(ch===32){
++_327;
}else{
if(ch===13){
++_327;
var next=_30d.charCodeAt(_327);
if(next===10){
++_327;
}
if(_30c.locations){
++_328;
_329=_327;
}
}else{
if(ch===10){
++_327;
++_328;
_329=_327;
}else{
if(ch<14&&ch>8){
++_327;
}else{
if(ch===47){
var next=_30d.charCodeAt(_327+1);
if(next===42){
if(_30c.trackSpaces){
(_33a||(_33a=[])).push(_30d.slice(_3dc,_327));
}
_3d4();
_3dc=_327;
}else{
if(next===47){
if(_30c.trackSpaces){
(_33a||(_33a=[])).push(_30d.slice(_3dc,_327));
}
_3d8();
_3dc=_327;
}else{
break;
}
}
}else{
if(ch===160){
++_327;
}else{
if(ch>=5760&&_3c3.test(String.fromCharCode(ch))){
++_327;
}else{
if(_327>=_30e){
if(_30c.preprocess&&_34d.length){
var _3dd=_34d.pop();
_327=_3dd.end;
_30d=_3dd.input;
_30e=_3dd.inputLen;
_33f=_3dd.lastEnd;
_33e=_3dd.lastStart;
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
function _3de(code,_3df){
var next=_30d.charCodeAt(_327+1);
if(next>=48&&next<=57){
return _3e0(String.fromCharCode(code),_3df);
}
if(next===46&&_30c.objj&&_30d.charCodeAt(_327+2)===46){
_327+=3;
return _3df(_3a9);
}
++_327;
return _3df(_3a6);
};
function _3e1(_3e2){
var next=_30d.charCodeAt(_327+1);
if(_32b){
++_327;
return _3e3();
}
if(next===61){
return _3e4(_3ad,2,_3e2);
}
return _3e4(_3ab,1,_3e2);
};
function _3e5(_3e6){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3e4(_3ad,2,_3e6);
}
return _3e4(_3b9,1,_3e6);
};
function _3e7(code,_3e8){
var next=_30d.charCodeAt(_327+1);
if(next===code){
return _3e4(code===124?_3b1:_3b2,2,_3e8);
}
if(next===61){
return _3e4(_3ad,2,_3e8);
}
return _3e4(code===124?_3b3:_3b5,1,_3e8);
};
function _3e9(_3ea){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3e4(_3ad,2,_3ea);
}
return _3e4(_3b4,1,_3ea);
};
function _3eb(code,_3ec){
var next=_30d.charCodeAt(_327+1);
if(next===code){
return _3e4(_3af,2,_3ec);
}
if(next===61){
return _3e4(_3ad,2,_3ec);
}
return _3e4(_3ae,1,_3ec);
};
function _3ed(code,_3ee){
if(_341&&_30c.objj&&code===60){
var str=[];
for(;;){
if(_327>=_30e){
_34f(_32d,"Unterminated import statement");
}
var ch=_30d.charCodeAt(++_327);
if(ch===62){
++_327;
return _3ee(_383,String.fromCharCode.apply(null,str));
}
str.push(ch);
}
}
var next=_30d.charCodeAt(_327+1);
var size=1;
if(next===code){
size=code===62&&_30d.charCodeAt(_327+2)===62?3:2;
if(_30d.charCodeAt(_327+size)===61){
return _3e4(_3ad,size+1,_3ee);
}
return _3e4(_3b8,size,_3ee);
}
if(next===61){
size=_30d.charCodeAt(_327+2)===61?3:2;
}
return _3e4(_3b7,size,_3ee);
};
function _3ef(code,_3f0){
var next=_30d.charCodeAt(_327+1);
if(next===61){
return _3e4(_3b6,_30d.charCodeAt(_327+2)===61?3:2,_3f0);
}
return _3e4(code===61?_3ac:_3b0,1,_3f0);
};
function _3f1(code,_3f2){
var next=_30d.charCodeAt(++_327);
if(next===34||next===39){
return _3f3(next,_3f2);
}
if(next===123){
return _3f2(_37b);
}
if(next===91){
return _3f2(_37c);
}
var word=_3f4(),_3f5=_39b[word];
if(!_3f5){
_34f(_327,"Unrecognized Objective-J keyword '@"+word+"'");
}
return _3f2(_3f5);
};
var _3f6=true;
var _3f7=0;
function _3f8(_3f9){
++_327;
_3fa();
switch(_347){
case _38d:
_3fa();
var _3fb=_34a;
var _3fc=_3fd();
if(_30d.charCodeAt(_3fb)===40){
_3fe(_3a1);
var _3ff=[];
var _400=true;
while(!_401(_3a2)){
if(!_400){
_3fe(_3a3,"Expected ',' between macro parameters");
}else{
_400=false;
}
_3ff.push(_3fd());
}
}
var _402=_327=_349;
_3db();
var _403=_30d.slice(_402,_327);
_403=_403.replace(/\\/g," ");
_30c.preprocessAddMacro(new _404(_3fc,_403,_3ff));
break;
case _38e:
_3fa();
_30c.preprocessUndefineMacro(_3fd());
_3db();
break;
case _391:
if(_3f6){
_3f7++;
_3fa();
var expr=_405();
var test=_406(expr);
if(!test){
_3f6=false;
}
_407(!test);
}else{
return _3f9(_391);
}
break;
case _38f:
if(_3f6){
_3f7++;
_3fa();
var _408=_3fd();
var test=_30c.preprocessGetMacro(_408);
if(!test){
_3f6=false;
}
_407(!test);
}else{
return _3f9(_38f);
}
break;
case _390:
if(_3f6){
_3f7++;
_3fa();
var _408=_3fd();
var test=_30c.preprocessGetMacro(_408);
if(test){
_3f6=false;
}
_407(test);
}else{
return _3f9(_390);
}
break;
case _392:
if(_3f7){
if(_3f6){
_3f6=false;
_3f9(_392);
_3fa();
_407(true,true);
}else{
return _3f9(_392);
}
}else{
_34f(_349,"#else without #if");
}
break;
case _393:
if(_3f7){
if(_3f6){
_3f7--;
break;
}
}else{
_34f(_349,"#endif without #if");
}
return _3f9(_393);
break;
case _395:
_3db();
break;
case _3b0:
_3db();
break;
default:
_34f(_349,"Invalid preprocessing directive");
_3db();
return _3f9(_38c);
}
_3ce(_38c);
return _3cf();
};
function _406(expr){
return _30b.walk.recursive(expr,{},{BinaryExpression:function(node,st,c){
var left=node.left,_409=node.right;
switch(node.operator){
case "+":
return c(left,st)+c(_409,st);
case "-":
return c(left,st)-c(_409,st);
case "*":
return c(left,st)*c(_409,st);
case "/":
return c(left,st)/c(_409,st);
case "%":
return c(left,st)%c(_409,st);
case "<":
return c(left,st)<c(_409,st);
case ">":
return c(left,st)>c(_409,st);
case "=":
case "==":
case "===":
return c(left,st)===c(_409,st);
case "<=":
return c(left,st)<=c(_409,st);
case ">=":
return c(left,st)>=c(_409,st);
case "&&":
return c(left,st)&&c(_409,st);
case "||":
return c(left,st)||c(_409,st);
}
},Literal:function(node,st,c){
return node.value;
},Identifier:function(node,st,c){
var name=node.name,_40a=_30c.preprocessGetMacro(name);
return (_40a&&parseInt(_40a.macro))||0;
},DefinedExpression:function(node,st,c){
return !!_30c.preprocessGetMacro(node.id.name);
}},{});
};
function _3d2(code,_40b,_40c){
switch(code){
case 46:
return _3de(code,_40b);
case 40:
++_327;
return _40b(_3a1);
case 41:
++_327;
return _40b(_3a2);
case 59:
++_327;
return _40b(_3a4);
case 44:
++_327;
return _40b(_3a3);
case 91:
++_327;
return _40b(_39d);
case 93:
++_327;
return _40b(_39e);
case 123:
++_327;
return _40b(_39f);
case 125:
++_327;
return _40b(_3a0);
case 58:
++_327;
return _40b(_3a5);
case 63:
++_327;
return _40b(_3a7);
case 48:
var next=_30d.charCodeAt(_327+1);
if(next===120||next===88){
return _40d(_40b);
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
return _3e0(false,_40b);
case 34:
case 39:
return _3f3(code,_40b);
case 47:
return _3e1(_40b);
case 37:
case 42:
return _3e5(_40b);
case 124:
case 38:
return _3e7(code,_40b);
case 94:
return _3e9(_40b);
case 43:
case 45:
return _3eb(code,_40b);
case 60:
case 62:
return _3ed(code,_40b,_40b);
case 61:
case 33:
return _3ef(code,_40b);
case 126:
return _3e4(_3b0,1,_40b);
case 64:
if(_30c.objj){
return _3f1(code,_40b);
}
return false;
case 35:
if(_30c.preprocess){
return _3f8(_40b);
}
return false;
case 92:
if(_30c.preprocess){
return _3e4(_397,1,_40b);
}
return false;
}
if(_40c&&_3c9.test(String.fromCharCode(code))){
return _3e4(_357,1,_40b);
}
return false;
};
function _40e(){
while(_327<_30e){
var ch=_30d.charCodeAt(_327);
if(ch===32||ch===9||ch===160||(ch>=5760&&_3c4.test(String.fromCharCode(ch)))){
++_327;
}else{
if(ch===92){
var pos=_327+1;
ch=_30d.charCodeAt(pos);
while(pos<_30e&&(ch===32||ch===9||ch===11||ch===12||(ch>=5760&&_3c4.test(String.fromCharCode(ch))))){
ch=_30d.charCodeAt(++pos);
}
_322.lastIndex=0;
var _40f=_322.exec(_30d.slice(pos,pos+2));
if(_40f&&_40f.index===0){
_327=pos+_40f[0].length;
}else{
return false;
}
}else{
_322.lastIndex=0;
var _40f=_322.exec(_30d.slice(_327,_327+2));
return _40f&&_40f.index===0;
}
}
}
};
function _407(test,_410){
if(test){
var _411=0;
while(_411>0||(_347!=_393&&(_347!=_392||_410))){
switch(_347){
case _391:
case _38f:
case _390:
_411++;
break;
case _393:
_411--;
break;
case _356:
_3f6=true;
_34f(_349,"Missing #endif");
}
_3fa();
}
_3f6=true;
if(_347===_393){
_3f7--;
}
}
};
function _3fa(){
_349=_327;
_33d=_30d;
if(_327>=_30e){
return _356;
}
var code=_30d.charCodeAt(_327);
if(_34e&&code!==41&&code!==44){
var _412=0;
while(_327<_30e&&(_412||(code!==41&&code!==44))){
if(code===40){
_412++;
}
if(code===41){
_412--;
}
code=_30d.charCodeAt(++_327);
}
return _413(_398,_30d.slice(_349,_327));
}
if(_3ca(code)||(code===92&&_30d.charCodeAt(_327+1)===117)){
return _414();
}
if(_3d2(code,_413,true)===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_3c7.test(ch)){
return _414();
}
_34f(_327,"Unexpected character '"+ch+"'");
}
};
function _414(){
var word=_3f4();
_413(_3c2(word)?_39c[word]:_355,word);
};
function _413(type,val){
_347=type;
_348=val;
_34a=_327;
_40e();
};
function _415(){
_34b=_32d;
_34c=_32e;
return _3fa();
};
function _401(type){
if(_347===type){
_415();
return true;
}
};
function _3fe(type,_416){
if(_347===type){
_3fa();
}else{
_34f(_349,_416||"Unexpected token");
}
};
function _3fd(){
var _417=_347===_355?_348:((!_30c.forbidReserved||_347.okAsIdent)&&_347.keyword)||_34f(_349,"Expected Macro identifier");
_415();
return _417;
};
function _418(){
var node=_419();
node.name=_3fd();
return _41a(node,"Identifier");
};
function _405(){
return _41b();
};
function _41b(){
return _41c(_41d(),-1);
};
function _41c(left,_41e){
var prec=_347.binop;
if(prec){
if(!_347.preprocess){
_34f(_349,"Unsupported macro operator");
}
if(prec>_41e){
var node=_41f(left);
node.left=left;
node.operator=_348;
_415();
node.right=_41c(_41d(),prec);
var node=_41a(node,"BinaryExpression");
return _41c(node,_41e);
}
}
return left;
};
function _41d(){
if(_347.preprocess&&_347.prefix){
var node=_419();
node.operator=_332;
node.prefix=true;
_415();
node.argument=_41d();
return _41a(node,"UnaryExpression");
}
return _420();
};
function _420(){
switch(_347){
case _355:
return _418();
case _352:
case _354:
return _421();
case _3a1:
var _422=_349;
_415();
var val=_405();
val.start=_422;
val.end=_34a;
_3fe(_3a2,"Expected closing ')' in macro expression");
return val;
case _396:
var node=_419();
_415();
node.id=_418();
return _41a(node,"DefinedExpression");
default:
_3d3();
}
};
function _421(){
var node=_419();
node.value=_348;
node.raw=_33d.slice(_349,_34a);
_415();
return _41a(node,"Literal");
};
function _41a(node,type){
node.type=type;
node.end=_34c;
return node;
};
function _3cf(_423){
_32d=_327;
_33c=_30d;
if(_30c.locations){
_32f=new _3cc;
}
_333=_339;
_336=_33a;
if(_423){
return _3e3();
}
if(_327>=_30e){
return _3ce(_356);
}
var code=_30d.charCodeAt(_327);
if(_3ca(code)||code===92){
return _3d1();
}
var tok=_3d2(code,_3ce);
if(tok===false){
var ch=String.fromCharCode(code);
if(ch==="\\"||_3c7.test(ch)){
return _3d1();
}
_34f(_327,"Unexpected character '"+ch+"'");
}
return tok;
};
function _3e4(type,size,_424){
var str=_30d.slice(_327,_327+size);
_327+=size;
_424(type,str);
};
function _3e3(){
var _425="",_426,_427,_428=_327;
for(;;){
if(_327>=_30e){
_34f(_428,"Unterminated regular expression");
}
var ch=_30d.charAt(_327);
if(_3c9.test(ch)){
_34f(_428,"Unterminated regular expression");
}
if(!_426){
if(ch==="["){
_427=true;
}else{
if(ch==="]"&&_427){
_427=false;
}else{
if(ch==="/"&&!_427){
break;
}
}
}
_426=ch==="\\";
}else{
_426=false;
}
++_327;
}
var _425=_30d.slice(_428,_327);
++_327;
var mods=_3f4();
if(mods&&!/^[gmsiy]*$/.test(mods)){
_34f(_428,"Invalid regexp flag");
}
return _3ce(_353,new RegExp(_425,mods));
};
function _429(_42a,len){
var _42b=_327,_42c=0;
for(var i=0,e=len==null?Infinity:len;i<e;++i){
var code=_30d.charCodeAt(_327),val;
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
if(val>=_42a){
break;
}
++_327;
_42c=_42c*_42a+val;
}
if(_327===_42b||len!=null&&_327-_42b!==len){
return null;
}
return _42c;
};
function _40d(_42d){
_327+=2;
var val=_429(16);
if(val==null){
_34f(_32d+2,"Expected hexadecimal number");
}
if(_3ca(_30d.charCodeAt(_327))){
_34f(_327,"Identifier directly after number");
}
return _42d(_352,val);
};
function _3e0(_42e,_42f){
var _430=_327,_431=false,_432=_30d.charCodeAt(_327)===48;
if(!_42e&&_429(10)===null){
_34f(_430,"Invalid number");
}
if(_30d.charCodeAt(_327)===46){
++_327;
_429(10);
_431=true;
}
var next=_30d.charCodeAt(_327);
if(next===69||next===101){
next=_30d.charCodeAt(++_327);
if(next===43||next===45){
++_327;
}
if(_429(10)===null){
_34f(_430,"Invalid number");
}
_431=true;
}
if(_3ca(_30d.charCodeAt(_327))){
_34f(_327,"Identifier directly after number");
}
var str=_30d.slice(_430,_327),val;
if(_431){
val=parseFloat(str);
}else{
if(!_432||str.length===1){
val=parseInt(str,10);
}else{
if(/[89]/.test(str)||_345){
_34f(_430,"Invalid number");
}else{
val=parseInt(str,8);
}
}
}
return _42f(_352,val);
};
var _433=[];
function _3f3(_434,_435){
_327++;
_433.length=0;
for(;;){
if(_327>=_30e){
_34f(_32d,"Unterminated string constant");
}
var ch=_30d.charCodeAt(_327);
if(ch===_434){
++_327;
return _435(_354,String.fromCharCode.apply(null,_433));
}
if(ch===92){
ch=_30d.charCodeAt(++_327);
var _436=/^[0-7]+/.exec(_30d.slice(_327,_327+3));
if(_436){
_436=_436[0];
}
while(_436&&parseInt(_436,8)>255){
_436=_436.slice(0,_436.length-1);
}
if(_436==="0"){
_436=null;
}
++_327;
if(_436){
if(_345){
_34f(_327-2,"Octal literal in strict mode");
}
_433.push(parseInt(_436,8));
_327+=_436.length-1;
}else{
switch(ch){
case 110:
_433.push(10);
break;
case 114:
_433.push(13);
break;
case 120:
_433.push(_437(2));
break;
case 117:
_433.push(_437(4));
break;
case 85:
_433.push(_437(8));
break;
case 116:
_433.push(9);
break;
case 98:
_433.push(8);
break;
case 118:
_433.push(11);
break;
case 102:
_433.push(12);
break;
case 48:
_433.push(0);
break;
case 13:
if(_30d.charCodeAt(_327)===10){
++_327;
}
case 10:
if(_30c.locations){
_329=_327;
++_328;
}
break;
default:
_433.push(ch);
break;
}
}
}else{
if(ch===13||ch===10||ch===8232||ch===8329){
_34f(_32d,"Unterminated string constant");
}
_433.push(ch);
++_327;
}
}
};
function _437(len){
var n=_429(16,len);
if(n===null){
_34f(_32d,"Bad character escape sequence");
}
return n;
};
var _438;
function _3f4(){
_438=false;
var word,_439=true,_43a=_327;
for(;;){
var ch=_30d.charCodeAt(_327);
if(_3cb(ch)){
if(_438){
word+=_30d.charAt(_327);
}
++_327;
}else{
if(ch===92){
if(!_438){
word=_30d.slice(_43a,_327);
}
_438=true;
if(_30d.charCodeAt(++_327)!=117){
_34f(_327,"Expecting Unicode escape sequence \\uXXXX");
}
++_327;
var esc=_437(4);
var _43b=String.fromCharCode(esc);
if(!_43b){
_34f(_327-1,"Invalid Unicode escape");
}
if(!(_439?_3ca(esc):_3cb(esc))){
_34f(_327-4,"Invalid Unicode escape");
}
word+=_43b;
}else{
break;
}
}
_439=false;
}
return _438?word:_30d.slice(_43a,_327);
};
function _3d1(_43c){
var word=_43c||_3f4();
var type=_355;
var _43d;
if(_30c.preprocess){
var _43e;
var i=_34d.length;
if(i>0){
var _43f=_34d[i-1];
if(_43f.parameterDict&&_43f.macro.isParameterFunction()(word)){
_43e=_43f.parameterDict[word];
}
}
if(!_43e&&_30c.preprocessIsMacro(word)){
_43e=_30c.preprocessGetMacro(word);
}
if(_43e){
var _440=_32d;
var _441;
var _442=_43e.parameters;
var _443;
if(_442){
_443=_327<_30e&&_30d.charCodeAt(_327)===40;
}
if(!_442||_443){
var _444=_43e.macro;
var _445=_327;
if(_443){
var _446=true;
var _447=0;
_441=Object.create(null);
_3fa();
_34e=true;
_3fe(_3a1);
_445=_327;
while(!_401(_3a2)){
if(!_446){
_3fe(_3a3,"Expected ',' between macro parameters");
}else{
_446=false;
}
var _448=_442[_447++];
var val=_348;
_3fe(_398);
_441[_448]=new _404(_448,val);
_445=_327;
}
_34e=false;
}
if(_444){
_34d.push({macro:_43e,parameterDict:_441,start:_440,end:_445,input:_30d,inputLen:_30e,lastStart:_32d,lastEnd:_445});
_30d=_444;
_30e=_444.length;
_327=0;
}
return next();
}
}
}
if(!_438){
if(_3c0(word)){
type=_399[word];
}else{
if(_30c.objj&&_3c1(word)){
type=_39a[word];
}else{
if(_30c.forbidReserved&&(_30c.ecmaVersion===3?_3bc:_3bd)(word)||_345&&_3be(word)){
_34f(_32d,"The keyword '"+word+"' is reserved");
}
}
}
}
return _3ce(type,word);
};
function _404(_449,_44a,_44b){
this.identifier=_449;
if(_44a){
this.macro=_44a;
}
if(_44b){
this.parameters=_44b;
}
};
_404.prototype.isParameterFunction=function(){
var y=(this.parameters||[]).join(" ");
return this.isParameterFunctionVar||(this.isParameterFunctionVar=_31e(y));
};
function next(){
_33e=_32d;
_33f=_32e;
_340=_330;
_342=null;
return _3cf();
};
function _44c(_44d){
_345=_44d;
_327=_33f;
_32c();
_3cf();
};
function _44e(){
this.type=null;
this.start=_32d;
this.end=null;
};
function _44f(){
this.start=_32f;
this.end=null;
if(_30f!==null){
this.source=_30f;
}
};
function _419(){
var node=new _44e();
if(_30c.trackComments&&_333){
node.commentsBefore=_333;
_333=null;
}
if(_30c.trackSpaces&&_336){
node.spacesBefore=_336;
_336=null;
}
if(_30c.locations){
node.loc=new _44f();
}
if(_30c.ranges){
node.range=[_32d,0];
}
return node;
};
function _41f(_450){
var node=new _44e();
node.start=_450.start;
if(_450.commentsBefore){
node.commentsBefore=_450.commentsBefore;
delete _450.commentsBefore;
}
if(_450.spacesBefore){
node.spacesBefore=_450.spacesBefore;
delete _450.spacesBefore;
}
if(_30c.locations){
node.loc=new _44f();
node.loc.start=_450.loc.start;
}
if(_30c.ranges){
node.range=[_450.range[0],0];
}
return node;
};
var _451;
function _452(node,type){
node.type=type;
node.end=_33f;
if(_30c.trackComments){
if(_335){
node.commentsAfter=_335;
_334=null;
}else{
if(_451&&_451.end===_33f&&_451.commentsAfter){
node.commentsAfter=_451.commentsAfter;
delete _451.commentsAfter;
}
}
if(!_30c.trackSpaces){
_451=node;
}
}
if(_30c.trackSpaces){
if(_338){
node.spacesAfter=_338;
_338=null;
}else{
if(_451&&_451.end===_33f&&_451.spacesAfter){
node.spacesAfter=_451.spacesAfter;
delete _451.spacesAfter;
}
}
_451=node;
}
if(_30c.locations){
node.loc.end=_340;
}
if(_30c.ranges){
node.range[1]=_33f;
}
return node;
};
function _453(stmt){
return _30c.ecmaVersion>=5&&stmt.type==="ExpressionStatement"&&stmt.expression.type==="Literal"&&stmt.expression.value==="use strict";
};
function eat(type){
if(_331===type){
next();
return true;
}
};
function _454(){
return !_30c.strictSemicolons&&(_331===_356||_331===_3a0||_3c9.test(_33c.slice(_33f,_32d))||(_342&&_30c.objj));
};
function _455(){
if(!eat(_3a4)&&!_454()){
_34f(_32d,"Expected a semicolon");
}
};
function _456(type,_457){
if(_331===type){
next();
}else{
_457?_34f(_32d,_457):_3d3();
}
};
function _3d3(){
_34f(_32d,"Unexpected token");
};
function _458(expr){
if(expr.type!=="Identifier"&&expr.type!=="MemberExpression"&&expr.type!=="Dereference"){
_34f(expr.start,"Assigning to rvalue");
}
if(_345&&expr.type==="Identifier"&&_3bf(expr.name)){
_34f(expr.start,"Assigning to "+expr.name+" in strict mode");
}
};
function _312(_459){
_33e=_33f=_327;
if(_30c.locations){
_340=new _3cc;
}
_343=_345=null;
_344=[];
_3cf();
var node=_459||_419(),_45a=true;
if(!_459){
node.body=[];
}
while(_331!==_356){
var stmt=_45b();
node.body.push(stmt);
if(_45a&&_453(stmt)){
_44c(true);
}
_45a=false;
}
return _452(node,"Program");
};
var _45c={kind:"loop"},_45d={kind:"switch"};
function _45b(){
if(_331===_3ab){
_3cf(true);
}
var _45e=_331,node=_419();
if(_342){
node.expression=_45f(_342,_342.object);
_455();
return _452(node,"ExpressionStatement");
}
switch(_45e){
case _358:
case _35b:
next();
var _460=_45e===_358;
if(eat(_3a4)||_454()){
node.label=null;
}else{
if(_331!==_355){
_3d3();
}else{
node.label=_461();
_455();
}
}
for(var i=0;i<_344.length;++i){
var lab=_344[i];
if(node.label==null||lab.name===node.label.name){
if(lab.kind!=null&&(_460||lab.kind==="loop")){
break;
}
if(node.label&&_460){
break;
}
}
}
if(i===_344.length){
_34f(node.start,"Unsyntactic "+_45e.keyword);
}
return _452(node,_460?"BreakStatement":"ContinueStatement");
case _35c:
next();
_455();
return _452(node,"DebuggerStatement");
case _35e:
next();
_344.push(_45c);
node.body=_45b();
_344.pop();
_456(_369,"Expected 'while' at end of do statement");
node.test=_462();
_455();
return _452(node,"DoWhileStatement");
case _361:
next();
_344.push(_45c);
_456(_3a1,"Expected '(' after 'for'");
if(_331===_3a4){
return _463(node,null);
}
if(_331===_368){
var init=_419();
next();
_464(init,true);
if(init.declarations.length===1&&eat(_371)){
return _465(node,init);
}
return _463(node,init);
}
var init=_466(false,true);
if(eat(_371)){
_458(init);
return _465(node,init);
}
return _463(node,init);
case _362:
next();
return _467(node,true);
case _363:
next();
node.test=_462();
node.consequent=_45b();
node.alternate=eat(_35f)?_45b():null;
return _452(node,"IfStatement");
case _364:
if(!_343){
_34f(_32d,"'return' outside of function");
}
next();
if(eat(_3a4)||_454()){
node.argument=null;
}else{
node.argument=_466();
_455();
}
return _452(node,"ReturnStatement");
case _365:
next();
node.discriminant=_462();
node.cases=[];
_456(_39f,"Expected '{' in switch statement");
_344.push(_45d);
for(var cur,_468;_331!=_3a0;){
if(_331===_359||_331===_35d){
var _469=_331===_359;
if(cur){
_452(cur,"SwitchCase");
}
node.cases.push(cur=_419());
cur.consequent=[];
next();
if(_469){
cur.test=_466();
}else{
if(_468){
_34f(_33e,"Multiple default clauses");
}
_468=true;
cur.test=null;
}
_456(_3a5,"Expected ':' after case clause");
}else{
if(!cur){
_3d3();
}
cur.consequent.push(_45b());
}
}
if(cur){
_452(cur,"SwitchCase");
}
next();
_344.pop();
return _452(node,"SwitchStatement");
case _366:
next();
if(_3c9.test(_33c.slice(_33f,_32d))){
_34f(_33f,"Illegal newline after throw");
}
node.argument=_466();
_455();
return _452(node,"ThrowStatement");
case _367:
next();
node.block=_46a();
node.handlers=[];
while(_331===_35a){
var _46b=_419();
next();
_456(_3a1,"Expected '(' after 'catch'");
_46b.param=_461();
if(_345&&_3bf(_46b.param.name)){
_34f(_46b.param.start,"Binding "+_46b.param.name+" in strict mode");
}
_456(_3a2,"Expected closing ')' after catch");
_46b.guard=null;
_46b.body=_46a();
node.handlers.push(_452(_46b,"CatchClause"));
}
node.finalizer=eat(_360)?_46a():null;
if(!node.handlers.length&&!node.finalizer){
_34f(node.start,"Missing catch or finally clause");
}
return _452(node,"TryStatement");
case _368:
next();
node=_464(node);
_455();
return node;
case _369:
next();
node.test=_462();
_344.push(_45c);
node.body=_45b();
_344.pop();
return _452(node,"WhileStatement");
case _36a:
if(_345){
_34f(_32d,"'with' in strict mode");
}
next();
node.object=_462();
node.body=_45b();
return _452(node,"WithStatement");
case _39f:
return _46a();
case _3a4:
next();
return _452(node,"EmptyStatement");
case _382:
if(_30c.objj){
next();
node.classname=_461(true);
if(eat(_3a5)){
node.superclassname=_461(true);
}else{
if(eat(_3a1)){
node.categoryname=_461(true);
_456(_3a2,"Expected closing ')' after category name");
}
}
if(_332==="<"){
next();
var _46c=[],_46d=true;
node.protocols=_46c;
while(_332!==">"){
if(!_46d){
_456(_3a3,"Expected ',' between protocol names");
}else{
_46d=false;
}
_46c.push(_461(true));
}
next();
}
if(eat(_39f)){
node.ivardeclarations=[];
for(;;){
if(eat(_3a0)){
break;
}
_46e(node);
}
node.endOfIvars=_32d;
}
node.body=[];
while(!eat(_375)){
if(_331===_356){
_34f(_327,"Expected '@end' after '@interface'");
}
node.body.push(_46f());
}
return _452(node,"InterfaceDeclarationStatement");
}
break;
case _372:
if(_30c.objj){
next();
node.classname=_461(true);
if(eat(_3a5)){
node.superclassname=_461(true);
}else{
if(eat(_3a1)){
node.categoryname=_461(true);
_456(_3a2,"Expected closing ')' after category name");
}
}
if(_332==="<"){
next();
var _46c=[],_46d=true;
node.protocols=_46c;
while(_332!==">"){
if(!_46d){
_456(_3a3,"Expected ',' between protocol names");
}else{
_46d=false;
}
_46c.push(_461(true));
}
next();
}
if(_332==="<"){
next();
var _46c=[],_46d=true;
node.protocols=_46c;
while(_332!==">"){
if(!_46d){
_456(_3a3,"Expected ',' between protocol names");
}else{
_46d=false;
}
_46c.push(_461(true));
}
next();
}
if(eat(_39f)){
node.ivardeclarations=[];
for(;;){
if(eat(_3a0)){
break;
}
_46e(node);
}
node.endOfIvars=_32d;
}
node.body=[];
while(!eat(_375)){
if(_331===_356){
_34f(_327,"Expected '@end' after '@implementation'");
}
node.body.push(_46f());
}
return _452(node,"ClassDeclarationStatement");
}
break;
case _37f:
if(_30c.objj&&_30d.charCodeAt(_327)!==40){
next();
node.protocolname=_461(true);
if(_332==="<"){
next();
var _46c=[],_46d=true;
node.protocols=_46c;
while(_332!==">"){
if(!_46d){
_456(_3a3,"Expected ',' between protocol names");
}else{
_46d=false;
}
_46c.push(_461(true));
}
next();
}
while(!eat(_375)){
if(_331===_356){
_34f(_327,"Expected '@end' after '@protocol'");
}
if(eat(_381)){
continue;
}
if(eat(_380)){
while(!eat(_381)&&_331!==_375){
(node.optional||(node.optional=[])).push(_470());
}
}else{
(node.required||(node.required=[])).push(_470());
}
}
return _452(node,"ProtocolDeclarationStatement");
}
break;
case _376:
if(_30c.objj){
next();
if(_331===_354){
node.localfilepath=true;
}else{
if(_331===_383){
node.localfilepath=false;
}else{
_3d3();
}
}
node.filename=_471();
return _452(node,"ImportStatement");
}
break;
case _38c:
if(_30c.objj){
next();
return _452(node,"PreprocessStatement");
}
break;
case _379:
if(_30c.objj){
next();
node.id=_461(false);
return _452(node,"ClassStatement");
}
break;
case _37a:
if(_30c.objj){
next();
node.id=_461(false);
return _452(node,"GlobalStatement");
}
break;
}
var _472=_332,expr=_466();
if(_45e===_355&&expr.type==="Identifier"&&eat(_3a5)){
for(var i=0;i<_344.length;++i){
if(_344[i].name===_472){
_34f(expr.start,"Label '"+_472+"' is already declared");
}
}
var kind=_331.isLoop?"loop":_331===_365?"switch":null;
_344.push({name:_472,kind:kind});
node.body=_45b();
_344.pop();
node.label=expr;
return _452(node,"LabeledStatement");
}else{
node.expression=expr;
_455();
return _452(node,"ExpressionStatement");
}
};
function _46e(node){
var _473;
if(eat(_373)){
_473=true;
}
var type=_474();
if(_345&&_3bf(type.name)){
_34f(type.start,"Binding "+type.name+" in strict mode");
}
for(;;){
var decl=_419();
if(_473){
decl.outlet=_473;
}
decl.ivartype=type;
decl.id=_461();
if(_345&&_3bf(decl.id.name)){
_34f(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
if(eat(_374)){
decl.accessors={};
if(eat(_3a1)){
if(!eat(_3a2)){
for(;;){
var _475=_461(true);
switch(_475.name){
case "property":
case "getter":
_456(_3ac,"Expected '=' after 'getter' accessor attribute");
decl.accessors[_475.name]=_461(true);
break;
case "setter":
_456(_3ac,"Expected '=' after 'setter' accessor attribute");
var _476=_461(true);
decl.accessors[_475.name]=_476;
if(eat(_3a5)){
_476.end=_32d;
}
_476.name+=":";
break;
case "readwrite":
case "readonly":
case "copy":
decl.accessors[_475.name]=true;
break;
default:
_34f(_475.start,"Unknown accessors attribute '"+_475.name+"'");
}
if(!eat(_3a3)){
break;
}
}
_456(_3a2,"Expected closing ')' after accessor attributes");
}
}
}
_452(decl,"IvarDeclaration");
node.ivardeclarations.push(decl);
if(!eat(_3a3)){
break;
}
}
_455();
};
function _477(node){
node.methodtype=_332;
_456(_3ae,"Method declaration must start with '+' or '-'");
if(eat(_3a1)){
var _478=_419();
if(eat(_377)){
node.action=_452(_478,"ObjectiveJActionType");
_478=_419();
}
if(!eat(_3a2)){
node.returntype=_474(_478);
_456(_3a2,"Expected closing ')' after method return type");
}
}
var _479=true,_47a=[],args=[];
node.selectors=_47a;
node.arguments=args;
for(;;){
if(_331!==_3a5){
_47a.push(_461(true));
if(_479&&_331!==_3a5){
break;
}
}else{
_47a.push(null);
}
_456(_3a5,"Expected ':' in selector");
var _47b={};
args.push(_47b);
if(eat(_3a1)){
_47b.type=_474();
_456(_3a2,"Expected closing ')' after method argument type");
}
_47b.identifier=_461(false);
if(_331===_39f||_331===_3a4){
break;
}
if(eat(_3a3)){
_456(_3a9,"Expected '...' after ',' in method declaration");
node.parameters=true;
break;
}
_479=false;
}
};
function _46f(){
var _47c=_419();
if(_332==="+"||_332==="-"){
_477(_47c);
eat(_3a4);
_47c.startOfBody=_33f;
var _47d=_343,_47e=_344;
_343=true;
_344=[];
_47c.body=_46a(true);
_343=_47d;
_344=_47e;
return _452(_47c,"MethodDeclarationStatement");
}else{
return _45b();
}
};
function _470(){
var _47f=_419();
_477(_47f);
_455();
return _452(_47f,"MethodDeclarationStatement");
};
function _462(){
_456(_3a1,"Expected '(' before expression");
var val=_466();
_456(_3a2,"Expected closing ')' after expression");
return val;
};
function _46a(_480){
var node=_419(),_481=true,_345=false,_482;
node.body=[];
_456(_39f,"Expected '{' before block");
while(!eat(_3a0)){
var stmt=_45b();
node.body.push(stmt);
if(_481&&_453(stmt)){
_482=_345;
_44c(_345=true);
}
_481=false;
}
if(_345&&!_482){
_44c(false);
}
return _452(node,"BlockStatement");
};
function _463(node,init){
node.init=init;
_456(_3a4,"Expected ';' in for statement");
node.test=_331===_3a4?null:_466();
_456(_3a4,"Expected ';' in for statement");
node.update=_331===_3a2?null:_466();
_456(_3a2,"Expected closing ')' in for statement");
node.body=_45b();
_344.pop();
return _452(node,"ForStatement");
};
function _465(node,init){
node.left=init;
node.right=_466();
_456(_3a2,"Expected closing ')' in for statement");
node.body=_45b();
_344.pop();
return _452(node,"ForInStatement");
};
function _464(node,noIn){
node.declarations=[];
node.kind="var";
for(;;){
var decl=_419();
decl.id=_461();
if(_345&&_3bf(decl.id.name)){
_34f(decl.id.start,"Binding "+decl.id.name+" in strict mode");
}
decl.init=eat(_3ac)?_466(true,noIn):null;
node.declarations.push(_452(decl,"VariableDeclarator"));
if(!eat(_3a3)){
break;
}
}
return _452(node,"VariableDeclaration");
};
function _466(_483,noIn){
var expr=_484(noIn);
if(!_483&&_331===_3a3){
var node=_41f(expr);
node.expressions=[expr];
while(eat(_3a3)){
node.expressions.push(_484(noIn));
}
return _452(node,"SequenceExpression");
}
return expr;
};
function _484(noIn){
var left=_485(noIn);
if(_331.isAssign){
var node=_41f(left);
node.operator=_332;
node.left=left;
next();
node.right=_484(noIn);
_458(left);
return _452(node,"AssignmentExpression");
}
return left;
};
function _485(noIn){
var expr=_486(noIn);
if(eat(_3a7)){
var node=_41f(expr);
node.test=expr;
node.consequent=_466(true);
_456(_3a5,"Expected ':' in conditional expression");
node.alternate=_466(true,noIn);
return _452(node,"ConditionalExpression");
}
return expr;
};
function _486(noIn){
return _487(_488(noIn),-1,noIn);
};
function _487(left,_489,noIn){
var prec=_331.binop;
if(prec!=null&&(!noIn||_331!==_371)){
if(prec>_489){
var node=_41f(left);
node.left=left;
node.operator=_332;
next();
node.right=_487(_488(noIn),prec,noIn);
var node=_452(node,/&&|\|\|/.test(node.operator)?"LogicalExpression":"BinaryExpression");
return _487(node,_489,noIn);
}
}
return left;
};
function _488(noIn){
if(_331.prefix){
var node=_419(),_48a=_331.isUpdate;
node.operator=_332;
node.prefix=true;
next();
node.argument=_488(noIn);
if(_48a){
_458(node.argument);
}else{
if(_345&&node.operator==="delete"&&node.argument.type==="Identifier"){
_34f(node.start,"Deleting local variable in strict mode");
}
}
return _452(node,_48a?"UpdateExpression":"UnaryExpression");
}
var expr=_48b();
while(_331.postfix&&!_454()){
var node=_41f(expr);
node.operator=_332;
node.prefix=false;
node.argument=expr;
_458(expr);
next();
expr=_452(node,"UpdateExpression");
}
return expr;
};
function _48b(){
return _48c(_48d());
};
function _48c(base,_48e){
if(eat(_3a6)){
var node=_41f(base);
node.object=base;
node.property=_461(true);
node.computed=false;
return _48c(_452(node,"MemberExpression"),_48e);
}else{
if(_30c.objj){
var _48f=_419();
}
if(eat(_39d)){
var expr=_466();
if(_30c.objj&&_331!==_39e){
_48f.object=expr;
_342=_48f;
return base;
}
var node=_41f(base);
node.object=base;
node.property=expr;
node.computed=true;
_456(_39e,"Expected closing ']' in subscript");
return _48c(_452(node,"MemberExpression"),_48e);
}else{
if(!_48e&&eat(_3a1)){
var node=_41f(base);
node.callee=base;
node.arguments=_490(_3a2,_331===_3a2?null:_466(true),false);
return _48c(_452(node,"CallExpression"),_48e);
}
}
}
return base;
};
function _48d(){
switch(_331){
case _36c:
var node=_419();
next();
return _452(node,"ThisExpression");
case _355:
return _461();
case _352:
case _354:
case _353:
return _471();
case _36e:
case _36f:
case _370:
var node=_419();
node.value=_331.atomValue;
node.raw=_331.keyword;
next();
return _452(node,"Literal");
case _3a1:
var _491=_32f,_492=_32d;
next();
var val=_466();
val.start=_492;
val.end=_32e;
if(_30c.locations){
val.loc.start=_491;
val.loc.end=_330;
}
if(_30c.ranges){
val.range=[_492,_32e];
}
_456(_3a2,"Expected closing ')' in expression");
return val;
case _37c:
var node=_419(),_493=null;
next();
_456(_39d,"Expected '[' at beginning of array literal");
if(_331!==_39e){
_493=_466(true,true);
}
node.elements=_490(_39e,_493,true,true);
return _452(node,"ArrayLiteral");
case _39d:
var node=_419(),_493=null;
next();
if(_331!==_3a3&&_331!==_39e){
_493=_466(true,true);
if(_331!==_3a3&&_331!==_39e){
return _45f(node,_493);
}
}
node.elements=_490(_39e,_493,true,true);
return _452(node,"ArrayExpression");
case _37b:
var node=_419();
next();
var r=_494();
node.keys=r[0];
node.values=r[1];
return _452(node,"DictionaryLiteral");
case _39f:
return _495();
case _362:
var node=_419();
next();
return _467(node,false);
case _36b:
return _496();
case _378:
var node=_419();
next();
_456(_3a1,"Expected '(' after '@selector'");
_497(node,_3a2);
_456(_3a2,"Expected closing ')' after selector");
return _452(node,"SelectorLiteralExpression");
case _37f:
var node=_419();
next();
_456(_3a1,"Expected '(' after '@protocol'");
node.id=_461(true);
_456(_3a2,"Expected closing ')' after protocol name");
return _452(node,"ProtocolLiteralExpression");
case _37d:
var node=_419();
next();
_456(_3a1,"Expected '(' after '@ref'");
node.element=_461(node,_3a2);
_456(_3a2,"Expected closing ')' after ref");
return _452(node,"Reference");
case _37e:
var node=_419();
next();
_456(_3a1,"Expected '(' after '@deref'");
node.expr=_466(true,true);
_456(_3a2,"Expected closing ')' after deref");
return _452(node,"Dereference");
default:
if(_331.okAsIdent){
return _461();
}
_3d3();
}
};
function _45f(node,_498){
_499(node,_39e);
if(_498.type==="Identifier"&&_498.name==="super"){
node.superObject=true;
}else{
node.object=_498;
}
return _452(node,"MessageSendExpression");
};
function _497(node,_49a){
var _49b=true,_49c=[];
for(;;){
if(_331!==_3a5){
_49c.push(_461(true).name);
if(_49b&&_331===_49a){
break;
}
}
_456(_3a5,"Expected ':' in selector");
_49c.push(":");
if(_331===_49a){
break;
}
_49b=false;
}
node.selector=_49c.join("");
};
function _499(node,_49d){
var _49e=true,_49f=[],args=[],_4a0=[];
node.selectors=_49f;
node.arguments=args;
for(;;){
if(_331!==_3a5){
_49f.push(_461(true));
if(_49e&&eat(_49d)){
break;
}
}else{
_49f.push(null);
}
_456(_3a5,"Expected ':' in selector");
args.push(_466(true,true));
if(eat(_49d)){
break;
}
if(_331===_3a3){
node.parameters=[];
while(eat(_3a3)){
node.parameters.push(_466(true,true));
}
eat(_49d);
break;
}
_49e=false;
}
};
function _496(){
var node=_419();
next();
node.callee=_48c(_48d(false),true);
if(eat(_3a1)){
node.arguments=_490(_3a2,_331===_3a2?null:_466(true),false);
}else{
node.arguments=[];
}
return _452(node,"NewExpression");
};
function _495(){
var node=_419(),_4a1=true,_4a2=false;
node.properties=[];
next();
while(!eat(_3a0)){
if(!_4a1){
_456(_3a3,"Expected ',' in object literal");
if(_30c.allowTrailingCommas&&eat(_3a0)){
break;
}
}else{
_4a1=false;
}
var prop={key:_4a3()},_4a4=false,kind;
if(eat(_3a5)){
prop.value=_466(true);
kind=prop.kind="init";
}else{
if(_30c.ecmaVersion>=5&&prop.key.type==="Identifier"&&(prop.key.name==="get"||prop.key.name==="set")){
_4a4=_4a2=true;
kind=prop.kind=prop.key.name;
prop.key=_4a3();
if(_331!==_3a1){
_3d3();
}
prop.value=_467(_419(),false);
}else{
_3d3();
}
}
if(prop.key.type==="Identifier"&&(_345||_4a2)){
for(var i=0;i<node.properties.length;++i){
var _4a5=node.properties[i];
if(_4a5.key.name===prop.key.name){
var _4a6=kind==_4a5.kind||_4a4&&_4a5.kind==="init"||kind==="init"&&(_4a5.kind==="get"||_4a5.kind==="set");
if(_4a6&&!_345&&kind==="init"&&_4a5.kind==="init"){
_4a6=false;
}
if(_4a6){
_34f(prop.key.start,"Redefinition of property");
}
}
}
}
node.properties.push(prop);
}
return _452(node,"ObjectExpression");
};
function _4a3(){
if(_331===_352||_331===_354){
return _48d();
}
return _461(true);
};
function _467(node,_4a7){
if(_331===_355){
node.id=_461();
}else{
if(_4a7){
_3d3();
}else{
node.id=null;
}
}
node.params=[];
var _4a8=true;
_456(_3a1,"Expected '(' before function parameters");
while(!eat(_3a2)){
if(!_4a8){
_456(_3a3,"Expected ',' between function parameters");
}else{
_4a8=false;
}
node.params.push(_461());
}
var _4a9=_343,_4aa=_344;
_343=true;
_344=[];
node.body=_46a(true);
_343=_4a9;
_344=_4aa;
if(_345||node.body.body.length&&_453(node.body.body[0])){
for(var i=node.id?-1:0;i<node.params.length;++i){
var id=i<0?node.id:node.params[i];
if(_3be(id.name)||_3bf(id.name)){
_34f(id.start,"Defining '"+id.name+"' in strict mode");
}
if(i>=0){
for(var j=0;j<i;++j){
if(id.name===node.params[j].name){
_34f(id.start,"Argument name clash in strict mode");
}
}
}
}
}
return _452(node,_4a7?"FunctionDeclaration":"FunctionExpression");
};
function _490(_4ab,_4ac,_4ad,_4ae){
if(_4ac&&eat(_4ab)){
return [_4ac];
}
var elts=[],_4af=true;
while(!eat(_4ab)){
if(_4af){
_4af=false;
if(_4ae&&_331===_3a3&&!_4ac){
elts.push(null);
}else{
elts.push(_4ac);
}
}else{
_456(_3a3,"Expected ',' between expressions");
if(_4ad&&_30c.allowTrailingCommas&&eat(_4ab)){
break;
}
if(_4ae&&_331===_3a3){
elts.push(null);
}else{
elts.push(_466(true));
}
}
}
return elts;
};
function _494(){
_456(_39f,"Expected '{' before dictionary");
var keys=[],_4b0=[],_4b1=true;
while(!eat(_3a0)){
if(!_4b1){
_456(_3a3,"Expected ',' between expressions");
if(_30c.allowTrailingCommas&&eat(_3a0)){
break;
}
}
keys.push(_466(true,true));
_456(_3a5,"Expected ':' between dictionary key and value");
_4b0.push(_466(true,true));
_4b1=false;
}
return [keys,_4b0];
};
function _461(_4b2){
var node=_419();
node.name=_331===_355?_332:(((_4b2&&!_30c.forbidReserved)||_331.okAsIdent)&&_331.keyword)||_3d3();
next();
return _452(node,"Identifier");
};
function _471(){
var node=_419();
node.value=_332;
node.raw=_33c.slice(_32d,_32e);
next();
return _452(node,"Literal");
};
function _474(_4b3){
var node=_4b3?_41f(_4b3):_419();
if(_331===_355){
node.name=_332;
node.typeisclass=true;
next();
}else{
node.name=_331.keyword;
if(!eat(_36d)){
if(eat(_38b)){
if(_332==="<"){
var _4b4=true,_4b5=[];
node.protocols=_4b5;
do{
next();
if(_4b4){
_4b4=false;
}else{
eat(_3a3);
}
_4b5.push(_461(true));
}while(_332!==">");
next();
}
}else{
var _4b6;
if(eat(_385)||eat(_384)){
_4b6=_331.keyword||true;
}
if(eat(_387)||eat(_386)||eat(_388)){
if(_4b6){
node.name+=" "+_4b6;
}
_4b6=_331.keyword||true;
}else{
if(eat(_389)){
if(_4b6){
node.name+=" "+_4b6;
}
_4b6=_331.keyword||true;
}
if(eat(_38a)){
if(_4b6){
node.name+=" "+_4b6;
}
_4b6=_331.keyword||true;
if(eat(_38a)){
node.name+=" "+_4b6;
}
}
}
if(!_4b6){
node.name=(!_30c.forbidReserved&&_331.keyword)||_3d3();
node.typeisclass=true;
next();
}
}
}
}
return _452(node,"ObjectiveJType");
};
})(typeof _2==="undefined"?(self.acorn={}):_2.acorn);
if(!_2.acorn){
_2.acorn={};
_2.acorn.walk={};
}
(function(_4b7){
"use strict";
_4b7.simple=function(node,_4b8,base,_4b9){
if(!base){
base=_4b7;
}
function c(node,st,_4ba){
var type=_4ba||node.type,_4bb=_4b8[type];
if(_4bb){
_4bb(node,st);
}
base[type](node,st,c);
};
c(node,_4b9);
};
_4b7.recursive=function(node,_4bc,_4bd,base){
var _4be=_4b7.make(_4bd,base);
function c(node,st,_4bf){
return _4be[_4bf||node.type](node,st,c);
};
return c(node,_4bc);
};
_4b7.make=function(_4c0,base){
if(!base){
base=_4b7;
}
var _4c1={};
for(var type in base){
_4c1[type]=base[type];
}
for(var type in _4c0){
_4c1[type]=_4c0[type];
}
return _4c1;
};
function _4c2(node,st,c){
c(node,st);
};
function _4c3(node,st,c){
};
_4b7.Program=_4b7.BlockStatement=function(node,st,c){
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_4b7.Statement=_4c2;
_4b7.EmptyStatement=_4c3;
_4b7.ExpressionStatement=function(node,st,c){
c(node.expression,st,"Expression");
};
_4b7.IfStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Statement");
if(node.alternate){
c(node.alternate,st,"Statement");
}
};
_4b7.LabeledStatement=function(node,st,c){
c(node.body,st,"Statement");
};
_4b7.BreakStatement=_4b7.ContinueStatement=_4c3;
_4b7.WithStatement=function(node,st,c){
c(node.object,st,"Expression");
c(node.body,st,"Statement");
};
_4b7.SwitchStatement=function(node,st,c){
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
_4b7.ReturnStatement=function(node,st,c){
if(node.argument){
c(node.argument,st,"Expression");
}
};
_4b7.ThrowStatement=function(node,st,c){
c(node.argument,st,"Expression");
};
_4b7.TryStatement=function(node,st,c){
c(node.block,st,"Statement");
for(var i=0;i<node.handlers.length;++i){
c(node.handlers[i].body,st,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,st,"Statement");
}
};
_4b7.WhileStatement=function(node,st,c){
c(node.test,st,"Expression");
c(node.body,st,"Statement");
};
_4b7.DoWhileStatement=function(node,st,c){
c(node.body,st,"Statement");
c(node.test,st,"Expression");
};
_4b7.ForStatement=function(node,st,c){
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
_4b7.ForInStatement=function(node,st,c){
c(node.left,st,"ForInit");
c(node.right,st,"Expression");
c(node.body,st,"Statement");
};
_4b7.ForInit=function(node,st,c){
if(node.type=="VariableDeclaration"){
c(node,st);
}else{
c(node,st,"Expression");
}
};
_4b7.DebuggerStatement=_4c3;
_4b7.FunctionDeclaration=function(node,st,c){
c(node,st,"Function");
};
_4b7.VariableDeclaration=function(node,st,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
if(decl.init){
c(decl.init,st,"Expression");
}
}
};
_4b7.Function=function(node,st,c){
c(node.body,st,"ScopeBody");
};
_4b7.ScopeBody=function(node,st,c){
c(node,st,"Statement");
};
_4b7.Expression=_4c2;
_4b7.ThisExpression=_4c3;
_4b7.ArrayExpression=_4b7.ArrayLiteral=function(node,st,c){
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(elt){
c(elt,st,"Expression");
}
}
};
_4b7.DictionaryLiteral=function(node,st,c){
for(var i=0;i<node.keys.length;i++){
var key=node.keys[i];
c(key,st,"Expression");
var _4c4=node.values[i];
c(_4c4,st,"Expression");
}
};
_4b7.ObjectExpression=function(node,st,c){
for(var i=0;i<node.properties.length;++i){
c(node.properties[i].value,st,"Expression");
}
};
_4b7.FunctionExpression=_4b7.FunctionDeclaration;
_4b7.SequenceExpression=function(node,st,c){
for(var i=0;i<node.expressions.length;++i){
c(node.expressions[i],st,"Expression");
}
};
_4b7.UnaryExpression=_4b7.UpdateExpression=function(node,st,c){
c(node.argument,st,"Expression");
};
_4b7.BinaryExpression=_4b7.AssignmentExpression=_4b7.LogicalExpression=function(node,st,c){
c(node.left,st,"Expression");
c(node.right,st,"Expression");
};
_4b7.ConditionalExpression=function(node,st,c){
c(node.test,st,"Expression");
c(node.consequent,st,"Expression");
c(node.alternate,st,"Expression");
};
_4b7.NewExpression=_4b7.CallExpression=function(node,st,c){
c(node.callee,st,"Expression");
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
c(node.arguments[i],st,"Expression");
}
}
};
_4b7.MemberExpression=function(node,st,c){
c(node.object,st,"Expression");
if(node.computed){
c(node.property,st,"Expression");
}
};
_4b7.Identifier=_4b7.Literal=_4c3;
_4b7.ClassDeclarationStatement=function(node,st,c){
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
c(node.ivardeclarations[i],st,"IvarDeclaration");
}
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
};
_4b7.ImportStatement=_4c3;
_4b7.IvarDeclaration=_4c3;
_4b7.PreprocessStatement=_4c3;
_4b7.ClassStatement=_4c3;
_4b7.GlobalStatement=_4c3;
_4b7.ProtocolDeclarationStatement=function(node,st,c){
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
_4b7.MethodDeclarationStatement=function(node,st,c){
var body=node.body;
if(body){
c(body,st,"Statement");
}
};
_4b7.MessageSendExpression=function(node,st,c){
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
_4b7.SelectorLiteralExpression=_4c3;
_4b7.ProtocolLiteralExpression=_4c3;
_4b7.Reference=function(node,st,c){
c(node.element,st,"Identifier");
};
_4b7.Dereference=function(node,st,c){
c(node.expr,st,"Expression");
};
function _4c5(prev){
return {vars:Object.create(null),prev:prev};
};
_4b7.scopeVisitor=_4b7.make({Function:function(node,_4c6,c){
var _4c7=_4c5(_4c6);
for(var i=0;i<node.params.length;++i){
_4c7.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
var decl=node.type=="FunctionDeclaration";
(decl?_4c6:_4c7).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
}
c(node.body,_4c7,"ScopeBody");
},TryStatement:function(node,_4c8,c){
c(node.block,_4c8,"Statement");
for(var i=0;i<node.handlers.length;++i){
var _4c9=node.handlers[i],_4ca=_4c5(_4c8);
_4ca.vars[_4c9.param.name]={type:"catch clause",node:_4c9.param};
c(_4c9.body,_4ca,"ScopeBody");
}
if(node.finalizer){
c(node.finalizer,_4c8,"Statement");
}
},VariableDeclaration:function(node,_4cb,c){
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i];
_4cb.vars[decl.id.name]={type:"var",node:decl.id};
if(decl.init){
c(decl.init,_4cb,"Expression");
}
}
}});
})(typeof _2=="undefined"?acorn.walk={}:_2.acorn.walk);
var _4cc=function(prev,base){
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
_4cc.prototype.compiler=function(){
return this.compiler;
};
_4cc.prototype.rootScope=function(){
return this.prev?this.prev.rootScope():this;
};
_4cc.prototype.isRootScope=function(){
return !this.prev;
};
_4cc.prototype.currentClassName=function(){
return this.classDef?this.classDef.name:this.prev?this.prev.currentClassName():null;
};
_4cc.prototype.currentProtocolName=function(){
return this.protocolDef?this.protocolDef.name:this.prev?this.prev.currentProtocolName():null;
};
_4cc.prototype.getIvarForCurrentClass=function(_4cd){
if(this.ivars){
var ivar=this.ivars[_4cd];
if(ivar){
return ivar;
}
}
var prev=this.prev;
if(prev&&!this.classDef){
return prev.getIvarForCurrentClass(_4cd);
}
return null;
};
_4cc.prototype.getLvar=function(_4ce,_4cf){
if(this.vars){
var lvar=this.vars[_4ce];
if(lvar){
return lvar;
}
}
var prev=this.prev;
if(prev&&(!_4cf||!this.methodType)){
return prev.getLvar(_4ce,_4cf);
}
return null;
};
_4cc.prototype.currentMethodType=function(){
return this.methodType?this.methodType:this.prev?this.prev.currentMethodType():null;
};
_4cc.prototype.copyAddedSelfToIvarsToParent=function(){
if(this.prev&&this.addedSelfToIvars){
for(var key in this.addedSelfToIvars){
var _4d0=this.addedSelfToIvars[key],_4d1=(this.prev.addedSelfToIvars||(this.prev.addedSelfToIvars=Object.create(null)))[key]||(this.prev.addedSelfToIvars[key]=[]);
_4d1.push.apply(_4d1,_4d0);
}
}
};
_4cc.prototype.addMaybeWarning=function(_4d2){
var _4d3=this.rootScope();
(_4d3._maybeWarnings||(_4d3._maybeWarnings=[])).push(_4d2);
};
_4cc.prototype.maybeWarnings=function(){
return this.rootScope()._maybeWarnings;
};
var _4d4=function(_4d5,node,code){
this.message=_4d6(_4d5,node,code);
this.node=node;
};
_4d4.prototype.checkIfWarning=function(st){
var _4d7=this.node.name;
return !st.getLvar(_4d7)&&typeof _1[_4d7]==="undefined"&&typeof window[_4d7]==="undefined"&&!st.compiler.getClassDef(_4d7);
};
function _2ad(){
this.atoms=[];
};
_2ad.prototype.toString=function(){
return this.atoms.join("");
};
_2ad.prototype.concat=function(_4d8){
this.atoms.push(_4d8);
};
_2ad.prototype.isEmpty=function(){
return this.atoms.length!==0;
};
var _4d9=function(_4da,name,_4db,_4dc,_4dd,_4de,_4df){
this.name=name;
if(_4db){
this.superClass=_4db;
}
if(_4dc){
this.ivars=_4dc;
}
if(_4da){
this.instanceMethods=_4dd||Object.create(null);
this.classMethods=_4de||Object.create(null);
}
if(_4df){
this.protocols=_4df;
}
};
_4d9.prototype.addInstanceMethod=function(_4e0){
this.instanceMethods[_4e0.name]=_4e0;
};
_4d9.prototype.addClassMethod=function(_4e1){
this.classMethods[_4e1.name]=_4e1;
};
_4d9.prototype.listOfNotImplementedMethodsForProtocols=function(_4e2){
var _4e3=[],_4e4=this.getInstanceMethods(),_4e5=this.getClassMethods();
for(var i=0,size=_4e2.length;i<size;i++){
var _4e6=_4e2[i],_4e7=_4e6.requiredInstanceMethods,_4e8=_4e6.requiredClassMethods,_4e9=_4e6.protocols;
if(_4e7){
for(var _4ea in _4e7){
var _4eb=_4e7[_4ea];
if(!_4e4[_4ea]){
_4e3.push({"methodDef":_4eb,"protocolDef":_4e6});
}
}
}
if(_4e8){
for(var _4ea in _4e8){
var _4eb=_4e8[_4ea];
if(!_4e5[_4ea]){
_4e3.push({"methodDef":_4eb,"protocolDef":_4e6});
}
}
}
if(_4e9){
_4e3=_4e3.concat(this.listOfNotImplementedMethodsForProtocols(_4e9));
}
}
return _4e3;
};
_4d9.prototype.getInstanceMethod=function(name){
var _4ec=this.instanceMethods;
if(_4ec){
var _4ed=_4ec[name];
if(_4ed){
return _4ed;
}
}
var _4ee=this.superClass;
if(_4ee){
return _4ee.getInstanceMethod(name);
}
return null;
};
_4d9.prototype.getClassMethod=function(name){
var _4ef=this.classMethods;
if(_4ef){
var _4f0=_4ef[name];
if(_4f0){
return _4f0;
}
}
var _4f1=this.superClass;
if(_4f1){
return _4f1.getClassMethod(name);
}
return null;
};
_4d9.prototype.getInstanceMethods=function(){
var _4f2=this.instanceMethods;
if(_4f2){
var _4f3=this.superClass,_4f4=Object.create(null);
if(_4f3){
var _4f5=_4f3.getInstanceMethods();
for(var _4f6 in _4f5){
_4f4[_4f6]=_4f5[_4f6];
}
}
for(var _4f6 in _4f2){
_4f4[_4f6]=_4f2[_4f6];
}
return _4f4;
}
return [];
};
_4d9.prototype.getClassMethods=function(){
var _4f7=this.classMethods;
if(_4f7){
var _4f8=this.superClass,_4f9=Object.create(null);
if(_4f8){
var _4fa=_4f8.getClassMethods();
for(var _4fb in _4fa){
_4f9[_4fb]=_4fa[_4fb];
}
}
for(var _4fb in _4f7){
_4f9[_4fb]=_4f7[_4fb];
}
return _4f9;
}
return [];
};
var _4fc=function(name,_4fd,_4fe,_4ff){
this.name=name;
this.protocols=_4fd;
if(_4fe){
this.requiredInstanceMethods=_4fe;
}
if(_4ff){
this.requiredClassMethods=_4ff;
}
};
_4fc.prototype.addInstanceMethod=function(_500){
(this.requiredInstanceMethods||(this.requiredInstanceMethods=Object.create(null)))[_500.name]=_500;
};
_4fc.prototype.addClassMethod=function(_501){
(this.requiredClassMethods||(this.requiredClassMethods=Object.create(null)))[_501.name]=_501;
};
_4fc.prototype.getInstanceMethod=function(name){
var _502=this.requiredInstanceMethods;
if(_502){
var _503=_502[name];
if(_503){
return _503;
}
}
var _504=this.protocols;
for(var i=0,size=_504.length;i<size;i++){
var _505=_504[i],_503=_505.getInstanceMethod(name);
if(_503){
return _503;
}
}
return null;
};
_4fc.prototype.getClassMethod=function(name){
var _506=this.requiredClassMethods;
if(_506){
var _507=_506[name];
if(_507){
return _507;
}
}
var _508=this.protocols;
for(var i=0,size=_508.length;i<size;i++){
var _509=_508[i],_507=_509.getInstanceMethod(name);
if(_507){
return _507;
}
}
return null;
};
var _50a=function(name,_50b){
this.name=name;
this.types=_50b;
};
var _50c="";
var _50d=_2.acorn.makePredicate("self _cmd undefined localStorage arguments");
var _50e=_2.acorn.makePredicate("delete in instanceof new typeof void");
var _50f=_2.acorn.makePredicate("LogicalExpression BinaryExpression");
var _510=_2.acorn.makePredicate("in instanceof");
var _511=function(_512,aURL,_513,pass,_514,_515){
this.source=_512;
this.URL=new CFURL(aURL);
this.pass=pass;
this.jsBuffer=new _2ad();
this.imBuffer=null;
this.cmBuffer=null;
this.warnings=[];
try{
this.tokens=_2.acorn.parse(_512);
}
catch(e){
if(e.lineStart){
var _516=this.prettifyMessage(e,"ERROR");
console.log(_516);
}
throw e;
}
this.dependencies=[];
this.flags=_513|_511.Flags.IncludeDebugSymbols;
this.classDefs=_514?_514:Object.create(null);
this.protocolDefs=_515?_515:Object.create(null);
this.lastPos=0;
if(_50c&_511.Flags.Generate){
this.generate=true;
}
this.generate=true;
_517(this.tokens,new _4cc(null,{compiler:this}),pass===2?_518:_519);
};
_2.ObjJAcornCompiler=_511;
_2.ObjJAcornCompiler.compileToExecutable=function(_51a,aURL,_51b){
_511.currentCompileFile=aURL;
return new _511(_51a,aURL,_51b,2).executable();
};
_2.ObjJAcornCompiler.compileToIMBuffer=function(_51c,aURL,_51d,_51e,_51f){
return new _511(_51c,aURL,_51d,2,_51e,_51f).IMBuffer();
};
_2.ObjJAcornCompiler.compileFileDependencies=function(_520,aURL,_521){
_511.currentCompileFile=aURL;
return new _511(_520,aURL,_521,1).executable();
};
_511.prototype.compilePass2=function(){
_511.currentCompileFile=this.URL;
this.pass=2;
this.jsBuffer=new _2ad();
this.warnings=[];
_517(this.tokens,new _4cc(null,{compiler:this}),_518);
for(var i=0;i<this.warnings.length;i++){
var _522=this.prettifyMessage(this.warnings[i],"WARNING");
console.log(_522);
}
return this.jsBuffer.toString();
};
var _50c="";
_2.setCurrentCompilerFlags=function(_523){
_50c=_523;
};
_2.currentCompilerFlags=function(_524){
return _50c;
};
_511.Flags={};
_511.Flags.IncludeDebugSymbols=1<<0;
_511.Flags.IncludeTypeSignatures=1<<1;
_511.Flags.Generate=1<<2;
_511.prototype.addWarning=function(_525){
this.warnings.push(_525);
};
_511.prototype.getIvarForClass=function(_526,_527){
var ivar=_527.getIvarForCurrentClass(_526);
if(ivar){
return ivar;
}
var c=this.getClassDef(_527.currentClassName());
while(c){
var _528=c.ivars;
if(_528){
var _529=_528[_526];
if(_529){
return _529;
}
}
c=c.superClass;
}
};
_511.prototype.getClassDef=function(_52a){
if(!_52a){
return null;
}
var c=this.classDefs[_52a];
if(c){
return c;
}
if(typeof objj_getClass==="function"){
var _52b=objj_getClass(_52a);
if(_52b){
var _52c=class_copyIvarList(_52b),_52d=_52c.length,_52e=Object.create(null),_52f=class_copyProtocolList(_52b),_530=_52f.length,_531=Object.create(null),_532=_511.methodDefsFromMethodList(class_copyMethodList(_52b)),_533=_511.methodDefsFromMethodList(class_copyMethodList(_52b.isa)),_534=class_getSuperclass(_52b);
for(var i=0;i<_52d;i++){
var ivar=_52c[i];
_52e[ivar.name]={"type":ivar.type,"name":ivar.name};
}
for(var i=0;i<_530;i++){
var _535=_52f[i],_536=protocol_getName(_535),_537=this.getProtocolDef(_536);
_531[_536]=_537;
}
c=new _4d9(true,_52a,_534?this.getClassDef(_534.name):null,_52e,_532,_533,_531);
this.classDefs[_52a]=c;
return c;
}
}
return null;
};
_511.prototype.getProtocolDef=function(_538){
if(!_538){
return null;
}
var p=this.protocolDefs[_538];
if(p){
return p;
}
if(typeof objj_getProtocol==="function"){
var _539=objj_getProtocol(_538);
if(_539){
var _53a=protocol_getName(_539),_53b=protocol_copyMethodDescriptionList(_539,true,true),_53c=_511.methodDefsFromMethodList(_53b),_53d=protocol_copyMethodDescriptionList(_539,true,false),_53e=_511.methodDefsFromMethodList(_53d),_53f=_539.protocols,_540=[];
if(_53f){
for(var i=0,size=_53f.length;i<size;i++){
_540.push(compiler.getProtocolDef(_53f[i].name));
}
}
p=new _4fc(_53a,_540,_53c,_53e);
this.protocolDefs[_538]=p;
return p;
}
}
return null;
};
_511.methodDefsFromMethodList=function(_541){
var _542=_541.length,_543=Object.create(null);
for(var i=0;i<_542;i++){
var _544=_541[i],_545=method_getName(_544);
_543[_545]=new _50a(_545,_544.types);
}
return _543;
};
_511.prototype.executable=function(){
if(!this._executable){
this._executable=new _2bc(this.jsBuffer?this.jsBuffer.toString():null,this.dependencies,this.URL,null,this);
}
return this._executable;
};
_511.prototype.IMBuffer=function(){
return this.imBuffer;
};
_511.prototype.JSBuffer=function(){
return this.jsBuffer;
};
_511.prototype.prettifyMessage=function(_546,_547){
var line=this.source.substring(_546.lineStart,_546.lineEnd),_548="\n"+line;
_548+=(new Array(_546.column+1)).join(" ");
_548+=(new Array(Math.min(1,line.length)+1)).join("^")+"\n";
_548+=_547+" line "+_546.line+" in "+this.URL+": "+_546.message;
return _548;
};
_511.prototype.error_message=function(_549,node){
var pos=_2.acorn.getLineInfo(this.source,node.start),_54a={message:_549,line:pos.line,column:pos.column,lineStart:pos.lineStart,lineEnd:pos.lineEnd};
return new SyntaxError(this.prettifyMessage(_54a,"ERROR"));
};
_511.prototype.pushImport=function(url){
if(!_511.importStack){
_511.importStack=[];
}
_511.importStack.push(url);
};
_511.prototype.popImport=function(){
_511.importStack.pop();
};
function _4d6(_54b,node,code){
var _54c=_2.acorn.getLineInfo(code,node.start);
_54c.message=_54b;
return _54c;
};
function _517(node,_54d,_54e){
function c(node,st,_54f){
_54e[_54f||node.type](node,st,c);
};
c(node,_54d);
};
function _550(node){
switch(node.type){
case "Literal":
case "Identifier":
return true;
case "ArrayExpression":
for(var i=0;i<node.elements.length;++i){
if(!_550(node.elements[i])){
return false;
}
}
return true;
case "DictionaryLiteral":
for(var i=0;i<node.keys.length;++i){
if(!_550(node.keys[i])){
return false;
}
if(!_550(node.values[i])){
return false;
}
}
return true;
case "ObjectExpression":
for(var i=0;i<node.properties.length;++i){
if(!_550(node.properties[i].value)){
return false;
}
}
return true;
case "FunctionExpression":
for(var i=0;i<node.params.length;++i){
if(!_550(node.params[i])){
return false;
}
}
return true;
case "SequenceExpression":
for(var i=0;i<node.expressions.length;++i){
if(!_550(node.expressions[i])){
return false;
}
}
return true;
case "UnaryExpression":
return _550(node.argument);
case "BinaryExpression":
return _550(node.left)&&_550(node.right);
case "ConditionalExpression":
return _550(node.test)&&_550(node.consequent)&&_550(node.alternate);
case "MemberExpression":
return _550(node.object)&&(!node.computed||_550(node.property));
case "Dereference":
return _550(node.expr);
case "Reference":
return _550(node.element);
default:
return false;
}
};
function _551(st,node){
if(!_550(node)){
throw st.compiler.error_message("Dereference of expression with side effects",node);
}
};
function _552(c){
return function(node,st,_553){
st.compiler.jsBuffer.concat("(");
c(node,st,_553);
st.compiler.jsBuffer.concat(")");
};
};
var _554={"*":3,"/":3,"%":3,"+":4,"-":4,"<<":5,">>":5,">>>":5,"<":6,"<=":6,">":6,">=":6,"in":6,"instanceof":6,"==":7,"!=":7,"===":7,"!==":7,"&":8,"^":9,"|":10,"&&":11,"||":12};
var _555={MemberExpression:0,CallExpression:1,NewExpression:2,FunctionExpression:3,UnaryExpression:4,UpdateExpression:4,BinaryExpression:5,LogicalExpression:6,ConditionalExpression:7,AssignmentExpression:8};
function _556(node,_557,_558){
var _559=node.type,_556=_555[_559]||-1,_55a=_555[_557.type]||-1,_55b,_55c;
return _556<_55a||(_556===_55a&&_50f(_559)&&((_55b=_554[node.operator])<(_55c=_554[_557.operator])||(_558&&_55b===_55c)));
};
var _519=_2.acorn.walk.make({ImportStatement:function(node,st,c){
var _55d=node.filename.value;
st.compiler.dependencies.push(new _2eb(new CFURL(_55d),node.localfilepath));
}});
var _55e=4;
var _55f=Array(_55e+1).join(" ");
var _560="";
var _518=_2.acorn.walk.make({Program:function(node,st,c){
var _561=st.compiler,_562=_561.generate;
_560="";
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(!_562){
_561.jsBuffer.concat(_561.source.substring(_561.lastPos,node.end));
}
var _563=st.maybeWarnings();
if(_563){
for(var i=0;i<_563.length;i++){
var _564=_563[i];
if(_564.checkIfWarning(st)){
_561.addWarning(_564.message);
}
}
}
},BlockStatement:function(node,st,c){
var _565=st.compiler,_566=_565.generate,_567;
if(_566){
st.indentBlockLevel=typeof st.indentBlockLevel==="undefined"?0:st.indentBlockLevel+1;
_567=_565.jsBuffer;
_567.concat(_560.substring(_55e));
_567.concat("{\n");
}
for(var i=0;i<node.body.length;++i){
c(node.body[i],st,"Statement");
}
if(_566){
_567.concat(_560.substring(_55e));
_567.concat("}");
if(st.isDecl||st.indentBlockLevel>0){
_567.concat("\n");
}
st.indentBlockLevel--;
}
},ExpressionStatement:function(node,st,c){
var _568=st.compiler,_569=_568.generate;
if(_569){
_568.jsBuffer.concat(_560);
}
c(node.expression,st,"Expression");
if(_569){
_568.jsBuffer.concat(";\n");
}
},IfStatement:function(node,st,c){
var _56a=st.compiler,_56b=_56a.generate,_56c;
if(_56b){
_56c=_56a.jsBuffer;
if(!st.superNodeIsElse){
_56c.concat(_560);
}else{
delete st.superNodeIsElse;
}
_56c.concat("if (");
}
c(node.test,st,"Expression");
if(_56b){
_56c.concat(node.consequent.type==="EmptyStatement"?");\n":")\n");
}
_560+=_55f;
c(node.consequent,st,"Statement");
_560=_560.substring(_55e);
var _56d=node.alternate;
if(_56d){
var _56e=_56d.type!=="IfStatement";
if(_56b){
var _56f=_56d.type==="EmptyStatement";
_56c.concat(_560);
_56c.concat(_56e?_56f?"else;\n":"else\n":"else ");
}
if(_56e){
_560+=_55f;
}else{
st.superNodeIsElse=true;
}
c(_56d,st,"Statement");
if(_56e){
_560=_560.substring(_55e);
}
}
},LabeledStatement:function(node,st,c){
var _570=st.compiler;
if(_570.generate){
var _571=_570.jsBuffer;
_571.concat(_560);
_571.concat(node.label.name);
_571.concat(": ");
}
c(node.body,st,"Statement");
},BreakStatement:function(node,st,c){
var _572=st.compiler;
if(_572.generate){
_572.jsBuffer.concat(_560);
if(node.label){
_572.jsBuffer.concat("break ");
_572.jsBuffer.concat(node.label.name);
_572.jsBuffer.concat(";\n");
}else{
_572.jsBuffer.concat("break;\n");
}
}
},ContinueStatement:function(node,st,c){
var _573=st.compiler;
if(_573.generate){
var _574=_573.jsBuffer;
_574.concat(_560);
if(node.label){
_574.concat("continue ");
_574.concat(node.label.name);
_574.concat(";\n");
}else{
_574.concat("continue;\n");
}
}
},WithStatement:function(node,st,c){
var _575=st.compiler,_576=_575.generate,_577;
if(_576){
_577=_575.jsBuffer;
_577.concat(_560);
_577.concat("with(");
}
c(node.object,st,"Expression");
if(_576){
_577.concat(")\n");
}
_560+=_55f;
c(node.body,st,"Statement");
_560=_560.substring(_55e);
},SwitchStatement:function(node,st,c){
var _578=st.compiler,_579=_578.generate,_57a;
if(_579){
_57a=_578.jsBuffer;
_57a.concat(_560);
_57a.concat("switch(");
}
c(node.discriminant,st,"Expression");
if(_579){
_57a.concat(") {\n");
}
for(var i=0;i<node.cases.length;++i){
var cs=node.cases[i];
if(cs.test){
if(_579){
_57a.concat(_560);
_57a.concat("case ");
}
c(cs.test,st,"Expression");
if(_579){
_57a.concat(":\n");
}
}else{
if(_579){
_57a.concat("default:\n");
}
}
_560+=_55f;
for(var j=0;j<cs.consequent.length;++j){
c(cs.consequent[j],st,"Statement");
}
_560=_560.substring(_55e);
}
if(_579){
_57a.concat(_560);
_57a.concat("}\n");
}
},ReturnStatement:function(node,st,c){
var _57b=st.compiler,_57c=_57b.generate,_57d;
if(_57c){
_57d=_57b.jsBuffer;
_57d.concat(_560);
_57d.concat("return");
}
if(node.argument){
if(_57c){
_57d.concat(" ");
}
c(node.argument,st,"Expression");
}
if(_57c){
_57d.concat(";\n");
}
},ThrowStatement:function(node,st,c){
var _57e=st.compiler,_57f=_57e.generate,_580;
if(_57f){
_580=_57e.jsBuffer;
_580.concat(_560);
_580.concat("throw ");
}
c(node.argument,st,"Expression");
if(_57f){
_580.concat(";\n");
}
},TryStatement:function(node,st,c){
var _581=st.compiler,_582=_581.generate,_583;
if(_582){
_583=_581.jsBuffer;
_583.concat(_560);
_583.concat("try");
}
_560+=_55f;
c(node.block,st,"Statement");
_560=_560.substring(_55e);
for(var i=0;i<node.handlers.length;++i){
var _584=node.handlers[i],_585=new _4cc(st),_586=_584.param,name=_586.name;
_585.vars[name]={type:"catch clause",node:_586};
if(_582){
_583.concat(_560);
_583.concat("catch(");
_583.concat(name);
_583.concat(") ");
}
_560+=_55f;
c(_584.body,_585,"ScopeBody");
_560=_560.substring(_55e);
_585.copyAddedSelfToIvarsToParent();
}
if(node.finalizer){
if(_582){
_583.concat(_560);
_583.concat("finally ");
}
_560+=_55f;
c(node.finalizer,st,"Statement");
_560=_560.substring(_55e);
}
},WhileStatement:function(node,st,c){
var _587=st.compiler,_588=_587.generate,body=node.body,_589;
if(_588){
_589=_587.jsBuffer;
_589.concat(_560);
_589.concat("while (");
}
c(node.test,st,"Expression");
if(_588){
_589.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_560+=_55f;
c(body,st,"Statement");
_560=_560.substring(_55e);
},DoWhileStatement:function(node,st,c){
var _58a=st.compiler,_58b=_58a.generate,_58c;
if(_58b){
_58c=_58a.jsBuffer;
_58c.concat(_560);
_58c.concat("do\n");
}
_560+=_55f;
c(node.body,st,"Statement");
_560=_560.substring(_55e);
if(_58b){
_58c.concat(_560);
_58c.concat("while (");
}
c(node.test,st,"Expression");
if(_58b){
_58c.concat(");\n");
}
},ForStatement:function(node,st,c){
var _58d=st.compiler,_58e=_58d.generate,body=node.body,_58f;
if(_58e){
_58f=_58d.jsBuffer;
_58f.concat(_560);
_58f.concat("for (");
}
if(node.init){
c(node.init,st,"ForInit");
}
if(_58e){
_58f.concat("; ");
}
if(node.test){
c(node.test,st,"Expression");
}
if(_58e){
_58f.concat("; ");
}
if(node.update){
c(node.update,st,"Expression");
}
if(_58e){
_58f.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_560+=_55f;
c(body,st,"Statement");
_560=_560.substring(_55e);
},ForInStatement:function(node,st,c){
var _590=st.compiler,_591=_590.generate,body=node.body,_592;
if(_591){
_592=_590.jsBuffer;
_592.concat(_560);
_592.concat("for (");
}
c(node.left,st,"ForInit");
if(_591){
_592.concat(" in ");
}
c(node.right,st,"Expression");
if(_591){
_592.concat(body.type==="EmptyStatement"?");\n":")\n");
}
_560+=_55f;
c(body,st,"Statement");
_560=_560.substring(_55e);
},ForInit:function(node,st,c){
var _593=st.compiler,_594=_593.generate;
if(node.type==="VariableDeclaration"){
st.isFor=true;
c(node,st);
delete st.isFor;
}else{
c(node,st,"Expression");
}
},DebuggerStatement:function(node,st,c){
var _595=st.compiler;
if(_595.generate){
var _596=_595.jsBuffer;
_596.concat(_560);
_596.concat("debugger;\n");
}
},Function:function(node,st,c){
var _597=st.compiler,_598=_597.generate,_599=_597.jsBuffer;
inner=new _4cc(st),decl=node.type=="FunctionDeclaration";
inner.isDecl=decl;
for(var i=0;i<node.params.length;++i){
inner.vars[node.params[i].name]={type:"argument",node:node.params[i]};
}
if(node.id){
(decl?st:inner).vars[node.id.name]={type:decl?"function":"function name",node:node.id};
if(_598){
_599.concat(node.id.name);
_599.concat(" = ");
}else{
_599.concat(_597.source.substring(_597.lastPos,node.start));
_599.concat(node.id.name);
_599.concat(" = function");
_597.lastPos=node.id.end;
}
}
if(_598){
_599.concat("function(");
for(var i=0;i<node.params.length;++i){
if(i){
_599.concat(", ");
}
_599.concat(node.params[i].name);
}
_599.concat(")\n");
}
_560+=_55f;
c(node.body,inner,"ScopeBody");
_560=_560.substring(_55e);
inner.copyAddedSelfToIvarsToParent();
},VariableDeclaration:function(node,st,c){
var _59a=st.compiler,_59b=_59a.generate,_59c;
if(_59b){
_59c=_59a.jsBuffer;
if(!st.isFor){
_59c.concat(_560);
}
_59c.concat("var ");
}
for(var i=0;i<node.declarations.length;++i){
var decl=node.declarations[i],_59d=decl.id.name;
if(i){
if(_59b){
if(st.isFor){
_59c.concat(", ");
}else{
_59c.concat(",\n");
_59c.concat(_560);
_59c.concat("    ");
}
}
}
st.vars[_59d]={type:"var",node:decl.id};
if(_59b){
_59c.concat(_59d);
}
if(decl.init){
if(_59b){
_59c.concat(" = ");
}
c(decl.init,st,"Expression");
}
if(st.addedSelfToIvars){
var _59e=st.addedSelfToIvars[_59d];
if(_59e){
var _59c=st.compiler.jsBuffer.atoms;
for(var i=0;i<_59e.length;i++){
var dict=_59e[i];
_59c[dict.index]="";
_59a.addWarning(_4d6("Local declaration of '"+_59d+"' hides instance variable",dict.node,_59a.source));
}
st.addedSelfToIvars[_59d]=[];
}
}
}
if(_59b&&!st.isFor){
_59a.jsBuffer.concat(";\n");
}
},ThisExpression:function(node,st,c){
var _59f=st.compiler;
if(_59f.generate){
_59f.jsBuffer.concat("this");
}
},ArrayExpression:function(node,st,c){
var _5a0=st.compiler,_5a1=_5a0.generate;
if(_5a1){
_5a0.jsBuffer.concat("[");
}
for(var i=0;i<node.elements.length;++i){
var elt=node.elements[i];
if(i!==0){
if(_5a1){
_5a0.jsBuffer.concat(", ");
}
}
if(elt){
c(elt,st,"Expression");
}
}
if(_5a1){
_5a0.jsBuffer.concat("]");
}
},ObjectExpression:function(node,st,c){
var _5a2=st.compiler,_5a3=_5a2.generate;
if(_5a3){
_5a2.jsBuffer.concat("{");
}
for(var i=0;i<node.properties.length;++i){
var prop=node.properties[i];
if(_5a3){
if(i){
_5a2.jsBuffer.concat(", ");
}
st.isPropertyKey=true;
c(prop.key,st,"Expression");
delete st.isPropertyKey;
_5a2.jsBuffer.concat(": ");
}else{
if(prop.key.raw&&prop.key.raw.charAt(0)==="@"){
_5a2.jsBuffer.concat(_5a2.source.substring(_5a2.lastPos,prop.key.start));
_5a2.lastPos=prop.key.start+1;
}
}
c(prop.value,st,"Expression");
}
if(_5a3){
_5a2.jsBuffer.concat("}");
}
},SequenceExpression:function(node,st,c){
var _5a4=st.compiler,_5a5=_5a4.generate;
if(_5a5){
_5a4.jsBuffer.concat("(");
}
for(var i=0;i<node.expressions.length;++i){
if(_5a5&&i!==0){
_5a4.jsBuffer.concat(", ");
}
c(node.expressions[i],st,"Expression");
}
if(_5a5){
_5a4.jsBuffer.concat(")");
}
},UnaryExpression:function(node,st,c){
var _5a6=st.compiler,_5a7=_5a6.generate,_5a8=node.argument;
if(_5a7){
if(node.prefix){
_5a6.jsBuffer.concat(node.operator);
if(_50e(node.operator)){
_5a6.jsBuffer.concat(" ");
}
(_556(node,_5a8)?_552(c):c)(_5a8,st,"Expression");
}else{
(_556(node,_5a8)?_552(c):c)(_5a8,st,"Expression");
_5a6.jsBuffer.concat(node.operator);
}
}else{
c(_5a8,st,"Expression");
}
},UpdateExpression:function(node,st,c){
var _5a9=st.compiler,_5aa=_5a9.generate;
if(node.argument.type==="Dereference"){
_551(st,node.argument);
if(!_5aa){
_5a9.jsBuffer.concat(_5a9.source.substring(_5a9.lastPos,node.start));
}
_5a9.jsBuffer.concat((node.prefix?"":"(")+"(");
if(!_5aa){
_5a9.lastPos=node.argument.expr.start;
}
c(node.argument.expr,st,"Expression");
if(!_5aa){
_5a9.jsBuffer.concat(_5a9.source.substring(_5a9.lastPos,node.argument.expr.end));
}
_5a9.jsBuffer.concat(")(");
if(!_5aa){
_5a9.lastPos=node.argument.start;
}
c(node.argument,st,"Expression");
if(!_5aa){
_5a9.jsBuffer.concat(_5a9.source.substring(_5a9.lastPos,node.argument.end));
}
_5a9.jsBuffer.concat(" "+node.operator.substring(0,1)+" 1)"+(node.prefix?"":node.operator=="++"?" - 1)":" + 1)"));
if(!_5aa){
_5a9.lastPos=node.end;
}
return;
}
if(node.prefix){
if(_5aa){
_5a9.jsBuffer.concat(node.operator);
if(_50e(node.operator)){
_5a9.jsBuffer.concat(" ");
}
}
(_5aa&&_556(node,node.argument)?_552(c):c)(node.argument,st,"Expression");
}else{
(_5aa&&_556(node,node.argument)?_552(c):c)(node.argument,st,"Expression");
if(_5aa){
_5a9.jsBuffer.concat(node.operator);
}
}
},BinaryExpression:function(node,st,c){
var _5ab=st.compiler,_5ac=_5ab.generate,_5ad=_510(node.operator);
(_5ac&&_556(node,node.left)?_552(c):c)(node.left,st,"Expression");
if(_5ac){
var _5ae=_5ab.jsBuffer;
_5ae.concat(" ");
_5ae.concat(node.operator);
_5ae.concat(" ");
}
(_5ac&&_556(node,node.right,true)?_552(c):c)(node.right,st,"Expression");
},LogicalExpression:function(node,st,c){
var _5af=st.compiler,_5b0=_5af.generate;
(_5b0&&_556(node,node.left)?_552(c):c)(node.left,st,"Expression");
if(_5b0){
var _5b1=_5af.jsBuffer;
_5b1.concat(" ");
_5b1.concat(node.operator);
_5b1.concat(" ");
}
(_5b0&&_556(node,node.right,true)?_552(c):c)(node.right,st,"Expression");
},AssignmentExpression:function(node,st,c){
var _5b2=st.compiler,_5b3=_5b2.generate,_5b4=st.assignment,_5b5=_5b2.jsBuffer;
if(node.left.type==="Dereference"){
_551(st,node.left);
if(!_5b3){
_5b5.concat(_5b2.source.substring(_5b2.lastPos,node.start));
}
_5b5.concat("(");
if(!_5b3){
_5b2.lastPos=node.left.expr.start;
}
c(node.left.expr,st,"Expression");
if(!_5b3){
_5b5.concat(_5b2.source.substring(_5b2.lastPos,node.left.expr.end));
}
_5b5.concat(")(");
if(node.operator!=="="){
if(!_5b3){
_5b2.lastPos=node.left.start;
}
c(node.left,st,"Expression");
if(!_5b3){
_5b5.concat(_5b2.source.substring(_5b2.lastPos,node.left.end));
}
_5b5.concat(" "+node.operator.substring(0,1)+" ");
}
if(!_5b3){
_5b2.lastPos=node.right.start;
}
c(node.right,st,"Expression");
if(!_5b3){
_5b5.concat(_5b2.source.substring(_5b2.lastPos,node.right.end));
}
_5b5.concat(")");
if(!_5b3){
_5b2.lastPos=node.end;
}
return;
}
var _5b4=st.assignment;
st.assignment=true;
(_5b3&&_556(node,node.left)?_552(c):c)(node.left,st,"Expression");
if(_5b3){
_5b5.concat(" ");
_5b5.concat(node.operator);
_5b5.concat(" ");
}
st.assignment=_5b4;
(_5b3&&_556(node,node.right,true)?_552(c):c)(node.right,st,"Expression");
if(st.isRootScope()&&node.left.type==="Identifier"&&!st.getLvar(node.left.name)){
st.vars[node.left.name]={type:"global",node:node.left};
}
},ConditionalExpression:function(node,st,c){
var _5b6=st.compiler,_5b7=_5b6.generate;
(_5b7&&_556(node,node.test)?_552(c):c)(node.test,st,"Expression");
if(_5b7){
_5b6.jsBuffer.concat(" ? ");
}
c(node.consequent,st,"Expression");
if(_5b7){
_5b6.jsBuffer.concat(" : ");
}
c(node.alternate,st,"Expression");
},NewExpression:function(node,st,c){
var _5b8=st.compiler,_5b9=_5b8.generate;
if(_5b9){
_5b8.jsBuffer.concat("new ");
}
(_5b9&&_556(node,node.callee)?_552(c):c)(node.callee,st,"Expression");
if(_5b9){
_5b8.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_5b9&&i){
_5b8.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_5b9){
_5b8.jsBuffer.concat(")");
}
},CallExpression:function(node,st,c){
var _5ba=st.compiler,_5bb=_5ba.generate;
(_5bb&&_556(node,node.callee)?_552(c):c)(node.callee,st,"Expression");
if(_5bb){
_5ba.jsBuffer.concat("(");
}
if(node.arguments){
for(var i=0;i<node.arguments.length;++i){
if(_5bb&&i){
_5ba.jsBuffer.concat(", ");
}
c(node.arguments[i],st,"Expression");
}
}
if(_5bb){
_5ba.jsBuffer.concat(")");
}
},MemberExpression:function(node,st,c){
var _5bc=st.compiler,_5bd=_5bc.generate,_5be=node.computed;
(_5bd&&_556(node,node.object)?_552(c):c)(node.object,st,"Expression");
if(_5bd){
if(_5be){
_5bc.jsBuffer.concat("[");
}else{
_5bc.jsBuffer.concat(".");
}
}
st.secondMemberExpression=!_5be;
(_5bd&&!_5be&&_556(node,node.property)?_552(c):c)(node.property,st,"Expression");
st.secondMemberExpression=false;
if(_5bd&&_5be){
_5bc.jsBuffer.concat("]");
}
},Identifier:function(node,st,c){
var _5bf=st.compiler,_5c0=_5bf.generate,_5c1=node.name;
if(st.currentMethodType()==="-"&&!st.secondMemberExpression&&!st.isPropertyKey){
var lvar=st.getLvar(_5c1,true),ivar=_5bf.getIvarForClass(_5c1,st);
if(ivar){
if(lvar){
_5bf.addWarning(_4d6("Local declaration of '"+_5c1+"' hides instance variable",node,_5bf.source));
}else{
var _5c2=node.start;
if(!_5c0){
do{
_5bf.jsBuffer.concat(_5bf.source.substring(_5bf.lastPos,_5c2));
_5bf.lastPos=_5c2;
}while(_5bf.source.substr(_5c2++,1)==="(");
}
((st.addedSelfToIvars||(st.addedSelfToIvars=Object.create(null)))[_5c1]||(st.addedSelfToIvars[_5c1]=[])).push({node:node,index:_5bf.jsBuffer.atoms.length});
_5bf.jsBuffer.concat("self.");
}
}else{
if(!_50d(_5c1)){
var _5c3,_5c4=typeof _1[_5c1]!=="undefined"||typeof window[_5c1]!=="undefined"||_5bf.getClassDef(_5c1),_5c5=st.getLvar(_5c1);
if(_5c4&&(!_5c5||_5c5.type!=="class")){
}else{
if(!_5c5){
if(st.assignment){
_5c3=new _4d4("Creating global variable inside function or method '"+_5c1+"'",node,_5bf.source);
st.vars[_5c1]={type:"remove global warning",node:node};
}else{
_5c3=new _4d4("Using unknown class or uninitialized global variable '"+_5c1+"'",node,_5bf.source);
}
}
}
if(_5c3){
st.addMaybeWarning(_5c3);
}
}
}
}
if(_5c0){
_5bf.jsBuffer.concat(_5c1);
}
},Literal:function(node,st,c){
var _5c6=st.compiler,_5c7=_5c6.generate;
if(_5c7){
if(node.raw&&node.raw.charAt(0)==="@"){
_5c6.jsBuffer.concat(node.raw.substring(1));
}else{
_5c6.jsBuffer.concat(node.raw);
}
}else{
if(node.raw.charAt(0)==="@"){
_5c6.jsBuffer.concat(_5c6.source.substring(_5c6.lastPos,node.start));
_5c6.lastPos=node.start+1;
}
}
},ArrayLiteral:function(node,st,c){
var _5c8=st.compiler,_5c9=_5c8.generate;
if(!_5c9){
_5c8.jsBuffer.concat(_5c8.source.substring(_5c8.lastPos,node.start));
_5c8.lastPos=node.start;
}
if(!_5c9){
buffer.concat(" ");
}
if(!node.elements.length){
_5c8.jsBuffer.concat("objj_msgSend(objj_msgSend(CPArray, \"alloc\"), \"init\")");
}else{
_5c8.jsBuffer.concat("objj_msgSend(objj_msgSend(CPArray, \"alloc\"), \"initWithObjects:count:\", [");
for(var i=0;i<node.elements.length;i++){
var elt=node.elements[i];
if(i){
_5c8.jsBuffer.concat(", ");
}
if(!_5c9){
_5c8.lastPos=elt.start;
}
c(elt,st,"Expression");
if(!_5c9){
_5c8.jsBuffer.concat(_5c8.source.substring(_5c8.lastPos,elt.end));
}
}
_5c8.jsBuffer.concat("], "+node.elements.length+")");
}
if(!_5c9){
_5c8.lastPos=node.end;
}
},DictionaryLiteral:function(node,st,c){
var _5ca=st.compiler,_5cb=_5ca.generate;
if(!_5cb){
_5ca.jsBuffer.concat(_5ca.source.substring(_5ca.lastPos,node.start));
_5ca.lastPos=node.start;
}
if(!_5cb){
buffer.concat(" ");
}
if(!node.keys.length){
_5ca.jsBuffer.concat("objj_msgSend(objj_msgSend(CPDictionary, \"alloc\"), \"init\")");
}else{
_5ca.jsBuffer.concat("objj_msgSend(objj_msgSend(CPDictionary, \"alloc\"), \"initWithObjectsAndKeys:\"");
for(var i=0;i<node.keys.length;i++){
var key=node.keys[i],_5cc=node.values[i];
_5ca.jsBuffer.concat(", ");
if(!_5cb){
_5ca.lastPos=_5cc.start;
}
c(_5cc,st,"Expression");
if(!_5cb){
_5ca.jsBuffer.concat(_5ca.source.substring(_5ca.lastPos,_5cc.end));
}
_5ca.jsBuffer.concat(", ");
if(!_5cb){
_5ca.lastPos=key.start;
}
c(key,st,"Expression");
if(!_5cb){
_5ca.jsBuffer.concat(_5ca.source.substring(_5ca.lastPos,key.end));
}
}
_5ca.jsBuffer.concat(")");
}
if(!_5cb){
_5ca.lastPos=node.end;
}
},ImportStatement:function(node,st,c){
var _5cd=st.compiler,_5ce=_5cd.generate,_5cf=_5cd.jsBuffer;
if(!_5ce){
_5cf.concat(_5cd.source.substring(_5cd.lastPos,node.start));
}
_5cf.concat("objj_executeFile(\"");
_5cf.concat(node.filename.value);
_5cf.concat(node.localfilepath?"\", YES);":"\", NO);");
if(!_5ce){
_5cd.lastPos=node.end;
}
},ClassDeclarationStatement:function(node,st,c){
var _5d0=st.compiler,_5d1=_5d0.generate,_5d2=_5d0.jsBuffer,_5d3=node.classname.name,_5d4=_5d0.getClassDef(_5d3),_5d5=new _4cc(st),_5d6=node.type==="InterfaceDeclarationStatement",_5d7=node.protocols;
_5d0.imBuffer=new _2ad();
_5d0.cmBuffer=new _2ad();
_5d0.classBodyBuffer=new _2ad();
if(!_5d1){
_5d2.concat(_5d0.source.substring(_5d0.lastPos,node.start));
}
if(node.superclassname){
if(_5d4&&_5d4.ivars){
throw _5d0.error_message("Duplicate class "+_5d3,node.classname);
}
if(_5d6&&_5d4&&_5d4.instanceMethods&&_5d4.classMethods){
throw _5d0.error_message("Duplicate interface definition for class "+_5d3,node.classname);
}
var _5d8=_5d0.getClassDef(node.superclassname.name);
if(!_5d8){
var _5d9="Can't find superclass "+node.superclassname.name;
for(var i=_511.importStack.length;--i>=0;){
_5d9+="\n"+Array((_511.importStack.length-i)*2+1).join(" ")+"Imported by: "+_511.importStack[i];
}
throw _5d0.error_message(_5d9,node.superclassname);
}
_5d4=new _4d9(!_5d6,_5d3,_5d8,Object.create(null));
_5d2.concat("{var the_class = objj_allocateClassPair("+node.superclassname.name+", \""+_5d3+"\"),\nmeta_class = the_class.isa;");
}else{
if(node.categoryname){
_5d4=_5d0.getClassDef(_5d3);
if(!_5d4){
throw _5d0.error_message("Class "+_5d3+" not found ",node.classname);
}
_5d2.concat("{\nvar the_class = objj_getClass(\""+_5d3+"\")\n");
_5d2.concat("if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_5d3+"\\\"\");\n");
_5d2.concat("var meta_class = the_class.isa;");
}else{
_5d4=new _4d9(!_5d6,_5d3,null,Object.create(null));
_5d2.concat("{var the_class = objj_allocateClassPair(Nil, \""+_5d3+"\"),\nmeta_class = the_class.isa;");
}
}
if(_5d7){
for(var i=0,size=_5d7.length;i<size;i++){
_5d2.concat("\nvar aProtocol = objj_getProtocol(\""+_5d7[i].name+"\");");
_5d2.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\""+_5d7[i].name+"\\\"\");");
_5d2.concat("\nclass_addProtocol(the_class, aProtocol);");
}
}
_5d5.classDef=_5d4;
_5d0.currentSuperClass="objj_getClass(\""+_5d3+"\").super_class";
_5d0.currentSuperMetaClass="objj_getMetaClass(\""+_5d3+"\").super_class";
var _5da=true,_5db=false;
if(node.ivardeclarations){
for(var i=0;i<node.ivardeclarations.length;++i){
var _5dc=node.ivardeclarations[i],_5dd=_5dc.ivartype?_5dc.ivartype.name:null,_5de=_5dc.id.name,_5df=_5d4.ivars,ivar={"type":_5dd,"name":_5de},_5e0=_5dc.accessors;
if(_5df[_5de]){
throw _5d0.error_message("Instance variable '"+_5de+"'is already declared for class "+_5d3,_5dc.id);
}
if(_5da){
_5da=false;
_5d2.concat("class_addIvars(the_class, [");
}else{
_5d2.concat(", ");
}
if(_5d0.flags&_511.Flags.IncludeTypeSignatures){
_5d2.concat("new objj_ivar(\""+_5de+"\", \""+_5dd+"\")");
}else{
_5d2.concat("new objj_ivar(\""+_5de+"\")");
}
if(_5dc.outlet){
ivar.outlet=true;
}
_5df[_5de]=ivar;
if(!_5d5.ivars){
_5d5.ivars=Object.create(null);
}
_5d5.ivars[_5de]={type:"ivar",name:_5de,node:_5dc.id,ivar:ivar};
if(_5e0){
var _5e1=(_5e0.property&&_5e0.property.name)||_5de,_5e2=(_5e0.getter&&_5e0.getter.name)||_5e1;
_5d4.addInstanceMethod(new _50a(_5e2,[_5dd]));
if(!_5e0.readonly){
var _5e3=_5e0.setter?_5e0.setter.name:null;
if(!_5e3){
var _5e4=_5e1.charAt(0)=="_"?1:0;
_5e3=(_5e4?"_":"")+"set"+_5e1.substr(_5e4,1).toUpperCase()+_5e1.substring(_5e4+1)+":";
}
_5d4.addInstanceMethod(new _50a(_5e3,["void",_5dd]));
}
_5db=true;
}
}
}
if(!_5da){
_5d2.concat("]);");
}
if(!_5d6&&_5db){
var _5e5=new _2ad();
_5e5.concat(_5d0.source.substring(node.start,node.endOfIvars));
_5e5.concat("\n");
for(var i=0;i<node.ivardeclarations.length;++i){
var _5dc=node.ivardeclarations[i],_5dd=_5dc.ivartype?_5dc.ivartype.name:null,_5de=_5dc.id.name,_5e0=_5dc.accessors;
if(!_5e0){
continue;
}
var _5e1=(_5e0.property&&_5e0.property.name)||_5de,_5e2=(_5e0.getter&&_5e0.getter.name)||_5e1,_5e6="- ("+(_5dd?_5dd:"id")+")"+_5e2+"\n{\nreturn "+_5de+";\n}\n";
_5e5.concat(_5e6);
if(_5e0.readonly){
continue;
}
var _5e3=_5e0.setter?_5e0.setter.name:null;
if(!_5e3){
var _5e4=_5e1.charAt(0)=="_"?1:0;
_5e3=(_5e4?"_":"")+"set"+_5e1.substr(_5e4,1).toUpperCase()+_5e1.substring(_5e4+1)+":";
}
var _5e7="- (void)"+_5e3+"("+(_5dd?_5dd:"id")+")newValue\n{\n";
if(_5e0.copy){
_5e7+="if ("+_5de+" !== newValue)\n"+_5de+" = [newValue copy];\n}\n";
}else{
_5e7+=_5de+" = newValue;\n}\n";
}
_5e5.concat(_5e7);
}
_5e5.concat("\n@end");
var b=_5e5.toString().replace(/@accessors(\(.*\))?/g,"");
var _5e8=_511.compileToIMBuffer(b,"Accessors",_5d0.flags,_5d0.classDefs,_5d0.protocolDefs);
_5d0.imBuffer.concat(_5e8);
}
_5d0.classDefs[_5d3]=_5d4;
var _5e9=node.body,_5ea=_5e9.length;
if(_5ea>0){
if(!_5d1){
_5d0.lastPos=_5e9[0].start;
}
for(var i=0;i<_5ea;++i){
var body=_5e9[i];
c(body,_5d5,"Statement");
}
if(!_5d1){
_5d2.concat(_5d0.source.substring(_5d0.lastPos,body.end));
}
}
if(!_5d6&&!node.categoryname){
_5d2.concat("objj_registerClassPair(the_class);\n");
}
if(_5d0.imBuffer.isEmpty()){
_5d2.concat("class_addMethods(the_class, [");
_5d2.atoms.push.apply(_5d2.atoms,_5d0.imBuffer.atoms);
_5d2.concat("]);\n");
}
if(_5d0.cmBuffer.isEmpty()){
_5d2.concat("class_addMethods(meta_class, [");
_5d2.atoms.push.apply(_5d2.atoms,_5d0.cmBuffer.atoms);
_5d2.concat("]);\n");
}
_5d2.concat("}");
_5d0.jsBuffer=_5d2;
if(!_5d1){
_5d0.lastPos=node.end;
}
if(_5d7){
var _5eb=[];
for(var i=0,size=_5d7.length;i<size;i++){
_5eb.push(_5d0.getProtocolDef(_5d7[i].name));
}
var _5ec=_5d4.listOfNotImplementedMethodsForProtocols(_5eb);
if(_5ec&&_5ec.length>0){
for(var i=0,size=_5ec.length;i<size;i++){
var _5ed=_5ec[i],_5ee=_5ed.methodDef,_5ef=_5ed.protocolDef;
_5d0.addWarning(_4d6("Method '"+_5ee.name+"' in protocol '"+_5ef.name+"' is not implemented",node.classname,_5d0.source));
}
}
}
},ProtocolDeclarationStatement:function(node,st,c){
var _5f0=st.compiler,_5f1=_5f0.generate,_5f2=_5f0.jsBuffer,_5f3=node.protocolname.name,_5f4=_5f0.getProtocolDef(_5f3),_5f5=node.protocols,_5f6=new _4cc(st),_5f7=[];
if(_5f4){
throw _5f0.error_message("Duplicate protocol "+_5f3,node.protocolname);
}
_5f0.imBuffer=new _2ad();
_5f0.cmBuffer=new _2ad();
if(!_5f1){
_5f2.concat(_5f0.source.substring(_5f0.lastPos,node.start));
}
_5f2.concat("{var the_protocol = objj_allocateProtocol(\""+_5f3+"\");");
if(_5f5){
for(var i=0,size=_5f5.length;i<size;i++){
var _5f8=_5f5[i],_5f9=_5f8.name;
inheritProtocolDef=_5f0.getProtocolDef(_5f9);
if(!inheritProtocolDef){
throw _5f0.error_message("Can't find protocol "+_5f9,_5f8);
}
_5f2.concat("\nvar aProtocol = objj_getProtocol(\""+_5f9+"\");");
_5f2.concat("\nif (!aProtocol) throw new SyntaxError(\"*** Could not find definition for protocol \\\""+_5f3+"\\\"\");");
_5f2.concat("\nprotocol_addProtocol(the_protocol, aProtocol);");
_5f7.push(inheritProtocolDef);
}
}
_5f4=new _4fc(_5f3,_5f7);
_5f0.protocolDefs[_5f3]=_5f4;
_5f6.protocolDef=_5f4;
var _5fa=node.required;
if(_5fa){
var _5fb=_5fa.length;
if(_5fb>0){
for(var i=0;i<_5fb;++i){
var _5fc=_5fa[i];
if(!_5f1){
_5f0.lastPos=_5fc.start;
}
c(_5fc,_5f6,"Statement");
}
if(!_5f1){
_5f2.concat(_5f0.source.substring(_5f0.lastPos,_5fc.end));
}
}
}
_5f2.concat("\nobjj_registerProtocol(the_protocol);\n");
if(_5f0.imBuffer.isEmpty()){
_5f2.concat("protocol_addMethodDescriptions(the_protocol, [");
_5f2.atoms.push.apply(_5f2.atoms,_5f0.imBuffer.atoms);
_5f2.concat("], true, true);\n");
}
if(_5f0.cmBuffer.isEmpty()){
_5f2.concat("protocol_addMethodDescriptions(the_protocol, [");
_5f2.atoms.push.apply(_5f2.atoms,_5f0.cmBuffer.atoms);
_5f2.concat("], true, false);\n");
}
_5f2.concat("}");
_5f0.jsBuffer=_5f2;
if(!_5f1){
_5f0.lastPos=node.end;
}
},MethodDeclarationStatement:function(node,st,c){
var _5fd=st.compiler,_5fe=_5fd.generate,_5ff=_5fd.jsBuffer,_600=new _4cc(st),_601=node.methodtype==="-";
selectors=node.selectors,nodeArguments=node.arguments,returnType=node.returntype,types=[returnType?returnType.name:(node.action?"void":"id")],returnTypeProtocols=returnType?returnType.protocols:null;
selector=selectors[0].name;
if(returnTypeProtocols){
for(var i=0,size=returnTypeProtocols.length;i<size;i++){
var _602=returnTypeProtocols[i];
if(!_5fd.getProtocolDef(_602.name)){
_5fd.addWarning(_4d6("Cannot find protocol declaration for '"+_602.name+"'",_602,_5fd.source));
}
}
}
if(!_5fe){
_5ff.concat(_5fd.source.substring(_5fd.lastPos,node.start));
}
_5fd.jsBuffer=_601?_5fd.imBuffer:_5fd.cmBuffer;
for(var i=0;i<nodeArguments.length;i++){
var _603=nodeArguments[i],_604=_603.type,_605=_604?_604.name:"id",_606=_604?_604.protocols:null;
types.push(_604?_604.name:"id");
if(_606){
for(var j=0,size=_606.length;j<size;j++){
var _607=_606[j];
if(!_5fd.getProtocolDef(_607.name)){
_5fd.addWarning(_4d6("Cannot find protocol declaration for '"+_607.name+"'",_607,_5fd.source));
}
}
}
if(i===0){
selector+=":";
}else{
selector+=(selectors[i]?selectors[i].name:"")+":";
}
}
if(_5fd.jsBuffer.isEmpty()){
_5fd.jsBuffer.concat(", ");
}
_5fd.jsBuffer.concat("new objj_method(sel_getUid(\"");
_5fd.jsBuffer.concat(selector);
_5fd.jsBuffer.concat("\"), ");
if(node.body){
_5fd.jsBuffer.concat("function");
if(_5fd.flags&_511.Flags.IncludeDebugSymbols){
_5fd.jsBuffer.concat(" $"+st.currentClassName()+"__"+selector.replace(/:/g,"_"));
}
_5fd.jsBuffer.concat("(self, _cmd");
_600.methodType=node.methodtype;
if(nodeArguments){
for(var i=0;i<nodeArguments.length;i++){
var _603=nodeArguments[i],_608=_603.identifier.name;
_5fd.jsBuffer.concat(", ");
_5fd.jsBuffer.concat(_608);
_600.vars[_608]={type:"method argument",node:_603};
}
}
_5fd.jsBuffer.concat(")\n");
if(!_5fe){
_5fd.lastPos=node.startOfBody;
}
_560+=_55f;
c(node.body,_600,"Statement");
_560=_560.substring(_55e);
if(!_5fe){
_5fd.jsBuffer.concat(_5fd.source.substring(_5fd.lastPos,node.body.end));
}
_5fd.jsBuffer.concat("\n");
}else{
_5fd.jsBuffer.concat("Nil\n");
}
if(_5fd.flags&_511.Flags.IncludeDebugSymbols){
_5fd.jsBuffer.concat(","+JSON.stringify(types));
}
_5fd.jsBuffer.concat(")");
_5fd.jsBuffer=_5ff;
if(!_5fe){
_5fd.lastPos=node.end;
}
var def=st.classDef,_609;
if(def){
_609=_601?def.getInstanceMethod(selector):def.getClassMethod(selector);
}else{
def=st.protocolDef;
}
if(!def){
throw "InternalError: MethodDeclaration without ClassDeclaration or ProtocolDeclaration at line: "+_2.acorn.getLineInfo(_5fd.source,node.start).line;
}
if(!_609){
var _60a=def.protocols;
if(_60a){
for(var i=0,size=_60a.length;i<size;i++){
var _60b=_60a[i],_609=_601?_60b.getInstanceMethod(selector):_60b.getClassMethod(selector);
if(_609){
break;
}
}
}
}
if(_609){
var _60c=_609.types;
if(_60c){
var _60d=_60c.length;
if(_60d>0){
var _60e=_60c[0];
if(_60e!==types[0]&&!(_60e==="id"&&returnType&&returnType.typeisclass)){
_5fd.addWarning(_4d6("Conflicting return type in implementation of '"+selector+"': '"+_60e+"' vs '"+types[0]+"'",returnType||node.action||selectors[0],_5fd.source));
}
for(var i=1;i<_60d;i++){
var _60f=_60c[i];
if(_60f!==types[i]&&!(_60f==="id"&&nodeArguments[i-1].type.typeisclass)){
_5fd.addWarning(_4d6("Conflicting parameter types in implementation of '"+selector+"': '"+_60f+"' vs '"+types[i]+"'",nodeArguments[i-1].type||nodeArguments[i-1].identifier,_5fd.source));
}
}
}
}
}
var _610=new _50a(selector,types);
if(_601){
def.addInstanceMethod(_610);
}else{
def.addClassMethod(_610);
}
},MessageSendExpression:function(node,st,c){
var _611=st.compiler,_612=_611.generate,_613=_611.jsBuffer;
if(!_612){
_613.concat(_611.source.substring(_611.lastPos,node.start));
_611.lastPos=node.object?node.object.start:node.arguments.length?node.arguments[0].start:node.end;
}
if(node.superObject){
if(!_612){
_613.concat(" ");
}
_613.concat("objj_msgSendSuper(");
_613.concat("{ receiver:self, super_class:"+(st.currentMethodType()==="+"?_611.currentSuperMetaClass:_611.currentSuperClass)+" }");
}else{
if(!_612){
_613.concat(" ");
}
_613.concat("objj_msgSend(");
c(node.object,st,"Expression");
if(!_612){
_613.concat(_611.source.substring(_611.lastPos,node.object.end));
}
}
var _614=node.selectors,_615=node.arguments,_616=_614[0],_617=_616?_616.name:"";
for(var i=0;i<_615.length;i++){
if(i===0){
_617+=":";
}else{
_617+=(_614[i]?_614[i].name:"")+":";
}
}
_613.concat(", \"");
_613.concat(_617);
_613.concat("\"");
if(node.arguments){
for(var i=0;i<node.arguments.length;i++){
var _618=node.arguments[i];
_613.concat(", ");
if(!_612){
_611.lastPos=_618.start;
}
c(_618,st,"Expression");
if(!_612){
_613.concat(_611.source.substring(_611.lastPos,_618.end));
_611.lastPos=_618.end;
}
}
}
if(node.parameters){
for(var i=0;i<node.parameters.length;++i){
var _619=node.parameters[i];
_613.concat(", ");
if(!_612){
_611.lastPos=_619.start;
}
c(_619,st,"Expression");
if(!_612){
_613.concat(_611.source.substring(_611.lastPos,_619.end));
_611.lastPos=_619.end;
}
}
}
_613.concat(")");
if(!_612){
_611.lastPos=node.end;
}
},SelectorLiteralExpression:function(node,st,c){
var _61a=st.compiler,_61b=_61a.jsBuffer,_61c=_61a.generate;
if(!_61c){
_61b.concat(_61a.source.substring(_61a.lastPos,node.start));
_61b.concat(" ");
}
_61b.concat("sel_getUid(\"");
_61b.concat(node.selector);
_61b.concat("\")");
if(!_61c){
_61a.lastPos=node.end;
}
},ProtocolLiteralExpression:function(node,st,c){
var _61d=st.compiler,_61e=_61d.jsBuffer,_61f=_61d.generate;
if(!_61f){
_61e.concat(_61d.source.substring(_61d.lastPos,node.start));
_61e.concat(" ");
}
_61e.concat("objj_getProtocol(\"");
_61e.concat(node.id.name);
_61e.concat("\")");
if(!_61f){
_61d.lastPos=node.end;
}
},Reference:function(node,st,c){
var _620=st.compiler,_621=_620.jsBuffer,_622=_620.generate;
if(!_622){
_621.concat(_620.source.substring(_620.lastPos,node.start));
_621.concat(" ");
}
_621.concat("function(__input) { if (arguments.length) return ");
_621.concat(node.element.name);
_621.concat(" = __input; return ");
_621.concat(node.element.name);
_621.concat("; }");
if(!_622){
_620.lastPos=node.end;
}
},Dereference:function(node,st,c){
var _623=st.compiler,_624=_623.generate;
_551(st,node.expr);
if(!_624){
_623.jsBuffer.concat(_623.source.substring(_623.lastPos,node.start));
_623.lastPos=node.expr.start;
}
c(node.expr,st,"Expression");
if(!_624){
_623.jsBuffer.concat(_623.source.substring(_623.lastPos,node.expr.end));
}
_623.jsBuffer.concat("()");
if(!_624){
_623.lastPos=node.end;
}
},ClassStatement:function(node,st,c){
var _625=st.compiler;
if(!_625.generate){
_625.jsBuffer.concat(_625.source.substring(_625.lastPos,node.start));
_625.lastPos=node.start;
_625.jsBuffer.concat("//");
}
var _626=node.id.name;
if(!_625.getClassDef(_626)){
classDef=new _4d9(false,_626);
_625.classDefs[_626]=classDef;
}
st.vars[node.id.name]={type:"class",node:node.id};
},GlobalStatement:function(node,st,c){
var _627=st.compiler;
if(!_627.generate){
_627.jsBuffer.concat(_627.source.substring(_627.lastPos,node.start));
_627.lastPos=node.start;
_627.jsBuffer.concat("//");
}
st.rootScope().vars[node.id.name]={type:"global",node:node.id};
},PreprocessStatement:function(node,st,c){
var _628=st.compiler;
if(!_628.generate){
_628.jsBuffer.concat(_628.source.substring(_628.lastPos,node.start));
_628.lastPos=node.start;
_628.jsBuffer.concat("//");
}
}});
function _2eb(aURL,_629){
this._URL=aURL;
this._isLocal=_629;
};
_2.FileDependency=_2eb;
_2eb.prototype.URL=function(){
return this._URL;
};
_2eb.prototype.isLocal=function(){
return this._isLocal;
};
_2eb.prototype.toMarkedString=function(){
var _62a=this.URL().absoluteString();
return (this.isLocal()?_233:_232)+";"+_62a.length+";"+_62a;
};
_2eb.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _62b=0,_62c=1,_62d=2,_62e=0;
function _2bc(_62f,_630,aURL,_631,_632,_633){
if(arguments.length===0){
return this;
}
this._code=_62f;
this._function=_631||null;
this._URL=_1cd(aURL||new CFURL("(Anonymous"+(_62e++)+")"));
this._compiler=_632||null;
this._fileDependencies=_630;
this._filenameTranslateDictionary=_633;
if(_630.length){
this._fileDependencyStatus=_62b;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_62d;
}
if(this._function){
return;
}
if(!_632){
this.setCode(_62f);
}
};
_2.Executable=_2bc;
_2bc.prototype.path=function(){
return this.URL().path();
};
_2bc.prototype.URL=function(){
return this._URL;
};
_2bc.prototype.functionParameters=function(){
var _634=["global","objj_executeFile","objj_importFile"];
return _634;
};
_2bc.prototype.functionArguments=function(){
var _635=[_1,this.fileExecuter(),this.fileImporter()];
return _635;
};
_2bc.prototype.execute=function(){
if(this._compiler){
var _636=this.fileDependencies(),_9d=0,_637=_636.length;
this._compiler.pushImport(this.URL().lastPathComponent());
for(;_9d<_637;++_9d){
var _638=_636[_9d],_639=_638.isLocal(),URL=_638.URL();
this.fileExecuter()(URL,_639);
}
this._compiler.popImport();
this.setCode(this._compiler.compilePass2());
this._compiler=null;
}
var _63a=_63b;
_63b=CFBundle.bundleContainingURL(this.URL());
var _63c=this._function.apply(_1,this.functionArguments());
_63b=_63a;
return _63c;
};
_2bc.prototype.code=function(){
return this._code;
};
_2bc.prototype.setCode=function(code){
this._code=code;
var _63d=this.functionParameters().join(",");
this._function=new Function(_63d,code);
};
_2bc.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_2bc.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_62d;
};
var _63e=0,_63f=[],_640={};
_2bc.prototype.loadFileDependencies=function(_641){
var _642=this._fileDependencyStatus;
if(_641){
if(_642===_62d){
return _641();
}
this._fileDependencyCallbacks.push(_641);
}
if(_642===_62b){
if(_63e){
throw "Can't load";
}
_643(this);
}
};
function _643(_644){
_63f.push(_644);
_644._fileDependencyStatus=_62c;
var _645=_644.fileDependencies(),_9d=0,_646=_645.length,_647=_644.referenceURL(),_648=_647.absoluteString(),_649=_644.fileExecutableSearcher();
_63e+=_646;
for(;_9d<_646;++_9d){
var _64a=_645[_9d],_64b=_64a.isLocal(),URL=_64a.URL(),_64c=(_64b&&(_648+" ")||"")+URL;
if(_640[_64c]){
if(--_63e===0){
_64d();
}
continue;
}
_640[_64c]=YES;
_649(URL,_64b,_64e);
}
};
function _64e(_64f){
--_63e;
if(_64f._fileDependencyStatus===_62b){
_643(_64f);
}else{
if(_63e===0){
_64d();
}
}
};
function _64d(){
var _650=_63f,_9d=0,_651=_650.length;
_63f=[];
for(;_9d<_651;++_9d){
_650[_9d]._fileDependencyStatus=_62d;
}
for(_9d=0;_9d<_651;++_9d){
var _652=_650[_9d],_653=_652._fileDependencyCallbacks,_654=0,_655=_653.length;
for(;_654<_655;++_654){
_653[_654]();
}
_652._fileDependencyCallbacks=[];
}
};
_2bc.prototype.referenceURL=function(){
if(this._referenceURL===_2f){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_2bc.prototype.fileImporter=function(){
return _2bc.fileImporterForURL(this.referenceURL());
};
_2bc.prototype.fileExecuter=function(){
return _2bc.fileExecuterForURL(this.referenceURL());
};
_2bc.prototype.fileExecutableSearcher=function(){
return _2bc.fileExecutableSearcherForURL(this.referenceURL());
};
var _656={};
_2bc.fileExecuterForURL=function(aURL){
var _657=_1cd(aURL),_658=_657.absoluteString(),_659=_656[_658];
if(!_659){
_659=function(aURL,_65a,_65b){
_2bc.fileExecutableSearcherForURL(_657)(aURL,_65a,function(_65c){
if(!_65c.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_65c.execute(_65b);
});
};
_656[_658]=_659;
}
return _659;
};
var _65d={};
_2bc.fileImporterForURL=function(aURL){
var _65e=_1cd(aURL),_65f=_65e.absoluteString(),_660=_65d[_65f];
if(!_660){
_660=function(aURL,_661,_662){
_169();
_2bc.fileExecutableSearcherForURL(_65e)(aURL,_661,function(_663){
_663.loadFileDependencies(function(){
_663.execute();
_16a();
if(_662){
_662();
}
});
});
};
_65d[_65f]=_660;
}
return _660;
};
var _664={},_665={};
function _24b(x){
var _666=0;
for(var k in x){
if(x.hasOwnProperty(k)){
++_666;
}
}
return _666;
};
_2bc.resetCachedFileExecutableSearchers=function(){
_664={};
_665={};
_65d={};
_656={};
_640={};
};
_2bc.fileExecutableSearcherForURL=function(_667){
var _668=_667.absoluteString(),_669=_664[_668],_66a=_2bc.filenameTranslateDictionary?_2bc.filenameTranslateDictionary():null;
cachedSearchResults={};
if(!_669){
_669=function(aURL,_66b,_66c){
var _66d=(_66b&&_667||"")+aURL,_66e=_665[_66d];
if(_66e){
return _66f(_66e);
}
var _670=(aURL instanceof CFURL)&&aURL.scheme();
if(_66b||_670){
if(!_670){
aURL=new CFURL(aURL,_667);
}
_1b9.resolveResourceAtURL(aURL,NO,_66f,_66a);
}else{
_1b9.resolveResourceAtURLSearchingIncludeURLs(aURL,_66f);
}
function _66f(_671){
if(!_671){
var _672=_511?_511.currentCompileFile:null;
throw new Error("Could not load file at "+aURL+(_672?" when compiling "+_672:""));
}
_665[_66d]=_671;
_66c(new _673(_671.URL(),_66a));
};
};
_664[_668]=_669;
}
return _669;
};
var _674={};
function _673(aURL,_675){
aURL=_1cd(aURL);
var _676=aURL.absoluteString(),_677=_674[_676];
if(_677){
return _677;
}
_674[_676]=this;
var _678=_1b9.resourceAtURL(aURL).contents(),_679=NULL,_67a=aURL.pathExtension().toLowerCase();
if(_678.match(/^@STATIC;/)){
_679=_67b(_678,aURL);
}else{
if((_67a==="j"||!_67a)&&!_678.match(/^{/)){
_679=_2.ObjJAcornCompiler.compileFileDependencies(_678,aURL,_511.Flags.IncludeDebugSymbols);
}else{
_679=new _2bc(_678,[],aURL);
}
}
_2bc.apply(this,[_679.code(),_679.fileDependencies(),aURL,_679._function,_679._compiler,_675]);
this._hasExecuted=NO;
};
_2.FileExecutable=_673;
_673.prototype=new _2bc();
_673.resetFileExecutables=function(){
_674={};
_67c={};
};
_673.prototype.execute=function(_67d){
if(this._hasExecuted&&!_67d){
return;
}
this._hasExecuted=YES;
_2bc.prototype.execute.call(this);
};
_673.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _67b(_67e,aURL){
var _67f=new _118(_67e);
var _680=NULL,code="",_681=[];
while(_680=_67f.getMarker()){
var text=_67f.getString();
if(_680===_231){
code+=text;
}else{
if(_680===_232){
_681.push(new _2eb(new CFURL(text),NO));
}else{
if(_680===_233){
_681.push(new _2eb(new CFURL(text),YES));
}
}
}
}
var fn=_673._lookupCachedFunction(aURL);
if(fn){
return new _2bc(code,_681,aURL,fn);
}
return new _2bc(code,_681,aURL);
};
var _67c={};
_673._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_67c[aURL]=fn;
};
_673._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _67c[aURL];
};
var _682=1,_683=2,_684=4,_685=8;
objj_ivar=function(_686,_687){
this.name=_686;
this.type=_687;
};
objj_method=function(_688,_689,_68a){
this.name=_688;
this.method_imp=_689;
this.types=_68a;
};
objj_class=function(_68b){
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
objj_protocol=function(_68c){
this.name=_68c;
this.instance_methods={};
this.class_methods={};
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
class_getName=function(_68d){
if(_68d==Nil){
return "";
}
return _68d.name;
};
class_isMetaClass=function(_68e){
if(!_68e){
return NO;
}
return ((_68e.info&(_683)));
};
class_getSuperclass=function(_68f){
if(_68f==Nil){
return Nil;
}
return _68f.super_class;
};
class_setSuperclass=function(_690,_691){
_690.super_class=_691;
_690.isa.super_class=_691.isa;
};
class_addIvar=function(_692,_693,_694){
var _695=_692.allocator.prototype;
if(typeof _695[_693]!="undefined"){
return NO;
}
var ivar=new objj_ivar(_693,_694);
_692.ivar_list.push(ivar);
_692.ivar_dtable[_693]=ivar;
_695[_693]=NULL;
return YES;
};
class_addIvars=function(_696,_697){
var _698=0,_699=_697.length,_69a=_696.allocator.prototype;
for(;_698<_699;++_698){
var ivar=_697[_698],name=ivar.name;
if(typeof _69a[name]==="undefined"){
_696.ivar_list.push(ivar);
_696.ivar_dtable[name]=ivar;
_69a[name]=NULL;
}
}
};
class_copyIvarList=function(_69b){
return _69b.ivar_list.slice(0);
};
class_addMethod=function(_69c,_69d,_69e,_69f){
var _6a0=new objj_method(_69d,_69e,_69f);
_69c.method_list.push(_6a0);
_69c.method_dtable[_69d]=_6a0;
if(!((_69c.info&(_683)))&&(((_69c.info&(_683)))?_69c:_69c.isa).isa===(((_69c.info&(_683)))?_69c:_69c.isa)){
class_addMethod((((_69c.info&(_683)))?_69c:_69c.isa),_69d,_69e,_69f);
}
return YES;
};
class_addMethods=function(_6a1,_6a2){
var _6a3=0,_6a4=_6a2.length,_6a5=_6a1.method_list,_6a6=_6a1.method_dtable;
for(;_6a3<_6a4;++_6a3){
var _6a7=_6a2[_6a3];
_6a5.push(_6a7);
_6a6[_6a7.name]=_6a7;
}
if(!((_6a1.info&(_683)))&&(((_6a1.info&(_683)))?_6a1:_6a1.isa).isa===(((_6a1.info&(_683)))?_6a1:_6a1.isa)){
class_addMethods((((_6a1.info&(_683)))?_6a1:_6a1.isa),_6a2);
}
};
class_getInstanceMethod=function(_6a8,_6a9){
if(!_6a8||!_6a9){
return NULL;
}
var _6aa=_6a8.method_dtable[_6a9];
return _6aa?_6aa:NULL;
};
class_getInstanceVariable=function(_6ab,_6ac){
if(!_6ab||!_6ac){
return NULL;
}
var _6ad=_6ab.ivar_dtable[_6ac];
return _6ad;
};
class_getClassMethod=function(_6ae,_6af){
if(!_6ae||!_6af){
return NULL;
}
var _6b0=(((_6ae.info&(_683)))?_6ae:_6ae.isa).method_dtable[_6af];
return _6b0?_6b0:NULL;
};
class_respondsToSelector=function(_6b1,_6b2){
return class_getClassMethod(_6b1,_6b2)!=NULL;
};
class_copyMethodList=function(_6b3){
return _6b3.method_list.slice(0);
};
class_getVersion=function(_6b4){
return _6b4.version;
};
class_setVersion=function(_6b5,_6b6){
_6b5.version=parseInt(_6b6,10);
};
class_replaceMethod=function(_6b7,_6b8,_6b9){
if(!_6b7||!_6b8){
return NULL;
}
var _6ba=_6b7.method_dtable[_6b8],_6bb=NULL;
if(_6ba){
_6bb=_6ba.method_imp;
}
_6ba.method_imp=_6b9;
return _6bb;
};
class_addProtocol=function(_6bc,_6bd){
if(!_6bd||class_conformsToProtocol(_6bc,_6bd)){
return;
}
(_6bc.protocol_list||(_6bc.protocol_list==[])).push(_6bd);
return true;
};
class_conformsToProtocol=function(_6be,_6bf){
if(!_6bf){
return false;
}
while(_6be){
var _6c0=_6be.protocol_list,size=_6c0?_6c0.length:0;
for(var i=0;i<size;i++){
var p=_6c0[i];
if(p.name===_6bf.name){
return true;
}
if(protocol_conformsToProtocol(p,_6bf)){
return true;
}
}
_6be=class_getSuperclass(_6be);
}
return false;
};
class_copyProtocolList=function(_6c1){
var _6c2=_6c1.protocol_list;
return _6c2?_6c2.slice(0):[];
};
protocol_conformsToProtocol=function(p1,p2){
if(!p1||!p2){
return false;
}
if(p1.name===p2.name){
return true;
}
var _6c3=p1.protocol_list,size=_6c3?_6c3.length:0;
for(var i=0;i<size;i++){
var p=_6c3[i];
if(p.name===p2.name){
return true;
}
if(protocol_conformsToProtocol(p,p2)){
return true;
}
}
return false;
};
var _6c4={};
objj_allocateProtocol=function(_6c5){
var _6c6=new objj_protocol(_6c5);
return _6c6;
};
objj_registerProtocol=function(_6c7){
_6c4[_6c7.name]=_6c7;
};
protocol_getName=function(_6c8){
return _6c8.name;
};
protocol_addMethodDescription=function(_6c9,_6ca,_6cb,_6cc,_6cd){
if(!_6c9||!_6ca){
return;
}
if(_6cc){
(_6cd?_6c9.instance_methods:_6c9.class_methods)[_6ca]=new objj_method(_6ca,null,_6cb);
}
};
protocol_addMethodDescriptions=function(_6ce,_6cf,_6d0,_6d1){
if(!_6d0){
return;
}
var _6d2=0,_6d3=_6cf.length,_6d4=_6d1?_6ce.instance_methods:_6ce.class_methods;
for(;_6d2<_6d3;++_6d2){
var _6d5=_6cf[_6d2];
_6d4[_6d5.name]=_6d5;
}
};
protocol_copyMethodDescriptionList=function(_6d6,_6d7,_6d8){
if(!_6d7){
return [];
}
var _6d9=_6d8?_6d6.instance_methods:_6d6.class_methods,_6da=[];
for(var _6db in _6d9){
if(_6d9.hasOwnProperty(_6db)){
_6da.push(_6d9[_6db]);
}
}
return _6da;
};
protocol_addProtocol=function(_6dc,_6dd){
if(!_6dc||!_6dd){
return;
}
(_6dc.protocol_list||(_6dc.protocol_list=[])).push(_6dd);
};
var _6de=function(_6df){
var meta=(((_6df.info&(_683)))?_6df:_6df.isa);
if((_6df.info&(_683))){
_6df=objj_getClass(_6df.name);
}
if(_6df.super_class&&!((((_6df.super_class.info&(_683)))?_6df.super_class:_6df.super_class.isa).info&(_684))){
_6de(_6df.super_class);
}
if(!(meta.info&(_684))&&!(meta.info&(_685))){
meta.info=(meta.info|(_685))&~(0);
objj_msgSend(_6df,"initialize");
meta.info=(meta.info|(_684))&~(_685);
}
};
var _6e0=function(self,_6e1){
var isa=self.isa,_6e2=isa.method_dtable[_6e3];
if(_6e2){
var _6e4=_6e2.method_imp.call(this,self,_6e3,_6e1);
if(_6e4&&_6e4!==self){
arguments[0]=_6e4;
return objj_msgSend.apply(this,arguments);
}
}
_6e2=isa.method_dtable[_6e5];
if(_6e2){
var _6e6=isa.method_dtable[_6e7];
if(_6e6){
var _6e8=_6e2.method_imp.call(this,self,_6e5,_6e1);
if(_6e8){
var _6e9=objj_lookUpClass("CPInvocation");
if(_6e9){
var _6ea=objj_msgSend(_6e9,_6eb,_6e8),_9d=0,_6ec=arguments.length;
for(;_9d<_6ec;++_9d){
objj_msgSend(_6ea,_6ed,arguments[_9d],_9d);
}
_6e6.method_imp.call(this,self,_6e7,_6ea);
return objj_msgSend(_6ea,_6ee);
}
}
}
}
_6e2=isa.method_dtable[_6ef];
if(_6e2){
return _6e2.method_imp.call(this,self,_6ef,_6e1);
}
throw class_getName(isa)+" does not implement doesNotRecognizeSelector:. Did you forget a superclass for "+class_getName(isa)+"?";
};
class_getMethodImplementation=function(_6f0,_6f1){
if(!((((_6f0.info&(_683)))?_6f0:_6f0.isa).info&(_684))){
_6de(_6f0);
}
var _6f2=_6f0.method_dtable[_6f1];
var _6f3=_6f2?_6f2.method_imp:_6e0;
return _6f3;
};
var _6f4={};
objj_allocateClassPair=function(_6f5,_6f6){
var _6f7=new objj_class(_6f6),_6f8=new objj_class(_6f6),_6f9=_6f7;
if(_6f5){
_6f9=_6f5;
while(_6f9.superclass){
_6f9=_6f9.superclass;
}
_6f7.allocator.prototype=new _6f5.allocator;
_6f7.ivar_dtable=_6f7.ivar_store.prototype=new _6f5.ivar_store;
_6f7.method_dtable=_6f7.method_store.prototype=new _6f5.method_store;
_6f8.method_dtable=_6f8.method_store.prototype=new _6f5.isa.method_store;
_6f7.super_class=_6f5;
_6f8.super_class=_6f5.isa;
}else{
_6f7.allocator.prototype=new objj_object();
}
_6f7.isa=_6f8;
_6f7.name=_6f6;
_6f7.info=_682;
_6f7._UID=objj_generateObjectUID();
_6f8.isa=_6f9.isa;
_6f8.name=_6f6;
_6f8.info=_683;
_6f8._UID=objj_generateObjectUID();
return _6f7;
};
var _63b=nil;
objj_registerClassPair=function(_6fa){
_1[_6fa.name]=_6fa;
_6f4[_6fa.name]=_6fa;
_1d4(_6fa,_63b);
};
objj_resetRegisterClasses=function(){
for(var key in _6f4){
delete _1[key];
}
_6f4={};
_6c4={};
_1d7();
};
class_createInstance=function(_6fb){
if(!_6fb){
throw new Error("*** Attempting to create object with Nil class.");
}
var _6fc=new _6fb.allocator();
_6fc.isa=_6fb;
_6fc._UID=objj_generateObjectUID();
return _6fc;
};
var _6fd=function(){
};
_6fd.prototype.member=false;
with(new _6fd()){
member=true;
}
if(new _6fd().member){
var _6fe=class_createInstance;
class_createInstance=function(_6ff){
var _700=_6fe(_6ff);
if(_700){
var _701=_700.isa,_702=_701;
while(_701){
var _703=_701.ivar_list,_704=_703.length;
while(_704--){
_700[_703[_704].name]=NULL;
}
_701=_701.super_class;
}
_700.isa=_702;
}
return _700;
};
}
object_getClassName=function(_705){
if(!_705){
return "";
}
var _706=_705.isa;
return _706?class_getName(_706):"";
};
objj_lookUpClass=function(_707){
var _708=_6f4[_707];
return _708?_708:Nil;
};
objj_getClass=function(_709){
var _70a=_6f4[_709];
if(!_70a){
}
return _70a?_70a:Nil;
};
objj_getClassList=function(_70b,_70c){
for(var _70d in _6f4){
_70b.push(_6f4[_70d]);
if(_70c&&--_70c===0){
break;
}
}
return _70b.length;
};
objj_getMetaClass=function(_70e){
var _70f=objj_getClass(_70e);
return (((_70f.info&(_683)))?_70f:_70f.isa);
};
objj_getProtocol=function(_710){
return _6c4[_710];
};
ivar_getName=function(_711){
return _711.name;
};
ivar_getTypeEncoding=function(_712){
return _712.type;
};
objj_msgSend=function(_713,_714){
if(_713==nil){
return nil;
}
var isa=_713.isa;
if(!((((isa.info&(_683)))?isa:isa.isa).info&(_684))){
_6de(isa);
}
var _715=isa.method_dtable[_714];
var _716=_715?_715.method_imp:_6e0;
switch(arguments.length){
case 2:
return _716(_713,_714);
case 3:
return _716(_713,_714,arguments[2]);
case 4:
return _716(_713,_714,arguments[2],arguments[3]);
}
return _716.apply(_713,arguments);
};
objj_msgSendSuper=function(_717,_718){
var _719=_717.super_class;
arguments[0]=_717.receiver;
if(!((((_719.info&(_683)))?_719:_719.isa).info&(_684))){
_6de(_719);
}
var _71a=_719.method_dtable[_718];
var _71b=_71a?_71a.method_imp:_6e0;
return _71b.apply(_717.receiver,arguments);
};
method_getName=function(_71c){
return _71c.name;
};
method_getImplementation=function(_71d){
return _71d.method_imp;
};
method_setImplementation=function(_71e,_71f){
var _720=_71e.method_imp;
_71e.method_imp=_71f;
return _720;
};
method_exchangeImplementations=function(lhs,rhs){
var _721=method_getImplementation(lhs),_722=method_getImplementation(rhs);
method_setImplementation(lhs,_722);
method_setImplementation(rhs,_721);
};
sel_getName=function(_723){
return _723?_723:"<null selector>";
};
sel_getUid=function(_724){
return _724;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_725){
return _725;
};
objj_class.prototype.toString=objj_object.prototype.toString=function(){
var isa=this.isa;
if(class_getInstanceMethod(isa,_726)){
return objj_msgSend(this,_726);
}
if(class_isMetaClass(isa)){
return this.name;
}
return "["+isa.name+" Object](-description not implemented)";
};
var _726=sel_getUid("description"),_6e3=sel_getUid("forwardingTargetForSelector:"),_6e5=sel_getUid("methodSignatureForSelector:"),_6e7=sel_getUid("forwardInvocation:"),_6ef=sel_getUid("doesNotRecognizeSelector:"),_6eb=sel_getUid("invocationWithMethodSignature:"),_727=sel_getUid("setTarget:"),_728=sel_getUid("setSelector:"),_6ed=sel_getUid("setArgument:atIndex:"),_6ee=sel_getUid("returnValue");
objj_eval=function(_729){
var url=_2.pageURL;
var _72a=_2.asyncLoader;
_2.asyncLoader=NO;
var _72b=_2.preprocess(_729,url,0);
if(!_72b.hasLoadedFileDependencies()){
_72b.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_2bc.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_2bc.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_72b._code+"\n//*/\n}";
var _72c;
_72c=eval(code);
_2.asyncLoader=_72a;
return _72c;
};
_2.objj_eval=objj_eval;
_169();
var _72d=new CFURL(window.location.href),_72e=document.getElementsByTagName("base"),_72f=_72e.length;
if(_72f>0){
var _730=_72e[_72f-1],_731=_730&&_730.getAttribute("href");
if(_731){
_72d=new CFURL(_731,_72d);
}
}
var _732=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1d3=new CFURL(".",new CFURL(_732,_72d)).absoluteURL(),_733=new CFURL("..",_1d3).absoluteURL();
if(_1d3===_733){
_733=new CFURL(_733.schemeAndAuthority());
}
_1b9.resourceAtURL(_733,YES);
_2.pageURL=_72d;
_2.bootstrap=function(){
_734();
};
function _734(){
_1b9.resolveResourceAtURL(_1d3,YES,function(_735){
var _736=_1b9.includeURLs(),_9d=0,_737=_736.length;
for(;_9d<_737;++_9d){
_735.resourceAtURL(_736[_9d],YES);
}
_2bc.fileImporterForURL(_1d3)(_732.lastPathComponent(),YES,function(){
_16a();
_73d(function(){
var _738=window.location.hash.substring(1),args=[];
if(_738.length){
args=_738.split("/");
for(var i=0,_737=args.length;i<_737;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _739=window.location.search.substring(1).split("&"),_73a=new CFMutableDictionary();
for(var i=0,_737=_739.length;i<_737;i++){
var _73b=_739[i].split("=");
if(!_73b[0]){
continue;
}
if(_73b[1]==null){
_73b[1]=true;
}
_73a.setValueForKey(decodeURIComponent(_73b[0]),decodeURIComponent(_73b[1]));
}
main(args,_73a);
});
});
});
};
var _73c=NO;
function _73d(_73e){
if(_73c||document.readyState==="complete"){
return _73e();
}
if(window.addEventListener){
window.addEventListener("load",_73e,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_73e);
}
}
};
_73d(function(){
_73c=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1cd(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1d3);
};
objj_importFile=_2bc.fileImporterForURL(_1d3);
objj_executeFile=_2bc.fileExecuterForURL(_1d3);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
