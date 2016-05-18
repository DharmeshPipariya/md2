# md2-multiselect

Native Angular2 Material Multiselect component

## API

Example:
 
 ```html
<md2-multiselect [items]="items"
            [item-text]="'name'"
            [(ngModel)]="item"
            (change)="selected($event)"
            placeholder="Placeholder Text">
</md2-multiselect>
 ```
 ```ts

...

import {Md2Multiselect} from 'md2/multiselect';

@Component({
    selector: "...",
    directives: [Md2Multiselect]
})

export class ... {
    
    ...
    
    private items: Array<any> =
        [
            { name: 'Amsterdam', value: '1' },
            { name: 'Birmingham', value: '2' },
            { name: 'Dortmund', value: '3' },
            { name: 'Gothenburg', value: '4' },
            { name: 'London', value: '5' },
            { name: 'Seville', value: '6' }
        ];

    private item: Array<any> = [{ name: 'Dortmund', value: '3' }];

    private selected(value: any) {
        console.log('Selected value is: ', value);
    }

    ...

}
 ```

### Properties

  - `items` - (`Array<any>`) - Array of items from which to select. Should be an array of objects with `value` and `text` properties.
  As convenience, you may also pass an array of strings, in which case the same string is used for both the VALUE and the text.
  Items may be nested by adding a `children` property to any item, whose value should be another array of items. Items that have children may omit having an ID.
  If `items` are specified, all items are expected to be available locally and all selection operations operate on this local array only.
  If omitted, items are not available locally, and the `query` option should be provided to fetch data.
  - `ngModel` (`?Array<any>`) - two way data binding. This should be an attay with single string or object of `value` and `text` properties in the case of input type 'Single',
  or an array of such objects otherwise. This option is mutually exclusive with value.
  - `placeholder` (`?string=''`) - Placeholder text to display when the element has no focus and selected items.
  - `disabled` (`?boolean=false`) - When `true`, it specifies that the component should be disabled.
  - `item-text` (`?string='text'`) - When items array is different with object properties then map 'text' property with the array.

### Events

  - `change` - it fires after a new option selected; returns object with `value` and `text` properties that describes a new option.


### Referenced From
ng2-select (see the repository [https://github.com/valor-software/ng2-select](https://github.com/valor-software/ng2-select) for the angular2 based select component)
