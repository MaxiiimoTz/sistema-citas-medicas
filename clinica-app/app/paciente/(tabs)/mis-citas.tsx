import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCitasPaciente } from "../../../services/citas.api";

type EstadoCita = "Pendiente" | "Atendida" | "Cancelada";

export default function MisCitas() {

  const [citas, setCitas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getColor = (estado: EstadoCita) => {
    switch (estado) {
      case "Pendiente": return "#F59E0B";
      case "Atendida": return "#10B981";
      case "Cancelada": return "#EF4444";
      default: return "#6B7280";
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuario");
        const user = JSON.parse(userData || "{}");

        const data = await getCitasPaciente(user.idUsuario);
        setCitas(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1E6FB9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Mis Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.idCita.toString()}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.fecha}>
              {item.fecha} - {item.hora?.substring(0,5)}
            </Text>

            <Text style={styles.medico}>
              👨‍⚕️ {item.medico?.usuario?.nombres}
            </Text>

            <View style={[
              styles.badge,
              { backgroundColor: getColor(item.estado) }
            ]}>
              <Text style={styles.badgeText}>{item.estado}</Text>
            </View>

            {item.estado === "Pendiente" && (
              <TouchableOpacity style={styles.btnCancelar}>
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
            )}

          </View>

        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 20, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1E6FB9", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 16, marginBottom: 12, elevation: 3 },
  fecha: { fontWeight: "bold", fontSize: 15, marginBottom: 5 },
  medico: { color: "#374151", marginBottom: 10 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  btnCancelar: { backgroundColor: "#EF4444", padding: 10, borderRadius: 10, alignItems: "center" }
});