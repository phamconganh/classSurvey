import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountStudentComponent } from './manage-account-student.component';

describe('ManageAccountStudentComponent', () => {
  let component: ManageAccountStudentComponent;
  let fixture: ComponentFixture<ManageAccountStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
