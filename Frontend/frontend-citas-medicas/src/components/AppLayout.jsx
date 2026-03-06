import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

function Item({ to, label, active }) {
    return (
        <Link
        to={to}
        style={{
            display: "block",
            padding: "10px 12px",
            borderRadius: 12,
            textDecoration: "none",
            background: active ? "#e9ecff" : "transparent",
            border: active ? "1px solid #cfd6ff" : "1px solid transparent",
            marginBottom: 8,
            fontWeight: 600,
        }}
        >
        {label}
        </Link>
    );
}

export default function AppLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const rol = usuario?.rol?.nombreRol;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    
    const menuPorRol = {
        ADMIN: [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/usuarios", label: "Usuarios" },
        { to: "/admin/reportes", label: "Reportes" },
        ],
        MEDICO: [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/agenda", label: "Mi agenda" },
        { to: "/citas", label: "Citas" },
        { to: "/historial", label: "Historial" },
        ],
        PACIENTE: [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/mis-citas", label: "Mis citas" },
        { to: "/reservar", label: "Reservar cita" },
        { to: "/historial", label: "Historial" },
        ],
        OPERADOR: [
            { to: "/dashboard", label: "Dashboard" },
            { to: "/registrar-cita", label: "Registrar cita" },
            { to: "/citas", label: "Gestionar citas" },
            { to: "/registrar-paciente", label: "Registrar paciente" },
        ]
    };

    const menu = menuPorRol[rol] || [];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
        <aside style={{ padding: 16, borderRight: "1px solid #e6e8f2", background: "#fff" }}>
            <h3 style={{ marginTop: 0 }}>Citas Médicas</h3>

            <div style={{ marginTop: 16 }}>
            {menu.map((item) => (
                <Item key={item.to} to={item.to} label={item.label} active={pathname === item.to} />
            ))}
            </div>
        </aside>

        <div style={{ display: "flex", flexDirection: "column" }}>
            <header
            style={{
                height: 64,
                padding: "0 20px",
                borderBottom: "1px solid #e6e8f2",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
            }}
            >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800 }}>
                    {usuario?.nombres} {usuario?.apellidos}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>
                    {rol}
                </div>
                </div>

                <button
                onClick={logout}
                style={{ padding: "8px 12px", borderRadius: 10, background: "#111", color: "#fff" }}
                >
                Salir
                </button>
            </div>
            </header>

            <main style={{ padding: 20, flex: 1 }}>
            <Outlet />
            </main>
        </div>
        </div>
    );
}