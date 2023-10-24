import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import * as Progress from "react-native-progress";
import { SIZES } from "../constants";
import useProgressBarTimer from "../utils/useProgressBarTimer";
import useSeenStory from "../hooks/useSeenStory";
import useSharePost from "../hooks/useSharePost";
import useHandleLike from "../hooks/useHandleLike";
import Animated, { ZoomIn } from "react-native-reanimated";

const Story = ({ navigation, route }) => {
  const { stories, currentUser } = route.params || {};
  const { handleResume, handlePause, currentStoryIndex, progressBar } =
    useProgressBarTimer({ stories, navigation });
  useSeenStory({ stories, currentUser, currentStoryIndex });
  const { shareStory } = useSharePost();
  const { handleStoryLike } = useHandleLike();

  const [values, setValues] = useState("");
  const [focusedBar, setFocusedBar] = useState(false);
  const [loader, setLoader] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLiked, setIsLiked] = useState({
    [currentStoryIndex]: !!stories[currentStoryIndex].likes_by_users.includes(
      currentUser.email
    ),
  });

  const handleToggleLike = () => {
    handleStoryLike(stories[currentStoryIndex], currentUser);
    setIsLiked({ [currentStoryIndex]: !isLiked[currentStoryIndex] });
  };

  const handleOnSubmit = (values) => {
    try {
      setLoader(true);
      console.log("Enviando mensaje: " + values);
      // firestore to send a message

      if (keyboardVisible) {
        Keyboard.dismiss();
        handleResume();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleStoryShare = async () => {
    handlePause();
    await shareStory(stories[currentStoryIndex]);
    handleResume();
  };

  const handleOnFocus = () => {
    setKeyboardVisible(true);
    setFocusedBar(true);
    handlePause();
  };

  const handleOnBlur = () => {
    setKeyboardVisible(false);
    setFocusedBar(false);
  };

  return (
    <Animated.View entering={ZoomIn.duration(150)} style={styles.container}>
      <FastImage
        source={{ uri: stories[currentStoryIndex].imageUrl }}
        style={styles.image}
      />
      <TouchableWithoutFeedback
        onPressIn={() => {
          handlePause();
          Keyboard.dismiss();
        }}
        onPressOut={() => handleResume()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.headerContainer}>
            <View style={styles.loadeingBarContainer}>
              <Progress.Bar
                progress={progressBar}
                width={SIZES.Width * 0.9}
                height={1}
                color="#fff"
              />
            </View>

            <View style={styles.subheaderContent}>
              <View style={styles.rowContainer}>
                <FastImage
                  source={{ uri: stories[0].profile_picture }}
                  style={styles.profilePicture}
                />
                <Text style={styles.usernameText}>{stories[0].username}</Text>
              </View>

              <View style={styles.rowContainer}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={28}
                  color={"#fff"}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="close-outline"
                    size={54}
                    color={"#fff"}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Send message"
                placeholderTextColor={"#fff"}
                style={styles.textInput}
                onFocus={() => handleOnFocus()}
                onBlur={() => handleOnBlur()}
                value={values}
                onChangeText={(text) => setValues(text)}
                autoCapitalize="sentences"
                autoCorrect={true}
                maxLength={255}
                multiline
              />
              {focusedBar &&
                values !== "" &&
                (loader ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity onPress={() => handleOnSubmit(values)}>
                    <Text style={styles.sendBtn}>Send</Text>
                  </TouchableOpacity>
                ))}
            </View>

            {!focusedBar && (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleToggleLike()}>
                  {isLiked[currentStoryIndex] ? (
                    <Ionicons name="heart" size={30} color={"#f00"} />
                  ) : (
                    <Ionicons name="heart-outline" size={30} color={"#fff"} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleStoryShare()}>
                  <Feather
                    name="send"
                    size={27}
                    color={"#fff"}
                    style={styles.headerSendIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 48,
  },
  image: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 0,
    height: "92%",
    width: "100%",
    borderRadius: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    position: "relative",
    marginTop: -110,
    top: 110,
    height: 100,
    zIndex: 1,
  },
  loadeingBarContainer: {
    alignItems: "center",
  },
  subheaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    paddingBottom: 4,
  },
  closeIcon: {
    margin: -11,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 40,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 3,
    paddingBottom: 8,
    paddingHorizontal: 15,
  },
  textInput: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "500",
    maxWidth: SIZES.Width * 0.7,
    minWidth: SIZES.Width * 0.6,
  },
  sendBtn: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
  headerSendIcon: {
    marginRight: 5,
    transform: [{ rotate: "20deg" }],
    marginTop: -2,
  },
});
