import { View, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export default function Card({ children }: any) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        padding: 18,
        borderRadius: theme.radius.lg,
        ...theme.shadow.card,
        marginBottom: 12
    }
});