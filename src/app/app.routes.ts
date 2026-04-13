import { Routes } from '@angular/router';
import { AdminCitas } from './pages/admin-citas/admin-citas';
import { AdminVeterinarios } from './pages/admin-veterinarios/admin-veterinarios';
import { AdminMascotas } from './pages/admin-mascotas/admin-mascotas';
import { AdminClientes } from './pages/admin-clientes/admin-clientes';

export const routes: Routes = [
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: 'citas', component: AdminCitas },
  { path: 'veterinarios', component: AdminVeterinarios },
  { path: 'mascotas', component: AdminMascotas },
  { path: 'clientes', component: AdminClientes }
];



