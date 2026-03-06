export default function Card({ titulo, valor, subtitulo, color }) {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 18,
                padding: 20,
                borderLeft: `6px solid ${color}`,
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                transition: "0.2s"
            }}
        >
            <div style={{ fontSize: 14, color: "#666" }}>
                {titulo}
            </div>

            <div style={{ 
                fontSize: 32, 
                fontWeight: 900, 
                marginTop: 6,
                color: color
            }}>
                {valor}
            </div>

            {subtitulo && (
                <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
                    {subtitulo}
                </div>
            )}
        </div>
    );
}