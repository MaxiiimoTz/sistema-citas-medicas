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
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getUsuarios,
  crearUsuario,
  cambiarEstadoUsuario
} from "../../../services/usuario.api";

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<boolean | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [nuevo, setNuevo] = useState({
    nombres: "",
    apellidos: "",
    email: ""
  });

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      Alert.alert("Error", "No se pudo cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const crear = async () => {

    if (!nuevo.nombres || !nuevo.apellidos || !nuevo.email) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await crearUsuario({
        ...nuevo,
        rol: { idRol: 1 }
      });

      setModalVisible(false);
      setNuevo({ nombres: "", apellidos: "", email: "" });
      cargarUsuarios();

      Alert.alert("Éxito", "Usuario creado");

    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const toggleEstado = async (u: any) => {
    try {
      await cambiarEstadoUsuario(u.idUsuario, !u.estado);
      cargarUsuarios();
    } catch {
      Alert.alert("Error", "No se pudo actualizar");
    }
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const coincideBusqueda =
      `${u.nombres} ${u.apellidos}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroActivo === null ? true : u.estado === filtroActivo;

    return coincideBusqueda && coincideEstado;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E6FB9" />
          <Text style={{ marginTop: 10 }}>Cargando usuarios...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Usuarios</Text>

        {/* BUSCADOR */}
        <TextInput
          placeholder="Buscar usuario..."
          style={styles.input}
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {/* FILTROS */}
        <View style={styles.row}>
          <Filtro text="Todos" onPress={() => setFiltroActivo(null)} />
          <Filtro text="Activos" onPress={() => setFiltroActivo(true)} />
          <Filtro text="Inactivos" onPress={() => setFiltroActivo(false)} />
        </View>

        {/* CREAR */}
        <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnText}>+ Crear Usuario</Text>
        </Pressable>

        {/* LISTA */}
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.idUsuario.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay usuarios</Text>
          }
          renderItem={({ item }) => (

            <View style={styles.card}>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {item.nombres} {item.apellidos}
                </Text>

                <Text style={styles.email}>{item.email}</Text>

                <Text style={{
                  color: item.estado ? "#10B981" : "#EF4444",
                  marginTop: 4
                }}>
                  {item.estado ? "Activo" : "Inactivo"}
                </Text>
              </View>

              <Pressable
                onPress={() => toggleEstado(item)}
                style={[
                  styles.btnEstado,
                  { backgroundColor: item.estado ? "#EF4444" : "#10B981" }
                ]}
              >
                <Text style={styles.btnTextSmall}>
                  {item.estado ? "Desactivar" : "Activar"}
                </Text>
              </Pressable>

            </View>

          )}
        />

        {/* 🔥 MODAL PRO */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modal}>
            <View style={styles.modalCard}>

              <Text style={styles.modalTitle}>Nuevo Usuario</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombres</Text>
                <TextInput
                  placeholder="Ej: Juan"
                  style={styles.inputModal}
                  value={nuevo.nombres}
                  onChangeText={(t) => setNuevo({ ...nuevo, nombres: t })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                  placeholder="Ej: Pérez"
                  style={styles.inputModal}
                  value={nuevo.apellidos}
                  onChangeText={(t) => setNuevo({ ...nuevo, apellidos: t })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo</Text>
                <TextInput
                  placeholder="correo@email.com"
                  style={styles.inputModal}
                  value={nuevo.email}
                  onChangeText={(t) => setNuevo({ ...nuevo, email: t })}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.modalActions}>

                <Pressable
                  style={styles.btnCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.btnCancelText}>Cancelar</Text>
                </Pressable>

                <Pressable style={styles.btnSave} onPress={crear}>
                  <Text style={styles.btnSaveText}>Guardar</Text>
                </Pressable>

              </View>

            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

/* FILTRO */
const Filtro = ({ text, onPress }: any) => (
  <Pressable style={styles.filtro} onPress={onPress}>
    <Text>{text}</Text>
  </Pressable>
);

/* ESTILOS */
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

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },

  filtro: {
    backgroundColor: "#E5E7EB",
    padding: 8,
    borderRadius: 8
  },

  btn: {
    backgroundColor: "#1E6FB9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
  },

  btnTextSmall: {
    color: "#fff",
    fontSize: 12
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  name: {
    fontWeight: "bold"
  },

  email: {
    color: "#6B7280"
  },

  btnEstado: {
    padding: 8,
    borderRadius: 8
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280"
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },

  inputGroup: {
    marginBottom: 12
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4
  },

  inputModal: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  modalActions: {
    flexDirection: "row",
    marginTop: 15
  },

  btnSave: {
    backgroundColor: "#1E6FB9",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: "center"
  },

  btnSaveText: {
    color: "#fff",
    fontWeight: "600"
  },

  btnCancel: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: "center"
  },

  btnCancelText: {
    color: "#111827",
    fontWeight: "500"
  }

});