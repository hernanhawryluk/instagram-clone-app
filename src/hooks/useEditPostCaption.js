import { useState } from 'react'
import firebase from "firebase/compat";

const useEditPostCaption = ({navigation, post}) => {
    const [loading, setLoading] = useState(false);

    const editPostCaption = async (value) => {
        setLoading(true);
        try {
        await firebase
            .firestore()
            .collection("users")
            .doc(post.owner_email)
            .collection("posts")
            .doc(post.id)
            .update({
            caption: value,
            });
        } catch (error) {
            console.log(error)
        } finally {
        setLoading(false);
        navigation.goBack();
        }
    };

    return { editPostCaption, loading };
}

export default useEditPostCaption