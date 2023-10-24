import { useState, useEffect } from 'react'
import { useUserContext } from "../contexts/UserContext";
import firebase from "firebase/compat";

const useFetchContactList = () => {
    const { currentUser } = useUserContext();
    const [chatUsers, setChatUsers] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection("users")
        .doc(currentUser.email)
        .collection("chat")
        .onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc, index) => ({ id: index, ...doc.data() }));
            setChatUsers(data);
        });
    }, []);

    return { chatUsers };
}

export default useFetchContactList;