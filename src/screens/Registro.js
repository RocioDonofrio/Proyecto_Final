import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import appFirebase from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numeroBombero, setNumeroBombero] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !numeroBombero ||
      !nombreCompleto
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firestore, "usuarios", userCredential.user.uid), {
        email: email,
        numeroBombero: numeroBombero,
        nombreCompleto: nombreCompleto,
      });

      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión");
      navigation.navigate("InicioSesion");
    } catch (error) {
      let errorMessage = "Error al registrarse. Inténtalo de nuevo.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este correo ya está en uso.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Correo electrónico no válido.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNumeroBombero("");
    setNombreCompleto("");
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: theme.backgroundColor }}
      >
        <View
          style={[styles.padre, { backgroundColor: theme.backgroundColor }]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.circle} />
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </View>
          <Text style={[styles.title, { color: theme.color }]}>
            Registrarse
          </Text>
          <TextInput
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.borderColor,
              },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.borderColor,
              },
            ]}
          />
          <TextInput
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.borderColor,
              },
            ]}
          />
          <TextInput
            placeholder="Número de Bombero"
            value={numeroBombero}
            onChangeText={setNumeroBombero}
            keyboardType="numeric"
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.borderColor,
              },
            ]}
          />
          <TextInput
            placeholder="Nombre Completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.borderColor,
              },
            ]}
          />
          <TouchableOpacity
            onPress={handleRegister}
            style={[
              styles.cajaBoton,
              { backgroundColor: theme.buttonBackground },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.TextoBoton}>Registrarse</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={[styles.link, { color: theme.color }]}>
              Cambiar tema temporalmente
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  circle: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 125,
    backgroundColor: "#ffffff",
    top: 0,
    left: 0,
    transform: [{ translateX: 8 }, { translateY: 6 }],
    zIndex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    zIndex: 2,
  },

  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
  },
  cajaBoton: {
    borderRadius: 30,
    paddingVertical: 20,
    width: "60%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  TextoBoton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
