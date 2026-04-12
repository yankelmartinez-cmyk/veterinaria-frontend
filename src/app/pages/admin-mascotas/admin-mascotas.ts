import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVeterinaria } from '../../services/api-veterinaria';
import { Mascota } from '../../models/mascota.model';
import { Cliente } from '../../models/cliente.model';
import { TipoMascota } from '../../models/tipo-mascota.model';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-mascotas',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-mascotas.html',
  styleUrl: './admin-mascotas.css'
})
export class AdminMascotas implements OnInit {

  public mascotas: Mascota[] = [];
  public clientes: Cliente[] = [];
  public tiposMascota: TipoMascota[] = [];

  public mascotaId: number = 0;
  public nombre: string = '';
  public fechaNacimiento: string = '';
  public idCliente: number = 0;
  public idTipoMascota: number = 0;
  public accionModal: string = 'Guardar';

  public modal: any;

  constructor(private api: ApiVeterinaria, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerMascotas();
    this.obtenerClientes();
    this.obtenerTiposMascota();
  }

  ngAfterViewInit() {
    const modal = document.getElementById('modalMascotas');
    this.modal = new bootstrap.Modal(modal);
  }

  obtenerMascotas() {
    this.api.obtenerMascotas().subscribe({
      next: (data) => {
        this.mascotas = data;
        this.cdr.detectChanges();
      },
      error: (error) => { console.log(error); }
    });
  }

  obtenerClientes() {
    this.api.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cdr.detectChanges();
      },
      error: (error) => { console.log(error); }
    });
  }

  obtenerTiposMascota() {
    this.api.obtenerTiposMascota().subscribe({
      next: (data) => {
        this.tiposMascota = data;
        this.cdr.detectChanges();
      },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalAgregar(): void {
    this.accionModal = 'Guardar';
    this.inicializarControles();
    this.modal.show();
  }

  guardarMascota(): void {
    if (!this.nombre || this.idCliente === 0 || this.idTipoMascota === 0) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (this.accionModal.toUpperCase() === 'GUARDAR') {
      this.agregarMascota();
    } else {
      this.actualizarMascota();
    }
  }

  agregarMascota(): void {
    const mascota: Mascota = new Mascota(
      0,
      this.nombre,
      this.fechaNacimiento ? new Date(this.fechaNacimiento) : null,
      this.idCliente,
      this.idTipoMascota,
      true,
      new Date()
    );

    this.api.agregarMascota(mascota).subscribe({
      next: () => {
        this.obtenerMascotas();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  actualizarMascota(): void {
    const mascota: Mascota = new Mascota(
      this.mascotaId,
      this.nombre,
      this.fechaNacimiento ? new Date(this.fechaNacimiento) : null,
      this.idCliente,
      this.idTipoMascota,
      true,
      new Date()
    );

    this.api.actualizarMascota(this.mascotaId, mascota).subscribe({
      next: () => {
        this.obtenerMascotas();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalEditar(mascota: Mascota): void {
    this.accionModal = 'Actualizar';
    this.mascotaId = mascota.id;
    this.nombre = mascota.nombre;
    this.idCliente = mascota.idCliente;
    this.idTipoMascota = mascota.idTipoMascota;
    if (mascota.fechaNacimiento) {
      const fecha = new Date(mascota.fechaNacimiento);
      this.fechaNacimiento = fecha.toISOString().slice(0, 10);
    }
    this.modal.show();
  }

  eliminarMascota(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta mascota?')) return;
    this.api.eliminarMascota(id).subscribe({
      next: () => { this.obtenerMascotas(); },
      error: (error) => { console.log(error); }
    });
  }

  inicializarControles(): void {
    this.mascotaId = 0;
    this.nombre = '';
    this.fechaNacimiento = '';
    this.idCliente = 0;
    this.idTipoMascota = 0;
  }

  getNombreCliente(id: number): string {
    const c = this.clientes.find(x => x.id === id);
    return c ? `${c.nombre} ${c.apellido}` : `#${id}`;
  }

  getNombreTipoMascota(id: number): string {
    const t = this.tiposMascota.find(x => x.id === id);
    return t ? t.nombre : `#${id}`;
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-HN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
}