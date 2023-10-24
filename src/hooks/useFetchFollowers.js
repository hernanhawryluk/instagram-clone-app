import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';

const useFetchFollowers = ({user}) => {
    const [loader, setLoader] = useState(false);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        if (user.followers.length < 1) {
            setFollowers([]); 
            return;
        }
        else {
            if(!loader) {
                setLoader(true);
                try {
                    const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", user.followers)
                    .onSnapshot((snapshot) => {
                        setFollowers(snapshot.docs.map((doc) => doc.data()));
                    });
            
                    return unsubscribe;
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoader(false);
                }
            }
        }
    }, [user.followers]);

    return {
        followers
    }
  
}

export default useFetchFollowers