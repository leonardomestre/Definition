import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from '../components/word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  baseUrl:string = "http://localhost:3001/words"
  constructor(private http: HttpClient) { }

  getFiveWords(){
    let words:Word[] = []
    let ids:number[] = []
    let randomId:number
    let indice = 0
    while(indice < 5){
      randomId = Math.floor(Math.random() * 35 +1)     
      if(ids.find(id => id === randomId) != randomId){
        ids.push(randomId)
        indice++
      } 
    }
    ids.forEach(id =>{
      this.http.get<Word>(`${this.baseUrl}/${id}`).subscribe(newWord => words.push(newWord))
    })
    
    return words

  }
}
