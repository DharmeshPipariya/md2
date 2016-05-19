"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const menu_1 = require('../../../components/menu/menu');
let Menu = class Menu {
    constructor() {
        this.menuLabel = "<b>test</b> Menu Label";
    }
};
Menu = __decorate([
    core_1.Component({
        selector: 'menu',
        templateUrl: './app/components/menu/menu.html',
        directives: [menu_1.Md2Menu]
    }), 
    __metadata('design:paramtypes', [])
], Menu);
exports.Menu = Menu;

//# sourceMappingURL=menu.js.map
