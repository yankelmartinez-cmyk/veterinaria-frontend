export class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public telefono: string | null,
        public email: string | null,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
}