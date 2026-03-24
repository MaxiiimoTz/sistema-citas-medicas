import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";
import {
  getCitasSemana,
  getCitasEstado,
  getCitasMedico,
  getPacientesPeriodo
} from "../../../services/reportes.api";

import { LineChart, PieChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function Reportes() {

  const [semana, setSemana] = useState<any[]>([]);
  const [estado, setEstado] = useState<any[]>([]);
  const [medico, setMedico] = useState<any[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {

      const [
        semanaData,
        estadoData,
        medicoData,
        pacientesData
      ] = await Promise.all([
        getCitasSemana(),
        getCitasEstado(),
        getCitasMedico(),
        getPacientesPeriodo()
      ]);

      setSemana(semanaData || []);
      setEstado(estadoData || []);
      setMedico(medicoData || []);
      setPacientes(pacientesData || []);

    } catch (error) {
      console.log("ERROR REPORTES:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // 🔥 LOADING
  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E6FB9" />
          <Text style={{ marginTop: 10 }}>Cargando reportes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>Dashboard</Text>

        {/* 📊 SEMANA */}
        <Card title="Citas por semana">
          <LineChart
            data={{
              labels: semana.length ? semana.map(i => i.dia) : ["-"],
              datasets: [{
                data: semana.length ? semana.map(i => i.citas) : [0]
              }]
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>

        {/* 🥧 ESTADO */}
        <Card title="Estado de citas">
          <PieChart
            data={
              estado.length
                ? estado.map((e, i) => ({
                    name: e.nombre,
                    population: e.valor,
                    color: colors[i % colors.length],
                    legendFontColor: "#333",
                    legendFontSize: 12
                  }))
                : [{
                    name: "Sin datos",
                    population: 1,
                    color: "#ccc",
                    legendFontColor: "#333",
                    legendFontSize: 12
                  }]
            }
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card>

        {/* 📊 MÉDICOS */}
        <Card title="Citas por médico">
          <BarChart
            data={{
              labels: medico.length
                ? medico.map(m => m.medico?.split(" ")[0])
                : ["-"],
              datasets: [{
                data: medico.length
                  ? medico.map(m => m.total)
                  : [0]
              }]
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
            style={styles.chart}
          />
        </Card>

        {/* 📈 PACIENTES */}
        <Card title="Pacientes (últimos días)">
          <LineChart
            data={{
              labels: pacientes.length
                ? pacientes.map(p => p.fecha?.slice(5))
                : ["-"],
              datasets: [{
                data: pacientes.length
                  ? pacientes.map(p => p.total)
                  : [0]
              }]
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔥 CARD */
const Card = ({ title, children }: any) => (
  <View style={styles.card}>
    <Text style={styles.subtitle}>{title}</Text>
    {children}
  </View>
);

/* 🎨 CONFIG */
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: () => "#1E6FB9",
  labelColor: () => "#6B7280"
};

const colors = ["#1E6FB9", "#10B981", "#F59E0B", "#EF4444"];

/* 🎨 ESTILOS */
const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#F4F6F8"
  },

  container: {
    padding: 15,
    paddingBottom: 40
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginTop: 15,
    elevation: 3
  },

  subtitle: {
    fontWeight: "600",
    marginBottom: 10
  },

  chart: {
    borderRadius: 12
  }

});