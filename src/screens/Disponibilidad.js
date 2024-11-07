import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { auth } from "../../credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import appFirebase from "../../credenciales";
import { useTheme } from "../context/ThemeContext";

const firestore = getFirestore(appFirebase);

export default function PerfilUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserId(user.uid);
        }

        const querySnapshot = await getDocs(collection(firestore, "usuarios"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(usersData);
      } catch (error) {
        console.error("Error al obtener los datos de los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const handleSave = async (userIdToUpdate) => {
    try {
      const docRef = doc(firestore, "usuarios", userIdToUpdate);
      await updateDoc(docRef, {
        opcionSeleccionada: selectedOption,
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.id === userIdToUpdate
            ? { ...user, opcionSeleccionada: selectedOption }
            : user
        )
      );

      Alert.alert("Actualización exitosa", "La opción ha sido guardada.");
    } catch (error) {
      console.error("Error al actualizar la opción:", error);
      Alert.alert("Error", "No se pudo guardar la opción. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={theme.color} />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {usuarios.map((user) => {
        if (user.id === userId) {
          return (
            <View
              key={user.id}
              style={[styles.userContainer, { marginTop: 20 }]}
            >
              <View style={styles.profileHeader}>
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{user.numeroBombero}</Text>
                </View>
                <Text style={[styles.username, { color: theme.color }]}>
                  {user.nombreCompleto}
                </Text>
              </View>
              <Text style={[styles.status, { color: theme.color }]}>
                Estado Actual: {user.opcionSeleccionada || "Sin definir"}
              </Text>

              <View style={styles.optionsContainer}>
                {["QRV", "QRT", "QRU"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      selectedOption === option && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedOption(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => handleSave(user.id)}
                style={[
                  styles.saveButton,
                  { backgroundColor: theme.buttonBackground },
                ]}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}

      <View style={styles.otherUsersSection}>
        {usuarios.map((user) => {
          if (user.id !== userId) {
            return (
              <View key={user.id} style={styles.userContainer}>
                <View style={styles.profileHeader}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{user.numeroBombero}</Text>
                  </View>
                  <Text style={[styles.username, { color: theme.color }]}>
                    {user.nombreCompleto}
                  </Text>
                </View>
                <Text style={[styles.status, { color: theme.color }]}>
                  Estado Actual: {user.opcionSeleccionada || "Sin definir"}
                </Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6fa8dc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  selectedButton: {
    backgroundColor: "#6fa8dc",
  },
  optionText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  otherUsersSection: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
