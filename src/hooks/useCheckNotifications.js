import { useState, useEffect } from 'react';
import { useUserContext } from "../contexts/UserContext";
import useFetchUserPosts from './useFetchUserPosts';

const useCheckNotifications = () => {
    const { currentUser } = useUserContext();
    const { posts } = useFetchUserPosts(currentUser.email);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(0);

    const [countRequests, setCountRequests] = useState(0);
    const [countComments, setCountComments] = useState(0);

    useEffect(() => {

        let counter = 0;
        
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].comments && posts[i].comments.length > 0) {
                if (posts[i].comments[posts[i].comments.length - 1].email !== currentUser.email) {
                    counter++;
                }
            }
        }

        setCountComments(counter);
        if (countComments > 0) { notificationsCounter(); }
        
    }, [posts]);

    useEffect(() => {
        setCountRequests(0);
        
        if (currentUser.followers_request && currentUser.followers_request.length > 0 ) {
            setCountRequests(currentUser.followers_request.length);
        }

        if(countRequests > 0) { 
            notificationsCounter(); 
        } else {
            notificationsCounter(); 
        }

    }, [currentUser]);

    const notificationsCounter = () => {
        const counter = countRequests + countComments;
        
        if (counter > 0) {
            setNotificationCounter(counter);
            setNotificationVisible(true);
            setNotificationModal(true);
        
            setTimeout(() => {
                setNotificationModal(false);
            }, 3000);
        } else {
        setNotificationCounter(0);
        setNotificationVisible(false);
        }
    }

    return {
        notificationVisible,
        notificationModal,
        notificationCounter,
        setNotificationModal,
    }

}

export default useCheckNotifications