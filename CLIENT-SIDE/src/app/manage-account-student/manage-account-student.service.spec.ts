import { TestBed } from '@angular/core/testing';

import { ManageAccountStudentService } from './manage-account-student.service';

describe('ManageAccountStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAccountStudentService = TestBed.get(ManageAccountStudentService);
    expect(service).toBeTruthy();
  });
});
