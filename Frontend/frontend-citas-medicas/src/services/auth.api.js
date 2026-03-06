import axios from "axios";

const API = "http://localhost:9090/api";

export const loginRequest = async (data) => {
    const response = await axios.post(`${API}/auth/login`, data);
    return response.data;
};

export const cambiarPasswordRequest = async (data) => {
    const response = await fetch(`${API}/usuarios/cambiar-password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}