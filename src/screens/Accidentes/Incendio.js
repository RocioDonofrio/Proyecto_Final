import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

const Incendio = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [peopleAffected, setPeopleAffected] = useState("");
  const [fireType, setFireType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Alerta de Incendio Enviada",
      "La alerta de incendio ha sido enviada correctamente."
    );
    setLocation("");
    setDescription("");
    setPeopleAffected("");
    setFireType("");
    setAdditionalInfo("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Incendio</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ubicación del Incendio:</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección o coordenadas"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción del Incendio:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de Personas Afectadas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad de personas en peligro"
          value={peopleAffected}
          onChangeText={setPeopleAffected}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Incendio:</Text>
        <TextInput
          style={styles.input}
          placeholder="Residencial, Forestal, etc. O CÓDIGO"
          value={fireType}
          onChangeText={setFireType}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Observaciones Adicionales:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Información adicional"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Alerta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fee0d4",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: "#ec1818",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#d80707",
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#f9f9f9",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Incendio;
