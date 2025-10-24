import { Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useReportAction = (firebaseApp) => {
  const reportPost = async (post, currentUser) => {
    try {
      await addDoc(collection(db, "reports"), {
        ...post,
        reported_by: currentUser.email,
      });
      Alert.alert(
        "Thanks for reporting this",
        "We'll review the ad to determine whether it violates our Ad policies. Thanks for helping us keep Instagram safe."
      );
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const reportUser = async (user, currentUser) => {
    try {
      await addDoc(collection(db, "reports"), {
        user,
        reported_by: currentUser.email,
      });
      Alert.alert(
        "Thanks for reporting this",
        "We'll review the ad to determine whether it violates our Ad policies. Thanks for helping us keep Instagram safe."
      );
    } catch (error) {
      console.error("Error reporting user:", error);
    }
  };

  const handleReportPost = (post, currentUser) => {
    Alert.alert("Report Post", "Are you sure you want to report this post?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => reportPost(post, currentUser),
      },
    ]);
  };

  const handleReportUser = (user, currentUser) => {
    Alert.alert("Report User", "Are you sure you want to report this user?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => reportUser(user, currentUser),
      },
    ]);
  };

  return {
    handleReportPost,
    handleReportUser,
  };
};

export default useReportAction;
