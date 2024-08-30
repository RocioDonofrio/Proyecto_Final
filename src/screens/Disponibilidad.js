import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles/DisponibilidadEstilos";
import Header from "../components/Header";

const Disponibilidad = ({ navigation }) => {
  const bomberos = [
    { id: "19", nombre: "jsnvjdn", estado: "QRV", hora: "08:30" },
    { id: "5", nombre: "dkj kjd ", estado: "QAP", hora: "09:15" },
    { id: "3", nombre: "kjfd dvkj", estado: "QRT", hora: "10:00" },
    { id: "2", nombre: "jsnvjdn", estado: "QRV", hora: "08:30" },
    { id: "1", nombre: "dkj kjd ", estado: "QAP", hora: "09:15" },
    { id: "43", nombre: "kjfd dvkj", estado: "QRT", hora: "10:00" },
    { id: "65", nombre: "jsnvjdn", estado: "QRV", hora: "08:30" },
    { id: "54", nombre: "dkj kjd ", estado: "QAP", hora: "09:15" },
    { id: "34", nombre: "kjfd dvkj", estado: "QRT", hora: "10:00" },
    { id: "32", nombre: "jsnvjdn", estado: "QRV", hora: "08:30" },
    { id: "12", nombre: "dkj kjd ", estado: "QAP", hora: "09:15" },
    { id: "34", nombre: "kjfd dvkj", estado: "QRT", hora: "10:00" },
  ];

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {bomberos.map((bombero) => (
          <View key={bombero.id} style={styles.item}>
            <View style={styles.unidadContainer}>
              <Text style={styles.unidad}>{bombero.id}</Text>
            </View>

            <Text style={styles.nombre}>{bombero.nombre}</Text>

            <View style={[styles.estadoContainer, styles[bombero.estado]]}>
              <Text style={styles.estado}>{bombero.estado}</Text>
            </View>

            <Text style={styles.hora}>{bombero.hora}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Disponibilidad;
