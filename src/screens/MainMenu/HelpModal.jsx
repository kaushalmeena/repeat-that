import PropTypes from "prop-types";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

function HelpModal({ visible, onClose }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    position: "relative",
    maxWidth: 480,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center"
  },
  modalText: {
    fontSize: 24,
    color: COLORS.background
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10
  }
});

HelpModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default HelpModal;
