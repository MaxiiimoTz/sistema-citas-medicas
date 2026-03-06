import { useState } from "react";
import { obtenerReporteCitasPeriodo } from "../../../services/citas.api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

export default function ReporteCitasPeriodo() {

    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");
    const [data, setData] = useState([]);

    const coloresEstados = {
        Pendiente: "#f59e0b",     // amarillo
        Atendida: "#10b981",      // verde
        Reprogramada: "#3b82f6",  // azul
        Cancelada: "#ef4444"      // rojo
    };
    const buscar = async () => {
        try {
            const resultado = await obtenerReporteCitasPeriodo(inicio, fin);
            setData(resultado);
        } catch (error) {
            console.error("Error al obtener reporte:", error);
        }
    };

    return (
        <div style={{ marginTop: 20 }}>
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
                    <XAxis dataKey="estado" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={coloresEstados[entry.estado] || "#9ca3af"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}