import { useEffect, useState } from "react";
import { contarMedicosActivos } from "../../services/medico.api";
import { contarPacientes } from "../../services/paciente.api";
import { contarCitas, contarCitasPendientes, obtenerCitasSemana, obtenerEstadoCitas } from "../../services/citas.api";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";

export default function DashboardAdmin() {

    const [resumen, setResumen] = useState([]);

    const [citasSemana, setCitasSemana] = useState([]);

    const [estadoCitas, setEstadoCitas] = useState([]);

    const coloresEstados = {
        Pendiente: "#f59e0b",
        Atendida: "#10b981",
        Reprogramada: "#3b82f6",
        Cancelada: "#ef4444"
    };

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                const [citasHoy, citasPendientes, pacientes, medicos, citasSemana, estadoCitas ] = await Promise.all([
                    contarCitas(),
                    contarCitasPendientes(),
                    contarPacientes(),
                    contarMedicosActivos(),
                    obtenerCitasSemana(),
                    obtenerEstadoCitas()
                ]);

                setResumen(prev => ({
                    ...prev,
                    citasHoy,
                    pendientes: citasPendientes,
                    pacientes,
                    medicos
                }));

                setCitasSemana(citasSemana);
                setEstadoCitas(estadoCitas);

            } catch (error) {
                console.error("Error al cargar dashboard:", error);
            }
        };
        cargarDashboard();
    }, []);
    

    return (
        <>
            <h2 style={{ marginTop: 10 }}>Panel Administrativo</h2>

            {/* CARDS PRINCIPALES */}
            <Grid>
                <Card 
                    titulo="Citas hoy" 
                    valor={resumen.citasHoy} 
                    subtitulo="Total del día" 
                    color="#4f46e5"
                />
                <Card 
                    titulo="Pendientes" 
                    valor={resumen.pendientes} 
                    subtitulo="Por atender" 
                    color="#f59e0b"
                />
                <Card 
                    titulo="Pacientes" 
                    valor={resumen.pacientes} 
                    subtitulo="Registrados" 
                    color="#10b981"
                />
                <Card 
                    titulo="Médicos" 
                    valor={resumen.medicos} 
                    subtitulo="Activos" 
                    color="#ef4444"
                />
            </Grid>

            {/* GRÁFICOS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 2fr",
                    gap: 24,
                    marginTop: 40
                }}
            >
                {/* GRÁFICO DE LÍNEA */}
                <div
                    style={{
                        background: "#fff",
                        padding: 20,
                        borderRadius: 20,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
                    }}
                >
                    <h3 style={{ marginTop: 0 }}>Citas esta semana</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={citasSemana}>
                            <Line type="monotone" dataKey="citas" stroke="#4f46e5" strokeWidth={3} />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* GRÁFICO DE BARRAS */}
                <div
                    style={{
                        background: "#fff",
                        padding: 20,
                        borderRadius: 20,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
                    }}
                >
                    <h3 style={{ marginTop: 0 }}>Estado de citas</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={estadoCitas}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="nombre"/>
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor">
                                {estadoCitas.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            coloresEstados[
                                                entry.nombre.replace(/s$/, "")
                                            ] || "#9ca3af"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}