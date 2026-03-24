import { API_URL } from "./api";

export const getUsuarios = async () => {
    const res = await fetch(`${API_URL}/usuarios`);
    if (!res.ok) throw new Error("Error usuarios");
    return res.json();
};

export const crearUsuario = async (data: any) => {
    const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al crear");
    return res.json();
};

export const cambiarEstadoUsuario = async (id: number, estado: boolean) => {
    const res = await fetch(`${API_URL}/usuarios/${id}/estado?estado=${estado}`, {
        method: "PATCH"
    });

    if (!res.ok) throw new Error("Error estado");
    return res.json();
};