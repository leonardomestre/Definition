import { WordService } from './../word.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Word } from '../word.model';

@Component({
  selector: 'app-read-word',
  templateUrl: './read-word.component.html',
  styleUrls: ['./read-word.component.scss']
})
export class ReadWordComponent implements OnInit{
  
  wordRead!: Word[]
  wordSelected!: Word
  selectedIds: string[] = []

  
  @ViewChildren('checkAll')
  elements!: QueryList<ElementRef>

  constructor(private wordService: WordService){}
  
  ngOnInit(): void {
    this.wordService.read().subscribe(words => this.wordRead = words)
  }
  activeAllCheckBox(): void{
    this.elements.forEach(element =>{
      element.nativeElement.checked = this.elements.first.nativeElement.checked
    })
  }

  addId(id:string){
    let had:boolean = false
    this.selectedIds.forEach((idArray, index) =>{
      console.log(idArray, id, index)
      if(id == idArray){
        had = true
        this.selectedIds.splice(index,1)
      }
    })
    if(had == false){
      this.selectedIds.push(id)
    }
    console.log(this.selectedIds)
  }
  had = false;
  

}
