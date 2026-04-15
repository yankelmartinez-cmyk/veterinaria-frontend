import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVeterinaria } from '../../services/api-veterinaria';
import { TipoMascota } from '../../models/tipo-mascota.model';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-tipos-mascota',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-tipos-mascota.html',
  styleUrl: './admin-tipos-mascota.css'
})
export class AdminTiposMascota implements OnInit {

  public tiposMascota: TipoMascota[] = [];

  public tipoMascotaId: number = 0;
  public nombre: string = '';
  public descripcion: string = '';
  public activo: boolean = true;
  public fechaCreacion: Date = new Date();
  public accionModal: string = 'Guardar';

  public modal: any;

  constructor(private api: ApiVeterinaria, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerTiposMascota();
  }

  ngAfterViewInit() {
    const modal = document.getElementById('modalTiposMascota');
    this.modal = new bootstrap.Modal(modal);
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

  guardarTipoMascota(): void {
    if (!this.nombre || this.nombre.trim() === '') {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (this.accionModal.toUpperCase() === 'GUARDAR') {
      this.agregarTipoMascota();
    } else {
      this.actualizarTipoMascota();
    }
  }

  agregarTipoMascota(): void {
    const tipoMascota: TipoMascota = new TipoMascota(
      0,
      this.nombre,
      this.descripcion || null,
      true,
      new Date()
    );

    this.api.agregarTipoMascota(tipoMascota).subscribe({
      next: () => {
        this.obtenerTiposMascota();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  actualizarTipoMascota(): void {
    const tipoMascota: TipoMascota = new TipoMascota(
      this.tipoMascotaId,
      this.nombre,
      this.descripcion || null,
      this.activo,
      this.fechaCreacion
    );

    this.api.actualizarTipoMascota(this.tipoMascotaId, tipoMascota).subscribe({
      next: () => {
        this.obtenerTiposMascota();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalEditar(tipo: TipoMascota): void {
    this.accionModal = 'Actualizar';
    this.tipoMascotaId = tipo.id;
    this.nombre = tipo.nombre;
    this.descripcion = tipo.descripcion || '';
    this.activo = tipo.activo;
    this.fechaCreacion = tipo.fechaCreacion;
    this.modal.show();
  }

  eliminarTipoMascota(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este tipo de mascota?')) return;

    this.api.eliminarTipoMascota(id).subscribe({
      next: () => { this.obtenerTiposMascota(); },
      error: (error) => { console.log(error); }
    });
  }

  inicializarControles(): void {
    this.tipoMascotaId = 0;
    this.nombre = '';
    this.descripcion = '';
    this.activo = true;
    this.fechaCreacion = new Date();
  }

  formatearFecha(fecha: Date): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-HN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}