export class Cita {
    constructor(
        public id: number,
        public fechaHora: Date,
        public motivo: string,
        public diagnostico: string | null,
        public idMascota: number,
        public idVeterinario: number,
        public activo: boolean,
        public fechaCreacion: Date
    ) {}
}