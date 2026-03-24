import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Alert,
  ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";
import {
  getEspecialidades,
  crearEspecialidad,
  actualizarEspecialidad,
  eliminarEspecialidad
} from "../../../services/especialidades.api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Especialidades() {

  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombreEspecialidad: "",
    descripcion: ""
  });

  const cargar = async () => {
    try {
      const data = await getEspecialidades();
      setEspecialidades(data);
    } catch {
      Alert.alert("Error", "No se pudo cargar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {

    if (!form.nombreEspecialidad) {
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }

    try {
      if (editando) {
        await actualizarEspecialidad(editando.idEspecialidad, form);
      } else {
        await crearEspecialidad(form);
      }

      setModalVisible(false);
      setEditando(null);
      setForm({ nombreEspecialidad: "", descripcion: "" });
      cargar();

    } catch {
      Alert.alert("Error", "No se pudo guardar");
    }
  };

  const editar = (item: any) => {
    setEditando(item);
    setForm({
      nombreEspecialidad: item.nombreEspecialidad,
      descripcion: item.descripcion
    });
    setModalVisible(true);
  };

  const eliminar = (id: number) => {
    Alert.alert("Confirmar", "¿Eliminar especialidad?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: async () => {
          await eliminarEspecialidad(id);
          cargar();
        }
      }
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E6FB9" />
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Especialidades</Text>

        <Pressable
          style={styles.btn}
          onPress={() => {
            setEditando(null);
            setForm({ nombreEspecialidad: "", descripcion: "" });
            setModalVisible(true);
          }}
        >
          <Text style={styles.btnText}>+ Nueva</Text>
        </Pressable>

        <FlatList
          data={especialidades}
          keyExtractor={(item) => item.idEspecialidad.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay especialidades</Text>
          }
          renderItem={({ item }) => (

            <View style={styles.card}>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {item.nombreEspecialidad}
                </Text>

                <Text style={styles.desc}>
                  {item.descripcion}
                </Text>
              </View>

              <View style={styles.actions}>
                <Pressable onPress={() => editar(item)}>
                  <Text style={{ color: "#1E6FB9" }}>Editar</Text>
                </Pressable>

                <Pressable onPress={() => eliminar(item.idEspecialidad)}>
                  <Text style={{ color: "#EF4444" }}>Eliminar</Text>
                </Pressable>
              </View>

            </View>

          )}
        />

        {/* MODAL */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modal}>
            <View style={styles.modalCard}>

              <Text style={styles.modalTitle}>
                {editando ? "Editar" : "Nueva"} Especialidad
              </Text>

              <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={form.nombreEspecialidad}
                onChangeText={(t) => setForm({ ...form, nombreEspecialidad: t })}
              />

              <TextInput
                placeholder="Descripción"
                style={styles.input}
                value={form.descripcion}
                onChangeText={(t) => setForm({ ...form, descripcion: t })}
              />

              <Pressable style={styles.btn} onPress={guardar}>
                <Text style={styles.btnText}>Guardar</Text>
              </Pressable>

              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </Pressable>

            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#F4F6F8"
  },

  container: {
    flex: 1,
    padding: 20
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15
  },

  btn: {
    backgroundColor: "#1E6FB9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  btnText: {
    color: "#fff",
    textAlign: "center"
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  name: {
    fontWeight: "bold"
  },

  desc: {
    color: "#6B7280",
    marginTop: 4
  },

  actions: {
    justifyContent: "space-between"
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },

  modalCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  cancel: {
    textAlign: "center",
    marginTop: 10,
    color: "#6B7280"
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280"
  }

});