import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageSurveyClassService } from "./manage-survey-class.service";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { TypeAction, TypeValid } from "../app.entity";

@Component({
  selector: 'app-manage-survey-class',
  templateUrl: './manage-survey-class.component.html',
  styleUrls: ['./manage-survey-class.component.css']
})

export class ManageSurveyClassComponent implements OnInit {

  TypeAction = TypeAction;
  TypeValid = TypeValid;

  @ViewChild('detailModal') detailModal: ModalDirective;
  @ViewChild('file') file: ElementRef;
  @ViewChild('fileUpdate') fileUpdate: ElementRef;
  formSurveyClass: FormGroup;

  description: string;

  keySearch: string;

  source: LocalDataSource;

  subSource: LocalDataSource;

  action: TypeAction;

  settings : object;

  subSettings: object;

  surveyClassObject: object;

  objectKey: Array<string>;
  objectKeyView: Array<string>;

  ngOnInit() {
    this.action = TypeAction.View;
    this.description = "Quản lý các lớp môn học";

    this.surveyClassObject = {
      _id: {
        name: "_id",
        value: "",
      },
      code: {
        title: "Mã lớp môn học",
        name: "code",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Mã lớp môn học không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9\\s]+$')
        ]
      },
      name: {
        title: "Tên lớp môn học",
        name: "name",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Tên lớp môn học không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
          )
        ]
      },
      semester: {
        title: "Học kỳ",
        name: "semester",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Tên học kỳ không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z0-9-_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
          )
        ]
      },
      idTeacher: {
        title: "Mã giáo viên",
        name: "idTeacher",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Mã giáo viên không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$')
        ]
      },
      time: {
        title: "Thời gian",
        name: "time",
        value: "",
        valid: [/*{
          key: TypeValid.Pattern,
          message: "Thời gian không đúng định dạng"
        }*/],
        validators: [
          Validators.required,
          // Validators.pattern('[\/A-Za-z0-9_-]+$')
        ]
      },
      location: {
        title: "Vị trí",
        name: "location",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Vị trí không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('[\/A-Za-z0-9_-]+$')
        ]
      },
      creditNumber: {
        title: "Số tín chỉ",
        name: "creditNumber",
        value: "",
        valid: [{
          key: TypeValid.Pattern,
          message: "Số tín chỉ không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('[0-9]+$')
        ]
      }
    }

    this.objectKey = Object.keys(this.surveyClassObject);
    this.objectKey.splice(0, 1);

    this.settings = {
      mode: 'external',
      columns: {
        code: {
          title: 'Mã lớp môn học',
          width: '25%'
        },
        name: {
          title: 'Tên lớp môn học',
          width: '30%'
        },
        teacher: {
          title: 'Tên giáo viên',
          width: '25%',
          valuePrepareFunction: (value) => { 
            return value[0].fullname;
          }
        }
      },
      pager: {
        perPage: 5
      },
      attr: {
        class: 'table table-bordered'
      },
      add: {
        addButtonContent: '<i class="fas fa-file-import"> Nhập</i>',
      },
      edit: {
        editButtonContent: '<i class="fas fa-edit mr-sm-2"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash ml-sm-2"></i>',
      },
    };
    this.loadData();
    this.initForm();

    this.subSettings = {
      actions: false,
      columns: {
        code: {
          title: 'Mã lớp sinh viên',
          width: '30%'
        },
        fullname: {
          title: 'Họ và tên',
          width: '40%'
        },
        class: {
          title: 'Lớp',
          width: '30%'
        }
      },
      pager: {
        perPage: 10
      },
      attr: {
        class: 'table table-bordered'
      }
    }; 
  }

  resetValue(){
    for(let key of Object.keys(this.surveyClassObject)){
      this.surveyClassObject[key].value = "";
    }
    this.initForm();
  }

  initForm(){
    this.formSurveyClass = this.formBuilder.group({
      _id: [this.surveyClassObject['_id'].value, this.surveyClassObject['_id'].validators],
      code: [this.surveyClassObject['code'].value, this.surveyClassObject['code'].validators],
      name: [this.surveyClassObject['name'].value, this.surveyClassObject['name'].validators],
      semester: [this.surveyClassObject['semester'].value, this.surveyClassObject['semester'].validators],
      idTeacher: [this.surveyClassObject['idTeacher'].value, this.surveyClassObject['idTeacher'].validators],
      time: [this.surveyClassObject['time'].value, this.surveyClassObject['time'].validators],
      location: [this.surveyClassObject['location'].value, this.surveyClassObject['location'].validators],
      creditNumber: [this.surveyClassObject['creditNumber'].value, this.surveyClassObject['creditNumber'].validators],
    })
  }

  loadData(){
    this.manageSurveyClassService.getAll().subscribe(
      classSurvey => {
        if(classSurvey.error){
          alert(classSurvey.error.message)
          // handler error
        } else{
          this.source.reset(false);
          this.source.load(classSurvey);
        }
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  copyValue(data){
    for(let key of Object.keys(data)){
      if(this.surveyClassObject[key])
        this.surveyClassObject[key].value = data[key];
    }
  }

  constructor(
    private manageSurveyClassService: ManageSurveyClassService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.source = new LocalDataSource();
    this.subSource = new LocalDataSource();
  }

  onUserRowSelect(event){
    this.action = TypeAction.View;
    this.copyValue(event.data);
    let subData = [];
    for(let i = 0; i<event.data.students.length; i++){
      if(event.data.students[i] != null && event.data.students[i].length > 0){
        subData.push(event.data.students[i][0]);
      } else {
        subData.push({code: event.data.idStudents[i]});
      }
    }
    this.subSource.reset(false);
    this.subSource.load(subData);
    this.detailModal.show();
  }

  onUpdateByImport(event){
    if(event.target.files[0]){
      let check = confirm("Bạn muốn nhập danh sách lớp môn học này: " + event.target.files[0].name + " ?");
      if(check){
        this.manageSurveyClassService.updateByImport(this.surveyClassObject['_id'].value, event.target.files[0]).subscribe(
          classSurvey => {
            if(classSurvey.error){
              alert(classSurvey.error.message);
              // this.router.navigate(['/error', id ])
            } else {
              this.detailModal.hide();
              this.loadData();
              alert('Chỉnh sửa thành công lớp môn học: ' + 
                    classSurvey.code + ' - ' + 
                    classSurvey.name + ' - ' + 
                    classSurvey.semester);
            }
          },
          error => {
            alert(error);
            // this.router.navigate(['/error', id ])
          }
        )
      }
      this.fileUpdate.nativeElement.value = "";
    }
  }

  onEdit(event){
    this.copyValue(event.data);
    this.formSurveyClass.get('_id').setValue(event.data._id);
    this.initForm();
    this.action = TypeAction.Edit;
    this.detailModal.show();
  }

  onDelete(event){
    let check = confirm('Bạn muốn xóa lớp môn học: ' +  
                    event.data.code + ' - ' + 
                    event.data.name + ' - ' + 
                    event.data.semester);
    if(check){
      this.manageSurveyClassService._delete(event.data._id).subscribe(
        message => {
          if(message.error){
            alert(message.error.message)
            // handler error
          } else{
            this.source.remove(event.data);
            alert(message);
          }
        },
        error => {
          alert(error);
          // this.router.navigate(['/error', id ])
        }
      )
    } else {
      event.confirm.reject();
    }
  } 

  onSearch() {
    this.manageSurveyClassService.find(this.keySearch).subscribe(
      classSurvey => {
        if(classSurvey.error){
          alert(classSurvey.error.message)
          // handler error
        } else{
          this.source.reset(false);
          this.source.load(classSurvey);
          this.keySearch = null;
        }
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  importFile(event){
    if(event.target.files[0]){
      let check = confirm("Bạn muốn nhập danh sách lớp môn học này: " + event.target.files[0].name + " ?");
      if(check){
        this.manageSurveyClassService.importFile(event.target.files[0]).subscribe(
          classSurvey => {
            if(classSurvey.error){
              alert(classSurvey.error.message);
              // this.router.navigate(['/error', id ])
            } else {
              this.loadData();
              alert('Thêm lớp môn học: ' + 
                classSurvey.code + ' - ' + 
                classSurvey.name + ' - ' + 
                classSurvey.semester + ' thành công');
            }
          },
          error => {
            alert(error);
            // this.router.navigate(['/error', id ])
          }
        )
      }
      this.file.nativeElement.value = "";
    }
  }

  // exportFile(){
  //   this.manageSurveyClassService.exportFile().subscribe(
  //     file => {
  //       // console.log(file);
  //       // can chinh sua ten file
  //       let blob = new Blob([file.body], {
  //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //       });
  //       let downloadUrl= window.URL.createObjectURL(blob);
  //       window.open(downloadUrl);
  //     },
  //     error => {
  //       alert(error);
  //       // this.router.navigate(['/error', id ])
  //     }
  //   )
  // }

  onSubmit(){
    console.log(12)
    if(!this.formSurveyClass.invalid){
      this.manageSurveyClassService.update(this.formSurveyClass.value).subscribe(
        classSurvey => {
          if(classSurvey.error){
            alert(classSurvey.error.message);
            // this.router.navigate(['/error', id ])
          } else {
            alert('Chỉnh sửa thành công lớp môn học: ' + 
                classSurvey.code + ' - ' + 
                classSurvey.name + ' - ' + 
                classSurvey.semester);
            this.loadData();
            this.detailModal.hide();
          }
        },
        error => {
          alert(error);
          // this.router.navigate(['/error', id ])
        }
      )
    }
  }

  onSurvey(){
    // route sang survey
  }

}
