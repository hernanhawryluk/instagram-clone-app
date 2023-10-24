import { useState, useEffect } from 'react';
import firebase from "firebase/compat";

const useFetchStories = () => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedStories, setUpdatedStories] = useState(0);

    useEffect(() => {
        if(!isLoading){
            setIsLoading(true);
            try {
                const unsubscribe = firebase
                    .firestore()
                    .collectionGroup("stories")
                    .onSnapshot((snapshot) => {
                        setStories(
                            snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            }))
                        );
                        setUpdatedStories((prev) => prev + 1);
                });

                return () => unsubscribe();

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    return { 
        stories,
        updatedStories
    }
}

export default useFetchStories