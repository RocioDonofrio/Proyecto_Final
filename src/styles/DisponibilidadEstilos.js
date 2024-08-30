import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  unidadContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#850a0a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  unidad: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  nombre: {
    flex: 2,
    fontSize: 16,
  },
  estadoContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  estado: {
    color: "#fff",
    fontSize: 16,
  },
  hora: {
    fontSize: 16,
    color: "#555",
  },
  QRV: {
    backgroundColor: "#d61b1b",
  },
  QAP: {
    backgroundColor: "#ea7033",
  },
  QRT: {
    backgroundColor: "#fae12f",
  },
});

export default styles;
