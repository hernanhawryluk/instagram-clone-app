import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useResizePictures from "../hooks/useResizePictures";
import useUploadPost from "../hooks/useUploadPost";
import SIZES from "../constants/SIZES";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../components/shared/modals/MessageModal";

const NewPost = ({ navigation, route }) => {
  const { selectedImage } = route.params || {};
  const { currentUser } = useUserContext();
  const { resizePostPicture } = useResizePictures();
  const { uploadPost, loader } = useUploadPost();
  const [caption, setCaption] = useState("");
  const [focusedBar, setFocusedBar] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const handleFocus = () => {
    setFocusedBar(true);
  };
  const handleBlur = () => {
    Keyboard.dismiss();
    setFocusedBar(false);
  };

  const handleNextButton = async () => {
    const resizedImage = await resizePostPicture(selectedImage);
    await uploadPost(resizedImage, caption, currentUser);
    navigation.navigate("Main Screen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={23} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>

        <TouchableOpacity
          onPress={() => (focusedBar ? handleBlur() : handleNextButton())}
        >
          <Text style={styles.nextButton}>
            {loader ? <ActivityIndicator /> : focusedBar ? "OK" : "Share"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => handleBlur()}>
        <View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: selectedImage,
              }}
              style={styles.image}
            />
            <View style={styles.captionContainer}>
              <TextInput
                value={caption}
                onChangeText={(caption) => setCaption(caption)}
                placeholder="Write a caption..."
                placeholderTextColor={"#999"}
                style={styles.captionText}
                multiline={true}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                maxLength={2200}
                autoFocus={true}
              />
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Divider width={0.4} color="#333" />

            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.optionsContainer}
            >
              <Text style={styles.optionText}>Tag people</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color={"#999"}
                style={styles.optionIcon}
              />
            </TouchableOpacity>

            <Divider width={0.3} color="#333" />
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.optionsContainer}
            >
              <Text style={styles.optionText}>Advanced settings</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color={"#999"}
                style={styles.optionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
      />
    </SafeAreaView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 40,
  },
  iconCorrection: {
    marginLeft: -10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  nextButton: {
    color: "#08f",
    fontWeight: "600",
    fontSize: 17,
  },
  nullButton: {
    color: "#000",
    fontWeight: "700",
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginHorizontal: 15,
  },
  image: {
    height: SIZES.Width * 0.2,
    width: SIZES.Width * 0.2,
    borderRadius: 4,
  },
  captionContainer: {
    flex: 1,
    justifyContent: "center",
    minHeight: SIZES.Width * 0.2,
    marginBottom: 14,
  },
  captionText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 15,
    width: SIZES.Width * 0.66,
    flex: 1,
    marginBottom: 8,
  },
  secondContainer: {
    minHeight: 500,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
