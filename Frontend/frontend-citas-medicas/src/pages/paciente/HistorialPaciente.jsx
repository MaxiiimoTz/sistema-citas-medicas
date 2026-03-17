import { useEffect, useState } from "react";
import { obtenerCitasPaciente } from "../../services/citas.api";
import { theme } from "../../styles/theme";

export default function HistorialPaciente(){

    const [citas,setCitas] = useState([]);
    const [loading,setLoading] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    useEffect(()=>{ cargarHistorial(); },[]);

    const cargarHistorial = async ()=>{
        try{
            const data = await obtenerCitasPaciente(usuario.idUsuario);
            const historial = data.filter(c => c.estado === "Atendida" || c.estado === "Cancelada");

            const ordenadas = historial.sort((a,b)=>{
                const fechaA = new Date(`${a.fecha}T${a.hora}`);
                const fechaB = new Date(`${b.fecha}T${b.hora}`);
                return fechaB - fechaA;
            });

            setCitas(ordenadas);
        }catch(error){ console.error(error); }
        finally{ setLoading(false); }
    };

    if(loading) return <p style={{padding:20}}>Cargando historial...</p>

    return(
        <div style={container}>
            <h2>Historial de Citas</h2>

            <div style={card}>
                <table style={tabla}>
                    <thead>
                        <tr style={thead}>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Médico</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(c=>(
                            <tr key={c.idCita} style={row}>
                                <td>{c.fecha}</td>
                                <td>{c.hora?.substring(0,5)}</td>
                                <td>Dr. {c.medico?.usuario?.nombres}</td>
                                <td>
                                    <span style={{
                                        ...badge,
                                        background: c.estado==="Atendida" ? "#dcfce7":"#fee2e2",
                                        color: c.estado==="Atendida" ? "#065f46":"#991b1b"
                                    }}>
                                        {c.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const container={padding:24}
const card={background:"#fff",borderRadius:16,padding:20,border:`1px solid ${theme.colors.border}`,boxShadow:theme.shadow.card}
const tabla={width:"100%",borderCollapse:"collapse"}
const thead={textAlign:"left",color:"#6b7280"}
const row={borderTop:"1px solid #eee"}
const badge={padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600}