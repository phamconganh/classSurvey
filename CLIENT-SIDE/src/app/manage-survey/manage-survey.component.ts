import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeAction } from '../app.entity';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { currentId } from 'async_hooks';

@Component({
  selector: 'app-manage-survey',
  templateUrl: './manage-survey.component.html',
  styleUrls: ['./manage-survey.component.css']
})



export class ManageSurveyComponent implements OnInit {

  data = {
    isActive: true,
    createdAt: '10-10-2018',
    modifiedAt: '11-11-2018',
    idClassSection:  {
        semester: '1',
        idTeacher: 'pnt',
        time: '',
        location: '',
        code: '',
        name: 'Phat trien ung dung web',
        creditNumber: 123,
        idStudents: []
    },
    semester: '1',
    survey: [{
        section: 'Co so vat chat',
        dataSection: [{
            question: 'So luong gian duong dap ung day du'
        }, {
          question: 'Chat luong gian duong'
        }]
    }, {
      section: 'Hoat dong giang day',
        dataSection: [{
            question: 'Truyen dat day du kien thuc'
        }, {
          question: 'Mo rong kien thuc thuc te'
        }]
    }]
  };

  show = true;
  settings: object;
  source: LocalDataSource;
  formSurvey: FormGroup;

  constructor(private formbuilder: FormBuilder) {}

  @ViewChild('detailModal') detailModal: ModalDirective;
  @ViewChild('queryModal') queryModal: ModalDirective;
  @ViewChild('nameSectionModal') nameSectionModal: ModalDirective;

  action: TypeAction;

  ngOnInit() {
    this.action = TypeAction.View;
    this.formSurvey = this.formbuilder.group({
      test: '',
      editName: '',
      query: '',
    });
  }

  onCreate() {
    this.action = TypeAction.Create;
    this.detailModal.show();
  }

  onCreateQuery() {
    this.action = TypeAction.Create;
    this.queryModal.show();
  }

  // current = ...

  editNameSection(data) {
    // current = data;
    this.action = TypeAction.Create;
    this.nameSectionModal.show();
  }

  onSubmit() {
    const newSection = this.formSurvey.value.test;
    this.data.survey.push({
      section: newSection,
      dataSection: []
    });
    console.log('new Data: ' + this.data);
    alert('Nhom cau hoi ' + newSection + ' da duoc them thanh cong' );
    this.detailModal.hide();
  }

  onSubmitNameSection() {
    const newNameSection = this.formSurvey.value.editName;
    this.data.survey.forEach(e => {
    });
  }

  onQuerySubmit() {
    const newQuery = this.formSurvey.value.query;

    console.log('new Data: ' + this.data);
    alert('Nhom cau hoi ' + newQuery + ' da duoc them thanh cong' );
    this.queryModal.hide();
  }

}

/*
isActive: Boolean, da publish hay chua
createdAt: String,
modifiedAt: String,
idClassSection: 'int3306',
[
    semester: String,
    idTeacher: String,
    time: String,
    location: String,
    code: String,
    name: String,
    creditNumber: Number,
    idStudents: [String]
]
semester: String,
data: [{
    section: String,
    dataSection: [{
        question: String
    }]
}]

idSurveyForm: {type: Schema.Types.ObjectId, ref: 'SurveyForm'},
idClassSection: {type: Schema.Types.ObjectId, ref: 'ClassSection'},
data: [String]

json -> conver sang string

 */