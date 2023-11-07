import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import TitleBar from "../components/shared/TitleBar";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolateColor,
  FadeIn,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useUserContext } from "../contexts/UserContext";
import BottomSheetOptions from "../components/detail/bottomSheets/BottomSheetOptions";
import BottomSheetComments from "../components/detail/bottomSheets/BottomSheetComments";
import BottomSheetComment from "../components/detail/bottomSheets/BottomSheetComment";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import RenderItem from "../components/detail/RenderItem";

const Detail = ({ navigation, route }) => {
  const { item } = route.params || {};
  const { currentUser } = useUserContext();
  const { timeToReplaceData, onSnapshotData } = useFetchUserPosts(
    item.owner_email
  );

  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const bottomSheetRefOptions = useRef(null);
  const bottomSheetRefComments = useRef(null);
  const bottomSheetRefComment = useRef(null);

  const [posts, setPosts] = useState([item]);

  useEffect(() => {
    if (timeToReplaceData > 0) {
      const moveItemToStart = (arr) => {
        const index = arr.findIndex((post) => item.id === post.id);
        if (index !== -1 || index !== 0) {
          const itemToMove = arr.splice(index, 1)[0];
          arr.unshift(itemToMove);
          setPosts(arr);
        } else {
          setPosts(arr);
        }
      };
      moveItemToStart(onSnapshotData);
    }
  }, [timeToReplaceData]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((value) => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, { duration: 100 });
    })
    .onEnd(() => {
      if (translateY.value > 75) {
        opacity.value = 0;
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(1, { duration: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", "#000"]
    ),
    borderRadius: 20,
    overflow: "hidden",
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        entering={FadeIn.delay(300).duration(200)}
      >
        <TitleBar navigation={navigation} name="Detail" activity={false} />
        <FlatList
          data={posts}
          snapToInterval={layoutHeight - 10}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          renderItem={({ item, index }) => (
            <RenderItem
              navigation={navigation}
              post={item}
              currentUser={currentUser}
              bottomSheetRefComments={bottomSheetRefComments}
              bottomSheetRefComment={bottomSheetRefComment}
              bottomSheetRefOptions={bottomSheetRefOptions}
              setBottomSheetIndex={setBottomSheetIndex}
              sharedIndex={index}
              setLayoutHeight={setLayoutHeight}
            />
          )}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        <BottomSheetOptions
          bottomSheetRef={bottomSheetRefOptions}
          navigation={navigation}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
        />
        <BottomSheetComments
          bottomSheetRef={bottomSheetRefComments}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
          navigation={navigation}
        />
        <BottomSheetComment
          bottomSheetRefComment={bottomSheetRefComment}
          post={posts[bottomSheetIndex]}
          currentUser={currentUser}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    flex: 1,
    backgroundColor: "#000",
  },
});
