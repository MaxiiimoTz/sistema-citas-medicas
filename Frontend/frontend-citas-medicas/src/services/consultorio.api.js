import axios from "axios";

const API = "http://localhost:9090/api/consultorios";

export const obtenerConsultorios = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
};