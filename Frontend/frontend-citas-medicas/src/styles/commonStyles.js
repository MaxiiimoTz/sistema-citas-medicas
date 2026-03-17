import { theme } from "./theme";

export const tableStyles = {
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    th: {
        textAlign: "left",
        padding: 12,
        background: "#F9FAFB",
        color: theme.colors.subtext,
        fontSize: 14
    },
    td: {
        padding: 12,
        borderBottom: "1px solid #eee",
        fontSize: 14
    }
};