import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full'
  },
  {
    path: 'quiz',
    loadChildren: () => import('./content/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'startquiz/:id',
    loadChildren: () => import('./content/quiz-questions/quiz-questions.module').then(m => m.QuizQuestionsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
