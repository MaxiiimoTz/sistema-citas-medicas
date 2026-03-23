import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Animated
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  animation: "fade"
};

export default function AgendarCita() {

  const [step, setStep] = useState(0);

  const [especialidad, setEspecialidad] = useState<string | null>(null);
  const [medico, setMedico] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const especialidades = ["Cardiología", "Dermatología", "Pediatría"];
  const medicos = ["Dr. Juan", "Dra. María", "Dr. Luis"];
  const horarios = ["09:00", "10:00", "11:00", "12:00"];

  // 🔥 ANIMACIÓN ENTRADA
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
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
        <Text style={styles.title}>Agendar cita</Text>
        <Text style={styles.subtitle}>Completa los pasos</Text>

        {/* STEPPER */}
        <View style={styles.stepper}>
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              style={[
                styles.stepCircle,
                step >= i && styles.stepActive
              ]}
            />
          ))}
        </View>

        {/* CONTENIDO */}
        <View style={styles.cardContainer}>

          {/* STEP 1 */}
          {step === 0 && (
            <>
              <Text style={styles.section}>Especialidad</Text>

              {especialidades.map(item => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setEspecialidad(item);
                    setStep(1);
                  }}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed
                  ]}
                >
                  <Text style={styles.cardText}>{item}</Text>
                </Pressable>
              ))}
            </>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <>
              <Text style={styles.section}>Médico</Text>

              {medicos.map(item => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setMedico(item);
                    setStep(2);
                  }}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed
                  ]}
                >
                  <Text style={styles.cardText}>{item}</Text>
                </Pressable>
              ))}

              <Text style={styles.back} onPress={() => setStep(0)}>
                ← Volver
              </Text>
            </>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <>
              <Text style={styles.section}>Horario</Text>

              <FlatList
                data={horarios}
                numColumns={3}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setHora(item)}
                    style={({ pressed }) => [
                      styles.hora,
                      hora === item && styles.horaSelected,
                      pressed && { opacity: 0.7 }
                    ]}
                  >
                    <Text style={{
                      color: hora === item ? "#fff" : "#333",
                      fontWeight: "600"
                    }}>
                      {item}
                    </Text>
                  </Pressable>
                )}
              />

              <Pressable
                disabled={!hora}
                onPress={() => setStep(3)}
                style={({ pressed }) => [
                  styles.btn,
                  !hora && { opacity: 0.4 },
                  pressed && { transform: [{ scale: 0.97 }] }
                ]}
              >
                <Text style={styles.btnText}>Continuar</Text>
              </Pressable>

              <Text style={styles.back} onPress={() => setStep(1)}>
                ← Volver
              </Text>
            </>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <>
              <Text style={styles.section}>Confirmación</Text>

              <View style={styles.summary}>
                <Text style={styles.summaryText}>🏥 {especialidad}</Text>
                <Text style={styles.summaryText}>👨‍⚕️ {medico}</Text>
                <Text style={styles.summaryText}>⏰ {hora}</Text>
              </View>

              <Pressable
                onPress={() => alert("Cita agendada 🎉")}
                style={({ pressed }) => [
                  styles.btn,
                  pressed && { transform: [{ scale: 0.97 }] }
                ]}
              >
                <Text style={styles.btnText}>Confirmar cita</Text>
              </Pressable>

              <Text style={styles.back} onPress={() => setStep(2)}>
                ← Volver
              </Text>
            </>
          )}

        </View>

      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E6FB9"
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20
  },

  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  stepCircle: {
    flex: 1,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: "#E5E7EB"
  },

  stepActive: {
    backgroundColor: "#1E6FB9"
  },

  cardContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  card: {
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#F9FAFB"
  },

  cardText: {
    fontSize: 14
  },

  hora: {
    flex: 1,
    padding: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center"
  },

  horaSelected: {
    backgroundColor: "#1E6FB9"
  },

  btn: {
    backgroundColor: "#1E6FB9",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "600"
  },

  back: {
    marginTop: 15,
    color: "#1E6FB9"
  },

  summary: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20
  },

  summaryText: {
    marginBottom: 5
  }

});