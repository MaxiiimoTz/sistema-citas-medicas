import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";

export default function Home() {

  const router = useRouter();

  const usuario = { nombres: "Máximo" };

  const proximaCita = {
    fecha: "25/03/2026",
    hora: "09:00",
    medico: "Dr. Carlos"
  };

  // 🔥 ANIMACIÓN
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ]).start();
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY }]
        }}
      >

        {/* HEADER */}
        <View style={styles.headerRow}>

          <View>
            <Text style={styles.saludo}>
              Hola, {usuario.nombres} 👋
            </Text>
            <Text style={styles.sub}>
              Bienvenido a tu panel de salud
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {usuario.nombres.charAt(0)}
            </Text>
          </View>

        </View>

        {/* CARD PROXIMA CITA */}
        <View style={styles.citaCard}>

          <Text style={styles.citaTitle}>Próxima cita</Text>

          {proximaCita ? (
            <>
              <Text style={styles.citaText}>
                {proximaCita.fecha} - {proximaCita.hora}
              </Text>
              <Text style={styles.citaDoctor}>
                {proximaCita.medico}
              </Text>
            </>
          ) : (
            <Text style={styles.citaText}>
              No tienes citas pendientes
            </Text>
          )}

        </View>

        {/* ACCIONES */}
        <View style={styles.actions}>

          <Pressable
            onPress={() => router.push("/agendar-cita")}
            style={({ pressed }) => [
              styles.actionBtn,
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                opacity: pressed ? 0.85 : 1
              }
            ]}
          >
            <Text style={styles.actionText}>Agendar cita</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/mis-citas")}
            style={({ pressed }) => [
              styles.secondaryBtn,
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                opacity: pressed ? 0.85 : 1
              }
            ]}
          >
            <Text style={styles.secondaryText}>Ver mis citas</Text>
          </Pressable>

        </View>

        {/* RESUMEN */}
        <View style={styles.summary}>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Pendientes</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>5</Text>
            <Text style={styles.summaryLabel}>Atendidas</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Canceladas</Text>
          </View>

        </View>

      </Animated.View>

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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1E6FB9",
    alignItems: "center",
    justifyContent: "center"
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold"
  },

  saludo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E6FB9"
  },

  sub: {
    color: "#6B7280",
    marginTop: 4
  },

  citaCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3
  },

  citaTitle: {
    fontWeight: "600",
    marginBottom: 10,
    color: "#374151"
  },

  citaText: {
    fontSize: 16,
    color: "#111827"
  },

  citaDoctor: {
    marginTop: 4,
    color: "#6B7280"
  },

  actions: {
    marginBottom: 20
  },

  actionBtn: {
    backgroundColor: "#1E6FB9",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  },

  secondaryBtn: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  secondaryText: {
    color: "#1E6FB9",
    fontWeight: "600"
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },

  summaryNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E6FB9"
  },

  summaryLabel: {
    fontSize: 12,
    color: "#6B7280"
  }

});