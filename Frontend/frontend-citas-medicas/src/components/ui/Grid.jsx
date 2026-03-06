export default function Grid({ children }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
                marginTop: 20,
            }}
        >
            {children}
        </div>
    );
}