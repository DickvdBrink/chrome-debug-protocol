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
         /**
         * Actions and events related to the inspected page belong to the page domain.
         */
        Page: IPage;
         /**
         * Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.
         */
        Runtime: IRuntime;
         /**
         * Console domain defines methods and events for interaction with the JavaScript console. Console collects messages created by means of the <a href='http://getfirebug.com/wiki/index.php/Console_API'>JavaScript Console API</a>. One needs to enable this domain using <code>enable</code> command in order to start receiving the console messages. Browser collects messages issued while console domain is not enabled as well and reports them using <code>messageAdded</code> notification upon enabling.
         */
        Console: IConsole;
         /**
         * Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.
         */
        Network: INetwork;
        Database: IDatabase;
        IndexedDB: IIndexedDB;
        ServiceWorkerCache: IServiceWorkerCache;
         /**
         * Query and modify DOM storage.
         */
        DOMStorage: IDOMStorage;
        ApplicationCache: IApplicationCache;
        FileSystem: IFileSystem;
         /**
         * This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>
         */
        DOM: IDOM;
         /**
         * This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also discover all the existing stylesheets with the <code>getAllStyleSheets()</code> method (or keeping track of the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events) and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.
         */
        CSS: ICSS;
         /**
         * Timeline provides its clients with instrumentation records that are generated during the page runtime. Timeline instrumentation can be started and stopped using corresponding commands. While timeline is started, it is generating timeline event records.
         */
        Timeline: ITimeline;
         /**
         * Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.
         */
        Debugger: IDebugger;
         /**
         * DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.
         */
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
        addScriptToEvaluateOnLoad(params: Page.IAddScriptToEvaluateOnLoadParams, cb?: Function);
        removeScriptToEvaluateOnLoad(params: Page.IRemoveScriptToEvaluateOnLoadParams, cb?: Function);
         /**
         * Reloads given page optionally ignoring the cache.
         */
        reload(params?: Page.IReloadParams, cb?: Function);
         /**
         * Navigates current page to the given URL.
         */
        navigate(params: Page.INavigateParams, cb?: Function);
         /**
         * Returns navigation history for the current page.
         */
        getNavigationHistory(cb?: Function);
         /**
         * Navigates current page to the given history entry.
         */
        navigateToHistoryEntry(params: Page.INavigateToHistoryEntryParams, cb?: Function);
         /**
         * Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
         */
        getCookies(cb?: Function);
         /**
         * Deletes browser cookie with given name, domain and path.
         */
        deleteCookie(params: Page.IDeleteCookieParams, cb?: Function);
         /**
         * Returns present frame / resource tree structure.
         */
        getResourceTree(cb?: Function);
         /**
         * Returns content of the given resource.
         */
        getResourceContent(params: Page.IGetResourceContentParams, cb?: Function);
         /**
         * Searches for given string in resource content.
         */
        searchInResource(params?: Page.ISearchInResourceParams, cb?: Function);
         /**
         * Sets given markup as the document's HTML.
         */
        setDocumentContent(params: Page.ISetDocumentContentParams, cb?: Function);
         /**
         * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
         */
        setDeviceMetricsOverride(params?: Page.ISetDeviceMetricsOverrideParams, cb?: Function);
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
        setPageScaleFactor(params: Page.ISetPageScaleFactorParams, cb?: Function);
         /**
         * Requests that backend shows paint rectangles
         */
        setShowPaintRects(params: Page.ISetShowPaintRectsParams, cb?: Function);
         /**
         * Requests that backend shows debug borders on layers
         */
        setShowDebugBorders(params: Page.ISetShowDebugBordersParams, cb?: Function);
         /**
         * Requests that backend shows the FPS counter
         */
        setShowFPSCounter(params: Page.ISetShowFPSCounterParams, cb?: Function);
         /**
         * Requests that backend enables continuous painting
         */
        setContinuousPaintingEnabled(params: Page.ISetContinuousPaintingEnabledParams, cb?: Function);
         /**
         * Requests that backend shows scroll bottleneck rects
         */
        setShowScrollBottleneckRects(params: Page.ISetShowScrollBottleneckRectsParams, cb?: Function);
         /**
         * Determines if scripts can be executed in the page.
         */
        getScriptExecutionStatus(cb?: Function);
         /**
         * Switches script execution in the page.
         */
        setScriptExecutionDisabled(params: Page.ISetScriptExecutionDisabledParams, cb?: Function);
         /**
         * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.
         */
        setGeolocationOverride(params?: Page.ISetGeolocationOverrideParams, cb?: Function);
         /**
         * Clears the overriden Geolocation Position and Error.
         */
        clearGeolocationOverride(cb?: Function);
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: Page.ISetDeviceOrientationOverrideParams, cb?: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb?: Function);
         /**
         * Toggles mouse event-based touch event emulation.
         */
        setTouchEmulationEnabled(params?: Page.ISetTouchEmulationEnabledParams, cb?: Function);
         /**
         * Emulates the given media for CSS media queries.
         */
        setEmulatedMedia(params: Page.ISetEmulatedMediaParams, cb?: Function);
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
        startScreencast(params?: Page.IStartScreencastParams, cb?: Function);
         /**
         * Stops sending each frame in the <code>screencastFrame</code>.
         */
        stopScreencast(cb?: Function);
         /**
         * Acknowledges that a screencast frame has been received by the frontend.
         */
        screencastFrameAck(params: Page.IScreencastFrameAckParams, cb?: Function);
         /**
         * Starts recording each frame to the buffer.
         */
        startRecordingFrames(params: Page.IStartRecordingFramesParams, cb?: Function);
         /**
         * Stops recording, encodes and returns images.
         */
        stopRecordingFrames(cb?: Function);
         /**
         * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
         */
        handleJavaScriptDialog(params?: Page.IHandleJavaScriptDialogParams, cb?: Function);
         /**
         * Paints viewport size upon main frame resize.
         */
        setShowViewportSizeOnResize(params?: Page.ISetShowViewportSizeOnResizeParams, cb?: Function);
         /**
         * Queries more detailed quota and usage data than Storage API provides.
         */
        queryUsageAndQuota(params: Page.IQueryUsageAndQuotaParams, cb?: Function);
         /**
         * Shows / hides color picker
         */
        setColorPickerEnabled(params: Page.ISetColorPickerEnabledParams, cb?: Function);
         /**
         * Sets overlay message.
         */
        setOverlayMessage(params?: Page.ISetOverlayMessageParams, cb?: Function);
         /**
         * Gets the playback rate of the document timeline.
         */
        animationsPlaybackRate(cb?: Function);
         /**
         * Sets the playback rate of the document timeline.
         */
        setAnimationsPlaybackRate(params: Page.ISetAnimationsPlaybackRateParams, cb?: Function);
    }
    interface IRuntime {
         /**
         * Evaluates expression on global object.
         */
        evaluate(params?: Runtime.IEvaluateParams, cb?: Function);
         /**
         * Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
         */
        callFunctionOn(params?: Runtime.ICallFunctionOnParams, cb?: Function);
         /**
         * Returns properties of a given object. Object group of the result is inherited from the target object.
         */
        getProperties(params?: Runtime.IGetPropertiesParams, cb?: Function);
         /**
         * Releases remote object with given id.
         */
        releaseObject(params: Runtime.IReleaseObjectParams, cb?: Function);
         /**
         * Releases all remote objects that belong to a given group.
         */
        releaseObjectGroup(params: Runtime.IReleaseObjectGroupParams, cb?: Function);
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
        setCustomObjectFormatterEnabled(params: Runtime.ISetCustomObjectFormatterEnabledParams, cb?: Function);
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
        setMonitoringXHREnabled(params: Console.ISetMonitoringXHREnabledParams, cb?: Function);
         /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
         */
        addInspectedNode(params: Console.IAddInspectedNodeParams, cb?: Function);
        addInspectedHeapObject(params: Console.IAddInspectedHeapObjectParams, cb?: Function);
         /**
         * Sets last evaluation result in console. Can be accessed via <code>$_</code> command line API.
         */
        setLastEvaluationResult(params: Console.ISetLastEvaluationResultParams, cb?: Function);
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
        setUserAgentOverride(params: Network.ISetUserAgentOverrideParams, cb?: Function);
         /**
         * Specifies whether to always send extra HTTP headers with the requests from this page.
         */
        setExtraHTTPHeaders(params: Network.ISetExtraHTTPHeadersParams, cb?: Function);
         /**
         * Returns content served for the given request.
         */
        getResponseBody(params: Network.IGetResponseBodyParams, cb?: Function);
         /**
         * This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
         */
        replayXHR(params: Network.IReplayXHRParams, cb?: Function);
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
        emulateNetworkConditions(params: Network.IEmulateNetworkConditionsParams, cb?: Function);
         /**
         * Toggles ignoring cache for each request. If <code>true</code>, cache will not be used.
         */
        setCacheDisabled(params: Network.ISetCacheDisabledParams, cb?: Function);
         /**
         * Loads a resource in the context of a frame on the inspected page without cross origin checks.
         */
        loadResourceForFrontend(params?: Network.ILoadResourceForFrontendParams, cb?: Function);
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
        getDatabaseTableNames(params: Database.IGetDatabaseTableNamesParams, cb?: Function);
        executeSQL(params: Database.IExecuteSQLParams, cb?: Function);
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
        requestDatabaseNames(params: IndexedDB.IRequestDatabaseNamesParams, cb?: Function);
         /**
         * Requests database with given name in given frame.
         */
        requestDatabase(params: IndexedDB.IRequestDatabaseParams, cb?: Function);
         /**
         * Requests data from object store or index.
         */
        requestData(params?: IndexedDB.IRequestDataParams, cb?: Function);
         /**
         * Clears all entries from an object store.
         */
        clearObjectStore(params: IndexedDB.IClearObjectStoreParams, cb?: Function);
    }
    interface IServiceWorkerCache {
         /**
         * Requests cache names.
         */
        requestCacheNames(cb?: Function);
         /**
         * Requests data from cache.
         */
        requestEntries(params: ServiceWorkerCache.IRequestEntriesParams, cb?: Function);
         /**
         * Deletes a cache.
         */
        deleteCache(params: ServiceWorkerCache.IDeleteCacheParams, cb?: Function);
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
        getDOMStorageItems(params: DOMStorage.IGetDOMStorageItemsParams, cb?: Function);
        setDOMStorageItem(params: DOMStorage.ISetDOMStorageItemParams, cb?: Function);
        removeDOMStorageItem(params: DOMStorage.IRemoveDOMStorageItemParams, cb?: Function);
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
        getManifestForFrame(params: ApplicationCache.IGetManifestForFrameParams, cb?: Function);
         /**
         * Returns relevant application cache data for the document in given frame.
         */
        getApplicationCacheForFrame(params: ApplicationCache.IGetApplicationCacheForFrameParams, cb?: Function);
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
        requestFileSystemRoot(params: FileSystem.IRequestFileSystemRootParams, cb?: Function);
         /**
         * Returns content of the directory.
         */
        requestDirectoryContent(params: FileSystem.IRequestDirectoryContentParams, cb?: Function);
         /**
         * Returns metadata of the entry.
         */
        requestMetadata(params: FileSystem.IRequestMetadataParams, cb?: Function);
         /**
         * Returns content of the file. Result should be sliced into [start, end).
         */
        requestFileContent(params?: FileSystem.IRequestFileContentParams, cb?: Function);
         /**
         * Deletes specified entry. If the entry is a directory, the agent deletes children recursively.
         */
        deleteEntry(params: FileSystem.IDeleteEntryParams, cb?: Function);
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
        requestChildNodes(params?: DOM.IRequestChildNodesParams, cb?: Function);
         /**
         * Returns distribution data for all insertion points in shadow tree of the given node.
         */
        requestShadowHostDistributedNodes(params: DOM.IRequestShadowHostDistributedNodesParams, cb?: Function);
         /**
         * Executes <code>querySelector</code> on a given node.
         */
        querySelector(params: DOM.IQuerySelectorParams, cb?: Function);
         /**
         * Executes <code>querySelectorAll</code> on a given node.
         */
        querySelectorAll(params: DOM.IQuerySelectorAllParams, cb?: Function);
         /**
         * Sets node name for a node with given id.
         */
        setNodeName(params: DOM.ISetNodeNameParams, cb?: Function);
         /**
         * Sets node value for a node with given id.
         */
        setNodeValue(params: DOM.ISetNodeValueParams, cb?: Function);
         /**
         * Removes node with given id.
         */
        removeNode(params: DOM.IRemoveNodeParams, cb?: Function);
         /**
         * Sets attribute for an element with given id.
         */
        setAttributeValue(params: DOM.ISetAttributeValueParams, cb?: Function);
         /**
         * Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs.
         */
        setAttributesAsText(params?: DOM.ISetAttributesAsTextParams, cb?: Function);
         /**
         * Removes attribute with given name from an element with given id.
         */
        removeAttribute(params: DOM.IRemoveAttributeParams, cb?: Function);
         /**
         * Returns event listeners relevant to the node.
         */
        getEventListenersForNode(params?: DOM.IGetEventListenersForNodeParams, cb?: Function);
         /**
         * Returns node's HTML markup.
         */
        getOuterHTML(params: DOM.IGetOuterHTMLParams, cb?: Function);
         /**
         * Sets node HTML markup, returns new node id.
         */
        setOuterHTML(params: DOM.ISetOuterHTMLParams, cb?: Function);
         /**
         * Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
         */
        performSearch(params?: DOM.IPerformSearchParams, cb?: Function);
         /**
         * Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
         */
        getSearchResults(params: DOM.IGetSearchResultsParams, cb?: Function);
         /**
         * Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.
         */
        discardSearchResults(params: DOM.IDiscardSearchResultsParams, cb?: Function);
         /**
         * Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications.
         */
        requestNode(params: DOM.IRequestNodeParams, cb?: Function);
         /**
         * Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection.
         */
        setInspectModeEnabled(params?: DOM.ISetInspectModeEnabledParams, cb?: Function);
         /**
         * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightRect(params?: DOM.IHighlightRectParams, cb?: Function);
         /**
         * Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
         */
        highlightQuad(params?: DOM.IHighlightQuadParams, cb?: Function);
         /**
         * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.
         */
        highlightNode(params?: DOM.IHighlightNodeParams, cb?: Function);
         /**
         * Hides DOM node highlight.
         */
        hideHighlight(cb?: Function);
         /**
         * Highlights owner element of the frame with given id.
         */
        highlightFrame(params?: DOM.IHighlightFrameParams, cb?: Function);
         /**
         * Requests that the node is sent to the caller given its path. // FIXME, use XPath
         */
        pushNodeByPathToFrontend(params: DOM.IPushNodeByPathToFrontendParams, cb?: Function);
         /**
         * Requests that a batch of nodes is sent to the caller given their backend node ids.
         */
        pushNodesByBackendIdsToFrontend(params: DOM.IPushNodesByBackendIdsToFrontendParams, cb?: Function);
         /**
         * Resolves JavaScript node object for given node id.
         */
        resolveNode(params?: DOM.IResolveNodeParams, cb?: Function);
         /**
         * Returns attributes for the specified node.
         */
        getAttributes(params: DOM.IGetAttributesParams, cb?: Function);
         /**
         * Creates a deep copy of the specified node and places it into the target container before the given anchor.
         */
        copyTo(params?: DOM.ICopyToParams, cb?: Function);
         /**
         * Moves node into the new container, places it before the given anchor.
         */
        moveTo(params?: DOM.IMoveToParams, cb?: Function);
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
        focus(params: DOM.IFocusParams, cb?: Function);
         /**
         * Sets files for the given file input element.
         */
        setFileInputFiles(params: DOM.ISetFileInputFilesParams, cb?: Function);
         /**
         * Returns boxes for the currently selected nodes.
         */
        getBoxModel(params: DOM.IGetBoxModelParams, cb?: Function);
         /**
         * Returns node id at given location.
         */
        getNodeForLocation(params: DOM.IGetNodeForLocationParams, cb?: Function);
         /**
         * Returns the id of the nearest ancestor that is a relayout boundary.
         */
        getRelayoutBoundary(params: DOM.IGetRelayoutBoundaryParams, cb?: Function);
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
        getMatchedStylesForNode(params?: CSS.IGetMatchedStylesForNodeParams, cb?: Function);
         /**
         * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>.
         */
        getInlineStylesForNode(params: CSS.IGetInlineStylesForNodeParams, cb?: Function);
         /**
         * Returns the computed style for a DOM node identified by <code>nodeId</code>.
         */
        getComputedStyleForNode(params: CSS.IGetComputedStyleForNodeParams, cb?: Function);
         /**
         * Requests information about platform fonts which we used to render child TextNodes in the given node.
         */
        getPlatformFontsForNode(params: CSS.IGetPlatformFontsForNodeParams, cb?: Function);
         /**
         * Returns the current textual content and the URL for a stylesheet.
         */
        getStyleSheetText(params: CSS.IGetStyleSheetTextParams, cb?: Function);
         /**
         * Sets the new stylesheet text.
         */
        setStyleSheetText(params: CSS.ISetStyleSheetTextParams, cb?: Function);
         /**
         * Either replaces a property identified by <code>styleSheetId</code> and <code>range</code> with <code>text</code> or inserts a new property <code>text</code> at the position identified by an empty <code>range</code>.
         */
        setPropertyText(params: CSS.ISetPropertyTextParams, cb?: Function);
         /**
         * Modifies the rule selector.
         */
        setRuleSelector(params: CSS.ISetRuleSelectorParams, cb?: Function);
         /**
         * Modifies the rule selector.
         */
        setMediaText(params: CSS.ISetMediaTextParams, cb?: Function);
         /**
         * Creates a new special "via-inspector" stylesheet in the frame with given <code>frameId</code>.
         */
        createStyleSheet(params: CSS.ICreateStyleSheetParams, cb?: Function);
         /**
         * Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>.
         */
        addRule(params: CSS.IAddRuleParams, cb?: Function);
         /**
         * Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser.
         */
        forcePseudoState(params: CSS.IForcePseudoStateParams, cb?: Function);
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
        start(params?: Timeline.IStartParams, cb?: Function);
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
        setBreakpointsActive(params: Debugger.ISetBreakpointsActiveParams, cb?: Function);
         /**
         * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
         */
        setSkipAllPauses(params?: Debugger.ISetSkipAllPausesParams, cb?: Function);
         /**
         * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
         */
        setBreakpointByUrl(params?: Debugger.ISetBreakpointByUrlParams, cb?: Function);
         /**
         * Sets JavaScript breakpoint at a given location.
         */
        setBreakpoint(params?: Debugger.ISetBreakpointParams, cb?: Function);
         /**
         * Removes JavaScript breakpoint.
         */
        removeBreakpoint(params: Debugger.IRemoveBreakpointParams, cb?: Function);
         /**
         * Continues execution until specific location is reached.
         */
        continueToLocation(params?: Debugger.IContinueToLocationParams, cb?: Function);
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
        searchInContent(params?: Debugger.ISearchInContentParams, cb?: Function);
         /**
         * Always returns true.
         */
        canSetScriptSource(cb?: Function);
         /**
         * Edits JavaScript source live.
         */
        setScriptSource(params?: Debugger.ISetScriptSourceParams, cb?: Function);
         /**
         * Restarts particular call frame from the beginning.
         */
        restartFrame(params: Debugger.IRestartFrameParams, cb?: Function);
         /**
         * Returns source for the script with given id.
         */
        getScriptSource(params: Debugger.IGetScriptSourceParams, cb?: Function);
         /**
         * Returns detailed information on given function.
         */
        getFunctionDetails(params: Debugger.IGetFunctionDetailsParams, cb?: Function);
         /**
         * Returns detailed information on given generator object.
         */
        getGeneratorObjectDetails(params: Debugger.IGetGeneratorObjectDetailsParams, cb?: Function);
         /**
         * Returns entries of given collection.
         */
        getCollectionEntries(params: Debugger.IGetCollectionEntriesParams, cb?: Function);
         /**
         * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
         */
        setPauseOnExceptions(params: Debugger.ISetPauseOnExceptionsParams, cb?: Function);
         /**
         * Evaluates expression on a given call frame.
         */
        evaluateOnCallFrame(params?: Debugger.IEvaluateOnCallFrameParams, cb?: Function);
         /**
         * Compiles expression.
         */
        compileScript(params?: Debugger.ICompileScriptParams, cb?: Function);
         /**
         * Runs script with given id in a given context.
         */
        runScript(params?: Debugger.IRunScriptParams, cb?: Function);
         /**
         * Changes value of variable in a callframe or a closure. Either callframe or function must be specified. Object-based scopes are not supported and must be mutated manually.
         */
        setVariableValue(params?: Debugger.ISetVariableValueParams, cb?: Function);
         /**
         * Lists all positions where step-in is possible for a current statement in a specified call frame
         */
        getStepInPositions(params: Debugger.IGetStepInPositionsParams, cb?: Function);
         /**
         * Returns call stack including variables changed since VM was paused. VM must be paused.
         */
        getBacktrace(cb?: Function);
         /**
         * Makes backend skip steps in the sources with names matching given pattern. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         */
        skipStackFrames(params?: Debugger.ISkipStackFramesParams, cb?: Function);
         /**
         * Enables or disables async call stacks tracking.
         */
        setAsyncCallStackDepth(params: Debugger.ISetAsyncCallStackDepthParams, cb?: Function);
         /**
         * Enables promise tracking, information about <code>Promise</code>s created or updated will now be stored on the backend.
         */
        enablePromiseTracker(params?: Debugger.IEnablePromiseTrackerParams, cb?: Function);
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
        getPromiseById(params?: Debugger.IGetPromiseByIdParams, cb?: Function);
    }
    interface IDOMDebugger {
         /**
         * Sets breakpoint on particular operation with DOM.
         */
        setDOMBreakpoint(params: DOMDebugger.ISetDOMBreakpointParams, cb?: Function);
         /**
         * Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
         */
        removeDOMBreakpoint(params: DOMDebugger.IRemoveDOMBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on particular DOM event.
         */
        setEventListenerBreakpoint(params?: DOMDebugger.ISetEventListenerBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint on particular DOM event.
         */
        removeEventListenerBreakpoint(params?: DOMDebugger.IRemoveEventListenerBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on particular native event.
         */
        setInstrumentationBreakpoint(params: DOMDebugger.ISetInstrumentationBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint on particular native event.
         */
        removeInstrumentationBreakpoint(params: DOMDebugger.IRemoveInstrumentationBreakpointParams, cb?: Function);
         /**
         * Sets breakpoint on XMLHttpRequest.
         */
        setXHRBreakpoint(params: DOMDebugger.ISetXHRBreakpointParams, cb?: Function);
         /**
         * Removes breakpoint from XMLHttpRequest.
         */
        removeXHRBreakpoint(params: DOMDebugger.IRemoveXHRBreakpointParams, cb?: Function);
    }
    interface IProfiler {
        enable(cb?: Function);
        disable(cb?: Function);
         /**
         * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
         */
        setSamplingInterval(params: Profiler.ISetSamplingIntervalParams, cb?: Function);
        start(cb?: Function);
        stop(cb?: Function);
    }
    interface IHeapProfiler {
        enable(cb?: Function);
        disable(cb?: Function);
        startTrackingHeapObjects(params?: HeapProfiler.IStartTrackingHeapObjectsParams, cb?: Function);
        stopTrackingHeapObjects(params?: HeapProfiler.IStopTrackingHeapObjectsParams, cb?: Function);
        takeHeapSnapshot(params?: HeapProfiler.ITakeHeapSnapshotParams, cb?: Function);
        collectGarbage(cb?: Function);
        getObjectByHeapObjectId(params?: HeapProfiler.IGetObjectByHeapObjectIdParams, cb?: Function);
        getHeapObjectId(params: HeapProfiler.IGetHeapObjectIdParams, cb?: Function);
    }
    interface IWorker {
        enable(cb?: Function);
        disable(cb?: Function);
        sendMessageToWorker(params: Worker.ISendMessageToWorkerParams, cb?: Function);
         /**
         * Tells whether browser supports workers inspection.
         */
        canInspectWorkers(cb?: Function);
        connectToWorker(params: Worker.IConnectToWorkerParams, cb?: Function);
        disconnectFromWorker(params: Worker.IDisconnectFromWorkerParams, cb?: Function);
        setAutoconnectToWorkers(params: Worker.ISetAutoconnectToWorkersParams, cb?: Function);
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
        dropTraceLog(params: Canvas.IDropTraceLogParams, cb?: Function);
         /**
         * Checks if there is any uninstrumented canvas in the inspected page.
         */
        hasUninstrumentedCanvases(cb?: Function);
         /**
         * Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared.
         */
        captureFrame(params?: Canvas.ICaptureFrameParams, cb?: Function);
         /**
         * Starts (or continues) consecutive canvas frames capturing. The capturing is stopped by the corresponding stopCapturing command.
         */
        startCapturing(params?: Canvas.IStartCapturingParams, cb?: Function);
        stopCapturing(params: Canvas.IStopCapturingParams, cb?: Function);
        getTraceLog(params?: Canvas.IGetTraceLogParams, cb?: Function);
        replayTraceLog(params: Canvas.IReplayTraceLogParams, cb?: Function);
        getResourceState(params: Canvas.IGetResourceStateParams, cb?: Function);
         /**
         * Evaluates a given trace call argument or its result.
         */
        evaluateTraceLogCallArgument(params?: Canvas.IEvaluateTraceLogCallArgumentParams, cb?: Function);
    }
    interface IInput {
         /**
         * Dispatches a key event to the page.
         */
        dispatchKeyEvent(params?: Input.IDispatchKeyEventParams, cb?: Function);
         /**
         * Dispatches a mouse event to the page.
         */
        dispatchMouseEvent(params?: Input.IDispatchMouseEventParams, cb?: Function);
         /**
         * Dispatches a touch event to the page.
         */
        dispatchTouchEvent(params?: Input.IDispatchTouchEventParams, cb?: Function);
         /**
         * Emulates touch event from the mouse event parameters.
         */
        emulateTouchFromMouseEvent(params?: Input.IEmulateTouchFromMouseEventParams, cb?: Function);
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
        compositingReasons(params: LayerTree.ICompositingReasonsParams, cb?: Function);
         /**
         * Returns the layer snapshot identifier.
         */
        makeSnapshot(params: LayerTree.IMakeSnapshotParams, cb?: Function);
         /**
         * Returns the snapshot identifier.
         */
        loadSnapshot(params: LayerTree.ILoadSnapshotParams, cb?: Function);
         /**
         * Releases layer snapshot captured by the back-end.
         */
        releaseSnapshot(params: LayerTree.IReleaseSnapshotParams, cb?: Function);
        profileSnapshot(params?: LayerTree.IProfileSnapshotParams, cb?: Function);
         /**
         * Replays the layer snapshot and returns the resulting bitmap.
         */
        replaySnapshot(params?: LayerTree.IReplaySnapshotParams, cb?: Function);
         /**
         * Replays the layer snapshot and returns canvas log.
         */
        snapshotCommandLog(params: LayerTree.ISnapshotCommandLogParams, cb?: Function);
    }
    interface IDeviceOrientation {
         /**
         * Overrides the Device Orientation.
         */
        setDeviceOrientationOverride(params: DeviceOrientation.ISetDeviceOrientationOverrideParams, cb?: Function);
         /**
         * Clears the overridden Device Orientation.
         */
        clearDeviceOrientationOverride(cb?: Function);
    }
    interface ITracing {
         /**
         * Start trace events collection.
         */
        start(params?: Tracing.IStartParams, cb?: Function);
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
        getAnimationPlayersForNode(params: Animation.IGetAnimationPlayersForNodeParams, cb?: Function);
         /**
         * Pauses animations relevant to the node.
         */
        pauseAnimationPlayer(params: Animation.IPauseAnimationPlayerParams, cb?: Function);
         /**
         * Plays animations relevant to the node.
         */
        playAnimationPlayer(params: Animation.IPlayAnimationPlayerParams, cb?: Function);
         /**
         * Sets the current time on given AnimationPlayer.
         */
        setAnimationPlayerCurrentTime(params: Animation.ISetAnimationPlayerCurrentTimeParams, cb?: Function);
         /**
         * Gets the state of an AnimationPlayer.
         */
        getAnimationPlayerState(params: Animation.IGetAnimationPlayerStateParams, cb?: Function);
         /**
         * Sets the parameters of recording for new animations events.
         */
        startListening(params: Animation.IStartListeningParams, cb?: Function);
         /**
         * Stops recording for new animation player events.
         */
        stopListening(cb?: Function);
    }
    module Inspector {
    }
    module Memory {
    }
    module Page {
        export interface IAddScriptToEvaluateOnLoadParams {
            scriptSource: string;
        }
        export interface IRemoveScriptToEvaluateOnLoadParams {
            identifier: any;
        }
        export interface IReloadParams {
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
        export interface INavigateParams {
             /**
             * URL to navigate the page to.
             */
            url: string;
        }
        export interface INavigateToHistoryEntryParams {
             /**
             * Unique id of the entry to navigate to.
             */
            entryId: number;
        }
        export interface IDeleteCookieParams {
             /**
             * Name of the cookie to remove.
             */
            cookieName: string;
             /**
             * URL to match cooke domain and path.
             */
            url: string;
        }
        export interface IGetResourceContentParams {
             /**
             * Frame id to get resource for.
             */
            frameId: any;
             /**
             * URL of the resource to get content for.
             */
            url: string;
        }
        export interface ISearchInResourceParams {
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
        export interface ISetDocumentContentParams {
             /**
             * Frame id to set HTML for.
             */
            frameId: any;
             /**
             * HTML content to set.
             */
            html: string;
        }
        export interface ISetDeviceMetricsOverrideParams {
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
        export interface ISetPageScaleFactorParams {
             /**
             * Page scale factor.
             */
            pageScaleFactor: any;
        }
        export interface ISetShowPaintRectsParams {
             /**
             * True for showing paint rectangles
             */
            result: boolean;
        }
        export interface ISetShowDebugBordersParams {
             /**
             * True for showing debug borders
             */
            show: boolean;
        }
        export interface ISetShowFPSCounterParams {
             /**
             * True for showing the FPS counter
             */
            show: boolean;
        }
        export interface ISetContinuousPaintingEnabledParams {
             /**
             * True for enabling cointinuous painting
             */
            enabled: boolean;
        }
        export interface ISetShowScrollBottleneckRectsParams {
             /**
             * True for showing scroll bottleneck rects
             */
            show: boolean;
        }
        export interface ISetScriptExecutionDisabledParams {
             /**
             * Whether script execution should be disabled in the page.
             */
            value: boolean;
        }
        export interface ISetGeolocationOverrideParams {
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
        export interface ISetDeviceOrientationOverrideParams {
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
        export interface ISetTouchEmulationEnabledParams {
             /**
             * Whether the touch event emulation should be enabled.
             */
            enabled: boolean;
             /**
             * Touch/gesture events configuration. Default: current platform.
             */
            configuration?: string;
        }
        export interface ISetEmulatedMediaParams {
             /**
             * Media type to emulate. Empty string disables the override.
             */
            media: string;
        }
        export interface IStartScreencastParams {
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
        export interface IScreencastFrameAckParams {
             /**
             * Frame number.
             */
            frameNumber: number;
        }
        export interface IStartRecordingFramesParams {
             /**
             * Maximal number of frames to record from range. Actual maximum depends on implementation.
             */
            maxFrameCount: number;
        }
        export interface IHandleJavaScriptDialogParams {
             /**
             * Whether to accept or dismiss the dialog.
             */
            accept: boolean;
             /**
             * The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog.
             */
            promptText?: string;
        }
        export interface ISetShowViewportSizeOnResizeParams {
             /**
             * Whether to paint size or not.
             */
            show: boolean;
             /**
             * Whether to paint grid as well.
             */
            showGrid?: boolean;
        }
        export interface IQueryUsageAndQuotaParams {
             /**
             * Security origin quota and usage requested for
             */
            securityOrigin: string;
        }
        export interface ISetColorPickerEnabledParams {
             /**
             * Shows / hides color picker
             */
            enabled: boolean;
        }
        export interface ISetOverlayMessageParams {
             /**
             * Overlay message to display when paused in debugger.
             */
            message?: string;
        }
        export interface ISetAnimationsPlaybackRateParams {
             /**
             * Playback rate for animations on page
             */
            playbackRate: any;
        }
    }
    module Runtime {
        export interface IEvaluateParams {
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
        export interface ICallFunctionOnParams {
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
        export interface IGetPropertiesParams {
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
        export interface IReleaseObjectParams {
             /**
             * Identifier of the object to release.
             */
            objectId: any;
        }
        export interface IReleaseObjectGroupParams {
             /**
             * Symbolic object group name.
             */
            objectGroup: string;
        }
        export interface ISetCustomObjectFormatterEnabledParams {
            enabled: boolean;
        }
    }
    module Console {
        export interface ISetMonitoringXHREnabledParams {
             /**
             * Monitoring enabled state.
             */
            enabled: boolean;
        }
        export interface IAddInspectedNodeParams {
             /**
             * DOM node id to be accessible by means of $x command line API.
             */
            nodeId: any;
        }
        export interface IAddInspectedHeapObjectParams {
            heapObjectId: number;
        }
        export interface ISetLastEvaluationResultParams {
             /**
             * Identifier of the object to set as last evaluation result.
             */
            objectId: any;
        }
    }
    module Network {
        export interface ISetUserAgentOverrideParams {
             /**
             * User agent to use.
             */
            userAgent: string;
        }
        export interface ISetExtraHTTPHeadersParams {
             /**
             * Map with extra HTTP headers.
             */
            headers: any;
        }
        export interface IGetResponseBodyParams {
             /**
             * Identifier of the network request to get content for.
             */
            requestId: any;
        }
        export interface IReplayXHRParams {
             /**
             * Identifier of XHR to replay.
             */
            requestId: any;
        }
        export interface IEmulateNetworkConditionsParams {
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
        export interface ISetCacheDisabledParams {
             /**
             * Cache disabled state.
             */
            cacheDisabled: boolean;
        }
        export interface ILoadResourceForFrontendParams {
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
    }
    module Database {
        export interface IGetDatabaseTableNamesParams {
            databaseId: any;
        }
        export interface IExecuteSQLParams {
            databaseId: any;
            query: string;
        }
    }
    module IndexedDB {
        export interface IRequestDatabaseNamesParams {
             /**
             * Security origin.
             */
            securityOrigin: string;
        }
        export interface IRequestDatabaseParams {
             /**
             * Security origin.
             */
            securityOrigin: string;
             /**
             * Database name.
             */
            databaseName: string;
        }
        export interface IRequestDataParams {
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
        export interface IClearObjectStoreParams {
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
    }
    module ServiceWorkerCache {
        export interface IRequestEntriesParams {
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
        export interface IDeleteCacheParams {
             /**
             * Cache name.
             */
            cacheName: string;
        }
    }
    module DOMStorage {
        export interface IGetDOMStorageItemsParams {
            storageId: any;
        }
        export interface ISetDOMStorageItemParams {
            storageId: any;
            key: string;
            value: string;
        }
        export interface IRemoveDOMStorageItemParams {
            storageId: any;
            key: string;
        }
    }
    module ApplicationCache {
        export interface IGetManifestForFrameParams {
             /**
             * Identifier of the frame containing document whose manifest is retrieved.
             */
            frameId: any;
        }
        export interface IGetApplicationCacheForFrameParams {
             /**
             * Identifier of the frame containing document whose application cache is retrieved.
             */
            frameId: any;
        }
    }
    module FileSystem {
        export interface IRequestFileSystemRootParams {
             /**
             * Security origin of requesting FileSystem. One of frames in current page needs to have this security origin.
             */
            origin: string;
             /**
             * FileSystem type of requesting FileSystem.
             */
            type: string;
        }
        export interface IRequestDirectoryContentParams {
             /**
             * URL of the directory that the frontend is requesting to read from.
             */
            url: string;
        }
        export interface IRequestMetadataParams {
             /**
             * URL of the entry that the frontend is requesting to get metadata from.
             */
            url: string;
        }
        export interface IRequestFileContentParams {
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
        export interface IDeleteEntryParams {
             /**
             * URL of the entry to delete.
             */
            url: string;
        }
    }
    module DOM {
        export interface IRequestChildNodesParams {
             /**
             * Id of the node to get children for.
             */
            nodeId: any;
             /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
             */
            depth?: number;
        }
        export interface IRequestShadowHostDistributedNodesParams {
             /**
             * Id of the node to get distributed nodes for.
             */
            nodeId: any;
        }
        export interface IQuerySelectorParams {
             /**
             * Id of the node to query upon.
             */
            nodeId: any;
             /**
             * Selector string.
             */
            selector: string;
        }
        export interface IQuerySelectorAllParams {
             /**
             * Id of the node to query upon.
             */
            nodeId: any;
             /**
             * Selector string.
             */
            selector: string;
        }
        export interface ISetNodeNameParams {
             /**
             * Id of the node to set name for.
             */
            nodeId: any;
             /**
             * New node's name.
             */
            name: string;
        }
        export interface ISetNodeValueParams {
             /**
             * Id of the node to set value for.
             */
            nodeId: any;
             /**
             * New node's value.
             */
            value: string;
        }
        export interface IRemoveNodeParams {
             /**
             * Id of the node to remove.
             */
            nodeId: any;
        }
        export interface ISetAttributeValueParams {
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
        export interface ISetAttributesAsTextParams {
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
        export interface IRemoveAttributeParams {
             /**
             * Id of the element to remove attribute from.
             */
            nodeId: any;
             /**
             * Name of the attribute to remove.
             */
            name: string;
        }
        export interface IGetEventListenersForNodeParams {
             /**
             * Id of the node to get listeners for.
             */
            nodeId: any;
             /**
             * Symbolic group name for handler value. Handler value is not returned without this parameter specified.
             */
            objectGroup?: string;
        }
        export interface IGetOuterHTMLParams {
             /**
             * Id of the node to get markup for.
             */
            nodeId: any;
        }
        export interface ISetOuterHTMLParams {
             /**
             * Id of the node to set markup for.
             */
            nodeId: any;
             /**
             * Outer HTML markup to set.
             */
            outerHTML: string;
        }
        export interface IPerformSearchParams {
             /**
             * Plain text or query selector or XPath search query.
             */
            query: string;
             /**
             * True to search in user agent shadow DOM.
             */
            includeUserAgentShadowDOM?: boolean;
        }
        export interface IGetSearchResultsParams {
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
        export interface IDiscardSearchResultsParams {
             /**
             * Unique search session identifier.
             */
            searchId: string;
        }
        export interface IRequestNodeParams {
             /**
             * JavaScript object id to convert into node.
             */
            objectId: any;
        }
        export interface ISetInspectModeEnabledParams {
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
        export interface IHighlightRectParams {
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
        export interface IHighlightQuadParams {
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
        export interface IHighlightNodeParams {
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
        export interface IHighlightFrameParams {
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
        export interface IPushNodeByPathToFrontendParams {
             /**
             * Path to node in the proprietary format.
             */
            path: string;
        }
        export interface IPushNodesByBackendIdsToFrontendParams {
             /**
             * The array of backend node ids.
             */
            backendNodeIds: any[];
        }
        export interface IResolveNodeParams {
             /**
             * Id of the node to resolve.
             */
            nodeId: any;
             /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
        }
        export interface IGetAttributesParams {
             /**
             * Id of the node to retrieve attibutes for.
             */
            nodeId: any;
        }
        export interface ICopyToParams {
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
        export interface IMoveToParams {
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
        export interface IFocusParams {
             /**
             * Id of the node to focus.
             */
            nodeId: any;
        }
        export interface ISetFileInputFilesParams {
             /**
             * Id of the file input node to set files for.
             */
            nodeId: any;
             /**
             * Array of file paths to set.
             */
            files: any[];
        }
        export interface IGetBoxModelParams {
             /**
             * Id of the node to get box model for.
             */
            nodeId: any;
        }
        export interface IGetNodeForLocationParams {
             /**
             * X coordinate.
             */
            x: number;
             /**
             * Y coordinate.
             */
            y: number;
        }
        export interface IGetRelayoutBoundaryParams {
             /**
             * Id of the node.
             */
            nodeId: any;
        }
    }
    module CSS {
        export interface IGetMatchedStylesForNodeParams {
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
        export interface IGetInlineStylesForNodeParams {
            nodeId: any;
        }
        export interface IGetComputedStyleForNodeParams {
            nodeId: any;
        }
        export interface IGetPlatformFontsForNodeParams {
            nodeId: any;
        }
        export interface IGetStyleSheetTextParams {
            styleSheetId: any;
        }
        export interface ISetStyleSheetTextParams {
            styleSheetId: any;
            text: string;
        }
        export interface ISetPropertyTextParams {
            styleSheetId: any;
             /**
             * Either a source range of the property to be edited or an empty range representing a position for the property insertion.
             */
            range: any;
            text: string;
        }
        export interface ISetRuleSelectorParams {
            styleSheetId: any;
            range: any;
            selector: string;
        }
        export interface ISetMediaTextParams {
            styleSheetId: any;
            range: any;
            text: string;
        }
        export interface ICreateStyleSheetParams {
             /**
             * Identifier of the frame where "via-inspector" stylesheet should be created.
             */
            frameId: any;
        }
        export interface IAddRuleParams {
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
        export interface IForcePseudoStateParams {
             /**
             * The element id for which to force the pseudo state.
             */
            nodeId: any;
             /**
             * Element pseudo classes to force when computing the element's style.
             */
            forcedPseudoClasses: any[];
        }
    }
    module Timeline {
        export interface IStartParams {
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
    }
    module Debugger {
        export interface ISetBreakpointsActiveParams {
             /**
             * New value for breakpoints active state.
             */
            active: boolean;
        }
        export interface ISetSkipAllPausesParams {
             /**
             * New value for skip pauses state.
             */
            skipped: boolean;
             /**
             * Whether page reload should set skipped to false.
             */
            untilReload?: boolean;
        }
        export interface ISetBreakpointByUrlParams {
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
        export interface ISetBreakpointParams {
             /**
             * Location to set breakpoint in.
             */
            location: any;
             /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }
        export interface IRemoveBreakpointParams {
            breakpointId: any;
        }
        export interface IContinueToLocationParams {
             /**
             * Location to continue to.
             */
            location: any;
             /**
             * Allows breakpoints at the intemediate positions inside statements.
             */
            interstatementLocation?: boolean;
        }
        export interface ISearchInContentParams {
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
        export interface ISetScriptSourceParams {
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
        export interface IRestartFrameParams {
             /**
             * Call frame identifier to evaluate on.
             */
            callFrameId: any;
        }
        export interface IGetScriptSourceParams {
             /**
             * Id of the script to get source for.
             */
            scriptId: any;
        }
        export interface IGetFunctionDetailsParams {
             /**
             * Id of the function to get details for.
             */
            functionId: any;
        }
        export interface IGetGeneratorObjectDetailsParams {
             /**
             * Id of the generator object to get details for.
             */
            objectId: any;
        }
        export interface IGetCollectionEntriesParams {
             /**
             * Id of the collection to get entries for.
             */
            objectId: any;
        }
        export interface ISetPauseOnExceptionsParams {
             /**
             * Pause on exceptions mode.
             */
            state: string;
        }
        export interface IEvaluateOnCallFrameParams {
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
        export interface ICompileScriptParams {
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
        export interface IRunScriptParams {
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
        export interface ISetVariableValueParams {
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
        export interface IGetStepInPositionsParams {
             /**
             * Id of a call frame where the current statement should be analized
             */
            callFrameId: any;
        }
        export interface ISkipStackFramesParams {
             /**
             * Regular expression defining the scripts to ignore while stepping.
             */
            script?: string;
             /**
             * True, if all content scripts should be ignored.
             */
            skipContentScripts?: boolean;
        }
        export interface ISetAsyncCallStackDepthParams {
             /**
             * Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default).
             */
            maxDepth: number;
        }
        export interface IEnablePromiseTrackerParams {
             /**
             * Whether to capture stack traces for promise creation and settlement events (default: false).
             */
            captureStacks?: boolean;
        }
        export interface IGetPromiseByIdParams {
            promiseId: number;
             /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
        }
    }
    module DOMDebugger {
        export interface ISetDOMBreakpointParams {
             /**
             * Identifier of the node to set breakpoint on.
             */
            nodeId: any;
             /**
             * Type of the operation to stop upon.
             */
            type: any;
        }
        export interface IRemoveDOMBreakpointParams {
             /**
             * Identifier of the node to remove breakpoint from.
             */
            nodeId: any;
             /**
             * Type of the breakpoint to remove.
             */
            type: any;
        }
        export interface ISetEventListenerBreakpointParams {
             /**
             * DOM Event name to stop on (any DOM event will do).
             */
            eventName: string;
             /**
             * EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.
             */
            targetName?: string;
        }
        export interface IRemoveEventListenerBreakpointParams {
             /**
             * Event name.
             */
            eventName: string;
             /**
             * EventTarget interface name.
             */
            targetName?: string;
        }
        export interface ISetInstrumentationBreakpointParams {
             /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }
        export interface IRemoveInstrumentationBreakpointParams {
             /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }
        export interface ISetXHRBreakpointParams {
             /**
             * Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
             */
            url: string;
        }
        export interface IRemoveXHRBreakpointParams {
             /**
             * Resource URL substring.
             */
            url: string;
        }
    }
    module Profiler {
        export interface ISetSamplingIntervalParams {
             /**
             * New sampling interval in microseconds.
             */
            interval: number;
        }
    }
    module HeapProfiler {
        export interface IStartTrackingHeapObjectsParams {
            trackAllocations?: boolean;
        }
        export interface IStopTrackingHeapObjectsParams {
             /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
             */
            reportProgress?: boolean;
        }
        export interface ITakeHeapSnapshotParams {
             /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
             */
            reportProgress?: boolean;
        }
        export interface IGetObjectByHeapObjectIdParams {
            objectId: any;
             /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
        }
        export interface IGetHeapObjectIdParams {
             /**
             * Identifier of the object to get heap object id for.
             */
            objectId: any;
        }
    }
    module Worker {
        export interface ISendMessageToWorkerParams {
            workerId: number;
            message: any;
        }
        export interface IConnectToWorkerParams {
            workerId: number;
        }
        export interface IDisconnectFromWorkerParams {
            workerId: number;
        }
        export interface ISetAutoconnectToWorkersParams {
            value: boolean;
        }
    }
    module Canvas {
        export interface IDropTraceLogParams {
            traceLogId: any;
        }
        export interface ICaptureFrameParams {
             /**
             * Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
             */
            frameId?: any;
        }
        export interface IStartCapturingParams {
             /**
             * Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
             */
            frameId?: any;
        }
        export interface IStopCapturingParams {
            traceLogId: any;
        }
        export interface IGetTraceLogParams {
            traceLogId: any;
            startOffset?: number;
            maxLength?: number;
        }
        export interface IReplayTraceLogParams {
            traceLogId: any;
             /**
             * Last call index in the trace log to replay (zero based).
             */
            stepNo: number;
        }
        export interface IGetResourceStateParams {
            traceLogId: any;
            resourceId: any;
        }
        export interface IEvaluateTraceLogCallArgumentParams {
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
    }
    module Input {
        export interface IDispatchKeyEventParams {
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
        export interface IDispatchMouseEventParams {
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
        export interface IDispatchTouchEventParams {
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
        export interface IEmulateTouchFromMouseEventParams {
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
    }
    module LayerTree {
        export interface ICompositingReasonsParams {
             /**
             * The id of the layer for which we want to get the reasons it was composited.
             */
            layerId: any;
        }
        export interface IMakeSnapshotParams {
             /**
             * The id of the layer.
             */
            layerId: any;
        }
        export interface ILoadSnapshotParams {
             /**
             * An array of tiles composing the snapshot.
             */
            tiles: any[];
        }
        export interface IReleaseSnapshotParams {
             /**
             * The id of the layer snapshot.
             */
            snapshotId: any;
        }
        export interface IProfileSnapshotParams {
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
        export interface IReplaySnapshotParams {
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
        export interface ISnapshotCommandLogParams {
             /**
             * The id of the layer snapshot.
             */
            snapshotId: any;
        }
    }
    module DeviceOrientation {
        export interface ISetDeviceOrientationOverrideParams {
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
    }
    module Tracing {
        export interface IStartParams {
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
    }
    module Power {
    }
    module Animation {
        export interface IGetAnimationPlayersForNodeParams {
             /**
             * Id of the node to get animation players for.
             */
            nodeId: any;
             /**
             * Include animations from elements subtree.
             */
            includeSubtreeAnimations: boolean;
        }
        export interface IPauseAnimationPlayerParams {
             /**
             * Id of the animation player.
             */
            id: string;
        }
        export interface IPlayAnimationPlayerParams {
             /**
             * Id of the animation player.
             */
            id: string;
        }
        export interface ISetAnimationPlayerCurrentTimeParams {
             /**
             * Id of the animation player.
             */
            id: string;
             /**
             * Current time to set animation to
             */
            currentTime: any;
        }
        export interface IGetAnimationPlayerStateParams {
             /**
             * Id of the animation player.
             */
            id: string;
        }
        export interface IStartListeningParams {
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

}

