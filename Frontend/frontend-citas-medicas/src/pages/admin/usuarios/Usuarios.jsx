import { useEffect, useState } from "react";
import {
    listarUsuarios,
    cambiarEstadoUsuario,
    actualizarUsuario,
    agregarUsuario
} from "../../../services/usuarios.api";
import EditarUsuarioModal from "./EditarUsuarioModal";

export default function Usuarios() {

    /* ================= ESTADOS ================= */
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // Filtros
    const [filtroRol, setFiltroRol] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [busqueda, setBusqueda] = useState("");

    /* ================= CARGA ================= */
    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await listarUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    /* ================= ACCIONES ================= */
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
        } catch (error) {
            alert("Error al cambiar estado", error);
        }
    };

    /* ================= FILTRADO ================= */
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

    /* ================= RENDER ================= */
    return (
        <>
            <h2 style={{ marginBottom: 12 }}>Usuarios</h2>

            {/* BOTÓN NUEVO */}
            <button
                style={btnNuevo}
                onClick={() => setUsuarioEditando({})}
            >
                ➕ Agregar usuario
            </button>

            {/* FILTROS */}
            <div style={filtros}>
                <input
                    placeholder="Buscar por nombre o email"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    style={inputFiltro}
                />

                <select
                    value={filtroRol}
                    onChange={e => setFiltroRol(e.target.value)}
                    style={selectFiltro}
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
                    style={selectFiltro}
                >
                    <option value="">Todos</option>
                    <option value="ACTIVO">Activos</option>
                    <option value="INACTIVO">Inactivos</option>
                </select>
            </div>

            {/* TABLA */}
            <div style={contenedorTabla}>
                <table style={tabla}>
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
                            <tr key={usuario.idUsuario}>
                                <td style={td}>{usuario.nombres}</td>
                                <td style={td}>{usuario.apellidos}</td>
                                <td style={td}>{usuario.email}</td>
                                <td style={td}>
                                    {usuario.rol?.nombreRol || "—"}
                                </td>
                                <td style={td}>
                                    <div
                                        onClick={() => toggleEstado(usuario)}
                                        style={{
                                            width: 42,
                                            height: 22,
                                            borderRadius: 20,
                                            background: usuario.estado ? "#22c55e" : "#d1d5db",
                                            position: "relative",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 18,
                                                height: 18,
                                                borderRadius: "50%",
                                                background: "#fff",
                                                position: "absolute",
                                                top: 2,
                                                left: usuario.estado ? 22 : 2,
                                                boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
                                            }}
                                        />
                                    </div>
                                </td>
                                <td style={td}>
                                    <button
                                        style={btnEditar}
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
                    <p style={{ marginTop: 20, color: "#6b7280" }}>
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

                    } catch (error) {
                        alert("El correo ya está registrado ", error);
                    }
                }}
            />
        </>
    );
}

/* ================= ESTILOS ================= */

const filtros = {
    display: "flex",
    gap: 12,
    marginBottom: 16
};

const inputFiltro = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    width: 240
};

const selectFiltro = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db"
};

const contenedorTabla = {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
};

const tabla = {
    width: "100%",
    borderCollapse: "collapse"
};

const th = {
    textAlign: "left",
    padding: "12px 10px",
    fontSize: 14,
    borderBottom: "1px solid #e5e7eb"
};

const td = {
    padding: "12px 10px",
    fontSize: 14,
    borderBottom: "1px solid #f1f5f9"
};

const btnEditar = {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer"
};

const btnNuevo = {
    marginBottom: 12,
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer"
};