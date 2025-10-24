import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import Animated, { FadeIn, FadeOut, ZoomInDown } from "react-native-reanimated";
import { SIZES } from "../constants";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import useUploadStory from "../hooks/useUploadStory";
import useResizePictures from "../hooks/useResizePictures";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-video";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../components/shared/modals/MessageModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NewReel = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { selectedImage } = route.params || {};
  const { uploadStory, loader } = useUploadStory();
  const { resizeStoryPicture } = useResizePictures();
  const { currentUser } = useUserContext();

  const [opacity, setOpacity] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 400);
  }, []);

  const handleSubmitButton = async () => {
    Alert.alert(
      "Upload not allowed",
      "We apologize, but the upload was deactivated due to server storage limitations."
    );
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.container, { opacity: opacity }]}>
      <View style={styles.imageContainer}>
        <Animated.View
          style={styles.topButtonsContainer}
          entering={ZoomInDown.duration(550)}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={"#fff"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <View style={styles.modButtonsContainer}>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <Feather name="volume-2" size={28} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <Text style={styles.modButtonText}>Aa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.modButtonContainer}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {Platform.OS === "ios" ? (
          <Animated.Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
            sharedTransitionTag={selectedImage.id.toString()}
          />
        ) : (
          <Animated.Image
            source={{ uri: selectedImage.uri }}
            style={styles.image}
          />
        )}
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: selectedImage.uri,
          }}
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playButtonContainer}
        >
          {!isPlaying && (
            <Animated.View
              entering={FadeIn.duration(1000)}
              exiting={FadeOut.duration(1000)}
            >
              <Ionicons name="ios-play" size={50} color="white" />
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
      <Animated.View
        style={styles.bottomButtonsContainer}
        entering={FadeIn.duration(1000)}
      >
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.userContainer}
        >
          <Image
            source={{ uri: currentUser.profile_picture }}
            style={styles.userImage}
          />
          <Text style={styles.userText}>Your story</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.userContainer}
        >
          <View style={styles.iconBorder}>
            <MaterialIcons name="stars" size={23} color={"#3b3"} />
          </View>
          <Text style={styles.userText}>Close Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmitButton()}
          style={styles.nextButtonContainer}
        >
          <Ionicons name="arrow-forward" size={30} color={"#000"} />
        </TouchableOpacity>
      </Animated.View>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
        height={80}
      />
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default NewReel;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : 50,
    backgroundColor: "#000",
    flex: 1,
  },
  topButtonsContainer: {
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginTop: -50,
    top: 56,
    marginHorizontal: 12,
  },
  modButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  modButtonContainer: {
    height: 44,
    width: 44,
    borderRadius: 100,
    backgroundColor: "#484040",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.92,
  },
  modButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
    transform: [{ scaleY: 1.1 }],
  },
  image: {
    position: "absolute",
    top: -5,
    width: "100%",
    height:
      Platform.OS === "android" ? SIZES.Height * 0.925 : SIZES.Height * 0.85,
    resizeMode: "cover",
    borderRadius: 25,
    zIndex: -1,
  },
  video: {
    width: "100%",
    height:
      Platform.OS === "android" ? SIZES.Height * 0.925 : SIZES.Height * 0.85,
    borderRadius: 25,
  },
  backButtonContainer: {
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444040",
    opacity: 0.99,
  },
  buttonIcon: {
    paddingLeft: 10,
  },
  bottomButtonsContainer: {
    height: SIZES.Height * 0.08,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userContainer: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "#333",
  },
  userImage: {
    height: 26,
    width: 26,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 4,
  },
  nextButtonContainer: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  iconBorder: {
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  playButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
