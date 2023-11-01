import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const CopyClipboardModal = ({ copyModalVisible }) => {
  return (
    <Modal visible={copyModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <FontAwesome5 name="check-circle" size={24} color="#fff" />
        <Text style={styles.modalText}>Link copied to clipboard</Text>
      </View>
    </Modal>
  );
};

export default CopyClipboardModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    backgroundColor: "#333",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 20,
    gap: 15,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },
});
