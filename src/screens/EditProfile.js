import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth, db } from "../../credenciales";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const [userNumber, setUserNumber] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#214a17");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const loadUserProfile = async () => {
      const userInfo = auth.currentUser;
      if (userInfo) {
        try {
          const userDocRef = doc(db, "usuarios", userInfo.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserNumber(data.numeroBombero || "");
            setUserFullName(data.nombreCompleto || "");
            setSelectedColor(data.color || "#214a17");
          } else {
            Alert.alert("Error", "No se encontró el perfil del usuario.");
          }
        } catch (error) {
          Alert.alert("Error al cargar datos", error.message);
        }
      } else {
        Alert.alert("Error", "No hay usuario autenticado.");
      }
      setLoading(false);
    };

    loadUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const userInfo = auth.currentUser;

    if (userInfo) {
      try {
        const userDocRef = doc(db, "usuarios", userInfo.uid);
        await updateDoc(userDocRef, {
          numeroBombero: userNumber,
          nombreCompleto: userFullName,
          color: selectedColor,
        });

        Alert.alert("Éxito", "Perfil actualizado correctamente");
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error al Actualizar", error.message);
      }
    } else {
      Alert.alert("Error", "No hay usuario autenticado.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#214a17" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  const colors = [
    { label: "Rojo", value: "#6b1818" },
    { label: "Verde", value: "#214a17" },
    { label: "Azul", value: "#1e90ff" },
    { label: "Amarillo", value: "#ffd700" },
    { label: "Naranja", value: "#ffa500" },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={[styles.profilePicture, { backgroundColor: selectedColor }]}>
        <Text style={styles.numberText}>{userNumber}</Text>
      </View>
      <Text style={[styles.title, { color: theme.color }]}>Editar Perfil </Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" />
        <TextInput
          style={[styles.input, { color: theme.color }]}
          placeholder="Número de Bombero"
          value={userNumber}
          onChangeText={setUserNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" />
        <TextInput
          style={[styles.input, { color: theme.color }]}
          placeholder="Nombre Completo"
          value={userFullName}
          onChangeText={setUserFullName}
        />
      </View>
      <Text style={[styles.colorPickerLabel, { color: theme.color }]}>
        Elige el Color de tu Perfil:
      </Text>

      <View style={styles.colorPickerContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color.value}
            style={[
              styles.colorButton,
              {
                backgroundColor: color.value,
                borderColor:
                  selectedColor === color.value ? "#000" : "transparent",
              },
            ]}
            onPress={() => setSelectedColor(color.value)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <TouchableOpacity onPress={toggleTheme}>
          <Image
            source={require("../assets/modo.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  numberText: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  colorPickerLabel: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  colorPickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#214a17",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
