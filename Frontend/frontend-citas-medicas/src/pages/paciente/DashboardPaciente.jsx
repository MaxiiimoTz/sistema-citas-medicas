import { useEffect, useState } from "react";
import { obtenerCitasPaciente } from "../../services/citas.api";

export default function DashboardPaciente() {

    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarCitas = async () => {
        try {
            const data = await obtenerCitasPaciente(usuario.idUsuario);
            setCitas(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p style={{ padding: 20 }}>Cargando información...</p>;
    }

    const pendientes = citas.filter(c => c.estado === "Pendiente").length;
    const completadas = citas.filter(c => c.estado === "Atendida").length;
    const canceladas = citas.filter(c => c.estado === "Cancelada").length;

    const citasOrdenadas = [...citas].sort((a, b) => {
        const fechaA = new Date(`${a.fecha}T${a.hora}`);
        const fechaB = new Date(`${b.fecha}T${b.hora}`);
        return fechaA - fechaB;
    });

    const proxima = citasOrdenadas[0];

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatearHora = (hora) => hora?.substring(0,5);

    return (
        <div style={{ padding: 24, width: "95%", margin: "0 auto" }}>

                {/* HEADER */}

                <div style={{ marginBottom: 25 }}>
                    <h2 style={{ margin: 0 }}>
                        Bienvenido, {usuario?.nombres}
                    </h2>

                    <p style={{ color: "#6b7280" }}>
                        Aquí puedes ver el resumen de tus citas médicas
                    </p>
                </div>


                {/* PROXIMA CITA */}

                <div style={{
                    background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                    borderRadius: 14,
                    padding: 18,
                    color: "white",
                    marginBottom: 25
                }}>

                    <h3 style={{ margin: 0, opacity: .9 }}>
                        📅 Próxima cita
                    </h3>

                    {proxima ? (
                        <>
                            <h1 style={{
                                margin: "4px 0",
                                fontSize: 28,
                                fontWeight: 700
                            }}>
                                {formatearFecha(proxima.fecha)}
                            </h1>

                            <p style={{ margin: 0, fontSize: 16 }}>
                                {formatearHora(proxima.hora)} con Dr. {proxima.medico?.usuario?.nombres}
                            </p>
                        </>
                    ) : (
                        <p>No tienes citas programadas</p>
                    )}

                </div>


                {/* ESTADISTICAS */}

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 18,
                    marginBottom: 25
                }}>

                    <Card
                        titulo="Citas pendientes"
                        valor={pendientes}
                        icono="⏳"
                        color="#f59e0b"
                    />

                    <Card
                        titulo="Citas completadas"
                        valor={completadas}
                        icono="✅"
                        color="#10b981"
                    />

                    <Card
                        titulo="Citas canceladas"
                        valor={canceladas}
                        icono="❌"
                        color="#ef4444"
                    />

                </div>


                {/* TABLA CITAS */}

                <div style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "1px solid #e6e8f2",
                    padding: 20,
                    marginBottom: 25
                }}>

                    <h3 style={{ marginTop: 0 }}>
                        Próximas citas
                    </h3>

                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: 10
                    }}>

                        <thead>

                            <tr style={{
                                textAlign: "left",
                                color: "#6b7280",
                                fontSize: 14
                            }}>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Médico</th>
                                <th>Estado</th>
                            </tr>

                        </thead>

                        <tbody>

                            {citasOrdenadas.map((cita) => (

                                <tr
                                    key={cita.idCita}
                                    style={{
                                        borderTop: "1px solid #eee",
                                        height: 48
                                    }}
                                >

                                    <td>
                                        {formatearFecha(cita.fecha)}
                                    </td>

                                    <td>
                                        {formatearHora(cita.hora)}
                                    </td>

                                    <td>
                                        Dr. {cita.medico?.usuario?.nombres}
                                    </td>

                                    <td style={{
                                        fontWeight: 600,
                                        color:
                                            cita.estado === "Pendiente"
                                                ? "#f59e0b"
                                                : cita.estado === "Atendida"
                                                ? "#10b981"
                                                : "#ef4444"
                                    }}>
                                        {cita.estado}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* RECOMENDACIONES */}

                <div style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "1px solid #e6e8f2",
                    padding: 20
                }}>

                    <h3 style={{ marginTop: 0 }}>
                        💡 Recomendaciones
                    </h3>

                    <ul style={{
                        paddingLeft: 18,
                        lineHeight: 1.8
                    }}>
                        <li>Confirma tus citas con 24 horas de anticipación</li>
                        <li>Llega 10 minutos antes de tu consulta</li>
                        <li>Revisa tu historial médico antes de asistir</li>
                    </ul>

                </div>


        </div>
    );
}


/* CARD */

function Card({ titulo, valor, icono, color }) {

    return (

        <div style={{
            background: "#fff",
            borderRadius: 14,
            padding: 18,
            border: "1px solid #e6e8f2",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            transition: "0.2s"
        }}
        onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-3px)"}
        onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
        >

            <div style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 6
            }}>
                {icono} {titulo}
            </div>

            <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: color
            }}>
                {valor}
            </div>

        </div>

    );
}