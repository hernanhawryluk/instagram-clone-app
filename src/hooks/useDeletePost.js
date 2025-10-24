import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useDeletePost = () => {
  const deletePost = async (post) => {
    try {
      const postRef = doc(db, "users", post.owner_email, "posts", post.id);
      await deleteDoc(postRef);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStory = async (story) => {
    try {
      const storyRef = doc(db, "users", story.owner_email, "stories", story.id);
      await deleteDoc(storyRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    deletePost,
    deleteStory,
  };
};

export default useDeletePost;
