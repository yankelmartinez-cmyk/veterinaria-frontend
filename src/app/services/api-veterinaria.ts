import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Cliente } from '../models/cliente.model';
import { Mascota } from '../models/mascota.model';
import { Veterinario } from '../models/veterinario.model';
import { TipoMascota } from '../models/tipo-mascota.model';

@Injectable({
  providedIn: 'root',
})
export class ApiVeterinaria {

  private apiUrl = "https://localhost:7044/api"

  constructor(private httpClient: HttpClient) {}

  // Citas
  obtenerCitas() {
    return this.httpClient.get<Cita[]>(`${this.apiUrl}/Citas`);
  }
  agregarCita(cita: Cita) {
    return this.httpClient.post<any>(`${this.apiUrl}/Citas`, cita);
  }
  actualizarCita(id: number, cita: Cita) {
    return this.httpClient.put<any>(`${this.apiUrl}/Citas/${id}`, cita);
  }
  eliminarCita(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/Citas/${id}`);
  }

  // Clientes
  obtenerClientes() {
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/Clientes`);
  }
  agregarCliente(cliente: Cliente) {
    return this.httpClient.post<any>(`${this.apiUrl}/Clientes`, cliente);
  }
  actualizarCliente(id: number, cliente: Cliente) {
    return this.httpClient.put<any>(`${this.apiUrl}/Clientes/${id}`, cliente);
  }
  eliminarCliente(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/Clientes/${id}`);
  }

  // Mascotas
  obtenerMascotas() {
    return this.httpClient.get<Mascota[]>(`${this.apiUrl}/Mascotas`);
  }
  agregarMascota(mascota: Mascota) {
    return this.httpClient.post<any>(`${this.apiUrl}/Mascotas`, mascota);
  }
  actualizarMascota(id: number, mascota: Mascota) {
    return this.httpClient.put<any>(`${this.apiUrl}/Mascotas/${id}`, mascota);
  }
  eliminarMascota(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/Mascotas/${id}`);
  }

  // Veterinarios
  obtenerVeterinarios() {
    return this.httpClient.get<Veterinario[]>(`${this.apiUrl}/Veterinarios`);
  }
  agregarVeterinario(veterinario: Veterinario) {
    return this.httpClient.post<any>(`${this.apiUrl}/Veterinarios`, veterinario);
  }
  actualizarVeterinario(id: number, veterinario: Veterinario) {
    return this.httpClient.put<any>(`${this.apiUrl}/Veterinarios/${id}`, veterinario);
  }
  eliminarVeterinario(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/Veterinarios/${id}`);
  }

  // TiposMascota
  obtenerTiposMascota() {
    return this.httpClient.get<TipoMascota[]>(`${this.apiUrl}/TiposMascota`);
  }
  agregarTipoMascota(tipoMascota: TipoMascota) {
    return this.httpClient.post<any>(`${this.apiUrl}/TiposMascota`, tipoMascota);
  }
  actualizarTipoMascota(id: number, tipoMascota: TipoMascota) {
    return this.httpClient.put<any>(`${this.apiUrl}/TiposMascota/${id}`, tipoMascota);
  }
  eliminarTipoMascota(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/TiposMascota/${id}`);
  }
}