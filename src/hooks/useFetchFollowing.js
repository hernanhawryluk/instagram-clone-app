import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';

const useFetchFollowing = ({user}) => {
    const [loader, setLoader] = useState(false);
    const [following, setFollowing] = useState([]);
    
    useEffect(() => {
        if (user.following.length < 1) {
            setFollowing([]); 
            return;
        }
        else {
            if(!loader) {
                setLoader(true);
                try {
                    const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", user.following)
                    .onSnapshot((snapshot) => {
                        setFollowing(snapshot.docs.map((doc) => doc.data()));
                    });
            
                    return unsubscribe;
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoader(false);
                }
            }
        }
    }, [user.following]);

    return {
        following
    }
}

export default useFetchFollowing