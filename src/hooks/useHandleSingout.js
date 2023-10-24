import firebase from "firebase/compat";

const useHandleSingout = () => {
    const handleSingout = async () => {
        try {
          await firebase.auth().signOut();
        } catch (error) {
          console.log(error);
        }
    };

    return { handleSingout };
}

export default useHandleSingout