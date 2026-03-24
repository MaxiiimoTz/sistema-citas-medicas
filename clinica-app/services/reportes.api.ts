import { API_URL } from "./api";

export const getCitasSemana = async () => {
    const res = await fetch(`${API_URL}/citas/semana`);
    return res.json();
};

export const getCitasEstado = async () => {
    const res = await fetch(`${API_URL}/citas/estado`);
    return res.json();
};

export const getCitasMedico = async () => {
    const res = await fetch(`${API_URL}/citas/reporte/medico`);
    return res.json();
};

export const getPacientesPeriodo = async () => {
    const hoy = new Date();
    const inicio = new Date();
    inicio.setDate(hoy.getDate() - 7);

    const format = (d: Date) => d.toISOString().split("T")[0];

    const res = await fetch(
        `${API_URL}/pacientes/reporte/periodo?inicio=${format(inicio)}&fin=${format(hoy)}`
    );

    return res.json();
};