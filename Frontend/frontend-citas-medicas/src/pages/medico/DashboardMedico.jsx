
import { useEffect, useState } from "react";
import { obtenerCitasMedico } from "../../services/citas.api";

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

            setCitas(data);

        }catch(error){

            console.error(error);

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

    const proxima = citas[0];

    return(

        <div style={{padding:24,width:"95%",margin:"0 auto"}}>

            <h2>Bienvenido Dr. {usuario?.nombres}</h2>

            <p style={{color:"#6b7280"}}>
                Aquí puedes ver tu jornada médica
            </p>

            {/* CARDS */}

            <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:20,
                marginBottom:25
            }}>

                <Card titulo="Citas hoy" valor={citasHoy.length} icono="📅" color="#2563eb"/>

                <Card titulo="Pendientes" valor={pendientes} icono="⏳" color="#f59e0b"/>

                <Card
                    titulo="Próxima cita"
                    valor={proxima ? proxima.hora.substring(0,5) : "--"}
                    icono="👤"
                    color="#10b981"
                />

            </div>

            {/* TABLA */}

            <div style={{
                background:"#fff",
                borderRadius:14,
                border:"1px solid #e6e8f2",
                padding:20
            }}>

                <h3>Agenda</h3>

                <table style={{
                    width:"100%",
                    borderCollapse:"collapse"
                }}>

                    <thead>

                        <tr style={{
                            textAlign:"left",
                            color:"#6b7280"
                        }}>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                        </tr>

                    </thead>

                    <tbody>

                        {citas.map((cita)=>(
                            <tr key={cita.idCita} style={{borderTop:"1px solid #eee"}}>

                                <td>{cita.fecha}</td>

                                <td>{cita.hora.substring(0,5)}</td>

                                <td>
                                    {cita.paciente?.usuario?.nombres}
                                </td>

                                <td>{cita.estado}</td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

function Card({titulo,valor,icono,color}){

    return(

        <div style={{
            background:"#fff",
            borderRadius:14,
            padding:20,
            border:"1px solid #e6e8f2",
            boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
        }}>

            <div style={{color:"#6b7280"}}>
                {icono} {titulo}
            </div>

            <div style={{
                fontSize:28,
                fontWeight:700,
                color:color
            }}>
                {valor}
            </div>

        </div>

    )

}