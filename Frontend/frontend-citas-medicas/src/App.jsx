import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardRedirect from "./pages/DashboardRedirect";
import Citas from "./pages/Citas";
import Medicos from "./pages/Medicos";
import Pacientes from "./pages/Pacientes";
import Reportes from "./pages/admin/reportes/Reportes";
import Usuarios from "./pages/admin/usuarios/Usuarios";
import Agenda from "./pages/Agenda";
import MisCitas from "./pages/MisCitas";
import Reservar from "./pages/Reservar";
import Historial from "./pages/Historial";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardMedico from "./pages/medico/DashboardMedico";
import DashboardPaciente from "./pages/paciente/DashboardPaciente";
import DashboardOperador from "./pages/operador/DashboardOperador";
import CambiarPassword from "./pages/CambiarPassword";

export default function App() {
  return (
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

        {/* GENERALES */}
        <Route path="citas" element={<Citas />} />
        <Route path="medicos" element={<Medicos />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="mis-citas" element={<MisCitas />} />
        <Route path="reservar" element={<Reservar />} />
        <Route path="historial" element={<Historial />} />

      </Route>

      <Route path="*" element={<div style={{ padding: 20 }}>404</div>} />

    </Routes>
  );
}