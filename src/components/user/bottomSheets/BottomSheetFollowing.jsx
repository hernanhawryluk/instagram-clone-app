import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import { Divider } from "react-native-elements";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import useHandleUnfollow from "../../../hooks/useHandleUnfollow";

const BottomSheetFollowing = ({ bottomSheetRef, currentUser, user }) => {
  const { handleUnfollow } = useHandleUnfollow({
    currentUser: currentUser,
    user: user,
  });
  const snapPoints = useMemo(() => ["40%"], []);
  const [closeFriend, setCloseFriend] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    setCloseFriend(currentUser.close_friends.includes(user.email));
    setFavorites(currentUser.favorite_users.includes(user.email));
    setMute(currentUser.muted_users.includes(user.email));
  }, []);

  handleCloseFriend = () => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.email)
        .update({
          close_friends: !closeFriend
            ? firebase.firestore.FieldValue.arrayUnion(user.email)
            : firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    } catch (error) {
      console.log(error);
    } finally {
      setCloseFriend(!closeFriend);
    }
  };

  handleFavorites = () => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.email)
        .update({
          favorite_users: !favorites
            ? firebase.firestore.FieldValue.arrayUnion(user.email)
            : firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    } catch (error) {
      console.log(error);
    } finally {
      setFavorites(!favorites);
    }
  };

  handleMute = () => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.email)
        .update({
          muted_users: !mute
            ? firebase.firestore.FieldValue.arrayUnion(user.email)
            : firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    } catch (error) {
      console.log(error);
    } finally {
      setMute(!mute);
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => (
        <View style={styles.closeLineContainer}>
          <View style={styles.closeLine}></View>
        </View>
      )}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{user.username}</Text>
        <Divider />
        <TouchableOpacity onPress={() => handleCloseFriend()}>
          {closeFriend ? (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Close friend</Text>
              <MaterialCommunityIcons
                name="star-circle"
                size={30}
                color="#0f0"
              />
            </View>
          ) : (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Add to close friends list</Text>
              <MaterialCommunityIcons
                name="star-circle-outline"
                size={30}
                color="#fff"
              />
            </View>
          )}
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handleFavorites()}>
          {favorites ? (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Remove from favorites</Text>
              <FontAwesome name="star" size={28} color={"#f52"} />
            </View>
          ) : (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Add to favorites</Text>
              <FontAwesome name="star-o" size={28} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity onPress={() => handleMute()}>
          {mute ? (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Unmute</Text>
              <FontAwesome name="ban" size={28} color="#f00" />
            </View>
          ) : (
            <View style={styles.optionContainer}>
              <Text style={styles.text}>Mute</Text>
              <FontAwesome name="ban" size={28} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            handleUnfollow();
            bottomSheetRef.current.close();
          }}
          style={styles.optionContainer}
        >
          <Text style={styles.text}>Unfollow</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetFollowing;

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#777",
    marginTop: 9,
  },
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 18,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
  },
});
