import { useEffect } from 'react';
import firebase from "firebase/compat";

const useSeenStory = ({ stories, currentUser,currentStoryIndex}) => {
    useEffect(() => {
        if (
          !stories[currentStoryIndex].seen_by_users.includes(currentUser.email)
        ) {
          firebase
            .firestore()
            .collection("users")
            .doc(stories[0].owner_email)
            .collection("stories")
            .doc(stories[currentStoryIndex].id)
            .update({
              seen_by_users: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
            });
        }
      }, [currentStoryIndex]);

}

export default useSeenStory