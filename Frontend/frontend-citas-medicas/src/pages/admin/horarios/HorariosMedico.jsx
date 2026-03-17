import { useEffect, useState } from "react";
import { obtenerMedicos } from "../../../services/medico.api";
import { guardarHorario } from "../../../services/horario.api";
import { theme } from "../../../styles/theme";

export default function HorariosMedico(){

    const [medicos,setMedicos] = useState([]);

    const [form,setForm] = useState({
        idMedico:"",
        diasSemana:[],
        horaInicio:"",
        horaFin:"",
        duracionMinutos:30
    });

    useEffect(()=>{
        obtenerMedicos().then(setMedicos);
    },[]);

    /* ===== SELECCIONAR DÍAS ===== */

    const toggleDia = (dia)=>{
        if(form.diasSemana.includes(dia)){
            setForm({
                ...form,
                diasSemana: form.diasSemana.filter(d=>d!==dia)
            });
        }else{
            setForm({
                ...form,
                diasSemana: [...form.diasSemana,dia]
            });
        }
    };

    /* ===== GUARDAR MASIVO ===== */

    const guardar = async ()=>{
        try{

            if(!form.idMedico || form.diasSemana.length===0){
                alert("Completa los datos");
                return;
            }

            for(const dia of form.diasSemana){

                await guardarHorario({
                    idMedico: form.idMedico,
                    diaSemana: dia,
                    horaInicio: form.horaInicio,
                    horaFin: form.horaFin,
                    duracionMinutos: form.duracionMinutos
                });

            }

            alert("Horarios guardados correctamente 🚀");

            setForm({
                idMedico:"",
                diasSemana:[],
                horaInicio:"",
                horaFin:"",
                duracionMinutos:30
            });

        }catch{
            alert("Error guardando horario");
        }
    };

    /* ===== UI ===== */

    return(
        <div style={container}>

            <h2 style={title}>Gestión de Horarios Médicos</h2>

            <div style={card}>

                {/* MÉDICO */}
                <div>
                    <label style={label}>Médico</label>
                    <select
                        value={form.idMedico}
                        onChange={e=>setForm({...form,idMedico:e.target.value})}
                        style={input}
                    >
                        <option value="">Seleccione médico</option>
                        {medicos.map(m=>(
                            <option key={m.idMedico} value={m.idMedico}>
                                {m.usuario.nombres} {m.usuario.apellidos}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DÍAS */}
                <div>
                    <label style={label}>Días de atención</label>

                    <div style={diasContainer}>
                        {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"].map(dia=>(
                            <div
                                key={dia}
                                onClick={()=>toggleDia(dia)}
                                style={{
                                    ...diaBox,
                                    background: form.diasSemana.includes(dia)
                                        ? theme.colors.primary
                                        : "#f1f5f9",
                                    color: form.diasSemana.includes(dia)
                                        ? "#fff"
                                        : "#374151"
                                }}
                            >
                                {dia}
                            </div>
                        ))}
                    </div>
                </div>

                {/* HORAS */}
                <div style={row}>
                    <div style={{flex:1}}>
                        <label style={label}>Hora inicio</label>
                        <input
                            type="time"
                            value={form.horaInicio}
                            onChange={e=>setForm({...form,horaInicio:e.target.value})}
                            style={input}
                        />
                    </div>

                    <div style={{flex:1}}>
                        <label style={label}>Hora fin</label>
                        <input
                            type="time"
                            value={form.horaFin}
                            onChange={e=>setForm({...form,horaFin:e.target.value})}
                            style={input}
                        />
                    </div>
                </div>

                {/* DURACIÓN */}
                <div>
                    <label style={label}>Duración cita</label>
                    <select
                        value={form.duracionMinutos}
                        onChange={e=>setForm({...form,duracionMinutos:e.target.value})}
                        style={input}
                    >
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={60}>60 min</option>
                    </select>
                </div>

                {/* BOTÓN */}
                <button onClick={guardar} style={button}>
                    Guardar horarios
                </button>

            </div>

        </div>
    );
}

/* ===== ESTILOS PRO ===== */

const container={padding:30};

const title={
    marginBottom:20,
    fontWeight:600
};

const card={
    background:"#fff",
    padding:25,
    borderRadius:18,
    display:"flex",
    flexDirection:"column",
    gap:18,
    maxWidth:500,
    border:"1px solid #e5e7eb",
    boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
};

const label={
    fontSize:13,
    fontWeight:600,
    marginBottom:5,
    display:"block"
};

const input={
    width:"100%",
    padding:"10px 12px",
    borderRadius:10,
    border:"1px solid #ddd",
    marginTop:4
};

const row={
    display:"flex",
    gap:10
};

const diasContainer={
    display:"flex",
    flexWrap:"wrap",
    gap:10
};

const diaBox={
    padding:"8px 12px",
    borderRadius:10,
    cursor:"pointer",
    fontSize:13,
    fontWeight:500,
    transition:"0.2s"
};

const button={
    marginTop:10,
    background:`linear-gradient(135deg,${theme.colors.primary},${theme.colors.secondary})`,
    color:"#fff",
    border:"none",
    padding:"12px",
    borderRadius:12,
    cursor:"pointer",
    fontWeight:600,
    fontSize:14
};