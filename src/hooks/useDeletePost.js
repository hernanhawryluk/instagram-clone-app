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

        } catch (error) {
            console.log(error);
        }
    }

    const deleteStory = (story) => {
        try {
            firebase
                .firestore()
                .collection("users")
                .doc(story.owner_email)
                .collection("stories")
                .doc(story.id)
                .delete()
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        deletePost,
        deleteStory
    }
}

export default useDeletePost