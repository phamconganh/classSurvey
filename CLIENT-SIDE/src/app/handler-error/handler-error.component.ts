import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-handler-error',
  templateUrl: './handler-error.component.html',
  styleUrls: ['./handler-error.component.css']
})
export class HandlerErrorComponent implements OnInit {

  message = '404 - PAGE NOT FOUND';
  subMessage = 'The page you are looking for might have been removed had its name changed or is temporarily unavailable.';

  constructor() { }

  ngOnInit() {
  }

}
