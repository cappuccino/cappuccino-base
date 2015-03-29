@STATIC;1.0;p;15;Configuration.jt;9049;@STATIC;1.0;I;25;Foundation/CPDictionary.jI;21;Foundation/CPString.jI;21;Foundation/CPObject.jI;18;Foundation/CPSet.jt;8925;objj_executeFile("Foundation/CPDictionary.j", NO);objj_executeFile("Foundation/CPString.j", NO);objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPSet.j", NO);var FILE = require("file"),
    SYSTEM = require("system");
var DefaultDictionary = nil,
    DefaultConfiguration = nil,
    UserConfiguration = nil;
{var the_class = objj_allocateClassPair(CPObject, "Configuration"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("path"), new objj_ivar("dictionary"), new objj_ivar("temporaryDictionary")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithPath:"), function $Configuration__initWithPath_(self, _cmd, aPath)
{
    self = objj_msgSendSuper({ receiver:self, super_class:objj_getClass("Configuration").super_class }, "init");
    if (self)
    {
        self.path = aPath;
        self.temporaryDictionary = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
        if (self.path && FILE.isReadable(self.path))
            self.dictionary = CFPropertyList.readPropertyListFromFile(self.path);
        if (!self.dictionary)
            self.dictionary = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
    }
    return self;
}
,["id","CPString"]), new objj_method(sel_getUid("path"), function $Configuration__path(self, _cmd)
{
    return self.path;
}
,["CPString"]), new objj_method(sel_getUid("storedKeyEnumerator"), function $Configuration__storedKeyEnumerator(self, _cmd)
{
    return ((___r1 = self.dictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "keyEnumerator"));
    var ___r1;
}
,["CPEnumerator"]), new objj_method(sel_getUid("keyEnumerator"), function $Configuration__keyEnumerator(self, _cmd)
{
    var set = CPSet.isa.objj_msgSend1(CPSet, "setWithArray:", ((___r1 = self.dictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "allKeys")));
    (set == null ? null : set.isa.objj_msgSend1(set, "addObjectsFromArray:", ((___r1 = self.temporaryDictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "allKeys"))));
    (set == null ? null : set.isa.objj_msgSend1(set, "addObjectsFromArray:", (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend0(DefaultDictionary, "allKeys"))));
    return (set == null ? null : set.isa.objj_msgSend0(set, "objectEnumerator"));
    var ___r1;
}
,["CPEnumerator"]), new objj_method(sel_getUid("valueForKey:"), function $Configuration__valueForKey_(self, _cmd, aKey)
{
    var value = ((___r1 = self.dictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForKey:", aKey));
    if (!value)
        value = ((___r1 = self.temporaryDictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForKey:", aKey));
    if (!value)
        value = (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend1(DefaultDictionary, "objectForKey:", aKey));
    return value;
    var ___r1;
}
,["CPString","CPString"]), new objj_method(sel_getUid("setValue:forKey:"), function $Configuration__setValue_forKey_(self, _cmd, aString, aKey)
{
    ((___r1 = self.dictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setObject:forKey:", aString, aKey));
    var ___r1;
}
,["void","CPString","CPString"]), new objj_method(sel_getUid("removeValueForKey:"), function $Configuration__removeValueForKey_(self, _cmd, aKey)
{
    ((___r1 = self.dictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "removeObjectForKey:", aKey));
    var ___r1;
}
,["void","CPString"]), new objj_method(sel_getUid("setTemporaryValue:forKey:"), function $Configuration__setTemporaryValue_forKey_(self, _cmd, aString, aKey)
{
    ((___r1 = self.temporaryDictionary), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "setObject:forKey:", aString, aKey));
    var ___r1;
}
,["void","CPString","CPString"]), new objj_method(sel_getUid("save"), function $Configuration__save(self, _cmd)
{
    var aPath = self.isa.objj_msgSend0(self, "path");
    if (!aPath)
        return;
    CFPropertyList.writePropertyListToFile(self.dictionary, aPath);
}
,["void"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("initialize"), function $Configuration__initialize(self, _cmd)
{
    if (self !== Configuration.isa.objj_msgSend0(Configuration, "class"))
        return;
    DefaultDictionary = objj_msgSend(objj_msgSend(CPDictionary, "alloc"), "init");
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "You", "user.name"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "you@yourcompany.com", "user.email"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "Your Company", "organization.name"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "feedback @nospam@ yourcompany.com", "organization.email"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "http://yourcompany.com", "organization.url"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", "com.yourcompany", "organization.identifier"));
    var date = new Date(),
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", date.getFullYear(), "project.year"));
    (DefaultDictionary == null ? null : DefaultDictionary.isa.objj_msgSend2(DefaultDictionary, "setObject:forKey:", months[date.getMonth()] + ' ' + date.getDate() + ", " + date.getFullYear(), "project.date"));
}
,["void"]), new objj_method(sel_getUid("defaultConfiguration"), function $Configuration__defaultConfiguration(self, _cmd)
{
    if (!DefaultConfiguration)
        DefaultConfiguration = ((___r1 = self.isa.objj_msgSend0(self, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithPath:", nil));
    return DefaultConfiguration;
    var ___r1;
}
,["id"]), new objj_method(sel_getUid("userConfiguration"), function $Configuration__userConfiguration(self, _cmd)
{
    if (!UserConfiguration)
        UserConfiguration = ((___r1 = self.isa.objj_msgSend0(self, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithPath:", FILE.join(SYSTEM.env["HOME"], ".cappconfig")));
    return UserConfiguration;
    var ___r1;
}
,["id"])]);
}config = function()
{
    var count = arguments.length;
    if (count === 0 || count > 2)
    {
        printUsage();
        return;
    }
    var argument = arguments[0],
        key = nil,
        value = nil,
        action = nil,
        valid = YES;
    switch(argument) {
    case "--get":
    case "--remove":
        action = argument.substring(2);
        if (count === 2)
            key = arguments[1];
        else
            valid = NO;
        break;
    case "-l":
    case "--list":
        action = "list";
        valid = count === 1;
        break;
default:
        action = "set";
        key = argument;
        if (count === 2)
            value = arguments[1];
        else
            valid = NO;
    }
    if (!valid)
    {
        printUsage();
        return;
    }
    var configuration = Configuration.isa.objj_msgSend0(Configuration, "userConfiguration");
    if (action === "list")
    {
        var key = nil,
            keyEnumerator = (configuration == null ? null : configuration.isa.objj_msgSend0(configuration, "storedKeyEnumerator"));
        while ((key = (keyEnumerator == null ? null : keyEnumerator.isa.objj_msgSend0(keyEnumerator, "nextObject"))) !== nil)
            print(key + '=' + (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "valueForKey:", key)));
    }
    else if (action === "get")
    {
        var value = (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "valueForKey:", key));
        if (value != nil)
            print(value);
    }
    else if (action === "remove")
    {
        var value = (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "valueForKey:", key));
        if (value != nil)
        {
            (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "removeValueForKey:", key));
            (configuration == null ? null : configuration.isa.objj_msgSend0(configuration, "save"));
        }
    }
    else if (key !== nil && value !== nil)
    {
        (configuration == null ? null : configuration.isa.objj_msgSend2(configuration, "setValue:forKey:", value, key));
        (configuration == null ? null : configuration.isa.objj_msgSend0(configuration, "save"));
    }
}
p;10;Generate.jt;12153;@STATIC;1.0;i;15;Configuration.jt;12113;objj_executeFile("Configuration.j", YES);var OS = require("os"),
    SYSTEM = require("system"),
    FILE = require("file"),
    OBJJ = require("objective-j"),
    stream = (require("narwhal/term")).stream,
    parser = new (require("narwhal/args")).Parser();
parser.usage("DESTINATION_DIRECTORY");
parser.help("Generate a Cappuccino project or Frameworks directory");
(((parser.option("-t", "--template", "template")).set()).def("Application")).help("Selects a project template to use (default: Application).");
((parser.option("-f", "--frameworks", "justFrameworks")).set(true)).help("Only generate or update Frameworks directory.");
(((parser.option("-F", "--framework", "framework", "frameworks")).def([])).push()).help("Additional framework to copy/symlink (default: Objective-J, Foundation, AppKit)");
((parser.option("--no-frameworks", "noFrameworks")).set(true)).help("Don't copy any default frameworks (can be overridden with -F)");
((parser.option("--symlink", "symlink")).set(true)).help("Creates a symlink to each framework instead of copying.");
((parser.option("--build", "useCappBuild")).set(true)).help("Uses frameworks in the $CAPP_BUILD.");
((parser.option("-l")).action(function(o)
{
    o.symlink = o.useCappBuild = true;
})).help("Enables both the --symlink and --build options.");
((parser.option("--force", "force")).set(true)).help("Overwrite update existing frameworks.");
((parser.option("--noconfig", "noconfig")).set(true)).help("Use the default configuration, ignore your configuration.");
((parser.option("--list-templates", "listTemplates")).set(true)).help("Lists available templates.");
((parser.option("--list-frameworks", "listFrameworks")).set(true)).help("Lists available frameworks.");
parser.helpful();
var CAPP_HOME = (require("narwhal/packages")).catalog["cappuccino"].directory,
    templatesDirectory = FILE.join(CAPP_HOME, "lib", "capp", "Resources", "Templates");
gen = function()
{
    var args = ["capp gen"].concat(Array.prototype.slice.call(arguments)),
        options = parser.parse(args, null, null, true);
    if (options.args.length > 1)
    {
        parser.printUsage(options);
        OS.exit(1);
    }
    if (options.listTemplates)
    {
        listTemplates();
        return;
    }
    if (options.listFrameworks)
    {
        listFrameworks();
        return;
    }
    var destination = options.args[0];
    if (!destination)
    {
        if (options.justFrameworks)
            destination = ".";
        else
        {
            parser.printUsage(options);
            OS.exit(1);
        }
    }
    var sourceTemplate = null;
    if (FILE.isAbsolute(options.template))
        sourceTemplate = options.template;
    else
        sourceTemplate = FILE.join(templatesDirectory, options.template);
    if (!FILE.isDirectory(sourceTemplate))
    {
        stream.print(colorize("Error: ", "red") + "The template " + logPath(sourceTemplate) + " cannot be found. Available templates are:");
        listTemplates();
        OS.exit(1);
    }
    var configFile = FILE.join(sourceTemplate, "template.config"),
        config = {};
    if (FILE.isFile(configFile))
        config = JSON.parse(FILE.read(configFile, {charset: "UTF-8"}));
    var destinationProject = destination,
        configuration = options.noconfig ? Configuration.isa.objj_msgSend0(Configuration, "defaultConfiguration") : Configuration.isa.objj_msgSend0(Configuration, "userConfiguration"),
        frameworks = options.frameworks;
    if (!options.noFrameworks)
        frameworks.push("Objective-J", "Foundation", "AppKit");
    if (options.justFrameworks)
        createFrameworksInFile(frameworks, destinationProject, options.symlink, options.useCappBuild, options.force);
    else if (!FILE.exists(destinationProject))
    {
        FILE.copyTree(sourceTemplate, destinationProject);
        var files = FILE.glob(FILE.join(destinationProject, "**", "*")),
            count = files.length,
            name = FILE.basename(destinationProject),
            orgIdentifier = (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "valueForKey:", "organization.identifier")) || "";
        (configuration == null ? null : configuration.isa.objj_msgSend2(configuration, "setTemporaryValue:forKey:", name, "project.name"));
        (configuration == null ? null : configuration.isa.objj_msgSend2(configuration, "setTemporaryValue:forKey:", orgIdentifier + '.' + toIdentifier(name), "project.identifier"));
        (configuration == null ? null : configuration.isa.objj_msgSend2(configuration, "setTemporaryValue:forKey:", toIdentifier(name), "project.nameasidentifier"));
        for (var index = 0; index < count; ++index)
        {
            var path = files[index];
            if (FILE.isDirectory(path))
                continue;
            if (FILE.basename(path) === ".DS_Store")
                continue;
            if ([".png", ".jpg", ".jpeg", ".gif", ".tif", ".tiff"].indexOf((FILE.extension(path)).toLowerCase()) !== -1)
                continue;
            try            {
                var contents = FILE.read(path, {charset: "UTF-8"}),
                    key = null,
                    keyEnumerator = (configuration == null ? null : configuration.isa.objj_msgSend0(configuration, "keyEnumerator"));
                while ((key = (keyEnumerator == null ? null : keyEnumerator.isa.objj_msgSend0(keyEnumerator, "nextObject"))) !== nil)
                    contents = contents.replace(new RegExp("__" + RegExp.escape(key) + "__", 'g'), (configuration == null ? null : configuration.isa.objj_msgSend1(configuration, "valueForKey:", key)));
                FILE.write(path, contents, {charset: "UTF-8"});
            }
            catch(anException)             {
                warn("An error occurred (" + anException.toString() + ") while applying the " + (options.noconfig ? "default" : "user") + " configuration to: " + logPath(path));
            }        }
        var frameworkDestination = destinationProject;
        if (config.FrameworksPath)
            frameworkDestination = FILE.join(frameworkDestination, config.FrameworksPath);
        createFrameworksInFile(frameworks, frameworkDestination, options.symlink, options.useCappBuild);
    }
    else
    {
        fail("The directory " + FILE.absolute(destinationProject) + " already exists.");
    }
    executePostInstallScript(destinationProject);
}
createFrameworksInFile = function(frameworks, aFile, symlink, build, force)
{
    var destination = FILE.path(FILE.absolute(aFile));
    if (!destination.isDirectory())
        fail("Cannot create Frameworks. The directory does not exist: " + destination);
    var destinationFrameworks = destination.join("Frameworks"),
        destinationDebugFrameworks = destination.join("Frameworks", "Debug");
    stream.print("Creating Frameworks directory in " + logPath(destinationFrameworks) + "...");
    destinationDebugFrameworks.mkdirs();
    if (build)
    {
        if (!SYSTEM.env["CAPP_BUILD"])
            fail("$CAPP_BUILD must be defined to use the --build or -l option.");
        var builtFrameworks = FILE.path(SYSTEM.env["CAPP_BUILD"]),
            sourceFrameworks = builtFrameworks.join("Release"),
            sourceDebugFrameworks = builtFrameworks.join("Debug");
        frameworks.forEach(function(framework)
        {
            installFramework(sourceFrameworks.join(framework), destinationFrameworks.join(framework), force, symlink);
            installFramework(sourceDebugFrameworks.join(framework), destinationDebugFrameworks.join(framework), force, symlink);
        });
    }
    else
    {
        frameworks.forEach(function(framework)
        {
            if (framework === "Objective-J")
            {
                var objjHome = FILE.path(OBJJ.OBJJ_HOME),
                    objjPath = objjHome.join("Frameworks", "Objective-J"),
                    objjDebugPath = objjHome.join("Frameworks", "Debug", "Objective-J");
                installFramework(objjPath, destinationFrameworks.join("Objective-J"), force, symlink);
                installFramework(objjDebugPath, destinationDebugFrameworks.join("Objective-J"), force, symlink);
                return;
            }
            var found = false;
            for (var i = 0; i < OBJJ.objj_frameworks.length; i++)
            {
                var sourceFramework = (FILE.path(OBJJ.objj_frameworks[i])).join(framework);
                if (FILE.isDirectory(sourceFramework))
                {
                    installFramework(sourceFramework, destinationFrameworks.join(framework), force, symlink);
                    found = true;
                    break;
                }
            }
            if (!found)
                warn("Couldn't find the framework: " + logPath(framework));
            for (var i = 0, found = false; i < OBJJ.objj_debug_frameworks.length; i++)
            {
                var sourceDebugFramework = (FILE.path(OBJJ.objj_debug_frameworks[i])).join(framework);
                if (FILE.isDirectory(sourceDebugFramework))
                {
                    installFramework(sourceDebugFramework, destinationDebugFrameworks.join(framework), force, symlink);
                    found = true;
                    break;
                }
            }
            if (!found)
                warn("Couldn't find the debug framework: " + logPath(framework));
        });
    }
}
installFramework = function(source, dest, force, symlink)
{
    if (dest.exists())
    {
        if (force)
            dest.rmtree();
        else
        {
            warn(logPath(dest) + " already exists. Use --force to overwrite.");
            return;
        }
    }
    if (source.exists())
    {
        stream.print((symlink ? "Symlinking " : "Copying ") + logPath(source) + " ==> " + logPath(dest));
        if (symlink)
            FILE.symlink(source, dest);
        else
            FILE.copyTree(source, dest);
    }
    else
        warn("Cannot find: " + logPath(source));
}
toIdentifier = function(aString)
{
    var identifier = "",
        count = aString.length,
        capitalize = NO,
        firstRegex = new RegExp("^[a-zA-Z_$]"),
        regex = new RegExp("^[a-zA-Z_$0-9]");
    for (var index = 0; index < count; ++index)
    {
        var character = aString.charAt(index);
        if (index === 0 && firstRegex.test(character) || regex.test(character))
        {
            if (capitalize)
                identifier += character.toUpperCase();
            else
                identifier += character;
            capitalize = NO;
        }
        else
            capitalize = YES;
    }
    return identifier;
}
listTemplates = function()
{
    (FILE.list(templatesDirectory)).forEach(function(templateName)
    {
        stream.print(templateName);
    });
}
listFrameworks = function()
{
    stream.print("Frameworks:");
    OBJJ.objj_frameworks.forEach(function(frameworksDirectory)
    {
        stream.print("  " + frameworksDirectory);
        (FILE.list(frameworksDirectory)).forEach(function(templateName)
        {
            stream.print("    + " + templateName);
        });
    });
    stream.print("Frameworks (Debug):");
    OBJJ.objj_debug_frameworks.forEach(function(frameworksDirectory)
    {
        stream.print("  " + frameworksDirectory);
        (FILE.list(frameworksDirectory)).forEach(function(frameworkName)
        {
            stream.print("    + " + frameworkName);
        });
    });
}
executePostInstallScript = function(destinationProject)
{
    var path = FILE.join(destinationProject, "postinstall");
    if (FILE.exists(path))
    {
        stream.print(colorize("Executing postinstall script...", "cyan"));
        OS.system(["/bin/sh", path, destinationProject]);
        FILE.remove(path);
    }
}
colorize = function(message, color)
{
    return "\0" + color + "(" + message + "\0)";
}
logPath = function(path)
{
    return colorize(path, "cyan");
}
warn = function(message)
{
    stream.print(colorize("Warning: ", "yellow") + message);
}
fail = function(message)
{
    stream.print(colorize(message, "red"));
    OS.exit(1);
}
p;6;main.jt;4194;@STATIC;1.0;I;23;Foundation/Foundation.ji;15;Configuration.ji;10;Generate.jt;4112;objj_executeFile("Foundation/Foundation.j", NO);objj_executeFile("Configuration.j", YES);objj_executeFile("Generate.j", YES);main = function(args)
{
    args.shift();
    if (args.length < 1)
        return printUsage();
    var index = 0,
        count = args.length;
    for (; index < count; ++index)
    {
        var argument = args[index];
        switch(argument) {
        case "version":
        case "--version":
            return print((require("cappuccino")).fullVersionString());
        case "-h":
        case "--help":
            return printUsage();
        case "config":
            return config.apply(this, args.slice(index + 1));
        case "gen":
            return gen.apply(this, args.slice(index + 1));
default:
            print("unknown command " + argument);
        }
    }
}
printUsage = function()
{
    print("capp [--version] COMMAND [OPTIONS] [ARGS]");
    print("    --version    Print version");
    print("    -h, --help   Print this help");
    print("");
    print("  gen [OPTIONS] PATH       Generate a new project at PATH from a predefined template");
    print("      -l                     Same as --symlink --build, symlinks $CAPP_BUILD Frameworks into your project");
    print("      -t, --template NAME    Specify the template name to use (see `capp gen --list-templates`)");
    print("      -f, --frameworks       Copy/symlink *only* the Frameworks directory to a new or existing project");
    print("      -F, --framework NAME   Additional framework to copy/symlink (default: Objective-J, Foundation, AppKit)");
    print("      --force                Overwrite Frameworks directory if it already exists");
    print("      --symlink              Symlink the source Frameworks directory to the project, don't copy");
    print("      --build                Copy/symlink the Frameworks directory files from your $CAPP_BUILD directory");
    print("      --noconfig             Use the default configuration when replacing template variables");
    print("");
    print("      Without -l or --build, frameworks from your narwhal installation are copied/symlinked");
    print("");
    print("  gen --list-templates     List the template names available for use with `capp gen -t/--template`");
    print("  gen --list-frameworks    List the framework names available for use with `capp gen -F/--framework`");
    print("");
    print("  config ...");
    print("      KEY VALUE       Set a value for a given key");
    print("      -l, --list      List all variables set in config file.");
    print("      --get KEY       Get the value for a given key");
    print("      --remove KEY    Remove the value for a given key");
}
getFiles = function(sourceDirectory, extensions, exclusions)
{
    var matches = [],
        files = sourceDirectory.listFiles(),
        hasMultipleExtensions = typeof extensions !== "string";
    if (files)
    {
        var index = 0,
            count = files.length;
        for (; index < count; ++index)
        {
            var file = files[index],
                name = FILE.basename(file),
                isValidExtension = !extensions;
            if (exclusions && fileArrayContainsFile(exclusions, file))
                continue;
            if (!isValidExtension)
                if (hasMultipleExtensions)
                {
                    var extensionCount = extensions.length;
                    while (extensionCount-- && !isValidExtension)
                    {
                        var extension = extensions[extensionCount];
                        if (name.substring(name.length - extension.length - 1) === "." + extension)
                            isValidExtension = true;
                    }
                }
                else if (name.substring(name.length - extensions.length - 1) === "." + extensions)
                    isValidExtension = true;
            if (FILE.isDirectory(file))
                matches = matches.concat(getFiles(file, extensions, exclusions));
            else if (isValidExtension)
                matches.push(file);
        }
    }
    return matches;
}
e;