import { useEffect, useState } from "react";
import firebase from "firebase/compat";

const useFindUsers = ({currentUser, searchKey}) => {
    const [users, setUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const beginSearch = () => {
        const unsubscribe = firebase
            .firestore()
            .collection("users")
            .where("username", "!=", currentUser.username)
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc, index) => ({id: index, ...doc.data()}));
                setUsers(data);
            });

        return () => unsubscribe();
    }

    useEffect(() => {
        const data = users.filter((user) => {
            return user.username.toLowerCase().includes(searchKey.toLowerCase()) ||
            user.email.toLowerCase().includes(searchKey.toLowerCase()) ||
            user.name.toLowerCase().includes(searchKey.toLowerCase());
        });
        setSearchResult(data);
    }, [searchKey])

    return {
        beginSearch,
        users,
        searchResult,
    }
}

export default useFindUsers;