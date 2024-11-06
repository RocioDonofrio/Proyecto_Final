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
    backgroundColor: "#d61b1b",
  },
  buttonAccidente: {
    backgroundColor: "#ea7033",
  },
  buttonRescate: {
    backgroundColor: "#fae12f",
  },
  buttonOtro: {
    backgroundColor: "#ffee71",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;
