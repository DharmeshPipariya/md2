import {Component} from '@angular/core';
import {ACCORDION_DIRECTIVES} from '../../../components/accordion/accordion';

@Component({
  selector: 'accordion',
  templateUrl: './app/components/accordion/accordion.html',
  directives: [ACCORDION_DIRECTIVES]
})
export class Accordion {
  private accordions: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', active: true }
  ];

  multiple: boolean = false;
}