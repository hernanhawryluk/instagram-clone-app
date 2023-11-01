import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const handleFeatureNotImplemented = (setMessageModalVisible) => {
  setMessageModalVisible(true);
  setTimeout(() => {
    setMessageModalVisible(false);
  }, 2000);
};

const MessageModal = ({
  messageModalVisible,
  message,
  height = 28,
  icon = "developer",
}) => {
  return (
    <Modal
      visible={messageModalVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.modalContainer, { bottom: height }]}>
        <Ionicons
          name={icon === "developer" ? "logo-react" : "close-circle-outline"}
          size={24}
          color="#fff"
        />
        <Text style={styles.modalText}>{message}</Text>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    backgroundColor: "#333",
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
    gap: 12,
  },
  modalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },
});
