import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import Comments from "./Comments";
import { SIZES } from "../../../constants";
import FooterTextInput from "../../shared/bottomSheets/FooterTextInput";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomSheetComments = ({
  bottomSheetRef,
  currentUser,
  post,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );

      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  const RenderFooter = (props) => {
    return (
      <BottomSheetFooter {...props} bottomInset={16}>
        <FooterTextInput post={post} currentUser={currentUser} />
      </BottomSheetFooter>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      bottomInset={insets.bottom}
      snapPoints={Platform.OS == "ios" ? ["68", "94%"] : ["99%"]}
      topInset={Platform.OS == "android" ? SIZES.Height * 0.06 : 0}
      footerComponent={Platform.OS == "ios" && RenderFooter}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      backdropComponent={CustomBackdrop}
      enablePanDownToClose
      handleComponent={() => (
        <View>
          <View style={styles.closeLineContainer}>
            <View style={styles.closeLine}></View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Comments</Text>
            <View style={styles.divider} />
          </View>
        </View>
      )}
    >
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {post.comments.length > 0 ? (
            <View
              style={[
                styles.iosVsAndroidContainer,
                {
                  height: keyboardVisible
                    ? SIZES.Height * 0.48
                    : SIZES.Height * 0.85 - insets.bottom,
                },
              ]}
            >
              <BottomSheetFlatList
                inverted
                data={post.comments}
                renderItem={({ item, index }) => (
                  <Comments
                    comment={item}
                    key={index}
                    index={index}
                    postId={post.id}
                    userId={post.owner_email}
                    currentUser={currentUser}
                    comments={post.comments}
                    navigation={navigation}
                    bottomSheetRef={bottomSheetRef}
                  />
                )}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
              />
              {Platform.OS == "android" && (
                <FooterTextInput post={post} currentUser={currentUser} />
              )}
            </View>
          ) : (
            <View
              style={[
                styles.iosVsAndroidContainer,
                {
                  height: keyboardVisible
                    ? SIZES.Height * 0.53
                    : SIZES.Height * 0.9,
                },
              ]}
            >
              <View style={styles.noCommentsContainer}>
                <Text style={styles.subTitle}>No comments yet</Text>
                <Text style={styles.comments}>Start the conversation.</Text>
              </View>
              {Platform.OS == "android" && (
                <FooterTextInput post={post} currentUser={currentUser} />
              )}
            </View>
          )}
        </TouchableWithoutFeedback>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetComments;

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#777",
    marginTop: 9,
  },
  mainContainer: {
    flex: 1,
  },
  iosVsAndroidContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 15,
  },
  divider: {
    paddingTop: 1,
    width: "100%",
    backgroundColor: "#444",
  },
  commentsContainer: {
    maxHeight: SIZES.Height * 0.7,
  },
  noCommentsContainer: {
    marginTop: SIZES.Height * 0.16,
    alignItems: "center",
  },
  subTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 15,
  },
  comments: {
    fontSize: 15,
    fontWeight: "300",
    color: "#fff",
    marginVertical: 15,
  },
});
