import firebase from "firebase/compat";

const useHandleRequests = ({ currentUser, user }) => {
    const handleRequests = (accept) => {
        try {
          firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .update({
              following_request: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
              ...(accept && {
                following: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
              }),
            });
    
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .update({
              followers_request: firebase.firestore.FieldValue.arrayRemove(user.email),
              ...(accept && {
                followers: firebase.firestore.FieldValue.arrayUnion(user.email),
              }),
            });

        } catch (error) {
          console.log(error);
        }
    };

    return {
        handleRequests
    }
}

export default useHandleRequests