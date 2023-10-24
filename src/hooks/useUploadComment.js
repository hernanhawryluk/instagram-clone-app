import { useState } from 'react'
import firebase from 'firebase/compat';

const useUploadComment = (post, currentUser) => {
    const [isLoading, setIsLoading] = useState(false);

    const uploadComment = async (value) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const snapshot = await firebase
                .firestore()
                .collection("users")
                .doc(post.owner_email)
                .collection("posts")
                .doc(post.id)
                .get();
        
            const currentTimestamp = firebase.firestore.Timestamp.now();
    
            if (snapshot.exists) {
                const postRef = snapshot.ref;
                const newComment = {
                    email: currentUser.email,
                    profile_picture: currentUser.profile_picture,
                    username: currentUser.username,
                    comment: value,
                    createdAt: currentTimestamp,
                    likes_by_users: "",
                };
        
                await postRef.update({
                    comments: firebase.firestore.FieldValue.arrayUnion(newComment),
                });
            } else {
                console.log("No such document!");
            }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return { 
        uploadComment, 
        isLoading 
    }
}

export default useUploadComment