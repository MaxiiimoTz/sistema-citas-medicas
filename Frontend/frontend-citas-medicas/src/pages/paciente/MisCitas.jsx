import { useEffect, useState } from "react";
import { obtenerCitasPaciente } from "../../services/citas.api";
import axios from "axios";
import { theme } from "../../styles/theme";

export default function MisCitas(){

    const [citas,setCitas] = useState([]);
    const [loading,setLoading] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const token = localStorage.getItem("token");

    useEffect(()=>{
        cargarCitas();
    },[]);

    const cargarCitas = async ()=>{
        try{

            const data = await obtenerCitasPaciente(usuario.idUsuario);

            const ordenadas = data.sort((a,b)=>{
                const fechaA = new Date(`${a.fecha}T${a.hora}`);
                const fechaB = new Date(`${b.fecha}T${b.hora}`);
                return fechaA - fechaB;
            });

            setCitas(ordenadas);

        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    const cancelarCita = async (id)=>{
        if(!confirm("¿Deseas cancelar esta cita?")) return;

        try{

            await axios.delete(`http://localhost:9090/api/citas/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            cargarCitas();

        }catch(error){
            console.error(error);
            alert("Error cancelando cita");
        }
    };

    const formatearFecha = (fecha)=>{
        return new Date(fecha).toLocaleDateString("es-PE",{
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        });
    };

    const formatearHora = (hora)=>hora?.substring(0,5);

    if(loading){
        return <p style={{padding:20}}>Cargando citas...</p>
    }

    return(
        <div style={container}>

            {/* HEADER */}
            <div style={header}>
                <h2 style={{margin:0}}>Mis Citas</h2>
                <span style={{color:theme.colors.subtext}}>
                    Total: {citas.length}
                </span>
            </div>

            <div style={card}>

                {/* SI NO HAY CITAS */}
                {citas.length === 0 && (
                    <div style={empty}>
                        No tienes citas registradas
                    </div>
                )}

                {citas.length > 0 && (
                    <table style={tabla}>

                        <thead>
                            <tr style={thead}>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Médico</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>

                            {citas.map((cita)=>(

                                <tr key={cita.idCita} style={row}>

                                    <td>{formatearFecha(cita.fecha)}</td>

                                    <td>{formatearHora(cita.hora)}</td>

                                    <td>
                                        Dr. {cita.medico?.usuario?.nombres}
                                    </td>

                                    <td>
                                        <span style={{
                                            ...badge,
                                            background:
                                                cita.estado === "Pendiente"
                                                    ? "#fef3c7"
                                                    : cita.estado === "Atendida"
                                                    ? "#dcfce7"
                                                    : "#fee2e2",
                                            color:
                                                cita.estado === "Pendiente"
                                                    ? "#92400e"
                                                    : cita.estado === "Atendida"
                                                    ? "#065f46"
                                                    : "#991b1b"
                                        }}>
                                            {cita.estado}
                                        </span>
                                    </td>

                                    <td>

                                        {cita.estado === "Pendiente" && (

                                            <button
                                                onClick={()=>cancelarCita(cita.idCita)}
                                                style={btnCancelar}
                                            >
                                                Cancelar
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
}


/* ===== ESTILOS ===== */

const container={
    padding:24,
    width:"100%",
    maxWidth:"1100px"
}

const header={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:15
}

const card={
    background:"#fff",
    borderRadius:16,
    border:`1px solid ${theme.colors.border}`,
    padding:20,
    boxShadow:theme.shadow.card
}

const empty={
    textAlign:"center",
    padding:30,
    color:"#6b7280"
}

const tabla={
    width:"100%",
    borderCollapse:"collapse"
}

const thead={
    textAlign:"left",
    color:"#6b7280",
    borderBottom:"1px solid #e5e7eb"
}

const row={
    borderTop:"1px solid #f1f5f9"
}

const badge={
    padding:"4px 10px",
    borderRadius:8,
    fontSize:12,
    fontWeight:600
}

const btnCancelar={
    background:theme.colors.danger,
    color:"#fff",
    border:"none",
    padding:"6px 12px",
    borderRadius:8,
    cursor:"pointer",
    fontWeight:500
}