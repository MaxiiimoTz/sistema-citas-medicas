import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export default function Button({ title, onPress }: any) {
    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.btn,
            pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 }
        ]}
        >
        <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: theme.colors.primary,
        padding: 14,
        borderRadius: theme.radius.md,
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "600"
    }
});