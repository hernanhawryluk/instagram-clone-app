import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
} from "react-native";
import { useState, useRef } from "react";
import { SIZES } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useFetchReels from "../hooks/useFetchReels";
import Skeleton from "../components/reels/Skeleton";
import Reel from "../components/reels/Reel";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../components/shared/modals/MessageModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Reels = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const { videos } = useFetchReels();
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [playingIndexes, setPlayingIndexes] = useState({ 0: true });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleFeatureNotImplemented(setMessageModalVisible)}
          style={styles.titleContainer}
        >
          <Text style={styles.titleText}>Reels</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={22}
            color="#fff"
            style={{ marginTop: 6 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MediaLibrary", {
              initialSelectedType: "New reel",
            });
          }}
        >
          <Ionicons
            name="camera-outline"
            size={32}
            color="#fff"
            style={{ marginTop: 6 }}
          />
        </TouchableOpacity>
      </View>

      {videos.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={videos}
          renderItem={({ item }) => (
            <Reel
              item={item}
              playingIndexes={playingIndexes}
              index={item?.index}
              navigation={navigation}
              setMessageModalVisible={setMessageModalVisible}
              handleFeatureNotImplemented={handleFeatureNotImplemented}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          pagingEnabled={true}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.y /
                event.nativeEvent.layoutMeasurement.height
            );
            setPlayingIndexes({ [newIndex]: true });
          }}
        />
      ) : (
        <View style={{ flex: 1, marginTop: 0 }}>
          <Skeleton />
        </View>
      )}

      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
        height={20}
      />
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: SIZES.Width,
    height: Platform.OS === "ios" ? SIZES.Height * 0.913 : SIZES.Height * 0.987,
  },
  headerContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 23,
  },
});
