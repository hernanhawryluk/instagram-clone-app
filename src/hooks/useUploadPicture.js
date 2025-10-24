import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const useUploadPicture = () => {
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  const uploadPicture = async (uri, email, name) => {
    if (uploading) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `${email}/${name}`);

      const response = await fetch(uri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload is " + progress + "% done");
          },
          (error) => reject(error),
          () => resolve()
        );
      });

      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadPicture,
    uploading,
  };
};

export default useUploadPicture;
