
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageAccountTeacherService } from "./manage-account-teacher.service";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { Permission, TypeAction, TypeInput, TypeValid, SelectObject } from "../app.entity";

@Component({
  selector: 'app-manage-account-teacher',
  templateUrl: './manage-account-teacher.component.html',
  styleUrls: ['./manage-account-teacher.component.css']
})

export class ManageAccountTeacherComponent implements OnInit {

  Permission = Permission;
  TypeAction = TypeAction;
  TypeInput = TypeInput;
  TypeValid = TypeValid;
  selectObject = SelectObject;

  @ViewChild('detailModal') detailModal: ModalDirective;
  @ViewChild('errInfoModal') errInfoModal: ModalDirective;
  @ViewChild('file') file: ElementRef;
  formTeacher: FormGroup;

  errInfo: Array<any>;

  description: string;

  keySearch: string;

  source: LocalDataSource;

  action: TypeAction;

  settings : object;

  teacherObject: object;

  objectKey: Array<string>;
  objectKeyView: Array<string>;

  ngOnInit() {
    this.action = TypeAction.View;
    this.description = "Quản lý tài khoản cán bộ";

    this.teacherObject = {
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
        title: "Mã cán bộ",
        name: "code",
        value: "",
        type: TypeInput.Text,
        valid: [{
          key: TypeValid.Pattern,
          message: "Mã cán bộ không đúng định dạng"
        }],
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$')
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
        value: Permission.Teacher,
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
    }

    this.objectKey = Object.keys(this.teacherObject);
    this.objectKey.splice(0, 1);
    this.objectKeyView = Object.keys(this.teacherObject);
    this.objectKeyView.splice(0, 1);
    this.objectKeyView.splice(this.objectKeyView.length - 1, 1);

    this.settings = {
      mode: 'external',
      columns: {
        code: {
          title: 'Mã cán bộ',
          width: '15%'
        },
        fullname: {
          title: 'Họ và tên',
          width: '20%'
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
      add: {
        addButtonContent: '<i class="fas fa-address-card">Thêm</i>',
      },
      edit: {
        editButtonContent: '<i class="fas fa-edit"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-trash"></i>',
      },
    };
    this.loadData();
    this.initForm();
  }

  resetValue(){
    for(let key of Object.keys(this.teacherObject)){
      this.teacherObject[key].value = "";
    }
    this.teacherObject['permission'].value =  Permission.Teacher
    this.initForm();
  }

  initForm(){
    this.formTeacher = this.formBuilder.group({
      fullname: [this.teacherObject['fullname'].value, this.teacherObject['fullname'].validators],
      code: [this.teacherObject['code'].value, this.teacherObject['code'].validators],
      username: [this.teacherObject['username'].value, this.teacherObject['username'].validators],
      vnuEmail: [this.teacherObject['vnuEmail'].value, this.teacherObject['vnuEmail'].validators],
      permission: [this.teacherObject['permission'].value, this.teacherObject['permission'].validators],
      password: [this.teacherObject['password'].value, this.teacherObject['password'].validators],
    })
  }

  loadData(){
    this.manageAccountTeacherService.getAll().subscribe(
      teachersRes => {
        this.source.reset(false);
        this.source.load(teachersRes);
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  constructor(
    private manageAccountTeacherService: ManageAccountTeacherService,
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
    let check = confirm("Bạn muốn xóa thông tin tài khoản cán bộ " + event.data.fullname + " ?");
    if(check){
      this.manageAccountTeacherService._delete(event.data._id).subscribe(
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
    this.manageAccountTeacherService.find(this.keySearch).subscribe(
      teachersRes => {
        this.source.reset(false);
        this.source.load(teachersRes);
        this.keySearch = null;
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  importFile(event){
    if(event.target.files[0]){
      let check = confirm("Bạn muốn nhập danh sách cán bộ này: " + event.target.files[0].name + " ?");
      if(check){
        this.manageAccountTeacherService.importFile(event.target.files[0]).subscribe(
          teachersRes => {
            this.loadData();
            if(teachersRes.dataRejects.length > 0){
              this.errInfo = teachersRes.dataRejects;
              this.errInfoModal.show();
            } else {
              alert('Thêm các cán bộ thành công');
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

  exportFile(){
    this.manageAccountTeacherService.exportFile().subscribe(
      file => {
        // console.log(file);
        // can chinh sua ten file
        let blob = new Blob([file.body], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        let downloadUrl= window.URL.createObjectURL(blob);
        window.open(downloadUrl);
      },
      error => {
        alert(error);
        // this.router.navigate(['/error', id ])
      }
    )
  }

  onSubmit(){
    if(!this.formTeacher.invalid){
      if(this.action == TypeAction.Create){
        this.manageAccountTeacherService.create(this.formTeacher.value).subscribe(
          teacher => {
            alert('Tạo thành công tài khoản: ' + teacher.fullname);
            this.loadData();
            this.detailModal.hide();
          },
          error => {
            alert(error);
            // this.router.navigate(['/error', id ])
          }
        )
      } else if(this.action == TypeAction.Edit){
        this.manageAccountTeacherService.update(this.teacherObject['_id'].value, this.formTeacher.value).subscribe(
          teacher => {
            alert('Chỉnh sửa thành công tài khoản: ' + teacher.fullname);
            this.loadData();
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
      if(this.teacherObject[key])
        this.teacherObject[key].value = data[key];
    }
  }

}
