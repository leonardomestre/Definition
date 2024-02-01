import { Router } from '@angular/router';
import { WordService } from './../word.service';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() wordIds!:string[]
  popupDelete: boolean = false

  constructor(private wordService:WordService, private router:Router){
    
  }
  
  openDeletePopup(){
    this.popupDelete = true
  }

  deleteAll(){
    this.wordIds.forEach(id =>{
      this.wordService.delete(id).subscribe()
    })
    this.popupDelete = false
    window.location.reload()  
  }


}
