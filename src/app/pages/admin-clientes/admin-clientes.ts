import Swal from 'sweetalert2';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVeterinaria } from '../../services/api-veterinaria';
import { Cliente } from '../../models/cliente.model';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-clientes',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-clientes.html',
  styleUrl: './admin-clientes.css'
})
export class AdminClientes implements OnInit {

  public clientes: Cliente[] = [];
  public clienteId: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public telefono: string = '';
  public correo: string = '';
  public direccion: string = '';
  public accionModal: string = 'Guardar';
  public modal: any;

  constructor(private api: ApiVeterinaria, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.obtenerClientes(); }

  ngAfterViewInit() {
    const modal = document.getElementById('modalClientes');
    this.modal = new bootstrap.Modal(modal);
  }

  obtenerClientes() {
    this.api.obtenerClientes().subscribe({
      next: (data) => { this.clientes = data; this.cdr.detectChanges(); },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalAgregar(): void {
    this.accionModal = 'Guardar';
    this.inicializarControles();
    this.modal.show();
  }

  guardarCliente(): void {
    if (!this.nombre || !this.apellido) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Por favor completa todos los campos obligatorios.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (this.accionModal.toUpperCase() === 'GUARDAR') {
      this.agregarCliente();
    } else {
      this.actualizarCliente();
    }
  }

  agregarCliente(): void {
    const cliente: Cliente = new Cliente(0, this.nombre, this.apellido, this.telefono || null, this.correo || null, this.direccion || null, true, new Date());
    this.api.agregarCliente(cliente).subscribe({
      next: () => { this.obtenerClientes(); this.modal.hide(); },
      error: (error) => { console.log(error); }
    });
  }

  actualizarCliente(): void {
    const cliente: Cliente = new Cliente(this.clienteId, this.nombre, this.apellido, this.telefono || null, this.correo || null, this.direccion || null, true, new Date());
    this.api.actualizarCliente(this.clienteId, cliente).subscribe({
      next: () => { this.obtenerClientes(); this.modal.hide(); },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalEditar(cliente: Cliente): void {
    this.accionModal = 'Actualizar';
    this.clienteId = cliente.id;
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.telefono = cliente.telefono || '';
    this.correo = cliente.correo || '';
    this.direccion = cliente.direccion || '';
    this.modal.show();
  }

  eliminarCliente(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
    this.api.eliminarCliente(id).subscribe({
      next: () => { this.obtenerClientes(); },
      error: (error) => { console.log(error); }
    });
  }

  inicializarControles(): void {
    this.clienteId = 0;
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.correo = '';
    this.direccion = '';
  }
}
