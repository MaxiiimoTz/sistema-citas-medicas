import { tableStyles } from "../../styles/commonStyles";

export default function Table({ columns, data, renderActions }) {
    return (
        <table style={tableStyles.table}>

            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col} style={tableStyles.th}>{col}</th>
                    ))}
                    {renderActions && <th style={tableStyles.th}></th>}
                </tr>
            </thead>

            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {Object.values(row).map((val, j) => (
                            <td key={j} style={tableStyles.td}>{val}</td>
                        ))}
                        {renderActions && (
                            <td style={tableStyles.td}>
                                {renderActions(row)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>

        </table>
    );
}