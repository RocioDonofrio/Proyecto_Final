import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import email from "react-native-email";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app, db } from "../../../credenciales";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const firestore = getFirestore(app);

export default function EnviarFormulario() {
  const [location, setLocation] = useState("");
  const [rescueType, setRescueType] = useState("");
  const [description, setDescription] = useState("");
  const [peopleRescued, setPeopleRescued] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "usuarios"));
        const usuariosData = querySnapshot.docs.map((doc) => doc.data().email);
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleEnviarCorreo = () => {
    if (!location || !rescueType || !description) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos.");
      return;
    }

    const to = usuarios;
    const subject = "🚨 Reporte de Accidente";
    const body = `
      🚨 Reporte de Accidente 🚨

      Detalles:
      Ubicación: ${location}
      Tipo de Accidente: ${rescueType}
      Descripción: ${description}
      Personas Rescatadas: ${peopleRescued || "N/A"}
      Observaciones: ${additionalInfo || "N/A"}
    `;

    email(to, {
      subject: subject,
      body: body,
    }).catch(console.error);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={50} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Reporte de Accidente</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="location" size={30} color="#e53935" />
            <Text style={styles.label}>Ubicación</Text>
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
            <Text style={styles.label}>Tipo de Accidente</Text>
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
            <Text style={styles.label}>Descripción</Text>
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
            <Text style={styles.label}>Personas Rescatadas</Text>
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
            <Text style={styles.label}>Observaciones</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleEnviarCorreo}>
          <Text style={styles.buttonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e53935",
    textAlign: "center",
    marginBottom: 20,
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
    fontSize: 18,
    color: "#444",
    marginLeft: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
