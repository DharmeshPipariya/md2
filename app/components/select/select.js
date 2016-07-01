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
const select_1 = require('../../../components/select/select');
let Select = class Select {
    constructor() {
        this.disabled = false;
        this.items = [
            { name: 'Amsterdam', value: '1', disabled: true },
            { name: 'Birmingham', value: '2', disabled: false },
            { name: 'Dortmund', value: '3', disabled: false },
            { name: 'Gothenburg', value: '4', disabled: true },
            { name: 'London', value: '5', disabled: false },
            { name: 'Seville', value: '6', disabled: true }
        ];
        this.item = '3';
    }
    change(value) {
        console.log('Changed data: ', value);
    }
};
Select = __decorate([
    core_1.Component({
        selector: 'selectcomp',
        templateUrl: './app/components/select/select.html',
        directives: [select_1.SELECT_DIRECTIVES],
        providers: [select_1.Md2SelectDispatcher]
    }), 
    __metadata('design:paramtypes', [])
], Select);
exports.Select = Select;

//# sourceMappingURL=select.js.map
