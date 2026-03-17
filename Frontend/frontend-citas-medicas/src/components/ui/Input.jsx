import { theme } from "../../styles/theme";

export default function Input(props){
    return(
        <input
            {...props}
            style={{
                width:"100%",
                padding:"10px",
                borderRadius: theme.radius.sm,
                border:`1px solid ${theme.colors.border}`
            }}
        />
    );
}