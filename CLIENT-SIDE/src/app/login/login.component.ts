import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { saveToLocal } from "../app.entity";
import { AppShareService } from "../app-share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  isLoadingLogin = false;
  isLoadingRegister = false;
  isLogin = true;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private appShareService: AppShareService
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_]+$')]],
      password: ['', [Validators.required]]
    })
  }

  onLogin(){
    this.isLoadingLogin = true;
    this.loginService.login(this.formLogin.value).subscribe(
      res => {
        if (res.error){
          alert(res.error.message);
          // route to handler error
        } else {
          console.log(res)
          saveToLocal(res.token, res.permission)
          this.appShareService.emitChange(true);
          this.router.navigate(['']);
        }
        this.isLoadingLogin = false;
      },
      error => {
        console.log(error)
        // route to handler error
        this.isLoadingLogin = false;
      }
    )
  }

}
