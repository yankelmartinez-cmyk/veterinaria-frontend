export class Veterinario {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public especialidad: string | null,
        public telefono: string | null,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
} 