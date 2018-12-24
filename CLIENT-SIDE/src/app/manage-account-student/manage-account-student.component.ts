import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Student } from "../models/student";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageAccountStudentService } from "./manage-account-student.service";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { Permission, TypeAction, TypeInput, TypeValid, SelectObject } from "../app.entity";

@Component({
  selector: 'app-manage-account-student',
  templateUrl: './manage-account-student.component.html',
  styleUrls: ['./manage-account-student.component.css']
})

export class ManageAccountStudentComponent implements OnInit {

  Permission = Permission;
  TypeAction = TypeAction;
  TypeInput = TypeInput;
  TypeValid = TypeValid;
  selectObject = SelectObject;

  @ViewChild('detailModal') detailModal: ModalDirective;
  @ViewChild('errInfoModal') errInfoModal: ModalDirective;
  @ViewChild('file') file: ElementRef;
  formStudent: FormGroup;

  errInfo: Array<any>;

  description: string;

  keySearch: string;

  source: LocalDataSource;

  action: TypeAction;

  settings : object;

  studentObject: object;

  objectKey: Array<string>;
  objectKeyView: Array<string>;

  ngOnInit() {
    this.action = TypeAction.View;
    this.description = "Quản lý tài khoản sinh viên";

    this.studentObject = {
      _id: {
        name: "_id",
        value: "",
      },
      fullname: {
        title: "Họ và tên",
        name: "fullname",
        value: "",
        type: TypeInput.Text,
        valid: [
          {
            key: TypeValid.MinLength,
            message: "Họ và tên không được ít hơn 8 ký tự"
          },
          {
            key: TypeValid.MaxLength, 
            message: "Họ và tên không được nhiều hơn 50 ký tự"
          },
          {
            key: TypeValid.Pattern,
            message: "Họ và tên không được chứa ký tự đặc biệt"
          }
        ],
        validators: [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(8),
          Validators.pattern(
            "^[A-Za-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
          )
        ]
      },
      code: {
        title: "Mã sinh viên",
        name: "code",
        value: "",
        type: TypeInput.Text,
        valid: [{
          key: TypeValid.Pattern,
          message: "Mã sinh viên không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$')
        ]
      },
      class: {
        title: "Lớp",
        name: "class",
        value: "",
        type: TypeInput.Text,
        valid: [{
          key: TypeValid.Pattern,
          message: "Mã lớp không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('[\/A-Za-z0-9_-]+$')
        ]
      },
      username: {
        title: "Tên đăng nhập",
        name: "username",
        value: "",
        type: TypeInput.Text,
        valid: [{
          key: TypeValid.Pattern,
          message: "Tên đăng nhập không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('[A-Za-z0-9_]+$')
        ]
      },
      vnuEmail: {
        title: "Vnu email",
        name: "vnuEmail",
        value: "",
        type: TypeInput.Text,
        valid: [{
          key: TypeValid.Email,
          message: "Email không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.email
        ]
      },
      permission: {
        title: "Quyền",
        name: "permission",
        value: Permission.Student,
        type: TypeInput.Select,
        valid: [{
          key: TypeValid.Pattern,
          message: "Quyền hạn không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('[0-2]')
        ]
      },
      password: {
        title: "Mật khẩu",
        name: "password",
        value: "",
        type: TypeInput.Text,
        valid: [],
        validators: []
      }
      // ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}')]],
      // repassword: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_]')]]
    }

    this.objectKey = Object.keys(this.studentObject);
    this.objectKey.splice(0, 1);
    this.objectKeyView = Object.keys(this.studentObject);
    this.objectKeyView.splice(0, 1);
    this.objectKeyView.splice(this.objectKeyView.length - 1, 1);

    this.settings = {
      mode: 'external',
      columns: {
        code: {
          title: 'Mã sinh viên',
          width: '15%'
        },
        fullname: {
          title: 'Họ và tên',
          width: '20%'
        },
        class: {
          title: 'Lớp',
          width: '15%'
        },
        username: {
          title: 'Tên đăng nhập',
          width: '15%'
        },
        vnuEmail: {
          title: 'Vnu email',
          width: '20%'
        },
        permission:{
          title: 'Quyền',
          width: '10%',
          // editor: {
          //   type: 'list',
          //   defaultValue: 'true',
          //   config: {
          //     list: [
          //       { value: '0', title: 'admin' },
          //       { value: '1', title: 'Giáo viên' },
          //       { value: '2', title: 'Sinh viên'}
          //     ]
          //   }
          // },
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: this.selectObject
            }
          },
          valuePrepareFunction: (value) => { 
            return this.selectObject[value].title;
          }
        }
      },
      pager: {
        perPage: 5
      },
      attr: {
        class: 'table table-bordered'
      },
      // add: {
      //   // addButtonContent: '<i class="fas fa-address-card"></i>',
      //   // createButtonContent: '<i class="ion-checkmark"></i>',
      //   // cancelButtonContent: '<i class="ion-close"></i>',
      //   confirmCreate: true
      // },
      // edit: {
      //   // editButtonContent: '<i class="ion-edit"></i>',
      //   // saveButtonContent: '<i class="ion-checkmark"></i>',
      //   // cancelButtonContent: '<i class="ion-close"></i>',
      //   confirmSave: true
      // },
      // delete: {
      //   // deleteButtonContent: '<i class="ion-trash-a"></i>',
      //   confirmDelete: true
      // },
    };
    this.loadData();
    this.initForm();
  }

  resetValue(){
    for(let key of Object.keys(this.studentObject)){
      this.studentObject[key].value = "";
    }
    this.studentObject['permission'].value =  Permission.Student
    this.initForm();
  }

  initForm(){
    this.formStudent = this.formBuilder.group({
      fullname: [this.studentObject['fullname'].value, this.studentObject['fullname'].validators],
      code: [this.studentObject['code'].value, this.studentObject['code'].validators],
      class: [this.studentObject['class'].value, this.studentObject['class'].validators],
      username: [this.studentObject['username'].value, this.studentObject['username'].validators],
      vnuEmail: [this.studentObject['vnuEmail'].value, this.studentObject['vnuEmail'].validators],
      permission: [this.studentObject['permission'].value, this.studentObject['permission'].validators],
      password: [this.studentObject['password'].value, this.studentObject['password'].validators],
    })
  }

  loadData(){
    this.manageAccountStudentService.getAll().subscribe(
      studentsRes => {
        this.source.reset(false);
        this.source.load(studentsRes);
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  constructor(
    private manageAccountStudentService: ManageAccountStudentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.source = new LocalDataSource();
  }

  onUserRowSelect(event){
    this.copyValue(event.data);
    this.action = TypeAction.View;
    this.detailModal.show();
  }

  onCreate(){
    this.action = TypeAction.Create;
    this.detailModal.show();
  }

  onEdit(event){
    this.copyValue(event.data);
    this.initForm();
    this.action = TypeAction.Edit;
    this.detailModal.show();
  }

  onDelete(event){
    let check = confirm("Bạn muốn xóa thông tin tài khoản sinh viên " + event.data.fullname + " ?");
    if(check){
      this.manageAccountStudentService._delete(event.data._id).subscribe(
        message => {
          this.source.remove(event.data);
          alert(message);
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
    // this.manageAccountStudentService.find().subscribe(
    //   studentsRes => {
    //     this.source.reset(false);
    //     this.source.load(studentsRes);
    //   },
    //   error => {
    //     alert(error);
    //     // this.router.navigate(['/error', id ])
    //   }
    // )
  }
  
  // filterData(){
  //   this.students = this.dataRes.filter((jsonData) => {
  //     let filter = this.standardString(this.keyFilter);
  //     return this.standardString(jsonData.code).includes(filter)
  //         || this.standardString(jsonData.fullname).includes(filter)
  //         || this.standardString(jsonData.class).includes(filter)
  //         || this.standardString(jsonData.username).includes(filter)
  //         || this.standardString(jsonData.vnuEmail).includes(filter)
  //   })
  // }

  // private standardString(unStandardString){
  //   return unStandardString.toLocaleLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  // }


  importFile(event){
    if(event.target.files[0]){
      let check = confirm("Bạn muốn nhập danh sách sinh viên này: " + event.target.files[0].name + " ?");
      if(check){
        this.manageAccountStudentService.importFile(event.target.files[0]).subscribe(
          studentsRes => {
            this.loadData();
            if(studentsRes.dataRejects.length > 0){
              this.errInfo = studentsRes.dataRejects;
              this.errInfoModal.show();
            } else {
              alert('Thêm các sinh viên thành công');
            }
          },
          error => {
            alert(error.message);
            // this.router.navigate(['/error', id ])
          }
        )
      }
      this.file.nativeElement.value = "";
    }
  }

  onSubmit(){
    if(!this.formStudent.invalid){
      if(this.action == TypeAction.Create){
        this.manageAccountStudentService.create(this.formStudent.value).subscribe(
          student => {
            alert('Tạo thành công tài khoản: ' + student.fullname);
            this.detailModal.hide();
          },
          error => {
            alert(error);
            // this.router.navigate(['/error', id ])
          }
        )
      } else if(this.action == TypeAction.Edit){
        this.manageAccountStudentService.update(this.studentObject['_id'].value, this.formStudent.value).subscribe(
          student => {
            alert('Chỉnh sửa thành công tài khoản: ' + student.fullname);
            this.detailModal.hide();
          },
          error => {
            alert(error);
            // this.router.navigate(['/error', id ])
          }
        )
      }
    }
  }

  copyValue(data){
    for(let key of Object.keys(data)){
      if(this.studentObject[key])
        this.studentObject[key].value = data[key];
    }
  }

}
