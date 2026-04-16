import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiVeterinaria } from '../../services/api-veterinaria';
import { Veterinario } from '../../models/veterinario.model';
import Swal from 'sweetalert2';
 
declare var bootstrap: any;

@Component({
  selector: 'app-admin-veterinarios',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-veterinarios.html',
  styleUrl: './admin-veterinarios.css'
})
export class AdminVeterinarios implements OnInit {

  public veterinarios: Veterinario[] = [];

  public veterinarioId: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public especialidad: string = '';
  public telefono: string = '';
  public accionModal: string = 'Guardar';

  public modal: any;

  constructor(private api: ApiVeterinaria, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerVeterinarios();
  }

  ngAfterViewInit() {
    const modal = document.getElementById('modalVeterinarios');
    this.modal = new bootstrap.Modal(modal);
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

  guardarVeterinario(): void {
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
      this.agregarVeterinario();
    } else {
      this.actualizarVeterinario();
    }
  }

  agregarVeterinario(): void {
    const veterinario: Veterinario = new Veterinario(
      0,
      this.nombre,
      this.apellido,
      this.especialidad || null,
      this.telefono || null,
      true,
      new Date()
    );

    this.api.agregarVeterinario(veterinario).subscribe({
      next: () => {
        this.obtenerVeterinarios();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  actualizarVeterinario(): void {
    const veterinario: Veterinario = new Veterinario(
      this.veterinarioId,
      this.nombre,
      this.apellido,
      this.especialidad || null,
      this.telefono || null,
      true,
      new Date()
    );

    this.api.actualizarVeterinario(this.veterinarioId, veterinario).subscribe({
      next: () => {
        this.obtenerVeterinarios();
        this.modal.hide();
      },
      error: (error) => { console.log(error); }
    });
  }

  abrirModalEditar(v: Veterinario): void {
    this.accionModal = 'Actualizar';
    this.veterinarioId = v.id;
    this.nombre = v.nombre;
    this.apellido = v.apellido;
    this.especialidad = v.especialidad || '';
    this.telefono = v.telefono || '';
    this.modal.show();
  }

  eliminarVeterinario(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este veterinario?')) return;
    this.api.eliminarVeterinario(id).subscribe({
      next: () => { this.obtenerVeterinarios(); },
      error: (error) => { console.log(error); }
    });
  }

  inicializarControles(): void {
    this.veterinarioId = 0;
    this.nombre = '';
    this.apellido = '';
    this.especialidad = '';
    this.telefono = '';
  }
}