export default function ReportCard({ icon, title, description, children }) {
    return (
        <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}>
            <h3 style={{ marginBottom: 4 }}>
                {icon} {title}
            </h3>
            <p style={{ color: "#6b7280", marginBottom: 20 }}>
                {description}
            </p>
            {children}
        </div>
    );
}