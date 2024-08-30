import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/HeaderEstilos";

const Header = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigation = (screen) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.header}>
      <Image source={require("../assets/logo1.png")} style={styles.logo} />
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.opcionMenu}
              onPress={() => handleNavigation("EnviarAlerta")}
            >
              <Text>Enviar Alerta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.opcionMenu}
              onPress={() => handleNavigation("Disponibilidad")}
            >
              <Text>Disponibilidad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.opcionMenu}
              onPress={() => handleNavigation("Turnos")}
            >
              <Text>Turnos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.opcionMenu}
              onPress={() => handleNavigation("Ayuda")}
            >
              <Text>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
