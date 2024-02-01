import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from './word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  baseUrl:string = "http://localhost:3001/words"
  constructor(private http: HttpClient) { }

  read():Observable<Word[]>{
    return this.http.get<Word[]>(this.baseUrl)
  }
  create(word:Word):Observable<Word>{
    console.log(word)
    return this.http.post<Word>(this.baseUrl, word)
  }

  update(word:Word){
    const newUrl = `${this.baseUrl}/${word.id}`
    return this.http.put<Word>(newUrl, word)
  }
  readById(id:string){
    const newUrl = `${this.baseUrl}/${id}`
    return this.http.get<Word>(newUrl)
  }
  delete(id:string){
    const newUrl = `${this.baseUrl}/${id}`
    return this.http.delete<Word>(newUrl)
  }
}