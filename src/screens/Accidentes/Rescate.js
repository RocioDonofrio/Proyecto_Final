import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

const Rescate = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [peopleRescued, setPeopleRescued] = useState("");
  const [rescueType, setRescueType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Alerta de Rescate Enviada",
      "La alerta de rescate ha sido enviada correctamente."
    );
    setLocation("");
    setDescription("");
    setPeopleRescued("");
    setRescueType("");
    setAdditionalInfo("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Rescate</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ubicación del Rescate:</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección o coordenadas"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción del Rescate:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de Personas Rescatadas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad de personas rescatadas"
          value={peopleRescued}
          onChangeText={setPeopleRescued}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Rescate:</Text>
        <TextInput
          style={styles.input}
          placeholder="Montaña, Acuático, etc."
          value={rescueType}
          onChangeText={setRescueType}
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
    backgroundColor: "#ffeac9",
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
    backgroundColor: "#f3d70a",
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Rescate;
