@STATIC;1.0;p;15;_NSCornerView.jt;2011;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jI;22;AppKit/_CPCornerView.jI;19;AppKit/CPScroller.jI;20;AppKit/CPTableView.jt;1885;objj_executeFile("AppKit/CPTableHeaderView.j", NO);objj_executeFile("AppKit/_CPCornerView.j", NO);objj_executeFile("AppKit/CPScroller.j", NO);objj_executeFile("AppKit/CPTableView.j", NO);{
var the_class = objj_getClass("_CPCornerView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCornerView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCornerView__NS_initWithCoder_(self, _cmd, aCoder)
{
    return self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCornerView").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCornerView, "_NSCornerView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $_NSCornerView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_NSCornerView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
            height = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "default-row-height", objj_msgSend(CPTableView, "class")),
            width = objj_msgSend(theme, "valueForAttributeWithName:inState:forClass:", "scroller-width", CPThemeStateVertical | CPThemeStateScrollViewLegacy, objj_msgSend(CPScroller, "class"));
        self._frame.size.height = height;
        self._bounds.size.height = height;
        self._frame.size.width = width;
        self._bounds.size.width = width;
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSCornerView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCornerView, "class");
}
,["Class"])]);
}p;15;Converter+Mac.jt;4963;@STATIC;1.0;i;11;Converter.ji;24;Nib2CibKeyedUnarchiver.ji;8;NSFont.jt;4887;objj_executeFile("Converter.j", YES);objj_executeFile("Nib2CibKeyedUnarchiver.j", YES);objj_executeFile("NSFont.j", YES);{
var the_class = objj_getClass("Converter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"Converter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("convertedDataFromMacData:"), function $Converter__convertedDataFromMacData_(self, _cmd, data)
{
    var unarchiver = objj_msgSend(objj_msgSend(Nib2CibKeyedUnarchiver, "alloc"), "initForReadingWithData:", data);
    objj_msgSend(unarchiver, "setDelegate:", self);
    var objectData = objj_msgSend(unarchiver, "decodeObjectForKey:", "IB.objectdata"),
        objects = objj_msgSend(unarchiver, "allObjects"),
        count = objj_msgSend(objects, "count");
    while (count--)
    {
        var object = objects[count];
        objj_msgSend(self, "replaceFontForObject:", object);
        if (objj_msgSend(object, "respondsToSelector:", sel_getUid("awakeFromNib")))
            objj_msgSend(object, "awakeFromNib");
    }
    var convertedData = objj_msgSend(CPData, "data"),
        archiver = objj_msgSend(objj_msgSend(CPKeyedArchiver, "alloc"), "initForWritingWithMutableData:", convertedData);
    objj_msgSend(archiver, "encodeObject:forKey:", objectData, "CPCibObjectDataKey");
    objj_msgSend(archiver, "finishEncoding");
    return convertedData;
}
,["void","CPData"]), new objj_method(sel_getUid("unarchiver:cannotDecodeObjectOfClassName:originalClasses:"), function $Converter__unarchiver_cannotDecodeObjectOfClassName_originalClasses_(self, _cmd, unarchiver, name, classNames)
{
    objj_msgSend(CPException, "raise:format:", CPInvalidUnarchiveOperationException, "%@ objects are not supported by nib2cib.", name);
}
,["Class","CPKeyedUnarchiver","CPString","CPArray"]), new objj_method(sel_getUid("replaceFontForObject:"), function $Converter__replaceFontForObject_(self, _cmd, object)
{
    if (objj_msgSend(object, "respondsToSelector:", sel_getUid("font")) && objj_msgSend(object, "respondsToSelector:", sel_getUid("setFont:")))
    {
        var nibFont = objj_msgSend(object, "font");
        if (nibFont)
            objj_msgSend(self, "replaceFont:forObject:", nibFont, object);
    }
    else if (objj_msgSend(object, "isKindOfClass:", objj_msgSend(CPView, "class")))
    {
        var subviews = objj_msgSend(object, "subviews"),
            count = objj_msgSend(subviews, "count");
        if (count && objj_msgSend(subviews[0], "isKindOfClass:", objj_msgSend(CPRadio, "class")))
        {
            while (count--)
            {
                var radio = subviews[count];
                objj_msgSend(self, "replaceFont:forObject:", objj_msgSend(radio, "font"), radio);
            }
        }
    }
}
,["void","id"]), new objj_method(sel_getUid("replaceFont:forObject:"), function $Converter__replaceFont_forObject_(self, _cmd, nibFont, object)
{
    var cibFont = nil;
    if (objj_msgSend(object, "respondsToSelector:", sel_getUid("cibFontForNibFont:")))
        cibFont = objj_msgSend(object, "cibFontForNibFont:", objj_msgSend(object, "font"));
    else
        cibFont = objj_msgSend(objj_msgSend(object, "font"), "cibFontForNibFont");
    if (!cibFont || !objj_msgSend(cibFont, "isEqual:", nibFont))
    {
        var source = "";
        if (!cibFont)
        {
            var bold = objj_msgSend(nibFont, "isBold"),
                themes = objj_msgSend(objj_msgSend(Nib2Cib, "sharedNib2Cib"), "themes");
            for (var i = 0; i < themes.length; ++i)
            {
                cibFont = objj_msgSend(themes[i], "valueForAttributeWithName:inState:forClass:", "font", objj_msgSend(object, "themeState"), objj_msgSend(object, "class"));
                if (cibFont)
                {
                    source = " (from " + objj_msgSend(themes[i], "name") + ")";
                    break;
                }
            }
            if (!cibFont || objj_msgSend(cibFont, "isSystem"))
            {
                var size = objj_msgSend(cibFont, "size") || CPFontDefaultSystemFontSize;
                bold = cibFont ? objj_msgSend(cibFont, "isBold") : bold;
                if (size === CPFontDefaultSystemFontSize)
                    size = CPFontCurrentSystemSize;
                cibFont = bold ? objj_msgSend(CPFont, "boldSystemFontOfSize:", size) : objj_msgSend(CPFont, "systemFontOfSize:", size);
            }
        }
        var replacement = "System " + (bold ? "bold " : "") + (objj_msgSend(cibFont, "isSystemSize") ? "(current size)" : objj_msgSend(cibFont, "size"));
        objj_msgSend(object, "setFont:", cibFont);
        CPLog.debug("%s: substituted <%s>%s for <%s>", objj_msgSend(object, "className"), replacement || objj_msgSend(NSFont, "descriptorForFont:", cibFont), source, objj_msgSend(NSFont, "descriptorForFont:", nibFont));
    }
}
,["void","CPFont","id"])]);
}p;11;Converter.jt;5712;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;19;Foundation/CPData.jI;24;Foundation/CPException.jI;21;Foundation/CPString.jI;19;BlendKit/BlendKit.ji;14;NSFoundation.ji;10;NSAppKit.jt;5505;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("Foundation/CPData.j", NO);objj_executeFile("Foundation/CPException.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("BlendKit/BlendKit.j", NO);objj_executeFile("NSFoundation.j", YES);objj_executeFile("NSAppKit.j", YES);var FILE = require("file"),
    OS = require("os"),
    SharedConverter = nil;
(NibFormatUndetermined = 0, NibFormatMac = 1, NibFormatIPhone = 2);
ConverterModeLegacy = 0;
ConverterModeNew = 1;
ConverterConversionException = "ConverterConversionException";
{var the_class = objj_allocateClassPair(CPObject, "Converter"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("inputPath"), new objj_ivar("outputPath")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("inputPath"), function $Converter__inputPath(self, _cmd)
{
    return self.inputPath;
}
,["CPString"]), new objj_method(sel_getUid("outputPath"), function $Converter__outputPath(self, _cmd)
{
    return self.outputPath;
}
,["CPString"]), new objj_method(sel_getUid("setOutputPath:"), function $Converter__setOutputPath_(self, _cmd, newValue)
{
    self.outputPath = newValue;
}
,["void","CPString"]), new objj_method(sel_getUid("initWithInputPath:outputPath:"), function $Converter__initWithInputPath_outputPath_(self, _cmd, anInputPath, anOutputPath)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("Converter").super_class }, "init");
    if (self)
    {
        if (!SharedConverter)
            SharedConverter = self;
        self.inputPath = anInputPath;
        self.outputPath = anOutputPath;
    }
    return self;
}
,["id","CPString","CPString"]), new objj_method(sel_getUid("convert"), function $Converter__convert(self, _cmd)
{
    var inferredFormat = NibFormatMac;
    if (FILE.extension(self.inputPath) !== ".nib" && FILE.isFile(self.inputPath) && (FILE.read(self.inputPath, {charset: "UTF-8"})).indexOf("<archive type=\"com.apple.InterfaceBuilder3.CocoaTouch.XIB\"") !== -1)
        inferredFormat = NibFormatIPhone;
    if (inferredFormat === NibFormatMac)
        CPLog.info("Auto-detected Cocoa nib or xib File");
    else
        CPLog.info("Auto-detected CocoaTouch xib File");
    CPLog.info("Converting xib file to plist...");
    var nibData = objj_msgSend(self, "CPCompliantNibDataAtFilePath:", self.inputPath);
    if (inferredFormat === NibFormatMac)
        var convertedData = objj_msgSend(self, "convertedDataFromMacData:", nibData);
    else
        objj_msgSend(CPException, "raise:reason:", ConverterConversionException, "nib2cib does not understand this nib format.");
    if (objj_msgSend(self.outputPath, "length"))
        FILE.write(self.outputPath, objj_msgSend(convertedData, "rawString"), {charset: "UTF-8"});
    CPLog.info("Conversion successful");
    return convertedData;
}
,["CPData"]), new objj_method(sel_getUid("CPCompliantNibDataAtFilePath:"), function $Converter__CPCompliantNibDataAtFilePath_(self, _cmd, aFilePath)
{
    var temporaryNibFilePath = "",
        temporaryPlistFilePath = "";
    try    {
        if (objj_msgSend(self.outputPath, "length"))
        {
            temporaryNibFilePath = FILE.join("/tmp", FILE.basename(aFilePath) + ".tmp.nib");
            if ((OS.popen(["/usr/bin/ibtool", aFilePath, "--compile", temporaryNibFilePath])).wait() === 1)
                objj_msgSend(CPException, "raise:reason:", ConverterConversionException, "Could not compile file: " + aFilePath);
        }
        else
        {
            temporaryNibFilePath = aFilePath;
        }
        var temporaryPlistFilePath = FILE.join("/tmp", FILE.basename(aFilePath) + ".tmp.plist");
        if ((OS.popen(["/usr/bin/plutil", "-convert", "xml1", temporaryNibFilePath, "-o", temporaryPlistFilePath])).wait() === 1)
            objj_msgSend(CPException, "raise:reason:", ConverterConversionException, "Could not convert to xml plist for file: " + aFilePath);
        if (!FILE.isReadable(temporaryPlistFilePath))
            objj_msgSend(CPException, "raise:reason:", ConverterConversionException, "Unable to convert nib file.");
        var plistContents = FILE.read(temporaryPlistFilePath, {charset: "UTF-8"});
        if (system.engine === "rhino")
            plistContents = String((java.lang.String(plistContents)).replaceAll("\\<key\\>\\s*CF\\$UID\\s*\\<\/key\\>", "<key>CP\\$UID</key>"));
        else
            plistContents = plistContents.replace(/\<key\>\s*CF\$UID\s*\<\/key\>/g, "<key>CP$UID</key>");
        plistContents = plistContents.replace(/<string>[\u0000-\u0008\u000B\u000C\u000E-\u001F]<\/string>/g, function(c)
        {
            CPLog.warn("Warning: converting character 0x" + (c.charCodeAt(8)).toString(16) + " to base64 representation");
            return "<string type=\"base64\">" + CFData.encodeBase64String(c.charAt(8)) + "</string>";
        });
    }
    finally     {
        if (temporaryNibFilePath !== "" && FILE.isWritable(temporaryNibFilePath))
            FILE.remove(temporaryNibFilePath);
        if (temporaryPlistFilePath !== "" && FILE.isWritable(temporaryPlistFilePath))
            FILE.remove(temporaryPlistFilePath);
    }
    return objj_msgSend(CPData, "dataWithRawString:", plistContents);
}
,["CPData","CPString"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("sharedConverter"), function $Converter__sharedConverter(self, _cmd)
{
    return SharedConverter;
}
,["Converter"])]);
}p;6;main.jt;915;@STATIC;1.0;i;9;Nib2Cib.jt;884;objj_executeFile("Nib2Cib.j", YES);var OS = require("os"),
    stream = (require("narwhal/term")).stream;
main = function(args)
{
    checkUlimit();
    var nib2cib = objj_msgSend(objj_msgSend(Nib2Cib, "alloc"), "initWithArgs:", args);
    objj_msgSend(nib2cib, "run");
}
checkUlimit = function()
{
    var minUlimit = 1024,
        p = OS.popen(["ulimit", "-n"]);
    if (p.wait() === 0)
    {
        var limit = ((p.stdout.read()).split("\n"))[0];
        if (Number(limit) < minUlimit)
        {
            stream.print("\0red(\0bold(WARNING:\0)\0) nib2cib may need to open more files than this terminal session currently allows (" + limit + "). Add the following line to your login configuration file (.bash_profile, .bashrc, etc.), start a new terminal session, then try again:\n");
            stream.print("ulimit -n " + minUlimit);
            OS.exit(1);
        }
    }
}
p;9;Nib2Cib.jt;32850;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;25;Foundation/CPDictionary.jI;21;Foundation/CPString.jI;22;AppKit/CPApplication.jI;19;BlendKit/BlendKit.ji;24;Nib2CibKeyedUnarchiver.ji;11;Converter.ji;15;Converter+Mac.jt;32607;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("Foundation/CPDictionary.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("AppKit/CPApplication.j", NO);objj_executeFile("BlendKit/BlendKit.j", NO);objj_executeFile("Nib2CibKeyedUnarchiver.j", YES);objj_executeFile("Converter.j", YES);objj_executeFile("Converter+Mac.j", YES);Nib2CibColorizeOutput = YES;
var FILE = require("file"),
    OS = require("os"),
    SYS = require("system"),
    FileList = (require("jake")).FileList,
    stream = (require("narwhal/term")).stream,
    StaticResource = (require("objective-j")).StaticResource,
    DefaultTheme = "Aristo2",
    BuildTypes = ["Debug", "Release"],
    DefaultFile = "MainMenu",
    AllowedStoredOptionsRe = new RegExp("^(defaultTheme|auxThemes|verbosity|quiet|frameworks|format)$"),
    ArgsRe = /"[^\"]+"|'[^\']+'|\S+/g,
    SharedNib2Cib = nil;
{var the_class = objj_allocateClassPair(CPObject, "Nib2Cib"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("commandLineArgs"), new objj_ivar("parser"), new objj_ivar("commandLineOptions"), new objj_ivar("nibInfo"), new objj_ivar("appDirectory"), new objj_ivar("frameworks"), new objj_ivar("appResourceDirectory"), new objj_ivar("infoPlist"), new objj_ivar("userNSClasses"), new objj_ivar("themes")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("appDirectory"), function $Nib2Cib__appDirectory(self, _cmd)
{
    return self.appDirectory;
}
,["CPString"]), new objj_method(sel_getUid("frameworks"), function $Nib2Cib__frameworks(self, _cmd)
{
    return self.frameworks;
}
,["CPDictionary"]), new objj_method(sel_getUid("appResourceDirectory"), function $Nib2Cib__appResourceDirectory(self, _cmd)
{
    return self.appResourceDirectory;
}
,["CPString"]), new objj_method(sel_getUid("infoPlist"), function $Nib2Cib__infoPlist(self, _cmd)
{
    return self.infoPlist;
}
,["CPDictionary"]), new objj_method(sel_getUid("userNSClasses"), function $Nib2Cib__userNSClasses(self, _cmd)
{
    return self.userNSClasses;
}
,["CPArray"]), new objj_method(sel_getUid("themes"), function $Nib2Cib__themes(self, _cmd)
{
    return self.themes;
}
,["CPArray"]), new objj_method(sel_getUid("initWithArgs:"), function $Nib2Cib__initWithArgs_(self, _cmd, theArgs)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("Nib2Cib").super_class }, "init");
    if (self)
    {
        if (!SharedNib2Cib)
            SharedNib2Cib = self;
        self.commandLineArgs = theArgs;
        self.parser = new (require("narwhal/args")).Parser();
        self.nibInfo = {};
        self.appDirectory = "";
        self.frameworks = objj_msgSend(CPDictionary, "dictionary");
        self.appResourceDirectory = "";
        self.infoPlist = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        self.userNSClasses = [];
        self.themes = [];
    }
    return self;
}
,["id","CPArray"]), new objj_method(sel_getUid("run"), function $Nib2Cib__run(self, _cmd)
{
    try    {
        self.commandLineOptions = objj_msgSend(self, "parseOptionsFromArgs:", self.commandLineArgs);
        Nib2CibColorizeOutput = !self.commandLineOptions.noColors;
        objj_msgSend(self, "setLogLevel:", self.commandLineOptions.quiet ? -1 : self.commandLineOptions.verbosity);
        objj_msgSend(self, "checkPrerequisites");
        if (self.commandLineOptions.watch)
            objj_msgSend(self, "watchWithOptions:", self.commandLineOptions);
        else
        {
            var success = objj_msgSend(self, "convertWithOptions:inputPath:", self.commandLineOptions, nil);
            if (!success)
                OS.exit(1);
        }
    }
    catch(anException)     {
        objj_msgSend(self, "logError:", objj_msgSend(self, "exceptionReason:", anException));
        OS.exit(1);
    }}
,["void"]), new objj_method(sel_getUid("checkPrerequisites"), function $Nib2Cib__checkPrerequisites(self, _cmd)
{
    var fontinfo = (require("cappuccino/fontinfo")).fontinfo,
        info = fontinfo("LucidaGrande", 13);
    if (!info)
        objj_msgSend(self, "failWithMessage:", "fontinfo does not appear to be installed");
}
,["void"]), new objj_method(sel_getUid("enumerateFrameworks"), function $Nib2Cib__enumerateFrameworks(self, _cmd)
{
    var frameworksDirectory = FILE.join(self.appDirectory, "Frameworks"),
        debugFrameworksDirectory = FILE.join(frameworksDirectory, "Debug");
    [debugFrameworksDirectory, frameworksDirectory].forEach(function(directory)
    {
        if (FILE.isDirectory(directory))
        {
            var frameworkList = FILE.list(directory);
            frameworkList.forEach(function(framework)
            {
                if (framework !== "Debug" && !objj_msgSend(self.frameworks, "containsKey:", framework))
                {
                    var resourceDirectory = FILE.join(directory, framework, "Resources");
                    if (FILE.isDirectory(resourceDirectory))
                        resourceDirectory = FILE.canonical(resourceDirectory);
                    else
                        resourceDirectory = "";
                    objj_msgSend(self.frameworks, "setValue:forKey:", {resourceDirectory: resourceDirectory, loaded: false}, framework);
                }
            });
        }
    });
}
,["void"]), new objj_method(sel_getUid("convertWithOptions:inputPath:"), function $Nib2Cib__convertWithOptions_inputPath_(self, _cmd, options, inputPath)
{
    try    {
        inputPath = inputPath || objj_msgSend(self, "getInputPath:", options.args);
        objj_msgSend(self, "getAppAndResourceDirectoriesFromInputPath:options:", inputPath, options);
        objj_msgSend(self, "enumerateFrameworks");
        if (options.readStoredOptions)
        {
            options = objj_msgSend(self, "mergeOptionsWithStoredOptions:inputPath:", options, inputPath);
            objj_msgSend(self, "setLogLevel:", options.quiet ? -1 : options.verbosity);
        }
        if (!options.quiet && options.verbosity > 0)
            objj_msgSend(self, "printVersion");
        var configInfo = objj_msgSend(self, "readConfigFile:inputPath:", options.configFile || "", inputPath),
            outputPath = objj_msgSend(self, "getOutputPathFromInputPath:args:", inputPath, options.args);
        self.infoPlist = configInfo.plist;
        if (self.infoPlist)
        {
            var systemFontFace = objj_msgSend(self.infoPlist, "valueForKey:", "CPSystemFontFace");
            if (systemFontFace)
                objj_msgSend(CPFont, "setSystemFontFace:", systemFontFace);
            var systemFontSize = objj_msgSend(self.infoPlist, "valueForKey:", "CPSystemFontSize");
            if (systemFontSize)
                objj_msgSend(CPFont, "setSystemFontSize:", parseFloat(systemFontSize, 10));
        }
        else
            self.infoPlist = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        var themeList = objj_msgSend(self, "getThemeList:", options);
        objj_msgSend(self, "loadThemesFromList:", themeList);
        objj_msgSend(self, "loadFrameworks:verbosity:", options.frameworks, options.verbosity);
        objj_msgSend(self, "loadNSClassesFromBundle:", objj_msgSend(CPBundle, "mainBundle"));
        var frameworkList = [];
        objj_msgSend(self.frameworks, "allKeys").forEach(function(name)
        {
            var info = objj_msgSend(self.frameworks, "valueForKey:", name);
            if (info.resourceDirectory)
                name += "*";
            if (info.loaded)
                name += "+";
            frameworkList.push(name);
        });
        CPLog.info("\n-------------------------------------------------------------");
        CPLog.info("Input         : " + inputPath);
        CPLog.info("Output        : " + outputPath);
        CPLog.info("Application   : " + self.appDirectory);
        CPLog.info("Frameworks    : " + (frameworkList.join(", ") || ""));
        CPLog.info("Default theme : " + themeList[0]);
        CPLog.info("Aux themes    : " + (themeList.slice(1)).join(", "));
        CPLog.info("Config file   : " + (configInfo.path || ""));
        CPLog.info("System Font   : " + objj_msgSend(CPFont, "systemFontSize") + "px " + objj_msgSend(CPFont, "systemFontFace"));
        CPLog.info("-------------------------------------------------------------\n");
        var converter = objj_msgSend(objj_msgSend(Converter, "alloc"), "initWithInputPath:outputPath:", inputPath, outputPath);
        objj_msgSend(converter, "convert");
        return YES;
    }
    catch(anException)     {
        objj_msgSend(self, "logError:", objj_msgSend(self, "exceptionReason:", anException));
        return NO;
    }}
,["BOOL","JSObject","CPString"]), new objj_method(sel_getUid("watchWithOptions:"), function $Nib2Cib__watchWithOptions_(self, _cmd, options)
{
    var verbosity = options.quiet ? -1 : options.verbosity,
        watchDir = options.args[0];
    if (!watchDir)
        watchDir = FILE.canonical(FILE.isDirectory("Resources") ? "Resources" : ".");
    else
    {
        watchDir = FILE.canonical(watchDir);
        if (FILE.basename(watchDir) !== "Resources")
        {
            var path = FILE.join(watchDir, "Resources");
            if (FILE.isDirectory(path))
                watchDir = path;
        }
    }
    if (!FILE.isDirectory(watchDir))
        objj_msgSend(self, "failWithMessage:", "Cannot find the directory: " + watchDir);
    objj_msgSend(self, "setLogLevel:", 1);
    var nibs = (new FileList(FILE.join(watchDir, "*.[nx]ib"))).items(),
        count = nibs.length;
    while (count--)
    {
        var nib = nibs[count],
            cib = nib.substr(0, nib.length - 4) + ".cib";
        if (FILE.exists(cib) && FILE.mtime(nib) - FILE.mtime(cib) <= 0)
            self.nibInfo[nib] = FILE.mtime(nib);
    }
    CPLog.info("Watching: " + CPLogColorize(watchDir, "debug"));
    CPLog.info("Press Control-C to stop...");
    while (true)
    {
        var modifiedNibs = objj_msgSend(self, "getModifiedNibsInDirectory:", watchDir);
        for (var i = 0; i < modifiedNibs.length; ++i)
        {
            var action = modifiedNibs[i][0],
                nib = modifiedNibs[i][1],
                label = action === "add" ? "Added" : "Modified",
                level = action === "add" ? "info" : "debug";
            CPLog.info(">> %s: %s", CPLogColorize(label, level), nib);
            if (action === "add")
            {
                var cib = nib.substr(0, nib.length - 4) + ".cib";
                if (FILE.exists(cib) && FILE.mtime(nib) - FILE.mtime(cib) < 0)
                    continue;
            }
            objj_msgSend(self, "setLogLevel:", verbosity);
            var success = objj_msgSend(self, "convertWithOptions:inputPath:", options, nib);
            objj_msgSend(self, "setLogLevel:", 1);
            if (success)
            {
                if (verbosity > 0)
                    stream.print();
                else
                    CPLog.info("Conversion successful");
            }
        }
        OS.sleep(1);
    }
}
,["void","JSObject"]), new objj_method(sel_getUid("parseOptionsFromArgs:"), function $Nib2Cib__parseOptionsFromArgs_(self, _cmd, theArgs)
{
    self.parser.usage("[--watch DIRECTORY] [INPUT_FILE [OUTPUT_FILE]]");
    ((self.parser.option("--watch", "watch")).set(true)).help("Ask nib2cib to watch a directory for changes");
    (((self.parser.option("--default-theme", "defaultTheme")).set()).displayName("name")).help("Specify a custom default theme which is not set in your Info.plist");
    (((self.parser.option("-t", "--theme", "auxThemes")).push()).displayName("name")).help("An additional theme loaded dynamically by your application");
    (((self.parser.option("--config", "configFile")).set()).displayName("path")).help("A path to an Info.plist file from which the system font and/or size can be retrieved");
    ((self.parser.option("-v", "--verbose", "verbosity")).inc()).help("Increase verbosity level");
    ((self.parser.option("-q", "--quiet", "quiet")).set(true)).help("No output");
    ((self.parser.option("-F", "--framework", "frameworks")).push()).help("Add a framework to load");
    (((self.parser.option("--no-stored-options", "readStoredOptions")).set(false)).def(true)).help("Do not read stored options");
    (((self.parser.option("--no-colors", "noColors")).set(true)).def(false)).help("Don't colorize output");
    ((self.parser.option("--version", "showVersion")).action(function()
    {
        objj_msgSend(self, "printVersionAndExit");
    })).help("Show the version of nib2cib and quit");
    (((self.parser.option("-R", "deprecatedResourcesDir")).set()).displayName("resources directory")).help("This option is deprecated.");
    self.parser.helpful();
    var options = self.parser.parse(theArgs, null, null, true);
    if (options.args.length > 2)
    {
        self.parser.printUsage(options);
        OS.exit(0);
    }
    return options;
}
,["JSObject","CPArray"]), new objj_method(sel_getUid("mergeOptionsWithStoredOptions:inputPath:"), function $Nib2Cib__mergeOptionsWithStoredOptions_inputPath_(self, _cmd, options, inputPath)
{
    var userOptions = objj_msgSend(self, "readStoredOptionsAtPath:", FILE.join(SYS.env["HOME"], ".nib2cibconfig")),
        appOptions = objj_msgSend(self, "readStoredOptionsAtPath:", FILE.join(self.appDirectory, "nib2cib.conf")),
        filename = FILE.basename(inputPath, FILE.extension(inputPath)) + ".conf",
        fileOptions = objj_msgSend(self, "readStoredOptionsAtPath:", FILE.join(FILE.dirname(inputPath), filename));
    userOptions = objj_msgSend(self, "parseOptionsFromArgs:", [options.command].concat(userOptions));
    appOptions = objj_msgSend(self, "parseOptionsFromArgs:", [options.command].concat(appOptions));
    fileOptions = objj_msgSend(self, "parseOptionsFromArgs:", [options.command].concat(fileOptions));
    var mergedOptions = userOptions;
    objj_msgSend(self, "mergeOptions:with:", appOptions, mergedOptions);
    objj_msgSend(self, "mergeOptions:with:", fileOptions, mergedOptions);
    objj_msgSend(self, "mergeOptions:with:", options, mergedOptions);
    mergedOptions.args = options.args;
    return mergedOptions;
}
,["JSObject","JSObject","CPString"]), new objj_method(sel_getUid("readStoredOptionsAtPath:"), function $Nib2Cib__readStoredOptionsAtPath_(self, _cmd, path)
{
    path = FILE.canonical(path);
    if (!FILE.isReadable(path))
        return [];
    var file = FILE.open(path, "r"),
        line = file.readLine(),
        matches = line.match(ArgsRe) || [];
    file.close();
    CPLog.debug("Reading stored options: " + path);
    if (matches)
    {
        for (var i = 0; i < matches.length; ++i)
        {
            var str = matches[i];
            if (str.charAt(0) === '"' && str.substr(-1) === '"' || str.charAt(0) === "'" && str.substr(-1) === "'")
                matches[i] = str.substr(1, str.length - 2);
        }
        return matches;
    }
    else
        return [];
}
,["CPArray","CPString"]), new objj_method(sel_getUid("printOptions:"), function $Nib2Cib__printOptions_(self, _cmd, options)
{
    var option;
    for (option in options)
    {
        var value = options[option];
        if (value)
        {
            var show = value.length !== undefined ? value.length > 0 : !!value;
            if (show)
                print(option + ": " + value);
        }
    }
}
,["void","id"]), new objj_method(sel_getUid("mergeOptions:with:"), function $Nib2Cib__mergeOptions_with_(self, _cmd, sourceOptions, targetOptions)
{
    var option;
    for (option in sourceOptions)
    {
        if (!AllowedStoredOptionsRe.test(option))
            continue;
        if (sourceOptions.hasOwnProperty(option))
        {
            var value = sourceOptions[option];
            if (value)
            {
                var copy = value.length !== undefined ? value.length > 0 : !!value;
                if (copy)
                    targetOptions[option] = value;
            }
        }
    }
}
,["void","JSObject","JSObject"]), new objj_method(sel_getUid("setLogLevel:"), function $Nib2Cib__setLogLevel_(self, _cmd, level)
{
    CPLogUnregister(CPLogPrint);
    if (level === 0)
        CPLogRegister(CPLogPrint, "warn", logFormatter);
    else if (level === 1)
        CPLogRegister(CPLogPrint, "info", logFormatter);
    else if (level > 1)
        CPLogRegister(CPLogPrint, null, logFormatter);
}
,["void","int"]), new objj_method(sel_getUid("getInputPath:"), function $Nib2Cib__getInputPath_(self, _cmd, theArgs)
{
    var inputPath = theArgs[0] || DefaultFile,
        path = "";
    if (!/^.+\.[nx]ib$/.test(inputPath))
    {
        if (path = objj_msgSend(self, "findInputPath:extension:", inputPath, ".xib"))
            inputPath = path;
        else if (path = objj_msgSend(self, "findInputPath:extension:", inputPath, ".nib"))
            inputPath = path;
        else
            objj_msgSend(self, "failWithMessage:", "Cannot find the input file (.xib or .nib): " + FILE.canonical(inputPath));
    }
    else if (path = objj_msgSend(self, "findInputPath:extension:", inputPath, nil))
        inputPath = path;
    else
        objj_msgSend(self, "failWithMessage:", "Could not read the input file: " + FILE.canonical(inputPath));
    return FILE.canonical(inputPath);
}
,["CPString","CPArray"]), new objj_method(sel_getUid("findInputPath:extension:"), function $Nib2Cib__findInputPath_extension_(self, _cmd, inputPath, extension)
{
    var path = inputPath;
    if (extension)
        path += extension;
    if (FILE.isReadable(path))
        return path;
    if (FILE.basename(FILE.dirname(inputPath)) !== "Resources" && FILE.isDirectory("Resources"))
    {
        path = FILE.resolve(path, FILE.join("Resources", FILE.basename(path)));
        if (FILE.isReadable(path))
            return path;
    }
    return null;
}
,["void","CPString","CPString"]), new objj_method(sel_getUid("getAppAndResourceDirectoriesFromInputPath:options:"), function $Nib2Cib__getAppAndResourceDirectoriesFromInputPath_options_(self, _cmd, aPath, options)
{
    self.appDirectory = "";
    var parentDir = FILE.dirname(aPath),
        match = /^(.+)(\/Resources(?:\/.+)?)$/.exec(parentDir);
    if (match)
    {
        self.appDirectory = match[1];
        self.appResourceDirectory = FILE.join(self.appDirectory, "Resources");
    }
    else
    {
        self.appDirectory = parentDir;
        if (!self.appResourceDirectory)
        {
            var path = FILE.join(self.appDirectory, "Resources");
            if (FILE.isDirectory(path))
                self.appResourceDirectory = path;
        }
    }
}
,["void","CPString","JSObject"]), new objj_method(sel_getUid("getOutputPathFromInputPath:args:"), function $Nib2Cib__getOutputPathFromInputPath_args_(self, _cmd, aPath, theArgs)
{
    var outputPath = null;
    if (theArgs.length > 1)
    {
        outputPath = theArgs[1];
        if (!/^.+\.cib$/.test(outputPath))
            outputPath += ".cib";
    }
    else
        outputPath = FILE.join(FILE.dirname(aPath), FILE.basename(aPath, FILE.extension(aPath))) + ".cib";
    outputPath = FILE.canonical(outputPath);
    if (!FILE.isWritable(FILE.dirname(outputPath)))
        objj_msgSend(self, "failWithMessage:", "Cannot write the output file at: " + outputPath);
    return outputPath;
}
,["CPString","CPString","CPArray"]), new objj_method(sel_getUid("loadFrameworks:verbosity:"), function $Nib2Cib__loadFrameworks_verbosity_(self, _cmd, frameworksToLoad, verbosity)
{
    if (!frameworksToLoad || frameworksToLoad.length === 0)
        return;
    frameworksToLoad.forEach(function(aFramework)
    {
        objj_msgSend(self, "setLogLevel:", verbosity);
        var frameworkPath = nil;
        if (aFramework.indexOf("/") === -1)
        {
            frameworkPath = objj_msgSend(self, "findInFrameworks:path:isDirectory:callback:", FILE.join(self.appDirectory, "Frameworks"), aFramework, YES, function(path)
            {
                return path;
            });
        }
        else
            objj_msgSend(self, "failWithMessage:", "-F should be used only with a framework name that is in the app's Framework directory");
        if (!frameworkPath)
            objj_msgSend(self, "failWithMessage:", "Cannot find the framework \"" + aFramework + "\"");
        CPLog.debug("Loading framework: " + frameworkPath);
        try        {
            objj_msgSend(self, "setLogLevel:", -1);
            var frameworkBundle = objj_msgSend(objj_msgSend(CPBundle, "alloc"), "initWithPath:", frameworkPath);
            objj_msgSend(frameworkBundle, "loadWithDelegate:", nil);
            objj_msgSend(self, "setLogLevel:", verbosity);
            objj_msgSend(self, "loadNSClassesFromBundle:", frameworkBundle);
            var frameworkName = FILE.basename(frameworkPath),
                info = objj_msgSend(self.frameworks, "valueForKey:", frameworkName);
            info.loaded = true;
        }
        finally         {
            objj_msgSend(self, "setLogLevel:", verbosity);
        }
        (require("browser/timeout")).serviceTimeouts();
    });
}
,["void","CPArray","int"]), new objj_method(sel_getUid("loadNSClassesFromBundle:"), function $Nib2Cib__loadNSClassesFromBundle_(self, _cmd, aBundle)
{
    var nsClasses = objj_msgSend(aBundle, "objectForInfoDictionaryKey:", "NSClasses") || [],
        bundlePath = objj_msgSend(aBundle, "bundlePath");
    for (var i = 0; i < nsClasses.length; ++i)
    {
        if (self.userNSClasses.indexOf(nsClasses[i]) >= 0)
            continue;
        var path = FILE.join(bundlePath, "NS_" + nsClasses[i] + ".j");
        objj_importFile(path, YES);
        CPLog.debug("Imported NS class: %s", path);
        self.userNSClasses.push(nsClasses[i]);
    }
}
,["void","CPBundle"]), new objj_method(sel_getUid("getThemeList:"), function $Nib2Cib__getThemeList_(self, _cmd, options)
{
    var defaultTheme = options.defaultTheme;
    if (!defaultTheme)
        defaultTheme = objj_msgSend(self.infoPlist, "valueForKey:", "CPDefaultTheme");
    if (!defaultTheme)
        defaultTheme = objj_msgSend(self, "getAppKitDefaultThemeName");
    var themeList = objj_msgSend(CPSet, "setWithObject:", defaultTheme);
    if (options.auxThemes)
        objj_msgSend(themeList, "addObjectsFromArray:", options.auxThemes);
    var auxThemes = self.infoPlist.valueForKey("CPAuxiliaryThemes");
    if (auxThemes)
        objj_msgSend(themeList, "addObjectsFromArray:", auxThemes);
    objj_msgSend(themeList, "removeObject:", defaultTheme);
    var allThemes = objj_msgSend(themeList, "allObjects");
    objj_msgSend(allThemes, "insertObject:atIndex:", defaultTheme, 0);
    return allThemes;
}
,["CPArray","JSObject"]), new objj_method(sel_getUid("findInCappBuild:isDirectory:callback:"), function $Nib2Cib__findInCappBuild_isDirectory_callback_(self, _cmd, path, isDirectory, callback)
{
    var cappBuild = SYS.env["CAPP_BUILD"];
    if (!cappBuild)
        return undefined;
    cappBuild = FILE.canonical(cappBuild);
    if (FILE.isDirectory(cappBuild))
    {
        var result = null;
        for (var i = 0; i < BuildTypes.length && !result; ++i)
        {
            var findPath = FILE.join(cappBuild, BuildTypes[i], path);
            if (isDirectory && FILE.isDirectory(findPath) || !isDirectory && FILE.exists(findPath))
                result = callback(findPath);
        }
        return result;
    }
    else
        return false;
}
,["id","CPString","BOOL","JSObject"]), new objj_method(sel_getUid("findInInstalledFrameworks:isDirectory:callback:"), function $Nib2Cib__findInInstalledFrameworks_isDirectory_callback_(self, _cmd, path, isDirectory, callback)
{
    return objj_msgSend(self, "findInFrameworks:path:isDirectory:callback:", FILE.canonical(FILE.join(SYS.prefix, "packages/cappuccino/Frameworks")), path, isDirectory, callback);
}
,["id","CPString","BOOL","JSObject"]), new objj_method(sel_getUid("findInFrameworks:path:isDirectory:callback:"), function $Nib2Cib__findInFrameworks_path_isDirectory_callback_(self, _cmd, frameworksPath, path, isDirectory, callback)
{
    var result = null,
        findPath = FILE.join(frameworksPath, "Debug", path);
    if (isDirectory && FILE.isDirectory(findPath) || !isDirectory && FILE.exists(findPath))
        result = callback(findPath);
    if (!result)
    {
        findPath = FILE.join(frameworksPath, path);
        if (isDirectory && FILE.isDirectory(findPath) || !isDirectory && FILE.exists(findPath))
            result = callback(findPath);
    }
    return result;
}
,["id","CPString","CPString","BOOL","JSObject"]), new objj_method(sel_getUid("getAppKitDefaultThemeName"), function $Nib2Cib__getAppKitDefaultThemeName(self, _cmd)
{
    var callback = function(path)
    {
        return objj_msgSend(self, "themeNameFromPropertyList:", path);
    },
        themeName = objj_msgSend(self, "findInCappBuild:isDirectory:callback:", "AppKit/Info.plist", NO, callback);
    if (!themeName)
        themeName = objj_msgSend(self, "findInInstalledFrameworks:isDirectory:callback:", "AppKit/Info.plist", NO, callback);
    return themeName || DefaultTheme;
}
,["CPString"]), new objj_method(sel_getUid("themeNameFromPropertyList:"), function $Nib2Cib__themeNameFromPropertyList_(self, _cmd, path)
{
    if (!FILE.isReadable(path))
        return nil;
    var themeName = nil,
        plist = CFPropertyList.readPropertyListFromFile(path);
    if (plist)
        themeName = plist.valueForKey("CPDefaultTheme");
    return themeName;
}
,["CPString","CPString"]), new objj_method(sel_getUid("loadThemesFromList:"), function $Nib2Cib__loadThemesFromList_(self, _cmd, themeList)
{
    for (var i = 0; i < themeList.length; ++i)
        self.themes.push(objj_msgSend(self, "loadThemeNamed:", themeList[i]));
}
,["void","CPArray"]), new objj_method(sel_getUid("loadThemeNamed:"), function $Nib2Cib__loadThemeNamed_(self, _cmd, themeName)
{
    if (/^.+\.blend$/.test(themeName))
        themeName = themeName.substr(0, themeName.length - ".blend".length);
    var blendName = themeName + ".blend",
        themePath = "",
        themeDir = self.appResourceDirectory;
    if (themeDir)
    {
        themePath = FILE.join(FILE.canonical(themeDir), blendName);
        if (!FILE.isDirectory(themePath))
            themePath = themeDir = null;
    }
    if (!themeDir)
    {
        var returnPath = function(path)
        {
            return path;
        };
        themePath = objj_msgSend(self, "findInCappBuild:isDirectory:callback:", blendName, YES, returnPath);
        if (!themePath)
            themePath = objj_msgSend(self, "findInInstalledFrameworks:isDirectory:callback:", "AppKit/Resources/" + blendName, YES, returnPath);
        if (!themePath)
        {
            var path = FILE.canonical(blendName);
            if (FILE.isDirectory(path))
                themePath = path;
        }
    }
    if (!themePath)
        objj_msgSend(self, "failWithMessage:", "Cannot find the theme \"" + themeName + "\"");
    return objj_msgSend(self, "readThemeWithName:atPath:", themeName, themePath);
}
,["CPTheme","CPString"]), new objj_method(sel_getUid("readThemeWithName:atPath:"), function $Nib2Cib__readThemeWithName_atPath_(self, _cmd, name, path)
{
    var themeBundle = new CFBundle(path);
    themeBundle.mostEligibleEnvironment = function()
    {
        return "Browser";
    };
    themeBundle.load();
    var keyedThemes = themeBundle.valueForInfoDictionaryKey("CPKeyedThemes");
    if (!keyedThemes)
        objj_msgSend(self, "failWithMessage:", "Could not find the keyed themes in the theme: " + path);
    var index = keyedThemes.indexOf(name + ".keyedtheme");
    if (index < 0)
        objj_msgSend(self, "failWithMessage:", "Could not find the main theme data (" + name + ".keyedtheme" + ") in the theme: " + path);
    var resourcePath = themeBundle.pathForResource(keyedThemes[index]),
        themeData = new CFMutableData();
    themeData.setRawString((StaticResource.resourceAtURL(new CFURL(resourcePath), true)).contents());
    var theme = objj_msgSend(CPKeyedUnarchiver, "unarchiveObjectWithData:", themeData);
    if (!theme)
        objj_msgSend(self, "failWithMessage:", "Could not unarchive the theme at: " + path);
    CPLog.debug("Loaded theme: " + path);
    return theme;
}
,["CPTheme","CPString","CPString"]), new objj_method(sel_getUid("readConfigFile:inputPath:"), function $Nib2Cib__readConfigFile_inputPath_(self, _cmd, configFile, inputPath)
{
    var configPath = null,
        path;
    if (configFile)
    {
        path = FILE.canonical(configFile);
        if (!FILE.isReadable(path))
            objj_msgSend(self, "failWithMessage:", "Cannot find the config file: " + path);
        configPath = path;
    }
    else
    {
        path = FILE.join(self.appDirectory, "Info.plist");
        if (FILE.isReadable(path))
            configPath = path;
    }
    var plist = null;
    if (configPath)
    {
        var plist = FILE.read(configPath);
        if (!plist)
            objj_msgSend(self, "failWithMessage:", "Could not read the Info.plist at: " + configPath);
        plist = CFPropertyList.propertyListFromString(plist);
        if (!plist)
            objj_msgSend(self, "failWithMessage:", "Could not parse the Info.plist at: " + configPath);
    }
    return {path: configPath, plist: plist};
}
,["JSObject","CPString","CPString"]), new objj_method(sel_getUid("getModifiedNibsInDirectory:"), function $Nib2Cib__getModifiedNibsInDirectory_(self, _cmd, path)
{
    var nibs = (new FileList(FILE.join(path, "*.[nx]ib"))).items(),
        count = nibs.length,
        newNibInfo = {},
        modifiedNibs = [];
    while (count--)
    {
        var nib = nibs[count];
        newNibInfo[nib] = FILE.mtime(nib);
        if (!self.nibInfo.hasOwnProperty(nib))
            modifiedNibs.push(["add", nib]);
        else
        {
            if (newNibInfo[nib] - self.nibInfo[nib] !== 0)
                modifiedNibs.push(["mod", nib]);
            delete self.nibInfo[nib];
        }
    }
    for (var nib in self.nibInfo)
        if (self.nibInfo.hasOwnProperty(nib))
            CPLog.info(">> %s: %s", CPLogColorize("Deleted", "warn"), nib);
    self.nibInfo = newNibInfo;
    return modifiedNibs;
}
,["CPArray","CPString"]), new objj_method(sel_getUid("printVersionAndExit"), function $Nib2Cib__printVersionAndExit(self, _cmd)
{
    objj_msgSend(self, "printVersion");
    OS.exit(0);
}
,["void"]), new objj_method(sel_getUid("printVersion"), function $Nib2Cib__printVersion(self, _cmd)
{
    var path = FILE.dirname(FILE.dirname(FILE.canonical(SYS.args[0]))),
        version = null;
    if (FILE.basename(path) === "narwhal")
        path = FILE.join(path, "packages", "cappuccino");
    path = FILE.join(path, "lib", "nib2cib", "Info.plist");
    if (FILE.isReadable(path))
    {
        var plist = FILE.read(path);
        if (!plist)
            return;
        plist = CFPropertyList.propertyListFromString(plist);
        if (!plist)
            return;
        version = plist.valueForKey("CPBundleVersion");
        if (version)
            stream.print("nib2cib v" + version);
    }
    if (!version)
        stream.print("<No version info available>");
}
,["void"]), new objj_method(sel_getUid("exceptionReason:"), function $Nib2Cib__exceptionReason_(self, _cmd, exception)
{
    if (typeof exception === "string")
        return exception;
    else if (exception.isa && objj_msgSend(exception, "respondsToSelector:", sel_getUid("reason")))
        return objj_msgSend(exception, "reason");
    else
        return "An unknown error occurred";
}
,["CPString","JSObject"]), new objj_method(sel_getUid("failWithMessage:"), function $Nib2Cib__failWithMessage_(self, _cmd, message)
{
    objj_msgSend(CPException, "raise:reason:", ConverterConversionException, message);
}
,["void","CPString"]), new objj_method(sel_getUid("logError:"), function $Nib2Cib__logError_(self, _cmd, message)
{
    if (Nib2CibColorizeOutput)
        message = CPLogColorize(message, "fatal");
    stream.printError(message);
}
,["void","CPString"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("sharedNib2Cib"), function $Nib2Cib__sharedNib2Cib(self, _cmd)
{
    return SharedNib2Cib;
}
,["Nib2Cib"]), new objj_method(sel_getUid("defaultTheme"), function $Nib2Cib__defaultTheme(self, _cmd)
{
    return objj_msgSend(SharedNib2Cib, "themes")[0];
}
,["CPTheme"])]);
}logFormatter = function(aString, aLevel, aTitle)
{
    if (!Nib2CibColorizeOutput || aLevel === "info")
        return aString;
    else
        return CPLogColorize(aString, aLevel);
}
p;18;Nib2CibException.jt;56;@STATIC;1.0;t;39;Nib2CibException = "Nib2CibException";
p;24;Nib2CibKeyedUnarchiver.jt;3442;@STATIC;1.0;I;30;Foundation/CPKeyedUnarchiver.ji;18;Nib2CibException.jt;3365;objj_executeFile("Foundation/CPKeyedUnarchiver.j", NO);objj_executeFile("Nib2CibException.j", YES);var FILE = require("file");
{var the_class = objj_allocateClassPair(CPKeyedUnarchiver, "Nib2CibKeyedUnarchiver"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("allObjects"), function $Nib2CibKeyedUnarchiver__allObjects(self, _cmd)
{
    return self._objects;
}
,["CPArray"]), new objj_method(sel_getUid("resourceInfoForName:inFramework:"), function $Nib2CibKeyedUnarchiver__resourceInfoForName_inFramework_(self, _cmd, aName, framework)
{
    var nib2cib = objj_msgSend(Nib2Cib, "sharedNib2Cib"),
        frameworks = objj_msgSend(nib2cib, "frameworks");
    if (framework)
    {
        var info = objj_msgSend(frameworks, "valueForKey:", framework);
        if (!info)
            objj_msgSend(CPException, "raise:format:", Nib2CibException, "The framework “%@” specified by the image “%@@%@” cannot be found.", framework, aName, framework);
        else if (!info.resourceDirectory)
            objj_msgSend(CPException, "raise:format:", Nib2CibException, "The framework “%@” specified by the image “%@@%@” has no Resources directory.", framework, aName, framework);
        var path = objj_msgSend(self, "_resourcePathForName:inDirectory:", aName, info.resourceDirectory);
        if (path)
            return {path: path, framework: framework};
    }
    else
    {
        var resourcesDirectory = objj_msgSend(nib2cib, "appResourceDirectory"),
            path = objj_msgSend(self, "_resourcePathForName:inDirectory:", aName, resourcesDirectory);
        if (path)
            return {path: path, framework: framework};
        var enumerator = objj_msgSend(frameworks, "keyEnumerator");
        while (framework = objj_msgSend(enumerator, "nextObject"))
        {
            var info = objj_msgSend(frameworks, "valueForKey:", framework);
            if (!info || !info.resourceDirectory)
                continue;
            path = objj_msgSend(self, "_resourcePathForName:inDirectory:", aName, info.resourceDirectory);
            if (path)
                return {path: path, framework: framework};
        }
    }
    objj_msgSend(CPException, "raise:format:", Nib2CibException, "The image “%@” cannot be found.", aName);
}
,["JSObject","CPString","CPString"]), new objj_method(sel_getUid("_resourcePathForName:inDirectory:"), function $Nib2CibKeyedUnarchiver___resourcePathForName_inDirectory_(self, _cmd, aName, directory)
{
    var pathGroups = [FILE.listPaths(directory)];
    while (pathGroups.length > 0)
    {
        var paths = pathGroups.shift(),
            index = 0,
            count = paths.length;
        for (; index < count; ++index)
        {
            var path = paths[index];
            if (FILE.basename(path) === aName)
                return path;
            else if (FILE.isDirectory(path))
                pathGroups.push(FILE.listPaths(path));
            else if (!FILE.extension(aName) && (FILE.basename(path)).replace(/\.[^.]*$/, "") === aName)
                return path;
        }
    }
    return nil;
}
,["CPString","CPString","CPString"])]);
}FILE.listPaths = function(aPath)
{
    var paths = FILE.list(aPath),
        count = paths.length;
    while (count--)
        paths[count] = FILE.join(aPath, paths[count]);
    return paths;
};
p;10;NSAppKit.jt;4488;@STATIC;1.0;i;15;_NSCornerView.ji;19;NSArrayController.ji;7;NSBox.ji;10;NSButton.ji;11;NSBrowser.ji;8;NSCell.ji;16;NSClassSwapper.ji;12;NSClipView.ji;9;NSColor.ji;13;NSColorWell.ji;18;NSCollectionView.ji;22;NSCollectionViewItem.ji;12;NSComboBox.ji;11;NSControl.ji;16;NSCustomObject.ji;18;NSCustomResource.ji;14;NSCustomView.ji;14;NSDatePicker.ji;24;NSDictionaryController.ji;9;NSEvent.ji;8;NSFont.ji;16;NSIBObjectData.ji;9;NSImage.ji;13;NSImageView.ji;20;NSLayoutConstraint.ji;18;NSLevelIndicator.ji;10;NSMatrix.ji;8;NSMenu.ji;12;NSMenuItem.ji;7;NSNib.ji;16;NSNibConnector.ji;20;NSObjectController.ji;15;NSOutlineView.ji;15;NSPopUpButton.ji;19;NSPredicateEditor.ji;13;NSResponder.ji;14;NSRuleEditor.ji;14;NSScrollView.ji;12;NSScroller.ji;15;NSSearchField.ji;7;NSSet.ji;19;NSSecureTextField.ji;20;NSSegmentedControl.ji;10;NSSlider.ji;13;NSSplitView.ji;11;NSStepper.ji;15;NSTableColumn.ji;17;NSTableCellView.ji;19;NSTableHeaderView.ji;13;NSTableView.ji;11;NSTabView.ji;15;NSTabViewItem.ji;13;NSTextField.ji;14;NSTokenField.ji;11;NSToolbar.ji;28;NSToolbarFlexibleSpaceItem.ji;15;NSToolbarItem.ji;25;NSToolbarShowColorsItem.ji;24;NSToolbarSeparatorItem.ji;20;NSToolbarSpaceItem.ji;26;NSUserDefaultsController.ji;8;NSView.ji;18;NSViewController.ji;18;NSWindowTemplate.ji;9;WebView.ji;18;NSSortDescriptor.ji;11;NSPopover.ji;21;NSProgressIndicator.jt;3139;objj_executeFile("_NSCornerView.j", YES);objj_executeFile("NSArrayController.j", YES);objj_executeFile("NSBox.j", YES);objj_executeFile("NSButton.j", YES);objj_executeFile("NSBrowser.j", YES);objj_executeFile("NSCell.j", YES);objj_executeFile("NSClassSwapper.j", YES);objj_executeFile("NSClipView.j", YES);objj_executeFile("NSColor.j", YES);objj_executeFile("NSColorWell.j", YES);objj_executeFile("NSCollectionView.j", YES);objj_executeFile("NSCollectionViewItem.j", YES);objj_executeFile("NSComboBox.j", YES);objj_executeFile("NSControl.j", YES);objj_executeFile("NSCustomObject.j", YES);objj_executeFile("NSCustomResource.j", YES);objj_executeFile("NSCustomView.j", YES);objj_executeFile("NSDatePicker.j", YES);objj_executeFile("NSDictionaryController.j", YES);objj_executeFile("NSEvent.j", YES);objj_executeFile("NSFont.j", YES);objj_executeFile("NSIBObjectData.j", YES);objj_executeFile("NSImage.j", YES);objj_executeFile("NSImageView.j", YES);objj_executeFile("NSLayoutConstraint.j", YES);objj_executeFile("NSLevelIndicator.j", YES);objj_executeFile("NSMatrix.j", YES);objj_executeFile("NSMenu.j", YES);objj_executeFile("NSMenuItem.j", YES);objj_executeFile("NSNib.j", YES);objj_executeFile("NSNibConnector.j", YES);objj_executeFile("NSObjectController.j", YES);objj_executeFile("NSOutlineView.j", YES);objj_executeFile("NSPopUpButton.j", YES);objj_executeFile("NSPredicateEditor.j", YES);objj_executeFile("NSResponder.j", YES);objj_executeFile("NSRuleEditor.j", YES);objj_executeFile("NSScrollView.j", YES);objj_executeFile("NSScroller.j", YES);objj_executeFile("NSSearchField.j", YES);objj_executeFile("NSSet.j", YES);objj_executeFile("NSSecureTextField.j", YES);objj_executeFile("NSSegmentedControl.j", YES);objj_executeFile("NSSlider.j", YES);objj_executeFile("NSSplitView.j", YES);objj_executeFile("NSStepper.j", YES);objj_executeFile("NSTableColumn.j", YES);objj_executeFile("NSTableCellView.j", YES);objj_executeFile("NSTableHeaderView.j", YES);objj_executeFile("NSTableView.j", YES);objj_executeFile("NSTabView.j", YES);objj_executeFile("NSTabViewItem.j", YES);objj_executeFile("NSTextField.j", YES);objj_executeFile("NSTokenField.j", YES);objj_executeFile("NSToolbar.j", YES);objj_executeFile("NSToolbarFlexibleSpaceItem.j", YES);objj_executeFile("NSToolbarItem.j", YES);objj_executeFile("NSToolbarShowColorsItem.j", YES);objj_executeFile("NSToolbarSeparatorItem.j", YES);objj_executeFile("NSToolbarSpaceItem.j", YES);objj_executeFile("NSUserDefaultsController.j", YES);objj_executeFile("NSView.j", YES);objj_executeFile("NSViewController.j", YES);objj_executeFile("NSWindowTemplate.j", YES);objj_executeFile("WebView.j", YES);objj_executeFile("NSSortDescriptor.j", YES);objj_executeFile("NSPopover.j", YES);objj_executeFile("NSProgressIndicator.j", YES);CP_NSMapClassName = function(aClassName)
{
    if (aClassName.indexOf("NS") === 0)
    {
        var mappedClassName = "CP" + aClassName.substr(2);
        if (CPClassFromString(mappedClassName))
        {
            CPLog.debug("NSAppKit: mapping " + aClassName + " to " + mappedClassName);
            return mappedClassName;
        }
    }
    return aClassName;
}
p;9;NSArray.jt;571;@STATIC;1.0;I;21;Foundation/CPObject.jt;527;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSArray"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSArray__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(aCoder, "decodeObjectForKey:", "NS.objects");
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSArray, "NSMutableArray"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;19;NSArrayController.jt;2010;@STATIC;1.0;I;26;AppKit/CPArrayController.jt;1960;objj_executeFile("AppKit/CPArrayController.j", NO);{
var the_class = objj_getClass("CPArrayController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPArrayController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPArrayController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPArrayController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._avoidsEmptySelection = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAvoidsEmptySelection");
        self._clearsFilterPredicateOnInsertion = objj_msgSend(aCoder, "decodeBoolForKey:", "NSClearsFilterPredicateOnInsertion");
        self._filterRestrictsInsertion = objj_msgSend(aCoder, "decodeBoolForKey:", "NSFilterRestrictsInsertion");
        self._preservesSelection = objj_msgSend(aCoder, "decodeBoolForKey:", "NSPreservesSelection");
        self._selectsInsertedObjects = objj_msgSend(aCoder, "decodeBoolForKey:", "NSSelectsInsertedObjects");
        self._alwaysUsesMultipleValuesMarker = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAlwaysUsesMultipleValuesMarker");
        self._automaticallyRearrangesObjects = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAutomaticallyRearrangesObjects");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPArrayController, "NSArrayController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSArrayController__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSArrayController__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPArrayController, "class");
}
,["Class"])]);
}p;20;NSAttributedString.jt;738;@STATIC;1.0;I;21;Foundation/CPObject.jI;31;Foundation/CPAttributedString.jt;658;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPAttributedString.j", NO);{var the_class = objj_allocateClassPair(CPAttributedString, "NSAttributedString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSAttributedString__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(objj_msgSend(CPAttributedString, "alloc"), "initWithString:", "");
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSAttributedString, "NSMutableAttributedString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;7;NSBox.jt;2828;@STATIC;1.0;I;14;AppKit/CPBox.jt;2790;objj_executeFile("AppKit/CPBox.j", NO);{
var the_class = objj_getClass("CPBox")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPBox\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPBox__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPBox").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._boxType = objj_msgSend(aCoder, "decodeIntForKey:", "NSBoxType");
        self._borderType = objj_msgSend(aCoder, "decodeIntForKey:", "NSBorderType");
        var borderColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBorderColor2"),
            fillColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFillColor2"),
            cornerRadius = objj_msgSend(aCoder, "decodeFloatForKey:", "NSCornerRadius2"),
            borderWidth = objj_msgSend(aCoder, "decodeFloatForKey:", "NSBorderWidth2"),
            contentMargin = objj_msgSend(aCoder, "decodeSizeForKey:", "NSOffsets");
        var frame = objj_msgSend(self, "frame");
        if (self._boxType !== CPBoxSeparator && (self._boxType === CPBoxPrimary || self._boxType === CPBoxSecondary))
        {
            frame.origin.y += 4;
            frame.origin.x += 4;
            frame.size.width -= 8;
            frame.size.height -= 6;
        }
        objj_msgSend(self, "setFrame:", frame);
        if (self._boxType !== CPBoxPrimary && self._boxType !== CPBoxSecondary)
        {
            if (borderColor)
                objj_msgSend(self, "setBorderColor:", borderColor);
            if (fillColor)
                objj_msgSend(self, "setFillColor:", fillColor);
            objj_msgSend(self, "setCornerRadius:", cornerRadius);
            objj_msgSend(self, "setBorderWidth:", borderWidth);
            objj_msgSend(self, "setContentViewMargins:", contentMargin);
        }
        self._title = objj_msgSend(objj_msgSend(aCoder, "decodeObjectForKey:", "NSTitleCell"), "objectValue") || "";
        self._titlePosition = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTitlePosition");
        if (self._titlePosition === undefined)
            self._titlePosition = CPAtTop;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPBox, "NSBox"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSBox__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSBox__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPBox, "class");
}
,["Class"])]);
}p;11;NSBrowser.jt;2378;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;AppKit/CPBrowser.jI;20;AppKit/CPTextField.jI;16;AppKit/CPColor.jt;2264;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPBrowser.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("AppKit/CPColor.j", NO);{
var the_class = objj_getClass("CPBrowser")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPBrowser\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPBrowser__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPBrowser").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSBrFlags");
        self._columnWidths = [];
        self._allowsEmptySelection = flags & 0x10000000 ? YES : NO;
        self._allowsMultipleSelection = flags & 0x08000000 ? YES : NO;
        self._minColumnWidth = objj_msgSend(aCoder, "decodeFloatForKey:", "NSMinColumnWidth");
        self._rowHeight = objj_msgSend(aCoder, "decodeFloatForKey:", "NSBrowserRowHeight");
        self._prototypeView = objj_msgSend(objj_msgSend(CPTextField, "alloc"), "initWithFrame:", CGRectMakeZero());
        objj_msgSend(self._prototypeView, "setVerticalAlignment:", CPCenterVerticalTextAlignment);
        objj_msgSend(self._prototypeView, "setValue:forThemeAttribute:inState:", objj_msgSend(CPColor, "whiteColor"), "text-color", CPThemeStateSelectedDataView);
        objj_msgSend(self._prototypeView, "setLineBreakMode:", CPLineBreakByTruncatingTail);
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPBrowser, "NSBrowser"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSBrowser__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSBrowser__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPBrowser, "class");
}
,["Class"])]);
}p;10;NSButton.jt;15170;@STATIC;1.0;I;17;AppKit/CPButton.jI;19;AppKit/CPCheckBox.jI;16;AppKit/CPRadio.ji;8;NSCell.ji;11;NSControl.jt;15055;objj_executeFile("AppKit/CPButton.j", NO);objj_executeFile("AppKit/CPCheckBox.j", NO);objj_executeFile("AppKit/CPRadio.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);var NSButtonIsBorderedMask = 0x00800000,
    NSButtonAllowsMixedStateMask = 0x1000000,
    NSButtonImagePositionMask = 0xFF0000,
    NSButtonImagePositionShift = 16,
    NSButtonNoImagePositionMask = 0x04,
    NSButtonImageAbovePositionMask = 0x0C,
    NSButtonImageBelowPositionMask = 0x1C,
    NSButtonImageRightPositionMask = 0x2C,
    NSButtonImageLeftPositionMask = 0x3C,
    NSButtonImageOnlyPositionMask = 0x44,
    NSButtonImageOverlapsPositionMask = 0x6C,
    NSHighlightsByPushInCellMask = 0x80000000,
    NSHighlightsByContentsCellMask = 0x08000000,
    NSHighlightsByChangeGrayCellMask = 0x04000000,
    NSHighlightsByChangeBackgroundCellMask = 0x02000000,
    NSShowsStateByContentsCellMask = 0x40000000,
    NSShowsStateByChangeGrayCellMask = 0x20000000,
    NSShowsStateByChangeBackgroundCellMask = 0x10000000;
{
var the_class = objj_getClass("CPButton")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPButton\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPButton__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPButton").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPButton__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPButton").super_class }, "NS_initWithCell:", cell);
    var alternateImage = objj_msgSend(cell, "alternateImage"),
        positionOffsetSizeWidth = 0,
        positionOffsetOriginX = 0,
        positionOffsetOriginY = 0;
    if (objj_msgSend(alternateImage, "isKindOfClass:", objj_msgSend(NSButtonImageSource, "class")))
    {
        if (objj_msgSend(alternateImage, "imageName") === "NSSwitch")
        {
            self.isa = objj_msgSend(CPCheckBox, "class");
        }
        else if (objj_msgSend(alternateImage, "imageName") === "NSRadioButton")
        {
            self.isa = objj_msgSend(CPRadio, "class");
            self._radioGroup = objj_msgSend(CPRadioGroup, "new");
        }
        self._themeClass = objj_msgSend(objj_msgSend(self, "class"), "defaultThemeClass");
        alternateImage = nil;
    }
    NIB_CONNECTION_EQUIVALENCY_TABLE[objj_msgSend(cell, "UID")] = self;
    self._title = objj_msgSend(cell, "title");
    self._alternateTitle = objj_msgSend(cell, "alternateTitle");
    self._controlSize = CPRegularControlSize;
    objj_msgSend(self, "setBordered:", objj_msgSend(cell, "isBordered"));
    self._bezelStyle = objj_msgSend(cell, "bezelStyle");
    var fixedHeight;
    switch(self._bezelStyle) {
    case CPRoundedBezelStyle:
        positionOffsetOriginY = 6;
        positionOffsetOriginX = 6;
        positionOffsetSizeWidth = -12;
        fixedHeight = YES;
        break;
    case CPTexturedRoundedBezelStyle:
        positionOffsetOriginY = 2;
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        fixedHeight = YES;
        break;
    case CPHUDBezelStyle:
        fixedHeight = YES;
        break;
    case CPRoundRectBezelStyle:
        positionOffsetOriginY = -3;
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPRoundedBezelStyle;
        fixedHeight = YES;
        break;
    case CPSmallSquareBezelStyle:
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        fixedHeight = NO;
        break;
    case CPThickSquareBezelStyle:
    case CPThickerSquareBezelStyle:
    case CPRegularSquareBezelStyle:
        positionOffsetOriginY = 3;
        positionOffsetOriginX = 0;
        positionOffsetSizeWidth = -4;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        fixedHeight = NO;
        break;
    case CPTexturedSquareBezelStyle:
        positionOffsetOriginY = 4;
        positionOffsetOriginX = -1;
        positionOffsetSizeWidth = -2;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        fixedHeight = NO;
        break;
    case CPShadowlessSquareBezelStyle:
        positionOffsetOriginY = 5;
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        fixedHeight = NO;
        break;
    case CPRecessedBezelStyle:
        positionOffsetOriginY = -3;
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPHUDBezelStyle;
        fixedHeight = YES;
        break;
    case CPRoundedDisclosureBezelStyle:
    case CPHelpButtonBezelStyle:
    case CPCircularBezelStyle:
    case CPDisclosureBezelStyle:
        CPLog.warn("NSButton [%s]: unsupported bezel style: %d", self._title == null ? "<no title>" : '"' + self._title + '"', self._bezelStyle);
        self._bezelStyle = CPHUDBezelStyle;
        fixedHeight = YES;
        break;
default:
        CPLog.warn("NSButton [%s]: unknown bezel style: %d", self._title == null ? "<no title>" : '"' + self._title + '"', self._bezelStyle);
        self._bezelStyle = CPHUDBezelStyle;
        fixedHeight = YES;
    }
    if (objj_msgSend(cell, "isBordered") || objj_msgSend(self, "isKindOfClass:", objj_msgSend(CPRadio, "class")) || objj_msgSend(self, "isKindOfClass:", objj_msgSend(CPCheckBox, "class")))
    {
        var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
            minSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "min-size", objj_msgSend(self, "class")),
            maxSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "max-size", objj_msgSend(self, "class")),
            adjustHeight = NO;
        if (minSize.height > 0 && maxSize.height > 0 && minSize.height === maxSize.height)
        {
            adjustHeight = YES;
            fixedHeight = minSize.height === maxSize.height;
        }
        else if (minSize.height < 0 && maxSize.height > 0)
            adjustHeight = fixedHeight;
        else
            adjustHeight = minSize.height > 0 || maxSize.height > 0;
        if (adjustHeight)
        {
            var oldHeight = self._frame.size.height;
            if (minSize.height > 0)
                self._frame.size.height = self._bounds.size.height = MAX(self._frame.size.height, minSize.height);
            if (maxSize.height > 0)
                self._frame.size.height = self._bounds.size.height = MIN(self._frame.size.height, maxSize.height);
            if (self._frame.size.height !== oldHeight)
                CPLog.debug("NSButton [%s]: adjusted height from %d to %d", self._title == null ? "<no title>" : '"' + self._title + '"', oldHeight, self._frame.size.height);
        }
        if (objj_msgSend(cell, "isBordered"))
        {
            self._frame.origin.x += positionOffsetOriginX;
            self._frame.origin.y += positionOffsetOriginY;
            self._frame.size.width += positionOffsetSizeWidth;
            self._bounds.size.width += positionOffsetSizeWidth;
        }
    }
    self._keyEquivalent = objj_msgSend(cell, "keyEquivalent");
    self._keyEquivalentModifierMask = objj_msgSend(cell, "keyEquivalentModifierMask");
    self._imageDimsWhenDisabled = YES;
    self._allowsMixedState = objj_msgSend(cell, "allowsMixedState");
    objj_msgSend(self, "setImage:", objj_msgSend(cell, "normalImage"));
    objj_msgSend(self, "setAlternateImage:", alternateImage);
    objj_msgSend(self, "setImagePosition:", objj_msgSend(cell, "imagePosition"));
    objj_msgSend(self, "setEnabled:", objj_msgSend(cell, "isEnabled"));
    self._highlightsBy = objj_msgSend(cell, "highlightsBy");
    self._showsStateBy = objj_msgSend(cell, "showsStateBy");
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPButton, "NSButton"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSButton__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSButton__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPButton, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSActionCell, "NSButtonCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_isBordered"), new objj_ivar("_bezelStyle"), new objj_ivar("_title"), new objj_ivar("_alternateTitle"), new objj_ivar("_normalImage"), new objj_ivar("_alternateImage"), new objj_ivar("_allowsMixedState"), new objj_ivar("_imagePosition"), new objj_ivar("_highlightsBy"), new objj_ivar("_showsStateBy"), new objj_ivar("_keyEquivalent"), new objj_ivar("_keyEquivalentModifierMask")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("isBordered"), function $NSButtonCell__isBordered(self, _cmd)
{
    return self._isBordered;
}
,["BOOL"]), new objj_method(sel_getUid("bezelStyle"), function $NSButtonCell__bezelStyle(self, _cmd)
{
    return self._bezelStyle;
}
,["int"]), new objj_method(sel_getUid("title"), function $NSButtonCell__title(self, _cmd)
{
    return self._title;
}
,["CPString"]), new objj_method(sel_getUid("alternateTitle"), function $NSButtonCell__alternateTitle(self, _cmd)
{
    return self._alternateTitle;
}
,["CPString"]), new objj_method(sel_getUid("normalImage"), function $NSButtonCell__normalImage(self, _cmd)
{
    return self._normalImage;
}
,["CPImage"]), new objj_method(sel_getUid("alternateImage"), function $NSButtonCell__alternateImage(self, _cmd)
{
    return self._alternateImage;
}
,["CPImage"]), new objj_method(sel_getUid("allowsMixedState"), function $NSButtonCell__allowsMixedState(self, _cmd)
{
    return self._allowsMixedState;
}
,["BOOL"]), new objj_method(sel_getUid("imagePosition"), function $NSButtonCell__imagePosition(self, _cmd)
{
    return self._imagePosition;
}
,["BOOL"]), new objj_method(sel_getUid("highlightsBy"), function $NSButtonCell__highlightsBy(self, _cmd)
{
    return self._highlightsBy;
}
,["int"]), new objj_method(sel_getUid("showsStateBy"), function $NSButtonCell__showsStateBy(self, _cmd)
{
    return self._showsStateBy;
}
,["int"]), new objj_method(sel_getUid("keyEquivalent"), function $NSButtonCell__keyEquivalent(self, _cmd)
{
    return self._keyEquivalent;
}
,["CPString"]), new objj_method(sel_getUid("keyEquivalentModifierMask"), function $NSButtonCell__keyEquivalentModifierMask(self, _cmd)
{
    return self._keyEquivalentModifierMask;
}
,["unsigned"]), new objj_method(sel_getUid("initWithCoder:"), function $NSButtonCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSButtonCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        var buttonFlags = objj_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags"),
            buttonFlags2 = objj_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags2"),
            cellFlags2 = objj_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags2"),
            position = (buttonFlags & NSButtonImagePositionMask) >> NSButtonImagePositionShift;
        self._isBordered = buttonFlags & NSButtonIsBorderedMask ? YES : NO;
        self._bezelStyle = buttonFlags2 & 0x7 | (buttonFlags2 & 0x20) >> 2;
        self._title = objj_msgSend(aCoder, "decodeObjectForKey:", "NSContents");
        self._alternateTitle = objj_msgSend(aCoder, "decodeObjectForKey:", "NSAlternateContents");
        self._objectValue = objj_msgSend(self, "state");
        self._normalImage = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNormalImage");
        self._alternateImage = objj_msgSend(aCoder, "decodeObjectForKey:", "NSAlternateImage");
        self._allowsMixedState = cellFlags2 & NSButtonAllowsMixedStateMask ? YES : NO;
        if ((position & NSButtonImageOverlapsPositionMask) == NSButtonImageOverlapsPositionMask)
            self._imagePosition = CPImageOverlaps;
        else if ((position & NSButtonImageOnlyPositionMask) == NSButtonImageOnlyPositionMask)
            self._imagePosition = CPImageOnly;
        else if ((position & NSButtonImageLeftPositionMask) == NSButtonImageLeftPositionMask)
            self._imagePosition = CPImageLeft;
        else if ((position & NSButtonImageRightPositionMask) == NSButtonImageRightPositionMask)
            self._imagePosition = CPImageRight;
        else if ((position & NSButtonImageBelowPositionMask) == NSButtonImageBelowPositionMask)
            self._imagePosition = CPImageBelow;
        else if ((position & NSButtonImageAbovePositionMask) == NSButtonImageAbovePositionMask)
            self._imagePosition = CPImageAbove;
        else if ((position & NSButtonNoImagePositionMask) == NSButtonNoImagePositionMask)
            self._imagePosition = CPNoImage;
        self._highlightsBy = CPNoCellMask;
        if (buttonFlags & NSHighlightsByPushInCellMask)
            self._highlightsBy |= CPPushInCellMask;
        if (buttonFlags & NSHighlightsByContentsCellMask)
            self._highlightsBy |= CPContentsCellMask;
        if (buttonFlags & NSHighlightsByChangeGrayCellMask)
            self._highlightsBy |= CPChangeGrayCellMask;
        if (buttonFlags & NSHighlightsByChangeBackgroundCellMask)
            self._highlightsBy |= CPChangeBackgroundCellMask;
        self._showsStateBy = CPNoCellMask;
        if (buttonFlags & NSShowsStateByContentsCellMask)
            self._showsStateBy |= CPContentsCellMask;
        if (buttonFlags & NSShowsStateByChangeGrayCellMask)
            self._showsStateBy |= CPChangeGrayCellMask;
        if (buttonFlags & NSShowsStateByChangeBackgroundCellMask)
            self._showsStateBy |= CPChangeBackgroundCellMask;
        self._keyEquivalent = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyEquivalent");
        self._keyEquivalentModifierMask = buttonFlags2 >> 8;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPObject, "NSButtonImageSource"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_imageName")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("imageName"), function $NSButtonImageSource__imageName(self, _cmd)
{
    return self._imageName;
}
,["CPString"]), new objj_method(sel_getUid("initWithCoder:"), function $NSButtonImageSource__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSButtonImageSource").super_class }, "init");
    if (self)
        self._imageName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSImageName");
    return self;
}
,["id","CPCoder"])]);
}p;22;NSByteCountFormatter.jt;1959;@STATIC;1.0;I;33;Foundation/CPByteCountFormatter.jt;1902;objj_executeFile("Foundation/CPByteCountFormatter.j", NO);{
var the_class = objj_getClass("CPByteCountFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPByteCountFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPByteCountFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPByteCountFormatter").super_class }, "init");
    if (self)
    {
        self._countStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSKBSize") || 0;
        self._allowsNonnumericFormatting = !objj_msgSend(aCoder, "containsValueForKey:", "NSNoNonnumeric");
        self._includesActualByteCount = objj_msgSend(aCoder, "containsValueForKey:", "NSActual");
        self._includesCount = !objj_msgSend(aCoder, "containsValueForKey:", "NSNoCount");
        self._includesUnit = !objj_msgSend(aCoder, "containsValueForKey:", "NSNoUnit");
        self._adaptive = !objj_msgSend(aCoder, "containsValueForKey:", "NSNoAdaptive");
        self._zeroPadsFractionDigits = objj_msgSend(aCoder, "containsValueForKey:", "NSZeroPad");
        self._allowedUnits = objj_msgSend(aCoder, "decodeIntForKey:", "NSUnits") || 0;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPByteCountFormatter, "NSByteCountFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSByteCountFormatter__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSByteCountFormatter__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPByteCountFormatter, "class");
}
,["Class"])]);
}p;8;NSCell.jt;6002;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;AppKit/CPControl.ji;8;NSFont.jt;5922;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPControl.j", NO);objj_executeFile("NSFont.j", YES);{var the_class = objj_allocateClassPair(CPObject, "NSCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_state"), new objj_ivar("_isHighlighted"), new objj_ivar("_isEnabled"), new objj_ivar("_isEditable"), new objj_ivar("_isBordered"), new objj_ivar("_isBezeled"), new objj_ivar("_isSelectable"), new objj_ivar("_isScrollable"), new objj_ivar("_isContinuous"), new objj_ivar("_scrolls"), new objj_ivar("_wraps"), new objj_ivar("_truncates"), new objj_ivar("_sendsActionOnEndEditing"), new objj_ivar("_alignment"), new objj_ivar("_controlSize"), new objj_ivar("_objectValue"), new objj_ivar("_font"), new objj_ivar("_lineBreakMode"), new objj_ivar("_formatter"), new objj_ivar("_tag")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("state"), function $NSCell__state(self, _cmd)
{
    return self._state;
}
,["int"]), new objj_method(sel_getUid("isHighlighted"), function $NSCell__isHighlighted(self, _cmd)
{
    return self._isHighlighted;
}
,["BOOL"]), new objj_method(sel_getUid("isEnabled"), function $NSCell__isEnabled(self, _cmd)
{
    return self._isEnabled;
}
,["BOOL"]), new objj_method(sel_getUid("isEditable"), function $NSCell__isEditable(self, _cmd)
{
    return self._isEditable;
}
,["BOOL"]), new objj_method(sel_getUid("isBordered"), function $NSCell__isBordered(self, _cmd)
{
    return self._isBordered;
}
,["BOOL"]), new objj_method(sel_getUid("isBezeled"), function $NSCell__isBezeled(self, _cmd)
{
    return self._isBezeled;
}
,["BOOL"]), new objj_method(sel_getUid("isSelectable"), function $NSCell__isSelectable(self, _cmd)
{
    return self._isSelectable;
}
,["BOOL"]), new objj_method(sel_getUid("isScrollable"), function $NSCell__isScrollable(self, _cmd)
{
    return self._isScrollable;
}
,["BOOL"]), new objj_method(sel_getUid("isContinuous"), function $NSCell__isContinuous(self, _cmd)
{
    return self._isContinuous;
}
,["BOOL"]), new objj_method(sel_getUid("scrolls"), function $NSCell__scrolls(self, _cmd)
{
    return self._scrolls;
}
,["BOOL"]), new objj_method(sel_getUid("wraps"), function $NSCell__wraps(self, _cmd)
{
    return self._wraps;
}
,["BOOL"]), new objj_method(sel_getUid("truncates"), function $NSCell__truncates(self, _cmd)
{
    return self._truncates;
}
,["BOOL"]), new objj_method(sel_getUid("sendsActionOnEndEditing"), function $NSCell__sendsActionOnEndEditing(self, _cmd)
{
    return self._sendsActionOnEndEditing;
}
,["BOOL"]), new objj_method(sel_getUid("alignment"), function $NSCell__alignment(self, _cmd)
{
    return self._alignment;
}
,["CPTextAlignment"]), new objj_method(sel_getUid("controlSize"), function $NSCell__controlSize(self, _cmd)
{
    return self._controlSize;
}
,["CPControlSize"]), new objj_method(sel_getUid("objectValue"), function $NSCell__objectValue(self, _cmd)
{
    return self._objectValue;
}
,["id"]), new objj_method(sel_getUid("font"), function $NSCell__font(self, _cmd)
{
    return self._font;
}
,["CPFont"]), new objj_method(sel_getUid("lineBreakMode"), function $NSCell__lineBreakMode(self, _cmd)
{
    return self._lineBreakMode;
}
,["int"]), new objj_method(sel_getUid("formatter"), function $NSCell__formatter(self, _cmd)
{
    return self._formatter;
}
,["CPFormatter"]), new objj_method(sel_getUid("tag"), function $NSCell__tag(self, _cmd)
{
    return self._tag;
}
,["int"]), new objj_method(sel_getUid("initWithCoder:"), function $NSCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCell").super_class }, "init");
    if (self)
    {
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags"),
            flags2 = objj_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags2");
        self._state = flags & 0x80000000 ? CPOnState : CPOffState;
        self._isHighlighted = flags & 0x40000000 ? YES : NO;
        self._isEnabled = flags & 0x20000000 ? NO : YES;
        self._isEditable = flags & 0x10000000 ? YES : NO;
        self._isBordered = flags & 0x00800000 ? YES : NO;
        self._isBezeled = flags & 0x00400000 ? YES : NO;
        self._isSelectable = flags & 0x00200000 ? YES : NO;
        self._isScrollable = flags & 0x00100000 ? YES : NO;
        self._isContinuous = flags & 0x00080100 ? YES : NO;
        self._scrolls = flags & 0x00100000 && flags & 0x00000040;
        self._wraps = flags & 0x00100000 === 0 && flags & 0x00000040 === 0;
        self._truncates = !(flags & 0x00100000) && flags & 0x00000040;
        self._alignment = (flags2 & 0x1c000000) >> 26;
        self._lineBreakMode = (flags2 & 0x0E00) >> 9;
        self._controlSize = (flags2 & 0xE0000) >> 17;
        self._sendsActionOnEndEditing = flags2 & 0x00400000 ? YES : NO;
        self._tag = objj_msgSend(aCoder, "decodeIntForKey:", "NSTag");
        self._objectValue = objj_msgSend(aCoder, "decodeObjectForKey:", "NSContents");
        self._font = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSupport");
        self._formatter = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFormatter");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("replacementObjectForCoder:"), function $NSCell__replacementObjectForCoder_(self, _cmd, aCoder)
{
    return nil;
}
,["id","CPCoder"]), new objj_method(sel_getUid("stringValue"), function $NSCell__stringValue(self, _cmd)
{
    if (objj_msgSend(self._objectValue, "isKindOfClass:", objj_msgSend(CPString, "class")))
        return self._objectValue;
    if (objj_msgSend(self._objectValue, "respondsToSelector:", sel_getUid("attributedStringValue")))
        return objj_msgSend(self._objectValue, "attributedStringValue");
    return "";
}
,["CPString"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSActionCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;16;NSClassSwapper.jt;3740;@STATIC;1.0;I;21;Foundation/CPObject.jI;21;Foundation/CPString.jI;27;AppKit/_CPCibClassSwapper.jt;3637;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("AppKit/_CPCibClassSwapper.j", NO);var NSClassSwapperClassNames = {},
    NSClassSwapperOriginalClassNames = {};
var _CPCibClassSwapperClassNameKey = "_CPCibClassSwapperClassNameKey",
    _CPCibClassSwapperOriginalClassNameKey = "_CPCibClassSwapperOriginalClassNameKey";
{var the_class = objj_allocateClassPair(_CPCibClassSwapper, "NSClassSwapper"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(meta_class, [new objj_method(sel_getUid("swapperClassForClassName:originalClassName:"), function $NSClassSwapper__swapperClassForClassName_originalClassName_(self, _cmd, aClassName, anOriginalClassName)
{
    var swapperClassName = "$NSClassSwapper_" + aClassName + "_" + anOriginalClassName,
        swapperClass = objj_lookUpClass(swapperClassName);
    if (!swapperClass)
    {
        var nsClass = nil;
        if (objj_msgSend(objj_msgSend(objj_msgSend(Nib2Cib, "sharedNib2Cib"), "userNSClasses"), "containsObject:", aClassName))
            nsClass = objj_lookUpClass("NS_" + aClassName);
        var originalClass = nsClass || objj_lookUpClass(anOriginalClassName);
        swapperClass = objj_allocateClassPair(originalClass, swapperClassName);
        objj_registerClassPair(swapperClass);
        class_addMethod(swapperClass, sel_getUid("initWithCoder:"), function(self, _cmd, aCoder)
        {
            if (nsClass)
            {
                self.isa = nsClass;
                self = objj_msgSend(self, _cmd, aCoder);
                self.isa = swapperClass;
            }
            else
                self = objj_msgSendSuper({super_class: originalClass, receiver: self}, _cmd, aCoder);
            if (self)
            {
                var UID = objj_msgSend(self, "UID");
                NSClassSwapperClassNames[UID] = aClassName;
                NSClassSwapperOriginalClassNames[UID] = anOriginalClassName;
            }
            return self;
        }, "");
        class_addMethod(swapperClass, sel_getUid("classForKeyedArchiver"), function(self, _cmd)
        {
            return objj_msgSend(_CPCibClassSwapper, "class");
        }, "");
        class_addMethod(swapperClass, sel_getUid("encodeWithCoder:"), function(self, _cmd, aCoder)
        {
            if (nsClass)
            {
                self.isa = nsClass;
                objj_msgSend(self, _cmd, aCoder);
                self.isa = swapperClass;
            }
            else
                objj_msgSendSuper({super_class: originalClass, receiver: self}, _cmd, aCoder);
            if (nsClass)
            {
                var classForArchiver = objj_msgSend(nsClass, "classForKeyedArchiver");
                if (classForArchiver)
                    aClassName = objj_msgSend(classForArchiver, "className");
            }
            objj_msgSend(aCoder, "encodeObject:forKey:", aClassName, _CPCibClassSwapperClassNameKey);
            objj_msgSend(aCoder, "encodeObject:forKey:", CP_NSMapClassName(anOriginalClassName), _CPCibClassSwapperOriginalClassNameKey);
        }, "");
    }
    return swapperClass;
}
,["id","CPString","CPString"]), new objj_method(sel_getUid("allocWithCoder:"), function $NSClassSwapper__allocWithCoder_(self, _cmd, aCoder)
{
    var className = objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassName"),
        originalClassName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSOriginalClassName");
    return objj_msgSend(objj_msgSend(self, "swapperClassForClassName:originalClassName:", className, originalClassName), "alloc");
}
,["id","CPCoder"])]);
}p;12;NSClipView.jt;1659;@STATIC;1.0;I;19;AppKit/CPClipView.jt;1616;objj_executeFile("AppKit/CPClipView.j", NO);var NSClipViewDrawBackgroundFlag = 0x04;
{
var the_class = objj_getClass("CPClipView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPClipView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPClipView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPClipView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._documentView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDocView");
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NScvFlags");
        if (flags & NSClipViewDrawBackgroundFlag && objj_msgSend(aCoder, "containsValueForKey:", "NSBGColor"))
            objj_msgSend(self, "setBackgroundColor:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSBGColor"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_isFlipped"), function $CPClipView__NS_isFlipped(self, _cmd)
{
    return YES;
}
,["BOOL"])]);
}{var the_class = objj_allocateClassPair(CPClipView, "NSClipView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSClipView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSClipView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPClipView, "class");
}
,["Class"])]);
}p;18;NSCollectionView.jt;2041;@STATIC;1.0;I;25;AppKit/CPCollectionView.jt;1992;objj_executeFile("AppKit/CPCollectionView.j", NO);{
var the_class = objj_getClass("CPCollectionView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCollectionView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCollectionView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self._items = [];
    self._content = [];
    self._cachedItems = [];
    self._itemSize = CGSizeMakeZero();
    self._minItemSize = CGSizeMakeZero();
    self._maxItemSize = CGSizeMakeZero();
    self._verticalMargin = 5.0;
    self._tileWidth = -1.0;
    self._selectionIndexes = objj_msgSend(CPIndexSet, "indexSet");
    self._allowsEmptySelection = YES;
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCollectionView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._backgroundColors = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBackgroundColors");
        self._maxNumberOfRows = objj_msgSend(aCoder, "decodeIntForKey:", "NSMaxNumberOfGridRows");
        self._maxNumberOfColumns = objj_msgSend(aCoder, "decodeIntForKey:", "NSMaxNumberOfGridColumns");
        self._isSelectable = objj_msgSend(aCoder, "decodeBoolForKey:", "NSSelectable");
        self._allowsMultipleSelection = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAllowsMultipleSelection");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCollectionView, "NSCollectionView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCollectionView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCollectionView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCollectionView, "class");
}
,["Class"])]);
}p;22;NSCollectionViewItem.jt;1186;@STATIC;1.0;I;29;AppKit/CPCollectionViewItem.jt;1133;objj_executeFile("AppKit/CPCollectionViewItem.j", NO);{
var the_class = objj_getClass("CPCollectionViewItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCollectionViewItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCollectionViewItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCollectionViewItem").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCollectionViewItem, "NSCollectionViewItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCollectionViewItem__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCollectionViewItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCollectionViewItem, "class");
}
,["Class"])]);
}p;9;NSColor.jt;3513;@STATIC;1.0;I;19;Foundation/CPData.jI;16;AppKit/CPColor.jt;3449;objj_executeFile("Foundation/CPData.j", NO);objj_executeFile("AppKit/CPColor.j", NO);var NSUnknownColorSpaceModel = -1,
    NSGrayColorSpaceModel = 0,
    NSRGBColorSpaceModel = 1,
    NSCMYKColorSpaceModel = 2,
    NSLABColorSpaceModel = 3,
    NSDeviceNColorSpaceModel = 4,
    NSIndexedColorSpaceModel = 5,
    NSPatternColorSpaceModel = 6;
{
var the_class = objj_getClass("CPColor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPColor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPColor__NS_initWithCoder_(self, _cmd, aCoder)
{
    var colorSpace = objj_msgSend(aCoder, "decodeIntForKey:", "NSColorSpace"),
        result;
    switch(colorSpace) {
    case 1:
    case 2:
        var rgb = objj_msgSend(aCoder, "decodeBytesForKey:", "NSRGB"),
            string = CFData.bytesToString(rgb),
            components = objj_msgSend(string, "componentsSeparatedByString:", " "),
            values = [0, 0, 0, 1];
        for (var i = 0; i < components.length && i < 4; i++)
            values[i] = objj_msgSend(components[i], "floatValue");
        result = objj_msgSend(CPColor, "colorWithCalibratedRed:green:blue:alpha:", values[0], values[1], values[2], values[3]);
        break;
    case 3:
    case 4:
        var bytes = objj_msgSend(aCoder, "decodeBytesForKey:", "NSWhite"),
            string = CFData.bytesToString(bytes),
            components = objj_msgSend(string, "componentsSeparatedByString:", " "),
            values = [0, 1];
        for (var i = 0; i < components.length && i < 2; i++)
            values[i] = objj_msgSend(components[i], "floatValue");
        result = objj_msgSend(CPColor, "colorWithCalibratedWhite:alpha:", values[0], values[1]);
        break;
    case 6:
        var catalogName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCatalogName"),
            colorName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSColorName"),
            color = objj_msgSend(aCoder, "decodeObjectForKey:", "NSColor"),
            result = nil;
        if (catalogName === "System")
        {
            switch(colorName) {
            case "controlColor":
                result = objj_msgSend(CPColor, "colorWithCalibratedWhite:alpha:", 175.0 / 255.0, 1.0);
                break;
            case "controlBackgroundColor":
                result = objj_msgSend(CPColor, "whiteColor");
                break;
            case "gridColor":
                result = objj_msgSend(CPColor, "colorWithCalibratedWhite:alpha:", 204.0 / 255.0, 1.0);
                break;
default:
                result = color;
            }
        }
        else
            result = color;
        break;
default:
        CPLog.warn("-[%@ %s] unknown color space %d", self.isa, _cmd, colorSpace);
        result = objj_msgSend(CPColor, "blackColor");
        break;
    }
    return result;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPColor, "NSColor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSColor__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSColor__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPColor, "class");
}
,["Class"])]);
}p;13;NSColorWell.jt;2019;@STATIC;1.0;I;20;AppKit/CPColorWell.ji;8;NSCell.ji;11;NSControl.jt;1947;objj_executeFile("AppKit/CPColorWell.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPColorWell")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPColorWell\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPColorWell__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPColorWell").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        objj_msgSend(self, "setEnabled:", objj_msgSend(aCoder, "decodeBoolForKey:", "NSEnabled"));
        objj_msgSend(self, "setBordered:", objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsBordered"));
        objj_msgSend(self, "setColor:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSColor"));
        if (objj_msgSend(self, "isBordered"))
        {
            var frameSize = objj_msgSend(self, "frameSize");
            CPLog.debug("NSColorWell: adjusting height from %d to %d", frameSize.height, 24.0);
            frameSize.height = 24.0;
            objj_msgSend(self, "setFrameSize:", frameSize);
        }
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPColorWell, "NSColorWell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSColorWell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSColorWell__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPColorWell, "class");
}
,["Class"])]);
}p;12;NSComboBox.jt;4896;@STATIC;1.0;I;20;AppKit/CPTextField.jI;19;AppKit/CPComboBox.ji;13;NSTextField.jt;4810;objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("AppKit/CPComboBox.j", NO);objj_executeFile("NSTextField.j", YES);{
var the_class = objj_getClass("CPComboBox")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPComboBox\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPComboBox__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPComboBox").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPComboBox__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPComboBox").super_class }, "NS_initWithCell:", cell);
    self._items = objj_msgSend(cell, "itemList");
    self._usesDataSource = objj_msgSend(cell, "usesDataSource");
    self._completes = objj_msgSend(cell, "completes");
    self._numberOfVisibleItems = objj_msgSend(cell, "visibleItemCount");
    self._hasVerticalScroller = objj_msgSend(cell, "hasVerticalScroller");
    objj_msgSend(self, "setButtonBordered:", objj_msgSend(cell, "borderedButton"));
    objj_msgSend(self, "setEnabled:", objj_msgSend(cell, "isEnabled"));
    var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
        maxSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "max-size", objj_msgSend(CPComboBox, "class")),
        size = objj_msgSend(self, "frameSize"),
        widthOffset = -3;
    if (objj_msgSend(theme, "name") == "Aristo")
    {
        self._frame.origin.x += 1;
        widthOffset = -5;
    }
    objj_msgSend(self, "setFrameSize:", CGSizeMake(size.width + widthOffset, MIN(size.height, maxSize.height)));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPComboBox, "NSComboBox"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSComboBox__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSComboBox__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPComboBox, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSTextFieldCell, "NSComboBoxCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_visibleItemCount"), new objj_ivar("_hasVerticalScroller"), new objj_ivar("_usesDataSource"), new objj_ivar("_completes"), new objj_ivar("_itemList"), new objj_ivar("_borderedButton")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("visibleItemCount"), function $NSComboBoxCell__visibleItemCount(self, _cmd)
{
    return self._visibleItemCount;
}
,["int"]), new objj_method(sel_getUid("hasVerticalScroller"), function $NSComboBoxCell__hasVerticalScroller(self, _cmd)
{
    return self._hasVerticalScroller;
}
,["BOOL"]), new objj_method(sel_getUid("usesDataSource"), function $NSComboBoxCell__usesDataSource(self, _cmd)
{
    return self._usesDataSource;
}
,["BOOL"]), new objj_method(sel_getUid("completes"), function $NSComboBoxCell__completes(self, _cmd)
{
    return self._completes;
}
,["BOOL"]), new objj_method(sel_getUid("itemList"), function $NSComboBoxCell__itemList(self, _cmd)
{
    return self._itemList;
}
,["CPArray"]), new objj_method(sel_getUid("borderedButton"), function $NSComboBoxCell__borderedButton(self, _cmd)
{
    return self._borderedButton;
}
,["BOOL"]), new objj_method(sel_getUid("initWithCoder:"), function $NSComboBoxCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSComboBoxCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._visibleItemCount = objj_msgSend(aCoder, "decodeIntForKey:", "NSVisibleItemCount");
        self._hasVerticalScroller = objj_msgSend(aCoder, "decodeBoolForKey:", "NSHasVerticalScroller");
        self._usesDataSource = objj_msgSend(aCoder, "decodeBoolForKey:", "NSUsesDataSource");
        self._completes = objj_msgSend(aCoder, "decodeBoolForKey:", "NSCompletes");
        if (!self._usesDataSource)
            self._itemList = objj_msgSend(aCoder, "decodeObjectForKey:", "NSPopUpListData") || [];
        else
            self._itemList = [];
        self._borderedButton = objj_msgSend(aCoder, "containsValueForKey:", "NSButtonBordered") ? objj_msgSend(aCoder, "decodeBoolForKey:", "NSButtonBordered") : YES;
    }
    return self;
}
,["id","CPCoder"])]);
}p;11;NSControl.jt;2574;@STATIC;1.0;I;18;AppKit/CPControl.ji;8;NSCell.ji;8;NSView.jt;2508;objj_executeFile("AppKit/CPControl.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSView.j", YES);{
var the_class = objj_getClass("CPControl")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPControl\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPControl__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPControl").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        objj_msgSend(self, "setEnabled:", objj_msgSend(aCoder, "decodeBoolForKey:", "NSEnabled"));
        objj_msgSend(self, "sendActionOn:", CPLeftMouseUpMask);
        objj_msgSend(self, "setTarget:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSTarget"));
        objj_msgSend(self, "setAction:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSAction"));
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSTag"))
            objj_msgSend(self, "setTag:", objj_msgSend(aCoder, "decodeIntForKey:", "NSTag"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPControl__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSend(self, "setSendsActionOnEndEditing:", objj_msgSend(cell, "sendsActionOnEndEditing"));
    objj_msgSend(self, "setObjectValue:", objj_msgSend(cell, "objectValue"));
    objj_msgSend(self, "setFont:", objj_msgSend(cell, "font"));
    objj_msgSend(self, "setAlignment:", objj_msgSend(cell, "alignment"));
    objj_msgSend(self, "setContinuous:", objj_msgSend(cell, "isContinuous"));
    objj_msgSend(self, "setLineBreakMode:", objj_msgSend(cell, "lineBreakMode"));
    objj_msgSend(self, "setFormatter:", objj_msgSend(cell, "formatter"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPControl, "NSControl"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSControl__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSControl__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPControl, "class");
}
,["Class"])]);
}p;16;NSCustomObject.jt;1267;@STATIC;1.0;I;27;AppKit/_CPCibCustomObject.jt;1216;objj_executeFile("AppKit/_CPCibCustomObject.j", NO);{
var the_class = objj_getClass("_CPCibCustomObject")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomObject\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibCustomObject__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCibCustomObject").super_class }, "init");
    if (self)
        self._className = CP_NSMapClassName(objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassName"));
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCibCustomObject, "NSCustomObject"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCustomObject__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomObject__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCibCustomObject, "class");
}
,["Class"])]);
}p;18;NSCustomResource.jt;3998;@STATIC;1.0;I;29;AppKit/_CPCibCustomResource.ji;18;Nib2CibException.jt;3922;objj_executeFile("AppKit/_CPCibCustomResource.j", NO);objj_executeFile("Nib2CibException.j", YES);var FILE = require("file"),
    imageSize = (require("cappuccino/imagesize")).imagesize,
    supportedTemplateImages = ["NSAddTemplate", "NSRemoveTemplate"];
{
var the_class = objj_getClass("_CPCibCustomResource")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomResource\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibCustomResource__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCibCustomResource").super_class }, "init");
    if (self)
    {
        self._className = CP_NSMapClassName(objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassName"));
        self._resourceName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSResourceName");
        var size = CGSizeMakeZero(),
            framework = "",
            bundleIdentifier = "";
        if (self._resourceName == "NSSwitch")
            return nil;
        else if (/^NS[A-Z][A-Za-z]+$/.test(self._resourceName))
        {
            if (supportedTemplateImages.indexOf(self._resourceName) >= 0)
            {
                self._resourceName = self._resourceName.replace("NS", "CP");
            }
            else
                objj_msgSend(CPException, "raise:format:", Nib2CibException, "The built in image “%@” is not supported.", self._resourceName);
        }
        else
        {
            var match = /^(.+)@(.+)$/.exec(self._resourceName);
            if (match)
            {
                self._resourceName = match[1];
                framework = match[2];
            }
            var resourceInfo = objj_msgSend(aCoder, "resourceInfoForName:inFramework:", self._resourceName, framework);
            if (!resourceInfo)
                CPLog.warn("Resource \"" + self._resourceName + "\" not found in the Resources directories");
            else
            {
                size = imageSize(FILE.canonical(resourceInfo.path)) || CGSizeMakeZero();
                framework = resourceInfo.framework;
            }
            if (resourceInfo && resourceInfo.path)
            {
                match = /^.+\/Resources\/(.+)$/.exec(resourceInfo.path);
                self._resourceName = match[1];
            }
        }
        if (resourceInfo && resourceInfo.path && resourceInfo.framework)
        {
            var frameworkPath = FILE.dirname(FILE.dirname(resourceInfo.path)),
                bundle = objj_msgSend(CPBundle, "bundleWithPath:", frameworkPath);
            objj_msgSend(bundle, "loadWithDelegate:", nil);
            bundleIdentifier = objj_msgSend(bundle, "bundleIdentifier") || "";
        }
        self._properties = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "initWithObjectsAndKeys:", size, "size", bundleIdentifier, "bundleIdentifier", framework, "framework");
        CPLog.debug("    Resource: %s\n   Framework: %s%s\n        Path: %s\n        Size: %d x %d", self._resourceName, framework ? framework : "<none>", bundleIdentifier ? " (" + bundleIdentifier + ")" : framework ? " (<no bundle identifier>)" : "", resourceInfo ? FILE.canonical(resourceInfo.path) : "", size.width, size.height);
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCibCustomResource, "NSCustomResource"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCustomResource__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomResource__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCibCustomResource, "class");
}
,["Class"])]);
}p;14;NSCustomView.jt;1363;@STATIC;1.0;I;25;AppKit/_CPCibCustomView.ji;8;NSView.jt;1302;objj_executeFile("AppKit/_CPCibCustomView.j", NO);objj_executeFile("NSView.j", YES);var _CPCibCustomViewClassNameKey = "_CPCibCustomViewClassNameKey";
{var the_class = objj_allocateClassPair(CPView, "NSCustomView"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_className")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCustomView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCustomView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
        self._className = objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassName");
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $NSCustomView__encodeWithCoder_(self, _cmd, aCoder)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCustomView").super_class }, "encodeWithCoder:", aCoder);
    objj_msgSend(aCoder, "encodeObject:forKey:", CP_NSMapClassName(self._className), _CPCibCustomViewClassNameKey);
}
,["void","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCibCustomView, "class");
}
,["Class"])]);
}p;8;NSDate.jt;692;@STATIC;1.0;I;19;Foundation/CPDate.jt;650;objj_executeFile("Foundation/CPDate.j", NO);{var the_class = objj_allocateClassPair(CPDate, "NSDate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDate__initWithCoder_(self, _cmd, aCoder)
{
    var interval = objj_msgSend(aCoder, "decodeDoubleForKey:", "NS.time") || 0;
    return objj_msgSend(CPDate, "dateWithTimeIntervalSinceReferenceDate:", interval);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDate__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPDate, "class");
}
,["Class"])]);
}p;17;NSDateFormatter.jt;2160;@STATIC;1.0;I;28;Foundation/CPDateFormatter.jt;2108;objj_executeFile("Foundation/CPDateFormatter.j", NO);{
var the_class = objj_getClass("CPDateFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDateFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDateFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDateFormatter").super_class }, "init");
    if (self)
    {
        var attributes = objj_msgSend(aCoder, "decodeObjectForKey:", "NS.attributes");
        self._dateStyle = objj_msgSend(attributes, "valueForKey:", "dateStyle");
        self._timeStyle = objj_msgSend(attributes, "valueForKey:", "timeStyle");
        self._formatterBehavior = objj_msgSend(attributes, "valueForKey:", "formatterBehavior");
        if (objj_msgSend(attributes, "containsKey:", "doesRelativeDateFormatting"))
            self._doesRelativeDateFormatting = objj_msgSend(attributes, "valueForKey:", "doesRelativeDateFormatting");
        self._dateFormat = objj_msgSend(aCoder, "decodeObjectForKey:", "NS.format");
        self._allowNaturalLanguage = objj_msgSend(aCoder, "decodeBoolForKey:", "NS.natural");
        if (self._formatterBehavior == CPDateFormatterBehavior10_0)
        {
            self._formatterBehavior = CPDateFormatterBehavior10_4;
            self._timeStyle = CPDateFormatterMediumStyle;
            self._dateStyle = CPDateFormatterMediumStyle;
        }
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDateFormatter, "NSDateFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDateFormatter__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDateFormatter__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPDateFormatter, "class");
}
,["Class"])]);
}p;14;NSDatePicker.jt;11932;@STATIC;1.0;I;21;AppKit/CPDatePicker.jI;19;Foundation/CPDate.ji;8;NSCell.jt;11850;objj_executeFile("AppKit/CPDatePicker.j", NO);objj_executeFile("Foundation/CPDate.j", NO);objj_executeFile("NSCell.j", YES);var NSDatePickerDefaultSize = 22,
    NSDatePickerCalendarDefaultSize = 148;
{
var the_class = objj_getClass("CPDatePicker")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDatePicker\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDatePicker__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDatePicker").super_class }, "NS_initWithCoder:", aCoder);
    var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
    self._minDate = objj_msgSend(cell, "minDate");
    self._maxDate = objj_msgSend(cell, "maxDate");
    self._timeInterval = objj_msgSend(cell, "timeInterval");
    self._datePickerMode = objj_msgSend(cell, "datePickerMode");
    self._datePickerElements = objj_msgSend(cell, "datePickerElements");
    self._datePickerStyle = objj_msgSend(cell, "datePickerType");
    self._dateValue = objj_msgSend(cell, "objectValue");
    self._backgroundColor = objj_msgSend(cell, "backgroundColor");
    self._drawsBackground = objj_msgSend(cell, "drawsBackground");
    self._formatter = objj_msgSend(cell, "formatter");
    objj_msgSend(self, "setBezeled:", objj_msgSend(cell, "isBezeled"));
    objj_msgSend(self, "setBordered:", objj_msgSend(cell, "isBordered"));
    var theme = objj_msgSend(Nib2Cib, "defaultTheme");
    if (self._datePickerStyle != CPClockAndCalendarDatePickerStyle)
    {
        var minSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "min-size", objj_msgSend(self, "class")),
            maxSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "max-size", objj_msgSend(self, "class"));
        if (minSize.height > 0)
        {
            self._frame.size.height = MAX(self._frame.size.height, minSize.height);
            self._bounds.size.height = MAX(self._frame.size.height, minSize.height);
        }
        if (maxSize.height > 0)
        {
            self._frame.size.height = MIN(self._frame.size.height, maxSize.height);
            self._bounds.size.height = MIN(self._frame.size.height, maxSize.height);
        }
        if (minSize.width > 0)
        {
            self._frame.size.width = MAX(self._frame.size.width, minSize.width);
            self._bounds.size.width = MAX(self._frame.size.width, minSize.width);
        }
        if (maxSize.width > 0)
        {
            self._frame.size.width = MIN(self._frame.size.width, maxSize.width);
            self._bounds.size.width = MAX(self._frame.size.width, minSize.width);
        }
        if (self._datePickerStyle == CPTextFieldAndStepperDatePickerStyle)
        {
            self._frame.size.width -= 3;
            self._bounds.size.width -= 3;
        }
        self._frame.origin.y -= self._frame.size.height - NSDatePickerDefaultSize - 4;
    }
    else
    {
        var minSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "min-size-calendar", objj_msgSend(self, "class")),
            maxSize = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "max-size-calendar", objj_msgSend(self, "class")),
            sizeClock = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "size-clock", objj_msgSend(self, "class"));
        if (self._datePickerElements & CPHourMinuteSecondDatePickerElementFlag || self._datePickerElements & CPHourMinuteDatePickerElementFlag)
        {
            minSize.width += sizeClock.width + 10;
            maxSize.width += sizeClock.width + 10;
        }
        if (minSize.height > 0)
        {
            self._frame.size.height = MAX(self._frame.size.height, minSize.height);
            self._bounds.size.height = MAX(self._frame.size.height, minSize.height);
        }
        if (maxSize.height > 0)
        {
            self._frame.size.height = MIN(self._frame.size.height, maxSize.height);
            self._bounds.size.height = MIN(self._frame.size.height, maxSize.height);
        }
        if (minSize.width > 0)
        {
            self._frame.size.width = MAX(self._frame.size.width, minSize.width);
            self._bounds.size.width = MAX(self._frame.size.width, minSize.width);
        }
        if (maxSize.width > 0)
        {
            self._frame.size.width = MIN(self._frame.size.width, maxSize.width);
            self._bounds.size.width = MAX(self._frame.size.width, minSize.width);
        }
        self._frame.origin.y -= self._frame.size.height - NSDatePickerCalendarDefaultSize - 1;
    }
    if (objj_msgSend(cell, "font")._name === IBDefaultFontFace && objj_msgSend(objj_msgSend(cell, "font"), "size") == IBDefaultFontSize)
        objj_msgSend(self, "setTextFont:", objj_msgSend(theme, "valueForAttributeWithName:forClass:", "font", objj_msgSend(self, "class")));
    else
        objj_msgSend(self, "setTextFont:", objj_msgSend(cell, "font"));
    var textColor = objj_msgSend(cell, "textColor"),
        defaultColor = objj_msgSend(self, "currentValueForThemeAttribute:", "text-color");
    if (!objj_msgSend(textColor, "isEqual:", defaultColor))
        objj_msgSend(self, "setTextColor:", objj_msgSend(cell, "textColor"));
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDatePicker, "NSDatePicker"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDatePicker__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSDatePicker").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDatePicker__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPDatePicker, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSDatePickerCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_drawsBackground"), new objj_ivar("_minDate"), new objj_ivar("_maxDate"), new objj_ivar("_formatter"), new objj_ivar("_datePickerMode"), new objj_ivar("_datePickerElements"), new objj_ivar("_datePickerType"), new objj_ivar("_timeInterval"), new objj_ivar("_textColor"), new objj_ivar("_backgroundColor")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("drawsBackground"), function $NSDatePickerCell__drawsBackground(self, _cmd)
{
    return self._drawsBackground;
}
,["BOOL"]), new objj_method(sel_getUid("_setDrawsBackground:"), function $NSDatePickerCell___setDrawsBackground_(self, _cmd, newValue)
{
    self._drawsBackground = newValue;
}
,["void","BOOL"]), new objj_method(sel_getUid("minDate"), function $NSDatePickerCell__minDate(self, _cmd)
{
    return self._minDate;
}
,["CPDate"]), new objj_method(sel_getUid("_setMinDate:"), function $NSDatePickerCell___setMinDate_(self, _cmd, newValue)
{
    self._minDate = newValue;
}
,["void","CPDate"]), new objj_method(sel_getUid("maxDate"), function $NSDatePickerCell__maxDate(self, _cmd)
{
    return self._maxDate;
}
,["CPDate"]), new objj_method(sel_getUid("_setMaxDate:"), function $NSDatePickerCell___setMaxDate_(self, _cmd, newValue)
{
    self._maxDate = newValue;
}
,["void","CPDate"]), new objj_method(sel_getUid("formatter"), function $NSDatePickerCell__formatter(self, _cmd)
{
    return self._formatter;
}
,["CPDateFormatter"]), new objj_method(sel_getUid("_setFormatter:"), function $NSDatePickerCell___setFormatter_(self, _cmd, newValue)
{
    self._formatter = newValue;
}
,["void","CPDateFormatter"]), new objj_method(sel_getUid("datePickerMode"), function $NSDatePickerCell__datePickerMode(self, _cmd)
{
    return self._datePickerMode;
}
,["CPInteger"]), new objj_method(sel_getUid("_setDatePickerMode:"), function $NSDatePickerCell___setDatePickerMode_(self, _cmd, newValue)
{
    self._datePickerMode = newValue;
}
,["void","CPInteger"]), new objj_method(sel_getUid("datePickerElements"), function $NSDatePickerCell__datePickerElements(self, _cmd)
{
    return self._datePickerElements;
}
,["CPInteger"]), new objj_method(sel_getUid("_setDatePickerElements:"), function $NSDatePickerCell___setDatePickerElements_(self, _cmd, newValue)
{
    self._datePickerElements = newValue;
}
,["void","CPInteger"]), new objj_method(sel_getUid("datePickerType"), function $NSDatePickerCell__datePickerType(self, _cmd)
{
    return self._datePickerType;
}
,["CPinteger"]), new objj_method(sel_getUid("_setDatePickerType:"), function $NSDatePickerCell___setDatePickerType_(self, _cmd, newValue)
{
    self._datePickerType = newValue;
}
,["void","CPinteger"]), new objj_method(sel_getUid("timeInterval"), function $NSDatePickerCell__timeInterval(self, _cmd)
{
    return self._timeInterval;
}
,["double"]), new objj_method(sel_getUid("_setTimeInterval:"), function $NSDatePickerCell___setTimeInterval_(self, _cmd, newValue)
{
    self._timeInterval = newValue;
}
,["void","double"]), new objj_method(sel_getUid("textColor"), function $NSDatePickerCell__textColor(self, _cmd)
{
    return self._textColor;
}
,["CPColor"]), new objj_method(sel_getUid("_setTextColor:"), function $NSDatePickerCell___setTextColor_(self, _cmd, newValue)
{
    self._textColor = newValue;
}
,["void","CPColor"]), new objj_method(sel_getUid("backgroundColor"), function $NSDatePickerCell__backgroundColor(self, _cmd)
{
    return self._backgroundColor;
}
,["CPColor"]), new objj_method(sel_getUid("_setBackgroundColor:"), function $NSDatePickerCell___setBackgroundColor_(self, _cmd, newValue)
{
    self._backgroundColor = newValue;
}
,["void","CPColor"]), new objj_method(sel_getUid("initWithCoder:"), function $NSDatePickerCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSDatePickerCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags"),
            pickerType = objj_msgSend(aCoder, "decodeIntForKey:", "NSDatePickerType") || 0;
        if (objj_msgSend(aCoder, "decodeIntForKey:", "NSSuppressStepper") && pickerType != 1)
            pickerType = 2;
        self._timeInterval = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSTimeInterval") || 0;
        self._datePickerMode = objj_msgSend(aCoder, "decodeIntForKey:", "NSDatePickerMode") || 0;
        self._datePickerElements = objj_msgSend(aCoder, "decodeIntForKey:", "NSDatePickerElements") || 0;
        self._datePickerType = pickerType;
        self._minDate = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMinDate") || objj_msgSend(CPDate, "distantPast");
        self._maxDate = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMaxDate") || objj_msgSend(CPDate, "distantFuture");
        self._textColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTextColor");
        self._backgroundColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBackgroundColor");
        self._isBordered = self._isBezeled;
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSFormatter"))
            self._formatter = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFormatter");
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSDrawsBackground"))
            self._drawsBackground = objj_msgSend(aCoder, "decodeBoolForKey:", "NSDrawsBackground");
        else
            self._drawsBackground = YES;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDate, "NSCalendarDate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCalendarDate__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPDate, "class");
}
,["Class"])]);
}p;14;NSDictionary.jt;1132;@STATIC;1.0;I;21;Foundation/CPObject.jI;25;Foundation/CPDictionary.jt;1057;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPDictionary.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSDictionary"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDictionary__initWithCoder_(self, _cmd, aCoder)
{
    if (objj_msgSend(aCoder, "containsValueForKey:", "NS.objects"))
        return objj_msgSend(CPDictionary, "dictionaryWithObjects:forKeys:", objj_msgSend(aCoder, "decodeObjectForKey:", "NS.objects"), objj_msgSend(aCoder, "decodeObjectForKey:", "NS.keys"));
    if (objj_msgSend(aCoder, "containsValueForKey:", "dict.values"))
        return objj_msgSend(CPDictionary, "dictionaryWithObjects:forKeys:", objj_msgSend(aCoder, "decodeObjectForKey:", "dict.values"), objj_msgSend(aCoder, "decodeObjectForKey:", "dict.sortedKeys"));
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSDictionary, "NSMutableDictionary"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;24;NSDictionaryController.jt;1435;@STATIC;1.0;I;31;AppKit/CPDictionaryController.jt;1380;objj_executeFile("AppKit/CPDictionaryController.j", NO);{
var the_class = objj_getClass("CPDictionaryController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDictionaryController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDictionaryController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDictionaryController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._includedKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSIncludedKeys");
        self._excludedKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSExcludedKeys");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDictionaryController, "NSDictionaryController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDictionaryController__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDictionaryController__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPDictionaryController, "class");
}
,["Class"])]);
}p;9;NSEvent.jt;1006;@STATIC;1.0;t;988;NSAlphaShiftKeyMask = 1 << 16;
NSShiftKeyMask = 1 << 17;
NSControlKeyMask = 1 << 18;
NSAlternateKeyMask = 1 << 19;
NSCommandKeyMask = 1 << 20;
NSNumericPadKeyMask = 1 << 21;
NSHelpKeyMask = 1 << 22;
NSFunctionKeyMask = 1 << 23;
NSDeviceIndependentModifierFlagsMask = 0xffff0000;
CP_NSMapKeyMask = function(anNSKeyMask)
{
    var keyMask = 0;
    if (anNSKeyMask & NSAlphaShiftKeyMask)
        keyMask |= CPAlphaShiftKeyMask;
    if (anNSKeyMask & NSShiftKeyMask)
        keyMask |= CPShiftKeyMask;
    if (anNSKeyMask & NSControlKeyMask)
        keyMask |= CPControlKeyMask;
    if (anNSKeyMask & NSAlternateKeyMask)
        keyMask |= CPAlternateKeyMask;
    if (anNSKeyMask & NSCommandKeyMask)
        keyMask |= CPCommandKeyMask;
    if (anNSKeyMask & NSNumericPadKeyMask)
        keyMask |= CPNumericPadKeyMask;
    if (anNSKeyMask & NSHelpKeyMask)
        keyMask |= CPHelpKeyMask;
    if (anNSKeyMask & NSFunctionKeyMask)
        keyMask |= CPFunctionKeyMask;
    return keyMask;
}
p;14;NSExpression.jt;9050;@STATIC;1.0;I;25;Foundation/CPExpression.jI;33;Foundation/_CPKeyPathExpression.jI;29;Foundation/_CPSetExpression.jI;30;Foundation/_CPSelfExpression.jI;39;Foundation/_CPConstantValueExpression.jI;34;Foundation/_CPFunctionExpression.jI;34;Foundation/_CPVariableExpression.jI;35;Foundation/_CPAggregateExpression.jt;8732;objj_executeFile("Foundation/CPExpression.j", NO);objj_executeFile("Foundation/_CPKeyPathExpression.j", NO);objj_executeFile("Foundation/_CPSetExpression.j", NO);objj_executeFile("Foundation/_CPSelfExpression.j", NO);objj_executeFile("Foundation/_CPConstantValueExpression.j", NO);objj_executeFile("Foundation/_CPFunctionExpression.j", NO);objj_executeFile("Foundation/_CPVariableExpression.j", NO);objj_executeFile("Foundation/_CPAggregateExpression.j", NO);{var the_class = objj_allocateClassPair(_CPKeyPathExpression, "NSKeyPathExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSKeyPathExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSKeyPathExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPKeyPathExpression, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPConstantValueExpression, "_CPKeyPathSpecifierExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPKeyPathSpecifierExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var keyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyPath");
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPKeyPathSpecifierExpression").super_class }, "initWithValue:", keyPath);
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPKeyPathSpecifierExpression, "NSKeyPathSpecifierExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSKeyPathSpecifierExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSKeyPathSpecifierExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPConstantValueExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPConstantValueExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPConstantValueExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPConstantValueExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var value = objj_msgSend(aCoder, "decodeObjectForKey:", "NSConstantValue");
    return objj_msgSend(self, "initWithValue:", value);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPConstantValueExpression, "NSConstantValueExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSConstantValueExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSConstantValueExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPConstantValueExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPFunctionExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPFunctionExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPFunctionExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var type = objj_msgSend(aCoder, "decodeIntForKey:", "NSExpressionType"),
        operand = objj_msgSend(aCoder, "decodeObjectForKey:", "NSOperand"),
        selector = CPSelectorFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NSSelectorName")),
        args = objj_msgSend(aCoder, "decodeObjectForKey:", "NSArguments");
    return objj_msgSend(self, "initWithTarget:selector:arguments:type:", operand, selector, args, type);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPFunctionExpression, "NSFunctionExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSFunctionExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSFunctionExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPFunctionExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPSetExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPSetExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPSetExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var type = objj_msgSend(aCoder, "decodeIntForKey:", "NSExpressionType"),
        left = objj_msgSend(aCoder, "decodeObjectForKey:", "NSLeftExpression"),
        right = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRightExpression");
    return objj_msgSend(self, "initWithType:left:right:", type, left, right);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPSetExpression, "NSSetExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSetExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSetExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPSetExpression, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPSelfExpression, "NSSelfExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSelfExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSSelfExpression").super_class }, "init");
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSelfExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPSelfExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPVariableExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPVariableExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPVariableExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var variable = objj_msgSend(aCoder, "decodeObjectForKey:", "NSVariable");
    return objj_msgSend(self, "initWithVariable:", variable);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPVariableExpression, "NSVariableExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSVariableExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSVariableExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPVariableExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPAggregateExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPAggregateExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPAggregateExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var collection = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCollection");
    return objj_msgSend(self, "initWithAggregate:", collection);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPAggregateExpression, "NSAggregateExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSAggregateExpression__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSAggregateExpression__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPAggregateExpression, "class");
}
,["Class"])]);
}p;8;NSFont.jt;3333;@STATIC;1.0;I;15;AppKit/CPFont.jt;3294;objj_executeFile("AppKit/CPFont.j", NO);IBDefaultFontFace = "Lucida Grande";
IBDefaultFontSize = 13.0;
var OS = require("os"),
    fontinfo = (require("cappuccino/fontinfo")).fontinfo;
{
var the_class = objj_getClass("CPFont")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPFont\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPFont__NS_initWithCoder_(self, _cmd, aCoder)
{
    var name = objj_msgSend(aCoder, "decodeObjectForKey:", "NSName"),
        size = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSSize"),
        isBold = false,
        isItalic = false,
        info = fontinfo(name, size);
    if (info)
    {
        name = info.familyName;
        isBold = info.bold;
        isItalic = info.italic;
    }
    var font = objj_msgSend(self, "_initWithName:size:bold:italic:system:", name, size, isBold, isItalic, NO);
    CPLog.debug("NSFont: %s", objj_msgSend(NSFont, "descriptorForFont:", font));
    return font;
}
,["id","CPCoder"]), new objj_method(sel_getUid("cibFontForNibFont"), function $CPFont__cibFontForNibFont(self, _cmd)
{
    if (self._name === IBDefaultFontFace)
    {
        if (self._size === IBDefaultFontSize && !self._isBold && !self._isItalic)
            return nil;
        else
            return objj_msgSend(objj_msgSend(CPFont, "alloc"), "_initWithName:size:bold:italic:system:", _CPFontSystemFacePlaceholder, self._size == IBDefaultFontSize ? CPFontCurrentSystemSize : self._size, self._isBold, self._isItalic, YES);
    }
    return self;
}
,["id"])]);
}{var the_class = objj_allocateClassPair(CPFont, "NSFont"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSFont__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSFont__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPFont, "class");
}
,["Class"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("initialize"), function $NSFont__initialize(self, _cmd)
{
    if (self !== objj_msgSend(NSFont, "class"))
        return;
    CPLog.debug("NSFont: default IB font: %s %f", IBDefaultFontFace, IBDefaultFontSize);
}
,["void"]), new objj_method(sel_getUid("descriptorForFont:"), function $NSFont__descriptorForFont_(self, _cmd, aFont)
{
    var styleAttributes = [];
    if (objj_msgSend(aFont, "isBold"))
        styleAttributes.push("bold");
    if (objj_msgSend(aFont, "isItalic"))
        styleAttributes.push("italic");
    styleAttributes = styleAttributes.join(" ");
    var systemAttributes = [];
    if (objj_msgSend(aFont, "isSystem"))
    {
        systemAttributes.push("system face");
        if (objj_msgSend(aFont, "size") === IBDefaultFontSize)
            systemAttributes.push("system size");
    }
    systemAttributes = systemAttributes.join(", ");
    return objj_msgSend(CPString, "stringWithFormat:", "%s%s %d%s", objj_msgSend(aFont, "familyName"), styleAttributes ? " " + styleAttributes : "", objj_msgSend(aFont, "size"), systemAttributes ? " (" + systemAttributes + ")" : "");
}
,["CPString","CPFont"])]);
}p;13;NSFormatter.jt;219;@STATIC;1.0;I;21;Foundation/CPObject.jt;175;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;14;NSFoundation.jt;770;@STATIC;1.0;i;9;NSArray.ji;20;NSAttributedString.ji;22;NSByteCountFormatter.ji;8;NSDate.ji;17;NSDateFormatter.ji;14;NSDictionary.ji;14;NSExpression.ji;13;NSFormatter.ji;17;NSMutableString.ji;8;NSNull.ji;19;NSNumberFormatter.ji;7;NSSet.ji;9;NSValue.jt;515;objj_executeFile("NSArray.j", YES);objj_executeFile("NSAttributedString.j", YES);objj_executeFile("NSByteCountFormatter.j", YES);objj_executeFile("NSDate.j", YES);objj_executeFile("NSDateFormatter.j", YES);objj_executeFile("NSDictionary.j", YES);objj_executeFile("NSExpression.j", YES);objj_executeFile("NSFormatter.j", YES);objj_executeFile("NSMutableString.j", YES);objj_executeFile("NSNull.j", YES);objj_executeFile("NSNumberFormatter.j", YES);objj_executeFile("NSSet.j", YES);objj_executeFile("NSValue.j", YES);p;16;NSIBObjectData.jt;3990;@STATIC;1.0;I;25;AppKit/_CPCibObjectData.ji;8;NSCell.jt;3929;objj_executeFile("AppKit/_CPCibObjectData.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("_CPCibObjectData")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibObjectData\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibObjectData__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "init");
    if (self)
    {
        self._namesKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNamesKeys");
        self._namesValues = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNamesValues");
        self._classesKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassesKeys");
        self._classesValues = objj_msgSend(aCoder, "decodeObjectForKey:", "NSClassesValues");
        self._connections = objj_msgSend(aCoder, "decodeObjectForKey:", "NSConnections");
        self._framework = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFramework");
        self._objectsKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSObjectsKeys");
        self._objectsValues = objj_msgSend(aCoder, "decodeObjectForKey:", "NSObjectsValues");
        objj_msgSend(self, "removeCellsFromObjectGraph");
        self._fileOwner = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRoot");
        self._visibleWindows = objj_msgSend(aCoder, "decodeObjectForKey:", "NSVisibleWindows");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("removeCellsFromObjectGraph"), function $_CPCibObjectData__removeCellsFromObjectGraph(self, _cmd)
{
    var count = self._objectsKeys.length,
        parentForCellUIDs = {},
        promotedChildrenForCellUIDs = {};
    while (count--)
    {
        var child = self._objectsKeys[count];
        if (!child)
            continue;
        var parent = self._objectsValues[count];
        if (objj_msgSend(child, "isKindOfClass:", objj_msgSend(NSCell, "class")))
        {
            parentForCellUIDs[objj_msgSend(child, "UID")] = parent;
            continue;
        }
        if (!objj_msgSend(parent, "isKindOfClass:", objj_msgSend(NSCell, "class")))
            continue;
        var parentUID = objj_msgSend(parent, "UID"),
            children = promotedChildrenForCellUIDs[parentUID];
        if (!children)
        {
            children = [];
            promotedChildrenForCellUIDs[parentUID] = children;
        }
        children.push(child);
        self._objectsKeys.splice(count, 1);
        self._objectsValues.splice(count, 1);
    }
    for (var cellUID in promotedChildrenForCellUIDs)
        if (promotedChildrenForCellUIDs.hasOwnProperty(cellUID))
        {
            var children = promotedChildrenForCellUIDs[cellUID],
                parent = parentForCellUIDs[cellUID];
            children.forEach(function(aChild)
            {
                CPLog.debug("NSIBObjectData: promoted " + aChild + " to child of " + parent);
                self._objectsKeys.push(aChild);
                self._objectsValues.push(parent);
            });
        }
    var count = self._objectsKeys.length;
    while (count--)
    {
        var object = self._objectsKeys[count];
        if (objj_msgSend(object, "respondsToSelector:", sel_getUid("swapCellsForParents:")))
            objj_msgSend(object, "swapCellsForParents:", parentForCellUIDs);
    }
}
,["void"])]);
}{var the_class = objj_allocateClassPair(_CPCibObjectData, "NSIBObjectData"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBObjectData__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBObjectData__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCibObjectData, "class");
}
,["Class"])]);
}p;9;NSImage.jt;1154;@STATIC;1.0;I;16;AppKit/CPImage.jt;1114;objj_executeFile("AppKit/CPImage.j", NO);{
var the_class = objj_getClass("CPImage")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPImage\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPImage__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "init");
    if (self)
    {
        var imageFlags = objj_msgSend(aCoder, "decodeIntForKey:", "NSImageFlags");
        self._size = objj_msgSend(aCoder, "decodeSizeForKey:", "NSSize");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPImage, "NSImage"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSImage__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSImage__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPImage, "class");
}
,["Class"])]);
}p;13;NSImageView.jt;4109;@STATIC;1.0;I;20;AppKit/CPImageView.ji;8;NSCell.jt;4053;objj_executeFile("AppKit/CPImageView.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPImageView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPImageView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPImageView__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPImageView").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPImageView__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPImageView").super_class }, "NS_initWithCell:", cell);
    objj_msgSend(self, "setImageScaling:", objj_msgSend(cell, "imageScaling"));
    objj_msgSend(self, "setImageAlignment:", objj_msgSend(cell, "imageAlignment"));
    self._isEditable = objj_msgSend(cell, "isEditable");
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPImageView, "NSImageView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSImageView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSImageView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPImageView, "class");
}
,["Class"])]);
}NSImageAlignCenter = 0;
NSImageAlignTop = 1;
NSImageAlignTopLeft = 2;
NSImageAlignTopRight = 3;
NSImageAlignLeft = 4;
NSImageAlignBottom = 5;
NSImageAlignBottomLeft = 6;
NSImageAlignBottomRight = 7;
NSImageAlignRight = 8;
NSImageScaleProportionallyDown = 0;
NSImageScaleAxesIndependently = 1;
NSImageScaleNone = 2;
NSImageScaleProportionallyUpOrDown = 3;
NSImageFrameNone = 0;
NSImageFramePhoto = 1;
NSImageFrameGrayBezel = 2;
NSImageFrameGroove = 3;
NSImageFrameButton = 4;
{var the_class = objj_allocateClassPair(NSCell, "NSImageCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_animates"), new objj_ivar("_imageAlignment"), new objj_ivar("_imageScaling"), new objj_ivar("_frameStyle")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("_animates"), function $NSImageCell___animates(self, _cmd)
{
    return self._animates;
}
,["BOOL"]), new objj_method(sel_getUid("_setAnimates:"), function $NSImageCell___setAnimates_(self, _cmd, newValue)
{
    self._animates = newValue;
}
,["void","BOOL"]), new objj_method(sel_getUid("imageAlignment"), function $NSImageCell__imageAlignment(self, _cmd)
{
    return self._imageAlignment;
}
,["NSImageAlignment"]), new objj_method(sel_getUid("imageScaling"), function $NSImageCell__imageScaling(self, _cmd)
{
    return self._imageScaling;
}
,["NSImageScaling"]), new objj_method(sel_getUid("_frameStyle"), function $NSImageCell___frameStyle(self, _cmd)
{
    return self._frameStyle;
}
,["NSImageFrameStyle"]), new objj_method(sel_getUid("_setFrameStyle:"), function $NSImageCell___setFrameStyle_(self, _cmd, newValue)
{
    self._frameStyle = newValue;
}
,["void","NSImageFrameStyle"]), new objj_method(sel_getUid("initWithCoder:"), function $NSImageCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSImageCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._animates = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAnimates");
        self._imageAlignment = objj_msgSend(aCoder, "decodeIntForKey:", "NSAlign");
        self._imageScaling = objj_msgSend(aCoder, "decodeIntForKey:", "NSScale");
        self._frameStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSStyle");
    }
    return self;
}
,["id","CPCoder"])]);
}p;20;NSLayoutConstraint.jt;916;@STATIC;1.0;I;21;Foundation/CPObject.jI;24;Foundation/CPException.jt;843;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPException.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSLayoutConstraint"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSLayoutConstraint__initWithCoder_(self, _cmd, aCoder)
{
    objj_msgSend(CPException, "raise:format:", "nib2cibException", "Autolayout is not yet supported. Turn \"Use Auto Layout\" off in the File Inspector of %@.", objj_msgSend(objj_msgSend(objj_msgSend(Converter, "sharedConverter"), "inputPath"), "lastPathComponent"));
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSLayoutConstraint__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPObject, "class");
}
,["Class"])]);
}p;18;NSLevelIndicator.jt;5445;@STATIC;1.0;I;25;AppKit/CPLevelIndicator.ji;8;NSCell.jt;5384;objj_executeFile("AppKit/CPLevelIndicator.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPLevelIndicator")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPLevelIndicator\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPLevelIndicator__NS_initWithCoder_(self, _cmd, aCoder)
{
    var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
    self._minValue = objj_msgSend(cell, "minValue");
    self._maxValue = objj_msgSend(cell, "maxValue");
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPLevelIndicator").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPLevelIndicator__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPLevelIndicator").super_class }, "NS_initWithCell:", cell);
    self._minValue = objj_msgSend(cell, "minValue");
    self._maxValue = objj_msgSend(cell, "maxValue");
    self._levelIndicatorStyle = objj_msgSend(cell, "levelIndicatorStyle");
    self._warningValue = objj_msgSend(cell, "warningValue");
    self._criticalValue = objj_msgSend(cell, "criticalValue");
    self._tickMarkPosition = objj_msgSend(cell, "tickMarkPosition");
    self._numberOfTickMarks = objj_msgSend(cell, "numberOfTickMarks");
    self._numberOfMajorTickMarks = objj_msgSend(cell, "numberOfMajorTickMarks");
    objj_msgSend(self, "setEditable:", objj_msgSend(cell, "isEditable"));
    objj_msgSend(self, "setEnabled:", objj_msgSend(cell, "isEnabled"));
    objj_msgSend(self, "setContinuous:", objj_msgSend(cell, "isContinuous"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPLevelIndicator, "NSLevelIndicator"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSLevelIndicator__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSLevelIndicator__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPLevelIndicator, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSLevelIndicatorCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_levelIndicatorStyle"), new objj_ivar("_minValue"), new objj_ivar("_maxValue"), new objj_ivar("_warningValue"), new objj_ivar("_criticalValue"), new objj_ivar("_tickMarkPosition"), new objj_ivar("_numberOfTickMarks"), new objj_ivar("_numberOfMajorTickMarks")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("levelIndicatorStyle"), function $NSLevelIndicatorCell__levelIndicatorStyle(self, _cmd)
{
    return self._levelIndicatorStyle;
}
,["CPLevelIndicator"]), new objj_method(sel_getUid("minValue"), function $NSLevelIndicatorCell__minValue(self, _cmd)
{
    return self._minValue;
}
,["double"]), new objj_method(sel_getUid("maxValue"), function $NSLevelIndicatorCell__maxValue(self, _cmd)
{
    return self._maxValue;
}
,["double"]), new objj_method(sel_getUid("warningValue"), function $NSLevelIndicatorCell__warningValue(self, _cmd)
{
    return self._warningValue;
}
,["double"]), new objj_method(sel_getUid("criticalValue"), function $NSLevelIndicatorCell__criticalValue(self, _cmd)
{
    return self._criticalValue;
}
,["double"]), new objj_method(sel_getUid("tickMarkPosition"), function $NSLevelIndicatorCell__tickMarkPosition(self, _cmd)
{
    return self._tickMarkPosition;
}
,["CPTickMarkPosition"]), new objj_method(sel_getUid("numberOfTickMarks"), function $NSLevelIndicatorCell__numberOfTickMarks(self, _cmd)
{
    return self._numberOfTickMarks;
}
,["int"]), new objj_method(sel_getUid("numberOfMajorTickMarks"), function $NSLevelIndicatorCell__numberOfMajorTickMarks(self, _cmd)
{
    return self._numberOfMajorTickMarks;
}
,["int"]), new objj_method(sel_getUid("initWithCoder:"), function $NSLevelIndicatorCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSLevelIndicatorCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._objectValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSValue");
        self._minValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMinValue");
        self._maxValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMaxValue");
        self._warningValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSWarningValue");
        self._criticalValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSCriticalValue");
        self._levelIndicatorStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSIndicatorStyle");
        self._tickMarkPosition = objj_msgSend(aCoder, "decodeIntForKey:", "NSTickMarkPosition");
        self._numberOfTickMarks = objj_msgSend(aCoder, "decodeIntForKey:", "NSNumberOfTickMarks");
        self._numberOfTickMarks = objj_msgSend(aCoder, "decodeIntForKey:", "NSNumberOfMajorTickMarks");
    }
    return self;
}
,["id","CPCoder"])]);
}p;10;NSMatrix.jt;4713;@STATIC;1.0;I;21;Foundation/CPObject.jI;16;AppKit/CPRadio.jI;15;AppKit/CPView.ji;8;NSView.jt;4615;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPRadio.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("NSView.j", YES);var NSMatrixRadioModeMask = 0x40000000,
    NSMatrixDrawsBackgroundMask = 0x01000000;
{var the_class = objj_allocateClassPair(CPView, "NSMatrix"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMatrix__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCoder:"), function $NSMatrix__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSMatrix").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var numberOfRows = objj_msgSend(aCoder, "decodeIntForKey:", "NSNumRows"),
            numberOfColumns = objj_msgSend(aCoder, "decodeIntForKey:", "NSNumCols"),
            cellSize = objj_msgSend(aCoder, "decodeSizeForKey:", "NSCellSize"),
            intercellSpacing = objj_msgSend(aCoder, "decodeSizeForKey:", "NSIntercellSpacing"),
            flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSMatrixFlags"),
            isRadioMode = flags & NSMatrixRadioModeMask,
            drawsBackground = flags & NSMatrixDrawsBackgroundMask,
            backgroundColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBackgroundColor"),
            cells = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCells"),
            selectedCell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSelectedCell");
        if (isRadioMode)
        {
            var radioGroup = objj_msgSend(CPRadioGroup, "new"),
                frame = CGRectMake(0.0, 0.0, cellSize.width, cellSize.height);
            for (var rowIndex = 0; rowIndex < numberOfRows; ++rowIndex)
            {
                frame.origin.x = 0;
                for (var columnIndex = 0; columnIndex < numberOfColumns; ++columnIndex)
                {
                    var cell = cells[rowIndex * numberOfColumns + columnIndex],
                        cellView = objj_msgSend(objj_msgSend(CPRadio, "alloc"), "initWithFrame:radioGroup:cell:", frame, radioGroup, cell);
                    objj_msgSend(self, "addSubview:", cellView);
                    NIB_CONNECTION_EQUIVALENCY_TABLE[objj_msgSend(cell, "UID")] = cellView;
                    frame.origin.x = CGRectGetMaxX(frame) + intercellSpacing.width;
                }
                frame.origin.y = CGRectGetMaxY(frame) + intercellSpacing.height;
            }
            if (drawsBackground)
                objj_msgSend(self, "setBackgroundColor:", backgroundColor);
            self.isa = objj_msgSend(CPView, "class");
            NIB_CONNECTION_EQUIVALENCY_TABLE[objj_msgSend(self, "UID")] = radioGroup;
        }
        else
        {
            self = nil;
        }
    }
    return self;
}
,["id","CPCoder"])]);
}{
var the_class = objj_getClass("CPRadio")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPRadio\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("initWithFrame:radioGroup:cell:"), function $CPRadio__initWithFrame_radioGroup_cell_(self, _cmd, aFrame, aRadioGroup, aCell)
{
    self = objj_msgSend(self, "initWithFrame:radioGroup:", aFrame, aRadioGroup);
    if (self)
    {
        objj_msgSend(self, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable);
        objj_msgSend(self, "setTitle:", objj_msgSend(aCell, "title"));
        objj_msgSend(self, "setBackgroundColor:", objj_msgSend(CPColor, "clearColor"));
        objj_msgSend(self, "setFont:", objj_msgSend(aCell, "font"));
        objj_msgSend(self, "setAlignment:", objj_msgSend(aCell, "alignment"));
        objj_msgSend(self, "setLineBreakMode:", objj_msgSend(aCell, "lineBreakMode"));
        objj_msgSend(self, "setImagePosition:", objj_msgSend(aCell, "imagePosition"));
        objj_msgSend(self, "setKeyEquivalent:", objj_msgSend(aCell, "keyEquivalent"));
        objj_msgSend(self, "setKeyEquivalentModifierMask:", objj_msgSend(aCell, "keyEquivalentModifierMask"));
        objj_msgSend(self, "setAllowsMixedState:", objj_msgSend(aCell, "allowsMixedState"));
        objj_msgSend(self, "setObjectValue:", objj_msgSend(aCell, "objectValue"));
        objj_msgSend(self, "setEnabled:", objj_msgSend(aCell, "isEnabled"));
        objj_msgSend(self, "setTag:", objj_msgSend(aCell, "tag"));
    }
    return self;
}
,["id","CGRect","CPRadioGroup","NSButtonCell"])]);
}p;8;NSMenu.jt;2027;@STATIC;1.0;I;15;AppKit/CPMenu.jt;1988;objj_executeFile("AppKit/CPMenu.j", NO);NS_CPMenuNameMap = {_NSMainMenu: "_CPMainMenu", _NSAppleMenu: "_CPApplicationMenu", _NSServicesMenu: "_CPServicesMenu", _NSWindowsMenu: "_CPWindowsMenu", _NSFontMenu: "_CPFontMenu", _NSRecentDocumentsMenu: "_CPRecentDocumentsMenu", _NSOpenDocumentsMenu: "_CPOpenDocumentsMenu"};
{
var the_class = objj_getClass("CPMenu")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPMenu\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPMenu__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPMenu").super_class }, "init");
    if (self)
    {
        self._title = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTitle");
        self._items = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMenuItems");
        self._name = objj_msgSend(aCoder, "decodeObjectForKey:", "NSName");
        var mappedName = NS_CPMenuNameMap[self._name];
        if (mappedName)
            self._name = mappedName;
        self._showsStateColumn = !objj_msgSend(aCoder, "containsValueForKey:", "NSMenuExcludeMarkColumn") || !objj_msgSend(aCoder, "decodeBoolForKey:", "NSMenuExcludeMarkColumn");
        self._autoenablesItems = !objj_msgSend(aCoder, "containsValueForKey:", "NSNoAutoenable") || !objj_msgSend(aCoder, "decodeBoolForKey:", "NSNoAutoenable");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPMenu, "NSMenu"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMenu__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSMenu__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPMenu, "class");
}
,["Class"])]);
}p;12;NSMenuItem.jt;3038;@STATIC;1.0;I;19;AppKit/CPMenuItem.ji;10;NSButton.ji;9;NSEvent.ji;8;NSMenu.jt;2955;objj_executeFile("AppKit/CPMenuItem.j", NO);objj_executeFile("NSButton.j", YES);objj_executeFile("NSEvent.j", YES);objj_executeFile("NSMenu.j", YES);{
var the_class = objj_getClass("CPMenuItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPMenuItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPMenuItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPMenuItem").super_class }, "init");
    if (self)
    {
        self._isSeparator = objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsSeparator");
        self._title = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTitle");
        self._target = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTarget");
        self._action = objj_msgSend(aCoder, "decodeObjectForKey:", "NSAction");
        self._isEnabled = !objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsDisabled");
        self._isHidden = objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsHidden");
        self._tag = objj_msgSend(aCoder, "decodeIntForKey:", "NSTag");
        self._state = objj_msgSend(aCoder, "decodeIntForKey:", "NSState");
        self._image = objj_msgSend(aCoder, "decodeObjectForKey:", "NSImage");
        self._submenu = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSubmenu");
        self._menu = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMenu");
        self._keyEquivalent = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyEquiv");
        self._keyEquivalentModifierMask = CP_NSMapKeyMask(objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyEquivModMask"));
        self._indentationLevel = objj_msgSend(aCoder, "decodeIntForKey:", "NSIndent");
        self._representedObject = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRepObject");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("swapCellsForParents:"), function $CPMenuItem__swapCellsForParents_(self, _cmd, parentsForCellUIDs)
{
    var target = objj_msgSend(self, "target");
    if (!target)
        return;
    var parent = parentsForCellUIDs[objj_msgSend(objj_msgSend(self, "target"), "UID")];
    if (parent)
        objj_msgSend(self, "setTarget:", parent);
}
,["void","JSObject"])]);
}{var the_class = objj_allocateClassPair(CPMenuItem, "NSMenuItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMenuItem__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSMenuItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPMenuItem, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSButtonCell, "NSMenuItemCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;17;NSMutableString.jt;455;@STATIC;1.0;I;21;Foundation/CPObject.jt;411;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSMutableString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMutableString__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(aCoder, "decodeObjectForKey:", "NS.string");
}
,["id","CPCoder"])]);
}p;7;NSNib.jt;1452;@STATIC;1.0;I;14;AppKit/CPCib.jt;1414;objj_executeFile("AppKit/CPCib.j", NO);var FILE = require("file"),
    OS = require("os"),
    UUID = require("uuid");
{
var the_class = objj_getClass("CPCib")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCib\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCib__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCib").super_class }, "init");
    var nibPath = "/tmp/" + UUID.uuid() + ".nib",
        data = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNibFileData");
    FILE.write(nibPath, data.bytes(), {charset: "UTF-16"});
    var converter = objj_msgSend(objj_msgSend(Converter, "alloc"), "initWithInputPath:outputPath:", nibPath, nil);
    self._data = objj_msgSend(converter, "convert");
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCib, "NSNib"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNib__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNib__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCib, "class");
}
,["Class"])]);
}p;16;NSNibConnector.jt;9767;@STATIC;1.0;I;30;AppKit/CPCibBindingConnector.jI;23;AppKit/CPCibConnector.jI;30;AppKit/CPCibControlConnector.jI;29;AppKit/CPCibOutletConnector.jI;40;AppKit/CPCibRuntimeAttributesConnector.jI;27;AppKit/CPCibHelpConnector.jI;26;AppKit/CPKeyValueBinding.jt;9508;objj_executeFile("AppKit/CPCibBindingConnector.j", NO);objj_executeFile("AppKit/CPCibConnector.j", NO);objj_executeFile("AppKit/CPCibControlConnector.j", NO);objj_executeFile("AppKit/CPCibOutletConnector.j", NO);objj_executeFile("AppKit/CPCibRuntimeAttributesConnector.j", NO);objj_executeFile("AppKit/CPCibHelpConnector.j", NO);objj_executeFile("AppKit/CPKeyValueBinding.j", NO);NIB_CONNECTION_EQUIVALENCY_TABLE = {};
{
var the_class = objj_getClass("CPCibConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibConnector").super_class }, "init");
    if (self)
    {
        self._source = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSource");
        self._destination = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDestination");
        self._label = objj_msgSend(aCoder, "decodeObjectForKey:", "NSLabel");
        var sourceUID = objj_msgSend(self._source, "UID"),
            destinationUID = objj_msgSend(self._destination, "UID");
        if (sourceUID in NIB_CONNECTION_EQUIVALENCY_TABLE)
        {
            CPLog.debug("NSNibConnector: swapped object: " + self._source + " for object: " + NIB_CONNECTION_EQUIVALENCY_TABLE[sourceUID]);
            self._source = NIB_CONNECTION_EQUIVALENCY_TABLE[sourceUID];
        }
        if (destinationUID in NIB_CONNECTION_EQUIVALENCY_TABLE)
        {
            CPLog.debug("NSNibConnector: swapped object: " + self._destination + " for object: " + NIB_CONNECTION_EQUIVALENCY_TABLE[destinationUID]);
            self._destination = NIB_CONNECTION_EQUIVALENCY_TABLE[destinationUID];
        }
        if (self._source && self._destination)
            CPLog.debug("NSNibConnector: connection: " + objj_msgSend(self._source, "description") + " " + objj_msgSend(self._destination, "description") + " " + self._label);
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibConnector, "NSNibConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibConnector, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(CPCibControlConnector, "NSNibControlConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibControlConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibControlConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibControlConnector, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(CPCibOutletConnector, "NSNibOutletConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibOutletConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibOutletConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibOutletConnector, "class");
}
,["Class"])]);
}var NSTransformers = objj_msgSend(CPSet, "setWithObjects:", "NSNegateBoolean", "NSIsNil", "NSIsNotNil", "NSUnarchiveFromData", "NSKeyedUnarchiveFromData");
{
var the_class = objj_getClass("CPCibBindingConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibBindingConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibBindingConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibBindingConnector").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._binding = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBinding");
        self._keyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyPath");
        self._options = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        var NSOptions = objj_msgSend(aCoder, "decodeObjectForKey:", "NSOptions"),
            keyEnumerator = objj_msgSend(NSOptions, "keyEnumerator"),
            key;
        while ((key = objj_msgSend(keyEnumerator, "nextObject")) !== nil)
        {
            var CPKey = "CP" + key.substring(2),
                NSValue = objj_msgSend(NSOptions, "objectForKey:", key);
            if (CPKey === CPValueTransformerNameBindingOption && objj_msgSend(NSTransformers, "containsObject:", NSValue))
                NSValue = "CP" + NSValue.substring(2);
            objj_msgSend(self._options, "setObject:forKey:", NSValue, CPKey);
        }
        CPLog.debug("NSNibConnector: binding connector: " + objj_msgSend(self._binding, "description") + " to: " + self._destination + " " + objj_msgSend(self._keyPath, "description") + " " + objj_msgSend(self._options, "description"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibBindingConnector, "NSNibBindingConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibBindingConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibBindingConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibBindingConnector, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("CPCibRuntimeAttributesConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibRuntimeAttributesConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibRuntimeAttributesConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibRuntimeAttributesConnector").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._source = objj_msgSend(aCoder, "decodeObjectForKey:", "NSObject");
        self._keyPaths = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKeyPaths");
        self._values = objj_msgSend(aCoder, "decodeObjectForKey:", "NSValues");
        var count = objj_msgSend(self._keyPaths, "count");
        CPLog.debug("NSNibConnector: runtime attributes connector: " + objj_msgSend(self._source, "description"));
        while (count--)
        {
            var value = self._values[count],
                type = typeof value === "boolean" ? "BOOL" : objj_msgSend(value, "className");
            CPLog.debug("   %s (%s): %s", self._keyPaths[count], type, value);
        }
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibRuntimeAttributesConnector, "NSIBUserDefinedRuntimeAttributesConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBUserDefinedRuntimeAttributesConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBUserDefinedRuntimeAttributesConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibRuntimeAttributesConnector, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("CPCibHelpConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibHelpConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibHelpConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibHelpConnector").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._destination = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDestination");
        self._file = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFile");
        self._marker = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMarker");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibHelpConnector, "NSIBHelpConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBHelpConnector__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBHelpConnector__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPCibHelpConnector, "class");
}
,["Class"])]);
}p;8;NSNull.jt;567;@STATIC;1.0;I;19;Foundation/CPNull.jt;525;objj_executeFile("Foundation/CPNull.j", NO);{var the_class = objj_allocateClassPair(CPNull, "NSNull"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNull__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(CPNull, "null");
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNull__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPNull, "class");
}
,["Class"])]);
}p;19;NSNumberFormatter.jt;1654;@STATIC;1.0;I;30;Foundation/CPNumberFormatter.jt;1600;objj_executeFile("Foundation/CPNumberFormatter.j", NO);{
var the_class = objj_getClass("CPNumberFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPNumberFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPNumberFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "init");
    if (self)
    {
        var attributes = objj_msgSend(aCoder, "decodeObjectForKey:", "NS.attributes");
        objj_msgSend(self, "setNumberStyle:", objj_msgSend(attributes, "valueForKey:", "numberStyle") || CPNumberFormatterNoStyle);
        if (objj_msgSend(attributes, "containsKey:", "minimum"))
            objj_msgSend(self, "setMinimum:", objj_msgSend(attributes, "valueForKey:", "minimum"));
        if (objj_msgSend(attributes, "containsKey:", "maximum"))
            objj_msgSend(self, "setMaximum:", objj_msgSend(attributes, "valueForKey:", "maximum"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPNumberFormatter, "NSNumberFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNumberFormatter__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNumberFormatter__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPNumberFormatter, "class");
}
,["Class"])]);
}p;20;NSObjectController.jt;1752;@STATIC;1.0;I;27;AppKit/CPObjectController.jt;1701;objj_executeFile("AppKit/CPObjectController.j", NO);{
var the_class = objj_getClass("CPObjectController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPObjectController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPObjectController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPObjectController").super_class }, "init");
    if (self)
    {
        self._declaredKeys = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDeclaredKeys");
        var className = objj_msgSend(aCoder, "decodeObjectForKey:", "NSObjectClassName");
        if (className)
            self._objectClassName = CP_NSMapClassName(className);
        else
            self._objectClass = objj_msgSend(CPMutableDictionary, "class");
        self._isEditable = objj_msgSend(aCoder, "decodeBoolForKey:", "NSEditable");
        self._automaticallyPreparesContent = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAutomaticallyPreparesContent");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPObjectController, "NSObjectController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSObjectController__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSObjectController__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPObjectController, "class");
}
,["Class"])]);
}p;15;NSOutlineView.jt;2135;@STATIC;1.0;I;22;AppKit/CPOutlineView.jt;2089;objj_executeFile("AppKit/CPOutlineView.j", NO);{
var the_class = objj_getClass("CPOutlineView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPOutlineView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPOutlineView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPOutlineView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSOutlineViewOutlineTableColumnKey"))
            self._outlineTableColumn = objj_msgSend(aCoder, "decodeObjectForKey:", "NSOutlineViewOutlineTableColumnKey");
        else
            self._outlineTableColumn = objj_msgSend(objj_msgSend(self, "tableColumns"), "objectAtIndex:", 0);
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSOutlineViewIndentationPerLevelKey"))
            self._indentationPerLevel = objj_msgSend(aCoder, "decodeFloatForKey:", "NSOutlineViewIndentationPerLevelKey");
        else
            self._indentationPerLevel = 16;
        self._outlineViewDataSource = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDataSource");
        self._outlineViewDelegate = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDelegate");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPOutlineView, "NSOutlineView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSOutlineView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSOutlineView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPOutlineView, "class");
}
,["Class"])]);
}p;11;NSPopover.jt;1356;@STATIC;1.0;I;18;AppKit/CPPopover.jt;1314;objj_executeFile("AppKit/CPPopover.j", NO);{
var the_class = objj_getClass("CPPopover")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPopover\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPopover__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopover").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._behavior = objj_msgSend(aCoder, "decodeIntForKey:", "NSBehavior");
        self._appearance = objj_msgSend(aCoder, "decodeIntForKey:", "NSAppearance");
        self._animates = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAnimates");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPopover, "NSPopover"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPopover__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPopover__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPPopover, "class");
}
,["Class"])]);
}p;15;NSPopUpButton.jt;3611;@STATIC;1.0;I;22;AppKit/CPPopUpButton.ji;8;NSMenu.ji;12;NSMenuItem.jt;3536;objj_executeFile("AppKit/CPPopUpButton.j", NO);objj_executeFile("NSMenu.j", YES);objj_executeFile("NSMenuItem.j", YES);{
var the_class = objj_getClass("CPPopUpButton")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPopUpButton\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPopUpButton__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopUpButton").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPPopUpButton__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopUpButton").super_class }, "NS_initWithCell:", cell);
    self._menu = objj_msgSend(cell, "menu");
    objj_msgSend(self, "setPullsDown:", objj_msgSend(cell, "pullsDown"));
    self._preferredEdge = objj_msgSend(cell, "preferredEdge");
    self._frame.origin.x -= 4;
    self._frame.origin.y -= 4;
    self._frame.size.width += 7;
    self._bounds.size.width += 7;
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPPopUpButton, "NSPopUpButton"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPopUpButton__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPopUpButton__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPPopUpButton, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSMenuItemCell, "NSPopUpButtonCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("pullsDown"), new objj_ivar("selectedIndex"), new objj_ivar("preferredEdge"), new objj_ivar("menu")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("pullsDown"), function $NSPopUpButtonCell__pullsDown(self, _cmd)
{
    return self.pullsDown;
}
,["BOOL"]), new objj_method(sel_getUid("selectedIndex"), function $NSPopUpButtonCell__selectedIndex(self, _cmd)
{
    return self.selectedIndex;
}
,["int"]), new objj_method(sel_getUid("preferredEdge"), function $NSPopUpButtonCell__preferredEdge(self, _cmd)
{
    return self.preferredEdge;
}
,["int"]), new objj_method(sel_getUid("menu"), function $NSPopUpButtonCell__menu(self, _cmd)
{
    return self.menu;
}
,["CPMenu"]), new objj_method(sel_getUid("initWithCoder:"), function $NSPopUpButtonCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSPopUpButtonCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self.pullsDown = objj_msgSend(aCoder, "decodeBoolForKey:", "NSPullDown");
        self.selectedIndex = objj_msgSend(aCoder, "decodeIntForKey:", "NSSelectedIndex");
        self.preferredEdge = objj_msgSend(aCoder, "decodeIntForKey:", "NSPreferredEdge");
        self.menu = objj_msgSend(aCoder, "decodeObjectForKey:", "NSMenu");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("objectValue"), function $NSPopUpButtonCell__objectValue(self, _cmd)
{
    return self.selectedIndex;
}
,["CPUInteger"])]);
}p;19;NSPredicateEditor.jt;3501;@STATIC;1.0;I;26;AppKit/CPPredicateEditor.jt;3451;objj_executeFile("AppKit/CPPredicateEditor.j", NO);{
var the_class = objj_getClass("CPPredicateEditor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPredicateEditor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPredicateEditor__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPredicateEditor").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._allTemplates = objj_msgSend(aCoder, "decodeObjectForKey:", "NSPredicateTemplates");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPredicateEditor, "NSPredicateEditor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPredicateEditor__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPredicateEditor__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPPredicateEditor, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("CPPredicateEditorRowTemplate")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPredicateEditorRowTemplate\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPredicateEditorRowTemplate__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPredicateEditorRowTemplate").super_class }, "init");
    if (self)
    {
        self._templateType = objj_msgSend(aCoder, "decodeIntForKey:", "NSPredicateTemplateType");
        self._predicateOptions = objj_msgSend(aCoder, "decodeIntForKey:", "NSPredicateTemplateOptions");
        self._predicateModifier = objj_msgSend(aCoder, "decodeIntForKey:", "NSPredicateTemplateModifier");
        self._leftAttributeType = objj_msgSend(aCoder, "decodeIntForKey:", "NSPredicateTemplateLeftAttributeType");
        self._rightAttributeType = objj_msgSend(aCoder, "decodeIntForKey:", "NSPredicateTemplateRightAttributeType");
        self._leftIsWildcard = objj_msgSend(aCoder, "decodeBoolForKey:", "NSPredicateTemplateLeftIsWildcard");
        self._rightIsWildcard = objj_msgSend(aCoder, "decodeBoolForKey:", "NSPredicateTemplateRightIsWildcard");
        self._views = objj_msgSend(aCoder, "decodeObjectForKey:", "NSPredicateTemplateViews");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPredicateEditorRowTemplate, "NSPredicateEditorRowTemplate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPredicateEditorRowTemplate__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPredicateEditorRowTemplate__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPPredicateEditorRowTemplate, "class");
}
,["Class"])]);
}p;21;NSProgressIndicator.jt;2617;@STATIC;1.0;I;28;AppKit/CPProgressIndicator.jt;2565;objj_executeFile("AppKit/CPProgressIndicator.j", NO);var NSProgressIndicatorSpinningFlag = 1 << 12;
{
var the_class = objj_getClass("CPProgressIndicator")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPProgressIndicator\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPProgressIndicator__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPProgressIndicator").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var NS_flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSpiFlags");
        self._minValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMinValue");
        self._maxValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMaxValue");
        self._style = NS_flags & NSProgressIndicatorSpinningFlag ? CPProgressIndicatorSpinningStyle : CPProgressIndicatorBarStyle;
        self._indeterminate = NS_flags & 2 ? YES : NO;
        self._isDisplayedWhenStopped = NS_flags & 8192 ? NO : YES;
        self._controlSize = NS_flags & 256 ? CPSmallControlSize : CPRegularControlSize;
        if (self._style === CPProgressIndicatorSpinningStyle)
        {
            self._controlSize = self._controlSize == CPRegularControlSize ? CPSmallControlSize : CPMiniControlSize;
        }
        self._doubleValue = 0.0;
        var currentFrameSize = objj_msgSend(self, "frameSize");
        if (self._style !== CPProgressIndicatorSpinningStyle)
        {
            var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
                height = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "default-height", CPProgressIndicator);
            currentFrameSize.height = height;
        }
        objj_msgSend(self, "setFrameSize:", currentFrameSize);
        objj_msgSend(self, "updateBackgroundColor");
        objj_msgSend(self, "drawBar");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPProgressIndicator, "NSProgressIndicator"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSProgressIndicator__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSProgressIndicator__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPProgressIndicator, "class");
}
,["Class"])]);
}p;13;NSResponder.jt;1210;@STATIC;1.0;I;20;AppKit/CPResponder.jt;1166;objj_executeFile("AppKit/CPResponder.j", NO);{
var the_class = objj_getClass("CPResponder")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPResponder\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPResponder__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPResponder").super_class }, "init");
    if (self)
        objj_msgSend(self, "setNextResponder:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSNextResponder"));
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPResponder, "NSResponder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSResponder__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSResponder__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPResponder, "class");
}
,["Class"])]);
}p;14;NSRuleEditor.jt;4474;@STATIC;1.0;I;21;AppKit/CPRuleEditor.jI;20;AppKit/CPTextField.ji;8;NSCell.ji;11;NSControl.jt;4376;objj_executeFile("AppKit/CPRuleEditor.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPRuleEditor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPRuleEditor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPRuleEditor__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPRuleEditor").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._alignmentGridWidth = objj_msgSend(aCoder, "decodeFloatForKey:", "NSRuleEditorAlignmentGridWidth");
        self._sliceHeight = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSRuleEditorSliceHeight");
        self._stringsFilename = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorStringsFileName");
        self._editable = objj_msgSend(aCoder, "decodeBoolForKey:", "NSRuleEditorEditable");
        self._allowsEmptyCompoundRows = objj_msgSend(aCoder, "decodeBoolForKey:", "NSRuleEditorAllowsEmptyCompoundRows");
        self._disallowEmpty = objj_msgSend(aCoder, "decodeBoolForKey:", "NSRuleEditorDisallowEmpty");
        self._nestingMode = objj_msgSend(aCoder, "decodeIntForKey:", "NSRuleEditorNestingMode");
        self._typeKeyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorRowTypeKeyPath");
        self._itemsKeyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorItemsKeyPath");
        self._valuesKeyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorValuesKeyPath");
        self._subrowsArrayKeyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorSubrowsArrayKeyPath");
        self._boundArrayKeyPath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorBoundArrayKeyPath");
        self._boundArrayOwner = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorBoundArrayOwner");
        self._slices = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorSlices");
        self._ruleDelegate = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRuleEditorDelegate");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPRuleEditor, "NSRuleEditor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSRuleEditor__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSRuleEditor__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPRuleEditor, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPRuleEditorViewSliceHolder, "_NSRuleEditorViewSliceHolder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $_NSRuleEditorViewSliceHolder__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSRuleEditorViewSliceHolder__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPRuleEditorViewSliceHolder, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPRuleEditorViewUnboundRowHolder, "_NSRuleEditorViewUnboundRowHolder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $_NSRuleEditorViewUnboundRowHolder__initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_NSRuleEditorViewUnboundRowHolder").super_class }, "init"))
        self.boundArray = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBoundArray");
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSRuleEditorViewUnboundRowHolder__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPRuleEditorViewUnboundRowHolder, "class");
}
,["Class"])]);
}p;12;NSScroller.jt;2419;@STATIC;1.0;I;19;AppKit/CPScroller.jt;2376;objj_executeFile("AppKit/CPScroller.j", NO);{
var the_class = objj_getClass("CPScroller")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPScroller\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPScroller__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPScroller").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._controlSize = CPRegularControlSize;
        self._knobProportion = 1.0;
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSPercent"))
            self._knobProportion = objj_msgSend(aCoder, "decodeFloatForKey:", "NSPercent");
        self._value = 0.0;
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSCurValue"))
            self._value = objj_msgSend(aCoder, "decodeFloatForKey:", "NSCurValue");
        self._isVertical = objj_msgSend(aCoder, "decodeIntForKey:", "NSsFlags") !== 1;
        if (CPStringFromSelector(objj_msgSend(self, "action")) === "_doScroller:")
            if (self._isVertical)
                objj_msgSend(self, "setAction:", sel_getUid("_verticalScrollerDidScroll:"));
            else
                objj_msgSend(self, "setAction:", sel_getUid("_horizontalScrollerDidScroll:"));
        self._partRects = [];
        if (self._isVertical)
            objj_msgSend(self, "setFrameSize:", CGSizeMake(15.0, CGRectGetHeight(objj_msgSend(self, "frame"))));
        else
            objj_msgSend(self, "setFrameSize:", CGSizeMake(CGRectGetWidth(objj_msgSend(self, "frame")), 15.0));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPScroller, "NSScroller"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSScroller__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSScroller__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPScroller, "class");
}
,["Class"])]);
}p;14;NSScrollView.jt;2411;@STATIC;1.0;I;21;AppKit/CPScrollView.jt;2366;objj_executeFile("AppKit/CPScrollView.j", NO);{
var the_class = objj_getClass("CPScrollView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPScrollView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPScrollView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPScrollView").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSsFlags");
        self._verticalScroller = objj_msgSend(aCoder, "decodeObjectForKey:", "NSVScroller");
        self._horizontalScroller = objj_msgSend(aCoder, "decodeObjectForKey:", "NSHScroller");
        self._contentView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSContentView");
        self._headerClipView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderClipView");
        self._cornerView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCornerView");
        self._bottomCornerView = objj_msgSend(objj_msgSend(CPView, "alloc"), "init");
        objj_msgSend(self, "addSubview:", self._bottomCornerView);
        self._scrollerKnobStyle = objj_msgSend(aCoder, "decodeObjectForKey:", "NSScrollerKnobStyle");
        if (self._scrollerKnobStyle === nil)
            self._scrollerKnobStyle = CPScrollerKnobStyleDefault;
        self._hasVerticalScroller = !!(flags & 1 << 4);
        self._hasHorizontalScroller = !!(flags & 1 << 5);
        self._autohidesScrollers = !!(flags & 1 << 9);
        self._borderType = flags & 0x03;
        self._verticalLineScroll = 10.0;
        self._verticalPageScroll = 10.0;
        self._horizontalLineScroll = 10.0;
        self._horizontalPageScroll = 10.0;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPScrollView, "NSScrollView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSScrollView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSScrollView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPScrollView, "class");
}
,["Class"])]);
}p;15;NSSearchField.jt;4845;@STATIC;1.0;I;22;AppKit/CPSearchField.ji;13;NSTextField.jt;4781;objj_executeFile("AppKit/CPSearchField.j", NO);objj_executeFile("NSTextField.j", YES);{
var the_class = objj_getClass("CPSearchField")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSearchField\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSearchField__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSearchField").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPSearchField__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSearchField").super_class }, "NS_initWithCell:", cell);
    objj_msgSend(self, "setRecentsAutosaveName:", objj_msgSend(cell, "recentsAutosaveName"));
    objj_msgSend(self, "setMaximumRecents:", objj_msgSend(cell, "maximumRecents"));
    objj_msgSend(self, "setSendsWholeSearchString:", objj_msgSend(cell, "sendsWholeSearchString"));
    objj_msgSend(self, "setSendsSearchStringImmediately:", objj_msgSend(cell, "sendsSearchStringImmediately"));
    if (objj_msgSend(objj_msgSend(Nib2Cib, "defaultTheme"), "name") === "Aristo" && objj_msgSend(self, "isBezeled"))
    {
        var frame = objj_msgSend(self, "frame");
        objj_msgSend(self, "setFrameSize:", CGSizeMake(frame.size.width, frame.size.height));
    }
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSearchField, "NSSearchField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSearchField__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSearchField__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSearchField, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSTextFieldCell, "NSSearchFieldCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_recentsAutosaveName"), new objj_ivar("_maximumRecents"), new objj_ivar("_sendsWholeSearchString"), new objj_ivar("_sendsSearchStringImmediately")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("recentsAutosaveName"), function $NSSearchFieldCell__recentsAutosaveName(self, _cmd)
{
    return self._recentsAutosaveName;
}
,["CPString"]), new objj_method(sel_getUid("setRecentsAutosaveName:"), function $NSSearchFieldCell__setRecentsAutosaveName_(self, _cmd, newValue)
{
    self._recentsAutosaveName = newValue;
}
,["void","CPString"]), new objj_method(sel_getUid("maximumRecents"), function $NSSearchFieldCell__maximumRecents(self, _cmd)
{
    return self._maximumRecents;
}
,["int"]), new objj_method(sel_getUid("setMaximumRecents:"), function $NSSearchFieldCell__setMaximumRecents_(self, _cmd, newValue)
{
    self._maximumRecents = newValue;
}
,["void","int"]), new objj_method(sel_getUid("sendsWholeSearchString"), function $NSSearchFieldCell__sendsWholeSearchString(self, _cmd)
{
    return self._sendsWholeSearchString;
}
,["BOOL"]), new objj_method(sel_getUid("setSendsWholeSearchString:"), function $NSSearchFieldCell__setSendsWholeSearchString_(self, _cmd, newValue)
{
    self._sendsWholeSearchString = newValue;
}
,["void","BOOL"]), new objj_method(sel_getUid("sendsSearchStringImmediately"), function $NSSearchFieldCell__sendsSearchStringImmediately(self, _cmd)
{
    return self._sendsSearchStringImmediately;
}
,["BOOL"]), new objj_method(sel_getUid("setSendsSearchStringImmediately:"), function $NSSearchFieldCell__setSendsSearchStringImmediately_(self, _cmd, newValue)
{
    self._sendsSearchStringImmediately = newValue;
}
,["void","BOOL"]), new objj_method(sel_getUid("initWithCoder:"), function $NSSearchFieldCell__initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSSearchFieldCell").super_class }, "initWithCoder:", aCoder))
    {
        self._recentsAutosaveName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSRecentsAutosaveName");
        self._maximumRecents = objj_msgSend(aCoder, "decodeIntForKey:", "NSMaximumRecents");
        self._sendsWholeSearchString = objj_msgSend(aCoder, "decodeBoolForKey:", "NSSendsWholeSearchString");
        self._sendsSearchStringImmediately = objj_msgSend(aCoder, "decodeBytesForKey:", "NSSearchFieldFlags") ? YES : NO;
    }
    return self;
}
,["id","CPCoder"])]);
}p;19;NSSecureTextField.jt;1029;@STATIC;1.0;I;26;AppKit/CPSecureTextField.ji;13;NSTextField.jt;962;objj_executeFile("AppKit/CPSecureTextField.j", NO);objj_executeFile("NSTextField.j", YES);{var the_class = objj_allocateClassPair(CPSecureTextField, "NSSecureTextField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSecureTextField__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSecureTextField__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSecureTextField, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSTextFieldCell, "NSSecureTextFieldCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;20;NSSegmentedControl.jt;6171;@STATIC;1.0;I;27;AppKit/CPSegmentedControl.ji;8;NSCell.jt;6108;objj_executeFile("AppKit/CPSegmentedControl.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPSegmentedControl")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSegmentedControl\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSegmentedControl__NS_initWithCoder_(self, _cmd, aCoder)
{
    self._segments = [];
    self._themeStates = [];
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSegmentedControl").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPSegmentedControl__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSegmentedControl").super_class }, "NS_initWithCell:", cell);
    var frame = objj_msgSend(self, "frame"),
        originalWidth = frame.size.width;
    frame.size.width = 0;
    frame.origin.x = MAX(frame.origin.x - 4.0, 0.0);
    objj_msgSend(self, "setFrame:", frame);
    self._segments = objj_msgSend(cell, "segments");
    self._selectedSegment = objj_msgSend(cell, "selectedSegment");
    self._segmentStyle = objj_msgSend(cell, "segmentStyle");
    self._trackingMode = objj_msgSend(cell, "trackingMode");
    objj_msgSend(self, "setValue:forThemeAttribute:", CPCenterTextAlignment, "alignment");
    for (var i = 0; i < self._segments.length; i++)
    {
        self._themeStates[i] = self._segments[i].selected ? CPThemeStateSelected : CPThemeStateNormal;
        objj_msgSend(self, "tileWithChangedSegment:", i);
    }
    frame.origin.x += 6;
    if (objj_msgSend(objj_msgSend(Nib2Cib, "defaultTheme"), "name") == "Aristo2")
        frame.size.height += 1;
    frame.size.width = originalWidth;
    objj_msgSend(self, "setFrame:", frame);
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSegmentedControl, "NSSegmentedControl"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSegmentedControl__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSegmentedControl__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSegmentedControl, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSActionCell, "NSSegmentedCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_segments"), new objj_ivar("_selectedSegment"), new objj_ivar("_segmentStyle"), new objj_ivar("_trackingMode")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("segments"), function $NSSegmentedCell__segments(self, _cmd)
{
    return self._segments;
}
,["CPArray"]), new objj_method(sel_getUid("selectedSegment"), function $NSSegmentedCell__selectedSegment(self, _cmd)
{
    return self._selectedSegment;
}
,["int"]), new objj_method(sel_getUid("segmentStyle"), function $NSSegmentedCell__segmentStyle(self, _cmd)
{
    return self._segmentStyle;
}
,["int"]), new objj_method(sel_getUid("trackingMode"), function $NSSegmentedCell__trackingMode(self, _cmd)
{
    return self._trackingMode;
}
,["CPSegmentSwitchTracking"]), new objj_method(sel_getUid("initWithCoder:"), function $NSSegmentedCell__initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSSegmentedCell").super_class }, "initWithCoder:", aCoder))
    {
        self._segments = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSegmentImages");
        self._selectedSegment = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSelectedSegment");
        if (self._selectedSegment === nil)
            self._selectedSegment = -1;
        self._segmentStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSSegmentStyle");
        self._trackingMode = objj_msgSend(aCoder, "decodeIntForKey:", "NSTrackingMode");
        if (self._trackingMode == CPSegmentSwitchTrackingSelectOne && self._selectedSegment == -1)
            self._selectedSegment = 0;
    }
    return self;
}
,["id","CPCoder"])]);
}{
var the_class = objj_getClass("_CPSegmentItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPSegmentItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPSegmentItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPSegmentItem").super_class }, "init"))
    {
        self.image = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSegmentItemImage");
        self.label = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSegmentItemLabel");
        self.menu = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSegmentItemMenu");
        self.selected = objj_msgSend(aCoder, "decodeBoolForKey:", "NSSegmentItemSelected");
        self.enabled = !objj_msgSend(aCoder, "decodeBoolForKey:", "NSSegmentItemDisabled");
        self.tag = objj_msgSend(aCoder, "decodeIntForKey:", "NSSegmentItemTag");
        self.width = objj_msgSend(aCoder, "decodeIntForKey:", "NSSegmentItemWidth");
        self.frame = CGRectMakeZero();
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPSegmentItem, "NSSegmentItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSegmentItem__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSegmentItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPSegmentItem, "class");
}
,["Class"])]);
}p;7;NSSet.jt;691;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;Foundation/CPSet.jt;624;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPSet.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSSet"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSet__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(objj_msgSend(CPSet, "alloc"), "initWithArray:", objj_msgSend(aCoder, "decodeObjectForKey:", "NS.objects"));
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSSet, "NSMutableSet"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;10;NSSlider.jt;4053;@STATIC;1.0;I;17;AppKit/CPSlider.ji;8;NSCell.jt;4000;objj_executeFile("AppKit/CPSlider.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPSlider")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSlider\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSlider__NS_initWithCoder_(self, _cmd, aCoder)
{
    var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
    self._minValue = objj_msgSend(cell, "minValue");
    self._maxValue = objj_msgSend(cell, "maxValue");
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSlider").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPSlider__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSlider").super_class }, "NS_initWithCell:", cell);
    self._altIncrementValue = objj_msgSend(cell, "altIncrementValue");
    objj_msgSend(self, "setSliderType:", objj_msgSend(cell, "sliderType"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSlider, "NSSlider"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSlider__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
        var frame = objj_msgSend(self, "frame");
        if (objj_msgSend(self, "sliderType") === CPCircularSlider)
            objj_msgSend(self, "setFrameSize:", CGSizeMake(frame.size.width + 2.0, frame.size.height + 2.0));
        else
            objj_msgSend(self, "setFrame:", CGRectMake(frame.origin.x + 2, frame.origin.y, frame.size.width - 4, frame.size.height));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSlider__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSlider, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSSliderCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_minValue"), new objj_ivar("_maxValue"), new objj_ivar("_altIncrementValue"), new objj_ivar("_vertical"), new objj_ivar("_sliderType")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("minValue"), function $NSSliderCell__minValue(self, _cmd)
{
    return self._minValue;
}
,["double"]), new objj_method(sel_getUid("maxValue"), function $NSSliderCell__maxValue(self, _cmd)
{
    return self._maxValue;
}
,["double"]), new objj_method(sel_getUid("altIncrementValue"), function $NSSliderCell__altIncrementValue(self, _cmd)
{
    return self._altIncrementValue;
}
,["double"]), new objj_method(sel_getUid("isVertical"), function $NSSliderCell__isVertical(self, _cmd)
{
    return self._vertical;
}
,["BOOL"]), new objj_method(sel_getUid("sliderType"), function $NSSliderCell__sliderType(self, _cmd)
{
    return self._sliderType;
}
,["int"]), new objj_method(sel_getUid("initWithCoder:"), function $NSSliderCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSSliderCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._objectValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSValue");
        self._minValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMinValue");
        self._maxValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMaxValue");
        self._altIncrementValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSAltIncValue");
        self._isVertical = objj_msgSend(aCoder, "decodeBoolForKey:", "NSVertical");
        self._sliderType = objj_msgSend(aCoder, "decodeIntForKey:", "NSSliderType");
    }
    return self;
}
,["id","CPCoder"])]);
}p;18;NSSortDescriptor.jt;1426;@STATIC;1.0;I;29;Foundation/CPSortDescriptor.jt;1373;objj_executeFile("Foundation/CPSortDescriptor.j", NO);{
var the_class = objj_getClass("CPSortDescriptor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSortDescriptor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSortDescriptor__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSortDescriptor").super_class }, "init"))
    {
        self._key = objj_msgSend(aCoder, "decodeObjectForKey:", "NSKey");
        self._selector = CPSelectorFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NSSelector"));
        self._ascending = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAscending");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPSortDescriptor, "NSSortDescriptor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSortDescriptor__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSortDescriptor__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSortDescriptor, "class");
}
,["Class"])]);
}p;13;NSSplitView.jt;1439;@STATIC;1.0;I;20;AppKit/CPSplitView.jt;1395;objj_executeFile("AppKit/CPSplitView.j", NO);var NSThinDividerStyle = 2;
{
var the_class = objj_getClass("CPSplitView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSplitView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSplitView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSplitView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._isVertical = objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsVertical");
        self._isPaneSplitter = objj_msgSend(aCoder, "decodeIntForKey:", "NSDividerStyle") != NSThinDividerStyle;
        self._autosaveName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSAutosaveName");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPSplitView, "NSSplitView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSplitView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSplitView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPSplitView, "class");
}
,["Class"])]);
}p;11;NSStepper.jt;3778;@STATIC;1.0;I;18;AppKit/CPStepper.ji;8;NSCell.jt;3724;objj_executeFile("AppKit/CPStepper.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPStepper")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPStepper\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPStepper__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPStepper").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPStepper__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPStepper").super_class }, "NS_initWithCell:", cell);
    self._minValue = objj_msgSend(cell, "minValue");
    self._maxValue = objj_msgSend(cell, "maxValue");
    self._increment = objj_msgSend(cell, "increment");
    self._valueWraps = objj_msgSend(cell, "valueWraps");
    self._autorepeat = objj_msgSend(cell, "autorepeat");
    self._objectValue = objj_msgSend(cell, "objectValue");
    self._frame.origin.y += 2;
    self._frame.size.height -= 2;
    self._bounds.size.height -= 2;
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPStepper, "NSStepper"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSStepper__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSStepper__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPStepper, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSStepperCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_minValue"), new objj_ivar("_maxValue"), new objj_ivar("_increment"), new objj_ivar("_valueWraps"), new objj_ivar("_autorepeat")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("minValue"), function $NSStepperCell__minValue(self, _cmd)
{
    return self._minValue;
}
,["double"]), new objj_method(sel_getUid("maxValue"), function $NSStepperCell__maxValue(self, _cmd)
{
    return self._maxValue;
}
,["double"]), new objj_method(sel_getUid("increment"), function $NSStepperCell__increment(self, _cmd)
{
    return self._increment;
}
,["double"]), new objj_method(sel_getUid("valueWraps"), function $NSStepperCell__valueWraps(self, _cmd)
{
    return self._valueWraps;
}
,["BOOL"]), new objj_method(sel_getUid("autorepeat"), function $NSStepperCell__autorepeat(self, _cmd)
{
    return self._autorepeat;
}
,["BOOL"]), new objj_method(sel_getUid("initWithCoder:"), function $NSStepperCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSStepperCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._objectValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSValue");
        self._minValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMinValue");
        self._maxValue = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSMaxValue");
        self._increment = objj_msgSend(aCoder, "decodeDoubleForKey:", "NSIncrement");
        self._valueWraps = objj_msgSend(aCoder, "decodeBoolForKey:", "NSValueWraps");
        self._autorepeat = objj_msgSend(aCoder, "decodeBoolForKey:", "NSAutorepeat");
    }
    return self;
}
,["id","CPCoder"])]);
}p;17;NSTableCellView.jt;1123;@STATIC;1.0;I;20;AppKit/CPTableView.jt;1079;objj_executeFile("AppKit/CPTableView.j", NO);{
var the_class = objj_getClass("CPTableCellView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableCellView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableCellView__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTableCellView").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTableCellView, "NSTableCellView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableCellView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableCellView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTableCellView, "class");
}
,["Class"])]);
}p;15;NSTableColumn.jt;6275;@STATIC;1.0;I;25;AppKit/CPLevelIndicator.jI;22;AppKit/CPTableColumn.jI;26;AppKit/CPTableHeaderView.jI;17;AppKit/CPButton.ji;10;NSButton.ji;13;NSImageView.ji;18;NSLevelIndicator.ji;13;NSTextField.jt;6072;objj_executeFile("AppKit/CPLevelIndicator.j", NO);objj_executeFile("AppKit/CPTableColumn.j", NO);objj_executeFile("AppKit/CPTableHeaderView.j", NO);objj_executeFile("AppKit/CPButton.j", NO);objj_executeFile("NSButton.j", YES);objj_executeFile("NSImageView.j", YES);objj_executeFile("NSLevelIndicator.j", YES);objj_executeFile("NSTextField.j", YES);var IBDefaultFontSizeTableHeader = 11.0;
{
var the_class = objj_getClass("CPTableColumn")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableColumn\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableColumn__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "init");
    if (self)
    {
        self._identifier = objj_msgSend(aCoder, "decodeObjectForKey:", "NSIdentifier");
        var dataViewCell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSDataCell"),
            viewClass = nil;
        if (objj_msgSend(dataViewCell, "isKindOfClass:", objj_msgSend(NSImageCell, "class")))
            viewClass = CPImageView;
        else if (objj_msgSend(dataViewCell, "isKindOfClass:", objj_msgSend(NSTextFieldCell, "class")))
            viewClass = CPTextField;
        else if (objj_msgSend(dataViewCell, "isKindOfClass:", objj_msgSend(NSButtonCell, "class")))
            viewClass = CPButton;
        else if (objj_msgSend(dataViewCell, "isKindOfClass:", objj_msgSend(NSLevelIndicatorCell, "class")))
            viewClass = CPLevelIndicator;
        if (viewClass)
            self._dataView = objj_msgSend(self, "makeDataViewOfClass:withCell:", viewClass, dataViewCell);
        objj_msgSend(self._dataView, "setValue:forThemeAttribute:", objj_msgSend(dataViewCell, "alignment"), "alignment");
        var headerCell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderCell"),
            headerView = objj_msgSend(objj_msgSend(_CPTableColumnHeaderView, "alloc"), "initWithFrame:", CGRectMakeZero()),
            theme = objj_msgSend(Nib2Cib, "defaultTheme");
        objj_msgSend(headerView, "setStringValue:", objj_msgSend(headerCell, "objectValue"));
        objj_msgSend(headerView, "setFont:", objj_msgSend(headerCell, "font"));
        objj_msgSend(headerView, "setAlignment:", objj_msgSend(headerCell, "alignment"));
        if (objj_msgSend(objj_msgSend(headerCell, "font"), "familyName") === IBDefaultFontFace && objj_msgSend(objj_msgSend(headerCell, "font"), "size") == IBDefaultFontSizeTableHeader)
        {
            objj_msgSend(headerView, "setTextColor:", objj_msgSend(theme, "valueForAttributeWithName:forClass:", "text-color", _CPTableColumnHeaderView));
            objj_msgSend(headerView, "setFont:", objj_msgSend(theme, "valueForAttributeWithName:forClass:", "font", _CPTableColumnHeaderView));
        }
        objj_msgSend(self, "setHeaderView:", headerView);
        self._width = objj_msgSend(aCoder, "decodeFloatForKey:", "NSWidth");
        self._minWidth = objj_msgSend(aCoder, "decodeFloatForKey:", "NSMinWidth");
        self._maxWidth = objj_msgSend(aCoder, "decodeFloatForKey:", "NSMaxWidth");
        self._resizingMask = objj_msgSend(aCoder, "decodeIntForKey:", "NSResizingMask");
        self._isHidden = objj_msgSend(aCoder, "decodeBoolForKey:", "NSHidden");
        self._isEditable = objj_msgSend(aCoder, "decodeBoolForKey:", "NSIsEditable");
        self._sortDescriptorPrototype = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSortDescriptorPrototype");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("makeDataViewOfClass:withCell:"), function $CPTableColumn__makeDataViewOfClass_withCell_(self, _cmd, aClass, aCell)
{
    var dataView = objj_msgSend(objj_msgSend(aClass, "alloc"), "initWithFrame:", CGRectMakeZero());
    objj_msgSend(dataView, "setThemeState:", CPThemeStateTableDataView);
    objj_msgSend(dataView, "NS_initWithCell:", aCell);
    if (aClass === CPTextField)
    {
        objj_msgSend(objj_msgSend(Converter, "sharedConverter"), "replaceFontForObject:", dataView);
        var textColor = objj_msgSend(aCell, "textColor"),
            defaultColor = objj_msgSend(self, "valueForDataViewThemeAttribute:inState:", "text-color", CPThemeStateNormal);
        if (!objj_msgSend(textColor, "isEqual:", defaultColor))
        {
            var selectedColor = objj_msgSend(self, "valueForDataViewThemeAttribute:inState:", "text-color", CPThemeStateTableDataView | CPThemeStateSelectedDataView);
            objj_msgSend(dataView, "setValue:forThemeAttribute:inState:", selectedColor, "text-color", CPThemeStateTableDataView | CPThemeStateSelectedDataView);
            objj_msgSend(dataView, "setValue:forThemeAttribute:inState:", textColor, "text-color", CPThemeStateTableDataView | CPThemeStateSelectedDataView | CPThemeStateEditing);
        }
    }
    return dataView;
}
,["id","Class","NSCell"]), new objj_method(sel_getUid("valueForDataViewThemeAttribute:inState:"), function $CPTableColumn__valueForDataViewThemeAttribute_inState_(self, _cmd, attribute, state)
{
    var themes = objj_msgSend(objj_msgSend(Nib2Cib, "sharedNib2Cib"), "themes");
    for (var i = 0; i < themes.length; ++i)
    {
        var value = objj_msgSend(themes[i], "valueForAttributeWithName:inState:forClass:", attribute, state, CPTextField);
        if (value)
            return value;
    }
    return nil;
}
,["id","CPString","int"])]);
}{var the_class = objj_allocateClassPair(CPTableColumn, "NSTableColumn"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableColumn__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableColumn__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTableColumn, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSActionCell, "NSTableHeaderCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;19;NSTableHeaderView.jt;1651;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jt;1601;objj_executeFile("AppKit/CPTableHeaderView.j", NO);{
var the_class = objj_getClass("CPTableHeaderView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableHeaderView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableHeaderView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTableHeaderView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._tableView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTableView");
        if (self._bounds.size.height === 17)
        {
            var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
                height = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "default-row-height", CPTableView);
            self._bounds.size.height = height;
            self._frame.size.height = height;
        }
        self._drawsColumnLines = YES;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTableHeaderView, "NSTableHeaderView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableHeaderView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableHeaderView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTableHeaderView, "class");
}
,["Class"])]);
}p;13;NSTableView.jt;3747;@STATIC;1.0;I;20;AppKit/CPTableView.jt;3703;objj_executeFile("AppKit/CPTableView.j", NO);{
var the_class = objj_getClass("CPTableView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTableView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var flags = objj_msgSend(aCoder, "decodeIntForKey:", "NSTvFlags");
        self._rowHeight = objj_msgSend(aCoder, "decodeFloatForKey:", "NSRowHeight");
        if (self._rowHeight == 17)
        {
            var theme = objj_msgSend(Nib2Cib, "defaultTheme"),
                height = objj_msgSend(theme, "valueForAttributeWithName:forClass:", "default-row-height", CPTableView);
            self._rowHeight = height;
        }
        self._headerView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderView");
        self._cornerView = self._headerView ? objj_msgSend(aCoder, "decodeObjectForKey:", "NSCornerView") : nil;
        objj_msgSend(self._cornerView, "setHidden:", NO);
        self._autosaveName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSAutosaveName");
        self._tableColumns = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTableColumns");
        objj_msgSend(self._tableColumns, "makeObjectsPerformSelector:withObject:", sel_getUid("setTableView:"), self);
        self._archivedDataViews = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTableViewArchivedReusableViewsKey");
        self._intercellSpacing = CGSizeMake(objj_msgSend(aCoder, "decodeFloatForKey:", "NSIntercellSpacingWidth"), objj_msgSend(aCoder, "decodeFloatForKey:", "NSIntercellSpacingHeight"));
        objj_msgSend(self, "setValue:forThemeAttribute:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSGridColor"), "grid-color");
        self._gridStyleMask = objj_msgSend(aCoder, "decodeIntForKey:", "NSGridStyleMask");
        self._usesAlternatingRowBackgroundColors = flags & 0x00800000 ? YES : NO;
        self._alternatingRowBackgroundColors = [objj_msgSend(CPColor, "whiteColor"), objj_msgSend(CPColor, "colorWithHexString:", "e4e7ff")];
        self._selectionHighlightStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSTableViewSelectionHighlightStyle");
        self._columnAutoResizingStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSColumnAutoresizingStyle");
        self._allowsMultipleSelection = flags & 0x08000000 ? YES : NO;
        self._allowsEmptySelection = flags & 0x10000000 ? YES : NO;
        self._allowsColumnSelection = flags & 0x04000000 ? YES : NO;
        self._allowsColumnResizing = flags & 0x40000000 ? YES : NO;
        self._allowsColumnReordering = flags & 0x80000000 ? YES : NO;
        objj_msgSend(self, "setBackgroundColor:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSBackgroundColor"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTableView, "NSTableView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTableView, "class");
}
,["Class"])]);
}p;11;NSTabView.jt;1577;@STATIC;1.0;I;18;AppKit/CPTabView.ji;15;NSTabViewItem.jt;1515;objj_executeFile("AppKit/CPTabView.j", NO);objj_executeFile("NSTabViewItem.j", YES);{
var the_class = objj_getClass("CPTabView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTabView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTabView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTabView").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTvFlags");
        self._type = flags & 0x7;
        self._items = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTabViewItems");
        self._selectedIndex = objj_msgSend(self._items, "indexOfObject:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSSelectedTabViewItem"));
        self._font = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFont");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTabView, "NSTabView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTabView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTabView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTabView, "class");
}
,["Class"])]);
}p;15;NSTabViewItem.jt;1577;@STATIC;1.0;I;22;AppKit/CPTabViewItem.jt;1531;objj_executeFile("AppKit/CPTabViewItem.j", NO);{
var the_class = objj_getClass("CPTabViewItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTabViewItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTabViewItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTabViewItem").super_class }, "init"))
    {
        self._identifier = objj_msgSend(aCoder, "decodeObjectForKey:", "NSIdentifier");
        self._label = objj_msgSend(aCoder, "decodeObjectForKey:", "NSLabel");
        self._view = objj_msgSend(aCoder, "decodeObjectForKey:", "NSView");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("awakeFromNib"), function $CPTabViewItem__awakeFromNib(self, _cmd)
{
    if (objj_msgSend(self._view, "superview"))
        objj_msgSend(self._view, "removeFromSuperview");
}
,["void"])]);
}{var the_class = objj_allocateClassPair(CPTabViewItem, "NSTabViewItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTabViewItem__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTabViewItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTabViewItem, "class");
}
,["Class"])]);
}p;13;NSTextField.jt;5894;@STATIC;1.0;I;15;AppKit/CPFont.jI;20;AppKit/CPTextField.ji;8;NSCell.ji;11;NSControl.jt;5802;objj_executeFile("AppKit/CPFont.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPTextField")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTextField\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTextField__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTextField").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPTextField__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTextField").super_class }, "NS_initWithCell:", cell);
    objj_msgSend(self, "setEditable:", objj_msgSend(cell, "isEditable"));
    objj_msgSend(self, "setEnabled:", objj_msgSend(cell, "isEnabled"));
    objj_msgSend(self, "setSelectable:", objj_msgSend(cell, "isSelectable"));
    objj_msgSend(self, "setSendsActionOnEndEditing:", objj_msgSend(cell, "sendsActionOnEndEditing"));
    objj_msgSend(self, "setBordered:", objj_msgSend(cell, "isBordered"));
    objj_msgSend(self, "setBezeled:", objj_msgSend(cell, "isBezeled"));
    objj_msgSend(self, "setBezelStyle:", objj_msgSend(cell, "bezelStyle"));
    objj_msgSend(self, "setDrawsBackground:", objj_msgSend(cell, "drawsBackground"));
    objj_msgSend(self, "setLineBreakMode:", objj_msgSend(cell, "lineBreakMode"));
    objj_msgSend(self, "setAlignment:", objj_msgSend(cell, "alignment"));
    objj_msgSend(self, "setTextFieldBackgroundColor:", objj_msgSend(cell, "backgroundColor"));
    objj_msgSend(self, "setPlaceholderString:", objj_msgSend(cell, "placeholderString"));
    var textColor = objj_msgSend(cell, "textColor"),
        defaultColor = objj_msgSend(self, "currentValueForThemeAttribute:", "text-color");
    if (!objj_msgSend(textColor, "isEqual:", defaultColor))
        objj_msgSend(self, "setTextColor:", objj_msgSend(cell, "textColor"));
    var frame = objj_msgSend(self, "frame");
    if (objj_msgSend(self, "isBezeled"))
    {
        objj_msgSend(self, "setFrameOrigin:", CGPointMake(frame.origin.x - 4.0, frame.origin.y - 3.0));
        objj_msgSend(self, "setFrameSize:", CGSizeMake(frame.size.width + 8.0, frame.size.height + 7.0));
    }
    else
    {
        objj_msgSend(self, "setFrameOrigin:", CGPointMake(frame.origin.x + 3.0, frame.origin.y));
        objj_msgSend(self, "setFrameSize:", CGSizeMake(frame.size.width - 6.0, frame.size.height));
    }
    CPLog.debug("NSTextField: title=\"" + objj_msgSend(self, "stringValue") + "\", placeholder=" + (objj_msgSend(cell, "placeholderString") == null ? "<none>" : '"' + objj_msgSend(cell, "placeholderString") + '"') + ", isBordered=" + objj_msgSend(self, "isBordered") + ", isBezeled=" + objj_msgSend(self, "isBezeled") + ", bezelStyle=" + objj_msgSend(self, "bezelStyle"));
    if (objj_msgSend(self, "formatter"))
        CPLog.debug(">> Formatter: " + objj_msgSend(objj_msgSend(self, "formatter"), "description"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPTextField, "NSTextField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTextField__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTextField__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTextField, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSTextFieldCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_bezelStyle"), new objj_ivar("_drawsBackground"), new objj_ivar("_backgroundColor"), new objj_ivar("_textColor"), new objj_ivar("_placeholderString")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("bezelStyle"), function $NSTextFieldCell__bezelStyle(self, _cmd)
{
    return self._bezelStyle;
}
,["CPTextFieldBezelStyle"]), new objj_method(sel_getUid("drawsBackground"), function $NSTextFieldCell__drawsBackground(self, _cmd)
{
    return self._drawsBackground;
}
,["BOOL"]), new objj_method(sel_getUid("backgroundColor"), function $NSTextFieldCell__backgroundColor(self, _cmd)
{
    return self._backgroundColor;
}
,["CPColor"]), new objj_method(sel_getUid("textColor"), function $NSTextFieldCell__textColor(self, _cmd)
{
    return self._textColor;
}
,["CPColor"]), new objj_method(sel_getUid("placeholderString"), function $NSTextFieldCell__placeholderString(self, _cmd)
{
    return self._placeholderString;
}
,["CPString"]), new objj_method(sel_getUid("initWithCoder:"), function $NSTextFieldCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSTextFieldCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._bezelStyle = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTextBezelStyle") || CPTextFieldSquareBezel;
        self._drawsBackground = objj_msgSend(aCoder, "decodeBoolForKey:", "NSDrawsBackground");
        self._backgroundColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSBackgroundColor");
        self._textColor = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTextColor");
        self._placeholderString = objj_msgSend(aCoder, "decodeObjectForKey:", "NSPlaceholderString");
    }
    return self;
}
,["id","CPCoder"])]);
}p;14;NSTokenField.jt;2502;@STATIC;1.0;I;15;AppKit/CPFont.jI;21;AppKit/CPTokenField.ji;11;NSControl.ji;8;NSCell.ji;13;NSTextField.jt;2391;objj_executeFile("AppKit/CPFont.j", NO);objj_executeFile("AppKit/CPTokenField.j", NO);objj_executeFile("NSControl.j", YES);objj_executeFile("NSCell.j", YES);objj_executeFile("NSTextField.j", YES);{
var the_class = objj_getClass("CPTokenField")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTokenField\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTokenField__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTokenField").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPTokenField__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTokenField").super_class }, "NS_initWithCell:", cell);
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPTokenField, "NSTokenField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTokenField__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSend(self, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var cell = objj_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
        objj_msgSend(self, "NS_initWithCell:", cell);
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTokenField__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPTokenField, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSTextFieldCell, "NSTokenFieldCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_tokenStyle")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("tokenStyle"), function $NSTokenFieldCell__tokenStyle(self, _cmd)
{
    return self._tokenStyle;
}
,["int"]), new objj_method(sel_getUid("initWithCoder:"), function $NSTokenFieldCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSTokenFieldCell").super_class }, "initWithCoder:", aCoder);
    if (self)
    {
        self._tokenStyle = objj_msgSend(aCoder, "decodeIntForKey:", "NSTokenStyle");
    }
    return self;
}
,["id","CPCoder"])]);
}p;11;NSToolbar.jt;2681;@STATIC;1.0;I;18;AppKit/CPToolbar.ji;15;NSToolbarItem.jt;2619;objj_executeFile("AppKit/CPToolbar.j", NO);objj_executeFile("NSToolbarItem.j", YES);{
var the_class = objj_getClass("CPToolbar")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPToolbar\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPToolbar__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self)
    {
        self._identifier = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarIdentifier");
        self._displayMode = objj_msgSend(aCoder, "decodeIntForKey:", "NSToolbarDisplayMode");
        self._showsBaselineSeparator = objj_msgSend(aCoder, "decodeBoolForKey:", "NSToolbarShowsBaselineSeparator");
        self._allowsUserCustomization = objj_msgSend(aCoder, "decodeBoolForKey:", "NSToolbarAllowsUserCustomization");
        self._isVisible = objj_msgSend(aCoder, "decodeBoolForKey:", "NSToolbarPrefersToBeShown");
        self._identifiedItems = objj_msgSend(CPMutableDictionary, "dictionary");
        var nsIdentifiedItems = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarIBIdentifiedItems"),
            key = nil,
            keyEnumerator = objj_msgSend(nsIdentifiedItems, "keyEnumerator");
        while ((key = objj_msgSend(keyEnumerator, "nextObject")) !== nil)
        {
            var transformedKey = NS_CPToolbarItemIdentifierMap[key] || key;
            objj_msgSend(self._identifiedItems, "setObject:forKey:", objj_msgSend(nsIdentifiedItems, "objectForKey:", key), transformedKey);
        }
        self._defaultItems = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarIBDefaultItems");
        self._allowedItems = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarIBAllowedItems");
        self._selectableItems = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarIBSelectableItems");
        self._sizeMode = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarSizeMode") || CPToolbarSizeModeDefault;
        self._delegate = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarDelegate");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPToolbar, "NSToolbar"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSToolbar__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbar__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPToolbar, "class");
}
,["Class"])]);
}p;28;NSToolbarFlexibleSpaceItem.jt;519;@STATIC;1.0;I;36;AppKit/_CPToolbarFlexibleSpaceItem.jt;460;objj_executeFile("AppKit/_CPToolbarFlexibleSpaceItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarFlexibleSpaceItem, "NSToolbarFlexibleSpaceItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarFlexibleSpaceItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPToolbarFlexibleSpaceItem, "class");
}
,["Class"])]);
}p;15;NSToolbarItem.jt;3719;@STATIC;1.0;I;22;AppKit/CPToolbarItem.jt;3673;objj_executeFile("AppKit/CPToolbarItem.j", NO);NS_CPToolbarItemIdentifierMap = {"NSToolbarSeparatorItem": CPToolbarSeparatorItemIdentifier, "NSToolbarSpaceItem": CPToolbarSpaceItemIdentifier, "NSToolbarFlexibleSpaceItem": CPToolbarFlexibleSpaceItemIdentifier, "NSToolbarShowColorsItem": CPToolbarShowColorsItemIdentifier, "NSToolbarShowFontsItem": CPToolbarShowFontsItemIdentifier, "NSToolbarCustomizeToolbarItem": CPToolbarCustomizeToolbarItemIdentifier, "NSToolbarPrintItem": CPToolbarPrintItemIdentifier};
{
var the_class = objj_getClass("CPToolbarItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPToolbarItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPToolbarItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPToolbarItem").super_class }, "init");
    if (self)
    {
        var NS_itemIdentifier = objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemIdentifier");
        self._itemIdentifier = NS_CPToolbarItemIdentifierMap[NS_itemIdentifier] || NS_itemIdentifier;
        self._minSize = objj_msgSend(aCoder, "decodeSizeForKey:", "NSToolbarItemMinSize");
        self._maxSize = objj_msgSend(aCoder, "decodeSizeForKey:", "NSToolbarItemMaxSize");
        objj_msgSend(self, "setLabel:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemLabel"));
        objj_msgSend(self, "setPaletteLabel:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemPaletteLabel"));
        objj_msgSend(self, "setToolTip:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemToolTip"));
        objj_msgSend(self, "setTag:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemTag"));
        objj_msgSend(self, "setTarget:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemTarget"));
        objj_msgSend(self, "setAction:", CPSelectorFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemAction")));
        objj_msgSend(self, "setEnabled:", objj_msgSend(aCoder, "decodeBoolForKey:", "NSToolbarItemEnabled"));
        objj_msgSend(self, "setImage:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemImage"));
        if (self._maxSize.height > 0)
            self._maxSize.height = MIN(self._maxSize.height, 32.0);
        if (self._minSize.height > 0)
            self._minSize.height = MIN(self._minSize.height, 32.0);
        objj_msgSend(self, "setView:", objj_msgSend(aCoder, "decodeObjectForKey:", "NSToolbarItemView"));
        if (objj_msgSend(self._view, "isKindOfClass:", CPSearchField) && self._maxSize.height == 22.0)
        {
            self._maxSize.height = objj_msgSend(self._view, "frameSize").height;
            self._minSize.height = self._maxSize.height;
        }
        objj_msgSend(self, "setVisibilityPriority:", objj_msgSend(aCoder, "decodeIntForKey:", "NSToolbarItemVisibilityPriority"));
        objj_msgSend(self, "setAutovalidates:", objj_msgSend(aCoder, "decodeBoolForKey:", "NSToolbarItemAutovalidates"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPToolbarItem, "NSToolbarItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSToolbarItem__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPToolbarItem, "class");
}
,["Class"])]);
}p;24;NSToolbarSeparatorItem.jt;495;@STATIC;1.0;I;32;AppKit/_CPToolbarSeparatorItem.jt;440;objj_executeFile("AppKit/_CPToolbarSeparatorItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarSeparatorItem, "NSToolbarSeparatorItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarSeparatorItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPToolbarSeparatorItem, "class");
}
,["Class"])]);
}p;25;NSToolbarShowColorsItem.jt;501;@STATIC;1.0;I;33;AppKit/_CPToolbarShowColorsItem.jt;445;objj_executeFile("AppKit/_CPToolbarShowColorsItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarShowColorsItem, "NSToolbarShowColorsItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarShowColorsItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPToolbarShowColorsItem, "class");
}
,["Class"])]);
}p;20;NSToolbarSpaceItem.jt;471;@STATIC;1.0;I;28;AppKit/_CPToolbarSpaceItem.jt;420;objj_executeFile("AppKit/_CPToolbarSpaceItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarSpaceItem, "NSToolbarSpaceItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarSpaceItem__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPToolbarSpaceItem, "class");
}
,["Class"])]);
}p;26;NSUserDefaultsController.jt;1580;@STATIC;1.0;I;33;AppKit/CPUserDefaultsController.jt;1523;objj_executeFile("AppKit/CPUserDefaultsController.j", NO);{
var the_class = objj_getClass("CPUserDefaultsController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPUserDefaultsController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPUserDefaultsController__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (objj_msgSend(aCoder, "decodeBoolForKey:", "NSSharedInstance"))
        return objj_msgSend(CPUserDefaultsController, "sharedUserDefaultsController");
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPUserDefaultsController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        objj_msgSend(CPException, "raise:reason:", CPUnsupportedMethodException, "decoding of non-shared NSUserDefaultsController not implemented");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPUserDefaultsController, "NSUserDefaultsController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSUserDefaultsController__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSUserDefaultsController__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPUserDefaultsController, "class");
}
,["Class"])]);
}p;9;NSValue.jt;1924;@STATIC;1.0;I;24;Foundation/CPException.jI;30;Foundation/CPKeyedUnarchiver.jI;21;Foundation/CPObject.jI;20;Foundation/CPRange.jI;20;Foundation/CPValue.jI;19;AppKit/CGGeometry.jt;1741;objj_executeFile("Foundation/CPException.j", NO);objj_executeFile("Foundation/CPKeyedUnarchiver.j", NO);objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPRange.j", NO);objj_executeFile("Foundation/CPValue.j", NO);objj_executeFile("AppKit/CGGeometry.j", NO);var NSPointNSValueType = 1,
    NSSizeNSValueType = 2,
    NSRectNSValueType = 3,
    NSRangeNSValueType = 4;
{var the_class = objj_allocateClassPair(CPObject, "NSValue"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSValue__initWithCoder_(self, _cmd, aCoder)
{
    var type = objj_msgSend(aCoder, "decodeIntForKey:", "NS.special");
    switch(type) {
    case NSPointNSValueType:
        return objj_msgSend(objj_msgSend(CPValue, "alloc"), "initWithJSObject:", CGPointFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NS.pointval")));
    case NSSizeNSValueType:
        return objj_msgSend(objj_msgSend(CPValue, "alloc"), "initWithJSObject:", CGSizeFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NS.sizeval")));
    case NSRectNSValueType:
        return objj_msgSend(objj_msgSend(CPValue, "alloc"), "initWithJSObject:", CGRectFromString(objj_msgSend(aCoder, "decodeObjectForKey:", "NS.rectval")));
    case NSRangeNSValueType:
        return objj_msgSend(objj_msgSend(CPValue, "alloc"), "initWithJSObject:", CPMakeRange(objj_msgSend(aCoder, "decodeIntForKey:", "NS.rangeval.location"), objj_msgSend(aCoder, "decodeIntForKey:", "NS.rangeval.length")));
default:
        objj_msgSend(CPException, "raise:format:", CPInvalidUnarchiveOperationException, "NSValue type %d is not supported by nib2cib.", type);
    }
}
,["id","CPCoder"])]);
}p;8;NSView.jt;4033;@STATIC;1.0;I;15;AppKit/CPView.jt;3994;objj_executeFile("AppKit/CPView.j", NO);var NSViewAutoresizingMask = 0x3F,
    NSViewAutoresizesSubviewsMask = 1 << 8,
    NSViewHiddenMask = 1 << 31;
{
var the_class = objj_getClass("CPView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self._frame = CGRectMakeZero();
    if (objj_msgSend(aCoder, "containsValueForKey:", "NSFrame"))
        self._frame = objj_msgSend(aCoder, "decodeRectForKey:", "NSFrame");
    else if (objj_msgSend(aCoder, "containsValueForKey:", "NSFrameSize"))
        self._frame.size = objj_msgSend(aCoder, "decodeSizeForKey:", "NSFrameSize");
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._tag = objj_msgSend(aCoder, "decodeIntForKey:", "NSTag");
        self._bounds = CGRectMake(0.0, 0.0, CGRectGetWidth(self._frame), CGRectGetHeight(self._frame));
        self._window = objj_msgSend(aCoder, "decodeObjectForKey:", "NSWindow");
        self._superview = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSuperview");
        self._subviews = objj_msgSend(aCoder, "decodeObjectForKey:", "NSSubviews");
        self._hierarchyScaleSize = CGSizeMake(1.0, 1.0);
        self._scaleSize = CGSizeMake(1.0, 1.0);
        self._isScaled = NO;
        if (!self._subviews)
            self._subviews = [];
        var vFlags = objj_msgSend(aCoder, "decodeIntForKey:", "NSvFlags");
        self._autoresizingMask = vFlags & NSViewAutoresizingMask;
        self._autoresizesSubviews = vFlags & NSViewAutoresizesSubviewsMask;
        self._hitTests = YES;
        self._isHidden = vFlags & NSViewHiddenMask;
        self._opacity = 1.0;
        self._themeClass = objj_msgSend(self, "themeClass");
        self._themeAttributes = {};
        self._themeState = CPThemeStateNormal;
        objj_msgSend(self, "_loadThemeAttributes");
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSReuseIdentifierKey"))
            self._identifier = objj_msgSend(aCoder, "decodeObjectForKey:", "NSReuseIdentifierKey");
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_isFlipped"), function $CPView__NS_isFlipped(self, _cmd)
{
    return NO;
}
,["BOOL"]), new objj_method(sel_getUid("awakeFromNib"), function $CPView__awakeFromNib(self, _cmd)
{
    var superview = objj_msgSend(self, "superview");
    if (!superview || objj_msgSend(superview, "NS_isFlipped"))
        return;
    var superviewHeight = CGRectGetHeight(objj_msgSend(superview, "bounds")),
        frame = objj_msgSend(self, "frame");
    objj_msgSend(self, "setFrameOrigin:", CGPointMake(CGRectGetMinX(frame), superviewHeight - CGRectGetMaxY(frame)));
    var NS_autoresizingMask = objj_msgSend(self, "autoresizingMask"),
        autoresizingMask = NS_autoresizingMask & ~(CPViewMaxYMargin | CPViewMinYMargin);
    if (!(NS_autoresizingMask & (CPViewMaxYMargin | CPViewMinYMargin | CPViewHeightSizable)))
        autoresizingMask |= CPViewMinYMargin;
    else
    {
        if (NS_autoresizingMask & CPViewMaxYMargin)
            autoresizingMask |= CPViewMinYMargin;
        if (NS_autoresizingMask & CPViewMinYMargin)
            autoresizingMask |= CPViewMaxYMargin;
    }
    objj_msgSend(self, "setAutoresizingMask:", autoresizingMask);
}
,["void"])]);
}{var the_class = objj_allocateClassPair(CPView, "NSView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPView, "class");
}
,["Class"])]);
}p;18;NSViewController.jt;1549;@STATIC;1.0;I;25;AppKit/CPViewController.jt;1500;objj_executeFile("AppKit/CPViewController.j", NO);{
var the_class = objj_getClass("CPViewController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPViewController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPViewController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPViewController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._title = objj_msgSend(aCoder, "decodeObjectForKey:", "NSTitle");
        self._cibName = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNibName");
        var bundlePath = objj_msgSend(aCoder, "decodeObjectForKey:", "NSNibBundleIdentifier");
        if (bundlePath)
            self._cibBundle = objj_msgSend(CPBundle, "bundleWithPath:", bundlePath);
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPViewController, "NSViewController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSViewController__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSViewController__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPViewController, "class");
}
,["Class"])]);
}p;18;NSWindowTemplate.jt;3931;@STATIC;1.0;I;16;AppKit/CPPanel.jI;29;AppKit/_CPCibWindowTemplate.jt;3857;objj_executeFile("AppKit/CPPanel.j", NO);objj_executeFile("AppKit/_CPCibWindowTemplate.j", NO);var NSBorderlessWindowMask = 0x00,
    NSTitledWindowMask = 0x01,
    NSClosableWindowMask = 0x02,
    NSMiniaturizableWindowMask = 0x04,
    NSResizableWindowMask = 0x08,
    NSUtilityWindowMask = 0x10,
    NSDocModalWindowMask = 0x40,
    NSTexturedBackgroundWindowMask = 0x100,
    NSHUDBackgroundWindowMask = 0x2000,
    NSPositionFlexibleRight = 1 << 19,
    NSPositionFlexibleLeft = 1 << 20,
    NSPositionFlexibleBottom = 1 << 21,
    NSPositionFlexibleTop = 1 << 22,
    NSAutorecalculatesKeyViewLoopWTFlag = 0x800;
{
var the_class = objj_getClass("_CPCibWindowTemplate")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibWindowTemplate\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibWindowTemplate__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCibWindowTemplate").super_class }, "init");
    if (self)
    {
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSMinSize"))
            self._minSize = objj_msgSend(aCoder, "decodeSizeForKey:", "NSMinSize");
        if (objj_msgSend(aCoder, "containsValueForKey:", "NSMaxSize"))
            self._maxSize = objj_msgSend(aCoder, "decodeSizeForKey:", "NSMaxSize");
        self._screenRect = objj_msgSend(aCoder, "decodeRectForKey:", "NSScreenRect");
        self._viewClass = objj_msgSend(aCoder, "decodeObjectForKey:", "NSViewClass");
        self._wtFlags = objj_msgSend(aCoder, "decodeIntForKey:", "NSWTFlags");
        self._windowAutorecalculatesKeyViewLoop = !!(self._wtFlags & NSAutorecalculatesKeyViewLoopWTFlag);
        self._windowClass = CP_NSMapClassName(objj_msgSend(aCoder, "decodeObjectForKey:", "NSWindowClass"));
        self._windowRect = objj_msgSend(aCoder, "decodeRectForKey:", "NSWindowRect");
        self._windowStyleMask = objj_msgSend(aCoder, "decodeIntForKey:", "NSWindowStyleMask");
        self._windowTitle = objj_msgSend(aCoder, "decodeObjectForKey:", "NSWindowTitle");
        self._windowView = objj_msgSend(aCoder, "decodeObjectForKey:", "NSWindowView");
        self._windowRect.origin.y = self._screenRect.size.height - self._windowRect.origin.y - self._windowRect.size.height;
        if (self._windowStyleMask === NSBorderlessWindowMask)
            self._windowStyleMask = CPBorderlessWindowMask;
        else
            self._windowStyleMask = (self._windowStyleMask & NSTitledWindowMask ? CPTitledWindowMask : 0) | (self._windowStyleMask & NSClosableWindowMask ? CPClosableWindowMask : 0) | (self._windowStyleMask & NSMiniaturizableWindowMask ? CPMiniaturizableWindowMask : 0) | (self._windowStyleMask & NSResizableWindowMask ? CPResizableWindowMask : 0) | (self._windowStyleMask & NSTexturedBackgroundWindowMask ? NSTexturedBackgroundWindowMask : 0) | (self._windowStyleMask & NSDocModalWindowMask ? CPDocModalWindowMask : 0) | (self._windowStyleMask & NSHUDBackgroundWindowMask ? CPHUDBackgroundWindowMask : 0);
        self._windowIsFullPlatformWindow = objj_msgSend(aCoder, "decodeObjectForKey:", "NSFrameAutosaveName") === "CPBorderlessBridgeWindowMask";
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCibWindowTemplate, "NSWindowTemplate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSWindowTemplate__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSWindowTemplate__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(_CPCibWindowTemplate, "class");
}
,["Class"])]);
}p;9;WebView.jt;1059;@STATIC;1.0;I;18;AppKit/CPWebView.jt;1017;objj_executeFile("AppKit/CPWebView.j", NO);{
var the_class = objj_getClass("CPWebView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPWebView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPWebView__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPWebView").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPWebView, "WebView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $WebView__initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSend(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $WebView__classForKeyedArchiver(self, _cmd)
{
    return objj_msgSend(CPWebView, "class");
}
,["Class"])]);
}e;