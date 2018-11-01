import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSurveyClassComponent } from './manage-survey-class.component';

describe('ManageSurveyClassComponent', () => {
  let component: ManageSurveyClassComponent;
  let fixture: ComponentFixture<ManageSurveyClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSurveyClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSurveyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
