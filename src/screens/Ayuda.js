import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Ayuda = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manual de Ayuda para Bomberos</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introducción</Text>
        <Text style={styles.sectionContent}>
          Este manual proporciona información esencial para el personal de
          bomberos, incluyendo procedimientos de emergencia, protocolos de
          seguridad y recomendaciones para la gestión de situaciones críticas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Procedimientos de Emergencia</Text>
        <Text style={styles.sectionContent}>
          1. Activar la alarma de emergencia.
          {"\n"}2. Preparar el equipo de protección personal.
          {"\n"}3. Seguir las instrucciones del jefe de turno.
          {"\n"}4. Coordinar con otros equipos de emergencia.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protocolos de Seguridad</Text>
        <Text style={styles.sectionContent}>
          Asegúrate de:
          {"\n"}- Revisar el equipo antes de cada salida.
          {"\n"}- Mantener una comunicación constante con el equipo.
          {"\n"}- Conocer y seguir las rutas de evacuación.
          {"\n"}- Reportar cualquier anomalía de inmediato.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        <Text style={styles.sectionContent}>
          - Participar en entrenamientos periódicos.
          {"\n"}- Mantener un estado físico adecuado.
          {"\n"}- Conocer bien el área de trabajo y los edificios.
          {"\n"}- Consultar el manual en caso de duda.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Ayuda;
