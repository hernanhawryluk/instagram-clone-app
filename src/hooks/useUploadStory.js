import { useState } from 'react'
import useUploadPicture from './useUploadPicture'
import firebase from "firebase/compat";

const useUploadStory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {uploadPicture} = useUploadPicture()

    const uploadStory = async (imageUrl, currentUser) => {
        if(!isLoading) {
            setIsLoading(true);
            try {
                const timestamp = new Date().getTime();
                const uploadedImageUrl = await uploadPicture(imageUrl, currentUser.email, timestamp);

                const newStory = {
                    imageUrl: uploadedImageUrl,
                    username: currentUser.username,
                    profile_picture: currentUser.profile_picture,
                    owner_uid: currentUser.owner_uid,
                    owner_email: currentUser.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    likes_by_users: [],
                    seen_by_users: [],
                }
    
                await firebase
                .firestore()
                .collection("users")
                .doc(currentUser.email)
                .collection("stories")
                .add(newStory);
                
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return {
        uploadStory,
        isLoading
    }
}

export default useUploadStory