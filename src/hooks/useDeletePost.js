import { Alert } from "react-native";
import firebase from "firebase/compat";


const useDeletePost = () => {
    const deletePost = (post) => {
        try {
            firebase
                .firestore()
                .collection("users")
                .doc(post.owner_email)
                .collection("posts")
                .doc(post.id)
                .delete()
            
                Alert.alert("Post Deleted", "Your post has been deleted");

        } catch (error) {
            console.log(error);
        }
    }

    return {
        deletePost
    }
}

export default useDeletePost