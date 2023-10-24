import { useEffect, useState } from "react";
import firebase from "firebase/compat";

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loadLimit, setLoadLimit] = useState(40);
    const [isLoading, setIsLoading] = useState(false);
    const [justRequested, setJustRequested] = useState(false);

useEffect(() => {
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const unsubscribe = firebase
              .firestore()
              .collectionGroup("posts")
              .orderBy("createdAt", "desc")
              .limit(loadLimit)
              .onSnapshot(snapshot => {
                  const updatedPosts = snapshot.docs.map(post => ({ id: post.id, ...post.data() }));
                  setPosts(updatedPosts);
            });

            return () => unsubscribe;
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
      }
    fetchPosts();
}, [loadLimit]);

    const fetchOlderPosts = () => {
        if (!justRequested) {
            setJustRequested(true);
            setTimeout(() => {
                setJustRequested(false);
            }, 5000)
            setLoadLimit(loadLimit + 20);
        }
    };

    const refreshPosts = async () => {
        if (!justRequested) {
            setJustRequested(true);
            setTimeout(() => {
                setJustRequested(false);
            }, 5000)
            setLoadLimit(20);
        }
    };

    return {
        posts,
        isLoading,
        fetchOlderPosts,
        refreshPosts
    };
};

export default useFetchPosts;