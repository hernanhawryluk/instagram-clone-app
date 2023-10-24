import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import firebase from "firebase/compat";
import FastImage from "react-native-fast-image";

const RemoveFollower = ({ handleModal, user }) => {
  const { currentUser } = useUserContext();
  const [loader, setLoader] = useState(false);

  const handleRemove = () => {
    if (!loader) {
      try {
        setLoader(true);
        firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            followers: firebase.firestore.FieldValue.arrayRemove(user.email),
          });
        firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .update({
            following: firebase.firestore.FieldValue.arrayRemove(
              currentUser.email
            ),
          });
        handleModal();
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleModal()}>
      <View style={styles.container}>
        <View onStartShouldSetResponder={() => true} style={styles.modalView}>
          <FastImage
            source={{ uri: user.profile_picture }}
            style={styles.image}
          />

          <Text style={styles.textTitle}>Remove follower?</Text>

          <Text style={styles.text}>
            We won't tell{" "}
            <Text style={{ fontWeight: "700" }}>{user.username}</Text> they were
            removed from your followers.
          </Text>
          <View style={styles.divider}></View>
          <TouchableOpacity onPress={() => handleRemove()}>
            <Text style={styles.redText}>Remove</Text>
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

export default RemoveFollower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#333",
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: "center",
    width: "95%",
  },
  image: {
    height: 68,
    width: 68,
    borderRadius: 100,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#777",
    alignSelf: "center",
  },
  textTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#aaa",
  },
  redText: {
    color: "#f00",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
    marginVertical: 15,
  },
  cancelModal: {
    backgroundColor: "#333",
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: "center",
    paddingVertical: 15,
    width: "95%",
    marginTop: 15,
    marginBottom: 30,
  },
  cancelText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 25,
    textAlign: "center",
  },
});
