import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

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
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthorizationRequestInterceptor } from './authorization-request-interceptor/authorization-request-interceptor.component';

import { AdminOrTeacherGuard } from "./guards/admin-or-teacher.guard";
import { AdminGuard } from "./guards/admin.guard";
import { PermissionGuard } from "./guards/permission.guard";
import { StudentGuard } from "./guards/student.guard";

import { AppShareService } from "./app-share.service";
import { HomeComponent } from './home/home.component';

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
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationRequestInterceptor,
      multi: true,
    },
    AdminGuard,
    AdminOrTeacherGuard,
    StudentGuard,
    PermissionGuard,
    AppShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
