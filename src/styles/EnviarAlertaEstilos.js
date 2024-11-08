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
    padding: 10,
  },
  button: {
    padding: 40,
    borderRadius: 30,
    marginBottom: 45,
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
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default styles;
