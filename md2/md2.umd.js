(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/common'), require('@angular/forms')) :
   typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/common', '@angular/forms'], factory) :
   (factory((global.ng = global.ng || {}, global.ng.md2 = global.ng.md2 || {}),global.ng.core,global.Rx,global.ng.common,global.ng.forms));
}(this, (function (exports,_angular_core,rxjs_Subject,_angular_common,_angular_forms) { 'use strict';

// TODO(kara): Revisit why error messages are not being properly set.
var __extends$3 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Wrapper around Error that sets the error message.
 */
var MdError = (function (_super) {
    __extends$3(MdError, _super);
    function MdError(value) {
        _super.call(this);
        this.message = value;
    }
    return MdError;
}(Error));

var __extends$2 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
    __extends$2(MdComponentPortalAttachedToDomWithoutOriginError, _super);
    function MdComponentPortalAttachedToDomWithoutOriginError() {
        _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
            'because the DOM element is not part of the Angular application context.');
    }
    return MdComponentPortalAttachedToDomWithoutOriginError;
}(MdError));
/** Exception thrown when attempting to attach a null portal to a host. */
var MdNullPortalError = (function (_super) {
    __extends$2(MdNullPortalError, _super);
    function MdNullPortalError() {
        _super.call(this, 'Must provide a portal to attach');
    }
    return MdNullPortalError;
}(MdError));
/** Exception thrown when attempting to attach a portal to a host that is already attached. */
var MdPortalAlreadyAttachedError = (function (_super) {
    __extends$2(MdPortalAlreadyAttachedError, _super);
    function MdPortalAlreadyAttachedError() {
        _super.call(this, 'Host already has a portal attached');
    }
    return MdPortalAlreadyAttachedError;
}(MdError));
/** Exception thrown when attempting to attach a portal to an already-disposed host. */
var MdPortalHostAlreadyDisposedError = (function (_super) {
    __extends$2(MdPortalHostAlreadyDisposedError, _super);
    function MdPortalHostAlreadyDisposedError() {
        _super.call(this, 'This PortalHost has already been disposed');
    }
    return MdPortalHostAlreadyDisposedError;
}(MdError));
/** Exception thrown when attempting to attach an unknown portal type. */
var MdUnknownPortalTypeError = (function (_super) {
    __extends$2(MdUnknownPortalTypeError, _super);
    function MdUnknownPortalTypeError() {
        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
    return MdUnknownPortalTypeError;
}(MdError));
/** Exception thrown when attempting to attach a portal to a null host. */
var MdNullPortalHostError = (function (_super) {
    __extends$2(MdNullPortalHostError, _super);
    function MdNullPortalHostError() {
        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
    }
    return MdNullPortalHostError;
}(MdError));
/** Exception thrown when attempting to detach a portal that is not attached. */
var MdNoPortalAttachedError = (function (_super) {
    __extends$2(MdNoPortalAttachedError, _super);
    function MdNoPortalAttachedError() {
        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
    }
    return MdNoPortalAttachedError;
}(MdError));

var __extends$1 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
var Portal = (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throw new MdNullPortalHostError();
        }
        if (host.hasAttached()) {
            throw new MdPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    };
    /** Detach this portal from its host */
    Portal.prototype.detach = function () {
        var host = this._attachedHost;
        if (host == null) {
            throw new MdNoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detatch()`.
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = (function (_super) {
    __extends$1(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        if (injector === void 0) { injector = null; }
        _super.call(this);
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = (function (_super) {
    __extends$1(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef) {
        _super.call(this);
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    TemplatePortal.prototype.attach = function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    TemplatePortal.prototype.detach = function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
var BasePortalHost = (function () {
    function BasePortalHost() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    BasePortalHost.prototype.hasAttached = function () {
        return this._attachedPortal != null;
    };
    BasePortalHost.prototype.attach = function (portal) {
        if (portal == null) {
            throw new MdNullPortalError();
        }
        if (this.hasAttached()) {
            throw new MdPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throw new MdPortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throw new MdUnknownPortalTypeError();
    };
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
        }
        this._attachedPortal = null;
        if (this._disposeFn != null) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    BasePortalHost.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._isDisposed = true;
    };
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
var TemplatePortalDirective = (function (_super) {
    __extends(TemplatePortalDirective, _super);
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    TemplatePortalDirective = __decorate$1([
        _angular_core.Directive({
            selector: '[portal]',
            exportAs: 'portal',
        }), 
        __metadata$1('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], TemplatePortalDirective);
    return TemplatePortalDirective;
}(TemplatePortal));
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [portalHost]="greeting"></template>
 */
var PortalHostDirective = (function (_super) {
    __extends(PortalHostDirective, _super);
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        _super.call(this);
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        get: function () {
            return this._portal;
        },
        set: function (p) {
            this._replaceAttachedPortal(p);
        },
        enumerable: true,
        configurable: true
    });
    /** Attach the given ComponentPortal to this PortlHost using the ComponentFactoryResolver. */
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        this.setDisposeFn(function () { return ref.destroy(); });
        return ref;
    };
    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
        if (this.hasAttached()) {
            this.detach();
        }
        if (p) {
            this.attach(p);
            this._portal = p;
        }
    };
    PortalHostDirective = __decorate$1([
        _angular_core.Directive({
            selector: '[portalHost]',
            inputs: ['portal: portalHost']
        }), 
        __metadata$1('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ViewContainerRef])
    ], PortalHostDirective);
    return PortalHostDirective;
}(BasePortalHost));
var PortalModule = (function () {
    function PortalModule() {
    }
    PortalModule.forRoot = function () {
        return {
            ngModule: PortalModule,
            providers: []
        };
    };
    PortalModule = __decorate$1([
        _angular_core.NgModule({
            exports: [TemplatePortalDirective, PortalHostDirective],
            declarations: [TemplatePortalDirective, PortalHostDirective],
        }), 
        __metadata$1('design:paramtypes', [])
    ], PortalModule);
    return PortalModule;
}());

/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var OverlayState = (function () {
    function OverlayState() {
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        this.backdropClass = 'md-overlay-dark-backdrop';
    }
    return OverlayState;
}());

var __extends$4 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = (function (_super) {
    __extends$4(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver) {
        _super.call(this);
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    /** Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver. */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        if (portal.viewContainerRef == null) {
            throw new MdComponentPortalAttachedToDomWithoutOriginError();
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
        var hostView = ref.hostView;
        this._hostDomElement.appendChild(hostView.rootNodes[0]);
        this.setDisposeFn(function () { return ref.destroy(); });
        return ref;
    };
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var viewContainer = portal.viewContainerRef;
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var index = viewContainer.indexOf(viewRef);
            if (index != -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    DomPortalHost.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    return DomPortalHost;
}(BasePortalHost));

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = (function () {
    function OverlayRef(_portalHost, _pane, _state) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._backdropElement = null;
        this._backdropClick = new rxjs_Subject.Subject();
    }
    OverlayRef.prototype.attach = function (portal) {
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        var attachResult = this._portalHost.attach(portal);
        this.updatePosition();
        return attachResult;
    };
    OverlayRef.prototype.detach = function () {
        this._detatchBackdrop();
        return this._portalHost.detach();
    };
    OverlayRef.prototype.dispose = function () {
        this._detatchBackdrop();
        this._portalHost.dispose();
    };
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    /** Gets the current state config of the overlay. */
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    /** Updates the position of the overlay based on the position strategy. */
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /** Attaches a backdrop for this overlay. */
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('md-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        this._pane.parentElement.appendChild(this._backdropElement);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () {
            _this._backdropClick.next(null);
        });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            _this._backdropElement.classList.add('md-overlay-backdrop-showing');
        });
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    OverlayRef.prototype._detatchBackdrop = function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            backdropToDetach.classList.remove('md-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', function () {
                backdropToDetach.parentNode.removeChild(backdropToDetach);
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            });
        }
    };
    return OverlayRef;
}());

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Simple utility for getting the bounds of the browser viewport.
 * TODO: internal
 */
var ViewportRuler = (function () {
    function ViewportRuler() {
    }
    // TODO(jelbourn): cache the document's bounding rect and only update it when the window
    // is resized (debounced).
    /** Gets a ClientRect for the viewport's bounds. */
    ViewportRuler.prototype.getViewportRect = function () {
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var documentRect = document.documentElement.getBoundingClientRect();
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        var height = window.innerHeight;
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var top = documentRect.top < 0 && document.body.scrollTop == 0 ?
            -documentRect.top :
            document.body.scrollTop;
        var left = documentRect.left < 0 && document.body.scrollLeft == 0 ?
            -documentRect.left :
            document.body.scrollLeft;
        return { top: top, left: left };
    };
    ViewportRuler = __decorate$5([
        _angular_core.Injectable(), 
        __metadata$5('design:paramtypes', [])
    ], ViewportRuler);
    return ViewportRuler;
}());

/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param element
 * @param transformValue
 */
function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    var value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

/** The points of the origin element and the overlay element to connect. */
var ConnectionPositionPair = (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implict position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var ConnectedPositionStrategy = (function () {
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        // TODO(jelbourn): set RTL to the actual value from the app.
        /** Whether the we're dealing with an RTL context */
        this._isRtl = false;
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        get: function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * TODO: internal
     */
    ConnectedPositionStrategy.prototype.apply = function (element) {
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        var originRect = this._origin.getBoundingClientRect();
        var overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        var viewportRect = this._viewportRuler.getViewportRect();
        var firstOverlayPoint = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            var originPoint = this._getOriginConnectionPoint(originRect, pos);
            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
            firstOverlayPoint = firstOverlayPoint || overlayPoint;
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (this._willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect)) {
                this._setElementPosition(element, overlayPoint);
                return Promise.resolve(null);
            }
        }
        // TODO(jelbourn): fallback behavior for when none of the preferred positions fit on-screen.
        // For now, just stick it in the first position and let it go off-screen.
        this._setElementPosition(element, firstOverlayPoint);
        return Promise.resolve(null);
    };
    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
        var originStartX = this._getStartX(originRect);
        var originEndX = this._getEndX(originRect);
        var x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        var y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected.
     * @param originPoint
     * @param overlayRect
     * @param pos
     */
    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        var overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else {
            overlayStartX = pos.overlayX == 'start' ? 0 : -overlayRect.width;
        }
        var overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        return {
            x: originPoint.x + overlayStartX,
            y: originPoint.y + overlayStartY
        };
    };
    /**
     * Gets whether the overlay positioned at the given point will fit on-screen.
     * @param overlayPoint The top-left coordinate of the overlay.
     * @param overlayRect Bounding rect of the overlay, used to get its size.
     * @param viewportRect The bounding viewport.
     */
    ConnectedPositionStrategy.prototype._willOverlayFitWithinViewport = function (overlayPoint, overlayRect, viewportRect) {
        // TODO(jelbourn): probably also want some space between overlay edge and viewport edge.
        return overlayPoint.x >= viewportRect.left &&
            overlayPoint.x + overlayRect.width <= viewportRect.right &&
            overlayPoint.y >= viewportRect.top &&
            overlayPoint.y + overlayRect.height <= viewportRect.bottom;
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param element
     * @param overlayPoint
     */
    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
        var scrollPos = this._viewportRuler.getViewportScrollPosition();
        var x = overlayPoint.x + scrollPos.left;
        var y = overlayPoint.y + scrollPos.top;
        // TODO(jelbourn): we don't want to always overwrite the transform property here,
        // because it will need to be used for animations.
        applyCssTransform(element, "translateX(" + x + "px) translateY(" + y + "px)");
    };
    return ConnectedPositionStrategy;
}());

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport.
 */
var GlobalPositionStrategy = (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'absolute';
        this._top = '';
        this._bottom = '';
        this._left = '';
        this._right = '';
        /** Array of individual applications of translateX(). Currently only for centering. */
        this._translateX = [];
        /** Array of individual applications of translateY(). Currently only for centering. */
        this._translateY = [];
    }
    /** Sets the element to use CSS position: fixed */
    GlobalPositionStrategy.prototype.fixed = function () {
        this._cssPosition = 'fixed';
        return this;
    };
    /** Sets the element to use CSS position: absolute. This is the default. */
    GlobalPositionStrategy.prototype.absolute = function () {
        this._cssPosition = 'absolute';
        return this;
    };
    /** Sets the top position of the overlay. Clears any previously set vertical position. */
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottom = '';
        this._translateY = [];
        this._top = value;
        return this;
    };
    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
    GlobalPositionStrategy.prototype.left = function (value) {
        this._right = '';
        this._translateX = [];
        this._left = value;
        return this;
    };
    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._top = '';
        this._translateY = [];
        this._bottom = value;
        return this;
    };
    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
    GlobalPositionStrategy.prototype.right = function (value) {
        this._left = '';
        this._translateX = [];
        this._right = value;
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     */
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = '0px'; }
        this._left = '50%';
        this._right = '';
        this._translateX = ['-50%', offset];
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     */
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = '0px'; }
        this._top = '50%';
        this._bottom = '';
        this._translateY = ['-50%', offset];
        return this;
    };
    /**
     * Apply the position to the element.
     * TODO: internal
     */
    GlobalPositionStrategy.prototype.apply = function (element) {
        element.style.position = this._cssPosition;
        element.style.top = this._top;
        element.style.left = this._left;
        element.style.bottom = this._bottom;
        element.style.right = this._right;
        // TODO(jelbourn): we don't want to always overwrite the transform property here,
        // because it will need to be used for animations.
        var tranlateX = this._reduceTranslateValues('translateX', this._translateX);
        var translateY = this._reduceTranslateValues('translateY', this._translateY);
        applyCssTransform(element, tranlateX + " " + translateY);
        return Promise.resolve(null);
    };
    /** Reduce a list of translate values to a string that can be used in the transform property */
    GlobalPositionStrategy.prototype._reduceTranslateValues = function (translateFn, values) {
        return values.map(function (t) { return (translateFn + "(" + t + ")"); }).join(' ');
    };
    return GlobalPositionStrategy;
}());

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Builder for overlay position strategy. */
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /** Creates a global position strategy. */
    OverlayPositionBuilder.prototype.global = function () {
        return new GlobalPositionStrategy();
    };
    /** Creates a relative position strategy. */
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder = __decorate$4([
        _angular_core.Injectable(), 
        __metadata$4('design:paramtypes', [ViewportRuler])
    ], OverlayPositionBuilder);
    return OverlayPositionBuilder;
}());

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns {HTMLElement} the container element
     */
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'md-overlay-container' class on the document body.
     */
    OverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('md-overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return OverlayContainer;
}());

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Next overlay unique ID. */
var nextUniqueId = 0;
/** The default state for newly created overlays. */
var defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns A reference to the created overlay.
     */
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state);
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Promise resolving to the created element.
     */
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "md-overlay-" + nextUniqueId++;
        pane.classList.add('md-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @param state
     * @returns {OverlayRef}
     */
    Overlay.prototype._createOverlayRef = function (pane, state) {
        return new OverlayRef(this._createPortalHost(pane), pane, state);
    };
    Overlay = __decorate$3([
        _angular_core.Injectable(), 
        __metadata$3('design:paramtypes', [OverlayContainer, _angular_core.ComponentFactoryResolver, OverlayPositionBuilder])
    ], Overlay);
    return Overlay;
}());
/** Providers for Overlay and its related injectables. */
var OVERLAY_PROVIDERS = [
    ViewportRuler,
    OverlayPositionBuilder,
    Overlay,
    OverlayContainer,
];

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var OverlayOrigin = (function () {
    function OverlayOrigin(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
        get: function () {
            return this._elementRef;
        },
        enumerable: true,
        configurable: true
    });
    OverlayOrigin = __decorate$2([
        _angular_core.Directive({
            selector: '[overlay-origin]',
            exportAs: 'overlayOrigin',
        }), 
        __metadata$2('design:paramtypes', [_angular_core.ElementRef])
    ], OverlayOrigin);
    return OverlayOrigin;
}());
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
var ConnectedOverlayDirective = (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
        this._overlay = _overlay;
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    /** TODO: internal */
    ConnectedOverlayDirective.prototype.ngOnInit = function () {
        this._createOverlay();
    };
    /** TODO: internal */
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    /** Creates an overlay and attaches this directive's template to it. */
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        var overlayConfig = new OverlayState();
        overlayConfig.positionStrategy =
            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
        this._overlayRef = this._overlay.create(overlayConfig);
        this._overlayRef.attach(this._templatePortal);
    };
    /** Destroys the overlay created by this directive. */
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        this._overlayRef.dispose();
    };
    __decorate$2([
        _angular_core.Input(), 
        __metadata$2('design:type', OverlayOrigin)
    ], ConnectedOverlayDirective.prototype, "origin", void 0);
    __decorate$2([
        _angular_core.Input(), 
        __metadata$2('design:type', Array)
    ], ConnectedOverlayDirective.prototype, "positions", void 0);
    ConnectedOverlayDirective = __decorate$2([
        _angular_core.Directive({
            selector: '[connected-overlay]'
        }), 
        __metadata$2('design:paramtypes', [Overlay, _angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], ConnectedOverlayDirective);
    return ConnectedOverlayDirective;
}());
var OverlayModule = (function () {
    function OverlayModule() {
    }
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: OVERLAY_PROVIDERS,
        };
    };
    OverlayModule = __decorate$2([
        _angular_core.NgModule({
            imports: [PortalModule],
            exports: [ConnectedOverlayDirective, OverlayOrigin],
            declarations: [ConnectedOverlayDirective, OverlayOrigin],
        }), 
        __metadata$2('design:paramtypes', [])
    ], OverlayModule);
    return OverlayModule;
}());

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var MdUniqueSelectionDispatcher = (function () {
    function MdUniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /** Notify other items that selection for the given name has been set. */
    MdUniqueSelectionDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /** Listen for future changes to item selection. */
    MdUniqueSelectionDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    MdUniqueSelectionDispatcher = __decorate$6([
        _angular_core.Injectable(), 
        __metadata$6('design:paramtypes', [])
    ], MdUniqueSelectionDispatcher);
    return MdUniqueSelectionDispatcher;
}());

(function (KeyCodes) {
    KeyCodes[KeyCodes["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCodes[KeyCodes["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyCodes[KeyCodes["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCodes[KeyCodes["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCodes[KeyCodes["PAGE_UP"] = 33] = "PAGE_UP";
    KeyCodes[KeyCodes["PAGE_DOWN"] = 34] = "PAGE_DOWN";
    KeyCodes[KeyCodes["HOME"] = 36] = "HOME";
    KeyCodes[KeyCodes["END"] = 35] = "END";
    KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
    KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
    KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCodes[KeyCodes["DELETE"] = 46] = "DELETE";
    KeyCodes[KeyCodes["TAB"] = 9] = "TAB";
    KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
    KeyCodes[KeyCodes["COMMA"] = 188] = "COMMA";
})(exports.KeyCodes || (exports.KeyCodes = {}));

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Selector that matches all elements that may have style collisions with material1. */
var ELEMENTS_SELECTOR = "\n  md2-accordion,\n  md2-autocomplete,\n  md2-chips,\n  md2-collapse,\n  md2-colorpicker,\n  md2-data-table,\n  md2-datepicker,\n  md2-dialog,\n  md2-menu,\n  md2-multiselect,\n  md2-select,\n  md2-tabs,\n  md2-tags,\n  md2-toast,\n  md2-tooltip\n";
/**
 * Directive to apply to all material2 components that use the same element name as a
 * component in material2. It does two things:
 * 1) Adds the css class "md2" to the host element so that material1 can use this class with a
 *    :not() in order to avoid affecting material2 elements.
 * 2) Adds a css class to the element that is identical to the element's tag. E.g., the element
 *    `<md-card>` would be given a css class `md-card`. This is done so that material2 can style
 *    only these classes instead of defining element rules that would affect material1 components.
 */
var StyleCompatibility = (function () {
    function StyleCompatibility(renderer, elementRef) {
        var element = elementRef.nativeElement;
        renderer.setElementClass(element, 'md2', true);
        renderer.setElementClass(element, element.nodeName.toLowerCase(), true);
    }
    StyleCompatibility = __decorate$7([
        _angular_core.Directive({
            selector: ELEMENTS_SELECTOR,
        }), 
        __metadata$7('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
    ], StyleCompatibility);
    return StyleCompatibility;
}());
var StyleCompatibilityModule = (function () {
    function StyleCompatibilityModule() {
    }
    StyleCompatibilityModule.forRoot = function () {
        return {
            ngModule: StyleCompatibilityModule,
            providers: [],
        };
    };
    StyleCompatibilityModule = __decorate$7([
        _angular_core.NgModule({
            declarations: [StyleCompatibility],
            exports: [StyleCompatibility],
        }), 
        __metadata$7('design:paramtypes', [])
    ], StyleCompatibilityModule);
    return StyleCompatibilityModule;
}());

var AnimationCurves = (function () {
    function AnimationCurves() {
    }
    AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
    AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
    AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
    AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
    return AnimationCurves;
}());
;
var AnimationDurations = (function () {
    function AnimationDurations() {
    }
    AnimationDurations.COMPLEX = '375ms';
    AnimationDurations.ENTERING = '225ms';
    AnimationDurations.EXITING = '195ms';
    return AnimationDurations;
}());
;

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HighlightPipe = (function () {
    function HighlightPipe() {
    }
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    HighlightPipe.prototype.transform = function (value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    };
    /**
     * filter pipe
     * @param queryToEscape
     * @return queryToEscape with replace string
     */
    HighlightPipe.prototype.escapeRegexp = function (queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    HighlightPipe = __decorate$8([
        _angular_core.Pipe({ name: 'highlight' }), 
        __metadata$8('design:paramtypes', [])
    ], HighlightPipe);
    return HighlightPipe;
}());

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: [OVERLAY_PROVIDERS],
        };
    };
    MdCoreModule = __decorate([
        _angular_core.NgModule({
            imports: [PortalModule, OverlayModule],
            exports: [PortalModule, OverlayModule],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCoreModule);
    return MdCoreModule;
}());

var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Accordion = (function () {
    function Md2Accordion() {
        this.class = '';
        this.close = new _angular_core.EventEmitter();
        this.open = new _angular_core.EventEmitter();
        this.tabs = [];
    }
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    Md2Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    __decorate$11([
        _angular_core.Input(), 
        __metadata$11('design:type', Boolean)
    ], Md2Accordion.prototype, "multiple", void 0);
    __decorate$11([
        _angular_core.Input(), 
        __metadata$11('design:type', String)
    ], Md2Accordion.prototype, "class", void 0);
    __decorate$11([
        _angular_core.Output(), 
        __metadata$11('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "close", void 0);
    __decorate$11([
        _angular_core.Output(), 
        __metadata$11('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "open", void 0);
    Md2Accordion = __decorate$11([
        _angular_core.Component({selector: 'md2-accordion',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.md2-accordion]': 'true'
            },
            styles: ["\n    .md2-accordion { display: block; }\n  "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$11('design:paramtypes', [])
    ], Md2Accordion);
    return Md2Accordion;
}());

var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2AccordionTab = (function () {
    function Md2AccordionTab(accordion) {
        this.accordion = accordion;
        this.class = '';
        this.accordion.addTab(this);
    }
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    Md2AccordionTab.prototype.toggle = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        var index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this.accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this.accordion.multiple) {
            for (var i = 0; i < this.accordion.tabs.length; i++) {
                this.accordion.tabs[i].active = false;
            }
            this.active = true;
            this.accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this.active = true;
            this.accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    Md2AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate$12([
        _angular_core.Input(), 
        __metadata$12('design:type', String)
    ], Md2AccordionTab.prototype, "class", void 0);
    __decorate$12([
        _angular_core.Input(), 
        __metadata$12('design:type', String)
    ], Md2AccordionTab.prototype, "header", void 0);
    __decorate$12([
        _angular_core.Input(), 
        __metadata$12('design:type', Boolean)
    ], Md2AccordionTab.prototype, "active", void 0);
    __decorate$12([
        _angular_core.Input(), 
        __metadata$12('design:type', Boolean)
    ], Md2AccordionTab.prototype, "disabled", void 0);
    Md2AccordionTab = __decorate$12([
        _angular_core.Component({selector: 'md2-accordion-tab',
            template: "\n    <div class=\"md2-accordion-header\" (click)=\"toggle($event)\">\n      <span class=\"md2-accordion-title\">{{header}}</span>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    .md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 1px 0; border-style: solid; border-color: transparent; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }\n    .md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); }\n    .md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.54); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; }\n    .md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }\n    .md2-accordion-tab .md2-accordion-title { color: rgba(0,0,0,0.85); }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-title { color: #106cc8; }\n    .md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); -webkit-transform: rotate(45deg); transform: rotate(45deg); -moz-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; -webkit-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { -moz-transform: rotate(225deg); -ms-transform: rotate(225deg); -o-transform: rotate(225deg); -webkit-transform: rotate(225deg); transform: rotate(225deg); top: 16px; }\n    .md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; }\n  "],
            host: {
                'role': 'accordion-tab',
                '[class]': 'class',
                '[class.md2-accordion-tab]': 'true',
                '[class.md2-accordion-tab-active]': 'active',
                '[class.md2-accordion-tab-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$12('design:paramtypes', [Md2Accordion])
    ], Md2AccordionTab);
    return Md2AccordionTab;
}());

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MD2_ACCORDION_DIRECTIVES = [Md2Accordion, Md2AccordionTab];
var Md2AccordionModule = (function () {
    function Md2AccordionModule() {
    }
    Md2AccordionModule.forRoot = function () {
        return {
            ngModule: Md2AccordionModule,
            providers: []
        };
    };
    Md2AccordionModule = __decorate$10([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_ACCORDION_DIRECTIVES,
            declarations: MD2_ACCORDION_DIRECTIVES,
        }), 
        __metadata$10('design:paramtypes', [])
    ], Md2AccordionModule);
    return Md2AccordionModule;
}());

var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Item = (function () {
    function Item(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Item;
}());
var noop = function () { };
var nextId = 0;
var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
var Md2Autocomplete = (function () {
    function Md2Autocomplete(element) {
        this.element = element;
        this.change = new _angular_core.EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._items = [];
        this.list = [];
        this.focusedOption = 0;
        this.inputBuffer = '';
        this.selectedItem = null;
        this.inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-autocomplete-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    Md2Autocomplete.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Autocomplete.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: function (value) { this._items = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this.inputBuffer = '';
                if (value) {
                    var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ? i[_this.valueKey] : i, value); });
                    this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                    if (this.selectedItem) {
                        this.inputBuffer = this.selectedItem.text;
                    }
                }
                if (!this.inputBuffer) {
                    this.inputBuffer = '';
                }
                if (this._isInitialized) {
                    this._onChangeCallback(value);
                    this.change.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Autocomplete.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Autocomplete.prototype, "isMenuVisible", {
        get: function () {
            return ((this.inputFocused || this.noBlur) && this.list && this.list.length && !this.selectedItem) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of suggestion menu
     */
    Md2Autocomplete.prototype.updateScroll = function () {
        if (this.focusedOption < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this.focusedOption];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input event listner
     * @param event
     */
    Md2Autocomplete.prototype.inputKeydown = function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case exports.KeyCodes.TAB:
                this.listLeave();
                break;
            case exports.KeyCodes.ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this.inputBuffer) {
                    this.onClear();
                }
                break;
            case exports.KeyCodes.ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.select(event, this.focusedOption);
                }
                break;
            case exports.KeyCodes.DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                    this.updateScroll();
                }
                break;
            case exports.KeyCodes.UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(function () {
                    _this.updateItems(new RegExp(_this.inputBuffer, 'ig'));
                }, 10);
        }
    };
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    Md2Autocomplete.prototype.select = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this.list[index];
        this.inputBuffer = this.list[index].text;
        this.updateValue();
    };
    /**
     * clear selected suggestion
     */
    Md2Autocomplete.prototype.onClear = function () {
        if (this.disabled) {
            return;
        }
        this.inputBuffer = '';
        this.selectedItem = null;
        this.updateItems(new RegExp(this.inputBuffer, 'ig'));
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    };
    /**
     * update value
     */
    Md2Autocomplete.prototype.updateValue = function () {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
        this.onFocus();
    };
    /**
     * component focus listener
     */
    Md2Autocomplete.prototype.onFocus = function () {
        if (this.disabled) {
            return;
        }
        this.element.nativeElement.querySelector('input').focus();
    };
    /**
     * input focus listener
     */
    Md2Autocomplete.prototype.onInputFocus = function () {
        this.inputFocused = true;
        this.updateItems(new RegExp(this.inputBuffer, 'ig'));
        this.focusedOption = 0;
    };
    /**
     * input blur listener
     */
    Md2Autocomplete.prototype.onInputBlur = function () {
        this.inputFocused = false;
    };
    /**
     * suggestion menu mouse enter listener
     */
    Md2Autocomplete.prototype.listEnter = function () { this.noBlur = true; };
    /**
     * suggestion menu mouse leave listener
     */
    Md2Autocomplete.prototype.listLeave = function () { this.noBlur = false; };
    /**
     * Update suggestion to filter the query
     * @param query
     */
    Md2Autocomplete.prototype.updateItems = function (query) {
        var _this = this;
        if (this.inputBuffer.length < this.minLength) {
            this.list = [];
        }
        else {
            this.list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return query.test(i.text); });
            if (this.list.length && this.list[0].text !== this.inputBuffer) {
                this.selectedItem = null;
            }
        }
    };
    Md2Autocomplete.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.inputBuffer = '';
            if (value) {
                var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ? i[_this.valueKey] : i, value); });
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this.inputBuffer = this.selectedItem.text;
                }
            }
            if (!this.inputBuffer) {
                this.inputBuffer = '';
            }
        }
    };
    Md2Autocomplete.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$13([
        _angular_core.Output(), 
        __metadata$13('design:type', _angular_core.EventEmitter)
    ], Md2Autocomplete.prototype, "change", void 0);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', String)
    ], Md2Autocomplete.prototype, "id", void 0);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Number)
    ], Md2Autocomplete.prototype, "tabindex", void 0);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', String)
    ], Md2Autocomplete.prototype, "placeholder", void 0);
    __decorate$13([
        _angular_core.Input('item-text'), 
        __metadata$13('design:type', String)
    ], Md2Autocomplete.prototype, "textKey", void 0);
    __decorate$13([
        _angular_core.Input('item-value'), 
        __metadata$13('design:type', String)
    ], Md2Autocomplete.prototype, "valueKey", void 0);
    __decorate$13([
        _angular_core.Input('min-length'), 
        __metadata$13('design:type', Number)
    ], Md2Autocomplete.prototype, "minLength", void 0);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Boolean)
    ], Md2Autocomplete.prototype, "readonly", null);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Boolean)
    ], Md2Autocomplete.prototype, "required", null);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Boolean)
    ], Md2Autocomplete.prototype, "disabled", null);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Array), 
        __metadata$13('design:paramtypes', [Array])
    ], Md2Autocomplete.prototype, "items", null);
    __decorate$13([
        _angular_core.Input(), 
        __metadata$13('design:type', Object)
    ], Md2Autocomplete.prototype, "value", null);
    Md2Autocomplete = __decorate$13([
        _angular_core.Component({selector: 'md2-autocomplete',
            template: "\n    <div class=\"md2-autocomplete-wrap\" [class.is-focused]=\"inputFocused || isMenuVisible\">\n      <input [(ngModel)]=\"inputBuffer\" type=\"text\" tabs=\"false\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"onInputFocus()\" (blur)=\"onInputBlur()\" (keydown)=\"inputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n      <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"inputBuffer\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <svg *ngIf=\"inputBuffer\" (click)=\"onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"listEnter()\" (mouseleave)=\"listLeave()\">\n      <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.focus]=\"focusedOption === i\" (click)=\"select($event, i)\">\n        <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:inputBuffer\"></div>\n      </li>\n    </ul>\n  ",
            styles: ["\n    md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; }\n    md2-autocomplete .md2-autocomplete-wrap { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; }\n    .md2-autocomplete-wrap.is-focused { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; cursor: default; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap.is-focused { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    .md2-autocomplete-wrap .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input { color: rgba(0,0,0,0.38); }\n    md2-autocomplete .md2-autocomplete-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { color: #2196f3; }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder .md2-placeholder-required { color: #f00; }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder,\n    md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    .md2-autocomplete-wrap svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }\n    .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: #fff; }\n    .md2-autocomplete-menu .md2-option { position: relative; display: block; color: #212121; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; }\n    .md2-autocomplete-menu .md2-option:hover,\n    .md2-autocomplete-menu .md2-option.focus { background: #eeeeee; }\n    .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    .md2-autocomplete-menu .highlight { color: #757575; }\n  "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'autocomplete',
                '[id]': 'id',
                '[class.md2-autocomplete-disabled]': 'disabled',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$13('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Autocomplete);
    return Md2Autocomplete;
}());
var MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, HighlightPipe];
var Md2AutocompleteModule = (function () {
    function Md2AutocompleteModule() {
    }
    Md2AutocompleteModule.forRoot = function () {
        return {
            ngModule: Md2AutocompleteModule,
            providers: []
        };
    };
    Md2AutocompleteModule = __decorate$13([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_AUTOCOMPLETE_DIRECTIVES,
            declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
        }), 
        __metadata$13('design:paramtypes', [])
    ], Md2AutocompleteModule);
    return Md2AutocompleteModule;
}());

var __decorate$14 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$1 = function () { };
var nextId$1 = 0;
var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Chips; }),
    multi: true
};
var Md2Chips = (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.addOnBlur = true;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = 'Add New';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.readonly = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.id = 'md2-chips-' + (++nextId$1);
        this.change = new _angular_core.EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.isFocused = false;
    }
    Object.defineProperty(Md2Chips.prototype, "element", {
        get: function () {
            var elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
            elements.mainDiv = elements.root.querySelector('.md2-chips-container');
            elements.template = elements.mainDiv.querySelector('.md2-template');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "value", {
        get: function () {
            return this.value;
        },
        /**
         * set value
         * @param value
         */
        set: function (v) {
            this.onChangeCallback(v);
            this.change.emit(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Md2Chips.prototype.changeAutocomplete = function (value) {
        if (value) {
            this.addNewChip([value]);
            this.item = null;
        }
    };
    Md2Chips.prototype.ngAfterContentInit = function () {
        var elements = this.element;
        if (this.ngModel) {
            this.chipItemList = this.ngModel;
        }
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    /**
     * input key listener
     * @param event
     */
    Md2Chips.prototype.inputChanged = function (event) {
        var key = event.keyCode;
        switch (key) {
            //back space
            case exports.KeyCodes.BACKSPACE:
                this.backspaceEvent();
                break;
            //delete
            case exports.KeyCodes.DELETE:
                this.backspaceEvent();
                break;
            //left arrow
            case exports.KeyCodes.LEFT_ARROW:
                event.preventDefault();
                if (this.selectedChip) {
                    if (this.selectedChip < 0) {
                        this.selectedChip = this.chipItemList.length - 1;
                    }
                    else {
                        this.selectedChip = this.selectedChip - 1;
                    }
                }
                break;
            //right arrow
            case exports.KeyCodes.RIGHT_ARROW:
                event.preventDefault();
                if (this.selectedChip != -1) {
                    if (this.selectedChip >= this.chipItemList.length) {
                        this.selectedChip = 0;
                    }
                    else {
                        this.selectedChip = this.selectedChip + 1;
                    }
                }
                break;
            //enter
            case exports.KeyCodes.ENTER:
                if (this.addOnEnter) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            //comma
            case exports.KeyCodes.COMMA:
                if (this.addOnComma) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            //space
            case exports.KeyCodes.SPACE:
                if (this.addOnSpace) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    Md2Chips.prototype.inputBlurred = function (event) {
        if (this.addOnBlur && !this.readonly) {
            this.addNewChip([this.inputValue]);
        }
        this.isFocused = false;
    };
    Md2Chips.prototype.inputFocus = function (event) {
        this.isFocused = true;
    };
    Md2Chips.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var chips = this.addRegExpString(pastedString);
        var chipsToAdd = chips.filter(function (chip) { return _this._isValid(chip); });
        this.addNewChip(chipsToAdd);
        setTimeout(function () { return _this._resetInput(); });
    };
    Md2Chips.prototype.addRegExpString = function (chipInputString) {
        chipInputString = chipInputString.trim();
        var chips = chipInputString.split(this.splitRegExp);
        return chips.filter(function (chip) { return !!chip; });
    };
    Md2Chips.prototype._isValid = function (chipString) {
        if (this.chipItemList.indexOf(chipString) === -1)
            return this.allowedPattern.test(chipString);
    };
    /**
    * add new chip
    * @param chips
    */
    Md2Chips.prototype.addNewChip = function (chips) {
        var _this = this;
        var validInput = chips.filter(function (chip) { return _this._isValid(chip); });
        if (this.maxChips) {
            if (this.chipItemList.length < this.maxChips) {
                this.chipItemList = this.chipItemList.concat(validInput.map(function (chip) { return chip.trim(); }));
            }
        }
        else {
            this.chipItemList = this.chipItemList.concat(validInput.map(function (chip) { return chip.trim(); }));
            this.item = null;
        }
        this._resetSelected();
        this._resetInput();
        this.onChangeCallback(this.chipItemList);
        this.change.emit(this.chipItemList);
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    Md2Chips.prototype.removeSelectedChip = function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.onChangeCallback(this.chipItemList);
        this.change.emit(this.chipItemList);
    };
    /**
    * select chip
    * @param index of select chip
    */
    Md2Chips.prototype.selectChip = function (index) {
        if (index >= -1 && index <= this.chipItemList.length) {
            this.selectedChip = index;
        }
    };
    Md2Chips.prototype.backspaceEvent = function () {
        if (!this.inputValue.length && this.chipItemList.length && this.isRemovable) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    };
    Md2Chips.prototype._resetSelected = function () {
        this.selectedChip = -1;
    };
    Md2Chips.prototype._resetInput = function () {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    };
    Md2Chips.prototype.writeValue = function (value) {
        this.value = value;
        this.chipItemList = value;
    };
    Md2Chips.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    Md2Chips.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "addOnBlur", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "addOnComma", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "addOnEnter", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "addOnPaste", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "addOnSpace", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', RegExp)
    ], Md2Chips.prototype, "allowedPattern", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Array)
    ], Md2Chips.prototype, "ngModel", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', String)
    ], Md2Chips.prototype, "pasteSplitPattern", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', String)
    ], Md2Chips.prototype, "placeholder", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Array)
    ], Md2Chips.prototype, "autocompleteDataList", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "isAutoComplete", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "isRemovable", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], Md2Chips.prototype, "readonly", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Number)
    ], Md2Chips.prototype, "minChips", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Number)
    ], Md2Chips.prototype, "maxChips", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', String)
    ], Md2Chips.prototype, "id", void 0);
    __decorate$14([
        _angular_core.Output(), 
        __metadata$14('design:type', _angular_core.EventEmitter)
    ], Md2Chips.prototype, "change", void 0);
    __decorate$14([
        _angular_core.ViewChild('chipInputForm'), 
        __metadata$14('design:type', _angular_forms.NgForm)
    ], Md2Chips.prototype, "chipInputForm", void 0);
    __decorate$14([
        _angular_core.HostListener('focus'), 
        __metadata$14('design:type', Function), 
        __metadata$14('design:paramtypes', [Event]), 
        __metadata$14('design:returntype', void 0)
    ], Md2Chips.prototype, "inputBlurred", null);
    Md2Chips = __decorate$14([
        _angular_core.Component({
            selector: 'md2-chips',
            template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"readonly\">\n        <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\">\n            <span>{{chip}}</span>\n            <span [innerHTML]=\"templateHtmlString\"></span>\n            <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"  *ngIf=\"isRemovable\">\n              <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n            </svg>            \n        </span>\n        <ng-content select=\".md2-template\"></ng-content>      \n        <form #chipInputForm=\"ngForm\" class=\"chip-input-form\" *ngIf=\"!readonly\">\n            <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" type=\"text\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\"/>\n            <div *ngIf=\"isAutoComplete\">\n                <md2-autocomplete [items]=\"autocompleteDataList\"\n                                item-text=\"name\"\n                                [(ngModel)]=\"item\" name=\"autocomplete\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\">\n\t\t        </md2-autocomplete>\n            </div>\n        </form>\n    </div>   \n    <div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div>\n    <div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>\n",
            styles: ["\n    .template-content{display:inline;}\n    md2-chips{outline:none;}\n    md2-chips .md2-chips-container{display: block;box-shadow: 0 1px #ccc;padding: 5px 0;margin-bottom:10px;min-height:50px;box-sizing: border-box;clear:both;}\n    md2-chips .md2-chips-container:after{clear:both;content:'';display:table;}\n    md2-chips.chip-input-focus .md2-chips-container{box-shadow: 0 2px #0d8bff;}\n    md2-chips .md2-chip-disabled{cursor: default;}\n    md2-chips md2-autocomplete{margin:7px 0;}\n    md2-chips .md2-autocomplete-wrap{border-bottom:0 !important;}\n    .md2-template{display:none;}\n    .chip-input-disabled{pointer-events: none;cursor: default;}\n    .md2-chip{font-size: 16px;position: relative;cursor: default;border-radius: 16px;display: block;height: 32px;line-height: 32px;margin: 8px 8px 0 0;padding: 0 28px 0 12px;float: left;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;max-width: 100%;background: rgb(224,224,224);color: rgb(66,66,66);white-space: nowrap;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;}\n    .md2-chip.active {color: white;background: #0d8bff;}    \n    .chip-input-form {display: inline-block;height:32px;margin: 8px 8px 0 0;}\n    .md2-chip svg {position: absolute; top: 4px; right: 4px; cursor: pointer; display: inline-block; overflow: hidden;fill: currentColor; color: rgba(0,0,0,0.54); }\n    .md2-chip.active svg { color: rgba(255,255,255,0.87); }\n    .chip-remove {cursor: pointer;display: inline-block;padding: 0 3px;color: #616161;font-size: 30px;vertical-align: top;line-height: 21px;font-family: serif;}\n    .chip-input {display: inline-block;width: auto;box-shadow: one;border: 0;outline:none;height: 32px;line-height: 32px;font-size: 16px;}\n    .chip-error{font-size:13px;color:#fd0f0f;}\n    .md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0!important;}\n  "],
            providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'chips',
                '[id]': 'id',
                '[tabindex]': 'readonly ? -1 : tabindex',
                '[class.chip-input-focus]': 'isFocused || selectedChip >= 0',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$14('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Chips);
    return Md2Chips;
}());
var MD2_CHIPS_DIRECTIVES = [Md2Chips];
var Md2ChipsModule = (function () {
    function Md2ChipsModule() {
    }
    Md2ChipsModule.forRoot = function () {
        return {
            ngModule: Md2ChipsModule,
            providers: []
        };
    };
    Md2ChipsModule = __decorate$14([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            declarations: MD2_CHIPS_DIRECTIVES,
            exports: MD2_CHIPS_DIRECTIVES
        }), 
        __metadata$14('design:paramtypes', [])
    ], Md2ChipsModule);
    return Md2ChipsModule;
}());

var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Collapse = (function () {
    function Md2Collapse() {
        this.isExpanded = true;
        this.isCollapsing = false;
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: function () { return this.isExpanded; },
        set: function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    Md2Collapse.prototype.toggle = function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * hide collapse
     */
    Md2Collapse.prototype.hide = function () {
        var _this = this;
        this.isCollapsing = true;
        this.isExpanded = false;
        setTimeout(function () {
            _this.isCollapsing = false;
        }, 4);
    };
    /**
     * show collapse
     */
    Md2Collapse.prototype.show = function () {
        var _this = this;
        this.isCollapsing = true;
        this.isExpanded = true;
        setTimeout(function () {
            _this.isCollapsing = false;
        }, 4);
    };
    __decorate$15([
        _angular_core.Input(), 
        __metadata$15('design:type', Boolean)
    ], Md2Collapse.prototype, "collapse", null);
    Md2Collapse = __decorate$15([
        _angular_core.Directive({
            selector: '[collapse]',
            host: {
                '[class.in]': 'isExpanded',
                '[class.collapse]': 'true',
                '[class.collapsing]': 'isCollapsing',
                '[attr.aria-expanded]': 'isExpanded',
                '[attr.aria-hidden]': '!isExpanded',
            }
        }), 
        __metadata$15('design:paramtypes', [])
    ], Md2Collapse);
    return Md2Collapse;
}());
var MD2_COLLAPSE_DIRECTIVES = [Md2Collapse];
var Md2CollapseModule = (function () {
    function Md2CollapseModule() {
    }
    Md2CollapseModule.forRoot = function () {
        return {
            ngModule: Md2CollapseModule,
            providers: []
        };
    };
    Md2CollapseModule = __decorate$15([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_COLLAPSE_DIRECTIVES,
            declarations: MD2_COLLAPSE_DIRECTIVES,
        }), 
        __metadata$15('design:paramtypes', [])
    ], Md2CollapseModule);
    return Md2CollapseModule;
}());

var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ColorpickerService = (function () {
    function ColorpickerService() {
    }
    /**
  * hsla to hsva
  * @param hsla
  */
    ColorpickerService.prototype.hsla2hsva = function (hsla) {
        var h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    };
    /**
    * hsva to hsla
    * @param hsva
    */
    ColorpickerService.prototype.hsva2hsla = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    };
    /**
     * rgba to hsva
     * @param rgba
     */
    ColorpickerService.prototype.rgbaToHsva = function (rgba) {
        var r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    };
    /**
     * hsva to rgba
     * @param hsva
     */
    ColorpickerService.prototype.hsvaToRgba = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    };
    /**
     * string to hsva
     * @param colorString
     */
    ColorpickerService.prototype.stringToHsva = function (colorString) {
        var stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        var hsva = null;
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                var parser = stringParsers[key];
                var match = parser.re.exec(colorString), color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    };
    /**
     * output formate of color
     * @param hsva
     * @param outputFormat
     */
    ColorpickerService.prototype.outputFormat = function (hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsla':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                default:
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsla':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    };
    ColorpickerService.prototype.hexText = function (rgba) {
        var mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        var hexText = '#' + mainText.substr(1);
        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6]) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }
        return hexText.toUpperCase();
    };
    ColorpickerService.prototype.denormalizeRGBA = function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    ColorpickerService = __decorate$17([
        _angular_core.Injectable(), 
        __metadata$17('design:paramtypes', [])
    ], ColorpickerService);
    return ColorpickerService;
}());

var __decorate$16 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$2 = function () { };
var nextId$2 = 0;
var MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Colorpicker; }),
    multi: true
};
var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new _angular_core.EventEmitter();
    }
    TextDirective.prototype.changeInput = function (value) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    __decorate$16([
        _angular_core.Output('newValue'), 
        __metadata$16('design:type', Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate$16([
        _angular_core.Input('text'), 
        __metadata$16('design:type', Object)
    ], TextDirective.prototype, "text", void 0);
    __decorate$16([
        _angular_core.Input('rg'), 
        __metadata$16('design:type', Number)
    ], TextDirective.prototype, "rg", void 0);
    TextDirective = __decorate$16([
        _angular_core.Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event.target.value)'
            }
        }), 
        __metadata$16('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
}());
var ColorpickerSliderDirective = (function () {
    function ColorpickerSliderDirective(el) {
        var _this = this;
        this.el = el;
        this.change = new _angular_core.EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    /**
     * set cursor position
     * @param event
     */
    ColorpickerSliderDirective.prototype.setCursor = function (event) {
        var height = this.el.nativeElement.offsetHeight;
        var width = this.el.nativeElement.offsetWidth;
        var x = Math.max(0, Math.min(this.getX(event), width));
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.pointX !== undefined && this.pointY !== undefined) {
            this.change.emit({ s: x / width, v: (1 - y / height), pointX: this.pointX, pointY: this.pointY });
        }
        else if (this.pointX === undefined && this.pointY !== undefined) {
            this.change.emit({ v: y / height, rg: this.pointY });
        }
        else {
            this.change.emit({ v: x / width, rg: this.pointX });
        }
    };
    /**
     * input event listner
     * @param event
     */
    ColorpickerSliderDirective.prototype.move = function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    /**
     * input event listner
     * @param event
     */
    ColorpickerSliderDirective.prototype.start = function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    /**
     * stop mouse event
     */
    ColorpickerSliderDirective.prototype.stop = function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    /**
     * get x
     * @param event
     */
    ColorpickerSliderDirective.prototype.getX = function (event) {
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    };
    /**
     * get y
     * @param event
     */
    ColorpickerSliderDirective.prototype.getY = function (event) {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    };
    __decorate$16([
        _angular_core.Input('colorpicker-slider'), 
        __metadata$16('design:type', String)
    ], ColorpickerSliderDirective.prototype, "slider", void 0);
    __decorate$16([
        _angular_core.Input('point-x'), 
        __metadata$16('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointX", void 0);
    __decorate$16([
        _angular_core.Input('point-y'), 
        __metadata$16('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointY", void 0);
    __decorate$16([
        _angular_core.Output('change'), 
        __metadata$16('design:type', Object)
    ], ColorpickerSliderDirective.prototype, "change", void 0);
    ColorpickerSliderDirective = __decorate$16([
        _angular_core.Directive({
            selector: '[colorpicker-slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata$16('design:paramtypes', [_angular_core.ElementRef])
    ], ColorpickerSliderDirective);
    return ColorpickerSliderDirective;
}());
var Md2Colorpicker = (function () {
    function Md2Colorpicker(service, el) {
        this.service = service;
        this.el = el;
        this._innerValue = '';
        this._onTouchedCallback = noop$2;
        this._onChangeCallback = noop$2;
        this._defalutColor = '#000000';
        this.cFormat = 'hex';
        this.colorpickerChange = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId$2);
        this._created = false;
    }
    Object.defineProperty(Md2Colorpicker.prototype, "value", {
        get: function () {
            return this._innerValue;
        },
        /**
        * set accessor including call the onchange callback
        */
        set: function (v) {
            if (v !== this._innerValue) {
                if (v) {
                    this.hsva = this.service.stringToHsva(v);
                }
                this._innerValue = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Md2Colorpicker.prototype.ngOnInit = function () {
        var hsva = this.service.stringToHsva(this._innerValue);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this.service.stringToHsva(this._defalutColor);
        }
        if (this._created) {
            this.colorpickerChange.emit(this.service.outputFormat(hsva, this.cFormat));
            this.change.emit(this.service.outputFormat(hsva, this.cFormat));
        }
        this.sliderDim = new SliderDimension(150, 230, 130, 150);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgba') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsla') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
    };
    /**
    * Show Colorpicker dialog
    */
    Md2Colorpicker.prototype.showColorpicker = function () {
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this.update();
            this._initialColor = this._innerValue;
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        if (this._innerValue != this._initialColor) {
            this.change.emit(this._innerValue);
        }
    };
    /**
    * input event listner
    * @param event
    */
    Md2Colorpicker.prototype.changeInput = function (event) {
        var value = event.target.value;
        this.colorpickerChange.emit(value);
    };
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    Md2Colorpicker.prototype.setSaturation = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    Md2Colorpicker.prototype.setLightness = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    Md2Colorpicker.prototype.setHue = function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    Md2Colorpicker.prototype.setAlpha = function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    Md2Colorpicker.prototype.setR = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setG = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setB = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setSaturationAndBrightness = function (val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    };
    /**
    * change color
    * @param value
    */
    Md2Colorpicker.prototype.colorChanged = function (value) {
        this.colorpickerChange.emit(value);
        this._onChangeCallback(value);
        this._innerValue = value;
    };
    /**
    * set color
    * @param value
    */
    Md2Colorpicker.prototype.setColorFromString = function (value) {
        var hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    Md2Colorpicker.prototype.formatPolicy = function () {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    };
    /**
     * update color
     */
    Md2Colorpicker.prototype.update = function () {
        var hsla = this.service.hsva2hsla(this.hsva);
        var rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        var hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = this.service.hexText(rgba);
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this.service.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h - 8, this.hsva.s * this.sliderDim.s - 8, (1 - this.hsva.v) * this.sliderDim.v - 8, this.hsva.a * this.sliderDim.a - 8);
        this.colorChanged(this.outputColor);
    };
    Md2Colorpicker.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    Md2Colorpicker.prototype.clickOk = function () {
        this._isColorpickerVisible = false;
        if (this._innerValue != this._initialColor) {
            this.change.emit(this._innerValue);
        }
        this.closeColorpicker();
    };
    /**
    * deselect recent color and close popup
    */
    Md2Colorpicker.prototype.cancelColor = function () {
        this._innerValue = this._initialColor;
        this.setColorFromString(this._innerValue);
        this.closeColorpicker();
    };
    /**
    * close color picker
    */
    Md2Colorpicker.prototype.closeColorpicker = function () {
        this._isColorpickerVisible = false;
        this.setColorFromString(this._innerValue);
    };
    /**
     * create color box
     * @param element
     * @param offset
     */
    Md2Colorpicker.prototype.createBox = function (element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };
    Md2Colorpicker.prototype.writeValue = function (value) { this.value = value; };
    Md2Colorpicker.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Colorpicker.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$16([
        _angular_core.Input('format'), 
        __metadata$16('design:type', String)
    ], Md2Colorpicker.prototype, "cFormat", void 0);
    __decorate$16([
        _angular_core.Output('colorpickerChange'), 
        __metadata$16('design:type', Object)
    ], Md2Colorpicker.prototype, "colorpickerChange", void 0);
    __decorate$16([
        _angular_core.Output(), 
        __metadata$16('design:type', Object)
    ], Md2Colorpicker.prototype, "change", void 0);
    __decorate$16([
        _angular_core.Input(), 
        __metadata$16('design:type', Number)
    ], Md2Colorpicker.prototype, "tabindex", void 0);
    __decorate$16([
        _angular_core.Input(), 
        __metadata$16('design:type', Boolean)
    ], Md2Colorpicker.prototype, "disabled", void 0);
    __decorate$16([
        _angular_core.Input(), 
        __metadata$16('design:type', String)
    ], Md2Colorpicker.prototype, "id", void 0);
    Md2Colorpicker = __decorate$16([
        _angular_core.Component({selector: 'md2-colorpicker',
            template: "<div class=\"color-picker-selector\" (click)=\"showColorpicker()\"> <div class=\"color-div\" [style.background-color]=\"_innerValue\"> </div> <label class=\"color-text\">{{_innerValue}}</label> </div> <div class=\"md2-colorpicker-wrapper\"  [class.active]=\"_isColorpickerVisible\"> <div class=\"md2-color-picker\" [style.top.px]=\"top\" [style.left.px]=\"left\" > <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\"> <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\"> <div [style.left.px]=\"slider.h\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [style.background-color]=\"alphaColor\" [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\"> <div [style.left.px]=\"slider.a\" class=\"cursor\"></div> </div> <div [style.background-color]=\"outputColor\" class=\"selected-color\"></div> <div [hidden]=\"format!=2\" class=\"hsla-text\"> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" /> <input [text] type=\"number\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" /> <div>H</div><div>S</div><div>L</div><div>A</div> </div> <div [hidden]=\"format!=1\" class=\"rgba-text\"> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" /> <input [text] type=\"number\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" /> <div>R</div><div>G</div><div>B</div><div>A</div> </div> <div [hidden]=\"format!=0\" class=\"hex-text\"> <input [text] (newValue)=\"setColorFromString($event)\" [value]=\"hexText\" /> <div>Hex</div> </div> <div (click)=\"formatPolicy()\" class=\"type-policy\"></div> <div class=\"md2-color-picker-ok-btn\" (click)=\"clickOk()\">OK</div> <div class=\"md2-color-picker-cancel-btn\" (click)=\"cancelColor()\">Cancel</div> </div> </div> ",
            styles: ["md2-colorpicker { position: relative; display: block; max-width: 200px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-colorpicker-wrapper { width: 230px; height: 270px; position: absolute; border-radius: 2px; background-color: #fff; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-colorpicker-wrapper.active { transform: scale(1); } md2-colorpicker.md2-colorpicker-disabled { pointer-events: none; cursor: default; } .color-picker-selector .color-div { height: 30px; width: 30px; display: inline-block; overflow: hidden; cursor: pointer; border-radius: 50%; vertical-align: middle; box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.2), 0 1px 1px 1px rgba(0, 0, 0, 0.14), 0 1px 1px 1px rgba(0, 0, 0, 0.12); } .color-picker-selector .color-text { display: inline-block; margin-left: 5px; vertical-align: middle; cursor: pointer; vertical-align: middle; line-height: 30px; } .md2-color-picker, .md2-color-picker * { box-sizing: border-box; margin: 0; font-size: 12px; } .md2-color-picker i { cursor: default; position: relative; } .md2-color-picker .md2-color-picker-ok-btn { position: absolute; bottom: 5px; right: 80px; border-radius: 3px; padding: 2px 7px; box-sizing: border-box; background: transparent; text-align: center; overflow: hidden; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: middle; font-size: 12px; font-weight: 500; text-transform: uppercase; line-height: 26px; transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transform: translate3d(0, 0, 0); box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); color: rgba(0, 0, 0, 0.87059); background-color: #fafafa; } .md2-color-picker .md2-color-picker-ok-btn:hover { background-color: rgba(158, 158, 158, 0.2); } .md2-color-picker .md2-color-picker-cancel-btn { position: absolute; bottom: 5px; right: 7px; border-radius: 3px; padding: 2px 7px; box-sizing: border-box; background: transparent; text-align: center; overflow: hidden; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: middle; font-size: 12px; font-weight: 500; text-transform: uppercase; line-height: 26px; transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transform: translate3d(0, 0, 0); box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); color: rgba(0, 0, 0, 0.87059); background-color: #fafafa; } .md2-color-picker .md2-color-picker-cancel-btn:hover { background-color: rgba(158, 158, 158, 0.2); } .md2-color-picker div.cursor-sv { cursor: default; position: relative; border-radius: 50%; width: 15px; height: 15px; border: #ddd solid 1px; } .md2-color-picker div.cursor { cursor: crosshair; position: relative; border-radius: 50%; width: 15px; height: 15px; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), inset 0 0 2px 0 rgba(0, 0, 0, 0.5); border: 2px solid #fff; } .md2-color-picker .saturation-lightness { width: 100%; height: 130px; border: none; top: 0; left: 0; position: absolute; background-image: url(\"data:image/png;base64,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\"); overflow: hidden; border-radius: 4px 4px 0 0; } .md2-color-picker .saturation-lightness:hover { cursor: crosshair; } .md2-color-picker .hue { width: 150px; height: 16px; border: none; top: 140px; left: 60px; position: absolute; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC\"); } .md2-color-picker .alpha { width: 150px; height: 16px; border: none; top: 165px; left: 60px; position: absolute; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==\"); } .md2-color-picker .selected-color { width: 45px; height: 45px; top: 140px; left: 2%; position: absolute; border: 1px solid #cccccc; } .hex-text { position: absolute; top: 190px; left: 30px; font-size: 11px; } .hex-text input { float: left; width: 150px; border: 1px solid #a9a9a9; padding: 4px; } .hex-text div { text-align: center; color: #555; float: left; clear: left; width: 160px; margin-top: 4px; } .hsla-text, .rgba-text { position: absolute; top: 190px; left: 12px; font-size: 11px; } .hsla-text input, .rgba-text input { margin: 0 0 0 7px; float: left; width: 40px; border: 1px solid #a9a9a9; padding: 4px 0; } .hsla-text div, .rgba-text div { float: left; width: 40px; text-align: center; color: #555; margin-left: 7px; margin-top: 4px; } .hsla-text div:nth-child(5), .rgba-text div:nth-child(5) { clear: left; } .type-policy { position: absolute; top: 190px; left: 206px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==); background-repeat: no-repeat; background-position: center; background-size: 8px 16px; -moz-background-size: 8px 16px; -webkit-background-size: 8px 16px; -o-background-size: 8px 16px; width: 16px; height: 24px; } /*# sourceMappingURL=colorpicker.css.map */ "],
            providers: [MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'colorpicker',
                '[id]': 'id',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[class.md2-colorpicker-disabled]': 'disabled',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$16('design:paramtypes', [ColorpickerService, _angular_core.ElementRef])
    ], Md2Colorpicker);
    return Md2Colorpicker;
}());
var Hsva = (function () {
    function Hsva(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return Hsva;
}());
var Hsla = (function () {
    function Hsla(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    return Hsla;
}());
var Rgba = (function () {
    function Rgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Rgba;
}());
var SliderPosition = (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
var SliderDimension = (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());
var MD2_COLORPICKER_DIRECTIVES = [Md2Colorpicker, ColorpickerSliderDirective, TextDirective];
var Md2ColorpickerModule = (function () {
    function Md2ColorpickerModule() {
    }
    Md2ColorpickerModule.forRoot = function () {
        return {
            ngModule: Md2ColorpickerModule
        };
    };
    Md2ColorpickerModule = __decorate$16([
        _angular_core.NgModule({
            declarations: MD2_COLORPICKER_DIRECTIVES,
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_COLORPICKER_DIRECTIVES,
            providers: [ColorpickerService]
        }), 
        __metadata$16('design:paramtypes', [])
    ], Md2ColorpickerModule);
    return Md2ColorpickerModule;
}());

var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Md2DataTable = (function () {
    function Md2DataTable() {
        this.onDataChange = new _angular_core.EventEmitter();
        this.onSortChange = new _angular_core.EventEmitter();
        this.onPageChange = new _angular_core.EventEmitter();
        this.sortField = '';
        this.sortOrder = 'asc';
        this.isDataChanged = false;
        this.inputData = [];
        this.pageLength = 1000;
        this.activePage = 1;
    }
    Md2DataTable.prototype.getSort = function () {
        return { sortField: this.sortField, sortOrder: this.sortOrder };
    };
    Md2DataTable.prototype.setSort = function (sortField, sortOrder) {
        if (this.sortField !== sortField || this.sortOrder !== sortOrder) {
            this.sortField = sortField;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.emit({ sortField: sortField, sortOrder: sortOrder });
        }
    };
    Md2DataTable.prototype.getPage = function () {
        return { activePage: this.activePage, pageLength: this.pageLength, dataLength: this.inputData.length };
    };
    Md2DataTable.prototype.setPage = function (activePage, pageLength) {
        if (this.pageLength !== pageLength || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.pageLength, pageLength);
            this.pageLength = pageLength;
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
        }
    };
    Md2DataTable.prototype.calculateNewActivePage = function (previousPageLength, currentPageLength) {
        var firstRowOnPage = (this.activePage - 1) * previousPageLength + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentPageLength);
        return newActivePage;
    };
    Md2DataTable.prototype.recalculatePage = function () {
        var _lastPage = Math.ceil(this.inputData.length / this.pageLength);
        this.activePage = _lastPage < this.activePage ? _lastPage : this.activePage;
        this.activePage = this.activePage || 1;
    };
    Md2DataTable.prototype.ngOnChanges = function (changes) {
        if (changes['inputData']) {
            this.inputData = changes['inputData'].currentValue || [];
            this.recalculatePage();
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
            this.isDataChanged = true;
        }
    };
    Md2DataTable.prototype.ngDoCheck = function () {
        if (this.isDataChanged) {
            this.fillData();
            this.isDataChanged = false;
        }
    };
    Md2DataTable.prototype.fillData = function () {
        this.activePage = this.activePage;
        this.pageLength = this.pageLength;
        var offset = (this.activePage - 1) * this.pageLength;
        var data = this.inputData;
        var sortField = this.sortField;
        if (sortField) {
            data = data.sort(function (a, b) {
                var x = isNaN(a[sortField + '']) ? a[sortField + ''].toLowerCase() : a[sortField + ''];
                var y = isNaN(b[sortField + '']) ? b[sortField + ''].toLowerCase() : b[sortField + ''];
                return (x > y) ? 1 : (y > x) ? -1 : 0;
            });
        }
        if (this.sortOrder === 'desc') {
            data.reverse();
        }
        this.data = data.slice(offset, offset + this.pageLength);
    };
    Md2DataTable.prototype.caseInsensitiveIteratee = function (sortField) {
        return function (row) {
            var value = row[sortField];
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    };
    __decorate$18([
        _angular_core.Input('md2-data'), 
        __metadata$18('design:type', Array)
    ], Md2DataTable.prototype, "inputData", void 0);
    __decorate$18([
        _angular_core.Input('md2-page-length'), 
        __metadata$18('design:type', Object)
    ], Md2DataTable.prototype, "pageLength", void 0);
    __decorate$18([
        _angular_core.Input('md2-active-page'), 
        __metadata$18('design:type', Object)
    ], Md2DataTable.prototype, "activePage", void 0);
    Md2DataTable = __decorate$18([
        _angular_core.Directive({
            selector: 'table[md2-data]',
            exportAs: 'Md2DataTable'
        }), 
        __metadata$18('design:paramtypes', [])
    ], Md2DataTable);
    return Md2DataTable;
}());
var Md2DataTableSortField = (function () {
    function Md2DataTableSortField(_md2Table) {
        var _this = this;
        this._md2Table = _md2Table;
        this.isAsc = false;
        this.isDesc = false;
        _md2Table.onSortChange.subscribe(function (event) {
            _this.isAsc = (event.sortField === _this.sortField && event.sortOrder === "asc");
            _this.isDesc = (event.sortField === _this.sortField && event.sortOrder === "desc");
        });
    }
    Md2DataTableSortField.prototype._sort = function () {
        if (this.isAsc) {
            this._md2Table.setSort(this.sortField, "desc");
        }
        else {
            this._md2Table.setSort(this.sortField, "asc");
        }
    };
    __decorate$18([
        _angular_core.Input('md2-sort-field'), 
        __metadata$18('design:type', String)
    ], Md2DataTableSortField.prototype, "sortField", void 0);
    Md2DataTableSortField = __decorate$18([
        _angular_core.Component({
            selector: "[md2-sort-field]",
            template: "\n    <span (click)=\"_sort()\">\n      <ng-content></ng-content>\n      <svg *ngIf=\"isAsc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 14l5-5 5 5z\"/>\n      </svg>\n      <svg *ngIf=\"isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\"/>\n      </svg>\n      <svg *ngIf=\"!isAsc && !isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7,10.5l5-5l5,5H7z\"/>\n        <path d=\"M7,12.5l5,5l5-5H7z\"/>\n      </svg>\n    </span>\n  ",
            styles: ["\n    [md2-sort-field] span { position: relative; display: block; line-height: 24px; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    [md2-sort-field] span svg { display: inline-block; vertical-align: middle; fill: currentColor; }\n  "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$18('design:paramtypes', [Md2DataTable])
    ], Md2DataTableSortField);
    return Md2DataTableSortField;
}());
var Md2Pagination = (function () {
    function Md2Pagination(injectMd2Table) {
        var _this = this;
        this.injectMd2Table = injectMd2Table;
        this._minRows = 0;
        this.dataLength = 0;
        this.rows = [];
        this._onPageChange = function (event) {
            _this._activePage = event.activePage;
            _this._rows = event.pageLength;
            _this.dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this.dataLength / _this._rows);
        };
    }
    Md2Pagination.prototype.ngOnChanges = function (changes) {
        if (changes.rows) {
        }
        this._md2Table = this.md2InputTable || this.injectMd2Table;
        this._onPageChange(this._md2Table.getPage());
        this._md2Table.onPageChange.subscribe(this._onPageChange);
    };
    Md2Pagination.prototype._setPage = function (page) {
        this._md2Table.setPage(page, this._rows);
    };
    Md2Pagination.prototype._setRows = function (rows) {
        this._md2Table.setPage(this._activePage, rows);
    };
    __decorate$18([
        _angular_core.Input('md2-rows'), 
        __metadata$18('design:type', Object)
    ], Md2Pagination.prototype, "rows", void 0);
    __decorate$18([
        _angular_core.Input('md2-table'), 
        __metadata$18('design:type', Md2DataTable)
    ], Md2Pagination.prototype, "md2InputTable", void 0);
    Md2Pagination = __decorate$18([
        _angular_core.Component({
            selector: 'md2-pagination',
            template: "\n    <ul class=\"md2-pagination\" *ngIf=\"dataLength > _rows\">\n      <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(1)\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </li>\n      <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">{{_activePage-4}}</li>\n      <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">{{_activePage-3}}</li>\n      <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">{{_activePage-2}}</li>\n      <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">{{_activePage-1}}</li>\n      <li class=\"active\">{{_activePage}}</li>\n      <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">{{_activePage+1}}</li>\n      <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">{{_activePage+2}}</li>\n      <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">{{_activePage+3}}</li>\n      <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">{{_activePage+4}}</li>\n      <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_lastPage)\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </li>\n    </ul>\n    <ul class=\"md2-pagination md2-rows\" *ngIf=\"dataLength > _minRows\">\n      <li *ngFor=\"let row of rows\" [class.active]=\"_rows===row\" (click)=\"_setRows(row)\">{{row}}</li>\n    </ul>\n  ",
            styles: ["\n    md2-pagination { display: block; color: #0e59a5; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    md2-pagination .md2-pagination { display: inline-block; margin: .5rem 0; padding: 0; }\n    md2-pagination .md2-pagination li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; }\n    md2-pagination .md2-pagination li:hover { background: rgba(0,0,0,0.12); }\n    md2-pagination .md2-pagination li.disabled,\n    md2-pagination .md2-pagination li.disabled:hover { pointer-events: none; background: transparent; cursor: default; opacity: .5; }\n    md2-pagination .md2-pagination li.active,\n    md2-pagination .md2-pagination li.active:hover { background: #106CC8; color: #fff; cursor: default; }\n    md2-pagination .md2-pagination li svg { fill: currentColor; margin-bottom: -7px; }\n    md2-pagination .md2-pagination.md2-rows { float: right; }\n  "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param(0, _angular_core.Optional()), 
        __metadata$18('design:paramtypes', [Md2DataTable])
    ], Md2Pagination);
    return Md2Pagination;
}());
var MD2_DATA_TABLE_DIRECTIVES = [Md2DataTable, Md2DataTableSortField, Md2Pagination];
var Md2DataTableModule = (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.forRoot = function () {
        return {
            ngModule: Md2DataTableModule,
            providers: []
        };
    };
    Md2DataTableModule = __decorate$18([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_DATA_TABLE_DIRECTIVES,
            declarations: MD2_DATA_TABLE_DIRECTIVES,
        }), 
        __metadata$18('design:paramtypes', [])
    ], Md2DataTableModule);
    return Md2DataTableModule;
}());

var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2DateUtil = (function () {
    function Md2DateUtil() {
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getFirstDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    Md2DateUtil.prototype.getNumberOfDaysInMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateInNextMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateInPreviousMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isSameMonthAndYear = function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isSameDay = function (d1, d2) {
        return d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isInNextMonth = function (startDate, endDate) {
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isInPreviousMonth = function (startDate, endDate) {
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateMidpoint = function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    Md2DateUtil.prototype.getWeekOfMonth = function (date) {
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {Date} date
     * @param {number} numberOfMinutes
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementMinutes = function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {Date} date
     * @param {number} numberOfHours
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementHours = function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementDays = function (date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {Date} date
     * @param {number} numberOfMonths
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementMonths = function (date, numberOfMonths) {
        // If the same date in the target month does not actually exist, the Date object will
        // automatically advance *another* month by the number of missing days.
        // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
        // So, we check if the month overflowed and go to the last day of the target month instead.
        var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        var numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    };
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    Md2DateUtil.prototype.getMonthDistance = function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getLastDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    Md2DateUtil.prototype.isValidDate = function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    Md2DateUtil.prototype.setDateTimeToMidnight = function (date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    };
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {number|Date=} opt_value
     * @return {Date} New date with time set to midnight.
     */
    Md2DateUtil.prototype.createDateAtMidnight = function (opt_value) {
        var date;
        if (!opt_value) {
            date = new Date();
        }
        else {
            date = new Date(opt_value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    };
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    Md2DateUtil.prototype.isDateWithinRange = function (date, minDate, maxDate) {
        var dateAtMidnight = this.createDateAtMidnight(date);
        var minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        var maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    };
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {Date} date
     * @param {number} numberOfYears
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementYears = function (date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    };
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    Md2DateUtil.prototype.getYearDistance = function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {Date} date Date to be clamped
     * @param {Date=} minDate Minimum date
     * @param {Date=} maxDate Maximum date
     * @return {Date}
     */
    Md2DateUtil.prototype.clampDate = function (date, minDate, maxDate) {
        var boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    };
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param  {HTMLElement} node Node from which the timestamp will be extracted.
     * @return {number} Time since epoch.
     */
    Md2DateUtil.prototype.getTimestampFromNode = function (node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    };
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    Md2DateUtil.prototype.isMonthWithinRange = function (date, minDate, maxDate) {
        var month = date.getMonth();
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    };
    Md2DateUtil = __decorate$20([
        _angular_core.Injectable(), 
        __metadata$20('design:paramtypes', [])
    ], Md2DateUtil);
    return Md2DateUtil;
}());

var __decorate$19 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$19 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$3 = function () { };
var nextId$3 = 0;
var MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
var Md2Datepicker = (function () {
    function Md2Datepicker(dateUtil, element) {
        this.dateUtil = dateUtil;
        this.element = element;
        //private mouseMoveListener: any;
        //private mouseUpListener: any;
        this._value = null;
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop$3;
        this._onChangeCallback = noop$3;
        this.isHoursVisible = true;
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.hours = [];
        this.minutes = [];
        this.prevMonth = 1;
        this.currMonth = 2;
        this.nextMonth = 3;
        this.years = [];
        this.dates = [];
        this.today = new Date();
        this._displayDate = null;
        this.selectedDate = null;
        this.displayDay = { year: 0, month: '', date: '', day: '', hour: '', minute: '' };
        this.displayInputDate = '';
        this.clock = {
            dialRadius: 120,
            outerRadius: 99,
            innerRadius: 66,
            tickRadius: 17,
            hand: { x: 0, y: 0 },
            x: 0, y: 0,
            dx: 0, dy: 0,
            moved: false
        };
        this._minDate = null;
        this._maxDate = null;
        this.change = new _angular_core.EventEmitter();
        this.type = 'date';
        this.name = '';
        this.id = 'md2-datepicker-' + (++nextId$3);
        this.format = this.type === 'date' ? 'DD/MM/YYYY' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
        this.tabindex = 0;
        this.getYears();
        this.generateClock();
        //this.mouseMoveListener = (event: MouseEvent) => { this.onMouseMoveClock(event); };
        //this.mouseUpListener = (event: MouseEvent) => { this.onMouseUpClock(event); };
    }
    Md2Datepicker.prototype.ngAfterContentInit = function () {
        this._isInitialized = true;
        this.isCalendarVisible = this.type !== 'time' ? true : false;
    };
    Object.defineProperty(Md2Datepicker.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        set: function (value) {
            this._minDate = new Date(value);
            this._minDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        set: function (value) {
            this._maxDate = new Date(value);
            this._maxDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (value && value !== this._value) {
                if (this.dateUtil.isValidDate(value)) {
                    this._value = value;
                }
                else {
                    if (this.type === 'time') {
                        this._value = new Date('1-1-1 ' + value);
                    }
                    else {
                        this._value = new Date(value);
                    }
                }
                this.displayInputDate = this._formatDate(this._value);
                var date = '';
                if (this.type !== 'time') {
                    date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) + '-' + this._value.getDate();
                }
                if (this.type === 'datetime') {
                    date += ' ';
                }
                if (this.type !== 'date') {
                    date += this._value.getHours() + ':' + this._value.getMinutes();
                }
                if (this._isInitialized) {
                    this._onChangeCallback(date);
                    this.change.emit(date);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "displayDate", {
        get: function () {
            if (this._displayDate && this.dateUtil.isValidDate(this._displayDate)) {
                return this._displayDate;
            }
            else {
                return this.today;
            }
        },
        set: function (date) {
            if (date && this.dateUtil.isValidDate(date)) {
                if (this._minDate && this._minDate > date) {
                    date = this._minDate;
                }
                if (this._maxDate && this._maxDate < date) {
                    date = this._maxDate;
                }
                this._displayDate = date;
                this.displayDay = {
                    year: date.getFullYear(),
                    month: this.months[date.getMonth()],
                    date: this._prependZero(date.getDate() + ''),
                    day: this.days[date.getDay()],
                    hour: this._prependZero(date.getHours() + ''),
                    minute: this._prependZero(date.getMinutes() + '')
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };
    Md2Datepicker.prototype.onKeyDown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isDatepickerVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case exports.KeyCodes.TAB:
                case exports.KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
            }
            var displayDate = this.displayDate;
            if (this.isYearsVisible) {
                switch (event.keyCode) {
                    case exports.KeyCodes.ENTER:
                    case exports.KeyCodes.SPACE:
                        this.onClickOk();
                        break;
                    case exports.KeyCodes.DOWN_ARROW:
                        if (this.displayDate.getFullYear() === (this.today.getFullYear() + 100))
                            break;
                        this.displayDate = this.dateUtil.incrementYears(displayDate, 1);
                        this._scrollToSelectedYear();
                        break;
                    case exports.KeyCodes.UP_ARROW:
                        if (this.displayDate.getFullYear() === 1900)
                            break;
                        this.displayDate = this.dateUtil.incrementYears(displayDate, -1);
                        this._scrollToSelectedYear();
                        break;
                }
            }
            else if (this.isCalendarVisible) {
                switch (event.keyCode) {
                    case exports.KeyCodes.ENTER:
                    case exports.KeyCodes.SPACE:
                        this.setDate(this.displayDate);
                        break;
                    case exports.KeyCodes.RIGHT_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, 1);
                        break;
                    case exports.KeyCodes.LEFT_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, -1);
                        break;
                    case exports.KeyCodes.PAGE_DOWN:
                        this.displayDate = this.dateUtil.incrementMonths(displayDate, 1);
                        break;
                    case exports.KeyCodes.PAGE_UP:
                        this.displayDate = this.dateUtil.incrementMonths(displayDate, -1);
                        break;
                    case exports.KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, 7);
                        break;
                    case exports.KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, -7);
                        break;
                    case exports.KeyCodes.HOME:
                        this.displayDate = this.dateUtil.getFirstDateOfMonth(displayDate);
                        break;
                    case exports.KeyCodes.END:
                        this.displayDate = this.dateUtil.getLastDateOfMonth(displayDate);
                        break;
                }
                if (!this.dateUtil.isSameMonthAndYear(displayDate, this.displayDate)) {
                    this.generateCalendar();
                }
            }
            else if (this.isHoursVisible) {
                switch (event.keyCode) {
                    case exports.KeyCodes.ENTER:
                    case exports.KeyCodes.SPACE:
                        this.setHour(this.displayDate.getHours());
                        break;
                    case exports.KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementHours(displayDate, 1);
                        this._resetClock();
                        break;
                    case exports.KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementHours(displayDate, -1);
                        this._resetClock();
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case exports.KeyCodes.ENTER:
                    case exports.KeyCodes.SPACE:
                        this.setMinute(this.displayDate.getMinutes());
                        break;
                    case exports.KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementMinutes(displayDate, 1);
                        this._resetClock();
                        break;
                    case exports.KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementMinutes(displayDate, -1);
                        this._resetClock();
                        break;
                }
            }
        }
        else {
            switch (event.keyCode) {
                case exports.KeyCodes.ENTER:
                case exports.KeyCodes.SPACE:
                    event.preventDefault();
                    event.stopPropagation();
                    this.showDatepicker();
                    break;
            }
        }
    };
    Md2Datepicker.prototype.onBlur = function () {
        this.isDatepickerVisible = false;
        this.isYearsVisible = false;
        this.isCalendarVisible = this.type !== 'time' ? true : false;
        this.isHoursVisible = true;
    };
    /**
     * Display Years
     */
    Md2Datepicker.prototype.showYear = function () {
        this.isYearsVisible = true;
        this.isCalendarVisible = true;
        this._scrollToSelectedYear();
    };
    Md2Datepicker.prototype.getYears = function () {
        var startYear = this._minDate ? this._minDate.getFullYear() : 1900, endYear = this._maxDate ? this._maxDate.getFullYear() : this.today.getFullYear() + 100;
        this.years = [];
        for (var i = startYear; i <= endYear; i++) {
            this.years.push(i);
        }
    };
    Md2Datepicker.prototype._scrollToSelectedYear = function () {
        var _this = this;
        setTimeout(function () {
            var yearContainer = _this.element.nativeElement.querySelector('.md2-years'), selectedYear = _this.element.nativeElement.querySelector('.md2-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    };
    /**
     * select year
     * @param year
     */
    Md2Datepicker.prototype.setYear = function (year) {
        var date = this.displayDate;
        this.displayDate = new Date(year, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        this.generateCalendar();
        this.isYearsVisible = false;
        //this.isCalendarVisible = true;
    };
    /**
     * Display Datepicker
     */
    Md2Datepicker.prototype.showDatepicker = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this.isDatepickerVisible = true;
        this.selectedDate = this.value || new Date(1, 0, 1);
        this.displayDate = this.value || this.today;
        this.generateCalendar();
        this._resetClock();
        this.element.nativeElement.focus();
    };
    /**
     * Display Calendar
     */
    Md2Datepicker.prototype.showCalendar = function () {
        this.isYearsVisible = false;
        this.isCalendarVisible = true;
    };
    /**
     * Toggle Hour visiblity
     */
    Md2Datepicker.prototype.toggleHours = function (value) {
        this.isYearsVisible = false;
        this.isCalendarVisible = false;
        this.isYearsVisible = false;
        this.isHoursVisible = value;
        this._resetClock();
    };
    /**
     * Ok Button Event
     */
    Md2Datepicker.prototype.onClickOk = function () {
        if (this.isYearsVisible) {
            this.generateCalendar();
            this.isYearsVisible = false;
            this.isCalendarVisible = true;
        }
        else if (this.isCalendarVisible) {
            this.setDate(this.displayDate);
        }
        else if (this.isHoursVisible) {
            this.isHoursVisible = false;
            this._resetClock();
        }
        else {
            this.value = this.displayDate;
            this.onBlur();
        }
    };
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    Md2Datepicker.prototype.onClickDate = function (event, date) {
        event.preventDefault();
        event.stopPropagation();
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this.prevMonth) {
            this.updateMonth(-1);
        }
        else if (date.calMonth === this.currMonth) {
            this.setDate(new Date(date.dateObj.year, date.dateObj.month, date.dateObj.day, this.displayDate.getHours(), this.displayDate.getMinutes()));
        }
        else if (date.calMonth === this.nextMonth) {
            this.updateMonth(1);
        }
    };
    /**
     * Set Date
     * @param date Date Object
     */
    Md2Datepicker.prototype.setDate = function (date) {
        if (this.type === 'date') {
            this.value = date;
            this.onBlur();
        }
        else {
            this.selectedDate = date;
            this.displayDate = date;
            this.isCalendarVisible = false;
            this.isHoursVisible = true;
            this._resetClock();
        }
    };
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    Md2Datepicker.prototype.updateMonth = function (noOfMonths) {
        this.displayDate = this.dateUtil.incrementMonths(this.displayDate, noOfMonths);
        this.generateCalendar();
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype.isBeforeMonth = function () {
        return !this._minDate ? true : this._minDate && this.dateUtil.getMonthDistance(this.displayDate, this._minDate) < 0;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype.isAfterMonth = function () {
        return !this._maxDate ? true : this._maxDate && this.dateUtil.getMonthDistance(this.displayDate, this._maxDate) > 0;
    };
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    Md2Datepicker.prototype._isDisabledDate = function (date) {
        if (this._minDate && this._maxDate) {
            return (this._minDate > date) || (this._maxDate < date);
        }
        else if (this._minDate) {
            return (this._minDate > date);
        }
        else if (this._maxDate) {
            return (this._maxDate < date);
        }
        else {
            return false;
        }
        //if (this.disableWeekends) {
        //  let dayNbr = this.getDayNumber(date);
        //  if (dayNbr === 0 || dayNbr === 6) {
        //    return true;
        //  }
        //}
        //return false;
    };
    /**
     * Generate Month Calendar
     */
    Md2Datepicker.prototype.generateCalendar = function () {
        var year = this.displayDate.getFullYear();
        var month = this.displayDate.getMonth();
        this.dates.length = 0;
        var firstDayOfMonth = this.dateUtil.getFirstDateOfMonth(this.displayDate);
        var numberOfDaysInMonth = this.dateUtil.getNumberOfDaysInMonth(this.displayDate);
        var numberOfDaysInPrevMonth = this.dateUtil.getNumberOfDaysInMonth(this.dateUtil.incrementMonths(this.displayDate, -1));
        var dayNbr = 1;
        var calMonth = this.prevMonth;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
                for (var j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
                    var iDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
                    var date = new Date(year, month - 1, j);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                }
                calMonth = this.currMonth;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var iDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > numberOfDaysInMonth) {
                        dayNbr = 1;
                        calMonth = this.nextMonth;
                    }
                    var iDate = { year: year, month: calMonth === this.currMonth ? month : month + 1, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, iDate.month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    };
    /**
     * Select Hour
     * @param event Event Object
     * @param hour number of hours
     */
    Md2Datepicker.prototype.onClickHour = function (event, hour) {
        event.preventDefault();
        event.stopPropagation();
        this.setHour(hour);
    };
    /**
     * Select Minute
     * @param event Event Object
     * @param minute number of minutes
     */
    Md2Datepicker.prototype.onClickMinute = function (event, minute) {
        event.preventDefault();
        event.stopPropagation();
        this.setMinute(minute);
    };
    /**
     * Set hours
     * @param hour number of hours
     */
    Md2Datepicker.prototype.setHour = function (hour) {
        var date = this.displayDate;
        this.isHoursVisible = false;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, date.getMinutes());
        this._resetClock();
    };
    /**
     * Set minutes
     * @param minute number of minutes
     */
    Md2Datepicker.prototype.setMinute = function (minute) {
        var date = this.displayDate;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minute);
        this.selectedDate = this.displayDate;
        this.value = this.selectedDate;
        this.onBlur();
    };
    //private onMouseDownClock(event: MouseEvent) {
    //  document.addEventListener('mousemove', this.mouseMoveListener);
    //  document.addEventListener('mouseup', this.mouseUpListener);
    //  //let offset = this.offset(event.currentTarget)
    //  //this.clock.x = offset.left + this.clock.dialRadius;
    //  //this.clock.y = offset.top + this.clock.dialRadius;
    //  //this.clock.dx = event.pageX - this.clock.x;
    //  //this.clock.dy = event.pageY - this.clock.y;
    //  //let z = Math.sqrt(this.clock.dx * this.clock.dx + this.clock.dy * this.clock.dy);
    //  //if (z < this.clock.outerRadius - this.clock.tickRadius || z > this.clock.outerRadius + this.clock.tickRadius) { return; }
    //  //event.preventDefault();
    //  //this.setClockHand(this.clock.dx, this.clock.dy);
    //  ////this.onMouseMoveClock = this.onMouseMoveClock.bind(this);
    //  ////this.onMouseUpClock = this.onMouseUpClock.bind(this);
    //  //document.addEventListener('mousemove', this.onMouseMoveClock);
    //  //document.addEventListener('mouseup', this.onMouseUpClock);
    //}
    //onMouseMoveClock(event: MouseEvent) {
    //  event.preventDefault();
    //  event.stopPropagation();
    //  let x = event.pageX - this.clock.x,
    //    y = event.pageY - this.clock.y;
    //  this.clock.moved = true;
    //  this._setClockHand(x, y);//, false, true
    //  //if (!moved && x === dx && y === dy) {
    //  //  // Clicking in chrome on windows will trigger a mousemove event
    //  //  return;
    //  //}
    //}
    //onMouseUpClock(event: MouseEvent) {
    //  event.preventDefault();
    //  document.removeEventListener('mousemove', this.mouseMoveListener);
    //  document.removeEventListener('mouseup', this.mouseUpListener);
    //  //let space = false;
    //  let x = event.pageX - this.clock.x,
    //    y = event.pageY - this.clock.y;
    //  if ((space || this.clockEvent.moved) && x === this.clockEvent.dx && y === this.clockEvent.dy) {
    //    this.setClockHand(x, y);
    //  }
    //  //if (this.isHoursVisible) {
    //  //  //self.toggleView('minutes', duration / 2);
    //  //} else {
    //  //  //if (options.autoclose) {
    //  //  //  self.minutesView.addClass('clockpicker-dial-out');
    //  //  //  setTimeout(function () {
    //  //  //    self.done();
    //  //  //  }, duration / 2);
    //  //  //}
    //  //}
    //  if ((space || moved) && x === dx && y === dy) {
    //    self.setHand(x, y);
    //  }
    //  if (self.currentView === 'hours') {
    //    self.toggleView('minutes', duration / 2);
    //  } else {
    //    if (options.autoclose) {
    //      self.minutesView.addClass('clockpicker-dial-out');
    //      setTimeout(function () {
    //        self.done();
    //      }, duration / 2);
    //    }
    //  }
    //  plate.prepend(canvas);
    //  // Reset cursor style of body
    //  clearTimeout(movingTimer);
    //  $body.removeClass('clockpicker-moving');
    //}
    /**
     * reser clock hands
     */
    Md2Datepicker.prototype._resetClock = function () {
        var hour = this.displayDate.getHours();
        var minute = this.displayDate.getMinutes();
        var value = this.isHoursVisible ? hour : minute, unit = Math.PI / (this.isHoursVisible ? 6 : 30), radian = value * unit, radius = this.isHoursVisible && value > 0 && value < 13 ? this.clock.innerRadius : this.clock.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius;
        this._setClockHand(x, y);
    };
    /**
     * set clock hand
     * @param x number of x position
     * @param y number of y position
     */
    Md2Datepicker.prototype._setClockHand = function (x, y) {
        var radian = Math.atan2(x, y), unit = Math.PI / (this.isHoursVisible ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = this.isHoursVisible && z < (this.clock.outerRadius + this.clock.innerRadius) / 2, radius = inner ? this.clock.innerRadius : this.clock.outerRadius, value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.isHoursVisible) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
        }
        else {
            if (value === 60) {
                value = 0;
            }
        }
        this.clock.hand = {
            x: Math.sin(radian) * radius,
            y: Math.cos(radian) * radius
        };
    };
    /**
     * render Click
     */
    Md2Datepicker.prototype.generateClock = function () {
        this.hours.length = 0;
        for (var i = 0; i < 24; i++) {
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? this.clock.innerRadius : this.clock.outerRadius;
            this.hours.push({
                hour: i === 0 ? '00' : i,
                top: this.clock.dialRadius - Math.cos(radian) * radius - this.clock.tickRadius,
                left: this.clock.dialRadius + Math.sin(radian) * radius - this.clock.tickRadius
            });
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = i / 30 * Math.PI;
            this.minutes.push({
                minute: i === 0 ? '00' : i,
                top: this.clock.dialRadius - Math.cos(radian) * this.clock.outerRadius - this.clock.tickRadius,
                left: this.clock.dialRadius + Math.sin(radian) * this.clock.outerRadius - this.clock.tickRadius
            });
        }
    };
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    Md2Datepicker.prototype._formatDate = function (date) {
        return this.format
            .replace('YYYY', date.getFullYear() + '')
            .replace('MM', this._prependZero((date.getMonth() + 1) + ''))
            .replace('DD', this._prependZero(date.getDate() + ''))
            .replace('HH', this._prependZero(date.getHours() + ''))
            .replace('mm', this._prependZero(date.getMinutes() + ''))
            .replace('ss', this._prependZero(date.getSeconds() + ''));
    };
    /**
     * Prepend Zero
     * @param value String value
     * @return string with prepend Zero
     */
    Md2Datepicker.prototype._prependZero = function (value) {
        return parseInt(value) < 10 ? '0' + value : value;
    };
    /**
     * Get Offset
     * @param element HtmlElement
     * @return top, left offset from page
     */
    Md2Datepicker.prototype._offset = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            top: top,
            left: left
        };
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        if (value && value !== this._value) {
            if (this.dateUtil.isValidDate(value)) {
                this._value = value;
            }
            else {
                if (this.type === 'time') {
                    this._value = new Date('1-1-1 ' + value);
                }
                else {
                    this._value = new Date(value);
                }
            }
            this.displayInputDate = this._formatDate(this._value);
            var date = '';
            if (this.type !== 'time') {
                date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) + '-' + this._value.getDate();
            }
            if (this.type === 'datetime') {
                date += ' ';
            }
            if (this.type !== 'date') {
                date += this._value.getHours() + ':' + this._value.getMinutes();
            }
        }
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$19([
        _angular_core.Output(), 
        __metadata$19('design:type', _angular_core.EventEmitter)
    ], Md2Datepicker.prototype, "change", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Object)
    ], Md2Datepicker.prototype, "type", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String)
    ], Md2Datepicker.prototype, "name", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String)
    ], Md2Datepicker.prototype, "id", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String)
    ], Md2Datepicker.prototype, "class", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String)
    ], Md2Datepicker.prototype, "placeholder", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String)
    ], Md2Datepicker.prototype, "format", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Number)
    ], Md2Datepicker.prototype, "tabindex", void 0);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Boolean)
    ], Md2Datepicker.prototype, "readonly", null);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Boolean)
    ], Md2Datepicker.prototype, "required", null);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Boolean)
    ], Md2Datepicker.prototype, "disabled", null);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String), 
        __metadata$19('design:paramtypes', [String])
    ], Md2Datepicker.prototype, "min", null);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', String), 
        __metadata$19('design:paramtypes', [String])
    ], Md2Datepicker.prototype, "max", null);
    __decorate$19([
        _angular_core.Input(), 
        __metadata$19('design:type', Object)
    ], Md2Datepicker.prototype, "value", null);
    __decorate$19([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$19('design:type', Function), 
        __metadata$19('design:paramtypes', [MouseEvent]), 
        __metadata$19('design:returntype', void 0)
    ], Md2Datepicker.prototype, "onClick", null);
    __decorate$19([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$19('design:type', Function), 
        __metadata$19('design:paramtypes', [KeyboardEvent]), 
        __metadata$19('design:returntype', void 0)
    ], Md2Datepicker.prototype, "onKeyDown", null);
    __decorate$19([
        _angular_core.HostListener('blur'), 
        __metadata$19('design:type', Function), 
        __metadata$19('design:paramtypes', []), 
        __metadata$19('design:returntype', void 0)
    ], Md2Datepicker.prototype, "onBlur", null);
    Md2Datepicker = __decorate$19([
        _angular_core.Component({selector: 'md2-datepicker',
            template: "<div class=\"md2-datepicker-input-container\" (click)=\"showDatepicker()\"> <div class=\"md2-datepicker-calendar-icon\"> <svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path> </svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path> </svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path> </svg> </div> <div class=\"md2-datepicker-input\"> <span class=\"md2-datepicker-placeholder\" [class.has-value]=\"value\"> {{placeholder}} <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span> </span> <span class=\"md2-datepicker-input-text\">{{displayInputDate}}</span> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M7 10l5 5 5-5z\" /> </svg> </div> </div> <div class=\"md2-datepicker-wrapper\" [class.active]=\"isDatepickerVisible\"> <div class=\"md2-datepicker-header\"> <span class=\"md2-datepicker-year\" [class.active]=\"isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"showYear()\">{{displayDay.year}}</span> <span class=\"md2-datepicker-date\" [class.active]=\"isCalendarVisible && !isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"showCalendar()\">{{displayDay.day.substr(0, 3)}},&nbsp;{{displayDay.month.substr(0, 3)}}&nbsp;{{displayDay.date}}</span> <span class=\"md2-datepicker-time\" [class.active]=\"!isCalendarVisible\" [class.hidden]=\"type==='date'\"> <span class=\"md2-datepicker-hour\" [class.active]=\"isHoursVisible\" (click)=\"toggleHours(true)\">{{displayDay.hour}}</span>:<span class=\"md2-datepicker-minute\" [class.active]=\"!isHoursVisible\" (click)=\"toggleHours(false)\">{{displayDay.minute}}</span> </span> </div> <div class=\"md2-datepicker-body\"> <div class=\"md2-years\" [class.active]=\"isYearsVisible\"> <div class=\"md2-years-wrapper\"> <div *ngFor=\"let y of years\" class=\"md2-year\" [class.selected]=\"y === displayDay.year\" (click)=\"setYear(y)\">{{y}}</div> </div> </div> <div class=\"md2-datepicker-container\" [class.active]=\"!isYearsVisible\"> <div class=\"md2-calendar\" [class.active]=\"isCalendarVisible\"> <div class=\"md2-calendar-controls\"> <div class=\"md2-calendar-prev-month\" [class.disabled]=\"!isBeforeMonth()\" (click)=\"isBeforeMonth() && updateMonth(-1)\"> <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-next-month\" [class.disabled]=\"!isAfterMonth()\" (click)=\"isAfterMonth() && updateMonth(1)\"> <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> <div class=\"md2-calendar-header\">{{displayDay.month}} {{displayDay.year}}</div> </div> <table class=\"md2-calendar-month\"> <thead><tr><th *ngFor=\"let d of days\">{{d.substr(0, 1)}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"dateUtil.isSameDay(displayDate, d.date)\" [class.selected]=\"dateUtil.isSameDay(selectedDate, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===prevMonth\" [class.curr-month]=\"d.calMonth===currMonth\" [class.next-month]=\"d.calMonth===nextMonth\" (click)=\"onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table> </div> <div class=\"md2-clock\" [class.active]=\"!isCalendarVisible\"> <!-- (mousedown)=\"onMouseDownClock($event)\"--> <div class=\"md2-clock-hand\"> <svg class=\"md2-clock-svg\" width=\"240\" height=\"240\"> <g transform=\"translate(120,120)\"> <line x1=\"0\" y1=\"0\" [attr.x2]=\"clock.hand.x\" [attr.y2]=\"clock.hand.y\"></line> <circle class=\"md2-clock-bg\" r=\"17\" [attr.cx]=\"clock.hand.x\" [attr.cy]=\"clock.hand.y\"></circle> <circle class=\"md2-clock-fg\" r=\"3.5\" [attr.cx]=\"clock.hand.x\" [attr.cy]=\"clock.hand.y\"></circle> <circle class=\"md2-clock-center\" cx=\"0\" cy=\"0\" r=\"2\"></circle> </g> </svg> </div> <div class=\"md2-clock-hours\" [class.active]=\"isHoursVisible\"> <div *ngFor=\"let h of hours\" class=\"md2-clock-hour\" [style.top]=\"h.top + 'px'\" [style.left]=\"h.left + 'px'\" (click)=\"onClickHour($event,h.hour)\">{{h.hour}}</div> </div> <div class=\"md2-clock-minutes\" [class.active]=\"!isHoursVisible\"> <div *ngFor=\"let m of minutes\" class=\"md2-clock-minute\" [style.top]=\"m.top + 'px'\" [style.left]=\"m.left + 'px'\" (click)=\"onClickMinute($event,m.minute)\">{{m.minute}}</div> </div> </div> </div> </div> <div class=\"md2-datepicker-footer\"> <div class=\"md2-button\" (click)=\"onBlur()\">Cancel</div> <div class=\"md2-button\" (click)=\"onClickOk()\">Ok</div> </div> </div> ",
            styles: ["md2-datepicker { position: relative; display: block; max-width: 200px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-input-container { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-calendar-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-input { position: relative; display: block; height: 30px; padding: 2px 26px 1px 2px; margin: 0; line-height: 26px; color: rgba(0, 0, 0, 0.87); vertical-align: middle; box-sizing: border-box; border-bottom: 1px solid rgba(0, 0, 0, 0.12); } .md2-datepicker-input svg { position: absolute; right: 0; top: 2px; fill: currentColor; color: rgba(0, 0, 0, 0.54); } md2-datepicker.md2-datepicker-disabled .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; } .md2-datepicker-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0, 0, 0, 0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; } .md2-datepicker-placeholder.has-value, md2-datepicker:focus .md2-datepicker-placeholder { transform: translate3d(0, 6px, 0) scale(0.75); } md2-datepicker:focus .md2-datepicker-placeholder { color: #2196f3; } md2-datepicker:focus .md2-datepicker-placeholder .md2-placeholder-required { color: #f00; } md2-datepicker.md2-datepicker-disabled:focus .md2-datepicker-placeholder, md2-datepicker.md2-datepicker-disabled:focus .md2-datepicker-placeholder .md2-placeholder-required { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input-text { display: block; font-size: 15px; line-height: 26px; } .md2-datepicker-wrapper { position: absolute; top: 0; left: 0; display: inline-block; width: 300px; border-radius: 2px; background-color: #fff; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-wrapper.active { transform: scale(1); } .md2-datepicker-header { display: block; padding: 20px; color: #fff; font-size: 28px; line-height: 28px; font-weight: 500; background: #2196f3; box-sizing: border-box; } .md2-datepicker-year { display: block; height: 16px; margin: 0 0 10px; font-size: 16px; line-height: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-year.hidden { display: none; } .md2-datepicker-date { cursor: pointer; opacity: 0.7; } .md2-datepicker-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-date.hidden { display: none; } .md2-datepicker-time { display: inline-block; padding-left: 10px; cursor: pointer; opacity: 0.7; } .md2-datepicker-time.active { opacity: 1; } .md2-datepicker-time.hidden { display: none; } .md2-datepicker-hour, .md2-datepicker-minute { opacity: 1; } .md2-datepicker-time.active .md2-datepicker-hour, .md2-datepicker-time.active .md2-datepicker-minute { opacity: 0.7; } .md2-datepicker-time.active .md2-datepicker-hour.active, .md2-datepicker-time.active .md2-datepicker-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-body { position: relative; width: 100%; height: 300px; overflow: hidden; } .md2-datepicker-footer { text-align: right; } .md2-datepicker-footer .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0px; padding: 0 12px; font-size: 14px; color: #2196f3; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-footer .md2-button:hover { background: #ebebeb; } .md2-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: #fff; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-years.active { right: 0; } .md2-years .md2-years-wrapper { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-years .md2-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-years .md2-year.selected { color: #2196f3; font-size: 26px; font-weight: 500; } .md2-datepicker-container { position: absolute; top: 0; left: 100%; display: block; width: 100%; transition: 300ms; } .md2-datepicker-container.active { left: 0; } .md2-calendar { position: absolute; right: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar.active { right: 0; } .md2-calendar-controls { position: relative; display: block; height: 48px; text-align: left; } .md2-calendar-header { height: 48px; line-height: 48px; font-size: 14px; font-weight: 500; text-align: center; } .md2-calendar-prev-month, .md2-calendar-next-month { position: absolute; display: inline-block; width: 48px; height: 48px; padding: 12px; margin: 0 12px; box-sizing: border-box; cursor: pointer; } .md2-calendar-next-month { right: 0; } .md2-calendar-prev-month.disabled, .md2-calendar-next-month.disabled { opacity: 0.25; cursor: default; pointer-events: none; } .md2-calendar-month { margin: 0 20px; } .md2-calendar-month th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-month td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #2196f3; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: #fff; background: #2196f3; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } .md2-clock { position: absolute; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; transition: 300ms; } .md2-clock.active { left: 0; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #5aaced; } .md2-clock-hand { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } .md2-clock-hand line { stroke: #2196f3; stroke-width: 1; stroke-linecap: round; } .md2-clock-bg { fill: #5aaced; } .md2-clock-fg { stroke: none; fill: #2196f3; } .md2-clock-center { stroke: none; fill: #2196f3; } /*# sourceMappingURL=datepicker.css.map */ "],
            providers: [MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'datepicker',
                '[id]': 'id',
                '[class]': 'class',
                '[class.md2-datepicker-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$19('design:paramtypes', [Md2DateUtil, _angular_core.ElementRef])
    ], Md2Datepicker);
    return Md2Datepicker;
}());
var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker];
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule,
            providers: [Md2DateUtil]
        };
    };
    Md2DatepickerModule = __decorate$19([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_DATEPICKER_DIRECTIVES,
            declarations: MD2_DATEPICKER_DIRECTIVES,
        }), 
        __metadata$19('design:paramtypes', [])
    ], Md2DatepickerModule);
    return Md2DatepickerModule;
}());

/**
 * Provide an API for animating elements with CSS transitions
 */
var Animate = (function () {
    function Animate() {
    }
    Animate.enter = function (el, cssClass) {
        el.classList.remove(cssClass);
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-add');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var removeListener = function () { return done(false); };
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-add-active');
                    el.classList.remove(cssClass + '-add');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-add-active');
                el.classList.add(cssClass);
            }, 1);
        });
    };
    Animate.leave = function (el, cssClass) {
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-remove');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var removeListener = function () { return done(false); };
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-remove-active');
                    el.classList.remove(cssClass + '-remove');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-remove-active');
                el.classList.remove(cssClass);
            }, 1);
        });
    };
    /**
     * Get the duration of any transitions being applied to the given element.
     *
     * Based on: https://gist.github.com/snorpey/5323028
     * @param element The element to query
     * @param includeDelay Include any specified transition-delay value.
     * @returns {number}
     */
    Animate.getTransitionDuration = function (element, includeDelay) {
        if (includeDelay === void 0) { includeDelay = false; }
        var prefixes = ['', 'moz', 'webkit', 'ms', 'o', 'khtml'];
        var style = window.getComputedStyle(element);
        for (var i = 0; i < prefixes.length; i++) {
            var durationProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-duration";
            var duration = style[durationProperty];
            if (!duration) {
                continue;
            }
            duration = (duration.indexOf('ms') > -1) ? parseFloat(duration) : parseFloat(duration) * 1000;
            if (duration === 0) {
                continue;
            }
            if (includeDelay) {
                var delayProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-delay";
                var delay = style[delayProperty];
                if (typeof delay !== 'undefined') {
                    duration += (delay.indexOf('ms') > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;
                }
            }
            return duration;
        }
        return -1;
    };
    Animate.setTransitionDuration = function (element, delayMs) {
        //element.style['transition-duration'] = `${delayMs}ms`;
    };
    /* From Modernizr */
    Animate.whichTransitionEvent = function () {
        if (typeof document === 'undefined') {
            return 'transitionend';
        }
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };
    /**
     * Set CSS styles immediately by turning off transition duration and restoring it afterward
     */
    Animate.setStyles = function (element, styles) {
        var saveDuration = Animate.getTransitionDuration(element);
        Animate.setTransitionDuration(element, 0);
        return new Promise(function (resolve, reject) {
            Object.keys(styles).forEach(function (key) {
                //element.style[key] = `${styles[key]}`;
            });
            if (saveDuration !== -1) {
                Animate.setTransitionDuration(element, saveDuration);
            }
            else {
            }
            resolve();
        });
    };
    /**
     * Wait a period of time, then resolve a promise.
     * @param milliseconds The period to wait before resolving.
     * @returns {Promise<void>|Promise} A promise that resolves after a period of time.
     */
    Animate.wait = function (milliseconds) {
        if (milliseconds === void 0) { milliseconds = 10; }
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(); }, milliseconds);
        });
    };
    /**
     * Look up the transition event name for the browser type and cache it.
     */
    Animate.TRANSITION_EVENT = Animate.whichTransitionEvent();
    return Animate;
}());

var __extends$5 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2DialogPortal = (function (_super) {
    __extends$5(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    Md2DialogPortal = __decorate$21([
        _angular_core.Directive({ selector: '[md2DialogPortal]' }), 
        __metadata$21('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], Md2DialogPortal);
    return Md2DialogPortal;
}(TemplatePortal));
var Md2DialogTitle = (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle = __decorate$21([
        _angular_core.Directive({ selector: 'md2-dialog-title' }), 
        __metadata$21('design:paramtypes', [])
    ], Md2DialogTitle);
    return Md2DialogTitle;
}());
var Md2DialogFooter = (function () {
    function Md2DialogFooter() {
    }
    Md2DialogFooter = __decorate$21([
        _angular_core.Directive({ selector: 'md2-dialog-footer' }), 
        __metadata$21('design:paramtypes', [])
    ], Md2DialogFooter);
    return Md2DialogFooter;
}());
var Md2Dialog = (function () {
    function Md2Dialog(overlay) {
        this.overlay = overlay;
        this.onShow = new _angular_core.EventEmitter();
        this.onClose = new _angular_core.EventEmitter();
        this.onCancel = new _angular_core.EventEmitter();
        /** Is the dialog active? */
        this.isOpened = false;
        /** Overlay configuration for positioning the dialog */
        this.config = new OverlayState();
        /** @internal */
        this.overlayRef = null;
    }
    Md2Dialog.prototype.ngOnDestroy = function () {
        return this.close();
    };
    ///** Show the dialog */
    Md2Dialog.prototype.show = function () {
        return this.open();
    };
    /** Open the dialog */
    Md2Dialog.prototype.open = function () {
        var _this = this;
        return this.close()
            .then(function () { return _this.overlay.create(_this.config); })
            .then(function (ref) {
            _this.overlayRef = ref;
            return ref.attach(_this.portal);
        })
            .then(function () { return Animate.wait(); })
            .then(function () {
            _this.isOpened = true;
            _this.onShow.emit(_this);
            return _this;
        });
    };
    /** Close the dialog */
    Md2Dialog.prototype.close = function (result, cancel) {
        var _this = this;
        if (result === void 0) { result = true; }
        if (cancel === void 0) { cancel = false; }
        if (!this.overlayRef) {
            return Promise.resolve(this);
        }
        this.isOpened = false;
        // TODO(jd): this is terrible, use animate states
        return Animate.wait(100)
            .then(function () { return _this.overlayRef.detach(); })
            .then(function () {
            _this.overlayRef.dispose();
            _this.overlayRef = null;
            if (cancel) {
                _this.onCancel.emit(result);
            }
            else {
                _this.onClose.emit(result);
            }
            return _this;
        });
    };
    Md2Dialog.prototype.onDocumentKeypress = function (event) {
        if (event.keyCode == 27) {
            this.close();
        }
    };
    __decorate$21([
        _angular_core.Output(), 
        __metadata$21('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onShow", void 0);
    __decorate$21([
        _angular_core.Output(), 
        __metadata$21('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onClose", void 0);
    __decorate$21([
        _angular_core.Output(), 
        __metadata$21('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onCancel", void 0);
    __decorate$21([
        _angular_core.ViewChild(Md2DialogPortal), 
        __metadata$21('design:type', Md2DialogPortal)
    ], Md2Dialog.prototype, "portal", void 0);
    __decorate$21([
        _angular_core.Input('title'), 
        __metadata$21('design:type', String)
    ], Md2Dialog.prototype, "dialogTitle", void 0);
    __decorate$21([
        _angular_core.Input(), 
        __metadata$21('design:type', Object)
    ], Md2Dialog.prototype, "config", void 0);
    Md2Dialog = __decorate$21([
        _angular_core.Component({selector: 'md2-dialog',
            template: "\n    <template md2DialogPortal>\n      <div class=\"md2-dialog\" [class.open]=\"isOpened\">\n        <div class=\"md2-dialog-container\">\n          <div class=\"md2-dialog-header\">\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button>\n            <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2>\n            <ng-content select=\"md2-dialog-title\"></ng-content>\n          </div>\n          <div class=\"md2-dialog-body\">\n            <ng-content></ng-content>\n          </div>\n          <ng-content select=\"md2-dialog-footer\"></ng-content>\n        </div>\n      </div>\n    </template>\n  ",
            styles: ["\n    .md2-dialog-open { overflow-y: hidden; }\n    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; outline: 0; }\n    .md2-dialog.open { display: block; }\n    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 0 0 4px 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: .3s; -o-transition: .3s; -moz-transition: .3s; transition: .3s; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }\n    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }\n    @media (min-width: 768px) {\n      .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }\n    }\n    .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 0 48px 0 16px; border-bottom: 1px solid #e5e5e5; word-wrap: break-word; }\n    .md2-dialog-header .close { position: absolute; top: 21px; right: 16px; display: inline-block; width: 18px; height: 18px; overflow: hidden; -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; outline: 0; opacity: 0.8; font-size: 0; z-index: 1; min-width: initial; box-shadow: none; margin: 0; }\n    .md2-dialog-header .close::before,\n    .md2-dialog-header .close::after { content: ''; position: absolute; top: 50%; left: 0; height: 2px; width: 100%; margin-top: -1px;background: #ccc;border-radius: 2px;height: 2px;}\n    .md2-dialog-header .close::before {-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}\n    .md2-dialog-header .close::after {-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}\n    .md2-dialog-header .close:hover { opacity: 1; }\n    .md2-dialog-header md2-dialog-title, .md2-dialog-header .md2-dialog-title { display: block; margin: 0; padding: 16px 0; font-size: 25px; font-weight: 500; }\n    .md2-dialog-header dialog-header { line-height: 33px; }\n    .md2-dialog-body { position: relative; padding: 16px; }\n    .md2-dialog-footer, md2-dialog-footer { display: block; padding: 16px; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }\n  "],
            host: {
                'tabindex': '0',
                '(body:keydown)': 'onDocumentKeypress($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$21('design:paramtypes', [Overlay])
    ], Md2Dialog);
    return Md2Dialog;
}());
var MD2_DIALOG_DIRECTIVES = [Md2Dialog, Md2DialogTitle, Md2DialogFooter, Md2DialogPortal];
var MD2_DIALOG_PROVIDERS = [Overlay, OVERLAY_PROVIDERS];
var Md2DialogModule = (function () {
    function Md2DialogModule() {
    }
    Md2DialogModule.forRoot = function () {
        return {
            ngModule: Md2DialogModule,
            providers: MD2_DIALOG_PROVIDERS
        };
    };
    Md2DialogModule = __decorate$21([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_DIALOG_DIRECTIVES,
            declarations: MD2_DIALOG_DIRECTIVES,
        }), 
        __metadata$21('design:paramtypes', [])
    ], Md2DialogModule);
    return Md2DialogModule;
}());

var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Md2MenuNotClosable = (function () {
    function Md2MenuNotClosable(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * contains
     * @param element
     */
    Md2MenuNotClosable.prototype.contains = function (element) {
        var thisElement = this.elementRef.nativeElement;
        return thisElement.contains(element);
    };
    Md2MenuNotClosable = __decorate$22([
        _angular_core.Directive({ selector: '[md2-menu-not-closable]' }), 
        __metadata$22('design:paramtypes', [_angular_core.ElementRef])
    ], Md2MenuNotClosable);
    return Md2MenuNotClosable;
}());
var Md2Menu = (function () {
    function Md2Menu(elementRef) {
        this.elementRef = elementRef;
        this.isVisible = false;
    }
    /**
     * open menu
     */
    Md2Menu.prototype.open = function () { this.isVisible = true; };
    /**
     * close menu
     */
    Md2Menu.prototype.close = function () { this.isVisible = false; };
    /**
     * check closeble
     * @param element
     */
    Md2Menu.prototype.isInClosableZone = function (element) {
        if (!this.notClosable) {
            return false;
        }
        return this.notClosable.contains(element);
    };
    __decorate$22([
        _angular_core.ContentChild(Md2MenuNotClosable), 
        __metadata$22('design:type', Md2MenuNotClosable)
    ], Md2Menu.prototype, "notClosable", void 0);
    Md2Menu = __decorate$22([
        _angular_core.Directive({
            selector: '[md2-menu]',
            host: {
                'role': 'menu',
                '[class.md2-menu]': 'true',
                '[class.open]': 'isVisible'
            }
        }), 
        __metadata$22('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Menu);
    return Md2Menu;
}());
var Md2MenuOpen = (function () {
    function Md2MenuOpen(menu, elementRef) {
        var _this = this;
        this.menu = menu;
        this.elementRef = elementRef;
        this.close = function (event) {
            if (!_this.menu.isInClosableZone(event.target) &&
                event.target !== _this.elementRef.nativeElement) {
                _this.menu.close();
                document.removeEventListener('click', _this.close);
            }
        };
    }
    Md2MenuOpen.prototype.open = function () {
        this.menu.open();
        document.addEventListener('click', this.close, true);
    };
    Md2MenuOpen.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.close);
    };
    __decorate$22([
        _angular_core.HostListener('click'), 
        __metadata$22('design:type', Function), 
        __metadata$22('design:paramtypes', []), 
        __metadata$22('design:returntype', void 0)
    ], Md2MenuOpen.prototype, "open", null);
    Md2MenuOpen = __decorate$22([
        _angular_core.Directive({ selector: '[md2-menu-open]' }),
        __param$1(0, _angular_core.Host()), 
        __metadata$22('design:paramtypes', [Md2Menu, _angular_core.ElementRef])
    ], Md2MenuOpen);
    return Md2MenuOpen;
}());
var MD2_MENU_DIRECTIVES = [Md2MenuNotClosable, Md2Menu, Md2MenuOpen];
var Md2MenuModule = (function () {
    function Md2MenuModule() {
    }
    Md2MenuModule.forRoot = function () {
        return {
            ngModule: Md2MenuModule,
            providers: []
        };
    };
    Md2MenuModule = __decorate$22([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_MENU_DIRECTIVES,
            declarations: MD2_MENU_DIRECTIVES,
        }), 
        __metadata$22('design:paramtypes', [])
    ], Md2MenuModule);
    return Md2MenuModule;
}());

var __decorate$23 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$23 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Option = (function () {
    function Option(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Option;
}());
var noop$4 = function () { };
var nextId$4 = 0;
var MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Multiselect; }),
    multi: true
};
var Md2Multiselect = (function () {
    function Md2Multiselect(element) {
        this.element = element;
        this.change = new _angular_core.EventEmitter();
        this._value = '';
        this._onTouchedCallback = noop$4;
        this._onChangeCallback = noop$4;
        this._options = [];
        this.list = [];
        this.items = [];
        this.focusedOption = 0;
        this.isFocused = false;
        this.id = 'md2-multiselect-' + (++nextId$4);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
    }
    Md2Multiselect.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Multiselect.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "options", {
        set: function (value) { this._options = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * set value
     * @param value
     */
    Md2Multiselect.prototype.setValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function(i) {
                    var selItm = this_1._options.find(function (itm) { return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]); });
                    if (selItm) {
                        this_1.items.push(new Option(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Multiselect.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Multiselect.prototype, "isMenuVisible", {
        get: function () {
            return (this.isFocused && this.list && this.list.length) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * to update scroll of options
     */
    Md2Multiselect.prototype.updateScroll = function () {
        if (this.focusedOption < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this.focusedOption];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    Md2Multiselect.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        this.updateOptions();
        this.element.nativeElement.focus();
    };
    Md2Multiselect.prototype.onKeyDown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isMenuVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case exports.KeyCodes.TAB:
                case exports.KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
                case exports.KeyCodes.ENTER:
                case exports.KeyCodes.SPACE:
                    this.toggleOption(event, this.focusedOption);
                    break;
                case exports.KeyCodes.DOWN_ARROW:
                    this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                    this.updateScroll();
                    break;
                case exports.KeyCodes.UP_ARROW:
                    this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                    this.updateScroll();
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case exports.KeyCodes.ENTER:
                case exports.KeyCodes.SPACE:
                case exports.KeyCodes.DOWN_ARROW:
                case exports.KeyCodes.UP_ARROW:
                    event.preventDefault();
                    event.stopPropagation();
                    this.updateOptions();
                    break;
            }
        }
    };
    /**
     * on focus current component
     */
    Md2Multiselect.prototype.onFocus = function () {
        this.isFocused = true;
        this.focusedOption = 0;
    };
    Md2Multiselect.prototype.onBlur = function () { this.isFocused = false; };
    /**
     * to check current option is active or not
     * @param index
     * @return boolean the item is active or not
     */
    Md2Multiselect.prototype.isActive = function (index) {
        return this.items.map(function (i) { return i.text; }).indexOf(this.list[index].text) < 0 ? false : true;
    };
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    Md2Multiselect.prototype.toggleOption = function (event, index) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        var ind = this.items.map(function (i) { return i.text; }).indexOf(this.list[index].text);
        if (ind < 0) {
            this.items.push(this.list[index]);
            this.items = this.items.sort(function (a, b) { return _this.list.findIndex(function (i) { return i.text === a.text; }) - _this.list.findIndex(function (i) { return i.text === b.text; }); });
        }
        else {
            this.items.splice(ind, 1);
        }
        this._value = new Array();
        for (var i = 0; i < this.items.length; i++) {
            this._value.push(this.items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * update options
     */
    Md2Multiselect.prototype.updateOptions = function () {
        var _this = this;
        this.list = this._options.map(function (item) { return new Option(item, _this.textKey, _this.valueKey); });
        if (this.list.length > 0) {
            this.onFocus();
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function(i) {
                    var selItm = this_2._options.find(function (itm) { return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]); });
                    if (selItm) {
                        this_2.items.push(new Option(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$23([
        _angular_core.Output(), 
        __metadata$23('design:type', _angular_core.EventEmitter)
    ], Md2Multiselect.prototype, "change", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', String)
    ], Md2Multiselect.prototype, "id", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Number)
    ], Md2Multiselect.prototype, "tabindex", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', String)
    ], Md2Multiselect.prototype, "placeholder", void 0);
    __decorate$23([
        _angular_core.Input('item-text'), 
        __metadata$23('design:type', String)
    ], Md2Multiselect.prototype, "textKey", void 0);
    __decorate$23([
        _angular_core.Input('item-value'), 
        __metadata$23('design:type', String)
    ], Md2Multiselect.prototype, "valueKey", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Boolean)
    ], Md2Multiselect.prototype, "readonly", null);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Boolean)
    ], Md2Multiselect.prototype, "required", null);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Boolean)
    ], Md2Multiselect.prototype, "disabled", null);
    __decorate$23([
        _angular_core.Input('items'), 
        __metadata$23('design:type', Array), 
        __metadata$23('design:paramtypes', [Array])
    ], Md2Multiselect.prototype, "options", null);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Object)
    ], Md2Multiselect.prototype, "value", null);
    __decorate$23([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$23('design:type', Function), 
        __metadata$23('design:paramtypes', [MouseEvent]), 
        __metadata$23('design:returntype', void 0)
    ], Md2Multiselect.prototype, "onClick", null);
    __decorate$23([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$23('design:type', Function), 
        __metadata$23('design:paramtypes', [KeyboardEvent]), 
        __metadata$23('design:returntype', void 0)
    ], Md2Multiselect.prototype, "onKeyDown", null);
    __decorate$23([
        _angular_core.HostListener('blur'), 
        __metadata$23('design:type', Function), 
        __metadata$23('design:paramtypes', []), 
        __metadata$23('design:returntype', void 0)
    ], Md2Multiselect.prototype, "onBlur", null);
    Md2Multiselect = __decorate$23([
        _angular_core.Component({selector: 'md2-multiselect',
            template: "\n    <div class=\"md2-multiselect-container\">\n      <span class=\"md2-multiselect-placeholder\" [class.has-value]=\"items.length\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <div class=\"md2-multiselect-value\">\n        <div *ngFor=\"let v of items; let last = last\" class=\"md2-multiselect-value-item\">\n          <span class=\"md2-multiselect-text\">{{v.text}}</span><span *ngIf=\"!last\">,&nbsp;</span>\n        </div>\n      </div>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-multiselect-menu\">\n      <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.active]=\"isActive(i)\" [class.focus]=\"focusedOption === i\" (click)=\"toggleOption($event, i)\">\n        <div class=\"md2-option-icon\"></div>\n        <div class=\"md2-option-text\" [innerHtml]=\"l.text\"></div>\n      </li>\n    </ul>\n  ",
            styles: ["\n    md2-multiselect { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-multiselect:focus { outline: none; }\n    md2-multiselect.md2-multiselect-disabled { pointer-events: none; cursor: default; }\n    md2-multiselect .md2-multiselect-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }\n    md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }\n    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    md2-multiselect .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    md2-multiselect:focus .md2-multiselect-placeholder { color: #2196f3; }\n    md2-multiselect:focus .md2-multiselect-placeholder .md2-placeholder-required { color: #f00; }\n    md2-multiselect:focus .md2-multiselect-placeholder,\n    md2-multiselect .md2-multiselect-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder,\n    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder .md2-placeholder-required { color: rgba(0,0,0,0.38); }\n    md2-multiselect .md2-multiselect-container .md2-multiselect-value { display: block; max-height: 80px; padding-right: 26px; overflow-y: auto; font-size: 15px; line-height: 26px; }\n    md2-multiselect .md2-multiselect-container .md2-multiselect-value-item { word-wrap: break-word; }\n    md2-multiselect .md2-multiselect-container svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; }\n    md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; }\n    md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }\n    md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-transition: 240ms; -o-transition: 240ms; -webkit-transition: 240ms; transition: 240ms; }\n    md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }\n  "],
            providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[id]': 'id',
                '[class.md2-multiselect-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$23('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Multiselect);
    return Md2Multiselect;
}());
var MD2_MULTISELECT_DIRECTIVES = [Md2Multiselect];
var Md2MultiselectModule = (function () {
    function Md2MultiselectModule() {
    }
    Md2MultiselectModule.forRoot = function () {
        return {
            ngModule: Md2MultiselectModule,
            providers: []
        };
    };
    Md2MultiselectModule = __decorate$23([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_MULTISELECT_DIRECTIVES,
            declarations: MD2_MULTISELECT_DIRECTIVES,
        }), 
        __metadata$23('design:paramtypes', [])
    ], Md2MultiselectModule);
    return Md2MultiselectModule;
}());

var __decorate$24 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$24 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _uniqueIdCounter = 0;
var MD2_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Select; }),
    multi: true
};
var Md2SelectDispatcher = (function () {
    function Md2SelectDispatcher() {
        this._listeners = [];
    }
    Md2SelectDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    Md2SelectDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    Md2SelectDispatcher = __decorate$24([
        _angular_core.Injectable(), 
        __metadata$24('design:paramtypes', [])
    ], Md2SelectDispatcher);
    return Md2SelectDispatcher;
}());
var Md2SelectChange = (function () {
    function Md2SelectChange() {
    }
    return Md2SelectChange;
}());
var Md2Select = (function () {
    function Md2Select(element) {
        this.element = element;
        this._value = null;
        this._name = 'md2-select-' + _uniqueIdCounter++;
        //private _multiple: boolean;
        this._selected = null;
        this._isInitialized = false;
        this.isOpenable = true;
        this.isMenuVisible = false;
        this.selectedValue = '';
        this.focusIndex = 0;
        this._controlValueAccessorChangeFn = function (value) { };
        this.onTouched = function () { };
        this.change = new _angular_core.EventEmitter();
        this._options = null;
        this.tabindex = 0;
        this.placeholder = '';
    }
    Object.defineProperty(Md2Select.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "value", {
        //@Input()
        //get multiple(): boolean { return this._multiple; }
        //set multiple(value) { this._multiple = coerceBooleanProperty(value); }
        get: function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                this._updateSelectedOptionValue();
                if (this._isInitialized) {
                    this._emitChangeEvent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            if (selected) {
                this.value = selected.value;
                if (!selected.selected) {
                    selected.selected = true;
                }
                this.selectedValue = selected.text;
            }
            else {
                this.selectedValue = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Md2Select.prototype.ngAfterContentChecked = function () {
        var _this = this;
        var opt = this._options.filter(function (o) { return _this.equals(o.value, _this.value); })[0];
        if (opt && !this.equals(this.selected, opt)) {
            this.selectedValue = opt.text;
        }
        if (this.selected && this.selectedValue !== this.selected.text) {
            this.selectedValue = this.selected.text;
        }
    };
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Select.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * To update scroll to position of focused option
     */
    Md2Select.prototype.updateScroll = function () {
        if (this.focusIndex < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-select-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this.focusIndex];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * get index of focused option
     */
    Md2Select.prototype.getFocusIndex = function () { return this._options.toArray().findIndex(function (o) { return o.focused; }); };
    /**
     * update focused option
     * @param inc
     */
    Md2Select.prototype.updateFocus = function (inc) {
        var options = this._options.toArray();
        var index = this.focusIndex;
        options.forEach(function (o) { if (o.focused) {
            o.focused = false;
        } });
        var option;
        do {
            index += inc;
            if (index < 0) {
                index = options.length - 1;
            }
            if (index > options.length - 1) {
                index = 0;
            }
            option = options[index];
            this.focusIndex = index;
            if (option.disabled) {
                option = undefined;
            }
        } while (!option);
        if (option) {
            option.focused = true;
        }
        this.updateScroll();
    };
    Md2Select.prototype.onClick = function (e) {
        var _this = this;
        if (this.disabled || this.readonly) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.isOpenable) {
            if (!this.isMenuVisible) {
                this._options.forEach(function (o) {
                    o.focused = false;
                    if (o.selected) {
                        o.focused = true;
                    }
                });
                this.focusIndex = this.getFocusIndex();
                this.isMenuVisible = true;
                setTimeout(function () {
                    _this.updateScroll();
                }, 0);
                this.element.nativeElement.focus();
            }
        }
        this.isOpenable = true;
    };
    Md2Select.prototype.onKeyDown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isMenuVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case exports.KeyCodes.TAB:
                case exports.KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
                case exports.KeyCodes.ENTER:
                case exports.KeyCodes.SPACE:
                    this._options.toArray()[this.focusIndex].onOptionClick(event);
                    break;
                case exports.KeyCodes.DOWN_ARROW:
                    this.updateFocus(1);
                    break;
                case exports.KeyCodes.UP_ARROW:
                    this.updateFocus(-1);
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case exports.KeyCodes.ENTER:
                case exports.KeyCodes.SPACE:
                case exports.KeyCodes.DOWN_ARROW:
                case exports.KeyCodes.UP_ARROW:
                    event.preventDefault();
                    event.stopPropagation();
                    this.onClick(event);
                    break;
            }
        }
    };
    Md2Select.prototype.onBlur = function () {
        var _this = this;
        this.isMenuVisible = false;
        this.isOpenable = false;
        setTimeout(function () {
            _this.isOpenable = true;
        }, 200);
    };
    Md2Select.prototype.touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    Md2Select.prototype._updateOptions = function () {
        var _this = this;
        if (this._options) {
            this._options.forEach(function (option) {
                option.name = _this.name;
            });
        }
    };
    Md2Select.prototype._updateSelectedOptionValue = function () {
        var _this = this;
        var isAlreadySelected = this.selected !== null && this.selected.value === this.value;
        if (this._options !== null && !isAlreadySelected) {
            var matchingOption = this._options.filter(function (option) { return option.value === _this.value; })[0];
            if (matchingOption) {
                this.selected = matchingOption;
            }
            else {
                this.selected = null;
                this._options.forEach(function (option) { option.selected = false; });
            }
        }
    };
    Md2Select.prototype._emitChangeEvent = function () {
        var event = new Md2SelectChange();
        event.source = this;
        event.value = this.value;
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    };
    Md2Select.prototype.writeValue = function (value) {
        if (this._value !== value) {
            this._value = value;
            this._updateSelectedOptionValue();
        }
    };
    Md2Select.prototype.registerOnChange = function (fn) { this._controlValueAccessorChangeFn = fn; };
    Md2Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    __decorate$24([
        _angular_core.Output(), 
        __metadata$24('design:type', _angular_core.EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    __decorate$24([
        _angular_core.ContentChildren(_angular_core.forwardRef(function () { return Md2Option; })), 
        __metadata$24('design:type', _angular_core.QueryList)
    ], Md2Select.prototype, "_options", void 0);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', String)
    ], Md2Select.prototype, "name", null);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Number)
    ], Md2Select.prototype, "tabindex", void 0);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', String)
    ], Md2Select.prototype, "placeholder", void 0);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Select.prototype, "readonly", null);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Select.prototype, "required", null);
    __decorate$24([
        _angular_core.HostBinding('class.md2-select-disabled'),
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Select.prototype, "disabled", null);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Object)
    ], Md2Select.prototype, "value", null);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Object)
    ], Md2Select.prototype, "selected", null);
    __decorate$24([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$24('design:type', Function), 
        __metadata$24('design:paramtypes', [Object]), 
        __metadata$24('design:returntype', void 0)
    ], Md2Select.prototype, "onClick", null);
    __decorate$24([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$24('design:type', Function), 
        __metadata$24('design:paramtypes', [Object]), 
        __metadata$24('design:returntype', void 0)
    ], Md2Select.prototype, "onKeyDown", null);
    __decorate$24([
        _angular_core.HostListener('blur'), 
        __metadata$24('design:type', Function), 
        __metadata$24('design:paramtypes', []), 
        __metadata$24('design:returntype', void 0)
    ], Md2Select.prototype, "onBlur", null);
    Md2Select = __decorate$24([
        _angular_core.Component({selector: 'md2-select',
            template: "\n    <div class=\"md2-select-container\">\n      <span class=\"md2-select-placeholder\" [class.has-value]=\"selectedValue\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <span *ngIf=\"selectedValue\" class=\"md2-select-value\" [innerHtml]=\"selectedValue\"></span>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <div class=\"md2-select-menu\" [class.open]=\"isMenuVisible\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    md2-select { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-select:focus { outline: none; }\n    md2-select.md2-select-disabled { pointer-events: none; cursor: default; }\n    md2-select .md2-select-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 26px 1px 2px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }\n    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }\n    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    md2-select .md2-select-container .md2-select-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    md2-select:focus .md2-select-placeholder { color: #2196f3; }\n    md2-select:focus .md2-select-placeholder .md2-placeholder-required { color: #f00; }\n    md2-select:focus .md2-select-placeholder,\n    md2-select .md2-select-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-select.md2-select-disabled:focus .md2-select-placeholder,\n    md2-select.md2-select-disabled:focus .md2-select-placeholder .md2-placeholder-required { color: rgba(0,0,0,0.38); }\n    md2-select .md2-select-container .md2-select-value { display: block; font-size: 15px; line-height: 26px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    md2-select .md2-select-container svg { position: absolute; right: 0; top: 2px; display: block; fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-select .md2-select-menu.open { display: block; }\n  "],
            providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$24('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Select);
    return Md2Select;
}());
var Md2Option = (function () {
    function Md2Option(select, selectDispatcher, _elementRef) {
        var _this = this;
        this.selectDispatcher = selectDispatcher;
        this._elementRef = _elementRef;
        this._value = null;
        this.focused = false;
        this.id = 'md2-option-' + _uniqueIdCounter++;
        this.select = select;
        selectDispatcher.listen(function (id, name) {
            if (id !== _this.id && name === _this.name) {
                _this.selected = false;
            }
        });
    }
    Object.defineProperty(Md2Option.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (selected) {
            if (selected) {
                this.selectDispatcher.notify(this.id, this.name);
            }
            this._selected = selected;
            if (selected && this.select.value !== this.value) {
                this.select.selected = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                if (this.selected) {
                    this.select.value = value;
                }
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "disabled", {
        get: function () { return this._disabled || this.select.disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Md2Option.prototype.ngOnInit = function () {
        this.selected = this.value ? this.select.value === this.value : false;
        this.name = this.select.name;
    };
    Md2Option.prototype.ngAfterViewChecked = function () {
        this.text = !!this.label ? this.label : this._elementRef.nativeElement.textContent.trim();
        if (this.value === null) {
            this.value = this.text;
        }
    };
    /**
     * on click to select option
     * @param event
     */
    Md2Option.prototype.onOptionClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        //if (this.select.multiple) {
        //} else {
        this.select.selected = this;
        this.select.touch();
        this.select.onBlur();
        //}
    };
    __decorate$24([
        _angular_core.HostBinding('class.md2-option-focused'), 
        __metadata$24('design:type', Boolean)
    ], Md2Option.prototype, "focused", void 0);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Option.prototype, "label", void 0);
    __decorate$24([
        _angular_core.HostBinding(),
        _angular_core.Input(), 
        __metadata$24('design:type', String)
    ], Md2Option.prototype, "id", void 0);
    __decorate$24([
        _angular_core.HostBinding('class.md2-option-selected'),
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Option.prototype, "selected", null);
    __decorate$24([
        _angular_core.Input(), 
        __metadata$24('design:type', Object)
    ], Md2Option.prototype, "value", null);
    __decorate$24([
        _angular_core.HostBinding('class.md2-option-disabled'),
        _angular_core.Input(), 
        __metadata$24('design:type', Boolean)
    ], Md2Option.prototype, "disabled", null);
    Md2Option = __decorate$24([
        _angular_core.Component({selector: 'md2-option',
            template: '<ng-content></ng-content>',
            styles: ["\n    md2-option { position: relative; display: block; width: 100%; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; cursor: pointer; box-sizing: border-box; transition: background 400ms linear; }\n    md2-option.md2-option-selected { color: #106cc8; }\n    md2-option:hover,\n    md2-option.md2-option-focused { background: #eeeeee; }\n    md2-option.md2-option-disabled,\n    md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }\n    /*md2-select[multiple] md2-option { padding-left: 40px; }\n    md2-select[multiple] md2-option:after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }\n    md2-select[multiple] md2-option.md2-option-selected:after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; border-color: #106cc8; }\n    md2-select[multiple] md2-option.md2-option-disabled:after { border-color: rgba(187,187,187,0.54); }*/\n  "],
            host: {
                'role': 'option',
                '(click)': 'onOptionClick($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$24('design:paramtypes', [Md2Select, Md2SelectDispatcher, _angular_core.ElementRef])
    ], Md2Option);
    return Md2Option;
}());
var MD2_SELECT_DIRECTIVES = [Md2Select, Md2Option];
var Md2SelectModule = (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule,
            providers: [Md2SelectDispatcher]
        };
    };
    Md2SelectModule = __decorate$24([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_SELECT_DIRECTIVES,
            declarations: MD2_SELECT_DIRECTIVES,
        }), 
        __metadata$24('design:paramtypes', [])
    ], Md2SelectModule);
    return Md2SelectModule;
}());

var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2TabChangeEvent = (function () {
    function Md2TabChangeEvent() {
    }
    return Md2TabChangeEvent;
}());
var Md2Transclude = (function () {
    function Md2Transclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(Md2Transclude.prototype, "md2Transclude", {
        get: function () {
            return this._md2Transclude;
        },
        set: function (templateRef) {
            this._md2Transclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', _angular_core.TemplateRef), 
        __metadata$25('design:paramtypes', [_angular_core.TemplateRef])
    ], Md2Transclude.prototype, "md2Transclude", null);
    Md2Transclude = __decorate$25([
        _angular_core.Directive({ selector: '[md2Transclude]' }), 
        __metadata$25('design:paramtypes', [_angular_core.ViewContainerRef])
    ], Md2Transclude);
    return Md2Transclude;
}());
var Md2Tab = (function () {
    function Md2Tab() {
    }
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', String)
    ], Md2Tab.prototype, "label", void 0);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', Boolean)
    ], Md2Tab.prototype, "active", void 0);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', Boolean)
    ], Md2Tab.prototype, "disabled", void 0);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', String)
    ], Md2Tab.prototype, "class", void 0);
    Md2Tab = __decorate$25([
        _angular_core.Component({selector: 'md2-tab',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.active]': 'active'
            }
        }), 
        __metadata$25('design:paramtypes', [])
    ], Md2Tab);
    return Md2Tab;
}());
var Md2TabLabel = (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel = __decorate$25([
        _angular_core.Directive({ selector: '[md2-tab-label]' }), 
        __metadata$25('design:paramtypes', [_angular_core.TemplateRef, Md2Tab])
    ], Md2TabLabel);
    return Md2TabLabel;
}());
var Md2Tabs = (function () {
    function Md2Tabs(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this.shouldPaginate = false;
        this.offsetLeft = 0;
        this.inkBarLeft = '0';
        this.inkBarWidth = '0';
        this.change = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Md2Tabs.prototype, "selectedIndex", {
        get: function () { return this._selectedIndex; },
        set: function (value) {
            if (typeof value === 'string') {
                value = parseInt(value);
            }
            if (value != this._selectedIndex) {
                this._selectedIndex = value;
                this.adjustOffset(value);
                this._updateInkBar();
                if (this.tabs) {
                    var tabs = this.tabs.toArray();
                    if (!tabs[value].disabled) {
                        tabs.forEach(function (tab) { return tab.active = false; });
                        tabs[value].active = true;
                    }
                }
                if (this._isInitialized) {
                    this.change.emit(this._createChangeEvent(value));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "focusIndex", {
        get: function () { return this._focusIndex; },
        set: function (value) {
            this._focusIndex = value;
            this.adjustOffset(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "element", {
        get: function () {
            var elements = { root: this.elementRef.nativeElement, wrapper: null, canvas: null, paging: null, tabs: null };
            elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
            elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
            elements.paging = elements.canvas.querySelector('.md2-tabs-header');
            elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After Content Init
     */
    Md2Tabs.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.updatePagination();
        }, 0);
        setTimeout(function () {
            var tabs = _this.tabs.toArray();
            if (_this.selectedIndex) {
                tabs.forEach(function (tab) { return tab.active = false; });
                tabs[_this.selectedIndex].active = true;
                _this.adjustOffset(_this.selectedIndex);
            }
            else {
                var index = tabs.findIndex(function (t) { return t.active; });
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    _this.selectedIndex = index;
                }
            }
            _this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    };
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     */
    Md2Tabs.prototype._updateInkBar = function () {
        var elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        var tab = elements.tabs[this.selectedIndex];
        this.inkBarLeft = tab.offsetLeft + 'px';
        this.inkBarWidth = tab.offsetWidth + 'px';
    };
    /**
     * Create Change Event
     * @param index
     * @return event of Md2TabChangeEvent
     */
    Md2Tabs.prototype._createChangeEvent = function (index) {
        var event = new Md2TabChangeEvent;
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Focus next Tab
     */
    Md2Tabs.prototype.focusNextTab = function () { this.incrementIndex(1); };
    /**
     * Focus previous Tab
     */
    Md2Tabs.prototype.focusPreviousTab = function () { this.incrementIndex(-1); };
    /**
     * Mouse Wheel scroll
     * @param event
     */
    Md2Tabs.prototype.scroll = function (event) {
        if (!this.shouldPaginate) {
            return;
        }
        event.preventDefault();
        this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
    };
    /**
     * Next Page
     */
    Md2Tabs.prototype.nextPage = function () {
        var elements = this.element;
        var viewportWidth = elements.canvas.clientWidth, totalWidth = viewportWidth + this.offsetLeft, i, tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft);
    };
    /**
     * Previous Page
     */
    Md2Tabs.prototype.previousPage = function () {
        var i, tab, elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft) {
                break;
            }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
    };
    /**
     * On Window Resize
     * @param event
     */
    Md2Tabs.prototype.onWindowResize = function (event) {
        this.offsetLeft = this.fixOffset(this.offsetLeft);
        this.updatePagination();
    };
    /**
     * Can page Back
     */
    Md2Tabs.prototype.canPageBack = function () { return this.offsetLeft > 0; };
    /**
     * Can page Previous
     */
    Md2Tabs.prototype.canPageForward = function () {
        var elements = this.element;
        var lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this.offsetLeft;
    };
    /**
     * Update Pagination
     */
    Md2Tabs.prototype.updatePagination = function () {
        var canvasWidth = this.element.root.clientWidth;
        this.element.tabs.forEach(function (tab) {
            canvasWidth -= tab.offsetWidth;
        });
        this.shouldPaginate = canvasWidth < 0;
    };
    /**
     * Increment Focus Tab
     * @param inc
     */
    Md2Tabs.prototype.incrementIndex = function (inc) {
        var newIndex, index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    };
    /**
     * Adjust Offset of Tab
     * @param index
     */
    Md2Tabs.prototype.adjustOffset = function (index) {
        var elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        var tab = elements.tabs[index], left = tab.offsetLeft, right = tab.offsetWidth + left;
        this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
    };
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    Md2Tabs.prototype.fixOffset = function (value) {
        var elements = this.element;
        if (!elements.tabs.length || !this.shouldPaginate) {
            return 0;
        }
        var lastTab = elements.tabs[elements.tabs.length - 1], totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.max(0, value);
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        return value;
    };
    __decorate$25([
        _angular_core.ContentChildren(Md2Tab), 
        __metadata$25('design:type', _angular_core.QueryList)
    ], Md2Tabs.prototype, "tabs", void 0);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', String)
    ], Md2Tabs.prototype, "class", void 0);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', Object), 
        __metadata$25('design:paramtypes', [Object])
    ], Md2Tabs.prototype, "selectedIndex", null);
    __decorate$25([
        _angular_core.Output(), 
        __metadata$25('design:type', _angular_core.EventEmitter)
    ], Md2Tabs.prototype, "change", void 0);
    Md2Tabs = __decorate$25([
        _angular_core.Component({selector: 'md2-tabs',
            template: "\n    <div class=\"md2-tabs-header-wrapper\">\n      <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"shouldPaginate\" (click)=\"previousPage()\">\n        <em class=\"prev-icon\">Prev</em>\n      </div>\n      <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"shouldPaginate\" (click)=\"nextPage()\">\n        <em class=\"next-icon\">Next</em>\n      </div>\n      <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\">\n        <div class=\"md2-tabs-header\" [style.marginLeft]=\"-offsetLeft + 'px'\">\n          <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\">\n            <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span>\n          </div>\n          <div class=\"md2-tab-ink-bar\" [style.left]=\"inkBarLeft\" [style.width]=\"inkBarWidth\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"md2-tabs-body-wrapper\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; }\n    .md2-tabs-header-wrapper { position: relative; display: block; height: 48px; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0,0,0,0.12); display: block; margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    .md2-tabs-header-wrapper:after { content: ''; display: table; clear: both; }\n    .md2-prev-button,\n    .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; }\n    .md2-prev-button { left: 0; }\n    .md2-next-button { right: 0; }\n    .md2-prev-button.disabled,\n    .md2-next-button.disabled { opacity: .25; cursor: default; }\n    .md2-prev-button .prev-icon,\n    .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; }\n    .md2-next-button .next-icon { border-width: 2px 2px 0 0; }\n    .md2-tabs-canvas { position: relative; height: 100%; overflow: hidden; display: block; outline: none; }\n    .md2-tabs-canvas.md2-paginated { margin: 0 32px; }\n    .md2-tabs-header { position: relative; display: inline-block; height: 100%; white-space: nowrap; -moz-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -o-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -webkit-transition: 0.5s cubic-bezier(0.35,0,0.25,1); transition: 0.5s cubic-bezier(0.35,0,0.25,1); }\n    .md2-tab-label { position: relative; height: 100%; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n    .md2-tab-label.active { color: rgb(16,108,200); }\n    .md2-tabs-canvas:focus .md2-tab-label.focus { background: rgba(0,0,0,0.05); }\n    .md2-tab-label.disabled { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }\n    .md2-tab-ink-bar { position: absolute; bottom: 0; height: 2px; background: rgb(255,82,82); transition: .25s cubic-bezier(.35,0,.25,1); }\n    .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; }\n    md2-tab { padding: 16px; display: none; position: relative; }\n    md2-tab.active { display: block; position: relative; }\n  "],
            host: {
                '[class]': 'class',
                '(window:resize)': 'onWindowResize($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$25('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Tabs);
    return Md2Tabs;
}());
var MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
var Md2TabsModule = (function () {
    function Md2TabsModule() {
    }
    Md2TabsModule.forRoot = function () {
        return {
            ngModule: Md2TabsModule,
            providers: []
        };
    };
    Md2TabsModule = __decorate$25([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TABS_DIRECTIVES,
            declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
        }), 
        __metadata$25('design:paramtypes', [])
    ], Md2TabsModule);
    return Md2TabsModule;
}());

var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$26 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$5 = function () { };
var nextId$5 = 0;
var Tag = (function () {
    function Tag(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Tag;
}());
var MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Tags; }),
    multi: true
};
var Md2Tags = (function () {
    function Md2Tags(element) {
        this.element = element;
        this.change = new _angular_core.EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop$5;
        this._onChangeCallback = noop$5;
        this._tags = [];
        this.list = [];
        this.items = [];
        this.focusedTag = 0;
        this.selectedTag = -1;
        this.tagBuffer = '';
        this.inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId$5);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this.items.length) {
                this.selectTag(-1);
                this.onFocus();
                return;
            }
            if (index === this.items.length) {
                return this.onFocus();
            }
            index = Math.max(index, 0);
            index = Math.min(index, this.items.length - 1);
            this.selectTag(index);
        };
    }
    Md2Tags.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Tags.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "tags", {
        set: function (value) { this._tags = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * setup value
     * @param value
     */
    Md2Tags.prototype.setValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function(i) {
                    var selItm = this_1._tags.find(function (t) { return _this.equals(_this.valueKey ? t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_1.items.push(new Tag(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Tags.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Tags.prototype, "isMenuVisible", {
        get: function () {
            return ((this.inputFocused || this.noBlur) && this.tagBuffer && this.list && this.list.length) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of tags suggestion menu
     */
    Md2Tags.prototype.updateScroll = function () {
        if (this.focusedTag < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this.focusedTag];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input key listener
     * @param event
     */
    Md2Tags.prototype.inputKeydown = function (event) {
        var _this = this;
        // Backspace
        if (event.keyCode === 8 && !this.tagBuffer) {
            event.preventDefault();
            event.stopPropagation();
            if (this.items.length && this.selectedTag < 0) {
                this.selectAndFocusTagSafe(this.items.length - 1);
            }
            if (this.items.length && this.selectedTag > -1) {
                this.removeAndSelectAdjacentTag(this.selectedTag);
            }
            return;
        }
        // Del Key
        if (event.keyCode === 46 && !this.tagBuffer) {
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this.tagBuffer) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this.focusedTag = (this.focusedTag === this.list.length - 1) ? 0 : Math.min(this.focusedTag + 1, this.list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this.focusedTag = (this.focusedTag === 0) ? this.list.length - 1 : Math.max(0, this.focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this.tagBuffer || !this.isMenuVisible) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this.addTag(event, this.focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this.tagBuffer) {
                this.tagBuffer = '';
            }
            if (this.selectedTag >= 0) {
                this.onFocus();
            }
            return;
        }
        // reset selected tag
        if (this.selectedTag >= 0) {
            this.resetselectedTag();
        }
        // filter
        setTimeout(function () {
            _this.filterMatches(new RegExp(_this.tagBuffer, 'ig'));
        }, 10);
    };
    Md2Tags.prototype.onKeydown = function (event) {
        if (this.disabled || this.tagBuffer) {
            return;
        }
        switch (event.keyCode) {
            case exports.KeyCodes.BACKSPACE:
            case exports.KeyCodes.DELETE:
                if (this.selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this.selectedTag);
                break;
            case exports.KeyCodes.TAB:
            case exports.KeyCodes.ESCAPE:
                if (this.selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.onFocus();
                break;
            case exports.KeyCodes.LEFT_ARROW:
                event.preventDefault();
                if (this.selectedTag < 0) {
                    this.selectedTag = this.items.length;
                }
                if (this.items.length) {
                    this.selectAndFocusTagSafe(this.selectedTag - 1);
                }
                break;
            case exports.KeyCodes.RIGHT_ARROW:
                event.preventDefault();
                if (this.selectedTag >= this.items.length) {
                    this.selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this.selectedTag + 1);
                break;
        }
    };
    Md2Tags.prototype.removeAndSelectAdjacentTag = function (index) {
        var selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    };
    Md2Tags.prototype.resetselectedTag = function () {
        this.selectedTag = -1;
    };
    Md2Tags.prototype.getAdjacentTagIndex = function (index) {
        var len = this.items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    };
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    Md2Tags.prototype.addTag = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.items.push(this.list[index]);
        this.tagBuffer = '';
        this.updateValue();
    };
    Md2Tags.prototype.removeTagAndFocusInput = function (index) {
        this.removeTag(index);
        this.onFocus();
    };
    /**
     * remove tag
     * @param index
     */
    Md2Tags.prototype.removeTag = function (index) {
        this.items.splice(index, 1);
        this.updateValue();
    };
    /**
     * update value
     */
    Md2Tags.prototype.updateValue = function () {
        this._value = new Array();
        for (var i = 0; i < this.items.length; i++) {
            this._value.push(this.items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * select tag
     * @param index of select tag
     */
    Md2Tags.prototype.selectTag = function (index) {
        if (index >= -1 && index <= this.items.length) {
            this.selectedTag = index;
        }
    };
    Md2Tags.prototype.onFocus = function () {
        this.element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    };
    Md2Tags.prototype.onInputFocus = function () {
        this.inputFocused = true;
        this.resetselectedTag();
    };
    Md2Tags.prototype.onInputBlur = function () {
        this.inputFocused = false;
    };
    Md2Tags.prototype.listEnter = function () { this.noBlur = true; };
    Md2Tags.prototype.listLeave = function () { this.noBlur = false; };
    /**
     * update suggestion menu with filter
     * @param query
     */
    Md2Tags.prototype.filterMatches = function (query) {
        var _this = this;
        var tempList = this._tags.map(function (tag) { return new Tag(tag, _this.textKey, _this.valueKey); });
        this.list = tempList.filter(function (t) { return (query.test(t.text) && !_this.items.find(function (i) { return t.text === i.text; })); });
        if (this.list.length > 0) {
            this.focusedTag = 0;
        }
    };
    Md2Tags.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function(i) {
                    var selItm = this_2._tags.find(function (t) { return _this.equals(_this.valueKey ? t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_2.items.push(new Tag(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    Md2Tags.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Tags.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$26([
        _angular_core.Output(), 
        __metadata$26('design:type', _angular_core.EventEmitter)
    ], Md2Tags.prototype, "change", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', String)
    ], Md2Tags.prototype, "id", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', Number)
    ], Md2Tags.prototype, "tabindex", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', String)
    ], Md2Tags.prototype, "placeholder", void 0);
    __decorate$26([
        _angular_core.Input('md2-tag-text'), 
        __metadata$26('design:type', String)
    ], Md2Tags.prototype, "textKey", void 0);
    __decorate$26([
        _angular_core.Input('md2-tag-value'), 
        __metadata$26('design:type', String)
    ], Md2Tags.prototype, "valueKey", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', Boolean)
    ], Md2Tags.prototype, "disabled", null);
    __decorate$26([
        _angular_core.Input('md2-tags'), 
        __metadata$26('design:type', Array), 
        __metadata$26('design:paramtypes', [Array])
    ], Md2Tags.prototype, "tags", null);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', Object)
    ], Md2Tags.prototype, "value", null);
    __decorate$26([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$26('design:type', Function), 
        __metadata$26('design:paramtypes', [KeyboardEvent]), 
        __metadata$26('design:returntype', void 0)
    ], Md2Tags.prototype, "onKeydown", null);
    __decorate$26([
        _angular_core.HostListener('focus'), 
        __metadata$26('design:type', Function), 
        __metadata$26('design:paramtypes', []), 
        __metadata$26('design:returntype', void 0)
    ], Md2Tags.prototype, "onFocus", null);
    Md2Tags = __decorate$26([
        _angular_core.Component({selector: 'md2-tags',
            template: "\n    <div class=\"md2-tags-container\">\n      <span *ngFor=\"let t of items; let i = index;\" class=\"md2-tag\" [class.active]=\"selectedTag === i\" (click)=\"selectTag(i)\">\n        <span class=\"md2-tag-text\">{{t.text}}</span>\n        <svg (click)=\"removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n        </svg>\n      </span>\n      <span class=\"md2-tag-add\">\n        <input [(ngModel)]=\"tagBuffer\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"onInputFocus()\" (blur)=\"onInputBlur()\" (keydown)=\"inputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n        <ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"listEnter()\" (mouseleave)=\"listLeave()\">\n          <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.focused]=\"focusedTag === i\" (click)=\"addTag($event, i)\">\n            <span class=\"md2-option-text\" [innerHtml]=\"l.text | highlight:tagBuffer\"></span>\n          </li>\n        </ul>\n      </span>\n    </div>\n  ",
            styles: ["\n    md2-tags { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-tags:focus { outline: none; }\n    md2-tags .md2-tags-container { position: relative; display: block; max-width: 100%; padding: 2px 3px 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; cursor: text; }\n    md2-tags .md2-tags-container:before, md2-tags .md2-tags-container:after { display: table; content: \" \"; }\n    md2-tags .md2-tags-container:after { clear: both; }\n    md2-tags.focus .md2-tags-container { padding-bottom: 7px; border-bottom: 2px solid #106cc8; }\n    md2-tags.md2-tags-disabled .md2-tags-container { color: rgba(0,0,0,0.38); cursor: default; }\n    md2-tags.md2-tags-disabled.focus .md2-tags-container { padding-bottom: 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }\n    md2-tags .md2-tags-container .md2-tag { position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 26px 0 12px; float: left; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; max-width: 100%; background: rgb(224,224,224); color: rgb(66,66,66); white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n    md2-tags .md2-tags-container .md2-tag.active { background: #106cc8; color: rgba(255,255,255,0.87); }\n    md2-tags .md2-tags-container .md2-tag svg { position: absolute; top: 4px; right: 2px; cursor: pointer; display: inline-block; overflow: hidden;fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-tags .md2-tag.active svg { color: rgba(255,255,255,0.87); }\n    md2-tags .md2-tag-add { position: relative; display: inline-block; }\n    md2-tags input { border: 0; outline: 0; margin-top: 8px; height: 32px; line-height: 32px; padding: 0; color: rgba(0,0,0,0.87); background: 0 0; }\n    md2-tags .md2-tags-container .md2-tags-placeholder { color: rgba(0, 0, 0, 0.38); }\n    md2-tags .md2-tags-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 6px 0 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-tags .md2-tags-menu .md2-option { cursor: pointer; position: relative; display: block; color: #212121; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }\n    md2-tags .md2-tags-menu .md2-option:hover, md2-tags .md2-tags-menu .md2-option.focused { background: #eeeeee; }\n    md2-tags .md2-tags-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    md2-tags .highlight { color: #757575; }\n  "],
            host: {
                'role': 'tags',
                '[id]': 'id',
                '[class.focus]': 'inputFocused || selectedTag >= 0',
                '[class.md2-tags-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$26('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Tags);
    return Md2Tags;
}());
var MD2_TAGS_DIRECTIVES = [Md2Tags];
var Md2TagsModule = (function () {
    function Md2TagsModule() {
    }
    Md2TagsModule.forRoot = function () {
        return {
            ngModule: Md2TagsModule,
            providers: []
        };
    };
    Md2TagsModule = __decorate$26([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            exports: MD2_TAGS_DIRECTIVES,
            declarations: MD2_TAGS_DIRECTIVES,
        }), 
        __metadata$26('design:paramtypes', [])
    ], Md2TagsModule);
    return Md2TagsModule;
}());

var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$28 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2ToastComponent = (function () {
    function Md2ToastComponent() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    Md2ToastComponent.prototype.add = function (toast) {
        var _this = this;
        setTimeout(function () {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(function () {
                _this.toasts.splice(0, (_this.toasts.length - _this.maxShown));
            }, 250);
        }
    };
    /**
     * remove toast
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.remove = function (toastId) {
        var _this = this;
        this.toasts.forEach(function (t) { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(function () {
            _this.toasts = _this.toasts.filter(function (toast) { return toast.id !== toastId; });
        }, 250);
    };
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.removeAll = function () {
        var _this = this;
        this.toasts.forEach(function (t) { t.isVisible = false; });
        setTimeout(function () {
            _this.toasts = [];
        }, 250);
    };
    /**
     * check has any toast
     * @return boolean
     */
    Md2ToastComponent.prototype.hasToast = function () { return this.toasts.length > 0; };
    Md2ToastComponent = __decorate$28([
        _angular_core.Component({
            selector: 'md2-toast',
            template: "\n    <div class=\"md2-toast-wrapper\">\n      <div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [class.in]=\"toast.isVisible\" (click)=\"remove(toast.id)\">{{toast.message}}</div>\n    </div>\n  ",
            styles: ["\n    .md2-toast-wrapper { position: fixed; top: 0; right: 0; z-index: 1060; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; max-width: 100%; padding: 8px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; margin-top: -53px; opacity: 0; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0,0,0,.26); border-radius: 2px; font-size: 14px; overflow: hidden; -ms-word-wrap: break-word; word-wrap: break-word; transition: all .25s linear; }\n    .md2-toast.in { margin-top: 0; opacity: 1; }\n  "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$28('design:paramtypes', [])
    ], Md2ToastComponent);
    return Md2ToastComponent;
}());

var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$27 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Toast = (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
var Md2Toast = (function () {
    function Md2Toast(_componentFactory, _appRef) {
        this._componentFactory = _componentFactory;
        this._appRef = _appRef;
        this.delay = 3000;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    Md2Toast.prototype.toast = function (toast) {
        this.show(toast);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    Md2Toast.prototype.show = function (toastObj) {
        var toast;
        if (typeof toastObj === 'string') {
            toast = new Toast(toastObj);
        }
        else if (typeof toastObj === 'object') {
            toast = new Toast(toastObj.message);
            this.delay = toastObj.hideDelay;
        }
        if (toast) {
            if (!this.container) {
                var app = this._appRef;
                var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
                var providers = _angular_core.ReflectiveInjector.resolve([]);
                var toastFactory = this._componentFactory.resolveComponentFactory(Md2ToastComponent);
                var childInjector = _angular_core.ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
                this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
                this.setupToast(toast);
            }
            else {
                this.setupToast(toast);
            }
        }
    };
    /**
     * toast timeout
     * @param toastId
     */
    Md2Toast.prototype.startTimeout = function (toastId) {
        var _this = this;
        setTimeout(function () {
            _this.clear(toastId);
        }, this.delay);
    };
    /**
     * setup toast
     * @param toast
     */
    Md2Toast.prototype.setupToast = function (toast) {
        toast.id = ++this.index;
        this.container.instance.add(toast);
        this.startTimeout(toast.id);
    };
    /**
     * clear specific toast
     * @param toastId
     */
    Md2Toast.prototype.clear = function (toastId) {
        var _this = this;
        if (this.container) {
            var instance_1 = this.container.instance;
            instance_1.remove(toastId);
            setTimeout(function () {
                if (!instance_1.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    Md2Toast.prototype.clearAll = function () {
        var _this = this;
        if (this.container) {
            var instance_2 = this.container.instance;
            instance_2.removeAll();
            setTimeout(function () {
                if (!instance_2.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * dispose all toasts
     */
    Md2Toast.prototype.dispose = function () {
        this.container.destroy();
        this.container = null;
    };
    Md2Toast = __decorate$27([
        _angular_core.Injectable(), 
        __metadata$27('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ApplicationRef])
    ], Md2Toast);
    return Md2Toast;
}());
var MD2_TOAST_DIRECTIVES = [Md2ToastComponent];
var Md2ToastModule = (function () {
    function Md2ToastModule() {
    }
    Md2ToastModule.forRoot = function () {
        return {
            ngModule: Md2ToastModule,
            providers: []
        };
    };
    Md2ToastModule = __decorate$27([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TOAST_DIRECTIVES,
            declarations: MD2_TOAST_DIRECTIVES,
            providers: [Md2Toast],
            entryComponents: MD2_TOAST_DIRECTIVES
        }), 
        __metadata$27('design:paramtypes', [])
    ], Md2ToastModule);
    return Md2ToastModule;
}());

var __decorate$31 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$31 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2TooltipOptions = (function () {
    /**
     * constructor for tooltip options
     * @param options
     */
    function Md2TooltipOptions(options) {
        Object.assign(this, options);
    }
    Md2TooltipOptions = __decorate$31([
        _angular_core.Injectable(), 
        __metadata$31('design:paramtypes', [Object])
    ], Md2TooltipOptions);
    return Md2TooltipOptions;
}());

var __decorate$30 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$30 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_element, _changeDetector, options) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.top = '-1000px';
        this.left = '-1000px';
        Object.assign(this, options);
        this._isVisible = false;
    }
    Md2TooltipComponent.prototype.ngAfterViewInit = function () {
        var _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
        this.top = _position.top + 'px';
        this.left = _position.left + 'px';
        this._isVisible = true;
        this._changeDetector.detectChanges();
    };
    /**
     * calculate position of target element
     * @param hostEl host element
     * @param targetEl targer element
     * @param position position
     * @return {top: number, left: number} object of top, left properties
     */
    Md2TooltipComponent.prototype.positionElements = function (hostEl, targetEl, position) {
        var positionStrParts = position.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = this.offset(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
            before: hostElPos.left,
            after: hostElPos.left + hostElPos.width
        };
        var shiftHeight = {
            center: hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
            above: hostElPos.top,
            below: hostElPos.top + hostElPos.height
        };
        var targetElPos;
        switch (pos0) {
            case 'before':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: (hostElPos.left - targetElWidth) // > 0 ? (hostElPos.left - targetElWidth) : (hostElPos.width + hostElPos.left)
                };
                break;
            case 'after':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: shiftWidth[pos0]
                };
                break;
            case 'above':
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]
                };
                break;
            default:
                targetElPos = {
                    top: shiftHeight[pos0],
                    left: shiftWidth[pos1]
                };
                break;
        }
        return targetElPos;
    };
    /**
     * calculate offset of target element
     * @param nativeEl element
     * @return {width: number, height: number,top: number, left: number} object of with, height, top, left properties
     */
    Md2TooltipComponent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top,
            left: boundingClientRect.left
        };
    };
    Object.defineProperty(Md2TooltipComponent.prototype, "window", {
        get: function () { return window; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2TooltipComponent.prototype, "document", {
        get: function () { return window.document; },
        enumerable: true,
        configurable: true
    });
    Md2TooltipComponent = __decorate$30([
        _angular_core.Component({selector: 'md2-tooltip',
            template: "\n    <div class=\"md2-tooltip-container\" [class.md2-tooltip-visible]=\"_isVisible\" [ngStyle]=\"{top: top, left: left}\">\n      <div class=\"md2-tooltip\" [innerHTML]=\"message\"></div>\n    </div>\n  ",
            styles: ["\n    .md2-tooltip-container { position: fixed; z-index: 1070; overflow: hidden; pointer-events: none; border-radius: 4px; font-weight: 500; font-style: normal; font-size: 10px; display: block; color: rgb(255,255,255); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-tooltip .md2-tooltip { position: relative; margin: 5px; color: #fff; text-align: center; opacity: 0; max-width: 200px; background-color: rgba(97, 97, 97, 0.9); border-radius: 4px; line-height: 1.5; padding: 4px 12px; -moz-transition: all .2s cubic-bezier(.25,.8,.25,1); -o-transition: all .2s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .2s cubic-bezier(.25,.8,.25,1); transition: all .2s cubic-bezier(.25,.8,.25,1); -moz-transform-origin: center top; -ms-transform-origin: center top; -o-transform-origin: center top; -webkit-transform-origin: center top; transform-origin: center top; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); }\n    md2-tooltip.before .md2-tooltip { -moz-transform-origin: center right; -ms-transform-origin: center right; -o-transform-origin: center right; -webkit-transform-origin: center right; transform-origin: center right; }    \n    md2-tooltip.after .md2-tooltip { -moz-transform-origin: center left; -ms-transform-origin: center left; -o-transform-origin: center left; -webkit-transform-origin: center left; transform-origin: center left; }\n    md2-tooltip.above .md2-tooltip { -moz-transform-origin: center bottom; -ms-transform-origin: center bottom; -o-transform-origin: center bottom; -webkit-transform-origin: center bottom; transform-origin: center bottom; }\n    .md2-tooltip-visible .md2-tooltip { opacity: 1; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }\n  "],
            host: {
                'role': 'tooltip',
                '[class]': 'position'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$30('design:paramtypes', [_angular_core.ElementRef, _angular_core.ChangeDetectorRef, Md2TooltipOptions])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());

var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$29 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Tooltip = (function () {
    function Md2Tooltip(_componentFactory, _appRef, _viewContainer) {
        this._componentFactory = _componentFactory;
        this._appRef = _appRef;
        this._viewContainer = _viewContainer;
        this.visible = false;
        this.position = 'below';
        this.delay = 0;
    }
    /**
     * show tooltip while mouse enter or focus of element
     * @param event
     */
    Md2Tooltip.prototype.show = function (event) {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        var options = new Md2TooltipOptions({
            message: this.message,
            position: this.position,
            hostEl: this._viewContainer.element
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.timer = 0;
            var app = _this._appRef;
            var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
            var providers = _angular_core.ReflectiveInjector.resolve([
                { provide: Md2TooltipOptions, useValue: options }
            ]);
            var toastFactory = _this._componentFactory.resolveComponentFactory(Md2TooltipComponent);
            var childInjector = _angular_core.ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
            _this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
        }, this.delay);
    };
    /**
     * hide tooltip while mouse our/leave or blur of element
     * @param event
     */
    Md2Tooltip.prototype.hide = function (event) {
        clearTimeout(this.timer);
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    };
    __decorate$29([
        _angular_core.Input('tooltip'), 
        __metadata$29('design:type', String)
    ], Md2Tooltip.prototype, "message", void 0);
    __decorate$29([
        _angular_core.Input('tooltip-position'), 
        __metadata$29('design:type', String)
    ], Md2Tooltip.prototype, "position", void 0);
    __decorate$29([
        _angular_core.Input('tooltip-delay'), 
        __metadata$29('design:type', Number)
    ], Md2Tooltip.prototype, "delay", void 0);
    __decorate$29([
        _angular_core.HostListener('focusin', ['$event']),
        _angular_core.HostListener('mouseenter', ['$event']), 
        __metadata$29('design:type', Function), 
        __metadata$29('design:paramtypes', [Event]), 
        __metadata$29('design:returntype', void 0)
    ], Md2Tooltip.prototype, "show", null);
    __decorate$29([
        _angular_core.HostListener('focusout', ['$event']),
        _angular_core.HostListener('mouseleave', ['$event']), 
        __metadata$29('design:type', Function), 
        __metadata$29('design:paramtypes', [Event]), 
        __metadata$29('design:returntype', void 0)
    ], Md2Tooltip.prototype, "hide", null);
    Md2Tooltip = __decorate$29([
        _angular_core.Directive({
            selector: '[tooltip]'
        }), 
        __metadata$29('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ApplicationRef, _angular_core.ViewContainerRef])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
var MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, Md2TooltipComponent];
var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: [{
                    provide: Md2TooltipOptions, useValue: {}
                }]
        };
    };
    Md2TooltipModule = __decorate$29([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TOOLTIP_DIRECTIVES,
            declarations: MD2_TOOLTIP_DIRECTIVES,
            entryComponents: [Md2TooltipComponent]
        }), 
        __metadata$29('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
}());

var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MD2_MODULES = [
    Md2AccordionModule,
    Md2AutocompleteModule,
    Md2ChipsModule,
    Md2CollapseModule,
    Md2ColorpickerModule,
    Md2DataTableModule,
    Md2DatepickerModule,
    Md2DialogModule,
    Md2MenuModule,
    Md2MultiselectModule,
    Md2SelectModule,
    Md2TabsModule,
    Md2TagsModule,
    Md2ToastModule,
    Md2TooltipModule,
    OverlayModule,
    PortalModule,
];
var Md2RootModule = (function () {
    function Md2RootModule() {
    }
    Md2RootModule = __decorate$9([
        _angular_core.NgModule({
            imports: [
                Md2AccordionModule.forRoot(),
                Md2AutocompleteModule.forRoot(),
                Md2ChipsModule.forRoot(),
                Md2CollapseModule.forRoot(),
                Md2ColorpickerModule.forRoot(),
                Md2DataTableModule.forRoot(),
                Md2DatepickerModule.forRoot(),
                Md2DialogModule.forRoot(),
                Md2MenuModule.forRoot(),
                Md2MultiselectModule.forRoot(),
                Md2SelectModule.forRoot(),
                Md2TabsModule.forRoot(),
                Md2TagsModule.forRoot(),
                Md2ToastModule.forRoot(),
                Md2TooltipModule.forRoot(),
                PortalModule.forRoot(),
                OverlayModule.forRoot(),
            ],
            exports: MD2_MODULES,
        }), 
        __metadata$9('design:paramtypes', [])
    ], Md2RootModule);
    return Md2RootModule;
}());
var Md2Module = (function () {
    function Md2Module() {
    }
    Md2Module.forRoot = function () {
        return { ngModule: Md2RootModule };
    };
    Md2Module = __decorate$9([
        _angular_core.NgModule({
            imports: MD2_MODULES,
            exports: MD2_MODULES,
        }), 
        __metadata$9('design:paramtypes', [])
    ], Md2Module);
    return Md2Module;
}());

exports.MdCoreModule = MdCoreModule;
exports.Portal = Portal;
exports.BasePortalHost = BasePortalHost;
exports.ComponentPortal = ComponentPortal;
exports.TemplatePortal = TemplatePortal;
exports.PortalHostDirective = PortalHostDirective;
exports.TemplatePortalDirective = TemplatePortalDirective;
exports.PortalModule = PortalModule;
exports.DomPortalHost = DomPortalHost;
exports.Overlay = Overlay;
exports.OVERLAY_PROVIDERS = OVERLAY_PROVIDERS;
exports.OverlayContainer = OverlayContainer;
exports.OverlayRef = OverlayRef;
exports.OverlayState = OverlayState;
exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
exports.OverlayOrigin = OverlayOrigin;
exports.OverlayModule = OverlayModule;
exports.MdUniqueSelectionDispatcher = MdUniqueSelectionDispatcher;
exports.applyCssTransform = applyCssTransform;
exports.MdError = MdError;
exports.coerceBooleanProperty = coerceBooleanProperty;
exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
exports.ConnectionPositionPair = ConnectionPositionPair;
exports.ELEMENTS_SELECTOR = ELEMENTS_SELECTOR;
exports.StyleCompatibility = StyleCompatibility;
exports.StyleCompatibilityModule = StyleCompatibilityModule;
exports.AnimationCurves = AnimationCurves;
exports.AnimationDurations = AnimationDurations;
exports.HighlightPipe = HighlightPipe;
exports.Md2RootModule = Md2RootModule;
exports.Md2Module = Md2Module;
exports.MD2_ACCORDION_DIRECTIVES = MD2_ACCORDION_DIRECTIVES;
exports.Md2AccordionModule = Md2AccordionModule;
exports.Md2Accordion = Md2Accordion;
exports.Md2AccordionTab = Md2AccordionTab;
exports.MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR;
exports.Md2Autocomplete = Md2Autocomplete;
exports.MD2_AUTOCOMPLETE_DIRECTIVES = MD2_AUTOCOMPLETE_DIRECTIVES;
exports.Md2AutocompleteModule = Md2AutocompleteModule;
exports.MD2_CHIPS_CONTROL_VALUE_ACCESSOR = MD2_CHIPS_CONTROL_VALUE_ACCESSOR;
exports.Md2Chips = Md2Chips;
exports.MD2_CHIPS_DIRECTIVES = MD2_CHIPS_DIRECTIVES;
exports.Md2ChipsModule = Md2ChipsModule;
exports.Md2Collapse = Md2Collapse;
exports.MD2_COLLAPSE_DIRECTIVES = MD2_COLLAPSE_DIRECTIVES;
exports.Md2CollapseModule = Md2CollapseModule;
exports.MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR = MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR;
exports.TextDirective = TextDirective;
exports.ColorpickerSliderDirective = ColorpickerSliderDirective;
exports.Md2Colorpicker = Md2Colorpicker;
exports.Hsva = Hsva;
exports.Hsla = Hsla;
exports.Rgba = Rgba;
exports.SliderPosition = SliderPosition;
exports.SliderDimension = SliderDimension;
exports.MD2_COLORPICKER_DIRECTIVES = MD2_COLORPICKER_DIRECTIVES;
exports.Md2ColorpickerModule = Md2ColorpickerModule;
exports.Md2DataTable = Md2DataTable;
exports.Md2DataTableSortField = Md2DataTableSortField;
exports.Md2Pagination = Md2Pagination;
exports.MD2_DATA_TABLE_DIRECTIVES = MD2_DATA_TABLE_DIRECTIVES;
exports.Md2DataTableModule = Md2DataTableModule;
exports.MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR = MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR;
exports.Md2Datepicker = Md2Datepicker;
exports.MD2_DATEPICKER_DIRECTIVES = MD2_DATEPICKER_DIRECTIVES;
exports.Md2DatepickerModule = Md2DatepickerModule;
exports.Md2DialogPortal = Md2DialogPortal;
exports.Md2DialogTitle = Md2DialogTitle;
exports.Md2DialogFooter = Md2DialogFooter;
exports.Md2Dialog = Md2Dialog;
exports.MD2_DIALOG_DIRECTIVES = MD2_DIALOG_DIRECTIVES;
exports.MD2_DIALOG_PROVIDERS = MD2_DIALOG_PROVIDERS;
exports.Md2DialogModule = Md2DialogModule;
exports.Md2MenuNotClosable = Md2MenuNotClosable;
exports.Md2Menu = Md2Menu;
exports.Md2MenuOpen = Md2MenuOpen;
exports.MD2_MENU_DIRECTIVES = MD2_MENU_DIRECTIVES;
exports.Md2MenuModule = Md2MenuModule;
exports.MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR;
exports.Md2Multiselect = Md2Multiselect;
exports.MD2_MULTISELECT_DIRECTIVES = MD2_MULTISELECT_DIRECTIVES;
exports.Md2MultiselectModule = Md2MultiselectModule;
exports.MD2_SELECT_CONTROL_VALUE_ACCESSOR = MD2_SELECT_CONTROL_VALUE_ACCESSOR;
exports.Md2SelectDispatcher = Md2SelectDispatcher;
exports.Md2SelectChange = Md2SelectChange;
exports.Md2Select = Md2Select;
exports.Md2Option = Md2Option;
exports.MD2_SELECT_DIRECTIVES = MD2_SELECT_DIRECTIVES;
exports.Md2SelectModule = Md2SelectModule;
exports.Md2TabChangeEvent = Md2TabChangeEvent;
exports.Md2Transclude = Md2Transclude;
exports.Md2Tab = Md2Tab;
exports.Md2TabLabel = Md2TabLabel;
exports.Md2Tabs = Md2Tabs;
exports.MD2_TABS_DIRECTIVES = MD2_TABS_DIRECTIVES;
exports.Md2TabsModule = Md2TabsModule;
exports.MD2_TAGS_CONTROL_VALUE_ACCESSOR = MD2_TAGS_CONTROL_VALUE_ACCESSOR;
exports.Md2Tags = Md2Tags;
exports.MD2_TAGS_DIRECTIVES = MD2_TAGS_DIRECTIVES;
exports.Md2TagsModule = Md2TagsModule;
exports.Toast = Toast;
exports.Md2Toast = Md2Toast;
exports.MD2_TOAST_DIRECTIVES = MD2_TOAST_DIRECTIVES;
exports.Md2ToastModule = Md2ToastModule;
exports.Md2Tooltip = Md2Tooltip;
exports.MD2_TOOLTIP_DIRECTIVES = MD2_TOOLTIP_DIRECTIVES;
exports.Md2TooltipModule = Md2TooltipModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=./md2.umd.js.map
