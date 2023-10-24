  import { useState } from "react";
  import firebase from "firebase/compat";
  import "firebase/compat/storage";

const useUploadPicture = () => {
    const [uploading, setUploading] = useState(false);

    const uploadPicture = async (uri, email, name) => {
        if (!uploading) {
          setUploading(true);
          try { 
            const storageRef = firebase.storage().ref(`${email}/${name}`);
            const response = await fetch(uri);
            const blob = await response.blob();

            const uploadSnapshot = storageRef.put(blob);

            uploadSnapshot.on("state_changed", (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log("Upload is " + progress + "% done");
            });

            await uploadSnapshot;
    
            const downloadUrl = await storageRef.getDownloadURL();
            return downloadUrl;
          } catch (error) {
            console.error(error);
          } finally {
            setUploading(false);
          }
        }
      };

      return {
        uploadPicture,
        uploading
      }
  }

export default useUploadPicture;