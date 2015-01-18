// Type definitions for ws
// Project: https://github.com/DickvdBrink/chrome-debug-protocol
// Definitions by: Dick van den Brink <https://github.com/DickvdBrink>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "chrome-debug-protocol" {
    import event = require("events");

    interface ChromeTab {
        description: string;
        devtoolsFrontendUrl: string;
        id: string;
        title: string;
        type: string;
        url: string;
        webSocketDebuggerUrl: string;
    }
    function createDebugger(tab: string | ChromeTab): ChromeDebugger;
    function getTabs(options: any, callback: (tabs: ChromeTab[]) => void): void;
    class ChromeDebugger extends event.EventEmitter {
        private ws;
        private callbackId;
        private callbacks;
        constructor(websocketUrl: string);
        close(): void;
        send(method: string, params: any[], callback: Function): void;
        private sendInternal(method, params, callback);
        private messageRecieved;
        private addProtocol();
        private implementCommand(domain, object, command);
        Inspector: IInspector;
        Memory: IMemory;
        Page: IPage;
        Runtime: IRuntime;
        Console: IConsole;
        Network: INetwork;
        Database: IDatabase;
        IndexedDB: IIndexedDB;
        ServiceWorkerCache: IServiceWorkerCache;
        DOMStorage: IDOMStorage;
        ApplicationCache: IApplicationCache;
        FileSystem: IFileSystem;
        DOM: IDOM;
        CSS: ICSS;
        Timeline: ITimeline;
        Debugger: IDebugger;
        DOMDebugger: IDOMDebugger;
        Profiler: IProfiler;
        HeapProfiler: IHeapProfiler;
        Worker: IWorker;
        Canvas: ICanvas;
        Input: IInput;
        LayerTree: ILayerTree;
        DeviceOrientation: IDeviceOrientation;
        Tracing: ITracing;
        Power: IPower;
        Animation: IAnimation;
    }
    interface IInspector {
         /**
         * Enables inspector domain notifications.
         */
        enable(cb?: Function);
         /**
         * Disables inspector domain notifications.
         */
        disable(cb?: Function);
         /**
         * Resets all domains.
         */
        reset(cb?: Function);
    }
    interface IMemory {
        getDOMCounters(cb?: Function);
    }
    interface IPage {
         /**
         * Enables page domain notifications.
         */
        enable(cb?: Function);
         /**
         * Disables page domain notifications.
         */
        disable(cb?: Function);
        addScriptToEvaluateOnLoad(params: IPageAddScriptToEvaluateOnLoadParams, cb?: Function);
        removeScriptToEvaluateOnLoad(params: IPageRemoveScriptToEvaluateOnLoadParams, cb?: Function);
         /**
         * Reloads given page optionally ignoring the cache.
         */
        reload(params?: IPageReloadParams, cb?: Function);
         /**
         * Navigates current page to the given URL.
         */
        navigate(params: IPageNavigateParams, cb?: Function);
         /**
         * Returns navigation history for the current page.
         */
        getNavigationHistory(cb?: Function);
         /**
         * Navigates current page to the given history entry.
         */
        navigateToHistoryEntry(params: IPageNavigateToHistoryEntryParams, cb?: Function);
         /**
         * Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
         */
        getCookies(cb?: Function);
         /**
         * Deletes browser cookie with given name, domain and path.
         */
        deleteCookie(params: IPageDeleteCookieParams, cb?: Function);
         /**
         * Returns present frame / resource tree structure.
         */
        getResourceTree(cb?: Function);
         /**
         * Returns content of the given resource.
         */
        getResourceContent(params: IPageGetResourceContentParams, cb?: Function);
         /**
         * Searches for given string in resource content.
         */
        searchInResource(params?: IPageSearchInResourceParams, cb?: Function);
         /**
         * Sets given markup as the document's HTML.
         */
        setDocumentContent(params: IPageSetDocumentContentParams, cb?: Function);
         /**
         * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
         */
        setDeviceMetricsOverride(params?: IPageSetDeviceMetricsOverrideParams, cb?: Function);
         /**
         * Clears the overriden device metrics.
         */
        clearDeviceMetricsOverride(cb?: Function);
         /**
         * Requests that scroll offsets and page scale factor are reset to initial values.
         */
        resetScrollAndPageScaleFactor(cb?: Function);
         /**
         * Sets a specified page scale factor.
         */
        setPageScaleFactor(params: IPageSetPageScaleFactorParams, cb?: Function);
         /**
         * Requests that backend shows paint rectangles
         */
        setShowPaintRects(params: IPageSetShowPaintRectsParams, cb?: Function);
         /**
         * Requests that backend shows debug borders on layers
         */
        setShowDebugBorders(params: IPageSetShowDebugBordersParams, cb?: Function);
         /**
         * Requests that backend shows the FPS counter
         */
        setShowFPSCounter(params: IPageSetShowFPSCounterParams, cb?: Function);
         /**
         * Requests that backend enables continuous painting
         */
        setContinuousPaintingEnabled(params: IPageSetContinuousPaintingEnabledParams, cb?: Function);
         /**
         * Requests that backend shows scroll bottleneck rects
         */
        setShowScrollBottleneckRects(params: IPageSetShowScrollBottleneckRectsParams, cb?: Function);
         /**
         * Determines if scripts can be executed in the page.
         */
        getScriptExecutionStatus(cb?: Function);
         /**
         * Switches script execution in the page.
         */
        setScriptExecutionDisabled(params: IPageSetScriptExecutionDisabledParams, cb?: Function);
         /**
         * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.
         */
        setGeolocationOverride(params?: IPageSetGeolocationOverrideParams, cb?: Function);
         /**
         * Clears the overriden Geolocation Position and Error.
         */
        clearGeolocationOverride(cb?: Function);
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: IPageSetDeviceOrientationOverrideParams, cb?: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb?: Function);
         /**
         * Toggles mouse event-based touch event emulation.
         */
        setTouchEmulationEnabled(params?: IPageSetTouchEmulationEnabledParams, cb?: Function);
         /**
         * Emulates the given media for CSS media queries.
         */
        setEmulatedMedia(params: IPageSetEmulatedMediaParams, cb?: Function);
         /**
         * Capture page screenshot.
         */
        captureScreenshot(cb?: Function);
         /**
         * Tells whether screencast is supported.
         */
        canScreencast(cb?: Function);
         /**
         * Tells whether emulation is supported.
         */
        canEmulate(cb?: Function);
         /**
         * Starts sending each frame using the <code>screencastFrame</code> event.
         */
        startScreencast(params?: IPageStartScreencastParams, cb?: Function);
         /**
         * Stops sending each frame in the <code>screencastFrame</code>.
         */
        stopScreencast(cb?: Function);
         /**
         * Acknowledges that a screencast frame has been received by the frontend.
         */
        screencastFrameAck(params: IPageScreencastFrameAckParams, cb?: Function);
         /**
         * Starts recording each frame to the buffer.
         */
        startRecordingFrames(params: IPageStartRecordingFramesParams, cb?: Function);
         /**
         * Stops recording, encodes and returns images.
         */
        stopRecordingFrames(cb?: Function);
         /**
         * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
         */
        handleJavaScriptDialog(params?: IPageHandleJavaScriptDialogParams, cb?: Function);
         /**
         * Paints viewport size upon main frame resize.
         */
        setShowViewportSizeOnResize(params?: IPageSetShowViewportSizeOnResizeParams, cb?: Function);
         /**
         * Queries more detailed quota and usage data than Storage API provides.
         */
        queryUsageAndQuota(params: IPageQueryUsageAndQuotaParams, cb?: Function);
         /**
         * Shows / hides color picker
         */
        setColorPickerEnabled(params: IPageSetColorPickerEnabledParams, cb?: Function);
         /**
         * Sets overlay message.
         */
        setOverlayMessage(params?: IPageSetOverlayMessageParams, cb?: Function);
         /**
         * Gets the playback rate of the document timeline.
         */
        animationsPlaybackRate(cb?: Function);
         /**
         * Sets the playback rate of the document timeline.
         */
        setAnimationsPlaybackRate(params: IPageSetAnimationsPlaybackRateParams, cb?: Function);
    }
    interface IRuntime {
         /**
         * Evaluates expression on global object.
         */
        evaluate(params?: IRuntimeEvaluateParams, cb?: Function);
         /**
         * Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
         */
        callFunctionOn(params?: IRuntimeCallFunctionOnParams, cb?: Function);
         /**
         * Returns properties of a given object. Object group of the result is inherited from the target object.
         */
        getProperties(params?: IRuntimeGetPropertiesParams, cb?: Function);
         /**
         * Releases remote object with given id.
         */
        releaseObject(params: IRuntimeReleaseObjectParams, cb?: Function);
         /**
         * Releases all remote objects that belong to a given group.
         */
        releaseObjectGroup(params: IRuntimeReleaseObjectGroupParams, cb?: Function);
         /**
         * Tells inspected instance(worker or page) that it can run in case it was started paused.
         */
        run(cb?: Function);
         /**
         * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context.
         */
        enable(cb?: Function);
         /**
         * Disables reporting of execution contexts creation.
         */
        disable(cb?: Function);
        isRunRequired(cb?: Function);
        setCustomObjectFormatterEnabled(params: IRuntimeSetCustomObjectFormatterEnabledParams, cb?: Function);
    }
    interface IConsole {
         /**
         * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
         */
        enable(cb?: Function);
         /**
         * Disables console domain, prevents further console messages from being reported to the client.
         */
        disable(cb?: Function);
         /**
         * Clears console messages collected in the browser.
         */
        clearMessages(cb?: Function);
         /**
         * Toggles monitoring of XMLHttpRequest. If <code>true</code>, console will receive messages upon each XHR issued.
         */
        setMonitoringXHREnabled(params: IConsoleSetMonitoringXHREnabledParams, cb?: Function);
         /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
         */
        addInspectedNode(params: IConsoleAddInspectedNodeParams, cb?: Function);
        addInspectedHeapObject(params: IConsoleAddInspectedHeapObjectParams, cb?: Function);
         /**
         * Sets last evaluation result in console. Can be accessed via <code>$_</code> command line API.
         */
        setLastEvaluationResult(params: IConsoleSetLastEvaluationResultParams, cb?: Function);
    }
    interface INetwork {
         /**
         * Enables network tracking, network events will now be delivered to the client.
         */
        enable(cb?: Function);
         /**
         * Disables network tracking, prevents network events from being sent to the client.
         */
        disable(cb?: Function);
         /**
         * Allows overriding user agent with the given string.
         */
        setUserAgentOverride(params: INetworkSetUserAgentOverrideParams, cb?: Function);
         /**
         * Specifies whether to always send extra HTTP headers with the requests from this page.
         */
        setExtraHTTPHeaders(params: INetworkSetExtraHTTPHeadersParams, cb?: Function);
         /**
         * Returns content served for the given request.
         */
        getResponseBody(params: INetworkGetResponseBodyParams, cb?: Function);
         /**
         * This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
         */
        replayXHR(params: INetworkReplayXHRParams, cb?: Function);
         /**
         * Tells whether clearing browser cache is supported.
         */
        canClearBrowserCache(cb?: Function);
         /**
         * Clears browser cache.
         */
        clearBrowserCache(cb?: Function);
         /**
         * Tells whether clearing browser cookies is supported.
         */
        canClearBrowserCookies(cb?: Function);
         /**
         * Clears browser cookies.
         */
        clearBrowserCookies(cb?: Function);
         /**
         * Tells whether emulation of network conditions is supported.
         */
        canEmulateNetworkConditions(cb?: Function);
         /**
         * Activates emulation of network conditions.
         */
        emulateNetworkConditions(params: INetworkEmulateNetworkConditionsParams, cb?: Function);
         /**
         * Toggles ignoring cache for each request. If <code>true</code>, cache will not be used.
         */
        setCacheDisabled(params: INetworkSetCacheDisabledParams, cb?: Function);
         /**
         * Loads a resource in the context of a frame on the inspected page without cross origin checks.
         */
        loadResourceForFrontend(params?: INetworkLoadResourceForFrontendParams, cb?: Function);
    }
    interface IDatabase {
         /**
         * Enables database tracking, database events will now be delivered to the client.
         */
        enable(cb?: Function);
         /**
         * Disables database tracking, prevents database events from being sent to the client.
         */
        disable(cb?: Function);
        getDatabaseTableNames(params: IDatabaseGetDatabaseTableNamesParams, cb?: Function);
        executeSQL(params: IDatabaseExecuteSQLParams, cb?: Function);
    }
    interface IIndexedDB {
         /**
         * Enables events from backend.
         */
        enable(cb?: Function);
         /**
         * Disables events from backend.
         */
        disable(cb?: Function);
         /**
         * Requests database names for given security origin.
         */
        requestDatabaseNames(params: IIndexedDBRequestDatabaseNamesParams, cb?: Function);
         /**
         * Requests database with given name in given frame.
         */
        requestDatabase(params: IIndexedDBRequestDatabaseParams, cb?: Function);
         /**
         * Requests data from object store or index.
         */
        requestData(params?: IIndexedDBRequestDataParams, cb?: Function);
         /**
         * Clears all entries from an object store.
         */
        clearObjectStore(params: IIndexedDBClearObjectStoreParams, cb?: Function);
    }
    interface IServiceWorkerCache {
         /**
         * Requests cache names.
         */
        requestCacheNames(cb?: Function);
         /**
         * Requests data from cache.
         */
        requestEntries(params: IServiceWorkerCacheRequestEntriesParams, cb?: Function);
         /**
         * Deletes a cache.
         */
        deleteCache(params: IServiceWorkerCacheDeleteCacheParams, cb?: Function);
    }
    interface IDOMStorage {
         /**
         * Enables storage tracking, storage events will now be delivered to the client.
         */
        enable(cb?: Function);
         /**
         * Disables storage tracking, prevents storage events from being sent to the client.
         */
        disable(cb?: Function);
        getDOMStorageItems(params: IDOMStorageGetDOMStorageItemsParams, cb?: Function);
        setDOMStorageItem(params: IDOMStorageSetDOMStorageItemParams, cb?: Function);
        removeDOMStorageItem(params: IDOMStorageRemoveDOMStorageItemParams, cb?: Function);
    }
    interface IApplicationCache {
         /**
         * Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
         */
        getFramesWithManifests(cb?: Function);
         /**
         * Enables application cache domain notifications.
         */
        enable(cb?: Function);
         /**
         * Returns manifest URL for document in the given frame.
         */
        getManifestForFrame(params: IApplicationCacheGetManifestForFrameParams, cb?: Function);
         /**
         * Returns relevant application cache data for the document in given frame.
         */
        getApplicationCacheForFrame(params: IApplicationCacheGetApplicationCacheForFrameParams, cb?: Function);
    }
    interface IFileSystem {
         /**
         * Enables events from backend.
         */
        enable(cb?: Function);
         /**
         * Disables events from backend.
         */
        disable(cb?: Function);
         /**
         * Returns root directory of the FileSystem, if exists.
         */
        requestFileSystemRoot(params: IFileSystemRequestFileSystemRootParams, cb?: Function);
         /**
         * Returns content of the directory.
         */
        requestDirectoryContent(params: IFileSystemRequestDirectoryContentParams, cb?: Function);
         /**
         * Returns metadata of the entry.
         */
        requestMetadata(params: IFileSystemRequestMetadataParams, cb?: Function);
         /**
         * Returns content of the file. Result should be sliced into [start, end).
         */
        requestFileContent(params?: IFileSystemRequestFileContentParams, cb?: Function);
         /**
         * Deletes specified entry. If the entry is a directory, the agent deletes children recursively.
         */
        deleteEntry(params: IFileSystemDeleteEntryParams, cb?: Function);
    }
    interface IDOM {
         /**
         * Enables DOM agent for the given page.
         */
        enable(cb?: Function);
         /**
         * Disables DOM agent for the given page.
         */
        disable(cb?: Function);
         /**
         * Returns the root DOM node to the caller.
         */
        getDocument(cb?: Function);
         /**
         * Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth.
         */
        requestChildNodes(params?: IDOMRequestChildNodesParams, cb?: Function);
         /**
         * Returns distribution data for all insertion points in shadow tree of the given node.
         */
        requestShadowHostDistributedNodes(params: IDOMRequestShadowHostDistributedNodesParams, cb?: Function);
         /**
         * Executes <code>querySelector</code> on a given node.
         */
        querySelector(params: IDOMQuerySelectorParams, cb?: Function);
         /**
         * Executes <code>querySelectorAll</code> on a given node.
         */
        querySelectorAll(params: IDOMQuerySelectorAllParams, cb?: Function);
         /**
         * Sets node name for a node with given id.
         */
        setNodeName(params: IDOMSetNodeNameParams, cb?: Function);
         /**
         * Sets node value for a node with given id.
         */
        setNodeValue(params: IDOMSetNodeValueParams, cb?: Function);
         /**
         * Removes node with given id.
         */
        removeNode(params: IDOMRemoveNodeParams, cb?: Function);
         /**
         * Sets attribute for an element with given id.
         */
        setAttributeValue(params: IDOMSetAttributeValueParams, cb?: Function);
         /**
         * Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs.
         */
        setAttributesAsText(params?: IDOMSetAttributesAsTextParams, cb?: Function);
         /**
         * Removes attribute with given name from an element with given id.
         */
        removeAttribute(params: IDOMRemoveAttributeParams, cb?: Function);
         /**
         * Returns event listeners relevant to the node.
         */
        getEventListenersForNode(params?: IDOMGetEventListenersForNodeParams, cb?: Function);
         /**
         * Returns node's HTML markup.
         */
        getOuterHTML(params: IDOMGetOuterHTMLParams, cb?: Function);
         /**
         * Sets node HTML markup, returns new node id.
         */
        setOuterHTML(params: IDOMSetOuterHTMLParams, cb?: Function);
         /**
         * Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
         */
        performSearch(params?: IDOMPerformSearchParams, cb?: Function);
         /**
         * Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
         */
        getSearchResults(params: IDOMGetSearchResultsParams, cb?: Function);
         /**
         * Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.
         */
        discardSearchResults(params: IDOMDiscardSearchResultsParams, cb?: Function);
         /**
         * Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications.
         */
        requestNode(params: IDOMRequestNodeParams, cb?: Function);
         /**
         * Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection.
         */
        setInspectModeEnabled(params?: IDOMSetInspectModeEnabledParams, cb?: Function);
         /**
         * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightRect(params?: IDOMHighlightRectParams, cb?: Function);
         /**
         * Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightQuad(params?: IDOMHighlightQuadParams, cb?: Function);
         /**
         * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.
         */
        highlightNode(params?: IDOMHighlightNodeParams, cb?: Function);
         /**
         * Hides DOM node highlight.
         */
        hideHighlight(cb?: Function);
         /**
         * Highlights owner element of the frame with given id.
         */
        highlightFrame(params?: IDOMHighlightFrameParams, cb?: Function);
         /**
         * Requests that the node is sent to the caller given its path. // FIXME, use XPath
         */
        pushNodeByPathToFrontend(params: IDOMPushNodeByPathToFrontendParams, cb?: Function);
         /**
         * Requests that a batch of nodes is sent to the caller given their backend node ids.
         */
        pushNodesByBackendIdsToFrontend(params: IDOMPushNodesByBackendIdsToFrontendParams, cb?: Function);
         /**
         * Resolves JavaScript node object for given node id.
         */
        resolveNode(params?: IDOMResolveNodeParams, cb?: Function);
         /**
         * Returns attributes for the specified node.
         */
        getAttributes(params: IDOMGetAttributesParams, cb?: Function);
         /**
         * Creates a deep copy of the specified node and places it into the target container before the given anchor.
         */
        copyTo(params?: IDOMCopyToParams, cb?: Function);
         /**
         * Moves node into the new container, places it before the given anchor.
         */
        moveTo(params?: IDOMMoveToParams, cb?: Function);
         /**
         * Undoes the last performed action.
         */
        undo(cb?: Function);
         /**
         * Re-does the last undone action.
         */
        redo(cb?: Function);
         /**
         * Marks last undoable state.
         */
        markUndoableState(cb?: Function);
         /**
         * Focuses the given element.
         */
        focus(params: IDOMFocusParams, cb?: Function);
         /**
         * Sets files for the given file input element.
         */
        setFileInputFiles(params: IDOMSetFileInputFilesParams, cb?: Function);
         /**
         * Returns boxes for the currently selected nodes.
         */
        getBoxModel(params: IDOMGetBoxModelParams, cb?: Function);
         /**
         * Returns node id at given location.
         */
        getNodeForLocation(params: IDOMGetNodeForLocationParams, cb?: Function);
         /**
         * Returns the id of the nearest ancestor that is a relayout boundary.
         */
        getRelayoutBoundary(params: IDOMGetRelayoutBoundaryParams, cb?: Function);
    }
    interface ICSS {
         /**
         * Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received.
         */
        enable(cb?: Function);
         /**
         * Disables the CSS agent for the given page.
         */
        disable(cb?: Function);
         /**
         * Returns requested styles for a DOM node identified by <code>nodeId</code>.
         */
        getMatchedStylesForNode(params?: ICSSGetMatchedStylesForNodeParams, cb?: Function);
         /**
         * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
         */
        getInlineStylesForNode(params: ICSSGetInlineStylesForNodeParams, cb?: Function);
         /**
         * Returns the computed style for a DOM node identified by <code>nodeId</code>.
         */
        getComputedStyleForNode(params: ICSSGetComputedStyleForNodeParams, cb?: Function);
         /**
         * Requests information about platform fonts which we used to render child TextNodes in the given node.
         */
        getPlatformFontsForNode(params: ICSSGetPlatformFontsForNodeParams, cb?: Function);
         /**
         * Returns the current textual content and the URL for a stylesheet.
         */
        getStyleSheetText(params: ICSSGetStyleSheetTextParams, cb?: Function);
         /**
         * Sets the new stylesheet text.
         */
        setStyleSheetText(params: ICSSSetStyleSheetTextParams, cb?: Function);
         /**
         * Either replaces a property identified by <code>styleSheetId</code> and <code>range</code> with <code>text</code> or inserts a new property <code>text</code> at the position identified by an empty <code>range</code>.
         */
        setPropertyText(params: ICSSSetPropertyTextParams, cb?: Function);
         /**
         * Modifies the rule selector.
         */
        setRuleSelector(params: ICSSSetRuleSelectorParams, cb?: Function);
         /**
         * Modifies the rule selector.
         */
        setMediaText(params: ICSSSetMediaTextParams, cb?: Function);
         /**
         * Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>.
         */
        createStyleSheet(params: ICSSCreateStyleSheetParams, cb?: Function);
         /**
         * Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>.
         */
        addRule(params: ICSSAddRuleParams, cb?: Function);
         /**
         * Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
         */
        forcePseudoState(params: ICSSForcePseudoStateParams, cb?: Function);
         /**
         * Returns all media queries parsed by the rendering engine.
         */
        getMediaQueries(cb?: Function);
    }
    interface ITimeline {
         /**
         * Enables timeline. After this call, timeline can be started from within the page (for example upon console.timeline).
         */
        enable(cb?: Function);
         /**
         * Disables timeline.
         */
        disable(cb?: Function);
         /**
         * Starts capturing instrumentation events.
         */
        start(params?: ITimelineStartParams, cb?: Function);
         /**
         * Stops capturing instrumentation events.
         */
        stop(cb?: Function);
    }
    interface IDebugger {
         /**
         * Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
         */
        enable(cb?: Function);
         /**
         * Disables debugger for given page.
         */
        disable(cb?: Function);
         /**
         * Activates / deactivates all breakpoints on the page.
         */
        setBreakpointsActive(params: IDebuggerSetBreakpointsActiveParams, cb?: Function);
         /**
         * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
         */
        setSkipAllPauses(params?: IDebuggerSetSkipAllPausesParams, cb?: Function);
         /**
         * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
         */
        setBreakpointByUrl(params?: IDebuggerSetBreakpointByUrlParams, cb?: Function);
         /**
         * Sets JavaScript breakpoint at a given location.
         */
        setBreakpoint(params?: IDebuggerSetBreakpointParams, cb?: Function);
         /**
         * Removes JavaScript breakpoint.
         */
        removeBreakpoint(params: IDebuggerRemoveBreakpointParams, cb?: Function);
         /**
         * Continues execution until specific location is reached.
         */
        continueToLocation(params?: IDebuggerContinueToLocationParams, cb?: Function);
         /**
         * Steps over the statement.
         */
        stepOver(cb?: Function);
         /**
         * Steps into the function call.
         */
        stepInto(cb?: Function);
         /**
         * Steps out of the function call.
         */
        stepOut(cb?: Function);
         /**
         * Stops on the next JavaScript statement.
         */
        pause(cb?: Function);
         /**
         * Resumes JavaScript execution.
         */
        resume(cb?: Function);
         /**
         * Steps into the first async operation handler that was scheduled by or after the current statement.
         */
        stepIntoAsync(cb?: Function);
         /**
         * Searches for given string in script content.
         */
        searchInContent(params?: IDebuggerSearchInContentParams, cb?: Function);
         /**
         * Always returns true.
         */
        canSetScriptSource(cb?: Function);
         /**
         * Edits JavaScript source live.
         */
        setScriptSource(params?: IDebuggerSetScriptSourceParams, cb?: Function);
         /**
         * Restarts particular call frame from the beginning.
         */
        restartFrame(params: IDebuggerRestartFrameParams, cb?: Function);
         /**
         * Returns source for the script with given id.
         */
        getScriptSource(params: IDebuggerGetScriptSourceParams, cb?: Function);
         /**
         * Returns detailed information on given function.
         */
        getFunctionDetails(params: IDebuggerGetFunctionDetailsParams, cb?: Function);
         /**
         * Returns detailed information on given generator object.
         */
        getGeneratorObjectDetails(params: IDebuggerGetGeneratorObjectDetailsParams, cb?: Function);
         /**
         * Returns entries of given collection.
         */
        getCollectionEntries(params: IDebuggerGetCollectionEntriesParams, cb?: Function);
         /**
         * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
         */
        setPauseOnExceptions(params: IDebuggerSetPauseOnExceptionsParams, cb?: Function);
         /**
         * Evaluates expression on a given call frame.
         */
        evaluateOnCallFrame(params?: IDebuggerEvaluateOnCallFrameParams, cb?: Function);
         /**
         * Compiles expression.
         */
        compileScript(params?: IDebuggerCompileScriptParams, cb?: Function);
         /**
         * Runs script with given id in a given context.
         */
        runScript(params?: IDebuggerRunScriptParams, cb?: Function);
         /**
         * Changes value of variable in a callframe or a closure. Either callframe or function must be specified. Object-based scopes are not supported and must be mutated manually.
         */
        setVariableValue(params?: IDebuggerSetVariableValueParams, cb?: Function);
         /**
         * Lists all positions where step-in is possible for a current statement in a specified call frame
         */
        getStepInPositions(params: IDebuggerGetStepInPositionsParams, cb?: Function);
         /**
         * Returns call stack including variables changed since VM was paused. VM must be paused.
         */
        getBacktrace(cb?: Function);
         /**
         * Makes backend skip steps in the sources with names matching given pattern. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         */
        skipStackFrames(params?: IDebuggerSkipStackFramesParams, cb?: Function);
         /**
         * Enables or disables async call stacks tracking.
         */
        setAsyncCallStackDepth(params: IDebuggerSetAsyncCallStackDepthParams, cb?: Function);
         /**
         * Enables promise tracking, information about <code>Promise</code>s created or updated will now be stored on the backend.
         */
        enablePromiseTracker(params?: IDebuggerEnablePromiseTrackerParams, cb?: Function);
         /**
         * Disables promise tracking.
         */
        disablePromiseTracker(cb?: Function);
         /**
         * Returns detailed information about all <code>Promise</code>s that were created or updated after the <code>enablePromiseTracker</code> command, and have not been garbage collected yet.
         */
        getPromises(cb?: Function);
         /**
         * Returns <code>Promise</code> with specified ID.
         */
        getPromiseById(params?: IDebuggerGetPromiseByIdParams, cb?: Function);
    }
    interface IDOMDebugger {
         /**
         * Sets breakpoint on particular operation with DOM.
         */
        setDOMBreakpoint(params: IDOMDebuggerSetDOMBreakpointParams, cb?: Function);
         /**
         * Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
         */
        removeDOMBreakpoint(params: IDOMDebuggerRemoveDOMBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on particular DOM event.
         */
        setEventListenerBreakpoint(params?: IDOMDebuggerSetEventListenerBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint on particular DOM event.
         */
        removeEventListenerBreakpoint(params?: IDOMDebuggerRemoveEventListenerBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on particular native event.
         */
        setInstrumentationBreakpoint(params: IDOMDebuggerSetInstrumentationBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint on particular native event.
         */
        removeInstrumentationBreakpoint(params: IDOMDebuggerRemoveInstrumentationBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on XMLHttpRequest.
         */
        setXHRBreakpoint(params: IDOMDebuggerSetXHRBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint from XMLHttpRequest.
         */
        removeXHRBreakpoint(params: IDOMDebuggerRemoveXHRBreakpointParams, cb?: Function);
    }
    interface IProfiler {
        enable(cb?: Function);
        disable(cb?: Function);
         /**
         * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
         */
        setSamplingInterval(params: IProfilerSetSamplingIntervalParams, cb?: Function);
        start(cb?: Function);
        stop(cb?: Function);
    }
    interface IHeapProfiler {
        enable(cb?: Function);
        disable(cb?: Function);
        startTrackingHeapObjects(params?: IHeapProfilerStartTrackingHeapObjectsParams, cb?: Function);
        stopTrackingHeapObjects(params?: IHeapProfilerStopTrackingHeapObjectsParams, cb?: Function);
        takeHeapSnapshot(params?: IHeapProfilerTakeHeapSnapshotParams, cb?: Function);
        collectGarbage(cb?: Function);
        getObjectByHeapObjectId(params?: IHeapProfilerGetObjectByHeapObjectIdParams, cb?: Function);
        getHeapObjectId(params: IHeapProfilerGetHeapObjectIdParams, cb?: Function);
    }
    interface IWorker {
        enable(cb?: Function);
        disable(cb?: Function);
        sendMessageToWorker(params: IWorkerSendMessageToWorkerParams, cb?: Function);
         /**
         * Tells whether browser supports workers inspection.
         */
        canInspectWorkers(cb?: Function);
        connectToWorker(params: IWorkerConnectToWorkerParams, cb?: Function);
        disconnectFromWorker(params: IWorkerDisconnectFromWorkerParams, cb?: Function);
        setAutoconnectToWorkers(params: IWorkerSetAutoconnectToWorkersParams, cb?: Function);
    }
    interface ICanvas {
         /**
         * Enables Canvas inspection.
         */
        enable(cb?: Function);
         /**
         * Disables Canvas inspection.
         */
        disable(cb?: Function);
        dropTraceLog(params: ICanvasDropTraceLogParams, cb?: Function);
         /**
         * Checks if there is any uninstrumented canvas in the inspected page.
         */
        hasUninstrumentedCanvases(cb?: Function);
         /**
         * Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared.
         */
        captureFrame(params?: ICanvasCaptureFrameParams, cb?: Function);
         /**
         * Starts (or continues) consecutive canvas frames capturing. The capturing is stopped by the corresponding stopCapturing command.
         */
        startCapturing(params?: ICanvasStartCapturingParams, cb?: Function);
        stopCapturing(params: ICanvasStopCapturingParams, cb?: Function);
        getTraceLog(params?: ICanvasGetTraceLogParams, cb?: Function);
        replayTraceLog(params: ICanvasReplayTraceLogParams, cb?: Function);
        getResourceState(params: ICanvasGetResourceStateParams, cb?: Function);
         /**
         * Evaluates a given trace call argument or its result.
         */
        evaluateTraceLogCallArgument(params?: ICanvasEvaluateTraceLogCallArgumentParams, cb?: Function);
    }
    interface IInput {
         /**
         * Dispatches a key event to the page.
         */
        dispatchKeyEvent(params?: IInputDispatchKeyEventParams, cb?: Function);
         /**
         * Dispatches a mouse event to the page.
         */
        dispatchMouseEvent(params?: IInputDispatchMouseEventParams, cb?: Function);
         /**
         * Dispatches a touch event to the page.
         */
        dispatchTouchEvent(params?: IInputDispatchTouchEventParams, cb?: Function);
         /**
         * Emulates touch event from the mouse event parameters.
         */
        emulateTouchFromMouseEvent(params?: IInputEmulateTouchFromMouseEventParams, cb?: Function);
    }
    interface ILayerTree {
         /**
         * Enables compositing tree inspection.
         */
        enable(cb?: Function);
         /**
         * Disables compositing tree inspection.
         */
        disable(cb?: Function);
         /**
         * Provides the reasons why the given layer was composited.
         */
        compositingReasons(params: ILayerTreeCompositingReasonsParams, cb?: Function);
         /**
         * Returns the layer snapshot identifier.
         */
        makeSnapshot(params: ILayerTreeMakeSnapshotParams, cb?: Function);
         /**
         * Returns the snapshot identifier.
         */
        loadSnapshot(params: ILayerTreeLoadSnapshotParams, cb?: Function);
         /**
         * Releases layer snapshot captured by the back-end.
         */
        releaseSnapshot(params: ILayerTreeReleaseSnapshotParams, cb?: Function);
        profileSnapshot(params?: ILayerTreeProfileSnapshotParams, cb?: Function);
         /**
         * Replays the layer snapshot and returns the resulting bitmap.
         */
        replaySnapshot(params?: ILayerTreeReplaySnapshotParams, cb?: Function);
         /**
         * Replays the layer snapshot and returns canvas log.
         */
        snapshotCommandLog(params: ILayerTreeSnapshotCommandLogParams, cb?: Function);
    }
    interface IDeviceOrientation {
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: IDeviceOrientationSetDeviceOrientationOverrideParams, cb?: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb?: Function);
    }
    interface ITracing {
         /**
         * Start trace events collection.
         */
        start(params?: ITracingStartParams, cb?: Function);
         /**
         * Stop trace events collection.
         */
        end(cb?: Function);
         /**
         * Gets supported tracing categories.
         */
        getCategories(cb?: Function);
    }
    interface IPower {
         /**
         * Start power events collection.
         */
        start(cb?: Function);
         /**
         * Stop power events collection.
         */
        end(cb?: Function);
         /**
         * Tells whether power profiling is supported.
         */
        canProfilePower(cb?: Function);
         /**
         * Describes the accuracy level of the data provider.
         */
        getAccuracyLevel(cb?: Function);
    }
    interface IAnimation {
         /**
         * Enables animation domain notifications.
         */
        enable(cb?: Function);
         /**
         * Returns animation players relevant to the node.
         */
        getAnimationPlayersForNode(params: IAnimationGetAnimationPlayersForNodeParams, cb?: Function);
         /**
         * Pauses animations relevant to the node.
         */
        pauseAnimationPlayer(params: IAnimationPauseAnimationPlayerParams, cb?: Function);
         /**
         * Plays animations relevant to the node.
         */
        playAnimationPlayer(params: IAnimationPlayAnimationPlayerParams, cb?: Function);
         /**
         * Sets the current time on given AnimationPlayer.
         */
        setAnimationPlayerCurrentTime(params: IAnimationSetAnimationPlayerCurrentTimeParams, cb?: Function);
         /**
         * Gets the state of an AnimationPlayer.
         */
        getAnimationPlayerState(params: IAnimationGetAnimationPlayerStateParams, cb?: Function);
         /**
         * Sets the parameters of recording for new animations events.
         */
        startListening(params: IAnimationStartListeningParams, cb?: Function);
         /**
         * Stops recording for new animation player events.
         */
        stopListening(cb?: Function);
    }
    interface IPageAddScriptToEvaluateOnLoadParams {
        scriptSource: string;
    }
    interface IPageRemoveScriptToEvaluateOnLoadParams {
        identifier: any;
    }
    interface IPageReloadParams {
        ignoreCache?: boolean;
        scriptToEvaluateOnLoad?: string;
        scriptPreprocessor?: string;
    }
    interface IPageNavigateParams {
        url: string;
    }
    interface IPageNavigateToHistoryEntryParams {
        entryId: number;
    }
    interface IPageDeleteCookieParams {
        cookieName: string;
        url: string;
    }
    interface IPageGetResourceContentParams {
        frameId: any;
        url: string;
    }
    interface IPageSearchInResourceParams {
        frameId: any;
        url: string;
        query: string;
        caseSensitive?: boolean;
        isRegex?: boolean;
    }
    interface IPageSetDocumentContentParams {
        frameId: any;
        html: string;
    }
    interface IPageSetDeviceMetricsOverrideParams {
        width: number;
        height: number;
        deviceScaleFactor: any;
        mobile: boolean;
        fitWindow: boolean;
        scale?: any;
        offsetX?: any;
        offsetY?: any;
    }
    interface IPageSetPageScaleFactorParams {
        pageScaleFactor: any;
    }
    interface IPageSetShowPaintRectsParams {
        result: boolean;
    }
    interface IPageSetShowDebugBordersParams {
        show: boolean;
    }
    interface IPageSetShowFPSCounterParams {
        show: boolean;
    }
    interface IPageSetContinuousPaintingEnabledParams {
        enabled: boolean;
    }
    interface IPageSetShowScrollBottleneckRectsParams {
        show: boolean;
    }
    interface IPageSetScriptExecutionDisabledParams {
        value: boolean;
    }
    interface IPageSetGeolocationOverrideParams {
        latitude?: any;
        longitude?: any;
        accuracy?: any;
    }
    interface IPageSetDeviceOrientationOverrideParams {
        alpha: any;
        beta: any;
        gamma: any;
    }
    interface IPageSetTouchEmulationEnabledParams {
        enabled: boolean;
        configuration?: string;
    }
    interface IPageSetEmulatedMediaParams {
        media: string;
    }
    interface IPageStartScreencastParams {
        format?: string;
        quality?: number;
        maxWidth?: number;
        maxHeight?: number;
    }
    interface IPageScreencastFrameAckParams {
        frameNumber: number;
    }
    interface IPageStartRecordingFramesParams {
        maxFrameCount: number;
    }
    interface IPageHandleJavaScriptDialogParams {
        accept: boolean;
        promptText?: string;
    }
    interface IPageSetShowViewportSizeOnResizeParams {
        show: boolean;
        showGrid?: boolean;
    }
    interface IPageQueryUsageAndQuotaParams {
        securityOrigin: string;
    }
    interface IPageSetColorPickerEnabledParams {
        enabled: boolean;
    }
    interface IPageSetOverlayMessageParams {
        message?: string;
    }
    interface IPageSetAnimationsPlaybackRateParams {
        playbackRate: any;
    }
    interface IRuntimeEvaluateParams {
        expression: string;
        objectGroup?: string;
        includeCommandLineAPI?: boolean;
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
        contextId?: any;
        returnByValue?: boolean;
        generatePreview?: boolean;
    }
    interface IRuntimeCallFunctionOnParams {
        objectId: any;
        functionDeclaration: string;
        arguments?: any[];
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
        returnByValue?: boolean;
        generatePreview?: boolean;
    }
    interface IRuntimeGetPropertiesParams {
        objectId: any;
        ownProperties?: boolean;
        accessorPropertiesOnly?: boolean;
    }
    interface IRuntimeReleaseObjectParams {
        objectId: any;
    }
    interface IRuntimeReleaseObjectGroupParams {
        objectGroup: string;
    }
    interface IRuntimeSetCustomObjectFormatterEnabledParams {
        enabled: boolean;
    }
    interface IConsoleSetMonitoringXHREnabledParams {
        enabled: boolean;
    }
    interface IConsoleAddInspectedNodeParams {
        nodeId: any;
    }
    interface IConsoleAddInspectedHeapObjectParams {
        heapObjectId: number;
    }
    interface IConsoleSetLastEvaluationResultParams {
        objectId: any;
    }
    interface INetworkSetUserAgentOverrideParams {
        userAgent: string;
    }
    interface INetworkSetExtraHTTPHeadersParams {
        headers: any;
    }
    interface INetworkGetResponseBodyParams {
        requestId: any;
    }
    interface INetworkReplayXHRParams {
        requestId: any;
    }
    interface INetworkEmulateNetworkConditionsParams {
        offline: boolean;
        latency: any;
        downloadThroughput: any;
        uploadThroughput: any;
    }
    interface INetworkSetCacheDisabledParams {
        cacheDisabled: boolean;
    }
    interface INetworkLoadResourceForFrontendParams {
        frameId: any;
        url: string;
        requestHeaders?: any;
    }
    interface IDatabaseGetDatabaseTableNamesParams {
        databaseId: any;
    }
    interface IDatabaseExecuteSQLParams {
        databaseId: any;
        query: string;
    }
    interface IIndexedDBRequestDatabaseNamesParams {
        securityOrigin: string;
    }
    interface IIndexedDBRequestDatabaseParams {
        securityOrigin: string;
        databaseName: string;
    }
    interface IIndexedDBRequestDataParams {
        securityOrigin: string;
        databaseName: string;
        objectStoreName: string;
        indexName: string;
        skipCount: number;
        pageSize: number;
        keyRange?: any;
    }
    interface IIndexedDBClearObjectStoreParams {
        securityOrigin: string;
        databaseName: string;
        objectStoreName: string;
    }
    interface IServiceWorkerCacheRequestEntriesParams {
        cacheName: string;
        skipCount: number;
        pageSize: number;
    }
    interface IServiceWorkerCacheDeleteCacheParams {
        cacheName: string;
    }
    interface IDOMStorageGetDOMStorageItemsParams {
        storageId: any;
    }
    interface IDOMStorageSetDOMStorageItemParams {
        storageId: any;
        key: string;
        value: string;
    }
    interface IDOMStorageRemoveDOMStorageItemParams {
        storageId: any;
        key: string;
    }
    interface IApplicationCacheGetManifestForFrameParams {
        frameId: any;
    }
    interface IApplicationCacheGetApplicationCacheForFrameParams {
        frameId: any;
    }
    interface IFileSystemRequestFileSystemRootParams {
        origin: string;
        type: string;
    }
    interface IFileSystemRequestDirectoryContentParams {
        url: string;
    }
    interface IFileSystemRequestMetadataParams {
        url: string;
    }
    interface IFileSystemRequestFileContentParams {
        url: string;
        readAsText: boolean;
        start?: number;
        end?: number;
        charset?: string;
    }
    interface IFileSystemDeleteEntryParams {
        url: string;
    }
    interface IDOMRequestChildNodesParams {
        nodeId: any;
        depth?: number;
    }
    interface IDOMRequestShadowHostDistributedNodesParams {
        nodeId: any;
    }
    interface IDOMQuerySelectorParams {
        nodeId: any;
        selector: string;
    }
    interface IDOMQuerySelectorAllParams {
        nodeId: any;
        selector: string;
    }
    interface IDOMSetNodeNameParams {
        nodeId: any;
        name: string;
    }
    interface IDOMSetNodeValueParams {
        nodeId: any;
        value: string;
    }
    interface IDOMRemoveNodeParams {
        nodeId: any;
    }
    interface IDOMSetAttributeValueParams {
        nodeId: any;
        name: string;
        value: string;
    }
    interface IDOMSetAttributesAsTextParams {
        nodeId: any;
        text: string;
        name?: string;
    }
    interface IDOMRemoveAttributeParams {
        nodeId: any;
        name: string;
    }
    interface IDOMGetEventListenersForNodeParams {
        nodeId: any;
        objectGroup?: string;
    }
    interface IDOMGetOuterHTMLParams {
        nodeId: any;
    }
    interface IDOMSetOuterHTMLParams {
        nodeId: any;
        outerHTML: string;
    }
    interface IDOMPerformSearchParams {
        query: string;
        includeUserAgentShadowDOM?: boolean;
    }
    interface IDOMGetSearchResultsParams {
        searchId: string;
        fromIndex: number;
        toIndex: number;
    }
    interface IDOMDiscardSearchResultsParams {
        searchId: string;
    }
    interface IDOMRequestNodeParams {
        objectId: any;
    }
    interface IDOMSetInspectModeEnabledParams {
        enabled: boolean;
        inspectUAShadowDOM?: boolean;
        highlightConfig?: any;
    }
    interface IDOMHighlightRectParams {
        x: number;
        y: number;
        width: number;
        height: number;
        color?: any;
        outlineColor?: any;
    }
    interface IDOMHighlightQuadParams {
        quad: any;
        color?: any;
        outlineColor?: any;
    }
    interface IDOMHighlightNodeParams {
        highlightConfig: any;
        nodeId?: any;
        objectId?: any;
    }
    interface IDOMHighlightFrameParams {
        frameId: any;
        contentColor?: any;
        contentOutlineColor?: any;
    }
    interface IDOMPushNodeByPathToFrontendParams {
        path: string;
    }
    interface IDOMPushNodesByBackendIdsToFrontendParams {
        backendNodeIds: any[];
    }
    interface IDOMResolveNodeParams {
        nodeId: any;
        objectGroup?: string;
    }
    interface IDOMGetAttributesParams {
        nodeId: any;
    }
    interface IDOMCopyToParams {
        nodeId: any;
        targetNodeId: any;
        insertBeforeNodeId?: any;
    }
    interface IDOMMoveToParams {
        nodeId: any;
        targetNodeId: any;
        insertBeforeNodeId?: any;
    }
    interface IDOMFocusParams {
        nodeId: any;
    }
    interface IDOMSetFileInputFilesParams {
        nodeId: any;
        files: any[];
    }
    interface IDOMGetBoxModelParams {
        nodeId: any;
    }
    interface IDOMGetNodeForLocationParams {
        x: number;
        y: number;
    }
    interface IDOMGetRelayoutBoundaryParams {
        nodeId: any;
    }
    interface ICSSGetMatchedStylesForNodeParams {
        nodeId: any;
        excludePseudo?: boolean;
        excludeInherited?: boolean;
    }
    interface ICSSGetInlineStylesForNodeParams {
        nodeId: any;
    }
    interface ICSSGetComputedStyleForNodeParams {
        nodeId: any;
    }
    interface ICSSGetPlatformFontsForNodeParams {
        nodeId: any;
    }
    interface ICSSGetStyleSheetTextParams {
        styleSheetId: any;
    }
    interface ICSSSetStyleSheetTextParams {
        styleSheetId: any;
        text: string;
    }
    interface ICSSSetPropertyTextParams {
        styleSheetId: any;
        range: any;
        text: string;
    }
    interface ICSSSetRuleSelectorParams {
        styleSheetId: any;
        range: any;
        selector: string;
    }
    interface ICSSSetMediaTextParams {
        styleSheetId: any;
        range: any;
        text: string;
    }
    interface ICSSCreateStyleSheetParams {
        frameId: any;
    }
    interface ICSSAddRuleParams {
        styleSheetId: any;
        ruleText: string;
        location: any;
    }
    interface ICSSForcePseudoStateParams {
        nodeId: any;
        forcedPseudoClasses: any[];
    }
    interface ITimelineStartParams {
        maxCallStackDepth?: number;
        bufferEvents?: boolean;
        liveEvents?: string;
        includeCounters?: boolean;
        includeGPUEvents?: boolean;
    }
    interface IDebuggerSetBreakpointsActiveParams {
        active: boolean;
    }
    interface IDebuggerSetSkipAllPausesParams {
        skipped: boolean;
        untilReload?: boolean;
    }
    interface IDebuggerSetBreakpointByUrlParams {
        lineNumber: number;
        url?: string;
        urlRegex?: string;
        columnNumber?: number;
        condition?: string;
    }
    interface IDebuggerSetBreakpointParams {
        location: any;
        condition?: string;
    }
    interface IDebuggerRemoveBreakpointParams {
        breakpointId: any;
    }
    interface IDebuggerContinueToLocationParams {
        location: any;
        interstatementLocation?: boolean;
    }
    interface IDebuggerSearchInContentParams {
        scriptId: any;
        query: string;
        caseSensitive?: boolean;
        isRegex?: boolean;
    }
    interface IDebuggerSetScriptSourceParams {
        scriptId: any;
        scriptSource: string;
        preview?: boolean;
    }
    interface IDebuggerRestartFrameParams {
        callFrameId: any;
    }
    interface IDebuggerGetScriptSourceParams {
        scriptId: any;
    }
    interface IDebuggerGetFunctionDetailsParams {
        functionId: any;
    }
    interface IDebuggerGetGeneratorObjectDetailsParams {
        objectId: any;
    }
    interface IDebuggerGetCollectionEntriesParams {
        objectId: any;
    }
    interface IDebuggerSetPauseOnExceptionsParams {
        state: string;
    }
    interface IDebuggerEvaluateOnCallFrameParams {
        callFrameId: any;
        expression: string;
        objectGroup?: string;
        includeCommandLineAPI?: boolean;
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
        returnByValue?: boolean;
        generatePreview?: boolean;
    }
    interface IDebuggerCompileScriptParams {
        expression: string;
        sourceURL: string;
        executionContextId?: any;
    }
    interface IDebuggerRunScriptParams {
        scriptId: any;
        executionContextId?: any;
        objectGroup?: string;
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
    }
    interface IDebuggerSetVariableValueParams {
        scopeNumber: number;
        variableName: string;
        newValue: any;
        callFrameId?: any;
        functionObjectId?: any;
    }
    interface IDebuggerGetStepInPositionsParams {
        callFrameId: any;
    }
    interface IDebuggerSkipStackFramesParams {
        script?: string;
        skipContentScripts?: boolean;
    }
    interface IDebuggerSetAsyncCallStackDepthParams {
        maxDepth: number;
    }
    interface IDebuggerEnablePromiseTrackerParams {
        captureStacks?: boolean;
    }
    interface IDebuggerGetPromiseByIdParams {
        promiseId: number;
        objectGroup?: string;
    }
    interface IDOMDebuggerSetDOMBreakpointParams {
        nodeId: any;
        type: any;
    }
    interface IDOMDebuggerRemoveDOMBreakpointParams {
        nodeId: any;
        type: any;
    }
    interface IDOMDebuggerSetEventListenerBreakpointParams {
        eventName: string;
        targetName?: string;
    }
    interface IDOMDebuggerRemoveEventListenerBreakpointParams {
        eventName: string;
        targetName?: string;
    }
    interface IDOMDebuggerSetInstrumentationBreakpointParams {
        eventName: string;
    }
    interface IDOMDebuggerRemoveInstrumentationBreakpointParams {
        eventName: string;
    }
    interface IDOMDebuggerSetXHRBreakpointParams {
        url: string;
    }
    interface IDOMDebuggerRemoveXHRBreakpointParams {
        url: string;
    }
    interface IProfilerSetSamplingIntervalParams {
        interval: number;
    }
    interface IHeapProfilerStartTrackingHeapObjectsParams {
        trackAllocations?: boolean;
    }
    interface IHeapProfilerStopTrackingHeapObjectsParams {
        reportProgress?: boolean;
    }
    interface IHeapProfilerTakeHeapSnapshotParams {
        reportProgress?: boolean;
    }
    interface IHeapProfilerGetObjectByHeapObjectIdParams {
        objectId: any;
        objectGroup?: string;
    }
    interface IHeapProfilerGetHeapObjectIdParams {
        objectId: any;
    }
    interface IWorkerSendMessageToWorkerParams {
        workerId: number;
        message: any;
    }
    interface IWorkerConnectToWorkerParams {
        workerId: number;
    }
    interface IWorkerDisconnectFromWorkerParams {
        workerId: number;
    }
    interface IWorkerSetAutoconnectToWorkersParams {
        value: boolean;
    }
    interface ICanvasDropTraceLogParams {
        traceLogId: any;
    }
    interface ICanvasCaptureFrameParams {
        frameId?: any;
    }
    interface ICanvasStartCapturingParams {
        frameId?: any;
    }
    interface ICanvasStopCapturingParams {
        traceLogId: any;
    }
    interface ICanvasGetTraceLogParams {
        traceLogId: any;
        startOffset?: number;
        maxLength?: number;
    }
    interface ICanvasReplayTraceLogParams {
        traceLogId: any;
        stepNo: number;
    }
    interface ICanvasGetResourceStateParams {
        traceLogId: any;
        resourceId: any;
    }
    interface ICanvasEvaluateTraceLogCallArgumentParams {
        traceLogId: any;
        callIndex: number;
        argumentIndex: number;
        objectGroup?: string;
    }
    interface IInputDispatchKeyEventParams {
        type: string;
        modifiers?: number;
        timestamp?: any;
        text?: string;
        unmodifiedText?: string;
        keyIdentifier?: string;
        windowsVirtualKeyCode?: number;
        nativeVirtualKeyCode?: number;
        autoRepeat?: boolean;
        isKeypad?: boolean;
        isSystemKey?: boolean;
    }
    interface IInputDispatchMouseEventParams {
        type: string;
        x: number;
        y: number;
        modifiers?: number;
        timestamp?: any;
        button?: string;
        clickCount?: number;
    }
    interface IInputDispatchTouchEventParams {
        type: string;
        touchPoints: any[];
        modifiers?: number;
        timestamp?: any;
    }
    interface IInputEmulateTouchFromMouseEventParams {
        type: string;
        x: number;
        y: number;
        timestamp: any;
        button: string;
        deltaX?: any;
        deltaY?: any;
        modifiers?: number;
        clickCount?: number;
    }
    interface ILayerTreeCompositingReasonsParams {
        layerId: any;
    }
    interface ILayerTreeMakeSnapshotParams {
        layerId: any;
    }
    interface ILayerTreeLoadSnapshotParams {
        tiles: any[];
    }
    interface ILayerTreeReleaseSnapshotParams {
        snapshotId: any;
    }
    interface ILayerTreeProfileSnapshotParams {
        snapshotId: any;
        minRepeatCount?: number;
        minDuration?: any;
        clipRect?: any;
    }
    interface ILayerTreeReplaySnapshotParams {
        snapshotId: any;
        fromStep?: number;
        toStep?: number;
        scale?: any;
    }
    interface ILayerTreeSnapshotCommandLogParams {
        snapshotId: any;
    }
    interface IDeviceOrientationSetDeviceOrientationOverrideParams {
        alpha: any;
        beta: any;
        gamma: any;
    }
    interface ITracingStartParams {
        categories?: string;
        options?: string;
        bufferUsageReportingInterval?: any;
    }
    interface IAnimationGetAnimationPlayersForNodeParams {
        nodeId: any;
        includeSubtreeAnimations: boolean;
    }
    interface IAnimationPauseAnimationPlayerParams {
        id: string;
    }
    interface IAnimationPlayAnimationPlayerParams {
        id: string;
    }
    interface IAnimationSetAnimationPlayerCurrentTimeParams {
        id: string;
        currentTime: any;
    }
    interface IAnimationGetAnimationPlayerStateParams {
        id: string;
    }
    interface IAnimationStartListeningParams {
        nodeId: any;
        includeSubtreeAnimations: boolean;
    }

}

