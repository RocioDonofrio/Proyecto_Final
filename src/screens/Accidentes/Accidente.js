import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const Accidente = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [rescueType, setRescueType] = useState("");
  const [description, setDescription] = useState("");
  const [peopleRescued, setPeopleRescued] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = () => {
    if (!location || !rescueType || !description) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos.");
      return;
    }

    // Muestra un mensaje de éxito en lugar de enviar la alerta a Firebase
    Alert.alert(
      "🚨 Alerta Enviada!",
      `El reporte del Accidente ha sido enviado correctamente.\n\nDetalles:\nUbicación: ${location}\nTipo de Accidente: ${rescueType}\nDescripción: ${description}\nPersonas Rescatadas: ${
        peopleRescued || "N/A"
      }\nObservaciones: ${additionalInfo || "N/A"}`
    );

    // Limpia los campos del formulario
    setLocation("");
    setRescueType("");
    setDescription("");
    setPeopleRescued("");
    setAdditionalInfo("");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e53935" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reporte de Accidente</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.link, { color: theme.color }]}>
            Cambiar tema temporalmente
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reporte de Accidente</Text>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="location" size={30} color="#e53935" />
            <Text style={[styles.label, { color: theme.color }]}>
              Ubicación
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="¿Dónde ocurrió el Accidente?"
            placeholderTextColor="#777"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="alert-circle" size={30} color="#e53935" />
            <Text style={[styles.label, { color: theme.color }]}>
              Tipo de Accidente
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ej: Acuático, Montañés"
            placeholderTextColor="#777"
            value={rescueType}
            onChangeText={setRescueType}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="document-text-outline" size={30} color="#e53935" />
            <Text style={[styles.label, { color: theme.color }]}>
              Descripción
            </Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe lo sucedido"
            placeholderTextColor="#777"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="people" size={30} color="#e53935" />
            <Text style={[styles.label, { color: theme.color }]}>
              Personas Rescatadas
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de personas"
            placeholderTextColor="#777"
            value={peopleRescued}
            onChangeText={setPeopleRescued}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="information-circle" size={30} color="#e53935" />
            <Text style={[styles.label, { color: theme.color }]}>
              Observaciones
            </Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Información adicional"
            placeholderTextColor="#777"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
    marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#e53935",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    color: "#444",
    marginLeft: 12,
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 18,
    color: "#333",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: "#e53935",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Accidente;
