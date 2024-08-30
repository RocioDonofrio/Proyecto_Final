import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Turnos = () => {
  const turnosData = [
    {
      id: 1,
      nombre: "AAAA",
      fecha: "2024-08-01",
      horario: "08:00 - 16:00",
    },
    {
      id: 2,
      nombre: "BBBB",
      fecha: "2024-08-02",
      horario: "16:00 - 00:00",
    },
    {
      id: 3,
      nombre: "CCCC",
      fecha: "2024-08-03",
      horario: "00:00 - 08:00",
    },
    {
      id: 4,
      nombre: "AAAA",
      fecha: "2024-08-01",
      horario: "08:00 - 16:00",
    },
    {
      id: 5,
      nombre: "BBBB",
      fecha: "2024-08-02",
      horario: "16:00 - 00:00",
    },
    {
      id: 6,
      nombre: "CCCC",
      fecha: "2024-08-03",
      horario: "00:00 - 08:00",
    },
    {
      id: 7,
      nombre: "AAAA",
      fecha: "2024-08-01",
      horario: "08:00 - 16:00",
    },
    {
      id: 8,
      nombre: "BBBB",
      fecha: "2024-08-02",
      horario: "16:00 - 00:00",
    },
    {
      id: 9,
      nombre: "CCCC",
      fecha: "2024-08-03",
      horario: "00:00 - 08:00",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Turnos</Text>
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Fecha</Text>
            <Text style={styles.headerText}>Horario</Text>
          </View>

          {turnosData.map((turno) => (
            <View key={turno.id} style={styles.tableRow}>
              <FontAwesome
                name="user"
                size={20}
                color="#4CAF50"
                style={styles.icon}
              />
              <Text style={styles.rowText}>{turno.nombre}</Text>
              <Text style={styles.rowText}>{turno.fecha}</Text>
              <Text style={styles.rowText}>{turno.horario}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#af0000",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    width: 100,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  rowText: {
    width: 100,
    textAlign: "center",
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
});

export default Turnos;
