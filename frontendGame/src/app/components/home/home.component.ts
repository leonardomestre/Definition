import { Router } from '@angular/router';
import { SocketService } from './../../services/socket.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  message:string="";
  alertVisible:boolean=false
  ifMessageGood:boolean=false
  rulesView:boolean=false
  @ViewChild('room')
  elementRoomName!:ElementRef 
  @ViewChild('user')
  elementUserName!:ElementRef 
  constructor(private _socketService:SocketService, private router:Router){

  }


  joinRoom(roomName:string, userName:string){
    const userData = {
      name: userName,
      room: roomName
    }
    this._socketService.socket.emit('joinRoom', userData) // passar objeto com nome da sala e nome de usuario
    this.router.navigate([`/room/${userData.room}/${userData.name}`]) 
    
  }

  join(){
    const userName = this.elementUserName.nativeElement.value
    const roomName = this.elementRoomName.nativeElement.value
    if(this.roomValidation(roomName) && this.userValidation(userName))
      this.joinRoom(roomName, userName )
  }

  createRoom(){
    const userName = this.elementUserName.nativeElement.value
    if(this.userValidation(userName)){
      const roomName = `${Math.round(Math.random() * 999995)}`
      this.joinRoom(roomName, userName)
    }
  }

  userValidation(userName:string){
    if(userName == "" || userName == undefined || userName == null){
      this.message = "Nome de usuário em branco"
      this.alertVisible = true
      this.ifMessageGood = false
      setTimeout(()=>{
        this.alertVisible = false
        return false
      },5000)
    }
      return true
    
  }
  roomValidation(roomName:string){
    if(roomName == "" || roomName == undefined || roomName == null){
      this.message = "Numero da sala em branco"
      this.alertVisible = true
      this.ifMessageGood = false
      setTimeout(()=>{
        this.alertVisible = false
        return false
      },5000)
    }
    return true
  }
  rulesVisibleChange(){
    this.rulesView = !this.rulesView
  }
  
}
