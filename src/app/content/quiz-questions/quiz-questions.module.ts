import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestionsComponent } from './quiz-questions.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuizQuestionsComponent,
  }
]


@NgModule({
  declarations: [QuizQuestionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class QuizQuestionsModule { }
