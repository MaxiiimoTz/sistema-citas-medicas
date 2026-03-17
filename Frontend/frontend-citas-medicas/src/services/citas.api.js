import axios from "axios";

const API_URL = "http://localhost:9090/api/citas";

export const contarCitas = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/hoy/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const contarCitasPendientes = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/pendientes/count`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const obtenerCitasSemana = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/semana`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const obtenerEstadoCitas = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/estado`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const obtenerReporteCitasPeriodo = async (inicio, fin) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/reporte/periodo`, {
        headers: { 
            Authorization: `Bearer ${token}`
        },
        params: { inicio, fin }
    });

    return response.data;
}

export const obtenerReporteCitasMedico = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/reporte/medico`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const obtenerCitasPaciente = async (idPaciente) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/paciente/${idPaciente}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const obtenerCitasMedico = async (idMedico) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/medico/${idMedico}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const obtenerHorariosDisponibles = async (idMedico, fecha) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/disponibles`, {
        params: { idMedico, fecha },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};