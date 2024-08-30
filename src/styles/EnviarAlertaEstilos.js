import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 35,
    width: "90%",
    alignItems: "center",
  },
  buttonIncendio: {
    backgroundColor: "#d61b1b", // Color para el botón Incendio
  },
  buttonAccidente: {
    backgroundColor: "#ea7033", // Color para el botón Accidente
  },
  buttonRescate: {
    backgroundColor: "#fae12f", // Color para el botón Rescate
  },
  buttonOtro: {
    backgroundColor: "#ffee71", // Color para el botón Otro
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;
