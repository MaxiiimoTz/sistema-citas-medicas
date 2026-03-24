import { API_URL } from "./api";

export const getMedicosByEspecialidad = async (id: number) => {
    const res = await fetch(`${API_URL}/medicos/especialidad/${id}`);
    if (!res.ok) throw new Error("Error médicos");
    return res.json();
};

export const getCitasMedico = async (idUsuario: number) => {
    const res = await fetch(`${API_URL}/citas/medico/${idUsuario}`);
    if (!res.ok) throw new Error("Error citas médico");
    return res.json();
};

export const actualizarEstadoCita = async (id: number, estado: string) => {
    const res = await fetch(`${API_URL}/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado })
    });

    if (!res.ok) throw new Error("Error actualizar cita");
    return res.json();
};