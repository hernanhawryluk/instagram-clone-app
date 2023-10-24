import { Alert } from "react-native";
import firebase from "firebase/compat";


const useReportAction = () => {

    const reportPost = (post, currentUser) => {
        try {
            firebase.firestore().collection("reports").add({
                ...post, reported_by: currentUser.email
            });
            Alert.alert("Thanks for reporting this", "We'll review the ad to determine whether it violates our Ad policies. Thanks for helping us keep Instagram safe.");
        } catch (error) {
            console.log(error);
        }
    };
    
    const reportUser = (user, currentUser) => {
        try {
            firebase.firestore().collection("reports").add({
                user, reported_by: currentUser.email
            });
            Alert.alert("Thanks for reporting this", "We'll review the ad to determine whether it violates our Ad policies. Thanks for helping us keep Instagram safe.");
        } catch (error) {
            console.log(error);
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
            onPress: () => {
            reportPost(post, currentUser);
            },
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
            onPress: () => {
            reportUser(user, currentUser);
            },
        },
        ]);
    };

    return {
        handleReportPost,
        handleReportUser
    }
}

export default useReportAction;
