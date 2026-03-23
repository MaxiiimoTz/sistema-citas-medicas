import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { citas } from "../../constants/mockData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisCitas() {

type EstadoCita = "Pendiente" | "Atendida" | "Cancelada";

  const getColor = (estado: EstadoCita) => {
    
    switch (estado) {
      case "Pendiente": return "#F59E0B";
      case "Atendida": return "#10B981";
      case "Cancelada": return "#EF4444";
      default: return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Mis Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.idCita.toString()}
        renderItem={({ item }) => (

          <View style={styles.card}>

            {/* FECHA */}
            <Text style={styles.fecha}>
              {item.fecha} - {item.hora}
            </Text>

            {/* MÉDICO */}
            <Text style={styles.medico}>
              👨‍⚕️ {item.medico.usuario.nombres}
            </Text>

            {/* ESTADO */}
            <View style={[
              styles.badge,
              { backgroundColor: getColor(item.estado) }
            ]}>
              <Text style={styles.badgeText}>{item.estado}</Text>
            </View>

            {/* BOTÓN */}
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

  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
    paddingTop: 40
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E6FB9",
    marginBottom: 15
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3
  },

  fecha: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5
  },

  medico: {
    color: "#374151",
    marginBottom: 10
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },

  btnCancelar: {
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  }

});