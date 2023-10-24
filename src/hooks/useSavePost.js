import { useState } from 'react';
import firebase from 'firebase/compat';

const useSavePost = () => {
    const [isLoading, setIsLoading] = useState(false)

    const savePost = async (post, currentUser) => {
        if (!isLoading) {
            setIsLoading(true)
            try {
                if (currentUser.saved_posts.includes(post.id)) {
                    const batch = firebase.firestore().batch();

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .collection("saved")
                        .doc(post.id)
                        .delete({
                            imageUrl: post.imageUrl,
                            id: post.id,
                            username: post.username,
                            owner_email: post.owner_email,
                        });

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayRemove(post.id),
                        });

                    await batch.commit();

                } else {
                    const batch = firebase.firestore().batch();

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .collection("saved")
                        .doc(post.id)
                        .set({
                            imageUrl: post.imageUrl,
                            id: post.id,
                            username: post.username,
                            owner_email: post.owner_email,
                        });

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayUnion(post.id),
                        });

                    await batch.commit();
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