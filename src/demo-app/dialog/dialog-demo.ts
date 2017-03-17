import { Component } from '@angular/core';
import { Md2Dialog } from 'md2';

@Component({
  moduleId: module.id,
  selector: 'dialog-demo',
  templateUrl: 'dialog-demo.html'
})
export class DialogDemo {
  dialogHeader: string = 'Lorum Ipsum';

  open(dialog: Md2Dialog) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }
}
