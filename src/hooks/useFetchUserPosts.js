import { useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchUserPosts = (email) => {
  const [posts, setPosts] = useState([]);
  const [loadLimit, setLoadLimit] = useState(20);
  const [loader, setLoader] = useState(false);
  const [onSnapshotData, setOnSnapshotData] = useState([]);
  const [timeToReplaceData, setTimeToReplaceData] = useState(0);

  useEffect(() => {
    if (!email) return;

    if (!loader) {
      setLoader(true);

      const postsRef = collection(doc(db, "users", email), "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"), limit(loadLimit));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }));

          if (data.length <= 0) {
            setPosts([{ id: "empty" }]);
          } else {
            setPosts(data);
          }

          setOnSnapshotData(data);
          setTimeToReplaceData((prev) => prev + 1);
          setLoader(false);
        },
        (error) => {
          console.error(error);
          setLoader(false);
        }
      );

      return () => unsubscribe();
    }
  }, [email, loadLimit]);

  const fetchOlderPosts = () => {
    setLoadLimit((prev) => prev + 10);
  };

  const refreshPosts = () => {
    setLoadLimit(20);
  };

  return {
    posts,
    loader,
    fetchOlderPosts,
    refreshPosts,
    onSnapshotData,
    timeToReplaceData,
  };
};

export default useFetchUserPosts;
