import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCitasMedico,
  actualizarEstadoCita
} from "../../../services/medicos.api";

export default function Agenda() {

  const [citas, setCitas] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [observacion, setObservacion] = useState("");

  // 🔥 CARGAR DATOS
  const cargar = async () => {
    try {
      const userData = await AsyncStorage.getItem("usuario");
      const user = JSON.parse(userData || "{}");

      if (!user?.idUsuario) {
        Alert.alert("Error", "Usuario no válido");
        return;
      }

      setUsuario(user);

      const data = await getCitasMedico(user.idUsuario);
      setCitas(data);

    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargar();
  };

  // 🔥 ABRIR MODAL
  const atender = (cita: any) => {
    setCitaSeleccionada(cita);
    setObservacion("");
    setModalVisible(true);
  };

  // 🔥 CONFIRMAR ATENCIÓN
  const confirmarAtencion = async () => {

    if (!citaSeleccionada) return;

    if (!observacion.trim()) {
      Alert.alert("Error", "Agrega una observación");
      return;
    }

    try {

      await actualizarEstadoCita(
        citaSeleccionada.idCita,
        "Atendida"
      );

      // 🔥 aquí luego puedes guardar observación en historia clínica

      setModalVisible(false);
      setObservacion("");
      cargar();

      Alert.alert("Éxito", "Cita atendida correctamente");

    } catch {
      Alert.alert("Error", "No se pudo actualizar");
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E6FB9" />
        <Text style={{ marginTop: 10 }}>Cargando agenda...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Mi Agenda</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.idCita.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tienes citas registradas
          </Text>
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.fecha}>
              📅 {item.fecha} - {item.hora}
            </Text>

            <Text style={styles.paciente}>
              👤 {item.paciente?.usuario?.nombres} {item.paciente?.usuario?.apellidos}
            </Text>

            <Text style={[
              styles.estado,
              {
                color:
                  item.estado === "Pendiente" ? "#F59E0B" :
                  item.estado === "Atendida" ? "#10B981" :
                  "#EF4444"
              }
            ]}>
              {item.estado}
            </Text>

            {item.estado === "Pendiente" && (
              <Pressable
                style={styles.btn}
                onPress={() => atender(item)}
              >
                <Text style={styles.btnText}>
                  Atender
                </Text>
              </Pressable>
            )}

          </View>

        )}
      />

      {/* 🔥 MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">

        <View style={styles.modal}>
          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>Atención médica</Text>

            <TextInput
              placeholder="Observación / receta médica..."
              style={styles.input}
              value={observacion}
              onChangeText={setObservacion}
              multiline
            />

            <Pressable style={styles.btn} onPress={confirmarAtencion}>
              <Text style={styles.btnText}>Guardar atención</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </Pressable>

          </View>
        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
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

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#6B7280"
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2
  },

  fecha: {
    fontWeight: "bold",
    fontSize: 15
  },

  paciente: {
    marginTop: 6,
    color: "#374151"
  },

  estado: {
    marginTop: 6,
    fontWeight: "600"
  },

  btn: {
    backgroundColor: "#1E6FB9",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
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
    marginBottom: 10,
    height: 90,
    textAlignVertical: "top"
  },

  cancel: {
    textAlign: "center",
    marginTop: 10,
    color: "#6B7280"
  }

});