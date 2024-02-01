import { RoomComponent } from './components/room/room.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"room/:roomName/:userName",
    component:RoomComponent
  },
  {
    path:"game/:roomName/:userName/:time/:turn",
    component:GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
