import { StyleSheet, View } from "react-native";
import Header from "./Header";
import { Divider } from "react-native-elements";
import PostImage from "./PostImage";
import Footer from "./Footer";
import Caption from "../home/posts/Caption";
import Date from "../home/posts/Date";
import Comments from "./Comments";
import { SIZES } from "../../constants";

const RenderItem = ({
  navigation,
  post,
  currentUser,
  bottomSheetRefComments,
  bottomSheetRefComment,
  bottomSheetRefOptions,
  setBottomSheetIndex,
  sharedIndex,
  setLayoutHeight,
}) => {
  const findHeight = (layout) => {
    let { x, y, width, height } = layout;
    setLayoutHeight(height);
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        findHeight(event.nativeEvent.layout);
      }}
    >
      <Header
        navigation={navigation}
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefOptions}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      <PostImage post={post} currentUser={currentUser} />
      <Footer
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
        navigation={navigation}
      />
      <Caption post={post} />
      <Comments
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        bottomSheetRefComment={bottomSheetRefComment}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      <Date post={post} />
      <View style={{ height: 10 }}></View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 600,
  },
  Image: {
    marginVertical: 12,
    height: SIZES.Width,
    width: SIZES.Width,
  },
});
