@STATIC;1.0;p;22;BKShowcaseController.jt;32107;@STATIC;1.0;I;21;Foundation/CPObject.jI;25;AppKit/CPCollectionView.jI;21;AppKit/CPColorPanel.jI;21;AppKit/CPScrollView.jI;20;AppKit/CPSplitView.jI;18;AppKit/CPToolbar.jI;15;AppKit/CPView.jI;27;AppKit/CPWindow_Constants.ji;19;BKThemeDescriptor.jt;31855;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPCollectionView.j", NO);objj_executeFile("AppKit/CPColorPanel.j", NO);objj_executeFile("AppKit/CPScrollView.j", NO);objj_executeFile("AppKit/CPSplitView.j", NO);objj_executeFile("AppKit/CPToolbar.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("AppKit/CPWindow_Constants.j", NO);objj_executeFile("BKThemeDescriptor.j", YES);var LEFT_PANEL_WIDTH = 176.0;
var BKLearnMoreToolbarItemIdentifier = "BKLearnMoreToolbarItemIdentifier",
    BKStateToolbarItemIdentifier = "BKStateToolbarItemIdentifier",
    BKBackgroundColorToolbarItemIdentifier = "BKBackgroundColorToolbarItemIdentifier";

{var the_class = objj_allocateClassPair(CPObject, "BKShowcaseController"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_themeDescriptorClasses", "CPArray"), new objj_ivar("_themesCollectionView", "CPCollectionView"), new objj_ivar("_themedObjectsCollectionView", "CPCollectionView"), new objj_ivar("theWindow", "CPWindow")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("applicationDidFinishLaunching:"), function $BKShowcaseController__applicationDidFinishLaunching_(self, _cmd, aNotification)
{
    self._themeDescriptorClasses = BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "allThemeDescriptorClasses");
    self.theWindow = ((___r1 = (CPWindow == null ? null : CPWindow.isa.objj_msgSend0(CPWindow, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithContentRect:styleMask:", CGRectMakeZero(), CPBorderlessBridgeWindowMask));
    var toolbar = ((___r1 = CPToolbar.isa.objj_msgSend0(CPToolbar, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithIdentifier:", "Toolbar"));
    (toolbar == null ? null : toolbar.isa.objj_msgSend1(toolbar, "setDelegate:", self));
    ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setToolbar:", toolbar));
    var contentView = ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "contentView")),
        bounds = (contentView == null ? null : contentView.isa.objj_msgSend0(contentView, "bounds")),
        splitView = ((___r1 = CPSplitView.isa.objj_msgSend0(CPSplitView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", bounds));
    (splitView == null ? null : splitView.isa.objj_msgSend1(splitView, "setIsPaneSplitter:", YES));
    (splitView == null ? null : splitView.isa.objj_msgSend1(splitView, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    (contentView == null ? null : contentView.isa.objj_msgSend1(contentView, "addSubview:", splitView));
    var label = CPTextField.isa.objj_msgSend1(CPTextField, "labelWithTitle:", "THEMES");
    (label == null ? null : label.isa.objj_msgSend1(label, "setFont:", CPFont.isa.objj_msgSend1(CPFont, "boldSystemFontOfSize:", 11.0)));
    (label == null ? null : label.isa.objj_msgSend1(label, "setTextColor:", CPColor.isa.objj_msgSend(CPColor, "colorWithCalibratedRed:green:blue:alpha:", 93.0 / 255.0, 93.0 / 255.0, 93.0 / 255.0, 1.0)));
    (label == null ? null : label.isa.objj_msgSend1(label, "setTextShadowColor:", CPColor.isa.objj_msgSend(CPColor, "colorWithCalibratedRed:green:blue:alpha:", 225.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0, 0.7)));
    (label == null ? null : label.isa.objj_msgSend1(label, "setTextShadowOffset:", CGSizeMake(0.0, 1.0)));
    (label == null ? null : label.isa.objj_msgSend0(label, "sizeToFit"));
    (label == null ? null : label.isa.objj_msgSend1(label, "setFrameOrigin:", CGPointMake(5.0, 4.0)));
    var themeDescriptorItem = ((___r1 = CPCollectionViewItem.isa.objj_msgSend0(CPCollectionViewItem, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));
    (themeDescriptorItem == null ? null : themeDescriptorItem.isa.objj_msgSend1(themeDescriptorItem, "setView:", ((___r1 = (BKThemeDescriptorCell == null ? null : BKThemeDescriptorCell.isa.objj_msgSend0(BKThemeDescriptorCell, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"))));
    self._themesCollectionView = ((___r1 = CPCollectionView.isa.objj_msgSend0(CPCollectionView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, LEFT_PANEL_WIDTH, CGRectGetHeight(bounds))));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setDelegate:", self));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setItemPrototype:", themeDescriptorItem));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMinItemSize:", CGSizeMake(20.0, 36.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMaxItemSize:", CGSizeMake(10000000.0, 36.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMaxNumberOfColumns:", 1));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setContent:", self._themeDescriptorClasses));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setVerticalMargin:", 0.0));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setSelectable:", YES));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFrameOrigin:", CGPointMake(0.0, 20.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    var scrollView = ((___r1 = CPScrollView.isa.objj_msgSend0(CPScrollView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, LEFT_PANEL_WIDTH, CGRectGetHeight(bounds)))),
        contentView = (scrollView == null ? null : scrollView.isa.objj_msgSend0(scrollView, "contentView"));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setAutohidesScrollers:", YES));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setDocumentView:", self._themesCollectionView));
    (contentView == null ? null : contentView.isa.objj_msgSend1(contentView, "setBackgroundColor:", CPColor.isa.objj_msgSend(CPColor, "colorWithRed:green:blue:alpha:", 212.0 / 255.0, 221.0 / 255.0, 230.0 / 255.0, 1.0)));
    (contentView == null ? null : contentView.isa.objj_msgSend1(contentView, "addSubview:", label));
    (splitView == null ? null : splitView.isa.objj_msgSend1(splitView, "addSubview:", scrollView));
    self._themedObjectsCollectionView = ((___r1 = CPCollectionView.isa.objj_msgSend0(CPCollectionView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, CGRectGetWidth(bounds) - LEFT_PANEL_WIDTH - 1.0, 10.0)));
    var collectionViewItem = ((___r1 = CPCollectionViewItem.isa.objj_msgSend0(CPCollectionViewItem, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));
    (collectionViewItem == null ? null : collectionViewItem.isa.objj_msgSend1(collectionViewItem, "setView:", ((___r1 = (BKShowcaseCell == null ? null : BKShowcaseCell.isa.objj_msgSend0(BKShowcaseCell, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"))));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setItemPrototype:", collectionViewItem));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setVerticalMargin:", 20.0));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    var scrollView = ((___r1 = CPScrollView.isa.objj_msgSend0(CPScrollView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMake(LEFT_PANEL_WIDTH + 1.0, 0.0, CGRectGetWidth(bounds) - LEFT_PANEL_WIDTH - 1.0, CGRectGetHeight(bounds))));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setHasHorizontalScroller:", NO));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setAutohidesScrollers:", YES));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    (scrollView == null ? null : scrollView.isa.objj_msgSend1(scrollView, "setDocumentView:", self._themedObjectsCollectionView));
    (splitView == null ? null : splitView.isa.objj_msgSend1(splitView, "addSubview:", scrollView));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setSelectionIndexes:", CPIndexSet.isa.objj_msgSend1(CPIndexSet, "indexSetWithIndex:", 0)));
    ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMovable:", NO));
    ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFullPlatformWindow:", YES));
    ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "makeKeyAndOrderFront:", self));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend(___r1, "addObserver:forKeyPath:options:context:", self, "selectionIndexes", CPKeyValueObservingOptionNew | CPKeyValueObservingOptionInitial, nil));
    var ___r1;
}

,["void","CPNotification"]), new objj_method(sel_getUid("observeValueForKeyPath:ofObject:change:context:"), function $BKShowcaseController__observeValueForKeyPath_ofObject_change_context_(self, _cmd, keyPath, object, change, context)
{
    if (object == self._themesCollectionView && keyPath == "selectionIndexes")
    {
        var themeDescriptorClass = self._themeDescriptorClasses[((___r1 = (object == null ? null : object.isa.objj_msgSend0(object, "selectionIndexes"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "firstIndex"))],
            itemSize = (themeDescriptorClass == null ? null : themeDescriptorClass.isa.objj_msgSend0(themeDescriptorClass, "itemSize"));
        itemSize.width = MAX(100.0, itemSize.width + 20.0);
        itemSize.height = MAX(100.0, itemSize.height + 30.0);
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMinItemSize:", itemSize));
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setMaxItemSize:", itemSize));
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setContent:", (themeDescriptorClass == null ? null : themeDescriptorClass.isa.objj_msgSend0(themeDescriptorClass, "themedShowcaseObjectTemplates"))));
        (BKShowcaseCell == null ? null : BKShowcaseCell.isa.objj_msgSend1(BKShowcaseCell, "setBackgroundColor:", (themeDescriptorClass == null ? null : themeDescriptorClass.isa.objj_msgSend0(themeDescriptorClass, "showcaseBackgroundColor"))));
    }
    var ___r1;
}

,["void","CPString","id","CPDictionary","void"]), new objj_method(sel_getUid("hasLearnMoreURL"), function $BKShowcaseController__hasLearnMoreURL(self, _cmd)
{
    return ((___r1 = CPBundle.isa.objj_msgSend0(CPBundle, "mainBundle")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreURL"));
    var ___r1;
}

,["BOOL"]), new objj_method(sel_getUid("toolbarAllowedItemIdentifiers:"), function $BKShowcaseController__toolbarAllowedItemIdentifiers_(self, _cmd, aToolbar)
{
    return [BKLearnMoreToolbarItemIdentifier, CPToolbarSpaceItemIdentifier, CPToolbarFlexibleSpaceItemIdentifier, BKBackgroundColorToolbarItemIdentifier, BKStateToolbarItemIdentifier];
}

,["CPArray","CPToolbar"]), new objj_method(sel_getUid("toolbarDefaultItemIdentifiers:"), function $BKShowcaseController__toolbarDefaultItemIdentifiers_(self, _cmd, aToolbar)
{
    var itemIdentifiers = [CPToolbarFlexibleSpaceItemIdentifier, BKBackgroundColorToolbarItemIdentifier, BKStateToolbarItemIdentifier];
    if (self.isa.objj_msgSend0(self, "hasLearnMoreURL"))
        itemIdentifiers = [BKLearnMoreToolbarItemIdentifier].concat(itemIdentifiers);
    return itemIdentifiers;
}

,["CPArray","CPToolbar"]), new objj_method(sel_getUid("toolbar:itemForItemIdentifier:willBeInsertedIntoToolbar:"), function $BKShowcaseController__toolbar_itemForItemIdentifier_willBeInsertedIntoToolbar_(self, _cmd, aToolbar, anItemIdentifier, aFlag)
{
    var toolbarItem = ((___r1 = CPToolbarItem.isa.objj_msgSend0(CPToolbarItem, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithItemIdentifier:", anItemIdentifier));
    (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setTarget:", self));
    if (anItemIdentifier === BKStateToolbarItemIdentifier)
    {
        var popUpButton = CPPopUpButton.isa.objj_msgSend1(CPPopUpButton, "buttonWithTitle:", "Enabled");
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "Disabled"));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setView:", popUpButton));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setAction:", sel_getUid("changeState:")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setLabel:", "State"));
        var width = CGRectGetWidth((popUpButton == null ? null : popUpButton.isa.objj_msgSend0(popUpButton, "frame")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMinSize:", CGSizeMake(width + 20.0, 25.0)));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMaxSize:", CGSizeMake(width + 20.0, 25.0)));
    }
    else if (anItemIdentifier === BKBackgroundColorToolbarItemIdentifier)
    {
        var popUpButton = CPPopUpButton.isa.objj_msgSend1(CPPopUpButton, "buttonWithTitle:", "Window Background");
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "Light Checkers"));
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "Dark Checkers"));
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "White"));
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "Black"));
        (popUpButton == null ? null : popUpButton.isa.objj_msgSend1(popUpButton, "addItemWithTitle:", "More Choices..."));
        var itemArray = (popUpButton == null ? null : popUpButton.isa.objj_msgSend0(popUpButton, "itemArray"));
        ((___r1 = itemArray[0]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setRepresentedObject:", BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "windowBackgroundColor")));
        ((___r1 = itemArray[1]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setRepresentedObject:", BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "lightCheckersColor")));
        ((___r1 = itemArray[2]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setRepresentedObject:", BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "darkCheckersColor")));
        ((___r1 = itemArray[3]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setRepresentedObject:", CPColor.isa.objj_msgSend0(CPColor, "whiteColor")));
        ((___r1 = itemArray[4]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setRepresentedObject:", CPColor.isa.objj_msgSend0(CPColor, "blackColor")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setView:", popUpButton));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setAction:", sel_getUid("changeColor:")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setLabel:", "Background Color"));
        var width = CGRectGetWidth((popUpButton == null ? null : popUpButton.isa.objj_msgSend0(popUpButton, "frame")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMinSize:", CGSizeMake(width, 25.0)));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMaxSize:", CGSizeMake(width, 25.0)));
    }
    else if (anItemIdentifier === BKLearnMoreToolbarItemIdentifier)
    {
        var title = ((___r1 = CPBundle.isa.objj_msgSend0(CPBundle, "mainBundle")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreButtonTitle"));
        if (!title)
            title = ((___r1 = CPBundle.isa.objj_msgSend0(CPBundle, "mainBundle")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForInfoDictionaryKey:", "CPBundleName")) || "Home Page";
        var button = CPButton.isa.objj_msgSend1(CPButton, "buttonWithTitle:", title);
        ((___r1 = self.theWindow), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setDefaultButton:", button));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setView:", button));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setLabel:", "Learn More"));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setAction:", sel_getUid("learnMore:")));
        var width = CGRectGetWidth((button == null ? null : button.isa.objj_msgSend0(button, "frame")));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMinSize:", CGSizeMake(width, 25.0)));
        (toolbarItem == null ? null : toolbarItem.isa.objj_msgSend1(toolbarItem, "setMaxSize:", CGSizeMake(width, 25.0)));
    }
    return toolbarItem;
    var ___r1;
}

,["CPToolbarItem","CPToolbar","CPString","BOOL"]), new objj_method(sel_getUid("learnMore:"), function $BKShowcaseController__learnMore_(self, _cmd, aSender)
{
    window.location.href = ((___r1 = CPBundle.isa.objj_msgSend0(CPBundle, "mainBundle")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreURL"));
    var ___r1;
}

,["void","id"]), new objj_method(sel_getUid("selectedThemeDescriptor"), function $BKShowcaseController__selectedThemeDescriptor(self, _cmd)
{
    return self._themeDescriptorClasses[((___r1 = ((___r2 = self._themesCollectionView), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "selectionIndexes"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "firstIndex"))];
    var ___r1, ___r2;
}

,["BKThemeDescriptor"]), new objj_method(sel_getUid("changeState:"), function $BKShowcaseController__changeState_(self, _cmd, aSender)
{
    var themedShowcaseObjectTemplates = ((___r1 = self.isa.objj_msgSend0(self, "selectedThemeDescriptor")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "themedShowcaseObjectTemplates")),
        count = (themedShowcaseObjectTemplates == null ? null : themedShowcaseObjectTemplates.isa.objj_msgSend0(themedShowcaseObjectTemplates, "count"));
    while (count--)
    {
        var themedObject = ((___r1 = themedShowcaseObjectTemplates[count]), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "valueForKey:", "themedObject"));
        if ((themedObject == null ? null : themedObject.isa.objj_msgSend1(themedObject, "respondsToSelector:", sel_getUid("setEnabled:"))))
            (themedObject == null ? null : themedObject.isa.objj_msgSend1(themedObject, "setEnabled:", (aSender == null ? null : aSender.isa.objj_msgSend0(aSender, "title")) === "Enabled" ? YES : NO));
    }
    var ___r1;
}

,["void","id"]), new objj_method(sel_getUid("changeColor:"), function $BKShowcaseController__changeColor_(self, _cmd, aSender)
{
    var color = nil;
    if ((aSender == null ? null : aSender.isa.objj_msgSend1(aSender, "isKindOfClass:", CPColorPanel.isa.objj_msgSend0(CPColorPanel, "class"))))
        color = (aSender == null ? null : aSender.isa.objj_msgSend0(aSender, "color"));
    else
    {
        if ((aSender == null ? null : aSender.isa.objj_msgSend0(aSender, "titleOfSelectedItem")) === "More Choices...")
        {
            (aSender == null ? null : aSender.isa.objj_msgSend1(aSender, "addItemWithTitle:", "Other"));
            (aSender == null ? null : aSender.isa.objj_msgSend1(aSender, "selectItemWithTitle:", "Other"));
            (CPApp == null ? null : CPApp.isa.objj_msgSend1(CPApp, "orderFrontColorPanel:", self));
        }
        else
        {
            color = ((___r1 = (aSender == null ? null : aSender.isa.objj_msgSend0(aSender, "selectedItem"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "representedObject"));
            (aSender == null ? null : aSender.isa.objj_msgSend1(aSender, "removeItemWithTitle:", "Other"));
        }
    }
    if (color)
    {
        ((___r1 = self.isa.objj_msgSend0(self, "selectedThemeDescriptor")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setShowcaseBackgroundColor:", color));
        (BKShowcaseCell == null ? null : BKShowcaseCell.isa.objj_msgSend1(BKShowcaseCell, "setBackgroundColor:", color));
    }
    var ___r1;
}

,["void","id"])]);
}
var SelectionColor = nil;

{var the_class = objj_allocateClassPair(CPView, "BKThemeDescriptorCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_label", "CPTextField")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("setRepresentedObject:"), function $BKThemeDescriptorCell__setRepresentedObject_(self, _cmd, aThemeDescriptor)
{
    if (!self._label)
    {
        self._label = CPTextField.isa.objj_msgSend1(CPTextField, "labelWithTitle:", "hello");
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFont:", CPFont.isa.objj_msgSend1(CPFont, "systemFontOfSize:", 11.0)));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFrame:", CGRectMake(10.0, 0.0, CGRectGetWidth(self.isa.objj_msgSend0(self, "bounds")) - 20.0, CGRectGetHeight(self.isa.objj_msgSend0(self, "bounds")))));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setVerticalAlignment:", CPCenterVerticalTextAlignment));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
        self.isa.objj_msgSend1(self, "addSubview:", self._label);
    }
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setStringValue:", (aThemeDescriptor == null ? null : aThemeDescriptor.isa.objj_msgSend0(aThemeDescriptor, "themeName")) + " (" + ((___r2 = (aThemeDescriptor == null ? null : aThemeDescriptor.isa.objj_msgSend0(aThemeDescriptor, "themedShowcaseObjectTemplates"))), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "count")) + ")"));
    var ___r1, ___r2;
}

,["void","id"]), new objj_method(sel_getUid("setSelected:"), function $BKThemeDescriptorCell__setSelected_(self, _cmd, isSelected)
{
    self.isa.objj_msgSend1(self, "setBackgroundColor:", isSelected ? ((___r1 = self.isa.objj_msgSend0(self, "class")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "selectionColor")) : nil);
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setTextShadowOffset:", isSelected ? CGSizeMake(0.0, 1.0) : CGSizeMakeZero()));
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setTextShadowColor:", isSelected ? CPColor.isa.objj_msgSend0(CPColor, "blackColor") : nil));
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFont:", isSelected ? CPFont.isa.objj_msgSend1(CPFont, "boldSystemFontOfSize:", 11.0) : CPFont.isa.objj_msgSend1(CPFont, "systemFontOfSize:", 11.0)));
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setTextColor:", isSelected ? CPColor.isa.objj_msgSend0(CPColor, "whiteColor") : CPColor.isa.objj_msgSend0(CPColor, "blackColor")));
    var ___r1;
}

,["void","BOOL"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("selectionColor"), function $BKThemeDescriptorCell__selectionColor(self, _cmd)
{
    if (!SelectionColor)
        SelectionColor = CPColor.isa.objj_msgSend1(CPColor, "colorWithPatternImage:", ((___r1 = CPImage.isa.objj_msgSend0(CPImage, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithContentsOfFile:size:", ((___r2 = CPBundle.isa.objj_msgSend1(CPBundle, "bundleForClass:", BKThemeDescriptorCell.isa.objj_msgSend0(BKThemeDescriptorCell, "class"))), ___r2 == null ? null : ___r2.isa.objj_msgSend1(___r2, "pathForResource:", "selection.png")), CGSizeMake(1.0, 36.0))));
    return SelectionColor;
    var ___r1, ___r2;
}

,["CPImage"])]);
}
var ShowcaseCellBackgroundColor = nil,
    BKShowcaseCellBackgroundColorDidChangeNotification = "BKShowcaseCellBackgroundColorDidChangeNotification";

{var the_class = objj_allocateClassPair(CPView, "BKShowcaseCell"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_backgroundView", "CPView"), new objj_ivar("_view", "CPView"), new objj_ivar("_label", "CPTextField")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("init"), function $BKShowcaseCell__init(self, _cmd)
{
    self = objj_msgSendSuper0({ receiver:self, super_class:objj_getClass("BKShowcaseCell").super_class }, "init");
    if (self)
        ((___r1 = CPNotificationCenter.isa.objj_msgSend0(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : ___r1.isa.objj_msgSend(___r1, "addObserver:selector:name:object:", self, sel_getUid("showcaseBackgroundDidChange:"), BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    return self;
    var ___r1;
}

,["id"]), new objj_method(sel_getUid("initWithCoder:"), function $BKShowcaseCell__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper1({ receiver:self, super_class:objj_getClass("BKShowcaseCell").super_class }, "initWithCoder:", aCoder);
    if (self)
        ((___r1 = CPNotificationCenter.isa.objj_msgSend0(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : ___r1.isa.objj_msgSend(___r1, "addObserver:selector:name:object:", self, sel_getUid("showcaseBackgroundDidChange:"), BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    return self;
    var ___r1;
}

,["id","CPCoder"]), new objj_method(sel_getUid("showcaseBackgroundDidChange:"), function $BKShowcaseCell__showcaseBackgroundDidChange_(self, _cmd, aNotification)
{
    ((___r1 = self._backgroundView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setBackgroundColor:", BKShowcaseCell.isa.objj_msgSend0(BKShowcaseCell, "backgroundColor")));
    var ___r1;
}

,["void","CPNotification"]), new objj_method(sel_getUid("setSelected:"), function $BKShowcaseCell__setSelected_(self, _cmd, isSelected)
{
}

,["void","BOOL"]), new objj_method(sel_getUid("setRepresentedObject:"), function $BKShowcaseCell__setRepresentedObject_(self, _cmd, anObject)
{
    if (!anObject)
        return;
    if (!self._label)
    {
        self._label = ((___r1 = CPTextField.isa.objj_msgSend0(CPTextField, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "initWithFrame:", CGRectMakeZero()));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAlignment:", CPCenterTextAlignment));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewMinYMargin | CPViewWidthSizable));
        ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFont:", CPFont.isa.objj_msgSend1(CPFont, "boldSystemFontOfSize:", 11.0)));
        self.isa.objj_msgSend1(self, "addSubview:", self._label);
    }
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setStringValue:", (anObject == null ? null : anObject.isa.objj_msgSend1(anObject, "valueForKey:", "label"))));
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "sizeToFit"));
    ((___r1 = self._label), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFrame:", CGRectMake(0.0, CGRectGetHeight(self.isa.objj_msgSend0(self, "bounds")) - CGRectGetHeight(((___r2 = self._label), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "frame"))), CGRectGetWidth(self.isa.objj_msgSend0(self, "bounds")), CGRectGetHeight(((___r2 = self._label), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "frame"))))));
    if (!self._backgroundView)
    {
        self._backgroundView = ((___r1 = CPView.isa.objj_msgSend0(CPView, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init"));
        self.isa.objj_msgSend1(self, "addSubview:", self._backgroundView);
    }
    ((___r1 = self._backgroundView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFrame:", CGRectMake(0.0, 0.0, CGRectGetWidth(self.isa.objj_msgSend0(self, "bounds")), CGRectGetMinY(((___r2 = self._label), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "frame"))))));
    ((___r1 = self._backgroundView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    if (self._view)
        ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "removeFromSuperview"));
    self._view = (anObject == null ? null : anObject.isa.objj_msgSend1(anObject, "valueForKey:", "themedObject"));
    ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setTheme:", nil));
    ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setAutoresizingMask:", CPViewMinXMargin | CPViewMaxXMargin | CPViewMinYMargin | CPViewMaxYMargin));
    ((___r1 = self._view), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setFrameOrigin:", CGPointMake((CGRectGetWidth(((___r2 = self._backgroundView), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "bounds"))) - CGRectGetWidth(((___r2 = self._view), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "frame")))) / 2.0, (CGRectGetHeight(((___r2 = self._backgroundView), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "bounds"))) - CGRectGetHeight(((___r2 = self._view), ___r2 == null ? null : ___r2.isa.objj_msgSend0(___r2, "frame")))) / 2.0)));
    ((___r1 = self._backgroundView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "addSubview:", self._view));
    ((___r1 = self._backgroundView), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "setBackgroundColor:", BKShowcaseCell.isa.objj_msgSend0(BKShowcaseCell, "backgroundColor")));
    var ___r1, ___r2;
}

,["void","id"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("setBackgroundColor:"), function $BKShowcaseCell__setBackgroundColor_(self, _cmd, aColor)
{
    if (ShowcaseCellBackgroundColor === aColor)
        return;
    ShowcaseCellBackgroundColor = aColor;
    ((___r1 = CPNotificationCenter.isa.objj_msgSend0(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "postNotificationName:object:", BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    var ___r1;
}

,["void","CPColor"]), new objj_method(sel_getUid("backgroundColor"), function $BKShowcaseCell__backgroundColor(self, _cmd)
{
    return ShowcaseCellBackgroundColor;
}

,["CPColor"])]);
}
p;17;BKThemeTemplate.jt;1323;@STATIC;1.0;I;21;Foundation/CPObject.jt;1278;objj_executeFile("Foundation/CPObject.j", NO);
{var the_class = objj_allocateClassPair(CPObject, "BKThemeTemplate"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_name", "CPString"), new objj_ivar("_description", "CPString")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $BKThemeTemplate__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper0({ receiver:self, super_class:objj_getClass("BKThemeTemplate").super_class }, "init");
    if (self)
    {
        self._name = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "BKThemeTemplateName"));
        self._description = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "BKThemeTemplateDescription"));
    }
    return self;
}

,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $BKThemeTemplate__encodeWithCoder_(self, _cmd, aCoder)
{
    (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", self._name, "BKThemeTemplateName"));
    (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", self._description, "BKThemeTemplateDescription"));
}

,["void","CPCoder"])]);
}
p;24;BKThemedObjectTemplate.jt;1369;@STATIC;1.0;I;15;AppKit/CPView.jt;1330;objj_executeFile("AppKit/CPView.j", NO);
{var the_class = objj_allocateClassPair(CPView, "BKThemedObjectTemplate"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_label", "CPString"), new objj_ivar("_themedObject", "id")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $BKThemedObjectTemplate__initWithCoder_(self, _cmd, aCoder)
{
    self = objj_msgSendSuper0({ receiver:self, super_class:objj_getClass("BKThemedObjectTemplate").super_class }, "init");
    if (self)
    {
        self._label = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "BKThemedObjectTemplateLabel"));
        self._themedObject = (aCoder == null ? null : aCoder.isa.objj_msgSend1(aCoder, "decodeObjectForKey:", "BKThemedObjectTemplateThemedObject"));
    }
    return self;
}

,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $BKThemedObjectTemplate__encodeWithCoder_(self, _cmd, aCoder)
{
    (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", self._label, "BKThemedObjectTemplateLabel"));
    (aCoder == null ? null : aCoder.isa.objj_msgSend2(aCoder, "encodeObject:forKey:", self._themedObject, "BKThemedObjectTemplateThemedObject"));
}

,["void","CPCoder"])]);
}
p;19;BKThemeDescriptor.jt;15513;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;16;AppKit/CPColor.jI;16;AppKit/CPImage.jI;15;AppKit/CPView.jI;29;AppKit/_CPCibCustomResource.jt;15346;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("AppKit/CPColor.j", NO);objj_executeFile("AppKit/CPImage.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("AppKit/_CPCibCustomResource.j", NO);PatternIsHorizontal = CPColorPatternIsHorizontal;
PatternIsVertical = CPColorPatternIsVertical;
var ItemSizes = {},
    ThemedObjects = {},
    ThemedShowcaseObjects = {},
    BackgroundColors = {},
    LightCheckersColor = nil,
    DarkCheckersColor = nil,
    WindowBackgroundColor = nil;

{var the_class = objj_allocateClassPair(CPObject, "BKThemeDescriptor"),
meta_class = the_class.isa;objj_registerClassPair(the_class);
class_addMethods(meta_class, [new objj_method(sel_getUid("allThemeDescriptorClasses"), function $BKThemeDescriptor__allThemeDescriptorClasses(self, _cmd)
{
    var themeDescriptorClasses = [];
    for (candidate in global)
    {
        var theClass = objj_getClass(candidate),
            theClassName = class_getName(theClass);
        if (theClassName === "BKThemeDescriptor")
            continue;
        var index = theClassName.indexOf("ThemeDescriptor");
        if (index >= 0 && index === theClassName.length - "ThemeDescriptor".length)
            themeDescriptorClasses.push(theClass);
    }
    (themeDescriptorClasses == null ? null : themeDescriptorClasses.isa.objj_msgSend1(themeDescriptorClasses, "sortUsingSelector:", sel_getUid("compare:")));
    return themeDescriptorClasses;
}

,["CPArray"]), new objj_method(sel_getUid("lightCheckersColor"), function $BKThemeDescriptor__lightCheckersColor(self, _cmd)
{
    if (!LightCheckersColor)
        LightCheckersColor = CPColor.isa.objj_msgSend1(CPColor, "colorWithPatternImage:", ((___r1 = CPImage.isa.objj_msgSend0(CPImage, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithContentsOfFile:size:", ((___r2 = CPBundle.isa.objj_msgSend1(CPBundle, "bundleForClass:", BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "class"))), ___r2 == null ? null : ___r2.isa.objj_msgSend1(___r2, "pathForResource:", "light-checkers.png")), CGSizeMake(12.0, 12.0))));
    return LightCheckersColor;
    var ___r1, ___r2;
}

,["CPColor"]), new objj_method(sel_getUid("darkCheckersColor"), function $BKThemeDescriptor__darkCheckersColor(self, _cmd)
{
    if (!DarkCheckersColor)
        DarkCheckersColor = CPColor.isa.objj_msgSend1(CPColor, "colorWithPatternImage:", ((___r1 = CPImage.isa.objj_msgSend0(CPImage, "alloc")), ___r1 == null ? null : ___r1.isa.objj_msgSend2(___r1, "initWithContentsOfFile:size:", ((___r2 = CPBundle.isa.objj_msgSend1(CPBundle, "bundleForClass:", BKThemeDescriptor.isa.objj_msgSend0(BKThemeDescriptor, "class"))), ___r2 == null ? null : ___r2.isa.objj_msgSend1(___r2, "pathForResource:", "dark-checkers.png")), CGSizeMake(12.0, 12.0))));
    return DarkCheckersColor;
    var ___r1, ___r2;
}

,["CPColor"]), new objj_method(sel_getUid("windowBackgroundColor"), function $BKThemeDescriptor__windowBackgroundColor(self, _cmd)
{
    return CPColor.isa.objj_msgSend2(CPColor, "colorWithCalibratedWhite:alpha:", 0.95, 1.0);
}

,["CPColor"]), new objj_method(sel_getUid("defaultShowcaseBackgroundColor"), function $BKThemeDescriptor__defaultShowcaseBackgroundColor(self, _cmd)
{
    return CPColor.isa.objj_msgSend2(CPColor, "colorWithCalibratedWhite:alpha:", 0.95, 1.0);
}

,["CPColor"]), new objj_method(sel_getUid("showcaseBackgroundColor"), function $BKThemeDescriptor__showcaseBackgroundColor(self, _cmd)
{
    var className = self.isa.objj_msgSend0(self, "className");
    if (!BackgroundColors[className])
        BackgroundColors[className] = self.isa.objj_msgSend0(self, "defaultShowcaseBackgroundColor");
    return BackgroundColors[className];
}

,["CPColor"]), new objj_method(sel_getUid("setShowcaseBackgroundColor:"), function $BKThemeDescriptor__setShowcaseBackgroundColor_(self, _cmd, aColor)
{
    BackgroundColors[self.isa.objj_msgSend0(self, "className")] = aColor;
}

,["void","CPColor"]), new objj_method(sel_getUid("itemSize"), function $BKThemeDescriptor__itemSize(self, _cmd)
{
    var className = self.isa.objj_msgSend0(self, "className");
    if (!ItemSizes[className])
        self.isa.objj_msgSend0(self, "calculateThemedObjectTemplates");
    return CGSizeMakeCopy(ItemSizes[className]);
}

,["CGSize"]), new objj_method(sel_getUid("themedObjectTemplates"), function $BKThemeDescriptor__themedObjectTemplates(self, _cmd)
{
    var className = self.isa.objj_msgSend0(self, "className");
    if (!ThemedObjects[className])
        self.isa.objj_msgSend0(self, "calculateThemedObjectTemplates");
    return ThemedObjects[className];
}

,["CPArray"]), new objj_method(sel_getUid("themedShowcaseObjectTemplates"), function $BKThemeDescriptor__themedShowcaseObjectTemplates(self, _cmd)
{
    var className = self.isa.objj_msgSend0(self, "className");
    if (!ThemedShowcaseObjects[className])
        self.isa.objj_msgSend0(self, "calculateThemedObjectTemplates");
    return ThemedShowcaseObjects[className];
}

,["CPArray"]), new objj_method(sel_getUid("calculateThemedObjectTemplates"), function $BKThemeDescriptor__calculateThemedObjectTemplates(self, _cmd)
{
    var templates = [],
        showcaseTemplates = [],
        itemSize = CGSizeMake(0.0, 0.0),
        methods = class_copyMethodList(self.isa.objj_msgSend0(self, "class").isa),
        index = 0,
        count = (methods == null ? null : methods.isa.objj_msgSend0(methods, "count")),
        excludes = [];
    if (self.isa.objj_msgSend1(self, "respondsToSelector:", sel_getUid("themeShowcaseExcludes")))
        excludes = self.isa.objj_msgSend0(self, "themeShowcaseExcludes");
    for (; index < excludes.length; ++index)
    {
        var name = excludes[index].toLowerCase();
        if (name && name.indexOf("themed") !== 0)
            excludes[index] = "themed" + name;
        else
            excludes[index] = name;
    }
    for (index = 0; index < count; ++index)
    {
        var method = methods[index],
            selector = method_getName(method);
        if (selector.indexOf("themed") !== 0)
            continue;
        var impl = method_getImplementation(method),
            object = impl(self, selector);
        if (!object)
            continue;
        var template = ((___r1 = (BKThemedObjectTemplate == null ? null : BKThemedObjectTemplate.isa.objj_msgSend0(BKThemedObjectTemplate, "alloc"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "init")),
            excluded = (excludes == null ? null : excludes.isa.objj_msgSend1(excludes, "containsObject:", selector.toLowerCase()));
        (template == null ? null : template.isa.objj_msgSend2(template, "setValue:forKey:", object, "themedObject"));
        (template == null ? null : template.isa.objj_msgSend2(template, "setValue:forKey:", BKLabelFromIdentifier(selector), "label"));
        (templates == null ? null : templates.isa.objj_msgSend1(templates, "addObject:", template));
        if (!excluded)
        {
            if ((object == null ? null : object.isa.objj_msgSend1(object, "isKindOfClass:", CPView.isa.objj_msgSend0(CPView, "class"))))
            {
                var size = (object == null ? null : object.isa.objj_msgSend0(object, "frame")).size,
                    labelWidth = ((___r1 = (template == null ? null : template.isa.objj_msgSend1(template, "valueForKey:", "label"))), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "sizeWithFont:", CPFont.isa.objj_msgSend1(CPFont, "boldSystemFontOfSize:", 0))).width + 20.0;
                if (size.width > itemSize.width)
                    itemSize.width = size.width;
                if (labelWidth > itemSize.width)
                    itemSize.width = labelWidth;
                if (size.height > itemSize.height)
                    itemSize.height = size.height;
            }
            (showcaseTemplates == null ? null : showcaseTemplates.isa.objj_msgSend1(showcaseTemplates, "addObject:", template));
        }
    }
    var className = self.isa.objj_msgSend0(self, "className");
    ItemSizes[className] = itemSize;
    ThemedObjects[className] = templates;
    ThemedShowcaseObjects[className] = showcaseTemplates;
    var ___r1;
}

,["void"]), new objj_method(sel_getUid("compare:"), function $BKThemeDescriptor__compare_(self, _cmd, aThemeDescriptor)
{
    return ((___r1 = self.isa.objj_msgSend0(self, "themeName")), ___r1 == null ? null : ___r1.isa.objj_msgSend1(___r1, "compare:", (aThemeDescriptor == null ? null : aThemeDescriptor.isa.objj_msgSend0(aThemeDescriptor, "themeName"))));
    var ___r1;
}

,["int","BKThemeDescriptor"]), new objj_method(sel_getUid("registerThemeValues:forObject:"), function $BKThemeDescriptor__registerThemeValues_forObject_(self, _cmd, themeValues, anObject)
{
    self.isa.objj_msgSend2(self, "registerThemeValues:forView:", themeValues, anObject);
}

,["void","CPArray","id"]), new objj_method(sel_getUid("registerThemeValues:forView:"), function $BKThemeDescriptor__registerThemeValues_forView_(self, _cmd, themeValues, aView)
{
    for (var i = 0; i < themeValues.length; ++i)
    {
        var attributeValueState = themeValues[i],
            attribute = attributeValueState[0],
            value = attributeValueState[1],
            state = attributeValueState[2];
        if (state)
        {
            if (state.isa && (state == null ? null : state.isa.objj_msgSend1(state, "isKindOfClass:", CPArray)))
                (aView == null ? null : aView.isa.objj_msgSend3(aView, "setValue:forThemeAttribute:inStates:", value, attribute, state));
            else
                (aView == null ? null : aView.isa.objj_msgSend3(aView, "setValue:forThemeAttribute:inState:", value, attribute, state));
        }
        else
            (aView == null ? null : aView.isa.objj_msgSend2(aView, "setValue:forThemeAttribute:", value, attribute));
    }
}

,["void","CPArray","CPView"]), new objj_method(sel_getUid("registerThemeValues:forObject:inherit:"), function $BKThemeDescriptor__registerThemeValues_forObject_inherit_(self, _cmd, themeValues, anObject, inheritedValues)
{
    self.isa.objj_msgSend3(self, "registerThemeValues:forView:inherit:", themeValues, anObject, inheritedValues);
}

,["void","CPArray","id","CPArray"]), new objj_method(sel_getUid("registerThemeValues:forView:inherit:"), function $BKThemeDescriptor__registerThemeValues_forView_inherit_(self, _cmd, themeValues, aView, inheritedValues)
{
    if (inheritedValues)
    {
        var themeName = self.isa.objj_msgSend0(self, "themeName"),
            index = themeName.indexOf("-");
        if (index < 0)
        {
            self.isa.objj_msgSend2(self, "registerThemeValues:forView:", inheritedValues, aView);
        }
        else
        {
            var themePath = themeName.substr(index + 1) + "/";
            for (var i = 0; i < inheritedValues.length; ++i)
            {
                var attributeValueState = inheritedValues[i],
                    attribute = attributeValueState[0],
                    value = attributeValueState[1],
                    state = attributeValueState[2],
                    pattern = nil;
                if (typeof value === "object" && value.hasOwnProperty("isa") && (value == null ? null : value.isa.objj_msgSend1(value, "isKindOfClass:", CPColor)) && (pattern = (value == null ? null : value.isa.objj_msgSend0(value, "patternImage"))))
                {
                    if ((pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "isThreePartImage")) || (pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "isNinePartImage")))
                    {
                        var slices = (pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "imageSlices")),
                            newSlices = [];
                        for (var sliceIndex = 0; sliceIndex < slices.length; ++sliceIndex)
                        {
                            var slice = slices[sliceIndex],
                                filename = themePath + ((___r1 = (slice == null ? null : slice.isa.objj_msgSend0(slice, "filename"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "lastPathComponent")),
                                size = (slice == null ? null : slice.isa.objj_msgSend0(slice, "size"));
                            newSlices.push([filename, size.width, size.height]);
                        }
                        if ((pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "isThreePartImage")))
                            value = PatternColor(newSlices, (pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "isVertical")));
                        else
                            value = PatternColor(newSlices);
                    }
                    else
                    {
                        var filename = themePath + ((___r1 = (pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "filename"))), ___r1 == null ? null : ___r1.isa.objj_msgSend0(___r1, "lastPathComponent")),
                            size = (pattern == null ? null : pattern.isa.objj_msgSend0(pattern, "size"));
                        value = PatternColor(filename, size.width, size.height);
                    }
                }
                if (state)
                {
                    if (state.isa && (state == null ? null : state.isa.objj_msgSend1(state, "isKindOfClass:", CPArray)))
                        (aView == null ? null : aView.isa.objj_msgSend3(aView, "setValue:forThemeAttribute:inStates:", value, attribute, state));
                    else
                        (aView == null ? null : aView.isa.objj_msgSend3(aView, "setValue:forThemeAttribute:inState:", value, attribute, state));
                }
                else
                    (aView == null ? null : aView.isa.objj_msgSend2(aView, "setValue:forThemeAttribute:", value, attribute));
            }
        }
    }
    if (themeValues)
        self.isa.objj_msgSend2(self, "registerThemeValues:forView:", themeValues, aView);
    var ___r1;
}

,["void","CPArray","CPView","CPArray"])]);
}
BKLabelFromIdentifier = function(anIdentifier)
{
    var string = anIdentifier.substr("themed".length),
        index = 0,
        count = string.length,
        label = "",
        lastCapital = null,
        isLeadingCapital = YES;
    for (; index < count; ++index)
    {
        var character = string.charAt(index),
            isCapital = /^[A-Z]/.test(character);
        if (isCapital)
        {
            if (!isLeadingCapital)
            {
                if (lastCapital === null)
                    label += ' ' + character.toLowerCase();
                else
                    label += character;
            }
            lastCapital = character;
        }
        else
        {
            if (isLeadingCapital && lastCapital !== null)
                label += lastCapital;
            label += character;
            lastCapital = null;
            isLeadingCapital = NO;
        }
    }
    return label;
}
PatternImage = function(name, width, height)
{
    return _CPCibCustomResource.isa.objj_msgSend2(_CPCibCustomResource, "imageResourceWithName:size:", name, CGSizeMake(width, height));
}
PatternColor = function()
{
    var args = Array.prototype.slice.apply(arguments);
    args.push(PatternImage);
    return CPColorWithImages.apply(this, args);
}
p;10;BlendKit.jt;306;@STATIC;1.0;i;22;BKShowcaseController.ji;19;BKThemeDescriptor.ji;17;BKThemeTemplate.ji;24;BKThemedObjectTemplate.jt;186;objj_executeFile("BKShowcaseController.j", YES);objj_executeFile("BKThemeDescriptor.j", YES);objj_executeFile("BKThemeTemplate.j", YES);objj_executeFile("BKThemedObjectTemplate.j", YES);e;