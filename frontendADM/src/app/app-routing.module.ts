import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadWordComponent } from './components/components/read-word/read-word.component';
import { WordFormComponent } from './components/components/word-form/word-form.component';

const routes: Routes = [{
  path:"",
  component: ReadWordComponent
},{
  path:"form/:action/:id",
  component: WordFormComponent
},{
  path:"form/:action",
  component: WordFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
