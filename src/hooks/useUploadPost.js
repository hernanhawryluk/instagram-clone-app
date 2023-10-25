import { useState } from 'react'
import useUploadPicture from './useUploadPicture'
import firebase from "firebase/compat";
import "firebase/compat/storage";

const useUploadPost = () => {
    const [loader, setLoader] = useState(false)
    const {uploadPicture} = useUploadPicture()


    const uploadPost = async (imageUrl, caption, currentUser) => {
        if(!loader) {
            setLoader(true);
            try {
                const timestamp = new Date().getTime();
                const uploadedImageUrl = await uploadPicture(imageUrl.uri, currentUser.email, timestamp);

                const newPost = {
                    imageUrl: uploadedImageUrl,
                    username: currentUser.username,
                    profile_picture: currentUser.profile_picture,
                    owner_uid: currentUser.owner_uid,
                    owner_email: currentUser.email,
                    caption: caption,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    likes_by_users: [],
                    new_likes: [],
                    comments: [],
                }

                await firebase
                .firestore()
                .collection("users")
                .doc(currentUser.email)
                .collection("posts")
                .add(newPost);
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoader(false);
            }
        }
    }

    return {
        uploadPost,
        loader
    }
}

export default useUploadPost