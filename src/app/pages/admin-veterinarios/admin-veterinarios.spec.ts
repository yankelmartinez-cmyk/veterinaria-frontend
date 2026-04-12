import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVeterinarios } from './admin-veterinarios';

describe('AdminVeterinarios', () => {
  let component: AdminVeterinarios;
  let fixture: ComponentFixture<AdminVeterinarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVeterinarios],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVeterinarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
