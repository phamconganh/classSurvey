import { TestBed } from '@angular/core/testing';

import { ManageSurveyService } from './manage-survey.service';

describe('ManageSurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageSurveyService = TestBed.get(ManageSurveyService);
    expect(service).toBeTruthy();
  });
});
