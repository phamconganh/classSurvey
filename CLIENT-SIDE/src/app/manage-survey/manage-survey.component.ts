import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeAction } from '../app.entity';

@Component({
  selector: 'app-manage-survey',
  templateUrl: './manage-survey.component.html',
  styleUrls: ['./manage-survey.component.css']
})



export class ManageSurveyComponent implements OnInit {

  data: object = {
    nameSubject: 'WAP',
    directories: [
      {
        nameDirectory: 'Co so vat chat',
        listQuery: [
          {
            nameQuery: 'So luong giang duong',
            typeQuery: 1 
          },{
            nameQuery: 'Chat luogn giang duong',
            typeQuery: 1
          }
        ]
      },{
        nameDirectory: 'Dong gop y kien',
        listQuery: [
          {
            nameQuery: 'Y kien cua ban',
            typeQuery: 2 
          }
        ]
      }
    ]
  };

  show: boolean = true;
  
  settings: object;
  source: LocalDataSource;

  constructor() {}

  @ViewChild('detailModal') detailModal: ModalDirective;
  @ViewChild('queryModal') queryModal: ModalDirective;

  action: TypeAction;

  ngOnInit() {
    this.action = TypeAction.View;
  }

  onCreate(){
    this.action = TypeAction.Create;
    this.detailModal.show();
  }

  onCreateQuery(){
    this.action = TypeAction.Create;
    this.queryModal.show()
  }

  onSubmit(){

  }

}
