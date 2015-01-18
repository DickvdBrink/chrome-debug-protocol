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
         /**
         * If true, browser cache is ignored (as if the user pressed Shift+refresh).
         */
        ignoreCache?: boolean;
         /**
         * If set, the script will be injected into all frames of the inspected page after reload.
         */
        scriptToEvaluateOnLoad?: string;
         /**
         * Script body that should evaluate to function that will preprocess all the scripts before their compilation.
         */
        scriptPreprocessor?: string;
    }
    interface IPageNavigateParams {
         /**
         * URL to navigate the page to.
         */
        url: string;
    }
    interface IPageNavigateToHistoryEntryParams {
         /**
         * Unique id of the entry to navigate to.
         */
        entryId: number;
    }
    interface IPageDeleteCookieParams {
         /**
         * Name of the cookie to remove.
         */
        cookieName: string;
         /**
         * URL to match cooke domain and path.
         */
        url: string;
    }
    interface IPageGetResourceContentParams {
         /**
         * Frame id to get resource for.
         */
        frameId: any;
         /**
         * URL of the resource to get content for.
         */
        url: string;
    }
    interface IPageSearchInResourceParams {
         /**
         * Frame id for resource to search in.
         */
        frameId: any;
         /**
         * URL of the resource to search in.
         */
        url: string;
         /**
         * String to search for.
         */
        query: string;
         /**
         * If true, search is case sensitive.
         */
        caseSensitive?: boolean;
         /**
         * If true, treats string parameter as regex.
         */
        isRegex?: boolean;
    }
    interface IPageSetDocumentContentParams {
         /**
         * Frame id to set HTML for.
         */
        frameId: any;
         /**
         * HTML content to set.
         */
        html: string;
    }
    interface IPageSetDeviceMetricsOverrideParams {
         /**
         * Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
         */
        width: number;
         /**
         * Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
         */
        height: number;
         /**
         * Overriding device scale factor value. 0 disables the override.
         */
        deviceScaleFactor: any;
         /**
         * Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more.
         */
        mobile: boolean;
         /**
         * Whether a view that exceeds the available browser window area should be scaled down to fit.
         */
        fitWindow: boolean;
         /**
         * Scale to apply to resulting view image. Ignored in |fitWindow| mode.
         */
        scale?: any;
         /**
         * X offset to shift resulting view image by. Ignored in |fitWindow| mode.
         */
        offsetX?: any;
         /**
         * Y offset to shift resulting view image by. Ignored in |fitWindow| mode.
         */
        offsetY?: any;
    }
    interface IPageSetPageScaleFactorParams {
         /**
         * Page scale factor.
         */
        pageScaleFactor: any;
    }
    interface IPageSetShowPaintRectsParams {
         /**
         * True for showing paint rectangles
         */
        result: boolean;
    }
    interface IPageSetShowDebugBordersParams {
         /**
         * True for showing debug borders
         */
        show: boolean;
    }
    interface IPageSetShowFPSCounterParams {
         /**
         * True for showing the FPS counter
         */
        show: boolean;
    }
    interface IPageSetContinuousPaintingEnabledParams {
         /**
         * True for enabling cointinuous painting
         */
        enabled: boolean;
    }
    interface IPageSetShowScrollBottleneckRectsParams {
         /**
         * True for showing scroll bottleneck rects
         */
        show: boolean;
    }
    interface IPageSetScriptExecutionDisabledParams {
         /**
         * Whether script execution should be disabled in the page.
         */
        value: boolean;
    }
    interface IPageSetGeolocationOverrideParams {
         /**
         * Mock latitude
         */
        latitude?: any;
         /**
         * Mock longitude
         */
        longitude?: any;
         /**
         * Mock accuracy
         */
        accuracy?: any;
    }
    interface IPageSetDeviceOrientationOverrideParams {
         /**
         * Mock alpha
         */
        alpha: any;
         /**
         * Mock beta
         */
        beta: any;
         /**
         * Mock gamma
         */
        gamma: any;
    }
    interface IPageSetTouchEmulationEnabledParams {
         /**
         * Whether the touch event emulation should be enabled.
         */
        enabled: boolean;
         /**
         * Touch/gesture events configuration. Default: current platform.
         */
        configuration?: string;
    }
    interface IPageSetEmulatedMediaParams {
         /**
         * Media type to emulate. Empty string disables the override.
         */
        media: string;
    }
    interface IPageStartScreencastParams {
         /**
         * Image compression format.
         */
        format?: string;
         /**
         * Compression quality from range [0..100].
         */
        quality?: number;
         /**
         * Maximum screenshot width.
         */
        maxWidth?: number;
         /**
         * Maximum screenshot height.
         */
        maxHeight?: number;
    }
    interface IPageScreencastFrameAckParams {
         /**
         * Frame number.
         */
        frameNumber: number;
    }
    interface IPageStartRecordingFramesParams {
         /**
         * Maximal number of frames to record from range. Actual maximum depends on implementation.
         */
        maxFrameCount: number;
    }
    interface IPageHandleJavaScriptDialogParams {
         /**
         * Whether to accept or dismiss the dialog.
         */
        accept: boolean;
         /**
         * The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog.
         */
        promptText?: string;
    }
    interface IPageSetShowViewportSizeOnResizeParams {
         /**
         * Whether to paint size or not.
         */
        show: boolean;
         /**
         * Whether to paint grid as well.
         */
        showGrid?: boolean;
    }
    interface IPageQueryUsageAndQuotaParams {
         /**
         * Security origin quota and usage requested for
         */
        securityOrigin: string;
    }
    interface IPageSetColorPickerEnabledParams {
         /**
         * Shows / hides color picker
         */
        enabled: boolean;
    }
    interface IPageSetOverlayMessageParams {
         /**
         * Overlay message to display when paused in debugger.
         */
        message?: string;
    }
    interface IPageSetAnimationsPlaybackRateParams {
         /**
         * Playback rate for animations on page
         */
        playbackRate: any;
    }
    interface IRuntimeEvaluateParams {
         /**
         * Expression to evaluate.
         */
        expression: string;
         /**
         * Symbolic group name that can be used to release multiple objects.
         */
        objectGroup?: string;
         /**
         * Determines whether Command Line API should be available during the evaluation.
         */
        includeCommandLineAPI?: boolean;
         /**
         * Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
         */
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
         /**
         * Specifies in which isolated context to perform evaluation. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
         */
        contextId?: any;
         /**
         * Whether the result is expected to be a JSON object that should be sent by value.
         */
        returnByValue?: boolean;
         /**
         * Whether preview should be generated for the result.
         */
        generatePreview?: boolean;
    }
    interface IRuntimeCallFunctionOnParams {
         /**
         * Identifier of the object to call function on.
         */
        objectId: any;
         /**
         * Declaration of the function to call.
         */
        functionDeclaration: string;
         /**
         * Call arguments. All call arguments must belong to the same JavaScript world as the target object.
         */
        arguments?: any[];
         /**
         * Specifies whether function call should stop on exceptions and mute console. Overrides setPauseOnException state.
         */
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
         /**
         * Whether the result is expected to be a JSON object which should be sent by value.
         */
        returnByValue?: boolean;
         /**
         * Whether preview should be generated for the result.
         */
        generatePreview?: boolean;
    }
    interface IRuntimeGetPropertiesParams {
         /**
         * Identifier of the object to return properties for.
         */
        objectId: any;
         /**
         * If true, returns properties belonging only to the element itself, not to its prototype chain.
         */
        ownProperties?: boolean;
         /**
         * If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
         */
        accessorPropertiesOnly?: boolean;
    }
    interface IRuntimeReleaseObjectParams {
         /**
         * Identifier of the object to release.
         */
        objectId: any;
    }
    interface IRuntimeReleaseObjectGroupParams {
         /**
         * Symbolic object group name.
         */
        objectGroup: string;
    }
    interface IRuntimeSetCustomObjectFormatterEnabledParams {
        enabled: boolean;
    }
    interface IConsoleSetMonitoringXHREnabledParams {
         /**
         * Monitoring enabled state.
         */
        enabled: boolean;
    }
    interface IConsoleAddInspectedNodeParams {
         /**
         * DOM node id to be accessible by means of $x command line API.
         */
        nodeId: any;
    }
    interface IConsoleAddInspectedHeapObjectParams {
        heapObjectId: number;
    }
    interface IConsoleSetLastEvaluationResultParams {
         /**
         * Identifier of the object to set as last evaluation result.
         */
        objectId: any;
    }
    interface INetworkSetUserAgentOverrideParams {
         /**
         * User agent to use.
         */
        userAgent: string;
    }
    interface INetworkSetExtraHTTPHeadersParams {
         /**
         * Map with extra HTTP headers.
         */
        headers: any;
    }
    interface INetworkGetResponseBodyParams {
         /**
         * Identifier of the network request to get content for.
         */
        requestId: any;
    }
    interface INetworkReplayXHRParams {
         /**
         * Identifier of XHR to replay.
         */
        requestId: any;
    }
    interface INetworkEmulateNetworkConditionsParams {
         /**
         * True to emulate internet disconnection.
         */
        offline: boolean;
         /**
         * Additional latency (ms).
         */
        latency: any;
         /**
         * Maximal aggregated download throughput.
         */
        downloadThroughput: any;
         /**
         * Maximal aggregated upload throughput.
         */
        uploadThroughput: any;
    }
    interface INetworkSetCacheDisabledParams {
         /**
         * Cache disabled state.
         */
        cacheDisabled: boolean;
    }
    interface INetworkLoadResourceForFrontendParams {
         /**
         * Frame to load the resource from.
         */
        frameId: any;
         /**
         * URL of the resource to load.
         */
        url: string;
         /**
         * Request headers.
         */
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
         /**
         * Security origin.
         */
        securityOrigin: string;
    }
    interface IIndexedDBRequestDatabaseParams {
         /**
         * Security origin.
         */
        securityOrigin: string;
         /**
         * Database name.
         */
        databaseName: string;
    }
    interface IIndexedDBRequestDataParams {
         /**
         * Security origin.
         */
        securityOrigin: string;
         /**
         * Database name.
         */
        databaseName: string;
         /**
         * Object store name.
         */
        objectStoreName: string;
         /**
         * Index name, empty string for object store data requests.
         */
        indexName: string;
         /**
         * Number of records to skip.
         */
        skipCount: number;
         /**
         * Number of records to fetch.
         */
        pageSize: number;
         /**
         * Key range.
         */
        keyRange?: any;
    }
    interface IIndexedDBClearObjectStoreParams {
         /**
         * Security origin.
         */
        securityOrigin: string;
         /**
         * Database name.
         */
        databaseName: string;
         /**
         * Object store name.
         */
        objectStoreName: string;
    }
    interface IServiceWorkerCacheRequestEntriesParams {
         /**
         * Cache name.
         */
        cacheName: string;
         /**
         * Number of records to skip.
         */
        skipCount: number;
         /**
         * Number of records to fetch.
         */
        pageSize: number;
    }
    interface IServiceWorkerCacheDeleteCacheParams {
         /**
         * Cache name.
         */
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
         /**
         * Identifier of the frame containing document whose manifest is retrieved.
         */
        frameId: any;
    }
    interface IApplicationCacheGetApplicationCacheForFrameParams {
         /**
         * Identifier of the frame containing document whose application cache is retrieved.
         */
        frameId: any;
    }
    interface IFileSystemRequestFileSystemRootParams {
         /**
         * Security origin of requesting FileSystem. One of frames in current page needs to have this security origin.
         */
        origin: string;
         /**
         * FileSystem type of requesting FileSystem.
         */
        type: string;
    }
    interface IFileSystemRequestDirectoryContentParams {
         /**
         * URL of the directory that the frontend is requesting to read from.
         */
        url: string;
    }
    interface IFileSystemRequestMetadataParams {
         /**
         * URL of the entry that the frontend is requesting to get metadata from.
         */
        url: string;
    }
    interface IFileSystemRequestFileContentParams {
         /**
         * URL of the file that the frontend is requesting to read from.
         */
        url: string;
         /**
         * True if the content should be read as text, otherwise the result will be returned as base64 encoded text.
         */
        readAsText: boolean;
         /**
         * Specifies the start of range to read.
         */
        start?: number;
         /**
         * Specifies the end of range to read exclusively.
         */
        end?: number;
         /**
         * Overrides charset of the content when content is served as text.
         */
        charset?: string;
    }
    interface IFileSystemDeleteEntryParams {
         /**
         * URL of the entry to delete.
         */
        url: string;
    }
    interface IDOMRequestChildNodesParams {
         /**
         * Id of the node to get children for.
         */
        nodeId: any;
         /**
         * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
         */
        depth?: number;
    }
    interface IDOMRequestShadowHostDistributedNodesParams {
         /**
         * Id of the node to get distributed nodes for.
         */
        nodeId: any;
    }
    interface IDOMQuerySelectorParams {
         /**
         * Id of the node to query upon.
         */
        nodeId: any;
         /**
         * Selector string.
         */
        selector: string;
    }
    interface IDOMQuerySelectorAllParams {
         /**
         * Id of the node to query upon.
         */
        nodeId: any;
         /**
         * Selector string.
         */
        selector: string;
    }
    interface IDOMSetNodeNameParams {
         /**
         * Id of the node to set name for.
         */
        nodeId: any;
         /**
         * New node's name.
         */
        name: string;
    }
    interface IDOMSetNodeValueParams {
         /**
         * Id of the node to set value for.
         */
        nodeId: any;
         /**
         * New node's value.
         */
        value: string;
    }
    interface IDOMRemoveNodeParams {
         /**
         * Id of the node to remove.
         */
        nodeId: any;
    }
    interface IDOMSetAttributeValueParams {
         /**
         * Id of the element to set attribute for.
         */
        nodeId: any;
         /**
         * Attribute name.
         */
        name: string;
         /**
         * Attribute value.
         */
        value: string;
    }
    interface IDOMSetAttributesAsTextParams {
         /**
         * Id of the element to set attributes for.
         */
        nodeId: any;
         /**
         * Text with a number of attributes. Will parse this text using HTML parser.
         */
        text: string;
         /**
         * Attribute name to replace with new attributes derived from text in case text parsed successfully.
         */
        name?: string;
    }
    interface IDOMRemoveAttributeParams {
         /**
         * Id of the element to remove attribute from.
         */
        nodeId: any;
         /**
         * Name of the attribute to remove.
         */
        name: string;
    }
    interface IDOMGetEventListenersForNodeParams {
         /**
         * Id of the node to get listeners for.
         */
        nodeId: any;
         /**
         * Symbolic group name for handler value. Handler value is not returned without this parameter specified.
         */
        objectGroup?: string;
    }
    interface IDOMGetOuterHTMLParams {
         /**
         * Id of the node to get markup for.
         */
        nodeId: any;
    }
    interface IDOMSetOuterHTMLParams {
         /**
         * Id of the node to set markup for.
         */
        nodeId: any;
         /**
         * Outer HTML markup to set.
         */
        outerHTML: string;
    }
    interface IDOMPerformSearchParams {
         /**
         * Plain text or query selector or XPath search query.
         */
        query: string;
         /**
         * True to search in user agent shadow DOM.
         */
        includeUserAgentShadowDOM?: boolean;
    }
    interface IDOMGetSearchResultsParams {
         /**
         * Unique search session identifier.
         */
        searchId: string;
         /**
         * Start index of the search result to be returned.
         */
        fromIndex: number;
         /**
         * End index of the search result to be returned.
         */
        toIndex: number;
    }
    interface IDOMDiscardSearchResultsParams {
         /**
         * Unique search session identifier.
         */
        searchId: string;
    }
    interface IDOMRequestNodeParams {
         /**
         * JavaScript object id to convert into node.
         */
        objectId: any;
    }
    interface IDOMSetInspectModeEnabledParams {
         /**
         * True to enable inspection mode, false to disable it.
         */
        enabled: boolean;
         /**
         * True to enable inspection mode for user agent shadow DOM.
         */
        inspectUAShadowDOM?: boolean;
         /**
         * A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>.
         */
        highlightConfig?: any;
    }
    interface IDOMHighlightRectParams {
         /**
         * X coordinate
         */
        x: number;
         /**
         * Y coordinate
         */
        y: number;
         /**
         * Rectangle width
         */
        width: number;
         /**
         * Rectangle height
         */
        height: number;
         /**
         * The highlight fill color (default: transparent).
         */
        color?: any;
         /**
         * The highlight outline color (default: transparent).
         */
        outlineColor?: any;
    }
    interface IDOMHighlightQuadParams {
         /**
         * Quad to highlight
         */
        quad: any;
         /**
         * The highlight fill color (default: transparent).
         */
        color?: any;
         /**
         * The highlight outline color (default: transparent).
         */
        outlineColor?: any;
    }
    interface IDOMHighlightNodeParams {
         /**
         * A descriptor for the highlight appearance.
         */
        highlightConfig: any;
         /**
         * Identifier of the node to highlight.
         */
        nodeId?: any;
         /**
         * JavaScript object id of the node to be highlighted.
         */
        objectId?: any;
    }
    interface IDOMHighlightFrameParams {
         /**
         * Identifier of the frame to highlight.
         */
        frameId: any;
         /**
         * The content box highlight fill color (default: transparent).
         */
        contentColor?: any;
         /**
         * The content box highlight outline color (default: transparent).
         */
        contentOutlineColor?: any;
    }
    interface IDOMPushNodeByPathToFrontendParams {
         /**
         * Path to node in the proprietary format.
         */
        path: string;
    }
    interface IDOMPushNodesByBackendIdsToFrontendParams {
         /**
         * The array of backend node ids.
         */
        backendNodeIds: any[];
    }
    interface IDOMResolveNodeParams {
         /**
         * Id of the node to resolve.
         */
        nodeId: any;
         /**
         * Symbolic group name that can be used to release multiple objects.
         */
        objectGroup?: string;
    }
    interface IDOMGetAttributesParams {
         /**
         * Id of the node to retrieve attibutes for.
         */
        nodeId: any;
    }
    interface IDOMCopyToParams {
         /**
         * Id of the node to copy.
         */
        nodeId: any;
         /**
         * Id of the element to drop the copy into.
         */
        targetNodeId: any;
         /**
         * Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>).
         */
        insertBeforeNodeId?: any;
    }
    interface IDOMMoveToParams {
         /**
         * Id of the node to move.
         */
        nodeId: any;
         /**
         * Id of the element to drop the moved node into.
         */
        targetNodeId: any;
         /**
         * Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>).
         */
        insertBeforeNodeId?: any;
    }
    interface IDOMFocusParams {
         /**
         * Id of the node to focus.
         */
        nodeId: any;
    }
    interface IDOMSetFileInputFilesParams {
         /**
         * Id of the file input node to set files for.
         */
        nodeId: any;
         /**
         * Array of file paths to set.
         */
        files: any[];
    }
    interface IDOMGetBoxModelParams {
         /**
         * Id of the node to get box model for.
         */
        nodeId: any;
    }
    interface IDOMGetNodeForLocationParams {
         /**
         * X coordinate.
         */
        x: number;
         /**
         * Y coordinate.
         */
        y: number;
    }
    interface IDOMGetRelayoutBoundaryParams {
         /**
         * Id of the node.
         */
        nodeId: any;
    }
    interface ICSSGetMatchedStylesForNodeParams {
        nodeId: any;
         /**
         * Whether to exclude pseudo styles (default: false).
         */
        excludePseudo?: boolean;
         /**
         * Whether to exclude inherited styles (default: false).
         */
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
         /**
         * Either a source range of the property to be edited or an empty range representing a position for the property insertion.
         */
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
         /**
         * Identifier of the frame where "via-inspector" stylesheet should be created.
         */
        frameId: any;
    }
    interface ICSSAddRuleParams {
         /**
         * The css style sheet identifier where a new rule should be inserted.
         */
        styleSheetId: any;
         /**
         * The text of a new rule.
         */
        ruleText: string;
         /**
         * Text position of a new rule in the target style sheet.
         */
        location: any;
    }
    interface ICSSForcePseudoStateParams {
         /**
         * The element id for which to force the pseudo state.
         */
        nodeId: any;
         /**
         * Element pseudo classes to force when computing the element's style.
         */
        forcedPseudoClasses: any[];
    }
    interface ITimelineStartParams {
         /**
         * Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5.
         */
        maxCallStackDepth?: number;
         /**
         * Whether instrumentation events should be buffered and returned upon <code>stop</code> call.
         */
        bufferEvents?: boolean;
         /**
         * Coma separated event types to issue although bufferEvents is set.
         */
        liveEvents?: string;
         /**
         * Whether counters data should be included into timeline events.
         */
        includeCounters?: boolean;
         /**
         * Whether events from GPU process should be collected.
         */
        includeGPUEvents?: boolean;
    }
    interface IDebuggerSetBreakpointsActiveParams {
         /**
         * New value for breakpoints active state.
         */
        active: boolean;
    }
    interface IDebuggerSetSkipAllPausesParams {
         /**
         * New value for skip pauses state.
         */
        skipped: boolean;
         /**
         * Whether page reload should set skipped to false.
         */
        untilReload?: boolean;
    }
    interface IDebuggerSetBreakpointByUrlParams {
         /**
         * Line number to set breakpoint at.
         */
        lineNumber: number;
         /**
         * URL of the resources to set breakpoint on.
         */
        url?: string;
         /**
         * Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
         */
        urlRegex?: string;
         /**
         * Offset in the line to set breakpoint at.
         */
        columnNumber?: number;
         /**
         * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
         */
        condition?: string;
    }
    interface IDebuggerSetBreakpointParams {
         /**
         * Location to set breakpoint in.
         */
        location: any;
         /**
         * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
         */
        condition?: string;
    }
    interface IDebuggerRemoveBreakpointParams {
        breakpointId: any;
    }
    interface IDebuggerContinueToLocationParams {
         /**
         * Location to continue to.
         */
        location: any;
         /**
         * Allows breakpoints at the intemediate positions inside statements.
         */
        interstatementLocation?: boolean;
    }
    interface IDebuggerSearchInContentParams {
         /**
         * Id of the script to search in.
         */
        scriptId: any;
         /**
         * String to search for.
         */
        query: string;
         /**
         * If true, search is case sensitive.
         */
        caseSensitive?: boolean;
         /**
         * If true, treats string parameter as regex.
         */
        isRegex?: boolean;
    }
    interface IDebuggerSetScriptSourceParams {
         /**
         * Id of the script to edit.
         */
        scriptId: any;
         /**
         * New content of the script.
         */
        scriptSource: string;
         /**
         *  If true the change will not actually be applied. Preview mode may be used to get result description without actually modifying the code.
         */
        preview?: boolean;
    }
    interface IDebuggerRestartFrameParams {
         /**
         * Call frame identifier to evaluate on.
         */
        callFrameId: any;
    }
    interface IDebuggerGetScriptSourceParams {
         /**
         * Id of the script to get source for.
         */
        scriptId: any;
    }
    interface IDebuggerGetFunctionDetailsParams {
         /**
         * Id of the function to get details for.
         */
        functionId: any;
    }
    interface IDebuggerGetGeneratorObjectDetailsParams {
         /**
         * Id of the generator object to get details for.
         */
        objectId: any;
    }
    interface IDebuggerGetCollectionEntriesParams {
         /**
         * Id of the collection to get entries for.
         */
        objectId: any;
    }
    interface IDebuggerSetPauseOnExceptionsParams {
         /**
         * Pause on exceptions mode.
         */
        state: string;
    }
    interface IDebuggerEvaluateOnCallFrameParams {
         /**
         * Call frame identifier to evaluate on.
         */
        callFrameId: any;
         /**
         * Expression to evaluate.
         */
        expression: string;
         /**
         * String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
         */
        objectGroup?: string;
         /**
         * Specifies whether command line API should be available to the evaluated expression, defaults to false.
         */
        includeCommandLineAPI?: boolean;
         /**
         * Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
         */
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
         /**
         * Whether the result is expected to be a JSON object that should be sent by value.
         */
        returnByValue?: boolean;
         /**
         * Whether preview should be generated for the result.
         */
        generatePreview?: boolean;
    }
    interface IDebuggerCompileScriptParams {
         /**
         * Expression to compile.
         */
        expression: string;
         /**
         * Source url to be set for the script.
         */
        sourceURL: string;
         /**
         * Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
         */
        executionContextId?: any;
    }
    interface IDebuggerRunScriptParams {
         /**
         * Id of the script to run.
         */
        scriptId: any;
         /**
         * Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
         */
        executionContextId?: any;
         /**
         * Symbolic group name that can be used to release multiple objects.
         */
        objectGroup?: string;
         /**
         * Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state.
         */
        doNotPauseOnExceptionsAndMuteConsole?: boolean;
    }
    interface IDebuggerSetVariableValueParams {
         /**
         * 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually.
         */
        scopeNumber: number;
         /**
         * Variable name.
         */
        variableName: string;
         /**
         * New variable value.
         */
        newValue: any;
         /**
         * Id of callframe that holds variable.
         */
        callFrameId?: any;
         /**
         * Object id of closure (function) that holds variable.
         */
        functionObjectId?: any;
    }
    interface IDebuggerGetStepInPositionsParams {
         /**
         * Id of a call frame where the current statement should be analized
         */
        callFrameId: any;
    }
    interface IDebuggerSkipStackFramesParams {
         /**
         * Regular expression defining the scripts to ignore while stepping.
         */
        script?: string;
         /**
         * True, if all content scripts should be ignored.
         */
        skipContentScripts?: boolean;
    }
    interface IDebuggerSetAsyncCallStackDepthParams {
         /**
         * Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default).
         */
        maxDepth: number;
    }
    interface IDebuggerEnablePromiseTrackerParams {
         /**
         * Whether to capture stack traces for promise creation and settlement events (default: false).
         */
        captureStacks?: boolean;
    }
    interface IDebuggerGetPromiseByIdParams {
        promiseId: number;
         /**
         * Symbolic group name that can be used to release multiple objects.
         */
        objectGroup?: string;
    }
    interface IDOMDebuggerSetDOMBreakpointParams {
         /**
         * Identifier of the node to set breakpoint on.
         */
        nodeId: any;
         /**
         * Type of the operation to stop upon.
         */
        type: any;
    }
    interface IDOMDebuggerRemoveDOMBreakpointParams {
         /**
         * Identifier of the node to remove breakpoint from.
         */
        nodeId: any;
         /**
         * Type of the breakpoint to remove.
         */
        type: any;
    }
    interface IDOMDebuggerSetEventListenerBreakpointParams {
         /**
         * DOM Event name to stop on (any DOM event will do).
         */
        eventName: string;
         /**
         * EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.
         */
        targetName?: string;
    }
    interface IDOMDebuggerRemoveEventListenerBreakpointParams {
         /**
         * Event name.
         */
        eventName: string;
         /**
         * EventTarget interface name.
         */
        targetName?: string;
    }
    interface IDOMDebuggerSetInstrumentationBreakpointParams {
         /**
         * Instrumentation name to stop on.
         */
        eventName: string;
    }
    interface IDOMDebuggerRemoveInstrumentationBreakpointParams {
         /**
         * Instrumentation name to stop on.
         */
        eventName: string;
    }
    interface IDOMDebuggerSetXHRBreakpointParams {
         /**
         * Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
         */
        url: string;
    }
    interface IDOMDebuggerRemoveXHRBreakpointParams {
         /**
         * Resource URL substring.
         */
        url: string;
    }
    interface IProfilerSetSamplingIntervalParams {
         /**
         * New sampling interval in microseconds.
         */
        interval: number;
    }
    interface IHeapProfilerStartTrackingHeapObjectsParams {
        trackAllocations?: boolean;
    }
    interface IHeapProfilerStopTrackingHeapObjectsParams {
         /**
         * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
         */
        reportProgress?: boolean;
    }
    interface IHeapProfilerTakeHeapSnapshotParams {
         /**
         * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
         */
        reportProgress?: boolean;
    }
    interface IHeapProfilerGetObjectByHeapObjectIdParams {
        objectId: any;
         /**
         * Symbolic group name that can be used to release multiple objects.
         */
        objectGroup?: string;
    }
    interface IHeapProfilerGetHeapObjectIdParams {
         /**
         * Identifier of the object to get heap object id for.
         */
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
         /**
         * Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
         */
        frameId?: any;
    }
    interface ICanvasStartCapturingParams {
         /**
         * Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
         */
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
         /**
         * Last call index in the trace log to replay (zero based).
         */
        stepNo: number;
    }
    interface ICanvasGetResourceStateParams {
        traceLogId: any;
        resourceId: any;
    }
    interface ICanvasEvaluateTraceLogCallArgumentParams {
        traceLogId: any;
         /**
         * Index of the call to evaluate on (zero based).
         */
        callIndex: number;
         /**
         * Index of the argument to evaluate (zero based). Provide <code>-1</code> to evaluate call result.
         */
        argumentIndex: number;
         /**
         * String object group name to put result into (allows rapid releasing resulting object handles using <code>Runtime.releaseObjectGroup</code>).
         */
        objectGroup?: string;
    }
    interface IInputDispatchKeyEventParams {
         /**
         * Type of the key event.
         */
        type: string;
         /**
         * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0).
         */
        modifiers?: number;
         /**
         * Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time).
         */
        timestamp?: any;
         /**
         * Text as generated by processing a virtual key code with a keyboard layout. Not needed for for <code>keyUp</code> and <code>rawKeyDown</code> events (default: "")
         */
        text?: string;
         /**
         * Text that would have been generated by the keyboard if no modifiers were pressed (except for shift). Useful for shortcut (accelerator) key handling (default: "").
         */
        unmodifiedText?: string;
         /**
         * Unique key identifier (e.g., 'U+0041') (default: "").
         */
        keyIdentifier?: string;
         /**
         * Windows virtual key code (default: 0).
         */
        windowsVirtualKeyCode?: number;
         /**
         * Native virtual key code (default: 0).
         */
        nativeVirtualKeyCode?: number;
         /**
         * Whether the event was generated from auto repeat (default: false).
         */
        autoRepeat?: boolean;
         /**
         * Whether the event was generated from the keypad (default: false).
         */
        isKeypad?: boolean;
         /**
         * Whether the event was a system key event (default: false).
         */
        isSystemKey?: boolean;
    }
    interface IInputDispatchMouseEventParams {
         /**
         * Type of the mouse event.
         */
        type: string;
         /**
         * X coordinate of the event relative to the main frame's viewport.
         */
        x: number;
         /**
         * Y coordinate of the event relative to the main frame's viewport. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
         */
        y: number;
         /**
         * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0).
         */
        modifiers?: number;
         /**
         * Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time).
         */
        timestamp?: any;
         /**
         * Mouse button (default: "none").
         */
        button?: string;
         /**
         * Number of times the mouse button was clicked (default: 0).
         */
        clickCount?: number;
    }
    interface IInputDispatchTouchEventParams {
         /**
         * Type of the touch event.
         */
        type: string;
         /**
         * Touch points.
         */
        touchPoints: any[];
         /**
         * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0).
         */
        modifiers?: number;
         /**
         * Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time).
         */
        timestamp?: any;
    }
    interface IInputEmulateTouchFromMouseEventParams {
         /**
         * Type of the mouse event.
         */
        type: string;
         /**
         * X coordinate of the mouse pointer in DIP.
         */
        x: number;
         /**
         * Y coordinate of the mouse pointer in DIP.
         */
        y: number;
         /**
         * Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970.
         */
        timestamp: any;
         /**
         * Mouse button.
         */
        button: string;
         /**
         * X delta in DIP for mouse wheel event (default: 0).
         */
        deltaX?: any;
         /**
         * Y delta in DIP for mouse wheel event (default: 0).
         */
        deltaY?: any;
         /**
         * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0).
         */
        modifiers?: number;
         /**
         * Number of times the mouse button was clicked (default: 0).
         */
        clickCount?: number;
    }
    interface ILayerTreeCompositingReasonsParams {
         /**
         * The id of the layer for which we want to get the reasons it was composited.
         */
        layerId: any;
    }
    interface ILayerTreeMakeSnapshotParams {
         /**
         * The id of the layer.
         */
        layerId: any;
    }
    interface ILayerTreeLoadSnapshotParams {
         /**
         * An array of tiles composing the snapshot.
         */
        tiles: any[];
    }
    interface ILayerTreeReleaseSnapshotParams {
         /**
         * The id of the layer snapshot.
         */
        snapshotId: any;
    }
    interface ILayerTreeProfileSnapshotParams {
         /**
         * The id of the layer snapshot.
         */
        snapshotId: any;
         /**
         * The maximum number of times to replay the snapshot (1, if not specified).
         */
        minRepeatCount?: number;
         /**
         * The minimum duration (in seconds) to replay the snapshot.
         */
        minDuration?: any;
         /**
         * The clip rectangle to apply when replaying the snapshot.
         */
        clipRect?: any;
    }
    interface ILayerTreeReplaySnapshotParams {
         /**
         * The id of the layer snapshot.
         */
        snapshotId: any;
         /**
         * The first step to replay from (replay from the very start if not specified).
         */
        fromStep?: number;
         /**
         * The last step to replay to (replay till the end if not specified).
         */
        toStep?: number;
         /**
         * The scale to apply while replaying (defaults to 1).
         */
        scale?: any;
    }
    interface ILayerTreeSnapshotCommandLogParams {
         /**
         * The id of the layer snapshot.
         */
        snapshotId: any;
    }
    interface IDeviceOrientationSetDeviceOrientationOverrideParams {
         /**
         * Mock alpha
         */
        alpha: any;
         /**
         * Mock beta
         */
        beta: any;
         /**
         * Mock gamma
         */
        gamma: any;
    }
    interface ITracingStartParams {
         /**
         * Category/tag filter
         */
        categories?: string;
         /**
         * Tracing options
         */
        options?: string;
         /**
         * If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
         */
        bufferUsageReportingInterval?: any;
    }
    interface IAnimationGetAnimationPlayersForNodeParams {
         /**
         * Id of the node to get animation players for.
         */
        nodeId: any;
         /**
         * Include animations from elements subtree.
         */
        includeSubtreeAnimations: boolean;
    }
    interface IAnimationPauseAnimationPlayerParams {
         /**
         * Id of the animation player.
         */
        id: string;
    }
    interface IAnimationPlayAnimationPlayerParams {
         /**
         * Id of the animation player.
         */
        id: string;
    }
    interface IAnimationSetAnimationPlayerCurrentTimeParams {
         /**
         * Id of the animation player.
         */
        id: string;
         /**
         * Current time to set animation to
         */
        currentTime: any;
    }
    interface IAnimationGetAnimationPlayerStateParams {
         /**
         * Id of the animation player.
         */
        id: string;
    }
    interface IAnimationStartListeningParams {
         /**
         * Id of the node to record on.
         */
        nodeId: any;
         /**
         * Include animations from elements subtree.
         */
        includeSubtreeAnimations: boolean;
    }

}

