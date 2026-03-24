import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetalleCita() {

  const [obs, setObs] = useState("");

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Detalle Cita</Text>

      <Text>Paciente: Juan</Text>
      <Text>Motivo: Consulta</Text>

      <TextInput
        placeholder="Observación"
        style={styles.input}
        value={obs}
        onChangeText={setObs}
      />

      <Pressable style={styles.btn}>
        <Text style={{ color: "#fff" }}>Marcar atendida</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginTop: 10 },
  btn: { backgroundColor: "#10B981", padding: 12, borderRadius: 10, marginTop: 10 }
});