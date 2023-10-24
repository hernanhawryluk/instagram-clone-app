import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import firebase from "firebase/compat";

const useFilterPosts = (filterKey) => {
    const { currentUser } = useUserContext();
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loadLimit, setLoadLimit] = useState(20);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (filterKey.length > 0){
            try {
                setIsLoading(true);
                const unsubscribe = firebase
                .firestore()
                .collectionGroup("posts")
                .where("owner_email", "in", filterKey)
                .orderBy("createdAt", "desc")
                .limit(loadLimit)
                .onSnapshot(snapshot => {
                    const updatedPosts = snapshot.docs.map(post => ({ id: post.id, ...post.data() }));
                    setFilteredPosts(updatedPosts);
                });

                return () => unsubscribe;

            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setFilteredPosts([{id: "empty"}]);
        }
        }, [loadLimit]
    );

    const fetchOlderPosts = () => {
        if (!isLoading) {
            setLoadLimit(loadLimit + 10);
        }
    };

    const refreshPosts = async () => {
        if (!isLoading) {
            setLoadLimit(20);
        }
    };

    return {
        filteredPosts,
        isLoading,
        fetchOlderPosts,
        refreshPosts
    };
};

export default useFilterPosts;