import { useState, useEffect } from 'react'
import useFetchContactList from './useFetchContactList';

const useCheckChatNotifications = () => {
    const [chatNotificationCounter, setChatNotificationCounter] = useState(0);
    const { chatUsers } = useFetchContactList();

    useEffect(() => {
            let count = 0;
        chatUsers.forEach((user) => {
            if (user.status === "unseen") { count++ }
        });

        setChatNotificationCounter(count);

    }, [chatUsers]);


    return { chatNotificationCounter }
}

export default useCheckChatNotifications;