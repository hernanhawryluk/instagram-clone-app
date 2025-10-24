import { useState } from "react";
import useUploadPicture from "./useUploadPicture";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

const useUploadPost = () => {
  const [loader, setLoader] = useState(false);
  const { uploadPicture } = useUploadPicture();

  const uploadPost = async (imageUrl, caption, currentUser) => {
    if (loader) return;
    setLoader(true);
    try {
      const timestamp = Date.now();
      const uploadedImageUrl = await uploadPicture(
        imageUrl.uri,
        currentUser.email,
        timestamp.toString()
      );

      const newPost = {
        imageUrl: uploadedImageUrl,
        username: currentUser.username,
        profile_picture: currentUser.profile_picture,
        owner_uid: currentUser.owner_uid,
        owner_email: currentUser.email,
        caption: caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        new_likes: [],
        comments: [],
      };

      const userPostsRef = collection(db, "users", currentUser.email, "posts");
      await addDoc(userPostsRef, newPost);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return {
    uploadPost,
    loader,
  };
};

export default useUploadPost;
