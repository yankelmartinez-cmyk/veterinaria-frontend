import { Routes } from '@angular/router';
import { AdminCitas } from './pages/admin-citas/admin-citas';

export const routes: Routes = [
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: 'citas', component: AdminCitas }
];