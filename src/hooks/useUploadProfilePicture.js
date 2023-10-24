import { useState } from "react";
import firebase from "firebase/compat";

const useUploadProfilePicture = () => {
    const [loader, setLoader] = useState(false);

    const uploadProfilePicture = async (uri, email) => {
        if (!loader) {
            setLoader(true);
            try { 
                const batch = firebase.firestore().batch();
                await firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .update({
                        profile_picture: uri,
                    });

                await firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .collection("posts")
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            batch.update(doc.ref, {
                                profile_picture: uri,
                            });
                        });
                    });

                await firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .collection("stories")
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            batch.update(doc.ref, {
                                profile_picture: uri,
                            });
                        });
                    });
                
                await firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .collection("reels")
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            batch.update(doc.ref, {
                                profile_picture: uri,
                            });
                        });
                    });

                await batch.commit();

            } catch (error) {
            console.error(error);
            } finally {
            setLoader(false);
            }
        }
    };

    return {
        uploadProfilePicture,
        loader
    }
  
}

export default useUploadProfilePicture