@STATIC;1.0;p;15;_NSCornerView.jt;994;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jt;945;
objj_executeFile("AppKit/CPTableHeaderView.j",NO);
var _1=objj_getClass("_CPCornerView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPCornerView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
return _3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("_CPCornerView").super_class},"NS_initWithCoder:",_5);
}
})]);
var _1=objj_allocateClassPair(_CPCornerView,"_NSCornerView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
_6=objj_msgSendSuper({receiver:_6,super_class:objj_getClass("_NSCornerView").super_class},"NS_initWithCoder:",_8);
if(_6){
_frame.size.height=23;
_bounds.size.height=23;
}
return _6;
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(_CPCornerView,"class");
}
})]);
p;15;Converter+Mac.jt;3608;@STATIC;1.0;i;11;Converter.jt;3573;
objj_executeFile("Converter.j",YES);
var _1=objj_getClass("Converter");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"Converter\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("convertedDataFromMacData:resourcesPath:"),function(_3,_4,_5,_6){
with(_3){
var _7=objj_msgSend(objj_msgSend(Nib2CibKeyedUnarchiver,"alloc"),"initForReadingWithData:resourcesPath:",_5,_6),_8=objj_msgSend(_7,"decodeObjectForKey:","IB.objectdata"),_9=objj_msgSend(_7,"allObjects"),_a=objj_msgSend(_9,"count");
while(_a--){
var _b=_9[_a];
objj_msgSend(_3,"replaceFontForObject:",_b);
if(!objj_msgSend(_b,"isKindOfClass:",objj_msgSend(CPView,"class"))){
continue;
}
var _c=objj_msgSend(_b,"superview");
if(!_c||objj_msgSend(_c,"NS_isFlipped")){
continue;
}
var _d=CGRectGetHeight(objj_msgSend(_c,"bounds")),_e=objj_msgSend(_b,"frame");
objj_msgSend(_b,"setFrameOrigin:",CGPointMake(CGRectGetMinX(_e),_d-CGRectGetMaxY(_e)));
var _f=objj_msgSend(_b,"autoresizingMask");
autoresizingMask=_f&~(CPViewMaxYMargin|CPViewMinYMargin);
if(!(_f&(CPViewMaxYMargin|CPViewMinYMargin|CPViewHeightSizable))){
autoresizingMask|=CPViewMinYMargin;
}else{
if(_f&CPViewMaxYMargin){
autoresizingMask|=CPViewMinYMargin;
}
if(_f&CPViewMinYMargin){
autoresizingMask|=CPViewMaxYMargin;
}
}
objj_msgSend(_b,"setAutoresizingMask:",autoresizingMask);
}
var _10=objj_msgSend(CPData,"data"),_11=objj_msgSend(objj_msgSend(CPKeyedArchiver,"alloc"),"initForWritingWithMutableData:",_10);
objj_msgSend(_11,"encodeObject:forKey:",_8,"CPCibObjectDataKey");
objj_msgSend(_11,"finishEncoding");
return _10;
}
}),new objj_method(sel_getUid("replaceFontForObject:"),function(_12,_13,_14){
with(_12){
if(objj_msgSend(_14,"respondsToSelector:",sel_getUid("font"))&&objj_msgSend(_14,"respondsToSelector:",sel_getUid("setFont:"))){
var _15=objj_msgSend(_14,"font");
if(_15){
objj_msgSend(_12,"replaceFont:forObject:",_15,_14);
}
}else{
if(objj_msgSend(_14,"isKindOfClass:",objj_msgSend(CPView,"class"))){
var _16=objj_msgSend(_14,"subviews"),_17=objj_msgSend(_16,"count");
if(_17&&objj_msgSend(_16[0],"isKindOfClass:",objj_msgSend(CPRadio,"class"))){
while(_17--){
var _18=_16[_17];
objj_msgSend(_12,"replaceFont:forObject:",objj_msgSend(_18,"font"),_18);
}
}
}
}
}
}),new objj_method(sel_getUid("replaceFont:forObject:"),function(_19,_1a,_1b,_1c){
with(_19){
var _1d=nil;
if(objj_msgSend(_1c,"respondsToSelector:",sel_getUid("cibFontForNibFont:"))){
_1d=objj_msgSend(_1c,"cibFontForNibFont:",objj_msgSend(_1c,"font"));
}else{
_1d=objj_msgSend(objj_msgSend(_1c,"font"),"cibFontForNibFont");
}
if(!_1d||!objj_msgSend(_1d,"isEqual:",_1b)){
var _1e="";
if(!_1d){
var _1f=objj_msgSend(_1b,"isBold");
for(var i=0;i<themes.length;++i){
_1d=objj_msgSend(themes[i],"valueForAttributeWithName:inState:forClass:","font",objj_msgSend(_1c,"themeState"),objj_msgSend(_1c,"class"));
if(_1d){
_1e=" (from "+objj_msgSend(themes[i],"name")+")";
break;
}
}
if(!_1d||objj_msgSend(_1d,"isSystem")){
var _20=objj_msgSend(_1d,"size")||CPFontDefaultSystemFontSize;
_1f=_1d?objj_msgSend(_1d,"isBold"):_1f;
if(_20===CPFontDefaultSystemFontSize){
_20=CPFontCurrentSystemSize;
}
_1d=_1f?objj_msgSend(CPFont,"boldSystemFontOfSize:",_20):objj_msgSend(CPFont,"systemFontOfSize:",_20);
}
}
var _21="System "+(_1f?"bold ":"")+(objj_msgSend(_1d,"isSystemSize")?"(current size)":objj_msgSend(_1d,"size"));
objj_msgSend(_1c,"setFont:",_1d);
CPLog.debug("%s: substituted <%s>%s for <%s>",objj_msgSend(_1c,"className"),_21||objj_msgSend(NSFont,"descriptorForFont:",_1d),_1e,objj_msgSend(NSFont,"descriptorForFont:",_1b));
}
}
})]);
p;11;Converter.jt;4778;@STATIC;1.0;I;23;Foundation/Foundation.jI;15;AppKit/AppKit.jI;19;BlendKit/BlendKit.ji;15;Converter+Mac.jt;4667;
objj_executeFile("Foundation/Foundation.j",NO);
objj_executeFile("AppKit/AppKit.j",NO);
objj_executeFile("BlendKit/BlendKit.j",NO);
var _1=require("file"),OS=require("os"),_2=nil;
NibFormatUndetermined=0,NibFormatMac=1,NibFormatIPhone=2;
ConverterModeLegacy=0;
ConverterModeNew=1;
ConverterConversionException="ConverterConversionException";
var _3=objj_allocateClassPair(CPObject,"Converter"),_4=_3.isa;
class_addIvars(_3,[new objj_ivar("inputPath"),new objj_ivar("outputPath"),new objj_ivar("resourcesPath"),new objj_ivar("format"),new objj_ivar("themes"),new objj_ivar("userNSClasses")]);
objj_registerClassPair(_3);
class_addMethods(_3,[new objj_method(sel_getUid("inputPath"),function(_5,_6){
with(_5){
return inputPath;
}
}),new objj_method(sel_getUid("outputPath"),function(_7,_8){
with(_7){
return outputPath;
}
}),new objj_method(sel_getUid("setOutputPath:"),function(_9,_a,_b){
with(_9){
outputPath=_b;
}
}),new objj_method(sel_getUid("resourcesPath"),function(_c,_d){
with(_c){
return resourcesPath;
}
}),new objj_method(sel_getUid("setResourcesPath:"),function(_e,_f,_10){
with(_e){
resourcesPath=_10;
}
}),new objj_method(sel_getUid("format"),function(_11,_12){
with(_11){
return format;
}
}),new objj_method(sel_getUid("themes"),function(_13,_14){
with(_13){
return themes;
}
}),new objj_method(sel_getUid("userNSClasses"),function(_15,_16){
with(_15){
return userNSClasses;
}
}),new objj_method(sel_getUid("setUserNSClasses:"),function(_17,_18,_19){
with(_17){
userNSClasses=_19;
}
}),new objj_method(sel_getUid("initWithInputPath:format:themes:"),function(_1a,_1b,_1c,_1d,_1e){
with(_1a){
_1a=objj_msgSendSuper({receiver:_1a,super_class:objj_getClass("Converter").super_class},"init");
if(_1a){
_2=_1a;
inputPath=_1c;
format=_1d;
themes=_1e;
}
return _1a;
}
}),new objj_method(sel_getUid("convert"),function(_1f,_20){
with(_1f){
if(objj_msgSend(resourcesPath,"length")&&!_1.isReadable(resourcesPath)){
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,"Could not read Resources at path \""+resourcesPath+"\"");
}
var _21=format;
if(_21===NibFormatUndetermined){
_21=NibFormatMac;
if(_1.extension(inputPath)!==".nib"&&_1.isFile(inputPath)&&_1.read(inputPath,{charset:"UTF-8"}).indexOf("<archive type=\"com.apple.InterfaceBuilder3.CocoaTouch.XIB\"")!==-1){
_21=NibFormatIPhone;
}
if(_21===NibFormatMac){
CPLog.info("Auto-detected Cocoa Nib or Xib File");
}else{
CPLog.info("Auto-detected CocoaTouch Xib File");
}
}
var _22=objj_msgSend(_1f,"CPCompliantNibDataAtFilePath:",inputPath);
if(_21===NibFormatMac){
var _23=objj_msgSend(_1f,"convertedDataFromMacData:resourcesPath:",_22,resourcesPath);
}else{
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,"nib2cib does not understand this nib format.");
}
if(!objj_msgSend(outputPath,"length")){
outputPath=inputPath.substr(0,inputPath.length-_1.extension(inputPath).length)+".cib";
}
_1.write(outputPath,objj_msgSend(_23,"rawString"),{charset:"UTF-8"});
CPLog.info(CPLogColorize("Conversion successful","warn"));
}
}),new objj_method(sel_getUid("CPCompliantNibDataAtFilePath:"),function(_24,_25,_26){
with(_24){
CPLog.info("Converting Xib file to plist...");
var _27="",_28="";
try{
_27=_1.join("/tmp",_1.basename(_26)+".tmp.nib");
if(OS.popen(["/usr/bin/ibtool",_26,"--compile",_27]).wait()===1){
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,"Could not compile file: "+_26);
}
var _28=_1.join("/tmp",_1.basename(_26)+".tmp.plist");
if(OS.popen(["/usr/bin/plutil","-convert","xml1",_27,"-o",_28]).wait()===1){
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,"Could not convert to xml plist for file: "+_26);
}
if(!_1.isReadable(_28)){
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,"Unable to convert nib file.");
}
var _29=_1.read(_28,{charset:"UTF-8"});
if(system.engine==="rhino"){
_29=String(java.lang.String(_29).replaceAll("\\<key\\>\\s*CF\\$UID\\s*\\</key\\>","<key>CP\\$UID</key>"));
}else{
_29=_29.replace(/\<key\>\s*CF\$UID\s*\<\/key\>/g,"<key>CP$UID</key>");
}
_29=_29.replace(/<string>[\u0000-\u0008\u000B\u000C\u000E-\u001F]<\/string>/g,function(c){
CPLog.warn("Warning: converting character 0x"+c.charCodeAt(8).toString(16)+" to base64 representation");
return "<string type=\"base64\">"+CFData.encodeBase64String(c.charAt(8))+"</string>";
});
}
finally{
if(_27!==""&&_1.isWritable(_27)){
_1.remove(_27);
}
if(_28!==""&&_1.isWritable(_28)){
_1.remove(_28);
}
}
return objj_msgSend(CPData,"dataWithRawString:",_29);
}
})]);
class_addMethods(_4,[new objj_method(sel_getUid("sharedConverter"),function(_2a,_2b){
with(_2a){
return _2;
}
})]);
objj_executeFile("Converter+Mac.j",YES);
p;6;main.jt;184;@STATIC;1.0;i;9;Nib2Cib.jt;153;
objj_executeFile("Nib2Cib.j",YES);
main=function(_1){
var _2=objj_msgSend(objj_msgSend(Nib2Cib,"alloc"),"initWithArgs:",_1);
objj_msgSend(_2,"run");
};
p;9;Nib2Cib.jt;19925;@STATIC;1.0;I;23;Foundation/Foundation.jI;15;AppKit/AppKit.jI;19;BlendKit/BlendKit.ji;14;NSFoundation.ji;10;NSAppKit.ji;24;Nib2CibKeyedUnarchiver.ji;11;Converter.jt;19754;
objj_executeFile("Foundation/Foundation.j",NO);
objj_executeFile("AppKit/AppKit.j",NO);
objj_executeFile("BlendKit/BlendKit.j",NO);
objj_executeFile("NSFoundation.j",YES);
objj_executeFile("NSAppKit.j",YES);
objj_executeFile("Nib2CibKeyedUnarchiver.j",YES);
objj_executeFile("Converter.j",YES);
var _1=require("file"),OS=require("os"),_2=require("system"),_3=require("jake").FileList,_4=require("narwhal/term").stream,_5=require("objective-j").StaticResource,_6="Aristo",_7=["Debug","Release"],_8="MainMenu",_9=new RegExp("^(defaultTheme|auxThemes|verbosity|quiet|frameworks|format)$"),_a=/"[^\"]+"|'[^\']+'|\S+/g;
var _b=objj_allocateClassPair(CPObject,"Nib2Cib"),_c=_b.isa;
class_addIvars(_b,[new objj_ivar("commandLineArgs"),new objj_ivar("parser"),new objj_ivar("nibInfo"),new objj_ivar("appDirectory"),new objj_ivar("resourcesDirectory"),new objj_ivar("infoPlist"),new objj_ivar("userNSClasses")]);
objj_registerClassPair(_b);
class_addMethods(_b,[new objj_method(sel_getUid("initWithArgs:"),function(_d,_e,_f){
with(_d){
_d=objj_msgSendSuper({receiver:_d,super_class:objj_getClass("Nib2Cib").super_class},"init");
if(_d){
commandLineArgs=_f;
parser=new (require("narwhal/args").Parser)();
nibInfo={};
appDirectory="";
resourcesDirectory="";
infoPlist=objj_msgSend(CPDictionary,"dictionary");
userNSClasses=[];
}
return _d;
}
}),new objj_method(sel_getUid("run"),function(_10,_11){
with(_10){
try{
var _12=objj_msgSend(_10,"parseOptionsFromArgs:",commandLineArgs);
objj_msgSend(_10,"setLogLevel:",_12.quiet?-1:_12.verbosity);
objj_msgSend(_10,"checkPrerequisites");
if(_12.watch){
objj_msgSend(_10,"watchWithOptions:",_12);
}else{
objj_msgSend(_10,"convertWithOptions:inputFile:",_12,nil);
}
}
catch(anException){
CPLog.fatal(objj_msgSend(_10,"exceptionReason:",anException));
OS.exit(1);
}
}
}),new objj_method(sel_getUid("checkPrerequisites"),function(_13,_14){
with(_13){
var _15=require("cappuccino/fontinfo").fontinfo,_16=_15("LucidaGrande",13);
if(!_16){
objj_msgSend(_13,"failWithMessage:","fontinfo does not appear to be installed");
}
}
}),new objj_method(sel_getUid("convertWithOptions:inputFile:"),function(_17,_18,_19,_1a){
with(_17){
try{
_1a=_1a||objj_msgSend(_17,"getInputFile:",_19.args);
objj_msgSend(_17,"getAppAndResourceDirectoriesFromInputFile:options:",_1a,_19);
if(_19.readStoredOptions){
_19=objj_msgSend(_17,"mergeOptionsWithStoredOptions:inputFile:",_19,_1a);
objj_msgSend(_17,"setLogLevel:",_19.quiet?-1:_19.verbosity);
}
if(!_19.quiet&&_19.verbosity>0){
objj_msgSend(_17,"printVersion");
}
var _1b=objj_msgSend(_17,"getOutputFileFromInputFile:args:",_1a,_19.args),_1c=objj_msgSend(_17,"readConfigFile:inputFile:",_19.configFile||"",_1a);
infoPlist=_1c.plist;
if(infoPlist){
var _1d=objj_msgSend(infoPlist,"valueForKey:","CPSystemFontFace");
if(_1d){
objj_msgSend(CPFont,"setSystemFontFace:",_1d);
}
var _1e=objj_msgSend(infoPlist,"valueForKey:","CPSystemFontSize");
if(_1e){
objj_msgSend(CPFont,"setSystemFontSize:",parseFloat(_1e,10));
}
}else{
infoPlist=objj_msgSend(CPDictionary,"dictionary");
}
var _1f=objj_msgSend(_17,"getThemeList:",_19),_20=objj_msgSend(_17,"loadThemesFromList:",_1f);
CPLog.info("\n-------------------------------------------------------------");
CPLog.info("Input         : "+_1a);
CPLog.info("Output        : "+_1b);
CPLog.info("Format        : "+["Auto","Mac","iPhone"][_19.format]);
CPLog.info("Application   : "+appDirectory);
CPLog.info("Resources     : "+resourcesDirectory);
CPLog.info("Frameworks    : "+(_19.frameworks||""));
CPLog.info("Default theme : "+_1f[0]);
CPLog.info("Aux themes    : "+_1f.slice(1).join(", "));
CPLog.info("Config file   : "+(_1c.path||""));
CPLog.info("System Font   : "+objj_msgSend(CPFont,"systemFontSize")+"px "+objj_msgSend(CPFont,"systemFontFace"));
CPLog.info("-------------------------------------------------------------\n");
var _21=objj_msgSend(objj_msgSend(Converter,"alloc"),"initWithInputPath:format:themes:",_1a,_19.format,_20);
objj_msgSend(_21,"setOutputPath:",_1b);
objj_msgSend(_21,"setResourcesPath:",resourcesDirectory);
var _22=function(){
objj_msgSend(_17,"loadNSClassesFromBundle:",objj_msgSend(CPBundle,"mainBundle"));
objj_msgSend(_21,"setUserNSClasses:",userNSClasses);
objj_msgSend(_21,"convert");
};
objj_msgSend(_17,"loadFrameworks:verbosity:callback:",_19.frameworks,_19.verbosity,_22);
return YES;
}
catch(anException){
CPLog.fatal(objj_msgSend(_17,"exceptionReason:",anException));
return NO;
}
}
}),new objj_method(sel_getUid("watchWithOptions:"),function(_23,_24,_25){
with(_23){
var _26=_25.quiet?-1:_25.verbosity,_27=_25.args[0];
if(!_27){
_27=_1.canonical(_1.isDirectory("Resources")?"Resources":".");
}else{
_27=_1.canonical(_27);
if(_1.basename(_27)!=="Resources"){
var _28=_1.join(_27,"Resources");
if(_1.isDirectory(_28)){
_27=_28;
}
}
}
if(!_1.isDirectory(_27)){
objj_msgSend(_23,"failWithMessage:","Cannot find the directory: "+_27);
}
objj_msgSend(_23,"setLogLevel:",1);
var _29=new _3(_1.join(_27,"*.[nx]ib")).items(),_2a=_29.length;
while(_2a--){
var nib=_29[_2a],cib=nib.substr(0,nib.length-4)+".cib";
if(_1.exists(cib)&&(_1.mtime(nib)-_1.mtime(cib))<=0){
nibInfo[nib]=_1.mtime(nib);
}
}
CPLog.info("Watching: "+CPLogColorize(_27,"debug"));
CPLog.info("Press Control-C to stop...");
while(true){
var _2b=objj_msgSend(_23,"getModifiedNibsInDirectory:",_27);
for(var i=0;i<_2b.length;++i){
var _2c=_2b[i][0],nib=_2b[i][1],_2d=_2c==="add"?"Added":"Modified",_2e=_2c==="add"?"info":"debug";
CPLog.info(">> %s: %s",CPLogColorize(_2d,_2e),nib);
if(_2c==="add"){
var cib=nib.substr(0,nib.length-4)+".cib";
if(_1.exists(cib)&&(_1.mtime(nib)-_1.mtime(cib))<0){
continue;
}
}
objj_msgSend(_23,"setLogLevel:",_26);
var _2f=objj_msgSend(_23,"convertWithOptions:inputFile:",_25,nib);
objj_msgSend(_23,"setLogLevel:",1);
if(_2f){
if(_26>0){
_4.print();
}else{
CPLog.warn("Conversion successful");
}
}
}
OS.sleep(1);
}
}
}),new objj_method(sel_getUid("parseOptionsFromArgs:"),function(_30,_31,_32){
with(_30){
parser.usage("[--watch DIRECTORY] [INPUT_FILE [OUTPUT_FILE]]");
parser.option("--watch","watch").set(true).help("Ask nib2cib to watch a directory for changes");
parser.option("-R","resourcesDir").set().displayName("directory").help("Set the Resources directory, usually unnecessary as it is inferred from the input path");
parser.option("--default-theme","defaultTheme").set().displayName("name").help("Specify a custom default theme which is not set in your Info.plist");
parser.option("-t","--theme","auxThemes").push().displayName("name").help("An additional theme loaded dynamically by your application");
parser.option("--config","configFile").set().displayName("path").help("A path to an Info.plist file from which the system font and/or size can be retrieved");
parser.option("-v","--verbose","verbosity").inc().help("Increase verbosity level");
parser.option("-q","--quiet","quiet").set(true).help("No output");
parser.option("-F","--framework","frameworks").push().help("Add a framework to load");
parser.option("--no-stored-options","readStoredOptions").set(false).def(true).help("Do not read stored options");
parser.option("--mac","format").set(NibFormatMac).def(NibFormatUndetermined).help("Set format to Mac");
parser.option("--version","showVersion").action(function(){
objj_msgSend(_30,"printVersionAndExit");
}).help("Show the version of nib2cib and quit");
parser.helpful();
var _33=parser.parse(_32,null,null,true);
if(_33.args.length>2){
parser.printUsage(_33);
OS.exit(0);
}
return _33;
}
}),new objj_method(sel_getUid("mergeOptionsWithStoredOptions:inputFile:"),function(_34,_35,_36,_37){
with(_34){
var _38=objj_msgSend(_34,"readStoredOptionsAtPath:",_1.join(_2.env["HOME"],".nib2cibconfig")),_39=objj_msgSend(_34,"readStoredOptionsAtPath:",_1.join(appDirectory,"nib2cib.conf")),_3a=_1.basename(_37,_1.extension(_37))+".conf",_3b=objj_msgSend(_34,"readStoredOptionsAtPath:",_1.join(_1.dirname(_37),_3a));
_38=objj_msgSend(_34,"parseOptionsFromArgs:",[_36.command].concat(_38));
_39=objj_msgSend(_34,"parseOptionsFromArgs:",[_36.command].concat(_39));
_3b=objj_msgSend(_34,"parseOptionsFromArgs:",[_36.command].concat(_3b));
var _3c=_38;
objj_msgSend(_34,"mergeOptions:with:",_39,_3c);
objj_msgSend(_34,"mergeOptions:with:",_3b,_3c);
objj_msgSend(_34,"mergeOptions:with:",_36,_3c);
_3c.args=_36.args;
return _3c;
}
}),new objj_method(sel_getUid("readStoredOptionsAtPath:"),function(_3d,_3e,_3f){
with(_3d){
_3f=_1.canonical(_3f);
if(!_1.isReadable(_3f)){
return [];
}
var _40=_1.open(_3f,"r"),_41=_40.readLine(),_42=_41.match(_a)||[];
_40.close();
CPLog.debug("Reading stored options: "+_3f);
if(_42){
for(var i=0;i<_42.length;++i){
var str=_42[i];
if((str.charAt(0)==="\""&&str.substr(-1)==="\"")||(str.charAt(0)==="'"&&str.substr(-1)==="'")){
_42[i]=str.substr(1,str.length-2);
}
}
return _42;
}else{
return [];
}
}
}),new objj_method(sel_getUid("printOptions:"),function(_43,_44,_45){
with(_43){
for(option in _45){
var _46=_45[option];
if(_46){
var _47=_46.length!==undefined?_46.length>0:!!_46;
if(_47){
print(option+": "+_46);
}
}
}
}
}),new objj_method(sel_getUid("mergeOptions:with:"),function(_48,_49,_4a,_4b){
with(_48){
for(option in _4a){
if(!_9.test(option)){
continue;
}
if(_4a.hasOwnProperty(option)){
var _4c=_4a[option];
if(_4c){
var _4d=_4c.length!==undefined?_4c.length>0:!!_4c;
if(_4d){
_4b[option]=_4c;
}
}
}
}
}
}),new objj_method(sel_getUid("setLogLevel:"),function(_4e,_4f,_50){
with(_4e){
CPLogUnregister(CPLogPrint);
if(_50===0){
CPLogRegister(CPLogPrint,"warn",logFormatter);
}else{
if(_50===1){
CPLogRegister(CPLogPrint,"info",logFormatter);
}else{
if(_50>1){
CPLogRegister(CPLogPrint,null,logFormatter);
}
}
}
}
}),new objj_method(sel_getUid("getInputFile:"),function(_51,_52,_53){
with(_51){
var _54=_53[0]||_8,_55="";
if(!/^.+\.[nx]ib$/.test(_54)){
if(_55=objj_msgSend(_51,"findInputFile:extension:",_54,".xib")){
_54=_55;
}else{
if(_55=objj_msgSend(_51,"findInputFile:extension:",_54,".nib")){
_54=_55;
}else{
objj_msgSend(_51,"failWithMessage:","Cannot find the input file (.xib or .nib): "+_1.canonical(_54));
}
}
}else{
if(_55=objj_msgSend(_51,"findInputFile:extension:",_54,nil)){
_54=_55;
}else{
objj_msgSend(_51,"failWithMessage:","Could not read the input file: "+_1.canonical(_54));
}
}
return _1.canonical(_54);
}
}),new objj_method(sel_getUid("findInputFile:extension:"),function(_56,_57,_58,_59){
with(_56){
var _5a=_58;
if(_59){
_5a+=_59;
}
if(_1.isReadable(_5a)){
return _5a;
}
if(_1.basename(_1.dirname(_58))!=="Resources"&&_1.isDirectory("Resources")){
_5a=_1.resolve(_5a,_1.join("Resources",_1.basename(_5a)));
if(_1.isReadable(_5a)){
return _5a;
}
}
return null;
}
}),new objj_method(sel_getUid("getAppAndResourceDirectoriesFromInputFile:options:"),function(_5b,_5c,_5d,_5e){
with(_5b){
appDirectory=resourcesDirectory="";
if(_5e.resourcesDir){
var _5f=_1.canonical(_5e.resourcesDir);
if(!_1.isDirectory(_5f)){
objj_msgSend(_5b,"failWithMessage:","Cannot read resources at: "+_5f);
}
resourcesDirectory=_5f;
}
var _60=_1.dirname(_5d);
if(_1.basename(_60)==="Resources"){
appDirectory=_1.dirname(_60);
resourcesDirectory=resourcesDirectory||_60;
}else{
appDirectory=_60;
if(!resourcesDirectory){
var _5f=_1.join(appDirectory,"Resources");
if(_1.isDirectory(_5f)){
resourcesDirectory=_5f;
}
}
}
}
}),new objj_method(sel_getUid("getOutputFileFromInputFile:args:"),function(_61,_62,_63,_64){
with(_61){
var _65=null;
if(_64.length>1){
_65=_64[1];
if(!/^.+\.cib$/.test(_65)){
_65+=".cib";
}
}else{
_65=_1.join(_1.dirname(_63),_1.basename(_63,_1.extension(_63)))+".cib";
}
_65=_1.canonical(_65);
if(!_1.isWritable(_1.dirname(_65))){
objj_msgSend(_61,"failWithMessage:","Cannot write the output file at: "+_65);
}
return _65;
}
}),new objj_method(sel_getUid("loadFrameworks:verbosity:callback:"),function(_66,_67,_68,_69,_6a){
with(_66){
if(!_68||_68.length===0){
return _6a();
}
var _6b=function(_6c){
return _6c;
};
_68.forEach(function(_6d){
objj_msgSend(_66,"setLogLevel:",_69);
var _6e=nil;
if(_6d.indexOf("/")===-1){
_6e=objj_msgSend(_66,"findInCappBuild:isDirectory:callback:",_6d,YES,_6b);
if(!_6e){
_6e=objj_msgSend(_66,"findInFrameworks:path:isDirectory:callback:",_1.join(appDirectory,"Frameworks"),_6d,YES,_6b);
}
if(!_6e){
_6e=objj_msgSend(_66,"findInInstalledFrameworks:isDirectory:callback:",_6d,YES,_6b);
}
}else{
_6e=_1.canonical(_6d);
}
if(!_6e){
objj_msgSend(_66,"failWithMessage:","Cannot find the framework \""+_6d+"\"");
}
CPLog.debug("Loading framework: "+_6e);
try{
objj_msgSend(_66,"setLogLevel:",-1);
var _6f=objj_msgSend(objj_msgSend(CPBundle,"alloc"),"initWithPath:",_6e);
objj_msgSend(_6f,"loadWithDelegate:",nil);
objj_msgSend(_66,"setLogLevel:",_69);
objj_msgSend(_66,"loadNSClassesFromBundle:",_6f);
}
finally{
objj_msgSend(_66,"setLogLevel:",_69);
}
require("browser/timeout").serviceTimeouts();
});
_6a();
}
}),new objj_method(sel_getUid("loadNSClassesFromBundle:"),function(_70,_71,_72){
with(_70){
var _73=objj_msgSend(_72,"objectForInfoDictionaryKey:","NSClasses")||[],_74=objj_msgSend(_72,"bundlePath");
for(var i=0;i<_73.length;++i){
if(userNSClasses.indexOf(_73[i])>=0){
continue;
}
var _75=_1.join(_74,"NS_"+_73[i]+".j");
objj_importFile(_75,YES);
CPLog.debug("Imported NS class: %s",_75);
userNSClasses.push(_73[i]);
}
}
}),new objj_method(sel_getUid("getThemeList:"),function(_76,_77,_78){
with(_76){
var _79=_78.defaultTheme;
if(!_79){
_79=objj_msgSend(infoPlist,"valueForKey:","CPDefaultTheme");
}
if(!_79){
_79=objj_msgSend(_76,"getAppKitDefaultThemeName");
}
var _7a=objj_msgSend(CPSet,"setWithObject:",_79);
if(_78.auxThemes){
objj_msgSend(_7a,"addObjectsFromArray:",_78.auxThemes);
}
var _7b=infoPlist.valueForKey("CPAuxiliaryThemes");
if(_7b){
objj_msgSend(_7a,"addObjectsFromArray:",_7b);
}
objj_msgSend(_7a,"removeObject:",_79);
var _7c=objj_msgSend(_7a,"allObjects");
objj_msgSend(_7c,"insertObject:atIndex:",_79,0);
return _7c;
}
}),new objj_method(sel_getUid("findInCappBuild:isDirectory:callback:"),function(_7d,_7e,_7f,_80,_81){
with(_7d){
var _82=_2.env["CAPP_BUILD"];
if(!_82){
return undefined;
}
_82=_1.canonical(_82);
if(_1.isDirectory(_82)){
var _83=null;
for(var i=0;i<_7.length&&!_83;++i){
var _84=_1.join(_82,_7[i],_7f);
if((_80&&_1.isDirectory(_84))||(!_80&&_1.exists(_84))){
_83=_81(_84);
}
}
return _83;
}else{
return false;
}
}
}),new objj_method(sel_getUid("findInInstalledFrameworks:isDirectory:callback:"),function(_85,_86,_87,_88,_89){
with(_85){
return objj_msgSend(_85,"findInFrameworks:path:isDirectory:callback:",_1.canonical(_1.join(_2.prefix,"packages/cappuccino/Frameworks")),_87,_88,_89);
}
}),new objj_method(sel_getUid("findInFrameworks:path:isDirectory:callback:"),function(_8a,_8b,_8c,_8d,_8e,_8f){
with(_8a){
var _90=null,_91=_1.join(_8c,"Debug",_8d);
if((_8e&&_1.isDirectory(_91))||(!_8e&&_1.exists(_91))){
_90=_8f(_91);
}
if(!_90){
_91=_1.join(_8c,_8d);
if((_8e&&_1.isDirectory(_91))||(!_8e&&_1.exists(_91))){
_90=_8f(_91);
}
}
return _90;
}
}),new objj_method(sel_getUid("getAppKitDefaultThemeName"),function(_92,_93){
with(_92){
var _94=function(_95){
return objj_msgSend(_92,"themeNameFromPropertyList:",_95);
},_96=objj_msgSend(_92,"findInCappBuild:isDirectory:callback:","AppKit/Info.plist",NO,_94);
if(!_96){
_96=objj_msgSend(_92,"findInInstalledFrameworks:isDirectory:callback:","AppKit/Info.plist",NO,_94);
}
return _96||_6;
}
}),new objj_method(sel_getUid("themeNameFromPropertyList:"),function(_97,_98,_99){
with(_97){
if(!_1.isReadable(_99)){
return nil;
}
var _9a=nil,_9b=CFPropertyList.readPropertyListFromFile(_99);
if(_9b){
_9a=_9b.valueForKey("CPDefaultTheme");
}
return _9a;
}
}),new objj_method(sel_getUid("loadThemesFromList:"),function(_9c,_9d,_9e){
with(_9c){
var _9f=[];
for(var i=0;i<_9e.length;++i){
_9f.push(objj_msgSend(_9c,"loadThemeNamed:directory:",_9e[i],resourcesDirectory));
}
return _9f;
}
}),new objj_method(sel_getUid("loadThemeNamed:directory:"),function(_a0,_a1,_a2,_a3){
with(_a0){
if(/^.+\.blend$/.test(_a2)){
_a2=_a2.substr(0,_a2.length-".blend".length);
}
var _a4=_a2+".blend",_a5="";
if(_a3){
_a5=_1.join(_1.canonical(_a3),_a4);
if(!_1.isDirectory(_a5)){
_a5=_a3=null;
}
}
if(!_a3){
var _a6=function(_a7){
return _a7;
};
_a5=objj_msgSend(_a0,"findInCappBuild:isDirectory:callback:",_a4,YES,_a6);
if(!_a5){
_a5=objj_msgSend(_a0,"findInInstalledFrameworks:isDirectory:callback:","AppKit/Resources/"+_a4,YES,_a6);
}
if(!_a5){
var _a8=_1.canonical(_a4);
if(_1.isDirectory(_a8)){
_a5=_a8;
}
}
}
if(!_a5){
objj_msgSend(_a0,"failWithMessage:","Cannot find the theme \""+_a2+"\"");
}
return objj_msgSend(_a0,"readThemeWithName:atPath:",_a2,_a5);
}
}),new objj_method(sel_getUid("readThemeWithName:atPath:"),function(_a9,_aa,_ab,_ac){
with(_a9){
var _ad=new CFBundle(_ac);
_ad.mostEligibleEnvironment=function(){
return "Browser";
};
_ad.load();
var _ae=_ad.valueForInfoDictionaryKey("CPKeyedThemes");
if(!_ae){
objj_msgSend(_a9,"failWithMessage:","Could not find the keyed themes in the theme: "+_ac);
}
var _af=_ae.indexOf(_ab+".keyedtheme");
if(_af<0){
objj_msgSend(_a9,"failWithMessage:","Could not find the main theme data ("+_ab+".keyedtheme"+") in the theme: "+_ac);
}
var _b0=_ad.pathForResource(_ae[_af]),_b1=new CFMutableData();
_b1.setRawString(_5.resourceAtURL(new CFURL(_b0),true).contents());
var _b2=objj_msgSend(CPKeyedUnarchiver,"unarchiveObjectWithData:",_b1);
if(!_b2){
objj_msgSend(_a9,"failWithMessage:","Could not unarchive the theme at: "+_ac);
}
CPLog.debug("Loaded theme: "+_ac);
return _b2;
}
}),new objj_method(sel_getUid("readConfigFile:inputFile:"),function(_b3,_b4,_b5,_b6){
with(_b3){
var _b7=null,_b8;
if(_b5){
_b8=_1.canonical(_b5);
if(!_1.isReadable(_b8)){
objj_msgSend(_b3,"failWithMessage:","Cannot find the config file: "+_b8);
}
_b7=_b8;
}else{
_b8=_1.join(appDirectory,"Info.plist");
if(_1.isReadable(_b8)){
_b7=_b8;
}
}
var _b9=null;
if(_b7){
var _b9=_1.read(_b7);
if(!_b9){
objj_msgSend(_b3,"failWithMessage:","Could not read the Info.plist at: "+_b7);
}
_b9=CFPropertyList.propertyListFromString(_b9);
if(!_b9){
objj_msgSend(_b3,"failWithMessage:","Could not parse the Info.plist at: "+_b7);
}
}
return {path:_b7,plist:_b9};
}
}),new objj_method(sel_getUid("getModifiedNibsInDirectory:"),function(_ba,_bb,_bc){
with(_ba){
var _bd=new _3(_1.join(_bc,"*.[nx]ib")).items(),_be=_bd.length,_bf={},_c0=[];
while(_be--){
var nib=_bd[_be];
_bf[nib]=_1.mtime(nib);
if(!nibInfo.hasOwnProperty(nib)){
_c0.push(["add",nib]);
}else{
if(_bf[nib]-nibInfo[nib]!==0){
_c0.push(["mod",nib]);
}
delete nibInfo[nib];
}
}
for(var nib in nibInfo){
if(nibInfo.hasOwnProperty(nib)){
CPLog.info(">> %s: %s",CPLogColorize("Deleted","warn"),nib);
}
}
nibInfo=_bf;
return _c0;
}
}),new objj_method(sel_getUid("printVersionAndExit"),function(_c1,_c2){
with(_c1){
objj_msgSend(_c1,"printVersion");
OS.exit(0);
}
}),new objj_method(sel_getUid("printVersion"),function(_c3,_c4){
with(_c3){
var _c5=_1.dirname(_1.dirname(_1.canonical(_2.args[0]))),_c6=null;
if(_1.basename(_c5)==="narwhal"){
_c5=_1.join(_c5,"packages","cappuccino");
}
_c5=_1.join(_c5,"lib","nib2cib","Info.plist");
if(_1.isReadable(_c5)){
var _c7=_1.read(_c5);
if(!_c7){
return;
}
_c7=CFPropertyList.propertyListFromString(_c7);
if(!_c7){
return;
}
_c6=_c7.valueForKey("CPBundleVersion");
if(_c6){
_4.print("nib2cib v"+_c6);
}
}
if(!_c6){
_4.print("<No version info available>");
}
}
}),new objj_method(sel_getUid("exceptionReason:"),function(_c8,_c9,_ca){
with(_c8){
if(typeof (_ca)==="string"){
return _ca;
}else{
if(_ca.isa&&objj_msgSend(_ca,"respondsToSelector:",sel_getUid("reason"))){
return objj_msgSend(_ca,"reason");
}else{
return "An unknown error occurred";
}
}
}
}),new objj_method(sel_getUid("failWithMessage:"),function(_cb,_cc,_cd){
with(_cb){
objj_msgSend(CPException,"raise:reason:",ConverterConversionException,_cd);
}
})]);
logFormatter=function(_ce,_cf,_d0){
if(_cf==="info"){
return _ce;
}else{
return CPLogColorize(_ce,_cf);
}
};
p;24;Nib2CibKeyedUnarchiver.jt;1384;@STATIC;1.0;I;30;Foundation/CPKeyedUnarchiver.jt;1330;
objj_executeFile("Foundation/CPKeyedUnarchiver.j",NO);
var _1=require("file");
var _2=objj_allocateClassPair(CPKeyedUnarchiver,"Nib2CibKeyedUnarchiver"),_3=_2.isa;
class_addIvars(_2,[new objj_ivar("resourcesPath")]);
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("resourcesPath"),function(_4,_5){
with(_4){
return resourcesPath;
}
}),new objj_method(sel_getUid("initForReadingWithData:resourcesPath:"),function(_6,_7,_8,_9){
with(_6){
_6=objj_msgSendSuper({receiver:_6,super_class:objj_getClass("Nib2CibKeyedUnarchiver").super_class},"initForReadingWithData:",_8);
if(_6){
resourcesPath=_9;
}
return _6;
}
}),new objj_method(sel_getUid("allObjects"),function(_a,_b){
with(_a){
return _objects;
}
}),new objj_method(sel_getUid("resourcePathForName:"),function(_c,_d,_e){
with(_c){
if(!resourcesPath){
return NULL;
}
var _f=[_1.listPaths(resourcesPath)];
while(_f.length>0){
var _10=_f.shift(),_11=0,_12=_10.length;
for(;_11<_12;++_11){
var _13=_10[_11];
if(_1.basename(_13)===_e){
return _13;
}else{
if(_1.isDirectory(_13)){
_f.push(_1.listPaths(_13));
}else{
if(!_1.extension(_e)&&_1.basename(_13).replace(/\.[^.]*$/,"")===_e){
return _13;
}
}
}
}
}
return NULL;
}
})]);
_1.listPaths=function(_14){
var _15=_1.list(_14),_16=_15.length;
while(_16--){
_15[_16]=_1.join(_14,_15[_16]);
}
return _15;
};
p;10;NSAppKit.jt;3936;@STATIC;1.0;i;15;_NSCornerView.ji;19;NSArrayController.ji;7;NSBox.ji;10;NSButton.ji;8;NSCell.ji;16;NSClassSwapper.ji;12;NSClipView.ji;9;NSColor.ji;13;NSColorWell.ji;18;NSCollectionView.ji;22;NSCollectionViewItem.ji;12;NSComboBox.ji;11;NSControl.ji;16;NSCustomObject.ji;18;NSCustomResource.ji;14;NSCustomView.ji;9;NSEvent.ji;8;NSFont.ji;16;NSIBObjectData.ji;9;NSImage.ji;13;NSImageView.ji;18;NSLevelIndicator.ji;10;NSMatrix.ji;8;NSMenu.ji;12;NSMenuItem.ji;16;NSNibConnector.ji;20;NSObjectController.ji;15;NSOutlineView.ji;15;NSPopUpButton.ji;19;NSPredicateEditor.ji;13;NSResponder.ji;14;NSRuleEditor.ji;14;NSScrollView.ji;12;NSScroller.ji;15;NSSearchField.ji;7;NSSet.ji;19;NSSecureTextField.ji;20;NSSegmentedControl.ji;10;NSSlider.ji;13;NSSplitView.ji;11;NSStepper.ji;15;NSTableColumn.ji;19;NSTableHeaderView.ji;13;NSTableView.ji;11;NSTabView.ji;15;NSTabViewItem.ji;13;NSTextField.ji;14;NSTokenField.ji;11;NSToolbar.ji;28;NSToolbarFlexibleSpaceItem.ji;15;NSToolbarItem.ji;25;NSToolbarShowColorsItem.ji;24;NSToolbarSeparatorItem.ji;20;NSToolbarSpaceItem.ji;26;NSUserDefaultsController.ji;8;NSView.ji;18;NSViewController.ji;18;NSWindowTemplate.ji;9;WebView.ji;18;NSSortDescriptor.ji;11;NSPopover.ji;21;NSProgressIndicator.jt;2709;
objj_executeFile("_NSCornerView.j",YES);
objj_executeFile("NSArrayController.j",YES);
objj_executeFile("NSBox.j",YES);
objj_executeFile("NSButton.j",YES);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSClassSwapper.j",YES);
objj_executeFile("NSClipView.j",YES);
objj_executeFile("NSColor.j",YES);
objj_executeFile("NSColorWell.j",YES);
objj_executeFile("NSCollectionView.j",YES);
objj_executeFile("NSCollectionViewItem.j",YES);
objj_executeFile("NSComboBox.j",YES);
objj_executeFile("NSControl.j",YES);
objj_executeFile("NSCustomObject.j",YES);
objj_executeFile("NSCustomResource.j",YES);
objj_executeFile("NSCustomView.j",YES);
objj_executeFile("NSEvent.j",YES);
objj_executeFile("NSFont.j",YES);
objj_executeFile("NSIBObjectData.j",YES);
objj_executeFile("NSImage.j",YES);
objj_executeFile("NSImageView.j",YES);
objj_executeFile("NSLevelIndicator.j",YES);
objj_executeFile("NSMatrix.j",YES);
objj_executeFile("NSMenu.j",YES);
objj_executeFile("NSMenuItem.j",YES);
objj_executeFile("NSNibConnector.j",YES);
objj_executeFile("NSObjectController.j",YES);
objj_executeFile("NSOutlineView.j",YES);
objj_executeFile("NSPopUpButton.j",YES);
objj_executeFile("NSPredicateEditor.j",YES);
objj_executeFile("NSResponder.j",YES);
objj_executeFile("NSRuleEditor.j",YES);
objj_executeFile("NSScrollView.j",YES);
objj_executeFile("NSScroller.j",YES);
objj_executeFile("NSSearchField.j",YES);
objj_executeFile("NSSet.j",YES);
objj_executeFile("NSSecureTextField.j",YES);
objj_executeFile("NSSegmentedControl.j",YES);
objj_executeFile("NSSlider.j",YES);
objj_executeFile("NSSplitView.j",YES);
objj_executeFile("NSStepper.j",YES);
objj_executeFile("NSTableColumn.j",YES);
objj_executeFile("NSTableHeaderView.j",YES);
objj_executeFile("NSTableView.j",YES);
objj_executeFile("NSTabView.j",YES);
objj_executeFile("NSTabViewItem.j",YES);
objj_executeFile("NSTextField.j",YES);
objj_executeFile("NSTokenField.j",YES);
objj_executeFile("NSToolbar.j",YES);
objj_executeFile("NSToolbarFlexibleSpaceItem.j",YES);
objj_executeFile("NSToolbarItem.j",YES);
objj_executeFile("NSToolbarShowColorsItem.j",YES);
objj_executeFile("NSToolbarSeparatorItem.j",YES);
objj_executeFile("NSToolbarSpaceItem.j",YES);
objj_executeFile("NSUserDefaultsController.j",YES);
objj_executeFile("NSView.j",YES);
objj_executeFile("NSViewController.j",YES);
objj_executeFile("NSWindowTemplate.j",YES);
objj_executeFile("WebView.j",YES);
objj_executeFile("NSSortDescriptor.j",YES);
objj_executeFile("NSPopover.j",YES);
objj_executeFile("NSProgressIndicator.j",YES);
CP_NSMapClassName=function(_1){
if(_1.indexOf("NS")===0){
var _2="CP"+_1.substr(2);
if(CPClassFromString(_2)){
CPLog.debug("NSAppKit: mapping "+_1+" to "+_2);
return _2;
}
}
return _1;
};
p;9;NSArray.jt;439;@STATIC;1.0;I;21;Foundation/CPObject.jt;395;
objj_executeFile("Foundation/CPObject.j",NO);
var _1=objj_allocateClassPair(CPObject,"NSArray"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(_5,"decodeObjectForKey:","NS.objects");
}
})]);
var _1=objj_allocateClassPair(NSArray,"NSMutableArray"),_2=_1.isa;
objj_registerClassPair(_1);
p;19;NSArrayController.jt;1565;@STATIC;1.0;I;26;AppKit/CPArrayController.jt;1515;
objj_executeFile("AppKit/CPArrayController.j",NO);
var _1=objj_getClass("CPArrayController");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPArrayController\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPArrayController").super_class},"NS_initWithCoder:",_5);
if(_3){
_avoidsEmptySelection=objj_msgSend(_5,"decodeBoolForKey:","NSAvoidsEmptySelection");
_clearsFilterPredicateOnInsertion=objj_msgSend(_5,"decodeBoolForKey:","NSClearsFilterPredicateOnInsertion");
_filterRestrictsInsertion=objj_msgSend(_5,"decodeBoolForKey:","NSFilterRestrictsInsertion");
_preservesSelection=objj_msgSend(_5,"decodeBoolForKey:","NSPreservesSelection");
_selectsInsertedObjects=objj_msgSend(_5,"decodeBoolForKey:","NSSelectsInsertedObjects");
_alwaysUsesMultipleValuesMarker=objj_msgSend(_5,"decodeBoolForKey:","NSAlwaysUsesMultipleValuesMarker");
_automaticallyRearrangesObjects=objj_msgSend(_5,"decodeBoolForKey:","NSAutomaticallyRearrangesObjects");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPArrayController,"NSArrayController"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPArrayController,"class");
}
})]);
p;20;NSAttributedString.jt;598;@STATIC;1.0;I;21;Foundation/CPObject.jI;31;Foundation/CPAttributedString.jt;518;
objj_executeFile("Foundation/CPObject.j",NO);
objj_executeFile("Foundation/CPAttributedString.j",NO);
var _1=objj_allocateClassPair(CPAttributedString,"NSAttributedString"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(objj_msgSend(CPAttributedString,"alloc"),"initWithString:","");
}
})]);
var _1=objj_allocateClassPair(NSAttributedString,"NSMutableAttributedString"),_2=_1.isa;
objj_registerClassPair(_1);
p;7;NSBox.jt;1595;@STATIC;1.0;I;14;AppKit/CPBox.jt;1557;
objj_executeFile("AppKit/CPBox.j",NO);
var _1=objj_getClass("CPBox");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPBox\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPBox").super_class},"NS_initWithCoder:",_5);
if(_3){
_boxType=objj_msgSend(_5,"decodeIntForKey:","NSBoxType");
_borderType=objj_msgSend(_5,"decodeIntForKey:","NSBorderType");
_borderColor=objj_msgSend(_5,"decodeObjectForKey:","NSBorderColor2")||objj_msgSend(CPColor,"colorWithRed:green:blue:alpha:",0,0,0,0.42);
_fillColor=objj_msgSend(_5,"decodeObjectForKey:","NSFillColor2")||objj_msgSend(CPColor,"clearColor");
_cornerRadius=objj_msgSend(_5,"decodeFloatForKey:","NSCornerRadius2");
_borderWidth=objj_msgSend(_5,"decodeFloatForKey:","NSBorderWidth2")||1;
_contentMargin=objj_msgSend(_5,"decodeSizeForKey:","NSOffsets");
_title=objj_msgSend(objj_msgSend(_5,"decodeObjectForKey:","NSTitleCell"),"objectValue")||"";
_titlePosition=objj_msgSend(_5,"decodeObjectForKey:","NSTitlePosition");
if(_titlePosition===undefined){
_titlePosition=CPAtTop;
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPBox,"NSBox"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPBox,"class");
}
})]);
p;10;NSButton.jt;9220;@STATIC;1.0;I;17;AppKit/CPButton.jI;19;AppKit/CPCheckBox.jI;16;AppKit/CPRadio.ji;8;NSCell.ji;11;NSControl.jt;9106;
objj_executeFile("AppKit/CPButton.j",NO);
objj_executeFile("AppKit/CPCheckBox.j",NO);
objj_executeFile("AppKit/CPRadio.j",NO);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSControl.j",YES);
var _1=8388608,_2=16777216,_3=16711680,_4=16,_5=4,_6=12,_7=28,_8=44,_9=60,_a=68,_b=108,_c=2147483648,_d=134217728,_e=67108864,_f=33554432,_10=1073741824,_11=536870912,_12=268435456;
var _13=objj_getClass("CPButton");
if(!_13){
throw new SyntaxError("*** Could not find definition for class \"CPButton\"");
}
var _14=_13.isa;
class_addMethods(_13,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_15,_16,_17){
with(_15){
_15=objj_msgSendSuper({receiver:_15,super_class:objj_getClass("CPButton").super_class},"NS_initWithCoder:",_17);
if(_15){
var _18=objj_msgSend(_17,"decodeObjectForKey:","NSCell");
_15=objj_msgSend(_15,"NS_initWithCell:",_18);
}
return _15;
}
}),new objj_method(sel_getUid("NS_initWithCell:"),function(_19,_1a,_1b){
with(_19){
var _1c=objj_msgSend(_1b,"alternateImage"),_1d=0,_1e=0,_1f=0;
if(objj_msgSend(_1c,"isKindOfClass:",objj_msgSend(NSButtonImageSource,"class"))){
if(objj_msgSend(_1c,"imageName")==="NSSwitch"){
_19.isa=objj_msgSend(CPCheckBox,"class");
}else{
if(objj_msgSend(_1c,"imageName")==="NSRadioButton"){
_19.isa=objj_msgSend(CPRadio,"class");
_19._radioGroup=objj_msgSend(CPRadioGroup,"new");
}
}
_themeClass=objj_msgSend(objj_msgSend(_19,"class"),"defaultThemeClass");
_1c=nil;
}
NIB_CONNECTION_EQUIVALENCY_TABLE[objj_msgSend(_1b,"UID")]=_19;
_title=objj_msgSend(_1b,"title");
_alternateTitle=objj_msgSend(_1b,"alternateTitle");
_controlSize=CPRegularControlSize;
objj_msgSend(_19,"setBordered:",objj_msgSend(_1b,"isBordered"));
_bezelStyle=objj_msgSend(_1b,"bezelStyle");
var _20;
switch(_bezelStyle){
case CPRoundedBezelStyle:
_1f=6;
_1e=4;
_1d=-12;
_20=YES;
break;
case CPTexturedRoundedBezelStyle:
_1f=2;
_1e=-2;
_1d=0;
_20=YES;
break;
case CPHUDBezelStyle:
_20=YES;
break;
case CPRoundRectBezelStyle:
_1f=-3;
_1e=-2;
_1d=0;
_bezelStyle=CPRoundedBezelStyle;
_20=YES;
break;
case CPSmallSquareBezelStyle:
_1e=-2;
_1d=0;
_bezelStyle=CPTexturedRoundedBezelStyle;
_20=NO;
break;
case CPThickSquareBezelStyle:
case CPThickerSquareBezelStyle:
case CPRegularSquareBezelStyle:
_1f=3;
_1e=0;
_1d=-4;
_bezelStyle=CPTexturedRoundedBezelStyle;
_20=NO;
break;
case CPTexturedSquareBezelStyle:
_1f=4;
_1e=-1;
_1d=-2;
_bezelStyle=CPTexturedRoundedBezelStyle;
_20=NO;
break;
case CPShadowlessSquareBezelStyle:
_1f=5;
_1e=-2;
_1d=0;
_bezelStyle=CPTexturedRoundedBezelStyle;
_20=NO;
break;
case CPRecessedBezelStyle:
_1f=-3;
_1e=-2;
_1d=0;
_bezelStyle=CPHUDBezelStyle;
_20=YES;
break;
case CPRoundedDisclosureBezelStyle:
case CPHelpButtonBezelStyle:
case CPCircularBezelStyle:
case CPDisclosureBezelStyle:
CPLog.warn("NSButton [%s]: unsupported bezel style: %d",_title==null?"<no title>":"\""+_title+"\"",_bezelStyle);
_bezelStyle=CPHUDBezelStyle;
_20=YES;
break;
default:
CPLog.warn("NSButton [%s]: unknown bezel style: %d",_title==null?"<no title>":"\""+_title+"\"",_bezelStyle);
_bezelStyle=CPHUDBezelStyle;
_20=YES;
}
if(objj_msgSend(_1b,"isBordered")){
var _21=objj_msgSend(objj_msgSend(Converter,"sharedConverter"),"themes")[0],_22=objj_msgSend(_21,"valueForAttributeWithName:forClass:","min-size",objj_msgSend(CPButton,"class")),_23=objj_msgSend(_21,"valueForAttributeWithName:forClass:","max-size",objj_msgSend(CPButton,"class")),_24=NO;
if(_22.height>0&&_23.height>0&&_22.height===_23.height){
_24=YES;
_20=_22.height===_23.height;
}else{
if(_22.height<0&&_23.height>0){
_24=_20;
}else{
_24=_22.height>0||_23.height>0;
}
}
if(_24){
var _25=_frame.size.height;
if(_22.height>0){
_frame.size.height=_bounds.size.height=MAX(_frame.size.height,_22.height);
}
if(_23.height>0){
_frame.size.height=_bounds.size.height=MIN(_frame.size.height,_23.height);
}
if(_frame.size.height!==_25){
CPLog.debug("NSButton [%s]: adjusted height from %d to %d",_title==null?"<no title>":"\""+_title+"\"",_25,_frame.size.height);
}
}
_frame.origin.x+=_1e;
_frame.origin.y+=_1f;
_frame.size.width+=_1d;
_bounds.size.width+=_1d;
}
_keyEquivalent=objj_msgSend(_1b,"keyEquivalent");
_keyEquivalentModifierMask=objj_msgSend(_1b,"keyEquivalentModifierMask");
_imageDimsWhenDisabled=YES;
_allowsMixedState=objj_msgSend(_1b,"allowsMixedState");
objj_msgSend(_19,"setImage:",objj_msgSend(_1b,"normalImage"));
objj_msgSend(_19,"setAlternateImage:",_1c);
objj_msgSend(_19,"setImagePosition:",objj_msgSend(_1b,"imagePosition"));
objj_msgSend(_19,"setEnabled:",objj_msgSend(_1b,"isEnabled"));
_highlightsBy=objj_msgSend(_1b,"highlightsBy");
_showsStateBy=objj_msgSend(_1b,"showsStateBy");
objj_msgSend(_19,"setTag:",objj_msgSend(_1b,"tag"));
return _19;
}
})]);
var _13=objj_allocateClassPair(CPButton,"NSButton"),_14=_13.isa;
objj_registerClassPair(_13);
class_addMethods(_13,[new objj_method(sel_getUid("initWithCoder:"),function(_26,_27,_28){
with(_26){
return objj_msgSend(_26,"NS_initWithCoder:",_28);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_29,_2a){
with(_29){
return objj_msgSend(CPButton,"class");
}
})]);
var _13=objj_allocateClassPair(NSActionCell,"NSButtonCell"),_14=_13.isa;
class_addIvars(_13,[new objj_ivar("_isBordered"),new objj_ivar("_bezelStyle"),new objj_ivar("_title"),new objj_ivar("_alternateTitle"),new objj_ivar("_normalImage"),new objj_ivar("_alternateImage"),new objj_ivar("_allowsMixedState"),new objj_ivar("_imagePosition"),new objj_ivar("_highlightsBy"),new objj_ivar("_showsStateBy"),new objj_ivar("_keyEquivalent"),new objj_ivar("_keyEquivalentModifierMask")]);
objj_registerClassPair(_13);
class_addMethods(_13,[new objj_method(sel_getUid("isBordered"),function(_2b,_2c){
with(_2b){
return _isBordered;
}
}),new objj_method(sel_getUid("bezelStyle"),function(_2d,_2e){
with(_2d){
return _bezelStyle;
}
}),new objj_method(sel_getUid("title"),function(_2f,_30){
with(_2f){
return _title;
}
}),new objj_method(sel_getUid("alternateTitle"),function(_31,_32){
with(_31){
return _alternateTitle;
}
}),new objj_method(sel_getUid("normalImage"),function(_33,_34){
with(_33){
return _normalImage;
}
}),new objj_method(sel_getUid("alternateImage"),function(_35,_36){
with(_35){
return _alternateImage;
}
}),new objj_method(sel_getUid("allowsMixedState"),function(_37,_38){
with(_37){
return _allowsMixedState;
}
}),new objj_method(sel_getUid("imagePosition"),function(_39,_3a){
with(_39){
return _imagePosition;
}
}),new objj_method(sel_getUid("highlightsBy"),function(_3b,_3c){
with(_3b){
return _highlightsBy;
}
}),new objj_method(sel_getUid("showsStateBy"),function(_3d,_3e){
with(_3d){
return _showsStateBy;
}
}),new objj_method(sel_getUid("keyEquivalent"),function(_3f,_40){
with(_3f){
return _keyEquivalent;
}
}),new objj_method(sel_getUid("keyEquivalentModifierMask"),function(_41,_42){
with(_41){
return _keyEquivalentModifierMask;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_43,_44,_45){
with(_43){
_43=objj_msgSendSuper({receiver:_43,super_class:objj_getClass("NSButtonCell").super_class},"initWithCoder:",_45);
if(_43){
var _46=objj_msgSend(_45,"decodeIntForKey:","NSButtonFlags"),_47=objj_msgSend(_45,"decodeIntForKey:","NSButtonFlags2"),_48=objj_msgSend(_45,"decodeIntForKey:","NSCellFlags2"),_49=(_46&_3)>>_4;
_isBordered=(_46&_1)?YES:NO;
_bezelStyle=(_47&7)|((_47&32)>>2);
_title=objj_msgSend(_45,"decodeObjectForKey:","NSContents");
_alternateTitle=objj_msgSend(_45,"decodeObjectForKey:","NSAlternateContents");
_objectValue=objj_msgSend(_43,"state");
_normalImage=objj_msgSend(_45,"decodeObjectForKey:","NSNormalImage");
_alternateImage=objj_msgSend(_45,"decodeObjectForKey:","NSAlternateImage");
_allowsMixedState=(_48&_2)?YES:NO;
if((_49&_b)==_b){
_imagePosition=CPImageOverlaps;
}else{
if((_49&_a)==_a){
_imagePosition=CPImageOnly;
}else{
if((_49&_9)==_9){
_imagePosition=CPImageLeft;
}else{
if((_49&_8)==_8){
_imagePosition=CPImageRight;
}else{
if((_49&_7)==_7){
_imagePosition=CPImageBelow;
}else{
if((_49&_6)==_6){
_imagePosition=CPImageAbove;
}else{
if((_49&_5)==_5){
_imagePosition=CPNoImage;
}
}
}
}
}
}
}
_highlightsBy=CPNoCellMask;
if(_46&_c){
_highlightsBy|=CPPushInCellMask;
}
if(_46&_d){
_highlightsBy|=CPContentsCellMask;
}
if(_46&_e){
_highlightsBy|=CPChangeGrayCellMask;
}
if(_46&_f){
_highlightsBy|=CPChangeBackgroundCellMask;
}
_showsStateBy=CPNoCellMask;
if(_46&_10){
_showsStateBy|=CPContentsCellMask;
}
if(_46&_11){
_showsStateBy|=CPChangeGrayCellMask;
}
if(_46&_12){
_showsStateBy|=CPChangeBackgroundCellMask;
}
_keyEquivalent=objj_msgSend(_45,"decodeObjectForKey:","NSKeyEquivalent");
_keyEquivalentModifierMask=_47>>8;
}
return _43;
}
})]);
var _13=objj_allocateClassPair(CPObject,"NSButtonImageSource"),_14=_13.isa;
class_addIvars(_13,[new objj_ivar("_imageName")]);
objj_registerClassPair(_13);
class_addMethods(_13,[new objj_method(sel_getUid("imageName"),function(_4a,_4b){
with(_4a){
return _imageName;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_4c,_4d,_4e){
with(_4c){
_4c=objj_msgSendSuper({receiver:_4c,super_class:objj_getClass("NSButtonImageSource").super_class},"init");
if(_4c){
_imageName=objj_msgSend(_4e,"decodeObjectForKey:","NSImageName");
}
return _4c;
}
})]);
p;8;NSCell.jt;4424;@STATIC;1.0;I;21;Foundation/CPObject.ji;8;NSFont.jt;4367;
objj_executeFile("Foundation/CPObject.j",NO);
objj_executeFile("NSFont.j",YES);
var _1=objj_allocateClassPair(CPObject,"NSCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_state"),new objj_ivar("_isHighlighted"),new objj_ivar("_isEnabled"),new objj_ivar("_isEditable"),new objj_ivar("_isBordered"),new objj_ivar("_isBezeled"),new objj_ivar("_isSelectable"),new objj_ivar("_isScrollable"),new objj_ivar("_isContinuous"),new objj_ivar("_scrolls"),new objj_ivar("_wraps"),new objj_ivar("_truncates"),new objj_ivar("_sendsActionOnEndEditing"),new objj_ivar("_alignment"),new objj_ivar("_controlSize"),new objj_ivar("_objectValue"),new objj_ivar("_font"),new objj_ivar("_lineBreakMode"),new objj_ivar("_formatter"),new objj_ivar("_tag")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("state"),function(_3,_4){
with(_3){
return _state;
}
}),new objj_method(sel_getUid("isHighlighted"),function(_5,_6){
with(_5){
return _isHighlighted;
}
}),new objj_method(sel_getUid("isEnabled"),function(_7,_8){
with(_7){
return _isEnabled;
}
}),new objj_method(sel_getUid("isEditable"),function(_9,_a){
with(_9){
return _isEditable;
}
}),new objj_method(sel_getUid("isBordered"),function(_b,_c){
with(_b){
return _isBordered;
}
}),new objj_method(sel_getUid("isBezeled"),function(_d,_e){
with(_d){
return _isBezeled;
}
}),new objj_method(sel_getUid("isSelectable"),function(_f,_10){
with(_f){
return _isSelectable;
}
}),new objj_method(sel_getUid("isScrollable"),function(_11,_12){
with(_11){
return _isScrollable;
}
}),new objj_method(sel_getUid("isContinuous"),function(_13,_14){
with(_13){
return _isContinuous;
}
}),new objj_method(sel_getUid("scrolls"),function(_15,_16){
with(_15){
return _scrolls;
}
}),new objj_method(sel_getUid("wraps"),function(_17,_18){
with(_17){
return _wraps;
}
}),new objj_method(sel_getUid("truncates"),function(_19,_1a){
with(_19){
return _truncates;
}
}),new objj_method(sel_getUid("sendsActionOnEndEditing"),function(_1b,_1c){
with(_1b){
return _sendsActionOnEndEditing;
}
}),new objj_method(sel_getUid("alignment"),function(_1d,_1e){
with(_1d){
return _alignment;
}
}),new objj_method(sel_getUid("controlSize"),function(_1f,_20){
with(_1f){
return _controlSize;
}
}),new objj_method(sel_getUid("objectValue"),function(_21,_22){
with(_21){
return _objectValue;
}
}),new objj_method(sel_getUid("font"),function(_23,_24){
with(_23){
return _font;
}
}),new objj_method(sel_getUid("lineBreakMode"),function(_25,_26){
with(_25){
return _lineBreakMode;
}
}),new objj_method(sel_getUid("formatter"),function(_27,_28){
with(_27){
return _formatter;
}
}),new objj_method(sel_getUid("tag"),function(_29,_2a){
with(_29){
return _tag;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_2b,_2c,_2d){
with(_2b){
_2b=objj_msgSendSuper({receiver:_2b,super_class:objj_getClass("NSCell").super_class},"init");
if(_2b){
var _2e=objj_msgSend(_2d,"decodeIntForKey:","NSCellFlags"),_2f=objj_msgSend(_2d,"decodeIntForKey:","NSCellFlags2");
_state=(_2e&2147483648)?CPOnState:CPOffState;
_isHighlighted=(_2e&1073741824)?YES:NO;
_isEnabled=(_2e&536870912)?NO:YES;
_isEditable=(_2e&268435456)?YES:NO;
_isBordered=(_2e&8388608)?YES:NO;
_isBezeled=(_2e&4194304)?YES:NO;
_isSelectable=(_2e&2097152)?YES:NO;
_isScrollable=(_2e&1048576)?YES:NO;
_isContinuous=(_2e&524544)?YES:NO;
_scrolls=(_2e&1048576)&&(_2e&64);
_wraps=(_2e&1048576===0)&&(_2e&64===0);
_truncates=!(_2e&1048576)&&(_2e&64);
_alignment=(_2f&469762048)>>26;
_lineBreakMode=(_2f&3584)>>9;
_controlSize=(_2f&917504)>>17;
_sendsActionOnEndEditing=(_2f&4194304)?YES:NO;
_tag=objj_msgSend(_2d,"decodeIntForKey:","NSTag");
_objectValue=objj_msgSend(_2d,"decodeObjectForKey:","NSContents");
_font=objj_msgSend(_2d,"decodeObjectForKey:","NSSupport");
_formatter=objj_msgSend(_2d,"decodeObjectForKey:","NSFormatter");
}
return _2b;
}
}),new objj_method(sel_getUid("replacementObjectForCoder:"),function(_30,_31,_32){
with(_30){
return nil;
}
}),new objj_method(sel_getUid("stringValue"),function(_33,_34){
with(_33){
if(objj_msgSend(_objectValue,"isKindOfClass:",objj_msgSend(CPString,"class"))){
return _objectValue;
}
if(objj_msgSend(_objectValue,"respondsToSelector:",sel_getUid("attributedStringValue"))){
return objj_msgSend(_objectValue,"attributedStringValue");
}
return "";
}
})]);
var _1=objj_allocateClassPair(NSCell,"NSActionCell"),_2=_1.isa;
objj_registerClassPair(_1);
p;16;NSClassSwapper.jt;1906;@STATIC;1.0;i;11;Converter.jt;1871;
objj_executeFile("Converter.j",YES);
var _1={},_2={};
var _3="_CPCibClassSwapperClassNameKey",_4="_CPCibClassSwapperOriginalClassNameKey";
var _5=objj_allocateClassPair(_CPCibClassSwapper,"NSClassSwapper"),_6=_5.isa;
objj_registerClassPair(_5);
class_addMethods(_6,[new objj_method(sel_getUid("swapperClassForClassName:originalClassName:"),function(_7,_8,_9,_a){
with(_7){
var _b="$NSClassSwapper_"+_9+"_"+_a,_c=objj_lookUpClass(_b);
if(!_c){
var _d=nil;
if(objj_msgSend(objj_msgSend(objj_msgSend(Converter,"sharedConverter"),"userNSClasses"),"containsObject:",_9)){
_d=objj_lookUpClass("NS_"+_9);
}
var _e=_d||objj_lookUpClass(_a);
_c=objj_allocateClassPair(_e,_b);
objj_registerClassPair(_c);
class_addMethod(_c,sel_getUid("initWithCoder:"),function(_f,_10,_11){
if(_d){
_f.isa=_d;
_f=objj_msgSend(_f,_10,_11);
_f.isa=_c;
}else{
_f=objj_msgSendSuper({super_class:_e,receiver:_f},_10,_11);
}
if(_f){
var UID=objj_msgSend(_f,"UID");
_1[UID]=_9;
_2[UID]=_a;
}
return _f;
},"");
class_addMethod(_c,sel_getUid("classForKeyedArchiver"),function(_12,_13){
return objj_msgSend(_CPCibClassSwapper,"class");
},"");
class_addMethod(_c,sel_getUid("encodeWithCoder:"),function(_14,_15,_16){
if(_d){
_14.isa=_d;
objj_msgSend(_14,_15,_16);
_14.isa=_c;
}else{
objj_msgSendSuper({super_class:_e,receiver:_14},_15,_16);
}
if(_d){
var _17=objj_msgSend(_d,"classForKeyedArchiver");
if(_17){
_9=objj_msgSend(_17,"className");
}
}
objj_msgSend(_16,"encodeObject:forKey:",_9,_3);
objj_msgSend(_16,"encodeObject:forKey:",CP_NSMapClassName(_a),_4);
},"");
}
return _c;
}
}),new objj_method(sel_getUid("allocWithCoder:"),function(_18,_19,_1a){
with(_18){
var _1b=objj_msgSend(_1a,"decodeObjectForKey:","NSClassName"),_1c=objj_msgSend(_1a,"decodeObjectForKey:","NSOriginalClassName");
return objj_msgSend(objj_msgSend(_18,"swapperClassForClassName:originalClassName:",_1b,_1c),"alloc");
}
})]);
p;12;NSClipView.jt;1216;@STATIC;1.0;I;19;AppKit/CPClipView.jt;1173;
objj_executeFile("AppKit/CPClipView.j",NO);
var _1=4;
var _2=objj_getClass("CPClipView");
if(!_2){
throw new SyntaxError("*** Could not find definition for class \"CPClipView\"");
}
var _3=_2.isa;
class_addMethods(_2,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_4,_5,_6){
with(_4){
if(_4=objj_msgSendSuper({receiver:_4,super_class:objj_getClass("CPClipView").super_class},"NS_initWithCoder:",_6)){
_documentView=objj_msgSend(_6,"decodeObjectForKey:","NSDocView");
var _7=objj_msgSend(_6,"decodeIntForKey:","NScvFlags");
if((_7&_1)&&objj_msgSend(_6,"containsValueForKey:","NSBGColor")){
objj_msgSend(_4,"setBackgroundColor:",objj_msgSend(_6,"decodeObjectForKey:","NSBGColor"));
}
}
return _4;
}
}),new objj_method(sel_getUid("NS_isFlipped"),function(_8,_9){
with(_8){
return YES;
}
})]);
var _2=objj_allocateClassPair(CPClipView,"NSClipView"),_3=_2.isa;
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(CPClipView,"class");
}
})]);
p;18;NSCollectionView.jt;1532;@STATIC;1.0;I;25;AppKit/CPCollectionView.jt;1483;
objj_executeFile("AppKit/CPCollectionView.j",NO);
var _1=objj_getClass("CPCollectionView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCollectionView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_items=[];
_content=[];
_cachedItems=[];
_itemSize=CGSizeMakeZero();
_minItemSize=CGSizeMakeZero();
_maxItemSize=CGSizeMakeZero();
_verticalMargin=5;
_tileWidth=-1;
_selectionIndexes=objj_msgSend(CPIndexSet,"indexSet");
_allowsEmptySelection=YES;
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPCollectionView").super_class},"NS_initWithCoder:",_5)){
_backgroundColors=objj_msgSend(_5,"decodeObjectForKey:","NSBackgroundColors");
_maxNumberOfRows=objj_msgSend(_5,"decodeIntForKey:","NSMaxNumberOfGridRows");
_maxNumberOfColumns=objj_msgSend(_5,"decodeIntForKey:","NSMaxNumberOfGridColumns");
_isSelectable=objj_msgSend(_5,"decodeBoolForKey:","NSSelectable");
_allowsMultipleSelection=objj_msgSend(_5,"decodeBoolForKey:","NSAllowsMultipleSelection");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPCollectionView,"NSCollectionView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPCollectionView,"class");
}
})]);
p;22;NSCollectionViewItem.jt;904;@STATIC;1.0;I;29;AppKit/CPCollectionViewItem.jt;852;
objj_executeFile("AppKit/CPCollectionViewItem.j",NO);
var _1=objj_getClass("CPCollectionViewItem");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCollectionViewItem\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPCollectionViewItem").super_class},"NS_initWithCoder:",_5);
}
})]);
var _1=objj_allocateClassPair(CPCollectionViewItem,"NSCollectionViewItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPCollectionViewItem,"class");
}
})]);
p;9;NSColor.jt;2232;@STATIC;1.0;I;19;Foundation/CPData.jI;16;AppKit/CPColor.jt;2168;
objj_executeFile("Foundation/CPData.j",NO);
objj_executeFile("AppKit/CPColor.j",NO);
var _1=-1,_2=0,_3=1,_4=2,_5=3,_6=4,_7=5,_8=6;
var _9=objj_getClass("CPColor");
if(!_9){
throw new SyntaxError("*** Could not find definition for class \"CPColor\"");
}
var _a=_9.isa;
class_addMethods(_9,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_b,_c,_d){
with(_b){
var _e=objj_msgSend(_d,"decodeIntForKey:","NSColorSpace"),_f;
switch(_e){
case 1:
case 2:
var rgb=objj_msgSend(_d,"decodeBytesForKey:","NSRGB"),_10=CFData.bytesToString(rgb),_11=objj_msgSend(_10,"componentsSeparatedByString:"," "),_12=[0,0,0,1];
for(var i=0;i<_11.length&&i<4;i++){
_12[i]=objj_msgSend(_11[i],"floatValue");
}
_f=objj_msgSend(CPColor,"colorWithCalibratedRed:green:blue:alpha:",_12[0],_12[1],_12[2],_12[3]);
break;
case 3:
case 4:
var _13=objj_msgSend(_d,"decodeBytesForKey:","NSWhite"),_10=CFData.bytesToString(_13),_11=objj_msgSend(_10,"componentsSeparatedByString:"," "),_12=[0,1];
for(var i=0;i<_11.length&&i<2;i++){
_12[i]=objj_msgSend(_11[i],"floatValue");
}
_f=objj_msgSend(CPColor,"colorWithCalibratedWhite:alpha:",_12[0],_12[1]);
break;
case 6:
var _14=objj_msgSend(_d,"decodeObjectForKey:","NSCatalogName"),_15=objj_msgSend(_d,"decodeObjectForKey:","NSColorName"),_16=objj_msgSend(_d,"decodeObjectForKey:","NSColor"),_f=nil;
if(_14==="System"){
switch(_15){
case "controlColor":
_f=objj_msgSend(CPColor,"colorWithCalibratedWhite:alpha:",175/255,1);
break;
case "controlBackgroundColor":
_f=objj_msgSend(CPColor,"whiteColor");
break;
case "gridColor":
_f=objj_msgSend(CPColor,"colorWithCalibratedWhite:alpha:",204/255,1);
break;
default:
_f=_16;
}
}else{
_f=_16;
}
break;
default:
CPLog.warn("-[%@ %s] unknown color space %d",isa,_c,_e);
_f=objj_msgSend(CPColor,"blackColor");
break;
}
return _f;
}
})]);
var _9=objj_allocateClassPair(CPColor,"NSColor"),_a=_9.isa;
objj_registerClassPair(_9);
class_addMethods(_9,[new objj_method(sel_getUid("initWithCoder:"),function(_17,_18,_19){
with(_17){
return objj_msgSend(_17,"NS_initWithCoder:",_19);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_1a,_1b){
with(_1a){
return objj_msgSend(CPColor,"class");
}
})]);
p;13;NSColorWell.jt;1392;@STATIC;1.0;I;20;AppKit/CPColorWell.ji;8;NSCell.ji;11;NSControl.jt;1320;
objj_executeFile("AppKit/CPColorWell.j",NO);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSControl.j",YES);
var _1=objj_getClass("CPColorWell");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPColorWell\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPColorWell").super_class},"NS_initWithCoder:",_5);
if(_3){
objj_msgSend(_3,"setEnabled:",objj_msgSend(_5,"decodeBoolForKey:","NSEnabled"));
objj_msgSend(_3,"setBordered:",objj_msgSend(_5,"decodeBoolForKey:","NSIsBordered"));
objj_msgSend(_3,"setColor:",objj_msgSend(_5,"decodeObjectForKey:","NSColor"));
if(objj_msgSend(_3,"isBordered")){
var _6=objj_msgSend(_3,"frameSize");
CPLog.debug("NSColorWell: adjusting height from %d to %d",_6.height,24);
_6.height=24;
objj_msgSend(_3,"setFrameSize:",_6);
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPColorWell,"NSColorWell"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPColorWell,"class");
}
})]);
p;12;NSComboBox.jt;3364;@STATIC;1.0;I;20;AppKit/CPTextField.jI;19;AppKit/CPComboBox.ji;13;NSTextField.jt;3278;
objj_executeFile("AppKit/CPTextField.j",NO);
objj_executeFile("AppKit/CPComboBox.j",NO);
objj_executeFile("NSTextField.j",YES);
var _1=objj_getClass("CPComboBox");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPComboBox\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPComboBox").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_items=objj_msgSend(_6,"itemList");
_usesDataSource=objj_msgSend(_6,"usesDataSource");
_completes=objj_msgSend(_6,"completes");
_numberOfVisibleItems=objj_msgSend(_6,"visibleItemCount");
_hasVerticalScroller=objj_msgSend(_6,"hasVerticalScroller");
objj_msgSend(_3,"setButtonBordered:",objj_msgSend(_6,"borderedButton"));
var _7=objj_msgSend(objj_msgSend(objj_msgSend(Converter,"sharedConverter"),"themes")[0],"valueForAttributeWithName:forClass:","max-size",objj_msgSend(CPComboBox,"class")),_8=objj_msgSend(_3,"frameSize");
objj_msgSend(_3,"setFrameSize:",CGSizeMake(_8.width,MIN(_8.height,_7.height)));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPComboBox,"NSComboBox"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_9,_a,_b){
with(_9){
return objj_msgSend(_9,"NS_initWithCoder:",_b);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_c,_d){
with(_c){
return objj_msgSend(CPComboBox,"class");
}
})]);
var _1=objj_allocateClassPair(NSTextFieldCell,"NSComboBoxCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_visibleItemCount"),new objj_ivar("_hasVerticalScroller"),new objj_ivar("_usesDataSource"),new objj_ivar("_completes"),new objj_ivar("_itemList"),new objj_ivar("_borderedButton")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("visibleItemCount"),function(_e,_f){
with(_e){
return _visibleItemCount;
}
}),new objj_method(sel_getUid("hasVerticalScroller"),function(_10,_11){
with(_10){
return _hasVerticalScroller;
}
}),new objj_method(sel_getUid("usesDataSource"),function(_12,_13){
with(_12){
return _usesDataSource;
}
}),new objj_method(sel_getUid("completes"),function(_14,_15){
with(_14){
return _completes;
}
}),new objj_method(sel_getUid("itemList"),function(_16,_17){
with(_16){
return _itemList;
}
}),new objj_method(sel_getUid("borderedButton"),function(_18,_19){
with(_18){
return _borderedButton;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_1a,_1b,_1c){
with(_1a){
_1a=objj_msgSendSuper({receiver:_1a,super_class:objj_getClass("NSComboBoxCell").super_class},"initWithCoder:",_1c);
if(_1a){
_visibleItemCount=objj_msgSend(_1c,"decodeIntForKey:","NSVisibleItemCount");
_hasVerticalScroller=objj_msgSend(_1c,"decodeBoolForKey:","NSHasVerticalScroller");
_usesDataSource=objj_msgSend(_1c,"decodeBoolForKey:","NSUsesDataSource");
_completes=objj_msgSend(_1c,"decodeBoolForKey:","NSCompletes");
if(!_usesDataSource){
_itemList=objj_msgSend(_1c,"decodeObjectForKey:","NSPopUpListData")||[];
}else{
_itemList=[];
}
_borderedButton=objj_msgSend(_1c,"containsValueForKey:","NSButtonBordered")?objj_msgSend(_1c,"decodeBoolForKey:","NSButtonBordered"):YES;
}
return _1a;
}
})]);
p;11;NSControl.jt;1752;@STATIC;1.0;I;18;AppKit/CPControl.ji;8;NSCell.ji;8;NSView.jt;1686;
objj_executeFile("AppKit/CPControl.j",NO);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSView.j",YES);
var _1=objj_getClass("CPControl");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPControl\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPControl").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
objj_msgSend(_3,"sendActionOn:",CPLeftMouseUpMask);
objj_msgSend(_3,"setSendsActionOnEndEditing:",objj_msgSend(_6,"sendsActionOnEndEditing"));
objj_msgSend(_3,"setObjectValue:",objj_msgSend(_6,"objectValue"));
objj_msgSend(_3,"setFont:",objj_msgSend(_6,"font"));
objj_msgSend(_3,"setAlignment:",objj_msgSend(_6,"alignment"));
objj_msgSend(_3,"setEnabled:",objj_msgSend(_5,"decodeBoolForKey:","NSEnabled"));
objj_msgSend(_3,"setContinuous:",objj_msgSend(_6,"isContinuous"));
objj_msgSend(_3,"setTarget:",objj_msgSend(_5,"decodeObjectForKey:","NSTarget"));
objj_msgSend(_3,"setAction:",objj_msgSend(_5,"decodeObjectForKey:","NSAction"));
objj_msgSend(_3,"setLineBreakMode:",objj_msgSend(_6,"lineBreakMode"));
objj_msgSend(_3,"setFormatter:",objj_msgSend(_6,"formatter"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPControl,"NSControl"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPControl,"class");
}
})]);
p;16;NSCustomObject.jt;969;@STATIC;1.0;I;27;AppKit/_CPCibCustomObject.jt;919;
objj_executeFile("AppKit/_CPCibCustomObject.j",NO);
var _1=objj_getClass("_CPCibCustomObject");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomObject\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("_CPCibCustomObject").super_class},"init");
if(_3){
_className=CP_NSMapClassName(objj_msgSend(_5,"decodeObjectForKey:","NSClassName"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(_CPCibCustomObject,"NSCustomObject"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(_CPCibCustomObject,"class");
}
})]);
p;18;NSCustomResource.jt;1977;@STATIC;1.0;I;29;AppKit/_CPCibCustomResource.jt;1924;
objj_executeFile("AppKit/_CPCibCustomResource.j",NO);
var _1=require("file"),_2=require("cappuccino/imagesize").imagesize;
var _3=objj_getClass("_CPCibCustomResource");
if(!_3){
throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomResource\"");
}
var _4=_3.isa;
class_addMethods(_3,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_5,_6,_7){
with(_5){
_5=objj_msgSendSuper({receiver:_5,super_class:objj_getClass("_CPCibCustomResource").super_class},"init");
if(_5){
_className=CP_NSMapClassName(objj_msgSend(_7,"decodeObjectForKey:","NSClassName"));
_resourceName=objj_msgSend(_7,"decodeObjectForKey:","NSResourceName");
var _8=CGSizeMakeZero();
if(_resourceName=="NSSwitch"){
return nil;
}else{
if(_resourceName=="NSAddTemplate"||_resourceName=="NSRemoveTemplate"){
_resourceName=_resourceName.replace("NS","CP");
}else{
if(!objj_msgSend(objj_msgSend(_7,"resourcesPath"),"length")){
CPLog.warn("Resources found in nib, but no resources path specified with -R option.");
}else{
var _9=objj_msgSend(_7,"resourcePathForName:",_resourceName);
if(!_9){
CPLog.warn("Resource \""+_resourceName+"\" not found in the resources path: "+objj_msgSend(_7,"resourcesPath"));
}else{
_8=_2(_1.canonical(_9))||CGSizeMakeZero();
}
if(_9&&_1.extension(_9)!==_1.extension(_resourceName)){
_resourceName+=_1.extension(_9);
}
CPLog.debug("   Path: %s\n   Size: %dx%d",_1.canonical(_9),_8.width,_8.height);
}
}
}
_properties=objj_msgSend(CPDictionary,"dictionaryWithObject:forKey:",_8,"size");
}
return _5;
}
})]);
var _3=objj_allocateClassPair(_CPCibCustomResource,"NSCustomResource"),_4=_3.isa;
objj_registerClassPair(_3);
class_addMethods(_3,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(_CPCibCustomResource,"class");
}
})]);
p;14;NSCustomView.jt;1027;@STATIC;1.0;I;25;AppKit/_CPCibCustomView.ji;8;NSView.jt;967;
objj_executeFile("AppKit/_CPCibCustomView.j",NO);
objj_executeFile("NSView.j",YES);
var _1="_CPCibCustomViewClassNameKey";
var _2=objj_allocateClassPair(CPView,"NSCustomView"),_3=_2.isa;
class_addIvars(_2,[new objj_ivar("_className")]);
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("initWithCoder:"),function(_4,_5,_6){
with(_4){
_4=objj_msgSendSuper({receiver:_4,super_class:objj_getClass("NSCustomView").super_class},"NS_initWithCoder:",_6);
if(_4){
_className=objj_msgSend(_6,"decodeObjectForKey:","NSClassName");
}
return _4;
}
}),new objj_method(sel_getUid("encodeWithCoder:"),function(_7,_8,_9){
with(_7){
objj_msgSendSuper({receiver:_7,super_class:objj_getClass("NSCustomView").super_class},"encodeWithCoder:",_9);
objj_msgSend(_9,"encodeObject:forKey:",CP_NSMapClassName(_className),_1);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(_CPCibCustomView,"class");
}
})]);
p;17;NSDateFormatter.jt;911;@STATIC;1.0;I;28;Foundation/CPDateFormatter.jt;860;
objj_executeFile("Foundation/CPDateFormatter.j",NO);
var _1=objj_getClass("CPDateFormatter");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPDateFormatter\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPDateFormatter").super_class},"init");
if(_3){
_dateStyle=CPDateFormatterShortStyle;
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPDateFormatter,"NSDateFormatter"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPDateFormatter,"class");
}
})]);
p;14;NSDictionary.jt;491;@STATIC;1.0;t;473;
var _1=objj_allocateClassPair(CPObject,"NSDictionary"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(CPDictionary,"dictionaryWithObjects:forKeys:",objj_msgSend(_5,"decodeObjectForKey:","NS.objects"),objj_msgSend(_5,"decodeObjectForKey:","NS.keys"));
}
})]);
var _1=objj_allocateClassPair(NSDictionary,"NSMutableDictionary"),_2=_1.isa;
objj_registerClassPair(_1);
p;9;NSEvent.jt;718;@STATIC;1.0;t;700;
NSAlphaShiftKeyMask=1<<16;
NSShiftKeyMask=1<<17;
NSControlKeyMask=1<<18;
NSAlternateKeyMask=1<<19;
NSCommandKeyMask=1<<20;
NSNumericPadKeyMask=1<<21;
NSHelpKeyMask=1<<22;
NSFunctionKeyMask=1<<23;
NSDeviceIndependentModifierFlagsMask=4294901760;
CP_NSMapKeyMask=function(_1){
var _2=0;
if(_1&NSAlphaShiftKeyMask){
_2|=CPAlphaShiftKeyMask;
}
if(_1&NSShiftKeyMask){
_2|=CPShiftKeyMask;
}
if(_1&NSControlKeyMask){
_2|=CPControlKeyMask;
}
if(_1&NSAlternateKeyMask){
_2|=CPAlternateKeyMask;
}
if(_1&NSCommandKeyMask){
_2|=CPCommandKeyMask;
}
if(_1&NSNumericPadKeyMask){
_2|=CPNumericPadKeyMask;
}
if(_1&NSHelpKeyMask){
_2|=CPHelpKeyMask;
}
if(_1&NSFunctionKeyMask){
_2|=CPFunctionKeyMask;
}
return _2;
};
p;14;NSExpression.jt;6205;@STATIC;1.0;I;25;Foundation/CPExpression.jt;6156;
objj_executeFile("Foundation/CPExpression.j",NO);
var _1=objj_allocateClassPair(_CPKeyPathExpression,"NSKeyPathExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(_3,"NS_initWithCoder:",_5);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_6,_7){
with(_6){
return objj_msgSend(_CPKeyPathExpression,"class");
}
})]);
var _1=objj_allocateClassPair(_CPConstantValueExpression,"_CPKeyPathSpecifierExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_8,_9,_a){
with(_8){
var _b=objj_msgSend(_a,"decodeObjectForKey:","NSKeyPath");
_8=objj_msgSendSuper({receiver:_8,super_class:objj_getClass("_CPKeyPathSpecifierExpression").super_class},"initWithValue:",_b);
return _8;
}
})]);
var _1=objj_allocateClassPair(_CPKeyPathSpecifierExpression,"NSKeyPathSpecifierExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_c,_d,_e){
with(_c){
return objj_msgSend(_c,"NS_initWithCoder:",_e);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_f,_10){
with(_f){
return objj_msgSend(_CPConstantValueExpression,"class");
}
})]);
var _1=objj_getClass("_CPConstantValueExpression");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPConstantValueExpression\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_11,_12,_13){
with(_11){
var _14=objj_msgSend(_13,"decodeObjectForKey:","NSConstantValue");
return objj_msgSend(_11,"initWithValue:",_14);
}
})]);
var _1=objj_allocateClassPair(_CPConstantValueExpression,"NSConstantValueExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_15,_16,_17){
with(_15){
return objj_msgSend(_15,"NS_initWithCoder:",_17);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_18,_19){
with(_18){
return objj_msgSend(_CPConstantValueExpression,"class");
}
})]);
var _1=objj_getClass("_CPFunctionExpression");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPFunctionExpression\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_1a,_1b,_1c){
with(_1a){
var _1d=objj_msgSend(_1c,"decodeIntForKey:","NSExpressionType"),_1e=objj_msgSend(_1c,"decodeObjectForKey:","NSOperand"),_1f=CPSelectorFromString(objj_msgSend(_1c,"decodeObjectForKey:","NSSelectorName")),_20=objj_msgSend(_1c,"decodeObjectForKey:","NSArguments");
return objj_msgSend(_1a,"initWithTarget:selector:arguments:type:",_1e,_1f,_20,_1d);
}
})]);
var _1=objj_allocateClassPair(_CPFunctionExpression,"NSFunctionExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_21,_22,_23){
with(_21){
return objj_msgSend(_21,"NS_initWithCoder:",_23);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_24,_25){
with(_24){
return objj_msgSend(_CPFunctionExpression,"class");
}
})]);
var _1=objj_getClass("_CPSetExpression");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPSetExpression\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_26,_27,_28){
with(_26){
var _29=objj_msgSend(_28,"decodeIntForKey:","NSExpressionType"),_2a=objj_msgSend(_28,"decodeObjectForKey:","NSLeftExpression"),_2b=objj_msgSend(_28,"decodeObjectForKey:","NSRightExpression");
return objj_msgSend(_26,"initWithType:left:right:",_29,_2a,_2b);
}
})]);
var _1=objj_allocateClassPair(_CPSetExpression,"NSSetExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_2c,_2d,_2e){
with(_2c){
return objj_msgSend(_2c,"NS_initWithCoder:",_2e);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_2f,_30){
with(_2f){
return objj_msgSend(_CPSetExpression,"class");
}
})]);
var _1=objj_allocateClassPair(_CPSelfExpression,"NSSelfExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_31,_32,_33){
with(_31){
return objj_msgSendSuper({receiver:_31,super_class:objj_getClass("NSSelfExpression").super_class},"init");
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_34,_35){
with(_34){
return objj_msgSend(_CPSelfExpression,"class");
}
})]);
var _1=objj_getClass("_CPVariableExpression");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPVariableExpression\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_36,_37,_38){
with(_36){
var _39=objj_msgSend(_38,"decodeObjectForKey:","NSVariable");
return objj_msgSend(_36,"initWithVariable:",_39);
}
})]);
var _1=objj_allocateClassPair(_CPVariableExpression,"NSVariableExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3a,_3b,_3c){
with(_3a){
return objj_msgSend(_3a,"NS_initWithCoder:",_3c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_3d,_3e){
with(_3d){
return objj_msgSend(_CPVariableExpression,"class");
}
})]);
var _1=objj_getClass("_CPAggregateExpression");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPAggregateExpression\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3f,_40,_41){
with(_3f){
var _42=objj_msgSend(_41,"decodeObjectForKey:","NSCollection");
return objj_msgSend(_3f,"initWithAggregate:",_42);
}
})]);
var _1=objj_allocateClassPair(_CPAggregateExpression,"NSAggregateExpression"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_43,_44,_45){
with(_43){
return objj_msgSend(_43,"NS_initWithCoder:",_45);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_46,_47){
with(_46){
return objj_msgSend(_CPAggregateExpression,"class");
}
})]);
p;8;NSFont.jt;2345;@STATIC;1.0;I;15;AppKit/CPFont.jt;2306;
objj_executeFile("AppKit/CPFont.j",NO);
IBDefaultFontFace="Lucida Grande";
IBDefaultFontSize=13;
var OS=require("os"),_1=require("cappuccino/fontinfo").fontinfo;
var _2=objj_getClass("CPFont");
if(!_2){
throw new SyntaxError("*** Could not find definition for class \"CPFont\"");
}
var _3=_2.isa;
class_addMethods(_2,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_4,_5,_6){
with(_4){
var _7=objj_msgSend(_6,"decodeObjectForKey:","NSName"),_8=objj_msgSend(_6,"decodeDoubleForKey:","NSSize"),_9=false,_a=false,_b=_1(_7,_8);
if(_b){
_7=_b.familyName;
_9=_b.bold;
_a=_b.italic;
}
var _c=objj_msgSend(_4,"_initWithName:size:bold:italic:system:",_7,_8,_9,_a,NO);
CPLog.debug("NSFont: %s",objj_msgSend(NSFont,"descriptorForFont:",_c));
return _c;
}
}),new objj_method(sel_getUid("cibFontForNibFont"),function(_d,_e){
with(_d){
if(_name===IBDefaultFontFace){
if(_size===IBDefaultFontSize&&!_isBold&&!_isItalic){
return nil;
}else{
return objj_msgSend(objj_msgSend(CPFont,"alloc"),"_initWithName:size:bold:italic:system:",_CPFontSystemFacePlaceholder,_size==IBDefaultFontSize?CPFontCurrentSystemSize:_size,_isBold,_isItalic,YES);
}
}
return _d;
}
})]);
var _2=objj_allocateClassPair(CPFont,"NSFont"),_3=_2.isa;
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("initWithCoder:"),function(_f,_10,_11){
with(_f){
return objj_msgSend(_f,"NS_initWithCoder:",_11);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_12,_13){
with(_12){
return objj_msgSend(CPFont,"class");
}
})]);
class_addMethods(_3,[new objj_method(sel_getUid("initialize"),function(_14,_15){
with(_14){
if(_14!==objj_msgSend(NSFont,"class")){
return;
}
CPLog.debug("NSFont: default IB font: %s %f",IBDefaultFontFace,IBDefaultFontSize);
}
}),new objj_method(sel_getUid("descriptorForFont:"),function(_16,_17,_18){
with(_16){
var _19=[];
if(objj_msgSend(_18,"isBold")){
_19.push("bold");
}
if(objj_msgSend(_18,"isItalic")){
_19.push("italic");
}
_19=_19.join(" ");
var _1a=[];
if(objj_msgSend(_18,"isSystem")){
_1a.push("system face");
if(objj_msgSend(_18,"size")===IBDefaultFontSize){
_1a.push("system size");
}
}
_1a=_1a.join(", ");
return objj_msgSend(CPString,"stringWithFormat:","%s%s %d%s",objj_msgSend(_18,"familyName"),_19?" "+_19:"",objj_msgSend(_18,"size"),_1a?" ("+_1a+")":"");
}
})]);
p;13;NSFormatter.jt;111;@STATIC;1.0;t;94;
var _1=objj_allocateClassPair(CPObject,"NSFormatter"),_2=_1.isa;
objj_registerClassPair(_1);
p;14;NSFoundation.jt;602;@STATIC;1.0;i;9;NSArray.ji;20;NSAttributedString.ji;17;NSDateFormatter.ji;14;NSDictionary.ji;14;NSExpression.ji;13;NSFormatter.ji;17;NSMutableString.ji;8;NSNull.ji;19;NSNumberFormatter.ji;7;NSSet.jt;399;
objj_executeFile("NSArray.j",YES);
objj_executeFile("NSAttributedString.j",YES);
objj_executeFile("NSDateFormatter.j",YES);
objj_executeFile("NSDictionary.j",YES);
objj_executeFile("NSExpression.j",YES);
objj_executeFile("NSFormatter.j",YES);
objj_executeFile("NSMutableString.j",YES);
objj_executeFile("NSNull.j",YES);
objj_executeFile("NSNumberFormatter.j",YES);
objj_executeFile("NSSet.j",YES);
p;16;NSIBObjectData.jt;2550;@STATIC;1.0;I;25;AppKit/_CPCibObjectData.ji;8;NSCell.jt;2489;
objj_executeFile("AppKit/_CPCibObjectData.j",NO);
objj_executeFile("NSCell.j",YES);
var _1=objj_getClass("_CPCibObjectData");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPCibObjectData\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSend(_3,"init");
if(_3){
_namesKeys=objj_msgSend(_5,"decodeObjectForKey:","NSNamesKeys");
_namesValues=objj_msgSend(_5,"decodeObjectForKey:","NSNamesValues");
_classesKeys=objj_msgSend(_5,"decodeObjectForKey:","NSClassesKeys");
_classesValues=objj_msgSend(_5,"decodeObjectForKey:","NSClassesValues");
_connections=objj_msgSend(_5,"decodeObjectForKey:","NSConnections");
_framework=objj_msgSend(_5,"decodeObjectForKey:","NSFramework");
_objectsKeys=objj_msgSend(_5,"decodeObjectForKey:","NSObjectsKeys");
_objectsValues=objj_msgSend(_5,"decodeObjectForKey:","NSObjectsValues");
objj_msgSend(_3,"removeCellsFromObjectGraph");
_fileOwner=objj_msgSend(_5,"decodeObjectForKey:","NSRoot");
_visibleWindows=objj_msgSend(_5,"decodeObjectForKey:","NSVisibleWindows");
}
return _3;
}
}),new objj_method(sel_getUid("removeCellsFromObjectGraph"),function(_6,_7){
with(_6){
var _8=_objectsKeys.length,_9={},_a={};
while(_8--){
var _b=_objectsKeys[_8];
if(!_b){
continue;
}
var _c=_objectsValues[_8];
if(objj_msgSend(_b,"isKindOfClass:",objj_msgSend(NSCell,"class"))){
_9[objj_msgSend(_b,"UID")]=_c;
continue;
}
if(!objj_msgSend(_c,"isKindOfClass:",objj_msgSend(NSCell,"class"))){
continue;
}
var _d=objj_msgSend(_c,"UID"),_e=_a[_d];
if(!_e){
_e=[];
_a[_d]=_e;
}
_e.push(_b);
_objectsKeys.splice(_8,1);
_objectsValues.splice(_8,1);
}
for(var _f in _a){
if(_a.hasOwnProperty(_f)){
var _e=_a[_f],_c=_9[_f];
_e.forEach(function(_10){
CPLog.debug("NSIBObjectData: promoted "+_10+" to child of "+_c);
_objectsKeys.push(_10);
_objectsValues.push(_c);
});
}
}
var _8=_objectsKeys.length;
while(_8--){
var _11=_objectsKeys[_8];
if(objj_msgSend(_11,"respondsToSelector:",sel_getUid("swapCellsForParents:"))){
objj_msgSend(_11,"swapCellsForParents:",_9);
}
}
}
})]);
var _1=objj_allocateClassPair(_CPCibObjectData,"NSIBObjectData"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_12,_13,_14){
with(_12){
return objj_msgSend(_12,"NS_initWithCoder:",_14);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_15,_16){
with(_15){
return objj_msgSend(_CPCibObjectData,"class");
}
})]);
p;9;NSImage.jt;848;@STATIC;1.0;I;16;AppKit/CPImage.jt;809;
objj_executeFile("AppKit/CPImage.j",NO);
var _1=objj_getClass("CPImage");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPImage\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSend(_3,"init");
if(_3){
var _6=objj_msgSend(_5,"decodeIntForKey:","NSImageFlags");
_size=objj_msgSend(_5,"decodeSizeForKey:","NSSize");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPImage,"NSImage"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPImage,"class");
}
})]);
p;13;NSImageView.jt;2912;@STATIC;1.0;I;20;AppKit/CPImageView.jt;2868;
objj_executeFile("AppKit/CPImageView.j",NO);
var _1=objj_getClass("CPImageView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPImageView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPImageView").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
objj_msgSend(_3,"setImageScaling:",objj_msgSend(_6,"imageScaling"));
objj_msgSend(_3,"setImageAlignment:",objj_msgSend(_6,"imageAlignment"));
_isEditable=objj_msgSend(_6,"isEditable");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPImageView,"NSImageView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSendSuper({receiver:_7,super_class:objj_getClass("NSImageView").super_class},"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPImageView,"class");
}
})]);
NSImageAlignCenter=0;
NSImageAlignTop=1;
NSImageAlignTopLeft=2;
NSImageAlignTopRight=3;
NSImageAlignLeft=4;
NSImageAlignBottom=5;
NSImageAlignBottomLeft=6;
NSImageAlignBottomRight=7;
NSImageAlignRight=8;
NSImageScaleProportionallyDown=0;
NSImageScaleAxesIndependently=1;
NSImageScaleNone=2;
NSImageScaleProportionallyUpOrDown=3;
NSImageFrameNone=0;
NSImageFramePhoto=1;
NSImageFrameGrayBezel=2;
NSImageFrameGroove=3;
NSImageFrameButton=4;
var _1=objj_allocateClassPair(NSCell,"NSImageCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_animates"),new objj_ivar("_imageAlignment"),new objj_ivar("_imageScaling"),new objj_ivar("_frameStyle")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("_animates"),function(_c,_d){
with(_c){
return _animates;
}
}),new objj_method(sel_getUid("_setAnimates:"),function(_e,_f,_10){
with(_e){
_animates=_10;
}
}),new objj_method(sel_getUid("imageAlignment"),function(_11,_12){
with(_11){
return _imageAlignment;
}
}),new objj_method(sel_getUid("imageScaling"),function(_13,_14){
with(_13){
return _imageScaling;
}
}),new objj_method(sel_getUid("_frameStyle"),function(_15,_16){
with(_15){
return _frameStyle;
}
}),new objj_method(sel_getUid("_setFrameStyle:"),function(_17,_18,_19){
with(_17){
_frameStyle=_19;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_1a,_1b,_1c){
with(_1a){
_1a=objj_msgSendSuper({receiver:_1a,super_class:objj_getClass("NSImageCell").super_class},"initWithCoder:",_1c);
if(_1a){
_animates=objj_msgSend(_1c,"decodeBoolForKey:","NSAnimates");
_imageAlignment=objj_msgSend(_1c,"decodeIntForKey:","NSAlign");
_imageScaling=objj_msgSend(_1c,"decodeIntForKey:","NSScale");
_frameStyle=objj_msgSend(_1c,"decodeIntForKey:","NSStyle");
}
return _1a;
}
})]);
p;18;NSLevelIndicator.jt;3899;@STATIC;1.0;I;25;AppKit/CPLevelIndicator.jt;3850;
objj_executeFile("AppKit/CPLevelIndicator.j",NO);
var _1=objj_getClass("CPLevelIndicator");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPLevelIndicator\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_minValue=objj_msgSend(_6,"minValue");
_maxValue=objj_msgSend(_6,"maxValue");
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPLevelIndicator").super_class},"NS_initWithCoder:",_5);
if(_3){
_3=objj_msgSend(_3,"NS_initWithCell:",_6);
}
return _3;
}
}),new objj_method(sel_getUid("NS_initWithCell:"),function(_7,_8,_9){
with(_7){
_minValue=objj_msgSend(_9,"minValue");
_maxValue=objj_msgSend(_9,"maxValue");
_levelIndicatorStyle=objj_msgSend(_9,"levelIndicatorStyle");
_warningValue=objj_msgSend(_9,"warningValue");
_criticalValue=objj_msgSend(_9,"criticalValue");
_tickMarkPosition=objj_msgSend(_9,"tickMarkPosition");
_numberOfTickMarks=objj_msgSend(_9,"numberOfTickMarks");
_numberOfMajorTickMarks=objj_msgSend(_9,"numberOfMajorTickMarks");
objj_msgSend(_7,"setEditable:",objj_msgSend(_9,"isEditable"));
objj_msgSend(_7,"setEnabled:",objj_msgSend(_9,"isEnabled"));
objj_msgSend(_7,"setContinuous:",objj_msgSend(_9,"isContinuous"));
return _7;
}
})]);
var _1=objj_allocateClassPair(CPLevelIndicator,"NSLevelIndicator"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(CPLevelIndicator,"class");
}
})]);
var _1=objj_allocateClassPair(NSCell,"NSLevelIndicatorCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_levelIndicatorStyle"),new objj_ivar("_minValue"),new objj_ivar("_maxValue"),new objj_ivar("_warningValue"),new objj_ivar("_criticalValue"),new objj_ivar("_tickMarkPosition"),new objj_ivar("_numberOfTickMarks"),new objj_ivar("_numberOfMajorTickMarks")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("levelIndicatorStyle"),function(_f,_10){
with(_f){
return _levelIndicatorStyle;
}
}),new objj_method(sel_getUid("minValue"),function(_11,_12){
with(_11){
return _minValue;
}
}),new objj_method(sel_getUid("maxValue"),function(_13,_14){
with(_13){
return _maxValue;
}
}),new objj_method(sel_getUid("warningValue"),function(_15,_16){
with(_15){
return _warningValue;
}
}),new objj_method(sel_getUid("criticalValue"),function(_17,_18){
with(_17){
return _criticalValue;
}
}),new objj_method(sel_getUid("tickMarkPosition"),function(_19,_1a){
with(_19){
return _tickMarkPosition;
}
}),new objj_method(sel_getUid("numberOfTickMarks"),function(_1b,_1c){
with(_1b){
return _numberOfTickMarks;
}
}),new objj_method(sel_getUid("numberOfMajorTickMarks"),function(_1d,_1e){
with(_1d){
return _numberOfMajorTickMarks;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_1f,_20,_21){
with(_1f){
_1f=objj_msgSendSuper({receiver:_1f,super_class:objj_getClass("NSLevelIndicatorCell").super_class},"initWithCoder:",_21);
if(_1f){
_objectValue=objj_msgSend(_21,"decodeDoubleForKey:","NSValue");
_minValue=objj_msgSend(_21,"decodeDoubleForKey:","NSMinValue");
_maxValue=objj_msgSend(_21,"decodeDoubleForKey:","NSMaxValue");
_warningValue=objj_msgSend(_21,"decodeDoubleForKey:","NSWarningValue");
_criticalValue=objj_msgSend(_21,"decodeDoubleForKey:","NSCriticalValue");
_levelIndicatorStyle=objj_msgSend(_21,"decodeIntForKey:","NSIndicatorStyle");
_tickMarkPosition=objj_msgSend(_21,"decodeIntForKey:","NSTickMarkPosition");
_numberOfTickMarks=objj_msgSend(_21,"decodeIntForKey:","NSNumberOfTickMarks");
_numberOfTickMarks=objj_msgSend(_21,"decodeIntForKey:","NSNumberOfMajorTickMarks");
}
return _1f;
}
})]);
p;10;NSMatrix.jt;2999;@STATIC;1.0;I;21;Foundation/CPObject.jI;15;AppKit/CPView.ji;8;NSView.jt;2922;
objj_executeFile("Foundation/CPObject.j",NO);
objj_executeFile("AppKit/CPView.j",NO);
objj_executeFile("NSView.j",YES);
var _1=1073741824,_2=16777216;
var _3=objj_allocateClassPair(CPView,"NSMatrix"),_4=_3.isa;
objj_registerClassPair(_3);
class_addMethods(_3,[new objj_method(sel_getUid("initWithCoder:"),function(_5,_6,_7){
with(_5){
return objj_msgSend(_5,"NS_initWithCoder:",_7);
}
}),new objj_method(sel_getUid("NS_initWithCoder:"),function(_8,_9,_a){
with(_8){
_8=objj_msgSendSuper({receiver:_8,super_class:objj_getClass("NSMatrix").super_class},"NS_initWithCoder:",_a);
if(_8){
var _b=objj_msgSend(_a,"decodeIntForKey:","NSNumRows"),_c=objj_msgSend(_a,"decodeIntForKey:","NSNumCols"),_d=objj_msgSend(_a,"decodeSizeForKey:","NSCellSize"),_e=objj_msgSend(_a,"decodeSizeForKey:","NSIntercellSpacing"),_f=objj_msgSend(_a,"decodeIntForKey:","NSMatrixFlags"),_10=_f&_1,_11=_f&_2,_12=objj_msgSend(_a,"decodeObjectForKey:","NSBackgroundColor"),_13=objj_msgSend(_a,"decodeObjectForKey:","NSCells"),_14=objj_msgSend(_a,"decodeObjectForKey:","NSSelectedCell");
if(_10){
var _15=objj_msgSend(CPRadioGroup,"new"),_16=CGRectMake(0,0,_d.width,_d.height);
for(var _17=0;_17<_b;++_17){
_16.origin.x=0;
for(var _18=0;_18<_c;++_18){
var _19=_13[_17*_c+_18],_1a=objj_msgSend(objj_msgSend(CPRadio,"alloc"),"initWithFrame:radioGroup:cell:",_16,_15,_19);
objj_msgSend(_8,"addSubview:",_1a);
NIB_CONNECTION_EQUIVALENCY_TABLE[objj_msgSend(_19,"UID")]=_1a;
_16.origin.x=CGRectGetMaxX(_16)+_e.width;
}
_16.origin.y=CGRectGetMaxY(_16)+_e.height;
}
if(_11){
objj_msgSend(_8,"setBackgroundColor:",_12);
}
_8.isa=objj_msgSend(CPView,"class");
}else{
_8=nil;
}
}
return _8;
}
})]);
var _3=objj_getClass("CPRadio");
if(!_3){
throw new SyntaxError("*** Could not find definition for class \"CPRadio\"");
}
var _4=_3.isa;
class_addMethods(_3,[new objj_method(sel_getUid("initWithFrame:radioGroup:cell:"),function(_1b,_1c,_1d,_1e,_1f){
with(_1b){
_1b=objj_msgSend(_1b,"initWithFrame:radioGroup:",_1d,_1e);
if(_1b){
objj_msgSend(_1b,"setAutoresizingMask:",CPViewWidthSizable|CPViewHeightSizable);
objj_msgSend(_1b,"setTitle:",objj_msgSend(_1f,"title"));
objj_msgSend(_1b,"setBackgroundColor:",objj_msgSend(CPColor,"clearColor"));
objj_msgSend(_1b,"setFont:",objj_msgSend(_1f,"font"));
objj_msgSend(_1b,"setAlignment:",objj_msgSend(_1f,"alignment"));
objj_msgSend(_1b,"setLineBreakMode:",objj_msgSend(_1f,"lineBreakMode"));
objj_msgSend(_1b,"setImagePosition:",objj_msgSend(_1f,"imagePosition"));
objj_msgSend(_1b,"setKeyEquivalent:",objj_msgSend(_1f,"keyEquivalent"));
objj_msgSend(_1b,"setKeyEquivalentModifierMask:",objj_msgSend(_1f,"keyEquivalentModifierMask"));
objj_msgSend(_1b,"setAllowsMixedState:",objj_msgSend(_1f,"allowsMixedState"));
objj_msgSend(_1b,"setObjectValue:",objj_msgSend(_1f,"objectValue"));
objj_msgSend(_1b,"setEnabled:",objj_msgSend(_1f,"isEnabled"));
objj_msgSend(_1b,"setTag:",objj_msgSend(_1f,"tag"));
}
return _1b;
}
})]);
p;8;NSMenu.jt;1489;@STATIC;1.0;I;15;AppKit/CPMenu.ji;12;NSMenuItem.jt;1433;
objj_executeFile("AppKit/CPMenu.j",NO);
objj_executeFile("NSMenuItem.j",YES);
NS_CPMenuNameMap={_NSMainMenu:"_CPMainMenu",_NSAppleMenu:"_CPApplicationMenu",_NSServicesMenu:"_CPServicesMenu",_NSWindowsMenu:"_CPWindowsMenu",_NSFontMenu:"_CPFontMenu",_NSRecentDocumentsMenu:"_CPRecentDocumentsMenu",_NSOpenDocumentsMenu:"_CPOpenDocumentsMenu"};
var _1=objj_getClass("CPMenu");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPMenu\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPMenu").super_class},"init");
if(_3){
_title=objj_msgSend(_5,"decodeObjectForKey:","NSTitle");
_items=objj_msgSend(_5,"decodeObjectForKey:","NSMenuItems");
_name=objj_msgSend(_5,"decodeObjectForKey:","NSName");
var _6=NS_CPMenuNameMap[_name];
if(_6){
_name=_6;
}
_showsStateColumn=!objj_msgSend(_5,"containsValueForKey:","NSMenuExcludeMarkColumn")||!objj_msgSend(_5,"decodeBoolForKey:","NSMenuExcludeMarkColumn");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPMenu,"NSMenu"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPMenu,"class");
}
})]);
p;12;NSMenuItem.jt;2217;@STATIC;1.0;I;19;AppKit/CPMenuItem.ji;9;NSEvent.ji;8;NSMenu.jt;2149;
objj_executeFile("AppKit/CPMenuItem.j",NO);
objj_executeFile("NSEvent.j",YES);
objj_executeFile("NSMenu.j",YES);
var _1=objj_getClass("CPMenuItem");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPMenuItem\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPMenuItem").super_class},"init");
if(_3){
_isSeparator=objj_msgSend(_5,"decodeBoolForKey:","NSIsSeparator");
_title=objj_msgSend(_5,"decodeObjectForKey:","NSTitle");
_target=objj_msgSend(_5,"decodeObjectForKey:","NSTarget");
_action=objj_msgSend(_5,"decodeObjectForKey:","NSAction");
_isEnabled=!objj_msgSend(_5,"decodeBoolForKey:","NSIsDisabled");
_isHidden=objj_msgSend(_5,"decodeBoolForKey:","NSIsHidden");
_tag=objj_msgSend(_5,"decodeIntForKey:","NSTag");
_state=objj_msgSend(_5,"decodeIntForKey:","NSState");
_image=objj_msgSend(_5,"decodeObjectForKey:","NSImage");
_submenu=objj_msgSend(_5,"decodeObjectForKey:","NSSubmenu");
_menu=objj_msgSend(_5,"decodeObjectForKey:","NSMenu");
_keyEquivalent=objj_msgSend(_5,"decodeObjectForKey:","NSKeyEquiv");
_keyEquivalentModifierMask=CP_NSMapKeyMask(objj_msgSend(_5,"decodeObjectForKey:","NSKeyEquivModMask"));
_indentationLevel=objj_msgSend(_5,"decodeIntForKey:","NSIndent");
_representedObject=objj_msgSend(_5,"decodeObjectForKey:","NSRepObject");
}
return _3;
}
}),new objj_method(sel_getUid("swapCellsForParents:"),function(_6,_7,_8){
with(_6){
var _9=objj_msgSend(_6,"target");
if(!_9){
return;
}
var _a=_8[objj_msgSend(objj_msgSend(_6,"target"),"UID")];
if(_a){
objj_msgSend(_6,"setTarget:",_a);
}
}
})]);
var _1=objj_allocateClassPair(CPMenuItem,"NSMenuItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_b,_c,_d){
with(_b){
return objj_msgSend(_b,"NS_initWithCoder:",_d);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_e,_f){
with(_e){
return objj_msgSend(CPMenuItem,"class");
}
})]);
var _1=objj_allocateClassPair(NSButtonCell,"NSMenuItemCell"),_2=_1.isa;
objj_registerClassPair(_1);
p;17;NSMutableString.jt;279;@STATIC;1.0;t;261;
var _1=objj_allocateClassPair(CPObject,"NSMutableString"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(_5,"decodeObjectForKey:","NS.string");
}
})]);
p;16;NSNibConnector.jt;7055;@STATIC;1.0;I;23;AppKit/CPCibConnector.jI;30;AppKit/CPCibControlConnector.jI;29;AppKit/CPCibOutletConnector.jI;40;AppKit/CPCibRuntimeAttributesConnector.jI;27;AppKit/CPCibHelpConnector.jt;6862;
objj_executeFile("AppKit/CPCibConnector.j",NO);
objj_executeFile("AppKit/CPCibControlConnector.j",NO);
objj_executeFile("AppKit/CPCibOutletConnector.j",NO);
objj_executeFile("AppKit/CPCibRuntimeAttributesConnector.j",NO);
objj_executeFile("AppKit/CPCibHelpConnector.j",NO);
NIB_CONNECTION_EQUIVALENCY_TABLE={};
var _1=objj_getClass("CPCibConnector");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCibConnector\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPCibConnector").super_class},"init");
if(_3){
_source=objj_msgSend(_5,"decodeObjectForKey:","NSSource");
_destination=objj_msgSend(_5,"decodeObjectForKey:","NSDestination");
_label=objj_msgSend(_5,"decodeObjectForKey:","NSLabel");
var _6=objj_msgSend(_source,"UID"),_7=objj_msgSend(_destination,"UID");
if(_6 in NIB_CONNECTION_EQUIVALENCY_TABLE){
CPLog.debug("NSNibConnector: swapped object: "+_source+" for object: "+NIB_CONNECTION_EQUIVALENCY_TABLE[_6]);
_source=NIB_CONNECTION_EQUIVALENCY_TABLE[_6];
}
if(_7 in NIB_CONNECTION_EQUIVALENCY_TABLE){
CPLog.debug("NSNibConnector: swapped object: "+_destination+" for object: "+NIB_CONNECTION_EQUIVALENCY_TABLE[_7]);
_destination=NIB_CONNECTION_EQUIVALENCY_TABLE[_7];
}
if(_source&&_destination){
CPLog.debug("NSNibConnector: connection: "+objj_msgSend(_source,"description")+" "+objj_msgSend(_destination,"description")+" "+_label);
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPCibConnector,"NSNibConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_8,_9,_a){
with(_8){
return objj_msgSend(_8,"NS_initWithCoder:",_a);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_b,_c){
with(_b){
return objj_msgSend(CPCibConnector,"class");
}
})]);
var _1=objj_allocateClassPair(CPCibControlConnector,"NSNibControlConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_d,_e,_f){
with(_d){
return objj_msgSend(_d,"NS_initWithCoder:",_f);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_10,_11){
with(_10){
return objj_msgSend(CPCibControlConnector,"class");
}
})]);
var _1=objj_allocateClassPair(CPCibOutletConnector,"NSNibOutletConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_12,_13,_14){
with(_12){
return objj_msgSend(_12,"NS_initWithCoder:",_14);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_15,_16){
with(_15){
return objj_msgSend(CPCibOutletConnector,"class");
}
})]);
var _17=objj_msgSend(CPSet,"setWithObjects:","NSNegateBoolean","NSIsNil","NSIsNotNil","NSUnarchiveFromData","NSKeyedUnarchiveFromData");
var _1=objj_getClass("CPCibBindingConnector");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCibBindingConnector\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_18,_19,_1a){
with(_18){
_18=objj_msgSendSuper({receiver:_18,super_class:objj_getClass("CPCibBindingConnector").super_class},"NS_initWithCoder:",_1a);
if(_18){
_binding=objj_msgSend(_1a,"decodeObjectForKey:","NSBinding");
_keyPath=objj_msgSend(_1a,"decodeObjectForKey:","NSKeyPath");
_options=objj_msgSend(CPDictionary,"dictionary");
var _1b=objj_msgSend(_1a,"decodeObjectForKey:","NSOptions"),_1c=objj_msgSend(_1b,"keyEnumerator"),key;
while((key=objj_msgSend(_1c,"nextObject"))!==nil){
var _1d="CP"+key.substring(2),_1e=objj_msgSend(_1b,"objectForKey:",key);
if(_1d===CPValueTransformerNameBindingOption&&objj_msgSend(_17,"containsObject:",_1e)){
_1e="CP"+_1e.substring(2);
}
objj_msgSend(_options,"setObject:forKey:",_1e,_1d);
}
CPLog.debug("NSNibConnector: binding connector: "+objj_msgSend(_binding,"description")+" to: "+_destination+" "+objj_msgSend(_keyPath,"description")+" "+objj_msgSend(_options,"description"));
}
return _18;
}
})]);
var _1=objj_allocateClassPair(CPCibBindingConnector,"NSNibBindingConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_1f,_20,_21){
with(_1f){
return objj_msgSend(_1f,"NS_initWithCoder:",_21);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_22,_23){
with(_22){
return objj_msgSend(CPCibBindingConnector,"class");
}
})]);
var _1=objj_getClass("CPCibRuntimeAttributesConnector");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCibRuntimeAttributesConnector\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_24,_25,_26){
with(_24){
_24=objj_msgSendSuper({receiver:_24,super_class:objj_getClass("CPCibRuntimeAttributesConnector").super_class},"NS_initWithCoder:",_26);
if(_24){
_source=objj_msgSend(_26,"decodeObjectForKey:","NSObject");
_keyPaths=objj_msgSend(_26,"decodeObjectForKey:","NSKeyPaths");
_values=objj_msgSend(_26,"decodeObjectForKey:","NSValues");
var _27=objj_msgSend(_keyPaths,"count");
CPLog.debug("NSNibConnector: runtime attributes connector: "+objj_msgSend(_source,"description"));
while(_27--){
var _28=_values[_27],_29=typeof (_28)==="boolean"?"BOOL":objj_msgSend(_28,"className");
CPLog.debug("   %s (%s): %s",_keyPaths[_27],_29,_28);
}
}
return _24;
}
})]);
var _1=objj_allocateClassPair(CPCibRuntimeAttributesConnector,"NSIBUserDefinedRuntimeAttributesConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_2a,_2b,_2c){
with(_2a){
return objj_msgSend(_2a,"NS_initWithCoder:",_2c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_2d,_2e){
with(_2d){
return objj_msgSend(CPCibRuntimeAttributesConnector,"class");
}
})]);
var _1=objj_getClass("CPCibHelpConnector");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPCibHelpConnector\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_2f,_30,_31){
with(_2f){
_2f=objj_msgSendSuper({receiver:_2f,super_class:objj_getClass("CPCibHelpConnector").super_class},"NS_initWithCoder:",_31);
if(_2f){
_destination=objj_msgSend(_31,"decodeObjectForKey:","NSDestination");
_file=objj_msgSend(_31,"decodeObjectForKey:","NSFile");
_marker=objj_msgSend(_31,"decodeObjectForKey:","NSMarker");
}
return _2f;
}
})]);
var _1=objj_allocateClassPair(CPCibHelpConnector,"NSIBHelpConnector"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_32,_33,_34){
with(_32){
return objj_msgSend(_32,"NS_initWithCoder:",_34);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_35,_36){
with(_35){
return objj_msgSend(CPCibHelpConnector,"class");
}
})]);
p;8;NSNull.jt;434;@STATIC;1.0;I;19;Foundation/CPNull.jt;392;
objj_executeFile("Foundation/CPNull.j",NO);
var _1=objj_allocateClassPair(CPNull,"NSNull"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(CPNull,"null");
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_6,_7){
with(_6){
return objj_msgSend(CPNull,"class");
}
})]);
p;19;NSNumberFormatter.jt;889;@STATIC;1.0;I;30;Foundation/CPNumberFormatter.jt;836;
objj_executeFile("Foundation/CPNumberFormatter.j",NO);
var _1=objj_getClass("CPNumberFormatter");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPNumberFormatter\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPNumberFormatter").super_class},"init");
if(_3){
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPNumberFormatter,"NSNumberFormatter"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPNumberFormatter,"class");
}
})]);
p;20;NSObjectController.jt;1305;@STATIC;1.0;I;27;AppKit/CPObjectController.jt;1254;
objj_executeFile("AppKit/CPObjectController.j",NO);
var _1=objj_getClass("CPObjectController");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPObjectController\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPObjectController").super_class},"init");
if(_3){
_declaredKeys=objj_msgSend(_5,"decodeObjectForKey:","NSDeclaredKeys");
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSObjectClassName");
if(_6){
_objectClassName=CP_NSMapClassName(_6);
}else{
_objectClass=objj_msgSend(CPMutableDictionary,"class");
}
_isEditable=objj_msgSend(_5,"decodeBoolForKey:","NSEditable");
_automaticallyPreparesContent=objj_msgSend(_5,"decodeBoolForKey:","NSAutomaticallyPreparesContent");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPObjectController,"NSObjectController"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPObjectController,"class");
}
})]);
p;15;NSOutlineView.jt;1507;@STATIC;1.0;I;22;AppKit/CPOutlineView.jt;1461;
objj_executeFile("AppKit/CPOutlineView.j",NO);
var _1=objj_getClass("CPOutlineView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPOutlineView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPOutlineView").super_class},"NS_initWithCoder:",_5);
if(_3){
if(objj_msgSend(_5,"containsValueForKey:","NSOutlineViewOutlineTableColumnKey")){
_outlineTableColumn=objj_msgSend(_5,"decodeObjectForKey:","NSOutlineViewOutlineTableColumnKey");
}else{
_outlineTableColumn=objj_msgSend(objj_msgSend(_3,"tableColumns"),"objectAtIndex:",0);
}
if(objj_msgSend(_5,"containsValueForKey:","NSOutlineViewIndentationPerLevelKey")){
_indentationPerLevel=objj_msgSend(_5,"decodeFloatForKey:","NSOutlineViewIndentationPerLevelKey");
}else{
_indentationPerLevel=16;
}
_outlineViewDataSource=objj_msgSend(_5,"decodeObjectForKey:","NSDataSource");
_outlineViewDelegate=objj_msgSend(_5,"decodeObjectForKey:","NSDelegate");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPOutlineView,"NSOutlineView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPOutlineView,"class");
}
})]);
p;11;NSPopover.jt;1018;@STATIC;1.0;I;18;AppKit/CPPopover.jt;977;
objj_executeFile("AppKit/CPPopover.j",NO);
var _1=objj_getClass("CPPopover");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPPopover\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPPopover").super_class},"NS_initWithCoder:",_5);
if(_3){
_behavior=objj_msgSend(_5,"decodeIntForKey:","NSBehavior");
_appearance=objj_msgSend(_5,"decodeIntForKey:","NSAppearance");
_animates=objj_msgSend(_5,"decodeBoolForKey:","NSAnimates");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPPopover,"NSPopover"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPPopover,"class");
}
})]);
p;15;NSPopUpButton.jt;2408;@STATIC;1.0;I;22;AppKit/CPPopUpButton.ji;8;NSMenu.jt;2350;
objj_executeFile("AppKit/CPPopUpButton.j",NO);
objj_executeFile("NSMenu.j",YES);
var _1=objj_getClass("CPPopUpButton");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPPopUpButton\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPPopUpButton").super_class},"NS_initWithCoder:",_5)){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_menu=objj_msgSend(_6,"menu");
_frame.origin.x-=3;
_frame.origin.y-=4;
_frame.size.width+=6;
_bounds.size.width+=6;
objj_msgSend(_3,"setPullsDown:",objj_msgSend(_6,"pullsDown"));
_preferredEdge=objj_msgSend(_6,"preferredEdge");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPPopUpButton,"NSPopUpButton"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPPopUpButton,"class");
}
})]);
var _1=objj_allocateClassPair(NSMenuItemCell,"NSPopUpButtonCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("pullsDown"),new objj_ivar("selectedIndex"),new objj_ivar("preferredEdge"),new objj_ivar("menu")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("pullsDown"),function(_c,_d){
with(_c){
return pullsDown;
}
}),new objj_method(sel_getUid("selectedIndex"),function(_e,_f){
with(_e){
return selectedIndex;
}
}),new objj_method(sel_getUid("preferredEdge"),function(_10,_11){
with(_10){
return preferredEdge;
}
}),new objj_method(sel_getUid("menu"),function(_12,_13){
with(_12){
return menu;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_14,_15,_16){
with(_14){
_14=objj_msgSendSuper({receiver:_14,super_class:objj_getClass("NSPopUpButtonCell").super_class},"initWithCoder:",_16);
if(_14){
pullsDown=objj_msgSend(_16,"decodeBoolForKey:","NSPullDown");
selectedIndex=objj_msgSend(_16,"decodeIntForKey:","NSSelectedIndex");
preferredEdge=objj_msgSend(_16,"decodeIntForKey:","NSPreferredEdge");
menu=objj_msgSend(_16,"decodeObjectForKey:","NSMenu");
}
return _14;
}
}),new objj_method(sel_getUid("objectValue"),function(_17,_18){
with(_17){
return selectedIndex;
}
})]);
p;19;NSPredicateEditor.jt;2521;@STATIC;1.0;I;26;AppKit/CPPredicateEditor.jt;2471;
objj_executeFile("AppKit/CPPredicateEditor.j",NO);
var _1=objj_getClass("CPPredicateEditor");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPPredicateEditor\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPPredicateEditor").super_class},"NS_initWithCoder:",_5);
if(_3){
_allTemplates=objj_msgSend(_5,"decodeObjectForKey:","NSPredicateTemplates");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPPredicateEditor,"NSPredicateEditor"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPPredicateEditor,"class");
}
})]);
var _1=objj_getClass("CPPredicateEditorRowTemplate");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPPredicateEditorRowTemplate\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_b,_c,_d){
with(_b){
_b=objj_msgSendSuper({receiver:_b,super_class:objj_getClass("CPPredicateEditorRowTemplate").super_class},"init");
if(_b){
_templateType=objj_msgSend(_d,"decodeIntForKey:","NSPredicateTemplateType");
_predicateOptions=objj_msgSend(_d,"decodeIntForKey:","NSPredicateTemplateOptions");
_predicateModifier=objj_msgSend(_d,"decodeIntForKey:","NSPredicateTemplateModifier");
_leftAttributeType=objj_msgSend(_d,"decodeIntForKey:","NSPredicateTemplateLeftAttributeType");
_rightAttributeType=objj_msgSend(_d,"decodeIntForKey:","NSPredicateTemplateRightAttributeType");
_leftIsWildcard=objj_msgSend(_d,"decodeBoolForKey:","NSPredicateTemplateLeftIsWildcard");
_rightIsWildcard=objj_msgSend(_d,"decodeBoolForKey:","NSPredicateTemplateRightIsWildcard");
_views=objj_msgSend(_d,"decodeObjectForKey:","NSPredicateTemplateViews");
}
return _b;
}
})]);
var _1=objj_allocateClassPair(CPPredicateEditorRowTemplate,"NSPredicateEditorRowTemplate"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_e,_f,_10){
with(_e){
return objj_msgSend(_e,"NS_initWithCoder:",_10);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_11,_12){
with(_11){
return objj_msgSend(CPPredicateEditorRowTemplate,"class");
}
})]);
p;21;NSProgressIndicator.jt;1682;@STATIC;1.0;I;28;AppKit/CPProgressIndicator.jt;1630;
objj_executeFile("AppKit/CPProgressIndicator.j",NO);
var _1=1<<12;
var _2=objj_getClass("CPProgressIndicator");
if(!_2){
throw new SyntaxError("*** Could not find definition for class \"CPProgressIndicator\"");
}
var _3=_2.isa;
class_addMethods(_2,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_4,_5,_6){
with(_4){
_4=objj_msgSendSuper({receiver:_4,super_class:objj_getClass("CPProgressIndicator").super_class},"NS_initWithCoder:",_6);
if(_4){
var _7=objj_msgSend(_6,"decodeIntForKey:","NSpiFlags");
_minValue=objj_msgSend(_6,"decodeDoubleForKey:","NSMinValue");
_maxValue=objj_msgSend(_6,"decodeDoubleForKey:","NSMaxValue");
_style=(_7&_1)?CPProgressIndicatorSpinningStyle:CPProgressIndicatorBarStyle;
_isIndeterminate=(_7&2)?YES:NO;
_isDisplayedWhenStopped=(_7&8192)?NO:YES;
_controlSize=(_7&256)?CPSmallControlSize:CPRegularControlSize;
if(_style===CPProgressIndicatorSpinningStyle){
_controlSize=_controlSize==CPRegularControlSize?CPSmallControlSize:CPMiniControlSize;
}
_doubleValue=0;
var _8=objj_msgSend(_4,"frameSize");
if(_style!==CPProgressIndicatorSpinningStyle){
_8.height=15;
}
objj_msgSend(_4,"setFrameSize:",_8);
objj_msgSend(_4,"updateBackgroundColor");
objj_msgSend(_4,"drawBar");
}
return _4;
}
})]);
var _2=objj_allocateClassPair(CPProgressIndicator,"NSProgressIndicator"),_3=_2.isa;
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("initWithCoder:"),function(_9,_a,_b){
with(_9){
return objj_msgSend(_9,"NS_initWithCoder:",_b);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_c,_d){
with(_c){
return objj_msgSend(CPProgressIndicator,"class");
}
})]);
p;13;NSResponder.jt;928;@STATIC;1.0;I;20;AppKit/CPResponder.jt;885;
objj_executeFile("AppKit/CPResponder.j",NO);
var _1=objj_getClass("CPResponder");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPResponder\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPResponder").super_class},"init");
if(_3){
objj_msgSend(_3,"setNextResponder:",objj_msgSend(_5,"decodeObjectForKey:","NSNextResponder"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPResponder,"NSResponder"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPResponder,"class");
}
})]);
p;14;NSRuleEditor.jt;3309;@STATIC;1.0;I;21;AppKit/CPRuleEditor.jI;20;AppKit/CPTextField.ji;8;NSCell.ji;11;NSControl.jt;3211;
objj_executeFile("AppKit/CPRuleEditor.j",NO);
objj_executeFile("AppKit/CPTextField.j",NO);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSControl.j",YES);
var _1=objj_getClass("CPRuleEditor");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPRuleEditor\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPRuleEditor").super_class},"NS_initWithCoder:",_5);
if(_3){
_alignmentGridWidth=objj_msgSend(_5,"decodeFloatForKey:","NSRuleEditorAlignmentGridWidth");
_sliceHeight=objj_msgSend(_5,"decodeDoubleForKey:","NSRuleEditorSliceHeight");
_stringsFilename=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorStringsFileName");
_editable=objj_msgSend(_5,"decodeBoolForKey:","NSRuleEditorEditable");
_allowsEmptyCompoundRows=objj_msgSend(_5,"decodeBoolForKey:","NSRuleEditorAllowsEmptyCompoundRows");
_disallowEmpty=objj_msgSend(_5,"decodeBoolForKey:","NSRuleEditorDisallowEmpty");
_nestingMode=objj_msgSend(_5,"decodeIntForKey:","NSRuleEditorNestingMode");
_typeKeyPath=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorRowTypeKeyPath");
_itemsKeyPath=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorItemsKeyPath");
_valuesKeyPath=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorValuesKeyPath");
_subrowsArrayKeyPath=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorSubrowsArrayKeyPath");
_boundArrayKeyPath=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorBoundArrayKeyPath");
_boundArrayOwner=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorBoundArrayOwner");
_slices=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorSlices");
_ruleDelegate=objj_msgSend(_5,"decodeObjectForKey:","NSRuleEditorDelegate");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPRuleEditor,"NSRuleEditor"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPRuleEditor,"class");
}
})]);
var _1=objj_allocateClassPair(_CPRuleEditorViewSliceHolder,"_NSRuleEditorViewSliceHolder"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_b,_c,_d){
with(_b){
return objj_msgSend(_b,"NS_initWithCoder:",_d);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_e,_f){
with(_e){
return objj_msgSend(_CPRuleEditorViewSliceHolder,"class");
}
})]);
var _1=objj_allocateClassPair(_CPRuleEditorViewUnboundRowHolder,"_NSRuleEditorViewUnboundRowHolder"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_10,_11,_12){
with(_10){
if(_10=objj_msgSendSuper({receiver:_10,super_class:objj_getClass("_NSRuleEditorViewUnboundRowHolder").super_class},"init")){
boundArray=objj_msgSend(_12,"decodeObjectForKey:","NSBoundArray");
}
return _10;
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_13,_14){
with(_13){
return objj_msgSend(_CPRuleEditorViewUnboundRowHolder,"class");
}
})]);
p;12;NSScroller.jt;1676;@STATIC;1.0;I;19;AppKit/CPScroller.jt;1633;
objj_executeFile("AppKit/CPScroller.j",NO);
var _1=objj_getClass("CPScroller");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPScroller\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPScroller").super_class},"NS_initWithCoder:",_5)){
_controlSize=CPRegularControlSize;
_knobProportion=1;
if(objj_msgSend(_5,"containsValueForKey:","NSPercent")){
_knobProportion=objj_msgSend(_5,"decodeFloatForKey:","NSPercent");
}
_value=0;
if(objj_msgSend(_5,"containsValueForKey:","NSCurValue")){
_value=objj_msgSend(_5,"decodeFloatForKey:","NSCurValue");
}
objj_msgSend(_3,"_calculateIsVertical");
var _6=objj_msgSend(_3,"isVertical");
if(CPStringFromSelector(objj_msgSend(_3,"action"))==="_doScroller:"){
if(_6){
objj_msgSend(_3,"setAction:",sel_getUid("_verticalScrollerDidScroll:"));
}else{
objj_msgSend(_3,"setAction:",sel_getUid("_horizontalScrollerDidScroll:"));
}
}
_partRects=[];
if(_6){
objj_msgSend(_3,"setFrameSize:",CGSizeMake(15,CGRectGetHeight(objj_msgSend(_3,"frame"))));
}else{
objj_msgSend(_3,"setFrameSize:",CGSizeMake(CGRectGetWidth(objj_msgSend(_3,"frame")),15));
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPScroller,"NSScroller"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPScroller,"class");
}
})]);
p;14;NSScrollView.jt;1772;@STATIC;1.0;I;21;AppKit/CPScrollView.jt;1727;
objj_executeFile("AppKit/CPScrollView.j",NO);
var _1=objj_getClass("CPScrollView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPScrollView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPScrollView").super_class},"NS_initWithCoder:",_5)){
var _6=objj_msgSend(_5,"decodeIntForKey:","NSsFlags");
_verticalScroller=objj_msgSend(_5,"decodeObjectForKey:","NSVScroller");
_horizontalScroller=objj_msgSend(_5,"decodeObjectForKey:","NSHScroller");
_contentView=objj_msgSend(_5,"decodeObjectForKey:","NSContentView");
_headerClipView=objj_msgSend(_5,"decodeObjectForKey:","NSHeaderClipView");
_cornerView=objj_msgSend(_5,"decodeObjectForKey:","NSCornerView");
_bottomCornerView=objj_msgSend(objj_msgSend(CPView,"alloc"),"init");
objj_msgSend(_3,"addSubview:",_bottomCornerView);
_scrollerKnobStyle=objj_msgSend(_5,"decodeObjectForKey:","NSScrollerKnobStyle");
if(_scrollerKnobStyle===nil){
_scrollerKnobStyle=CPScrollerKnobStyleDefault;
}
_hasVerticalScroller=!!(_6&(1<<4));
_hasHorizontalScroller=!!(_6&(1<<5));
_autohidesScrollers=!!(_6&(1<<9));
_borderType=_6&3;
_verticalLineScroll=10;
_verticalPageScroll=10;
_horizontalLineScroll=10;
_horizontalPageScroll=10;
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPScrollView,"NSScrollView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPScrollView,"class");
}
})]);
p;15;NSSearchField.jt;3312;@STATIC;1.0;I;22;AppKit/CPSearchField.ji;13;NSTextField.jt;3248;
objj_executeFile("AppKit/CPSearchField.j",NO);
objj_executeFile("NSTextField.j",YES);
var _1=objj_getClass("CPSearchField");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPSearchField\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPSearchField").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
objj_msgSend(_3,"setRecentsAutosaveName:",objj_msgSend(_6,"recentsAutosaveName"));
objj_msgSend(_3,"setMaximumRecents:",objj_msgSend(_6,"maximumRecents"));
objj_msgSend(_3,"setSendsWholeSearchString:",objj_msgSend(_6,"sendsWholeSearchString"));
objj_msgSend(_3,"setSendsSearchStringImmediately:",objj_msgSend(_6,"sendsSearchStringImmediately"));
if(objj_msgSend(_3,"isBezeled")){
var _7=objj_msgSend(_3,"frame");
objj_msgSend(_3,"setFrameSize:",CGSizeMake(_7.size.width,_7.size.height+1));
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPSearchField,"NSSearchField"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_8,_9,_a){
with(_8){
_8=objj_msgSend(_8,"NS_initWithCoder:",_a);
return _8;
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_b,_c){
with(_b){
return objj_msgSend(CPSearchField,"class");
}
})]);
var _1=objj_allocateClassPair(NSTextFieldCell,"NSSearchFieldCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_recentsAutosaveName"),new objj_ivar("_maximumRecents"),new objj_ivar("_sendsWholeSearchString"),new objj_ivar("_sendsSearchStringImmediately")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("recentsAutosaveName"),function(_d,_e){
with(_d){
return _recentsAutosaveName;
}
}),new objj_method(sel_getUid("setRecentsAutosaveName:"),function(_f,_10,_11){
with(_f){
_recentsAutosaveName=_11;
}
}),new objj_method(sel_getUid("maximumRecents"),function(_12,_13){
with(_12){
return _maximumRecents;
}
}),new objj_method(sel_getUid("setMaximumRecents:"),function(_14,_15,_16){
with(_14){
_maximumRecents=_16;
}
}),new objj_method(sel_getUid("sendsWholeSearchString"),function(_17,_18){
with(_17){
return _sendsWholeSearchString;
}
}),new objj_method(sel_getUid("setSendsWholeSearchString:"),function(_19,_1a,_1b){
with(_19){
_sendsWholeSearchString=_1b;
}
}),new objj_method(sel_getUid("sendsSearchStringImmediately"),function(_1c,_1d){
with(_1c){
return _sendsSearchStringImmediately;
}
}),new objj_method(sel_getUid("setSendsSearchStringImmediately:"),function(_1e,_1f,_20){
with(_1e){
_sendsSearchStringImmediately=_20;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_21,_22,_23){
with(_21){
if(_21=objj_msgSendSuper({receiver:_21,super_class:objj_getClass("NSSearchFieldCell").super_class},"initWithCoder:",_23)){
_recentsAutosaveName=objj_msgSend(_23,"decodeObjectForKey:","NSRecentsAutosaveName");
_maximumRecents=objj_msgSend(_23,"decodeIntForKey:","NSMaximumRecents");
_sendsWholeSearchString=objj_msgSend(_23,"decodeBoolForKey:","NSSendsWholeSearchString");
_sendsSearchStringImmediately=objj_msgSend(_23,"decodeBytesForKey:","NSSearchFieldFlags")?YES:NO;
}
return _21;
}
})]);
p;19;NSSecureTextField.jt;660;@STATIC;1.0;I;26;AppKit/CPSecureTextField.ji;13;NSTextField.jt;593;
objj_executeFile("AppKit/CPSecureTextField.j",NO);
objj_executeFile("NSTextField.j",YES);
var _1=objj_allocateClassPair(CPSecureTextField,"NSSecureTextField"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(_3,"NS_initWithCoder:",_5);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_6,_7){
with(_6){
return objj_msgSend(CPSecureTextField,"class");
}
})]);
var _1=objj_allocateClassPair(NSTextFieldCell,"NSSecureTextFieldCell"),_2=_1.isa;
objj_registerClassPair(_1);
p;20;NSSegmentedControl.jt;4192;@STATIC;1.0;I;27;AppKit/CPSegmentedControl.jt;4141;
objj_executeFile("AppKit/CPSegmentedControl.j",NO);
var _1=objj_getClass("CPSegmentedControl");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPSegmentedControl\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_segments=[];
_themeStates=[];
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPSegmentedControl").super_class},"NS_initWithCoder:",_5)){
var _6=objj_msgSend(_3,"frame"),_7=_6.size.width;
_6.size.width=0;
_6.origin.x=MAX(_6.origin.x-4,0);
objj_msgSend(_3,"setFrame:",_6);
var _8=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_segments=objj_msgSend(_8,"segments");
_selectedSegment=objj_msgSend(_8,"selectedSegment");
_segmentStyle=objj_msgSend(_8,"segmentStyle");
_trackingMode=objj_msgSend(_8,"trackingMode");
objj_msgSend(_3,"setValue:forThemeAttribute:",CPCenterTextAlignment,"alignment");
for(var i=0;i<_segments.length;i++){
_themeStates[i]=_segments[i].selected?CPThemeStateSelected:CPThemeStateNormal;
objj_msgSend(_3,"tileWithChangedSegment:",i);
}
_6.size.width=_7;
objj_msgSend(_3,"setFrame:",_6);
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPSegmentedControl,"NSSegmentedControl"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_9,_a,_b){
with(_9){
return objj_msgSend(_9,"NS_initWithCoder:",_b);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_c,_d){
with(_c){
return objj_msgSend(CPSegmentedControl,"class");
}
})]);
var _1=objj_allocateClassPair(NSActionCell,"NSSegmentedCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_segments"),new objj_ivar("_selectedSegment"),new objj_ivar("_segmentStyle"),new objj_ivar("_trackingMode")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("segments"),function(_e,_f){
with(_e){
return _segments;
}
}),new objj_method(sel_getUid("selectedSegment"),function(_10,_11){
with(_10){
return _selectedSegment;
}
}),new objj_method(sel_getUid("segmentStyle"),function(_12,_13){
with(_12){
return _segmentStyle;
}
}),new objj_method(sel_getUid("trackingMode"),function(_14,_15){
with(_14){
return _trackingMode;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_16,_17,_18){
with(_16){
if(_16=objj_msgSendSuper({receiver:_16,super_class:objj_getClass("NSSegmentedCell").super_class},"initWithCoder:",_18)){
_segments=objj_msgSend(_18,"decodeObjectForKey:","NSSegmentImages");
_selectedSegment=objj_msgSend(_18,"decodeObjectForKey:","NSSelectedSegment");
if(_selectedSegment===nil){
_selectedSegment=-1;
}
_segmentStyle=objj_msgSend(_18,"decodeIntForKey:","NSSegmentStyle");
_trackingMode=objj_msgSend(_18,"decodeIntForKey:","NSTrackingMode");
if(_trackingMode==CPSegmentSwitchTrackingSelectOne&&_selectedSegment==-1){
_selectedSegment=0;
}
}
return _16;
}
})]);
var _1=objj_getClass("_CPSegmentItem");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"_CPSegmentItem\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_19,_1a,_1b){
with(_19){
if(_19=objj_msgSendSuper({receiver:_19,super_class:objj_getClass("_CPSegmentItem").super_class},"init")){
image=objj_msgSend(_1b,"decodeObjectForKey:","NSSegmentItemImage");
label=objj_msgSend(_1b,"decodeObjectForKey:","NSSegmentItemLabel");
menu=objj_msgSend(_1b,"decodeObjectForKey:","NSSegmentItemMenu");
selected=objj_msgSend(_1b,"decodeBoolForKey:","NSSegmentItemSelected");
enabled=!objj_msgSend(_1b,"decodeBoolForKey:","NSSegmentItemDisabled");
tag=objj_msgSend(_1b,"decodeIntForKey:","NSSegmentItemTag");
width=objj_msgSend(_1b,"decodeIntForKey:","NSSegmentItemWidth");
frame=CGRectMakeZero();
}
return _19;
}
})]);
var _1=objj_allocateClassPair(_CPSegmentItem,"NSSegmentItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_1c,_1d,_1e){
with(_1c){
return objj_msgSend(_1c,"NS_initWithCoder:",_1e);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_1f,_20){
with(_1f){
return objj_msgSend(_CPSegmentItem,"class");
}
})]);
p;7;NSSet.jt;558;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;Foundation/CPSet.jt;491;
objj_executeFile("Foundation/CPObject.j",NO);
objj_executeFile("Foundation/CPSet.j",NO);
var _1=objj_allocateClassPair(CPObject,"NSSet"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSend(objj_msgSend(CPSet,"alloc"),"initWithArray:",objj_msgSend(_5,"decodeObjectForKey:","NS.objects"));
}
})]);
var _1=objj_allocateClassPair(NSSet,"NSMutableSet"),_2=_1.isa;
objj_registerClassPair(_1);
p;10;NSSlider.jt;2631;@STATIC;1.0;I;17;AppKit/CPSlider.jt;2590;
objj_executeFile("AppKit/CPSlider.j",NO);
var _1=objj_getClass("CPSlider");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPSlider\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_minValue=objj_msgSend(_6,"minValue");
_maxValue=objj_msgSend(_6,"maxValue");
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPSlider").super_class},"NS_initWithCoder:",_5);
if(_3){
_altIncrementValue=objj_msgSend(_6,"altIncrementValue");
objj_msgSend(_3,"setSliderType:",objj_msgSend(_6,"sliderType"));
if(objj_msgSend(_3,"sliderType")===CPCircularSlider){
var _7=objj_msgSend(_3,"frame");
objj_msgSend(_3,"setFrameSize:",CGSizeMake(_7.size.width+4,_7.size.height+2));
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPSlider,"NSSlider"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_8,_9,_a){
with(_8){
return objj_msgSend(_8,"NS_initWithCoder:",_a);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_b,_c){
with(_b){
return objj_msgSend(CPSlider,"class");
}
})]);
var _1=objj_allocateClassPair(NSCell,"NSSliderCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_minValue"),new objj_ivar("_maxValue"),new objj_ivar("_altIncrementValue"),new objj_ivar("_vertical"),new objj_ivar("_sliderType")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("minValue"),function(_d,_e){
with(_d){
return _minValue;
}
}),new objj_method(sel_getUid("maxValue"),function(_f,_10){
with(_f){
return _maxValue;
}
}),new objj_method(sel_getUid("altIncrementValue"),function(_11,_12){
with(_11){
return _altIncrementValue;
}
}),new objj_method(sel_getUid("isVertical"),function(_13,_14){
with(_13){
return _vertical;
}
}),new objj_method(sel_getUid("sliderType"),function(_15,_16){
with(_15){
return _sliderType;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_17,_18,_19){
with(_17){
_17=objj_msgSendSuper({receiver:_17,super_class:objj_getClass("NSSliderCell").super_class},"initWithCoder:",_19);
if(_17){
_objectValue=objj_msgSend(_19,"decodeDoubleForKey:","NSValue");
_minValue=objj_msgSend(_19,"decodeDoubleForKey:","NSMinValue");
_maxValue=objj_msgSend(_19,"decodeDoubleForKey:","NSMaxValue");
_altIncrementValue=objj_msgSend(_19,"decodeDoubleForKey:","NSAltIncValue");
_isVertical=objj_msgSend(_19,"decodeBoolForKey:","NSVertical");
_sliderType=objj_msgSend(_19,"decodeIntForKey:","NSSliderType");
}
return _17;
}
})]);
p;18;NSSortDescriptor.jt;1079;@STATIC;1.0;I;29;Foundation/CPSortDescriptor.jt;1026;
objj_executeFile("Foundation/CPSortDescriptor.j",NO);
var _1=objj_getClass("CPSortDescriptor");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPSortDescriptor\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPSortDescriptor").super_class},"init")){
_key=objj_msgSend(_5,"decodeObjectForKey:","NSKey");
_selector=CPSelectorFromString(objj_msgSend(_5,"decodeObjectForKey:","NSSelector"));
_ascending=objj_msgSend(_5,"decodeBoolForKey:","NSAscending");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPSortDescriptor,"NSSortDescriptor"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPSortDescriptor,"class");
}
})]);
p;13;NSSplitView.jt;1066;@STATIC;1.0;I;20;AppKit/CPSplitView.jt;1022;
objj_executeFile("AppKit/CPSplitView.j",NO);
var _1=2;
var _2=objj_getClass("CPSplitView");
if(!_2){
throw new SyntaxError("*** Could not find definition for class \"CPSplitView\"");
}
var _3=_2.isa;
class_addMethods(_2,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_4,_5,_6){
with(_4){
if(_4=objj_msgSendSuper({receiver:_4,super_class:objj_getClass("CPSplitView").super_class},"NS_initWithCoder:",_6)){
_isVertical=objj_msgSend(_6,"decodeBoolForKey:","NSIsVertical");
_isPaneSplitter=objj_msgSend(_6,"decodeIntForKey:","NSDividerStyle")!=_1;
_autosaveName=objj_msgSend(_6,"decodeObjectForKey:","NSAutosaveName");
}
return _4;
}
})]);
var _2=objj_allocateClassPair(CPSplitView,"NSSplitView"),_3=_2.isa;
objj_registerClassPair(_2);
class_addMethods(_2,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPSplitView,"class");
}
})]);
p;11;NSStepper.jt;2495;@STATIC;1.0;I;18;AppKit/CPStepper.jt;2453;
objj_executeFile("AppKit/CPStepper.j",NO);
var _1=objj_getClass("CPStepper");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPStepper\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPStepper").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_minValue=objj_msgSend(_6,"minValue");
_maxValue=objj_msgSend(_6,"maxValue");
_increment=objj_msgSend(_6,"increment");
_valueWraps=objj_msgSend(_6,"valueWraps");
_autorepeat=objj_msgSend(_6,"autorepeat");
_objectValue=objj_msgSend(_6,"objectValue");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPStepper,"NSStepper"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPStepper,"class");
}
})]);
var _1=objj_allocateClassPair(NSCell,"NSStepperCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_minValue"),new objj_ivar("_maxValue"),new objj_ivar("_increment"),new objj_ivar("_valueWraps"),new objj_ivar("_autorepeat")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("minValue"),function(_c,_d){
with(_c){
return _minValue;
}
}),new objj_method(sel_getUid("maxValue"),function(_e,_f){
with(_e){
return _maxValue;
}
}),new objj_method(sel_getUid("increment"),function(_10,_11){
with(_10){
return _increment;
}
}),new objj_method(sel_getUid("valueWraps"),function(_12,_13){
with(_12){
return _valueWraps;
}
}),new objj_method(sel_getUid("autorepeat"),function(_14,_15){
with(_14){
return _autorepeat;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_16,_17,_18){
with(_16){
_16=objj_msgSendSuper({receiver:_16,super_class:objj_getClass("NSStepperCell").super_class},"initWithCoder:",_18);
if(_16){
_objectValue=objj_msgSend(_18,"decodeDoubleForKey:","NSValue");
_minValue=objj_msgSend(_18,"decodeDoubleForKey:","NSMinValue");
_maxValue=objj_msgSend(_18,"decodeDoubleForKey:","NSMaxValue");
_increment=objj_msgSend(_18,"decodeDoubleForKey:","NSIncrement");
_valueWraps=objj_msgSend(_18,"decodeBoolForKey:","NSValueWraps");
_autorepeat=objj_msgSend(_18,"decodeBoolForKey:","NSAutorepeat");
}
return _16;
}
})]);
p;15;NSTableColumn.jt;3980;@STATIC;1.0;I;22;AppKit/CPTableColumn.jI;26;AppKit/CPTableHeaderView.jI;17;AppKit/CPButton.jt;3881;
objj_executeFile("AppKit/CPTableColumn.j",NO);
objj_executeFile("AppKit/CPTableHeaderView.j",NO);
objj_executeFile("AppKit/CPButton.j",NO);
var _1=objj_getClass("CPTableColumn");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTableColumn\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSend(_3,"init");
if(_3){
_identifier=objj_msgSend(_5,"decodeObjectForKey:","NSIdentifier");
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSDataCell");
if(objj_msgSend(_6,"isKindOfClass:",objj_msgSend(NSImageCell,"class"))){
_dataView=objj_msgSend(objj_msgSend(CPImageView,"alloc"),"initWithFrame:",CGRectMakeZero());
objj_msgSend(_dataView,"setImageScaling:",objj_msgSend(_6,"imageScaling"));
objj_msgSend(_dataView,"setImageAlignment:",objj_msgSend(_6,"imageAlignment"));
}else{
if(objj_msgSend(_6,"isKindOfClass:",objj_msgSend(NSTextFieldCell,"class"))){
_dataView=objj_msgSend(objj_msgSend(CPTextField,"alloc"),"initWithFrame:",CPRectMakeZero());
var _7=objj_msgSend(_6,"font"),_8=nil;
if(_7){
_7=objj_msgSend(_7,"cibFontForNibFont");
}
if(!_7){
_7=objj_msgSend(CPFont,"systemFontOfSize:",objj_msgSend(CPFont,"systemFontSize"));
}
var _8=objj_msgSend(CPFont,"boldFontWithName:size:",objj_msgSend(_7,"familyName"),objj_msgSend(_7,"size"));
objj_msgSend(_dataView,"setFont:",_7);
objj_msgSend(_dataView,"setValue:forThemeAttribute:inState:",_8,"font",CPThemeStateSelectedDataView);
objj_msgSend(_dataView,"setLineBreakMode:",CPLineBreakByTruncatingTail);
objj_msgSend(_dataView,"setValue:forThemeAttribute:",CPCenterVerticalTextAlignment,"vertical-alignment");
objj_msgSend(_dataView,"setValue:forThemeAttribute:",CGInsetMake(0,5,0,5),"content-inset");
var _9=objj_msgSend(_6,"textColor"),_a=objj_msgSend(_dataView,"currentValueForThemeAttribute:","text-color");
if(!objj_msgSend(_9,"isEqual:",_a)){
objj_msgSend(_dataView,"setTextColor:",objj_msgSend(_6,"textColor"));
}
}else{
if(objj_msgSend(_6,"isKindOfClass:",objj_msgSend(NSButtonCell,"class"))){
_dataView=objj_msgSend(objj_msgSend(CPButton,"alloc"),"initWithFrame:",CGRectMakeZero());
_dataView=objj_msgSend(_dataView,"NS_initWithCell:",_6);
}else{
if(objj_msgSend(_6,"isKindOfClass:",objj_msgSend(NSLevelIndicatorCell,"class"))){
_dataView=objj_msgSend(objj_msgSend(CPLevelIndicator,"alloc"),"initWithFrame:",CGRectMakeZero());
_dataView=objj_msgSend(_dataView,"NS_initWithCell:",_6);
}
}
}
}
objj_msgSend(_dataView,"setValue:forThemeAttribute:",objj_msgSend(_6,"alignment"),"alignment");
var _b=objj_msgSend(_5,"decodeObjectForKey:","NSHeaderCell"),_c=objj_msgSend(objj_msgSend(_CPTableColumnHeaderView,"alloc"),"initWithFrame:",CPRectMakeZero());
objj_msgSend(_c,"setStringValue:",objj_msgSend(_b,"objectValue"));
objj_msgSend(_c,"setValue:forThemeAttribute:",objj_msgSend(_6,"alignment"),"text-alignment");
objj_msgSend(_3,"setHeaderView:",_c);
_width=objj_msgSend(_5,"decodeFloatForKey:","NSWidth");
_minWidth=objj_msgSend(_5,"decodeFloatForKey:","NSMinWidth");
_maxWidth=objj_msgSend(_5,"decodeFloatForKey:","NSMaxWidth");
_resizingMask=objj_msgSend(_5,"decodeIntForKey:","NSResizingMask");
_isHidden=objj_msgSend(_5,"decodeBoolForKey:","NSHidden");
_isEditable=objj_msgSend(_5,"decodeBoolForKey:","NSIsEditable");
_sortDescriptorPrototype=objj_msgSend(_5,"decodeObjectForKey:","NSSortDescriptorPrototype");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTableColumn,"NSTableColumn"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_d,_e,_f){
with(_d){
return objj_msgSend(_d,"NS_initWithCoder:",_f);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_10,_11){
with(_10){
return objj_msgSend(CPTableColumn,"class");
}
})]);
var _1=objj_allocateClassPair(NSActionCell,"NSTableHeaderCell"),_2=_1.isa;
objj_registerClassPair(_1);
p;19;NSTableHeaderView.jt;1061;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jt;1011;
objj_executeFile("AppKit/CPTableHeaderView.j",NO);
var _1=objj_getClass("CPTableHeaderView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTableHeaderView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTableHeaderView").super_class},"NS_initWithCoder:",_5)){
_tableView=objj_msgSend(_5,"decodeObjectForKey:","NSTableView");
if(_bounds.size.height===17){
_bounds.size.height=23;
_frame.size.height=23;
}
_drawsColumnLines=YES;
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTableHeaderView,"NSTableHeaderView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPTableHeaderView,"class");
}
})]);
p;13;NSTableView.jt;2487;@STATIC;1.0;I;20;AppKit/CPTableView.jt;2443;
objj_executeFile("AppKit/CPTableView.j",NO);
var _1=objj_getClass("CPTableView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTableView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTableView").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeIntForKey:","NSTvFlags");
_rowHeight=objj_msgSend(_5,"decodeFloatForKey:","NSRowHeight");
if(_rowHeight==17){
_rowHeight=23;
}
_headerView=objj_msgSend(_5,"decodeObjectForKey:","NSHeaderView");
_cornerView=_headerView?objj_msgSend(_5,"decodeObjectForKey:","NSCornerView"):nil;
objj_msgSend(_cornerView,"setHidden:",NO);
_autosaveName=objj_msgSend(_5,"decodeObjectForKey:","NSAutosaveName");
_tableColumns=objj_msgSend(_5,"decodeObjectForKey:","NSTableColumns");
objj_msgSend(_tableColumns,"makeObjectsPerformSelector:withObject:",sel_getUid("setTableView:"),_3);
_intercellSpacing=CGSizeMake(objj_msgSend(_5,"decodeFloatForKey:","NSIntercellSpacingWidth"),objj_msgSend(_5,"decodeFloatForKey:","NSIntercellSpacingHeight"));
objj_msgSend(_3,"setValue:forThemeAttribute:",objj_msgSend(_5,"decodeObjectForKey:","NSGridColor"),"grid-color");
_gridStyleMask=objj_msgSend(_5,"decodeIntForKey:","NSGridStyleMask");
_usesAlternatingRowBackgroundColors=(_6&8388608)?YES:NO;
_alternatingRowBackgroundColors=[objj_msgSend(CPColor,"whiteColor"),objj_msgSend(CPColor,"colorWithHexString:","e4e7ff")];
_selectionHighlightStyle=objj_msgSend(_5,"decodeIntForKey:","NSTableViewSelectionHighlightStyle");
_columnAutoResizingStyle=objj_msgSend(_5,"decodeIntForKey:","NSColumnAutoresizingStyle");
_allowsMultipleSelection=(_6&134217728)?YES:NO;
_allowsEmptySelection=(_6&268435456)?YES:NO;
_allowsColumnSelection=(_6&67108864)?YES:NO;
_allowsColumnResizing=(_6&1073741824)?YES:NO;
_allowsColumnReordering=(_6&2147483648)?YES:NO;
objj_msgSend(_3,"setBackgroundColor:",objj_msgSend(_5,"decodeObjectForKey:","NSBackgroundColor"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTableView,"NSTableView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPTableView,"class");
}
})]);
p;11;NSTabView.jt;1198;@STATIC;1.0;I;18;AppKit/CPTabView.ji;15;NSTabViewItem.jt;1136;
objj_executeFile("AppKit/CPTabView.j",NO);
objj_executeFile("NSTabViewItem.j",YES);
var _1=objj_getClass("CPTabView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTabView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTabView").super_class},"NS_initWithCoder:",_5)){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSTvFlags");
_type=_6&7;
_items=objj_msgSend(_5,"decodeObjectForKey:","NSTabViewItems");
_selectedIndex=objj_msgSend(_items,"indexOfObject:",objj_msgSend(_5,"decodeObjectForKey:","NSSelectedTabViewItem"));
_font=objj_msgSend(_5,"decodeObjectForKey:","NSFont");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTabView,"NSTabView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPTabView,"class");
}
})]);
p;15;NSTabViewItem.jt;1024;@STATIC;1.0;I;22;AppKit/CPTabViewItem.jt;979;
objj_executeFile("AppKit/CPTabViewItem.j",NO);
var _1=objj_getClass("CPTabViewItem");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTabViewItem\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTabViewItem").super_class},"init")){
_identifier=objj_msgSend(_5,"decodeObjectForKey:","NSIdentifier");
_label=objj_msgSend(_5,"decodeObjectForKey:","NSLabel");
_view=objj_msgSend(_5,"decodeObjectForKey:","NSView");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTabViewItem,"NSTabViewItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPTabViewItem,"class");
}
})]);
p;13;NSTextField.jt;4137;@STATIC;1.0;I;20;AppKit/CPTextField.ji;11;NSControl.ji;8;NSCell.jI;15;AppKit/CPFont.jt;4045;
objj_executeFile("AppKit/CPTextField.j",NO);
objj_executeFile("NSControl.j",YES);
objj_executeFile("NSCell.j",YES);
objj_executeFile("AppKit/CPFont.j",NO);
var _1=objj_getClass("CPTextField");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTextField\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTextField").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
objj_msgSend(_3,"sendActionOn:",CPKeyUpMask|CPKeyDownMask);
objj_msgSend(_3,"setEditable:",objj_msgSend(_6,"isEditable"));
objj_msgSend(_3,"setSelectable:",objj_msgSend(_6,"isSelectable"));
objj_msgSend(_3,"setBordered:",objj_msgSend(_6,"isBordered"));
objj_msgSend(_3,"setBezeled:",objj_msgSend(_6,"isBezeled"));
objj_msgSend(_3,"setBezelStyle:",objj_msgSend(_6,"bezelStyle"));
objj_msgSend(_3,"setDrawsBackground:",objj_msgSend(_6,"drawsBackground"));
objj_msgSend(_3,"setLineBreakMode:",objj_msgSend(_6,"lineBreakMode"));
objj_msgSend(_3,"setAlignment:",objj_msgSend(_6,"alignment"));
objj_msgSend(_3,"setTextFieldBackgroundColor:",objj_msgSend(_6,"backgroundColor"));
objj_msgSend(_3,"setPlaceholderString:",objj_msgSend(_6,"placeholderString"));
var _7=objj_msgSend(_6,"textColor"),_8=objj_msgSend(_3,"currentValueForThemeAttribute:","text-color");
if(!objj_msgSend(_7,"isEqual:",_8)){
objj_msgSend(_3,"setTextColor:",objj_msgSend(_6,"textColor"));
}
var _9=objj_msgSend(_3,"frame");
if(objj_msgSend(_3,"isBezeled")){
objj_msgSend(_3,"setFrameOrigin:",CGPointMake(_9.origin.x-6,_9.origin.y-3));
objj_msgSend(_3,"setFrameSize:",CGSizeMake(_9.size.width+8,_9.size.height+7));
}else{
objj_msgSend(_3,"setFrame:",CGRectInset(_9,3,0));
objj_msgSend(_3,"setFrameOrigin:",CGPointMake(_9.origin.x,_9.origin.y-1));
}
CPLog.debug("NSTextField: title=\""+objj_msgSend(_3,"stringValue")+"\", placeholder="+(objj_msgSend(_6,"placeholderString")==null?"<none>":"\""+objj_msgSend(_6,"placeholderString")+"\"")+", isBordered="+objj_msgSend(_3,"isBordered")+", isBezeled="+objj_msgSend(_3,"isBezeled")+", bezelStyle="+objj_msgSend(_3,"bezelStyle"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPTextField,"NSTextField"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(CPTextField,"class");
}
})]);
var _1=objj_allocateClassPair(NSCell,"NSTextFieldCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_bezelStyle"),new objj_ivar("_drawsBackground"),new objj_ivar("_backgroundColor"),new objj_ivar("_textColor"),new objj_ivar("_placeholderString")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("bezelStyle"),function(_f,_10){
with(_f){
return _bezelStyle;
}
}),new objj_method(sel_getUid("drawsBackground"),function(_11,_12){
with(_11){
return _drawsBackground;
}
}),new objj_method(sel_getUid("backgroundColor"),function(_13,_14){
with(_13){
return _backgroundColor;
}
}),new objj_method(sel_getUid("textColor"),function(_15,_16){
with(_15){
return _textColor;
}
}),new objj_method(sel_getUid("placeholderString"),function(_17,_18){
with(_17){
return _placeholderString;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_19,_1a,_1b){
with(_19){
_19=objj_msgSendSuper({receiver:_19,super_class:objj_getClass("NSTextFieldCell").super_class},"initWithCoder:",_1b);
if(_19){
_bezelStyle=objj_msgSend(_1b,"decodeObjectForKey:","NSTextBezelStyle")||CPTextFieldSquareBezel;
_drawsBackground=objj_msgSend(_1b,"decodeBoolForKey:","NSDrawsBackground");
_backgroundColor=objj_msgSend(_1b,"decodeObjectForKey:","NSBackgroundColor");
_textColor=objj_msgSend(_1b,"decodeObjectForKey:","NSTextColor");
_placeholderString=objj_msgSend(_1b,"decodeObjectForKey:","NSPlaceholderString");
}
return _19;
}
})]);
p;14;NSTokenField.jt;1830;@STATIC;1.0;I;21;AppKit/CPTokenField.ji;11;NSControl.ji;8;NSCell.ji;13;NSTextField.jI;15;AppKit/CPFont.jt;1719;
objj_executeFile("AppKit/CPTokenField.j",NO);
objj_executeFile("NSControl.j",YES);
objj_executeFile("NSCell.j",YES);
objj_executeFile("NSTextField.j",YES);
objj_executeFile("AppKit/CPFont.j",NO);
var _1=objj_getClass("CPTokenField");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPTokenField\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPTokenField").super_class},"NS_initWithCoder:",_5);
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSCell");
_3=objj_msgSend(_3,"NS_initWithCell:",_6);
}
return _3;
}
}),new objj_method(sel_getUid("NS_initWithCell:"),function(_7,_8,_9){
with(_7){
return _7;
}
})]);
var _1=objj_allocateClassPair(CPTokenField,"NSTokenField"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(CPTokenField,"class");
}
})]);
var _1=objj_allocateClassPair(NSTextFieldCell,"NSTokenFieldCell"),_2=_1.isa;
class_addIvars(_1,[new objj_ivar("_tokenStyle")]);
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("tokenStyle"),function(_f,_10){
with(_f){
return _tokenStyle;
}
}),new objj_method(sel_getUid("initWithCoder:"),function(_11,_12,_13){
with(_11){
_11=objj_msgSendSuper({receiver:_11,super_class:objj_getClass("NSTokenFieldCell").super_class},"initWithCoder:",_13);
if(_11){
_tokenStyle=objj_msgSend(_13,"decodeIntForKey:","NSTokenStyle");
}
return _11;
}
})]);
p;11;NSToolbar.jt;1986;@STATIC;1.0;I;18;AppKit/CPToolbar.ji;15;NSToolbarItem.jt;1924;
objj_executeFile("AppKit/CPToolbar.j",NO);
objj_executeFile("NSToolbarItem.j",YES);
var _1=objj_getClass("CPToolbar");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPToolbar\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(_3){
_identifier=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarIdentifier");
_displayMode=objj_msgSend(_5,"decodeIntForKey:","NSToolbarDisplayMode");
_showsBaselineSeparator=objj_msgSend(_5,"decodeBoolForKey:","NSToolbarShowsBaselineSeparator");
_allowsUserCustomization=objj_msgSend(_5,"decodeBoolForKey:","NSToolbarAllowsUserCustomization");
_isVisible=objj_msgSend(_5,"decodeBoolForKey:","NSToolbarPrefersToBeShown");
_identifiedItems=objj_msgSend(CPMutableDictionary,"dictionary");
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarIBIdentifiedItems"),_7=nil,_8=objj_msgSend(_6,"keyEnumerator");
while((_7=objj_msgSend(_8,"nextObject"))!==nil){
var _9=NS_CPToolbarItemIdentifierMap[_7]||_7;
objj_msgSend(_identifiedItems,"setObject:forKey:",objj_msgSend(_6,"objectForKey:",_7),_9);
}
_defaultItems=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarIBDefaultItems");
_allowedItems=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarIBAllowedItems");
_selectableItems=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarIBSelectableItems");
_sizeMode=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarSizeMode")||CPToolbarSizeModeDefault;
_delegate=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarDelegate");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPToolbar,"NSToolbar"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_a,_b,_c){
with(_a){
return objj_msgSend(_a,"NS_initWithCoder:",_c);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_d,_e){
with(_d){
return objj_msgSend(CPToolbar,"class");
}
})]);
p;28;NSToolbarFlexibleSpaceItem.jt;414;@STATIC;1.0;I;36;AppKit/_CPToolbarFlexibleSpaceItem.jt;355;
objj_executeFile("AppKit/_CPToolbarFlexibleSpaceItem.j",NO);
var _1=objj_allocateClassPair(_CPToolbarFlexibleSpaceItem,"NSToolbarFlexibleSpaceItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("classForKeyedArchiver"),function(_3,_4){
with(_3){
return objj_msgSend(_CPToolbarFlexibleSpaceItem,"class");
}
})]);
p;15;NSToolbarItem.jt;2932;@STATIC;1.0;I;22;AppKit/CPToolbarItem.jt;2886;
objj_executeFile("AppKit/CPToolbarItem.j",NO);
NS_CPToolbarItemIdentifierMap={"NSToolbarSeparatorItem":CPToolbarSeparatorItemIdentifier,"NSToolbarSpaceItem":CPToolbarSpaceItemIdentifier,"NSToolbarFlexibleSpaceItem":CPToolbarFlexibleSpaceItemIdentifier,"NSToolbarShowColorsItem":CPToolbarShowColorsItemIdentifier,"NSToolbarShowFontsItem":CPToolbarShowFontsItemIdentifier,"NSToolbarCustomizeToolbarItem":CPToolbarCustomizeToolbarItemIdentifier,"NSToolbarPrintItem":CPToolbarPrintItemIdentifier};
var _1=objj_getClass("CPToolbarItem");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPToolbarItem\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPToolbarItem").super_class},"init");
if(_3){
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemIdentifier");
_itemIdentifier=NS_CPToolbarItemIdentifierMap[_6]||_6;
_minSize=objj_msgSend(_5,"decodeSizeForKey:","NSToolbarItemMinSize");
_maxSize=objj_msgSend(_5,"decodeSizeForKey:","NSToolbarItemMaxSize");
objj_msgSend(_3,"setLabel:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemLabel"));
objj_msgSend(_3,"setPaletteLabel:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemPaletteLabel"));
objj_msgSend(_3,"setToolTip:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemToolTip"));
objj_msgSend(_3,"setTag:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemTag"));
objj_msgSend(_3,"setTarget:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemTarget"));
objj_msgSend(_3,"setAction:",CPSelectorFromString(objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemAction")));
objj_msgSend(_3,"setEnabled:",objj_msgSend(_5,"decodeBoolForKey:","NSToolbarItemEnabled"));
objj_msgSend(_3,"setImage:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemImage"));
if(_maxSize.height>0){
_maxSize.height=MIN(_maxSize.height,32);
}
if(_minSize.height>0){
_minSize.height=MIN(_minSize.height,32);
}
objj_msgSend(_3,"setView:",objj_msgSend(_5,"decodeObjectForKey:","NSToolbarItemView"));
if(objj_msgSend(_view,"isKindOfClass:",CPSearchField)&&_maxSize.height==22){
_maxSize.height=objj_msgSend(_view,"frameSize").height;
_minSize.height=_maxSize.height;
}
objj_msgSend(_3,"setVisibilityPriority:",objj_msgSend(_5,"decodeIntForKey:","NSToolbarItemVisibilityPriority"));
objj_msgSend(_3,"setAutovalidates:",objj_msgSend(_5,"decodeBoolForKey:","NSToolbarItemAutovalidates"));
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPToolbarItem,"NSToolbarItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPToolbarItem,"class");
}
})]);
p;24;NSToolbarSeparatorItem.jt;394;@STATIC;1.0;I;32;AppKit/_CPToolbarSeparatorItem.jt;339;
objj_executeFile("AppKit/_CPToolbarSeparatorItem.j",NO);
var _1=objj_allocateClassPair(_CPToolbarSeparatorItem,"NSToolbarSeparatorItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("classForKeyedArchiver"),function(_3,_4){
with(_3){
return objj_msgSend(_CPToolbarSeparatorItem,"class");
}
})]);
p;25;NSToolbarShowColorsItem.jt;399;@STATIC;1.0;I;33;AppKit/_CPToolbarShowColorsItem.jt;343;
objj_executeFile("AppKit/_CPToolbarShowColorsItem.j",NO);
var _1=objj_allocateClassPair(_CPToolbarShowColorsItem,"NSToolbarShowColorsItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("classForKeyedArchiver"),function(_3,_4){
with(_3){
return objj_msgSend(_CPToolbarShowColorsItem,"class");
}
})]);
p;20;NSToolbarSpaceItem.jt;374;@STATIC;1.0;I;28;AppKit/_CPToolbarSpaceItem.jt;323;
objj_executeFile("AppKit/_CPToolbarSpaceItem.j",NO);
var _1=objj_allocateClassPair(_CPToolbarSpaceItem,"NSToolbarSpaceItem"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("classForKeyedArchiver"),function(_3,_4){
with(_3){
return objj_msgSend(_CPToolbarSpaceItem,"class");
}
})]);
p;26;NSUserDefaultsController.jt;1233;@STATIC;1.0;I;33;AppKit/CPUserDefaultsController.jt;1176;
objj_executeFile("AppKit/CPUserDefaultsController.j",NO);
var _1=objj_getClass("CPUserDefaultsController");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPUserDefaultsController\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
if(objj_msgSend(_5,"decodeBoolForKey:","NSSharedInstance")){
return objj_msgSend(CPUserDefaultsController,"sharedUserDefaultsController");
}
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPUserDefaultsController").super_class},"NS_initWithCoder:",_5);
if(_3){
objj_msgSend(CPException,"raise:reason:",CPUnsupportedMethodException,"decoding of non-shared NSUserDefaultsController not implemented");
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPUserDefaultsController,"NSUserDefaultsController"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPUserDefaultsController,"class");
}
})]);
p;8;NSView.jt;1824;@STATIC;1.0;I;15;AppKit/CPView.jt;1785;
objj_executeFile("AppKit/CPView.j",NO);
var _1=63,_2=1<<8,_3=1<<31;
var _4=objj_getClass("CPView");
if(!_4){
throw new SyntaxError("*** Could not find definition for class \"CPView\"");
}
var _5=_4.isa;
class_addMethods(_4,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_6,_7,_8){
with(_6){
_frame=CGRectMakeZero();
if(objj_msgSend(_8,"containsValueForKey:","NSFrame")){
_frame=objj_msgSend(_8,"decodeRectForKey:","NSFrame");
}else{
if(objj_msgSend(_8,"containsValueForKey:","NSFrameSize")){
_frame.size=objj_msgSend(_8,"decodeSizeForKey:","NSFrameSize");
}
}
_6=objj_msgSendSuper({receiver:_6,super_class:objj_getClass("CPView").super_class},"NS_initWithCoder:",_8);
if(_6){
_tag=objj_msgSend(_8,"decodeIntForKey:","NSTag");
_bounds=CGRectMake(0,0,CGRectGetWidth(_frame),CGRectGetHeight(_frame));
_window=objj_msgSend(_8,"decodeObjectForKey:","NSWindow");
_superview=objj_msgSend(_8,"decodeObjectForKey:","NSSuperview");
_subviews=objj_msgSend(_8,"decodeObjectForKey:","NSSubviews");
if(!_subviews){
_subviews=[];
}
var _9=objj_msgSend(_8,"decodeIntForKey:","NSvFlags");
_autoresizingMask=_9&_1;
_autoresizesSubviews=_9&_2;
_hitTests=YES;
_isHidden=_9&_3;
_opacity=1;
_themeClass=objj_msgSend(_6,"themeClass");
_themeAttributes={};
_themeState=CPThemeStateNormal;
objj_msgSend(_6,"_loadThemeAttributes");
}
return _6;
}
}),new objj_method(sel_getUid("NS_isFlipped"),function(_a,_b){
with(_a){
return NO;
}
})]);
var _4=objj_allocateClassPair(CPView,"NSView"),_5=_4.isa;
objj_registerClassPair(_4);
class_addMethods(_4,[new objj_method(sel_getUid("initWithCoder:"),function(_c,_d,_e){
with(_c){
return objj_msgSend(_c,"NS_initWithCoder:",_e);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_f,_10){
with(_f){
return objj_msgSend(CPView,"class");
}
})]);
p;18;NSViewController.jt;1145;@STATIC;1.0;I;25;AppKit/CPViewController.jt;1096;
objj_executeFile("AppKit/CPViewController.j",NO);
var _1=objj_getClass("CPViewController");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPViewController\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
_3=objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPViewController").super_class},"NS_initWithCoder:",_5);
if(_3){
_title=objj_msgSend(_5,"decodeObjectForKey:","NSTitle");
_cibName=objj_msgSend(_5,"decodeObjectForKey:","NSNibName");
var _6=objj_msgSend(_5,"decodeObjectForKey:","NSNibBundleIdentifier");
if(_6){
_cibBundle=objj_msgSend(CPBundle,"bundleWithPath:",_6);
}
}
return _3;
}
})]);
var _1=objj_allocateClassPair(CPViewController,"NSViewController"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_7,_8,_9){
with(_7){
return objj_msgSend(_7,"NS_initWithCoder:",_9);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_a,_b){
with(_a){
return objj_msgSend(CPViewController,"class");
}
})]);
p;18;NSWindowTemplate.jt;2493;@STATIC;1.0;I;29;AppKit/_CPCibWindowTemplate.jt;2440;
objj_executeFile("AppKit/_CPCibWindowTemplate.j",NO);
var _1=0,_2=1,_3=2,_4=4,_5=8,_6=16,_7=64,_8=256,_9=8192,_a=2048;
var _b=objj_getClass("_CPCibWindowTemplate");
if(!_b){
throw new SyntaxError("*** Could not find definition for class \"_CPCibWindowTemplate\"");
}
var _c=_b.isa;
class_addMethods(_b,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_d,_e,_f){
with(_d){
_d=objj_msgSendSuper({receiver:_d,super_class:objj_getClass("_CPCibWindowTemplate").super_class},"init");
if(_d){
if(objj_msgSend(_f,"containsValueForKey:","NSMinSize")){
_minSize=objj_msgSend(_f,"decodeSizeForKey:","NSMinSize");
}
if(objj_msgSend(_f,"containsValueForKey:","NSMaxSize")){
_maxSize=objj_msgSend(_f,"decodeSizeForKey:","NSMaxSize");
}
_screenRect=objj_msgSend(_f,"decodeRectForKey:","NSScreenRect");
_viewClass=objj_msgSend(_f,"decodeObjectForKey:","NSViewClass");
_wtFlags=objj_msgSend(_f,"decodeIntForKey:","NSWTFlags");
_windowAutorecalculatesKeyViewLoop=!!(_wtFlags&_a);
_windowBacking=objj_msgSend(_f,"decodeIntForKey:","NSWindowBacking");
_windowClass=CP_NSMapClassName(objj_msgSend(_f,"decodeObjectForKey:","NSWindowClass"));
_windowRect=objj_msgSend(_f,"decodeRectForKey:","NSWindowRect");
_windowStyleMask=objj_msgSend(_f,"decodeIntForKey:","NSWindowStyleMask");
_windowTitle=objj_msgSend(_f,"decodeObjectForKey:","NSWindowTitle");
_windowView=objj_msgSend(_f,"decodeObjectForKey:","NSWindowView");
_windowRect.origin.y=_screenRect.size.height-_windowRect.origin.y-_windowRect.size.height;
if(_windowStyleMask===_1){
_windowStyleMask=CPBorderlessWindowMask;
}else{
_windowStyleMask=(_windowStyleMask&_2?CPTitledWindowMask:0)|(_windowStyleMask&_3?CPClosableWindowMask:0)|(_windowStyleMask&_4?CPMiniaturizableWindowMask:0)|(_windowStyleMask&_5?CPResizableWindowMask:0)|(_windowStyleMask&_8?_8:0)|(_windowStyleMask&_7?CPDocModalWindowMask:0)|(_windowStyleMask&_9?CPHUDBackgroundWindowMask:0);
}
_windowIsFullBridge=objj_msgSend(_f,"decodeObjectForKey:","NSFrameAutosaveName")==="CPBorderlessBridgeWindowMask";
}
return _d;
}
})]);
var _b=objj_allocateClassPair(_CPCibWindowTemplate,"NSWindowTemplate"),_c=_b.isa;
objj_registerClassPair(_b);
class_addMethods(_b,[new objj_method(sel_getUid("initWithCoder:"),function(_10,_11,_12){
with(_10){
return objj_msgSend(_10,"NS_initWithCoder:",_12);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_13,_14){
with(_13){
return objj_msgSend(_CPCibWindowTemplate,"class");
}
})]);
p;9;WebView.jt;814;@STATIC;1.0;I;18;AppKit/CPWebView.jt;773;
objj_executeFile("AppKit/CPWebView.j",NO);
var _1=objj_getClass("CPWebView");
if(!_1){
throw new SyntaxError("*** Could not find definition for class \"CPWebView\"");
}
var _2=_1.isa;
class_addMethods(_1,[new objj_method(sel_getUid("NS_initWithCoder:"),function(_3,_4,_5){
with(_3){
return objj_msgSendSuper({receiver:_3,super_class:objj_getClass("CPWebView").super_class},"NS_initWithCoder:",_5);
}
})]);
var _1=objj_allocateClassPair(CPWebView,"WebView"),_2=_1.isa;
objj_registerClassPair(_1);
class_addMethods(_1,[new objj_method(sel_getUid("initWithCoder:"),function(_6,_7,_8){
with(_6){
return objj_msgSend(_6,"NS_initWithCoder:",_8);
}
}),new objj_method(sel_getUid("classForKeyedArchiver"),function(_9,_a){
with(_9){
return objj_msgSend(CPWebView,"class");
}
})]);
e;