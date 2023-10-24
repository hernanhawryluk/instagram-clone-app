import { Share } from 'react-native'

const useSharePost = () => {
    
    const sharePost = async (post) => {
        try {
            const result = await Share.share({
                title: "I would like to share this with you!",
                url: post.imageUrl,
                message: post.caption + "I would like to share this with you!\n\n" + post.caption + "\n\nCheck it out: instagram.com/" + post.username,
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const shareStory = async (story) => {
        try {
            const result = await Share.share({
                title: "I would like to share this with you!",
                url: story.imageUrl,
                message: "I would like to share this with you! \n\nCheck it out: instagram.com/" + story.username,
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const shareUser = async (currentUser) => {
        try {
            const result = await Share.share({
                title: "I would like to share this profile with you!",
                url: currentUser.profile_picture,
                message: "Check it out: instagram.com/" + currentUser.username,
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return { sharePost, shareStory, shareUser }
}

export default useSharePost;