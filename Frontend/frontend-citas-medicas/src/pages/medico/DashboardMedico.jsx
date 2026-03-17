import { useEffect, useState } from "react";
import { obtenerCitasMedico } from "../../services/citas.api";
import { theme } from "../../styles/theme";

export default function DashboardMedico(){

    const [citas,setCitas] = useState([]);
    const [loading,setLoading] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    useEffect(()=>{
        cargarCitas();
    },[])

    const cargarCitas = async ()=>{
        try{

            const data = await obtenerCitasMedico(usuario.idUsuario);

            const ordenadas = data.sort((a,b)=>{
                const fechaA = new Date(`${a.fecha}T${a.hora}`);
                const fechaB = new Date(`${b.fecha}T${b.hora}`);
                return fechaA - fechaB;
            });

            setCitas(ordenadas);

        }catch(error){
            console.error("Error cargando citas:",error);
        }finally{
            setLoading(false);
        }
    }

    if(loading){
        return <p style={{padding:20}}>Cargando agenda...</p>
    }

    const hoy = new Date().toISOString().split("T")[0];
    const citasHoy = citas.filter(c => c.fecha === hoy);
    const pendientes = citas.filter(c => c.estado === "Pendiente").length;
    const proxima = citas.length > 0 ? citas[0] : null;

    return(

        <div style={{
            padding:24,
            width:"95%",
            margin:"0 auto"
        }}>

            <h2 style={{color: theme.colors.text}}>
                Bienvenido Dr. {usuario?.nombres}
            </h2>

            <p style={{color:theme.colors.subtext}}>
                Aquí puedes ver tu jornada médica
            </p>

            {/* CARDS */}
            <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:20,
                marginBottom:25
            }}>

                <Card titulo="Citas hoy" valor={citasHoy.length} icono="📅" color={theme.colors.primary}/>
                <Card titulo="Pendientes" valor={pendientes} icono="⏳" color={theme.colors.warning}/>
                <Card
                    titulo="Próxima cita"
                    valor={proxima ? proxima.hora?.substring(0,5) : "--"}
                    icono="👤"
                    color={theme.colors.success}
                />

            </div>

            {/* TABLA */}
            <div style={containerTabla}>

                <h3 style={{marginBottom:10}}>Agenda</h3>

                <table style={tabla}>

                    <thead>
                        <tr style={thead}>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>

                        {citas.map((cita)=>(
                            <tr key={cita.idCita} style={fila}>

                                <td>{cita.fecha}</td>

                                <td>{cita.hora?.substring(0,5)}</td>

                                <td>
                                    {cita.paciente?.usuario?.nombres} {cita.paciente?.usuario?.apellidos}
                                </td>

                                <td>
                                    <span style={{
                                        ...estadoBadge,
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

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

/* CARD */
function Card({titulo,valor,icono,color}){
    return(
        <div style={{
            background:"#fff",
            borderRadius:16,
            padding:20,
            border:`1px solid ${theme.colors.border}`,
            boxShadow:theme.shadow.card
        }}>
            <div style={{color:theme.colors.subtext}}>
                {icono} {titulo}
            </div>

            <div style={{
                fontSize:28,
                fontWeight:800,
                color:color,
                marginTop:6
            }}>
                {valor}
            </div>
        </div>
    )
}

/* ESTILOS */

const containerTabla = {
    background:"#fff",
    borderRadius:16,
    border:`1px solid #e5e7eb`,
    padding:20,
    boxShadow:"0 6px 18px rgba(0,0,0,0.06)"
};

const tabla = {
    width:"100%",
    borderCollapse:"collapse"
};

const thead = {
    textAlign:"left",
    color:"#6b7280",
    borderBottom:"1px solid #e5e7eb"
};

const fila = {
    borderTop:"1px solid #f1f5f9"
};

const estadoBadge = {
    padding:"4px 10px",
    borderRadius:8,
    fontSize:12,
    fontWeight:600
};