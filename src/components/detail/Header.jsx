import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import "firebase/compat/storage";
import FastImage from "react-native-fast-image";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({
  navigation,
  post,
  currentUser,
  bottomSheetRef,
  setBottomSheetIndex,
  sharedIndex,
}) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();

  const handlePostOwner = () => {
    if (currentUser.email === post.owner_email) {
      navigation.navigate("Profile");
    } else {
      navigation.popToTop();
      navigation.navigate("UserDetail", {
        email: post.owner_email,
      });
    }
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handlePostOwner()}
          style={styles.headerUserContainer}
        >
          {checkStoriesSeen(post.username, currentUser.email) ? (
            <FastImage
              source={{ uri: post.profile_picture }}
              style={styles.headerImage}
            />
          ) : (
            <LinearGradient
              start={[0.9, 0.45]}
              end={[0.07, 1.03]}
              colors={["#ff00ff", "#ff4400", "#ffff00"]}
              style={styles.unseenRainbowBorder}
            >
              <FastImage
                source={{ uri: post.profile_picture }}
                style={styles.headerImage}
              />
            </LinearGradient>
          )}
          <Text style={styles.headerText}>{post.username.toLowerCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBottomSheetIndex(sharedIndex);
            bottomSheetRef.current.expand();
          }}
        >
          <Entypo
            name="dots-three-horizontal"
            size={15}
            color={"#fff"}
            style={styles.headerDots}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerUserContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    height: 37,
    width: 37,
    resizeMode: "cover",
    borderWidth: 2,
    borderRadius: 100,
  },
  unseenRainbowBorder: {
    height: 41,
    width: 41,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 9,
    marginBottom: 4,
  },
  headerDots: {
    marginRight: 6,
  },
});
