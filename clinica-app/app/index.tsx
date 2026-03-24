import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginRequest } from "../services/auth.api";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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
  }, []);

  const login = async () => {

    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {

      const data = await loginRequest({
        email,
        password
      });

      // 🔥 guardar sesión
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));

      const rol = data.usuario?.rol?.nombreRol;

      switch (rol) {

        case "ADMIN":
          router.replace("/admin/(tabs)/home");
          break;

        case "PACIENTE":
          router.replace("/paciente/(tabs)/home");
          break;

        case "MEDICO":
          router.replace("/medico/(tabs)/agenda");
          break;

        case "OPERADOR":
          router.replace("/operador/(tabs)/home");
          break;

        default:
          router.replace("/");
      }

    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Animated.View
        style={{
          width: "100%",
          opacity: fadeAnim,
          transform: [{ translateY }]
        }}
      >

        <View style={styles.header}>
          <Text style={styles.title}>Clínica Versalles</Text>
          <Text style={styles.subtitle}>
            Sistema de gestión médica
          </Text>
        </View>

        <View style={styles.card}>

          <Text style={styles.loginTitle}>Iniciar sesión</Text>

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            onPress={login}
            style={({ pressed }) => [
              styles.btn,
              (!email || !password) && { opacity: 0.5 },
              pressed && {
                transform: [{ scale: 0.97 }],
                opacity: 0.85
              }
            ]}
          >
            <Text style={styles.btnText}>Ingresar</Text>
          </Pressable>

        </View>

        <Text style={styles.footer}>
          © 2026 Clínica Versalles
        </Text>

      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    padding: 20
  },
  header: {
    alignItems: "center",
    marginBottom: 30
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E6FB9"
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 5
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    elevation: 4
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  btn: {
    backgroundColor: "#1E6FB9",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },
  btnText: {
    color: "#fff",
    fontWeight: "600"
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#9CA3AF"
  }
});