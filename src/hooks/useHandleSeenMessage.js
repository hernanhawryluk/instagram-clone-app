import firebase from "firebase/compat";

const useHandleSeenMessage = () => {

    const handleSeenMessage = async (user, currentUser) => {
        await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.email)
        .collection("chat")
        .doc(user.email)
        .update({
            status: "seen",
        });
    };

    return {
        handleSeenMessage
    }
}

export default useHandleSeenMessage