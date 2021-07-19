import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { CountdownModule } from 'ngx-countdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './inc/header/header.component';
import { FooterComponent } from './inc/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginRegisterService } from './Services/login-register.service';
import { AuthService } from './Services/auth.service';
import { ExamComponent } from './exam/exam.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { AboutComponent } from './about/about.component';
import { QuestionPipe } from './Pipes/question.pipe';
import { QuestionsComponent } from './questions/questions.component';
import { OptionsPipe } from './Pipes/options.pipe';
import { IsrightPipe } from './Pipes/isright.pipe';
import { YourOptionsPipe } from './Pipes/your-options.pipe';
import { WrongOptionsPipe } from './Pipes/wrong-options.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ForbiddenComponent,
    ExamComponent,
    ExamDetailsComponent,
    QuestionComponent,
    ResultComponent,
    AboutComponent,
    QuestionPipe,
    QuestionsComponent,
    OptionsPipe,
    IsrightPipe,
    YourOptionsPipe,
    WrongOptionsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    CountdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginRegisterService,
    QuestionPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
