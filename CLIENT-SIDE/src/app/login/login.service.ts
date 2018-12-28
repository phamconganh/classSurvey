import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi: string = appConfig.apiUrl + appConfig.login;

  constructor(private http: HttpClient) {}
  
  login(form){
    const url = this.urlApi;
    return this.http.post<any>(url, form);
  }

}
