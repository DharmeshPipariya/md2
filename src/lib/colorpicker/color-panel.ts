import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ColorLocale } from './color-locale';
import { ColorUtil, Hsva, Rgba } from './color-util';


@Component({
  moduleId: module.id,
  selector: 'md2-colorpicker-content',
  templateUrl: 'colorpicker-content.html',
  styleUrls: ['colorpicker-content.css'],
  host: {
    'class': 'md2-colorpicker-content'
  },
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2ColorpickerContent implements AfterContentInit {

  /** The selected color. */
  @Input()
  get color(): string { return this._color; }
  set color(value: string) {
    //this._color = this._util.parse(value);
    this._color = value;
  }
  private _color: string;

  /** Emits when the currently color changes. */
  @Output() colorChange = new EventEmitter<string>();

  get selected(): string { return this._selected; }
  set selected(value: string) {
    this._selected = this._util.parse(value);
    this.hsva = this._util.stringToHsva(this._selected);
    this.update();
  }
  private _selected: string;

  get saturation(): any {
    return {
      'left': `${this.hsva.s * 100}%`,
      'top': `${100 - this.hsva.v * 100}%`
    };
  }

  get hue(): { [key: string]: string } {
    return {
      'left': `${this.hsva.h * 100}%`
    };
  }

  get alpha(): { [key: string]: string } {
    return {
      'background': `linear-gradient(to right, transparent, ${this._alpha})`
    };
  }

  get alphaPointer(): { [key: string]: string } {
    return {
      'left': `${this.hsva.a * 100}%`
    };
  }

  private hsva: Hsva;
  _hue: string;
  _alpha: string;
  _isColorDarker: boolean = false;
  _formats: Array<string> = ['hex', 'rgb', 'hsl'];

  constructor(private _element: ElementRef, private _locale: ColorLocale,
    private _util: ColorUtil) { }

  ngAfterContentInit() {
    this.selected = this._selected || this._locale.defaultColor;

    this._init();
  }

  /** Handles color selection. */
  _colorSelected(value: string): void {
  }

  _setSaturation(event: any) {
    this.hsva.s = event.x / event.width;
    this.hsva.v = 1 - event.y / event.height;
    this.update();
  }

  _setHue(event: any) {
    this.hsva.h = event.x / event.width;
    this.update();
  }

  _setAlpha(event: any) {
    this.hsva.a = event.x / event.width;
    this.update();
  }

  _setFormat(format: string) {
    this._locale.formatColor = format;
    let hsva = this._util.stringToHsva(this._selected);
    if (this._locale.formatColor === 'hex' && hsva.a < 1) {
      this._locale.formatColor = 'rgb';
    }
    this._selected = this._util.outputFormat(hsva, this._locale.formatColor);
  }

  private update() {
    let rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
    let hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

    this._alpha = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this._hue = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
    this._selected = this._util.outputFormat(this.hsva, this._locale.formatColor);

    let rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    if (Math.round((rgbaText.r * 299 + rgbaText.g * 587 + rgbaText.b * 114) / 1000) >= 128
      || this.hsva.a < 0.35) {
      this._isColorDarker = true;
    } else {
      this._isColorDarker = false;
    }
  }

  /** Initializes this clock view. */
  private _init() {
  }

  /**
   * Set Hue
   */
  private setHue() {
  }

  //private hsva: Hsva;
  //private rgbaText: Rgba;
  //private hslaText: Hsla;
  //private hexText: string;
  //private outputColor: string;
  //private selectedColor: string;
  //private alphaSliderColor: string;
  //private hueSliderColor: string;
  //private slider: SliderPosition;
  //private sliderDimMax: SliderDimension;
  //private format: number;
  //private show: boolean;
  //private top: number;
  //private left: number;
  //private position: string;
  //private directiveInstance: any;
  //private initialColor: string;
  //private directiveElementRef: ElementRef;

  //private listenerMouseDown: any;
  //private listenerResize: any;

  //private cpPosition: string;
  //private cpPositionOffset: number;
  //private cpOutputFormat: string;
  //private cpPresetLabel: string;
  //private cpPresetColors: Array<string>;
  //private cpCancelButton: boolean;
  //private cpCancelButtonClass: string;
  //private cpCancelButtonText: string;
  //private cpOKButton: boolean;
  //private cpOKButtonClass: string;
  //private cpOKButtonText: string;
  //private cpHeight: number;
  //private cpWidth: number;
  //private cpIgnoredElements: any;
  //private cpDialogDisplay: string;
  //private cpSaveClickOutside: boolean;
  //private cpAlphaChannel: string;

  //private dialogArrowSize: number = 10;
  //private dialogArrowOffset: number = 15;
  //private arrowTop: number;

  //@ViewChild('hueSlider') hueSlider: any;
  //@ViewChild('alphaSlider') alphaSlider: any;

  //@ViewChild('dialogPopup') dialogElement: any;

  //constructor(private el: ElementRef, private service: ColorPickerService) { }

  //setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string,
  //  cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpPresetLabel: string, cpPresetColors: Array<string>,
  //  cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string,
  //  cpOKButton: boolean, cpOKButtonClass: string, cpOKButtonText: string,
  //  cpHeight: string, cpWidth: string,
  //  cpIgnoredElements: any, cpDialogDisplay: string, cpSaveClickOutside: boolean, cpAlphaChannel: string) {
  //  this.directiveInstance = instance;
  //  this.initialColor = color;
  //  this.directiveElementRef = elementRef;
  //  this.cpPosition = cpPosition;
  //  this.cpPositionOffset = parseInt(cpPositionOffset);
  //  if (!cpPositionRelativeToArrow) {
  //    this.dialogArrowOffset = 0;
  //  }
  //  this.cpOutputFormat = cpOutputFormat;
  //  this.cpPresetLabel = cpPresetLabel;
  //  this.cpPresetColors = cpPresetColors;
  //  this.cpCancelButton = cpCancelButton;
  //  this.cpCancelButtonClass = cpCancelButtonClass;
  //  this.cpCancelButtonText = cpCancelButtonText;
  //  this.cpOKButton = cpOKButton;
  //  this.cpOKButtonClass = cpOKButtonClass;
  //  this.cpOKButtonText = cpOKButtonText;
  //  this.cpHeight = parseInt(cpHeight);
  //  this.cpWidth = parseInt(cpWidth);
  //  this.cpIgnoredElements = cpIgnoredElements;
  //  this.cpDialogDisplay = cpDialogDisplay;
  //  if (this.cpDialogDisplay === 'inline') {
  //    this.dialogArrowOffset = 0;
  //    this.dialogArrowSize = 0;
  //  }
  //  this.cpSaveClickOutside = cpSaveClickOutside;
  //  this.cpAlphaChannel = cpAlphaChannel;
  //}

  //ngOnInit() {
  //  let alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
  //  let hueWidth = this.hueSlider.nativeElement.offsetWidth;
  //  this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
  //  this.slider = new SliderPosition(0, 0, 0, 0);
  //  if (this.cpOutputFormat === 'rgba') {
  //    this.format = 1;
  //  } else if (this.cpOutputFormat === 'hsla') {
  //    this.format = 2;
  //  } else {
  //    this.format = 0;
  //  }
  //  this.listenerMouseDown = (event: any) => { this.onMouseDown(event) };
  //  this.listenerResize = () => { this.onResize() };
  //  this.openDialog(this.initialColor, false);
  //}

  //setInitialColor(color: any) {
  //  this.initialColor = color;
  //}

  //openDialog(color: any, emit: boolean = true) {
  //  this.setInitialColor(color);
  //  this.setColorFromString(color, emit);
  //  this.openColorPicker();
  //}

  //cancelColor() {
  //  this.setColorFromString(this.initialColor, true);
  //  if (this.cpDialogDisplay === 'popup') {
  //    this.directiveInstance.colorChanged(this.initialColor, true);
  //    this.closeColorPicker();
  //  }
  //}

  //oKColor() {
  //  if (this.cpDialogDisplay === 'popup') {
  //    this.closeColorPicker();
  //  }
  //}

  //setColorFromString(value: string, emit: boolean = true) {
  //  let hsva: Hsva;
  //  if (this.cpAlphaChannel === 'hex8') {
  //    hsva = this.service.stringToHsva(value, true);
  //    if (!hsva && !this.hsva) {
  //      hsva = this.service.stringToHsva(value, false);
  //    }
  //  } else {
  //    hsva = this.service.stringToHsva(value, false);
  //  }
  //  if (hsva) {
  //    this.hsva = hsva;
  //    this.update(emit);
  //  }
  //}

  //onMouseDown(event: any) {
  //  if ((!this.isDescendant(this.el.nativeElement, event.target)
  //    && event.target != this.directiveElementRef.nativeElement &&
  //    this.cpIgnoredElements.filter((item: any) => item === event.target).length === 0) && this.cpDialogDisplay === 'popup') {
  //    if (!this.cpSaveClickOutside) {
  //      this.setColorFromString(this.initialColor, false);
  //      this.directiveInstance.colorChanged(this.initialColor)
  //    }
  //    this.closeColorPicker();
  //  }
  //}

  //openColorPicker() {
  //  if (!this.show) {
  //    this.setDialogPosition();
  //    this.show = true;
  //    this.directiveInstance.toggle(true);
  //    document.addEventListener('mousedown', this.listenerMouseDown);
  //    window.addEventListener('resize', this.listenerResize);
  //  }
  //}

  //closeColorPicker() {
  //  if (this.show) {
  //    this.show = false;
  //    this.directiveInstance.toggle(false);
  //    document.removeEventListener('mousedown', this.listenerMouseDown);
  //    window.removeEventListener('resize', this.listenerResize);
  //  }
  //}

  //onResize() {
  //  if (this.position === 'fixed') {
  //    this.setDialogPosition();
  //  }
  //}

  //setDialogPosition() {
  //  let dialogHeight = this.dialogElement.nativeElement.offsetHeight;
  //  let node = this.directiveElementRef.nativeElement, position = 'static';
  //  let parentNode: any = null;
  //  while (node !== null && node.tagName !== 'HTML') {
  //    position = window.getComputedStyle(node).getPropertyValue("position");
  //    if (position !== 'static' && parentNode === null) {
  //      parentNode = node;
  //    }
  //    if (position === 'fixed') {
  //      break;
  //    }
  //    node = node.parentNode;
  //  }
  //  if (position !== 'fixed') {
  //    var boxDirective = this.createBox(this.directiveElementRef.nativeElement, true);
  //    if (parentNode === null) { parentNode = node }
  //    var boxParent = this.createBox(parentNode, true);
  //    this.top = boxDirective.top - boxParent.top;
  //    this.left = boxDirective.left - boxParent.left;
  //  } else {
  //    var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
  //    this.top = boxDirective.top;
  //    this.left = boxDirective.left;
  //    this.position = 'fixed';
  //  }
  //  if (this.cpPosition === 'left') {
  //    this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
  //    this.left -= this.cpWidth + this.dialogArrowSize - 2;
  //  } else if (this.cpPosition === 'top') {
  //    this.top -= dialogHeight + this.dialogArrowSize;
  //    this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
  //    this.arrowTop = dialogHeight - 1;
  //  } else if (this.cpPosition === 'bottom') {
  //    this.top += boxDirective.height + this.dialogArrowSize;
  //    this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
  //  } else {
  //    this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
  //    this.left += boxDirective.width + this.dialogArrowSize;
  //  }
  //}

  //setSaturation(val: { v: number, rg: number }) {
  //  let hsla = this.service.hsva2hsla(this.hsva);
  //  hsla.s = val.v / val.rg;
  //  this.hsva = this.service.hsla2hsva(hsla);
  //  this.update();
  //}

  //setLightness(val: { v: number, rg: number }) {
  //  let hsla = this.service.hsva2hsla(this.hsva);
  //  hsla.l = val.v / val.rg;
  //  this.hsva = this.service.hsla2hsva(hsla);
  //  this.update();
  //}

  //setHue(val: { v: number, rg: number }) {
  //  this.hsva.h = val.v / val.rg;
  //  this.update();
  //}

  //setAlpha(val: { v: number, rg: number }) {
  //  this.hsva.a = val.v / val.rg;
  //  this.update();
  //}

  //setR(val: { v: number, rg: number }) {
  //  let rgba = this.service.hsvaToRgba(this.hsva);
  //  rgba.r = val.v / val.rg;
  //  this.hsva = this.service.rgbaToHsva(rgba);
  //  this.update();
  //}
  //setG(val: { v: number, rg: number }) {
  //  let rgba = this.service.hsvaToRgba(this.hsva);
  //  rgba.g = val.v / val.rg;
  //  this.hsva = this.service.rgbaToHsva(rgba);
  //  this.update();
  //}
  //setB(val: { v: number, rg: number }) {
  //  let rgba = this.service.hsvaToRgba(this.hsva);
  //  rgba.b = val.v / val.rg;
  //  this.hsva = this.service.rgbaToHsva(rgba);
  //  this.update();
  //}

  //setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number }) {
  //  this.hsva.s = val.s / val.rgX;
  //  this.hsva.v = val.v / val.rgY;
  //  this.update();
  //}

  //formatPolicy(): number {
  //  this.format = (this.format + 1) % 3;
  //  if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
  //    this.format++;
  //  }
  //  return this.format;
  //}

  //update(emit: boolean = true) {
  //  let hsla = this.service.hsva2hsla(this.hsva);
  //  let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
  //  let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

  //  this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
  //  this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
  //  this.hexText = this.service.hexText(rgba, this.cpAlphaChannel === 'hex8');

  //  this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
  //  this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

  //  if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
  //    this.format++;
  //  }

  //  let lastOutput = this.outputColor;
  //  this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8');
  //  this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);

  //  this.slider = new SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8,
  //    (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8)

  //  if (emit && lastOutput !== this.outputColor) {
  //    this.directiveInstance.colorChanged(this.outputColor);
  //  }
  //}

  //isDescendant(parent: any, child: any): boolean {
  //  let node: any = child.parentNode;
  //  while (node !== null) {
  //    if (node === parent) {
  //      return true;
  //    }
  //    node = node.parentNode;
  //  }
  //  return false;
  //}

  //createBox(element: any, offset: boolean): any {
  //  return {
  //    top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
  //    left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
  //    width: element.offsetWidth,
  //    height: element.offsetHeight
  //  };
  //}
}
