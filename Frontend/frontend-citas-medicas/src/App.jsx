import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import DashboardRedirect from "./pages/DashboardRedirect";
import Reportes from "./pages/admin/reportes/Reportes";
import Usuarios from "./pages/admin/usuarios/Usuarios";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import HorariosMedico from "./pages/admin/horarios/HorariosMedico"
import DashboardMedico from "./pages/medico/DashboardMedico";
import DashboardPaciente from "./pages/paciente/DashboardPaciente";
import DashboardOperador from "./pages/operador/DashboardOperador";
import PerfilPaciente from "./pages/paciente/PerfilPaciente";
import MisCitas from "./pages/paciente/MisCitas";
import HistorialPaciente from "./pages/paciente/HistorialPaciente";
import AgendarCita from "./pages/paciente/AgendarCita";
import CambiarPassword from "./pages/CambiarPassword";

export default function App() {
  return (
    <>
      {/* CONTENEDOR DE NOTIFICACIONES */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cambiar-password" element={<CambiarPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<DashboardRedirect />} />

          {/* ADMIN */}
          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute rolPermitido="ADMIN">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/usuarios"
            element={
              <ProtectedRoute rolPermitido="ADMIN">
                <Usuarios />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/horarios"
            element={
              <ProtectedRoute rolPermitido="ADMIN">
                <HorariosMedico />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin/reportes"
            element={
              <ProtectedRoute rolPermitido="ADMIN">
                <Reportes />
              </ProtectedRoute>
            }
          />

          {/* PACIENTE */}
          <Route
            path="paciente/dashboard"
            element={
              <ProtectedRoute rolPermitido="PACIENTE">
                <DashboardPaciente />
              </ProtectedRoute>
            }
          />

          <Route
            path="paciente/agendar"
            element={
              <ProtectedRoute rolPermitido="PACIENTE">
                <AgendarCita />
              </ProtectedRoute>
            }
          />

          <Route
            path="paciente/mis-citas"
            element={
              <ProtectedRoute rolPermitido="PACIENTE">
                <MisCitas />
              </ProtectedRoute>
            }
          />

          <Route
            path="paciente/historial"
            element={
              <ProtectedRoute rolPermitido="PACIENTE">
                <HistorialPaciente />
              </ProtectedRoute>
            }
          />

          <Route
            path="paciente/perfil"
            element={
              <ProtectedRoute rolPermitido="PACIENTE">
                <PerfilPaciente />
              </ProtectedRoute>
            }
          />

          {/* MEDICO */}
          <Route
            path="medico/dashboard"
            element={
              <ProtectedRoute rolPermitido="MEDICO">
                <DashboardMedico />
              </ProtectedRoute>
            }
          />

          {/* OPERADOR */}
          <Route
            path="operador/dashboard"
            element={
              <ProtectedRoute rolPermitido="OPERADOR">
                <DashboardOperador />
              </ProtectedRoute>
            }
          />

        </Route>

        <Route path="*" element={<div style={{ padding: 20 }}>404</div>} />

      </Routes>
    </>
  );
}