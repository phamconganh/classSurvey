import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HandlerErrorComponent } from "../handler-error/handler-error.component";
import { LoginComponent } from "../login/login.component";
import { ManageAccountStudentComponent } from "../manage-account-student/manage-account-student.component";
import { ManageAccountTeacherComponent } from "../manage-account-teacher/manage-account-teacher.component";
import { ManageSurveyComponent } from "../manage-survey/manage-survey.component";
import { ManageSurveyClassComponent } from "../manage-survey-class/manage-survey-class.component";
import { ViewResultComponent } from "../view-result/view-result.component";
import { AnwserSurveyComponent } from "../anwser-survey/anwser-survey.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent , pathMatch: 'full' }, // ?match
  { path: 'manageAccountStudent', component: ManageAccountStudentComponent},
  { path: 'manageAccountTeacher', component: ManageAccountTeacherComponent},
  { path: 'manageSurvey', component: ManageSurveyComponent },
  { path: 'manageSurveyClass', component: ManageSurveyClassComponent },
  { path: 'viewResult', component: ViewResultComponent },
  { path: 'anwserSurvey', component: AnwserSurveyComponent },
  { path: 'error',  component: HandlerErrorComponent},
  { path: '**',  redirectTo: 'error'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
