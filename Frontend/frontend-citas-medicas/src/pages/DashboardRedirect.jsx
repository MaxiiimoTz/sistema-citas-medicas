import { Navigate } from "react-router-dom";

export default function DashboardRedirect() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const rol = usuario.rol?.nombreRol;

    switch (rol) {

        case "ADMIN":
            return <Navigate to="/admin/dashboard" replace />;

        case "MEDICO":
            return <Navigate to="/medico/dashboard" replace />;

        case "PACIENTE":
            return <Navigate to="/paciente/dashboard" replace />;

        case "OPERADOR":
            return <Navigate to="/operador/dashboard" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
}