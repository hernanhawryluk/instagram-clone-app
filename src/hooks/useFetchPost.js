import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';

const useFetchPost = (item) => {
    const [isLoading, setIsLoading] = useState(false);
    const [onSnapshotData, setOnSnapshotData] = useState({});
    const [timeToReplaceData, setTimeToReplaceData] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try {
            const unsubscribe = firebase
            .firestore()
            .collection("users")
            .doc(item.owner_email)
            .collection("posts")
            .doc(item.id)
            .onSnapshot(snapshot => {
                setOnSnapshotData({...snapshot.data(), id: snapshot.id});
                setTimeToReplaceData(true)
            });

            return () => unsubscribe;
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])
    
    return {
        onSnapshotData,
        timeToReplaceData
    }
}

export default useFetchPost