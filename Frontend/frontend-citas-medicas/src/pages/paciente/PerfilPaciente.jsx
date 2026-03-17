import { useState, useEffect } from "react";
import { 
    obtenerPacientePorUsuario, 
    guardarPaciente,
    actualizarPaciente 
} from "../../services/paciente.api";
import { theme } from "../../styles/theme";

export default function PerfilPaciente(){

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    const [idPaciente,setIdPaciente] = useState(null);
    const [dni,setDni] = useState("");
    const [telefono,setTelefono] = useState("");
    const [direccion,setDireccion] = useState("");
    const [sexo,setSexo] = useState("");
    const [fechaNacimiento,setFechaNacimiento] = useState("");
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        const cargarPerfil = async ()=>{

            try{

                const paciente = await obtenerPacientePorUsuario(usuario.idUsuario);

                if(paciente){
                    setIdPaciente(paciente.idPaciente);
                    setDni(paciente.dni || "");
                    setTelefono(paciente.telefono || "");
                    setDireccion(paciente.direccion || "");
                    setSexo(paciente.sexo || "");
                    setFechaNacimiento(paciente.fechaNacimiento || "");
                }

            }catch(error){
                console.error("Paciente aún no registrado", error);
            }

            setLoading(false);
        };

        cargarPerfil();

    },[usuario.idUsuario]);

    const guardarPerfil = async (e)=>{

        e.preventDefault();

        const paciente={
            usuario:{ idUsuario: usuario.idUsuario },
            dni,
            telefono,
            direccion,
            sexo,
            fechaNacimiento
        };

        try{

            if(idPaciente){
                await actualizarPaciente(idPaciente,paciente);
            }else{
                await guardarPaciente(paciente);
            }

            alert("Perfil guardado correctamente");

        }catch(error){
            console.error(error);
            alert("Error guardando perfil");
        }
    }

    if(loading){
        return <p style={{padding:30}}>Cargando perfil...</p>
    }

    return(
        <div style={container}>

            <h2 style={{color:theme.colors.text}}>Mi Perfil</h2>

            <div style={card}>

                {/* HEADER */}
                <div style={perfilHeader}>

                    <div style={avatar}>
                        {usuario.nombres?.charAt(0)}
                    </div>

                    <div>
                        <h3 style={nombre}>
                            {usuario.nombres} {usuario.apellidos}
                        </h3>
                        <p style={correo}>{usuario.email}</p>
                    </div>

                </div>

                <hr style={divider}/>

                <h4 style={subtitulo}>Información personal</h4>

                <form onSubmit={guardarPerfil} style={formGrid}>

                    <Campo label="DNI">
                        <input value={dni} onChange={(e)=>setDni(e.target.value)} style={input} required/>
                    </Campo>

                    <Campo label="Teléfono">
                        <input value={telefono} onChange={(e)=>setTelefono(e.target.value)} style={input}/>
                    </Campo>

                    <Campo label="Dirección">
                        <input value={direccion} onChange={(e)=>setDireccion(e.target.value)} style={input}/>
                    </Campo>

                    <Campo label="Sexo">
                        <select value={sexo} onChange={(e)=>setSexo(e.target.value)} style={input}>
                            <option value="">Seleccione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </Campo>

                    <Campo label="Fecha de nacimiento">
                        <input type="date" value={fechaNacimiento} onChange={(e)=>setFechaNacimiento(e.target.value)} style={input}/>
                    </Campo>

                    <button style={btnPrimary}>
                        Guardar Cambios
                    </button>

                </form>

            </div>

        </div>
    )
}

function Campo({label, children}){
    return(
        <div style={field}>
            <label style={labelStyle}>{label}</label>
            {children}
        </div>
    )
}

/* estilos */

const container={padding:30,maxWidth:900}

const card={
background:"#fff",
borderRadius:16,
border:`1px solid ${theme.colors.border}`,
padding:30,
boxShadow:theme.shadow.card
}

const perfilHeader={
display:"flex",
alignItems:"center",
gap:16,
marginBottom:20
}

const avatar={
width:60,
height:60,
borderRadius:"50%",
background:`linear-gradient(135deg,#1E6FB9,#1FB5A9)`,
color:"#fff",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:22,
fontWeight:"bold"
}

const nombre={margin:0,fontSize:18}
const correo={margin:0,color:theme.colors.subtext}
const divider={margin:"20px 0"}
const subtitulo={marginBottom:16}

const formGrid={
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:18
}

const field={display:"flex",flexDirection:"column",gap:6}
const labelStyle={fontWeight:"600"}

const input={
padding:"10px",
borderRadius:10,
border:`1px solid ${theme.colors.border}`,
fontSize:14,
outline:"none"
}

const btnPrimary={
gridColumn:"span 2",
background:`linear-gradient(135deg,#1E6FB9,#1FB5A9)`,
color:"#fff",
border:"none",
padding:"12px",
borderRadius:10,
cursor:"pointer",
fontWeight:"bold"
}