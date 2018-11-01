import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerErrorComponent } from './handler-error.component';

describe('HandlerErrorComponent', () => {
  let component: HandlerErrorComponent;
  let fixture: ComponentFixture<HandlerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
