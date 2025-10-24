import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import BottomSheet, {
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
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);

  const renderFooter = (props) => {
    return (
      <BottomSheetFooter
        {...props}
        bottomInset={20}
        style={{ paddingBottom: keyboardVisible === true ? 50 : 0 }}
      >
        <FooterTextInput post={post} currentUser={currentUser} />
      </BottomSheetFooter>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      bottomInset={insets.bottom}
      snapPoints={Platform.OS == "ios" ? ["68", "94%"] : ["99%"]}
      topInset={Platform.OS == "android" ? SIZES.Height * 0.05 : 0}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      footerComponent={Platform.OS == "ios" && renderFooter}
      backdropComponent={CustomBackdrop}
      enablePanDownToClose={true}
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
                  minHeight: keyboardVisible
                    ? SIZES.Height * 0.45
                    : SIZES.Height * 0.87 - insets.bottom,
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
                  minHeight: keyboardVisible
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
    </BottomSheet>
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
  iosVsAndroidContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
