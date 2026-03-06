import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Completa correo y contraseña.");
            return;
        }

        try {
            const data = await loginRequest({ email, password });

            // Guardar sesión
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            // Si la contraseña es temporal → forzar cambio
            if (data.usuario.passwordTemporal) {
                navigate("/cambiar-password");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            setError("Credenciales incorrectas", error);
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h2 style={{ marginTop: 0 }}>Iniciar sesión</h2>

                <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                    <div>
                        <label style={label}>Correo</label>
                        <input
                            style={input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div>
                        <label style={label}>Contraseña</label>
                        <input
                            style={input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>

                    {error && (
                        <div style={errorBox}>
                            {error}
                        </div>
                    )}

                    <button style={btn} type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ================= ESTILOS ================= */

const container = {
    maxWidth: 420,
    margin: "100px auto",
    padding: 18
};

const card = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
};

const label = {
    fontSize: 14,
    fontWeight: 600,
    display: "block",
    marginBottom: 4
};

const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14
};

const btn = {
    marginTop: 10,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: 8,
    fontSize: 15,
    cursor: "pointer"
};

const errorBox = {
    background: "#fee2e2",
    border: "1px solid #fecaca",
    color: "#991b1b",
    padding: 10,
    borderRadius: 8,
    fontSize: 14
};