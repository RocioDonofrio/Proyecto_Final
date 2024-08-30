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

const Accidente = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [peopleAffected, setPeopleAffected] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = () => {
    Alert.alert(
      "Alerta de Accidente Enviada",
      "La alerta de accidente ha sido enviada correctamente."
    );
    setLocation("");
    setDescription("");
    setPeopleAffected("");
    setAccidentType("");
    setAdditionalInfo("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Accidente</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ubicación del Accidente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección o coordenadas"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción del Accidente:</Text>
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
          placeholder="Cantidad de personas afectadas"
          value={peopleAffected}
          onChangeText={setPeopleAffected}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Accidente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Tráfico, Industrial, etc."
          value={accidentType}
          onChangeText={setAccidentType}
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
    backgroundColor: "#fdefd9",
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
    backgroundColor: "#fa9900",
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

export default Accidente;
