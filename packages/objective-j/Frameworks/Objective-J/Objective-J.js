var ObjectiveJ={};
(function(_1,_2){
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_3){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_4){
return this.valueOf();
};
}
var cx=new RegExp("[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _5=new RegExp("[\\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _6,_7,_8={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},_9;
function _a(_b){
_5.lastIndex=0;
return _5.test(_b)?"\""+_b.replace(_5,function(a){
var c=_8[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_b+"\"";
};
function _c(_d,_e){
var i,k,v,_f,_10=_6,_11,_12=_e[_d];
if(_12&&typeof _12==="object"&&typeof _12.toJSON==="function"){
_12=_12.toJSON(_d);
}
if(typeof _9==="function"){
_12=_9.call(_e,_d,_12);
}
switch(typeof _12){
case "string":
return _a(_12);
case "number":
return isFinite(_12)?String(_12):"null";
case "boolean":
case "null":
return String(_12);
case "object":
if(!_12){
return "null";
}
_6+=_7;
_11=[];
if(Object.prototype.toString.apply(_12)==="[object Array]"){
_f=_12.length;
for(i=0;i<_f;i+=1){
_11[i]=_c(i,_12)||"null";
}
v=_11.length===0?"[]":_6?"[\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"]":"["+_11.join(",")+"]";
_6=_10;
return v;
}
if(_9&&typeof _9==="object"){
_f=_9.length;
for(i=0;i<_f;i+=1){
k=_9[i];
if(typeof k==="string"){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}else{
for(k in _12){
if(Object.hasOwnProperty.call(_12,k)){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}
v=_11.length===0?"{}":_6?"{\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"}":"{"+_11.join(",")+"}";
_6=_10;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_13,_14,_15){
var i;
_6="";
_7="";
if(typeof _15==="number"){
for(i=0;i<_15;i+=1){
_7+=" ";
}
}else{
if(typeof _15==="string"){
_7=_15;
}
}
_9=_14;
if(_14&&typeof _14!=="function"&&(typeof _14!=="object"||typeof _14.length!=="number")){
throw new Error("JSON.stringify");
}
return _c("",{"":_13});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_16,_17){
var j;
function _18(_19,key){
var k,v,_1a=_19[key];
if(_1a&&typeof _1a==="object"){
for(k in _1a){
if(Object.hasOwnProperty.call(_1a,k)){
v=_18(_1a,k);
if(v!==_29){
_1a[k]=v;
}else{
delete _1a[k];
}
}
}
}
return _17.call(_19,key,_1a);
};
cx.lastIndex=0;
if(cx.test(_16)){
_16=_16.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_16.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_16+")");
return typeof _17==="function"?_18({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var _1b=new RegExp("([^%]+|%(?:\\d+\\$)?[\\+\\-\\ \\#0]*[0-9\\*]*(.[0-9\\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])","g");
var _1c=new RegExp("(%)(?:(\\d+)\\$)?([\\+\\-\\ \\#0]*)([0-9\\*]*)((?:.[0-9\\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])");
_2.sprintf=function(_1d){
var _1d=arguments[0],_1e=_1d.match(_1b),_1f=0,_20="",arg=1;
for(var i=0;i<_1e.length;i++){
var t=_1e[i];
if(_1d.substring(_1f,_1f+t.length)!=t){
return _20;
}
_1f+=t.length;
if(t.charAt(0)!=="%"){
_20+=t;
}else{
if(t==="%%"){
_20+="%";
}else{
var _21=t.match(_1c);
if(_21.length!=8||_21[0]!=t){
return _20;
}
var _22=_21[1],_23=_21[2],_24=_21[3],_25=_21[4],_26=_21[5],_27=_21[6],_28=_21[7];
if(_23===_29||_23===null||_23===""){
_23=arg++;
}else{
_23=Number(_23);
}
var _2a=null;
if(_25=="*"){
_2a=arguments[_23];
}else{
if(_25!=""){
_2a=Number(_25);
}
}
var _2b=null;
if(_26==".*"){
_2b=arguments[_23];
}else{
if(_26!=""){
_2b=Number(_26.substring(1));
}
}
var _2c=(_24.indexOf("-")>=0);
var _2d=(_24.indexOf("0")>=0);
var _2e="";
if(RegExp("[bBdiufeExXo]").test(_28)){
var num=Number(arguments[_23]);
var _2f="";
if(num<0){
_2f="-";
}else{
if(_24.indexOf("+")>=0){
_2f="+";
}else{
if(_24.indexOf(" ")>=0){
_2f=" ";
}
}
}
if(_28=="d"||_28=="i"||_28=="u"){
var _30=String(Math.abs(Math.floor(num)));
_2e=_31(_2f,"",_30,"",_2a,_2c,_2d);
}
if(_28=="f"){
var _30=String((_2b!=null)?Math.abs(num).toFixed(_2b):Math.abs(num));
var _32=(_24.indexOf("#")>=0&&_30.indexOf(".")<0)?".":"";
_2e=_31(_2f,"",_30,_32,_2a,_2c,_2d);
}
if(_28=="e"||_28=="E"){
var _30=String(Math.abs(num).toExponential(_2b!=null?_2b:21));
var _32=(_24.indexOf("#")>=0&&_30.indexOf(".")<0)?".":"";
_2e=_31(_2f,"",_30,_32,_2a,_2c,_2d);
}
if(_28=="x"||_28=="X"){
var _30=String(Math.abs(num).toString(16));
var _33=(_24.indexOf("#")>=0&&num!=0)?"0x":"";
_2e=_31(_2f,_33,_30,"",_2a,_2c,_2d);
}
if(_28=="b"||_28=="B"){
var _30=String(Math.abs(num).toString(2));
var _33=(_24.indexOf("#")>=0&&num!=0)?"0b":"";
_2e=_31(_2f,_33,_30,"",_2a,_2c,_2d);
}
if(_28=="o"){
var _30=String(Math.abs(num).toString(8));
var _33=(_24.indexOf("#")>=0&&num!=0)?"0":"";
_2e=_31(_2f,_33,_30,"",_2a,_2c,_2d);
}
if(RegExp("[A-Z]").test(_28)){
_2e=_2e.toUpperCase();
}else{
_2e=_2e.toLowerCase();
}
}else{
var _2e="";
if(_28=="%"){
_2e="%";
}else{
if(_28=="c"){
_2e=String(arguments[_23]).charAt(0);
}else{
if(_28=="s"||_28=="@"){
_2e=String(arguments[_23]);
}else{
if(_28=="p"||_28=="n"){
_2e="";
}
}
}
}
_2e=_31("","",_2e,"",_2a,_2c,false);
}
_20+=_2e;
}
}
}
return _20;
};
function _31(_34,_35,_36,_37,_38,_39,_3a){
var _3b=(_34.length+_35.length+_36.length+_37.length);
if(_39){
return _34+_35+_36+_37+pad(_38-_3b," ");
}else{
if(_3a){
return _34+_35+pad(_38-_3b,"0")+_36+_37;
}else{
return pad(_38-_3b," ")+_34+_35+_36+_37;
}
}
};
function pad(n,ch){
return Array(MAX(0,n)+1).join(ch);
};
CPLogDisable=false;
var _3c="Cappuccino";
var _3d=["fatal","error","warn","info","debug","trace"];
var _3e=_3d[3];
var _3f={};
for(var i=0;i<_3d.length;i++){
_3f[_3d[i]]=i;
}
var _40={};
CPLogRegister=function(_41,_42,_43){
CPLogRegisterRange(_41,_3d[0],_42||_3d[_3d.length-1],_43);
};
CPLogRegisterRange=function(_44,_45,_46,_47){
var min=_3f[_45];
var max=_3f[_46];
if(min!==_29&&max!==_29&&min<=max){
for(var i=min;i<=max;i++){
CPLogRegisterSingle(_44,_3d[i],_47);
}
}
};
CPLogRegisterSingle=function(_48,_49,_4a){
if(!_40[_49]){
_40[_49]=[];
}
for(var i=0;i<_40[_49].length;i++){
if(_40[_49][i][0]===_48){
_40[_49][i][1]=_4a;
return;
}
}
_40[_49].push([_48,_4a]);
};
CPLogUnregister=function(_4b){
for(var _4c in _40){
for(var i=0;i<_40[_4c].length;i++){
if(_40[_4c][i][0]===_4b){
_40[_4c].splice(i--,1);
}
}
}
};
function _4d(_4e,_4f,_50){
if(_50==_29){
_50=_3c;
}
if(_4f==_29){
_4f=_3e;
}
var _51=(typeof _4e[0]=="string"&&_4e.length>1)?_2.sprintf.apply(null,_4e):String(_4e[0]);
if(_40[_4f]){
for(var i=0;i<_40[_4f].length;i++){
var _52=_40[_4f][i];
_52[0](_51,_4f,_50,_52[1]);
}
}
};
CPLog=function(){
_4d(arguments);
};
for(var i=0;i<_3d.length;i++){
CPLog[_3d[i]]=(function(_53){
return function(){
_4d(arguments,_53);
};
})(_3d[i]);
}
var _54=function(_55,_56,_57){
var now=new Date();
_56=(_56==null?"":" ["+CPLogColorize(_56,_56)+"]");
if(typeof _2.sprintf=="function"){
return _2.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s: %s",now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds(),_57,_56,_55);
}else{
return now+" "+_57+_56+": "+_55;
}
};
CPLogConsole=function(_58,_59,_5a,_5b){
if(typeof console!="undefined"){
var _5c=(_5b||_54)(_58,_59,_5a);
var _5d={"fatal":"error","error":"error","warn":"warn","info":"info","debug":"debug","trace":"debug"}[_59];
if(_5d&&console[_5d]){
console[_5d](_5c);
}else{
if(console.log){
console.log(_5c);
}
}
}
};
CPLogColorize=function(_5e,_5f){
return _5e;
};
CPLogAlert=function(_60,_61,_62,_63){
if(typeof alert!="undefined"&&!CPLogDisable){
var _64=(_63||_54)(_60,_61,_62);
CPLogDisable=!confirm(_64+"\n\n(Click cancel to stop log alerts)");
}
};
var _65=null;
CPLogPopup=function(_66,_67,_68,_69){
try{
if(CPLogDisable||window.open==_29){
return;
}
if(!_65||!_65.document){
_65=window.open("","_blank","width=600,height=400,status=no,resizable=yes,scrollbars=yes");
if(!_65){
CPLogDisable=!confirm(_66+"\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
return;
}
_6a(_65);
}
var _6b=_65.document.createElement("div");
_6b.setAttribute("class",_67||"fatal");
var _6c=(_69||_54)(_66,_69?_67:null,_68);
_6b.appendChild(_65.document.createTextNode(_6c));
_65.log.appendChild(_6b);
if(_65.focusEnabled.checked){
_65.focus();
}
if(_65.blockEnabled.checked){
_65.blockEnabled.checked=_65.confirm(_6c+"\nContinue blocking?");
}
if(_65.scrollEnabled.checked){
_65.scrollToBottom();
}
}
catch(e){
}
};
var _6d="<style type=\"text/css\" media=\"screen\"> body{font:10px Monaco,Courier,\"Courier New\",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap=\"yes\"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled=\"no\"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>";
function _6a(_6e){
var doc=_6e.document;
doc.writeln("<html><head><title></title>"+_6d+"</head><body></body></html>");
doc.title=_3c+" Run Log";
var _6f=doc.getElementsByTagName("head")[0];
var _70=doc.getElementsByTagName("body")[0];
var _71=window.location.protocol+"//"+window.location.host+window.location.pathname;
_71=_71.substring(0,_71.lastIndexOf("/")+1);
var div=doc.createElement("div");
div.setAttribute("id","header");
_70.appendChild(div);
var ul=doc.createElement("ul");
ul.setAttribute("id","enablers");
div.appendChild(ul);
for(var i=0;i<_3d.length;i++){
var li=doc.createElement("li");
li.setAttribute("id","en"+_3d[i]);
li.setAttribute("class",_3d[i]);
li.setAttribute("onclick","toggle(this);");
li.setAttribute("enabled","yes");
li.appendChild(doc.createTextNode(_3d[i]));
ul.appendChild(li);
}
var ul=doc.createElement("ul");
ul.setAttribute("id","options");
div.appendChild(ul);
var _72={"focus":["Focus",false],"block":["Block",false],"wrap":["Wrap",false],"scroll":["Scroll",true],"close":["Close",true]};
for(o in _72){
var li=doc.createElement("li");
ul.appendChild(li);
_6e[o+"Enabled"]=doc.createElement("input");
_6e[o+"Enabled"].setAttribute("id",o);
_6e[o+"Enabled"].setAttribute("type","checkbox");
if(_72[o][1]){
_6e[o+"Enabled"].setAttribute("checked","checked");
}
li.appendChild(_6e[o+"Enabled"]);
var _73=doc.createElement("label");
_73.setAttribute("for",o);
_73.appendChild(doc.createTextNode(_72[o][0]));
li.appendChild(_73);
}
_6e.log=doc.createElement("div");
_6e.log.setAttribute("class","enerror endebug enwarn eninfo enfatal entrace");
_70.appendChild(_6e.log);
_6e.toggle=function(_74){
var _75=(_74.getAttribute("enabled")=="yes")?"no":"yes";
_74.setAttribute("enabled",_75);
if(_75=="yes"){
_6e.log.className+=" "+_74.id;
}else{
_6e.log.className=_6e.log.className.replace(new RegExp("[\\s]*"+_74.id,"g"),"");
}
};
_6e.scrollToBottom=function(){
_6e.scrollTo(0,_70.offsetHeight);
};
_6e.wrapEnabled.addEventListener("click",function(){
_6e.log.setAttribute("wrap",_6e.wrapEnabled.checked?"yes":"no");
},false);
_6e.addEventListener("keydown",function(e){
var e=e||_6e.event;
if(e.keyCode==75&&(e.ctrlKey||e.metaKey)){
while(_6e.log.firstChild){
_6e.log.removeChild(_6e.log.firstChild);
}
e.preventDefault();
}
},"false");
window.addEventListener("unload",function(){
if(_6e&&_6e.closeEnabled&&_6e.closeEnabled.checked){
CPLogDisable=true;
_6e.close();
}
},false);
_6e.addEventListener("unload",function(){
if(!CPLogDisable){
CPLogDisable=!confirm("Click cancel to stop logging");
}
},false);
};
CPLogDefault=(typeof window==="object"&&window.console)?CPLogConsole:CPLogPopup;
var _29;
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
LOG2E=Math.LOG2E;
LOG10E=Math.LOG10E;
PI=Math.PI;
PI2=Math.PI*2;
PI_2=Math.PI/2;
SQRT1_2=Math.SQRT1_2;
SQRT2=Math.SQRT2;
function _76(_77){
this._eventListenersForEventNames={};
this._owner=_77;
};
_76.prototype.addEventListener=function(_78,_79){
var _7a=this._eventListenersForEventNames;
if(!_7b.call(_7a,_78)){
var _7c=[];
_7a[_78]=_7c;
}else{
var _7c=_7a[_78];
}
var _7d=_7c.length;
while(_7d--){
if(_7c[_7d]===_79){
return;
}
}
_7c.push(_79);
};
_76.prototype.removeEventListener=function(_7e,_7f){
var _80=this._eventListenersForEventNames;
if(!_7b.call(_80,_7e)){
return;
}
var _81=_80[_7e],_82=_81.length;
while(_82--){
if(_81[_82]===_7f){
return _81.splice(_82,1);
}
}
};
_76.prototype.dispatchEvent=function(_83){
var _84=_83.type,_85=this._eventListenersForEventNames;
if(_7b.call(_85,_84)){
var _86=this._eventListenersForEventNames[_84],_87=0,_88=_86.length;
for(;_87<_88;++_87){
_86[_87](_83);
}
}
var _89=(this._owner||this)["on"+_84];
if(_89){
_89(_83);
}
};
var _8a=0,_8b=null,_8c=[];
function _8d(_8e){
var _8f=_8a;
if(_8b===null){
window.setNativeTimeout(function(){
var _90=_8c,_91=0,_92=_8c.length;
++_8a;
_8b=null;
_8c=[];
for(;_91<_92;++_91){
_90[_91]();
}
},0);
}
return function(){
var _93=arguments;
if(_8a>_8f){
_8e.apply(this,_93);
}else{
_8c.push(function(){
_8e.apply(this,_93);
});
}
};
};
var _94=null;
if(window.ActiveXObject!==_29){
var _95=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.6.0"],_96=_95.length;
while(_96--){
try{
var _97=_95[_96];
new ActiveXObject(_97);
_94=function(){
return new ActiveXObject(_97);
};
break;
}
catch(anException){
}
}
}
if(!_94){
_94=window.XMLHttpRequest;
}
CFHTTPRequest=function(){
this._isOpen=false;
this._requestHeaders={};
this._mimeType=null;
this._eventDispatcher=new _76(this);
this._nativeRequest=new _94();
var _98=this;
this._stateChangeHandler=function(){
_ab(_98);
};
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
if(CFHTTPRequest.AuthenticationDelegate!==nil){
this._eventDispatcher.addEventListener("HTTP403",function(){
CFHTTPRequest.AuthenticationDelegate(_98);
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
var _99=this.status();
if(_99>=200&&_99<300){
return YES;
}
return _99===0&&this.responseText()&&this.responseText().length;
};
CFHTTPRequest.prototype.responseXML=function(){
var _9a=this._nativeRequest.responseXML;
if(_9a&&(_94===window.XMLHttpRequest)){
return _9a;
}
return _9b(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList=function(){
var _9c=this.responseText();
if(CFPropertyList.sniffedFormatOfString(_9c)===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(this.responseXML());
}
return CFPropertyList.propertyListFromString(_9c);
};
CFHTTPRequest.prototype.responseText=function(){
return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader=function(_9d,_9e){
this._requestHeaders[_9d]=_9e;
};
CFHTTPRequest.prototype.getResponseHeader=function(_9f){
return this._nativeRequest.getResponseHeader(_9f);
};
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_a0){
this._mimeType=_a0;
};
CFHTTPRequest.prototype.open=function(_a1,_a2,_a3,_a4,_a5){
this._isOpen=true;
this._URL=_a2;
this._async=_a3;
this._method=_a1;
this._user=_a4;
this._password=_a5;
return this._nativeRequest.open(_a1,_a2,_a3,_a4,_a5);
};
CFHTTPRequest.prototype.send=function(_a6){
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
return this._nativeRequest.send(_a6);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
this._isOpen=false;
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_a7,_a8){
this._eventDispatcher.addEventListener(_a7,_a8);
};
CFHTTPRequest.prototype.removeEventListener=function(_a9,_aa){
this._eventDispatcher.removeEventListener(_a9,_aa);
};
function _ab(_ac){
var _ad=_ac._eventDispatcher;
_ad.dispatchEvent({type:"readystatechange",request:_ac});
var _ae=_ac._nativeRequest,_af=["uninitialized","loading","loaded","interactive","complete"];
if(_af[_ac.readyState()]==="complete"){
var _b0="HTTP"+_ac.status();
_ad.dispatchEvent({type:_b0,request:_ac});
var _b1=_ac.success()?"success":"failure";
_ad.dispatchEvent({type:_b1,request:_ac});
_ad.dispatchEvent({type:_af[_ac.readyState()],request:_ac});
}else{
_ad.dispatchEvent({type:_af[_ac.readyState()],request:_ac});
}
};
function _b2(_b3,_b4,_b5){
var _b6=new CFHTTPRequest();
if(_b3.pathExtension()==="plist"){
_b6.overrideMimeType("text/xml");
}
if(_2.asyncLoader){
_b6.onsuccess=_8d(_b4);
_b6.onfailure=_8d(_b5);
}else{
_b6.onsuccess=_b4;
_b6.onfailure=_b5;
}
_b6.open("GET",_b3.absoluteString(),_2.asyncLoader);
_b6.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_8d;
_2.determineAndDispatchHTTPRequestEvents=_ab;
var _b7=0;
objj_generateObjectUID=function(){
return _b7++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_b8){
if(_b8.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_b8.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_b9,_ba){
var _bb=new CFMutableData();
_bb.setRawString(CFPropertyList.stringFromPropertyList(_b9,_ba));
return _bb;
};
CFPropertyList.stringFromPropertyList=function(_bc,_bd){
if(!_bd){
_bd=CFPropertyList.Format280North_v1_0;
}
var _be=_bf[_bd];
return _be["start"]()+_c0(_bc,_be)+_be["finish"]();
};
function _c0(_c1,_c2){
var _c3=typeof _c1,_c4=_c1.valueOf(),_c5=typeof _c4;
if(_c3!==_c5){
_c3=_c5;
_c1=_c4;
}
if(_c1===YES||_c1===NO){
_c3="boolean";
}else{
if(_c3==="number"){
if(FLOOR(_c1)===_c1&&(""+_c1).indexOf("e")==-1){
_c3="integer";
}else{
_c3="real";
}
}else{
if(_c3!=="string"){
if(_c1.slice){
_c3="array";
}else{
_c3="dictionary";
}
}
}
}
return _c2[_c3](_c1,_c2);
};
var _bf={};
_bf[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_c6){
return "<string>"+_c7(_c6)+"</string>";
},"boolean":function(_c8){
return _c8?"<true/>":"<false/>";
},"integer":function(_c9){
return "<integer>"+_c9+"</integer>";
},"real":function(_ca){
return "<real>"+_ca+"</real>";
},"array":function(_cb,_cc){
var _cd=0,_ce=_cb.length,_cf="<array>";
for(;_cd<_ce;++_cd){
_cf+=_c0(_cb[_cd],_cc);
}
return _cf+"</array>";
},"dictionary":function(_d0,_d1){
var _d2=_d0._keys,_96=0,_d3=_d2.length,_d4="<dict>";
for(;_96<_d3;++_96){
var key=_d2[_96];
_d4+="<key>"+key+"</key>";
_d4+=_c0(_d0.valueForKey(key),_d1);
}
return _d4+"</dict>";
}};
var _d5="A",_d6="D",_d7="f",_d8="d",_d9="S",_da="T",_db="F",_dc="K",_dd="E";
_bf[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_de){
return _d9+";"+_de.length+";"+_de;
},"boolean":function(_df){
return (_df?_da:_db)+";";
},"integer":function(_e0){
var _e1=""+_e0;
return _d8+";"+_e1.length+";"+_e1;
},"real":function(_e2){
var _e3=""+_e2;
return _d7+";"+_e3.length+";"+_e3;
},"array":function(_e4,_e5){
var _e6=0,_e7=_e4.length,_e8=_d5+";";
for(;_e6<_e7;++_e6){
_e8+=_c0(_e4[_e6],_e5);
}
return _e8+_dd+";";
},"dictionary":function(_e9,_ea){
var _eb=_e9._keys,_96=0,_ec=_eb.length,_ed=_d6+";";
for(;_96<_ec;++_96){
var key=_eb[_96];
_ed+=_dc+";"+key.length+";"+key;
_ed+=_c0(_e9.valueForKey(key),_ea);
}
return _ed+_dd+";";
}};
var _ee="xml",_ef="#document",_f0="plist",_f1="key",_f2="dict",_f3="array",_f4="string",_f5="date",_f6="true",_f7="false",_f8="real",_f9="integer",_fa="data";
var _fb=function(_fc){
var _fd="",_96=0,_fe=_fc.length;
for(;_96<_fe;++_96){
var _ff=_fc[_96];
if(_ff.nodeType===3||_ff.nodeType===4){
_fd+=_ff.nodeValue;
}else{
if(_ff.nodeType!==8){
_fd+=_fb(_ff.childNodes);
}
}
}
return _fd;
};
var _100=function(_101,_102,_103){
var node=_101;
node=(node.firstChild);
if(node!==NULL&&((node.nodeType)===8||(node.nodeType)===3)){
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
}
if(node){
return node;
}
if((String(_101.nodeName))===_f3||(String(_101.nodeName))===_f2){
_103.pop();
}else{
if(node===_102){
return NULL;
}
node=_101;
while((node=(node.nextSibling))&&((node.nodeType)===8||(node.nodeType)===3)){
}
if(node){
return node;
}
}
node=_101;
while(node){
var next=node;
while((next=(next.nextSibling))&&((next.nodeType)===8||(next.nodeType)===3)){
}
if(next){
return next;
}
var node=(node.parentNode);
if(_102&&node===_102){
return NULL;
}
_103.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_104,_105){
return CFPropertyList.propertyListFromString(_104.rawString(),_105);
};
CFPropertyList.propertyListFromString=function(_106,_107){
if(!_107){
_107=CFPropertyList.sniffedFormatOfString(_106);
}
if(_107===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_106);
}
if(_107===CFPropertyList.Format280North_v1_0){
return _108(_106);
}
return NULL;
};
var _d5="A",_d6="D",_d7="f",_d8="d",_d9="S",_da="T",_db="F",_dc="K",_dd="E";
function _108(_109){
var _10a=new _10b(_109),_10c=NULL,key="",_10d=NULL,_10e=NULL,_10f=[],_110=NULL;
while(_10c=_10a.getMarker()){
if(_10c===_dd){
_10f.pop();
continue;
}
var _111=_10f.length;
if(_111){
_110=_10f[_111-1];
}
if(_10c===_dc){
key=_10a.getString();
_10c=_10a.getMarker();
}
switch(_10c){
case _d5:
_10d=[];
_10f.push(_10d);
break;
case _d6:
_10d=new CFMutableDictionary();
_10f.push(_10d);
break;
case _d7:
_10d=parseFloat(_10a.getString());
break;
case _d8:
_10d=parseInt(_10a.getString(),10);
break;
case _d9:
_10d=_10a.getString();
break;
case _da:
_10d=YES;
break;
case _db:
_10d=NO;
break;
default:
throw new Error("*** "+_10c+" marker not recognized in Plist.");
}
if(!_10e){
_10e=_10d;
}else{
if(_110){
if(_110.slice){
_110.push(_10d);
}else{
_110.setValueForKey(key,_10d);
}
}
}
}
return _10e;
};
function _c7(_112){
return _112.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _113(_114){
return _114.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _9b(_115){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_115,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _116=_115.match(CFPropertyList.DTDRE);
if(_116){
_115=_115.substr(_116[0].length);
}
XMLNode.loadXML(_115);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_117){
var _118=_117;
if(_117.valueOf&&typeof _117.valueOf()==="string"){
_118=_9b(_117);
}
while(((String(_118.nodeName))===_ef)||((String(_118.nodeName))===_ee)){
_118=(_118.firstChild);
}
if(_118!==NULL&&((_118.nodeType)===8||(_118.nodeType)===3)){
while((_118=(_118.nextSibling))&&((_118.nodeType)===8||(_118.nodeType)===3)){
}
}
if(((_118.nodeType)===10)){
while((_118=(_118.nextSibling))&&((_118.nodeType)===8||(_118.nodeType)===3)){
}
}
if(!((String(_118.nodeName))===_f0)){
return NULL;
}
var key="",_119=NULL,_11a=NULL,_11b=_118,_11c=[],_11d=NULL;
while(_118=_100(_118,_11b,_11c)){
var _11e=_11c.length;
if(_11e){
_11d=_11c[_11e-1];
}
if((String(_118.nodeName))===_f1){
key=(_118.textContent||(_118.textContent!==""&&_fb([_118])));
while((_118=(_118.nextSibling))&&((_118.nodeType)===8||(_118.nodeType)===3)){
}
}
switch(String((String(_118.nodeName)))){
case _f3:
_119=[];
_11c.push(_119);
break;
case _f2:
_119=new CFMutableDictionary();
_11c.push(_119);
break;
case _f8:
_119=parseFloat((_118.textContent||(_118.textContent!==""&&_fb([_118]))));
break;
case _f9:
_119=parseInt((_118.textContent||(_118.textContent!==""&&_fb([_118]))),10);
break;
case _f4:
if((_118.getAttribute("type")==="base64")){
_119=(_118.firstChild)?CFData.decodeBase64ToString((_118.textContent||(_118.textContent!==""&&_fb([_118])))):"";
}else{
_119=_113((_118.firstChild)?(_118.textContent||(_118.textContent!==""&&_fb([_118]))):"");
}
break;
case _f5:
var _11f=Date.parseISO8601((_118.textContent||(_118.textContent!==""&&_fb([_118]))));
_119=isNaN(_11f)?new Date():new Date(_11f);
break;
case _f6:
_119=YES;
break;
case _f7:
_119=NO;
break;
case _fa:
_119=new CFMutableData();
var _120=(_118.firstChild)?CFData.decodeBase64ToArray((_118.textContent||(_118.textContent!==""&&_fb([_118]))),YES):[];
_119.setBytes(_120);
break;
default:
throw new Error("*** "+(String(_118.nodeName))+" tag not recognized in Plist.");
}
if(!_11a){
_11a=_119;
}else{
if(_11d){
if(_11d.slice){
_11d.push(_119);
}else{
_11d.setValueForKey(key,_119);
}
}
}
}
return _11a;
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
CFPropertyListCreateXMLData=function(_121){
return CFPropertyList.dataFromPropertyList(_121,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_122){
return CFPropertyList.dataFromPropertyList(_122,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_123){
return CFPropertyList.propertyListFromData(data,_123);
};
CPPropertyListCreateData=function(_124,_125){
return CFPropertyList.dataFromPropertyList(_124,_125);
};
CFDictionary=function(_126){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _127=Array.prototype.indexOf,_7b=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _128=new CFMutableDictionary(),keys=this._keys,_129=this._count;
_128._keys=keys.slice();
_128._count=_129;
var _12a=0,_12b=this._buckets,_12c=_128._buckets;
for(;_12a<_129;++_12a){
var key=keys[_12a];
_12c[key]=_12b[key];
}
return _128;
};
CFDictionary.prototype.containsKey=function(aKey){
return _7b.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_12d){
var keys=this._keys,_12e=this._buckets,_96=0,_12f=keys.length;
for(;_96<_12f;++_96){
if(_12e[keys[_96]]===_12d){
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
CFDictionary.prototype.countOfValue=function(_130){
var keys=this._keys,_131=this._buckets,_96=0,_132=keys.length,_133=0;
for(;_96<_132;++_96){
if(_131[keys[_96]]===_130){
++_133;
}
}
return _133;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _134=this._buckets;
if(!_7b.apply(_134,[aKey])){
return nil;
}
return _134[aKey];
};
CFDictionary.prototype.toString=function(){
var _135="{\n",keys=this._keys,_96=0,_136=this._count;
for(;_96<_136;++_96){
var key=keys[_96];
_135+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _135+"}";
};
CFMutableDictionary=function(_137){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_138){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_138;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _139=-1;
if(_127){
_139=_127.call(this._keys,aKey);
}else{
var keys=this._keys,_96=0,_13a=keys.length;
for(;_96<_13a;++_96){
if(keys[_96]===aKey){
_139=_96;
break;
}
}
}
if(_139===-1){
return;
}
--this._count;
this._keys.splice(_139,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_13b){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_13b;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_13c){
if(_13c===nil||_13c===_29){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_13c);
}else{
this.addValueForKey(aKey,_13c);
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
throw new Error("Can't convert data to string.");
}
}
}
return this._rawString;
};
CFData.prototype.bytes=function(){
return this._bytes;
};
CFData.prototype.base64=function(){
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _13d(_13e){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_13f,_140){
_13d(this);
this._propertyList=_13f;
this._propertyListFormat=_140;
};
CFMutableData.prototype.setJSONObject=function(_141){
_13d(this);
this._JSONObject=_141;
};
CFMutableData.prototype.setRawString=function(_142){
_13d(this);
this._rawString=_142;
};
CFMutableData.prototype.setBytes=function(_143){
_13d(this);
this._bytes=_143;
};
CFMutableData.prototype.setBase64String=function(_144){
_13d(this);
this._base64=_144;
};
var _145=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_146=[];
for(var i=0;i<_145.length;i++){
_146[_145[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_147,_148){
if(_148){
_147=_147.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_147[_147.length-1]=="="?1:0)+(_147[_147.length-2]=="="?1:0),_149=_147.length,_14a=[];
var i=0;
while(i<_149){
var bits=(_146[_147.charCodeAt(i++)]<<18)|(_146[_147.charCodeAt(i++)]<<12)|(_146[_147.charCodeAt(i++)]<<6)|(_146[_147.charCodeAt(i++)]);
_14a.push((bits&16711680)>>16);
_14a.push((bits&65280)>>8);
_14a.push(bits&255);
}
if(pad>0){
return _14a.slice(0,-1*pad);
}
return _14a;
};
CFData.encodeBase64Array=function(_14b){
var pad=(3-(_14b.length%3))%3,_14c=_14b.length+pad,_14d=[];
if(pad>0){
_14b.push(0);
}
if(pad>1){
_14b.push(0);
}
var i=0;
while(i<_14c){
var bits=(_14b[i++]<<16)|(_14b[i++]<<8)|(_14b[i++]);
_14d.push(_145[(bits&16515072)>>18]);
_14d.push(_145[(bits&258048)>>12]);
_14d.push(_145[(bits&4032)>>6]);
_14d.push(_145[bits&63]);
}
if(pad>0){
_14d[_14d.length-1]="=";
_14b.pop();
}
if(pad>1){
_14d[_14d.length-2]="=";
_14b.pop();
}
return _14d.join("");
};
CFData.decodeBase64ToString=function(_14e,_14f){
return CFData.bytesToString(CFData.decodeBase64ToArray(_14e,_14f));
};
CFData.decodeBase64ToUtf16String=function(_150,_151){
return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(_150,_151));
};
CFData.bytesToString=function(_152){
return String.fromCharCode.apply(NULL,_152);
};
CFData.encodeBase64String=function(_153){
var temp=[];
for(var i=0;i<_153.length;i++){
temp.push(_153.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String=function(_154){
var temp=[];
for(var i=0;i<_154.length;i+=2){
temp.push(_154[i+1]<<8|_154[i]);
}
return String.fromCharCode.apply(NULL,temp);
};
CFData.encodeBase64Utf16String=function(_155){
var temp=[];
for(var i=0;i<_155.length;i++){
var c=_155.charCodeAt(i);
temp.push(_155.charCodeAt(i)&255);
temp.push((_155.charCodeAt(i)&65280)>>8);
}
return CFData.encodeBase64Array(temp);
};
var _156,_157,_158=0;
function _159(){
if(++_158!==1){
return;
}
_156={};
_157={};
};
function _15a(){
_158=MAX(_158-1,0);
if(_158!==0){
return;
}
delete _156;
delete _157;
};
var _15b=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _15c=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _15d(aURL){
if(aURL._parts){
return aURL._parts;
}
var _15e=aURL.string(),_15f=_15e.match(/^mhtml:/);
if(_15f){
_15e=_15e.substr("mhtml:".length);
}
if(_158>0&&_7b.call(_157,_15e)){
aURL._parts=_157[_15e];
return aURL._parts;
}
aURL._parts={};
var _160=aURL._parts,_161=_15b.exec(_15e),_96=_161.length;
while(_96--){
_160[_15c[_96]]=_161[_96]||NULL;
}
_160.portNumber=parseInt(_160.portNumber,10);
if(isNaN(_160.portNumber)){
_160.portNumber=-1;
}
_160.pathComponents=[];
if(_160.path){
var _162=_160.path.split("/"),_163=_160.pathComponents,_96=0,_164=_162.length;
for(;_96<_164;++_96){
var _165=_162[_96];
if(_165){
_163.push(_165);
}else{
if(_96===0){
_163.push("/");
}
}
}
_160.pathComponents=_163;
}
if(_15f){
_160.url="mhtml:"+_160.url;
_160.scheme="mhtml:"+_160.scheme;
}
if(_158>0){
_157[_15e]=_160;
}
return _160;
};
CFURL=function(aURL,_166){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_166){
return aURL;
}
var _167=aURL.baseURL();
if(_167){
_166=new CFURL(_167.absoluteURL(),_166);
}
aURL=aURL.string();
}
if(_158>0){
var _168=aURL+" "+(_166&&_166.UID()||"");
if(_7b.call(_156,_168)){
return _156[_168];
}
_156[_168]=this;
}
if(aURL.match(/^data:/)){
var _169={},_96=_15c.length;
while(_96--){
_169[_15c[_96]]="";
}
_169.url=aURL;
_169.scheme="data";
_169.pathComponents=[];
this._parts=_169;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_166;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _16a={};
CFURL.prototype.mappedURL=function(){
return _16a[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_16b,_16c){
_16a[_16b.absoluteString()]=_16c;
};
CFURL.prototype.schemeAndAuthority=function(){
var _16d="",_16e=this.scheme();
if(_16e){
_16d+=_16e+":";
}
var _16f=this.authority();
if(_16f){
_16d+="//"+_16f;
}
return _16d;
};
CFURL.prototype.absoluteString=function(){
if(this._absoluteString===_29){
this._absoluteString=this.absoluteURL().string();
}
return this._absoluteString;
};
CFURL.prototype.toString=function(){
return this.absoluteString();
};
function _170(aURL){
aURL=aURL.standardizedURL();
var _171=aURL.baseURL();
if(!_171){
return aURL;
}
var _172=((aURL)._parts||_15d(aURL)),_173,_174=_171.absoluteURL(),_175=((_174)._parts||_15d(_174));
if(_172.scheme||_172.authority){
_173=_172;
}else{
_173={};
_173.scheme=_175.scheme;
_173.authority=_175.authority;
_173.userInfo=_175.userInfo;
_173.user=_175.user;
_173.password=_175.password;
_173.domain=_175.domain;
_173.portNumber=_175.portNumber;
_173.queryString=_172.queryString;
_173.fragment=_172.fragment;
var _176=_172.pathComponents;
if(_176.length&&_176[0]==="/"){
_173.path=_172.path;
_173.pathComponents=_176;
}else{
var _177=_175.pathComponents,_178=_177.concat(_176);
if(!_171.hasDirectoryPath()&&_177.length){
_178.splice(_177.length-1,1);
}
if(_176.length&&(_176[0]===".."||_176[0]===".")){
_179(_178,YES);
}
_173.pathComponents=_178;
_173.path=_17a(_178,_176.length<=0||aURL.hasDirectoryPath());
}
}
var _17b=_17c(_173),_17d=new CFURL(_17b);
_17d._parts=_173;
_17d._standardizedURL=_17d;
_17d._standardizedString=_17b;
_17d._absoluteURL=_17d;
_17d._absoluteString=_17b;
return _17d;
};
function _17a(_17e,_17f){
var path=_17e.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_17f){
path+="/";
}
return path;
};
function _179(_180,_181){
var _182=0,_183=0,_184=_180.length,_185=_181?_180:[],_186=NO;
for(;_182<_184;++_182){
var _187=_180[_182];
if(_187===""){
continue;
}
if(_187==="."){
_186=_183===0;
continue;
}
if(_187!==".."||_183===0||_185[_183-1]===".."){
_185[_183]=_187;
_183++;
continue;
}
if(_183>0&&_185[_183-1]!=="/"){
--_183;
}
}
if(_186&&_183===0){
_185[_183++]=".";
}
_185.length=_183;
return _185;
};
function _17c(_188){
var _189="",_18a=_188.scheme;
if(_18a){
_189+=_18a+":";
}
var _18b=_188.authority;
if(_18b){
_189+="//"+_18b;
}
_189+=_188.path;
var _18c=_188.queryString;
if(_18c){
_189+="?"+_18c;
}
var _18d=_188.fragment;
if(_18d){
_189+="#"+_18d;
}
return _189;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_29){
this._absoluteURL=_170(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_29){
var _18e=((this)._parts||_15d(this)),_18f=_18e.pathComponents,_190=_179(_18f,NO);
var _191=_17a(_190,this.hasDirectoryPath());
if(_18e.path===_191){
this._standardizedURL=this;
}else{
var _192=_193(_18e);
_192.pathComponents=_190;
_192.path=_191;
var _194=new CFURL(_17c(_192),this.baseURL());
_194._parts=_192;
_194._standardizedURL=_194;
this._standardizedURL=_194;
}
}
return this._standardizedURL;
};
function _193(_195){
var _196={},_197=_15c.length;
while(_197--){
var _198=_15c[_197];
_196[_198]=_195[_198];
}
return _196;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _199=((this)._parts||_15d(this)).authority;
if(_199){
return _199;
}
var _19a=this.baseURL();
return _19a&&_19a.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _19b=this._hasDirectoryPath;
if(_19b===_29){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _19c=this.lastPathComponent();
_19b=_19c==="."||_19c==="..";
this._hasDirectoryPath=_19b;
}
return _19b;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_15d(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_29){
var _19d=this.pathComponents(),_19e=_19d.length;
if(!_19e){
this._lastPathComponent="";
}else{
this._lastPathComponent=_19d[_19e-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_15d(this)).path;
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_15d(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _19f=this.lastPathComponent();
if(!_19f){
return NULL;
}
_19f=_19f.replace(/^\.*/,"");
var _1a0=_19f.lastIndexOf(".");
return _1a0<=0?"":_19f.substring(_1a0+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_15d(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _1a1=this._scheme;
if(_1a1===_29){
_1a1=((this)._parts||_15d(this)).scheme;
if(!_1a1){
var _1a2=this.baseURL();
_1a1=_1a2&&_1a2.scheme();
}
this._scheme=_1a1;
}
return _1a1;
};
CFURL.prototype.user=function(){
return ((this)._parts||_15d(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_15d(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_15d(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_15d(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _1a3=this.lastPathComponent();
if(_1a3!=="/"){
_1a3="./"+_1a3;
}
return new CFURL(_1a3+"/",this);
};
function _1a4(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _1a4(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_1a5){
_1a4(this).setValueForKey(aKey,_1a5);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_1a6.resourceAtURL(this).contents());
return data;
};
function _10b(_1a7){
this._string=_1a7;
var _1a8=_1a7.indexOf(";");
this._magicNumber=_1a7.substr(0,_1a8);
this._location=_1a7.indexOf(";",++_1a8);
this._version=_1a7.substring(_1a8,this._location++);
};
_10b.prototype.magicNumber=function(){
return this._magicNumber;
};
_10b.prototype.version=function(){
return this._version;
};
_10b.prototype.getMarker=function(){
var _1a9=this._string,_1aa=this._location;
if(_1aa>=_1a9.length){
return null;
}
var next=_1a9.indexOf(";",_1aa);
if(next<0){
return null;
}
var _1ab=_1a9.substring(_1aa,next);
if(_1ab==="e"){
return null;
}
this._location=next+1;
return _1ab;
};
_10b.prototype.getString=function(){
var _1ac=this._string,_1ad=this._location;
if(_1ad>=_1ac.length){
return null;
}
var next=_1ac.indexOf(";",_1ad);
if(next<0){
return null;
}
var size=parseInt(_1ac.substring(_1ad,next),10),text=_1ac.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _1ae=0,_1af=1<<0,_1b0=1<<1,_1b1=1<<2,_1b2=1<<3,_1b3=1<<4;
var _1b4={},_1b5={},_1b6=new Date().getTime(),_1b7=0,_1b8=0;
CFBundle=function(aURL){
aURL=_1b9(aURL).asDirectoryPathURL();
var _1ba=aURL.absoluteString(),_1bb=_1b4[_1ba];
if(_1bb){
return _1bb;
}
_1b4[_1ba]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_1ae;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _76(this);
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1b9(aURL));
var _1bc,_1bd=aURL.absoluteString();
while(!_1bc||_1bc!==_1bd){
var _1be=_1b4[_1bd];
if(_1be&&_1be._isValid){
return _1be;
}
aURL=new CFURL("..",aURL);
_1bc=_1bd;
_1bd=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1bf);
};
function _1c0(_1c1,_1c2){
if(_1c2){
_1b5[_1c1.name]=_1c2;
}
};
CFBundle.bundleForClass=function(_1c3){
return _1b5[_1c3.name]||CFBundle.mainBundle();
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL;
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1c4,_1c5,_1c6){
if(_1c5){
_1c4=_1c4+"."+_1c5;
}
if(_1c6){
_1c4=_1c6+"/"+_1c4;
}
var _1c7=(new CFURL(_1c4,this.resourcesDirectoryURL())).mappedURL();
return _1c7.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_29){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_29){
var _1c8=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1c8){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1c8,this.mostEligibleEnvironmentURL());
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
CFBundle.prototype.hasSpritedImages=function(){
var _1c9=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_96=_1c9.length,_1ca=this.mostEligibleEnvironment();
while(_96--){
if(_1c9[_96]===_1ca){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1cb){
_1cb=_1cb||this.environments();
var _1cc=CFBundle.environments(),_96=0,_1cd=_1cc.length,_1ce=_1cb.length;
for(;_96<_1cd;++_96){
var _1cf=0,_1d0=_1cc[_96];
for(;_1cf<_1ce;++_1cf){
if(_1d0===_1cb[_1cf]){
return _1d0;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_1af;
};
CFBundle.prototype.isLoaded=function(){
return !!(this._loadStatus&_1b3);
};
CFBundle.prototype.load=function(_1d1){
if(this._loadStatus!==_1ae){
return;
}
this._loadStatus=_1af|_1b0;
var self=this,_1d2=this.bundleURL(),_1d3=new CFURL("..",_1d2);
if(_1d3.absoluteString()===_1d2.absoluteString()){
_1d3=_1d3.schemeAndAuthority();
}
_1a6.resolveResourceAtURL(_1d3,YES,function(_1d4){
var _1d5=_1d2.absoluteURL().lastPathComponent();
self._staticResource=_1d4._children[_1d5]||new _1a6(_1d2,_1d4,YES,NO);
function _1d6(_1d7){
self._loadStatus&=~_1b0;
var _1d8=_1d7.request.responsePropertyList();
self._isValid=!!_1d8||CFBundle.mainBundle()===self;
if(_1d8){
self._infoDictionary=_1d8;
}
if(!self._infoDictionary){
_1da(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1b8=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_1de(self,_1d1);
};
function _1d9(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_1ae;
_1da(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _b2(new CFURL("Info.plist",self.bundleURL()),_1d6,_1d9);
});
};
function _1da(_1db,_1dc){
_1dd(_1db._staticResource);
_1db._eventDispatcher.dispatchEvent({type:"error",error:_1dc,bundle:_1db});
};
function _1de(_1df,_1e0){
if(!_1df.mostEligibleEnvironment()){
return _1e1();
}
_1e2(_1df,_1e3,_1e1);
_1e4(_1df,_1e3,_1e1);
if(_1df._loadStatus===_1af){
return _1e3();
}
function _1e1(_1e5){
var _1e6=_1df._loadRequests,_1e7=_1e6.length;
while(_1e7--){
_1e6[_1e7].abort();
}
this._loadRequests=[];
_1df._loadStatus=_1ae;
_1da(_1df,_1e5||new Error("Could not recognize executable code format in Bundle "+_1df));
};
function _1e3(){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"&&_1b8){
OBJJ_PROGRESS_CALLBACK(MAX(MIN(1,_1b7/_1b8),0),_1b8,_1df.bundlePath());
}
if(_1df._loadStatus===_1af){
_1df._loadStatus=_1b3;
}else{
return;
}
_1dd(_1df._staticResource);
function _1e8(){
_1df._eventDispatcher.dispatchEvent({type:"load",bundle:_1df});
};
if(_1e0){
_1e9(_1df,_1e8);
}else{
_1e8();
}
};
};
function _1e2(_1ea,_1eb,_1ec){
var _1ed=_1ea.executableURL();
if(!_1ed){
return;
}
_1ea._loadStatus|=_1b1;
new _b2(_1ed,function(_1ee){
try{
_1b7+=_1ee.request.responseText().length;
_1ef(_1ea,_1ee.request.responseText(),_1ed);
_1ea._loadStatus&=~_1b1;
_1eb();
}
catch(anException){
_1ec(anException);
}
},_1ec);
};
function _1f0(_1f1){
return "mhtml:"+new CFURL("MHTMLTest.txt",_1f1.mostEligibleEnvironmentURL());
};
function _1f2(_1f3){
if(_1f4===_1f5){
return new CFURL("dataURLs.txt",_1f3.mostEligibleEnvironmentURL());
}
if(_1f4===_1f6||_1f4===_1f7){
return new CFURL("MHTMLPaths.txt",_1f3.mostEligibleEnvironmentURL());
}
return NULL;
};
function _1e4(_1f8,_1f9,_1fa){
if(!_1f8.hasSpritedImages()){
return;
}
_1f8._loadStatus|=_1b2;
if(!_1fb()){
return _1fc(_1f0(_1f8),function(){
_1e4(_1f8,_1f9,_1fa);
});
}
var _1fd=_1f2(_1f8);
if(!_1fd){
_1f8._loadStatus&=~_1b2;
return _1f9();
}
new _b2(_1fd,function(_1fe){
try{
_1b7+=_1fe.request.responseText().length;
_1ef(_1f8,_1fe.request.responseText(),_1fd);
_1f8._loadStatus&=~_1b2;
}
catch(anException){
_1fa(anException);
}
_1f9();
},_1fa);
};
var _1ff=[],_1f4=-1,_200=0,_1f5=1,_1f6=2,_1f7=3;
function _1fb(){
return _1f4!==-1;
};
function _1fc(_201,_202){
if(_1fb()){
return;
}
_1ff.push(_202);
if(_1ff.length>1){
return;
}
_1ff.push(function(){
var size=0,_203=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_203){
return;
}
switch(_1f4){
case _1f5:
size=_203.valueForKey("data");
break;
case _1f6:
case _1f7:
size=_203.valueForKey("mhtml");
break;
}
_1b8+=size;
});
_204([_1f5,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_1f6,_201+"!test",_1f7,_201+"?"+_1b6+"!test"]);
};
function _205(){
var _206=_1ff.length;
while(_206--){
_1ff[_206]();
}
};
function _204(_207){
if(!("Image" in _1)||_207.length<2){
_1f4=_200;
_205();
return;
}
var _208=new Image();
_208.onload=function(){
if(_208.width===1&&_208.height===1){
_1f4=_207[0];
_205();
}else{
_208.onerror();
}
};
_208.onerror=function(){
_204(_207.slice(2));
};
_208.src=_207[1];
};
function _1e9(_209,_20a){
var _20b=[_209._staticResource];
function _20c(_20d){
for(;_20d<_20b.length;++_20d){
var _20e=_20b[_20d];
if(_20e.isNotFound()){
continue;
}
if(_20e.isFile()){
var _20f=new _327(_20e.URL());
if(_20f.hasLoadedFileDependencies()){
_20f.execute();
}else{
_20f.loadFileDependencies(function(){
_20c(_20d);
});
return;
}
}else{
if(_20e.URL().absoluteString()===_209.resourcesDirectoryURL().absoluteString()){
continue;
}
var _210=_20e.children();
for(var name in _210){
if(_7b.call(_210,name)){
_20b.push(_210[name]);
}
}
}
}
_20a();
};
_20c(0);
};
var _211="@STATIC",_212="p",_213="u",_214="c",_215="t",_216="I",_217="i";
function _1ef(_218,_219,_21a){
var _21b=new _10b(_219);
if(_21b.magicNumber()!==_211){
throw new Error("Could not read static file: "+_21a);
}
if(_21b.version()!=="1.0"){
throw new Error("Could not read static file: "+_21a);
}
var _21c,_21d=_218.bundleURL(),file=NULL;
while(_21c=_21b.getMarker()){
var text=_21b.getString();
if(_21c===_212){
var _21e=new CFURL(text,_21d),_21f=_1a6.resourceAtURL(new CFURL(".",_21e),YES);
file=new _1a6(_21e,_21f,NO,YES);
}else{
if(_21c===_213){
var URL=new CFURL(text,_21d),_220=_21b.getString();
if(_220.indexOf("mhtml:")===0){
_220="mhtml:"+new CFURL(_220.substr("mhtml:".length),_21d);
if(_1f4===_1f7){
var _221=_220.indexOf("!"),_222=_220.substring(0,_221),_223=_220.substring(_221);
_220=_222+"?"+_1b6+_223;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_220));
var _21f=_1a6.resourceAtURL(new CFURL(".",URL),YES);
new _1a6(URL,_21f,NO,YES);
}else{
if(_21c===_215){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_224,_225){
this._eventDispatcher.addEventListener(_224,_225);
};
CFBundle.prototype.removeEventListener=function(_226,_227){
this._eventDispatcher.removeEventListener(_226,_227);
};
CFBundle.prototype.onerror=function(_228){
throw _228.error;
};
CFBundle.prototype.bundlePath=function(){
return this._bundleURL.absoluteURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_229){
return this.resourceURL(_229).absoluteString();
};
var _22a={};
function _1a6(aURL,_22b,_22c,_22d){
this._parent=_22b;
this._eventDispatcher=new _76(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_22d;
if(_22c){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_22b){
_22a[name]=this;
}
this._isDirectory=!!_22c;
this._isNotFound=NO;
if(_22b){
_22b._children[name]=this;
}
if(_22c){
this._children={};
}else{
this._contents="";
}
};
_1a6.rootResources=function(){
return _22a;
};
_2.StaticResource=_1a6;
function _1dd(_22e){
_22e._isResolved=YES;
_22e._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_22e});
};
_1a6.prototype.resolve=function(){
if(this.isDirectory()){
var _22f=new CFBundle(this.URL());
_22f.onerror=function(){
};
_22f.load(NO);
}else{
var self=this;
function _230(_231){
self._contents=_231.request.responseText();
_1dd(self);
};
function _232(){
self._isNotFound=YES;
_1dd(self);
};
new _b2(this.URL(),_230,_232);
}
};
_1a6.prototype.name=function(){
return this._name;
};
_1a6.prototype.URL=function(){
return this._URL;
};
_1a6.prototype.contents=function(){
return this._contents;
};
_1a6.prototype.children=function(){
return this._children;
};
_1a6.prototype.parent=function(){
return this._parent;
};
_1a6.prototype.isResolved=function(){
return this._isResolved;
};
_1a6.prototype.write=function(_233){
this._contents+=_233;
};
function _234(_235){
var _236=_235.schemeAndAuthority(),_237=_22a[_236];
if(!_237){
_237=new _1a6(new CFURL(_236),NULL,YES,YES);
}
return _237;
};
_1a6.resourceAtURL=function(aURL,_238){
aURL=_1b9(aURL).absoluteURL();
var _239=_234(aURL),_23a=aURL.pathComponents(),_96=0,_23b=_23a.length;
for(;_96<_23b;++_96){
var name=_23a[_96];
if(_7b.call(_239._children,name)){
_239=_239._children[name];
}else{
if(_238){
if(name!=="/"){
name="./"+name;
}
_239=new _1a6(new CFURL(name,_239.URL()),_239,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _239;
};
_1a6.prototype.resourceAtURL=function(aURL,_23c){
return _1a6.resourceAtURL(new CFURL(aURL,this.URL()),_23c);
};
_1a6.resolveResourceAtURL=function(aURL,_23d,_23e){
aURL=_1b9(aURL).absoluteURL();
_23f(_234(aURL),_23d,aURL.pathComponents(),0,_23e);
};
_1a6.prototype.resolveResourceAtURL=function(aURL,_240,_241){
_1a6.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_240,_241);
};
function _23f(_242,_243,_244,_245,_246){
var _247=_244.length;
for(;_245<_247;++_245){
var name=_244[_245],_248=_7b.call(_242._children,name)&&_242._children[name];
if(!_248){
_248=new _1a6(new CFURL(name,_242.URL()),_242,_245+1<_247||_243,NO);
_248.resolve();
}
if(!_248.isResolved()){
return _248.addEventListener("resolve",function(){
_23f(_242,_243,_244,_245,_246);
});
}
if(_248.isNotFound()){
return _246(null,new Error("File not found: "+_244.join("/")));
}
if((_245+1<_247)&&_248.isFile()){
return _246(null,new Error("File is not a directory: "+_244.join("/")));
}
_242=_248;
}
_246(_242);
};
function _249(aURL,_24a,_24b){
var _24c=_1a6.includeURLs(),_24d=new CFURL(aURL,_24c[_24a]).absoluteURL();
_1a6.resolveResourceAtURL(_24d,NO,function(_24e){
if(!_24e){
if(_24a+1<_24c.length){
_249(aURL,_24a+1,_24b);
}else{
_24b(NULL);
}
return;
}
_24b(_24e);
});
};
_1a6.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_24f){
_249(aURL,0,_24f);
};
_1a6.prototype.addEventListener=function(_250,_251){
this._eventDispatcher.addEventListener(_250,_251);
};
_1a6.prototype.removeEventListener=function(_252,_253){
this._eventDispatcher.removeEventListener(_252,_253);
};
_1a6.prototype.isNotFound=function(){
return this._isNotFound;
};
_1a6.prototype.isFile=function(){
return !this._isDirectory;
};
_1a6.prototype.isDirectory=function(){
return this._isDirectory;
};
_1a6.prototype.toString=function(_254){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _255=this.name();
if(this.isDirectory()){
var _256=this._children;
for(var name in _256){
if(_256.hasOwnProperty(name)){
var _257=_256[name];
if(_254||!_257.isNotFound()){
_255+="\n\t"+_256[name].toString(_254).split("\n").join("\n\t");
}
}
}
}
return _255;
};
var _258=NULL;
_1a6.includeURLs=function(){
if(_258!==NULL){
return _258;
}
_258=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_258=["Frameworks","Frameworks/Debug"];
}else{
_258=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _259=_258.length;
while(_259--){
_258[_259]=new CFURL(_258[_259]).asDirectoryPathURL();
}
return _258;
};
var _25a="accessors",_25b="class",_25c="end",_25d="function",_25e="implementation",_25f="import",_260="each",_261="outlet",_262="action",_263="new",_264="selector",_265="super",_266="var",_267="in",_268="pragma",_269="mark",_26a="=",_26b="+",_26c="-",_26d=":",_26e=",",_26f=".",_270="*",_271=";",_272="<",_273="{",_274="}",_275=">",_276="[",_277="\"",_278="@",_279="#",_27a="]",_27b="?",_27c="(",_27d=")",_27e=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_27f=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_280=/^[a-zA-Z_$](\w|$)*$/;
function _281(_282){
this._index=-1;
this._tokens=(_282+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_281.prototype.push=function(){
this._context.push(this._index);
};
_281.prototype.pop=function(){
this._index=this._context.pop();
};
_281.prototype.peek=function(_283){
if(_283){
this.push();
var _284=this.skip_whitespace();
this.pop();
return _284;
}
return this._tokens[this._index+1];
};
_281.prototype.next=function(){
return this._tokens[++this._index];
};
_281.prototype.previous=function(){
return this._tokens[--this._index];
};
_281.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_281.prototype.skip_whitespace=function(_285){
var _286;
if(_285){
while((_286=this.previous())&&_27e.test(_286)){
}
}else{
while((_286=this.next())&&_27e.test(_286)){
}
}
return _286;
};
_2.Lexer=_281;
function _287(){
this.atoms=[];
};
_287.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_288,aURL,_289){
return new _28a(_288,aURL,_289).executable();
};
_2.eval=function(_28b){
return eval(_2.preprocess(_28b).code());
};
var _28a=function(_28c,aURL,_28d){
this._URL=new CFURL(aURL);
_28c=_28c.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _287();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _281(_28c);
this._flags=_28d;
this._classMethod=false;
this._executable=NULL;
this._classLookupTable={};
this._classVars={};
var _28e=new objj_class();
for(var i in _28e){
this._classVars[i]=1;
}
this.preprocess(this._tokens,this._buffer);
};
_28a.prototype.setClassInfo=function(_28f,_290,_291){
this._classLookupTable[_28f]={superClassName:_290,ivars:_291};
};
_28a.prototype.getClassInfo=function(_292){
return this._classLookupTable[_292];
};
_28a.prototype.allIvarNamesForClassName=function(_293){
var _294={},_295=this.getClassInfo(_293);
while(_295){
for(var i in _295.ivars){
_294[i]=1;
}
_295=this.getClassInfo(_295.superClassName);
}
return _294;
};
_2.Preprocessor=_28a;
_28a.Flags={};
_28a.Flags.IncludeDebugSymbols=1<<0;
_28a.Flags.IncludeTypeSignatures=1<<1;
_28a.prototype.executable=function(){
if(!this._executable){
this._executable=new _296(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_28a.prototype.accessors=function(_297){
var _298=_297.skip_whitespace(),_299={};
if(_298!=_27c){
_297.previous();
return _299;
}
while((_298=_297.skip_whitespace())!=_27d){
var name=_298,_29a=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
}
if((_298=_297.skip_whitespace())==_26a){
_29a=_297.skip_whitespace();
if(!/^\w+$/.test(_29a)){
throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
}
if(name=="setter"){
if((_298=_297.next())!=_26d){
throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
}
_29a+=":";
}
_298=_297.skip_whitespace();
}
_299[name]=_29a;
if(_298==_27d){
break;
}
if(_298!=_26e){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
}
}
return _299;
};
_28a.prototype.brackets=function(_29b,_29c){
var _29d=[];
while(this.preprocess(_29b,NULL,NULL,NULL,_29d[_29d.length]=[])){
}
if(_29d[0].length===1){
_29c.atoms[_29c.atoms.length]="[";
_29c.atoms[_29c.atoms.length]=_29d[0][0];
_29c.atoms[_29c.atoms.length]="]";
}else{
var _29e=new _287();
if(_29d[0][0].atoms[0]==_265){
_29c.atoms[_29c.atoms.length]="objj_msgSendSuper(";
_29c.atoms[_29c.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_29c.atoms[_29c.atoms.length]="objj_msgSend(";
_29c.atoms[_29c.atoms.length]=_29d[0][0];
}
_29e.atoms[_29e.atoms.length]=_29d[0][1];
var _29f=1,_2a0=_29d.length,_2a1=new _287();
for(;_29f<_2a0;++_29f){
var pair=_29d[_29f];
_29e.atoms[_29e.atoms.length]=pair[1];
_2a1.atoms[_2a1.atoms.length]=", "+pair[0];
}
_29c.atoms[_29c.atoms.length]=", \"";
_29c.atoms[_29c.atoms.length]=_29e;
_29c.atoms[_29c.atoms.length]="\"";
_29c.atoms[_29c.atoms.length]=_2a1;
_29c.atoms[_29c.atoms.length]=")";
}
};
_28a.prototype.directive=function(_2a2,_2a3,_2a4){
var _2a5=_2a3?_2a3:new _287(),_2a6=_2a2.next();
if(_2a6.charAt(0)==_277){
_2a5.atoms[_2a5.atoms.length]=_2a6;
}else{
if(_2a6===_25b){
_2a2.skip_whitespace();
return;
}else{
if(_2a6===_25e){
this.implementation(_2a2,_2a5);
}else{
if(_2a6===_25f){
this._import(_2a2);
}else{
if(_2a6===_264){
this.selector(_2a2,_2a5);
}
}
}
}
}
if(!_2a3){
return _2a5;
}
};
_28a.prototype.hash=function(_2a7,_2a8){
var _2a9=_2a8?_2a8:new _287(),_2aa=_2a7.next();
if(_2aa===_268){
_2aa=_2a7.skip_whitespace();
if(_2aa===_269){
while((_2aa=_2a7.next()).indexOf("\n")<0){
}
}
}else{
throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \""+_2aa+"\"."));
}
};
_28a.prototype.implementation=function(_2ab,_2ac){
var _2ad=_2ac,_2ae="",_2af=NO,_2b0=_2ab.skip_whitespace(),_2b1="Nil",_2b2=new _287(),_2b3=new _287();
if(!(/^\w/).test(_2b0)){
throw new Error(this.error_message("*** Expected class name, found \""+_2b0+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_2b0+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_2b0+"\").super_class";
this._currentClass=_2b0;
this._currentSelector="";
if((_2ae=_2ab.skip_whitespace())==_27c){
_2ae=_2ab.skip_whitespace();
if(_2ae==_27d){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_2b0+"\"."));
}
if(_2ab.skip_whitespace()!=_27d){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_2b0+"\"."));
}
_2ad.atoms[_2ad.atoms.length]="{\nvar the_class = objj_getClass(\""+_2b0+"\")\n";
_2ad.atoms[_2ad.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_2b0+"\\\"\");\n";
_2ad.atoms[_2ad.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_2ae==_26d){
_2ae=_2ab.skip_whitespace();
if(!_280.test(_2ae)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_2ae+"\"."));
}
_2b1=_2ae;
_2ae=_2ab.skip_whitespace();
}
_2ad.atoms[_2ad.atoms.length]="{var the_class = objj_allocateClassPair("+_2b1+", \""+_2b0+"\"),\nmeta_class = the_class.isa;";
if(_2ae==_273){
var _2b4={},_2b5=0,_2b6=[],_2b7,_2b8={},_2b9=[];
while((_2ae=_2ab.skip_whitespace())&&_2ae!=_274){
if(_2ae===_278){
_2ae=_2ab.next();
if(_2ae===_25a){
_2b7=this.accessors(_2ab);
}else{
if(_2ae!==_261){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_2ae+"')."));
}else{
_2b9.push("@"+_2ae);
}
}
}else{
if(_2ae==_271){
if(_2b5++===0){
_2ad.atoms[_2ad.atoms.length]="class_addIvars(the_class, [";
}else{
_2ad.atoms[_2ad.atoms.length]=", ";
}
var name=_2b6[_2b6.length-1];
if(this._flags&_28a.Flags.IncludeTypeSignatures){
_2ad.atoms[_2ad.atoms.length]="new objj_ivar(\""+name+"\", \""+_2b9.slice(0,_2b9.length-1).join(" ")+"\")";
}else{
_2ad.atoms[_2ad.atoms.length]="new objj_ivar(\""+name+"\")";
}
_2b4[name]=1;
_2b6=[];
_2b9=[];
if(_2b7){
_2b8[name]=_2b7;
_2b7=NULL;
}
}else{
_2b6.push(_2ae);
_2b9.push(_2ae);
}
}
}
if(_2b6.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_2b5){
_2ad.atoms[_2ad.atoms.length]="]);\n";
}
if(!_2ae){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
this.setClassInfo(_2b0,_2b1==="Nil"?null:_2b1,_2b4);
var _2b4=this.allIvarNamesForClassName(_2b0);
for(ivar_name in _2b8){
var _2ba=_2b8[ivar_name],_2bb=_2ba["property"]||ivar_name;
var _2bc=_2ba["getter"]||_2bb,_2bd="(id)"+_2bc+"\n{\nreturn "+ivar_name+";\n}";
if(_2b2.atoms.length!==0){
_2b2.atoms[_2b2.atoms.length]=",\n";
}
_2b2.atoms[_2b2.atoms.length]=this.method(new _281(_2bd),_2b4);
if(_2ba["readonly"]){
continue;
}
var _2be=_2ba["setter"];
if(!_2be){
var _2bf=_2bb.charAt(0)=="_"?1:0;
_2be=(_2bf?"_":"")+"set"+_2bb.substr(_2bf,1).toUpperCase()+_2bb.substring(_2bf+1)+":";
}
var _2c0="(void)"+_2be+"(id)newValue\n{\n";
if(_2ba["copy"]){
_2c0+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_2c0+=ivar_name+" = newValue;\n}";
}
if(_2b2.atoms.length!==0){
_2b2.atoms[_2b2.atoms.length]=",\n";
}
_2b2.atoms[_2b2.atoms.length]=this.method(new _281(_2c0),_2b4);
}
}else{
_2ab.previous();
}
_2ad.atoms[_2ad.atoms.length]="objj_registerClassPair(the_class);\n";
}
if(!_2b4){
var _2b4=this.allIvarNamesForClassName(_2b0);
}
while((_2ae=_2ab.skip_whitespace())){
if(_2ae==_26b){
this._classMethod=true;
if(_2b3.atoms.length!==0){
_2b3.atoms[_2b3.atoms.length]=", ";
}
_2b3.atoms[_2b3.atoms.length]=this.method(_2ab,this._classVars);
}else{
if(_2ae==_26c){
this._classMethod=false;
if(_2b2.atoms.length!==0){
_2b2.atoms[_2b2.atoms.length]=", ";
}
_2b2.atoms[_2b2.atoms.length]=this.method(_2ab,_2b4);
}else{
if(_2ae==_279){
this.hash(_2ab,_2ad);
}else{
if(_2ae==_278){
if((_2ae=_2ab.next())==_25c){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_2ae+"\"."));
}
}
}
}
}
}
if(_2b2.atoms.length!==0){
_2ad.atoms[_2ad.atoms.length]="class_addMethods(the_class, [";
_2ad.atoms[_2ad.atoms.length]=_2b2;
_2ad.atoms[_2ad.atoms.length]="]);\n";
}
if(_2b3.atoms.length!==0){
_2ad.atoms[_2ad.atoms.length]="class_addMethods(meta_class, [";
_2ad.atoms[_2ad.atoms.length]=_2b3;
_2ad.atoms[_2ad.atoms.length]="]);\n";
}
_2ad.atoms[_2ad.atoms.length]="}";
this._currentClass="";
};
_28a.prototype._import=function(_2c1){
var _2c2="",_2c3=_2c1.skip_whitespace(),_2c4=(_2c3!==_272);
if(_2c3===_272){
while((_2c3=_2c1.next())&&_2c3!==_275){
_2c2+=_2c3;
}
if(!_2c3){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_2c3.charAt(0)===_277){
_2c2=_2c3.substr(1,_2c3.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_2c3+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_2c2;
this._buffer.atoms[this._buffer.atoms.length]=_2c4?"\", YES);":"\", NO);";
this._dependencies.push(new _2c5(new CFURL(_2c2),_2c4));
};
_28a.prototype.method=function(_2c6,_2c7){
var _2c8=new _287(),_2c9,_2ca="",_2cb=[],_2cc=[null];
_2c7=_2c7||{};
while((_2c9=_2c6.skip_whitespace())&&_2c9!==_273&&_2c9!==_271){
if(_2c9==_26d){
var type="";
_2ca+=_2c9;
_2c9=_2c6.skip_whitespace();
if(_2c9==_27c){
while((_2c9=_2c6.skip_whitespace())&&_2c9!=_27d){
type+=_2c9;
}
_2c9=_2c6.skip_whitespace();
}
_2cc[_2cb.length+1]=type||null;
_2cb[_2cb.length]=_2c9;
if(_2c9 in _2c7){
CPLog.warn(this.error_message("*** Warning: Method ( "+_2ca+" ) uses a parameter name that is already in use ( "+_2c9+" )"));
}
}else{
if(_2c9==_27c){
var type="";
while((_2c9=_2c6.skip_whitespace())&&_2c9!=_27d){
type+=_2c9;
}
_2cc[0]=type||null;
}else{
if(_2c9==_26e){
if((_2c9=_2c6.skip_whitespace())!=_26f||_2c6.next()!=_26f||_2c6.next()!=_26f){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_2ca+=_2c9;
}
}
}
}
if(_2c9===_271){
_2c9=_2c6.skip_whitespace();
if(_2c9!==_273){
throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+"Semi-colons are allowed only to terminate the method signature, before the open brace."));
}
}
var _2cd=0,_2ce=_2cb.length;
_2c8.atoms[_2c8.atoms.length]="new objj_method(sel_getUid(\"";
_2c8.atoms[_2c8.atoms.length]=_2ca;
_2c8.atoms[_2c8.atoms.length]="\"), function";
this._currentSelector=_2ca;
if(this._flags&_28a.Flags.IncludeDebugSymbols){
_2c8.atoms[_2c8.atoms.length]=" $"+this._currentClass+"__"+_2ca.replace(/:/g,"_");
}
_2c8.atoms[_2c8.atoms.length]="(self, _cmd";
for(;_2cd<_2ce;++_2cd){
_2c8.atoms[_2c8.atoms.length]=", ";
_2c8.atoms[_2c8.atoms.length]=_2cb[_2cd];
}
_2c8.atoms[_2c8.atoms.length]=")\n{ with(self)\n{";
_2c8.atoms[_2c8.atoms.length]=this.preprocess(_2c6,NULL,_274,_273);
_2c8.atoms[_2c8.atoms.length]="}\n}";
if(this._flags&_28a.Flags.IncludeDebugSymbols){
_2c8.atoms[_2c8.atoms.length]=","+JSON.stringify(_2cc);
}
_2c8.atoms[_2c8.atoms.length]=")";
this._currentSelector="";
return _2c8;
};
_28a.prototype.preprocess=function(_2cf,_2d0,_2d1,_2d2,_2d3){
var _2d4=_2d0?_2d0:new _287(),_2d5=0,_2d6="";
if(_2d3){
_2d3[0]=_2d4;
var _2d7=false,_2d8=[0,0,0];
}
while((_2d6=_2cf.next())&&((_2d6!==_2d1)||_2d5)){
if(_2d3){
if(_2d6===_27b){
++_2d8[2];
}else{
if(_2d6===_273){
++_2d8[0];
}else{
if(_2d6===_274){
--_2d8[0];
}else{
if(_2d6===_27c){
++_2d8[1];
}else{
if(_2d6===_27d){
--_2d8[1];
}else{
if((_2d6===_26d&&_2d8[2]--===0||(_2d7=(_2d6===_27a)))&&_2d8[0]===0&&_2d8[1]===0){
_2cf.push();
var _2d9=_2d7?_2cf.skip_whitespace(true):_2cf.previous(),_2da=_27e.test(_2d9);
if(_2da||_280.test(_2d9)&&_27e.test(_2cf.previous())){
_2cf.push();
var last=_2cf.skip_whitespace(true),_2db=true,_2dc=false;
if(last==="+"||last==="-"){
if(_2cf.previous()!==last){
_2db=false;
}else{
last=_2cf.skip_whitespace(true);
_2dc=true;
}
}
_2cf.pop();
_2cf.pop();
if(_2db&&((!_2dc&&(last===_274))||last===_27d||last===_27a||last===_26f||_27f.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_280.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_2da){
_2d3[1]=":";
}else{
_2d3[1]=_2d9;
if(!_2d7){
_2d3[1]+=":";
}
var _2d5=_2d4.atoms.length;
while(_2d4.atoms[_2d5--]!==_2d9){
}
_2d4.atoms.length=_2d5;
}
return !_2d7;
}
if(_2d7){
return NO;
}
}
_2cf.pop();
if(_2d7){
return NO;
}
}
}
}
}
}
}
_2d8[2]=MAX(_2d8[2],0);
}
if(_2d2){
if(_2d6===_2d2){
++_2d5;
}else{
if(_2d6===_2d1){
--_2d5;
}
}
}
if(_2d6===_25d){
var _2dd="";
while((_2d6=_2cf.next())&&_2d6!==_27c&&!(/^\w/).test(_2d6)){
_2dd+=_2d6;
}
if(_2d6===_27c){
if(_2d2===_27c){
++_2d5;
}
_2d4.atoms[_2d4.atoms.length]="function"+_2dd+"(";
if(_2d3){
++_2d8[1];
}
}else{
_2d4.atoms[_2d4.atoms.length]=_2d6+" = function";
}
}else{
if(_2d6==_278){
this.directive(_2cf,_2d4);
}else{
if(_2d6==_279){
this.hash(_2cf,_2d4);
}else{
if(_2d6==_276){
this.brackets(_2cf,_2d4);
}else{
_2d4.atoms[_2d4.atoms.length]=_2d6;
}
}
}
}
}
if(_2d3){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_2d0){
return _2d4;
}
};
_28a.prototype.selector=function(_2de,_2df){
var _2e0=_2df?_2df:new _287();
_2e0.atoms[_2e0.atoms.length]="sel_getUid(\"";
if(_2de.skip_whitespace()!=_27c){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _2e1=_2de.skip_whitespace();
if(_2e1==_27d){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_2df.atoms[_2df.atoms.length]=_2e1;
var _2e2,_2e3=true;
while((_2e2=_2de.next())&&_2e2!=_27d){
if(_2e3&&/^\d+$/.test(_2e2)||!(/^(\w|$|\:)/.test(_2e2))){
if(!(/\S/).test(_2e2)){
if(_2de.skip_whitespace()==_27d){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_2e2+"' in @selector()."));
}
}
_2e0.atoms[_2e0.atoms.length]=_2e2;
_2e3=(_2e2==_26d);
}
_2e0.atoms[_2e0.atoms.length]="\")";
if(!_2df){
return _2e0;
}
};
_28a.prototype.error_message=function(_2e4){
return _2e4+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
function _2c5(aURL,_2e5){
this._URL=aURL;
this._isLocal=_2e5;
};
_2.FileDependency=_2c5;
_2c5.prototype.URL=function(){
return this._URL;
};
_2c5.prototype.isLocal=function(){
return this._isLocal;
};
_2c5.prototype.toMarkedString=function(){
var _2e6=this.URL().absoluteString();
return (this.isLocal()?_217:_216)+";"+_2e6.length+";"+_2e6;
};
_2c5.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _2e7=0,_2e8=1,_2e9=2,_2ea=0;
function _296(_2eb,_2ec,aURL,_2ed){
if(arguments.length===0){
return this;
}
this._code=_2eb;
this._function=_2ed||NULL;
this._URL=_1b9(aURL||new CFURL("(Anonymous"+(_2ea++)+")"));
this._fileDependencies=_2ec;
if(_2ec.length){
this._fileDependencyStatus=_2e7;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_2e9;
}
if(this._function){
return;
}
this.setCode(_2eb);
};
_2.Executable=_296;
_296.prototype.path=function(){
return this.URL().path();
};
_296.prototype.URL=function(){
return this._URL;
};
_296.prototype.functionParameters=function(){
var _2ee=["global","objj_executeFile","objj_importFile"];
return _2ee;
};
_296.prototype.functionArguments=function(){
var _2ef=[_1,this.fileExecuter(),this.fileImporter()];
return _2ef;
};
_296.prototype.execute=function(){
var _2f0=_2f1;
_2f1=CFBundle.bundleContainingURL(this.URL());
var _2f2=this._function.apply(_1,this.functionArguments());
_2f1=_2f0;
return _2f2;
};
_296.prototype.code=function(){
return this._code;
};
_296.prototype.setCode=function(code){
this._code=code;
var _2f3=this.functionParameters().join(",");
this._function=new Function(_2f3,code);
};
_296.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_296.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_2e9;
};
var _2f4=0,_2f5=[],_2f6={};
_296.prototype.loadFileDependencies=function(_2f7){
var _2f8=this._fileDependencyStatus;
if(_2f7){
if(_2f8===_2e9){
return _2f7();
}
this._fileDependencyCallbacks.push(_2f7);
}
if(_2f8===_2e7){
if(_2f4){
throw "Can't load";
}
_2f9(this);
}
};
function _2f9(_2fa){
_2f5.push(_2fa);
_2fa._fileDependencyStatus=_2e8;
var _2fb=_2fa.fileDependencies(),_96=0,_2fc=_2fb.length,_2fd=_2fa.referenceURL(),_2fe=_2fd.absoluteString(),_2ff=_2fa.fileExecutableSearcher();
_2f4+=_2fc;
for(;_96<_2fc;++_96){
var _300=_2fb[_96],_301=_300.isLocal(),URL=_300.URL(),_302=(_301&&(_2fe+" ")||"")+URL;
if(_2f6[_302]){
if(--_2f4===0){
_303();
}
continue;
}
_2f6[_302]=YES;
_2ff(URL,_301,_304);
}
};
function _304(_305){
--_2f4;
if(_305._fileDependencyStatus===_2e7){
_2f9(_305);
}else{
if(_2f4===0){
_303();
}
}
};
function _303(){
var _306=_2f5,_96=0,_307=_306.length;
_2f5=[];
for(;_96<_307;++_96){
_306[_96]._fileDependencyStatus=_2e9;
}
for(_96=0;_96<_307;++_96){
var _308=_306[_96],_309=_308._fileDependencyCallbacks,_30a=0,_30b=_309.length;
for(;_30a<_30b;++_30a){
_309[_30a]();
}
_308._fileDependencyCallbacks=[];
}
};
_296.prototype.referenceURL=function(){
if(this._referenceURL===_29){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_296.prototype.fileImporter=function(){
return _296.fileImporterForURL(this.referenceURL());
};
_296.prototype.fileExecuter=function(){
return _296.fileExecuterForURL(this.referenceURL());
};
_296.prototype.fileExecutableSearcher=function(){
return _296.fileExecutableSearcherForURL(this.referenceURL());
};
var _30c={};
_296.fileExecuterForURL=function(aURL){
var _30d=_1b9(aURL),_30e=_30d.absoluteString(),_30f=_30c[_30e];
if(!_30f){
_30f=function(aURL,_310,_311){
_296.fileExecutableSearcherForURL(_30d)(aURL,_310,function(_312){
if(!_312.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_312.execute(_311);
});
};
_30c[_30e]=_30f;
}
return _30f;
};
var _313={};
_296.fileImporterForURL=function(aURL){
var _314=_1b9(aURL),_315=_314.absoluteString(),_316=_313[_315];
if(!_316){
_316=function(aURL,_317,_318){
_159();
_296.fileExecutableSearcherForURL(_314)(aURL,_317,function(_319){
_319.loadFileDependencies(function(){
_319.execute();
_15a();
if(_318){
_318();
}
});
});
};
_313[_315]=_316;
}
return _316;
};
var _31a={},_31b={};
_296.fileExecutableSearcherForURL=function(_31c){
var _31d=_31c.absoluteString(),_31e=_31a[_31d],_31f={};
if(!_31e){
_31e=function(aURL,_320,_321){
var _322=(_320&&_31c||"")+aURL,_323=_31b[_322];
if(_323){
return _324(_323);
}
var _325=(aURL instanceof CFURL)&&aURL.scheme();
if(_320||_325){
if(!_325){
aURL=new CFURL(aURL,_31c);
}
_1a6.resolveResourceAtURL(aURL,NO,_324);
}else{
_1a6.resolveResourceAtURLSearchingIncludeURLs(aURL,_324);
}
function _324(_326){
if(!_326){
throw new Error("Could not load file at "+aURL);
}
_31b[_322]=_326;
_321(new _327(_326.URL()));
};
};
_31a[_31d]=_31e;
}
return _31e;
};
var _328={};
function _327(aURL){
aURL=_1b9(aURL);
var _329=aURL.absoluteString(),_32a=_328[_329];
if(_32a){
return _32a;
}
_328[_329]=this;
var _32b=_1a6.resourceAtURL(aURL).contents(),_32c=NULL,_32d=aURL.pathExtension();
if(_32b.match(/^@STATIC;/)){
_32c=_32e(_32b,aURL);
}else{
if(_32d==="j"||!_32d){
_32c=_2.preprocess(_32b,aURL,_28a.Flags.IncludeDebugSymbols);
}else{
_32c=new _296(_32b,[],aURL);
}
}
_296.apply(this,[_32c.code(),_32c.fileDependencies(),aURL,_32c._function]);
this._hasExecuted=NO;
};
_2.FileExecutable=_327;
_327.prototype=new _296();
_327.prototype.execute=function(_32f){
if(this._hasExecuted&&!_32f){
return;
}
this._hasExecuted=YES;
_296.prototype.execute.call(this);
};
_327.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _32e(_330,aURL){
var _331=new _10b(_330);
var _332=NULL,code="",_333=[];
while(_332=_331.getMarker()){
var text=_331.getString();
if(_332===_215){
code+=text;
}else{
if(_332===_216){
_333.push(new _2c5(new CFURL(text),NO));
}else{
if(_332===_217){
_333.push(new _2c5(new CFURL(text),YES));
}
}
}
}
var fn=_327._lookupCachedFunction(aURL);
if(fn){
return new _296(code,_333,aURL,fn);
}
return new _296(code,_333,aURL);
};
var _334={};
_327._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_334[aURL]=fn;
};
_327._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _334[aURL];
};
var _335=1,_336=2,_337=4,_338=8;
objj_ivar=function(_339,_33a){
this.name=_339;
this.type=_33a;
};
objj_method=function(_33b,_33c,_33d){
this.name=_33b;
this.method_imp=_33c;
this.types=_33d;
};
objj_class=function(_33e){
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
this.allocator=function(){
};
this._UID=-1;
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
class_getName=function(_33f){
if(_33f==Nil){
return "";
}
return _33f.name;
};
class_isMetaClass=function(_340){
if(!_340){
return NO;
}
return ((_340.info&(_336)));
};
class_getSuperclass=function(_341){
if(_341==Nil){
return Nil;
}
return _341.super_class;
};
class_setSuperclass=function(_342,_343){
_342.super_class=_343;
_342.isa.super_class=_343.isa;
};
class_addIvar=function(_344,_345,_346){
var _347=_344.allocator.prototype;
if(typeof _347[_345]!="undefined"){
return NO;
}
var ivar=new objj_ivar(_345,_346);
_344.ivar_list.push(ivar);
_344.ivar_dtable[_345]=ivar;
_347[_345]=NULL;
return YES;
};
class_addIvars=function(_348,_349){
var _34a=0,_34b=_349.length,_34c=_348.allocator.prototype;
for(;_34a<_34b;++_34a){
var ivar=_349[_34a],name=ivar.name;
if(typeof _34c[name]==="undefined"){
_348.ivar_list.push(ivar);
_348.ivar_dtable[name]=ivar;
_34c[name]=NULL;
}
}
};
class_copyIvarList=function(_34d){
return _34d.ivar_list.slice(0);
};
class_addMethod=function(_34e,_34f,_350,_351){
var _352=new objj_method(_34f,_350,_351);
_34e.method_list.push(_352);
_34e.method_dtable[_34f]=_352;
if(!((_34e.info&(_336)))&&(((_34e.info&(_336)))?_34e:_34e.isa).isa===(((_34e.info&(_336)))?_34e:_34e.isa)){
class_addMethod((((_34e.info&(_336)))?_34e:_34e.isa),_34f,_350,_351);
}
return YES;
};
class_addMethods=function(_353,_354){
var _355=0,_356=_354.length,_357=_353.method_list,_358=_353.method_dtable;
for(;_355<_356;++_355){
var _359=_354[_355];
_357.push(_359);
_358[_359.name]=_359;
}
if(!((_353.info&(_336)))&&(((_353.info&(_336)))?_353:_353.isa).isa===(((_353.info&(_336)))?_353:_353.isa)){
class_addMethods((((_353.info&(_336)))?_353:_353.isa),_354);
}
};
class_getInstanceMethod=function(_35a,_35b){
if(!_35a||!_35b){
return NULL;
}
var _35c=_35a.method_dtable[_35b];
return _35c?_35c:NULL;
};
class_getInstanceVariable=function(_35d,_35e){
if(!_35d||!_35e){
return NULL;
}
var _35f=_35d.ivar_dtable[_35e];
return _35f;
};
class_getClassMethod=function(_360,_361){
if(!_360||!_361){
return NULL;
}
var _362=(((_360.info&(_336)))?_360:_360.isa).method_dtable[_361];
return _362?_362:NULL;
};
class_respondsToSelector=function(_363,_364){
return class_getClassMethod(_363,_364)!=NULL;
};
class_copyMethodList=function(_365){
return _365.method_list.slice(0);
};
class_getVersion=function(_366){
return _366.version;
};
class_setVersion=function(_367,_368){
_367.version=parseInt(_368,10);
};
class_replaceMethod=function(_369,_36a,_36b){
if(!_369||!_36a){
return NULL;
}
var _36c=_369.method_dtable[_36a],_36d=NULL;
if(_36c){
_36d=_36c.method_imp;
}
_36c.method_imp=_36b;
return _36d;
};
var _36e=function(_36f){
var meta=(((_36f.info&(_336)))?_36f:_36f.isa);
if((_36f.info&(_336))){
_36f=objj_getClass(_36f.name);
}
if(_36f.super_class&&!((((_36f.super_class.info&(_336)))?_36f.super_class:_36f.super_class.isa).info&(_337))){
_36e(_36f.super_class);
}
if(!(meta.info&(_337))&&!(meta.info&(_338))){
meta.info=(meta.info|(_338))&~(0);
objj_msgSend(_36f,"initialize");
meta.info=(meta.info|(_337))&~(_338);
}
};
var _370=function(self,_371){
var isa=self.isa,_372=isa.method_dtable[_373];
if(_372){
var _374=_372.method_imp.call(this,self,_373,_371);
if(_374&&_374!==self){
arguments[0]=_374;
return objj_msgSend.apply(this,arguments);
}
}
_372=isa.method_dtable[_375];
if(_372){
var _376=isa.method_dtable[_377];
if(_376){
var _378=_372.method_imp.call(this,self,_375,_371);
if(_378){
var _379=objj_lookUpClass("CPInvocation");
if(_379){
var _37a=objj_msgSend(_379,_37b,_378),_96=0,_37c=arguments.length;
for(;_96<_37c;++_96){
objj_msgSend(_37a,_37d,arguments[_96],_96);
}
_376.method_imp.call(this,self,_377,_37a);
return objj_msgSend(_37a,_37e);
}
}
}
}
_372=isa.method_dtable[_37f];
if(_372){
return _372.method_imp.call(this,self,_37f,_371);
}
throw class_getName(isa)+" does not implement doesNotRecognizeSelector:. Did you forget a superclass for "+class_getName(isa)+"?";
};
class_getMethodImplementation=function(_380,_381){
if(!((((_380.info&(_336)))?_380:_380.isa).info&(_337))){
_36e(_380);
}
var _382=_380.method_dtable[_381];
var _383=_382?_382.method_imp:_370;
return _383;
};
var _384={};
objj_allocateClassPair=function(_385,_386){
var _387=new objj_class(_386),_388=new objj_class(_386),_389=_387;
if(_385){
_389=_385;
while(_389.superclass){
_389=_389.superclass;
}
_387.allocator.prototype=new _385.allocator;
_387.ivar_dtable=_387.ivar_store.prototype=new _385.ivar_store;
_387.method_dtable=_387.method_store.prototype=new _385.method_store;
_388.method_dtable=_388.method_store.prototype=new _385.isa.method_store;
_387.super_class=_385;
_388.super_class=_385.isa;
}else{
_387.allocator.prototype=new objj_object();
}
_387.isa=_388;
_387.name=_386;
_387.info=_335;
_387._UID=objj_generateObjectUID();
_388.isa=_389.isa;
_388.name=_386;
_388.info=_336;
_388._UID=objj_generateObjectUID();
return _387;
};
var _2f1=nil;
objj_registerClassPair=function(_38a){
_1[_38a.name]=_38a;
_384[_38a.name]=_38a;
_1c0(_38a,_2f1);
};
class_createInstance=function(_38b){
if(!_38b){
throw new Error("*** Attempting to create object with Nil class.");
}
var _38c=new _38b.allocator();
_38c.isa=_38b;
_38c._UID=objj_generateObjectUID();
return _38c;
};
var _38d=function(){
};
_38d.prototype.member=false;
with(new _38d()){
member=true;
}
if(new _38d().member){
var _38e=class_createInstance;
class_createInstance=function(_38f){
var _390=_38e(_38f);
if(_390){
var _391=_390.isa,_392=_391;
while(_391){
var _393=_391.ivar_list,_394=_393.length;
while(_394--){
_390[_393[_394].name]=NULL;
}
_391=_391.super_class;
}
_390.isa=_392;
}
return _390;
};
}
object_getClassName=function(_395){
if(!_395){
return "";
}
var _396=_395.isa;
return _396?class_getName(_396):"";
};
objj_lookUpClass=function(_397){
var _398=_384[_397];
return _398?_398:Nil;
};
objj_getClass=function(_399){
var _39a=_384[_399];
if(!_39a){
}
return _39a?_39a:Nil;
};
objj_getMetaClass=function(_39b){
var _39c=objj_getClass(_39b);
return (((_39c.info&(_336)))?_39c:_39c.isa);
};
ivar_getName=function(_39d){
return _39d.name;
};
ivar_getTypeEncoding=function(_39e){
return _39e.type;
};
objj_msgSend=function(_39f,_3a0){
if(_39f==nil){
return nil;
}
var isa=_39f.isa;
if(!((((isa.info&(_336)))?isa:isa.isa).info&(_337))){
_36e(isa);
}
var _3a1=isa.method_dtable[_3a0];
var _3a2=_3a1?_3a1.method_imp:_370;
switch(arguments.length){
case 2:
return _3a2(_39f,_3a0);
case 3:
return _3a2(_39f,_3a0,arguments[2]);
case 4:
return _3a2(_39f,_3a0,arguments[2],arguments[3]);
}
return _3a2.apply(_39f,arguments);
};
objj_msgSendSuper=function(_3a3,_3a4){
var _3a5=_3a3.super_class;
arguments[0]=_3a3.receiver;
if(!((((_3a5.info&(_336)))?_3a5:_3a5.isa).info&(_337))){
_36e(_3a5);
}
var _3a6=_3a5.method_dtable[_3a4];
var _3a7=_3a6?_3a6.method_imp:_370;
return _3a7.apply(_3a3.receiver,arguments);
};
method_getName=function(_3a8){
return _3a8.name;
};
method_getImplementation=function(_3a9){
return _3a9.method_imp;
};
method_setImplementation=function(_3aa,_3ab){
var _3ac=_3aa.method_imp;
_3aa.method_imp=_3ab;
return _3ac;
};
method_exchangeImplementations=function(lhs,rhs){
var _3ad=method_getImplementation(lhs),_3ae=method_getImplementation(rhs);
method_setImplementation(lhs,_3ae);
method_setImplementation(rhs,_3ad);
};
sel_getName=function(_3af){
return _3af?_3af:"<null selector>";
};
sel_getUid=function(_3b0){
return _3b0;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_3b1){
return _3b1;
};
objj_class.prototype.toString=objj_object.prototype.toString=function(){
var isa=this.isa;
if(class_getInstanceMethod(isa,_3b2)){
return objj_msgSend(this,_3b2);
}
if(class_isMetaClass(isa)){
return this.name;
}
return "["+isa.name+" Object](-description not implemented)";
};
var _3b2=sel_getUid("description"),_373=sel_getUid("forwardingTargetForSelector:"),_375=sel_getUid("methodSignatureForSelector:"),_377=sel_getUid("forwardInvocation:"),_37f=sel_getUid("doesNotRecognizeSelector:"),_37b=sel_getUid("invocationWithMethodSignature:"),_3b3=sel_getUid("setTarget:"),_3b4=sel_getUid("setSelector:"),_37d=sel_getUid("setArgument:atIndex:"),_37e=sel_getUid("returnValue");
objj_eval=function(_3b5){
var url=_2.pageURL;
var _3b6=_2.asyncLoader;
_2.asyncLoader=NO;
var _3b7=_2.preprocess(_3b5,url,0);
if(!_3b7.hasLoadedFileDependencies()){
_3b7.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_296.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_296.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_3b7._code+"\n//*/\n}";
var _3b8;
_3b8=eval(code);
_2.asyncLoader=_3b6;
return _3b8;
};
_2.objj_eval=objj_eval;
_159();
var _3b9=new CFURL(window.location.href),_3ba=document.getElementsByTagName("base"),_3bb=_3ba.length;
if(_3bb>0){
var _3bc=_3ba[_3bb-1],_3bd=_3bc&&_3bc.getAttribute("href");
if(_3bd){
_3b9=new CFURL(_3bd,_3b9);
}
}
var _3be=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1bf=new CFURL(".",new CFURL(_3be,_3b9)).absoluteURL(),_3bf=new CFURL("..",_1bf).absoluteURL();
if(_1bf===_3bf){
_3bf=new CFURL(_3bf.schemeAndAuthority());
}
_1a6.resourceAtURL(_3bf,YES);
_2.pageURL=_3b9;
_2.bootstrap=function(){
_3c0();
};
function _3c0(){
_1a6.resolveResourceAtURL(_1bf,YES,function(_3c1){
var _3c2=_1a6.includeURLs(),_96=0,_3c3=_3c2.length;
for(;_96<_3c3;++_96){
_3c1.resourceAtURL(_3c2[_96],YES);
}
_296.fileImporterForURL(_1bf)(_3be.lastPathComponent(),YES,function(){
_15a();
_3c9(function(){
var _3c4=window.location.hash.substring(1),args=[];
if(_3c4.length){
args=_3c4.split("/");
for(var i=0,_3c3=args.length;i<_3c3;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _3c5=window.location.search.substring(1).split("&"),_3c6=new CFMutableDictionary();
for(var i=0,_3c3=_3c5.length;i<_3c3;i++){
var _3c7=_3c5[i].split("=");
if(!_3c7[0]){
continue;
}
if(_3c7[1]==null){
_3c7[1]=true;
}
_3c6.setValueForKey(decodeURIComponent(_3c7[0]),decodeURIComponent(_3c7[1]));
}
main(args,_3c6);
});
});
});
};
var _3c8=NO;
function _3c9(_3ca){
if(_3c8){
return _3ca();
}
if(window.addEventListener){
window.addEventListener("load",_3ca,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3ca);
}
}
};
_3c9(function(){
_3c8=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1b9(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1bf);
};
objj_importFile=_296.fileImporterForURL(_1bf);
objj_executeFile=_296.fileExecuterForURL(_1bf);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
