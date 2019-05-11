import { TestBed } from '@angular/core/testing';

import { CrudActionsManageService } from './crud-actions-manage.service';

describe('CrudActionsManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudActionsManageService = TestBed.get(CrudActionsManageService);
    expect(service).toBeTruthy();
  });
});
