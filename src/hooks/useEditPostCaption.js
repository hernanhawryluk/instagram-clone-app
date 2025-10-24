import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const useEditPostCaption = ({ navigation, post }) => {
  const [loading, setLoading] = useState(false);

  const editPostCaption = async (value) => {
    setLoading(true);
    try {
      const postRef = doc(db, "users", post.owner_email, "posts", post.id);
      await updateDoc(postRef, { caption: value });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  return { editPostCaption, loading };
};

export default useEditPostCaption;
