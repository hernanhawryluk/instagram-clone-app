import {useState, useEffect} from 'react'
import firebase from 'firebase/compat';

const useFetchLikes = ({ likesByEmail }) => {
    const [loader, setLoader] = useState(false);
    const [likesByUsers, setLikesByUsers] = useState({});
    

    useEffect(() => {
  
        if (likesByEmail.length < 1) {
            setLikesByUsers([]); 
            return;
        }
        else {
            if(!loader) { 
                setLoader(true);
                try {
                    const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", likesByEmail)
                    .onSnapshot((snapshot) => {
                        setLikesByUsers(snapshot.docs.map((doc) => doc.data()));
                        setLoader(false);
                    });
            
                    return () => unsubscribe;
                } catch (error) {
                    console.log(error);
                    setLoader(false);
                }
            }
        }

        
    }, [likesByEmail]);

    return {
        likesByUsers,
        loader
    }
    
}

export default useFetchLikes;