const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let CITAS = [
    { id: 1, paciente: "Juan Pérez", medico: "Dra. Salas", fecha: "2026-02-18", hora: "10:00", estado: "Programada" },
    { id: 2, paciente: "Ana Torres", medico: "Dr. Rojas", fecha: "2026-02-18", hora: "11:30", estado: "Programada" },
];

export async function listarCitas() {
    await delay(250);
    return [...CITAS];
}

export async function crearCita(payload) {
    await delay(250);
    const nueva = { id: Date.now(), estado: "Programada", ...payload };
    CITAS = [nueva, ...CITAS];
    return nueva;
}

export async function cancelarCita(id) {
    await delay(200);
    CITAS = CITAS.map((c) => (c.id === id ? { ...c, estado: "Cancelada" } : c));
    return true;
}
