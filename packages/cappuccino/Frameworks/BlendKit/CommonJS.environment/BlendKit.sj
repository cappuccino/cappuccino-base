@STATIC;1.0;p;22;BKShowcaseController.jt;40983;@STATIC;1.0;I;21;Foundation/CPObject.jI;25;AppKit/CPCollectionView.jI;21;AppKit/CPColorPanel.jI;21;AppKit/CPScrollView.jI;20;AppKit/CPSplitView.jI;18;AppKit/CPToolbar.jI;15;AppKit/CPView.jI;27;AppKit/CPWindow_Constants.ji;19;BKThemeDescriptor.jt;40731;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("AppKit/CPCollectionView.j", NO);objj_executeFile("AppKit/CPColorPanel.j", NO);objj_executeFile("AppKit/CPScrollView.j", NO);objj_executeFile("AppKit/CPSplitView.j", NO);objj_executeFile("AppKit/CPToolbar.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("AppKit/CPWindow_Constants.j", NO);objj_executeFile("BKThemeDescriptor.j", YES);var LEFT_PANEL_WIDTH = 176.0;
var BKLearnMoreToolbarItemIdentifier = "BKLearnMoreToolbarItemIdentifier",
    BKStateToolbarItemIdentifier = "BKStateToolbarItemIdentifier",
    BKBackgroundColorToolbarItemIdentifier = "BKBackgroundColorToolbarItemIdentifier";

{var the_class = objj_allocateClassPair(CPObject, "BKShowcaseController"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_themeDescriptorClasses", "CPArray"), new objj_ivar("_themesCollectionView", "CPCollectionView"), new objj_ivar("_themedObjectsCollectionView", "CPCollectionView"), new objj_ivar("theWindow", "CPWindow")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("applicationDidFinishLaunching:"), function $BKShowcaseController__applicationDidFinishLaunching_(self, _cmd, aNotification)
{
    self._themeDescriptorClasses = (BKThemeDescriptor.isa.method_msgSend["allThemeDescriptorClasses"] || _objj_forward)(BKThemeDescriptor, "allThemeDescriptorClasses");
    self.theWindow = ((___r1 = (CPWindow == null ? null : (CPWindow.isa.method_msgSend["alloc"] || _objj_forward)(CPWindow, "alloc"))), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithContentRect:styleMask:"] || _objj_forward)(___r1, "initWithContentRect:styleMask:", CGRectMakeZero(), CPBorderlessBridgeWindowMask));
    var toolbar = ((___r1 = (CPToolbar.isa.method_msgSend["alloc"] || _objj_forward)(CPToolbar, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithIdentifier:"] || _objj_forward)(___r1, "initWithIdentifier:", "Toolbar"));
    (toolbar == null ? null : (toolbar.isa.method_msgSend["setDelegate:"] || _objj_forward)(toolbar, "setDelegate:", self));
    ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["setToolbar:"] || _objj_forward)(___r1, "setToolbar:", toolbar));
    var contentView = ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["contentView"] || _objj_forward)(___r1, "contentView")),
        bounds = (contentView == null ? null : (contentView.isa.method_msgSend["bounds"] || _objj_forward)(contentView, "bounds")),
        splitView = ((___r1 = (CPSplitView.isa.method_msgSend["alloc"] || _objj_forward)(CPSplitView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", bounds));
    (splitView == null ? null : (splitView.isa.method_msgSend["setIsPaneSplitter:"] || _objj_forward)(splitView, "setIsPaneSplitter:", YES));
    (splitView == null ? null : (splitView.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(splitView, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    (contentView == null ? null : (contentView.isa.method_msgSend["addSubview:"] || _objj_forward)(contentView, "addSubview:", splitView));
    var label = (CPTextField.isa.method_msgSend["labelWithTitle:"] || _objj_forward)(CPTextField, "labelWithTitle:", "THEMES");
    (label == null ? null : (label.isa.method_msgSend["setFont:"] || _objj_forward)(label, "setFont:", (CPFont.isa.method_msgSend["boldSystemFontOfSize:"] || _objj_forward)(CPFont, "boldSystemFontOfSize:", 11.0)));
    (label == null ? null : (label.isa.method_msgSend["setTextColor:"] || _objj_forward)(label, "setTextColor:", (CPColor.isa.method_msgSend["colorWithCalibratedRed:green:blue:alpha:"] || _objj_forward)(CPColor, "colorWithCalibratedRed:green:blue:alpha:", 93.0 / 255.0, 93.0 / 255.0, 93.0 / 255.0, 1.0)));
    (label == null ? null : (label.isa.method_msgSend["setTextShadowColor:"] || _objj_forward)(label, "setTextShadowColor:", (CPColor.isa.method_msgSend["colorWithCalibratedRed:green:blue:alpha:"] || _objj_forward)(CPColor, "colorWithCalibratedRed:green:blue:alpha:", 225.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0, 0.7)));
    (label == null ? null : (label.isa.method_msgSend["setTextShadowOffset:"] || _objj_forward)(label, "setTextShadowOffset:", CGSizeMake(0.0, 1.0)));
    (label == null ? null : (label.isa.method_msgSend["sizeToFit"] || _objj_forward)(label, "sizeToFit"));
    (label == null ? null : (label.isa.method_msgSend["setFrameOrigin:"] || _objj_forward)(label, "setFrameOrigin:", CGPointMake(5.0, 4.0)));
    var themeDescriptorItem = ((___r1 = (CPCollectionViewItem.isa.method_msgSend["alloc"] || _objj_forward)(CPCollectionViewItem, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init"));
    (themeDescriptorItem == null ? null : (themeDescriptorItem.isa.method_msgSend["setView:"] || _objj_forward)(themeDescriptorItem, "setView:", ((___r1 = (BKThemeDescriptorCell == null ? null : (BKThemeDescriptorCell.isa.method_msgSend["alloc"] || _objj_forward)(BKThemeDescriptorCell, "alloc"))), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init"))));
    self._themesCollectionView = ((___r1 = (CPCollectionView.isa.method_msgSend["alloc"] || _objj_forward)(CPCollectionView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, LEFT_PANEL_WIDTH, CGRectGetHeight(bounds))));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setDelegate:"] || _objj_forward)(___r1, "setDelegate:", self));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setItemPrototype:"] || _objj_forward)(___r1, "setItemPrototype:", themeDescriptorItem));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setMinItemSize:"] || _objj_forward)(___r1, "setMinItemSize:", CGSizeMake(20.0, 36.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setMaxItemSize:"] || _objj_forward)(___r1, "setMaxItemSize:", CGSizeMake(10000000.0, 36.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setMaxNumberOfColumns:"] || _objj_forward)(___r1, "setMaxNumberOfColumns:", 1));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setContent:"] || _objj_forward)(___r1, "setContent:", self._themeDescriptorClasses));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setVerticalMargin:"] || _objj_forward)(___r1, "setVerticalMargin:", 0.0));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setSelectable:"] || _objj_forward)(___r1, "setSelectable:", YES));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setFrameOrigin:"] || _objj_forward)(___r1, "setFrameOrigin:", CGPointMake(0.0, 20.0)));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    var scrollView = ((___r1 = (CPScrollView.isa.method_msgSend["alloc"] || _objj_forward)(CPScrollView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, LEFT_PANEL_WIDTH, CGRectGetHeight(bounds)))),
        contentView = (scrollView == null ? null : (scrollView.isa.method_msgSend["contentView"] || _objj_forward)(scrollView, "contentView"));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setAutohidesScrollers:"] || _objj_forward)(scrollView, "setAutohidesScrollers:", YES));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setDocumentView:"] || _objj_forward)(scrollView, "setDocumentView:", self._themesCollectionView));
    (contentView == null ? null : (contentView.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(contentView, "setBackgroundColor:", (CPColor.isa.method_msgSend["colorWithRed:green:blue:alpha:"] || _objj_forward)(CPColor, "colorWithRed:green:blue:alpha:", 212.0 / 255.0, 221.0 / 255.0, 230.0 / 255.0, 1.0)));
    (contentView == null ? null : (contentView.isa.method_msgSend["addSubview:"] || _objj_forward)(contentView, "addSubview:", label));
    (splitView == null ? null : (splitView.isa.method_msgSend["addSubview:"] || _objj_forward)(splitView, "addSubview:", scrollView));
    self._themedObjectsCollectionView = ((___r1 = (CPCollectionView.isa.method_msgSend["alloc"] || _objj_forward)(CPCollectionView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", CGRectMake(0.0, 0.0, CGRectGetWidth(bounds) - LEFT_PANEL_WIDTH - 1.0, 10.0)));
    var collectionViewItem = ((___r1 = (CPCollectionViewItem.isa.method_msgSend["alloc"] || _objj_forward)(CPCollectionViewItem, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init"));
    (collectionViewItem == null ? null : (collectionViewItem.isa.method_msgSend["setView:"] || _objj_forward)(collectionViewItem, "setView:", ((___r1 = (BKShowcaseCell == null ? null : (BKShowcaseCell.isa.method_msgSend["alloc"] || _objj_forward)(BKShowcaseCell, "alloc"))), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init"))));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setItemPrototype:"] || _objj_forward)(___r1, "setItemPrototype:", collectionViewItem));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setVerticalMargin:"] || _objj_forward)(___r1, "setVerticalMargin:", 20.0));
    ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewWidthSizable));
    var scrollView = ((___r1 = (CPScrollView.isa.method_msgSend["alloc"] || _objj_forward)(CPScrollView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", CGRectMake(LEFT_PANEL_WIDTH + 1.0, 0.0, CGRectGetWidth(bounds) - LEFT_PANEL_WIDTH - 1.0, CGRectGetHeight(bounds))));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setHasHorizontalScroller:"] || _objj_forward)(scrollView, "setHasHorizontalScroller:", NO));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setAutohidesScrollers:"] || _objj_forward)(scrollView, "setAutohidesScrollers:", YES));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(scrollView, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    (scrollView == null ? null : (scrollView.isa.method_msgSend["setDocumentView:"] || _objj_forward)(scrollView, "setDocumentView:", self._themedObjectsCollectionView));
    (splitView == null ? null : (splitView.isa.method_msgSend["addSubview:"] || _objj_forward)(splitView, "addSubview:", scrollView));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setSelectionIndexes:"] || _objj_forward)(___r1, "setSelectionIndexes:", (CPIndexSet.isa.method_msgSend["indexSetWithIndex:"] || _objj_forward)(CPIndexSet, "indexSetWithIndex:", 0)));
    ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["setMovable:"] || _objj_forward)(___r1, "setMovable:", NO));
    ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["setFullPlatformWindow:"] || _objj_forward)(___r1, "setFullPlatformWindow:", YES));
    ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["makeKeyAndOrderFront:"] || _objj_forward)(___r1, "makeKeyAndOrderFront:", self));
    ((___r1 = self._themesCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["addObserver:forKeyPath:options:context:"] || _objj_forward)(___r1, "addObserver:forKeyPath:options:context:", self, "selectionIndexes", CPKeyValueObservingOptionNew | CPKeyValueObservingOptionInitial, nil));
    var ___r1;
}

,["void","CPNotification"]), new objj_method(sel_getUid("observeValueForKeyPath:ofObject:change:context:"), function $BKShowcaseController__observeValueForKeyPath_ofObject_change_context_(self, _cmd, keyPath, object, change, context)
{
    if (object == self._themesCollectionView && keyPath == "selectionIndexes")
    {
        var themeDescriptorClass = self._themeDescriptorClasses[((___r1 = (object == null ? null : (object.isa.method_msgSend["selectionIndexes"] || _objj_forward)(object, "selectionIndexes"))), ___r1 == null ? null : (___r1.isa.method_msgSend["firstIndex"] || _objj_forward)(___r1, "firstIndex"))],
            itemSize = (themeDescriptorClass == null ? null : (themeDescriptorClass.isa.method_msgSend["itemSize"] || _objj_forward)(themeDescriptorClass, "itemSize"));
        itemSize.width = MAX(100.0, itemSize.width + 20.0);
        itemSize.height = MAX(100.0, itemSize.height + 30.0);
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setMinItemSize:"] || _objj_forward)(___r1, "setMinItemSize:", itemSize));
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setMaxItemSize:"] || _objj_forward)(___r1, "setMaxItemSize:", itemSize));
        ((___r1 = self._themedObjectsCollectionView), ___r1 == null ? null : (___r1.isa.method_msgSend["setContent:"] || _objj_forward)(___r1, "setContent:", (themeDescriptorClass == null ? null : (themeDescriptorClass.isa.method_msgSend["themedShowcaseObjectTemplates"] || _objj_forward)(themeDescriptorClass, "themedShowcaseObjectTemplates"))));
        (BKShowcaseCell == null ? null : (BKShowcaseCell.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(BKShowcaseCell, "setBackgroundColor:", (themeDescriptorClass == null ? null : (themeDescriptorClass.isa.method_msgSend["showcaseBackgroundColor"] || _objj_forward)(themeDescriptorClass, "showcaseBackgroundColor"))));
    }
    var ___r1;
}

,["void","CPString","id","CPDictionary","void"]), new objj_method(sel_getUid("hasLearnMoreURL"), function $BKShowcaseController__hasLearnMoreURL(self, _cmd)
{
    return ((___r1 = (CPBundle.isa.method_msgSend["mainBundle"] || _objj_forward)(CPBundle, "mainBundle")), ___r1 == null ? null : (___r1.isa.method_msgSend["objectForInfoDictionaryKey:"] || _objj_forward)(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreURL"));
    var ___r1;
}

,["BOOL"]), new objj_method(sel_getUid("toolbarAllowedItemIdentifiers:"), function $BKShowcaseController__toolbarAllowedItemIdentifiers_(self, _cmd, aToolbar)
{
    return [BKLearnMoreToolbarItemIdentifier, CPToolbarSpaceItemIdentifier, CPToolbarFlexibleSpaceItemIdentifier, BKBackgroundColorToolbarItemIdentifier, BKStateToolbarItemIdentifier];
}

,["CPArray","CPToolbar"]), new objj_method(sel_getUid("toolbarDefaultItemIdentifiers:"), function $BKShowcaseController__toolbarDefaultItemIdentifiers_(self, _cmd, aToolbar)
{
    var itemIdentifiers = [CPToolbarFlexibleSpaceItemIdentifier, BKBackgroundColorToolbarItemIdentifier, BKStateToolbarItemIdentifier];
    if ((self.isa.method_msgSend["hasLearnMoreURL"] || _objj_forward)(self, "hasLearnMoreURL"))
        itemIdentifiers = [BKLearnMoreToolbarItemIdentifier].concat(itemIdentifiers);
    return itemIdentifiers;
}

,["CPArray","CPToolbar"]), new objj_method(sel_getUid("toolbar:itemForItemIdentifier:willBeInsertedIntoToolbar:"), function $BKShowcaseController__toolbar_itemForItemIdentifier_willBeInsertedIntoToolbar_(self, _cmd, aToolbar, anItemIdentifier, aFlag)
{
    var toolbarItem = ((___r1 = (CPToolbarItem.isa.method_msgSend["alloc"] || _objj_forward)(CPToolbarItem, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithItemIdentifier:"] || _objj_forward)(___r1, "initWithItemIdentifier:", anItemIdentifier));
    (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setTarget:"] || _objj_forward)(toolbarItem, "setTarget:", self));
    if (anItemIdentifier === BKStateToolbarItemIdentifier)
    {
        var popUpButton = (CPPopUpButton.isa.method_msgSend["buttonWithTitle:"] || _objj_forward)(CPPopUpButton, "buttonWithTitle:", "Enabled");
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "Disabled"));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setView:"] || _objj_forward)(toolbarItem, "setView:", popUpButton));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setTarget:"] || _objj_forward)(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setAction:"] || _objj_forward)(toolbarItem, "setAction:", sel_getUid("changeState:")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setLabel:"] || _objj_forward)(toolbarItem, "setLabel:", "State"));
        var width = CGRectGetWidth((popUpButton == null ? null : (popUpButton.isa.method_msgSend["frame"] || _objj_forward)(popUpButton, "frame")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMinSize:"] || _objj_forward)(toolbarItem, "setMinSize:", CGSizeMake(width + 20.0, 25.0)));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMaxSize:"] || _objj_forward)(toolbarItem, "setMaxSize:", CGSizeMake(width + 20.0, 25.0)));
    }
    else if (anItemIdentifier === BKBackgroundColorToolbarItemIdentifier)
    {
        var popUpButton = (CPPopUpButton.isa.method_msgSend["buttonWithTitle:"] || _objj_forward)(CPPopUpButton, "buttonWithTitle:", "Window Background");
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "Light Checkers"));
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "Dark Checkers"));
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "White"));
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "Black"));
        (popUpButton == null ? null : (popUpButton.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(popUpButton, "addItemWithTitle:", "More Choices..."));
        var itemArray = (popUpButton == null ? null : (popUpButton.isa.method_msgSend["itemArray"] || _objj_forward)(popUpButton, "itemArray"));
        ((___r1 = itemArray[0]), ___r1 == null ? null : (___r1.isa.method_msgSend["setRepresentedObject:"] || _objj_forward)(___r1, "setRepresentedObject:", (BKThemeDescriptor.isa.method_msgSend["windowBackgroundColor"] || _objj_forward)(BKThemeDescriptor, "windowBackgroundColor")));
        ((___r1 = itemArray[1]), ___r1 == null ? null : (___r1.isa.method_msgSend["setRepresentedObject:"] || _objj_forward)(___r1, "setRepresentedObject:", (BKThemeDescriptor.isa.method_msgSend["lightCheckersColor"] || _objj_forward)(BKThemeDescriptor, "lightCheckersColor")));
        ((___r1 = itemArray[2]), ___r1 == null ? null : (___r1.isa.method_msgSend["setRepresentedObject:"] || _objj_forward)(___r1, "setRepresentedObject:", (BKThemeDescriptor.isa.method_msgSend["darkCheckersColor"] || _objj_forward)(BKThemeDescriptor, "darkCheckersColor")));
        ((___r1 = itemArray[3]), ___r1 == null ? null : (___r1.isa.method_msgSend["setRepresentedObject:"] || _objj_forward)(___r1, "setRepresentedObject:", (CPColor.isa.method_msgSend["whiteColor"] || _objj_forward)(CPColor, "whiteColor")));
        ((___r1 = itemArray[4]), ___r1 == null ? null : (___r1.isa.method_msgSend["setRepresentedObject:"] || _objj_forward)(___r1, "setRepresentedObject:", (CPColor.isa.method_msgSend["blackColor"] || _objj_forward)(CPColor, "blackColor")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setView:"] || _objj_forward)(toolbarItem, "setView:", popUpButton));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setTarget:"] || _objj_forward)(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setAction:"] || _objj_forward)(toolbarItem, "setAction:", sel_getUid("changeColor:")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setLabel:"] || _objj_forward)(toolbarItem, "setLabel:", "Background Color"));
        var width = CGRectGetWidth((popUpButton == null ? null : (popUpButton.isa.method_msgSend["frame"] || _objj_forward)(popUpButton, "frame")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMinSize:"] || _objj_forward)(toolbarItem, "setMinSize:", CGSizeMake(width, 25.0)));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMaxSize:"] || _objj_forward)(toolbarItem, "setMaxSize:", CGSizeMake(width, 25.0)));
    }
    else if (anItemIdentifier === BKLearnMoreToolbarItemIdentifier)
    {
        var title = ((___r1 = (CPBundle.isa.method_msgSend["mainBundle"] || _objj_forward)(CPBundle, "mainBundle")), ___r1 == null ? null : (___r1.isa.method_msgSend["objectForInfoDictionaryKey:"] || _objj_forward)(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreButtonTitle"));
        if (!title)
            title = ((___r1 = (CPBundle.isa.method_msgSend["mainBundle"] || _objj_forward)(CPBundle, "mainBundle")), ___r1 == null ? null : (___r1.isa.method_msgSend["objectForInfoDictionaryKey:"] || _objj_forward)(___r1, "objectForInfoDictionaryKey:", "CPBundleName")) || "Home Page";
        var button = (CPButton.isa.method_msgSend["buttonWithTitle:"] || _objj_forward)(CPButton, "buttonWithTitle:", title);
        ((___r1 = self.theWindow), ___r1 == null ? null : (___r1.isa.method_msgSend["setDefaultButton:"] || _objj_forward)(___r1, "setDefaultButton:", button));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setView:"] || _objj_forward)(toolbarItem, "setView:", button));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setLabel:"] || _objj_forward)(toolbarItem, "setLabel:", "Learn More"));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setTarget:"] || _objj_forward)(toolbarItem, "setTarget:", nil));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setAction:"] || _objj_forward)(toolbarItem, "setAction:", sel_getUid("learnMore:")));
        var width = CGRectGetWidth((button == null ? null : (button.isa.method_msgSend["frame"] || _objj_forward)(button, "frame")));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMinSize:"] || _objj_forward)(toolbarItem, "setMinSize:", CGSizeMake(width, 25.0)));
        (toolbarItem == null ? null : (toolbarItem.isa.method_msgSend["setMaxSize:"] || _objj_forward)(toolbarItem, "setMaxSize:", CGSizeMake(width, 25.0)));
    }
    return toolbarItem;
    var ___r1;
}

,["CPToolbarItem","CPToolbar","CPString","BOOL"]), new objj_method(sel_getUid("learnMore:"), function $BKShowcaseController__learnMore_(self, _cmd, aSender)
{
    window.location.href = ((___r1 = (CPBundle.isa.method_msgSend["mainBundle"] || _objj_forward)(CPBundle, "mainBundle")), ___r1 == null ? null : (___r1.isa.method_msgSend["objectForInfoDictionaryKey:"] || _objj_forward)(___r1, "objectForInfoDictionaryKey:", "BKLearnMoreURL"));
    var ___r1;
}

,["void","id"]), new objj_method(sel_getUid("selectedThemeDescriptor"), function $BKShowcaseController__selectedThemeDescriptor(self, _cmd)
{
    return self._themeDescriptorClasses[((___r1 = ((___r2 = self._themesCollectionView), ___r2 == null ? null : (___r2.isa.method_msgSend["selectionIndexes"] || _objj_forward)(___r2, "selectionIndexes"))), ___r1 == null ? null : (___r1.isa.method_msgSend["firstIndex"] || _objj_forward)(___r1, "firstIndex"))];
    var ___r1, ___r2;
}

,["BKThemeDescriptor"]), new objj_method(sel_getUid("changeState:"), function $BKShowcaseController__changeState_(self, _cmd, aSender)
{
    var themedShowcaseObjectTemplates = ((___r1 = (self.isa.method_msgSend["selectedThemeDescriptor"] || _objj_forward)(self, "selectedThemeDescriptor")), ___r1 == null ? null : (___r1.isa.method_msgSend["themedShowcaseObjectTemplates"] || _objj_forward)(___r1, "themedShowcaseObjectTemplates")),
        count = (themedShowcaseObjectTemplates == null ? null : (themedShowcaseObjectTemplates.isa.method_msgSend["count"] || _objj_forward)(themedShowcaseObjectTemplates, "count"));
    while (count--)
    {
        var themedObject = ((___r1 = themedShowcaseObjectTemplates[count]), ___r1 == null ? null : (___r1.isa.method_msgSend["valueForKey:"] || _objj_forward)(___r1, "valueForKey:", "themedObject"));
        if ((themedObject == null ? null : (themedObject.isa.method_msgSend["respondsToSelector:"] || _objj_forward)(themedObject, "respondsToSelector:", sel_getUid("setEnabled:"))))
            (themedObject == null ? null : (themedObject.isa.method_msgSend["setEnabled:"] || _objj_forward)(themedObject, "setEnabled:", (aSender == null ? null : (aSender.isa.method_msgSend["title"] || _objj_forward)(aSender, "title")) === "Enabled" ? YES : NO));
    }
    var ___r1;
}

,["void","id"]), new objj_method(sel_getUid("changeColor:"), function $BKShowcaseController__changeColor_(self, _cmd, aSender)
{
    var color = nil;
    if ((aSender == null ? null : (aSender.isa.method_msgSend["isKindOfClass:"] || _objj_forward)(aSender, "isKindOfClass:", (CPColorPanel.isa.method_msgSend["class"] || _objj_forward)(CPColorPanel, "class"))))
        color = (aSender == null ? null : (aSender.isa.method_msgSend["color"] || _objj_forward)(aSender, "color"));
    else
    {
        if ((aSender == null ? null : (aSender.isa.method_msgSend["titleOfSelectedItem"] || _objj_forward)(aSender, "titleOfSelectedItem")) === "More Choices...")
        {
            (aSender == null ? null : (aSender.isa.method_msgSend["addItemWithTitle:"] || _objj_forward)(aSender, "addItemWithTitle:", "Other"));
            (aSender == null ? null : (aSender.isa.method_msgSend["selectItemWithTitle:"] || _objj_forward)(aSender, "selectItemWithTitle:", "Other"));
            (CPApp == null ? null : (CPApp.isa.method_msgSend["orderFrontColorPanel:"] || _objj_forward)(CPApp, "orderFrontColorPanel:", self));
        }
        else
        {
            color = ((___r1 = (aSender == null ? null : (aSender.isa.method_msgSend["selectedItem"] || _objj_forward)(aSender, "selectedItem"))), ___r1 == null ? null : (___r1.isa.method_msgSend["representedObject"] || _objj_forward)(___r1, "representedObject"));
            (aSender == null ? null : (aSender.isa.method_msgSend["removeItemWithTitle:"] || _objj_forward)(aSender, "removeItemWithTitle:", "Other"));
        }
    }
    if (color)
    {
        ((___r1 = (self.isa.method_msgSend["selectedThemeDescriptor"] || _objj_forward)(self, "selectedThemeDescriptor")), ___r1 == null ? null : (___r1.isa.method_msgSend["setShowcaseBackgroundColor:"] || _objj_forward)(___r1, "setShowcaseBackgroundColor:", color));
        (BKShowcaseCell == null ? null : (BKShowcaseCell.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(BKShowcaseCell, "setBackgroundColor:", color));
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
        self._label = (CPTextField.isa.method_msgSend["labelWithTitle:"] || _objj_forward)(CPTextField, "labelWithTitle:", "hello");
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setFont:"] || _objj_forward)(___r1, "setFont:", (CPFont.isa.method_msgSend["systemFontOfSize:"] || _objj_forward)(CPFont, "systemFontOfSize:", 11.0)));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setFrame:"] || _objj_forward)(___r1, "setFrame:", CGRectMake(10.0, 0.0, CGRectGetWidth((self.isa.method_msgSend["bounds"] || _objj_forward)(self, "bounds")) - 20.0, CGRectGetHeight((self.isa.method_msgSend["bounds"] || _objj_forward)(self, "bounds")))));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setVerticalAlignment:"] || _objj_forward)(___r1, "setVerticalAlignment:", CPCenterVerticalTextAlignment));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
        (self.isa.method_msgSend["addSubview:"] || _objj_forward)(self, "addSubview:", self._label);
    }
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setStringValue:"] || _objj_forward)(___r1, "setStringValue:", (aThemeDescriptor == null ? null : (aThemeDescriptor.isa.method_msgSend["themeName"] || _objj_forward)(aThemeDescriptor, "themeName")) + " (" + ((___r2 = (aThemeDescriptor == null ? null : (aThemeDescriptor.isa.method_msgSend["themedShowcaseObjectTemplates"] || _objj_forward)(aThemeDescriptor, "themedShowcaseObjectTemplates"))), ___r2 == null ? null : (___r2.isa.method_msgSend["count"] || _objj_forward)(___r2, "count")) + ")"));
    var ___r1, ___r2;
}

,["void","id"]), new objj_method(sel_getUid("setSelected:"), function $BKThemeDescriptorCell__setSelected_(self, _cmd, isSelected)
{
    (self.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(self, "setBackgroundColor:", isSelected ? ((___r1 = (self.isa.method_msgSend["class"] || _objj_forward)(self, "class")), ___r1 == null ? null : (___r1.isa.method_msgSend["selectionColor"] || _objj_forward)(___r1, "selectionColor")) : nil);
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setTextShadowOffset:"] || _objj_forward)(___r1, "setTextShadowOffset:", isSelected ? CGSizeMake(0.0, 1.0) : CGSizeMakeZero()));
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setTextShadowColor:"] || _objj_forward)(___r1, "setTextShadowColor:", isSelected ? (CPColor.isa.method_msgSend["blackColor"] || _objj_forward)(CPColor, "blackColor") : nil));
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setFont:"] || _objj_forward)(___r1, "setFont:", isSelected ? (CPFont.isa.method_msgSend["boldSystemFontOfSize:"] || _objj_forward)(CPFont, "boldSystemFontOfSize:", 11.0) : (CPFont.isa.method_msgSend["systemFontOfSize:"] || _objj_forward)(CPFont, "systemFontOfSize:", 11.0)));
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setTextColor:"] || _objj_forward)(___r1, "setTextColor:", isSelected ? (CPColor.isa.method_msgSend["whiteColor"] || _objj_forward)(CPColor, "whiteColor") : (CPColor.isa.method_msgSend["blackColor"] || _objj_forward)(CPColor, "blackColor")));
    var ___r1;
}

,["void","BOOL"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("selectionColor"), function $BKThemeDescriptorCell__selectionColor(self, _cmd)
{
    if (!SelectionColor)
        SelectionColor = (CPColor.isa.method_msgSend["colorWithPatternImage:"] || _objj_forward)(CPColor, "colorWithPatternImage:", ((___r1 = (CPImage.isa.method_msgSend["alloc"] || _objj_forward)(CPImage, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithContentsOfFile:size:"] || _objj_forward)(___r1, "initWithContentsOfFile:size:", ((___r2 = (CPBundle.isa.method_msgSend["bundleForClass:"] || _objj_forward)(CPBundle, "bundleForClass:", (BKThemeDescriptorCell.isa.method_msgSend["class"] || _objj_forward)(BKThemeDescriptorCell, "class"))), ___r2 == null ? null : (___r2.isa.method_msgSend["pathForResource:"] || _objj_forward)(___r2, "pathForResource:", "selection.png")), CGSizeMake(1.0, 36.0))));
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
    self = (objj_getClass("BKShowcaseCell").super_class.method_dtable["init"] || _objj_forward)(self, "init");
    if (self)
        ((___r1 = (CPNotificationCenter.isa.method_msgSend["defaultCenter"] || _objj_forward)(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : (___r1.isa.method_msgSend["addObserver:selector:name:object:"] || _objj_forward)(___r1, "addObserver:selector:name:object:", self, sel_getUid("showcaseBackgroundDidChange:"), BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    return self;
    var ___r1;
}

,["id"]), new objj_method(sel_getUid("initWithCoder:"), function $BKShowcaseCell__initWithCoder_(self, _cmd, aCoder)
{
    self = (objj_getClass("BKShowcaseCell").super_class.method_dtable["initWithCoder:"] || _objj_forward)(self, "initWithCoder:", aCoder);
    if (self)
        ((___r1 = (CPNotificationCenter.isa.method_msgSend["defaultCenter"] || _objj_forward)(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : (___r1.isa.method_msgSend["addObserver:selector:name:object:"] || _objj_forward)(___r1, "addObserver:selector:name:object:", self, sel_getUid("showcaseBackgroundDidChange:"), BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    return self;
    var ___r1;
}

,["id","CPCoder"]), new objj_method(sel_getUid("showcaseBackgroundDidChange:"), function $BKShowcaseCell__showcaseBackgroundDidChange_(self, _cmd, aNotification)
{
    ((___r1 = self._backgroundView), ___r1 == null ? null : (___r1.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(___r1, "setBackgroundColor:", (BKShowcaseCell.isa.method_msgSend["backgroundColor"] || _objj_forward)(BKShowcaseCell, "backgroundColor")));
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
        self._label = ((___r1 = (CPTextField.isa.method_msgSend["alloc"] || _objj_forward)(CPTextField, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithFrame:"] || _objj_forward)(___r1, "initWithFrame:", CGRectMakeZero()));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setAlignment:"] || _objj_forward)(___r1, "setAlignment:", CPCenterTextAlignment));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewMinYMargin | CPViewWidthSizable));
        ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setFont:"] || _objj_forward)(___r1, "setFont:", (CPFont.isa.method_msgSend["boldSystemFontOfSize:"] || _objj_forward)(CPFont, "boldSystemFontOfSize:", 11.0)));
        (self.isa.method_msgSend["addSubview:"] || _objj_forward)(self, "addSubview:", self._label);
    }
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setStringValue:"] || _objj_forward)(___r1, "setStringValue:", (anObject == null ? null : (anObject.isa.method_msgSend["valueForKey:"] || _objj_forward)(anObject, "valueForKey:", "label"))));
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["sizeToFit"] || _objj_forward)(___r1, "sizeToFit"));
    ((___r1 = self._label), ___r1 == null ? null : (___r1.isa.method_msgSend["setFrame:"] || _objj_forward)(___r1, "setFrame:", CGRectMake(0.0, CGRectGetHeight((self.isa.method_msgSend["bounds"] || _objj_forward)(self, "bounds")) - CGRectGetHeight(((___r2 = self._label), ___r2 == null ? null : (___r2.isa.method_msgSend["frame"] || _objj_forward)(___r2, "frame"))), CGRectGetWidth((self.isa.method_msgSend["bounds"] || _objj_forward)(self, "bounds")), CGRectGetHeight(((___r2 = self._label), ___r2 == null ? null : (___r2.isa.method_msgSend["frame"] || _objj_forward)(___r2, "frame"))))));
    if (!self._backgroundView)
    {
        self._backgroundView = ((___r1 = (CPView.isa.method_msgSend["alloc"] || _objj_forward)(CPView, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init"));
        (self.isa.method_msgSend["addSubview:"] || _objj_forward)(self, "addSubview:", self._backgroundView);
    }
    ((___r1 = self._backgroundView), ___r1 == null ? null : (___r1.isa.method_msgSend["setFrame:"] || _objj_forward)(___r1, "setFrame:", CGRectMake(0.0, 0.0, CGRectGetWidth((self.isa.method_msgSend["bounds"] || _objj_forward)(self, "bounds")), CGRectGetMinY(((___r2 = self._label), ___r2 == null ? null : (___r2.isa.method_msgSend["frame"] || _objj_forward)(___r2, "frame"))))));
    ((___r1 = self._backgroundView), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewWidthSizable | CPViewHeightSizable));
    if (self._view)
        ((___r1 = self._view), ___r1 == null ? null : (___r1.isa.method_msgSend["removeFromSuperview"] || _objj_forward)(___r1, "removeFromSuperview"));
    self._view = (anObject == null ? null : (anObject.isa.method_msgSend["valueForKey:"] || _objj_forward)(anObject, "valueForKey:", "themedObject"));
    ((___r1 = self._view), ___r1 == null ? null : (___r1.isa.method_msgSend["setTheme:"] || _objj_forward)(___r1, "setTheme:", nil));
    ((___r1 = self._view), ___r1 == null ? null : (___r1.isa.method_msgSend["setAutoresizingMask:"] || _objj_forward)(___r1, "setAutoresizingMask:", CPViewMinXMargin | CPViewMaxXMargin | CPViewMinYMargin | CPViewMaxYMargin));
    ((___r1 = self._view), ___r1 == null ? null : (___r1.isa.method_msgSend["setFrameOrigin:"] || _objj_forward)(___r1, "setFrameOrigin:", CGPointMake((CGRectGetWidth(((___r2 = self._backgroundView), ___r2 == null ? null : (___r2.isa.method_msgSend["bounds"] || _objj_forward)(___r2, "bounds"))) - CGRectGetWidth(((___r2 = self._view), ___r2 == null ? null : (___r2.isa.method_msgSend["frame"] || _objj_forward)(___r2, "frame")))) / 2.0, (CGRectGetHeight(((___r2 = self._backgroundView), ___r2 == null ? null : (___r2.isa.method_msgSend["bounds"] || _objj_forward)(___r2, "bounds"))) - CGRectGetHeight(((___r2 = self._view), ___r2 == null ? null : (___r2.isa.method_msgSend["frame"] || _objj_forward)(___r2, "frame")))) / 2.0)));
    ((___r1 = self._backgroundView), ___r1 == null ? null : (___r1.isa.method_msgSend["addSubview:"] || _objj_forward)(___r1, "addSubview:", self._view));
    ((___r1 = self._backgroundView), ___r1 == null ? null : (___r1.isa.method_msgSend["setBackgroundColor:"] || _objj_forward)(___r1, "setBackgroundColor:", (BKShowcaseCell.isa.method_msgSend["backgroundColor"] || _objj_forward)(BKShowcaseCell, "backgroundColor")));
    var ___r1, ___r2;
}

,["void","id"])]);
class_addMethods(meta_class, [new objj_method(sel_getUid("setBackgroundColor:"), function $BKShowcaseCell__setBackgroundColor_(self, _cmd, aColor)
{
    if (ShowcaseCellBackgroundColor === aColor)
        return;
    ShowcaseCellBackgroundColor = aColor;
    ((___r1 = (CPNotificationCenter.isa.method_msgSend["defaultCenter"] || _objj_forward)(CPNotificationCenter, "defaultCenter")), ___r1 == null ? null : (___r1.isa.method_msgSend["postNotificationName:object:"] || _objj_forward)(___r1, "postNotificationName:object:", BKShowcaseCellBackgroundColorDidChangeNotification, nil));
    var ___r1;
}

,["void","CPColor"]), new objj_method(sel_getUid("backgroundColor"), function $BKShowcaseCell__backgroundColor(self, _cmd)
{
    return ShowcaseCellBackgroundColor;
}

,["CPColor"])]);
}
p;19;BKThemeDescriptor.jt;18431;@STATIC;1.0;I;21;Foundation/CPObject.jI;20;Foundation/CPArray.jI;16;AppKit/CPColor.jI;16;AppKit/CPImage.jI;15;AppKit/CPView.jI;29;AppKit/_CPCibCustomResource.jt;18264;objj_executeFile("Foundation/CPObject.j", NO);objj_executeFile("Foundation/CPArray.j", NO);objj_executeFile("AppKit/CPColor.j", NO);objj_executeFile("AppKit/CPImage.j", NO);objj_executeFile("AppKit/CPView.j", NO);objj_executeFile("AppKit/_CPCibCustomResource.j", NO);PatternIsHorizontal = CPColorPatternIsHorizontal;
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
    (themeDescriptorClasses == null ? null : (themeDescriptorClasses.isa.method_msgSend["sortUsingSelector:"] || _objj_forward)(themeDescriptorClasses, "sortUsingSelector:", sel_getUid("compare:")));
    return themeDescriptorClasses;
}

,["CPArray"]), new objj_method(sel_getUid("lightCheckersColor"), function $BKThemeDescriptor__lightCheckersColor(self, _cmd)
{
    if (!LightCheckersColor)
        LightCheckersColor = (CPColor.isa.method_msgSend["colorWithPatternImage:"] || _objj_forward)(CPColor, "colorWithPatternImage:", ((___r1 = (CPImage.isa.method_msgSend["alloc"] || _objj_forward)(CPImage, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithContentsOfFile:size:"] || _objj_forward)(___r1, "initWithContentsOfFile:size:", ((___r2 = (CPBundle.isa.method_msgSend["bundleForClass:"] || _objj_forward)(CPBundle, "bundleForClass:", (BKThemeDescriptor.isa.method_msgSend["class"] || _objj_forward)(BKThemeDescriptor, "class"))), ___r2 == null ? null : (___r2.isa.method_msgSend["pathForResource:"] || _objj_forward)(___r2, "pathForResource:", "light-checkers.png")), CGSizeMake(12.0, 12.0))));
    return LightCheckersColor;
    var ___r1, ___r2;
}

,["CPColor"]), new objj_method(sel_getUid("darkCheckersColor"), function $BKThemeDescriptor__darkCheckersColor(self, _cmd)
{
    if (!DarkCheckersColor)
        DarkCheckersColor = (CPColor.isa.method_msgSend["colorWithPatternImage:"] || _objj_forward)(CPColor, "colorWithPatternImage:", ((___r1 = (CPImage.isa.method_msgSend["alloc"] || _objj_forward)(CPImage, "alloc")), ___r1 == null ? null : (___r1.isa.method_msgSend["initWithContentsOfFile:size:"] || _objj_forward)(___r1, "initWithContentsOfFile:size:", ((___r2 = (CPBundle.isa.method_msgSend["bundleForClass:"] || _objj_forward)(CPBundle, "bundleForClass:", (BKThemeDescriptor.isa.method_msgSend["class"] || _objj_forward)(BKThemeDescriptor, "class"))), ___r2 == null ? null : (___r2.isa.method_msgSend["pathForResource:"] || _objj_forward)(___r2, "pathForResource:", "dark-checkers.png")), CGSizeMake(12.0, 12.0))));
    return DarkCheckersColor;
    var ___r1, ___r2;
}

,["CPColor"]), new objj_method(sel_getUid("windowBackgroundColor"), function $BKThemeDescriptor__windowBackgroundColor(self, _cmd)
{
    return (CPColor.isa.method_msgSend["colorWithCalibratedWhite:alpha:"] || _objj_forward)(CPColor, "colorWithCalibratedWhite:alpha:", 0.95, 1.0);
}

,["CPColor"]), new objj_method(sel_getUid("defaultShowcaseBackgroundColor"), function $BKThemeDescriptor__defaultShowcaseBackgroundColor(self, _cmd)
{
    return (CPColor.isa.method_msgSend["colorWithCalibratedWhite:alpha:"] || _objj_forward)(CPColor, "colorWithCalibratedWhite:alpha:", 0.95, 1.0);
}

,["CPColor"]), new objj_method(sel_getUid("showcaseBackgroundColor"), function $BKThemeDescriptor__showcaseBackgroundColor(self, _cmd)
{
    var className = (self.isa.method_msgSend["className"] || _objj_forward)(self, "className");
    if (!BackgroundColors[className])
        BackgroundColors[className] = (self.isa.method_msgSend["defaultShowcaseBackgroundColor"] || _objj_forward)(self, "defaultShowcaseBackgroundColor");
    return BackgroundColors[className];
}

,["CPColor"]), new objj_method(sel_getUid("setShowcaseBackgroundColor:"), function $BKThemeDescriptor__setShowcaseBackgroundColor_(self, _cmd, aColor)
{
    BackgroundColors[(self.isa.method_msgSend["className"] || _objj_forward)(self, "className")] = aColor;
}

,["void","CPColor"]), new objj_method(sel_getUid("itemSize"), function $BKThemeDescriptor__itemSize(self, _cmd)
{
    var className = (self.isa.method_msgSend["className"] || _objj_forward)(self, "className");
    if (!ItemSizes[className])
        (self.isa.method_msgSend["calculateThemedObjectTemplates"] || _objj_forward)(self, "calculateThemedObjectTemplates");
    return CGSizeMakeCopy(ItemSizes[className]);
}

,["CGSize"]), new objj_method(sel_getUid("themedObjectTemplates"), function $BKThemeDescriptor__themedObjectTemplates(self, _cmd)
{
    var className = (self.isa.method_msgSend["className"] || _objj_forward)(self, "className");
    if (!ThemedObjects[className])
        (self.isa.method_msgSend["calculateThemedObjectTemplates"] || _objj_forward)(self, "calculateThemedObjectTemplates");
    return ThemedObjects[className];
}

,["CPArray"]), new objj_method(sel_getUid("themedShowcaseObjectTemplates"), function $BKThemeDescriptor__themedShowcaseObjectTemplates(self, _cmd)
{
    var className = (self.isa.method_msgSend["className"] || _objj_forward)(self, "className");
    if (!ThemedShowcaseObjects[className])
        (self.isa.method_msgSend["calculateThemedObjectTemplates"] || _objj_forward)(self, "calculateThemedObjectTemplates");
    return ThemedShowcaseObjects[className];
}

,["CPArray"]), new objj_method(sel_getUid("calculateThemedObjectTemplates"), function $BKThemeDescriptor__calculateThemedObjectTemplates(self, _cmd)
{
    var templates = [],
        showcaseTemplates = [],
        itemSize = CGSizeMake(0.0, 0.0),
        methods = class_copyMethodList((self.isa.method_msgSend["class"] || _objj_forward)(self, "class").isa),
        index = 0,
        count = (methods == null ? null : (methods.isa.method_msgSend["count"] || _objj_forward)(methods, "count")),
        excludes = [];
    if ((self.isa.method_msgSend["respondsToSelector:"] || _objj_forward)(self, "respondsToSelector:", sel_getUid("themeShowcaseExcludes")))
        excludes = (self.isa.method_msgSend["themeShowcaseExcludes"] || _objj_forward)(self, "themeShowcaseExcludes");
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
        var template = ((___r1 = (BKThemedObjectTemplate == null ? null : (BKThemedObjectTemplate.isa.method_msgSend["alloc"] || _objj_forward)(BKThemedObjectTemplate, "alloc"))), ___r1 == null ? null : (___r1.isa.method_msgSend["init"] || _objj_forward)(___r1, "init")),
            excluded = (excludes == null ? null : (excludes.isa.method_msgSend["containsObject:"] || _objj_forward)(excludes, "containsObject:", selector.toLowerCase()));
        (template == null ? null : (template.isa.method_msgSend["setValue:forKey:"] || _objj_forward)(template, "setValue:forKey:", object, "themedObject"));
        (template == null ? null : (template.isa.method_msgSend["setValue:forKey:"] || _objj_forward)(template, "setValue:forKey:", BKLabelFromIdentifier(selector), "label"));
        (templates == null ? null : (templates.isa.method_msgSend["addObject:"] || _objj_forward)(templates, "addObject:", template));
        if (!excluded)
        {
            if ((object == null ? null : (object.isa.method_msgSend["isKindOfClass:"] || _objj_forward)(object, "isKindOfClass:", (CPView.isa.method_msgSend["class"] || _objj_forward)(CPView, "class"))))
            {
                var size = (object == null ? null : (object.isa.method_msgSend["frame"] || _objj_forward)(object, "frame")).size,
                    labelWidth = ((___r1 = (template == null ? null : (template.isa.method_msgSend["valueForKey:"] || _objj_forward)(template, "valueForKey:", "label"))), ___r1 == null ? null : (___r1.isa.method_msgSend["sizeWithFont:"] || _objj_forward)(___r1, "sizeWithFont:", (CPFont.isa.method_msgSend["boldSystemFontOfSize:"] || _objj_forward)(CPFont, "boldSystemFontOfSize:", 0))).width + 20.0;
                if (size.width > itemSize.width)
                    itemSize.width = size.width;
                if (labelWidth > itemSize.width)
                    itemSize.width = labelWidth;
                if (size.height > itemSize.height)
                    itemSize.height = size.height;
            }
            (showcaseTemplates == null ? null : (showcaseTemplates.isa.method_msgSend["addObject:"] || _objj_forward)(showcaseTemplates, "addObject:", template));
        }
    }
    var className = (self.isa.method_msgSend["className"] || _objj_forward)(self, "className");
    ItemSizes[className] = itemSize;
    ThemedObjects[className] = templates;
    ThemedShowcaseObjects[className] = showcaseTemplates;
    var ___r1;
}

,["void"]), new objj_method(sel_getUid("compare:"), function $BKThemeDescriptor__compare_(self, _cmd, aThemeDescriptor)
{
    return ((___r1 = (self.isa.method_msgSend["themeName"] || _objj_forward)(self, "themeName")), ___r1 == null ? null : (___r1.isa.method_msgSend["compare:"] || _objj_forward)(___r1, "compare:", (aThemeDescriptor == null ? null : (aThemeDescriptor.isa.method_msgSend["themeName"] || _objj_forward)(aThemeDescriptor, "themeName"))));
    var ___r1;
}

,["int","BKThemeDescriptor"]), new objj_method(sel_getUid("registerThemeValues:forObject:"), function $BKThemeDescriptor__registerThemeValues_forObject_(self, _cmd, themeValues, anObject)
{
    (self.isa.method_msgSend["registerThemeValues:forView:"] || _objj_forward)(self, "registerThemeValues:forView:", themeValues, anObject);
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
            if (state.isa && (state == null ? null : (state.isa.method_msgSend["isKindOfClass:"] || _objj_forward)(state, "isKindOfClass:", CPArray)))
                (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:inStates:"] || _objj_forward)(aView, "setValue:forThemeAttribute:inStates:", value, attribute, state));
            else
                (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:inState:"] || _objj_forward)(aView, "setValue:forThemeAttribute:inState:", value, attribute, state));
        }
        else
            (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:"] || _objj_forward)(aView, "setValue:forThemeAttribute:", value, attribute));
    }
}

,["void","CPArray","CPView"]), new objj_method(sel_getUid("registerThemeValues:forObject:inherit:"), function $BKThemeDescriptor__registerThemeValues_forObject_inherit_(self, _cmd, themeValues, anObject, inheritedValues)
{
    (self.isa.method_msgSend["registerThemeValues:forView:inherit:"] || _objj_forward)(self, "registerThemeValues:forView:inherit:", themeValues, anObject, inheritedValues);
}

,["void","CPArray","id","CPArray"]), new objj_method(sel_getUid("registerThemeValues:forView:inherit:"), function $BKThemeDescriptor__registerThemeValues_forView_inherit_(self, _cmd, themeValues, aView, inheritedValues)
{
    if (inheritedValues)
    {
        var themeName = (self.isa.method_msgSend["themeName"] || _objj_forward)(self, "themeName"),
            index = themeName.indexOf("-");
        if (index < 0)
        {
            (self.isa.method_msgSend["registerThemeValues:forView:"] || _objj_forward)(self, "registerThemeValues:forView:", inheritedValues, aView);
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
                if (typeof value === "object" && value.hasOwnProperty("isa") && (value == null ? null : (value.isa.method_msgSend["isKindOfClass:"] || _objj_forward)(value, "isKindOfClass:", CPColor)) && (pattern = (value == null ? null : (value.isa.method_msgSend["patternImage"] || _objj_forward)(value, "patternImage"))))
                {
                    if ((pattern == null ? null : (pattern.isa.method_msgSend["isThreePartImage"] || _objj_forward)(pattern, "isThreePartImage")) || (pattern == null ? null : (pattern.isa.method_msgSend["isNinePartImage"] || _objj_forward)(pattern, "isNinePartImage")))
                    {
                        var slices = (pattern == null ? null : (pattern.isa.method_msgSend["imageSlices"] || _objj_forward)(pattern, "imageSlices")),
                            newSlices = [];
                        for (var sliceIndex = 0; sliceIndex < slices.length; ++sliceIndex)
                        {
                            var slice = slices[sliceIndex],
                                filename = themePath + ((___r1 = (slice == null ? null : (slice.isa.method_msgSend["filename"] || _objj_forward)(slice, "filename"))), ___r1 == null ? null : (___r1.isa.method_msgSend["lastPathComponent"] || _objj_forward)(___r1, "lastPathComponent")),
                                size = (slice == null ? null : (slice.isa.method_msgSend["size"] || _objj_forward)(slice, "size"));
                            newSlices.push([filename, size.width, size.height]);
                        }
                        if ((pattern == null ? null : (pattern.isa.method_msgSend["isThreePartImage"] || _objj_forward)(pattern, "isThreePartImage")))
                            value = PatternColor(newSlices, (pattern == null ? null : (pattern.isa.method_msgSend["isVertical"] || _objj_forward)(pattern, "isVertical")));
                        else
                            value = PatternColor(newSlices);
                    }
                    else
                    {
                        var filename = themePath + ((___r1 = (pattern == null ? null : (pattern.isa.method_msgSend["filename"] || _objj_forward)(pattern, "filename"))), ___r1 == null ? null : (___r1.isa.method_msgSend["lastPathComponent"] || _objj_forward)(___r1, "lastPathComponent")),
                            size = (pattern == null ? null : (pattern.isa.method_msgSend["size"] || _objj_forward)(pattern, "size"));
                        value = PatternColor(filename, size.width, size.height);
                    }
                }
                if (state)
                {
                    if (state.isa && (state == null ? null : (state.isa.method_msgSend["isKindOfClass:"] || _objj_forward)(state, "isKindOfClass:", CPArray)))
                        (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:inStates:"] || _objj_forward)(aView, "setValue:forThemeAttribute:inStates:", value, attribute, state));
                    else
                        (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:inState:"] || _objj_forward)(aView, "setValue:forThemeAttribute:inState:", value, attribute, state));
                }
                else
                    (aView == null ? null : (aView.isa.method_msgSend["setValue:forThemeAttribute:"] || _objj_forward)(aView, "setValue:forThemeAttribute:", value, attribute));
            }
        }
    }
    if (themeValues)
        (self.isa.method_msgSend["registerThemeValues:forView:"] || _objj_forward)(self, "registerThemeValues:forView:", themeValues, aView);
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
    return (_CPCibCustomResource.isa.method_msgSend["imageResourceWithName:size:"] || _objj_forward)(_CPCibCustomResource, "imageResourceWithName:size:", name, CGSizeMake(width, height));
}
PatternColor = function()
{
    var args = Array.prototype.slice.apply(arguments);
    args.push(PatternImage);
    return CPColorWithImages.apply(this, args);
}
p;24;BKThemedObjectTemplate.jt;1539;@STATIC;1.0;I;15;AppKit/CPView.jt;1500;objj_executeFile("AppKit/CPView.j", NO);
{var the_class = objj_allocateClassPair(CPView, "BKThemedObjectTemplate"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_label", "CPString"), new objj_ivar("_themedObject", "id")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $BKThemedObjectTemplate__initWithCoder_(self, _cmd, aCoder)
{
    self = (objj_getClass("BKThemedObjectTemplate").super_class.method_dtable["init"] || _objj_forward)(self, "init");
    if (self)
    {
        self._label = (aCoder == null ? null : (aCoder.isa.method_msgSend["decodeObjectForKey:"] || _objj_forward)(aCoder, "decodeObjectForKey:", "BKThemedObjectTemplateLabel"));
        self._themedObject = (aCoder == null ? null : (aCoder.isa.method_msgSend["decodeObjectForKey:"] || _objj_forward)(aCoder, "decodeObjectForKey:", "BKThemedObjectTemplateThemedObject"));
    }
    return self;
}

,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $BKThemedObjectTemplate__encodeWithCoder_(self, _cmd, aCoder)
{
    (aCoder == null ? null : (aCoder.isa.method_msgSend["encodeObject:forKey:"] || _objj_forward)(aCoder, "encodeObject:forKey:", self._label, "BKThemedObjectTemplateLabel"));
    (aCoder == null ? null : (aCoder.isa.method_msgSend["encodeObject:forKey:"] || _objj_forward)(aCoder, "encodeObject:forKey:", self._themedObject, "BKThemedObjectTemplateThemedObject"));
}

,["void","CPCoder"])]);
}
p;17;BKThemeTemplate.jt;1493;@STATIC;1.0;I;21;Foundation/CPObject.jt;1448;objj_executeFile("Foundation/CPObject.j", NO);
{var the_class = objj_allocateClassPair(CPObject, "BKThemeTemplate"),
meta_class = the_class.isa;class_addIvars(the_class, [new objj_ivar("_name", "CPString"), new objj_ivar("_description", "CPString")]);objj_registerClassPair(the_class);
class_addMethods(the_class, [new objj_method(sel_getUid("initWithCoder:"), function $BKThemeTemplate__initWithCoder_(self, _cmd, aCoder)
{
    self = (objj_getClass("BKThemeTemplate").super_class.method_dtable["init"] || _objj_forward)(self, "init");
    if (self)
    {
        self._name = (aCoder == null ? null : (aCoder.isa.method_msgSend["decodeObjectForKey:"] || _objj_forward)(aCoder, "decodeObjectForKey:", "BKThemeTemplateName"));
        self._description = (aCoder == null ? null : (aCoder.isa.method_msgSend["decodeObjectForKey:"] || _objj_forward)(aCoder, "decodeObjectForKey:", "BKThemeTemplateDescription"));
    }
    return self;
}

,["id","CPCoder"]), new objj_method(sel_getUid("encodeWithCoder:"), function $BKThemeTemplate__encodeWithCoder_(self, _cmd, aCoder)
{
    (aCoder == null ? null : (aCoder.isa.method_msgSend["encodeObject:forKey:"] || _objj_forward)(aCoder, "encodeObject:forKey:", self._name, "BKThemeTemplateName"));
    (aCoder == null ? null : (aCoder.isa.method_msgSend["encodeObject:forKey:"] || _objj_forward)(aCoder, "encodeObject:forKey:", self._description, "BKThemeTemplateDescription"));
}

,["void","CPCoder"])]);
}
p;10;BlendKit.jt;306;@STATIC;1.0;i;22;BKShowcaseController.ji;19;BKThemeDescriptor.ji;17;BKThemeTemplate.ji;24;BKThemedObjectTemplate.jt;186;objj_executeFile("BKShowcaseController.j", YES);objj_executeFile("BKThemeDescriptor.j", YES);objj_executeFile("BKThemeTemplate.j", YES);objj_executeFile("BKThemedObjectTemplate.j", YES);e;