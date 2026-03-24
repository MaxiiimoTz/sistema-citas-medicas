import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function AdminHome() {

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Panel Administrativo</Text>

      <View style={styles.grid}>
        <Card title="Usuarios" onPress={() => router.push("/admin/usuarios")} />
        <Card title="Especialidades" onPress={() => router.push("/admin/especialidades")} />
        <Card title="Reportes" onPress={() => router.push("/admin/reportes")} />
      </View>

    </SafeAreaView>
  );
}

const Card = ({ title, onPress }: any) => (
  <Pressable onPress={onPress} style={styles.card}>
    <Text style={styles.cardText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    backgroundColor: "#1E6FB9",
    padding: 25,
    borderRadius: 16
  },
  cardText: { color: "#fff", fontWeight: "600" }
});