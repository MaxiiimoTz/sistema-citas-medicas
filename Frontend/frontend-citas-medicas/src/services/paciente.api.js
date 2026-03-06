import axios from "axios";

const API_URL = "http://localhost:9090/api/pacientes";

export const contarPacientes = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const obtenerReportePacientesPeriodo = async (inicio, fin) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/reporte/periodo`, {
        headers: { 
            Authorization: `Bearer ${token}`
        },
        params: { inicio, fin }
    });

    return response.data;

}