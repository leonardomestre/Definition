import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-definitions-options',
  templateUrl: './definitions-options.component.html',
  styleUrls: ['./definitions-options.component.scss']
})
export class DefinitionsOptionsComponent {
  @Input() definitions:string[] = []
  @Input() type:string = "radio"
  @Input() message:string = ""
  @Output() definitionEventEmit = new EventEmitter<string>()

  selectedDefinition(definition:string){
    this.definitionEventEmit.emit(definition)
  }
}
