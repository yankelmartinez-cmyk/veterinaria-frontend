export class TipoMascota {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string | null,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
} 