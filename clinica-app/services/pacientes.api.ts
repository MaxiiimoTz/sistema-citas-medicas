import { API_URL } from "./api";

export const getPacienteByUsuario = async (idUsuario: number) => {

    const res = await fetch(`${API_URL}/pacientes/usuario/${idUsuario}`);

    if (!res.ok) {
        throw new Error("Error obteniendo paciente");
    }

    return res.json();
};