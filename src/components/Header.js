import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/HeaderEstilos";
import { useTheme } from "../context/ThemeContext";

const Header = ({ title }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const { theme, toggleTheme } = useTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigation = (screen) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View>
      <View style={styles.header}>
        <Image source={require("../assets/logo1.png")} style={styles.logo} />
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.backgroundColor },
            ]}
          >
            <TouchableOpacity
              style={styles.optionMenu}
              onPress={() => handleNavigation("EnviarAlerta")}
            >
              <Text>Enviar Alerta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionMenu}
              onPress={() => handleNavigation("Disponibilidad")}
            >
              <Text>Disponibilidad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionMenu}
              onPress={() => handleNavigation("Ayuda")}
            >
              <Text>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionMenu}
              onPress={() => handleNavigation("Configuracion")}
            >
              <Text>Configuracion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme}>
              <Text style={[styles.link, { color: theme.color }]}>
                Cambiar tema temporalmente
              </Text>
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
