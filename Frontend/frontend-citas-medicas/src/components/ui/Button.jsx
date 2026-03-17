import { theme } from "../../styles/theme";

export default function Button({ children, variant="primary", ...props }) {

    const styles = {
        primary: { background: theme.colors.primary, color:"#fff" },
        secondary: { background: theme.colors.secondary, color:"#fff" },
        danger: { background: theme.colors.danger, color:"#fff" }
    };

    return (
        <button
            {...props}
            style={{
                ...styles[variant],
                border:"none",
                padding:"10px 14px",
                borderRadius: theme.radius.sm,
                cursor:"pointer",
                fontWeight:600
            }}
        >
            {children}
        </button>
    );
}