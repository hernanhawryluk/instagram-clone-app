import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const useHandleSignout = () => {
  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSignout };
};

export default useHandleSignout;
