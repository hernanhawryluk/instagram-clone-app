import { useVideoPlayer, VideoView } from "expo-video";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SIZES from "../../constants/SIZES";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useUserContext } from "../../contexts/UserContext";

const Reel = ({
  item,
  playingIndexes,
  index,
  navigation,
  setMessageModalVisible,
  handleFeatureNotImplemented,
}) => {
  const { currentUser } = useUserContext();
  const videoSource = item?.videoUrl;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;

    if (playingIndexes[index]) {
      player.play();
    } else {
      player.pause();
    }
  });

  const handleUserProfile = () => {
    if (currentUser?.email === item?.owner_email) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserDetail", {
        email: item?.owner_email,
      });
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.sideContainer}>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.touchableOpacity}
        >
          {item?.likes_by_users &&
          item.likes_by_users.includes(currentUser?.email) ? (
            <MaterialCommunityIcons
              name="cards-heart"
              size={30}
              color="#e33"
              style={styles.heartIcon}
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={30}
              color="#fff"
              style={styles.heartIcon}
            />
          )}
          <Text style={styles.sideText}>
            {item?.likes_by_users && item.likes_by_users.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.touchableOpacity}
        >
          <MaterialCommunityIcons
            name="chat-outline"
            size={32}
            color="#fff"
            style={styles.chatIcon}
          />
          <Text style={styles.sideText}>
            {item?.comments && item.comments.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.touchableOpacity}
        >
          <Feather name="send" size={26} color="#fff" style={styles.sendIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.touchableOpacity}
        >
          <Text style={styles.sideText}>{item.shared}</Text>
          <Ionicons name="ellipsis-horizontal" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.userContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={handleUserProfile}
            style={styles.profileContainer}
          >
            <LinearGradient
              start={[0.9, 0.45]}
              end={[0.07, 1.03]}
              colors={["#ff00ff", "#ff4400", "#ffff00"]}
              style={styles.rainbowBorder}
            >
              <Image
                source={{ uri: item?.profile_picture }}
                style={styles.profilePicture}
              />
            </LinearGradient>
            <Text style={styles.profileUsername}>{item?.username}</Text>
            <MaterialCommunityIcons
              name="check-decagram"
              size={12}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <View style={styles.followContainer}>
              <Text style={styles.followText}>Follow</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.captionText}>{item?.caption}</Text>
      </View>
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({
  video: {
    width: SIZES.Width,
    height:
      Platform.OS === "ios" ? SIZES.Height * 0.9125 : SIZES.Height * 0.9125,
  },
  muteContainer: {
    position: "absolute",
    top: SIZES.Height * 0.42,
    left: SIZES.Width * 0.42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#666",
    borderRadius: 100,
    padding: 20,
    zIndex: 3,
  },
  sideContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 26,
    gap: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    gap: 3,
  },
  sideText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 26,
  },
  heartIcon: {
    transform: [{ scaleY: 1.2 }, { scaleX: 1.2 }],
  },
  chatIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1.2 }, { scaleX: 1.2 }],
  },
  sendIcon: {
    transform: [{ rotate: "20deg" }, { scaleY: 1.2 }, { scaleX: 1.2 }],
  },
  userContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginBottom: 15,
    marginLeft: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rainbowBorder: {
    height: 40.5,
    width: 40.5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    height: 39,
    width: 39,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 100,
  },
  profileUsername: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 3,
    marginBottom: 4,
  },
  followContainer: {
    borderWidth: 0.7,
    borderColor: "#bbb",
    backgroundColor: "transparent",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 10,
  },
  followText: {
    color: "#fff",
    fontWeight: "700",
  },
  captionText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
    marginTop: 4,
    maxWidth: SIZES.Width * 0.8,
    marginBottom: 14,
  },
});
