import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuscarPaciente() {

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Buscar Paciente</Text>

      <TextInput
        placeholder="Nombre o DNI"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginTop: 10 }
});