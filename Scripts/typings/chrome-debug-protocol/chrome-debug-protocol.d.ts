
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
        enable(cb: Function);
         /**
         * Disables inspector domain notifications.
         */
        disable(cb: Function);
         /**
         * Resets all domains.
         */
        reset(cb: Function);
    }
    interface IMemory {
        getDOMCounters(cb: Function);
    }
    interface IPage {
         /**
         * Enables page domain notifications.
         */
        enable(cb: Function);
         /**
         * Disables page domain notifications.
         */
        disable(cb: Function);
        addScriptToEvaluateOnLoad(params: IAddScriptToEvaluateOnLoadParams, cb: Function);
        removeScriptToEvaluateOnLoad(params: IRemoveScriptToEvaluateOnLoadParams, cb: Function);
         /**
         * Reloads given page optionally ignoring the cache.
         */
        reload(params: IReloadParams, cb: Function);
         /**
         * Navigates current page to the given URL.
         */
        navigate(params: INavigateParams, cb: Function);
         /**
         * Returns navigation history for the current page.
         */
        getNavigationHistory(cb: Function);
         /**
         * Navigates current page to the given history entry.
         */
        navigateToHistoryEntry(params: INavigateToHistoryEntryParams, cb: Function);
         /**
         * Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
         */
        getCookies(cb: Function);
         /**
         * Deletes browser cookie with given name, domain and path.
         */
        deleteCookie(params: IDeleteCookieParams, cb: Function);
         /**
         * Returns present frame / resource tree structure.
         */
        getResourceTree(cb: Function);
         /**
         * Returns content of the given resource.
         */
        getResourceContent(params: IGetResourceContentParams, cb: Function);
         /**
         * Searches for given string in resource content.
         */
        searchInResource(params: ISearchInResourceParams, cb: Function);
         /**
         * Sets given markup as the document's HTML.
         */
        setDocumentContent(params: ISetDocumentContentParams, cb: Function);
         /**
         * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
         */
        setDeviceMetricsOverride(params: ISetDeviceMetricsOverrideParams, cb: Function);
         /**
         * Clears the overriden device metrics.
         */
        clearDeviceMetricsOverride(cb: Function);
         /**
         * Requests that scroll offsets and page scale factor are reset to initial values.
         */
        resetScrollAndPageScaleFactor(cb: Function);
         /**
         * Sets a specified page scale factor.
         */
        setPageScaleFactor(params: ISetPageScaleFactorParams, cb: Function);
         /**
         * Requests that backend shows paint rectangles
         */
        setShowPaintRects(params: ISetShowPaintRectsParams, cb: Function);
         /**
         * Requests that backend shows debug borders on layers
         */
        setShowDebugBorders(params: ISetShowDebugBordersParams, cb: Function);
         /**
         * Requests that backend shows the FPS counter
         */
        setShowFPSCounter(params: ISetShowFPSCounterParams, cb: Function);
         /**
         * Requests that backend enables continuous painting
         */
        setContinuousPaintingEnabled(params: ISetContinuousPaintingEnabledParams, cb: Function);
         /**
         * Requests that backend shows scroll bottleneck rects
         */
        setShowScrollBottleneckRects(params: ISetShowScrollBottleneckRectsParams, cb: Function);
         /**
         * Determines if scripts can be executed in the page.
         */
        getScriptExecutionStatus(cb: Function);
         /**
         * Switches script execution in the page.
         */
        setScriptExecutionDisabled(params: ISetScriptExecutionDisabledParams, cb: Function);
         /**
         * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.
         */
        setGeolocationOverride(params: ISetGeolocationOverrideParams, cb: Function);
         /**
         * Clears the overriden Geolocation Position and Error.
         */
        clearGeolocationOverride(cb: Function);
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: ISetDeviceOrientationOverrideParams, cb: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb: Function);
         /**
         * Toggles mouse event-based touch event emulation.
         */
        setTouchEmulationEnabled(params: ISetTouchEmulationEnabledParams, cb: Function);
         /**
         * Emulates the given media for CSS media queries.
         */
        setEmulatedMedia(params: ISetEmulatedMediaParams, cb: Function);
         /**
         * Capture page screenshot.
         */
        captureScreenshot(cb: Function);
         /**
         * Tells whether screencast is supported.
         */
        canScreencast(cb: Function);
         /**
         * Tells whether emulation is supported.
         */
        canEmulate(cb: Function);
         /**
         * Starts sending each frame using the <code>screencastFrame</code> event.
         */
        startScreencast(params: IStartScreencastParams, cb: Function);
         /**
         * Stops sending each frame in the <code>screencastFrame</code>.
         */
        stopScreencast(cb: Function);
         /**
         * Acknowledges that a screencast frame has been received by the frontend.
         */
        screencastFrameAck(params: IScreencastFrameAckParams, cb: Function);
         /**
         * Starts recording each frame to the buffer.
         */
        startRecordingFrames(params: IStartRecordingFramesParams, cb: Function);
         /**
         * Stops recording, encodes and returns images.
         */
        stopRecordingFrames(cb: Function);
         /**
         * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
         */
        handleJavaScriptDialog(params: IHandleJavaScriptDialogParams, cb: Function);
         /**
         * Paints viewport size upon main frame resize.
         */
        setShowViewportSizeOnResize(params: ISetShowViewportSizeOnResizeParams, cb: Function);
         /**
         * Queries more detailed quota and usage data than Storage API provides.
         */
        queryUsageAndQuota(params: IQueryUsageAndQuotaParams, cb: Function);
         /**
         * Shows / hides color picker
         */
        setColorPickerEnabled(params: ISetColorPickerEnabledParams, cb: Function);
         /**
         * Sets overlay message.
         */
        setOverlayMessage(params: ISetOverlayMessageParams, cb: Function);
         /**
         * Gets the playback rate of the document timeline.
         */
        animationsPlaybackRate(cb: Function);
         /**
         * Sets the playback rate of the document timeline.
         */
        setAnimationsPlaybackRate(params: ISetAnimationsPlaybackRateParams, cb: Function);
    }
    interface IRuntime {
         /**
         * Evaluates expression on global object.
         */
        evaluate(params: IEvaluateParams, cb: Function);
         /**
         * Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
         */
        callFunctionOn(params: ICallFunctionOnParams, cb: Function);
         /**
         * Returns properties of a given object. Object group of the result is inherited from the target object.
         */
        getProperties(params: IGetPropertiesParams, cb: Function);
         /**
         * Releases remote object with given id.
         */
        releaseObject(params: IReleaseObjectParams, cb: Function);
         /**
         * Releases all remote objects that belong to a given group.
         */
        releaseObjectGroup(params: IReleaseObjectGroupParams, cb: Function);
         /**
         * Tells inspected instance(worker or page) that it can run in case it was started paused.
         */
        run(cb: Function);
         /**
         * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context.
         */
        enable(cb: Function);
         /**
         * Disables reporting of execution contexts creation.
         */
        disable(cb: Function);
        isRunRequired(cb: Function);
        setCustomObjectFormatterEnabled(params: ISetCustomObjectFormatterEnabledParams, cb: Function);
    }
    interface IConsole {
         /**
         * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
         */
        enable(cb: Function);
         /**
         * Disables console domain, prevents further console messages from being reported to the client.
         */
        disable(cb: Function);
         /**
         * Clears console messages collected in the browser.
         */
        clearMessages(cb: Function);
         /**
         * Toggles monitoring of XMLHttpRequest. If <code>true</code>, console will receive messages upon each XHR issued.
         */
        setMonitoringXHREnabled(params: ISetMonitoringXHREnabledParams, cb: Function);
         /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
         */
        addInspectedNode(params: IAddInspectedNodeParams, cb: Function);
        addInspectedHeapObject(params: IAddInspectedHeapObjectParams, cb: Function);
         /**
         * Sets last evaluation result in console. Can be accessed via <code>$_</code> command line API.
         */
        setLastEvaluationResult(params: ISetLastEvaluationResultParams, cb: Function);
    }
    interface INetwork {
         /**
         * Enables network tracking, network events will now be delivered to the client.
         */
        enable(cb: Function);
         /**
         * Disables network tracking, prevents network events from being sent to the client.
         */
        disable(cb: Function);
         /**
         * Allows overriding user agent with the given string.
         */
        setUserAgentOverride(params: ISetUserAgentOverrideParams, cb: Function);
         /**
         * Specifies whether to always send extra HTTP headers with the requests from this page.
         */
        setExtraHTTPHeaders(params: ISetExtraHTTPHeadersParams, cb: Function);
         /**
         * Returns content served for the given request.
         */
        getResponseBody(params: IGetResponseBodyParams, cb: Function);
         /**
         * This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
         */
        replayXHR(params: IReplayXHRParams, cb: Function);
         /**
         * Tells whether clearing browser cache is supported.
         */
        canClearBrowserCache(cb: Function);
         /**
         * Clears browser cache.
         */
        clearBrowserCache(cb: Function);
         /**
         * Tells whether clearing browser cookies is supported.
         */
        canClearBrowserCookies(cb: Function);
         /**
         * Clears browser cookies.
         */
        clearBrowserCookies(cb: Function);
         /**
         * Tells whether emulation of network conditions is supported.
         */
        canEmulateNetworkConditions(cb: Function);
         /**
         * Activates emulation of network conditions.
         */
        emulateNetworkConditions(params: IEmulateNetworkConditionsParams, cb: Function);
         /**
         * Toggles ignoring cache for each request. If <code>true</code>, cache will not be used.
         */
        setCacheDisabled(params: ISetCacheDisabledParams, cb: Function);
         /**
         * Loads a resource in the context of a frame on the inspected page without cross origin checks.
         */
        loadResourceForFrontend(params: ILoadResourceForFrontendParams, cb: Function);
    }
    interface IDatabase {
         /**
         * Enables database tracking, database events will now be delivered to the client.
         */
        enable(cb: Function);
         /**
         * Disables database tracking, prevents database events from being sent to the client.
         */
        disable(cb: Function);
        getDatabaseTableNames(params: IGetDatabaseTableNamesParams, cb: Function);
        executeSQL(params: IExecuteSQLParams, cb: Function);
    }
    interface IIndexedDB {
         /**
         * Enables events from backend.
         */
        enable(cb: Function);
         /**
         * Disables events from backend.
         */
        disable(cb: Function);
         /**
         * Requests database names for given security origin.
         */
        requestDatabaseNames(params: IRequestDatabaseNamesParams, cb: Function);
         /**
         * Requests database with given name in given frame.
         */
        requestDatabase(params: IRequestDatabaseParams, cb: Function);
         /**
         * Requests data from object store or index.
         */
        requestData(params: IRequestDataParams, cb: Function);
         /**
         * Clears all entries from an object store.
         */
        clearObjectStore(params: IClearObjectStoreParams, cb: Function);
    }
    interface IServiceWorkerCache {
         /**
         * Requests cache names.
         */
        requestCacheNames(cb: Function);
         /**
         * Requests data from cache.
         */
        requestEntries(params: IRequestEntriesParams, cb: Function);
         /**
         * Deletes a cache.
         */
        deleteCache(params: IDeleteCacheParams, cb: Function);
    }
    interface IDOMStorage {
         /**
         * Enables storage tracking, storage events will now be delivered to the client.
         */
        enable(cb: Function);
         /**
         * Disables storage tracking, prevents storage events from being sent to the client.
         */
        disable(cb: Function);
        getDOMStorageItems(params: IGetDOMStorageItemsParams, cb: Function);
        setDOMStorageItem(params: ISetDOMStorageItemParams, cb: Function);
        removeDOMStorageItem(params: IRemoveDOMStorageItemParams, cb: Function);
    }
    interface IApplicationCache {
         /**
         * Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
         */
        getFramesWithManifests(cb: Function);
         /**
         * Enables application cache domain notifications.
         */
        enable(cb: Function);
         /**
         * Returns manifest URL for document in the given frame.
         */
        getManifestForFrame(params: IGetManifestForFrameParams, cb: Function);
         /**
         * Returns relevant application cache data for the document in given frame.
         */
        getApplicationCacheForFrame(params: IGetApplicationCacheForFrameParams, cb: Function);
    }
    interface IFileSystem {
         /**
         * Enables events from backend.
         */
        enable(cb: Function);
         /**
         * Disables events from backend.
         */
        disable(cb: Function);
         /**
         * Returns root directory of the FileSystem, if exists.
         */
        requestFileSystemRoot(params: IRequestFileSystemRootParams, cb: Function);
         /**
         * Returns content of the directory.
         */
        requestDirectoryContent(params: IRequestDirectoryContentParams, cb: Function);
         /**
         * Returns metadata of the entry.
         */
        requestMetadata(params: IRequestMetadataParams, cb: Function);
         /**
         * Returns content of the file. Result should be sliced into [start, end).
         */
        requestFileContent(params: IRequestFileContentParams, cb: Function);
         /**
         * Deletes specified entry. If the entry is a directory, the agent deletes children recursively.
         */
        deleteEntry(params: IDeleteEntryParams, cb: Function);
    }
    interface IDOM {
         /**
         * Enables DOM agent for the given page.
         */
        enable(cb: Function);
         /**
         * Disables DOM agent for the given page.
         */
        disable(cb: Function);
         /**
         * Returns the root DOM node to the caller.
         */
        getDocument(cb: Function);
         /**
         * Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth.
         */
        requestChildNodes(params: IRequestChildNodesParams, cb: Function);
         /**
         * Returns distribution data for all insertion points in shadow tree of the given node.
         */
        requestShadowHostDistributedNodes(params: IRequestShadowHostDistributedNodesParams, cb: Function);
         /**
         * Executes <code>querySelector</code> on a given node.
         */
        querySelector(params: IQuerySelectorParams, cb: Function);
         /**
         * Executes <code>querySelectorAll</code> on a given node.
         */
        querySelectorAll(params: IQuerySelectorAllParams, cb: Function);
         /**
         * Sets node name for a node with given id.
         */
        setNodeName(params: ISetNodeNameParams, cb: Function);
         /**
         * Sets node value for a node with given id.
         */
        setNodeValue(params: ISetNodeValueParams, cb: Function);
         /**
         * Removes node with given id.
         */
        removeNode(params: IRemoveNodeParams, cb: Function);
         /**
         * Sets attribute for an element with given id.
         */
        setAttributeValue(params: ISetAttributeValueParams, cb: Function);
         /**
         * Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs.
         */
        setAttributesAsText(params: ISetAttributesAsTextParams, cb: Function);
         /**
         * Removes attribute with given name from an element with given id.
         */
        removeAttribute(params: IRemoveAttributeParams, cb: Function);
         /**
         * Returns event listeners relevant to the node.
         */
        getEventListenersForNode(params: IGetEventListenersForNodeParams, cb: Function);
         /**
         * Returns node's HTML markup.
         */
        getOuterHTML(params: IGetOuterHTMLParams, cb: Function);
         /**
         * Sets node HTML markup, returns new node id.
         */
        setOuterHTML(params: ISetOuterHTMLParams, cb: Function);
         /**
         * Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
         */
        performSearch(params: IPerformSearchParams, cb: Function);
         /**
         * Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
         */
        getSearchResults(params: IGetSearchResultsParams, cb: Function);
         /**
         * Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.
         */
        discardSearchResults(params: IDiscardSearchResultsParams, cb: Function);
         /**
         * Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications.
         */
        requestNode(params: IRequestNodeParams, cb: Function);
         /**
         * Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection.
         */
        setInspectModeEnabled(params: ISetInspectModeEnabledParams, cb: Function);
         /**
         * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightRect(params: IHighlightRectParams, cb: Function);
         /**
         * Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightQuad(params: IHighlightQuadParams, cb: Function);
         /**
         * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.
         */
        highlightNode(params: IHighlightNodeParams, cb: Function);
         /**
         * Hides DOM node highlight.
         */
        hideHighlight(cb: Function);
         /**
         * Highlights owner element of the frame with given id.
         */
        highlightFrame(params: IHighlightFrameParams, cb: Function);
         /**
         * Requests that the node is sent to the caller given its path. // FIXME, use XPath
         */
        pushNodeByPathToFrontend(params: IPushNodeByPathToFrontendParams, cb: Function);
         /**
         * Requests that a batch of nodes is sent to the caller given their backend node ids.
         */
        pushNodesByBackendIdsToFrontend(params: IPushNodesByBackendIdsToFrontendParams, cb: Function);
         /**
         * Resolves JavaScript node object for given node id.
         */
        resolveNode(params: IResolveNodeParams, cb: Function);
         /**
         * Returns attributes for the specified node.
         */
        getAttributes(params: IGetAttributesParams, cb: Function);
         /**
         * Creates a deep copy of the specified node and places it into the target container before the given anchor.
         */
        copyTo(params: ICopyToParams, cb: Function);
         /**
         * Moves node into the new container, places it before the given anchor.
         */
        moveTo(params: IMoveToParams, cb: Function);
         /**
         * Undoes the last performed action.
         */
        undo(cb: Function);
         /**
         * Re-does the last undone action.
         */
        redo(cb: Function);
         /**
         * Marks last undoable state.
         */
        markUndoableState(cb: Function);
         /**
         * Focuses the given element.
         */
        focus(params: IFocusParams, cb: Function);
         /**
         * Sets files for the given file input element.
         */
        setFileInputFiles(params: ISetFileInputFilesParams, cb: Function);
         /**
         * Returns boxes for the currently selected nodes.
         */
        getBoxModel(params: IGetBoxModelParams, cb: Function);
         /**
         * Returns node id at given location.
         */
        getNodeForLocation(params: IGetNodeForLocationParams, cb: Function);
         /**
         * Returns the id of the nearest ancestor that is a relayout boundary.
         */
        getRelayoutBoundary(params: IGetRelayoutBoundaryParams, cb: Function);
    }
    interface ICSS {
         /**
         * Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received.
         */
        enable(cb: Function);
         /**
         * Disables the CSS agent for the given page.
         */
        disable(cb: Function);
         /**
         * Returns requested styles for a DOM node identified by <code>nodeId</code>.
         */
        getMatchedStylesForNode(params: IGetMatchedStylesForNodeParams, cb: Function);
         /**
         * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
         */
        getInlineStylesForNode(params: IGetInlineStylesForNodeParams, cb: Function);
         /**
         * Returns the computed style for a DOM node identified by <code>nodeId</code>.
         */
        getComputedStyleForNode(params: IGetComputedStyleForNodeParams, cb: Function);
         /**
         * Requests information about platform fonts which we used to render child TextNodes in the given node.
         */
        getPlatformFontsForNode(params: IGetPlatformFontsForNodeParams, cb: Function);
         /**
         * Returns the current textual content and the URL for a stylesheet.
         */
        getStyleSheetText(params: IGetStyleSheetTextParams, cb: Function);
         /**
         * Sets the new stylesheet text.
         */
        setStyleSheetText(params: ISetStyleSheetTextParams, cb: Function);
         /**
         * Either replaces a property identified by <code>styleSheetId</code> and <code>range</code> with <code>text</code> or inserts a new property <code>text</code> at the position identified by an empty <code>range</code>.
         */
        setPropertyText(params: ISetPropertyTextParams, cb: Function);
         /**
         * Modifies the rule selector.
         */
        setRuleSelector(params: ISetRuleSelectorParams, cb: Function);
         /**
         * Modifies the rule selector.
         */
        setMediaText(params: ISetMediaTextParams, cb: Function);
         /**
         * Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>.
         */
        createStyleSheet(params: ICreateStyleSheetParams, cb: Function);
         /**
         * Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>.
         */
        addRule(params: IAddRuleParams, cb: Function);
         /**
         * Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
         */
        forcePseudoState(params: IForcePseudoStateParams, cb: Function);
         /**
         * Returns all media queries parsed by the rendering engine.
         */
        getMediaQueries(cb: Function);
    }
    interface ITimeline {
         /**
         * Enables timeline. After this call, timeline can be started from within the page (for example upon console.timeline).
         */
        enable(cb: Function);
         /**
         * Disables timeline.
         */
        disable(cb: Function);
         /**
         * Starts capturing instrumentation events.
         */
        start(params: IStartParams, cb: Function);
         /**
         * Stops capturing instrumentation events.
         */
        stop(cb: Function);
    }
    interface IDebugger {
         /**
         * Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
         */
        enable(cb: Function);
         /**
         * Disables debugger for given page.
         */
        disable(cb: Function);
         /**
         * Activates / deactivates all breakpoints on the page.
         */
        setBreakpointsActive(params: ISetBreakpointsActiveParams, cb: Function);
         /**
         * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
         */
        setSkipAllPauses(params: ISetSkipAllPausesParams, cb: Function);
         /**
         * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
         */
        setBreakpointByUrl(params: ISetBreakpointByUrlParams, cb: Function);
         /**
         * Sets JavaScript breakpoint at a given location.
         */
        setBreakpoint(params: ISetBreakpointParams, cb: Function);
         /**
         * Removes JavaScript breakpoint.
         */
        removeBreakpoint(params: IRemoveBreakpointParams, cb: Function);
         /**
         * Continues execution until specific location is reached.
         */
        continueToLocation(params: IContinueToLocationParams, cb: Function);
         /**
         * Steps over the statement.
         */
        stepOver(cb: Function);
         /**
         * Steps into the function call.
         */
        stepInto(cb: Function);
         /**
         * Steps out of the function call.
         */
        stepOut(cb: Function);
         /**
         * Stops on the next JavaScript statement.
         */
        pause(cb: Function);
         /**
         * Resumes JavaScript execution.
         */
        resume(cb: Function);
         /**
         * Steps into the first async operation handler that was scheduled by or after the current statement.
         */
        stepIntoAsync(cb: Function);
         /**
         * Searches for given string in script content.
         */
        searchInContent(params: ISearchInContentParams, cb: Function);
         /**
         * Always returns true.
         */
        canSetScriptSource(cb: Function);
         /**
         * Edits JavaScript source live.
         */
        setScriptSource(params: ISetScriptSourceParams, cb: Function);
         /**
         * Restarts particular call frame from the beginning.
         */
        restartFrame(params: IRestartFrameParams, cb: Function);
         /**
         * Returns source for the script with given id.
         */
        getScriptSource(params: IGetScriptSourceParams, cb: Function);
         /**
         * Returns detailed information on given function.
         */
        getFunctionDetails(params: IGetFunctionDetailsParams, cb: Function);
         /**
         * Returns detailed information on given generator object.
         */
        getGeneratorObjectDetails(params: IGetGeneratorObjectDetailsParams, cb: Function);
         /**
         * Returns entries of given collection.
         */
        getCollectionEntries(params: IGetCollectionEntriesParams, cb: Function);
         /**
         * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
         */
        setPauseOnExceptions(params: ISetPauseOnExceptionsParams, cb: Function);
         /**
         * Evaluates expression on a given call frame.
         */
        evaluateOnCallFrame(params: IEvaluateOnCallFrameParams, cb: Function);
         /**
         * Compiles expression.
         */
        compileScript(params: ICompileScriptParams, cb: Function);
         /**
         * Runs script with given id in a given context.
         */
        runScript(params: IRunScriptParams, cb: Function);
         /**
         * Changes value of variable in a callframe or a closure. Either callframe or function must be specified. Object-based scopes are not supported and must be mutated manually.
         */
        setVariableValue(params: ISetVariableValueParams, cb: Function);
         /**
         * Lists all positions where step-in is possible for a current statement in a specified call frame
         */
        getStepInPositions(params: IGetStepInPositionsParams, cb: Function);
         /**
         * Returns call stack including variables changed since VM was paused. VM must be paused.
         */
        getBacktrace(cb: Function);
         /**
         * Makes backend skip steps in the sources with names matching given pattern. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         */
        skipStackFrames(params: ISkipStackFramesParams, cb: Function);
         /**
         * Enables or disables async call stacks tracking.
         */
        setAsyncCallStackDepth(params: ISetAsyncCallStackDepthParams, cb: Function);
         /**
         * Enables promise tracking, information about <code>Promise</code>s created or updated will now be stored on the backend.
         */
        enablePromiseTracker(params: IEnablePromiseTrackerParams, cb: Function);
         /**
         * Disables promise tracking.
         */
        disablePromiseTracker(cb: Function);
         /**
         * Returns detailed information about all <code>Promise</code>s that were created or updated after the <code>enablePromiseTracker</code> command, and have not been garbage collected yet.
         */
        getPromises(cb: Function);
         /**
         * Returns <code>Promise</code> with specified ID.
         */
        getPromiseById(params: IGetPromiseByIdParams, cb: Function);
    }
    interface IDOMDebugger {
         /**
         * Sets breakpoint on particular operation with DOM.
         */
        setDOMBreakpoint(params: ISetDOMBreakpointParams, cb: Function);
         /**
         * Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
         */
        removeDOMBreakpoint(params: IRemoveDOMBreakpointParams, cb: Function);
         /**
         * Sets breakpoint on particular DOM event.
         */
        setEventListenerBreakpoint(params: ISetEventListenerBreakpointParams, cb: Function);
         /**
         * Removes breakpoint on particular DOM event.
         */
        removeEventListenerBreakpoint(params: IRemoveEventListenerBreakpointParams, cb: Function);
         /**
         * Sets breakpoint on particular native event.
         */
        setInstrumentationBreakpoint(params: ISetInstrumentationBreakpointParams, cb: Function);
         /**
         * Removes breakpoint on particular native event.
         */
        removeInstrumentationBreakpoint(params: IRemoveInstrumentationBreakpointParams, cb: Function);
         /**
         * Sets breakpoint on XMLHttpRequest.
         */
        setXHRBreakpoint(params: ISetXHRBreakpointParams, cb: Function);
         /**
         * Removes breakpoint from XMLHttpRequest.
         */
        removeXHRBreakpoint(params: IRemoveXHRBreakpointParams, cb: Function);
    }
    interface IProfiler {
        enable(cb: Function);
        disable(cb: Function);
         /**
         * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
         */
        setSamplingInterval(params: ISetSamplingIntervalParams, cb: Function);
        start(cb: Function);
        stop(cb: Function);
    }
    interface IHeapProfiler {
        enable(cb: Function);
        disable(cb: Function);
        startTrackingHeapObjects(params: IStartTrackingHeapObjectsParams, cb: Function);
        stopTrackingHeapObjects(params: IStopTrackingHeapObjectsParams, cb: Function);
        takeHeapSnapshot(params: ITakeHeapSnapshotParams, cb: Function);
        collectGarbage(cb: Function);
        getObjectByHeapObjectId(params: IGetObjectByHeapObjectIdParams, cb: Function);
        getHeapObjectId(params: IGetHeapObjectIdParams, cb: Function);
    }
    interface IWorker {
        enable(cb: Function);
        disable(cb: Function);
        sendMessageToWorker(params: ISendMessageToWorkerParams, cb: Function);
         /**
         * Tells whether browser supports workers inspection.
         */
        canInspectWorkers(cb: Function);
        connectToWorker(params: IConnectToWorkerParams, cb: Function);
        disconnectFromWorker(params: IDisconnectFromWorkerParams, cb: Function);
        setAutoconnectToWorkers(params: ISetAutoconnectToWorkersParams, cb: Function);
    }
    interface ICanvas {
         /**
         * Enables Canvas inspection.
         */
        enable(cb: Function);
         /**
         * Disables Canvas inspection.
         */
        disable(cb: Function);
        dropTraceLog(params: IDropTraceLogParams, cb: Function);
         /**
         * Checks if there is any uninstrumented canvas in the inspected page.
         */
        hasUninstrumentedCanvases(cb: Function);
         /**
         * Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared.
         */
        captureFrame(params: ICaptureFrameParams, cb: Function);
         /**
         * Starts (or continues) consecutive canvas frames capturing. The capturing is stopped by the corresponding stopCapturing command.
         */
        startCapturing(params: IStartCapturingParams, cb: Function);
        stopCapturing(params: IStopCapturingParams, cb: Function);
        getTraceLog(params: IGetTraceLogParams, cb: Function);
        replayTraceLog(params: IReplayTraceLogParams, cb: Function);
        getResourceState(params: IGetResourceStateParams, cb: Function);
         /**
         * Evaluates a given trace call argument or its result.
         */
        evaluateTraceLogCallArgument(params: IEvaluateTraceLogCallArgumentParams, cb: Function);
    }
    interface IInput {
         /**
         * Dispatches a key event to the page.
         */
        dispatchKeyEvent(params: IDispatchKeyEventParams, cb: Function);
         /**
         * Dispatches a mouse event to the page.
         */
        dispatchMouseEvent(params: IDispatchMouseEventParams, cb: Function);
         /**
         * Dispatches a touch event to the page.
         */
        dispatchTouchEvent(params: IDispatchTouchEventParams, cb: Function);
         /**
         * Emulates touch event from the mouse event parameters.
         */
        emulateTouchFromMouseEvent(params: IEmulateTouchFromMouseEventParams, cb: Function);
    }
    interface ILayerTree {
         /**
         * Enables compositing tree inspection.
         */
        enable(cb: Function);
         /**
         * Disables compositing tree inspection.
         */
        disable(cb: Function);
         /**
         * Provides the reasons why the given layer was composited.
         */
        compositingReasons(params: ICompositingReasonsParams, cb: Function);
         /**
         * Returns the layer snapshot identifier.
         */
        makeSnapshot(params: IMakeSnapshotParams, cb: Function);
         /**
         * Returns the snapshot identifier.
         */
        loadSnapshot(params: ILoadSnapshotParams, cb: Function);
         /**
         * Releases layer snapshot captured by the back-end.
         */
        releaseSnapshot(params: IReleaseSnapshotParams, cb: Function);
        profileSnapshot(params: IProfileSnapshotParams, cb: Function);
         /**
         * Replays the layer snapshot and returns the resulting bitmap.
         */
        replaySnapshot(params: IReplaySnapshotParams, cb: Function);
         /**
         * Replays the layer snapshot and returns canvas log.
         */
        snapshotCommandLog(params: ISnapshotCommandLogParams, cb: Function);
    }
    interface IDeviceOrientation {
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: ISetDeviceOrientationOverrideParams, cb: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb: Function);
    }
    interface ITracing {
         /**
         * Start trace events collection.
         */
        start(params: IStartParams, cb: Function);
         /**
         * Stop trace events collection.
         */
        end(cb: Function);
         /**
         * Gets supported tracing categories.
         */
        getCategories(cb: Function);
    }
    interface IPower {
         /**
         * Start power events collection.
         */
        start(cb: Function);
         /**
         * Stop power events collection.
         */
        end(cb: Function);
         /**
         * Tells whether power profiling is supported.
         */
        canProfilePower(cb: Function);
         /**
         * Describes the accuracy level of the data provider.
         */
        getAccuracyLevel(cb: Function);
    }
    interface IAnimation {
         /**
         * Enables animation domain notifications.
         */
        enable(cb: Function);
         /**
         * Returns animation players relevant to the node.
         */
        getAnimationPlayersForNode(params: IGetAnimationPlayersForNodeParams, cb: Function);
         /**
         * Pauses animations relevant to the node.
         */
        pauseAnimationPlayer(params: IPauseAnimationPlayerParams, cb: Function);
         /**
         * Plays animations relevant to the node.
         */
        playAnimationPlayer(params: IPlayAnimationPlayerParams, cb: Function);
         /**
         * Sets the current time on given AnimationPlayer.
         */
        setAnimationPlayerCurrentTime(params: ISetAnimationPlayerCurrentTimeParams, cb: Function);
         /**
         * Gets the state of an AnimationPlayer.
         */
        getAnimationPlayerState(params: IGetAnimationPlayerStateParams, cb: Function);
         /**
         * Sets the parameters of recording for new animations events.
         */
        startListening(params: IStartListeningParams, cb: Function);
         /**
         * Stops recording for new animation player events.
         */
        stopListening(cb: Function);
    }
    interface IAddScriptToEvaluateOnLoadParams {
        scriptSource;
    }
    interface IRemoveScriptToEvaluateOnLoadParams {
        identifier;
    }
    interface IReloadParams {
        ignoreCache;
        scriptToEvaluateOnLoad;
        scriptPreprocessor;
    }
    interface INavigateParams {
        url;
    }
    interface INavigateToHistoryEntryParams {
        entryId;
    }
    interface IDeleteCookieParams {
        cookieName;
        url;
    }
    interface IGetResourceContentParams {
        frameId;
        url;
    }
    interface ISearchInResourceParams {
        frameId;
        url;
        query;
        caseSensitive;
        isRegex;
    }
    interface ISetDocumentContentParams {
        frameId;
        html;
    }
    interface ISetDeviceMetricsOverrideParams {
        width;
        height;
        deviceScaleFactor;
        mobile;
        fitWindow;
        scale;
        offsetX;
        offsetY;
    }
    interface ISetPageScaleFactorParams {
        pageScaleFactor;
    }
    interface ISetShowPaintRectsParams {
        result;
    }
    interface ISetShowDebugBordersParams {
        show;
    }
    interface ISetShowFPSCounterParams {
        show;
    }
    interface ISetContinuousPaintingEnabledParams {
        enabled;
    }
    interface ISetShowScrollBottleneckRectsParams {
        show;
    }
    interface ISetScriptExecutionDisabledParams {
        value;
    }
    interface ISetGeolocationOverrideParams {
        latitude;
        longitude;
        accuracy;
    }
    interface ISetDeviceOrientationOverrideParams {
        alpha;
        beta;
        gamma;
    }
    interface ISetTouchEmulationEnabledParams {
        enabled;
        configuration;
    }
    interface ISetEmulatedMediaParams {
        media;
    }
    interface IStartScreencastParams {
        format;
        quality;
        maxWidth;
        maxHeight;
    }
    interface IScreencastFrameAckParams {
        frameNumber;
    }
    interface IStartRecordingFramesParams {
        maxFrameCount;
    }
    interface IHandleJavaScriptDialogParams {
        accept;
        promptText;
    }
    interface ISetShowViewportSizeOnResizeParams {
        show;
        showGrid;
    }
    interface IQueryUsageAndQuotaParams {
        securityOrigin;
    }
    interface ISetColorPickerEnabledParams {
        enabled;
    }
    interface ISetOverlayMessageParams {
        message;
    }
    interface ISetAnimationsPlaybackRateParams {
        playbackRate;
    }
    interface IEvaluateParams {
        expression;
        objectGroup;
        includeCommandLineAPI;
        doNotPauseOnExceptionsAndMuteConsole;
        contextId;
        returnByValue;
        generatePreview;
    }
    interface ICallFunctionOnParams {
        objectId;
        functionDeclaration;
        arguments;
        doNotPauseOnExceptionsAndMuteConsole;
        returnByValue;
        generatePreview;
    }
    interface IGetPropertiesParams {
        objectId;
        ownProperties;
        accessorPropertiesOnly;
    }
    interface IReleaseObjectParams {
        objectId;
    }
    interface IReleaseObjectGroupParams {
        objectGroup;
    }
    interface ISetCustomObjectFormatterEnabledParams {
        enabled;
    }
    interface ISetMonitoringXHREnabledParams {
        enabled;
    }
    interface IAddInspectedNodeParams {
        nodeId;
    }
    interface IAddInspectedHeapObjectParams {
        heapObjectId;
    }
    interface ISetLastEvaluationResultParams {
        objectId;
    }
    interface ISetUserAgentOverrideParams {
        userAgent;
    }
    interface ISetExtraHTTPHeadersParams {
        headers;
    }
    interface IGetResponseBodyParams {
        requestId;
    }
    interface IReplayXHRParams {
        requestId;
    }
    interface IEmulateNetworkConditionsParams {
        offline;
        latency;
        downloadThroughput;
        uploadThroughput;
    }
    interface ISetCacheDisabledParams {
        cacheDisabled;
    }
    interface ILoadResourceForFrontendParams {
        frameId;
        url;
        requestHeaders;
    }
    interface IGetDatabaseTableNamesParams {
        databaseId;
    }
    interface IExecuteSQLParams {
        databaseId;
        query;
    }
    interface IRequestDatabaseNamesParams {
        securityOrigin;
    }
    interface IRequestDatabaseParams {
        securityOrigin;
        databaseName;
    }
    interface IRequestDataParams {
        securityOrigin;
        databaseName;
        objectStoreName;
        indexName;
        skipCount;
        pageSize;
        keyRange;
    }
    interface IClearObjectStoreParams {
        securityOrigin;
        databaseName;
        objectStoreName;
    }
    interface IRequestEntriesParams {
        cacheName;
        skipCount;
        pageSize;
    }
    interface IDeleteCacheParams {
        cacheName;
    }
    interface IGetDOMStorageItemsParams {
        storageId;
    }
    interface ISetDOMStorageItemParams {
        storageId;
        key;
        value;
    }
    interface IRemoveDOMStorageItemParams {
        storageId;
        key;
    }
    interface IGetManifestForFrameParams {
        frameId;
    }
    interface IGetApplicationCacheForFrameParams {
        frameId;
    }
    interface IRequestFileSystemRootParams {
        origin;
        type;
    }
    interface IRequestDirectoryContentParams {
        url;
    }
    interface IRequestMetadataParams {
        url;
    }
    interface IRequestFileContentParams {
        url;
        readAsText;
        start;
        end;
        charset;
    }
    interface IDeleteEntryParams {
        url;
    }
    interface IRequestChildNodesParams {
        nodeId;
        depth;
    }
    interface IRequestShadowHostDistributedNodesParams {
        nodeId;
    }
    interface IQuerySelectorParams {
        nodeId;
        selector;
    }
    interface IQuerySelectorAllParams {
        nodeId;
        selector;
    }
    interface ISetNodeNameParams {
        nodeId;
        name;
    }
    interface ISetNodeValueParams {
        nodeId;
        value;
    }
    interface IRemoveNodeParams {
        nodeId;
    }
    interface ISetAttributeValueParams {
        nodeId;
        name;
        value;
    }
    interface ISetAttributesAsTextParams {
        nodeId;
        text;
        name;
    }
    interface IRemoveAttributeParams {
        nodeId;
        name;
    }
    interface IGetEventListenersForNodeParams {
        nodeId;
        objectGroup;
    }
    interface IGetOuterHTMLParams {
        nodeId;
    }
    interface ISetOuterHTMLParams {
        nodeId;
        outerHTML;
    }
    interface IPerformSearchParams {
        query;
        includeUserAgentShadowDOM;
    }
    interface IGetSearchResultsParams {
        searchId;
        fromIndex;
        toIndex;
    }
    interface IDiscardSearchResultsParams {
        searchId;
    }
    interface IRequestNodeParams {
        objectId;
    }
    interface ISetInspectModeEnabledParams {
        enabled;
        inspectUAShadowDOM;
        highlightConfig;
    }
    interface IHighlightRectParams {
        x;
        y;
        width;
        height;
        color;
        outlineColor;
    }
    interface IHighlightQuadParams {
        quad;
        color;
        outlineColor;
    }
    interface IHighlightNodeParams {
        highlightConfig;
        nodeId;
        objectId;
    }
    interface IHighlightFrameParams {
        frameId;
        contentColor;
        contentOutlineColor;
    }
    interface IPushNodeByPathToFrontendParams {
        path;
    }
    interface IPushNodesByBackendIdsToFrontendParams {
        backendNodeIds;
    }
    interface IResolveNodeParams {
        nodeId;
        objectGroup;
    }
    interface IGetAttributesParams {
        nodeId;
    }
    interface ICopyToParams {
        nodeId;
        targetNodeId;
        insertBeforeNodeId;
    }
    interface IMoveToParams {
        nodeId;
        targetNodeId;
        insertBeforeNodeId;
    }
    interface IFocusParams {
        nodeId;
    }
    interface ISetFileInputFilesParams {
        nodeId;
        files;
    }
    interface IGetBoxModelParams {
        nodeId;
    }
    interface IGetNodeForLocationParams {
        x;
        y;
    }
    interface IGetRelayoutBoundaryParams {
        nodeId;
    }
    interface IGetMatchedStylesForNodeParams {
        nodeId;
        excludePseudo;
        excludeInherited;
    }
    interface IGetInlineStylesForNodeParams {
        nodeId;
    }
    interface IGetComputedStyleForNodeParams {
        nodeId;
    }
    interface IGetPlatformFontsForNodeParams {
        nodeId;
    }
    interface IGetStyleSheetTextParams {
        styleSheetId;
    }
    interface ISetStyleSheetTextParams {
        styleSheetId;
        text;
    }
    interface ISetPropertyTextParams {
        styleSheetId;
        range;
        text;
    }
    interface ISetRuleSelectorParams {
        styleSheetId;
        range;
        selector;
    }
    interface ISetMediaTextParams {
        styleSheetId;
        range;
        text;
    }
    interface ICreateStyleSheetParams {
        frameId;
    }
    interface IAddRuleParams {
        styleSheetId;
        ruleText;
        location;
    }
    interface IForcePseudoStateParams {
        nodeId;
        forcedPseudoClasses;
    }
    interface IStartParams {
        maxCallStackDepth;
        bufferEvents;
        liveEvents;
        includeCounters;
        includeGPUEvents;
    }
    interface ISetBreakpointsActiveParams {
        active;
    }
    interface ISetSkipAllPausesParams {
        skipped;
        untilReload;
    }
    interface ISetBreakpointByUrlParams {
        lineNumber;
        url;
        urlRegex;
        columnNumber;
        condition;
    }
    interface ISetBreakpointParams {
        location;
        condition;
    }
    interface IRemoveBreakpointParams {
        breakpointId;
    }
    interface IContinueToLocationParams {
        location;
        interstatementLocation;
    }
    interface ISearchInContentParams {
        scriptId;
        query;
        caseSensitive;
        isRegex;
    }
    interface ISetScriptSourceParams {
        scriptId;
        scriptSource;
        preview;
    }
    interface IRestartFrameParams {
        callFrameId;
    }
    interface IGetScriptSourceParams {
        scriptId;
    }
    interface IGetFunctionDetailsParams {
        functionId;
    }
    interface IGetGeneratorObjectDetailsParams {
        objectId;
    }
    interface IGetCollectionEntriesParams {
        objectId;
    }
    interface ISetPauseOnExceptionsParams {
        state;
    }
    interface IEvaluateOnCallFrameParams {
        callFrameId;
        expression;
        objectGroup;
        includeCommandLineAPI;
        doNotPauseOnExceptionsAndMuteConsole;
        returnByValue;
        generatePreview;
    }
    interface ICompileScriptParams {
        expression;
        sourceURL;
        executionContextId;
    }
    interface IRunScriptParams {
        scriptId;
        executionContextId;
        objectGroup;
        doNotPauseOnExceptionsAndMuteConsole;
    }
    interface ISetVariableValueParams {
        scopeNumber;
        variableName;
        newValue;
        callFrameId;
        functionObjectId;
    }
    interface IGetStepInPositionsParams {
        callFrameId;
    }
    interface ISkipStackFramesParams {
        script;
        skipContentScripts;
    }
    interface ISetAsyncCallStackDepthParams {
        maxDepth;
    }
    interface IEnablePromiseTrackerParams {
        captureStacks;
    }
    interface IGetPromiseByIdParams {
        promiseId;
        objectGroup;
    }
    interface ISetDOMBreakpointParams {
        nodeId;
        type;
    }
    interface IRemoveDOMBreakpointParams {
        nodeId;
        type;
    }
    interface ISetEventListenerBreakpointParams {
        eventName;
        targetName;
    }
    interface IRemoveEventListenerBreakpointParams {
        eventName;
        targetName;
    }
    interface ISetInstrumentationBreakpointParams {
        eventName;
    }
    interface IRemoveInstrumentationBreakpointParams {
        eventName;
    }
    interface ISetXHRBreakpointParams {
        url;
    }
    interface IRemoveXHRBreakpointParams {
        url;
    }
    interface ISetSamplingIntervalParams {
        interval;
    }
    interface IStartTrackingHeapObjectsParams {
        trackAllocations;
    }
    interface IStopTrackingHeapObjectsParams {
        reportProgress;
    }
    interface ITakeHeapSnapshotParams {
        reportProgress;
    }
    interface IGetObjectByHeapObjectIdParams {
        objectId;
        objectGroup;
    }
    interface IGetHeapObjectIdParams {
        objectId;
    }
    interface ISendMessageToWorkerParams {
        workerId;
        message;
    }
    interface IConnectToWorkerParams {
        workerId;
    }
    interface IDisconnectFromWorkerParams {
        workerId;
    }
    interface ISetAutoconnectToWorkersParams {
        value;
    }
    interface IDropTraceLogParams {
        traceLogId;
    }
    interface ICaptureFrameParams {
        frameId;
    }
    interface IStartCapturingParams {
        frameId;
    }
    interface IStopCapturingParams {
        traceLogId;
    }
    interface IGetTraceLogParams {
        traceLogId;
        startOffset;
        maxLength;
    }
    interface IReplayTraceLogParams {
        traceLogId;
        stepNo;
    }
    interface IGetResourceStateParams {
        traceLogId;
        resourceId;
    }
    interface IEvaluateTraceLogCallArgumentParams {
        traceLogId;
        callIndex;
        argumentIndex;
        objectGroup;
    }
    interface IDispatchKeyEventParams {
        type;
        modifiers;
        timestamp;
        text;
        unmodifiedText;
        keyIdentifier;
        windowsVirtualKeyCode;
        nativeVirtualKeyCode;
        autoRepeat;
        isKeypad;
        isSystemKey;
    }
    interface IDispatchMouseEventParams {
        type;
        x;
        y;
        modifiers;
        timestamp;
        button;
        clickCount;
    }
    interface IDispatchTouchEventParams {
        type;
        touchPoints;
        modifiers;
        timestamp;
    }
    interface IEmulateTouchFromMouseEventParams {
        type;
        x;
        y;
        timestamp;
        button;
        deltaX;
        deltaY;
        modifiers;
        clickCount;
    }
    interface ICompositingReasonsParams {
        layerId;
    }
    interface IMakeSnapshotParams {
        layerId;
    }
    interface ILoadSnapshotParams {
        tiles;
    }
    interface IReleaseSnapshotParams {
        snapshotId;
    }
    interface IProfileSnapshotParams {
        snapshotId;
        minRepeatCount;
        minDuration;
        clipRect;
    }
    interface IReplaySnapshotParams {
        snapshotId;
        fromStep;
        toStep;
        scale;
    }
    interface ISnapshotCommandLogParams {
        snapshotId;
    }
    interface ISetDeviceOrientationOverrideParams {
        alpha;
        beta;
        gamma;
    }
    interface IStartParams {
        categories;
        options;
        bufferUsageReportingInterval;
    }
    interface IGetAnimationPlayersForNodeParams {
        nodeId;
        includeSubtreeAnimations;
    }
    interface IPauseAnimationPlayerParams {
        id;
    }
    interface IPlayAnimationPlayerParams {
        id;
    }
    interface ISetAnimationPlayerCurrentTimeParams {
        id;
        currentTime;
    }
    interface IGetAnimationPlayerStateParams {
        id;
    }
    interface IStartListeningParams {
        nodeId;
        includeSubtreeAnimations;
    }

}

