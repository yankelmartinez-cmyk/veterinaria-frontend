import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMascotas } from './admin-mascotas';

describe('AdminMascotas', () => {
  let component: AdminMascotas;
  let fixture: ComponentFixture<AdminMascotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMascotas],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMascotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
