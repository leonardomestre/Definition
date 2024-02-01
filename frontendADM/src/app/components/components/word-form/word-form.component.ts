import { Observable } from 'rxjs';
import { WordService } from './../word.service';
import { Word } from './../word.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements OnInit{
  @Input() wordForm:Word = {
    name:"",
    definition:""
  }
  @Output() oldWord?:Word

  action:string =""
  id:string =""

  constructor(private wordService:WordService, private route:ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.action = this.route.snapshot.paramMap.get('action') as any
    this.id = this.route.snapshot.paramMap.get('id?') as any
    if(this.id != "?"){
      this.wordService.readById(this.id).subscribe(newWord => this.wordForm = newWord)
    }
  }

  save(){
    if(this.action == "create"){
      this.wordService.create(this.wordForm).subscribe()
      this.router.navigate([''])
    }
    else if(this.action == "update"){
      this.wordService.update(this.wordForm).subscribe()
      this.router.navigate([''])
    }
    else
      console.log(this.action, this.id)
  }
}


