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
const common_1 = require('@angular/common');
const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Select),
    multi: true
});
var _uniqueIdCounter = 0;
let Md2SelectDispatcher = class Md2SelectDispatcher {
    constructor() {
        this._listeners = [];
    }
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    listen(listener) {
        this._listeners.push(listener);
    }
};
Md2SelectDispatcher = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Md2SelectDispatcher);
exports.Md2SelectDispatcher = Md2SelectDispatcher;
class Md2OptionChange {
}
exports.Md2OptionChange = Md2OptionChange;
let Md2Select = class Md2Select {
    constructor(element) {
        this.element = element;
        this._value = null;
        this._name = 'md2-select-' + _uniqueIdCounter++;
        this._disabled = false;
        this._selected = null;
        this._isInitialized = false;
        this.isOpenable = true;
        this.isMenuVisible = false;
        this.selectedValue = '';
        this.focusIndex = 0;
        this._controlValueAccessorChangeFn = (value) => { };
        this.onTouched = () => { };
        this.change = new core_1.EventEmitter();
        this._options = null;
        this.tabindex = 0;
        this.placeholder = '';
    }
    get name() { return this._name; }
    set name(value) {
        this._name = value;
        this._updateOptions();
    }
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = (value !== null && value !== false) ? true : null;
    }
    get value() { return this._value; }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedOptionValue();
            if (this._isInitialized) {
                this._emitChangeEvent();
            }
        }
    }
    get selected() { return this._selected; }
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        if (selected) {
            if (!selected.selected) {
                selected.selected = true;
            }
            this.selectedValue = selected.content;
        }
    }
    ngAfterContentInit() {
        this._isInitialized = true;
    }
    ngAfterContentChecked() {
        let opt = this._options.filter(o => this.equals(o.value, this.value))[0];
        if (opt) {
            this.selectedValue = opt.content;
        }
    }
    /**
     * Compare two vars or objects
     * @param o1
     * @param o2
     */
    equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true;
        let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key]))
                    return false;
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key])
                    return false;
            }
            return true;
        }
        return false;
    }
    /**
     * To update scroll to position of focused option
     */
    updateScroll() {
        if (this.focusIndex < 0)
            return;
        let menuContainer = this.element.nativeElement.querySelector('.md2-select-menu');
        if (!menuContainer)
            return;
        let choices = menuContainer.querySelectorAll('md2-option');
        if (choices.length < 1)
            return;
        let highlighted = choices[this.focusIndex];
        if (!highlighted)
            return;
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * get index of focused option
     */
    getFocusIndex() { return this._options.toArray().findIndex(o => o.focused); }
    /**
     * update focused option
     * @param inc
     */
    updateFocus(inc) {
        let options = this._options.toArray();
        let index = this.focusIndex;
        options.forEach(o => { if (o.focused) {
            o.focused = false;
        } });
        let option;
        do {
            index += inc;
            if (index < 0) {
                index = options.length - 1;
            }
            else if (index > options.length - 1) {
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
    }
    onClick(e) {
        if (this.disabled) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.isOpenable) {
            if (!this.isMenuVisible) {
                this._options.forEach(o => {
                    o.focused = false;
                    if (o.selected) {
                        o.focused = true;
                    }
                });
                this.focusIndex = this.getFocusIndex();
                this.isMenuVisible = true;
                setTimeout(() => {
                    this.updateScroll();
                }, 0);
            }
        }
        this.isOpenable = true;
    }
    onKeyDown(e) {
        if (this.disabled) {
            return;
        }
        // Tab Key
        if (e.keyCode === 9) {
            if (this.isMenuVisible) {
                this.onBlur();
                e.preventDefault();
            }
            return;
        }
        // Escape Key
        if (e.keyCode === 27) {
            this.onBlur();
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Up Arrow
        if (e.keyCode === 38) {
            if (this.isMenuVisible) {
                this.updateFocus(-1);
            }
            else {
                this.onClick(e);
            }
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Down Arrow
        if (e.keyCode === 40) {
            if (this.isMenuVisible) {
                this.updateFocus(1);
            }
            else {
                this.onClick(e);
            }
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Enter / Space
        if (e.keyCode === 13 || e.keyCode === 32) {
            if (this.isMenuVisible) {
                this._options.toArray()[this.focusIndex].onClick(e);
            }
            else {
                this.onClick(e);
            }
            e.preventDefault();
            return;
        }
    }
    onBlur() {
        this.isMenuVisible = false;
        this.isOpenable = false;
        setTimeout(() => {
            this.isOpenable = true;
        }, 200);
    }
    touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    _updateOptions() {
        (this._options || []).forEach(option => {
            option.name = this.name;
        });
    }
    _updateSelectedOptionValue() {
        let isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._options !== null && !isAlreadySelected) {
            let matchingOption = this._options.filter(option => option.value === this._value)[0];
            if (matchingOption) {
                this.selected = matchingOption;
            }
            else if (this.value === null) {
                this.selected = null;
                this._options.forEach(option => { option.selected = false; });
            }
        }
    }
    _emitChangeEvent() {
        let event = new Md2OptionChange();
        event.source = this._selected;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    }
    writeValue(value) { this.value = value; }
    registerOnChange(fn) { this._controlValueAccessorChangeFn = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Select.prototype, "change", void 0);
__decorate([
    core_1.ContentChildren(core_1.forwardRef(() => Md2Option)), 
    __metadata('design:type', core_1.QueryList)
], Md2Select.prototype, "_options", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Select.prototype, "name", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Md2Select.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Select.prototype, "placeholder", void 0);
__decorate([
    core_1.HostBinding('class.md2-select-disabled'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Select.prototype, "disabled", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Select.prototype, "value", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Select.prototype, "selected", null);
__decorate([
    core_1.HostListener('click', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], Md2Select.prototype, "onClick", null);
__decorate([
    core_1.HostListener('keydown', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], Md2Select.prototype, "onKeyDown", null);
__decorate([
    core_1.HostListener('blur'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Md2Select.prototype, "onBlur", null);
Md2Select = __decorate([
    core_1.Component({
        selector: 'md2-select',
        template: `
    <div class="md2-select-container">
      <span *ngIf="selectedValue.length < 1" class="md2-select-placeholder">{{placeholder}}</span>
      <span *ngIf="selectedValue.length > 0" class="md2-select-value" [innerHtml]="selectedValue"></span>
      <em class="md2-select-icon"></em>
    </div>
    <div class="md2-select-menu" [class.open]="isMenuVisible">
      <ng-content></ng-content>    
    </div>
  `,
        styles: [`
    md2-select { position: relative; display: block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    md2-select:focus { outline: none; }
    md2-select .md2-select-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    md2-select .md2-select-container .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
    md2-select .md2-select-container .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container .md2-select-value { white-space: nowrap; }
    md2-select .md2-select-menu { position: absolute; left: 0; top: 100%; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    md2-select .md2-select-menu.open { display: block; }
  `],
        host: {
            'role': 'select',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled'
        },
        providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Select);
exports.Md2Select = Md2Select;
let Md2Option = class Md2Option {
    constructor(select, selectDispatcher, element) {
        this.selectDispatcher = selectDispatcher;
        this.element = element;
        this.focused = false;
        this._selected = false;
        this.id = `md2-option-${_uniqueIdCounter++}`;
        this._value = null;
        this.content = null;
        this.select = select;
        selectDispatcher.listen((id, name) => {
            if (id !== this.id && name === this.name) {
                this.selected = false;
            }
        });
    }
    get selected() { return this._selected; }
    set selected(selected) {
        if (selected) {
            this.selectDispatcher.notify(this.id, this.name);
        }
        this._selected = selected;
        if (selected && this.select.value !== this.value) {
            this.select.selected = this;
        }
    }
    get value() { return this._value; }
    set value(value) {
        if (this._value !== value) {
            if (this.selected) {
                this.select.value = value;
            }
            this._value = value;
        }
    }
    get disabled() {
        return this._disabled || (this.select.disabled);
    }
    set disabled(disabled) {
        this._disabled = disabled;
    }
    ngOnInit() {
        this.selected = this.select.value === this._value;
        this.name = this.select.name;
    }
    ngAfterViewInit() {
        this.content = this.element.nativeElement.innerHTML;
    }
    /**
     * on click to select option
     * @param event
     */
    onClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.select.selected = this;
        this.select.touch();
        this.select.onBlur();
    }
};
__decorate([
    core_1.HostBinding('class.md2-option-focused'), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "focused", void 0);
__decorate([
    core_1.HostBinding('id'),
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Option.prototype, "id", void 0);
__decorate([
    core_1.HostBinding('class.md2-option-selected'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "selected", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Option.prototype, "value", null);
__decorate([
    core_1.HostBinding('class.md2-option-disabled'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "disabled", null);
Md2Option = __decorate([
    core_1.Component({
        selector: 'md2-option',
        template: '<div class="md2-option-text"><ng-content></ng-content></div>',
        styles: [`
    md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    md2-option.md2-option-selected { color: #106cc8; }
    md2-option:hover, md2-option.md2-option-focused { background: #eeeeee; }
    md2-option.md2-option-disabled, md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
    md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
  `],
        host: {
            'role': 'option',
            '(click)': 'onClick($event)'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [Md2Select, Md2SelectDispatcher, core_1.ElementRef])
], Md2Option);
exports.Md2Option = Md2Option;
exports.SELECT_DIRECTIVES = [Md2Select, Md2Option];

//# sourceMappingURL=select.js.map
