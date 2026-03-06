import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";

export default function DashboardOperador() {
    return (
        <>
            <h3 style={{ marginTop: 18 }}>Actividad del día</h3>

            <Grid>
                <Card titulo="Citas registradas hoy" valor="8" subtitulo="Presenciales y online" />
                <Card titulo="Pendientes" valor="3" subtitulo="Por confirmar" />
                <Card titulo="Canceladas" valor="1" subtitulo="Hoy" />
                <Card titulo="Pacientes nuevos" valor="2" subtitulo="Registrados hoy" />
            </Grid>

            <section style={{ 
                marginTop: 24, 
                background: "#fff", 
                border: "1px solid #e6e8f2", 
                borderRadius: 16, 
                padding: 16 
            }}>
                <h3 style={{ marginTop: 0 }}>Próximas citas del día</h3>

                <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #e6e8f2" }}>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>09:00</td>
                            <td>Pedro Ramos</td>
                            <td>Dra. Rojas</td>
                            <td style={{ color: "#d97706", fontWeight: 600 }}>Pendiente</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}