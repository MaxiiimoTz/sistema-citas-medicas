import axios from "axios";

const API_URL = "http://localhost:9090/api/usuarios";

export const listarUsuarios = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`    
        }
    });

    return response.data;
}

export const cambiarEstadoUsuario = async (id, estado) => {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
        `${API_URL}/${id}/estado`,
        null,
        {
            params: { estado },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const agregarUsuario = async (usuario) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(API_URL, usuario, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        throw error.response?.data?.error || "ERROR";
    }
};

export const actualizarUsuario = async (id, usuario) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_URL}/${id}`, usuario, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        throw error.response?.data?.error || "ERROR";
    }
};