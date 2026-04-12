export class TipoMascota {
    constructor(
        public id: number,
        public nombre: string,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
}