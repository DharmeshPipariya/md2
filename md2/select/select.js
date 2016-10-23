var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewEncapsulation, forwardRef, ElementRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty, KeyCodes } from '../core/core';
var _uniqueIdCounter = 0;
export var MD2_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Select; }),
    multi: true
};
export var Md2SelectDispatcher = (function () {
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
    Md2SelectDispatcher = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], Md2SelectDispatcher);
    return Md2SelectDispatcher;
}());
export var Md2SelectChange = (function () {
    function Md2SelectChange() {
    }
    return Md2SelectChange;
}());
export var Md2Select = (function () {
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
        this.change = new EventEmitter();
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
                case KeyCodes.TAB:
                case KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
                case KeyCodes.ENTER:
                case KeyCodes.SPACE:
                    this._options.toArray()[this.focusIndex].onOptionClick(event);
                    break;
                case KeyCodes.DOWN_ARROW:
                    this.updateFocus(1);
                    break;
                case KeyCodes.UP_ARROW:
                    this.updateFocus(-1);
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case KeyCodes.ENTER:
                case KeyCodes.SPACE:
                case KeyCodes.DOWN_ARROW:
                case KeyCodes.UP_ARROW:
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
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return Md2Option; })), 
        __metadata('design:type', QueryList)
    ], Md2Select.prototype, "_options", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Select.prototype, "name", null);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Select.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Select.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Select.prototype, "readonly", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Select.prototype, "required", null);
    __decorate([
        HostBinding('class.md2-select-disabled'),
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Select.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "value", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "selected", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onClick", null);
    __decorate([
        HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onKeyDown", null);
    __decorate([
        HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onBlur", null);
    Md2Select = __decorate([
        Component({selector: 'md2-select',
            template: "\n    <div class=\"md2-select-container\">\n      <span class=\"md2-select-placeholder\" [class.has-value]=\"selectedValue\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <span *ngIf=\"selectedValue\" class=\"md2-select-value\" [innerHtml]=\"selectedValue\"></span>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <div class=\"md2-select-menu\" [class.open]=\"isMenuVisible\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    md2-select { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-select:focus { outline: none; }\n    md2-select.md2-select-disabled { pointer-events: none; cursor: default; }\n    md2-select .md2-select-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 26px 1px 2px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }\n    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }\n    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    md2-select .md2-select-container .md2-select-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    md2-select:focus .md2-select-placeholder { color: #2196f3; }\n    md2-select:focus .md2-select-placeholder .md2-placeholder-required { color: #f00; }\n    md2-select:focus .md2-select-placeholder,\n    md2-select .md2-select-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-select.md2-select-disabled:focus .md2-select-placeholder,\n    md2-select.md2-select-disabled:focus .md2-select-placeholder .md2-placeholder-required { color: rgba(0,0,0,0.38); }\n    md2-select .md2-select-container .md2-select-value { display: block; font-size: 15px; line-height: 26px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    md2-select .md2-select-container svg { position: absolute; right: 0; top: 2px; display: block; fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-select .md2-select-menu.open { display: block; }\n  "],
            providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Select);
    return Md2Select;
}());
export var Md2Option = (function () {
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
    __decorate([
        HostBinding('class.md2-option-focused'), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "focused", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "label", void 0);
    __decorate([
        HostBinding(),
        Input(), 
        __metadata('design:type', String)
    ], Md2Option.prototype, "id", void 0);
    __decorate([
        HostBinding('class.md2-option-selected'),
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Option.prototype, "value", null);
    __decorate([
        HostBinding('class.md2-option-disabled'),
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "disabled", null);
    Md2Option = __decorate([
        Component({selector: 'md2-option',
            template: '<ng-content></ng-content>',
            styles: ["\n    md2-option { position: relative; display: block; width: 100%; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; cursor: pointer; box-sizing: border-box; transition: background 400ms linear; }\n    md2-option.md2-option-selected { color: #106cc8; }\n    md2-option:hover,\n    md2-option.md2-option-focused { background: #eeeeee; }\n    md2-option.md2-option-disabled,\n    md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }\n    /*md2-select[multiple] md2-option { padding-left: 40px; }\n    md2-select[multiple] md2-option:after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }\n    md2-select[multiple] md2-option.md2-option-selected:after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; border-color: #106cc8; }\n    md2-select[multiple] md2-option.md2-option-disabled:after { border-color: rgba(187,187,187,0.54); }*/\n  "],
            host: {
                'role': 'option',
                '(click)': 'onOptionClick($event)'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [Md2Select, Md2SelectDispatcher, ElementRef])
    ], Md2Option);
    return Md2Option;
}());
export var MD2_SELECT_DIRECTIVES = [Md2Select, Md2Option];
export var Md2SelectModule = (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule,
            providers: [Md2SelectDispatcher]
        };
    };
    Md2SelectModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule],
            exports: MD2_SELECT_DIRECTIVES,
            declarations: MD2_SELECT_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2SelectModule);
    return Md2SelectModule;
}());

//# sourceMappingURL=select.js.map
