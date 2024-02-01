import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Word } from '../word.model';

@Component({
  selector: 'app-word-definition',
  templateUrl: './word-definition.component.html',
  styleUrls: ['./word-definition.component.scss']
})
export class WordDefinitionComponent {

  @Input() word:Word ={
    name: "",
    definition: ""
  }
  @Output() definitionEvent = new EventEmitter<string>()
  @Input() message:string = ""
  @ViewChild('playerDefinition')
  playerDefinition!:ElementRef
  
  
  definition(){
    this.definitionEvent.emit(this.playerDefinition.nativeElement.value)
  }

  clear(){
    this.playerDefinition.nativeElement.value = ""
  }

  
}
