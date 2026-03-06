import { useState } from "react";
import { obtenerReportePacientesPeriodo } from "../../../services/paciente.api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function ReportePacientesPeriodo() {

    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");
    const [data, setData] = useState([]);

    const buscar = async () => {
        if (!inicio || !fin) return;

        try {
            const res = await obtenerReportePacientesPeriodo(inicio, fin);
            setData(res);
        } catch (error) {
            console.error("Error reporte pacientes:", error);
        }
    };

    return (
        <div style={{ marginTop: 40 }}>
            {/* FILTROS */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    type="date"
                    value={inicio}
                    onChange={(e) => setInicio(e.target.value)}
                />
                <input
                    type="date"
                    value={fin}
                    onChange={(e) => setFin(e.target.value)}
                />
                <button onClick={buscar}>Buscar</button>
            </div>

            {/* GRÁFICO */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#6366f1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}