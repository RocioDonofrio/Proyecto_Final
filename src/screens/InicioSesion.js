import React from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import styles from "../styles/InicioSesionEstilos";

const InicioSesion = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TextInput placeholder="Usuario" style={styles.input} />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />

      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate("EnviarAlerta")}
        color="#FF4500"
      />
    </View>
  );
};

export default InicioSesion;
