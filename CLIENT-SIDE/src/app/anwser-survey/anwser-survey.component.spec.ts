import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnwserSurveyComponent } from './anwser-survey.component';

describe('AnwserSurveyComponent', () => {
  let component: AnwserSurveyComponent;
  let fixture: ComponentFixture<AnwserSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnwserSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnwserSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
