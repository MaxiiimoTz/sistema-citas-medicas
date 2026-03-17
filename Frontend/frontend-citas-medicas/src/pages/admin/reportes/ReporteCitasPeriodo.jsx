import { useState } from "react";
import { obtenerReporteCitasPeriodo } from "../../../services/citas.api";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { theme } from "../../../styles/theme";

export default function ReporteCitasPeriodo() {

    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");
    const [data, setData] = useState([]);

    const colores = {
        Pendiente: theme.colors.warning,
        Atendida: theme.colors.success,
        Cancelada: theme.colors.danger
    };

    const buscar = async () => {
        const res = await obtenerReporteCitasPeriodo(inicio, fin);
        setData(res);
    };

    return (
        <div style={{ marginTop: 10 }}>

            {/* FILTROS */}
            <div style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                flexWrap: "wrap"
            }}>
                <input
                    type="date"
                    value={inicio}
                    onChange={e => setInicio(e.target.value)}
                    style={input}
                />

                <input
                    type="date"
                    value={fin}
                    onChange={e => setFin(e.target.value)}
                    style={input}
                />

                <button onClick={buscar} style={btn}>
                    Buscar
                </button>
            </div>

            {/* GRÁFICO */}
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                    <XAxis dataKey="estado" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                        {data.map((e, i) => (
                            <Cell key={i} fill={colores[e.estado] || "#9ca3af"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

/* estilos */

const input = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none"
};

const btn = {
    background: theme.colors.primary,
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600
};