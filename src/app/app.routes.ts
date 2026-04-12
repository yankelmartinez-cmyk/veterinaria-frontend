import { Routes } from '@angular/router';
import { AdminVeterinarios } from './pages/admin-veterinarios/admin-veterinarios';

export const routes: Routes = [
  { path: '', redirectTo: 'veterinarios', pathMatch: 'full' },
  { path: 'veterinarios', component: AdminVeterinarios }
];
