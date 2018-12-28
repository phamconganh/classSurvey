import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-anwser-survey',
  templateUrl: './anwser-survey.component.html',
  styleUrls: ['./anwser-survey.component.css']
})
export class AnwserSurveyComponent implements OnInit {

  constructor() { }

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

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;

  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  onClickx(rating: number, queryId: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

}
