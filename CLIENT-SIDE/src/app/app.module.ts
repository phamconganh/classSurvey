import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HandlerErrorComponent } from './handler-error/handler-error.component';
import { ManageAccountStudentComponent } from './manage-account-student/manage-account-student.component';
import { ManageAccountTeacherComponent } from './manage-account-teacher/manage-account-teacher.component';
import { ManageSurveyComponent } from './manage-survey/manage-survey.component';
import { ManageSurveyClassComponent } from './manage-survey-class/manage-survey-class.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { AnwserSurveyComponent } from './anwser-survey/anwser-survey.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HandlerErrorComponent,
    ManageAccountStudentComponent,
    ManageAccountTeacherComponent,
    ManageSurveyComponent,
    ManageSurveyClassComponent,
    ViewResultComponent,
    AnwserSurveyComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
