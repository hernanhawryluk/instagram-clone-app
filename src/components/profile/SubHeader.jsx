import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import { useStoriesContext } from "../../contexts/StoriesContext";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";

const SubHeader = ({ navigation, currentUser, numberOfPosts }) => {
  const { stories, updatedStories } = useStoriesContext();
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const [ownStory, setOwnStory] = useState(false);
  const [seenOwnStory, setSeenOwnStory] = useState(false);

  useEffect(() => {
    setOwnStory(
      stories.find((story) => {
        return story.username === currentUser.username;
      })
    );

    setSeenOwnStory(checkStoriesSeen(currentUser.username, currentUser.email));
  }, [updatedStories]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.userContainer}>
          <TouchableOpacity
            onPress={() =>
              ownStory
                ? navigation.navigate("Story", {
                    stories: stories.filter(
                      (story) => story.username === currentUser.username
                    ),
                    currentUser: currentUser,
                  })
                : navigation.navigate("MediaLibrary", {
                    initialSelectedType: "Add to story",
                    selectorAvailable: false,
                  })
            }
          >
            {!ownStory ? (
              <View>
                <FastImage
                  source={{ uri: currentUser.profile_picture }}
                  style={styles.userImageWithoutStory}
                />
                <View style={styles.plusBadgeContainer}>
                  <Text style={styles.plusBadge}>+</Text>
                </View>
              </View>
            ) : seenOwnStory ? (
              <View>
                <View style={styles.seenStoryBorder}>
                  <FastImage
                    source={{ uri: currentUser.profile_picture }}
                    style={styles.userImage}
                  />
                </View>
              </View>
            ) : (
              <View>
                <LinearGradient
                  start={[0.9, 0.45]}
                  end={[0.07, 1.03]}
                  colors={["#ff00ff", "#ff4400", "#ffff00"]}
                  style={styles.unseenRainbowBorder}
                >
                  <FastImage
                    source={{ uri: currentUser.profile_picture }}
                    style={styles.userImage}
                  />
                </LinearGradient>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.usernameText}>{currentUser.name}</Text>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialColumn}>
            <Text style={styles.socialBoldText}>{numberOfPosts}</Text>
            <Text style={styles.socialText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Follow", { currentUser: currentUser })
            }
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {currentUser.followers.length > 0
                ? currentUser.followers.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Follow", { currentUser: currentUser })
            }
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {currentUser.following.length > 0
                ? currentUser.following.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.bioText}>{currentUser.bio}</Text>
      <View style={styles.btnContainers}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShareQR", { user: currentUser })}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Share profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 12,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    alignItems: "flex-start",
    marginLeft: 6,
  },
  userImageWithoutStory: {
    height: 90,
    width: 90,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#000",
  },
  plusBadgeContainer: {
    position: "absolute",
    backgroundColor: "#18d",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 3.5,
    right: -1,
    bottom: -1,
    height: 30,
    width: 30,
  },
  plusBadge: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 2,
  },
  userImage: {
    height: 86,
    width: 86,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#000",
  },
  seenStoryBorder: {
    marginTop: 4,
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#666",
  },
  unseenRainbowBorder: {
    marginTop: 4,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontSize: 14.5,
    fontWeight: "500",
    marginTop: 10,
  },
  bioText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
    marginHorizontal: 6,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    marginRight: 12,
    gap: 24,
  },
  socialColumn: {
    alignItems: "center",
  },
  socialBoldText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  socialText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
  },
  btnContainers: {
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnWrapper: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 8,
  },
});
