import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiposMascota } from './admin-tipos-mascota';

describe('AdminTiposMascota', () => {
  let component: AdminTiposMascota;
  let fixture: ComponentFixture<AdminTiposMascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTiposMascota]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTiposMascota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
