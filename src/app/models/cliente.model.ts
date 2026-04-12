export class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public telefono: string | null,
        public correo: string | null,
        public direccion: string | null,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
}  