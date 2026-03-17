import { useEffect, useState } from "react";
import { obtenerReporteCitasMedico } from "../../../services/citas.api";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { theme } from "../../../styles/theme";

export default function ReporteCitasMedico() {

    const [data, setData] = useState([]);

    useEffect(() => {
        obtenerReporteCitasMedico().then(setData);
    }, []);

    return (
        <div style={{ marginTop: 10 }}>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                    <XAxis
                        dataKey="medico"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: 10,
                            border: "1px solid #e5e7eb"
                        }}
                    />
                    <Bar
                        dataKey="total"
                        fill={theme.colors.primary}
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}