import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import appFirebase from "../../credenciales";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

const auth = getAuth(appFirebase);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      Alert.alert(
        "Error",
        "Por favor, introduce un correo electrónico válido."
      );
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Inicio de sesión exitoso", "Bienvenido!");
      navigation.replace("EnviarAlerta");

      setEmail("");
      setPassword("");
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No hay usuario registrado con este correo.";
          break;
        case "auth/wrong-password":
          errorMessage = "La contraseña es incorrecta.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        default:
          errorMessage = "Ocurrió un error. Intenta nuevamente.";
      }
      Alert.alert("Error", errorMessage);
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isEmailValid(email)) {
      Alert.alert(
        "Error",
        "Por favor, introduce un correo electrónico válido."
      );
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Éxito",
        "Te hemos enviado un correo para restablecer tu contraseña."
      );
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al enviar el correo.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setEmail("");
    setPassword("");
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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
            Iniciar Sesión
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
          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.cajaBoton,
              { backgroundColor: theme.buttonBackground },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.TextoBoton}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text style={[styles.link, { color: theme.color }]}>
              No tienes cuenta? Regístrate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={[styles.link, { color: theme.color }]}>
              ¿Olvidaste tu contraseña?
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
    justifyContent: "center",
    alignItems: "center",
  },
  TextoBoton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    marginTop: 15,
  },
});
