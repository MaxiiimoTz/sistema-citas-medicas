import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

/* ITEM MENU */
function Item({ to, label, active }) {
    return (
        <Link to={to} style={{
            display:"flex",
            alignItems:"center",
            gap:10,
            padding:"10px 14px",
            borderRadius:8,
            color: active ? "#ccfbf1" : "#9ca3af",
            textDecoration:"none",
            marginBottom:6,
            background: active ? "rgba(20,184,166,0.12)" : "transparent",
            borderLeft: active ? "3px solid #14b8a6" : "3px solid transparent",
            fontWeight: active ? 600 : 500,
            transition:"0.2s"
        }}>
            {label}
        </Link>
    );
}

export default function AppLayout(){

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const rol = usuario?.rol?.nombreRol;

    const logout = ()=>{
        localStorage.clear();
        navigate("/login");
    };

    /* MENU CON ICONOS */
    const menu = {
        ADMIN:[
            {to:"/admin/dashboard",label:"📊 Dashboard"},
            {to:"/admin/usuarios",label:"👤 Usuarios"},
            {to:"/admin/horarios",label:"🕒 Horarios"},
            {to:"/admin/reportes",label:"📈 Reportes"}
        ],
        MEDICO:[
            {to:"/dashboard",label:"📊 Dashboard"},
            {to:"/agenda",label:"📅 Agenda"}
        ],
        PACIENTE:[
            {to:"/paciente/dashboard",label:"📊 Dashboard"},
            {to:"/paciente/agendar",label:"📝 Agendar"},
            {to:"/paciente/mis-citas",label:"📅 Mis citas"},
            {to:"/paciente/historial",label:"📜 Historial"},
            {to:"/paciente/perfil",label:"⚙️ Perfil"}
        ]
    }[rol] || [];

    return(
        <div style={layout}>

            {/* SIDEBAR */}
            <aside style={sidebar}>

                <div style={logoContainer}>
                    <img src="/logo.jpg" style={{ width:110 }} />
                </div>

                <div style={{marginTop:20}}>
                    {menu.map(item=>(
                        <Item key={item.to} {...item} active={pathname===item.to}/>
                    ))}
                </div>

            </aside>

            {/* MAIN */}
            <div style={main}>

                {/* HEADER */}
                <div style={header}>

                    <div style={{
                        fontWeight:600,
                        color:"#111827"
                    }}>
                        {rol}
                    </div>

                    <div style={userBox}>

                        <div style={avatar}>
                            {usuario?.nombres?.charAt(0)}
                        </div>

                        <div>
                            <div style={{fontWeight:600}}>
                                {usuario?.nombres}
                            </div>
                            <div style={{
                                fontSize:12,
                                color:"#6b7280"
                            }}>
                                {rol}
                            </div>
                        </div>

                        <button onClick={logout} style={btnLogout}>
                            Salir
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div style={content}>
                    <Outlet/>
                </div>

            </div>

        </div>
    );
}

/* ===== ESTILOS ===== */

const layout = {
    display:"grid",
    gridTemplateColumns:"220px 1fr",
    minHeight:"100vh",
    background:"#f1f5f9"
};

/* 🔥 sidebar clínico oscuro */
const sidebar = {
    background:"#0d1a42", // azul oscuro profundo (mejor que negro)
    padding:"20px 16px",
    color:"#fff",
    display:"flex",
    flexDirection:"column"
};

/* 🔥 logo integrado */
const logoContainer = {
    textAlign:"center",
    marginBottom:20,
    paddingBottom:15,
    borderBottom:"1px solid rgba(255,255,255,0.08)"
};

const main = {
    display:"flex",
    flexDirection:"column"
};

/* 🔥 header limpio */
const header = {
    height:60,
    background:"#ffffff",
    borderBottom:"1px solid #e5e7eb",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"0 20px"
};

const userBox = {
    display:"flex",
    alignItems:"center",
    gap:10
};

/* 🔥 avatar con color clínico */
const avatar = {
    width:34,
    height:34,
    borderRadius:"50%",
    background:"#14b8a6", // turquesa del logo
    color:"#fff",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontWeight:600,
    fontSize:14
};

const btnLogout = {
    marginLeft:10,
    background:"#ef4444",
    color:"#fff",
    border:"none",
    padding:"6px 10px",
    borderRadius:6,
    cursor:"pointer",
    fontSize:13
};

const content = {
    padding:24
};