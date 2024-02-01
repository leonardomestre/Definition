import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../word.model';

@Component({
  selector: 'app-word-options',
  templateUrl: './word-options.component.html',
  styleUrls: ['./word-options.component.scss']
})
export class WordOptionsComponent {
  @Input() words:Word[] = []
  @Output() selectedWordEvent = new EventEmitter<Word>()

  constructor(){

  }

  selectword(name:string, definition:string){
    const wordEmit:Word = {
      name: name,
      definition: definition
    }
    this.selectedWordEvent.emit(wordEmit)
  }

}
