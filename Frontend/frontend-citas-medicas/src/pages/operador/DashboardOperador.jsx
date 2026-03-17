import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import { theme } from "../../styles/theme";

export default function DashboardOperador() {
    return (
        <div style={{padding:10}}>

            <h3 style={{
                marginTop: 18,
                color: theme.colors.text
            }}>
                Actividad del día
            </h3>

            <Grid>
                <Card titulo="Citas registradas hoy" valor="8" subtitulo="Presenciales y online" />
                <Card titulo="Pendientes" valor="3" subtitulo="Por confirmar" />
                <Card titulo="Canceladas" valor="1" subtitulo="Hoy" />
                <Card titulo="Pacientes nuevos" valor="2" subtitulo="Registrados hoy" />
            </Grid>

            <section style={{
                marginTop: 24,
                background: "#fff",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 16,
                padding: 20,
                boxShadow: theme.shadow.card
            }}>

                <h3 style={{ marginTop: 0 }}>Próximas citas del día</h3>

                <table style={{
                    width:"100%",
                    borderCollapse:"collapse"
                }}>

                    <thead>
                        <tr style={{
                            textAlign:"left",
                            borderBottom:`1px solid ${theme.colors.border}`,
                            color: theme.colors.subtext
                        }}>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr style={{borderTop:"1px solid #f1f5f9"}}>
                            <td>09:00</td>
                            <td>Pedro Ramos</td>
                            <td>Dra. Rojas</td>
                            <td style={{
                                color: theme.colors.warning,
                                fontWeight: 600
                            }}>
                                Pendiente
                            </td>
                        </tr>
                    </tbody>

                </table>

            </section>

        </div>
    );
}