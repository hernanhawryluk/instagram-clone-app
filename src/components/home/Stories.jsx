import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import StoriesSkeleton from "./skeletons/StoriesSkeleton";
import { useStoriesContext } from "../../contexts/StoriesContext";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";

const Stories = ({ navigation, currentUser }) => {
  const { stories, updatedStories } = useStoriesContext();
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const [ownStory, setOwnStory] = useState(false);
  const [seenOwnStory, setSeenOwnStory] = useState(false);
  const [reducedStories, setReducedStories] = useState([]);

  useEffect(() => {
    setOwnStory(
      stories.find((story) => {
        return story.username === currentUser.username;
      })
    );

    setSeenOwnStory(checkStoriesSeen(currentUser.username, currentUser.email));

    const uniqueStories = {};
    const uniqueStoriesArray = [];

    stories.forEach((story) => {
      if (!uniqueStories[story.username]) {
        uniqueStories[story.username] = true;
        uniqueStoriesArray.push(story);
      }
    });
    setReducedStories(uniqueStoriesArray);
  }, [updatedStories]);

  useEffect(() => {
    stories.forEach((story) => {
      FastImage.preload([{ uri: story.imageUrl }]);
    });
  }, []);

  return (
    <View>
      {stories.length > 2 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
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
                  <View style={styles.emptyStoryBorder}>
                    <FastImage
                      source={{
                        uri: currentUser.profile_picture,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.addBtn}>
                    <Text style={styles.addBtnText}>+</Text>
                  </View>

                  <Text style={styles.seenUser}>Your story</Text>
                </View>
              ) : seenOwnStory ? (
                <View>
                  <View style={styles.seenStoryBorder}>
                    <FastImage
                      source={{
                        uri: currentUser.profile_picture,
                      }}
                      style={styles.image}
                    />
                  </View>

                  <Text style={styles.seenUser}>Your story</Text>
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
                      source={{
                        uri: currentUser.profile_picture,
                      }}
                      style={styles.image}
                    />
                  </LinearGradient>

                  <Text style={styles.seenUser}>Your story</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {reducedStories
            .filter((story) => story.username != currentUser.username)
            .map((story, index) => (
              <View style={styles.container} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Story", {
                      stories: stories.filter(
                        (eachStory) => story.username === eachStory.username
                      ),
                      currentUser: currentUser,
                    })
                  }
                >
                  {checkStoriesSeen(story.username, currentUser.email) ? (
                    <View>
                      <View style={styles.seenStoryBorder}>
                        <FastImage
                          source={{ uri: story.profile_picture }}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.seenUser}>
                        {story.username.length > 13
                          ? story.username.slice(0, 10) + "..."
                          : story.username}
                      </Text>
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
                          source={{ uri: story.profile_picture }}
                          style={styles.image}
                        />
                      </LinearGradient>
                      <Text style={styles.user}>
                        {story.username.length > 13
                          ? story.username.slice(0, 10) + "..."
                          : story.username}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StoriesSkeleton />
        </ScrollView>
      )}
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginLeft: 6,
    marginRight: 8,
  },
  image: {
    height: 83,
    width: 83,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000",
  },
  user: {
    marginTop: 10,
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  seenUser: {
    marginTop: 10,
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
  },
  seenStoryBorder: {
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#666",
  },
  unseenRainbowBorder: {
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  addBtn: {
    backgroundColor: "#18d",
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 3.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    left: 54,
    top: 54,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DDD",
    paddingBottom: 2,
  },
});
