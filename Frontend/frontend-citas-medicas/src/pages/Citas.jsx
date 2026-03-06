import { useEffect, useState } from "react";
import { listarCitas, crearCita, cancelarCita } from "../api/citas.api";

export default function Citas() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        paciente: "",
        medico: "",
        fecha: "",
        hora: "",
    });

    // Carga inicial (sin warning)
    useEffect(() => {
        let cancelled = false;

        (async () => {
        try {
            setLoading(true);
            const data = await listarCitas();
            if (cancelled) return;
            setCitas(data);
        } finally {
            if (!cancelled) setLoading(false);
        }
        })();

        return () => {
        cancelled = true;
        };
    }, []);

    const recargar = async () => {
        setLoading(true);
        const data = await listarCitas();
        setCitas(data);
        setLoading(false);
    };

    const onCreate = async (e) => {
        e.preventDefault();
        if (!form.paciente || !form.medico || !form.fecha || !form.hora) return;

        await crearCita(form);
        setForm({ paciente: "", medico: "", fecha: "", hora: "" });
        await recargar();
    };

    const onCancel = async (id) => {
        await cancelarCita(id);
        await recargar();
    };

    return (
        <div>
        <h1 style={{ marginTop: 0 }}>Citas</h1>

        <div
            style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: 16,
            alignItems: "start",
            }}
        >
            {/* Formulario */}
            <section
            style={{
                background: "#fff",
                border: "1px solid #e6e8f2",
                borderRadius: 16,
                padding: 16,
            }}
            >
            <h3 style={{ marginTop: 0 }}>Nueva cita</h3>

            <form onSubmit={onCreate} style={{ display: "grid", gap: 10 }}>
                <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Paciente</label>
                <input
                    value={form.paciente}
                    onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                />
                </div>

                <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Médico</label>
                <input
                    value={form.medico}
                    onChange={(e) => setForm({ ...form, medico: e.target.value })}
                />
                </div>

                <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Fecha</label>
                <input
                    type="date"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                />
                </div>

                <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Hora</label>
                <input
                    type="time"
                    value={form.hora}
                    onChange={(e) => setForm({ ...form, hora: e.target.value })}
                />
                </div>

                <button type="submit">Crear</button>
            </form>
            </section>

            {/* Listado */}
            <section
            style={{
                background: "#fff",
                border: "1px solid #e6e8f2",
                borderRadius: 16,
                padding: 16,
            }}
            >
            <h3 style={{ marginTop: 0 }}>Listado</h3>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ textAlign: "left", borderBottom: "1px solid #e6e8f2" }}>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map((c) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #f1f2f7" }}>
                        <td>{c.paciente}</td>
                        <td>{c.medico}</td>
                        <td>{c.fecha}</td>
                        <td>{c.hora}</td>
                        <td>{c.estado}</td>
                        <td>
                        <button
                            onClick={() => onCancel(c.id)}
                            disabled={c.estado === "Cancelada"}
                            style={{ background: "#444" }}
                        >
                            Cancelar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </section>
        </div>
        </div>
    );
}
