import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.api";
import { theme } from "../styles/theme";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginRequest({ email, password });

            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            navigate("/dashboard");

        } catch {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div style={container}>

            {/* PANEL IZQUIERDO (branding) */}
            <div style={leftPanel}>
                <img src="/logo.jpg" style={{ width: 140, marginBottom: 20 }} />
                <h1 style={title}>Clínica Versalles</h1>
                <p style={subtitle}>
                    Sistema de gestión médica
                </p>
            </div>

            {/* FORMULARIO */}
            <div style={rightPanel}>

                <div style={card}>

                    <h2 style={loginTitle}>Iniciar sesión</h2>
                    <p style={loginSubtitle}>
                        Ingresa tus credenciales para continuar
                    </p>

                    <form onSubmit={onSubmit} style={form}>

                        <input
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={input}
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={input}
                        />

                        {error && <div style={errorBox}>{error}</div>}

                        <button style={btn}>
                            Ingresar
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

/* ===== ESTILOS ===== */

const container = {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: theme.colors.background
};

const leftPanel = {
    background: "linear-gradient(135deg,#1E6FB9,#1FB5A9)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40
};

const title = {
    margin: 0,
    fontSize: 28
};

const subtitle = {
    opacity: 0.9,
    marginTop: 8
};

const rightPanel = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const card = {
    width: 360,
    background: "#fff",
    padding: 30,
    borderRadius: 18,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
};

const loginTitle = {
    marginBottom: 6
};

const loginSubtitle = {
    color: theme.colors.subtext,
    marginBottom: 20
};

const form = {
    display: "grid",
    gap: 14
};

const input = {
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${theme.colors.border}`,
    outline: "none",
    fontSize: 14
};

const btn = {
    background: "linear-gradient(135deg,#1E6FB9,#1FB5A9)",
    color: "#fff",
    padding: 12,
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 6
};

const errorBox = {
    background: "#fee2e2",
    border: "1px solid #fecaca",
    padding: 10,
    borderRadius: 8,
    color: "#991b1b",
    fontSize: 14
};