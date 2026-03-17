import { theme } from "../../styles/theme";

export default function Card({ titulo, valor, subtitulo, variant="primary" }) {

    const colors = {
        primary: theme.colors.primary,
        success: theme.colors.success,
        warning: theme.colors.warning,
        danger: theme.colors.danger
    };

    return (
        <div style={{
            background: theme.colors.white,
            borderRadius: theme.radius.md,
            padding:20,
            border:`1px solid ${theme.colors.border}`,
            boxShadow: theme.shadow.card
        }}>
            <div style={{ color: theme.colors.subtext }}>
                {titulo}
            </div>

            <div style={{
                fontSize:28,
                fontWeight:800,
                color: colors[variant],
                marginTop:6
            }}>
                {valor}
            </div>

            {subtitulo && (
                <div style={{ fontSize:12, color: theme.colors.subtext }}>
                    {subtitulo}
                </div>
            )}
        </div>
    );
}