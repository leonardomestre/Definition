import { User } from './../components/user.model';
import { Injectable } from '@angular/core';
import io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io("http://localhost:3000")
  newUsers:User[] =[{
    id: 0,
    name: "",
    points: 0,
    master: false
  }]
  
  constructor() { 
    this.socket.on('setUsers', (users:string[]) =>{  
      let id = 0
        this.newUsers = users.map(user =>{
        id++
        return {id: id, name: user, points: 0, master: false }
      })
   })
  } 

  getUsers(roomName:string){
    this.socket.emit('getUsers', roomName)
    console.log(this.newUsers)
    return this.newUsers
  }
  
}
