var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, ReflectiveInjector, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2Tooltip = (function () {
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
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.timer = 0;
            var app = _this._appRef;
            var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
            var toastFactory = _this._componentFactory.resolveComponentFactory(Md2TooltipComponent);
            var childInjector = ReflectiveInjector.fromResolvedProviders([], appContainer.parentInjector);
            _this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
            _this.tooltip.instance.message = _this.message;
            _this.tooltip.instance.position = _this.position;
            _this.tooltip.instance.hostEl = _this._viewContainer.element;
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
    __decorate([
        Input('tooltip'), 
        __metadata('design:type', String)
    ], Md2Tooltip.prototype, "message", void 0);
    __decorate([
        Input('tooltip-position'), 
        __metadata('design:type', String)
    ], Md2Tooltip.prototype, "position", void 0);
    __decorate([
        Input('tooltip-delay'), 
        __metadata('design:type', Number)
    ], Md2Tooltip.prototype, "delay", void 0);
    __decorate([
        HostListener('focusin', ['$event']),
        HostListener('mouseenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], Md2Tooltip.prototype, "show", null);
    __decorate([
        HostListener('focusout', ['$event']),
        HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], Md2Tooltip.prototype, "hide", null);
    Md2Tooltip = __decorate([
        Directive({
            selector: '[tooltip]'
        }), 
        __metadata('design:paramtypes', [ComponentFactoryResolver, ApplicationRef, ViewContainerRef])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
export var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_element, _changeDetector) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.top = '-1000px';
        this.left = '-1000px';
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
    Md2TooltipComponent = __decorate([
        Component({selector: 'md2-tooltip',
            template: "\n    <div class=\"md2-tooltip-container\" [ngStyle]=\"{top: top, left: left}\">\n      <div class=\"md2-tooltip {{position}}\" [class.visible]=\"_isVisible\">{{message}}</div>\n    </div>\n  ",
            styles: ["md2-tooltip { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-tooltip .md2-tooltip-container { position: fixed; display: block; overflow: hidden; z-index: 1070; } md2-tooltip .md2-tooltip { max-width: 200px; margin: 14px; padding: 4px 12px; font-family: \"\"; color: white; font-size: 10px; word-wrap: break-word; background-color: rgba(97, 97, 97, 0.9); border-radius: 2px; line-height: 1.5; opacity: 0; transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: center top; transform: scale(0); } md2-tooltip .md2-tooltip.before { transform-origin: center right; } md2-tooltip .md2-tooltip.after { transform-origin: center left; } md2-tooltip .md2-tooltip.above { transform-origin: center bottom; } md2-tooltip .md2-tooltip.visible { opacity: 1; transform: scale(1); } /*# sourceMappingURL=tooltip.css.map */ "],
            host: {
                'role': 'tooltip',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, ChangeDetectorRef])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());
export var MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, Md2TooltipComponent];
export var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: []
        };
    };
    Md2TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_TOOLTIP_DIRECTIVES,
            declarations: MD2_TOOLTIP_DIRECTIVES,
            entryComponents: [Md2TooltipComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
}());

//# sourceMappingURL=tooltip.js.map
