import ReportCard from "../../../components/ReportCard";
import ReporteCitasPeriodo from "./ReporteCitasPeriodo";
import ReporteCitasMedico from "./ReporteCitasMedico";
import ReportePacientesPeriodo from "./ReportePacientesPeriodo";
import { theme } from "../../../styles/theme";

export default function Reportes() {
    return (
        <div style={{ padding: 10 }}>

            <h1 style={{
                marginBottom: 24,
                color: theme.colors.text
            }}>
                Reportes
            </h1>

            <ReportCard
                icon="📊"
                title="Citas por período"
                description="Distribución de citas según su estado en un rango de fechas"
            >
                <ReporteCitasPeriodo />
            </ReportCard>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24
                }}
            >
                <ReportCard
                    icon="👨‍⚕️"
                    title="Citas por médico"
                    description="Cantidad total de citas asignadas a cada médico"
                >
                    <ReporteCitasMedico />
                </ReportCard>

                <ReportCard
                    icon="👥"
                    title="Pacientes registrados por período"
                    description="Pacientes creados en el sistema según fecha de registro"
                >
                    <ReportePacientesPeriodo />
                </ReportCard>
            </div>

        </div>
    );
}