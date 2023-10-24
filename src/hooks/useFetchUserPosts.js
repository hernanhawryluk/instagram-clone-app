import { useEffect, useState } from "react";
import firebase from "firebase/compat";

const useFetchUserPosts = (email) => {
    const [posts, setPosts] = useState([]);
    const [loadLimit, setLoadLimit] = useState(20);
    const [loader, setLoader] = useState(false);
    const [onSnapshotData, setOnSnapshotData] = useState([]);
    const [timeToReplaceData, setTimeToReplaceData] = useState(0);

    useEffect(() => {
        if(!loader){
            setLoader(true);
            try {
                const unsubscribe = firebase
                .firestore()
                .collection("users")
                .doc(email)
                .collection("posts")
                .orderBy("createdAt", "desc")
                .limit(loadLimit)
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(post => ({ id: post.id, ...post.data() }));
                    if (data.length <= 0) {
                        setPosts([{id: "empty"}]);
                    } else {
                        setPosts(data);
                    }
                    setOnSnapshotData(data)
                    setTimeToReplaceData(prev => prev + 1);
              });

              return () => unsubscribe();

            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    }, [loadLimit]);

    const fetchOlderPosts = async () => {
        setLoadLimit(loadLimit + 10);
    };

    const refreshPosts = async () => {
        setLoadLimit(20);
    };

    return {
        posts,
        loader,
        fetchOlderPosts,
        refreshPosts,
        onSnapshotData,
        timeToReplaceData
    };
};

export default useFetchUserPosts;