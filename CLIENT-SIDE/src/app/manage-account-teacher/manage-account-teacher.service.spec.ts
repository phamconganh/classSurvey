import { TestBed } from '@angular/core/testing';

import { ManageAccountTeacherService } from './manage-account-teacher.service';

describe('ManageAccountTeacherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAccountTeacherService = TestBed.get(ManageAccountTeacherService);
    expect(service).toBeTruthy();
  });
});
