/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    listarUsuarios,
    cambiarEstadoUsuario,
    actualizarUsuario,
    agregarUsuario
} from "../../../services/usuarios.api";
import EditarUsuarioModal from "./EditarUsuarioModal";
import { theme } from "../../../styles/theme";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const [filtroRol, setFiltroRol] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [busqueda, setBusqueda] = useState("");

    const cargarUsuarios = async () => {
        try {
            const data = await listarUsuarios();
            setUsuarios(data);
        } catch (error) {
            toast.error("Error cargando usuarios", error);
        }
    };

    const toggleEstado = async (usuario) => {
        try {
            const actualizado = await cambiarEstadoUsuario(
                usuario.idUsuario,
                !usuario.estado
            );

            setUsuarios(prev =>
                prev.map(u =>
                    u.idUsuario === actualizado.idUsuario ? actualizado : u
                )
            );

        } catch {
            toast.error("Error al cambiar estado");
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter(u => {

        const cumpleRol =
            filtroRol === "" || u.rol?.nombreRol === filtroRol;

        const cumpleEstado =
            filtroEstado === "" ||
            (filtroEstado === "ACTIVO" && u.estado) ||
            (filtroEstado === "INACTIVO" && !u.estado);

        const cumpleBusqueda =
            busqueda === "" ||
            `${u.nombres} ${u.apellidos} ${u.email}`
                .toLowerCase()
                .includes(busqueda.toLowerCase());

        return cumpleRol && cumpleEstado && cumpleBusqueda;

    });

    return (
        <div style={{ padding: 10 }}>

            <h2 style={{
                marginBottom: 16,
                color: theme.colors.text
            }}>
                Gestión de Usuarios
            </h2>

            {/* BOTÓN */}
            <button
                style={{
                    marginBottom: 16,
                    background: theme.colors.secondary,
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                }}
                onClick={() => setUsuarioEditando({})}
            >
                ➕ Agregar usuario
            </button>

            {/* FILTROS */}
            <div style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                flexWrap: "wrap"
            }}>

                <input
                    placeholder="Buscar por nombre o email"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: `1px solid ${theme.colors.border}`,
                        width: 260,
                        outline: "none"
                    }}
                />

                <select
                    value={filtroRol}
                    onChange={e => setFiltroRol(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">Todos los roles</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="PACIENTE">Paciente</option>
                    <option value="MEDICO">Médico</option>
                    <option value="OPERADOR_ASISTENCIAL">
                        Operador asistencial
                    </option>
                </select>

                <select
                    value={filtroEstado}
                    onChange={e => setFiltroEstado(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">Todos</option>
                    <option value="ACTIVO">Activos</option>
                    <option value="INACTIVO">Inactivos</option>
                </select>

            </div>

            {/* TABLA */}
            <div style={{
                background: theme.colors.white,
                borderRadius: 18,
                padding: 20,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: theme.shadow.card
            }}>

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>

                    <thead>
                        <tr>
                            <th style={th}>Nombres</th>
                            <th style={th}>Apellidos</th>
                            <th style={th}>Email</th>
                            <th style={th}>Rol</th>
                            <th style={th}>Estado</th>
                            <th style={th}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {usuariosFiltrados.map(usuario => (

                            <tr key={usuario.idUsuario} style={row}>

                                <td style={td}>{usuario.nombres}</td>
                                <td style={td}>{usuario.apellidos}</td>
                                <td style={td}>{usuario.email}</td>

                                <td style={td}>
                                    <span style={badge}>
                                        {usuario.rol?.nombreRol || "—"}
                                    </span>
                                </td>

                                <td style={td}>
                                    <div
                                        onClick={() => toggleEstado(usuario)}
                                        style={{
                                            width: 44,
                                            height: 24,
                                            borderRadius: 20,
                                            background: usuario.estado
                                                ? theme.colors.success
                                                : "#d1d5db",
                                            position: "relative",
                                            cursor: "pointer",
                                            transition: "0.3s"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: "50%",
                                                background: "#fff",
                                                position: "absolute",
                                                top: 2,
                                                left: usuario.estado ? 22 : 2,
                                                transition: "0.3s"
                                            }}
                                        />
                                    </div>
                                </td>

                                <td style={td}>
                                    <button
                                        style={{
                                            background: theme.colors.primary,
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: 8,
                                            cursor: "pointer",
                                            fontWeight: 500
                                        }}
                                        onClick={() => setUsuarioEditando(usuario)}
                                    >
                                        ✏️ Editar
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {usuariosFiltrados.length === 0 && (
                    <p style={{
                        marginTop: 20,
                        color: theme.colors.subtext
                    }}>
                        No hay resultados
                    </p>
                )}

            </div>

            {/* MODAL */}
            <EditarUsuarioModal
                usuario={usuarioEditando}
                onClose={() => setUsuarioEditando(null)}
                onGuardar={async (usuarioActualizado) => {

                    try {

                        let resultado;

                        if (usuarioActualizado.idUsuario) {

                            resultado = await actualizarUsuario(
                                usuarioActualizado.idUsuario,
                                usuarioActualizado
                            );

                            setUsuarios(prev =>
                                prev.map(u =>
                                    u.idUsuario === resultado.idUsuario
                                        ? resultado
                                        : u
                                )
                            );

                        } else {

                            resultado = await agregarUsuario(usuarioActualizado);
                            setUsuarios(prev => [...prev, resultado]);

                        }

                        setUsuarioEditando(null);

                    } catch {
                        toast.error("Error guardando usuario");
                    }

                }}
            />
        </div>
    );
}

/* ===== ESTILOS ===== */

const selectStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid #e5e7eb`,
    outline: "none"
};

const th = {
    textAlign: "left",
    padding: "12px 10px",
    fontSize: 13,
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb"
};

const td = {
    padding: "12px 10px",
    fontSize: 14,
    borderBottom: "1px solid #f1f5f9"
};

const row = {
    transition: "0.2s"
};

const badge = {
    background: "#eef2ff",
    padding: "4px 8px",
    borderRadius: 6,
    fontSize: 12
};