import {
  View,
  Text,
  StyleSheet,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../../constants/theme";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useRouter } from "expo-router";

export default function Home() {

  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.getItem("usuario").then(data => {
      if (data) setUsuario(JSON.parse(data));
    });

    Animated.timing(fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Animated.View style={{ opacity: fade }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.saludo}>
            Hola, {usuario?.nombres} 👋
          </Text>
          <Text style={styles.sub}>
            ¿Cómo te sientes hoy?
          </Text>
        </View>

        {/* CARD */}
        <Card>
          <Text style={styles.cardTitle}>Próxima cita</Text>
          <Text style={styles.cardText}>
            25/03/2026 - 09:00
          </Text>
          <Text style={styles.cardSub}>
            Dr. Carlos - Cardiología
          </Text>
        </Card>

        {/* BOTONES */}
        <Button
          title="Agendar cita"
          onPress={() => router.push("/agendar-cita")}
        />

        <View style={{ height: 10 }} />

        <Button
          title="Ver mis citas"
          onPress={() => router.push("/mis-citas")}
        />

      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  saludo: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text
  },
  sub: {
    color: theme.colors.subtext,
    marginTop: 4
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: 6
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  cardSub: {
    color: theme.colors.subtext,
    marginTop: 4
  }
});