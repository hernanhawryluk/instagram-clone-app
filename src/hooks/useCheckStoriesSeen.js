import { useStoriesContext } from "../contexts/StoriesContext";

const useCheckStoriesSeen = () => {
  const { stories } = useStoriesContext();

  const checkStoriesSeen = (username, email) => {
    return stories
      .filter((story) => story.username === username)
      .every((story) => story.seen_by_users.includes(email));
  };

  return { checkStoriesSeen };
};

export default useCheckStoriesSeen;
