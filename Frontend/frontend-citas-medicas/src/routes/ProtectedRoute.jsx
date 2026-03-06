import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, rolPermitido }) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.passwordTemporal) {
        return <Navigate to="/cambiar-password" replace />;
    }

    if (rolPermitido && usuario.rol?.nombreRol !== rolPermitido) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}