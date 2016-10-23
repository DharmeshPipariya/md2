import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { HighlightPipe } from '../core/core';
export declare const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Autocomplete implements AfterContentInit, ControlValueAccessor {
    private element;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    change: EventEmitter<any>;
    private _value;
    private _readonly;
    private _required;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _items;
    private list;
    private focusedOption;
    private inputBuffer;
    private selectedItem;
    private inputFocused;
    private noBlur;
    id: string;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    minLength: number;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
    items: Array<any>;
    value: any;
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    private equals(o1, o2);
    readonly isMenuVisible: boolean;
    /**
     * update scroll of suggestion menu
     */
    private updateScroll();
    /**
     * input event listner
     * @param event
     */
    private inputKeydown(event);
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    private select(event, index);
    /**
     * clear selected suggestion
     */
    private onClear();
    /**
     * update value
     */
    private updateValue();
    /**
     * component focus listener
     */
    private onFocus();
    /**
     * input focus listener
     */
    private onInputFocus();
    /**
     * input blur listener
     */
    private onInputBlur();
    /**
     * suggestion menu mouse enter listener
     */
    private listEnter();
    /**
     * suggestion menu mouse leave listener
     */
    private listLeave();
    /**
     * Update suggestion to filter the query
     * @param query
     */
    private updateItems(query);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_AUTOCOMPLETE_DIRECTIVES: (typeof HighlightPipe | typeof Md2Autocomplete)[];
export declare class Md2AutocompleteModule {
    static forRoot(): ModuleWithProviders;
}
