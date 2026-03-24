import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrarCita() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registrar Cita</Text>

            <Pressable style={styles.btn}>
                <Text style={{ color: "#fff" }}>Registrar</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold" },
    btn: { backgroundColor: "#1E6FB9", padding: 15, borderRadius: 10, marginTop: 20 }
});