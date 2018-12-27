import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class ManageSurveyClassService {

  private urlApi: string = appConfig.apiUrl + appConfig.surveyClass;

  constructor(private http: HttpClient) {  }

  //chua handle dc error

  getAll() {
    const url = this.urlApi + appConfig.get;
    return this.http.get<any>(url);
  }

  // getCurrent(_id){
  //   const url = this.urlApi + appConfig.get + _id;
  //   return this.http.get<any>(url);
  // }

  updateByImport(_id, file){
    const url = this.urlApi + appConfig.updateByImport;
    const uploadData = new FormData();
    uploadData.append('_id', _id);
    uploadData.append('fileExcel', file, file.name);
    return this.http.post<any>(url,uploadData);
  }

  update(data){
    const url = this.urlApi + appConfig.updateByForm;
    return this.http.put<any>(url,data);
  }

  importFile(file){
    const url = this.urlApi + appConfig.importFile;
    const uploadData = new FormData();
    uploadData.append('fileExcel', file, file.name);
    return this.http.post<any>(url,uploadData);
  }

  // exportFile(){
  //   const url = this.urlApi + appConfig.exportFile;
  //   return this.http.post<any>(url,{}, {'responseType': 'blob' as 'json', observe: 'response'});
  // }

  find(key){
    const url = this.urlApi + appConfig.find;
    return this.http.post<any>(url,{keySearch: key});
  }

  _delete(_id){
    const url = this.urlApi + appConfig._delete + _id;
    return this.http.delete<any>(url);
  }

}
