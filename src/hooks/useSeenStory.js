import { useEffect } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../services/firebase";

const useSeenStory = ({ stories, currentUser, currentStoryIndex }) => {
  useEffect(() => {
    if (
      stories.length > 0 &&
      currentStoryIndex >= 0 &&
      !stories[currentStoryIndex].seen_by_users.includes(currentUser.email)
    ) {
      const story = stories[currentStoryIndex];
      const storyRef = doc(db, "users", story.owner_email, "stories", story.id);

      updateDoc(storyRef, {
        seen_by_users: arrayUnion(currentUser.email),
      }).catch((error) => {
        console.error("Error updating seen_by_users:", error);
      });
    }
  }, [currentStoryIndex, stories, currentUser.email, db]);
};

export default useSeenStory;
