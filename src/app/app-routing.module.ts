import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './Auth/auth.guard';
import { AboutComponent } from './about/about.component';
import { ExamComponent } from './exam/exam.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { QuestionsComponent } from './questions/questions.component';

const appRoutes: Routes = [

  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'register',
      component: RegisterComponent
  },
  {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'about',
      component: AboutComponent
  },
  {
      path: 'exam',
      component: ExamComponent
  },
  {
      path: 'exam-details/:id',
      component: ExamDetailsComponent,
  },
  {
      path: 'question/:examId/:questionId',
      component: QuestionComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'questions/:examId/:questionId',
      component: QuestionsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'profile/result/:id',
      component: ResultComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'forbidden',
      component: ForbiddenComponent
  },
  {
      path: '',
      component: HomeComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
