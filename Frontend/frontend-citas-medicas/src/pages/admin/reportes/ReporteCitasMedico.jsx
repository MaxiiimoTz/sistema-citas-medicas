import { useEffect, useState } from "react";
import { obtenerReporteCitasMedico } from "../../../services/citas.api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function ReporteCitasMedico() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const cargarReporte = async () => {
            try {
                const resultado = await obtenerReporteCitasMedico();
                setData(resultado);
            } catch (error) {
                console.error("Error al cargar reporte por médico:", error);
            }
        };

        cargarReporte();
    }, []);

    return (
        <div style={{ marginTop: 30 }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="medico" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#06b6d4" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}