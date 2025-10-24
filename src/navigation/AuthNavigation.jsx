import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import SignedOutStack from "./SignedOutStack";
import SignedInStack from "./SignedInStack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user));
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </View>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
