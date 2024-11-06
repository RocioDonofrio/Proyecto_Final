import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import styles from "../styles/EnviarAlertaEstilos";
import { useTheme } from "../context/ThemeContext";

const EnviarAlerta = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonIncendio]}
          onPress={() => navigation.navigate("Incendio")}
        >
          <Text style={[styles.buttonText, { color: theme.color }]}>
            Incendio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonAccidente]}
          onPress={() => navigation.navigate("Accidente")}
        >
          <Text style={[styles.buttonText, { color: theme.color }]}>
            Accidente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonRescate]}
          onPress={() => navigation.navigate("Rescate")}
        >
          <Text style={[styles.buttonText, { color: theme.color }]}>
            Rescate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.link, { color: theme.color }]}>
            Cambiar tema temporalmente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnviarAlerta;
