import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';


const useFetchRequests = ({user}) => {
    const [loader, setLoader] = useState(false);
    const [requests, setRequests] = useState({});

    useEffect(() => {
        if (user.followers_request.length < 1) {
            setRequests([]); 
            return;
        }
        else {
            if(!loader) {
                setLoader(true);
                try {
                    const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", user.followers_request)
                    .onSnapshot((snapshot) => {
                        setRequests(snapshot.docs.map((doc) => doc.data()));
                    });
            
                    return unsubscribe;
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoader(false);
                }
            }
        }
    }, [user.followers_request]);

    return {
        requests
    }
}

export default useFetchRequests