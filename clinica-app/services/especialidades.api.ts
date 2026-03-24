import { API_URL } from "./api";

export const getEspecialidades = async () => {
    const res = await fetch(`${API_URL}/especialidades`);
    if (!res.ok) throw new Error("Error especialidades");
    return res.json();
};

export const crearEspecialidad = async (data: any) => {
    const res = await fetch(`${API_URL}/especialidades`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al crear");
    return res.json();
};

export const actualizarEspecialidad = async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/especialidades/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al actualizar");
    return res.json();
};

export const eliminarEspecialidad = async (id: number) => {
    const res = await fetch(`${API_URL}/especialidades/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar");
    };