import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../../credenciales";
import { signOut } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function Configuracion() {
  const [userFullName, setUserFullName] = useState("");
  const [userColor, setUserColor] = useState("#000000");
  const [userNumber, setUserNumber] = useState("00");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserFullName(data.fullName || "Nombre no disponible");
          setUserColor(data.color || "#000000");
          setUserNumber(data.numeroBombero || "");
          setUserFullName(data.nombreCompleto || "");
          console.log("No existe un documento con ese usuario.");
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUserData();
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      navigation.navigate("InicioSesion");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteDoc(doc(db, "usuarios", user.uid));
                await user.delete();
                Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada.");
                navigation.navigate("InicioSesion");
              }
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#214a17" />
      ) : (
        <>
          <View style={[styles.profilePicture, { backgroundColor: userColor }]}>
            <Text style={styles.numberText}>{userNumber}</Text>
          </View>

          <Text style={[styles.fullNameText, { color: theme.color }]}>
            {userFullName}
          </Text>

          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>
              Email: {auth.currentUser?.email}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={[styles.link, { color: theme.color }]}>
              Cambiar tema temporalmente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={[styles.buttonText, { color: theme.color }]}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDeleteAccount}
            >
              <Text style={[styles.buttonText, { color: theme.color }]}>
                Eliminar Cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profilePicture: {
    width: 210,
    height: 210,
    borderRadius: 105,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -160,
  },
  numberText: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
  },
  fullNameText: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
  },
  dataContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  dataText: {
    fontSize: 20,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#214a17",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#850a0a",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
