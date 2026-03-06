import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cambiarPasswordRequest } from "../services/auth.api";

export default function CambiarPassword() {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!password || !confirmar) {
            setError("Completa todos los campos");
            return;
        }

        if (password !== confirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {

            const res = await cambiarPasswordRequest({
                idUsuario: usuario.idUsuario,
                password: password
            });

            if (!res) {
                throw new Error("No se pudo cambiar la contraseña");
            }

            // actualizar usuario en localStorage
            const usuarioActualizado = {
                ...usuario,
                passwordTemporal: false
            };

            localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

            navigate("/dashboard");

        } catch (error) {
            setError("Error al cambiar contraseña");
            console.error(error);
        }
    };

    return (
        <div style={container}>
            <div style={card}>

                <h2>Cambiar contraseña</h2>
                <p>Debes cambiar tu contraseña para continuar</p>

                <form onSubmit={onSubmit} style={{display:"grid", gap:12}}>

                    <input
                        style={input}
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <input
                        style={input}
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmar}
                        onChange={(e)=>setConfirmar(e.target.value)}
                    />

                    {error && <div style={errorBox}>{error}</div>}

                    <button style={btn}>
                        Guardar contraseña
                    </button>

                </form>

            </div>
        </div>
    );
}

/* estilos */

const container = {
    maxWidth:420,
    margin:"100px auto",
    padding:18
}

const card = {
    background:"#fff",
    border:"1px solid #e5e7eb",
    borderRadius:16,
    padding:24,
    boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
}

const input = {
    width:"100%",
    padding:"10px 12px",
    borderRadius:8,
    border:"1px solid #d1d5db"
}

const btn = {
    background:"#4f46e5",
    color:"#fff",
    border:"none",
    padding:"10px",
    borderRadius:8,
    cursor:"pointer"
}

const errorBox = {
    background:"#fee2e2",
    border:"1px solid #fecaca",
    color:"#991b1b",
    padding:10,
    borderRadius:8
}