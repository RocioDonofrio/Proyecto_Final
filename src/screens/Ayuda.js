import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../credenciales";

const Ayuda = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesSnapshot = await getDocs(collection(db, "notas"));
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
    };
    fetchNotes();
  }, []);

  const handleSaveNote = async () => {
    if (title === "" || description === "") {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (editingNoteId) {
      const noteDocRef = doc(db, "notas", editingNoteId);
      await updateDoc(noteDocRef, { title, description });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId ? { ...note, title, description } : note
        )
      );
      setEditingNoteId(null);
    } else {
      const docRef = await addDoc(collection(db, "notas"), {
        title,
        description,
      });
      setNotes([...notes, { id: docRef.id, title, description }]);
    }
    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingNoteId(note.id);
    setModalVisible(true);
  };

  const handleDeleteNote = async (noteId) => {
    await deleteDoc(doc(db, "notas", noteId));
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Manual de Ayuda para Bomberos</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introducción</Text>
          <Text style={styles.sectionContent}>
            Este manual proporciona información esencial para el personal de
            bomberos, incluyendo procedimientos de emergencia, protocolos de
            seguridad y recomendaciones.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Procedimientos de Emergencia</Text>
          <Text style={styles.sectionContent}>
            1. Activar la alarma de emergencia.{"\n"}
            2. Preparar el equipo de protección personal.{"\n"}
            3. Seguir instrucciones del jefe de turno.{"\n"}
            4. Coordinar con otros equipos de emergencia.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Codigo Q</Text>
          <Text style={styles.sectionContent}>
            QRU: Se utiliza para preguntar o informar si hay mensajes o
            información que intercambiar.{"\n"}
            QRT: Indica que se finalizará la transmisión o que el operador ya no
            estará en línea.{"\n"}
            QRV: Indica disponibilidad para recibir o transmitir mensajes.
          </Text>
        </View>
        {notes.length > 0 && (
          <View style={styles.notesSection}>
            <Text style={styles.sectionTitle}>Notas de Ayuda</Text>
            {notes.map((note) => (
              <View key={note.id} style={styles.noteContainer}>
                <View style={styles.noteContent}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteDescription}>{note.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditNote(note)}
                >
                  <Ionicons name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteNote(note.id)}
                >
                  <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingNoteId ? "Editar Nota" : "Nueva Nota"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Descripción"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.saveButton]}
                onPress={handleSaveNote}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  notesSection: {
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: "#eef3f7",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
    position: "relative",
    minHeight: 120,
    flexGrow: 1,
  },
  noteContent: {
    flex: 1,
    paddingRight: 40,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  noteDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#17470b",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#890000",
    padding: 8,
    borderRadius: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#008CBA",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#890000",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#17470b",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Ayuda;
