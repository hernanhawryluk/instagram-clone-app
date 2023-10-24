import firebase from "firebase/compat";
import { useState } from "react";

const useHandleCommentLike = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentLike = async (singleComment, targetIndex, allComments, userId, postId, currentUser) => {
        setIsLoading(true);
        try {
            const currentLikeStatus = singleComment.likes_by_users.includes(
            currentUser.email
            );

            let updatedValues = allComments;
            if (currentLikeStatus == true) {
            updatedValues[targetIndex].likes_by_users = updatedValues[
                targetIndex
            ].likes_by_users.replace(currentUser.email + ",", "");
            } else {
            updatedValues[targetIndex].likes_by_users += currentUser.email + ",";
            }

            const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("posts")
            .doc(postId)
            .update({
                comments: updatedValues,
            });
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            setIsLoading(false)
        }
    };

    return { handleCommentLike, isLoading }
}

export default useHandleCommentLike