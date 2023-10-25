import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import { Ionicons, Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import useReportAction from "../../../hooks/useReportAction";
import useDeletePost from "../../../hooks/useDeletePost";
import useSharePost from "../../../hooks/useSharePost";
import useSavePost from "../../../hooks/useSavePost";

const BottomSheetOptions = ({
  bottomSheetRef,
  navigation,
  post,
  currentUser,
}) => {
  const { handleReportPost } = useReportAction();
  const { deletePost } = useDeletePost();
  const { sharePost } = useSharePost();
  const { savePost } = useSavePost();

  const snapPoints = useMemo(() => ["32%"], []);

  const handleSavePost = async () => {
    await savePost(post, currentUser);
  };

  const handleSharePost = async () => {
    bottomSheetRef.current.close();
    await sharePost(post);
  };

  const handleEditPost = () => {
    bottomSheetRef.current.close();
    navigation.navigate("EditPost", {
      post: post,
    });
  };

  const handleDeletePost = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          bottomSheetRef.current.close();
          deletePost(post);
        },
      },
    ]);
  };

  const handleAboutAccount = () => {
    if (currentUser.email === post.owner_email) {
      bottomSheetRef.current.close();
      navigation.navigate("Profile");
    } else {
      bottomSheetRef.current.close();
      navigation.navigate("UserDetail", {
        email: post.owner_email,
      });
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => (
        <View style={styles.closeLineContainer}>
          <View style={styles.closeLine}></View>
        </View>
      )}
      enablePanDownToClose
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={styles.opacityContainer}
          >
            <View style={styles.buttonContainer}>
              {currentUser.saved_posts &&
              currentUser.saved_posts.includes(post.id) ? (
                <Ionicons name="bookmark" size={24} color="#fff" />
              ) : (
                <Feather name="bookmark" size={24} color="#fff" />
              )}
              <Text style={styles.buttonText}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSharePost()}
            style={styles.opacityContainer}
          >
            <View style={styles.buttonContainer}>
              <Feather name="send" size={24} color="#fff" />
              <Text style={styles.buttonText}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>

        {post.owner_email === currentUser.email && (
          <View style={styles.verticalGroup}>
            <TouchableOpacity
              onPress={() => handleEditPost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <MaterialIcons name="edit" size={24} color="#fff" />
                <Text style={styles.optionText}>Edit</Text>
              </View>
            </TouchableOpacity>
            <Divider width={0.5} color="#666" />
            <TouchableOpacity
              onPress={() => handleDeletePost()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <Ionicons name="trash-outline" size={24} color="#f00" />
                <Text style={styles.optionRedText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {post.owner_email !== currentUser.email && (
          <View style={styles.verticalGroup}>
            <TouchableOpacity
              onPress={() => handleAboutAccount()}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={26}
                  color="#fff"
                />
                <Text style={styles.optionText}>About this account</Text>
              </View>
            </TouchableOpacity>
            <Divider width={0.5} color="#999" />
            <TouchableOpacity
              onPress={() => handleReportPost(post, currentUser)}
              style={styles.columnContainer}
            >
              <View style={styles.optionContainer}>
                <Octicons name="report" size={22} color="#f00" />
                <Text style={styles.optionRedText}>Report</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetOptions;

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
    marginBottom: 30,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  opacityContainer: {
    flexDirection: "row",
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#444",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 4,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  verticalGroup: {
    marginTop: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  columnContainer: {
    flexDirection: "row",
  },
  optionContainer: {
    backgroundColor: "#444",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingVertical: 16,
    flex: 1,
    gap: 15,
  },
  optionText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  optionRedText: {
    color: "#f00",
    fontWeight: "500",
    fontSize: 16,
  },
  unfollowIcon: {
    transform: [{ scaleX: -1 }],
  },
});
