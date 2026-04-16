import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVeterinaria } from '../../services/api-veterinaria';
import { Cita } from '../../models/cita.model';
import { Mascota } from '../../models/mascota.model';
import { Veterinario } from '../../models/veterinario.model';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-citas',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-citas.html',
  styleUrl: './admin-citas.css'
})
export class AdminCitas implements OnInit {

  public citas: Cita[] = [];
  public mascotas: Mascota[] = [];
  public veterinarios: Veterinario[] = [];

  public citaId: number = 0;
  public fechaHora: string = '';
  public motivo: string = '';
  public diagnostico: string = '';
  public idMascota: number = 0;
  public idVeterinario: number = 0;
  public accionModal: string = 'Guardar';

  public modal: any;

  constructor(private api: ApiVeterinaria, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerCitas();
    this.obtenerMascotas();
    this.obtenerVeterinarios();
  }

  ngAfterViewInit() {
    const modal = document.getElementById('modalCitas');
    this.modal = new bootstrap.Modal(modal);
  }

  obtenerCitas() {
    this.api.obtenerCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.cdr.detectChanges();
      },
      error: (error) => { console.log(error); }
    });
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

  obtenerVeterinarios() {
    this.api.obtenerVeterinarios().subscribe({
      next: (data) => {
        this.veterinarios = data;
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

 guardarCita(): void {
  if (!this.fechaHora || !this.motivo || this.idMascota === 0 || this.idVeterinario === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos obligatorios',
      text: 'Por favor completa todos los campos obligatorios.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
  if (this.accionModal.toUpperCase() === 'GUARDAR') {
    this.agregarCita();
  } else {
    this.actualizarCita();
  }
}

  agregarCita(): void {
    const cita: Cita = new Cita(
      0,
      new Date(this.fechaHora),
      this.motivo,
      this.diagnostico || null,
      this.idMascota,
      this.idVeterinario,
      true,
      new Date()
    );

    this.api.agregarCita(cita).subscribe({
      next: () => {
        this.obtenerCitas();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  actualizarCita(): void {
    const cita: Cita = new Cita(
      this.citaId,
      new Date(this.fechaHora),
      this.motivo,
      this.diagnostico || null,
      this.idMascota,
      this.idVeterinario,
      true,
      new Date()
    );

    this.api.actualizarCita(this.citaId, cita).subscribe({
      next: () => {
        this.obtenerCitas();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalEditar(cita: Cita): void {
    this.accionModal = 'Actualizar';
    this.citaId = cita.id;
    this.motivo = cita.motivo;
    this.diagnostico = cita.diagnostico || '';
    this.idMascota = cita.idMascota;
    this.idVeterinario = cita.idVeterinario;
    const fecha = new Date(cita.fechaHora);
    this.fechaHora = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 16);
    this.modal.show();
  }

  eliminarCita(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta cita?')) return;
    this.api.eliminarCita(id).subscribe({
      next: () => { this.obtenerCitas(); },
      error: (error) => { console.log(error); }
    });
  }

  inicializarControles(): void {
    this.citaId = 0;
    this.fechaHora = '';
    this.motivo = '';
    this.diagnostico = '';
    this.idMascota = 0;
    this.idVeterinario = 0;
  }

  getNombreMascota(id: number): string {
    const m = this.mascotas.find(x => x.id === id);
    return m ? m.nombre : `#${id}`;
  }

  getNombreVeterinario(id: number): string {
    const v = this.veterinarios.find(x => x.id === id);
    return v ? `${v.nombre} ${v.apellido}` : `#${id}`;
  }

  formatearFecha(fecha: Date): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleString('es-HN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}