import { useState, useEffect } from "react";
import { theme } from "../../styles/theme";
import { obtenerEspecialidades } from "../../services/especialidad.api";
import { obtenerMedicosPorEspecialidad } from "../../services/medico.api";
import { obtenerHorariosDisponibles } from "../../services/citas.api";
import axios from "axios";

const steps = ["Especialidad", "Médico", "Fecha y hora", "Confirmar"];

export default function AgendarCita(){

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const token = localStorage.getItem("token");

    const [step,setStep] = useState(0);
    const [success,setSuccess] = useState(false);

    const [especialidades,setEspecialidades] = useState([]);
    const [medicos,setMedicos] = useState([]);
    const [horarios,setHorarios] = useState([]);

    const [especialidad,setEspecialidad] = useState("");
    const [idMedico,setIdMedico] = useState("");
    const [fecha,setFecha] = useState("");
    const [hora,setHora] = useState("");
    const [motivo,setMotivo] = useState("");

    const hoy = new Date().toISOString().split("T")[0];

    /* ================= LOAD ================= */

    useEffect(()=>{
        obtenerEspecialidades().then(setEspecialidades);
    },[]);

    useEffect(()=>{
        if(especialidad){
            obtenerMedicosPorEspecialidad(especialidad)
                .then(setMedicos);
        }
    },[especialidad]);

    useEffect(()=>{
        if(idMedico && fecha){
            obtenerHorariosDisponibles(idMedico, fecha)
                .then(data=>{
                    console.log("HORARIOS:", data); // DEBUG
                    setHorarios(data);
                });
        }
    },[idMedico,fecha]);

    /* ================= HELPERS ================= */

    const getNombreEspecialidad = ()=>{
        const e = especialidades.find(e=>e.idEspecialidad == especialidad);
        return e ? e.nombreEspecialidad : "-";
    };

    const getMedico = ()=>{
        return medicos.find(m=>m.idMedico == idMedico);
    };

    const getNombreMedico = ()=>{
        const m = getMedico();
        return m ? `${m.usuario.nombres} ${m.usuario.apellidos}` : "-";
    };

    /* ================= ACTIONS ================= */

    const next = ()=> setStep(step+1);
    const back = ()=> setStep(step-1);

    const guardarCita = async ()=>{
        try{
            await axios.post("http://localhost:9090/api/citas",{
                paciente:{ usuario:{ idUsuario: usuario.idUsuario }},
                medico:{ idMedico },
                fecha,
                hora,
                motivo
            },{
                headers:{ Authorization:`Bearer ${token}` }
            });

            setSuccess(true);

        }catch(error){
            if(error.response?.data?.error === "HORARIO_OCUPADO"){
                alert("Ese horario ya fue tomado ⚠️");
            }else{
                alert("Error registrando cita");
            }
        }
    };

    const reset = ()=>{
        setSuccess(false);
        setStep(0);
        setEspecialidad("");
        setIdMedico("");
        setFecha("");
        setHora("");
        setMotivo("");
    };

    /* ================= SUCCESS ================= */

    if(success){
        return(
            <div style={successContainer}>
                <div style={successCard}>
                    <div style={checkCircle}>✓</div>
                    <h2>Cita agendada correctamente</h2>

                    <div style={successResumen}>
                        <b>{getNombreEspecialidad()}</b>
                        <p>{getNombreMedico()}</p>
                        <p>{fecha} - {hora}</p>
                    </div>

                    <button onClick={reset} style={button}>
                        Nueva cita
                    </button>
                </div>
            </div>
        )
    }

    /* ================= UI ================= */

    return(
        <div style={container}>

            <h2>Agendar Cita</h2>

            {/* STEPPER */}
            <div style={stepperWrapper}>
                <div style={stepper}>

                    <div style={line}></div>

                    <div style={{
                        ...lineProgress,
                        width:`${(step/(steps.length-1))*100}%`
                    }}></div>

                    {steps.map((s,i)=>{

                        const activo = i === step;
                        const completado = i < step;

                        return (
                            <div key={i} style={stepItem}>
                                <div style={{
                                    ...circle,
                                    background: completado
                                        ? theme.colors.primary
                                        : activo
                                        ? "#fff"
                                        : "#e5e7eb",
                                    color: completado
                                        ? "#fff"
                                        : activo
                                        ? theme.colors.primary
                                        : "#6b7280",
                                    border: activo
                                        ? `2px solid ${theme.colors.primary}`
                                        : "2px solid transparent"
                                }}>
                                    {completado ? "✓" : i+1}
                                </div>

                                <span style={{
                                    fontSize:12,
                                    color: activo ? theme.colors.primary : "#6b7280",
                                    fontWeight: activo ? 600 : 500
                                }}>
                                    {s}
                                </span>
                            </div>
                        )
                    })}

                </div>
            </div>

            <div style={layout}>

                {/* IZQUIERDA */}
                <div style={card}>

                    {/* STEP 1 */}
                    {step===0 && (
                        <>
                            <h3>Especialidad</h3>

                            <select value={especialidad} onChange={(e)=>setEspecialidad(e.target.value)} style={input}>
                                <option value="">Seleccione</option>
                                {especialidades.map(e=>(
                                    <option key={e.idEspecialidad} value={e.idEspecialidad}>
                                        {e.nombreEspecialidad}
                                    </option>
                                ))}
                            </select>

                            <button disabled={!especialidad} onClick={next} style={button}>
                                Siguiente
                            </button>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step===1 && (
                        <>
                            <h3>Médico</h3>

                            <select value={idMedico} onChange={(e)=>setIdMedico(e.target.value)} style={input}>
                                <option value="">Seleccione</option>
                                {medicos.map(m=>(
                                    <option key={m.idMedico} value={m.idMedico}>
                                        {m.usuario.nombres} {m.usuario.apellidos}
                                    </option>
                                ))}
                            </select>

                            <div style={nav}>
                                <button onClick={back} style={btnBack}>Atrás</button>
                                <button disabled={!idMedico} onClick={next} style={button}>Siguiente</button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {step===2 && (
                        <>
                            <h3>Fecha y horario</h3>

                            <input 
                                type="date"
                                min={hoy}
                                value={fecha}
                                onChange={(e)=>setFecha(e.target.value)}
                                style={input}
                            />

                            <div style={gridHoras}>
                                {horarios.map(h=>(
                                    <button
                                        key={h.hora}
                                        onClick={()=>setHora(h.hora)}
                                        style={{
                                            ...horaBtn,
                                            background: hora === h.hora
                                                ? theme.colors.primary
                                                : "#f1f5f9",
                                            color: hora === h.hora
                                                ? "#fff"
                                                : "#111827",
                                            border: hora === h.hora
                                                ? `2px solid ${theme.colors.primary}`
                                                : "1px solid #e5e7eb"
                                        }}
                                    >
                                        <div>{h.hora}</div>
                                        <small style={{fontSize:11}}>
                                            Consultorio {h.consultorio}
                                        </small>
                                    </button>
                                ))}
                            </div>

                            {/* MENSAJE SI NO HAY HORARIOS */}
                            {horarios.length === 0 && fecha && (
                                <p style={{color:"#9ca3af", fontSize:13}}>
                                    No hay horarios disponibles
                                </p>
                            )}

                            <textarea
                                placeholder="Motivo"
                                value={motivo}
                                onChange={(e)=>setMotivo(e.target.value)}
                                style={textarea}
                            />

                            <div style={nav}>
                                <button onClick={back} style={btnBack}>Atrás</button>

                                <button
                                    disabled={!fecha || !hora}
                                    style={{
                                        ...button,
                                        opacity: (!fecha || !hora) ? 0.5 : 1,
                                        cursor: (!fecha || !hora) ? "not-allowed" : "pointer"
                                    }}
                                    onClick={next}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 4 */}
                    {step===3 && (
                        <>
                            <h3>Confirmar</h3>

                            <div style={confirmCard}>
                                <p><b>{getNombreEspecialidad()}</b></p>
                                <p>{getNombreMedico()}</p>
                                <p>{fecha} - {hora}</p>
                                <p>{motivo || "-"}</p>
                            </div>

                            <div style={nav}>
                                <button onClick={back} style={btnBack}>Atrás</button>
                                <button onClick={guardarCita} style={button}>
                                    Confirmar
                                </button>
                            </div>
                        </>
                    )}

                </div>

                {/* DERECHA */}
                <div style={side}>
                    <h4>Resumen</h4>

                    <div style={resumenCard}>
                        <p><b>{getNombreEspecialidad()}</b></p>
                        <p>{getNombreMedico()}</p>
                        <p>{fecha || "-"} - {hora || "-"}</p>
                        <p>{motivo || "-"}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

/* ===== estilos ===== */

const container={padding:30}
const layout={display:"grid",gridTemplateColumns:"1fr 320px",gap:25}
const card={background:"#fff",padding:25,borderRadius:16}
const side={background:"#fff",padding:20,borderRadius:16}
const input={width:"100%",padding:10,marginBottom:12,borderRadius:10,border:"1px solid #ddd"}
const textarea={...input,minHeight:80}
const nav={display:"flex",justifyContent:"space-between"}

const button={
    background:`linear-gradient(135deg,${theme.colors.primary},${theme.colors.secondary})`,
    color:"#fff",
    border:"none",
    padding:"10px 16px",
    borderRadius:10
}

const btnBack={background:"#e5e7eb",padding:"10px 16px",borderRadius:10}
const confirmCard={background:"#f9fafb",padding:15,borderRadius:10}
const gridHoras={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:10}
const horaBtn={padding:"10px",borderRadius:10,border:"none"}
const resumenCard={background:"#f8fafc",padding:15,borderRadius:10}

const successContainer={display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}
const successCard={background:"#fff",padding:40,borderRadius:20,textAlign:"center"}
const checkCircle={width:80,height:80,borderRadius:"50%",background:"#22c55e",color:"#fff",fontSize:40,display:"flex",alignItems:"center",justifyContent:"center",margin:"auto"}
const successResumen={marginTop:10}

const stepperWrapper={display:"flex",justifyContent:"center",marginBottom:40}
const stepper={display:"flex",justifyContent:"space-between",width:"100%",maxWidth:600,position:"relative"}
const line={position:"absolute",top:16,left:0,right:0,height:4,background:"#e5e7eb"}
const lineProgress={position:"absolute",top:16,left:0,height:4,background:theme.colors.primary}
const stepItem={display:"flex",flexDirection:"column",alignItems:"center"}
const circle={width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}