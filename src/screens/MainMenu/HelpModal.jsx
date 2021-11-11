import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HelpModal({ visible, onClose }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.modalText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>
            Colored buttons are flashed on screen in particular secquence, user
            must remember the sequence and repeat it.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "relative",
    maxWidth: 480,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#FF9292",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 24,
    color: "#FFF9B6",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
});
