import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFetchMessages = ({ user, currentUser }) => {
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(
        db,
        "users",
        currentUser.email,
        "chat",
        user.email,
        "messages"
      ),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [currentUser.email, user.email]);

  useEffect(() => {
    const formattedDate = (seconds) => {
      const messageDate = new Date(seconds * 1000);
      const currentDate = new Date();

      const daysAgo = (currentDate - messageDate) / (1000 * 60 * 60 * 24);
      if (daysAgo < 1) {
        return "today";
      } else if (daysAgo < 2) {
        return "yesterday";
      }

      const meses = [
        "ENE",
        "FEB",
        "MAR",
        "ABR",
        "MAY",
        "JUN",
        "JUL",
        "AGO",
        "SEP",
        "OCT",
        "NOV",
        "DIC",
      ];

      const mes = meses[messageDate.getMonth()];
      const dia = messageDate.getDate();
      const hora = messageDate.getHours() % 12 || 12;
      const minutos = messageDate.getMinutes().toString().padStart(2, "0");
      const amPm = messageDate.getHours() < 12 ? "AM" : "PM";

      return `${mes} ${dia} AT ${hora}:${minutos} ${amPm}`;
    };

    function areDatesEqual(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

    const addDateDividerToChat = () => {
      if (data && data.length > 0) {
        let messagesWithDateDivider = [];
        let lastTimestampDate = null;

        for (let i = 0; i < data.length; i++) {
          const message = data[i];

          if (message.timestamp) {
            const messageDate = new Date(message.timestamp.seconds * 1000);

            if (
              !lastTimestampDate ||
              !areDatesEqual(messageDate, lastTimestampDate)
            ) {
              messagesWithDateDivider.push({
                who: "timestamp",
                timestamp: formattedDate(message.timestamp.seconds),
              });
              lastTimestampDate = messageDate;
            }
          }

          messagesWithDateDivider.push(message);
        }
        setMessages(messagesWithDateDivider);
      }
    };
    addDateDividerToChat();
  }, [data]);

  return {
    messages,
  };
};

export default useFetchMessages;
