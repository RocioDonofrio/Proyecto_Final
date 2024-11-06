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

const Incendio = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [peopleAffected, setPeopleAffected] = useState("");
  const [fireType, setFireType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const { theme, toggleTheme } = useTheme();

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
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ff7043" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reporte de Incendio</Text>
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
        <Text style={styles.title}>Reporte de Incendio</Text>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="location-outline" size={24} color="#ff7043" />
            <Text style={[styles.label, { color: theme.color }]}>
              Ubicación del Incendio
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Dirección o coordenadas"
            placeholderTextColor="#aaa"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="clipboard-outline" size={24} color="#ff7043" />
            <Text style={[styles.label, { color: theme.color }]}>
              Descripción del Incendio
            </Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalles del incidente"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="people-outline" size={24} color="#ff7043" />
            <Text style={[styles.label, { color: theme.color }]}>
              Personas Afectadas
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de personas en peligro"
            placeholderTextColor="#aaa"
            value={peopleAffected}
            onChangeText={setPeopleAffected}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="flame-outline" size={24} color="#ff7043" />
            <Text style={[styles.label, { color: theme.color }]}>
              Tipo de Incendio
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Residencial, Forestal, Industrial"
            placeholderTextColor="#aaa"
            value={fireType}
            onChangeText={setFireType}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#ff7043"
            />
            <Text style={[styles.label, { color: theme.color }]}>
              Observaciones
            </Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalles adicionales"
            placeholderTextColor="#aaa"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Alerta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeccd",
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
    color: "#ff7043",
    marginLeft: 10,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff7043",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#ff7043",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Incendio;
