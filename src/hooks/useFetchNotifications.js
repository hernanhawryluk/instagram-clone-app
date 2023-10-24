import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';

const useFetchRequests = ({user}) => {
    const [loader, setLoader] = useState(false);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        
        if(!loader) {
            setLoader(true);
            try {
                const unsubscribe = firebase
                .firestore()
                .collection("users")
                .doc(user.email)
                .collection("notifications")
                .onSnapshot((snapshot) => {
                    setNotifications(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
                });
        
                return unsubscribe;
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
   
    }, []);

    return {
        notifications
    }
}

export default useFetchRequests