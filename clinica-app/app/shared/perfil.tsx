import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {

  const router = useRouter();

  const [usuario, setUsuario] = useState<any>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();

    cargarUsuario();

  }, []);

  const cargarUsuario = async () => {
    const data = await AsyncStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
  };

  const logout = async () => {
    await AsyncStorage.clear();
    router.replace("/");
  };

  if (!usuario) return null;

  return (
    <SafeAreaView style={styles.container}>

      <Animated.View style={{ opacity: fadeAnim }}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {usuario.nombres?.charAt(0)}
            </Text>
          </View>

          <Text style={styles.name}>
            {usuario.nombres} {usuario.apellidos}
          </Text>

          <Text style={styles.role}>
            {usuario.rol?.nombreRol}
          </Text>
        </View>

        {/* INFO */}
        <View style={styles.card}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{usuario.email}</Text>
        </View>

        {/* LOGOUT */}
        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>

      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8", padding: 20 },

  header: { alignItems: "center", marginBottom: 25 },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1E6FB9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },

  name: { fontSize: 20, fontWeight: "bold" },

  role: { color: "#6B7280", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  label: { color: "#6B7280" },

  value: { fontWeight: "600", marginTop: 5 },

  logoutBtn: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center"
  },

  logoutText: { color: "#fff", fontWeight: "600" }
});