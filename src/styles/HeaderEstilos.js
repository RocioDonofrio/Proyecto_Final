import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    backgroundColor: "#850a0a",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  menuText: {
    fontSize: 50,
    color: "white",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  backText: {
    fontSize: 24,
    color: "black",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#850a0a",
  },
  optionMenu: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#850a0a",
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
