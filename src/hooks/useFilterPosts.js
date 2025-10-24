import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFilterPosts = (filterKey) => {
  const { currentUser } = useUserContext();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loadLimit, setLoadLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (filterKey.length > 0) {
      setIsLoading(true);

      const postsQuery = query(
        collectionGroup(db, "posts"),
        where("owner_email", "in", filterKey),
        orderBy("createdAt", "desc"),
        limit(loadLimit)
      );

      const unsubscribe = onSnapshot(
        postsQuery,
        (snapshot) => {
          const updatedPosts = snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }));
          setFilteredPosts(updatedPosts);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching posts:", error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setFilteredPosts([{ id: "empty" }]);
    }
  }, [filterKey, loadLimit]);

  const fetchOlderPosts = () => {
    if (!isLoading) {
      setLoadLimit((prev) => prev + 10);
    }
  };

  const refreshPosts = () => {
    if (!isLoading) {
      setLoadLimit(20);
    }
  };

  return {
    filteredPosts,
    isLoading,
    fetchOlderPosts,
    refreshPosts,
  };
};

export default useFilterPosts;
