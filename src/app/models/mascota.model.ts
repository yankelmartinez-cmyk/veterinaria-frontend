export class Mascota {
    constructor(
        public id: number,
        public nombre: string,
        public idTipoMascota: number,
        public idCliente: number,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
}