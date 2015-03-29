@STATIC;1.0;p;15;_NSCornerView.jt;2188;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jI;22;AppKit/_CPCornerView.jI;19;AppKit/CPScroller.jI;20;AppKit/CPTableView.jt;2062;objj_executeFile("AppKit/CPTableHeaderView.j", NO);objj_executeFile("AppKit/_CPCornerView.j", NO);objj_executeFile("AppKit/CPScroller.j", NO);objj_executeFile("AppKit/CPTableView.j", NO);{
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
        var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme")),
            height = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "default-row-height", CPTableView.isa.objj_msgSend0(CPTableView, "class"))),
            width = (theme == null ? null : theme.isa.objj_msgSend3(theme, "valueForAttributeWithName:inState:forClass:", "scroller-width", CPThemeState(CPThemeStateVertical, CPThemeStateScrollViewLegacy), CPScroller.isa.objj_msgSend0(CPScroller, "class")));
        self._frame.size.height = height;
        self._bounds.size.height = height;
        self._frame.size.width = width;
        self._bounds.size.width = width;
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSCornerView__classForKeyedArchiver(self, _cmd)
{
    return _CPCornerView.isa.objj_msgSend0(_CPCornerView, "class");
}
,["Class"])]);
}p;15;Converter+Mac.jt;6790;@STATIC;1.0;i;11;Converter.ji;24;Nib2CibKeyedUnarchiver.ji;8;NSFont.jt;6714;objj_executeFile("Converter.j", YES);objj_executeFile("Nib2CibKeyedUnarchiver.j", YES);objj_executeFile("NSFont.j", YES);{
var the_class = objj_getClass("Converter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"Converter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("convertedDataFromMacData:"), function $Converter__convertedDataFromMacData_(self, _cmd, data)
{
    var unarchiver = ((___r1 = Nib2CibKeyedUnarchiver.isa.objj_msgSend0(Nib2CibKeyedUnarchiver, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initForReadingWithData:", data));
    (unarchiver == null ? null : unarchiver.isa.objj_msgSend1(unarchiver, "setDelegate:", self));
    var objectData = (unarchiver == null ? null : unarchiver.isa.objj_msgSend1(unarchiver, "decodeObjectForKey:", "IB.objectdata")),
        objects = (unarchiver == null ? null : unarchiver.isa.objj_msgSend0(unarchiver, "allObjects")),
        count = (objects == null ? null : objects.isa.objj_msgSend0(objects, "count"));
    while (count--)
    {
        var object = objects[count];
        self.isa.objj_msgSend1(self, "replaceFontForObject:", object);
        if ((object == null ? null : object.isa.objj_msgSend1(object, "respondsToSelector:", sel_getUid("awakeFromNib"))))
            (object == null ? null : object.isa.objj_msgSend0(object, "awakeFromNib"));
    }
    var convertedData = CPData.isa.objj_msgSend0(CPData, "data"),
        archiver = ((___r1 = CPKeyedArchiver.isa.objj_msgSend0(CPKeyedArchiver, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initForWritingWithMutableData:", convertedData));
    (archiver == null ? null : archiver.isa.objj_msgSend2(archiver, "encodeObject:forKey:", objectData, "CPCibObjectDataKey"));
    (archiver == null ? null : archiver.isa.objj_msgSend0(archiver, "finishEncoding"));
    return convertedData;
    var ___r1;
}
,["void","CPData"]), new objj_method(sel_getUid("unarchiver:cannotDecodeObjectOfClassName:originalClasses:"), function $Converter__unarchiver_cannotDecodeObjectOfClassName_originalClasses_(self, _cmd, unarchiver, name, classNames)
{
    CPException.isa.objj_msgSend3(CPException, "raise:format:", CPInvalidUnarchiveOperationException, "%@ objects are not supported by nib2cib.", name);
}
,["Class","CPKeyedUnarchiver","CPString","CPArray"]), new objj_method(sel_getUid("replaceFontForObject:"), function $Converter__replaceFontForObject_(self, _cmd, object)
{
    if ((object == null ? null : object.isa.objj_msgSend1(object, "respondsToSelector:", sel_getUid("font"))) && (object == null ? null : object.isa.objj_msgSend1(object, "respondsToSelector:", sel_getUid("setFont:"))))
    {
        var nibFont = (object == null ? null : object.isa.objj_msgSend0(object, "font"));
        if (nibFont)
            self.isa.objj_msgSend2(self, "replaceFont:forObject:", nibFont, object);
    }
    else if ((object == null ? null : object.isa.objj_msgSend1(object, "isKindOfClass:", CPView.isa.objj_msgSend0(CPView, "class"))))
    {
        var subviews = (object == null ? null : object.isa.objj_msgSend0(object, "subviews")),
            count = (subviews == null ? null : subviews.isa.objj_msgSend0(subviews, "count"));
        if (count && ((___r1 = subviews[0]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "isKindOfClass:", CPRadio.isa.objj_msgSend0(CPRadio, "class"))))
        {
            while (count--)
            {
                var radio = subviews[count];
                self.isa.objj_msgSend2(self, "replaceFont:forObject:", (radio == null ? null : radio.isa.objj_msgSend0(radio, "font")), radio);
            }
        }
    }
    var ___r1;
}
,["void","id"]), new objj_method(sel_getUid("replaceFont:forObject:"), function $Converter__replaceFont_forObject_(self, _cmd, nibFont, object)
{
    var cibFont = nil;
    if ((object == null ? null : object.isa.objj_msgSend1(object, "respondsToSelector:", sel_getUid("cibFontForNibFont:"))))
        cibFont = (object == null ? null : object.isa.objj_msgSend1(object, "cibFontForNibFont:", (object == null ? null : object.isa.objj_msgSend0(object, "font"))));
    else
        cibFont = ((___r1 = (object == null ? null : object.isa.objj_msgSend0(object, "font"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "cibFontForNibFont"));
    if (!cibFont || !(cibFont == null ? null : cibFont.isa.objj_msgSend1(cibFont, "isEqual:", nibFont)))
    {
        var source = "";
        if (!cibFont)
        {
            var bold = (nibFont == null ? null : nibFont.isa.objj_msgSend0(nibFont, "isBold")),
                themes = ((___r1 = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "sharedNib2Cib"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "themes"));
            for (var i = 0; i < themes.length; ++i)
            {
                cibFont = ((___r1 = themes[i]), ___r1 == null ? null : ___r1.isa.objj_msgSend3(___r1, "valueForAttributeWithName:inState:forClass:", "font", (object == null ? null : object.isa.objj_msgSend0(object, "themeState")), (object == null ? null : object.isa.objj_msgSend0(object, "class"))));
                if (cibFont)
                {
                    source = " (from " + ((___r1 = themes[i]), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "name")) + ")";
                    break;
                }
            }
            if (!cibFont || (cibFont == null ? null : cibFont.isa.objj_msgSend0(cibFont, "isSystem")))
            {
                var size = (cibFont == null ? null : cibFont.isa.objj_msgSend0(cibFont, "size")) || CPFontDefaultSystemFontSize;
                bold = cibFont ? (cibFont == null ? null : cibFont.isa.objj_msgSend0(cibFont, "isBold")) : bold;
                if (size === CPFontDefaultSystemFontSize)
                    size = CPFontCurrentSystemSize;
                cibFont = bold ? CPFont.isa.objj_msgSend1(CPFont, "boldSystemFontOfSize:", size) : CPFont.isa.objj_msgSend1(CPFont, "systemFontOfSize:", size);
            }
        }
        var replacement = "System " + (bold ? "bold " : "") + ((cibFont == null ? null : cibFont.isa.objj_msgSend0(cibFont, "isSystemSize")) ? "(current size)" : (cibFont == null ? null : cibFont.isa.objj_msgSend0(cibFont, "size")));
        (object == null ? null : object.isa.objj_msgSend1(object, "setFont:", cibFont));
        CPLog.debug("%s: substituted <%s>%s for <%s>", (object == null ? null : object.isa.objj_msgSend0(object, "className")), replacement || NSFont.isa.objj_msgSend1(NSFont, "descriptorForFont:", cibFont), source, NSFont.isa.objj_msgSend1(NSFont, "descriptorForFont:", nibFont));
    }
    var ___r1;
}
,["void","CPFont","id"])]);
}p;11;Converter.jt;6000;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;19;Foundation/CPData.jI;24;Foundation/CPException.jI;21;Foundation/CPString.jI;19;BlendKit/BlendKit.ji;14;NSFoundation.ji;10;NSAppKit.jt;5793;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("Foundation/CPData.j", NO);objj_executeFile("Foundation/CPException.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("BlendKit/BlendKit.j", NO);objj_executeFile("NSFoundation.j", YES);objj_executeFile("NSAppKit.j", YES);var FILE = require("file"),
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
    var nibData = self.isa.objj_msgSend1(self, "CPCompliantNibDataAtFilePath:", self.inputPath);
    if (inferredFormat === NibFormatMac)
        var convertedData = self.isa.objj_msgSend1(self, "convertedDataFromMacData:", nibData);
    else
        CPException.isa.objj_msgSend2(CPException, "raise:reason:", ConverterConversionException, "nib2cib does not understand this nib format.");
    if (((___r1 = self.outputPath), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "length")))
        FILE.write(self.outputPath, (convertedData == null ? null : convertedData.isa.objj_msgSend0(convertedData, "rawString")), {charset: "UTF-8"});
    CPLog.info("Conversion successful");
    return convertedData;
    var ___r1;
}
,["CPData"]), new objj_method(sel_getUid("CPCompliantNibDataAtFilePath:"), function $Converter__CPCompliantNibDataAtFilePath_(self, _cmd, aFilePath)
{
    var temporaryNibFilePath = "",
        temporaryPlistFilePath = "";
    try    {
        if (((___r1 = self.outputPath), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "length")))
        {
            temporaryNibFilePath = FILE.join("/tmp", FILE.basename(aFilePath) + ".tmp.nib");
            if ((OS.popen(["/usr/bin/ibtool", aFilePath, "--compile", temporaryNibFilePath])).wait() === 1)
                CPException.isa.objj_msgSend2(CPException, "raise:reason:", ConverterConversionException, "Could not compile file: " + aFilePath);
        }
        else
        {
            temporaryNibFilePath = aFilePath;
        }
        var temporaryPlistFilePath = FILE.join("/tmp", FILE.basename(aFilePath) + ".tmp.plist");
        if ((OS.popen(["/usr/bin/plutil", "-convert", "xml1", temporaryNibFilePath, "-o", temporaryPlistFilePath])).wait() === 1)
            CPException.isa.objj_msgSend2(CPException, "raise:reason:", ConverterConversionException, "Could not convert to xml plist for file: " + aFilePath);
        if (!FILE.isReadable(temporaryPlistFilePath))
            CPException.isa.objj_msgSend2(CPException, "raise:reason:", ConverterConversionException, "Unable to convert nib file.");
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
    return CPData.isa.objj_msgSend1(CPData, "dataWithRawString:", plistContents);
    var ___r1;
}
,["CPData","CPString"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("sharedConverter"), function $Converter__sharedConverter(self, _cmd)
{
    return SharedConverter;
}
,["Converter"])]);
}p;6;main.jt;1037;@STATIC;1.0;i;9;Nib2Cib.jt;1005;objj_executeFile("Nib2Cib.j", YES);var OS = require("os"),
    stream = (require("narwhal/term")).stream;
main = function(args)
{
    checkUlimit();
    var nib2cib = ((___r1 = Nib2Cib.isa.objj_msgSend0(Nib2Cib, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithArgs:", args));
    (nib2cib == null ? null : nib2cib.isa.objj_msgSend0(nib2cib, "run"));
    var ___r1;
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
p;9;Nib2Cib.jt;34867;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;25;Foundation/CPDictionary.jI;21;Foundation/CPString.jI;22;AppKit/CPApplication.jI;19;BlendKit/BlendKit.ji;24;Nib2CibKeyedUnarchiver.ji;11;Converter.ji;15;Converter+Mac.jt;34624;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("Foundation/CPDictionary.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("AppKit/CPApplication.j", NO);objj_executeFile("BlendKit/BlendKit.j", NO);objj_executeFile("Nib2CibKeyedUnarchiver.j", YES);objj_executeFile("Converter.j", YES);objj_executeFile("Converter+Mac.j", YES);Nib2CibColorizeOutput = YES;
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
        self.frameworks = CPDictionary.isa.objj_msgSend0(CPDictionary, "dictionary");
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
        self.commandLineOptions = self.isa.objj_msgSend1(self, "parseOptionsFromArgs:", self.commandLineArgs);
        Nib2CibColorizeOutput = !self.commandLineOptions.noColors;
        self.isa.objj_msgSend1(self, "setLogLevel:", self.commandLineOptions.quiet ? -1 : self.commandLineOptions.verbosity);
        self.isa.objj_msgSend0(self, "checkPrerequisites");
        if (self.commandLineOptions.watch)
            self.isa.objj_msgSend1(self, "watchWithOptions:", self.commandLineOptions);
        else
        {
            var success = self.isa.objj_msgSend2(self, "convertWithOptions:inputPath:", self.commandLineOptions, nil);
            if (!success)
                OS.exit(1);
        }
    }
    catch(anException)     {
        self.isa.objj_msgSend1(self, "logError:", self.isa.objj_msgSend1(self, "exceptionReason:", anException));
        OS.exit(1);
    }}
,["void"]), new objj_method(sel_getUid("checkPrerequisites"), function $Nib2Cib__checkPrerequisites(self, _cmd)
{
    var fontinfo = (require("cappuccino/fontinfo")).fontinfo,
        info = fontinfo("LucidaGrande", 13);
    if (!info)
        self.isa.objj_msgSend1(self, "failWithMessage:", "fontinfo does not appear to be installed");
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
                if (framework !== "Debug" && !((___r1 = self.frameworks), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "containsKey:", framework)))
                {
                    var resourceDirectory = FILE.join(directory, framework, "Resources");
                    if (FILE.isDirectory(resourceDirectory))
                        resourceDirectory = FILE.canonical(resourceDirectory);
                    else
                        resourceDirectory = "";
                    ((___r1 = self.frameworks), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setValue:forKey:", {resourceDirectory: resourceDirectory, loaded: false}, framework));
                }
                var ___r1;
            });
        }
    });
}
,["void"]), new objj_method(sel_getUid("convertWithOptions:inputPath:"), function $Nib2Cib__convertWithOptions_inputPath_(self, _cmd, options, inputPath)
{
    try    {
        inputPath = inputPath || self.isa.objj_msgSend1(self, "getInputPath:", options.args);
        self.isa.objj_msgSend2(self, "getAppAndResourceDirectoriesFromInputPath:options:", inputPath, options);
        self.isa.objj_msgSend0(self, "enumerateFrameworks");
        if (options.readStoredOptions)
        {
            options = self.isa.objj_msgSend2(self, "mergeOptionsWithStoredOptions:inputPath:", options, inputPath);
            self.isa.objj_msgSend1(self, "setLogLevel:", options.quiet ? -1 : options.verbosity);
        }
        if (!options.quiet && options.verbosity > 0)
            self.isa.objj_msgSend0(self, "printVersion");
        var configInfo = self.isa.objj_msgSend2(self, "readConfigFile:inputPath:", options.configFile || "", inputPath),
            outputPath = self.isa.objj_msgSend2(self, "getOutputPathFromInputPath:args:", inputPath, options.args);
        self.infoPlist = configInfo.plist;
        if (self.infoPlist)
        {
            var systemFontFace = ((___r1 = self.infoPlist), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", "CPSystemFontFace"));
            if (systemFontFace)
                CPFont.isa.objj_msgSend1(CPFont, "setSystemFontFace:", systemFontFace);
            var systemFontSize = ((___r1 = self.infoPlist), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", "CPSystemFontSize"));
            if (systemFontSize)
                CPFont.isa.objj_msgSend1(CPFont, "setSystemFontSize:", parseFloat(systemFontSize, 10));
        }
        else
            self.infoPlist = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        var themeList = self.isa.objj_msgSend1(self, "getThemeList:", options);
        self.isa.objj_msgSend1(self, "loadThemesFromList:", themeList);
        self.isa.objj_msgSend2(self, "loadFrameworks:verbosity:", options.frameworks, options.verbosity);
        self.isa.objj_msgSend1(self, "loadNSClassesFromBundle:", CPBundle.isa.objj_msgSend0(CPBundle, "mainBundle"));
        var frameworkList = [];
        ((___r1 = self.frameworks), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "allKeys")).forEach(function(name)
        {
            var info = ((___r1 = self.frameworks), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", name));
            if (info.resourceDirectory)
                name += "*";
            if (info.loaded)
                name += "+";
            frameworkList.push(name);
            var ___r1;
        });
        CPLog.info("\n-------------------------------------------------------------");
        CPLog.info("Input         : " + inputPath);
        CPLog.info("Output        : " + outputPath);
        CPLog.info("Application   : " + self.appDirectory);
        CPLog.info("Frameworks    : " + (frameworkList.join(", ") || ""));
        CPLog.info("Default theme : " + themeList[0]);
        CPLog.info("Aux themes    : " + (themeList.slice(1)).join(", "));
        CPLog.info("Config file   : " + (configInfo.path || ""));
        CPLog.info("System Font   : " + CPFont.isa.objj_msgSend0(CPFont, "systemFontSize") + "px " + CPFont.isa.objj_msgSend0(CPFont, "systemFontFace"));
        CPLog.info("-------------------------------------------------------------\n");
        var converter = ((___r1 = Converter.isa.objj_msgSend0(Converter, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithInputPath:outputPath:", inputPath, outputPath));
        (converter == null ? null : converter.isa.objj_msgSend0(converter, "convert"));
        return YES;
    }
    catch(anException)     {
        self.isa.objj_msgSend1(self, "logError:", self.isa.objj_msgSend1(self, "exceptionReason:", anException));
        return NO;
    }    var ___r1;
}
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
        self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot find the directory: " + watchDir);
    self.isa.objj_msgSend1(self, "setLogLevel:", 1);
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
        var modifiedNibs = self.isa.objj_msgSend1(self, "getModifiedNibsInDirectory:", watchDir);
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
            self.isa.objj_msgSend1(self, "setLogLevel:", verbosity);
            var success = self.isa.objj_msgSend2(self, "convertWithOptions:inputPath:", options, nib);
            self.isa.objj_msgSend1(self, "setLogLevel:", 1);
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
        self.isa.objj_msgSend0(self, "printVersionAndExit");
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
    var userOptions = self.isa.objj_msgSend1(self, "readStoredOptionsAtPath:", FILE.join(SYS.env["HOME"], ".nib2cibconfig")),
        appOptions = self.isa.objj_msgSend1(self, "readStoredOptionsAtPath:", FILE.join(self.appDirectory, "nib2cib.conf")),
        filename = FILE.basename(inputPath, FILE.extension(inputPath)) + ".conf",
        fileOptions = self.isa.objj_msgSend1(self, "readStoredOptionsAtPath:", FILE.join(FILE.dirname(inputPath), filename));
    userOptions = self.isa.objj_msgSend1(self, "parseOptionsFromArgs:", [options.command].concat(userOptions));
    appOptions = self.isa.objj_msgSend1(self, "parseOptionsFromArgs:", [options.command].concat(appOptions));
    fileOptions = self.isa.objj_msgSend1(self, "parseOptionsFromArgs:", [options.command].concat(fileOptions));
    var mergedOptions = userOptions;
    self.isa.objj_msgSend2(self, "mergeOptions:with:", appOptions, mergedOptions);
    self.isa.objj_msgSend2(self, "mergeOptions:with:", fileOptions, mergedOptions);
    self.isa.objj_msgSend2(self, "mergeOptions:with:", options, mergedOptions);
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
        if (path = self.isa.objj_msgSend2(self, "findInputPath:extension:", inputPath, ".xib"))
            inputPath = path;
        else if (path = self.isa.objj_msgSend2(self, "findInputPath:extension:", inputPath, ".nib"))
            inputPath = path;
        else
            self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot find the input file (.xib or .nib): " + FILE.canonical(inputPath));
    }
    else if (path = self.isa.objj_msgSend2(self, "findInputPath:extension:", inputPath, nil))
        inputPath = path;
    else
        self.isa.objj_msgSend1(self, "failWithMessage:", "Could not read the input file: " + FILE.canonical(inputPath));
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
        self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot write the output file at: " + outputPath);
    return outputPath;
}
,["CPString","CPString","CPArray"]), new objj_method(sel_getUid("loadFrameworks:verbosity:"), function $Nib2Cib__loadFrameworks_verbosity_(self, _cmd, frameworksToLoad, verbosity)
{
    if (!frameworksToLoad || frameworksToLoad.length === 0)
        return;
    frameworksToLoad.forEach(function(aFramework)
    {
        self.isa.objj_msgSend1(self, "setLogLevel:", verbosity);
        var frameworkPath = nil;
        if (aFramework.indexOf("/") === -1)
        {
            frameworkPath = self.isa.objj_msgSend(self, "findInFrameworks:path:isDirectory:callback:", FILE.join(self.appDirectory, "Frameworks"), aFramework, YES, function(path)
            {
                return path;
            });
        }
        else
            self.isa.objj_msgSend1(self, "failWithMessage:", "-F should be used only with a framework name that is in the app's Framework directory");
        if (!frameworkPath)
            self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot find the framework \"" + aFramework + "\"");
        CPLog.debug("Loading framework: " + frameworkPath);
        try        {
            self.isa.objj_msgSend1(self, "setLogLevel:", -1);
            var frameworkBundle = ((___r1 = CPBundle.isa.objj_msgSend0(CPBundle, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithPath:", frameworkPath));
            (frameworkBundle == null ? null : frameworkBundle.isa.objj_msgSend1(frameworkBundle, "loadWithDelegate:", nil));
            self.isa.objj_msgSend1(self, "setLogLevel:", verbosity);
            self.isa.objj_msgSend1(self, "loadNSClassesFromBundle:", frameworkBundle);
            var frameworkName = FILE.basename(frameworkPath),
                info = ((___r1 = self.frameworks), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", frameworkName));
            info.loaded = true;
        }
        finally         {
            self.isa.objj_msgSend1(self, "setLogLevel:", verbosity);
        }
        (require("browser/timeout")).serviceTimeouts();
        var ___r1;
    });
}
,["void","CPArray","int"]), new objj_method(sel_getUid("loadNSClassesFromBundle:"), function $Nib2Cib__loadNSClassesFromBundle_(self, _cmd, aBundle)
{
    var nsClasses = (aBundle == null ? null : aBundle.isa.objj_msgSend1(aBundle, "objectForInfoDictionaryKey:", "NSClasses")) || [],
        bundlePath = (aBundle == null ? null : aBundle.isa.objj_msgSend0(aBundle, "bundlePath"));
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
        defaultTheme = ((___r1 = self.infoPlist), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", "CPDefaultTheme"));
    if (!defaultTheme)
        defaultTheme = self.isa.objj_msgSend0(self, "getAppKitDefaultThemeName");
    var themeList = CPSet.isa.objj_msgSend1(CPSet, "setWithObject:", defaultTheme);
    if (options.auxThemes)
        (themeList == null ? null : themeList.isa.objj_msgSend1(themeList, "addObjectsFromArray:", options.auxThemes));
    var auxThemes = self.infoPlist.valueForKey("CPAuxiliaryThemes");
    if (auxThemes)
        (themeList == null ? null : themeList.isa.objj_msgSend1(themeList, "addObjectsFromArray:", auxThemes));
    (themeList == null ? null : themeList.isa.objj_msgSend1(themeList, "removeObject:", defaultTheme));
    var allThemes = (themeList == null ? null : themeList.isa.objj_msgSend0(themeList, "allObjects"));
    (allThemes == null ? null : allThemes.isa.objj_msgSend2(allThemes, "insertObject:atIndex:", defaultTheme, 0));
    return allThemes;
    var ___r1;
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
    return self.isa.objj_msgSend(self, "findInFrameworks:path:isDirectory:callback:", FILE.canonical(FILE.join(SYS.prefix, "packages/cappuccino/Frameworks")), path, isDirectory, callback);
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
        return self.isa.objj_msgSend1(self, "themeNameFromPropertyList:", path);
    },
        themeName = self.isa.objj_msgSend3(self, "findInCappBuild:isDirectory:callback:", "AppKit/Info.plist", NO, callback);
    if (!themeName)
        themeName = self.isa.objj_msgSend3(self, "findInInstalledFrameworks:isDirectory:callback:", "AppKit/Info.plist", NO, callback);
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
        self.themes.push(self.isa.objj_msgSend1(self, "loadThemeNamed:", themeList[i]));
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
        themePath = self.isa.objj_msgSend3(self, "findInCappBuild:isDirectory:callback:", blendName, YES, returnPath);
        if (!themePath)
            themePath = self.isa.objj_msgSend3(self, "findInInstalledFrameworks:isDirectory:callback:", "AppKit/Resources/" + blendName, YES, returnPath);
        if (!themePath)
        {
            var path = FILE.canonical(blendName);
            if (FILE.isDirectory(path))
                themePath = path;
        }
    }
    if (!themePath)
        self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot find the theme \"" + themeName + "\"");
    return self.isa.objj_msgSend2(self, "readThemeWithName:atPath:", themeName, themePath);
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
        self.isa.objj_msgSend1(self, "failWithMessage:", "Could not find the keyed themes in the theme: " + path);
    var index = keyedThemes.indexOf(name + ".keyedtheme");
    if (index < 0)
        self.isa.objj_msgSend1(self, "failWithMessage:", "Could not find the main theme data (" + name + ".keyedtheme" + ") in the theme: " + path);
    var resourcePath = themeBundle.pathForResource(keyedThemes[index]),
        themeData = new CFMutableData();
    themeData.setRawString((StaticResource.resourceAtURL(new CFURL(resourcePath), true)).contents());
    var theme = CPKeyedUnarchiver.isa.objj_msgSend1(CPKeyedUnarchiver, "unarchiveObjectWithData:", themeData);
    if (!theme)
        self.isa.objj_msgSend1(self, "failWithMessage:", "Could not unarchive the theme at: " + path);
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
            self.isa.objj_msgSend1(self, "failWithMessage:", "Cannot find the config file: " + path);
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
            self.isa.objj_msgSend1(self, "failWithMessage:", "Could not read the Info.plist at: " + configPath);
        plist = CFPropertyList.propertyListFromString(plist);
        if (!plist)
            self.isa.objj_msgSend1(self, "failWithMessage:", "Could not parse the Info.plist at: " + configPath);
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
    self.isa.objj_msgSend0(self, "printVersion");
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
    else if (exception.isa && (exception == null ? null : exception.isa.objj_msgSend1(exception, "respondsToSelector:", sel_getUid("reason"))))
        return (exception == null ? null : exception.isa.objj_msgSend0(exception, "reason"));
    else
        return "An unknown error occurred";
}
,["CPString","JSObject"]), new objj_method(sel_getUid("failWithMessage:"), function $Nib2Cib__failWithMessage_(self, _cmd, message)
{
    CPException.isa.objj_msgSend2(CPException, "raise:reason:", ConverterConversionException, message);
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
    return (SharedNib2Cib == null ? null : SharedNib2Cib.isa.objj_msgSend0(SharedNib2Cib, "themes"))[0];
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
p;24;Nib2CibKeyedUnarchiver.jt;3825;@STATIC;1.0;I;30;Foundation/CPKeyedUnarchiver.ji;18;Nib2CibException.jt;3748;objj_executeFile("Foundation/CPKeyedUnarchiver.j", NO);objj_executeFile("Nib2CibException.j", YES);var FILE = require("file");
{var the_class = objj_allocateClassPair(CPKeyedUnarchiver, "Nib2CibKeyedUnarchiver"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("allObjects"), function $Nib2CibKeyedUnarchiver__allObjects(self, _cmd)
{
    return self._objects;
}
,["CPArray"]), new objj_method(sel_getUid("resourceInfoForName:inFramework:"), function $Nib2CibKeyedUnarchiver__resourceInfoForName_inFramework_(self, _cmd, aName, framework)
{
    var nib2cib = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "sharedNib2Cib")),
        frameworks = (nib2cib == null ? null : nib2cib.isa.objj_msgSend0(nib2cib, "frameworks"));
    if (framework)
    {
        var info = (frameworks == null ? null : frameworks.isa.objj_msgSend1(frameworks, "valueForKey:", framework));
        if (!info)
            CPException.isa.objj_msgSend(CPException, "raise:format:", Nib2CibException, "The framework “%@” specified by the image “%@@%@” cannot be found.", framework, aName, framework);
        else if (!info.resourceDirectory)
            CPException.isa.objj_msgSend(CPException, "raise:format:", Nib2CibException, "The framework “%@” specified by the image “%@@%@” has no Resources directory.", framework, aName, framework);
        var path = self.isa.objj_msgSend2(self, "_resourcePathForName:inDirectory:", aName, info.resourceDirectory);
        if (path)
            return {path: path, framework: framework};
    }
    else
    {
        var resourcesDirectory = (nib2cib == null ? null : nib2cib.isa.objj_msgSend0(nib2cib, "appResourceDirectory")),
            path = self.isa.objj_msgSend2(self, "_resourcePathForName:inDirectory:", aName, resourcesDirectory);
        if (path)
            return {path: path, framework: framework};
        var enumerator = (frameworks == null ? null : frameworks.isa.objj_msgSend0(frameworks, "keyEnumerator"));
        while (framework = (enumerator == null ? null : enumerator.isa.objj_msgSend0(enumerator, "nextObject")))
        {
            var info = (frameworks == null ? null : frameworks.isa.objj_msgSend1(frameworks, "valueForKey:", framework));
            if (!info || !info.resourceDirectory)
                continue;
            path = self.isa.objj_msgSend2(self, "_resourcePathForName:inDirectory:", aName, info.resourceDirectory);
            if (path)
                return {path: path, framework: framework};
        }
    }
    CPException.isa.objj_msgSend3(CPException, "raise:format:", Nib2CibException, "The image “%@” cannot be found.", aName);
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
p;9;NSArray.jt;609;@STATIC;1.0;I;21;Foundation/CPObject.jt;565;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSArray"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSArray__initWithCoder_(self, _cmd, aCoder)
{
    return (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.objects"));
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSArray, "NSMutableArray"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;19;NSArrayController.jt;2309;@STATIC;1.0;I;26;AppKit/CPArrayController.jt;2259;objj_executeFile("AppKit/CPArrayController.j", NO);{
var the_class = objj_getClass("CPArrayController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPArrayController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPArrayController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPArrayController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._avoidsEmptySelection = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAvoidsEmptySelection"));
        self._clearsFilterPredicateOnInsertion = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSClearsFilterPredicateOnInsertion"));
        self._filterRestrictsInsertion = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSFilterRestrictsInsertion"));
        self._preservesSelection = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSPreservesSelection"));
        self._selectsInsertedObjects = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSelectsInsertedObjects"));
        self._alwaysUsesMultipleValuesMarker = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAlwaysUsesMultipleValuesMarker"));
        self._automaticallyRearrangesObjects = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAutomaticallyRearrangesObjects"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPArrayController, "NSArrayController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSArrayController__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSArrayController__classForKeyedArchiver(self, _cmd)
{
    return CPArrayController.isa.objj_msgSend0(CPArrayController, "class");
}
,["Class"])]);
}p;20;NSAttributedString.jt;830;@STATIC;1.0;I;21;Foundation/CPObject.jI;31;Foundation/CPAttributedString.jt;750;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPAttributedString.j", NO);{var the_class = objj_allocateClassPair(CPAttributedString, "NSAttributedString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSAttributedString__initWithCoder_(self, _cmd, aCoder)
{
    return ((___r1 = CPAttributedString.isa.objj_msgSend0(CPAttributedString, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithString:", ""));
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSAttributedString, "NSMutableAttributedString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;7;NSBox.jt;3497;@STATIC;1.0;I;14;AppKit/CPBox.jt;3459;objj_executeFile("AppKit/CPBox.j", NO);{
var the_class = objj_getClass("CPBox")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPBox\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPBox__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPBox").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._boxType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSBoxType"));
        self._borderType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSBorderType"));
        var borderColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBorderColor2")),
            fillColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFillColor2")),
            cornerRadius = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSCornerRadius2")),
            borderWidth = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSBorderWidth2")),
            contentMargin = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSOffsets"));
        var frame = (self == null ? null : self.isa.objj_msgSend0(self, "frame"));
        if (self._boxType !== CPBoxSeparator && (self._boxType === CPBoxPrimary || self._boxType === CPBoxSecondary))
        {
            frame.origin.y += 4;
            frame.origin.x += 4;
            frame.size.width -= 8;
            frame.size.height -= 6;
        }
        (self == null ? null : self.isa.objj_msgSend1(self, "setFrame:", frame));
        if (self._boxType !== CPBoxPrimary && self._boxType !== CPBoxSecondary)
        {
            if (borderColor)
                (self == null ? null : self.isa.objj_msgSend1(self, "setBorderColor:", borderColor));
            if (fillColor)
                (self == null ? null : self.isa.objj_msgSend1(self, "setFillColor:", fillColor));
            (self == null ? null : self.isa.objj_msgSend1(self, "setCornerRadius:", cornerRadius));
            (self == null ? null : self.isa.objj_msgSend1(self, "setBorderWidth:", borderWidth));
            (self == null ? null : self.isa.objj_msgSend1(self, "setContentViewMargins:", contentMargin));
        }
        self._title = ((___r1 = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTitleCell"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "objectValue")) || "";
        self._titlePosition = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTitlePosition"));
        if (self._titlePosition === undefined)
            self._titlePosition = CPAtTop;
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPBox, "NSBox"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSBox__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSBox__classForKeyedArchiver(self, _cmd)
{
    return CPBox.isa.objj_msgSend0(CPBox, "class");
}
,["Class"])]);
}p;11;NSBrowser.jt;2870;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;AppKit/CPBrowser.jI;20;AppKit/CPTextField.jI;16;AppKit/CPColor.jt;2756;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPBrowser.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("AppKit/CPColor.j", NO);{
var the_class = objj_getClass("CPBrowser")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPBrowser\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPBrowser__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPBrowser").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSBrFlags"));
        self._columnWidths = [];
        self._allowsEmptySelection = flags & 0x10000000 ? YES : NO;
        self._allowsMultipleSelection = flags & 0x08000000 ? YES : NO;
        self._minColumnWidth = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSMinColumnWidth"));
        self._rowHeight = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSBrowserRowHeight"));
        self._prototypeView = ((___r1 = CPTextField.isa.objj_msgSend0(CPTextField, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMakeZero()));
        ((___r1 = self._prototypeView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setVerticalAlignment:", CPCenterVerticalTextAlignment));
        ((___r1 = self._prototypeView), ___r1 == null ? null : ___r1.isa.objj_msgSend3(___r1, "setValue:forThemeAttribute:inState:", CPColor.isa.objj_msgSend0(CPColor, "whiteColor"), "text-color", CPThemeStateSelectedDataView));
        ((___r1 = self._prototypeView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setLineBreakMode:", CPLineBreakByTruncatingTail));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPBrowser, "NSBrowser"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSBrowser__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSBrowser__classForKeyedArchiver(self, _cmd)
{
    return CPBrowser.isa.objj_msgSend0(CPBrowser, "class");
}
,["Class"])]);
}p;10;NSButton.jt;19878;@STATIC;1.0;I;17;AppKit/CPButton.jI;19;AppKit/CPCheckBox.jI;22;AppKit/CPPopUpButton.jI;16;AppKit/CPRadio.ji;8;NSCell.ji;11;NSControl.jt;19736;objj_executeFile("AppKit/CPButton.j", NO);objj_executeFile("AppKit/CPCheckBox.j", NO);objj_executeFile("AppKit/CPPopUpButton.j", NO);objj_executeFile("AppKit/CPRadio.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);var NSButtonIsBorderedMask = 0x00800000,
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
    var alternateImage = (cell == null ? null : cell.isa.objj_msgSend0(cell, "alternateImage"));
    if ((alternateImage == null ? null : alternateImage.isa.objj_msgSend1(alternateImage, "isKindOfClass:", (NSButtonImageSource == null ? null : NSButtonImageSource.isa.objj_msgSend0(NSButtonImageSource, "class")))))
    {
        if ((alternateImage == null ? null : alternateImage.isa.objj_msgSend0(alternateImage, "imageName")) === "NSSwitch")
        {
            self.isa = CPCheckBox.isa.objj_msgSend0(CPCheckBox, "class");
        }
        else if ((alternateImage == null ? null : alternateImage.isa.objj_msgSend0(alternateImage, "imageName")) === "NSRadioButton")
        {
            self.isa = CPRadio.isa.objj_msgSend0(CPRadio, "class");
            self._radioGroup = CPRadioGroup.isa.objj_msgSend0(CPRadioGroup, "new");
        }
        self._themeClass = ((___r1 = self.isa.objj_msgSend0(self, "class")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "defaultThemeClass"));
        alternateImage = nil;
    }
    NIB_CONNECTION_EQUIVALENCY_TABLE[(cell == null ? null : cell.isa.objj_msgSend0(cell, "UID"))] = self;
    self._title = (cell == null ? null : cell.isa.objj_msgSend0(cell, "title"));
    self._alternateTitle = (cell == null ? null : cell.isa.objj_msgSend0(cell, "alternateTitle"));
    self.isa.objj_msgSend1(self, "setBordered:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isBordered")));
    self._bezelStyle = (cell == null ? null : cell.isa.objj_msgSend0(cell, "bezelStyle"));
    var fixedHeight;
    switch(self._bezelStyle) {
    case CPRoundedBezelStyle:
    case CPTexturedRoundedBezelStyle:
    case CPHUDBezelStyle:
    case CPRoundRectBezelStyle:
    case CPRecessedBezelStyle:
        fixedHeight = YES;
        break;
    case CPSmallSquareBezelStyle:
    case CPThickSquareBezelStyle:
    case CPThickerSquareBezelStyle:
    case CPRegularSquareBezelStyle:
    case CPTexturedSquareBezelStyle:
    case CPShadowlessSquareBezelStyle:
        fixedHeight = NO;
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
    if ((cell == null ? null : cell.isa.objj_msgSend0(cell, "isBordered")) || self.isa.objj_msgSend1(self, "isKindOfClass:", CPRadio.isa.objj_msgSend0(CPRadio, "class")) || self.isa.objj_msgSend1(self, "isKindOfClass:", CPCheckBox.isa.objj_msgSend0(CPCheckBox, "class")))
    {
        var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme")),
            minSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "min-size", self.isa.objj_msgSend0(self, "class"))),
            maxSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "max-size", self.isa.objj_msgSend0(self, "class"))),
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
    }
    self._keyEquivalent = (cell == null ? null : cell.isa.objj_msgSend0(cell, "keyEquivalent"));
    self._keyEquivalentModifierMask = (cell == null ? null : cell.isa.objj_msgSend0(cell, "keyEquivalentModifierMask"));
    self._imageDimsWhenDisabled = YES;
    self._allowsMixedState = (cell == null ? null : cell.isa.objj_msgSend0(cell, "allowsMixedState"));
    self.isa.objj_msgSend1(self, "setImage:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "normalImage")));
    self.isa.objj_msgSend1(self, "setAlternateImage:", alternateImage);
    self.isa.objj_msgSend1(self, "setImagePosition:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "imagePosition")));
    self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled")));
    self._highlightsBy = (cell == null ? null : cell.isa.objj_msgSend0(cell, "highlightsBy"));
    self._showsStateBy = (cell == null ? null : cell.isa.objj_msgSend0(cell, "showsStateBy"));
    var ___r1;
}
,["void","NSCell"]), new objj_method(sel_getUid("_nib2CibAdjustment"), function $CPButton___nib2CibAdjustment(self, _cmd)
{
    var frameAdjustment = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPButton").super_class }, "_nib2CibAdjustment"),
        positionOffsetSizeWidth = 0,
        positionOffsetOriginX = 0,
        positionOffsetOriginY = 0;
    if (!self.isa.objj_msgSend0(self, "isBordered") || self.isa.objj_msgSend1(self, "isKindOfClass:", CPPopUpButton.isa.objj_msgSend0(CPPopUpButton, "class")))
        return frameAdjustment;
    switch(self._bezelStyle) {
    case CPRoundedBezelStyle:
        switch(self.isa.objj_msgSend0(self, "controlSize")) {
        case CPMiniControlSize:
            positionOffsetOriginX = 1;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = -2;
            break;
        case CPSmallControlSize:
            positionOffsetOriginX = 8;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = -10;
            break;
default:
        case CPRegularControlSize:
            positionOffsetOriginX = 4;
            positionOffsetOriginY = -6;
            positionOffsetSizeWidth = -12;
            break;
        }
        break;
    case CPTexturedRoundedBezelStyle:
        switch(self.isa.objj_msgSend0(self, "controlSize")) {
        case CPMiniControlSize:
            positionOffsetOriginX = 0;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = 0;
            break;
        case CPSmallControlSize:
            positionOffsetOriginX = 3;
            positionOffsetOriginY = 0;
            positionOffsetSizeWidth = 0;
            break;
default:
        case CPRegularControlSize:
            positionOffsetOriginX = -2;
            positionOffsetOriginY = -2;
            positionOffsetSizeWidth = 0;
            break;
        }
        break;
    case CPRoundRectBezelStyle:
        switch(self.isa.objj_msgSend0(self, "controlSize")) {
        case CPMiniControlSize:
            positionOffsetOriginX = 0;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = 0;
            break;
        case CPSmallControlSize:
            positionOffsetOriginX = 3;
            positionOffsetOriginY = 2;
            positionOffsetSizeWidth = 0;
            break;
default:
        case CPRegularControlSize:
            positionOffsetOriginX = -2;
            positionOffsetOriginY = 3;
            positionOffsetSizeWidth = 0;
            break;
        }
        self._bezelStyle = CPRoundedBezelStyle;
        break;
    case CPSmallSquareBezelStyle:
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        break;
    case CPThickSquareBezelStyle:
    case CPThickerSquareBezelStyle:
    case CPRegularSquareBezelStyle:
        positionOffsetOriginY = -3;
        positionOffsetOriginX = 0;
        positionOffsetSizeWidth = -4;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        break;
    case CPTexturedSquareBezelStyle:
        switch(self.isa.objj_msgSend0(self, "controlSize")) {
        case CPMiniControlSize:
            positionOffsetOriginX = 0;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = 0;
            break;
        case CPSmallControlSize:
            positionOffsetOriginX = 3;
            positionOffsetOriginY = 0;
            positionOffsetSizeWidth = 0;
            break;
default:
        case CPRegularControlSize:
            positionOffsetOriginX = -1;
            positionOffsetOriginY = -4;
            positionOffsetSizeWidth = -2;
            break;
        }
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        break;
    case CPShadowlessSquareBezelStyle:
        positionOffsetOriginY = -5;
        positionOffsetOriginX = -2;
        positionOffsetSizeWidth = 0;
        self._bezelStyle = CPTexturedRoundedBezelStyle;
        break;
    case CPRecessedBezelStyle:
        switch(self.isa.objj_msgSend0(self, "controlSize")) {
        case CPMiniControlSize:
            positionOffsetOriginX = 0;
            positionOffsetOriginY = -5;
            positionOffsetSizeWidth = 0;
            break;
        case CPSmallControlSize:
            positionOffsetOriginX = 3;
            positionOffsetOriginY = 2;
            positionOffsetSizeWidth = 0;
            break;
default:
        case CPRegularControlSize:
            positionOffsetOriginX = -2;
            positionOffsetOriginY = 3;
            positionOffsetSizeWidth = 0;
            break;
        }
        self._bezelStyle = CPHUDBezelStyle;
        break;
    }
    return CGRectMake(frameAdjustment.origin.x + positionOffsetOriginX, frameAdjustment.origin.y + positionOffsetOriginY, frameAdjustment.size.width + positionOffsetSizeWidth, frameAdjustment.size.height);
}
,["CGRect"])]);
}{var the_class = objj_allocateClassPair(CPButton, "NSButton"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSButton__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSButton__classForKeyedArchiver(self, _cmd)
{
    return CPButton.isa.objj_msgSend0(CPButton, "class");
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
        var buttonFlags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSButtonFlags")),
            buttonFlags2 = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSButtonFlags2")),
            cellFlags2 = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSCellFlags2")),
            position = (buttonFlags & NSButtonImagePositionMask) >> NSButtonImagePositionShift;
        self._isBordered = buttonFlags & NSButtonIsBorderedMask ? YES : NO;
        self._bezelStyle = buttonFlags2 & 0x7 | (buttonFlags2 & 0x20) >> 2;
        self._title = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSContents"));
        self._alternateTitle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAlternateContents"));
        self._objectValue = (self == null ? null : self.isa.objj_msgSend0(self, "state"));
        self._normalImage = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNormalImage"));
        self._alternateImage = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAlternateImage"));
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
        self._keyEquivalent = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyEquivalent"));
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
        self._imageName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSImageName"));
    return self;
}
,["id","CPCoder"])]);
}p;22;NSByteCountFormatter.jt;2299;@STATIC;1.0;I;33;Foundation/CPByteCountFormatter.jt;2242;objj_executeFile("Foundation/CPByteCountFormatter.j", NO);{
var the_class = objj_getClass("CPByteCountFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPByteCountFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPByteCountFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPByteCountFormatter").super_class }, "init");
    if (self)
    {
        self._countStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSKBSize")) || 0;
        self._allowsNonnumericFormatting = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSNoNonnumeric"));
        self._includesActualByteCount = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSActual"));
        self._includesCount = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSNoCount"));
        self._includesUnit = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSNoUnit"));
        self._adaptive = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSNoAdaptive"));
        self._zeroPadsFractionDigits = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSZeroPad"));
        self._allowedUnits = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSUnits")) || 0;
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPByteCountFormatter, "NSByteCountFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSByteCountFormatter__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSByteCountFormatter__classForKeyedArchiver(self, _cmd)
{
    return CPByteCountFormatter.isa.objj_msgSend0(CPByteCountFormatter, "class");
}
,["Class"])]);
}p;8;NSCell.jt;6699;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;AppKit/CPControl.ji;8;NSFont.jt;6619;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPControl.j", NO);objj_executeFile("NSFont.j", YES);{var the_class = objj_allocateClassPair(CPObject, "NSCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_state"), new objj_ivar("_isHighlighted"), new objj_ivar("_isEnabled"), new objj_ivar("_isEditable"), new objj_ivar("_isBordered"), new objj_ivar("_isBezeled"), new objj_ivar("_isSelectable"), new objj_ivar("_isScrollable"), new objj_ivar("_isContinuous"), new objj_ivar("_scrolls"), new objj_ivar("_wraps"), new objj_ivar("_truncates"), new objj_ivar("_sendsActionOnEndEditing"), new objj_ivar("_alignment"), new objj_ivar("_controlSize"), new objj_ivar("_objectValue"), new objj_ivar("_font"), new objj_ivar("_lineBreakMode"), new objj_ivar("_formatter"), new objj_ivar("_tag"), new objj_ivar("_usesSingleLineMode")]);objj_registerClassPair(the_class);
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
,["int"]), new objj_method(sel_getUid("usesSingleLineMode"), function $NSCell__usesSingleLineMode(self, _cmd)
{
    return self._usesSingleLineMode;
}
,["BOOL"]), new objj_method(sel_getUid("initWithCoder:"), function $NSCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCell").super_class }, "init");
    if (self)
    {
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSCellFlags")),
            flags2 = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSCellFlags2"));
        self._state = flags & 0x80000000 ? CPOnState : CPOffState;
        self._isHighlighted = flags & 0x40000000 ? YES : NO;
        self._isEnabled = flags & 0x20000000 ? NO : YES;
        self._isEditable = flags & 0x10000000 ? YES : NO;
        self._isBordered = flags & 0x00800000 ? YES : NO;
        self._isBezeled = flags & 0x00400000 ? YES : NO;
        self._isSelectable = flags & 0x00200000 ? YES : NO;
        self._isScrollable = flags & 0x00100000 ? YES : NO;
        self._isContinuous = flags & 0x00080100 ? YES : NO;
        self._scrolls = flags & 0x00100000 && flags & 0x00000040 ? YES : NO;
        self._wraps = !(flags & 0x00100000) && !(flags & 0x00000040) ? YES : NO;
        self._truncates = flags & 0x00100000 && !(flags & 0x00000040) ? YES : NO;
        self._alignment = (flags2 & 0x1c000000) >> 26;
        self._lineBreakMode = (flags2 & 0x0E00) >> 9;
        self._controlSize = (flags2 & 0xE0000) >> 17;
        self._sendsActionOnEndEditing = flags2 & 0x00400000 ? YES : NO;
        self._usesSingleLineMode = flags2 & 0xF4240 ? YES : NO;
        self._tag = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTag"));
        self._objectValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSContents"));
        self._font = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSupport"));
        self._formatter = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFormatter"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("replacementObjectForCoder:"), function $NSCell__replacementObjectForCoder_(self, _cmd, aCoder)
{
    return nil;
}
,["id","CPCoder"]), new objj_method(sel_getUid("stringValue"), function $NSCell__stringValue(self, _cmd)
{
    if (((___r1 = self._objectValue), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "isKindOfClass:", CPString.isa.objj_msgSend0(CPString, "class"))))
        return self._objectValue;
    if (((___r1 = self._objectValue), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "respondsToSelector:", sel_getUid("attributedStringValue"))))
        return ((___r1 = self._objectValue), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "attributedStringValue"));
    return "";
    var ___r1;
}
,["CPString"])]);
}{var the_class = objj_allocateClassPair(NSCell, "NSActionCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;16;NSClassSwapper.jt;4254;@STATIC;1.0;I;21;Foundation/CPObject.jI;21;Foundation/CPString.jI;27;AppKit/_CPCibClassSwapper.jt;4151;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("AppKit/_CPCibClassSwapper.j", NO);var NSClassSwapperClassNames = {},
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
        if (((___r1 = ((___r2 = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "sharedNib2Cib"))), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "userNSClasses"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "containsObject:", aClassName)))
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
                var UID = (self == null ? null : self.isa.objj_msgSend0(self, "UID"));
                NSClassSwapperClassNames[UID] = aClassName;
                NSClassSwapperOriginalClassNames[UID] = anOriginalClassName;
            }
            return self;
        }, "");
        class_addMethod(swapperClass, sel_getUid("classForKeyedArchiver"), function(self, _cmd)
        {
            return _CPCibClassSwapper.isa.objj_msgSend0(_CPCibClassSwapper, "class");
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
                    aClassName = (classForArchiver == null ? null : classForArchiver.isa.objj_msgSend0(classForArchiver, "className"));
            }
            (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", aClassName, _CPCibClassSwapperClassNameKey));
            (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", CP_NSMapClassName(anOriginalClassName), _CPCibClassSwapperOriginalClassNameKey));
        }, "");
    }
    return swapperClass;
    var ___r1, ___r2;
}
,["id","CPString","CPString"]), new objj_method(sel_getUid("allocWithCoder:"), function $NSClassSwapper__allocWithCoder_(self, _cmd, aCoder)
{
    var className = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassName")),
        originalClassName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSOriginalClassName"));
    return ((___r1 = self.isa.objj_msgSend2(self, "swapperClassForClassName:originalClassName:", className, originalClassName)), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "alloc"));
    var ___r1;
}
,["id","CPCoder"])]);
}p;12;NSClipView.jt;1871;@STATIC;1.0;I;19;AppKit/CPClipView.jt;1828;objj_executeFile("AppKit/CPClipView.j", NO);var NSClipViewDrawBackgroundFlag = 0x04;
{
var the_class = objj_getClass("CPClipView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPClipView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPClipView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPClipView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._documentView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDocView"));
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NScvFlags"));
        if (flags & NSClipViewDrawBackgroundFlag && (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSBGColor")))
            (self == null ? null : self.isa.objj_msgSend1(self, "setBackgroundColor:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBGColor"))));
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSClipView__classForKeyedArchiver(self, _cmd)
{
    return CPClipView.isa.objj_msgSend0(CPClipView, "class");
}
,["Class"])]);
}p;18;NSCollectionView.jt;2279;@STATIC;1.0;I;25;AppKit/CPCollectionView.jt;2230;objj_executeFile("AppKit/CPCollectionView.j", NO);{
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
    self._selectionIndexes = CPIndexSet.isa.objj_msgSend0(CPIndexSet, "indexSet");
    self._allowsEmptySelection = YES;
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCollectionView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._backgroundColors = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBackgroundColors"));
        self._maxNumberOfRows = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSMaxNumberOfGridRows"));
        self._maxNumberOfColumns = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSMaxNumberOfGridColumns"));
        self._isSelectable = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSelectable"));
        self._allowsMultipleSelection = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAllowsMultipleSelection"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCollectionView, "NSCollectionView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCollectionView__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCollectionView__classForKeyedArchiver(self, _cmd)
{
    return CPCollectionView.isa.objj_msgSend0(CPCollectionView, "class");
}
,["Class"])]);
}p;22;NSCollectionViewItem.jt;1222;@STATIC;1.0;I;29;AppKit/CPCollectionViewItem.jt;1169;objj_executeFile("AppKit/CPCollectionViewItem.j", NO);{
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCollectionViewItem__classForKeyedArchiver(self, _cmd)
{
    return CPCollectionViewItem.isa.objj_msgSend0(CPCollectionViewItem, "class");
}
,["Class"])]);
}p;9;NSColor.jt;4038;@STATIC;1.0;I;19;Foundation/CPData.jI;16;AppKit/CPColor.jt;3974;objj_executeFile("Foundation/CPData.j", NO);objj_executeFile("AppKit/CPColor.j", NO);var NSUnknownColorSpaceModel = -1,
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
    var colorSpace = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSColorSpace")),
        result;
    switch(colorSpace) {
    case 1:
    case 2:
        var rgb = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBytesForKey:", "NSRGB")),
            string = CFData.bytesToString(rgb),
            components = (string == null ? null : string.isa.objj_msgSend1(string, "componentsSeparatedByString:", " ")),
            values = [0, 0, 0, 1];
        for (var i = 0; i < components.length && i < 4; i++)
            values[i] = ((___r1 = components[i]), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "floatValue"));
        result = CPColor.isa.objj_msgSend(CPColor, "colorWithCalibratedRed:green:blue:alpha:", values[0], values[1], values[2], values[3]);
        break;
    case 3:
    case 4:
        var bytes = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBytesForKey:", "NSWhite")),
            string = CFData.bytesToString(bytes),
            components = (string == null ? null : string.isa.objj_msgSend1(string, "componentsSeparatedByString:", " ")),
            values = [0, 1];
        for (var i = 0; i < components.length && i < 2; i++)
            values[i] = ((___r1 = components[i]), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "floatValue"));
        result = CPColor.isa.objj_msgSend2(CPColor, "colorWithCalibratedWhite:alpha:", values[0], values[1]);
        break;
    case 6:
        var catalogName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCatalogName")),
            colorName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSColorName")),
            color = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSColor")),
            result = nil;
        if (catalogName === "System")
        {
            switch(colorName) {
            case "controlColor":
                result = CPColor.isa.objj_msgSend2(CPColor, "colorWithCalibratedWhite:alpha:", 175.0 / 255.0, 1.0);
                break;
            case "controlBackgroundColor":
                result = CPColor.isa.objj_msgSend0(CPColor, "whiteColor");
                break;
            case "gridColor":
                result = CPColor.isa.objj_msgSend2(CPColor, "colorWithCalibratedWhite:alpha:", 204.0 / 255.0, 1.0);
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
        result = CPColor.isa.objj_msgSend0(CPColor, "blackColor");
        break;
    }
    return result;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPColor, "NSColor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSColor__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSColor__classForKeyedArchiver(self, _cmd)
{
    return CPColor.isa.objj_msgSend0(CPColor, "class");
}
,["Class"])]);
}p;13;NSColorWell.jt;2460;@STATIC;1.0;I;20;AppKit/CPColorWell.ji;8;NSCell.ji;11;NSControl.jt;2388;objj_executeFile("AppKit/CPColorWell.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPColorWell")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPColorWell\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPColorWell__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPColorWell").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        (self == null ? null : self.isa.objj_msgSend1(self, "setEnabled:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSEnabled"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setBordered:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsBordered"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setColor:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSColor"))));
        if ((self == null ? null : self.isa.objj_msgSend0(self, "isBordered")))
        {
            var frameSize = (self == null ? null : self.isa.objj_msgSend0(self, "frameSize"));
            CPLog.debug("NSColorWell: adjusting height from %d to %d", frameSize.height, 24.0);
            frameSize.height = 24.0;
            (self == null ? null : self.isa.objj_msgSend1(self, "setFrameSize:", frameSize));
        }
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPColorWell, "NSColorWell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSColorWell__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSColorWell__classForKeyedArchiver(self, _cmd)
{
    return CPColorWell.isa.objj_msgSend0(CPColorWell, "class");
}
,["Class"])]);
}p;12;NSComboBox.jt;5137;@STATIC;1.0;I;20;AppKit/CPTextField.jI;19;AppKit/CPComboBox.ji;13;NSTextField.jt;5051;objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("AppKit/CPComboBox.j", NO);objj_executeFile("NSTextField.j", YES);{
var the_class = objj_getClass("CPComboBox")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPComboBox\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPComboBox__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPComboBox").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPComboBox__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPComboBox").super_class }, "NS_initWithCell:", cell);
    self._items = (cell == null ? null : cell.isa.objj_msgSend0(cell, "itemList"));
    self._usesDataSource = (cell == null ? null : cell.isa.objj_msgSend0(cell, "usesDataSource"));
    self._completes = (cell == null ? null : cell.isa.objj_msgSend0(cell, "completes"));
    self._numberOfVisibleItems = (cell == null ? null : cell.isa.objj_msgSend0(cell, "visibleItemCount"));
    self._hasVerticalScroller = (cell == null ? null : cell.isa.objj_msgSend0(cell, "hasVerticalScroller"));
    self.isa.objj_msgSend1(self, "setButtonBordered:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "borderedButton")));
    self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled")));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPComboBox, "NSComboBox"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSComboBox__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSComboBox__classForKeyedArchiver(self, _cmd)
{
    return CPComboBox.isa.objj_msgSend0(CPComboBox, "class");
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
        self._visibleItemCount = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSVisibleItemCount"));
        self._hasVerticalScroller = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSHasVerticalScroller"));
        self._usesDataSource = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSUsesDataSource"));
        self._completes = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSCompletes"));
        if (!self._usesDataSource)
            self._itemList = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSPopUpListData")) || [];
        else
            self._itemList = [];
        self._borderedButton = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSButtonBordered")) ? (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSButtonBordered")) : YES;
    }
    return self;
}
,["id","CPCoder"])]);
}p;11;NSControl.jt;4590;@STATIC;1.0;I;18;AppKit/CPControl.ji;8;NSCell.ji;8;NSView.jt;4524;objj_executeFile("AppKit/CPControl.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSView.j", YES);{
var the_class = objj_getClass("CPControl")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPControl\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPControl__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPControl").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        (self == null ? null : self.isa.objj_msgSend1(self, "setEnabled:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSEnabled"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "sendActionOn:", CPLeftMouseUpMask));
        (self == null ? null : self.isa.objj_msgSend1(self, "setTarget:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTarget"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setAction:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAction"))));
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSTag")))
            (self == null ? null : self.isa.objj_msgSend1(self, "setTag:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTag"))));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPControl__NS_initWithCell_(self, _cmd, cell)
{
    self.isa.objj_msgSend1(self, "setSendsActionOnEndEditing:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "sendsActionOnEndEditing")));
    self.isa.objj_msgSend1(self, "setObjectValue:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "objectValue")));
    self.isa.objj_msgSend1(self, "setFont:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "font")));
    self.isa.objj_msgSend1(self, "setAlignment:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "alignment")));
    self.isa.objj_msgSend1(self, "setContinuous:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isContinuous")));
    self.isa.objj_msgSend1(self, "setLineBreakMode:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "lineBreakMode")));
    self.isa.objj_msgSend1(self, "setFormatter:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "formatter")));
    self.isa.objj_msgSend1(self, "setControlSize:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "controlSize")));
}
,["void","NSCell"]), new objj_method(sel_getUid("_nib2CibAdjustment"), function $CPControl___nib2CibAdjustment(self, _cmd)
{
    var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme"));
    return (theme == null ? null : theme.isa.objj_msgSend3(theme, "valueForAttributeWithName:inState:forClass:", "nib2cib-adjustment-frame", self.isa.objj_msgSend0(self, "themeState"), self.isa.objj_msgSend0(self, "class"))) || self.isa.objj_msgSend1(self, "currentValueForThemeAttribute:", "nib2cib-adjustment-frame");
}
,["CGRect"]), new objj_method(sel_getUid("_adjustNib2CibSize"), function $CPControl___adjustNib2CibSize(self, _cmd)
{
    var frame = self.isa.objj_msgSend0(self, "frame"),
        frameAdjustment = self.isa.objj_msgSend0(self, "_nib2CibAdjustment");
    if (frameAdjustment)
    {
        var finalFrame = CGRectMake(frame.origin.x + frameAdjustment.origin.x, frame.origin.y - frameAdjustment.origin.y, frame.size.width + frameAdjustment.size.width, frame.size.height + frameAdjustment.size.height);
        self.isa.objj_msgSend1(self, "setFrame:", finalFrame);
    }
}
,["void"])]);
}{var the_class = objj_allocateClassPair(CPControl, "NSControl"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSControl__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSControl__classForKeyedArchiver(self, _cmd)
{
    return CPControl.isa.objj_msgSend0(CPControl, "class");
}
,["Class"])]);
}p;16;NSCustomObject.jt;1339;@STATIC;1.0;I;27;AppKit/_CPCibCustomObject.jt;1288;objj_executeFile("AppKit/_CPCibCustomObject.j", NO);{
var the_class = objj_getClass("_CPCibCustomObject")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomObject\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibCustomObject__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCibCustomObject").super_class }, "init");
    if (self)
        self._className = CP_NSMapClassName((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassName")));
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCibCustomObject, "NSCustomObject"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCustomObject__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomObject__classForKeyedArchiver(self, _cmd)
{
    return _CPCibCustomObject.isa.objj_msgSend0(_CPCibCustomObject, "class");
}
,["Class"])]);
}p;18;NSCustomResource.jt;4373;@STATIC;1.0;I;29;AppKit/_CPCibCustomResource.ji;18;Nib2CibException.jt;4297;objj_executeFile("AppKit/_CPCibCustomResource.j", NO);objj_executeFile("Nib2CibException.j", YES);var FILE = require("file"),
    imageSize = (require("cappuccino/imagesize")).imagesize,
    supportedTemplateImages = {"NSAddTemplate": "CPAddTemplate", "NSRemoveTemplate": "CPRemoveTemplate", "NSToolbarShowColors": "CPImageNameColorPanel"};
{
var the_class = objj_getClass("_CPCibCustomResource")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibCustomResource\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibCustomResource__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPCibCustomResource").super_class }, "init");
    if (self)
    {
        self._className = CP_NSMapClassName((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassName")));
        self._resourceName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSResourceName"));
        var size = CGSizeMakeZero(),
            framework = "",
            bundleIdentifier = "";
        if (self._resourceName == "NSSwitch" || self._resourceName == "NSRadioButton")
            return nil;
        else if (/^NS[A-Z][A-Za-z]+$/.test(self._resourceName))
        {
            if (supportedTemplateImages[self._resourceName])
            {
                self._resourceName = supportedTemplateImages[self._resourceName];
            }
            else
                CPException.isa.objj_msgSend3(CPException, "raise:format:", Nib2CibException, "The built in image “%@” is not supported.", self._resourceName);
        }
        else
        {
            var match = /^(.+)@(.+)$/.exec(self._resourceName);
            if (match)
            {
                self._resourceName = match[1];
                framework = match[2];
            }
            var resourceInfo = (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "resourceInfoForName:inFramework:", self._resourceName, framework));
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
                bundle = CPBundle.isa.objj_msgSend1(CPBundle, "bundleWithPath:", frameworkPath);
            (bundle == null ? null : bundle.isa.objj_msgSend1(bundle, "loadWithDelegate:", nil));
            bundleIdentifier = (bundle == null ? null : bundle.isa.objj_msgSend0(bundle, "bundleIdentifier")) || "";
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomResource__classForKeyedArchiver(self, _cmd)
{
    return _CPCibCustomResource.isa.objj_msgSend0(_CPCibCustomResource, "class");
}
,["Class"])]);
}p;14;NSCustomView.jt;1461;@STATIC;1.0;I;25;AppKit/_CPCibCustomView.ji;8;NSView.jt;1400;objj_executeFile("AppKit/_CPCibCustomView.j", NO);objj_executeFile("NSView.j", YES);var _CPCibCustomViewClassNameKey = "_CPCibCustomViewClassNameKey";
{var the_class = objj_allocateClassPair(CPView, "NSCustomView"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_className")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSCustomView__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCustomView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
        self._className = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassName"));
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $NSCustomView__encodeWithCoder_(self, _cmd, aCoder)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSCustomView").super_class }, "encodeWithCoder:", aCoder);
    (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", CP_NSMapClassName(self._className), _CPCibCustomViewClassNameKey));
}
,["void","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSCustomView__classForKeyedArchiver(self, _cmd)
{
    return _CPCibCustomView.isa.objj_msgSend0(_CPCibCustomView, "class");
}
,["Class"])]);
}p;8;NSDate.jt;754;@STATIC;1.0;I;19;Foundation/CPDate.jt;712;objj_executeFile("Foundation/CPDate.j", NO);{var the_class = objj_allocateClassPair(CPDate, "NSDate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDate__initWithCoder_(self, _cmd, aCoder)
{
    var interval = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NS.time")) || 0;
    return CPDate.isa.objj_msgSend1(CPDate, "dateWithTimeIntervalSinceReferenceDate:", interval);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDate__classForKeyedArchiver(self, _cmd)
{
    return CPDate.isa.objj_msgSend0(CPDate, "class");
}
,["Class"])]);
}p;17;NSDateFormatter.jt;2535;@STATIC;1.0;I;28;Foundation/CPDateFormatter.jt;2483;objj_executeFile("Foundation/CPDateFormatter.j", NO);{
var the_class = objj_getClass("CPDateFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDateFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDateFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDateFormatter").super_class }, "init");
    if (self)
    {
        var attributes = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.attributes"));
        self._dateStyle = (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "dateStyle"));
        self._timeStyle = (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "timeStyle"));
        self._formatterBehavior = (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "formatterBehavior"));
        if ((attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "containsKey:", "doesRelativeDateFormatting")))
            self._doesRelativeDateFormatting = (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "doesRelativeDateFormatting"));
        self._dateFormat = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.format"));
        self._allowNaturalLanguage = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NS.natural"));
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDateFormatter__classForKeyedArchiver(self, _cmd)
{
    return CPDateFormatter.isa.objj_msgSend0(CPDateFormatter, "class");
}
,["Class"])]);
}p;14;NSDatePicker.jt;13963;@STATIC;1.0;I;21;AppKit/CPDatePicker.jI;19;Foundation/CPDate.ji;8;NSCell.jt;13881;objj_executeFile("AppKit/CPDatePicker.j", NO);objj_executeFile("Foundation/CPDate.j", NO);objj_executeFile("NSCell.j", YES);var NSDatePickerDefaultSize = 22,
    NSDatePickerCalendarDefaultSize = 148;
{
var the_class = objj_getClass("CPDatePicker")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDatePicker\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDatePicker__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDatePicker").super_class }, "NS_initWithCoder:", aCoder);
    var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
    self._minDate = (cell == null ? null : cell.isa.objj_msgSend0(cell, "minDate"));
    self._maxDate = (cell == null ? null : cell.isa.objj_msgSend0(cell, "maxDate"));
    self._timeInterval = (cell == null ? null : cell.isa.objj_msgSend0(cell, "timeInterval"));
    self._datePickerMode = (cell == null ? null : cell.isa.objj_msgSend0(cell, "datePickerMode"));
    self._datePickerElements = (cell == null ? null : cell.isa.objj_msgSend0(cell, "datePickerElements"));
    self._datePickerStyle = (cell == null ? null : cell.isa.objj_msgSend0(cell, "datePickerType"));
    self._dateValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "objectValue"));
    self._backgroundColor = (cell == null ? null : cell.isa.objj_msgSend0(cell, "backgroundColor"));
    self._drawsBackground = (cell == null ? null : cell.isa.objj_msgSend0(cell, "drawsBackground"));
    self._formatter = (cell == null ? null : cell.isa.objj_msgSend0(cell, "formatter"));
    (self == null ? null : self.isa.objj_msgSend1(self, "setBezeled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isBezeled"))));
    (self == null ? null : self.isa.objj_msgSend1(self, "setBordered:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isBordered"))));
    (self == null ? null : self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled"))));
    (self == null ? null : self.isa.objj_msgSend1(self, "setControlSize:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "controlSize"))));
    var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme"));
    if (self._datePickerStyle != CPClockAndCalendarDatePickerStyle)
    {
        var minSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "min-size", (self == null ? null : self.isa.objj_msgSend0(self, "class")))),
            maxSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "max-size", (self == null ? null : self.isa.objj_msgSend0(self, "class"))));
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
    }
    else
    {
        var minSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "min-size-calendar", (self == null ? null : self.isa.objj_msgSend0(self, "class")))),
            maxSize = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "max-size-calendar", (self == null ? null : self.isa.objj_msgSend0(self, "class")))),
            sizeClock = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "size-clock", (self == null ? null : self.isa.objj_msgSend0(self, "class"))));
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
    }
    if ((cell == null ? null : cell.isa.objj_msgSend0(cell, "font"))._name === IBDefaultFontFace && ((___r1 = (cell == null ? null : cell.isa.objj_msgSend0(cell, "font"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "size")) == IBDefaultFontSize)
        (self == null ? null : self.isa.objj_msgSend1(self, "setTextFont:", (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "font", (self == null ? null : self.isa.objj_msgSend0(self, "class"))))));
    else
        (self == null ? null : self.isa.objj_msgSend1(self, "setTextFont:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "font"))));
    var textColor = (cell == null ? null : cell.isa.objj_msgSend0(cell, "textColor")),
        defaultColor = (self == null ? null : self.isa.objj_msgSend1(self, "currentValueForThemeAttribute:", "text-color"));
    if (!(textColor == null ? null : textColor.isa.objj_msgSend1(textColor, "isEqual:", defaultColor)))
        (self == null ? null : self.isa.objj_msgSend1(self, "setTextColor:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "textColor"))));
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDatePicker, "NSDatePicker"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDatePicker__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSDatePicker").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDatePicker__classForKeyedArchiver(self, _cmd)
{
    return CPDatePicker.isa.objj_msgSend0(CPDatePicker, "class");
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
,["CPInteger"]), new objj_method(sel_getUid("_setDatePickerType:"), function $NSDatePickerCell___setDatePickerType_(self, _cmd, newValue)
{
    self._datePickerType = newValue;
}
,["void","CPInteger"]), new objj_method(sel_getUid("timeInterval"), function $NSDatePickerCell__timeInterval(self, _cmd)
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
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSCellFlags")),
            pickerType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSDatePickerType")) || 0;
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSuppressStepper")) && pickerType != 1)
            pickerType = 2;
        self._timeInterval = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSTimeInterval")) || 0;
        self._datePickerMode = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSDatePickerMode")) || 0;
        self._datePickerElements = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSDatePickerElements")) || 0;
        self._datePickerType = pickerType;
        self._minDate = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMinDate")) || CPDate.isa.objj_msgSend0(CPDate, "distantPast");
        self._maxDate = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMaxDate")) || CPDate.isa.objj_msgSend0(CPDate, "distantFuture");
        self._textColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTextColor"));
        self._backgroundColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBackgroundColor"));
        self._isBordered = self._isBezeled;
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSFormatter")))
            self._formatter = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFormatter"));
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSDrawsBackground")))
            self._drawsBackground = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSDrawsBackground"));
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
    return CPDate.isa.objj_msgSend0(CPDate, "class");
}
,["Class"])]);
}p;14;NSDictionary.jt;1396;@STATIC;1.0;I;21;Foundation/CPObject.jI;25;Foundation/CPDictionary.jt;1321;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPDictionary.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSDictionary"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDictionary__initWithCoder_(self, _cmd, aCoder)
{
    if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NS.objects")))
        return CPDictionary.isa.objj_msgSend2(CPDictionary, "dictionaryWithObjects:forKeys:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.objects")), (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.keys")));
    if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "dict.values")))
        return CPDictionary.isa.objj_msgSend2(CPDictionary, "dictionaryWithObjects:forKeys:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "dict.values")), (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "dict.sortedKeys")));
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSDictionary, "NSMutableDictionary"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;24;NSDictionaryController.jt;1549;@STATIC;1.0;I;31;AppKit/CPDictionaryController.jt;1494;objj_executeFile("AppKit/CPDictionaryController.j", NO);{
var the_class = objj_getClass("CPDictionaryController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPDictionaryController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPDictionaryController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPDictionaryController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._includedKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSIncludedKeys"));
        self._excludedKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSExcludedKeys"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPDictionaryController, "NSDictionaryController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSDictionaryController__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSDictionaryController__classForKeyedArchiver(self, _cmd)
{
    return CPDictionaryController.isa.objj_msgSend0(CPDictionaryController, "class");
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
p;14;NSExpression.jt;9804;@STATIC;1.0;I;25;Foundation/CPExpression.jI;33;Foundation/_CPKeyPathExpression.jI;29;Foundation/_CPSetExpression.jI;30;Foundation/_CPSelfExpression.jI;39;Foundation/_CPConstantValueExpression.jI;34;Foundation/_CPFunctionExpression.jI;34;Foundation/_CPVariableExpression.jI;35;Foundation/_CPAggregateExpression.jt;9486;objj_executeFile("Foundation/CPExpression.j", NO);objj_executeFile("Foundation/_CPKeyPathExpression.j", NO);objj_executeFile("Foundation/_CPSetExpression.j", NO);objj_executeFile("Foundation/_CPSelfExpression.j", NO);objj_executeFile("Foundation/_CPConstantValueExpression.j", NO);objj_executeFile("Foundation/_CPFunctionExpression.j", NO);objj_executeFile("Foundation/_CPVariableExpression.j", NO);objj_executeFile("Foundation/_CPAggregateExpression.j", NO);{var the_class = objj_allocateClassPair(_CPKeyPathExpression, "NSKeyPathExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSKeyPathExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSKeyPathExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPKeyPathExpression.isa.objj_msgSend0(_CPKeyPathExpression, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPConstantValueExpression, "_CPKeyPathSpecifierExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPKeyPathSpecifierExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var keyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyPath"));
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_CPKeyPathSpecifierExpression").super_class }, "initWithValue:", keyPath);
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPKeyPathSpecifierExpression, "NSKeyPathSpecifierExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSKeyPathSpecifierExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSKeyPathSpecifierExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPConstantValueExpression.isa.objj_msgSend0(_CPConstantValueExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPConstantValueExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPConstantValueExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPConstantValueExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var value = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSConstantValue"));
    return self.isa.objj_msgSend1(self, "initWithValue:", value);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPConstantValueExpression, "NSConstantValueExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSConstantValueExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSConstantValueExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPConstantValueExpression.isa.objj_msgSend0(_CPConstantValueExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPFunctionExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPFunctionExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPFunctionExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var type = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSExpressionType")),
        operand = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSOperand")),
        selector = CPSelectorFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSelectorName"))),
        args = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSArguments"));
    return self.isa.objj_msgSend(self, "initWithTarget:selector:arguments:type:", operand, selector, args, type);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPFunctionExpression, "NSFunctionExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSFunctionExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSFunctionExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPFunctionExpression.isa.objj_msgSend0(_CPFunctionExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPSetExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPSetExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPSetExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var type = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSExpressionType")),
        left = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSLeftExpression")),
        right = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRightExpression"));
    return self.isa.objj_msgSend3(self, "initWithType:left:right:", type, left, right);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPSetExpression, "NSSetExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSetExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSetExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPSetExpression.isa.objj_msgSend0(_CPSetExpression, "class");
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
    return _CPSelfExpression.isa.objj_msgSend0(_CPSelfExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPVariableExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPVariableExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPVariableExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var variable = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSVariable"));
    return self.isa.objj_msgSend1(self, "initWithVariable:", variable);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPVariableExpression, "NSVariableExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSVariableExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSVariableExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPVariableExpression.isa.objj_msgSend0(_CPVariableExpression, "class");
}
,["Class"])]);
}{
var the_class = objj_getClass("_CPAggregateExpression")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPAggregateExpression\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPAggregateExpression__NS_initWithCoder_(self, _cmd, aCoder)
{
    var collection = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCollection"));
    return self.isa.objj_msgSend1(self, "initWithAggregate:", collection);
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPAggregateExpression, "NSAggregateExpression"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSAggregateExpression__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSAggregateExpression__classForKeyedArchiver(self, _cmd)
{
    return _CPAggregateExpression.isa.objj_msgSend0(_CPAggregateExpression, "class");
}
,["Class"])]);
}p;8;NSFont.jt;3798;@STATIC;1.0;I;15;AppKit/CPFont.jt;3759;objj_executeFile("AppKit/CPFont.j", NO);IBDefaultFontFace = "Lucida Grande";
IBDefaultFontSize = 13.0;
var OS = require("os"),
    fontinfo = (require("cappuccino/fontinfo")).fontinfo;
{
var the_class = objj_getClass("CPFont")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPFont\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPFont__NS_initWithCoder_(self, _cmd, aCoder)
{
    var name = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSName")),
        size = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSSize")),
        isBold = false,
        isItalic = false,
        info = fontinfo(name, size);
    if (info)
    {
        name = info.familyName;
        isBold = info.bold;
        isItalic = info.italic;
    }
    var font = self.isa.objj_msgSend(self, "_initWithName:size:bold:italic:system:", name, size, isBold, isItalic, NO);
    CPLog.debug("NSFont: %s", (NSFont == null ? null : NSFont.isa.objj_msgSend1(NSFont, "descriptorForFont:", font)));
    return font;
}
,["id","CPCoder"]), new objj_method(sel_getUid("cibFontForNibFont"), function $CPFont__cibFontForNibFont(self, _cmd)
{
    if (self._name === IBDefaultFontFace)
    {
        if (self._size === IBDefaultFontSize && !self._isBold && !self._isItalic)
            return nil;
        else
            return ((___r1 = CPFont.isa.objj_msgSend0(CPFont, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend(___r1, "_initWithName:size:bold:italic:system:", _CPFontSystemFacePlaceholder, self._size == IBDefaultFontSize ? CPFontCurrentSystemSize : self._size, self._isBold, self._isItalic, YES));
    }
    return self;
    var ___r1;
}
,["id"])]);
}{var the_class = objj_allocateClassPair(CPFont, "NSFont"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSFont__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSFont__classForKeyedArchiver(self, _cmd)
{
    return CPFont.isa.objj_msgSend0(CPFont, "class");
}
,["Class"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("initialize"), function $NSFont__initialize(self, _cmd)
{
    if (self !== NSFont.isa.objj_msgSend0(NSFont, "class"))
        return;
    CPLog.debug("NSFont: default IB font: %s %f", IBDefaultFontFace, IBDefaultFontSize);
}
,["void"]), new objj_method(sel_getUid("descriptorForFont:"), function $NSFont__descriptorForFont_(self, _cmd, aFont)
{
    var styleAttributes = [];
    if ((aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "isBold")))
        styleAttributes.push("bold");
    if ((aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "isItalic")))
        styleAttributes.push("italic");
    styleAttributes = styleAttributes.join(" ");
    var systemAttributes = [];
    if ((aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "isSystem")))
    {
        systemAttributes.push("system face");
        if ((aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "size")) === IBDefaultFontSize)
            systemAttributes.push("system size");
    }
    systemAttributes = systemAttributes.join(", ");
    return CPString.isa.objj_msgSend(CPString, "stringWithFormat:", "%s%s %d%s", (aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "familyName")), styleAttributes ? " " + styleAttributes : "", (aFont == null ? null : aFont.isa.objj_msgSend0(aFont, "size")), systemAttributes ? " (" + systemAttributes + ")" : "");
}
,["CPString","CPFont"])]);
}p;13;NSFormatter.jt;219;@STATIC;1.0;I;21;Foundation/CPObject.jt;175;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;14;NSFoundation.jt;770;@STATIC;1.0;i;9;NSArray.ji;20;NSAttributedString.ji;22;NSByteCountFormatter.ji;8;NSDate.ji;17;NSDateFormatter.ji;14;NSDictionary.ji;14;NSExpression.ji;13;NSFormatter.ji;17;NSMutableString.ji;8;NSNull.ji;19;NSNumberFormatter.ji;7;NSSet.ji;9;NSValue.jt;515;objj_executeFile("NSArray.j", YES);objj_executeFile("NSAttributedString.j", YES);objj_executeFile("NSByteCountFormatter.j", YES);objj_executeFile("NSDate.j", YES);objj_executeFile("NSDateFormatter.j", YES);objj_executeFile("NSDictionary.j", YES);objj_executeFile("NSExpression.j", YES);objj_executeFile("NSFormatter.j", YES);objj_executeFile("NSMutableString.j", YES);objj_executeFile("NSNull.j", YES);objj_executeFile("NSNumberFormatter.j", YES);objj_executeFile("NSSet.j", YES);objj_executeFile("NSValue.j", YES);p;16;NSIBObjectData.jt;4718;@STATIC;1.0;I;25;AppKit/_CPCibObjectData.ji;8;NSCell.jt;4657;objj_executeFile("AppKit/_CPCibObjectData.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("_CPCibObjectData")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"_CPCibObjectData\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $_CPCibObjectData__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend0(self, "init"));
    if (self)
    {
        self._namesKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNamesKeys"));
        self._namesValues = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNamesValues"));
        self._classesKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassesKeys"));
        self._classesValues = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSClassesValues"));
        self._connections = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSConnections"));
        self._framework = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFramework"));
        self._objectsKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSObjectsKeys"));
        self._objectsValues = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSObjectsValues"));
        (self == null ? null : self.isa.objj_msgSend0(self, "removeCellsFromObjectGraph"));
        self._fileOwner = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRoot"));
        self._visibleWindows = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSVisibleWindows"));
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
        if ((child == null ? null : child.isa.objj_msgSend1(child, "isKindOfClass:", NSCell.isa.objj_msgSend0(NSCell, "class"))))
        {
            parentForCellUIDs[(child == null ? null : child.isa.objj_msgSend0(child, "UID"))] = parent;
            continue;
        }
        if (!(parent == null ? null : parent.isa.objj_msgSend1(parent, "isKindOfClass:", NSCell.isa.objj_msgSend0(NSCell, "class"))))
            continue;
        var parentUID = (parent == null ? null : parent.isa.objj_msgSend0(parent, "UID")),
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
        if ((object == null ? null : object.isa.objj_msgSend1(object, "respondsToSelector:", sel_getUid("swapCellsForParents:"))))
            (object == null ? null : object.isa.objj_msgSend1(object, "swapCellsForParents:", parentForCellUIDs));
    }
}
,["void"])]);
}{var the_class = objj_allocateClassPair(_CPCibObjectData, "NSIBObjectData"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBObjectData__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBObjectData__classForKeyedArchiver(self, _cmd)
{
    return _CPCibObjectData.isa.objj_msgSend0(_CPCibObjectData, "class");
}
,["Class"])]);
}p;9;NSImage.jt;1287;@STATIC;1.0;I;16;AppKit/CPImage.jt;1247;objj_executeFile("AppKit/CPImage.j", NO);{
var the_class = objj_getClass("CPImage")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPImage\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPImage__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend0(self, "init"));
    if (self)
    {
        var imageFlags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSImageFlags"));
        self._size = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSSize"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPImage, "NSImage"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSImage__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSImage__classForKeyedArchiver(self, _cmd)
{
    return CPImage.isa.objj_msgSend0(CPImage, "class");
}
,["Class"])]);
}p;13;NSImageView.jt;4880;@STATIC;1.0;I;20;AppKit/CPImageView.ji;8;NSCell.jt;4824;objj_executeFile("AppKit/CPImageView.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPImageView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPImageView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPImageView__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPImageView").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPImageView__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPImageView").super_class }, "NS_initWithCell:", cell);
    self.isa.objj_msgSend1(self, "setImageScaling:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "imageScaling")));
    self.isa.objj_msgSend1(self, "setImageAlignment:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "imageAlignment")));
    self._isEditable = (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEditable"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPImageView, "NSImageView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSImageView__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSImageView__classForKeyedArchiver(self, _cmd)
{
    return CPImageView.isa.objj_msgSend0(CPImageView, "class");
}
,["Class"])]);
}{var the_typedef = objj_allocateTypeDef("NSImageAlignment");
objj_registerTypeDef(the_typedef);
}NSImageAlignCenter = 0;
NSImageAlignTop = 1;
NSImageAlignTopLeft = 2;
NSImageAlignTopRight = 3;
NSImageAlignLeft = 4;
NSImageAlignBottom = 5;
NSImageAlignBottomLeft = 6;
NSImageAlignBottomRight = 7;
NSImageAlignRight = 8;
{var the_typedef = objj_allocateTypeDef("NSImageScaling");
objj_registerTypeDef(the_typedef);
}NSImageScaleProportionallyDown = 0;
NSImageScaleAxesIndependently = 1;
NSImageScaleNone = 2;
NSImageScaleProportionallyUpOrDown = 3;
{var the_typedef = objj_allocateTypeDef("NSImageFrameStyle");
objj_registerTypeDef(the_typedef);
}NSImageFrameNone = 0;
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
        self._animates = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAnimates"));
        self._imageAlignment = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSAlign"));
        self._imageScaling = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSScale"));
        self._frameStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSStyle"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;20;NSLayoutConstraint.jt;1120;@STATIC;1.0;I;21;Foundation/CPObject.jI;24;Foundation/CPException.jt;1046;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPException.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSLayoutConstraint"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSLayoutConstraint__initWithCoder_(self, _cmd, aCoder)
{
    CPException.isa.objj_msgSend3(CPException, "raise:format:", "nib2cibException", "Autolayout is not yet supported. Turn \"Use Auto Layout\" off in the File Inspector of %@.", ((___r1 = ((___r2 = (Converter == null ? null : Converter.isa.objj_msgSend0(Converter, "sharedConverter"))), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "inputPath"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "lastPathComponent")));
    var ___r1, ___r2;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSLayoutConstraint__classForKeyedArchiver(self, _cmd)
{
    return CPObject.isa.objj_msgSend0(CPObject, "class");
}
,["Class"])]);
}p;18;NSLevelIndicator.jt;6509;@STATIC;1.0;I;25;AppKit/CPLevelIndicator.ji;8;NSCell.jt;6448;objj_executeFile("AppKit/CPLevelIndicator.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPLevelIndicator")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPLevelIndicator\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPLevelIndicator__NS_initWithCoder_(self, _cmd, aCoder)
{
    var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
    self._minValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "minValue"));
    self._maxValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "maxValue"));
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPLevelIndicator").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPLevelIndicator__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPLevelIndicator").super_class }, "NS_initWithCell:", cell);
    self._minValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "minValue"));
    self._maxValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "maxValue"));
    self._levelIndicatorStyle = (cell == null ? null : cell.isa.objj_msgSend0(cell, "levelIndicatorStyle"));
    self._warningValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "warningValue"));
    self._criticalValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "criticalValue"));
    self._tickMarkPosition = (cell == null ? null : cell.isa.objj_msgSend0(cell, "tickMarkPosition"));
    self._numberOfTickMarks = (cell == null ? null : cell.isa.objj_msgSend0(cell, "numberOfTickMarks"));
    self._numberOfMajorTickMarks = (cell == null ? null : cell.isa.objj_msgSend0(cell, "numberOfMajorTickMarks"));
    self.isa.objj_msgSend1(self, "setEditable:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEditable")));
    self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled")));
    self.isa.objj_msgSend1(self, "setContinuous:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isContinuous")));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPLevelIndicator, "NSLevelIndicator"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSLevelIndicator__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSLevelIndicator__classForKeyedArchiver(self, _cmd)
{
    return CPLevelIndicator.isa.objj_msgSend0(CPLevelIndicator, "class");
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
        self._objectValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSValue"));
        self._minValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMinValue"));
        self._maxValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMaxValue"));
        self._warningValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSWarningValue"));
        self._criticalValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSCriticalValue"));
        self._levelIndicatorStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSIndicatorStyle"));
        self._tickMarkPosition = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTickMarkPosition"));
        self._numberOfTickMarks = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSNumberOfTickMarks"));
        self._numberOfTickMarks = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSNumberOfMajorTickMarks"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;10;NSMatrix.jt;6860;@STATIC;1.0;I;21;Foundation/CPObject.jI;16;AppKit/CPRadio.jI;15;AppKit/CPView.ji;8;NSView.jt;6762;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPRadio.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("NSView.j", YES);var NSMatrixRadioModeMask = 0x40000000,
    NSMatrixDrawsBackgroundMask = 0x01000000;
{var the_class = objj_allocateClassPair(CPView, "NSMatrix"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMatrix__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCoder:"), function $NSMatrix__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("NSMatrix").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var numberOfRows = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSNumRows")),
            numberOfColumns = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSNumCols")),
            cellSize = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSCellSize")),
            intercellSpacing = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSIntercellSpacing")),
            flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSMatrixFlags")),
            isRadioMode = flags & NSMatrixRadioModeMask,
            drawsBackground = flags & NSMatrixDrawsBackgroundMask,
            backgroundColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBackgroundColor")),
            cells = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCells")),
            selectedCell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSelectedCell"));
        if (isRadioMode)
        {
            var radioGroup = CPRadioGroup.isa.objj_msgSend0(CPRadioGroup, "new"),
                frame = CGRectMake(0.0, 0.0, cellSize.width, cellSize.height);
            for (var rowIndex = 0; rowIndex < numberOfRows; ++rowIndex)
            {
                frame.origin.x = 0;
                for (var columnIndex = 0; columnIndex < numberOfColumns; ++columnIndex)
                {
                    var cell = cells[rowIndex * numberOfColumns + columnIndex],
                        cellView = ((___r1 = CPRadio.isa.objj_msgSend0(CPRadio, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend3(___r1, "initWithFrame:radioGroup:cell:", frame, radioGroup, cell));
                    (self == null ? null : self.isa.objj_msgSend1(self, "addSubview:", cellView));
                    NIB_CONNECTION_EQUIVALENCY_TABLE[(cell == null ? null : cell.isa.objj_msgSend0(cell, "UID"))] = cellView;
                    frame.origin.x = CGRectGetMaxX(frame) + intercellSpacing.width;
                }
                frame.origin.y = CGRectGetMaxY(frame) + intercellSpacing.height;
            }
            if (drawsBackground)
                (self == null ? null : self.isa.objj_msgSend1(self, "setBackgroundColor:", backgroundColor));
            self.isa = CPView.isa.objj_msgSend0(CPView, "class");
            NIB_CONNECTION_EQUIVALENCY_TABLE[(self == null ? null : self.isa.objj_msgSend0(self, "UID"))] = radioGroup;
        }
        else
        {
            self = nil;
        }
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{
var the_class = objj_getClass("CPRadio")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPRadio\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("initWithFrame:radioGroup:cell:"), function $CPRadio__initWithFrame_radioGroup_cell_(self, _cmd, aFrame, aRadioGroup, aCell)
{
    self = (self == null ? null : self.isa.objj_msgSend2(self, "initWithFrame:radioGroup:", aFrame, aRadioGroup));
    if (self)
    {
        (self == null ? null : self.isa.objj_msgSend1(self, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
        (self == null ? null : self.isa.objj_msgSend1(self, "setTitle:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "title"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setBackgroundColor:", CPColor.isa.objj_msgSend0(CPColor, "clearColor")));
        (self == null ? null : self.isa.objj_msgSend1(self, "setFont:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "font"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setAlignment:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "alignment"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setLineBreakMode:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "lineBreakMode"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setImagePosition:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "imagePosition"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setKeyEquivalent:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "keyEquivalent"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setKeyEquivalentModifierMask:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "keyEquivalentModifierMask"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setAllowsMixedState:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "allowsMixedState"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setObjectValue:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "objectValue"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setEnabled:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "isEnabled"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setTag:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "tag"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setControlSize:", (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "controlSize"))));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustWidthSize"));
    }
    return self;
}
,["id","CGRect","CPRadioGroup","NSButtonCell"]), new objj_method(sel_getUid("_adjustWidthSize"), function $CPRadio___adjustWidthSize(self, _cmd)
{
    var frameSize = self.isa.objj_msgSend0(self, "frameSize"),
        frameAdjustment = self.isa.objj_msgSend0(self, "_nib2CibAdjustment");
    if (frameAdjustment)
    {
        var finalFrameSize = CGSizeMake(frameSize.width + frameAdjustment.size.width, frameSize.height);
        self.isa.objj_msgSend1(self, "setFrameSize:", finalFrameSize);
    }
}
,["void"])]);
}p;8;NSMenu.jt;2315;@STATIC;1.0;I;15;AppKit/CPMenu.jt;2276;objj_executeFile("AppKit/CPMenu.j", NO);NS_CPMenuNameMap = {_NSMainMenu: "_CPMainMenu", _NSAppleMenu: "_CPApplicationMenu", _NSServicesMenu: "_CPServicesMenu", _NSWindowsMenu: "_CPWindowsMenu", _NSFontMenu: "_CPFontMenu", _NSRecentDocumentsMenu: "_CPRecentDocumentsMenu", _NSOpenDocumentsMenu: "_CPOpenDocumentsMenu"};
{
var the_class = objj_getClass("CPMenu")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPMenu\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPMenu__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPMenu").super_class }, "init");
    if (self)
    {
        self._title = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTitle"));
        self._items = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMenuItems"));
        self._name = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSName"));
        var mappedName = NS_CPMenuNameMap[self._name];
        if (mappedName)
            self._name = mappedName;
        self._showsStateColumn = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSMenuExcludeMarkColumn")) || !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSMenuExcludeMarkColumn"));
        self._autoenablesItems = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSNoAutoenable")) || !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSNoAutoenable"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPMenu, "NSMenu"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMenu__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSMenu__classForKeyedArchiver(self, _cmd)
{
    return CPMenu.isa.objj_msgSend0(CPMenu, "class");
}
,["Class"])]);
}p;12;NSMenuItem.jt;3732;@STATIC;1.0;I;19;AppKit/CPMenuItem.ji;10;NSButton.ji;9;NSEvent.ji;8;NSMenu.jt;3649;objj_executeFile("AppKit/CPMenuItem.j", NO);objj_executeFile("NSButton.j", YES);objj_executeFile("NSEvent.j", YES);objj_executeFile("NSMenu.j", YES);{
var the_class = objj_getClass("CPMenuItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPMenuItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPMenuItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPMenuItem").super_class }, "init");
    if (self)
    {
        self._isSeparator = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsSeparator"));
        self._title = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTitle"));
        self._target = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTarget"));
        self._action = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAction"));
        self._isEnabled = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsDisabled"));
        self._isHidden = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsHidden"));
        self._tag = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTag"));
        self._state = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSState"));
        self._image = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSImage"));
        self._submenu = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSubmenu"));
        self._menu = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMenu"));
        self._keyEquivalent = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyEquiv"));
        self._keyEquivalentModifierMask = CP_NSMapKeyMask((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyEquivModMask")));
        self._indentationLevel = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSIndent"));
        self._representedObject = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRepObject"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("swapCellsForParents:"), function $CPMenuItem__swapCellsForParents_(self, _cmd, parentsForCellUIDs)
{
    var target = self.isa.objj_msgSend0(self, "target");
    if (!target)
        return;
    var parent = parentsForCellUIDs[((___r1 = self.isa.objj_msgSend0(self, "target")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "UID"))];
    if (parent)
        self.isa.objj_msgSend1(self, "setTarget:", parent);
    var ___r1;
}
,["void","JSObject"])]);
}{var the_class = objj_allocateClassPair(CPMenuItem, "NSMenuItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMenuItem__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSMenuItem__classForKeyedArchiver(self, _cmd)
{
    return CPMenuItem.isa.objj_msgSend0(CPMenuItem, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSButtonCell, "NSMenuItemCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;17;NSMutableString.jt;493;@STATIC;1.0;I;21;Foundation/CPObject.jt;449;objj_executeFile("Foundation/CPObject.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSMutableString"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSMutableString__initWithCoder_(self, _cmd, aCoder)
{
    return (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.string"));
}
,["id","CPCoder"])]);
}p;7;NSNib.jt;1667;@STATIC;1.0;I;14;AppKit/CPCib.jt;1629;objj_executeFile("AppKit/CPCib.j", NO);var FILE = require("file"),
    OS = require("os"),
    UUID = require("uuid");
{
var the_class = objj_getClass("CPCib")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCib\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCib__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCib").super_class }, "init");
    var nibPath = "/tmp/" + UUID.uuid() + ".nib",
        data = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNibFileData"));
    FILE.write(nibPath, data.bytes(), {charset: "UTF-16"});
    var converter = ((___r1 = (Converter == null ? null : Converter.isa.objj_msgSend0(Converter, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithInputPath:outputPath:", nibPath, nil));
    self._data = (converter == null ? null : converter.isa.objj_msgSend0(converter, "convert"));
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCib, "NSNib"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNib__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNib__classForKeyedArchiver(self, _cmd)
{
    return CPCib.isa.objj_msgSend0(CPCib, "class");
}
,["Class"])]);
}p;16;NSNibConnector.jt;11260;@STATIC;1.0;I;30;AppKit/CPCibBindingConnector.jI;23;AppKit/CPCibConnector.jI;30;AppKit/CPCibControlConnector.jI;29;AppKit/CPCibOutletConnector.jI;40;AppKit/CPCibRuntimeAttributesConnector.jI;27;AppKit/CPCibHelpConnector.jI;26;AppKit/CPKeyValueBinding.jt;11000;objj_executeFile("AppKit/CPCibBindingConnector.j", NO);objj_executeFile("AppKit/CPCibConnector.j", NO);objj_executeFile("AppKit/CPCibControlConnector.j", NO);objj_executeFile("AppKit/CPCibOutletConnector.j", NO);objj_executeFile("AppKit/CPCibRuntimeAttributesConnector.j", NO);objj_executeFile("AppKit/CPCibHelpConnector.j", NO);objj_executeFile("AppKit/CPKeyValueBinding.j", NO);NIB_CONNECTION_EQUIVALENCY_TABLE = {};
{
var the_class = objj_getClass("CPCibConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibConnector").super_class }, "init");
    if (self)
    {
        self._source = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSource"));
        self._destination = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDestination"));
        self._label = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSLabel"));
        var sourceUID = ((___r1 = self._source), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "UID")),
            destinationUID = ((___r1 = self._destination), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "UID"));
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
            CPLog.debug("NSNibConnector: connection: " + ((___r1 = self._source), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")) + " " + ((___r1 = self._destination), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")) + " " + self._label);
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibConnector, "NSNibConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibConnector.isa.objj_msgSend0(CPCibConnector, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(CPCibControlConnector, "NSNibControlConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibControlConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibControlConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibControlConnector.isa.objj_msgSend0(CPCibControlConnector, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(CPCibOutletConnector, "NSNibOutletConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibOutletConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibOutletConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibOutletConnector.isa.objj_msgSend0(CPCibOutletConnector, "class");
}
,["Class"])]);
}var NSTransformers = CPSet.isa.objj_msgSend(CPSet, "setWithObjects:", "NSNegateBoolean", "NSIsNil", "NSIsNotNil", "NSUnarchiveFromData", "NSKeyedUnarchiveFromData");
{
var the_class = objj_getClass("CPCibBindingConnector")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPCibBindingConnector\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPCibBindingConnector__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPCibBindingConnector").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._binding = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBinding"));
        self._keyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyPath"));
        self._options = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        var NSOptions = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSOptions")),
            keyEnumerator = (NSOptions == null ? null : NSOptions.isa.objj_msgSend0(NSOptions, "keyEnumerator")),
            key;
        while ((key = (keyEnumerator == null ? null : keyEnumerator.isa.objj_msgSend0(keyEnumerator, "nextObject"))) !== nil)
        {
            var CPKey = "CP" + key.substring(2),
                NSValue = (NSOptions == null ? null : NSOptions.isa.objj_msgSend1(NSOptions, "objectForKey:", key));
            if (CPKey === CPValueTransformerNameBindingOption && (NSTransformers == null ? null : NSTransformers.isa.objj_msgSend1(NSTransformers, "containsObject:", NSValue)))
                NSValue = "CP" + NSValue.substring(2);
            ((___r1 = self._options), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setObject:forKey:", NSValue, CPKey));
        }
        CPLog.debug("NSNibConnector: binding connector: " + ((___r1 = self._binding), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")) + " to: " + self._destination + " " + ((___r1 = self._keyPath), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")) + " " + ((___r1 = self._options), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibBindingConnector, "NSNibBindingConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNibBindingConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNibBindingConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibBindingConnector.isa.objj_msgSend0(CPCibBindingConnector, "class");
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
        self._source = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSObject"));
        self._keyPaths = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKeyPaths"));
        self._values = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSValues"));
        var count = ((___r1 = self._keyPaths), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "count"));
        CPLog.debug("NSNibConnector: runtime attributes connector: " + ((___r1 = self._source), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")));
        while (count--)
        {
            var value = self._values[count],
                type = typeof value === "boolean" ? "BOOL" : (value == null ? null : value.isa.objj_msgSend0(value, "className"));
            CPLog.debug("   %s (%s): %s", self._keyPaths[count], type, value);
        }
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibRuntimeAttributesConnector, "NSIBUserDefinedRuntimeAttributesConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBUserDefinedRuntimeAttributesConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBUserDefinedRuntimeAttributesConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibRuntimeAttributesConnector.isa.objj_msgSend0(CPCibRuntimeAttributesConnector, "class");
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
        self._destination = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDestination"));
        self._file = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFile"));
        self._marker = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMarker"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPCibHelpConnector, "NSIBHelpConnector"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSIBHelpConnector__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSIBHelpConnector__classForKeyedArchiver(self, _cmd)
{
    return CPCibHelpConnector.isa.objj_msgSend0(CPCibHelpConnector, "class");
}
,["Class"])]);
}p;8;NSNull.jt;591;@STATIC;1.0;I;19;Foundation/CPNull.jt;549;objj_executeFile("Foundation/CPNull.j", NO);{var the_class = objj_allocateClassPair(CPNull, "NSNull"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNull__initWithCoder_(self, _cmd, aCoder)
{
    return CPNull.isa.objj_msgSend0(CPNull, "null");
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNull__classForKeyedArchiver(self, _cmd)
{
    return CPNull.isa.objj_msgSend0(CPNull, "class");
}
,["Class"])]);
}p;19;NSNumberFormatter.jt;2091;@STATIC;1.0;I;30;Foundation/CPNumberFormatter.jt;2037;objj_executeFile("Foundation/CPNumberFormatter.j", NO);{
var the_class = objj_getClass("CPNumberFormatter")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPNumberFormatter\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPNumberFormatter__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend0(self, "init"));
    if (self)
    {
        var attributes = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.attributes"));
        (self == null ? null : self.isa.objj_msgSend1(self, "setNumberStyle:", (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "numberStyle")) || CPNumberFormatterNoStyle));
        if ((attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "containsKey:", "minimum")))
            (self == null ? null : self.isa.objj_msgSend1(self, "setMinimum:", (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "minimum"))));
        if ((attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "containsKey:", "maximum")))
            (self == null ? null : self.isa.objj_msgSend1(self, "setMaximum:", (attributes == null ? null : attributes.isa.objj_msgSend1(attributes, "valueForKey:", "maximum"))));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPNumberFormatter, "NSNumberFormatter"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSNumberFormatter__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSNumberFormatter__classForKeyedArchiver(self, _cmd)
{
    return CPNumberFormatter.isa.objj_msgSend0(CPNumberFormatter, "class");
}
,["Class"])]);
}p;20;NSObjectController.jt;1963;@STATIC;1.0;I;27;AppKit/CPObjectController.jt;1912;objj_executeFile("AppKit/CPObjectController.j", NO);{
var the_class = objj_getClass("CPObjectController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPObjectController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPObjectController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPObjectController").super_class }, "init");
    if (self)
    {
        self._declaredKeys = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDeclaredKeys"));
        var className = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSObjectClassName"));
        if (className)
            self._objectClassName = CP_NSMapClassName(className);
        else
            self._objectClass = CPMutableDictionary.isa.objj_msgSend0(CPMutableDictionary, "class");
        self._isEditable = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSEditable"));
        self._automaticallyPreparesContent = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAutomaticallyPreparesContent"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPObjectController, "NSObjectController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSObjectController__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSObjectController__classForKeyedArchiver(self, _cmd)
{
    return CPObjectController.isa.objj_msgSend0(CPObjectController, "class");
}
,["Class"])]);
}p;15;NSOutlineView.jt;2590;@STATIC;1.0;I;22;AppKit/CPOutlineView.jt;2544;objj_executeFile("AppKit/CPOutlineView.j", NO);{
var the_class = objj_getClass("CPOutlineView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPOutlineView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPOutlineView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPOutlineView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSOutlineViewOutlineTableColumnKey")))
            self._outlineTableColumn = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSOutlineViewOutlineTableColumnKey"));
        else
            self._outlineTableColumn = ((___r1 = (self == null ? null : self.isa.objj_msgSend0(self, "tableColumns"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectAtIndex:", 0));
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSOutlineViewIndentationPerLevelKey")))
            self._indentationPerLevel = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSOutlineViewIndentationPerLevelKey"));
        else
            self._indentationPerLevel = 16;
        self._outlineViewDataSource = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDataSource"));
        self._outlineViewDelegate = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDelegate"));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPOutlineView, "NSOutlineView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSOutlineView__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSOutlineView__classForKeyedArchiver(self, _cmd)
{
    return CPOutlineView.isa.objj_msgSend0(CPOutlineView, "class");
}
,["Class"])]);
}p;11;NSPopover.jt;1495;@STATIC;1.0;I;18;AppKit/CPPopover.jt;1453;objj_executeFile("AppKit/CPPopover.j", NO);{
var the_class = objj_getClass("CPPopover")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPopover\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPopover__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopover").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._behavior = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSBehavior"));
        self._appearance = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSAppearance"));
        self._animates = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAnimates"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPopover, "NSPopover"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPopover__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPopover__classForKeyedArchiver(self, _cmd)
{
    return CPPopover.isa.objj_msgSend0(CPPopover, "class");
}
,["Class"])]);
}p;15;NSPopUpButton.jt;3955;@STATIC;1.0;I;22;AppKit/CPPopUpButton.ji;8;NSMenu.ji;12;NSMenuItem.jt;3880;objj_executeFile("AppKit/CPPopUpButton.j", NO);objj_executeFile("NSMenu.j", YES);objj_executeFile("NSMenuItem.j", YES);{
var the_class = objj_getClass("CPPopUpButton")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPopUpButton\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPopUpButton__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopUpButton").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPPopUpButton__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPopUpButton").super_class }, "NS_initWithCell:", cell);
    self._menu = (cell == null ? null : cell.isa.objj_msgSend0(cell, "menu"));
    self.isa.objj_msgSend1(self, "setPullsDown:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "pullsDown")));
    self._preferredEdge = (cell == null ? null : cell.isa.objj_msgSend0(cell, "preferredEdge"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPPopUpButton, "NSPopUpButton"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPopUpButton__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPopUpButton__classForKeyedArchiver(self, _cmd)
{
    return CPPopUpButton.isa.objj_msgSend0(CPPopUpButton, "class");
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
        self.pullsDown = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSPullDown"));
        self.selectedIndex = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSelectedIndex"));
        self.preferredEdge = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPreferredEdge"));
        self.menu = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSMenu"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("objectValue"), function $NSPopUpButtonCell__objectValue(self, _cmd)
{
    return self.selectedIndex;
}
,["CPUInteger"])]);
}p;19;NSPredicateEditor.jt;4016;@STATIC;1.0;I;26;AppKit/CPPredicateEditor.jt;3966;objj_executeFile("AppKit/CPPredicateEditor.j", NO);{
var the_class = objj_getClass("CPPredicateEditor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPPredicateEditor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPPredicateEditor__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPPredicateEditor").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._allTemplates = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSPredicateTemplates"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPredicateEditor, "NSPredicateEditor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPredicateEditor__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPredicateEditor__classForKeyedArchiver(self, _cmd)
{
    return CPPredicateEditor.isa.objj_msgSend0(CPPredicateEditor, "class");
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
        self._templateType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPredicateTemplateType"));
        self._predicateOptions = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPredicateTemplateOptions"));
        self._predicateModifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPredicateTemplateModifier"));
        self._leftAttributeType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPredicateTemplateLeftAttributeType"));
        self._rightAttributeType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSPredicateTemplateRightAttributeType"));
        self._leftIsWildcard = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSPredicateTemplateLeftIsWildcard"));
        self._rightIsWildcard = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSPredicateTemplateRightIsWildcard"));
        self._views = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSPredicateTemplateViews"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPPredicateEditorRowTemplate, "NSPredicateEditorRowTemplate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSPredicateEditorRowTemplate__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSPredicateEditorRowTemplate__classForKeyedArchiver(self, _cmd)
{
    return CPPredicateEditorRowTemplate.isa.objj_msgSend0(CPPredicateEditorRowTemplate, "class");
}
,["Class"])]);
}p;21;NSProgressIndicator.jt;2978;@STATIC;1.0;I;28;AppKit/CPProgressIndicator.jt;2926;objj_executeFile("AppKit/CPProgressIndicator.j", NO);var NSProgressIndicatorSpinningFlag = 1 << 12;
{
var the_class = objj_getClass("CPProgressIndicator")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPProgressIndicator\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPProgressIndicator__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPProgressIndicator").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var NS_flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSpiFlags"));
        self._minValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMinValue"));
        self._maxValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMaxValue"));
        self._style = NS_flags & NSProgressIndicatorSpinningFlag ? CPProgressIndicatorSpinningStyle : CPProgressIndicatorBarStyle;
        self._indeterminate = NS_flags & 2 ? YES : NO;
        self._isDisplayedWhenStopped = NS_flags & 8192 ? NO : YES;
        self._controlSize = NS_flags & 256 ? CPSmallControlSize : CPRegularControlSize;
        if (self._style === CPProgressIndicatorSpinningStyle)
        {
            self._controlSize = self._controlSize == CPRegularControlSize ? CPSmallControlSize : CPMiniControlSize;
        }
        self._doubleValue = 0.0;
        var currentFrameSize = (self == null ? null : self.isa.objj_msgSend0(self, "frameSize"));
        if (self._style !== CPProgressIndicatorSpinningStyle)
        {
            var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme")),
                height = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "default-height", CPProgressIndicator));
            currentFrameSize.height = height;
        }
        (self == null ? null : self.isa.objj_msgSend1(self, "setFrameSize:", currentFrameSize));
        (self == null ? null : self.isa.objj_msgSend0(self, "updateBackgroundColor"));
        (self == null ? null : self.isa.objj_msgSend0(self, "drawBar"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPProgressIndicator, "NSProgressIndicator"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSProgressIndicator__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSProgressIndicator__classForKeyedArchiver(self, _cmd)
{
    return CPProgressIndicator.isa.objj_msgSend0(CPProgressIndicator, "class");
}
,["Class"])]);
}p;13;NSResponder.jt;1309;@STATIC;1.0;I;20;AppKit/CPResponder.jt;1265;objj_executeFile("AppKit/CPResponder.j", NO);{
var the_class = objj_getClass("CPResponder")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPResponder\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPResponder__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPResponder").super_class }, "init");
    if (self)
        (self == null ? null : self.isa.objj_msgSend1(self, "setNextResponder:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNextResponder"))));
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPResponder, "NSResponder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSResponder__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSResponder__classForKeyedArchiver(self, _cmd)
{
    return CPResponder.isa.objj_msgSend0(CPResponder, "class");
}
,["Class"])]);
}p;14;NSRuleEditor.jt;5289;@STATIC;1.0;I;21;AppKit/CPRuleEditor.jI;20;AppKit/CPTextField.ji;8;NSCell.ji;11;NSControl.jt;5191;objj_executeFile("AppKit/CPRuleEditor.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPRuleEditor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPRuleEditor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPRuleEditor__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPRuleEditor").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._alignmentGridWidth = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSRuleEditorAlignmentGridWidth"));
        self._sliceHeight = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSRuleEditorSliceHeight"));
        self._stringsFilename = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorStringsFileName"));
        self._editable = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSRuleEditorEditable"));
        self._allowsEmptyCompoundRows = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSRuleEditorAllowsEmptyCompoundRows"));
        self._disallowEmpty = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSRuleEditorDisallowEmpty"));
        self._nestingMode = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSRuleEditorNestingMode"));
        self._typeKeyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorRowTypeKeyPath"));
        self._itemsKeyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorItemsKeyPath"));
        self._valuesKeyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorValuesKeyPath"));
        self._subrowsArrayKeyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorSubrowsArrayKeyPath"));
        self._boundArrayKeyPath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorBoundArrayKeyPath"));
        self._boundArrayOwner = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorBoundArrayOwner"));
        self._slices = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorSlices"));
        self._ruleDelegate = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRuleEditorDelegate"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPRuleEditor, "NSRuleEditor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSRuleEditor__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSRuleEditor__classForKeyedArchiver(self, _cmd)
{
    return CPRuleEditor.isa.objj_msgSend0(CPRuleEditor, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPRuleEditorViewSliceHolder, "_NSRuleEditorViewSliceHolder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $_NSRuleEditorViewSliceHolder__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSRuleEditorViewSliceHolder__classForKeyedArchiver(self, _cmd)
{
    return _CPRuleEditorViewSliceHolder.isa.objj_msgSend0(_CPRuleEditorViewSliceHolder, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(_CPRuleEditorViewUnboundRowHolder, "_NSRuleEditorViewUnboundRowHolder"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $_NSRuleEditorViewUnboundRowHolder__initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("_NSRuleEditorViewUnboundRowHolder").super_class }, "init"))
        self.boundArray = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBoundArray"));
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $_NSRuleEditorViewUnboundRowHolder__classForKeyedArchiver(self, _cmd)
{
    return _CPRuleEditorViewUnboundRowHolder.isa.objj_msgSend0(_CPRuleEditorViewUnboundRowHolder, "class");
}
,["Class"])]);
}p;12;NSScroller.jt;2969;@STATIC;1.0;I;19;AppKit/CPScroller.jt;2926;objj_executeFile("AppKit/CPScroller.j", NO);{
var the_class = objj_getClass("CPScroller")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPScroller\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPScroller__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPScroller").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._controlSize = CPRegularControlSize;
        self._knobProportion = 1.0;
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSPercent")))
            self._knobProportion = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSPercent"));
        self._value = 0.0;
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSCurValue")))
            self._value = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSCurValue"));
        self._isVertical = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSsFlags")) !== 1;
        if (CPStringFromSelector((self == null ? null : self.isa.objj_msgSend0(self, "action"))) === "_doScroller:")
            if (self._isVertical)
                (self == null ? null : self.isa.objj_msgSend1(self, "setAction:", sel_getUid("_verticalScrollerDidScroll:")));
            else
                (self == null ? null : self.isa.objj_msgSend1(self, "setAction:", sel_getUid("_horizontalScrollerDidScroll:")));
        self._partRects = [];
        if (self._isVertical)
            (self == null ? null : self.isa.objj_msgSend1(self, "setFrameSize:", CGSizeMake(15.0, CGRectGetHeight((self == null ? null : self.isa.objj_msgSend0(self, "frame"))))));
        else
            (self == null ? null : self.isa.objj_msgSend1(self, "setFrameSize:", CGSizeMake(CGRectGetWidth((self == null ? null : self.isa.objj_msgSend0(self, "frame"))), 15.0)));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPScroller, "NSScroller"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSScroller__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSScroller__classForKeyedArchiver(self, _cmd)
{
    return CPScroller.isa.objj_msgSend0(CPScroller, "class");
}
,["Class"])]);
}p;14;NSScrollView.jt;2819;@STATIC;1.0;I;21;AppKit/CPScrollView.jt;2774;objj_executeFile("AppKit/CPScrollView.j", NO);{
var the_class = objj_getClass("CPScrollView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPScrollView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPScrollView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPScrollView").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSsFlags"));
        self._verticalScroller = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSVScroller"));
        self._horizontalScroller = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSHScroller"));
        self._contentView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSContentView"));
        self._headerClipView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSHeaderClipView"));
        self._cornerView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCornerView"));
        self._bottomCornerView = ((___r1 = CPView.isa.objj_msgSend0(CPView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));
        (self == null ? null : self.isa.objj_msgSend1(self, "addSubview:", self._bottomCornerView));
        self._scrollerKnobStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSScrollerKnobStyle"));
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
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPScrollView, "NSScrollView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSScrollView__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSScrollView__classForKeyedArchiver(self, _cmd)
{
    return CPScrollView.isa.objj_msgSend0(CPScrollView, "class");
}
,["Class"])]);
}p;15;NSSearchField.jt;5110;@STATIC;1.0;I;22;AppKit/CPSearchField.ji;13;NSTextField.jt;5046;objj_executeFile("AppKit/CPSearchField.j", NO);objj_executeFile("NSTextField.j", YES);{
var the_class = objj_getClass("CPSearchField")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSearchField\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSearchField__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSearchField").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPSearchField__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSearchField").super_class }, "NS_initWithCell:", cell);
    self.isa.objj_msgSend1(self, "setRecentsAutosaveName:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "recentsAutosaveName")));
    self.isa.objj_msgSend1(self, "setMaximumRecents:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "maximumRecents")));
    self.isa.objj_msgSend1(self, "setSendsWholeSearchString:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "sendsWholeSearchString")));
    self.isa.objj_msgSend1(self, "setSendsSearchStringImmediately:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "sendsSearchStringImmediately")));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSearchField, "NSSearchField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSearchField__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSearchField__classForKeyedArchiver(self, _cmd)
{
    return CPSearchField.isa.objj_msgSend0(CPSearchField, "class");
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
        self._recentsAutosaveName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSRecentsAutosaveName"));
        self._maximumRecents = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSMaximumRecents"));
        self._sendsWholeSearchString = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSendsWholeSearchString"));
        self._sendsSearchStringImmediately = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBytesForKey:", "NSSearchFieldFlags")) ? YES : NO;
    }
    return self;
}
,["id","CPCoder"])]);
}p;19;NSSecureTextField.jt;1243;@STATIC;1.0;I;26;AppKit/CPSecureTextField.ji;13;NSTextField.jt;1175;objj_executeFile("AppKit/CPSecureTextField.j", NO);objj_executeFile("NSTextField.j", YES);{var the_class = objj_allocateClassPair(CPSecureTextField, "NSSecureTextField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSecureTextField__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSecureTextField__classForKeyedArchiver(self, _cmd)
{
    return CPSecureTextField.isa.objj_msgSend0(CPSecureTextField, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSTextFieldCell, "NSSecureTextFieldCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;20;NSSegmentedControl.jt;6674;@STATIC;1.0;I;27;AppKit/CPSegmentedControl.ji;8;NSCell.jt;6611;objj_executeFile("AppKit/CPSegmentedControl.j", NO);objj_executeFile("NSCell.j", YES);{
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
    self._segments = (cell == null ? null : cell.isa.objj_msgSend0(cell, "segments"));
    self._selectedSegment = (cell == null ? null : cell.isa.objj_msgSend0(cell, "selectedSegment"));
    self._segmentStyle = (cell == null ? null : cell.isa.objj_msgSend0(cell, "segmentStyle"));
    self._trackingMode = (cell == null ? null : cell.isa.objj_msgSend0(cell, "trackingMode"));
    self.isa.objj_msgSend2(self, "setValue:forThemeAttribute:", CPCenterTextAlignment, "alignment");
    for (var i = 0; i < self._segments.length; i++)
    {
        self._themeStates[i] = self._segments[i].selected ? CPThemeStateSelected : CPThemeStateNormal;
        self.isa.objj_msgSend1(self, "tileWithChangedSegment:", i);
    }
    self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled")));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSegmentedControl, "NSSegmentedControl"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSegmentedControl__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSegmentedControl__classForKeyedArchiver(self, _cmd)
{
    return CPSegmentedControl.isa.objj_msgSend0(CPSegmentedControl, "class");
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
        self._segments = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSegmentImages"));
        self._selectedSegment = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSelectedSegment"));
        if (self._selectedSegment === nil)
            self._selectedSegment = -1;
        self._segmentStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSegmentStyle"));
        self._trackingMode = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTrackingMode"));
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
        self.image = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSegmentItemImage"));
        self.label = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSegmentItemLabel"));
        self.menu = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSegmentItemMenu"));
        self.selected = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSegmentItemSelected"));
        self.enabled = !(aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSegmentItemDisabled"));
        self.tag = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSegmentItemTag"));
        self.width = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSegmentItemWidth"));
        self.frame = CGRectMakeZero();
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPSegmentItem, "NSSegmentItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSegmentItem__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSegmentItem__classForKeyedArchiver(self, _cmd)
{
    return _CPSegmentItem.isa.objj_msgSend0(_CPSegmentItem, "class");
}
,["Class"])]);
}p;7;NSSet.jt;808;@STATIC;1.0;I;21;Foundation/CPObject.jI;18;Foundation/CPSet.jt;741;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPSet.j", NO);{var the_class = objj_allocateClassPair(CPObject, "NSSet"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSet__initWithCoder_(self, _cmd, aCoder)
{
    return ((___r1 = CPSet.isa.objj_msgSend0(CPSet, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithArray:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.objects"))));
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(NSSet, "NSMutableSet"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;10;NSSlider.jt;4805;@STATIC;1.0;I;17;AppKit/CPSlider.ji;8;NSCell.jt;4752;objj_executeFile("AppKit/CPSlider.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPSlider")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSlider\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSlider__NS_initWithCoder_(self, _cmd, aCoder)
{
    var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
    self._minValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "minValue"));
    self._maxValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "maxValue"));
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSlider").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPSlider__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSlider").super_class }, "NS_initWithCell:", cell);
    self._altIncrementValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "altIncrementValue"));
    self.isa.objj_msgSend1(self, "setSliderType:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "sliderType")));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPSlider, "NSSlider"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSlider__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
        var frame = (self == null ? null : self.isa.objj_msgSend0(self, "frame"));
        if ((self == null ? null : self.isa.objj_msgSend0(self, "sliderType")) === CPCircularSlider)
            (self == null ? null : self.isa.objj_msgSend1(self, "setFrameSize:", CGSizeMake(frame.size.width + 2.0, frame.size.height + 2.0)));
        else
            (self == null ? null : self.isa.objj_msgSend1(self, "setFrame:", CGRectMake(frame.origin.x + 2, frame.origin.y, frame.size.width - 4, frame.size.height)));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSlider__classForKeyedArchiver(self, _cmd)
{
    return CPSlider.isa.objj_msgSend0(CPSlider, "class");
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
        self._objectValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSValue"));
        self._minValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMinValue"));
        self._maxValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMaxValue"));
        self._altIncrementValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSAltIncValue"));
        self._isVertical = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSVertical"));
        self._sliderType = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSSliderType"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;18;NSSortDescriptor.jt;1572;@STATIC;1.0;I;29;Foundation/CPSortDescriptor.jt;1519;objj_executeFile("Foundation/CPSortDescriptor.j", NO);{
var the_class = objj_getClass("CPSortDescriptor")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSortDescriptor\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSortDescriptor__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSortDescriptor").super_class }, "init"))
    {
        self._key = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSKey"));
        self._selector = CPSelectorFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSelector")));
        self._ascending = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAscending"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPSortDescriptor, "NSSortDescriptor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSortDescriptor__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSortDescriptor__classForKeyedArchiver(self, _cmd)
{
    return CPSortDescriptor.isa.objj_msgSend0(CPSortDescriptor, "class");
}
,["Class"])]);
}p;13;NSSplitView.jt;1580;@STATIC;1.0;I;20;AppKit/CPSplitView.jt;1536;objj_executeFile("AppKit/CPSplitView.j", NO);var NSThinDividerStyle = 2;
{
var the_class = objj_getClass("CPSplitView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPSplitView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPSplitView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPSplitView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._isVertical = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsVertical"));
        self._isPaneSplitter = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSDividerStyle")) != NSThinDividerStyle;
        self._autosaveName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAutosaveName"));
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPSplitView, "NSSplitView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSSplitView__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSSplitView__classForKeyedArchiver(self, _cmd)
{
    return CPSplitView.isa.objj_msgSend0(CPSplitView, "class");
}
,["Class"])]);
}p;11;NSStepper.jt;4315;@STATIC;1.0;I;18;AppKit/CPStepper.ji;8;NSCell.jt;4261;objj_executeFile("AppKit/CPStepper.j", NO);objj_executeFile("NSCell.j", YES);{
var the_class = objj_getClass("CPStepper")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPStepper\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPStepper__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPStepper").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPStepper__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPStepper").super_class }, "NS_initWithCell:", cell);
    self._minValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "minValue"));
    self._maxValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "maxValue"));
    self._increment = (cell == null ? null : cell.isa.objj_msgSend0(cell, "increment"));
    self._valueWraps = (cell == null ? null : cell.isa.objj_msgSend0(cell, "valueWraps"));
    self._autorepeat = (cell == null ? null : cell.isa.objj_msgSend0(cell, "autorepeat"));
    self._objectValue = (cell == null ? null : cell.isa.objj_msgSend0(cell, "objectValue"));
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPStepper, "NSStepper"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSStepper__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSStepper__classForKeyedArchiver(self, _cmd)
{
    return CPStepper.isa.objj_msgSend0(CPStepper, "class");
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
        self._objectValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSValue"));
        self._minValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMinValue"));
        self._maxValue = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSMaxValue"));
        self._increment = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeDoubleForKey:", "NSIncrement"));
        self._valueWraps = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSValueWraps"));
        self._autorepeat = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSAutorepeat"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;17;NSTableCellView.jt;1154;@STATIC;1.0;I;20;AppKit/CPTableView.jt;1110;objj_executeFile("AppKit/CPTableView.j", NO);{
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableCellView__classForKeyedArchiver(self, _cmd)
{
    return CPTableCellView.isa.objj_msgSend0(CPTableCellView, "class");
}
,["Class"])]);
}p;15;NSTableColumn.jt;8617;@STATIC;1.0;I;25;AppKit/CPLevelIndicator.jI;22;AppKit/CPTableColumn.jI;26;AppKit/CPTableHeaderView.jI;17;AppKit/CPButton.ji;10;NSButton.ji;13;NSImageView.ji;18;NSLevelIndicator.ji;13;NSTextField.jt;8414;objj_executeFile("AppKit/CPLevelIndicator.j", NO);objj_executeFile("AppKit/CPTableColumn.j", NO);objj_executeFile("AppKit/CPTableHeaderView.j", NO);objj_executeFile("AppKit/CPButton.j", NO);objj_executeFile("NSButton.j", YES);objj_executeFile("NSImageView.j", YES);objj_executeFile("NSLevelIndicator.j", YES);objj_executeFile("NSTextField.j", YES);var IBDefaultFontSizeTableHeader = 11.0;
{
var the_class = objj_getClass("CPTableColumn")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableColumn\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableColumn__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend0(self, "init"));
    if (self)
    {
        self._identifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSIdentifier"));
        var dataViewCell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSDataCell")),
            viewClass = nil;
        if ((dataViewCell == null ? null : dataViewCell.isa.objj_msgSend1(dataViewCell, "isKindOfClass:", NSImageCell.isa.objj_msgSend0(NSImageCell, "class"))))
            viewClass = CPImageView;
        else if ((dataViewCell == null ? null : dataViewCell.isa.objj_msgSend1(dataViewCell, "isKindOfClass:", NSTextFieldCell.isa.objj_msgSend0(NSTextFieldCell, "class"))))
            viewClass = CPTextField;
        else if ((dataViewCell == null ? null : dataViewCell.isa.objj_msgSend1(dataViewCell, "isKindOfClass:", NSButtonCell.isa.objj_msgSend0(NSButtonCell, "class"))))
            viewClass = CPButton;
        else if ((dataViewCell == null ? null : dataViewCell.isa.objj_msgSend1(dataViewCell, "isKindOfClass:", NSLevelIndicatorCell.isa.objj_msgSend0(NSLevelIndicatorCell, "class"))))
            viewClass = CPLevelIndicator;
        if (viewClass)
            self._dataView = (self == null ? null : self.isa.objj_msgSend2(self, "makeDataViewOfClass:withCell:", viewClass, dataViewCell));
        ((___r1 = self._dataView), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setValue:forThemeAttribute:", (dataViewCell == null ? null : dataViewCell.isa.objj_msgSend0(dataViewCell, "alignment")), "alignment"));
        var headerCell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSHeaderCell")),
            headerView = ((___r1 = _CPTableColumnHeaderView.isa.objj_msgSend0(_CPTableColumnHeaderView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMakeZero())),
            theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme"));
        (headerView == null ? null : headerView.isa.objj_msgSend1(headerView, "setStringValue:", (headerCell == null ? null : headerCell.isa.objj_msgSend0(headerCell, "objectValue"))));
        (headerView == null ? null : headerView.isa.objj_msgSend1(headerView, "setFont:", (headerCell == null ? null : headerCell.isa.objj_msgSend0(headerCell, "font"))));
        (headerView == null ? null : headerView.isa.objj_msgSend1(headerView, "setAlignment:", (headerCell == null ? null : headerCell.isa.objj_msgSend0(headerCell, "alignment"))));
        if (((___r1 = (headerCell == null ? null : headerCell.isa.objj_msgSend0(headerCell, "font"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "familyName")) === IBDefaultFontFace && ((___r1 = (headerCell == null ? null : headerCell.isa.objj_msgSend0(headerCell, "font"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "size")) == IBDefaultFontSizeTableHeader)
        {
            (headerView == null ? null : headerView.isa.objj_msgSend1(headerView, "setTextColor:", (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "text-color", _CPTableColumnHeaderView))));
            (headerView == null ? null : headerView.isa.objj_msgSend1(headerView, "setFont:", (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "font", _CPTableColumnHeaderView))));
        }
        (self == null ? null : self.isa.objj_msgSend1(self, "setHeaderView:", headerView));
        self._width = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSWidth"));
        self._minWidth = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSMinWidth"));
        self._maxWidth = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSMaxWidth"));
        self._resizingMask = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSResizingMask"));
        self._isHidden = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSHidden"));
        self._isEditable = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSIsEditable"));
        self._sortDescriptorPrototype = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSortDescriptorPrototype"));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"]), new objj_method(sel_getUid("makeDataViewOfClass:withCell:"), function $CPTableColumn__makeDataViewOfClass_withCell_(self, _cmd, aClass, aCell)
{
    var dataView = ((___r1 = (aClass == null ? null : aClass.isa.objj_msgSend0(aClass, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMakeZero()));
    (dataView == null ? null : dataView.isa.objj_msgSend1(dataView, "setThemeState:", CPThemeStateTableDataView));
    (dataView == null ? null : dataView.isa.objj_msgSend1(dataView, "NS_initWithCell:", aCell));
    if (aClass === CPTextField)
    {
        ((___r1 = (Converter == null ? null : Converter.isa.objj_msgSend0(Converter, "sharedConverter"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "replaceFontForObject:", dataView));
        var textColor = (aCell == null ? null : aCell.isa.objj_msgSend0(aCell, "textColor")),
            defaultColor = self.isa.objj_msgSend2(self, "valueForDataViewThemeAttribute:inState:", "text-color", CPThemeStateNormal);
        if (!(textColor == null ? null : textColor.isa.objj_msgSend1(textColor, "isEqual:", defaultColor)))
        {
            var selectedColor = self.isa.objj_msgSend2(self, "valueForDataViewThemeAttribute:inState:", "text-color", CPThemeState(CPThemeStateTableDataView, CPThemeStateSelectedDataView));
            (dataView == null ? null : dataView.isa.objj_msgSend3(dataView, "setValue:forThemeAttribute:inState:", selectedColor, "text-color", CPThemeState(CPThemeStateTableDataView, CPThemeStateSelectedDataView)));
            (dataView == null ? null : dataView.isa.objj_msgSend3(dataView, "setValue:forThemeAttribute:inState:", textColor, "text-color", CPThemeState(CPThemeStateTableDataView, CPThemeStateSelectedDataView, CPThemeStateEditing)));
        }
    }
    return dataView;
    var ___r1;
}
,["id","Class","NSCell"]), new objj_method(sel_getUid("valueForDataViewThemeAttribute:inState:"), function $CPTableColumn__valueForDataViewThemeAttribute_inState_(self, _cmd, attribute, state)
{
    var themes = ((___r1 = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "sharedNib2Cib"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "themes"));
    for (var i = 0; i < themes.length; ++i)
    {
        var value = ((___r1 = themes[i]), ___r1 == null ? null : ___r1.isa.objj_msgSend3(___r1, "valueForAttributeWithName:inState:forClass:", attribute, state, CPTextField));
        if (value)
            return value;
    }
    return nil;
    var ___r1;
}
,["id","CPString","int"])]);
}{var the_class = objj_allocateClassPair(CPTableColumn, "NSTableColumn"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableColumn__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableColumn__classForKeyedArchiver(self, _cmd)
{
    return CPTableColumn.isa.objj_msgSend0(CPTableColumn, "class");
}
,["Class"])]);
}{var the_class = objj_allocateClassPair(NSActionCell, "NSTableHeaderCell"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
}p;19;NSTableHeaderView.jt;1798;@STATIC;1.0;I;26;AppKit/CPTableHeaderView.jt;1748;objj_executeFile("AppKit/CPTableHeaderView.j", NO);{
var the_class = objj_getClass("CPTableHeaderView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableHeaderView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableHeaderView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTableHeaderView").super_class }, "NS_initWithCoder:", aCoder))
    {
        self._tableView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTableView"));
        if (self._bounds.size.height === 17)
        {
            var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme")),
                height = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "default-row-height", CPTableView));
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableHeaderView__classForKeyedArchiver(self, _cmd)
{
    return CPTableHeaderView.isa.objj_msgSend0(CPTableHeaderView, "class");
}
,["Class"])]);
}p;13;NSTableView.jt;4693;@STATIC;1.0;I;20;AppKit/CPTableView.jt;4649;objj_executeFile("AppKit/CPTableView.j", NO);{
var the_class = objj_getClass("CPTableView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTableView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTableView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTableView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTvFlags"));
        self._rowHeight = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSRowHeight"));
        if (self._rowHeight == 17)
        {
            var theme = (Nib2Cib == null ? null : Nib2Cib.isa.objj_msgSend0(Nib2Cib, "defaultTheme")),
                height = (theme == null ? null : theme.isa.objj_msgSend2(theme, "valueForAttributeWithName:forClass:", "default-row-height", CPTableView));
            self._rowHeight = height;
        }
        self._headerView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSHeaderView"));
        self._cornerView = self._headerView ? (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCornerView")) : nil;
        ((___r1 = self._cornerView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setHidden:", NO));
        self._autosaveName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSAutosaveName"));
        self._tableColumns = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTableColumns"));
        ((___r1 = self._tableColumns), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "makeObjectsPerformSelector:withObject:", sel_getUid("setTableView:"), self));
        self._archivedDataViews = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTableViewArchivedReusableViewsKey"));
        self._intercellSpacing = CGSizeMake((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSIntercellSpacingWidth")), (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeFloatForKey:", "NSIntercellSpacingHeight")));
        (self == null ? null : self.isa.objj_msgSend2(self, "setValue:forThemeAttribute:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSGridColor")), "grid-color"));
        self._gridStyleMask = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSGridStyleMask"));
        self._usesAlternatingRowBackgroundColors = flags & 0x00800000 ? YES : NO;
        self._alternatingRowBackgroundColors = [CPColor.isa.objj_msgSend0(CPColor, "whiteColor"), CPColor.isa.objj_msgSend1(CPColor, "colorWithHexString:", "e4e7ff")];
        self._selectionHighlightStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTableViewSelectionHighlightStyle"));
        self._columnAutoResizingStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSColumnAutoresizingStyle"));
        self._allowsMultipleSelection = flags & 0x08000000 ? YES : NO;
        self._allowsEmptySelection = flags & 0x10000000 ? YES : NO;
        self._allowsColumnSelection = flags & 0x04000000 ? YES : NO;
        self._allowsColumnResizing = flags & 0x40000000 ? YES : NO;
        self._allowsColumnReordering = flags & 0x80000000 ? YES : NO;
        (self == null ? null : self.isa.objj_msgSend1(self, "setBackgroundColor:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBackgroundColor"))));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTableView, "NSTableView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTableView__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTableView__classForKeyedArchiver(self, _cmd)
{
    return CPTableView.isa.objj_msgSend0(CPTableView, "class");
}
,["Class"])]);
}p;11;NSTabView.jt;1822;@STATIC;1.0;I;18;AppKit/CPTabView.ji;15;NSTabViewItem.jt;1760;objj_executeFile("AppKit/CPTabView.j", NO);objj_executeFile("NSTabViewItem.j", YES);{
var the_class = objj_getClass("CPTabView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTabView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTabView__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTabView").super_class }, "NS_initWithCoder:", aCoder))
    {
        var flags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTvFlags"));
        self._type = flags & 0x7;
        self._items = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTabViewItems"));
        self._selectedIndex = ((___r1 = self._items), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "indexOfObject:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSelectedTabViewItem"))));
        self._font = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFont"));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPTabView, "NSTabView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTabView__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTabView__classForKeyedArchiver(self, _cmd)
{
    return CPTabView.isa.objj_msgSend0(CPTabView, "class");
}
,["Class"])]);
}p;15;NSTabViewItem.jt;1841;@STATIC;1.0;I;22;AppKit/CPTabViewItem.jt;1795;objj_executeFile("AppKit/CPTabViewItem.j", NO);{
var the_class = objj_getClass("CPTabViewItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTabViewItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTabViewItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTabViewItem").super_class }, "init"))
    {
        self._identifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSIdentifier"));
        self._label = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSLabel"));
        self._view = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSView"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("awakeFromNib"), function $CPTabViewItem__awakeFromNib(self, _cmd)
{
    if (((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "superview")))
        ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "removeFromSuperview"));
    var ___r1;
}
,["void"])]);
}{var the_class = objj_allocateClassPair(CPTabViewItem, "NSTabViewItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTabViewItem__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTabViewItem__classForKeyedArchiver(self, _cmd)
{
    return CPTabViewItem.isa.objj_msgSend0(CPTabViewItem, "class");
}
,["Class"])]);
}p;13;NSTextField.jt;6983;@STATIC;1.0;I;15;AppKit/CPFont.jI;20;AppKit/CPTextField.ji;8;NSCell.ji;11;NSControl.jt;6891;objj_executeFile("AppKit/CPFont.j", NO);objj_executeFile("AppKit/CPTextField.j", NO);objj_executeFile("NSCell.j", YES);objj_executeFile("NSControl.j", YES);{
var the_class = objj_getClass("CPTextField")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPTextField\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPTextField__NS_initWithCoder_(self, _cmd, aCoder)
{
    return objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTextField").super_class }, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_initWithCell:"), function $CPTextField__NS_initWithCell_(self, _cmd, cell)
{
    objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPTextField").super_class }, "NS_initWithCell:", cell);
    self.isa.objj_msgSend1(self, "setEditable:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEditable")));
    self.isa.objj_msgSend1(self, "setEnabled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isEnabled")));
    self.isa.objj_msgSend1(self, "setSelectable:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isSelectable")));
    self.isa.objj_msgSend1(self, "setSendsActionOnEndEditing:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "sendsActionOnEndEditing")));
    self.isa.objj_msgSend1(self, "setBordered:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isBordered")));
    self.isa.objj_msgSend1(self, "setBezeled:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "isBezeled")));
    self.isa.objj_msgSend1(self, "setBezelStyle:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "bezelStyle")));
    self.isa.objj_msgSend1(self, "setDrawsBackground:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "drawsBackground")));
    self.isa.objj_msgSend1(self, "setLineBreakMode:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "lineBreakMode")));
    self.isa.objj_msgSend1(self, "setAlignment:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "alignment")));
    self.isa.objj_msgSend1(self, "setTextFieldBackgroundColor:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "backgroundColor")));
    self.isa.objj_msgSend1(self, "setPlaceholderString:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "placeholderString")));
    self.isa.objj_msgSend1(self, "_setUsesSingleLineMode:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "usesSingleLineMode")));
    self.isa.objj_msgSend1(self, "_setWraps:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "wraps")));
    self.isa.objj_msgSend1(self, "_setScrolls:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "scrolls")));
    var textColor = (cell == null ? null : cell.isa.objj_msgSend0(cell, "textColor")),
        defaultColor = self.isa.objj_msgSend1(self, "currentValueForThemeAttribute:", "text-color");
    if (!(textColor == null ? null : textColor.isa.objj_msgSend1(textColor, "isEqual:", defaultColor)))
        self.isa.objj_msgSend1(self, "setTextColor:", (cell == null ? null : cell.isa.objj_msgSend0(cell, "textColor")));
    CPLog.debug("NSTextField: title=\"" + self.isa.objj_msgSend0(self, "stringValue") + "\", placeholder=" + ((cell == null ? null : cell.isa.objj_msgSend0(cell, "placeholderString")) == null ? "<none>" : '"' + (cell == null ? null : cell.isa.objj_msgSend0(cell, "placeholderString")) + '"') + ", isBordered=" + self.isa.objj_msgSend0(self, "isBordered") + ", isBezeled=" + self.isa.objj_msgSend0(self, "isBezeled") + ", bezelStyle=" + self.isa.objj_msgSend0(self, "bezelStyle"));
    if (self.isa.objj_msgSend0(self, "formatter"))
        CPLog.debug(">> Formatter: " + ((___r1 = self.isa.objj_msgSend0(self, "formatter")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "description")));
    var ___r1;
}
,["void","NSCell"])]);
}{var the_class = objj_allocateClassPair(CPTextField, "NSTextField"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSTextField__initWithCoder_(self, _cmd, aCoder)
{
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTextField__classForKeyedArchiver(self, _cmd)
{
    return CPTextField.isa.objj_msgSend0(CPTextField, "class");
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
        self._bezelStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTextBezelStyle")) || CPTextFieldSquareBezel;
        self._drawsBackground = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSDrawsBackground"));
        self._backgroundColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSBackgroundColor"));
        self._textColor = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTextColor"));
        self._placeholderString = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSPlaceholderString"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;14;NSTokenField.jt;2748;@STATIC;1.0;I;15;AppKit/CPFont.jI;21;AppKit/CPTokenField.ji;11;NSControl.ji;8;NSCell.ji;13;NSTextField.jt;2637;objj_executeFile("AppKit/CPFont.j", NO);objj_executeFile("AppKit/CPTokenField.j", NO);objj_executeFile("NSControl.j", YES);objj_executeFile("NSCell.j", YES);objj_executeFile("NSTextField.j", YES);{
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
    self = (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder));
    if (self)
    {
        var cell = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSCell"));
        (self == null ? null : self.isa.objj_msgSend1(self, "NS_initWithCell:", cell));
        (self == null ? null : self.isa.objj_msgSend0(self, "_adjustNib2CibSize"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSTokenField__classForKeyedArchiver(self, _cmd)
{
    return CPTokenField.isa.objj_msgSend0(CPTokenField, "class");
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
        self._tokenStyle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTokenStyle"));
    }
    return self;
}
,["id","CPCoder"])]);
}p;11;NSToolbar.jt;3389;@STATIC;1.0;I;18;AppKit/CPToolbar.ji;15;NSToolbarItem.jt;3327;objj_executeFile("AppKit/CPToolbar.j", NO);objj_executeFile("NSToolbarItem.j", YES);{
var the_class = objj_getClass("CPToolbar")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPToolbar\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPToolbar__NS_initWithCoder_(self, _cmd, aCoder)
{
    if (self)
    {
        self._identifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarIdentifier"));
        self._displayMode = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSToolbarDisplayMode"));
        self._showsBaselineSeparator = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSToolbarShowsBaselineSeparator"));
        self._allowsUserCustomization = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSToolbarAllowsUserCustomization"));
        self._isVisible = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSToolbarPrefersToBeShown"));
        self._identifiedItems = CPMutableDictionary.isa.objj_msgSend0(CPMutableDictionary, "dictionary");
        var nsIdentifiedItems = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarIBIdentifiedItems")),
            key = nil,
            keyEnumerator = (nsIdentifiedItems == null ? null : nsIdentifiedItems.isa.objj_msgSend0(nsIdentifiedItems, "keyEnumerator"));
        while ((key = (keyEnumerator == null ? null : keyEnumerator.isa.objj_msgSend0(keyEnumerator, "nextObject"))) !== nil)
        {
            var transformedKey = NS_CPToolbarItemIdentifierMap[key] || key;
            ((___r1 = self._identifiedItems), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setObject:forKey:", (nsIdentifiedItems == null ? null : nsIdentifiedItems.isa.objj_msgSend1(nsIdentifiedItems, "objectForKey:", key)), transformedKey));
        }
        self._defaultItems = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarIBDefaultItems"));
        self._allowedItems = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarIBAllowedItems"));
        self._selectableItems = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarIBSelectableItems"));
        self._sizeMode = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarSizeMode")) || CPToolbarSizeModeDefault;
        self._delegate = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarDelegate"));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPToolbar, "NSToolbar"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSToolbar__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbar__classForKeyedArchiver(self, _cmd)
{
    return CPToolbar.isa.objj_msgSend0(CPToolbar, "class");
}
,["Class"])]);
}p;28;NSToolbarFlexibleSpaceItem.jt;552;@STATIC;1.0;I;36;AppKit/_CPToolbarFlexibleSpaceItem.jt;493;objj_executeFile("AppKit/_CPToolbarFlexibleSpaceItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarFlexibleSpaceItem, "NSToolbarFlexibleSpaceItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarFlexibleSpaceItem__classForKeyedArchiver(self, _cmd)
{
    return _CPToolbarFlexibleSpaceItem.isa.objj_msgSend0(_CPToolbarFlexibleSpaceItem, "class");
}
,["Class"])]);
}p;15;NSToolbarItem.jt;4775;@STATIC;1.0;I;22;AppKit/CPToolbarItem.jt;4729;objj_executeFile("AppKit/CPToolbarItem.j", NO);NS_CPToolbarItemIdentifierMap = {"NSToolbarSeparatorItem": CPToolbarSeparatorItemIdentifier, "NSToolbarSpaceItem": CPToolbarSpaceItemIdentifier, "NSToolbarFlexibleSpaceItem": CPToolbarFlexibleSpaceItemIdentifier, "NSToolbarShowColorsItem": CPToolbarShowColorsItemIdentifier, "NSToolbarShowFontsItem": CPToolbarShowFontsItemIdentifier, "NSToolbarCustomizeToolbarItem": CPToolbarCustomizeToolbarItemIdentifier, "NSToolbarPrintItem": CPToolbarPrintItemIdentifier};
{
var the_class = objj_getClass("CPToolbarItem")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPToolbarItem\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPToolbarItem__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPToolbarItem").super_class }, "init");
    if (self)
    {
        var NS_itemIdentifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemIdentifier"));
        self._itemIdentifier = NS_CPToolbarItemIdentifierMap[NS_itemIdentifier] || NS_itemIdentifier;
        self._minSize = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSToolbarItemMinSize"));
        self._maxSize = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSToolbarItemMaxSize"));
        (self == null ? null : self.isa.objj_msgSend1(self, "setLabel:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemLabel"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setPaletteLabel:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemPaletteLabel"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setToolTip:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemToolTip"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setTag:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemTag"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setTarget:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemTarget"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setAction:", CPSelectorFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemAction")))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setEnabled:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSToolbarItemEnabled"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setImage:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemImage"))));
        if (self._maxSize.height > 0)
            self._maxSize.height = MIN(self._maxSize.height, 32.0);
        if (self._minSize.height > 0)
            self._minSize.height = MIN(self._minSize.height, 32.0);
        (self == null ? null : self.isa.objj_msgSend1(self, "setView:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSToolbarItemView"))));
        if (((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "isKindOfClass:", CPSearchField)) && self._maxSize.height == 22.0)
        {
            self._maxSize.height = ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "frameSize")).height;
            self._minSize.height = self._maxSize.height;
        }
        (self == null ? null : self.isa.objj_msgSend1(self, "setVisibilityPriority:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSToolbarItemVisibilityPriority"))));
        (self == null ? null : self.isa.objj_msgSend1(self, "setAutovalidates:", (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSToolbarItemAutovalidates"))));
    }
    return self;
    var ___r1;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPToolbarItem, "NSToolbarItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSToolbarItem__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarItem__classForKeyedArchiver(self, _cmd)
{
    return CPToolbarItem.isa.objj_msgSend0(CPToolbarItem, "class");
}
,["Class"])]);
}p;24;NSToolbarSeparatorItem.jt;524;@STATIC;1.0;I;32;AppKit/_CPToolbarSeparatorItem.jt;469;objj_executeFile("AppKit/_CPToolbarSeparatorItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarSeparatorItem, "NSToolbarSeparatorItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarSeparatorItem__classForKeyedArchiver(self, _cmd)
{
    return _CPToolbarSeparatorItem.isa.objj_msgSend0(_CPToolbarSeparatorItem, "class");
}
,["Class"])]);
}p;25;NSToolbarShowColorsItem.jt;531;@STATIC;1.0;I;33;AppKit/_CPToolbarShowColorsItem.jt;475;objj_executeFile("AppKit/_CPToolbarShowColorsItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarShowColorsItem, "NSToolbarShowColorsItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarShowColorsItem__classForKeyedArchiver(self, _cmd)
{
    return _CPToolbarShowColorsItem.isa.objj_msgSend0(_CPToolbarShowColorsItem, "class");
}
,["Class"])]);
}p;20;NSToolbarSpaceItem.jt;496;@STATIC;1.0;I;28;AppKit/_CPToolbarSpaceItem.jt;445;objj_executeFile("AppKit/_CPToolbarSpaceItem.j", NO);{var the_class = objj_allocateClassPair(_CPToolbarSpaceItem, "NSToolbarSpaceItem"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("classForKeyedArchiver"), function $NSToolbarSpaceItem__classForKeyedArchiver(self, _cmd)
{
    return _CPToolbarSpaceItem.isa.objj_msgSend0(_CPToolbarSpaceItem, "class");
}
,["Class"])]);
}p;26;NSUserDefaultsController.jt;1705;@STATIC;1.0;I;33;AppKit/CPUserDefaultsController.jt;1648;objj_executeFile("AppKit/CPUserDefaultsController.j", NO);{
var the_class = objj_getClass("CPUserDefaultsController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPUserDefaultsController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPUserDefaultsController__NS_initWithCoder_(self, _cmd, aCoder)
{
    if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeBoolForKey:", "NSSharedInstance")))
        return CPUserDefaultsController.isa.objj_msgSend0(CPUserDefaultsController, "sharedUserDefaultsController");
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPUserDefaultsController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        CPException.isa.objj_msgSend2(CPException, "raise:reason:", CPUnsupportedMethodException, "decoding of non-shared NSUserDefaultsController not implemented");
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPUserDefaultsController, "NSUserDefaultsController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSUserDefaultsController__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSUserDefaultsController__classForKeyedArchiver(self, _cmd)
{
    return CPUserDefaultsController.isa.objj_msgSend0(CPUserDefaultsController, "class");
}
,["Class"])]);
}p;9;NSValue.jt;2448;@STATIC;1.0;I;24;Foundation/CPException.jI;30;Foundation/CPKeyedUnarchiver.jI;21;Foundation/CPObject.jI;20;Foundation/CPRange.jI;20;Foundation/CPValue.jI;19;AppKit/CGGeometry.jt;2265;objj_executeFile("Foundation/CPException.j", NO);objj_executeFile("Foundation/CPKeyedUnarchiver.j", NO);objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPRange.j", NO);objj_executeFile("Foundation/CPValue.j", NO);objj_executeFile("AppKit/CGGeometry.j", NO);var NSPointNSValueType = 1,
    NSSizeNSValueType = 2,
    NSRectNSValueType = 3,
    NSRangeNSValueType = 4;
{var the_class = objj_allocateClassPair(CPObject, "NSValue"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSValue__initWithCoder_(self, _cmd, aCoder)
{
    var type = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NS.special"));
    switch(type) {
    case NSPointNSValueType:
        return ((___r1 = CPValue.isa.objj_msgSend0(CPValue, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithJSObject:", CGPointFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.pointval")))));
    case NSSizeNSValueType:
        return ((___r1 = CPValue.isa.objj_msgSend0(CPValue, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithJSObject:", CGSizeFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.sizeval")))));
    case NSRectNSValueType:
        return ((___r1 = CPValue.isa.objj_msgSend0(CPValue, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithJSObject:", CGRectFromString((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NS.rectval")))));
    case NSRangeNSValueType:
        return ((___r1 = CPValue.isa.objj_msgSend0(CPValue, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithJSObject:", CPMakeRange((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NS.rangeval.location")), (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NS.rangeval.length")))));
default:
        CPException.isa.objj_msgSend3(CPException, "raise:format:", CPInvalidUnarchiveOperationException, "NSValue type %d is not supported by nib2cib.", type);
    }
    var ___r1;
}
,["id","CPCoder"])]);
}p;8;NSView.jt;4679;@STATIC;1.0;I;15;AppKit/CPView.jt;4640;objj_executeFile("AppKit/CPView.j", NO);var NSViewAutoresizingMask = 0x3F,
    NSViewAutoresizesSubviewsMask = 1 << 8,
    NSViewHiddenMask = 1 << 31;
{
var the_class = objj_getClass("CPView")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPView\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPView__NS_initWithCoder_(self, _cmd, aCoder)
{
    self._frame = CGRectMakeZero();
    if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSFrame")))
        self._frame = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeRectForKey:", "NSFrame"));
    else if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSFrameSize")))
        self._frame.size = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSFrameSize"));
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPView").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._tag = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSTag"));
        self._bounds = CGRectMake(0.0, 0.0, CGRectGetWidth(self._frame), CGRectGetHeight(self._frame));
        self._window = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSWindow"));
        self._superview = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSuperview"));
        self._subviews = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSSubviews"));
        self._hierarchyScaleSize = CGSizeMake(1.0, 1.0);
        self._scaleSize = CGSizeMake(1.0, 1.0);
        self._isScaled = NO;
        if (!self._subviews)
            self._subviews = [];
        var vFlags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSvFlags"));
        self._autoresizingMask = vFlags & NSViewAutoresizingMask;
        self._autoresizesSubviews = vFlags & NSViewAutoresizesSubviewsMask;
        self._hitTests = YES;
        self._isHidden = vFlags & NSViewHiddenMask;
        self._opacity = 1.0;
        self._themeClass = (self == null ? null : self.isa.objj_msgSend0(self, "themeClass"));
        self._themeAttributes = {};
        self._themeState = CPThemeStateNormal;
        (self == null ? null : self.isa.objj_msgSend0(self, "_loadThemeAttributes"));
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSReuseIdentifierKey")))
            self._identifier = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSReuseIdentifierKey"));
    }
    return self;
}
,["id","CPCoder"]), new objj_method(sel_getUid("NS_isFlipped"), function $CPView__NS_isFlipped(self, _cmd)
{
    return NO;
}
,["BOOL"]), new objj_method(sel_getUid("awakeFromNib"), function $CPView__awakeFromNib(self, _cmd)
{
    var superview = self.isa.objj_msgSend0(self, "superview");
    if (!superview || (superview == null ? null : superview.isa.objj_msgSend0(superview, "NS_isFlipped")))
        return;
    var superviewHeight = CGRectGetHeight((superview == null ? null : superview.isa.objj_msgSend0(superview, "bounds"))),
        frame = self.isa.objj_msgSend0(self, "frame");
    self.isa.objj_msgSend1(self, "setFrameOrigin:", CGPointMake(CGRectGetMinX(frame), superviewHeight - CGRectGetMaxY(frame)));
    var NS_autoresizingMask = self.isa.objj_msgSend0(self, "autoresizingMask"),
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
    self.isa.objj_msgSend1(self, "setAutoresizingMask:", autoresizingMask);
}
,["void"])]);
}{var the_class = objj_allocateClassPair(CPView, "NSView"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSView__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSView__classForKeyedArchiver(self, _cmd)
{
    return CPView.isa.objj_msgSend0(CPView, "class");
}
,["Class"])]);
}p;18;NSViewController.jt;1709;@STATIC;1.0;I;25;AppKit/CPViewController.jt;1660;objj_executeFile("AppKit/CPViewController.j", NO);{
var the_class = objj_getClass("CPViewController")
if(!the_class) throw new SyntaxError("*** Could not find definition for class \"CPViewController\"");
var meta_class = the_class.isa;class_addMethods(the_class, [new objj_method(sel_getUid("NS_initWithCoder:"), function $CPViewController__NS_initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("CPViewController").super_class }, "NS_initWithCoder:", aCoder);
    if (self)
    {
        self._title = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSTitle"));
        self._cibName = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNibName"));
        var bundlePath = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSNibBundleIdentifier"));
        if (bundlePath)
            self._cibBundle = CPBundle.isa.objj_msgSend1(CPBundle, "bundleWithPath:", bundlePath);
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(CPViewController, "NSViewController"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSViewController__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSViewController__classForKeyedArchiver(self, _cmd)
{
    return CPViewController.isa.objj_msgSend0(CPViewController, "class");
}
,["Class"])]);
}p;18;NSWindowTemplate.jt;4461;@STATIC;1.0;I;16;AppKit/CPPanel.jI;29;AppKit/_CPCibWindowTemplate.jt;4387;objj_executeFile("AppKit/CPPanel.j", NO);objj_executeFile("AppKit/_CPCibWindowTemplate.j", NO);var NSBorderlessWindowMask = 0x00,
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
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSMinSize")))
            self._minSize = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSMinSize"));
        if ((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "containsValueForKey:", "NSMaxSize")))
            self._maxSize = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeSizeForKey:", "NSMaxSize"));
        self._screenRect = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeRectForKey:", "NSScreenRect"));
        self._viewClass = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSViewClass"));
        self._wtFlags = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSWTFlags"));
        self._windowAutorecalculatesKeyViewLoop = !!(self._wtFlags & NSAutorecalculatesKeyViewLoopWTFlag);
        self._windowClass = CP_NSMapClassName((aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSWindowClass")));
        self._windowRect = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeRectForKey:", "NSWindowRect"));
        self._windowStyleMask = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeIntForKey:", "NSWindowStyleMask"));
        self._windowTitle = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSWindowTitle"));
        self._windowView = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSWindowView"));
        self._windowRect.origin.y = self._screenRect.size.height - self._windowRect.origin.y - self._windowRect.size.height;
        if (self._windowStyleMask === NSBorderlessWindowMask)
            self._windowStyleMask = CPBorderlessWindowMask;
        else
            self._windowStyleMask = (self._windowStyleMask & NSTitledWindowMask ? CPTitledWindowMask : 0) | (self._windowStyleMask & NSClosableWindowMask ? CPClosableWindowMask : 0) | (self._windowStyleMask & NSMiniaturizableWindowMask ? CPMiniaturizableWindowMask : 0) | (self._windowStyleMask & NSResizableWindowMask ? CPResizableWindowMask : 0) | (self._windowStyleMask & NSTexturedBackgroundWindowMask ? NSTexturedBackgroundWindowMask : 0) | (self._windowStyleMask & NSDocModalWindowMask ? CPDocModalWindowMask : 0) | (self._windowStyleMask & NSHUDBackgroundWindowMask ? CPHUDBackgroundWindowMask : 0);
        self._windowIsFullPlatformWindow = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "NSFrameAutosaveName")) === "CPBorderlessBridgeWindowMask";
    }
    return self;
}
,["id","CPCoder"])]);
}{var the_class = objj_allocateClassPair(_CPCibWindowTemplate, "NSWindowTemplate"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $NSWindowTemplate__initWithCoder_(self, _cmd, aCoder)
{
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $NSWindowTemplate__classForKeyedArchiver(self, _cmd)
{
    return _CPCibWindowTemplate.isa.objj_msgSend0(_CPCibWindowTemplate, "class");
}
,["Class"])]);
}p;9;WebView.jt;1084;@STATIC;1.0;I;18;AppKit/CPWebView.jt;1042;objj_executeFile("AppKit/CPWebView.j", NO);{
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
    return self.isa.objj_msgSend1(self, "NS_initWithCoder:", aCoder);
}
,["id","CPCoder"]), new objj_method(sel_getUid("classForKeyedArchiver"), function $WebView__classForKeyedArchiver(self, _cmd)
{
    return CPWebView.isa.objj_msgSend0(CPWebView, "class");
}
,["Class"])]);
}e;