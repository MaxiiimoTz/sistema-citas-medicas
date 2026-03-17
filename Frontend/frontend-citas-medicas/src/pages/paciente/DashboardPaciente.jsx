import { useEffect, useState } from "react";
import { obtenerCitasPaciente } from "../../services/citas.api";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import { theme } from "../../styles/theme";

export default function DashboardPaciente(){

    const [citas,setCitas] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    useEffect(()=>{
        obtenerCitasPaciente(usuario.idUsuario).then(setCitas);
    },[]);

    const pendientes = citas.filter(c=>c.estado==="Pendiente");
    const completadas = citas.filter(c=>c.estado==="Atendida");
    const canceladas = citas.filter(c=>c.estado==="Cancelada");

    const proxima = pendientes.length > 0 ? pendientes[0] : null;

    return(
        <div style={{padding:20}}>

            {/* HEADER */}
            <div style={{marginBottom:20}}>
                <h2 style={{margin:0}}>
                    Hola, {usuario.nombres} 👋
                </h2>
                <p style={{color:theme.colors.subtext}}>
                    Bienvenido a tu panel de salud
                </p>
            </div>

            {/* PROXIMA CITA */}
            <div style={{
                background:`linear-gradient(135deg,${theme.colors.primary},${theme.colors.secondary})`,
                color:"#fff",
                padding:20,
                borderRadius:16,
                marginBottom:20
            }}>
                <h3 style={{margin:0}}>Próxima cita</h3>

                {proxima ? (
                    <p style={{marginTop:10}}>
                        {proxima.fecha} - {proxima.hora?.substring(0,5)} <br/>
                        Dr. {proxima.medico?.usuario?.nombres}
                    </p>
                ) : (
                    <p style={{marginTop:10}}>
                        No tienes citas pendientes
                    </p>
                )}
            </div>

            {/* RESUMEN */}
            <Grid>
                <Card titulo="Pendientes" valor={pendientes.length} variant="warning"/>
                <Card titulo="Completadas" valor={completadas.length} variant="success"/>
                <Card titulo="Canceladas" valor={canceladas.length} variant="danger"/>
            </Grid>

        </div>
    );
}