import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { ReadWordComponent } from './components/components/read-word/read-word.component';
import { ForDirective } from './directives/for.directive';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/components/menu/menu.component';
import { WordFormComponent } from './components/components/word-form/word-form.component';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components/components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReadWordComponent,
    ForDirective,
    MenuComponent,
    WordFormComponent,
    PopupComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
