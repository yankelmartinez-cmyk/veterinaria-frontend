import { TestBed } from '@angular/core/testing';

import { ApiVeterinaria } from './api-veterinaria';

describe('ApiVeterinaria', () => {
  let service: ApiVeterinaria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVeterinaria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
