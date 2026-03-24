import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Alert
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getEspecialidades } from "../services/especialidades.api";
import { getMedicosByEspecialidad } from "../services/medicos.api";
import {
  getHorariosDisponibles,
  crearCita
} from "../services/citas.api";
import { getPacienteByUsuario } from "../services/pacientes.api";

export default function AgendarCita() {

  // 🔥 STATES BACKEND
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);

  const [especialidad, setEspecialidad] = useState<any>(null);
  const [medico, setMedico] = useState<any>(null);
  const [fecha, setFecha] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");

  const [showEspecialidad, setShowEspecialidad] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🔥 LOAD ESPECIALIDADES
  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      const data = await getEspecialidades();
      setEspecialidades(data);
    } catch {
      Alert.alert("Error", "No se pudieron cargar especialidades");
    }
  };

  // 🔥 SELECT ESPECIALIDAD
  const seleccionarEspecialidad = async (esp: any) => {
    setEspecialidad(esp);
    setMedico(null);
    setHorarios([]);

    try {
      const data = await getMedicosByEspecialidad(esp.idEspecialidad);
      setMedicos(data);
    } catch {
      Alert.alert("Error", "No se pudieron cargar médicos");
    }
  };

  // 🔥 HORARIOS REALES
  const cargarHorarios = async () => {

    if (!medico || !fecha) {
      Alert.alert("Error", "Selecciona médico y fecha");
      return;
    }

    try {
      setLoadingHorarios(true);
      setHorarios([]);

      const data = await getHorariosDisponibles(
        medico.idMedico,
        fecha
      );

      setHorarios(data);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }).start();

    } catch {
      Alert.alert("Error", "No se pudieron cargar horarios");
    } finally {
      setLoadingHorarios(false);
    }
  };

  // 🔥 GUARDAR CITA REAL
  const guardarCita = async () => {

    if (!medico || !fecha || !hora) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {

      const usuario = JSON.parse(
        await AsyncStorage.getItem("usuario") || "{}"
      );

      const paciente = await getPacienteByUsuario(usuario.idUsuario);

      const data = {
        paciente: { idPaciente: paciente.idPaciente },
        medico: { idMedico: medico.idMedico },
        fecha,
        hora,
        motivo
      };

      await crearCita(data);

      setShowConfirm(false);

      Alert.alert("Éxito", "Cita registrada correctamente");

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar la cita");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Agendar Cita</Text>

        {/* ESPECIALIDAD */}
        <Text style={styles.label}>Especialidad</Text>
        <Pressable style={styles.input} onPress={() => setShowEspecialidad(true)}>
          <Text>
            {especialidad?.nombreEspecialidad || "Seleccionar especialidad"}
          </Text>
        </Pressable>

        {/* MEDICO */}
        <Text style={styles.label}>Médico</Text>
        <View style={styles.row}>
          {medicos.map((m) => (
            <Chip
              key={m.idMedico}
              text={m.usuario.nombres}
              selected={medico?.idMedico === m.idMedico}
              onPress={() => setMedico(m)}
            />
          ))}
        </View>

        {/* FECHA */}
        <Text style={styles.label}>Fecha</Text>
        <Pressable style={styles.input} onPress={() => setShowCalendar(true)}>
          <Text>{fecha || "Seleccionar fecha"}</Text>
        </Pressable>

        {/* BUSCAR HORARIOS */}
        <Pressable style={styles.searchBtn} onPress={cargarHorarios}>
          <Text style={{ color: "#fff" }}>Buscar horarios</Text>
        </Pressable>

        {/* HORARIOS */}
        <Text style={styles.label}>Horarios</Text>

        {loadingHorarios ? (
          <View style={styles.row}>
            {[1,2,3,4].map(i => (
              <View key={i} style={styles.skeleton} />
            ))}
          </View>
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.row}>
              {horarios.map((h) => (
                <Chip
                  key={h.hora}
                  text={`${h.hora} • ${h.consultorio}`}
                  selected={hora === h.hora}
                  onPress={() => setHora(h.hora)}
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* MOTIVO */}
        <Text style={styles.label}>Motivo</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Describe tu consulta"
          value={motivo}
          onChangeText={setMotivo}
          multiline
        />

        {/* BOTÓN */}
        <Pressable style={styles.btn} onPress={() => setShowConfirm(true)}>
          <Text style={styles.btnText}>Confirmar cita</Text>
        </Pressable>

      </ScrollView>

      {/* MODAL ESPECIALIDAD */}
      <Modal visible={showEspecialidad} animationType="slide">
        <SafeAreaView style={{ padding: 20 }}>
          {especialidades.map(e => (
            <Pressable
              key={e.idEspecialidad}
              onPress={() => {
                seleccionarEspecialidad(e);
                setShowEspecialidad(false);
              }}
              style={styles.modalItem}
            >
              <Text>{e.nombreEspecialidad}</Text>
            </Pressable>
          ))}
        </SafeAreaView>
      </Modal>

      {/* CALENDARIO */}
      <Modal visible={showCalendar} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.calendarCard}>

            <Text style={styles.calendarTitle}>
              Seleccionar fecha
            </Text>

            <Calendar
              onDayPress={(day) => {
                setFecha(day.dateString);
                setShowCalendar(false);
              }}
            />

            <Pressable style={styles.closeBtn} onPress={() => setShowCalendar(false)}>
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      {/* CONFIRMACIÓN */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              Confirmar cita
            </Text>

            <Text>{especialidad?.nombreEspecialidad}</Text>
            <Text>{medico?.usuario?.nombres}</Text>
            <Text>{fecha} - {hora}</Text>

            <Pressable style={styles.btn} onPress={guardarCita}>
              <Text style={styles.btnText}>Confirmar</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

/* CHIP */
const Chip = ({ text, selected, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.chip,
      selected && styles.chipActive
    ]}
  >
    <Text style={[styles.chipText, selected && { color: "#fff" }]}>
      {text}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { marginTop: 15, marginBottom: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  chipActive: { backgroundColor: "#1E6FB9" },
  chipText: { color: "#111" },
  btn: {
    backgroundColor: "#1E6FB9",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20
  },
  btnText: { color: "#fff", fontWeight: "600" },
  searchBtn: {
    backgroundColor: "#1FB5A9",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },
  skeleton: {
    width: 70,
    height: 35,
    backgroundColor: "#E5E7EB",
    borderRadius: 20
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end"
  },
  calendarCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center"
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: "#1E6FB9",
    padding: 12,
    borderRadius: 12,
    alignItems: "center"
  }
});