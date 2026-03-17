import { useEffect, useState } from "react";
import { contarMedicosActivos } from "../../services/medico.api";
import { contarPacientes } from "../../services/paciente.api";
import { contarCitas, contarCitasPendientes, obtenerCitasSemana, obtenerEstadoCitas } from "../../services/citas.api";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import { theme } from "../../styles/theme";
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from "recharts";

export default function DashboardAdmin() {

    const [resumen, setResumen] = useState([]);
    const [citasSemana, setCitasSemana] = useState([]);
    const [estadoCitas, setEstadoCitas] = useState([]);

    const coloresEstados = {
        Pendiente: theme.colors.warning,
        Atendida: theme.colors.success,
        Reprogramada: theme.colors.primary,
        Cancelada: theme.colors.danger
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
                console.error(error);
            }
        };
        cargarDashboard();
    }, []);
    

    return (
        <>
            <h2 style={{ marginTop: 10 }}>Panel Administrativo</h2>

            <Grid>
                <Card titulo="Citas hoy" valor={resumen.citasHoy} subtitulo="Total del día" color={theme.colors.primary}/>
                <Card titulo="Pendientes" valor={resumen.pendientes} subtitulo="Por atender" color={theme.colors.warning}/>
                <Card titulo="Pacientes" valor={resumen.pacientes} subtitulo="Registrados" color={theme.colors.success}/>
                <Card titulo="Médicos" valor={resumen.medicos} subtitulo="Activos" color={theme.colors.secondary}/>
            </Grid>

            <div style={{
                display: "grid",
                gridTemplateColumns: "3fr 2fr",
                gap: 24,
                marginTop: 40
            }}>

                <div style={card}>
                    <h3>Citas esta semana</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={citasSemana}>
                            <Line type="monotone" dataKey="citas" stroke={theme.colors.primary} strokeWidth={3}/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={card}>
                    <h3>Estado de citas</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={estadoCitas}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="nombre"/>
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor">
                                {estadoCitas.map((entry, index) => (
                                    <Cell
                                        key={index}
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

const card = {
    background: "#fff",
    padding: 20,
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};