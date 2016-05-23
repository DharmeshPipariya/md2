# md2-accordion

Native Angular2 Material Accordion component

## API

Example:
 
HTML sample code
 ```html
<md2-accordion [multiple]="multiple">
  <md2-accordion-tab *ngFor="let tab of accordions" 
                     [header]="tab.title" 
                     [active]="tab.active" 
                     [disabled]="tab.disabled">
    {{tab.content}}
  </md2-accordion-tab>
</md2-accordion>
 ```

TS sample code
 ```ts

...

import {ACCORDION_DIRECTIVES} from '../../../components/accordion/accordion';

@Component({
    selector: "...",
    directives: [ACCORDION_DIRECTIVES]
})

export class ... {
    
    ...
   
    public accordions: Array<any> = [
      { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
      { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
      { title: 'Dynamic Title 3', content: 'Dynamic content 3', active: true }
    ];
    multiple: boolean = false;

    ...

}
 ```

### Properties

  - `multiple` - (`?boolean=false`) - Control whether expanding an item will cause the other items to close.
  - `md-class` - (`?string=null`) - Add ability to set classes your own. This must be a string.
  - `header` - (`?string=null`) - The clickable text on the tab's header. You need one to be able to click on the header for toggling.
  - `disabled` (`?boolean=false`) - Whether the accordion tab is disabled or not.
  - `active` (`?boolean=false`) - Whether accordion tab is open or closed.

### Events

  - `open` - It fires after a open tab.
  - `close` - It fires after a close tab.

