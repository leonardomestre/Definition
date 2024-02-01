import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() messager:string =""
  @Input() cancelButton:string = ""
  @Input() continueButton?:string = ""
  @Input() visible:boolean = false

  @Output() onCancel = new EventEmitter()
  @Output() onContinue = new EventEmitter()

  cancel(){
    this.onCancel.emit()
  }

  continue(){
    this.onContinue.emit()
  }

}
