import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import useHandleUnfollow from "../../hooks/useHandleUnfollow";
import FastImage from "react-native-fast-image";

const Unfollow = ({ handleModal, user }) => {
  const { currentUser } = useUserContext();
  const { handleUnfollow } = useHandleUnfollow({ currentUser, user });

  return (
    <TouchableWithoutFeedback onPress={() => handleModal()}>
      <View style={styles.container}>
        <View onStartShouldSetResponder={() => true} style={styles.modalView}>
          <FastImage
            source={{ uri: user.profile_picture }}
            style={styles.image}
          />

          <Text style={styles.text}>
            If you change your mind, you'll have to request to follow{" "}
            <Text style={{ fontWeight: "800" }}>{user.username}</Text> again.
          </Text>
          <View style={styles.divider}></View>
          <TouchableOpacity
            onPress={async () => {
              await handleUnfollow();
              handleModal();
            }}
          >
            <Text style={styles.redText}>Unfollow</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cancelModal}>
          <TouchableOpacity onPress={() => handleModal()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Unfollow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#333",
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: "center",
    width: "90%",
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 100,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#777",
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#555",
  },
  redText: {
    color: "#f00",
    fontSize: 17,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
    marginVertical: 14,
  },
  cancelModal: {
    backgroundColor: "#333",
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: "center",
    paddingVertical: 15,
    width: "90%",
    marginTop: 15,
    marginBottom: 30,
  },
  cancelText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
  },
});
