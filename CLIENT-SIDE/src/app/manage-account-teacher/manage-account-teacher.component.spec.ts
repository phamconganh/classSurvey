import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountTeacherComponent } from './manage-account-teacher.component';

describe('ManageAccountTeacherComponent', () => {
  let component: ManageAccountTeacherComponent;
  let fixture: ComponentFixture<ManageAccountTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
