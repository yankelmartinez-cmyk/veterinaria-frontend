import { Routes } from '@angular/router';
import { AdminCitas } from './pages/admin-citas/admin-citas';
import { AdminVeterinarios } from './pages/admin-veterinarios/admin-veterinarios';

export const routes: Routes = [
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: 'citas', component: AdminCitas },
  { path: 'veterinarios', component: AdminVeterinarios }
];