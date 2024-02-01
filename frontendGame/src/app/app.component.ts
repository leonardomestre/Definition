import { SocketService } from './services/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontendGame';
  constructor(private server:SocketService){

  }

  ngOnInit(): void {
    
  }

}
