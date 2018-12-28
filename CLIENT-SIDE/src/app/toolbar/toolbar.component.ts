import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Permission, deleteFromLocal, loadToken, loadPermission } from "../app.entity";
import { AppShareService } from "../app-share.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  Permission = Permission;
  permissionObject: number;

  activity;

  isLogined = false;

  constructor(private router: Router,
    private appShareService: AppShareService) { 
      appShareService.changeEmitted$.subscribe(
        login => {
          this.isLogined = login;
          this.onInit();
        }
      );
  }

  ngOnInit() {
    this.onInit();
  }

  onInit(){
    this.permissionObject = loadPermission();
    if(this.permissionObject != null && loadToken() ){
      this.isLogined = true;
      switch (this.permissionObject) {
        case Permission.Admin:
          this.activity = [
            {
              icon: 'fas fa-user-graduate',
              link: '/manageAccountStudent',
              title: 'Quản lý tài khoản sinh viên'
            },
            {
              icon: 'fas fa-graduation-cap',
              link: '/manageAccountTeacher',
              title: 'Quản lý tài khoản giáo viên'
            },
            {
              icon: 'fas fa-university',
              link: '/manageSurveyClass',
              title: 'Quản lý lớp môn học'
            },
            {
              icon: 'fas fa-poll-h',
              link: '/manageSurvey',
              title: 'Quản lý phiếu khảo sát'
            },
            {
              icon: 'fas fa-chart-bar',
              link: '/viewResult',
              title: 'Xem kết quả'
            }
          ]
          break;
        case Permission.Teacher:
          this.activity = [
            {
              icon: 'fas fa-university',
              link: '/surveyClass',
              title: 'Lớp môn học'
            },
            {
              icon: 'fas fa-chart-bar',
              link: '/viewResult',
              title: 'Xem kết quả'
            }
          ]
          break;
        case Permission.Student:
          this.activity = [
            {
              icon: 'fas fa-university',
              link: '/surveyClass',
              title: 'Lớp môn học'
            },
            {
              icon: 'fas fa-poll-h',
              link: '/anwserSurvey',
              title: 'Đánh giá môn học'
            }
          ]
          break;
        default:
          break;
      }
    } else{
      this.isLogined = false;
    }
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout(){
    deleteFromLocal();
    this.isLogined = false;
    this.activity = null;
    this.router.navigate(['/login']);
  }

}
