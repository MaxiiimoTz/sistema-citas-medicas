import axios from "axios";

const API_URL = "http://localhost:9090/api/pacientes";

export const contarPacientes = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/count`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    return response.data;

};

export const obtenerReportePacientesPeriodo = async (inicio, fin) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/reporte/periodo`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        params:{inicio,fin}
    });

    return response.data;

};

export const obtenerPacientePorUsuario = async (idUsuario)=>{

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/usuario/${idUsuario}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const guardarPaciente = async (paciente)=>{

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}`,
        paciente,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const actualizarPaciente = async (id,paciente)=>{

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${id}`,
        paciente,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};