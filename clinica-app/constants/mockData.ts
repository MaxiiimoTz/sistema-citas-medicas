export type EstadoCita = "Pendiente" | "Atendida" | "Cancelada";

export const citas: {
  idCita: number;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  medico: {
    usuario: {
      nombres: string;
    };
  };
}[] = [
  {
    idCita: 1,
    fecha: "2026-03-25",
    hora: "09:00",
    estado: "Pendiente",
    medico: { usuario: { nombres: "Carlos" } }
  }
];