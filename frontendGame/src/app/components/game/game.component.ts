import { WordDefinitionComponent } from './../word-definition/word-definition.component';
import { WordService } from './../../services/word.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from './../../services/socket.service';
import { Component, Input, OnInit, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../user.model';
import { Word } from '../word.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  rulesVisible:boolean = false
  roomName:string
  userName:String
  time:number
  turn:number
  stage:number = 1
  round:number = 0
  users:User[]=[{
    id: 0,
    name:"aaaa",
    points:0,
    master: false
  }]
  playerDefinition:string = ""
  playersDefinitions:string[] = []
  words:Word[] = []
  wordOptionsView:Boolean = false
  wordDefinitionView:Boolean = false
  definitionOptionsView:Boolean = false
  stopwatchNumber:number = 0
  stopwatchColor:boolean = false
  stopwatchVisible:boolean = false
  wordDefinitionType = ""
  selectedWord:Word = {
    name: "",
    definition: ""
  }
  actualTurn:number = 1
  definitionSelected:string[] = []
  stopwatchInterval:any
  vote:string = ""
  votes:string[]=[]
  ifMasterVote = false
  messageDefinitionOpitions:string=""

  @ViewChild(WordDefinitionComponent)
  wordDefinitionComponent!:WordDefinitionComponent


  constructor(private _socketService:SocketService, private route:ActivatedRoute, private _wordService:WordService){
    this.roomName = this.route.snapshot.paramMap.get("roomName") ?? ""
    this.userName = this.route.snapshot.paramMap.get("userName") ?? ""
    this.time  = parseInt(this.route.snapshot.paramMap.get("time") ?? "15")
    this.turn = parseInt(this.route.snapshot.paramMap.get("turn") ?? "1")

    this._socketService.socket.on("selectWord", (word:Word)=>{
      this.selectedWord = word
    })
    
    this._socketService.socket.on("definitionsSelected", (newDefinitionSelected:any[])=>{
      this.definitionSelected = newDefinitionSelected
      let ifPoints = false
      if(this.definitionSelected.length === 0){
        if(this.ifMaster()){
          setTimeout(()=>{
            this._socketService.socket.emit("nextStage",{room:this.roomName, stage:4})
          }, 1000) 
        }
      } else{
        this.definitionSelected.forEach(definition =>{
          if(definition == this.playerDefinition){
            ifPoints = true
          }
        })
        if(ifPoints){
          this._socketService.socket.emit("points",({name: this.userName, points: 3, room:this.roomName}))
        }
        
        this.round ++
        if(this.ifMaster()){
          setTimeout(()=>{
            this._socketService.socket.emit("nextStage",{room:this.roomName, stage:0})
          }, 1000) 
        }
      }
    })

    this._socketService.socket.on("points",(data:any)=>{
       this.users.map(user=>{
        if(user.name == data.name){
          user.points += data.points
        }
       })
    })

    this._socketService.socket.on("allDefinitions", (definitions:string[])=>{
      this.playersDefinitions = definitions
      if(this.stage == 4){
        let newArray = []

        for(let i = this.playersDefinitions.length; i>0; i--){
          console.log("no for")
          const j = Math.floor(Math.random()* (i -1))
          console.log("i:",i,"j:",j)
          newArray.push(this.playersDefinitions[j])
          this.playersDefinitions.splice(j,1)        
        }
        this.playersDefinitions = newArray
      }
      
    })

    this._socketService.socket.on("nextStage", (nextStage:number)=>{
      clearInterval(this.stopwatchInterval)
      switch(nextStage){
        case 0:
          this.stage = 0
          this.roundStart()
          break;
        case 1:
          this.stage = 1
          this.stage1()
          break;
        case 2:
          this.stage = 2
          this.stage2()
          break;
        case 3:
          this.stage = 3
          this.stage3()
          break;
        case 4:
          this.stage = 4
          this.stage4()
          break;
        case 5:
          this.stage = 5
          this.stage5()
          break;
      }
    })
    this._socketService.socket.on("vote", (vote:string)=>{
      this.votes.push(vote) 
      console.log(vote, this.votes)
    })

    this._socketService.socket.on("finalPoints", ()=>{
      console.log(this.votes)
      this.round++
      if(this.ifMaster()){
        this.votes.forEach(vote =>{
          if(vote === this.selectedWord.definition){
            console.log("1:", vote, this.selectedWord.definition)
            this.ifMasterVote = true
          }
        })
        console.log(this.ifMasterVote)
        if(!this.ifMasterVote){
          this._socketService.socket.emit("points",{room:this.roomName, name:this.userName, points:5})
        }
      }else{
        this.votes.forEach(vote => {
          console.log("2:", vote, this.selectedWord.definition)
          if(vote === this.playerDefinition){
            this._socketService.socket.emit("points", {room: this.roomName, name:this.userName, points:1})
          }
        });
        if(this.vote === this.selectedWord.definition){
          this._socketService.socket.emit("points", {room: this.roomName, name:this.userName, points:2})
        }
        setTimeout(()=>{
          this._socketService.socket.emit("nextStage",{room:this.roomName, stage:0})
        },5000)
      }
    })

  }
  
  ngAfterViewInit(): void {
    this.users = this._socketService.getUsers(this.roomName)
    console.log(this.users)
    this.roundStart()
  }
  
  
  rulesVisibleChange(){
    this.rulesVisible = !this.rulesVisible
  }
  
  roundStart(){
    console.log("Começou o jogo")
    if(this.actualTurn <= this.turn){
      this.definitionSelected = []
      this.wordDefinitionComponent.playerDefinition.nativeElement.value = ""
      this._socketService.socket.emit("deleteAllDefinition", this.roomName)
      console.log("passei 1")
      if(this.round <= (this.users.length - 1)){
        console.log("passei 2")
        this.users.forEach((user, index)=>{
          if(index == this.round)
            user.master = true
          else
            user.master = false
        })
        console.log("passei 3")
        this.users[this.round].master = true
        this.playerDefinition = ""
        this.playersDefinitions = []
        this.wordOptionsView = false
        this.wordDefinitionView = false
        this.definitionOptionsView = false
        this.words = this._wordService.getFiveWords()
        console.log("passei 4")
        if(this.ifMaster()){
          this._socketService.socket.emit("nextStage",{room:this.roomName, stage:1})
        }
      } else{
        console.log("passei 5")
        this.round = 0;
        this.actualTurn ++
        this.roundStart()
      }  
    }
    console.log("fim de jogo")
  }

  stage1(){
    console.log("1")
    if(this.ifMaster())  
      this.wordOptionsView = true
    this.stopwatch(this.time)
  }
  
  stage2(){
    if(!this.ifMaster()){
      this.wordDefinitionView = true
    }
    this.stopwatch(this.time)
  }
  stage3(){
    this.wordDefinitionType = "checkbox"
    this.messageDefinitionOpitions = "Selecione se alguém acertou a definição"
    if(this.ifMaster()){
      this.definitionOptionsView = true
    }
    this.stopwatch(this.time)
  }
  stage4(){
    this.messageDefinitionOpitions = "Selecione definição correta"
    this.definitionOptionsView = false
    this.wordDefinitionType = "radio"
    if(this.ifMaster())
      this._socketService.socket.emit("allDefinitions", {room: this.roomName, definition: this.selectedWord.definition})
    setTimeout(()=>{
      if(!this.ifMaster()){
        this.definitionOptionsView = true
      }  
      this.stopwatch(this.time)
    },1000)
  }

  stage5(){
    this.definitionOptionsView = false
    if(!this.ifMaster()){
      if(this.vote != "" && this.vote != undefined && this.vote != null){
        this._socketService.socket.emit("vote",{vote:this.vote, room:this.roomName})
      }
    }else{
      setTimeout(()=>{
        this._socketService.socket.emit("finalPoints", this.roomName)
      },1000)  
    }
  }

  stopwatch(counter:number){
    this.stopwatchVisible = true
    this.stopwatchNumber = counter

    this.stopwatchInterval =  setInterval(()=>{
      this.stopwatchNumber--
      this.stopwatchColor = (this.stopwatchNumber <= 5 )
      if(this.stopwatchNumber === 0){     
        this.stopwatchVisible = false
        this.wordOptionsView = false

        if(this.stage === 1){
          if(this.ifMaster()){
            if(this.selectedWord == null || this.selectedWord == undefined || this.selectedWord.name =="" || this.selectedWord.definition ==""){
              this.selectedWord = this.words[Math.floor(Math.random() * 4)]
            }
            this._socketService.socket.emit("selectWord", ({ room: this.roomName, word: this.selectedWord }))
          }
          if(this.ifMaster()){
            setTimeout(()=>{
              this._socketService.socket.emit("nextStage",{room:this.roomName, stage:2})
            }, 1000)
          }
          clearInterval(this.stopwatchInterval)
          //this.stage2()
        }

        if(this.stage === 2){
          if(!this.ifMaster()){
            if(this.playerDefinition == null || this.playerDefinition == undefined){
              this.playerDefinition = ""
            }
            this._socketService.socket.emit("allDefinitions", ({room: this.roomName, definition: this.playerDefinition}))   
          }
          this.wordDefinitionView = false
          if(this.ifMaster()){
            setTimeout(()=>{
              this._socketService.socket.emit("nextStage",{room:this.roomName, stage:3})
            }, 2000)
          }
          //this.stage3()
          clearInterval(this.stopwatchInterval)
        }
        if(this.stage === 3){
          
          if(this.ifMaster()){
            setTimeout(()=>{
              this._socketService.socket.emit("definitionsSelected", {room:this.roomName, definitions: this.definitionSelected})  
            }, 1000)  
          }
          clearInterval(this.stopwatchInterval)  
        }

        if(this.stage === 4){
          this._socketService.socket.emit("nextStage",{room:this.roomName, stage:5})
        }

        
        clearInterval(this.stopwatchInterval)
      }
    }, 1000)
      
  }

  selectPlayerDefinition(definition:string){
    this.playerDefinition = definition
  }
  selectWord(word:Word){
    this.selectedWord = word
  }

  selectDefinition(definition:string){
    if(this.wordDefinitionType == "checkbox"){
      if( this.definitionSelected.find(data=>{return data == definition}))
        this.definitionSelected.splice(this.definitionSelected.indexOf(definition), 1)
      else
        this.definitionSelected.push(definition)
  
      console.log(this.definitionSelected)
    }else if(this.wordDefinitionType == "radio"){
      this.vote = definition
    }
  }

  ifMaster(){
    let masterReturn
    this.users.forEach(user =>{
      if(user.name === this.userName)
        masterReturn = user.master
    })
    return masterReturn
  }

}


