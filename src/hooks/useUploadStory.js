import { useState } from "react";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import useUploadPicture from "./useUploadPicture";
import { db } from "../services/firebase";

const useUploadStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadPicture } = useUploadPicture();

  const uploadStory = async (imageUrl, currentUser) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const timestamp = new Date().getTime();
      const uploadedImageUrl = await uploadPicture(
        imageUrl,
        currentUser.email,
        timestamp
      );

      const newStory = {
        imageUrl: uploadedImageUrl,
        username: currentUser.username,
        name: currentUser.name,
        profile_picture: currentUser.profile_picture,
        owner_uid: currentUser.owner_uid,
        owner_email: currentUser.email,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        new_likes: [],
        seen_by_users: [],
      };

      const storiesCollectionRef = collection(
        db,
        "users",
        currentUser.email,
        "stories"
      );
      await addDoc(storiesCollectionRef, newStory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadStory,
    isLoading,
  };
};

export default useUploadStory;
