import { useState } from "react";
import {
  doc,
  collection,
  writeBatch,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import useChatAddUser from "./useChatAddUser";

const useChatSendMessage = ({ user, currentUser }) => {
  const { chatAddUser } = useChatAddUser();
  const [loading, setLoading] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const chatSendMessage = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (user.status === undefined) {
        await chatAddUser(user);
      }

      const notification = {
        chat_notification: increment(1),
      };

      const current = {
        email: currentUser.email,
        name: currentUser.name,
        profile_picture: currentUser.profile_picture,
        username: currentUser.username,
        status: "unseen",
      };

      const newCurrentMessage = {
        message: textMessage,
        timestamp: serverTimestamp(),
        who: "current",
      };

      const newUserMessage = {
        message: textMessage,
        timestamp: serverTimestamp(),
        who: "user",
      };

      const batch = writeBatch(db);

      const userRef = doc(db, "users", user.email);

      const currentChatRef = doc(
        db,
        "users",
        currentUser.email,
        "chat",
        user.email
      );

      const newUserChatRef = doc(
        db,
        "users",
        user.email,
        "chat",
        currentUser.email
      );

      const currentMessageId = doc(collection(currentChatRef, "messages")).id;
      const newUserMessageId = doc(collection(newUserChatRef, "messages")).id;

      batch.set(userRef, notification, { merge: true });
      batch.set(newUserChatRef, current, { merge: true });
      batch.set(
        doc(currentChatRef, "messages", currentMessageId),
        newCurrentMessage
      );
      batch.set(
        doc(newUserChatRef, "messages", newUserMessageId),
        newUserMessage
      );

      await batch.commit();
    } catch (error) {
      console.log("Error sending message: ", error);
    } finally {
      setLoading(false);
      setTextMessage("");
    }
  };

  return {
    chatSendMessage,
    loading,
    textMessage,
    setTextMessage,
  };
};

export default useChatSendMessage;
