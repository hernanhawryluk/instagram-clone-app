import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const ModalNotification = ({ setNotificationModal, notificationCounter }) => {
  return (
    <Animated.View
      style={styles.pointer}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(1000)}
    >
      <TouchableWithoutFeedback onPress={() => setNotificationModal(false)}>
        <View style={styles.rotatorBack}>
          <View style={styles.container}>
            <Ionicons name="heart" size={20} color="#fff" />
            <Text style={styles.text}>{notificationCounter}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default ModalNotification;

const styles = StyleSheet.create({
  pointer: {
    position: "absolute",
    backgroundColor: "#ff2045",
    height: 30,
    width: 30,
    right: 61,
    top: 66,
    borderRadius: 4,
    transform: [{ rotate: "45deg" }],
  },
  rotatorBack: {
    transform: [{ rotate: "-45deg" }],
  },
  container: {
    position: "absolute",
    backgroundColor: "#ff2045",
    borderRadius: 10,
    minHeight: 40,
    minWidth: 60,
    right: -4,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  icon: {
    paddingLeft: 15,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
  },
});
