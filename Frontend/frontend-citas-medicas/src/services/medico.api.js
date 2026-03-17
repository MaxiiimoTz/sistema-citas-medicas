import axios from "axios";

const API_URL = "http://localhost:9090/api/medicos";

export const contarMedicosActivos = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/activos/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const obtenerMedicos = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const obtenerMedicosPorEspecialidad = async (idEspecialidad) => {
    const res = await axios.get(`${API_URL}/especialidad/${idEspecialidad}`);
    return res.data;
};