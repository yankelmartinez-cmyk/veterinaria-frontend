import { Routes } from '@angular/router';
import { AdminCitas } from './pages/admin-citas/admin-citas';
import { AdminVeterinarios } from './pages/admin-veterinarios/admin-veterinarios';
import { AdminTiposMascota } from './pages/admin-tipos-mascota/admin-tipos-mascota';

export const routes: Routes = [
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: 'citas', component: AdminCitas },
  { path: 'veterinarios', component: AdminVeterinarios },
  { path: 'tipos-mascota', component: AdminTiposMascota }
];