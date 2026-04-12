export class Mascota {
    constructor(
        public id: number,
        public nombre: string,
        public fechaNacimiento: Date | null,
        public idCliente: number,
        public idTipoMascota: number,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
} 
