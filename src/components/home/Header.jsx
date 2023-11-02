import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { BlurView } from "expo-blur";
import ModalNotification from "../notifications/ModalNotification";
import { SIZES } from "../../constants";

const Header = ({ navigation, headerOpacity, currentUser }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);

  useEffect(() => {
    if (currentUser.event_notification > 0) {
      setNotificationModal(true);

      setTimeout(() => {
        setNotificationModal(false);
      }, 4000);
    } else {
      setNotificationModal(false);
    }
  }, [currentUser]);

  return (
    <Animated.View style={{ opacity: headerOpacity }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.instagramContainer}
          onPress={() => setFilterModalVisible(true)}
        >
          <FastImage
            style={styles.logo}
            source={require("../../../assets/images/header-logo.png")}
          />
          <MaterialIcons
            name={"keyboard-arrow-down"}
            size={20}
            color={"#fff"}
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notifications", {
                currentUser: currentUser,
              });
            }}
          >
            {currentUser && currentUser.event_notification > 0 && (
              <View style={styles.unreadBadgeSmallContainer} />
            )}
            <View style={styles.iconsContainer}>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={28}
                color={"#fff"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            {currentUser && currentUser.chat_notification > 0 && (
              <View style={styles.unreadBadgeContainer}>
                <Text style={styles.unreadBadgeText}>
                  {currentUser.chat_notification}
                </Text>
              </View>
            )}
            <View style={styles.iconsContainer}>
              <FastImage
                style={styles.messenger}
                source={require("../../../assets/icons/messenger-white.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <Modal
        visible={filterModalVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <BlurView intensity={70} style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalRowContainer}
                onPress={() => {
                  navigation.navigate("Following");
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Following</Text>
                <Feather name="users" size={26} color={"#fff"} />
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <TouchableOpacity
                style={styles.modalRowContainer}
                onPress={() => {
                  navigation.navigate("Favorites");
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Favorites</Text>
                <Feather name="star" size={28} color={"#fff"} />
              </TouchableOpacity>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {notificationModal && (
        <ModalNotification
          setNotificationModal={setNotificationModal}
          notificationCounter={currentUser.event_notification}
        />
      )}
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    zIndex: 1,
  },
  instagramContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 14,
  },
  logo: {
    width: 128,
    height: 42,
    resizeMode: "cover",
  },
  iconsContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  messenger: {
    marginTop: 1,
    width: 28,
    height: 27,
  },
  unreadBadgeSmallContainer: {
    backgroundColor: "#FF3250",
    position: "absolute",
    right: 0,
    top: 1,
    height: 9,
    width: 9,
    borderRadius: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadgeContainer: {
    backgroundColor: "#FF3250",
    position: "absolute",
    right: -5,
    top: -3,
    height: 16,
    width: 16,
    borderRadius: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadgeText: {
    fontWeight: "600",
    fontSize: 11,
    color: "white",
    paddingBottom: 1,
  },
  divider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#111",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : SIZES.Height * 0.07,
    left: 22,
    backgroundColor: "rgba(35,35,35,0.6)",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginRight: 15,
    height: 46,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 15,
  },
  modalDivider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#fff",
  },
});
