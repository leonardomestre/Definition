import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';
import { RoomComponent } from './components/room/room.component';
import { GameComponent } from './components/game/game.component';
import { WordOptionsComponent } from './components/word-options/word-options.component';
import { HttpClientModule } from '@angular/common/http';
import { WordDefinitionComponent } from './components/word-definition/word-definition.component';
import { DefinitionsOptionsComponent } from './components/definitions-options/definitions-options.component';
import { AlertComponent } from './components/alert/alert.component';


const config: SocketIoConfig = {url:'http://localhost:3000'}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RulesComponent,
    RoomComponent,
    GameComponent,
    WordOptionsComponent,
    WordDefinitionComponent,
    DefinitionsOptionsComponent,
    AlertComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [WordDefinitionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
