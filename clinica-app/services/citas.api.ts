import { API_URL } from "./api";

export const getCitasPaciente = async (id: number) => {
    const res = await fetch(`${API_URL}/citas/paciente/${id}`);

    if (!res.ok) throw new Error("Error al obtener citas");

    return res.json();
};

export const getHorariosDisponibles = async (idMedico: number, fecha: string) => {

    const res = await fetch(
        `${API_URL}/citas/disponibles?idMedico=${idMedico}&fecha=${fecha}`
    );

    if (!res.ok) throw new Error("Error horarios");

    return res.json();
};

export const crearCita = async (data: any) => {

    const res = await fetch(`${API_URL}/citas`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al crear cita");

    return res.json();
};