import firebase from "firebase/compat";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            setIsLoading(true);
            if(!isLoading) {
                const user = firebase.auth().currentUser;
    
                if (user) {
                    const unsubscribe = firebase
                        .firestore()
                        .collection("users")
                        .doc(user.email)
                        .onSnapshot(snapshot => {
                          setCurrentUser(snapshot.data())
                        });

                    return () => unsubscribe;
                    } 
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            } 
        }, 
    []);

    return {
        currentUser,
    };
};