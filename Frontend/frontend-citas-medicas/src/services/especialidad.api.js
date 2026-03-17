import axios from "axios";

const API = "http://localhost:9090/api/especialidades";

export const obtenerEspecialidades = async () => {
    const res = await axios.get(API);
    return res.data;
};