import { useState } from 'react';
import firebase from 'firebase/compat';

const useSavePost = () => {
    const [isLoading, setIsLoading] = useState(false)

    const savePost = async (post, currentUser) => {
        if (!isLoading) {
            setIsLoading(true)
            try {
                if (currentUser.saved_posts.includes(post.id)) {

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayRemove(post.id),
                        });

                } else {

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayUnion(post.id),
                        });

                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
    }

    return { savePost }

}

export default useSavePost