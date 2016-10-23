var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export var Md2Accordion = (function () {
    function Md2Accordion() {
        this.class = '';
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.tabs = [];
    }
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    Md2Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Accordion.prototype, "multiple", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Accordion.prototype, "class", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Accordion.prototype, "close", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Accordion.prototype, "open", void 0);
    Md2Accordion = __decorate([
        Component({selector: 'md2-accordion',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.md2-accordion]': 'true'
            },
            styles: ["\n    .md2-accordion { display: block; }\n  "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Accordion);
    return Md2Accordion;
}());

//# sourceMappingURL=accordionpanel.js.map
