import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import styles from "../styles/EnviarAlertaEstilos";

const EnviarAlerta = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonIncendio]}
          onPress={() => navigation.navigate("Incendio")}
        >
          <Text style={styles.buttonText}>Incendio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonAccidente]}
          onPress={() => navigation.navigate("Accidente")}
        >
          <Text style={styles.buttonText}>Accidente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRescate]}
          onPress={() => navigation.navigate("Rescate")}
        >
          <Text style={styles.buttonText}>Rescate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOtro]}
          onPress={() => navigation.navigate("Otro")}
        >
          <Text style={styles.buttonText}>Otro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnviarAlerta;
