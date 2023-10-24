import { useState } from "react";
import firebase from "firebase/compat";

const useHandleUnfollow = ({currentUser, user}) => {
  const [loader, setLoader] = useState(false);
  const handleUnfollow = async () => {
    if (!loader) {
      setLoader(true);
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.email)
          .update({
            following: firebase.firestore.FieldValue.arrayRemove(user.email),
          });
        await firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .update({
            followers: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
          });
          
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return {
    handleUnfollow,
    loader,
  };
};

export default useHandleUnfollow;