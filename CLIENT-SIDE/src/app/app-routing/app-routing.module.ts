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
import { HomeComponent } from "../home/home.component";
import { AdminOrTeacherGuard } from "../guards/admin-or-teacher.guard";
import { AdminGuard } from "../guards/admin.guard";
import { PermissionGuard } from "../guards/permission.guard";
import { StudentGuard } from "../guards/student.guard";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent , pathMatch: 'full' }, // ?match
  { path: 'manageAccountStudent', component: ManageAccountStudentComponent, 
    canActivate: [AdminGuard]},
  { path: 'manageAccountTeacher', component: ManageAccountTeacherComponent, 
    canActivate: [AdminGuard]},
  { path: 'manageSurvey', component: ManageSurveyComponent,
    canActivate: [AdminGuard]},
  { path: 'manageSurveyClass', component: ManageSurveyClassComponent,
    canActivate: [AdminGuard]},
  { path: 'surveyClass', component: ManageSurveyClassComponent,
    canActivate: [PermissionGuard]},
  { path: 'viewResult', component: ViewResultComponent,
    canActivate: [AdminOrTeacherGuard]},
  { path: 'anwserSurvey', component: AnwserSurveyComponent,
    canActivate: [StudentGuard]},
  { path: 'error',  component: HandlerErrorComponent},
  { path: '**',  redirectTo: 'error'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
