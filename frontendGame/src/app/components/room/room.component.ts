import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from './../../services/socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rulesVisible:boolean = false
  users=['']
  roomName:string | null
  userName:string | null
  message:string="";
  alertVisible:boolean=false
  ifMessageGood:boolean=false
  userMaster:boolean=false
  rulesView:boolean=false

  @ViewChild('time')
  elementTime!:ElementRef
  @ViewChild('turn')
  elementTurn!:ElementRef
  
  constructor(private _socketService:SocketService, private route: ActivatedRoute,private router:Router){
    this.roomName = this.route.snapshot.paramMap.get("roomName")
    this.userName = this.route.snapshot.paramMap.get("userName")
    this._socketService.socket.on('setUsers', (users:string[]) =>{
       this.users = users
       if(this.users.length <= 1){
        this.userMaster = true
        
      }
      console.log(this.userMaster)    
    })
    
    this._socketService.socket.on('start', ()=>{
      this.router.navigate([`/game/${this.roomName}/${this.userName}/${this.elementTime.nativeElement.value}/${this.elementTurn.nativeElement.value}`])
    })
  }
  
  ngOnInit(): void {
    this._socketService.socket.emit('getUsers', this.roomName)
   
  }

  start(){
    if(this.users.length >= 4){
      this._socketService.socket.emit("start", this.roomName)
    }else{
      this.message="Precisa-se de 4 ou mais jogadores para jogar"
      this.ifMessageGood=false
      this.alertVisible=true
      
      setTimeout(()=>{
        this.alertVisible = false
      }, 5000)
    }
  }

  rulesVisibleChange(){
    this.rulesView = !this.rulesView
  }
  
}
