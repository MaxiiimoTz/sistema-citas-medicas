import { theme } from "../styles/theme";

export default function ReportCard({ icon, title, description, children }) {
    return (
        <div style={{
            background: theme.colors.white,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadow.card
        }}>
            <h3 style={{ marginBottom: 4, color: theme.colors.text }}>
                {icon} {title}
            </h3>
            <p style={{
                color: theme.colors.subtext,
                marginBottom: 20
            }}>
                {description}
            </p>
            {children}
        </div>
    );
}