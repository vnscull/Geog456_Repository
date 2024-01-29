(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["arcgis-app-components-utils"] = {}));
})(this, (function (exports) { 'use strict';

    const BUILD = {
        allRenderFn: false,
        cmpDidLoad: true,
        cmpDidUnload: false,
        cmpDidUpdate: true,
        cmpDidRender: true,
        cmpWillLoad: true,
        cmpWillUpdate: true,
        cmpWillRender: true,
        connectedCallback: true,
        disconnectedCallback: true,
        element: true,
        event: true,
        hasRenderFn: true,
        lifecycle: true,
        hostListener: true,
        hostListenerTargetWindow: true,
        hostListenerTargetDocument: true,
        hostListenerTargetBody: true,
        hostListenerTargetParent: false,
        hostListenerTarget: true,
        member: true,
        method: true,
        mode: true,
        observeAttribute: true,
        prop: true,
        propMutable: true,
        reflect: true,
        scoped: true,
        shadowDom: true,
        slot: true,
        cssAnnotations: true,
        state: true,
        style: true,
        svg: true,
        updatable: true,
        vdomAttribute: true,
        vdomXlink: true,
        vdomClass: true,
        vdomFunctional: true,
        vdomKey: true,
        vdomListener: true,
        vdomRef: true,
        vdomPropOrAttr: true,
        vdomRender: true,
        vdomStyle: true,
        vdomText: true,
        watchCallback: true,
        taskQueue: true,
        hotModuleReplacement: false,
        isDebug: false,
        isDev: false,
        isTesting: false,
        hydrateServerSide: false,
        hydrateClientSide: false,
        lifecycleDOMEvents: false,
        lazyLoad: false,
        profile: false,
        slotRelocation: true,
        appendChildSlotFix: false,
        cloneNodeFix: false,
        hydratedAttribute: false,
        hydratedClass: true,
        safari10: false,
        scriptDataOpts: false,
        scopedSlotTextContentFix: false,
        shadowDomShim: false,
        slotChildNodesFix: false,
        invisiblePrehydration: true,
        propBoolean: true,
        propNumber: true,
        propString: true,
        cssVarShim: false,
        constructableCSS: true,
        cmpShouldUpdate: true,
        devTools: false,
        dynamicImportShim: false,
        shadowDelegatesFocus: true,
        initializeNextTick: false,
        asyncLoading: false,
        asyncQueue: false,
        transformTagName: false,
        attachStyles: true,
    };

    /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
     *
     * Modified for Stencil's renderer and slot projection
     */
    let scopeId;
    let contentRef;
    let hostTagName;
    let useNativeShadowDom = false;
    let checkSlotFallbackVisibility = false;
    let checkSlotRelocate = false;
    let isSvgMode = false;
    let renderingRef = null;
    let queuePending = false;
    ({
        isDev: BUILD.isDev ? true : false,
        isBrowser: true,
        isServer: false,
        isTesting: BUILD.isTesting ? true : false,
    });
    const createTime = (fnName, tagName = '') => {
        {
            return () => {
                return;
            };
        }
    };
    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    /**
     * Default style mode id
     */
    /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */
    const EMPTY_OBJ = {};
    /**
     * Namespaces
     */
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const HTML_NS = 'http://www.w3.org/1999/xhtml';
    const isDef = (v) => v != null;
    const isComplexType = (o) => {
        // https://jsperf.com/typeof-fn-object/5
        o = typeof o;
        return o === 'object' || o === 'function';
    };
    /**
     * Helper method for querying a `meta` tag that contains a nonce value
     * out of a DOM's head.
     *
     * @param doc The DOM containing the `head` to query against
     * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
     * exists or the tag has no content.
     */
    function queryNonceMetaTagContent(doc) {
        var _a, _b, _c;
        return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
    }
    /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */
    // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
    // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
    const h = (nodeName, vnodeData, ...children) => {
        let child = null;
        let key = null;
        let slotName = null;
        let simple = false;
        let lastSimple = false;
        const vNodeChildren = [];
        const walk = (c) => {
            for (let i = 0; i < c.length; i++) {
                child = c[i];
                if (Array.isArray(child)) {
                    walk(child);
                }
                else if (child != null && typeof child !== 'boolean') {
                    if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                        child = String(child);
                    }
                    if (simple && lastSimple) {
                        // If the previous child was simple (string), we merge both
                        vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                    }
                    else {
                        // Append a new vNode, if it's text, we create a text vNode
                        vNodeChildren.push(simple ? newVNode(null, child) : child);
                    }
                    lastSimple = simple;
                }
            }
        };
        walk(children);
        if (vnodeData) {
            // normalize class / classname attributes
            if (vnodeData.key) {
                key = vnodeData.key;
            }
            if (vnodeData.name) {
                slotName = vnodeData.name;
            }
            {
                const classData = vnodeData.className || vnodeData.class;
                if (classData) {
                    vnodeData.class =
                        typeof classData !== 'object'
                            ? classData
                            : Object.keys(classData)
                                .filter((k) => classData[k])
                                .join(' ');
                }
            }
        }
        if (typeof nodeName === 'function') {
            // nodeName is a functional component
            return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
        }
        const vnode = newVNode(nodeName, null);
        vnode.$attrs$ = vnodeData;
        if (vNodeChildren.length > 0) {
            vnode.$children$ = vNodeChildren;
        }
        {
            vnode.$key$ = key;
        }
        {
            vnode.$name$ = slotName;
        }
        return vnode;
    };
    /**
     * A utility function for creating a virtual DOM node from a tag and some
     * possible text content.
     *
     * @param tag the tag for this element
     * @param text possible text content for the node
     * @returns a newly-minted virtual DOM node
     */
    const newVNode = (tag, text) => {
        const vnode = {
            $flags$: 0,
            $tag$: tag,
            $text$: text,
            $elm$: null,
            $children$: null,
        };
        {
            vnode.$attrs$ = null;
        }
        {
            vnode.$key$ = null;
        }
        {
            vnode.$name$ = null;
        }
        return vnode;
    };
    const Host = {};
    /**
     * Check whether a given node is a Host node or not
     *
     * @param node the virtual DOM node to check
     * @returns whether it's a Host node or not
     */
    const isHost = (node) => node && node.$tag$ === Host;
    /**
     * Implementation of {@link d.FunctionalUtilities} for Stencil's VDom.
     *
     * Note that these functions convert from {@link d.VNode} to
     * {@link d.ChildNode} to give functional component developers a friendly
     * interface.
     */
    const vdomFnUtils = {
        forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
        map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
    };
    /**
     * Convert a {@link d.VNode} to a {@link d.ChildNode} in order to present a
     * friendlier public interface (hence, 'convertToPublic').
     *
     * @param node the virtual DOM node to convert
     * @returns a converted child node
     */
    const convertToPublic = (node) => ({
        vattrs: node.$attrs$,
        vchildren: node.$children$,
        vkey: node.$key$,
        vname: node.$name$,
        vtag: node.$tag$,
        vtext: node.$text$,
    });
    /**
     * Convert a {@link d.ChildNode} back to an equivalent {@link d.VNode} in
     * order to use the resulting object in the virtual DOM. The initial object was
     * likely created as part of presenting a public API, so converting it back
     * involved making it 'private' again (hence, `convertToPrivate`).
     *
     * @param node the child node to convert
     * @returns a converted virtual DOM node
     */
    const convertToPrivate = (node) => {
        if (typeof node.vtag === 'function') {
            const vnodeData = Object.assign({}, node.vattrs);
            if (node.vkey) {
                vnodeData.key = node.vkey;
            }
            if (node.vname) {
                vnodeData.name = node.vname;
            }
            return h(node.vtag, vnodeData, ...(node.vchildren || []));
        }
        const vnode = newVNode(node.vtag, node.vtext);
        vnode.$attrs$ = node.vattrs;
        vnode.$children$ = node.vchildren;
        vnode.$key$ = node.vkey;
        vnode.$name$ = node.vname;
        return vnode;
    };
    const rootAppliedStyles = /*@__PURE__*/ new WeakMap();
    const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
        var _a;
        let scopeId = getScopeId(cmpMeta, mode);
        const style = styles.get(scopeId);
        // if an element is NOT connected then getRootNode() will return the wrong root node
        // so the fallback is to always use the document for the root node in those cases
        styleContainerNode = styleContainerNode.nodeType === 11 /* NODE_TYPE.DocumentFragment */ ? styleContainerNode : doc;
        if (style) {
            if (typeof style === 'string') {
                styleContainerNode = styleContainerNode.head || styleContainerNode;
                let appliedStyles = rootAppliedStyles.get(styleContainerNode);
                let styleElm;
                if (!appliedStyles) {
                    rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
                }
                if (!appliedStyles.has(scopeId)) {
                    {
                        {
                            styleElm = doc.createElement('style');
                            styleElm.innerHTML = style;
                        }
                        // Apply CSP nonce to the style tag if it exists
                        const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
                        if (nonce != null) {
                            styleElm.setAttribute('nonce', nonce);
                        }
                        styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                    }
                    if (appliedStyles) {
                        appliedStyles.add(scopeId);
                    }
                }
            }
            else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
                styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
            }
        }
        return scopeId;
    };
    const attachStyles = (hostRef) => {
        const cmpMeta = hostRef.$cmpMeta$;
        const elm = hostRef.$hostElement$;
        const flags = cmpMeta.$flags$;
        const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
        const scopeId = addStyle(supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$);
        if (flags & 10 /* CMP_FLAGS.needsScopedEncapsulation */) {
            // only required when we're NOT using native shadow dom (slot)
            // or this browser doesn't support native shadow dom
            // and this host element was NOT created with SSR
            // let's pick out the inner content for slot projection
            // create a node to represent where the original
            // content was first placed, which is useful later on
            // DOM WRITE!!
            elm['s-sc'] = scopeId;
            elm.classList.add(scopeId + '-h');
            if (flags & 2 /* CMP_FLAGS.scopedCssEncapsulation */) {
                elm.classList.add(scopeId + '-s');
            }
        }
        endAttachStyles();
    };
    const getScopeId = (cmp, mode) => 'sc-' + (mode && cmp.$flags$ & 32 /* CMP_FLAGS.hasMode */ ? cmp.$tagName$ + '-' + mode : cmp.$tagName$);
    /**
     * Production setAccessor() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */
    const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
        if (oldValue !== newValue) {
            let isProp = isMemberInElement(elm, memberName);
            let ln = memberName.toLowerCase();
            if (memberName === 'class') {
                const classList = elm.classList;
                const oldClasses = parseClassList(oldValue);
                const newClasses = parseClassList(newValue);
                classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
                classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
            }
            else if (memberName === 'style') {
                // update style attribute, css properties and values
                {
                    for (const prop in oldValue) {
                        if (!newValue || newValue[prop] == null) {
                            if (prop.includes('-')) {
                                elm.style.removeProperty(prop);
                            }
                            else {
                                elm.style[prop] = '';
                            }
                        }
                    }
                }
                for (const prop in newValue) {
                    if (!oldValue || newValue[prop] !== oldValue[prop]) {
                        if (prop.includes('-')) {
                            elm.style.setProperty(prop, newValue[prop]);
                        }
                        else {
                            elm.style[prop] = newValue[prop];
                        }
                    }
                }
            }
            else if (memberName === 'key')
                ;
            else if (memberName === 'ref') {
                // minifier will clean this up
                if (newValue) {
                    newValue(elm);
                }
            }
            else if ((!elm.__lookupSetter__(memberName)) &&
                memberName[0] === 'o' &&
                memberName[1] === 'n') {
                // Event Handlers
                // so if the member name starts with "on" and the 3rd characters is
                // a capital letter, and it's not already a member on the element,
                // then we're assuming it's an event listener
                if (memberName[2] === '-') {
                    // on- prefixed events
                    // allows to be explicit about the dom event to listen without any magic
                    // under the hood:
                    // <my-cmp on-click> // listens for "click"
                    // <my-cmp on-Click> // listens for "Click"
                    // <my-cmp on-ionChange> // listens for "ionChange"
                    // <my-cmp on-EVENTS> // listens for "EVENTS"
                    memberName = memberName.slice(3);
                }
                else if (isMemberInElement(win, ln)) {
                    // standard event
                    // the JSX attribute could have been "onMouseOver" and the
                    // member name "onmouseover" is on the window's prototype
                    // so let's add the listener "mouseover", which is all lowercased
                    memberName = ln.slice(2);
                }
                else {
                    // custom event
                    // the JSX attribute could have been "onMyCustomEvent"
                    // so let's trim off the "on" prefix and lowercase the first character
                    // and add the listener "myCustomEvent"
                    // except for the first character, we keep the event name case
                    memberName = ln[2] + memberName.slice(3);
                }
                if (oldValue) {
                    plt.rel(elm, memberName, oldValue, false);
                }
                if (newValue) {
                    plt.ael(elm, memberName, newValue, false);
                }
            }
            else {
                // Set property if it exists and it's not a SVG
                const isComplex = isComplexType(newValue);
                if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                    try {
                        if (!elm.tagName.includes('-')) {
                            const n = newValue == null ? '' : newValue;
                            // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                            if (memberName === 'list') {
                                isProp = false;
                            }
                            else if (oldValue == null || elm[memberName] != n) {
                                elm[memberName] = n;
                            }
                        }
                        else {
                            elm[memberName] = newValue;
                        }
                    }
                    catch (e) { }
                }
                /**
                 * Need to manually update attribute if:
                 * - memberName is not an attribute
                 * - if we are rendering the host element in order to reflect attribute
                 * - if it's a SVG, since properties might not work in <svg>
                 * - if the newValue is null/undefined or 'false'.
                 */
                let xlink = false;
                {
                    if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                        memberName = ln;
                        xlink = true;
                    }
                }
                if (newValue == null || newValue === false) {
                    if (newValue !== false || elm.getAttribute(memberName) === '') {
                        if (xlink) {
                            elm.removeAttributeNS(XLINK_NS, memberName);
                        }
                        else {
                            elm.removeAttribute(memberName);
                        }
                    }
                }
                else if ((!isProp || flags & 4 /* VNODE_FLAGS.isHost */ || isSvg) && !isComplex) {
                    newValue = newValue === true ? '' : newValue;
                    if (xlink) {
                        elm.setAttributeNS(XLINK_NS, memberName, newValue);
                    }
                    else {
                        elm.setAttribute(memberName, newValue);
                    }
                }
            }
        }
    };
    const parseClassListRegex = /\s/;
    const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
    const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
        // if the element passed in is a shadow root, which is a document fragment
        // then we want to be adding attrs/props to the shadow root's "host" element
        // if it's not a shadow root, then we add attrs/props to the same element
        const elm = newVnode.$elm$.nodeType === 11 /* NODE_TYPE.DocumentFragment */ && newVnode.$elm$.host
            ? newVnode.$elm$.host
            : newVnode.$elm$;
        const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
        const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
        {
            // remove attributes no longer present on the vnode by setting them to undefined
            for (memberName in oldVnodeAttrs) {
                if (!(memberName in newVnodeAttrs)) {
                    setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
                }
            }
        }
        // add new & update changed attributes
        for (memberName in newVnodeAttrs) {
            setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
        }
    };
    /**
     * Create a DOM Node corresponding to one of the children of a given VNode.
     *
     * @param oldParentVNode the parent VNode from the previous render
     * @param newParentVNode the parent VNode from the current render
     * @param childIndex the index of the VNode, in the _new_ parent node's
     * children, for which we will create a new DOM node
     * @param parentElm the parent DOM node which our new node will be a child of
     * @returns the newly created node
     */
    const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
        // tslint:disable-next-line: prefer-const
        const newVNode = newParentVNode.$children$[childIndex];
        let i = 0;
        let elm;
        let childNode;
        let oldVNode;
        if (!useNativeShadowDom) {
            // remember for later we need to check to relocate nodes
            checkSlotRelocate = true;
            if (newVNode.$tag$ === 'slot') {
                if (scopeId) {
                    // scoped css needs to add its scoped id to the parent element
                    parentElm.classList.add(scopeId + '-s');
                }
                newVNode.$flags$ |= newVNode.$children$
                    ? // slot element has fallback content
                        2 /* VNODE_FLAGS.isSlotFallback */
                    : // slot element does not have fallback content
                        1 /* VNODE_FLAGS.isSlotReference */;
            }
        }
        if (newVNode.$text$ !== null) {
            // create text node
            elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
        }
        else if (newVNode.$flags$ & 1 /* VNODE_FLAGS.isSlotReference */) {
            // create a slot reference node
            elm = newVNode.$elm$ =
                doc.createTextNode('');
        }
        else {
            if (!isSvgMode) {
                isSvgMode = newVNode.$tag$ === 'svg';
            }
            // create element
            elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2 /* VNODE_FLAGS.isSlotFallback */
                    ? 'slot-fb'
                    : newVNode.$tag$)
                );
            if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
                isSvgMode = false;
            }
            // add css classes, attrs, props, listeners, etc.
            {
                updateElement(null, newVNode, isSvgMode);
            }
            if (isDef(scopeId) && elm['s-si'] !== scopeId) {
                // if there is a scopeId and this is the initial render
                // then let's add the scopeId as a css class
                elm.classList.add((elm['s-si'] = scopeId));
            }
            if (newVNode.$children$) {
                for (i = 0; i < newVNode.$children$.length; ++i) {
                    // create the node
                    childNode = createElm(oldParentVNode, newVNode, i, elm);
                    // return node could have been null
                    if (childNode) {
                        // append our new node
                        elm.appendChild(childNode);
                    }
                }
            }
            {
                if (newVNode.$tag$ === 'svg') {
                    // Only reset the SVG context when we're exiting <svg> element
                    isSvgMode = false;
                }
                else if (elm.tagName === 'foreignObject') {
                    // Reenter SVG context when we're exiting <foreignObject> element
                    isSvgMode = true;
                }
            }
        }
        {
            elm['s-hn'] = hostTagName;
            if (newVNode.$flags$ & (2 /* VNODE_FLAGS.isSlotFallback */ | 1 /* VNODE_FLAGS.isSlotReference */)) {
                // remember the content reference comment
                elm['s-sr'] = true;
                // remember the content reference comment
                elm['s-cr'] = contentRef;
                // remember the slot name, or empty string for default slot
                elm['s-sn'] = newVNode.$name$ || '';
                // check if we've got an old vnode for this slot
                oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
                if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                    // we've got an old slot vnode and the wrapper is being replaced
                    // so let's move the old slot content back to it's original location
                    putBackInOriginalLocation(oldParentVNode.$elm$, false);
                }
            }
        }
        return elm;
    };
    const putBackInOriginalLocation = (parentElm, recursive) => {
        plt.$flags$ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
        const oldSlotChildNodes = parentElm.childNodes;
        for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
            const childNode = oldSlotChildNodes[i];
            if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
                // // this child node in the old element is from another component
                // // remove this node from the old slot's parent
                // childNode.remove();
                // and relocate it back to it's original location
                parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
                // remove the old original location comment entirely
                // later on the patch function will know what to do
                // and move this to the correct spot in need be
                childNode['s-ol'].remove();
                childNode['s-ol'] = undefined;
                checkSlotRelocate = true;
            }
            if (recursive) {
                putBackInOriginalLocation(childNode, recursive);
            }
        }
        plt.$flags$ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
    };
    /**
     * Create DOM nodes corresponding to a list of {@link d.Vnode} objects and
     * add them to the DOM in the appropriate place.
     *
     * @param parentElm the DOM node which should be used as a parent for the new
     * DOM nodes
     * @param before a child of the `parentElm` which the new children should be
     * inserted before (optional)
     * @param parentVNode the parent virtual DOM node
     * @param vnodes the new child virtual DOM nodes to produce DOM nodes for
     * @param startIdx the index in the child virtual DOM nodes at which to start
     * creating DOM nodes (inclusive)
     * @param endIdx the index in the child virtual DOM nodes at which to stop
     * creating DOM nodes (inclusive)
     */
    const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
        let containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
        let childNode;
        if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
            containerElm = containerElm.shadowRoot;
        }
        for (; startIdx <= endIdx; ++startIdx) {
            if (vnodes[startIdx]) {
                childNode = createElm(null, parentVNode, startIdx, parentElm);
                if (childNode) {
                    vnodes[startIdx].$elm$ = childNode;
                    containerElm.insertBefore(childNode, referenceNode(before) );
                }
            }
        }
    };
    /**
     * Remove the DOM elements corresponding to a list of {@link d.VNode} objects.
     * This can be used to, for instance, clean up after a list of children which
     * should no longer be shown.
     *
     * This function also handles some of Stencil's slot relocation logic.
     *
     * @param vnodes a list of virtual DOM nodes to remove
     * @param startIdx the index at which to start removing nodes (inclusive)
     * @param endIdx the index at which to stop removing nodes (inclusive)
     * @param vnode a VNode
     * @param elm an element
     */
    const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
        for (; startIdx <= endIdx; ++startIdx) {
            if ((vnode = vnodes[startIdx])) {
                elm = vnode.$elm$;
                callNodeRefs(vnode);
                {
                    // we're removing this element
                    // so it's possible we need to show slot fallback content now
                    checkSlotFallbackVisibility = true;
                    if (elm['s-ol']) {
                        // remove the original location comment
                        elm['s-ol'].remove();
                    }
                    else {
                        // it's possible that child nodes of the node
                        // that's being removed are slot nodes
                        putBackInOriginalLocation(elm, true);
                    }
                }
                // remove the vnode's element from the dom
                elm.remove();
            }
        }
    };
    /**
     * Reconcile the children of a new VNode with the children of an old VNode by
     * traversing the two collections of children, identifying nodes that are
     * conserved or changed, calling out to `patch` to make any necessary
     * updates to the DOM, and rearranging DOM nodes as needed.
     *
     * The algorithm for reconciling children works by analyzing two 'windows' onto
     * the two arrays of children (`oldCh` and `newCh`). We keep track of the
     * 'windows' by storing start and end indices and references to the
     * corresponding array entries. Initially the two 'windows' are basically equal
     * to the entire array, but we progressively narrow the windows until there are
     * no children left to update by doing the following:
     *
     * 1. Skip any `null` entries at the beginning or end of the two arrays, so
     *    that if we have an initial array like the following we'll end up dealing
     *    only with a window bounded by the highlighted elements:
     *
     *    [null, null, VNode1 , ... , VNode2, null, null]
     *                 ^^^^^^         ^^^^^^
     *
     * 2. Check to see if the elements at the head and tail positions are equal
     *    across the windows. This will basically detect elements which haven't
     *    been added, removed, or changed position, i.e. if you had the following
     *    VNode elements (represented as HTML):
     *
     *    oldVNode: `<div><p><span>HEY</span></p></div>`
     *    newVNode: `<div><p><span>THERE</span></p></div>`
     *
     *    Then when comparing the children of the `<div>` tag we check the equality
     *    of the VNodes corresponding to the `<p>` tags and, since they are the
     *    same tag in the same position, we'd be able to avoid completely
     *    re-rendering the subtree under them with a new DOM element and would just
     *    call out to `patch` to handle reconciling their children and so on.
     *
     * 3. Check, for both windows, to see if the element at the beginning of the
     *    window corresponds to the element at the end of the other window. This is
     *    a heuristic which will let us identify _some_ situations in which
     *    elements have changed position, for instance it _should_ detect that the
     *    children nodes themselves have not changed but merely moved in the
     *    following example:
     *
     *    oldVNode: `<div><element-one /><element-two /></div>`
     *    newVNode: `<div><element-two /><element-one /></div>`
     *
     *    If we find cases like this then we also need to move the concrete DOM
     *    elements corresponding to the moved children to write the re-order to the
     *    DOM.
     *
     * 4. Finally, if VNodes have the `key` attribute set on them we check for any
     *    nodes in the old children which have the same key as the first element in
     *    our window on the new children. If we find such a node we handle calling
     *    out to `patch`, moving relevant DOM nodes, and so on, in accordance with
     *    what we find.
     *
     * Finally, once we've narrowed our 'windows' to the point that either of them
     * collapse (i.e. they have length 0) we then handle any remaining VNode
     * insertion or deletion that needs to happen to get a DOM state that correctly
     * reflects the new child VNodes. If, for instance, after our window on the old
     * children has collapsed we still have more nodes on the new children that
     * we haven't dealt with yet then we need to add them, or if the new children
     * collapse but we still have unhandled _old_ children then we need to make
     * sure the corresponding DOM nodes are removed.
     *
     * @param parentElm the node into which the parent VNode is rendered
     * @param oldCh the old children of the parent node
     * @param newVNode the new VNode which will replace the parent
     * @param newCh the new children of the parent node
     */
    const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let idxInOld = 0;
        let i = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let node;
        let elmToMove;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                // VNode might have been moved left
                oldStartVnode = oldCh[++oldStartIdx];
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newStartVnode)) {
                // if the start nodes are the same then we should patch the new VNode
                // onto the old one, and increment our `newStartIdx` and `oldStartIdx`
                // indices to reflect that. We don't need to move any DOM Nodes around
                // since things are matched up in order.
                patch(oldStartVnode, newStartVnode);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (isSameVnode(oldEndVnode, newEndVnode)) {
                // likewise, if the end nodes are the same we patch new onto old and
                // decrement our end indices, and also likewise in this case we don't
                // need to move any DOM Nodes.
                patch(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newEndVnode)) {
                // case: "Vnode moved right"
                //
                // We've found that the last node in our window on the new children is
                // the same VNode as the _first_ node in our window on the old children
                // we're dealing with now. Visually, this is the layout of these two
                // nodes:
                //
                // newCh: [..., newStartVnode , ... , newEndVnode , ...]
                //                                    ^^^^^^^^^^^
                // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
                //              ^^^^^^^^^^^^^
                //
                // In this situation we need to patch `newEndVnode` onto `oldStartVnode`
                // and move the DOM element for `oldStartVnode`.
                if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                    putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
                }
                patch(oldStartVnode, newEndVnode);
                // We need to move the element for `oldStartVnode` into a position which
                // will be appropriate for `newEndVnode`. For this we can use
                // `.insertBefore` and `oldEndVnode.$elm$.nextSibling`. If there is a
                // sibling for `oldEndVnode.$elm$` then we want to move the DOM node for
                // `oldStartVnode` between `oldEndVnode` and it's sibling, like so:
                //
                // <old-start-node />
                // <some-intervening-node />
                // <old-end-node />
                // <!-- ->              <-- `oldStartVnode.$elm$` should be inserted here
                // <next-sibling />
                //
                // If instead `oldEndVnode.$elm$` has no sibling then we just want to put
                // the node for `oldStartVnode` at the end of the children of
                // `parentElm`. Luckily, `Node.nextSibling` will return `null` if there
                // aren't any siblings, and passing `null` to `Node.insertBefore` will
                // append it to the children of the parent element.
                parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldEndVnode, newStartVnode)) {
                // case: "Vnode moved left"
                //
                // We've found that the first node in our window on the new children is
                // the same VNode as the _last_ node in our window on the old children.
                // Visually, this is the layout of these two nodes:
                //
                // newCh: [..., newStartVnode , ... , newEndVnode , ...]
                //              ^^^^^^^^^^^^^
                // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
                //                                    ^^^^^^^^^^^
                //
                // In this situation we need to patch `newStartVnode` onto `oldEndVnode`
                // (which will handle updating any changed attributes, reconciling their
                // children etc) but we also need to move the DOM node to which
                // `oldEndVnode` corresponds.
                if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                    putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
                }
                patch(oldEndVnode, newStartVnode);
                // We've already checked above if `oldStartVnode` and `newStartVnode` are
                // the same node, so since we're here we know that they are not. Thus we
                // can move the element for `oldEndVnode` _before_ the element for
                // `oldStartVnode`, leaving `oldStartVnode` to be reconciled in the
                // future.
                parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // Here we do some checks to match up old and new nodes based on the
                // `$key$` attribute, which is set by putting a `key="my-key"` attribute
                // in the JSX for a DOM element in the implementation of a Stencil
                // component.
                //
                // First we check to see if there are any nodes in the array of old
                // children which have the same key as the first node in the new
                // children.
                idxInOld = -1;
                {
                    for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                        if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                            idxInOld = i;
                            break;
                        }
                    }
                }
                if (idxInOld >= 0) {
                    // We found a node in the old children which matches up with the first
                    // node in the new children! So let's deal with that
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                        // the tag doesn't match so we'll need a new DOM element
                        node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                    }
                    else {
                        patch(elmToMove, newStartVnode);
                        // invalidate the matching old node so that we won't try to update it
                        // again later on
                        oldCh[idxInOld] = undefined;
                        node = elmToMove.$elm$;
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    // We either didn't find an element in the old children that matches
                    // the key of the first new child OR the build is not using `key`
                    // attributes at all. In either case we need to create a new element
                    // for the new node.
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                    newStartVnode = newCh[++newStartIdx];
                }
                if (node) {
                    // if we created a new node then handle inserting it to the DOM
                    {
                        parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                    }
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            // we have some more new nodes to add which don't match up with old nodes
            addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
        }
        else if (newStartIdx > newEndIdx) {
            // there are nodes in the `oldCh` array which no longer correspond to nodes
            // in the new array, so lets remove them (which entails cleaning up the
            // relevant DOM nodes)
            removeVnodes(oldCh, oldStartIdx, oldEndIdx);
        }
    };
    /**
     * Compare two VNodes to determine if they are the same
     *
     * **NB**: This function is an equality _heuristic_ based on the available
     * information set on the two VNodes and can be misleading under certain
     * circumstances. In particular, if the two nodes do not have `key` attrs
     * (available under `$key$` on VNodes) then the function falls back on merely
     * checking that they have the same tag.
     *
     * So, in other words, if `key` attrs are not set on VNodes which may be
     * changing order within a `children` array or something along those lines then
     * we could obtain a false negative and then have to do needless re-rendering
     * (i.e. we'd say two VNodes aren't equal when in fact they should be).
     *
     * @param leftVNode the first VNode to check
     * @param rightVNode the second VNode to check
     * @returns whether they're equal or not
     */
    const isSameVnode = (leftVNode, rightVNode) => {
        // compare if two vnode to see if they're "technically" the same
        // need to have the same element tag, and same key to be the same
        if (leftVNode.$tag$ === rightVNode.$tag$) {
            if (leftVNode.$tag$ === 'slot') {
                return leftVNode.$name$ === rightVNode.$name$;
            }
            // this will be set if components in the build have `key` attrs set on them
            {
                return leftVNode.$key$ === rightVNode.$key$;
            }
        }
        return false;
    };
    const referenceNode = (node) => {
        // this node was relocated to a new location in the dom
        // because of some other component's slot
        // but we still have an html comment in place of where
        // it's original location was according to it's original vdom
        return (node && node['s-ol']) || node;
    };
    const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
    /**
     * Handle reconciling an outdated VNode with a new one which corresponds to
     * it. This function handles flushing updates to the DOM and reconciling the
     * children of the two nodes (if any).
     *
     * @param oldVNode an old VNode whose DOM element and children we want to update
     * @param newVNode a new VNode representing an updated version of the old one
     */
    const patch = (oldVNode, newVNode) => {
        const elm = (newVNode.$elm$ = oldVNode.$elm$);
        const oldChildren = oldVNode.$children$;
        const newChildren = newVNode.$children$;
        const tag = newVNode.$tag$;
        const text = newVNode.$text$;
        let defaultHolder;
        if (text === null) {
            {
                // test if we're rendering an svg element, or still rendering nodes inside of one
                // only add this to the when the compiler sees we're using an svg somewhere
                isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
            }
            {
                if (tag === 'slot')
                    ;
                else {
                    // either this is the first render of an element OR it's an update
                    // AND we already know it's possible it could have changed
                    // this updates the element's css classes, attrs, props, listeners, etc.
                    updateElement(oldVNode, newVNode, isSvgMode);
                }
            }
            if (oldChildren !== null && newChildren !== null) {
                // looks like there's child vnodes for both the old and new vnodes
                // so we need to call `updateChildren` to reconcile them
                updateChildren(elm, oldChildren, newVNode, newChildren);
            }
            else if (newChildren !== null) {
                // no old child vnodes, but there are new child vnodes to add
                if (oldVNode.$text$ !== null) {
                    // the old vnode was text, so be sure to clear it out
                    elm.textContent = '';
                }
                // add the new vnode children
                addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
            }
            else if (oldChildren !== null) {
                // no new child vnodes, but there are old child vnodes to remove
                removeVnodes(oldChildren, 0, oldChildren.length - 1);
            }
            if (isSvgMode && tag === 'svg') {
                isSvgMode = false;
            }
        }
        else if ((defaultHolder = elm['s-cr'])) {
            // this element has slotted content
            defaultHolder.parentNode.textContent = text;
        }
        else if (oldVNode.$text$ !== text) {
            // update the text content for the text only vnode
            // and also only if the text is different than before
            elm.data = text;
        }
    };
    const updateFallbackSlotVisibility = (elm) => {
        // tslint:disable-next-line: prefer-const
        const childNodes = elm.childNodes;
        let childNode;
        let i;
        let ilen;
        let j;
        let slotNameAttr;
        let nodeType;
        for (i = 0, ilen = childNodes.length; i < ilen; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 1 /* NODE_TYPE.ElementNode */) {
                if (childNode['s-sr']) {
                    // this is a slot fallback node
                    // get the slot name for this slot reference node
                    slotNameAttr = childNode['s-sn'];
                    // by default always show a fallback slot node
                    // then hide it if there are other slots in the light dom
                    childNode.hidden = false;
                    for (j = 0; j < ilen; j++) {
                        nodeType = childNodes[j].nodeType;
                        if (childNodes[j]['s-hn'] !== childNode['s-hn'] || slotNameAttr !== '') {
                            // this sibling node is from a different component OR is a named fallback slot node
                            if (nodeType === 1 /* NODE_TYPE.ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                        else {
                            // this is a default fallback slot node
                            // any element or text node (with content)
                            // should hide the default fallback slot node
                            if (nodeType === 1 /* NODE_TYPE.ElementNode */ ||
                                (nodeType === 3 /* NODE_TYPE.TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                    }
                }
                // keep drilling down
                updateFallbackSlotVisibility(childNode);
            }
        }
    };
    const relocateNodes = [];
    const relocateSlotContent = (elm) => {
        // tslint:disable-next-line: prefer-const
        let childNode;
        let node;
        let hostContentNodes;
        let slotNameAttr;
        let relocateNodeData;
        let j;
        let i = 0;
        const childNodes = elm.childNodes;
        const ilen = childNodes.length;
        for (; i < ilen; i++) {
            childNode = childNodes[i];
            if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
                // first got the content reference comment node
                // then we got it's parent, which is where all the host content is in now
                hostContentNodes = node.parentNode.childNodes;
                slotNameAttr = childNode['s-sn'];
                for (j = hostContentNodes.length - 1; j >= 0; j--) {
                    node = hostContentNodes[j];
                    if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                        // let's do some relocating to its new home
                        // but never relocate a content reference node
                        // that is suppose to always represent the original content location
                        if (isNodeLocatedInSlot(node, slotNameAttr)) {
                            // it's possible we've already decided to relocate this node
                            relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                            // made some changes to slots
                            // let's make sure we also double check
                            // fallbacks are correctly hidden or shown
                            checkSlotFallbackVisibility = true;
                            node['s-sn'] = node['s-sn'] || slotNameAttr;
                            if (relocateNodeData) {
                                // previously we never found a slot home for this node
                                // but turns out we did, so let's remember it now
                                relocateNodeData.$slotRefNode$ = childNode;
                            }
                            else {
                                // add to our list of nodes to relocate
                                relocateNodes.push({
                                    $slotRefNode$: childNode,
                                    $nodeToRelocate$: node,
                                });
                            }
                            if (node['s-sr']) {
                                relocateNodes.map((relocateNode) => {
                                    if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                        relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                                        if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                            relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                        }
                                    }
                                });
                            }
                        }
                        else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
                            // so far this element does not have a slot home, not setting slotRefNode on purpose
                            // if we never find a home for this element then we'll need to hide it
                            relocateNodes.push({
                                $nodeToRelocate$: node,
                            });
                        }
                    }
                }
            }
            if (childNode.nodeType === 1 /* NODE_TYPE.ElementNode */) {
                relocateSlotContent(childNode);
            }
        }
    };
    const isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
        if (nodeToRelocate.nodeType === 1 /* NODE_TYPE.ElementNode */) {
            if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
                return true;
            }
            if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
                return true;
            }
            return false;
        }
        if (nodeToRelocate['s-sn'] === slotNameAttr) {
            return true;
        }
        return slotNameAttr === '';
    };
    const callNodeRefs = (vNode) => {
        {
            vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
            vNode.$children$ && vNode.$children$.map(callNodeRefs);
        }
    };
    /**
     * The main entry point for Stencil's virtual DOM-based rendering engine
     *
     * Given a {@link d.HostRef} container and some virtual DOM nodes, this
     * function will handle creating a virtual DOM tree with a single root, patching
     * the current virtual DOM tree onto an old one (if any), dealing with slot
     * relocation, and reflecting attributes.
     *
     * @param hostRef data needed to root and render the virtual DOM tree, such as
     * the DOM node into which it should be rendered.
     * @param renderFnResults the virtual DOM nodes to be rendered
     */
    const renderVdom = (hostRef, renderFnResults) => {
        const hostElm = hostRef.$hostElement$;
        const cmpMeta = hostRef.$cmpMeta$;
        const oldVNode = hostRef.$vnode$ || newVNode(null, null);
        const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
        hostTagName = hostElm.tagName;
        if (cmpMeta.$attrsToReflect$) {
            rootVnode.$attrs$ = rootVnode.$attrs$ || {};
            cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
        }
        rootVnode.$tag$ = null;
        rootVnode.$flags$ |= 4 /* VNODE_FLAGS.isHost */;
        hostRef.$vnode$ = rootVnode;
        rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
        {
            scopeId = hostElm['s-sc'];
        }
        {
            contentRef = hostElm['s-cr'];
            useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) !== 0;
            // always reset
            checkSlotFallbackVisibility = false;
        }
        // synchronous patch
        patch(oldVNode, rootVnode);
        {
            // while we're moving nodes around existing nodes, temporarily disable
            // the disconnectCallback from working
            plt.$flags$ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
            if (checkSlotRelocate) {
                relocateSlotContent(rootVnode.$elm$);
                let relocateData;
                let nodeToRelocate;
                let orgLocationNode;
                let parentNodeRef;
                let insertBeforeNode;
                let refNode;
                let i = 0;
                for (; i < relocateNodes.length; i++) {
                    relocateData = relocateNodes[i];
                    nodeToRelocate = relocateData.$nodeToRelocate$;
                    if (!nodeToRelocate['s-ol']) {
                        // add a reference node marking this node's original location
                        // keep a reference to this node for later lookups
                        orgLocationNode =
                            doc.createTextNode('');
                        orgLocationNode['s-nr'] = nodeToRelocate;
                        nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                    }
                }
                for (i = 0; i < relocateNodes.length; i++) {
                    relocateData = relocateNodes[i];
                    nodeToRelocate = relocateData.$nodeToRelocate$;
                    if (relocateData.$slotRefNode$) {
                        // by default we're just going to insert it directly
                        // after the slot reference node
                        parentNodeRef = relocateData.$slotRefNode$.parentNode;
                        insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                        orgLocationNode = nodeToRelocate['s-ol'];
                        while ((orgLocationNode = orgLocationNode.previousSibling)) {
                            refNode = orgLocationNode['s-nr'];
                            if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                                refNode = refNode.nextSibling;
                                if (!refNode || !refNode['s-nr']) {
                                    insertBeforeNode = refNode;
                                    break;
                                }
                            }
                        }
                        if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) ||
                            nodeToRelocate.nextSibling !== insertBeforeNode) {
                            // we've checked that it's worth while to relocate
                            // since that the node to relocate
                            // has a different next sibling or parent relocated
                            if (nodeToRelocate !== insertBeforeNode) {
                                if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                    // probably a component in the index.html that doesn't have it's hostname set
                                    nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                                }
                                // add it back to the dom but in its new home
                                parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                            }
                        }
                    }
                    else {
                        // this node doesn't have a slot home to go to, so let's hide it
                        if (nodeToRelocate.nodeType === 1 /* NODE_TYPE.ElementNode */) {
                            nodeToRelocate.hidden = true;
                        }
                    }
                }
            }
            if (checkSlotFallbackVisibility) {
                updateFallbackSlotVisibility(rootVnode.$elm$);
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.$flags$ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
            // always reset
            relocateNodes.length = 0;
        }
    };
    const attachToAncestor = (hostRef, ancestorComponent) => {
    };
    const scheduleUpdate = (hostRef, isInitialLoad) => {
        if (BUILD.taskQueue && BUILD.updatable) {
            hostRef.$flags$ |= 16 /* HOST_FLAGS.isQueuedForUpdate */;
        }
        attachToAncestor(hostRef, hostRef.$ancestorComponent$);
        // there is no ancestor component or the ancestor component
        // has already fired off its lifecycle update then
        // fire off the initial update
        const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
        return writeTask(dispatch) ;
    };
    const dispatchHooks = (hostRef, isInitialLoad) => {
        const elm = hostRef.$hostElement$;
        const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
        const instance = elm;
        let promise;
        if (isInitialLoad) {
            {
                promise = safeCall(instance, 'componentWillLoad');
            }
        }
        else {
            {
                promise = safeCall(instance, 'componentWillUpdate');
            }
        }
        {
            promise = then(promise, () => safeCall(instance, 'componentWillRender'));
        }
        endSchedule();
        return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
    };
    const updateComponent = async (hostRef, instance, isInitialLoad) => {
        // updateComponent
        const elm = hostRef.$hostElement$;
        const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
        elm['s-rc'];
        if (isInitialLoad) {
            // DOM WRITE!
            attachStyles(hostRef);
        }
        const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
        {
            callRender(hostRef, instance, elm);
        }
        endRender();
        endUpdate();
        {
            postUpdateComponent(hostRef);
        }
    };
    const callRender = (hostRef, instance, elm) => {
        // in order for bundlers to correctly treeshake the BUILD object
        // we need to ensure BUILD is not deoptimized within a try/catch
        // https://rollupjs.org/guide/en/#treeshake tryCatchDeoptimization
        const allRenderFn = false;
        const lazyLoad = false;
        const taskQueue = true ;
        const updatable = true ;
        try {
            renderingRef = instance;
            instance = allRenderFn ? instance.render() : instance.render && instance.render();
            if (updatable && taskQueue) {
                hostRef.$flags$ &= ~16 /* HOST_FLAGS.isQueuedForUpdate */;
            }
            if (updatable || lazyLoad) {
                hostRef.$flags$ |= 2 /* HOST_FLAGS.hasRendered */;
            }
            if (BUILD.hasRenderFn || BUILD.reflect) {
                if (BUILD.vdomRender || BUILD.reflect) {
                    // looks like we've got child nodes to render into this host element
                    // or we need to update the css class/attrs on the host element
                    // DOM WRITE!
                    if (BUILD.hydrateServerSide) ;
                    else {
                        renderVdom(hostRef, instance);
                    }
                }
            }
        }
        catch (e) {
            consoleError(e, hostRef.$hostElement$);
        }
        renderingRef = null;
        return null;
    };
    const getRenderingRef = () => renderingRef;
    const postUpdateComponent = (hostRef) => {
        const tagName = hostRef.$cmpMeta$.$tagName$;
        const elm = hostRef.$hostElement$;
        const endPostUpdate = createTime('postUpdate', tagName);
        const instance = elm;
        hostRef.$ancestorComponent$;
        {
            safeCall(instance, 'componentDidRender');
        }
        if (!(hostRef.$flags$ & 64 /* HOST_FLAGS.hasLoadedComponent */)) {
            hostRef.$flags$ |= 64 /* HOST_FLAGS.hasLoadedComponent */;
            {
                safeCall(instance, 'componentDidLoad');
            }
            endPostUpdate();
        }
        else {
            {
                safeCall(instance, 'componentDidUpdate');
            }
            endPostUpdate();
        }
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
    };
    const forceUpdate = (ref) => {
        if (BUILD.updatable) {
            const hostRef = getHostRef(ref);
            const isConnected = hostRef.$hostElement$.isConnected;
            if (isConnected &&
                (hostRef.$flags$ & (2 /* HOST_FLAGS.hasRendered */ | 16 /* HOST_FLAGS.isQueuedForUpdate */)) === 2 /* HOST_FLAGS.hasRendered */) {
                scheduleUpdate(hostRef, false);
            }
            // Returns "true" when the forced update was successfully scheduled
            return isConnected;
        }
        return false;
    };
    const safeCall = (instance, method, arg) => {
        if (instance && instance[method]) {
            try {
                return instance[method](arg);
            }
            catch (e) {
                consoleError(e);
            }
        }
        return undefined;
    };
    const then = (promise, thenFn) => {
        return promise && promise.then ? promise.then(thenFn) : thenFn();
    };
    const hostRefs = /*@__PURE__*/ new WeakMap();
    const getHostRef = (ref) => hostRefs.get(ref);
    const isMemberInElement = (elm, memberName) => memberName in elm;
    const consoleError = (e, el) => (0, console.error)(e, el);
    BUILD.isTesting
        ? ['STENCIL:'] // E2E testing
        : [
            '%cstencil',
            'color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px',
        ];
    const styles = /*@__PURE__*/ new Map();
    const win = typeof window !== 'undefined' ? window : {};
    BUILD.cssVarShim ? win.CSS : null;
    const doc = win.document || { head: {} };
    (win.HTMLElement || class {
    });
    const plt = {
        $flags$: 0,
        $resourcesUrl$: '',
        jmp: (h) => h(),
        raf: (h) => requestAnimationFrame(h),
        ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
        rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
        ce: (eventName, opts) => new CustomEvent(eventName, opts),
    };
    const supportsShadow = BUILD.shadowDomShim && BUILD.shadowDom
        ? /*@__PURE__*/ (() => (doc.head.attachShadow + '').indexOf('[native') > -1)()
        : true;
    const promiseResolve = (v) => Promise.resolve(v);
    BUILD.constructableCSS
        ? /*@__PURE__*/ (() => {
            try {
                new CSSStyleSheet();
                return typeof new CSSStyleSheet().replaceSync === 'function';
            }
            catch (e) { }
            return false;
        })()
        : false;
    const queueDomReads = [];
    const queueDomWrites = [];
    const queueTask = (queue, write) => (cb) => {
        queue.push(cb);
        if (!queuePending) {
            queuePending = true;
            if (write && plt.$flags$ & 4 /* PLATFORM_FLAGS.queueSync */) {
                nextTick(flush);
            }
            else {
                plt.raf(flush);
            }
        }
    };
    const consume = (queue) => {
        for (let i = 0; i < queue.length; i++) {
            try {
                queue[i](performance.now());
            }
            catch (e) {
                consoleError(e);
            }
        }
        queue.length = 0;
    };
    const flush = () => {
        // always force a bunch of medium callbacks to run, but still have
        // a throttle on how many can run in a certain time
        // DOM READS!!!
        consume(queueDomReads);
        // DOM WRITES!!!
        {
            consume(queueDomWrites);
            if ((queuePending = queueDomReads.length > 0)) {
                // still more to do yet, but we've run out of time
                // let's let this thing cool off and try again in the next tick
                plt.raf(flush);
            }
        }
    };
    const nextTick =  (cb) => promiseResolve().then(cb);
    const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

    const appendToMap = (map, propName, value) => {
        const items = map.get(propName);
        if (!items) {
            map.set(propName, [value]);
        }
        else if (!items.includes(value)) {
            items.push(value);
        }
    };
    const debounce = (fn, ms) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                timeoutId = 0;
                fn(...args);
            }, ms);
        };
    };

    /**
     * Check if a possible element isConnected.
     * The property might not be there, so we check for it.
     *
     * We want it to return true if isConnected is not a property,
     * otherwise we would remove these elements and would not update.
     *
     * Better leak in Edge than to be useless.
     */
    const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
    const cleanupElements = debounce((map) => {
        for (let key of map.keys()) {
            map.set(key, map.get(key).filter(isConnected));
        }
    }, 2000);
    const stencilSubscription = () => {
        if (typeof getRenderingRef !== 'function') {
            // If we are not in a stencil project, we do nothing.
            // This function is not really exported by @stencil/core.
            return {};
        }
        const elmsToUpdate = new Map();
        return {
            dispose: () => elmsToUpdate.clear(),
            get: (propName) => {
                const elm = getRenderingRef();
                if (elm) {
                    appendToMap(elmsToUpdate, propName, elm);
                }
            },
            set: (propName) => {
                const elements = elmsToUpdate.get(propName);
                if (elements) {
                    elmsToUpdate.set(propName, elements.filter(forceUpdate));
                }
                cleanupElements(elmsToUpdate);
            },
            reset: () => {
                elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
                cleanupElements(elmsToUpdate);
            },
        };
    };

    const unwrap = (val) => (typeof val === 'function' ? val() : val);
    const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
        const unwrappedState = unwrap(defaultState);
        let states = new Map(Object.entries(unwrappedState !== null && unwrappedState !== void 0 ? unwrappedState : {}));
        const handlers = {
            dispose: [],
            get: [],
            set: [],
            reset: [],
        };
        const reset = () => {
            var _a;
            // When resetting the state, the default state may be a function - unwrap it to invoke it.
            // otherwise, the state won't be properly reset
            states = new Map(Object.entries((_a = unwrap(defaultState)) !== null && _a !== void 0 ? _a : {}));
            handlers.reset.forEach((cb) => cb());
        };
        const dispose = () => {
            // Call first dispose as resetting the state would
            // cause less updates ;)
            handlers.dispose.forEach((cb) => cb());
            reset();
        };
        const get = (propName) => {
            handlers.get.forEach((cb) => cb(propName));
            return states.get(propName);
        };
        const set = (propName, value) => {
            const oldValue = states.get(propName);
            if (shouldUpdate(value, oldValue, propName)) {
                states.set(propName, value);
                handlers.set.forEach((cb) => cb(propName, value, oldValue));
            }
        };
        const state = (typeof Proxy === 'undefined'
            ? {}
            : new Proxy(unwrappedState, {
                get(_, propName) {
                    return get(propName);
                },
                ownKeys(_) {
                    return Array.from(states.keys());
                },
                getOwnPropertyDescriptor() {
                    return {
                        enumerable: true,
                        configurable: true,
                    };
                },
                has(_, propName) {
                    return states.has(propName);
                },
                set(_, propName, value) {
                    set(propName, value);
                    return true;
                },
            }));
        const on = (eventName, callback) => {
            handlers[eventName].push(callback);
            return () => {
                removeFromArray(handlers[eventName], callback);
            };
        };
        const onChange = (propName, cb) => {
            const unSet = on('set', (key, newValue) => {
                if (key === propName) {
                    cb(newValue);
                }
            });
            // We need to unwrap the defaultState because it might be a function.
            // Otherwise we might not be sending the right reset value.
            const unReset = on('reset', () => cb(unwrap(defaultState)[propName]));
            return () => {
                unSet();
                unReset();
            };
        };
        const use = (...subscriptions) => {
            const unsubs = subscriptions.reduce((unsubs, subscription) => {
                if (subscription.set) {
                    unsubs.push(on('set', subscription.set));
                }
                if (subscription.get) {
                    unsubs.push(on('get', subscription.get));
                }
                if (subscription.reset) {
                    unsubs.push(on('reset', subscription.reset));
                }
                if (subscription.dispose) {
                    unsubs.push(on('dispose', subscription.dispose));
                }
                return unsubs;
            }, []);
            return () => unsubs.forEach((unsub) => unsub());
        };
        const forceUpdate = (key) => {
            const oldValue = states.get(key);
            handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
        };
        return {
            state,
            get,
            set,
            on,
            onChange,
            use,
            dispose,
            reset,
            forceUpdate,
        };
    };
    const removeFromArray = (array, item) => {
        const index = array.indexOf(item);
        if (index >= 0) {
            array[index] = array[array.length - 1];
            array.length--;
        }
    };

    const createStore = (defaultState, shouldUpdate) => {
        const map = createObservableMap(defaultState, shouldUpdate);
        map.use(stencilSubscription());
        return map;
    };

    const configStore = createStore({
        portal: null,
        user: null,
        api: 4,
        scale: "m"
    });
    const configState = configStore.state;

    /* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    var isBrowser = typeof window !== 'undefined';
    // allow consuming libraries to provide their own Promise implementations
    var utils = {
        Promise: isBrowser ? window['Promise'] : undefined
    };

    /* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    var DEFAULT_VERSION = '4.24';
    var NEXT = 'next';
    function parseVersion(version) {
        if (version.toLowerCase() === NEXT) {
            return NEXT;
        }
        var match = version && version.match(/^(\d)\.(\d+)/);
        return match && {
            major: parseInt(match[1], 10),
            minor: parseInt(match[2], 10)
        };
    }
    /**
     * Get the CDN url for a given version
     *
     * @param version Ex: '4.24' or '3.41'. Defaults to the latest 4.x version.
     */
    function getCdnUrl(version) {
        if (version === void 0) { version = DEFAULT_VERSION; }
        return "https://js.arcgis.com/".concat(version, "/");
    }
    /**
     * Get the CDN url for a the CSS for a given version and/or theme
     *
     * @param version Ex: '4.24', '3.41', or 'next'. Defaults to the latest 4.x version.
     */
    function getCdnCssUrl(version) {
        if (version === void 0) { version = DEFAULT_VERSION; }
        var baseUrl = getCdnUrl(version);
        var parsedVersion = parseVersion(version);
        if (parsedVersion !== NEXT && parsedVersion.major === 3) {
            // NOTE: at 3.11 the CSS moved from the /js folder to the root
            var path = parsedVersion.minor <= 10 ? 'js/' : '';
            return "".concat(baseUrl).concat(path, "esri/css/esri.css");
        }
        else {
            // assume 4.x
            return "".concat(baseUrl, "esri/themes/light/main.css");
        }
    }

    /* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    function createStylesheetLink(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        return link;
    }
    function insertLink(link, before) {
        if (before) {
            // the link should be inserted before a specific node
            var beforeNode = document.querySelector(before);
            beforeNode.parentNode.insertBefore(link, beforeNode);
        }
        else {
            // append the link to then end of the head tag
            document.head.appendChild(link);
        }
    }
    // check if the css url has been injected or added manually
    function getCss(url) {
        return document.querySelector("link[href*=\"".concat(url, "\"]"));
    }
    function getCssUrl(urlOrVersion) {
        return !urlOrVersion || parseVersion(urlOrVersion)
            // if it's a valid version string return the CDN URL
            ? getCdnCssUrl(urlOrVersion)
            // otherwise assume it's a URL and return that
            : urlOrVersion;
    }
    // lazy load the CSS needed for the ArcGIS API
    function loadCss(urlOrVersion, before) {
        var url = getCssUrl(urlOrVersion);
        var link = getCss(url);
        if (!link) {
            // create & load the css link
            link = createStylesheetLink(url);
            insertLink(link, before);
        }
        return link;
    }

    /* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    var defaultOptions = {};
    function createScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.setAttribute('data-esri-loader', 'loading');
        return script;
    }
    // add a one-time load handler to script
    // and optionally add a one time error handler as well
    function handleScriptLoad(script, callback, errback) {
        var onScriptError;
        if (errback) {
            // set up an error handler as well
            onScriptError = handleScriptError(script, errback);
        }
        var onScriptLoad = function () {
            // pass the script to the callback
            callback(script);
            // remove this event listener
            script.removeEventListener('load', onScriptLoad, false);
            if (onScriptError) {
                // remove the error listener as well
                script.removeEventListener('error', onScriptError, false);
            }
        };
        script.addEventListener('load', onScriptLoad, false);
    }
    // add a one-time error handler to the script
    function handleScriptError(script, callback) {
        var onScriptError = function (e) {
            // reject the promise and remove this event listener
            callback(e.error || new Error("There was an error attempting to load ".concat(script.src)));
            // remove this event listener
            script.removeEventListener('error', onScriptError, false);
        };
        script.addEventListener('error', onScriptError, false);
        return onScriptError;
    }
    // get the script injected by this library
    function getScript() {
        return document.querySelector('script[data-esri-loader]');
    }
    // has ArcGIS API been loaded on the page yet?
    function isLoaded() {
        var globalRequire = window['require'];
        // .on() ensures that it's Dojo's AMD loader
        return globalRequire && globalRequire.on;
    }
    // load the ArcGIS API on the page
    function loadScript(options) {
        if (options === void 0) { options = {}; }
        // we would have liked to use spread like { ...defaultOptions, ...options }
        // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
        // if we have another occasion to use spread, let's do that and replace this for...in
        var opts = {};
        [defaultOptions, options].forEach(function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    opts[prop] = obj[prop];
                }
            }
        });
        // URL to load
        var version = opts.version;
        var url = opts.url || getCdnUrl(version);
        return new utils.Promise(function (resolve, reject) {
            var script = getScript();
            if (script) {
                // the API is already loaded or in the process of loading...
                // NOTE: have to test against scr attribute value, not script.src
                // b/c the latter will return the full url for relative paths
                var src = script.getAttribute('src');
                if (src !== url) {
                    // potentially trying to load a different version of the API
                    reject(new Error("The ArcGIS API for JavaScript is already loaded (".concat(src, ").")));
                }
                else {
                    if (isLoaded()) {
                        // the script has already successfully loaded
                        resolve(script);
                    }
                    else {
                        // wait for the script to load and then resolve
                        handleScriptLoad(script, resolve, reject);
                    }
                }
            }
            else {
                if (isLoaded()) {
                    // the API has been loaded by some other means
                    // potentially trying to load a different version of the API
                    reject(new Error("The ArcGIS API for JavaScript is already loaded."));
                }
                else {
                    // this is the first time attempting to load the API
                    var css = opts.css;
                    if (css) {
                        var useVersion = css === true;
                        // load the css before loading the script
                        loadCss(useVersion ? version : css, opts.insertCssBefore);
                    }
                    // create a script object whose source points to the API
                    script = createScript(url);
                    // _currentUrl = url;
                    // once the script is loaded...
                    handleScriptLoad(script, function () {
                        // update the status of the script
                        script.setAttribute('data-esri-loader', 'loaded');
                        // return the script
                        resolve(script);
                    }, reject);
                    // load the script
                    document.body.appendChild(script);
                }
            }
        });
    }

    /* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    // wrap Dojo's require() in a promise
    function requireModules(modules) {
        return new utils.Promise(function (resolve, reject) {
            // If something goes wrong loading the esri/dojo scripts, reject with the error.
            var errorHandler = window['require'].on('error', reject);
            window['require'](modules, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // remove error handler
                errorHandler.remove();
                // Resolve with the parameters from dojo require as an array.
                resolve(args);
            });
        });
    }
    // returns a promise that resolves with an array of the required modules
    // also will attempt to lazy load the ArcGIS API if it has not already been loaded
    function loadModules$1(modules, loadScriptOptions) {
        if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
        if (!isLoaded()) {
            // script is not yet loaded, is it in the process of loading?
            var script = getScript();
            var src = script && script.getAttribute('src');
            if (!loadScriptOptions.url && src) {
                // script is still loading and user did not specify a URL
                // in this case we want to default to the URL that's being loaded
                // instead of defaulting to the latest 4.x URL
                loadScriptOptions.url = src;
            }
            // attempt to load the script then load the modules
            return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
        }
        else {
            // script is already loaded, just load the modules
            return requireModules(modules);
        }
    }

    /**
     * Call a function only after it has not been called for n milliseconds
     * @param fn    - function to call
     * @param delay - delay in milliseconds
     */
    const arrayToLookupMap = (dataArr, getKeyAndItem) => Object.fromEntries((dataArr || []).map((item) => {
        const { key, data } = getKeyAndItem(item);
        return [key, data];
    }));
    function uniqueBy(myArr, getItemId) {
        const resultArr = [];
        const lookupMap = {};
        myArr.forEach((item) => {
            const id = getItemId(item);
            if (lookupMap[id] == null) {
                lookupMap[id] = item;
                resultArr.push(item);
            }
        });
        return resultArr;
    }

    const loadModules = async (moduleNames, options) => {
        const mods = await loadModules$1(moduleNames, options);
        return mods.map((mod) => (mod.__esModule && mod.default ? mod.default : mod));
    };

    function getToken(portal) {
        var _a, _b, _c, _d;
        portal !== null && portal !== void 0 ? portal : (portal = configState === null || configState === void 0 ? void 0 : configState.portal);
        return (((_a = portal === null || portal === void 0 ? void 0 : portal.credential) === null || _a === void 0 ? void 0 : _a.token) || (portal === null || portal === void 0 ? void 0 : portal.token) || ((_c = (_b = portal === null || portal === void 0 ? void 0 : portal.user) === null || _b === void 0 ? void 0 : _b.credential) === null || _c === void 0 ? void 0 : _c.token) || ((_d = portal === null || portal === void 0 ? void 0 : portal.portalUser) === null || _d === void 0 ? void 0 : _d.token) || "");
    }

    function useSSL(url) {
        var _a;
        const { config } = configState;
        // if user logged in via pop-up in viewer, the page might still be under http but the self response might have allSSL
        if (window.location.protocol === "https:" || ((_a = config === null || config === void 0 ? void 0 : config.self) === null || _a === void 0 ? void 0 : _a.allSSL) === true) {
            return url.replace("http:", "https:");
        }
        return url;
    }
    async function request(url, params = {}, options = {}, method, extraOption) {
        const [esriRequest] = await loadModules(["esri/request"]);
        // TODO: refactor this dude out
        const { api, portal } = configState;
        const content = Object.assign({}, params);
        if (!url.includes("f=") && (extraOption === null || extraOption === void 0 ? void 0 : extraOption.excludeJson) !== true) {
            content.f = "json";
        }
        if (options.addTokenManually !== false) {
            const token = await getPortalToken(portal, api);
            content.token = token;
        }
        const requestUrl = options.addSSL === false ? url : useSSL(url);
        if (api === 3) {
            const v3Request = Object.assign({ url: requestUrl, content, timeout: options.timeout || 0 }, extraOption === null || extraOption === void 0 ? void 0 : extraOption.v3Request);
            if (options.withCredentials) {
                v3Request.withCredentials = options.withCredentials;
            }
            const v3Options = method === "post" ? Object.assign({ usePost: true }, options) : options;
            return esriRequest(v3Request, v3Options);
        }
        else {
            const v4Options = Object.assign(Object.assign(Object.assign({ query: content, method: method || "auto" }, options), { timeout: options.timeout || 0 }), ((options === null || options === void 0 ? void 0 : options.disableIdentityLookup) ? { authMode: "anonymous" } : {}));
            const response = await esriRequest(requestUrl, v4Options);
            return response.data;
        }
    }

    const cache = {};
    const requestCache = {};
    const cacheMetadata = {};
    /**
     * Allows memory caching of requests which are expected to be called multiple times
     * @param requester - function which fetches the data to be cached
     * @param key - unique global name for this cache type - see {@link CacheType}
     * @param id - unique id for this result inside this particular cache
     */
    async function fromCache(requester, key, id, cacheOption) {
        var _a, _b, _c, _d;
        const cacheExpirationTime = (_b = (_a = cacheMetadata[key]) === null || _a === void 0 ? void 0 : _a[id]) === null || _b === void 0 ? void 0 : _b.expireAt;
        const isExpired = !!cacheExpirationTime && new Date().getTime() > cacheExpirationTime;
        if (((_c = cache[key]) === null || _c === void 0 ? void 0 : _c[id]) && !isExpired) {
            return cache[key][id];
        }
        if (!requestCache[key]) {
            requestCache[key] = {};
        }
        // If it's expired, we want to re-run the entire request again, not just using the old promise
        // else we'll use the outdated data
        if (!requestCache[key][id] || isExpired) {
            requestCache[key][id] = requester();
        }
        const result = (await requestCache[key][id]);
        if (!cache[key]) {
            cache[key] = {};
        }
        if (!cacheMetadata[key]) {
            cacheMetadata[key] = {};
        }
        cache[key][id] = result;
        if (cacheOption) {
            const { expireAfter, getExpireAfterFromResult } = cacheOption;
            const expireAt = getExpireAfterFromResult || expireAfter
                ? new Date().getTime() + ((_d = getExpireAfterFromResult === null || getExpireAfterFromResult === void 0 ? void 0 : getExpireAfterFromResult(result)) !== null && _d !== void 0 ? _d : expireAfter)
                : null;
            cacheMetadata[key][id] = Object.assign(Object.assign({}, cacheMetadata[key][id]), { expireAt });
        }
        return result;
    }
    /**
     * Clear a particular cache entry or all entries for a particular cache type
     * @param key - unique global name for this cache type - see {@link CacheType}
     * @param id - unique id for this result inside this particular cache, will clear all entries if not provided
     * @example
     * clearCache("userGroups", "unique");
     * clearCache("userGroups");
     */
    const clearCache = (key, id) => {
        var _a, _b;
        if (id) {
            (_a = cache[key]) === null || _a === void 0 ? true : delete _a[id];
            (_b = requestCache[key]) === null || _b === void 0 ? true : delete _b[id];
        }
        else {
            delete cache[key];
            delete requestCache[key];
        }
    };

    const agsRegExp = /\/ags\//gi;

    const serverTypes = "MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|WMServer|SceneServer|VectorTileServer|StreamServer|WorkspaceServer|GeoenrichmentServer|VideoServer";
    const validArcgisRestServicePath = `\/arcgis\/rest\/services|\/rest\/services|\/arcgis\/services|\/arcgis\/rest`;
    const serverInfoExp = `(?<server>http.+(?:${validArcgisRestServicePath})(?:\/?.*\/(?<name>.*)\/(?<type>${serverTypes})))(?!.*\/${serverTypes})\/?(?<soe>\\d+)?.*`;
    /** Returns an array containing the input url, base server url, server name, server type, and layer index (if entered).
     * Example: [
     * "https://sampleserver6.arcgisonline.com/arcgis/rest/services/FeatureServer/500",
     * "https://sampleserver6.arcgisonline.com/arcgis/rest/services/TestService/FeatureServer",
     * "TestService",
     * "FeatureServer",
     * "500"
     * ]  */
    const regexServerInfo = new RegExp(serverInfoExp, "i");

    const parseAGSServerInfo = (url) => {
        const extractedInfo = url.match(regexServerInfo);
        if (!extractedInfo) {
            const containsAGS = url.match(agsRegExp);
            // Type is always MapServer for /ags/ services
            return containsAGS ? { baseServerUrl: url, serverName: null, serverType: "MapServer", index: null } : null;
        }
        const [, baseServerUrl, serverName, serverType, indexStr] = extractedInfo;
        const index = parseInt(indexStr);
        return { baseServerUrl, serverName, serverType, index: isNaN(index) ? null : index };
    };
    const getRestUrlFromUrl = (url) => {
        if (!url) {
            return null;
        }
        const extractedInfo = url.match(validArcgisRestServicePath);
        if (!extractedInfo) {
            return null;
        }
        const urlParts = url.split("/rest");
        return urlParts.length < 2 ? null : `${urlParts[0]}/rest/`;
    };
    const addTrailingSlashIfMissing = (url) => url && url.charAt(url.length - 1) !== "/" ? `${url}/` : url;

    function isEsri(item) {
        var _a;
        return !!((_a = item.owner) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("esri"));
    }
    function isPremium(item) {
        var _a;
        return isEsri(item) && !!((_a = item.typeKeywords) === null || _a === void 0 ? void 0 : _a.includes("Requires Credits"));
    }
    function isSubscriber(item) {
        var _a;
        return isEsri(item) && !!((_a = item.typeKeywords) === null || _a === void 0 ? void 0 : _a.includes("Requires Subscription"));
    }
    function isOwner(item, user) {
        return item.owner === user.username;
    }

    function isDeveloper(subscriptionInfo) {
        const devSubscriptionTypes = ["Trial Developer", "Developer", "Developer Subscription"];
        return devSubscriptionTypes.includes(subscriptionInfo === null || subscriptionInfo === void 0 ? void 0 : subscriptionInfo.type);
    }

    function getRestBaseUrl(portal) {
        var _a;
        const { portal: configPortal, config } = configState || {};
        return (_a = addTrailingSlashIfMissing(config === null || config === void 0 ? void 0 : config.restBaseUrl)) !== null && _a !== void 0 ? _a : getPortalRestBaseUrl(portal || configPortal);
    }
    function getPortalRestBaseUrl(portal) {
        var _a;
        return addTrailingSlashIfMissing((_a = portal.restUrl) !== null && _a !== void 0 ? _a : portal.portalUrl);
    }
    /**
     * Get the portal's token and also handle web-tier authentication Enterprise case
     */
    const getPortalToken = async (portal, api) => {
        var _a, _b;
        // `portal` can be unexpectedly undefined
        // https://devtopia.esri.com/WebGIS/arcgis-app-components/pull/5113
        if (!(portal === null || portal === void 0 ? void 0 : portal.isPortal) || !portal.isWebTierAuth) {
            return getToken(portal);
        }
        const { token } = await fromCache(() => getPlatformSelf(portal, api !== null && api !== void 0 ? api : configState === null || configState === void 0 ? void 0 : configState.api), "platformSelf", (_b = (_a = portal.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : portal.id, { getExpireAfterFromResult: (result) => result.expires_in });
        return token;
    };
    /**
     * Get the active client id. Defaults to "arcgisonline".
     */
    const getClientId = async (portal, api) => {
        var _a, _b, _c, _d;
        const is3x = api === 3;
        const [IdentityManager] = await loadModules$1([is3x ? "esri/IdentityManager" : "esri/identity/IdentityManager"]);
        const credential = await fromCache(() => IdentityManager.getCredential(getRestBaseUrl(portal), { oAuthPopupConfirmation: false }), "credential", (_a = portal.user) === null || _a === void 0 ? void 0 : _a.id);
        return ((_d = (is3x
            ? (_b = credential._oAuthCred) === null || _b === void 0 ? void 0 : _b.appId
            : (_c = credential.oAuthState) === null || _c === void 0 ? void 0 : _c.appId)) !== null && _d !== void 0 ? _d : "arcgisonline");
    };
    /**
     * Useful to get the token in web-tier authenticated Enterprise portals
     * Based on https://devtopia.esri.com/WebGIS/arcgis-js-api/blob/master/esri/IdentityManagerBase.js#L1952-L1966
     */
    const getPlatformSelf = async (portal, apiVersion) => {
        const appId = await getClientId(portal, apiVersion);
        const headers = {
            "X-Esri-Auth-Client-Id": appId,
            "X-Esri-Auth-Redirect-Uri": window.location.href.replace(/#.*$/, "")
        };
        return request(`${getRestBaseUrl(portal)}/oauth2/platformSelf`, {}, {
            disableIdentityLookup: true,
            headers: apiVersion === 4 ? headers : undefined,
            // To avoid infinite loop since `request` will call this again
            addTokenManually: false,
            withCredentials: true
        }, "post", { v3Request: { headers } });
    };
    const getPortalRestInfo = (portal) => {
        return getPortalRestInfoFromUrl(getPortalRestBaseUrl(portal));
    };
    const getPortalRestInfoFromUrl = (url) => {
        var _a;
        // Sometimes serviceUrl/info will return nothing so we need to extract the `rest` out
        const infoUrl = `${addTrailingSlashIfMissing((_a = getRestUrlFromUrl(url)) !== null && _a !== void 0 ? _a : url)}info`;
        // Most likely this info won't change so it's safe to use `fromCache`
        return fromCache(() => request(infoUrl, {}, { addTokenManually: false }), "portalInfo", infoUrl);
    };

    createStore({
        title: "",
        snippet: "",
        tags: [],
        categories: []
    });

    createStore({
        typeKeywords: [],
        customParameters: [],
        analyzedLocationTypes: [],
        allowStoredAuth: true,
        isSecured: null,
        checkAuth: false
    });

    const uiStore = createStore({
        nextText: "next",
        workflow: "content",
        scale: "m",
        disableScroll: false,
        featureFlags: { tileLayer3dTiles: false }
    });
    const uiStoreState = uiStore.state;

    Object.assign(Object.assign({ "360 VR Experience": {
            fileExt: ["3vr"],
            type: "360 VR Experience",
            typeKeywords: [],
            nextStep: "itemProperties"
        } }, (uiStoreState.featureFlags.tileLayer3dTiles
        ? {
            "3DTiles Package": {
                fileExt: ["3tz"],
                type: "3DTiles Package",
                typeKeywords: ["3DTiles", "3DTiles Package"],
                nextStep: "publishSelect"
            },
            "3DTiles Service": {
                type: "3DTiles Service",
                typeKeywords: ["Data", "Service", "3DTiles Service", "ArcGIS Server", "Hosted Service"]
            }
        }
        : {})), { "Apache Parquet": {
            fileExt: ["parquet"],
            type: "Apache Parquet",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "AppBuilder Widget Package": {
            fileExt: ["zip"],
            type: "AppBuilder Widget Package",
            typeKeywords: []
        }, "Desktop Add In": {
            fileExt: ["esriaddin"],
            type: "Desktop Add In",
            typeKeywords: ["Tool", "Add In", "Desktop Add In", "ArcGIS Desktop", "ArcMap", "ArcGlobe", "ArcScene", "esriaddin"],
            nextStep: "itemProperties"
        }, "Explorer Add In": {
            fileExt: ["eaz"],
            type: "Explorer Add In",
            typeKeywords: ["Tool", "Add In", "Explorer Add In", "ArcGIS Explorer", "eaz"],
            nextStep: "itemProperties"
        }, "Explorer Map": {
            fileExt: ["nmf"],
            type: "Explorer Map",
            typeKeywords: ["Map", "Explorer Map", "Explorer Document", "2D", "3D", "ArcGIS Explorer", "nmf"],
            nextStep: "itemProperties"
        }, "ArcGIS Explorer Application Configuration": {
            fileExt: ["ncfg"],
            type: "Explorer Map",
            typeKeywords: ["Map", "Explorer Map", "Explorer Mapping Application", "2D", "3D", "ArcGIS Explorer"],
            nextStep: "itemProperties"
        }, "Explorer Layer": {
            fileExt: ["nmc"],
            type: "Explorer Layer",
            typeKeywords: ["Data", "Layer", "Explorer Layer", "ArcGIS Explorer", "nmc"],
            nextStep: "itemProperties"
        }, "Windows Mobile Package": {
            fileExt: ["wmpk"],
            type: "Windows Mobile Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "ArcGIS Pro Add In": {
            fileExt: ["esriaddinx"],
            type: "ArcGIS Pro Add In",
            typeKeywords: ["Tool", "Add In", "Pro Add In", "esriaddinx"],
            nextStep: "itemProperties"
        }, "ArcGIS Pro Configuration": {
            fileExt: ["proconfigx"],
            type: "ArcGIS Pro Configuration",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Globe Document": {
            fileExt: ["3dd"],
            type: "Globe Document",
            typeKeywords: ["Map", "Globe Document", "3D", "ArcGlobe", "ArcGIS Server", "3dd"],
            nextStep: "itemProperties"
        }, "Map Document": {
            fileExt: ["msd"],
            type: "Map Document",
            typeKeywords: ["Map Document", "Map", "2D", "ArcMap", "ArcGIS Server", "msd"],
            nextStep: "itemProperties"
        }, "ArcMap Document": {
            fileExt: ["mxd"],
            type: "Map Document",
            typeKeywords: ["Map Document", "Map", "2D", "ArcMap", "ArcGIS Server"],
            nextStep: "itemProperties"
        }, "ArcPad Package": {
            fileExt: ["zip"],
            type: "ArcPad Package",
            typeKeywords: ["Map", "Layer", "Data"]
        }, "Published Map": {
            fileExt: ["pmf"],
            type: "Published Map",
            typeKeywords: ["Map", "Published Map", "2D", "ArcReader", "ArcMap", "ArcGIS Server", "pmf"],
            nextStep: "itemProperties"
        }, "Scene Document": {
            fileExt: ["sxd"],
            type: "Scene Document",
            typeKeywords: ["Map", "Scene Document", "3D", "ArcScene", "sxd"],
            nextStep: "itemProperties"
        }, "CityEngine Web Scene": {
            fileExt: ["3ws"],
            type: "CityEngine Web Scene",
            typeKeywords: ["3D", "Map", "Scene", "Web"],
            thumbnailURL: "/cw_webscene.png",
            nextStep: "itemProperties"
        }, "Code Sample": {
            fileExt: ["zip"],
            type: "Code Sample",
            typeKeywords: ["Code", "Sample"]
        }, "CSV Collection": {
            fileExt: ["zip"],
            type: "CSV Collection",
            typeKeywords: []
        }, CSV: {
            fileExt: ["csv"],
            type: "CSV",
            typeKeywords: ["CSV"],
            nextStep: "publishSelect",
            appendUploadFormat: "csv"
        }, "CAD Drawing": {
            fileExt: ["zip"],
            type: "CAD Drawing",
            typeKeywords: []
        }, "Deep Learning Package": {
            fileExt: ["zip", "dlpk"],
            type: "Deep Learning Package",
            typeKeywords: ["Deep Learning", "Raster"],
            nextStep: "itemProperties"
        }, "Desktop Application": {
            type: "Desktop Application",
            typeKeywords: ["Desktop Application"]
        }, "Desktop Application Template": {
            fileExt: ["zip"],
            type: "Desktop Application Template",
            typeKeywords: ["application", "template", "ArcGIS desktop"]
        }, "Desktop Style": {
            fileExt: ["stylx"],
            type: "Desktop Style",
            typeKeywords: ["ArcGIS Pro", "Symbology", "Style", "Symbols"],
            nextStep: "itemProperties"
        }, "Earth Configuration": {
            fileExt: ["xml"],
            type: "Earth Configuration",
            typeKeywords: ["ArcGIS Earth", "Earth", "Earth Configuration"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Esri Classifier Definition": {
            type: "Esri Classifier Definition",
            fileExt: ["ecd"],
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Feature Collection": {
            type: "Feature Collection",
            fileExt: ["featurecollection"],
            nextStep: "itemProperties",
            typeKeywords: []
        }, "File Geodatabase": {
            fileExt: ["zip"],
            type: "File Geodatabase",
            typeKeywords: [],
            appendUploadFormat: "filegdb"
        }, GeoJson: {
            fileExt: ["geojson", "json"],
            type: "GeoJson",
            typeKeywords: [
                "Coordinates Type",
                "CRS",
                "Feature",
                "FeatureCollection",
                "GeoJSON",
                "Geometry",
                "GeometryCollection"
            ],
            nextStep: "publishSelect",
            appendUploadFormat: "geojson"
        }, "Geoprocessing Package": {
            fileExt: ["gpk", "gpkx"],
            type: "Geoprocessing Package",
            typeKeywords: [
                "ArcGIS Desktop",
                "ArcGlobe",
                "ArcMap",
                "ArcScene",
                "Geoprocessing Package",
                "gpk",
                "Model",
                "Result",
                "Script",
                "Sharing",
                "Tool",
                "Toolbox"
            ],
            nextStep: "itemProperties"
        }, GeoPackage: {
            fileExt: ["gpkg"],
            type: "GeoPackage",
            typeKeywords: ["Data", "GeoPackage", "gpkg"],
            nextStep: "publishSelect",
            appendUploadFormat: "geoPackage"
        }, "Geoprocessing Sample": {
            fileExt: ["zip"],
            type: "Geoprocessing Sample",
            typeKeywords: ["tool", "geoprocessing", "sample"]
        }, GeoRSS: {
            type: "GeoRSS",
            typeKeywords: []
        }, GML: {
            fileExt: ["zip"],
            type: "GML",
            typeKeywords: [],
            orgOnly: true
        }, "Image Collection": {
            fileExt: ["zip"],
            type: "Image Collection",
            typeKeywords: [],
            orgOnly: true
        }, Image: {
            fileExt: ["jpg", "jpeg", "png", "tif", "tiff", "gif"],
            type: "Image",
            typeKeywords: ["Data", "Image"],
            nextStep: "itemProperties",
            orgOnly: true,
            allowAddDirect: true
        }, "iWork Keynote": {
            fileExt: ["key"],
            type: "iWork Keynote",
            typeKeywords: ["Data", "Document", "Mac"],
            orgOnly: true,
            nextStep: "itemProperties"
        }, "iWork Numbers": {
            fileExt: ["numbers"],
            type: "iWork Numbers",
            typeKeywords: ["Data", "Document", "Mac"],
            orgOnly: true,
            nextStep: "itemProperties"
        }, "iWork Pages": {
            fileExt: ["pages"],
            type: "iWork Pages",
            typeKeywords: ["Data", "Document", "Mac"],
            orgOnly: true,
            nextStep: "itemProperties"
        }, "KML Collection": {
            fileExt: ["zip"],
            type: "KML Collection",
            typeKeywords: []
        }, KML: {
            type: "KML",
            fileExt: ["kml", "kmz"],
            typeKeywords: ["Data", "Map", "kml"],
            nextStep: "itemProperties"
        }, Layer: {
            fileExt: ["lyr"],
            type: "Layer",
            typeKeywords: ["Data", "Layer", "ArcMap", "ArcGlobe", "ArcGIS Explorer", "lyr"],
            nextStep: "itemProperties"
        }, "Layer File": {
            fileExt: ["lyrx"],
            type: "Layer",
            typeKeywords: ["ArcGIS Pro", "Layer", "Layer File"],
            nextStep: "itemProperties"
        }, "Layer Package": {
            fileExt: ["lpk", "lpkx"],
            type: "Layer Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, Layout: {
            fileExt: ["pagx"],
            type: "Layout",
            typeKeywords: ["ArcGIS Pro", "Layout", "Layout File", "pagx"],
            nextStep: "itemProperties"
        }, "Locator Package": {
            fileExt: ["gcpk"],
            type: "Locator Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Map Package": {
            fileExt: ["mpk", "mpkx"],
            type: "Map Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Map Template": {
            fileExt: ["zip"],
            type: "Map Template",
            typeKeywords: ["map", "ArcMap", "template", "ArcGIS desktop"]
        }, "Microsoft Excel": {
            fileExt: ["xls", "xlsx"],
            type: "Microsoft Excel",
            typeKeywords: ["Data", "Document", "Microsoft Excel"],
            nextStep: "publishSelect",
            orgOnly: true,
            appendUploadFormat: "excel"
        }, "Microsoft Powerpoint": {
            fileExt: ["ppt", "pptx"],
            type: "Microsoft Powerpoint",
            typeKeywords: ["Data", "Document", "Microsoft Powerpoint"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Visio Document": {
            fileExt: ["vsd"],
            type: "Visio Document",
            typeKeywords: ["Data", "Document", "Visio Document"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Microsoft Word": {
            fileExt: ["doc", "docx"],
            type: "Microsoft Word",
            typeKeywords: ["Data", "Document"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Mobile Basemap Package": {
            fileExt: ["bpk"],
            type: "Mobile Basemap Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Mobile Map Package": {
            fileExt: ["mmpk"],
            type: "Mobile Map Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Mobile Scene Package": {
            fileExt: ["mspk"],
            type: "Mobile Scene Package",
            typeKeywords: [],
            thumbnailURL: "/mobilescenepackage.png",
            nextStep: "itemProperties"
        }, Notebook: {
            fileExt: ["ipynb"],
            type: "Notebook",
            typeKeywords: ["Notebook", "Python"],
            nextStep: "itemProperties",
            orgOnly: true
        }, PDF: {
            fileExt: ["pdf"],
            type: "PDF",
            typeKeywords: ["Data", "Document", "PDF"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Pro Map": {
            fileExt: ["mapx"],
            type: "Pro Map",
            typeKeywords: ["ArcGIS Pro", "Map", "Map File", "mapx"],
            nextStep: "itemProperties"
        }, "Pro Report": {
            fileExt: ["rptx"],
            type: "Pro Report",
            typeKeywords: [],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Project Package": {
            fileExt: ["ppkx"],
            type: "Project Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Project Template": {
            fileExt: ["aptx"],
            type: "Project Template",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Raster function template": {
            fileExt: ["rft.json", "rft.xml"],
            type: "Raster function template",
            typeKeywords: ["Raster", "Functions", "Processing", "rft", "srf", "function template", "templates", "ArcGIS Pro"],
            nextStep: "itemProperties"
        }, "Rule Package": {
            fileExt: ["rpk"],
            type: "Rule Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Scene Package": {
            fileExt: ["slpk", "spk"],
            type: "Scene Package",
            typeKeywords: [],
            nextStep: "publishSelect"
        }, "Service Definition": {
            fileExt: ["sd"],
            type: "Service Definition",
            typeKeywords: ["Data", "Service", "Service Definition"],
            nextStep: "publishSelect"
        }, Shapefile: {
            fileExt: ["zip"],
            type: "Shapefile",
            typeKeywords: ["Data", "Layer", "shapefile"],
            appendUploadFormat: "shapefile"
        }, "Survey123 Add In": {
            fileExt: ["surveyaddin"],
            type: "Survey123 Add In",
            typeKeywords: ["Add In", "Survey123 Add In", "Tool"],
            nextStep: "itemProperties",
            orgOnly: true
        }, "Tile Package": {
            fileExt: ["tpk", "tpkx"],
            type: "Tile Package",
            typeKeywords: [],
            nextStep: "publishSelect"
        }, "Vector Tile Package": {
            fileExt: ["vtpk"],
            type: "Vector Tile Package",
            typeKeywords: [],
            nextStep: "publishSelect"
        }, "Workflow Manager Package": {
            fileExt: ["wpk"],
            type: "Workflow Manager Package",
            typeKeywords: [],
            nextStep: "itemProperties"
        }, "Document Link": {
            type: "Document Link",
            typeKeywords: ["Data", "Document"]
        }, FeatureServer: {
            type: "Feature Service",
            typeKeywords: [
                "ArcGIS Server",
                "Data",
                "Feature Access",
                "Feature Service",
                "Service",
                "Singlelayer",
                "Hosted Service"
            ]
        }, GeocodeServer: {
            type: "Geocoding Service",
            thumbnailURL: "/desktopapp.png",
            typeKeywords: ["ArcGIS Server", "Geocoding Service", "Locator Service", "Service", "Tool", "Service Proxy"]
        }, GeoDataServer: {
            type: "Geodata Service",
            typeKeywords: ["Data", "Service", "Geodata Service", "ArcGIS Server"]
        }, GeometryServer: {
            type: "Geometry Service",
            typeKeywords: ["Tool", "Service", "Geometry Service", "ArcGIS Server"],
            thumbnailURL: "/desktopapp.png"
        }, GeoenrichmentServer: {
            type: "Geoenrichment Service",
            typeKeywords: ["Geoenrichment Service", "ArcGIS Server"],
            thumbnailURL: "/desktopapp.png"
        }, GPServer: {
            type: "Geoprocessing Service",
            typeKeywords: ["Tool", "Service", "Geoprocessing Service", "ArcGIS Server"]
        }, GlobeServer: {
            type: "Globe Service",
            typeKeywords: ["Data", "Service", "Globe Service", "ArcGIS Server"],
            thumbnailURL: "/desktopapp.png"
        }, ImageServer: {
            type: "Image Service",
            typeKeywords: ["Data", "Service", "Image Service", "ArcGIS Server"]
        }, MapServer: {
            type: "Map Service",
            typeKeywords: ["Data", "Service", "Map Service", "ArcGIS Server"]
        }, NAServer: {
            type: "Network Analysis Service",
            typeKeywords: ["Tool", "Service", "Network Analysis Service", "ArcGIS Server"]
        }, ElevationServer: {
            type: "Image Service",
            thumbnailURL: "/desktopapp.png",
            typeKeywords: ["Elevation 3D Layer"]
        }, VectorTileServer: {
            type: "Vector Tile Service",
            typeKeywords: []
        }, WFS: {
            type: "WFS",
            typeKeywords: ["Data", "Service", "Web Feature Service", "OGC"]
        }, WMS: {
            type: "WMS",
            typeKeywords: ["Data", "Service", "Web Map Service", "OGC"]
        }, WMTS: {
            type: "WMTS",
            typeKeywords: ["Data", "Service", "OGC"]
        }, ogcFeature: {
            type: "OGCFeatureServer",
            typeKeywords: ["Data", "Service", "Feature Service", "OGC", "OGC Feature Service"]
        }, SceneServer: {
            type: "Scene Service",
            typeKeywords: ["Scene Service"]
        }, StreamServer: {
            type: "Stream Service",
            typeKeywords: ["Data", "Service", "Stream Service", "ArcGIS Server"]
        }, VideoServer: {
            type: "Video Service",
            typeKeywords: []
        }, WMServer: {
            type: "Workflow Manager Service",
            thumbnailURL: "/desktopapp.png",
            typeKeywords: ["Workflow Manager", "ArcGIS Server", "WMServer", "Workflow", "JTX", "Job Tracking"]
        }, TiledImageServer: {
            type: "Image Service",
            thumbnailURL: "/tiledimagerylayer.png",
            typeKeywords: ["Tiled Imagery"]
        }, "Web Mapping Application": {
            type: "Web Mapping Application",
            typeKeywords: [
                "JavaScript",
                "Map",
                "Mapping Site",
                "Online Map",
                "Ready To Use",
                "Web AppBuilder",
                "Web Map (+ WAB2D or WAB3D)"
            ]
        }, "Mobile Application": {
            type: "Mobile Application",
            typeKeywords: ["ArcGIS Mobile Map", "Mobile Application"]
        }, "AppBuilder Extension": {
            type: "AppBuilder Extension",
            typeKeywords: ["Widget", "App Builder"]
        }, "Google Drive": {
            type: "Google Drive",
            typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"]
        }, Dropbox: {
            type: "Dropbox",
            typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"]
        }, OneDrive: {
            type: "OneDrive",
            typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"]
        }, "Map Service": {
            type: "Map Service",
            typeKeywords: ["ArcGIS Server", "Data", "Map Service", "Service", "Hosted Service"]
        }, StoryMap: {
            type: "StoryMap",
            typeKeywords: ["arcgis-storymaps", "StoryMap", "Web Application (smstatusdraft or smsstatuspublished)"]
        }, Dashboard: {
            type: "Dashboard",
            typeKeywords: ["Dashboard", "Operations Dashboard"]
        }, "Hub Initiative": {
            type: "Hub Initiative",
            typeKeywords: ["Hub", "hubInitiative", "OpenData"]
        }, "Hub Site Application": {
            type: "Hub Site Application",
            typeKeywords: [
                "Hub",
                "hubSite",
                "hubSolution",
                "JavaScript",
                "Map",
                "Mapping Site",
                "Online Map",
                "OpenData",
                "Ready To Use",
                "selfConfigured",
                "Web Map",
                "Registered App"
            ]
        }, "Web Experience": {
            type: "Web Experience",
            typeKeywords: [
                "EXB Experience",
                "JavaScript",
                "Ready To Use Web Application",
                "Web Experience",
                "Web Mapping Application",
                "Web Page",
                "Web Site"
            ]
        }, "Insights Workbook Package": {
            type: "Insights Workbook Package",
            fileExt: ["insightswbk"],
            typeKeywords: ["Insights", "Insights Workbook Package"],
            nextStep: "itemProperties"
        }, sde: {
            type: "Spatial Database Engine",
            fileExt: ["sde"],
            typeKeywords: ["sde"]
        }, "Pro Report Template": {
            type: "Pro Report Template",
            fileExt: ["rptt"],
            typeKeywords: ["Pro Report Template", "rptt"],
            nextStep: "itemProperties"
        } });

    const getItemUrl$1 = (itemId, portal) => `${getRestBaseUrl(portal)}content/items/${itemId}`;

    /** Work-around since using `request` directly will trigger unwanted toast on the Home App if the layer is unavailable */
    const requestFetch = async (url, portal, options = {}) => {
        const { body, usePost, addTokenManually, api = configState === null || configState === void 0 ? void 0 : configState.api } = options;
        const data = new URLSearchParams();
        if (body) {
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined) {
                    data.append(key, value);
                }
            });
        }
        const urlToSend = new URL(url);
        urlToSend.searchParams.append("f", "json");
        const token = addTokenManually === false ? null : await getPortalToken(portal, api);
        if (token) {
            urlToSend.searchParams.append("token", token);
        }
        const response = await fetch(urlToSend.toString(), {
            body: usePost ? data : undefined,
            method: usePost ? "POST" : "GET"
        });
        const result = await response.json();
        const error = result.error;
        if (error) {
            throw typeof error === "string" ? new Error(error) : error;
        }
        return result;
    };

    /**
     * Share items to the specified groups with the specified access level
     *
     * Note: `request` will toast an error on the Home app `useFetchRequest` is a workaround. TODO: remove this once we have a better way
     *
     * */
    const shareItems = async (items, shareLevel, groupIds, config, useFetchRequest = false) => {
        const { portal, user } = config;
        const url = `${getRestBaseUrl(portal)}content/users/${user.username}/shareItems`;
        let result = [];
        const shareLevelOptions = shareLevel ? toShareLevelOptions(shareLevel) : {};
        if (items.every((item) => isOwner(item, user))) {
            try {
                result = (await requestFetch(url, portal, {
                    body: Object.assign({ items: items.map((item) => item.id).join(","), groups: (groupIds === null || groupIds === void 0 ? void 0 : groupIds.length) ? groupIds.join(",") : undefined, confirmItemControl: true }, shareLevelOptions),
                    usePost: true
                })).results;
            }
            catch (error) {
                console.error(error);
                return { error: { code: "unhandledError" } };
            }
        }
        else {
            // TODO: hair splitting error here
            result = (await Promise.all(items.map(({ id }) => shareItem(id, shareLevelOptions, groupIds, portal, useFetchRequest)))).map((response) => response.result);
        }
        return { result };
    };
    /**
     * Share single item to the specified groups with the specified access level
     *
     * Note: `request` will toast an error on the Home app `useFetchRequest` is a workaround. TODO: remove this once we have a better way
     *
     * */
    async function shareItem(itemId, shareLevelOptions, groups, portal, useFetchRequest = false) {
        try {
            const url = `${getItemUrl$1(itemId, portal)}/share`;
            const params = Object.assign({ groups: (groups === null || groups === void 0 ? void 0 : groups.length) ? groups.join(",") : null, confirmItemControl: true }, shareLevelOptions);
            let result;
            if (useFetchRequest) {
                result = await requestFetch(url, portal, { body: params, usePost: true });
            }
            else {
                result = await request(url, params, {}, "post");
            }
            return { result };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    }
    function toShareLevelOptions(shareLevel) {
        switch (shareLevel) {
            case "public":
                return { org: false, everyone: true };
            case "org":
                return { org: true, everyone: false };
            case "private":
                return { org: false, everyone: false };
            case "shared":
                return { org: false, everyone: false };
            default:
                return {};
        }
    }

    // disable public sharing of certain items
    // WebGIS/arcgis-portal-app#26591, WebGIS/arcgis-portal-app#26987, WebGIS/arcgis-portal-app#30517
    // WebGIS/arcgis-portal-app#35924, WebGIS/arcgis-portal-app#36835
    function isBlockedFromSharingToPublic(item) {
        const { typeKeywords, type, url } = item;
        const hasNonShareableKeyword = typeKeywords && nonPubliclyShareableKeywords.some((keyword) => typeKeywords.includes(keyword));
        // ! No need to check for portal.isPortal here as that url type is only in ArcGIS Online
        const isOnlineDynamicImageryService = type === "Image Service" && (url === null || url === void 0 ? void 0 : url.includes("://iservices")) && url.includes("arcgis.com");
        const isNonShareableType = nonPubliclyShareableTypes.includes(type);
        return hasNonShareableKeyword || isOnlineDynamicImageryService || isNonShareableType;
    }
    function isBlockedFromDeveloperSharingToPublic(item) {
        var _a;
        const isHosted = (_a = item.typeKeywords) === null || _a === void 0 ? void 0 : _a.includes("Hosted Service");
        const blackListTypes = [
            "Vector Tile Service",
            "Map Service",
            "Scene Service",
            "Feature Service"
        ];
        return blackListTypes.includes(item.type) && isHosted;
    }
    const nonPubliclyShareableKeywords = [
        "Location Tracking Service",
        "Location Tracking View",
        "IoTFeed",
        "IoTFeatureLayer",
        "IoTMapImageLayer",
        "IoTStreamLayer",
        "Administrative Report",
        "EditExtensionIndoorsSpaces",
        "ArcgisWorkflowJobLocation"
    ];
    const nonPubliclyShareableTypes = ["Knowledge Graph", "Pro Project"];

    const isHostedService = (typeKeywords, type) => type === "Feature Service" && typeKeywords.includes("Hosted Service");

    const getHydratedItem = async (itemId, portal) => {
        try {
            const item = await requestFetch(getItemUrl(itemId, portal), portal);
            // TODO: check if we still need to do this
            // if (isHostedService(item.typeKeywords, item.type)) {
            //   const itemData = getItemData(item.id, portal);
            //   return { result: { ...item, ...itemInfo, ...itemData } };
            // }
            return { result: item };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    const getItemDataUrl = (itemId, portal) => `${getItemUrl(itemId, portal)}/data`;
    const getItemData = async (itemId, portal) => {
        return requestFetch(getItemDataUrl(itemId, portal), portal);
    };
    // TODO: remove these once we figure out how to efficiently disable the toast on the Home App
    const getItemUrl = (itemId, portal) => `${getRestBaseUrl(portal)}content/items/${itemId}`;
    const getItem = async (itemId, portal, requestOptions) => {
        try {
            const url = getItemUrl(itemId, portal);
            return await requestFetch(url, portal, requestOptions);
        }
        catch (error) {
            console.warn(error);
        }
    };
    const getItemGroups = async (itemId, portal) => {
        try {
            const url = `${getItemUrl(itemId, portal)}/groups`;
            return { result: await requestFetch(url, portal) };
        }
        catch (error) {
            // TODO: handle error
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    const isEditableItem = async (item, portal) => {
        let isEditable = false;
        if (isHostedService(item.typeKeywords, item.type)) {
            isEditable = await hasEditingCapability(item.url, portal);
        }
        return isEditable;
    };
    const hasEditingCapability = async (layerUrl, portal, requiredNoToken = false) => {
        var _a, _b, _c;
        if (layerUrl) {
            try {
                const result = await requestFetch(`${(_a = parseAGSServerInfo(layerUrl)) === null || _a === void 0 ? void 0 : _a.baseServerUrl}/layers`, portal, { addTokenManually: !requiredNoToken });
                return (_b = result === null || result === void 0 ? void 0 : result.layers) === null || _b === void 0 ? void 0 : _b.reduce((memo, layer) => memo || (layer === null || layer === void 0 ? void 0 : layer.capabilities.includes("Editing")), false);
            }
            catch (error) {
                if ((_c = error === null || error === void 0 ? void 0 : error.message) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes("token required")) {
                    return hasEditingCapability(layerUrl, portal, true);
                }
            }
        }
        return false;
    };

    // * --- Dependent item layers
    const getDependentItemLayers = async (mainItem, portal) => {
        const id = mainItem.id;
        let getDataError;
        let itemsAndLayers = { items: [], layers: [] };
        switch (mainItem.type) {
            case "Group Layer":
                ({ result: itemsAndLayers, error: getDataError } = await getGroupLayerDependentItemLayers(id, portal));
                break;
            case "Web Map":
            case "Web Scene":
                ({ result: itemsAndLayers, error: getDataError } = await getWebMapDependentItemLayers(id, portal));
                break;
            case "Web Mapping Application":
                ({ result: itemsAndLayers, error: getDataError } = await getWebAppDependentItemLayers(id, portal));
                break;
            case "Web Experience":
            case "Web Experience Template":
                ({ result: itemsAndLayers, error: getDataError } = await getWebExperienceDependentItemLayers(id, mainItem.typeKeywords, portal));
                break;
            case "Big Data File Share":
            case "Data Store":
                throw new Error("Not implemented");
        }
        return { result: itemsAndLayers, error: getDataError };
    };
    // * --- Group layer
    const getGroupLayerDependentItemLayers = async (itemId, portal) => {
        try {
            const itemData = await getItemData(itemId, portal);
            return {
                result: {
                    items: [],
                    layers: [Object.assign({}, itemData)]
                }
            };
        }
        catch (error) {
            // TODO: handle more error
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    // * --- Web map
    const getWebMapDependentItemLayers = async (itemId, portal) => {
        var _a, _b;
        try {
            const itemData = await getItemData(itemId, portal);
            const { operationalLayers, baseMap, tables, ground } = itemData;
            return {
                result: {
                    items: [],
                    layers: [
                        ...(operationalLayers !== null && operationalLayers !== void 0 ? operationalLayers : []),
                        ...((_a = baseMap === null || baseMap === void 0 ? void 0 : baseMap.baseMapLayers) !== null && _a !== void 0 ? _a : []),
                        ...((_b = ground === null || ground === void 0 ? void 0 : ground.layers) !== null && _b !== void 0 ? _b : []),
                        ...(tables !== null && tables !== void 0 ? tables : [])
                    ]
                }
            };
        }
        catch (error) {
            // TODO: handle more error
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    // * --- Web app
    const getWebAppDependentItemLayers = async (itemId, portal) => {
        try {
            const itemData = await getItemData(itemId, portal);
            if (!itemData) {
                return { result: { items: [], layers: [] } };
            }
            const webAppMapList = getWebAppMapList(itemData);
            const dependentItems = (await Promise.all(webAppMapList.map((itemId) => getHydratedItem(itemId, portal))))
                // TODO: handle errors
                .map(({ result }) => result)
                .filter((item) => item);
            const dependentItemLayers = await Promise.all(dependentItems.map((item) => getDependentItemLayers(item, portal)));
            const { items, layers } = flattenDependentItemsAndLayerResponse(dependentItemLayers
                .map(({ result }) => result)
                .flat()
                .filter((result) => result));
            return {
                // Web map application doesn't have any layers so we only return the layers from dep items
                result: { items: [...dependentItems, ...items], layers }
            };
        }
        catch (error) {
            // TODO: handle more error
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    const getWebAppMapList = (appData) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const items = ((_a = appData === null || appData === void 0 ? void 0 : appData.map) === null || _a === void 0 ? void 0 : _a.itemId) ? [appData.map.itemId] : [];
        const portfolioCollection = (_d = (_c = (_b = appData.values) === null || _b === void 0 ? void 0 : _b.itemCollection) === null || _c === void 0 ? void 0 : _c.map((el) => el.id)) !== null && _d !== void 0 ? _d : [];
        const maps = (_g = (_f = (_e = appData.values) === null || _e === void 0 ? void 0 : _e.webmap) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
        const scenes = (_k = (_j = (_h = appData.values) === null || _h === void 0 ? void 0 : _h.webscene) === null || _j === void 0 ? void 0 : _j.split(",")) !== null && _k !== void 0 ? _k : [];
        return [...items, ...portfolioCollection, ...maps, ...scenes];
    };
    // * --- Web experience
    const getWebExperienceDependentItemLayers = async (itemId, typeKeywords, portal) => {
        const draftUrl = `${getItemUrl$1(itemId, portal)}/resources/config/config.json`;
        const itemDataUrl = getItemDataUrl(itemId, portal);
        const dataUrls = [];
        if (typeKeywords.includes("status: Draft")) {
            dataUrls.push(draftUrl);
        }
        else if (typeKeywords.includes("status: Changed")) {
            dataUrls.push(draftUrl, itemDataUrl);
        }
        else {
            dataUrls.push(itemDataUrl);
        }
        try {
            const allItems = [];
            const allDependentItems = [];
            const allLayers = [];
            await Promise.all(dataUrls.map(async (dataUrl) => {
                const itemData = await requestFetch(dataUrl, portal);
                if (!(itemData === null || itemData === void 0 ? void 0 : itemData.dataSources) && !(itemData === null || itemData === void 0 ? void 0 : itemData.utilities)) {
                    return;
                }
                const dependentItems = (await Promise.all(getWebExperienceDependencyIdList(itemData).map((itemId) => getHydratedItem(itemId, portal)))) // TODO: handle errors
                    .map(({ result }) => result)
                    .filter((item) => item);
                const dependentItemLayers = await Promise.all(dependentItems.map((item) => getDependentItemLayers(item, portal)));
                const { items, layers } = flattenDependentItemsAndLayerResponse(dependentItemLayers.flatMap(({ result }) => result).filter((layer) => layer));
                allLayers.push(...layers);
                allItems.push(...items);
                allDependentItems.push(...dependentItems);
            }));
            return {
                // Web experience doesn't have any layers so we only return the layers from dep items
                result: { items: [...allDependentItems, ...allItems], layers: allLayers }
            };
        }
        catch (error) {
            // TODO: handle more error
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    function getWebExperienceDependencyIdList(data) {
        const dataSources = data.dataSources || {};
        const utilities = data.utilities || {};
        const allDeps = [...Object.values(dataSources), ...Object.values(utilities)];
        return allDeps.map((dep) => dep.itemId).filter((id) => id);
    }
    const flattenDependentItemsAndLayerResponse = (responses) => {
        return {
            items: responses.flatMap((response) => response.items),
            layers: responses.flatMap((response) => response.layers)
        };
    };

    /**
     * Get the groups that a layer is shared with
     */
    async function getLayerSharedGroups(layerId, portal, includeFavoriteGroups = false) {
        try {
            const { result } = await getItemGroups(layerId, portal);
            return {
                result: [...result.admin, ...result.member, ...result.other]
                    .filter((group) => includeFavoriteGroups || !group.isFav)
                    .map((group) => group.id)
            };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    }

    const isWebMapTable = (layer) => 
    // ! This is just a workaround for now but it's not completely safe since there is no discriminator
    !("layerType" in layer) && layer.url && layer.popupInfo;
    const isSupportedLayerTypeForUrlCheck = (layer) => {
        const validTypes = [
            "table",
            "ArcGISFeatureLayer",
            "ArcGISTiledMapServiceLayer",
            "VectorTileLayer",
            "GroupLayer",
            "ArcGISImageServiceLayer",
            "ArcGISTiledImageServiceLayer",
            "SubtypeGroupLayer",
            "ArcGISStreamLayer"
        ];
        return validTypes.includes(layer.layerType);
    };
    const isTileLayer = (layer) => layer.layerType === "ArcGISTiledMapServiceLayer";
    const isTileOperationLayerWithPopup = (layer) => layer.layerType === "ArcGISTiledMapServiceLayer" && "layers" in layer && layer.layers[0].disablePopup === false;
    const isVectorTileLayer = (layer) => layer.layerType === "VectorTileLayer" && "styleUrl" in layer;
    const DEFAULT_SHARING_DETAILS = {
        needsGroupUpdate: false,
        needsShareLevelUpdate: false,
        canEditShareLevel: true,
        premium: false
    };

    /**
     * Send a request to get data for `url`. This request will not include a token to avoid token leak
     */
    const getServiceUrlResponse = async (url, portal) => {
        var _a;
        try {
            return { result: await requestFetch(url, portal, { addTokenManually: false }) };
        }
        catch (error) {
            const tokenRequiredMessage = "token required";
            if ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(tokenRequiredMessage)) {
                return { error: { code: "tokenRequired" } };
            }
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };

    const accessLevel = {
        private: 0,
        shared: 1,
        org: 2,
        public: 3
    };
    const isAccessLevelGreater = (mainAccess, otherAccess) => accessLevel[mainAccess] > accessLevel[otherAccess];
    /**
     * Given a URL and a relative path, return the full URL
     * e.g: https://www.arcgis.com/sharing/rest/content/items/1234567890abcdefg and "../../", return https://www.arcgis.com/sharing/rest/
     *
     */
    const traverseUrls = ({ path, url }) => {
        const urlParts = url.split("/");
        const pathParts = path.split("/");
        const urlPartsToKeep = urlParts.slice(0, urlParts.length - pathParts.length);
        return urlPartsToKeep.join("/");
    };

    const filterUrlsFromSameOrigin = async (portal, urlsToCheck) => {
        const { owningSystemUrl: mainItemOwningSystemUrl } = await fromCache(async () => getPortalRestInfo(portal), "portalInfo", portal.id);
        const urlOwningSystemInfo = await Promise.all(urlsToCheck.map(async (url) => {
            try {
                const { owningSystemUrl } = await getPortalRestInfoFromUrl(url);
                return { owningSystemUrl, url };
            }
            catch (error) {
                console.error(error);
                return { owningSystemUrl: null, url };
            }
        }));
        return (urlOwningSystemInfo
            // TODO: handle Enterprise case
            .filter(({ owningSystemUrl }) => owningSystemUrl === mainItemOwningSystemUrl)
            .map(({ url }) => url));
    };

    /** Get the source item for tile layer
     * @param layer - The layer to get the source item for with layer type of ArcGISTiledMapServiceLayer
     */
    const getTileLayerSourceItem = async (layer, portal) => {
        try {
            const itemId = layer.itemId;
            const itemData = await fromCache(() => getItemData(itemId, portal), "itemData", itemId);
            // Currently a tile layer can only be created from a single layer so we can just take the first layer
            const { layerItemId: sourceItemId } = itemData === null || itemData === void 0 ? void 0 : itemData.layers[0];
            if (!sourceItemId) {
                return { error: { code: "unhandledError" } };
            }
            return { result: await getItem(sourceItemId, portal) };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    /** Get source items for items duplicated from another item
     *
     * This will ignore items that is not on the same environment as the main item
     * or if not using the same federated server if we're in Enterprise
     *
     * https://devtopia.esri.com/WebGIS/arcgis-app-components/issues/3809
     */
    const getSourceItemsFromUrls = async (itemUrls, portal) => {
        const validUrlInfos = itemUrls.filter((urlInfo) => !!(urlInfo === null || urlInfo === void 0 ? void 0 : urlInfo.url) && isSupportedLayerTypeForUrlCheck({ layerType: urlInfo.layerType }));
        const validItemUrls = await filterOutDiffOriginAGSUrls(validUrlInfos.map((urlInfo) => urlInfo.url), portal);
        // Some url is a root.json url so we need to go through another layer of getSourceItemsFromUrls to get the actual item
        const rootJSONServiceURL = [];
        // * First send request without token
        const requiredTokenUrls = [];
        const noTokenMetaData = [];
        await Promise.all(validItemUrls.map(async (url) => {
            const { result, error } = await fromCache(() => getServiceUrlResponse(url, portal), "itemMetadata", `${url}--no-token`);
            if ((error === null || error === void 0 ? void 0 : error.code) === "tokenRequired") {
                requiredTokenUrls.push(url);
                return;
            }
            if (isRootJSONResponse(result)) {
                rootJSONServiceURL.push(getRootJSONResponseUrl(result, url));
            }
            else {
                noTokenMetaData.push(result);
            }
        }));
        const noTokenServiceIds = noTokenMetaData.map((metaData) => metaData === null || metaData === void 0 ? void 0 : metaData.serviceItemId);
        // * For urls that require token, check if they are in the same origin
        const sameHostRestUrls = await filterUrlsFromSameOrigin(portal, requiredTokenUrls);
        // If yes, then we can just get the item detail
        const requiredTokenMetaData = await Promise.all(sameHostRestUrls.map(async (url) => ({
            response: await requestFetch(url, portal, { addTokenManually: true }),
            url // We need this for root json url
        })));
        const requiredTokenServiceIds = requiredTokenMetaData.reduce((idList, { response, url }) => {
            if (isRootJSONResponse(response)) {
                rootJSONServiceURL.push(getRootJSONResponseUrl(response, url));
                return idList;
            }
            return [...idList, response === null || response === void 0 ? void 0 : response.serviceItemId];
        }, []);
        // * Then just get the item detail
        const returnItems = await Promise.all([...noTokenServiceIds, ...requiredTokenServiceIds].map(async (serviceItemId) => serviceItemId ? getItem(serviceItemId, portal) : null));
        // We repeat the same process to get the actual `serviceItemId` then the item via the root json URL
        const rootJSONItems = rootJSONServiceURL.length <= 0
            ? []
            : await getSourceItemsFromUrls(rootJSONServiceURL.map((url) => ({ url, layerType: "VectorTileLayer" })), portal);
        return [...returnItems.filter((item) => !!item), ...rootJSONItems];
    };
    const isRootJSONResponse = (response) => {
        return !!(response === null || response === void 0 ? void 0 : response.sources);
    };
    const getRootJSONResponseUrl = (response, url) => {
        var _a;
        const responseUrl = (_a = Object.values(response.sources)[0]) === null || _a === void 0 ? void 0 : _a.url;
        if (!responseUrl) {
            return null;
        }
        return responseUrl.includes("..") ? traverseUrls({ url, path: responseUrl }) : responseUrl;
    };
    const filterOutDiffOriginAGSUrls = async (urls, portal) => {
        const validAgsURL = urls.filter((url) => !!url && !!parseAGSServerInfo(url));
        // TODO R3: we'll fine-grain checking this later and once items have better spec
        const nonAGSUrls = urls.filter((url) => !url || !parseAGSServerInfo(url));
        const sameOriginUrls = await filterUrlsFromSameOrigin(portal, validAgsURL);
        return [...sameOriginUrls, ...nonAGSUrls];
    };

    const getSourceItemsFromDependentLayers = async (dependentLayers, portal) => {
        // * Recursively flatten layers, focusing on GroupLayer
        const flattenedLayers = [];
        const analyzeLayer = (layer) => {
            if (isWebMapTable(layer)) {
                flattenedLayers.push({
                    id: layer.id,
                    url: layer.url,
                    layerType: "table",
                    getType: "normal"
                });
                return;
            }
            if (layer.layerType === "GroupLayer") {
                if (layer.itemId) {
                    // A GroupLayer item
                    flattenedLayers.push({
                        id: layer.id,
                        itemId: layer.itemId,
                        layerType: "GroupLayer",
                        getType: "normal"
                    });
                }
                layer.layers.forEach((subLayer) => {
                    if (isWebMapTable(subLayer) || subLayer.layerType === "GroupLayer") {
                        analyzeLayer(subLayer);
                        return;
                    }
                    const subLayerUrl = subLayer.url;
                    if (!subLayerUrl) {
                        analyzeLayer(subLayer);
                        return;
                    }
                    const parseUrlInfo = parseAGSServerInfo(subLayerUrl);
                    analyzeLayer(Object.assign(Object.assign({}, subLayer), { 
                        // If a layer in GroupLayer has index in their URL, we'll want to strip them out first
                        // This might create some duplicated URLs but we already filter them out below via the `layerItemIdLookupMap`
                        url: (parseUrlInfo === null || parseUrlInfo === void 0 ? void 0 : parseUrlInfo.index) != null ? parseUrlInfo.baseServerUrl : subLayer.url }));
                });
                return;
            }
            if (isVectorTileLayer(layer)) {
                flattenedLayers.push({
                    id: layer.id,
                    url: layer.styleUrl,
                    itemId: layer.itemId,
                    layerType: layer.layerType,
                    getType: "normal"
                });
                return;
            }
            // We need to also fetch the original item this tile layer is created from
            if (isTileLayer(layer)) {
                // If the tile layer has popup enabled, we can just take the layer directly
                //  which is simply via layers[0]'s `layerItemId`
                //  if not, we'll have to go into /data and get the `layerItemId` first from there
                const isTileLayerWithPopup = isTileOperationLayerWithPopup(layer);
                if (isTileLayerWithPopup) {
                    const firstSubLayer = layer.layers[0];
                    flattenedLayers.push({
                        id: firstSubLayer.id,
                        url: firstSubLayer.layerUrl,
                        getType: "normal",
                        layerType: layer.layerType,
                        itemId: firstSubLayer.layerItemId
                    });
                    // ! We also want to check for the tile layer sharing mismatch so there is no return here
                }
                flattenedLayers.push({
                    id: layer.id,
                    getType: isTileLayerWithPopup ? "normal" : "tile-layer-with-no-popup",
                    itemId: layer.itemId,
                    layerType: layer.layerType,
                    url: layer.url
                });
                return;
            }
            if (layer.itemId || layer.url) {
                flattenedLayers.push({
                    id: layer.id,
                    url: layer.url,
                    itemId: layer.itemId,
                    layerType: layer.layerType,
                    getType: "normal"
                });
            }
        };
        dependentLayers.forEach(analyzeLayer);
        const layerItemIdLookupMap = arrayToLookupMap(flattenedLayers, (layer) => {
            if (layer.itemId) {
                return { key: layer.itemId, data: { searchType: "item-id", layerType: layer.layerType } };
            }
            // Layer from shallow copied or duplicated items
            // However, if layer doesn't have both `itemId` and `url`, we'll just have the key as `null` and ignore them since there is no way to get the source item
            return { key: layer.url, data: { searchType: "url", layerType: layer.layerType } };
        });
        const uniqueIds = Object.keys(layerItemIdLookupMap).filter((id) => layerItemIdLookupMap[id].searchType === "item-id");
        try {
            // * --- Handle getting source item
            const itemsFromIds = (await Promise.all(uniqueIds.map((id) => getItem(id, portal)))).filter((itemInfo) => !!itemInfo);
            // Handle tile layer source item if the tile layer doesn't have popup enabled
            const dependentTileLayers = flattenedLayers.filter(({ getType: type, itemId }) => type === "tile-layer-with-no-popup" && !!itemId);
            const tileLayerSourceItems = (await Promise.all(dependentTileLayers.map((layer) => getTileLayerSourceItem(layer, portal)))).map(({ result }) => result);
            // Handle item duplicated from another item --- currently also handle vector tile layer
            //  because isHostedService doesn't count vector tile layer as hosted service
            const nonHostedItems = itemsFromIds.filter((item) => !isHostedService(item.typeKeywords, item.type));
            const nonHostedItemInfos = await getSourceItemsFromUrls(nonHostedItems.map((item) => {
                const { url, id } = item;
                const layerInfo = layerItemIdLookupMap[id];
                return layerInfo ? { layerType: layerInfo.layerType, url } : null;
            }), portal);
            const nonHostedItemsLookupByUrl = arrayToLookupMap(nonHostedItemInfos, (item) => ({
                key: item.url,
                data: item
            }));
            // Handle shallow copied layers
            const shallowedCopiedLayerUrls = Object.keys(layerItemIdLookupMap)
                .map((url) => {
                const layerInfo = layerItemIdLookupMap[url];
                return layerInfo && layerInfo.searchType === "url" ? { layerType: layerInfo.layerType, url } : null;
            })
                .filter((layerInfo) => layerInfo);
            const shallowCopiedItems = await getSourceItemsFromUrls(shallowedCopiedLayerUrls, portal);
            // * Aggregate the result
            const sourceItems = [];
            itemsFromIds
                .filter((itemInfo) => itemInfo)
                .forEach((item) => {
                const itemUrl = item.url;
                sourceItems.push({ sourceItem: item });
                const nonHostedSourceItem = nonHostedItemsLookupByUrl[itemUrl];
                if (nonHostedSourceItem && item.id !== nonHostedSourceItem.id) {
                    sourceItems.push({ sourceItem: nonHostedSourceItem });
                }
            });
            [...tileLayerSourceItems, ...shallowCopiedItems].forEach((item) => {
                if (!item) {
                    return;
                }
                sourceItems.push({ layer: null, sourceItem: item });
            });
            return { result: sourceItems };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };

    /**
     * Analyze sharing detail of the item and return any mismatch or sharing issues
     *
     * @param overrideLayers
     * Normally, the util will fetch the layers from the /data endpoint
     * However, if the user has overrideLayers layers, we can pass them in here
     *
     * **Note!!!**: Make sure the layers passed in is in the form of what we would receive from the /data endpoint of the item, not JS API's `Layer`
     *
     * This is useful in the case of Map Viewer where the /data endpoint is not updated with the latest layers after save
     *
     * @param options - options - see {@link Options}
     */
    const analyzeSharingDetail = async (item, portal, overrideLayers, options = { clearDataCacheOnDone: true }) => {
        if (item.access === "private") {
            return {
                result: {
                    needEditableLayers: [],
                    needPubliclyEditableLayers: [],
                    needDataCollectionLayers: [],
                    needsShareLevelUpdateLayers: [],
                    premiumLayers: [],
                    notEditableLayers: []
                }
            };
        }
        const { result, error } = await getLayerAndSharingDetail(item, portal, overrideLayers);
        if (error) {
            return { error };
        }
        const sharingDetailBuckets = {
            needEditableLayers: [],
            needPubliclyEditableLayers: [],
            needDataCollectionLayers: [],
            needsShareLevelUpdateLayers: [],
            premiumLayers: [],
            notEditableLayers: []
        };
        await Promise.all(result === null || result === void 0 ? void 0 : result.map(async (info) => {
            const bucket = await getSharingDetailBucket({
                mainItem: item,
                sharingDetailResult: info,
                portal
            });
            bucket && sharingDetailBuckets[bucket].push(info);
        }));
        if (options.clearDataCacheOnDone) {
            // TODO: find a way to scope this to the function only (possibly through store of cache)
            //  but right now we don't have a use case for that so it should be fine...
            dependencyCheckCacheTypes.forEach((type) => clearCache(type));
        }
        return { result: sharingDetailBuckets };
    };
    /**
     * Get item and layers from /data in case user doesn't pass layers

      * Ultimately, the goal is to get the source item and their sharing detail from all the dependent layers
     */
    const getLayerAndSharingDetail = async (mainItem, portal, overrideLayers) => {
        let itemsToCheck = [];
        let dependentLayers = [...(overrideLayers || [])];
        let getDataError;
        if (!(dependentLayers === null || dependentLayers === void 0 ? void 0 : dependentLayers.length)) {
            const { error, result } = await getDependentItemLayers(mainItem, portal);
            getDataError = error;
            dependentLayers = result.layers;
            itemsToCheck = result.items;
        }
        if (getDataError) {
            return { error: getDataError };
        }
        if (dependentLayers.length <= 0 && itemsToCheck.length <= 0) {
            return { error: { code: "dataNotAvailable" } };
        }
        try {
            const { result: dependentLayerSourceItems, error } = await getSourceItemsFromDependentLayers(dependentLayers, portal);
            if (error) {
                return { error };
            }
            // * Group sharing stuff
            const { result: mainItemSharingGroups, error: getSharedGroupsError } = await getLayerSharedGroups(mainItem.id, portal);
            if (getSharedGroupsError) {
                return { error: getSharedGroupsError };
            }
            // Sometimes layers can be created from he same source layers so we need to make sure we don't check the same source item multiple times
            const allSourceItems = uniqueBy([...dependentLayerSourceItems.map(({ sourceItem }) => sourceItem), ...itemsToCheck], (item) => item.id);
            const result = await Promise.all(allSourceItems.map(async (item) => {
                const sharingDetail = await getItemSharingDetail({
                    sourceItem: item,
                    mainItemAccess: mainItem.access,
                    mainItemSharingGroups,
                    portal
                });
                return { layer: null, sourceItem: item, detail: sharingDetail };
            }));
            return { result };
        }
        catch (error) {
            console.error(error);
            return { error: { code: "unhandledError" } };
        }
    };
    async function getItemSharingDetail({ mainItemAccess, mainItemSharingGroups, portal, sourceItem }) {
        const { access: sourceItemAccess, itemControl } = sourceItem;
        const sharingDetail = Object.assign({}, DEFAULT_SHARING_DETAILS);
        const isMainItemSharingToPublic = mainItemAccess === "public";
        if (isBlockedFromSharingToPublic(sourceItem) && isMainItemSharingToPublic) {
            return Object.assign(Object.assign({}, sharingDetail), { needsShareLevelUpdate: true, canEditShareLevel: false });
        }
        // Can current user update the sharing on this item, and do they need to, if the layer is public
        // it doesn't really matter if they can or cannot
        if (sourceItemAccess !== "public") {
            sharingDetail.canEditShareLevel = checkCanUpdateShareLevel(itemControl);
            sharingDetail.needsGroupUpdate = await checkNeedGroupUpdate({
                sourceItem,
                isMainItemSharingToPublic,
                mainItemSharingGroups,
                portal
            });
            sharingDetail.needsShareLevelUpdate = checkNeedShareUpdate({
                mainItemAccess,
                sourceItemAccess
            });
        }
        else {
            // Is this item considered a premium item
            sharingDetail.premium = isPremiumContent(sourceItem);
        }
        return sharingDetail;
    }
    const checkCanUpdateShareLevel = (itemControl) => itemControl === "admin";
    const checkNeedGroupUpdate = async ({ sourceItem, isMainItemSharingToPublic, portal, mainItemSharingGroups }) => {
        // TODO: remove this once we have fine-grain check for
        //  https://devtopia.esri.com/WebGIS/arcgis-app-components/pull/4068
        if (isMainItemSharingToPublic) {
            return false;
        }
        const { result: layerSharedGroups } = await getLayerSharedGroups(sourceItem.id, portal);
        return !sharedWithSameGroups(mainItemSharingGroups, layerSharedGroups);
    };
    const checkNeedShareUpdate = ({ mainItemAccess, sourceItemAccess }) => 
    // "shared" is the same as "private" with groups so it needs group update, not share update
    !(sourceItemAccess === "private" && mainItemAccess === "shared") &&
        isAccessLevelGreater(mainItemAccess, sourceItemAccess);
    function isPremiumContent(item) {
        return isSubscriber(item) || isPremium(item);
        // return selectedShareLevel !== "public" ? false : isSubscriber(item) || isPremium(item);
    }
    function sharedWithSameGroups(sharedGroups, layerSharedGroups) {
        if (sharedGroups === null || sharedGroups === void 0 ? void 0 : sharedGroups.length) {
            // We use `sharedGroups` to check the order since we only need to check if layerSharedGroups
            // contains the same groups in the same order as sharedGroups, not the other way around
            const groupsNotSharedWithLayer = sharedGroups.filter((value) => !(layerSharedGroups || []).includes(value));
            return groupsNotSharedWithLayer.length <= 0;
        }
        return true;
    }
    /**
     * Share `items` with groups fetch from `sourceItemsForGroups`
     */
    async function shareItemsToSharedGroups(items, sourceItemsForGroups, shareLevel, portal, shouldUpdateGroup = true) {
        const { user } = portal;
        const sharedGroupsList = !shouldUpdateGroup
            ? []
            : await Promise.all(sourceItemsForGroups.map(async (mainItem) => {
                const { result: groupIds } = await getLayerSharedGroups(mainItem.id, portal);
                return groupIds;
            }));
        const groupIds = sharedGroupsList.flat(1);
        return shareItems(items, shareLevel, groupIds, { portal, user }, true);
    }
    // https://www.figma.com/file/BBmw0ioRw0ZQmCqFHJeH2N/Share-Flowchart-5?type=whiteboard&node-id=401-149&t=E77ZkPzT8cboGdt7-0
    const getSharingDetailBucket = async ({ mainItem, sharingDetailResult, portal }) => {
        var _a;
        const { sourceItem, detail } = sharingDetailResult;
        const { canEditShareLevel, needsGroupUpdate, needsShareLevelUpdate, premium } = detail;
        if (!needsGroupUpdate && !needsShareLevelUpdate && !premium) {
            return null;
        }
        if (!canEditShareLevel && !premium) {
            return "notEditableLayers";
        }
        switch (mainItem.access) {
            case "public":
                if (premium) {
                    return "premiumLayers";
                }
                if (sourceItem.access !== "public") {
                    const developer = isDeveloper(portal.subscriptionInfo || ((_a = portal.sourceJSON) === null || _a === void 0 ? void 0 : _a.subscriptionInfo));
                    if (developer && isBlockedFromDeveloperSharingToPublic(sourceItem)) {
                        return "notEditableLayers";
                    }
                    if (await isEditableItem(sourceItem, portal)) {
                        const isDataCollectionLayer = sourceItem.typeKeywords.includes("Public Data Collection");
                        return isDataCollectionLayer ? "needEditableLayers" : "needDataCollectionLayers";
                    }
                }
                return "needsShareLevelUpdateLayers";
            case "org":
            case "shared":
            case "private":
                if (premium) {
                    return null;
                }
                return "needsShareLevelUpdateLayers";
            default:
                assertNever(mainItem.access);
        }
    };
    // We don't blow up the cache for portal info since that information will not likely be changed
    const dependencyCheckCacheTypes = ["itemData", "itemMetadata"];
    const assertNever = (access) => {
        throw new Error(`Unexpected share level ${access}`);
    };

    const initConfig = (configProps) => {
        if (configState) {
            Object.keys(configProps).forEach((key) => {
                configState[key] = configProps[key];
            });
        }
    };

    exports.analyzeSharingDetail = analyzeSharingDetail;
    exports.initConfig = initConfig;
    exports.isAccessLevelGreater = isAccessLevelGreater;
    exports.shareItemsToSharedGroups = shareItemsToSharedGroups;

}));
