/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { theme } from "../../../styles/theme";

export default function EditarUsuarioModal({
    usuario,
    onClose,
    onGuardar
}) {
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (usuario) {
            setForm(usuario);
        }
    }, [usuario]);

    if (!usuario || !form) return null;

    return (
        <div style={overlay} onClick={onClose}>
            <div style={modal} onClick={e => e.stopPropagation()}>
                
                {/* HEADER */}
                <div style={header}>
                    <h3 style={{ margin: 0 }}>Editar usuario</h3>
                </div>

                {/* BODY */}
                <div style={body}>
                    <Campo
                        label="Nombres"
                        value={form.nombres}
                        onChange={v => setForm({ ...form, nombres: v })}
                    />

                    <Campo
                        label="Apellidos"
                        value={form.apellidos}
                        onChange={v => setForm({ ...form, apellidos: v })}
                    />

                    <Campo
                        label="Email"
                        value={form.email}
                        onChange={v => setForm({ ...form, email: v })}
                    />

                    <div style={campo}>
                        <label style={labelStyle}>Rol</label>
                        <select
                            style={select}
                            value={form.rol?.idRol || ""}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    rol: { ...form.rol, idRol: e.target.value }
                                })
                            }
                        >
                            <option value={1}>Administrador</option>
                            <option value={2}>Paciente</option>
                            <option value={3}>Médico</option>
                            <option value={4}>Operador asistencial</option>
                        </select>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={acciones}>
                    <button style={btnCancelar} onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        style={btnGuardar}
                        onClick={() => onGuardar(form)}
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}

function Campo({ label, value, onChange }) {
    return (
        <div style={campo}>
            <label style={labelStyle}>{label}</label>
            <input
                style={input}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

/* ===== ESTILOS ===== */

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
};

const modal = {
    width: 460,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    overflow: "hidden"
};

const header = {
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.colors.border}`,
    background: "linear-gradient(135deg,#1E6FB9,#1FB5A9)",
    color: "#fff"
};

const body = {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14
};

const campo = {
    display: "flex",
    flexDirection: "column",
    gap: 6
};

const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text
};

const input = {
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${theme.colors.border}`,
    fontSize: 14,
    outline: "none"
};

const select = {
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${theme.colors.border}`,
    fontSize: 14,
    background: "#fff"
};

const acciones = {
    padding: 16,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    borderTop: `1px solid ${theme.colors.border}`,
    background: "#f9fafb"
};

const btnCancelar = {
    background: "#e5e7eb",
    border: "none",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer"
};

const btnGuardar = {
    background: theme.colors.primary,
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600
};