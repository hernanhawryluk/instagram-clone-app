import { useEffect, useState } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loadLimit, setLoadLimit] = useState(40);
  const [isLoading, setIsLoading] = useState(false);
  const [justRequested, setJustRequested] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      const postsQuery = query(
        collectionGroup(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(loadLimit)
      );

      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const updatedPosts = snapshot.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }));
        setPosts(updatedPosts);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  }, [loadLimit]);

  const fetchOlderPosts = () => {
    if (!justRequested) {
      setJustRequested(true);
      setTimeout(() => {
        setJustRequested(false);
      }, 5000);
      setLoadLimit((prev) => prev + 20);
    }
  };

  const refreshPosts = () => {
    if (!justRequested) {
      setJustRequested(true);
      setTimeout(() => {
        setJustRequested(false);
      }, 5000);
      setLoadLimit(20);
    }
  };

  return {
    posts,
    isLoading,
    fetchOlderPosts,
    refreshPosts,
  };
};

export default useFetchPosts;
