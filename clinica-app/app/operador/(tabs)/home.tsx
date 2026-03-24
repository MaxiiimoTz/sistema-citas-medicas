import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OperadorHome() {

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Operador</Text>

      <Pressable style={styles.btn} onPress={() => router.push("/operador/buscar-paciente")}>
        <Text style={styles.text}>Buscar Paciente</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  btn: { backgroundColor: "#1E6FB9", padding: 15, borderRadius: 10, marginTop: 20 },
  text: { color: "#fff", textAlign: "center" }
});