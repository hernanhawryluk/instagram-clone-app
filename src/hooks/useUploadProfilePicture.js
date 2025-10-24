import { useState } from "react";
import {
  doc,
  collection,
  getDocs,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useUploadProfilePicture = () => {
  const [loader, setLoader] = useState(false);

  const uploadProfilePicture = async (uri, email) => {
    if (loader) return;
    setLoader(true);
    try {
      const userDocRef = doc(db, "users", email);
      const batch = writeBatch(db);

      batch.update(userDocRef, { profile_picture: uri });

      const updateSubcollection = async (subcollectionName) => {
        const subColRef = collection(db, "users", email, subcollectionName);
        const snapshot = await getDocs(subColRef);
        snapshot.docs.forEach((docSnap) => {
          batch.update(docSnap.ref, { profile_picture: uri });
        });
      };

      await updateSubcollection("posts");
      await updateSubcollection("stories");
      await updateSubcollection("reels");

      await batch.commit();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return {
    uploadProfilePicture,
    loader,
  };
};

export default useUploadProfilePicture;
