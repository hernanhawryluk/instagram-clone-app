import { manipulateAsync } from "expo-image-manipulator";

const useResizePictures = () => {

    const resizeProfilePicture = async (imageUrl) => {
        const resizedImage = await manipulateAsync(
            imageUrl,
            [{ resize: { width: 320, height: 320 } }],
            { compress: 0.3 }
        );

        return resizedImage;
    }

    const resizePostPicture = async (imageUrl) => {
        const resizedImage = await manipulateAsync(
            imageUrl,
            [{ resize: { width: 640, height: 640 } }],
            { compress: 0.3 }
        );

        return resizedImage;
    }

    const resizeStoryPicture = async (imageUrl) => {
        const resizedImage = await manipulateAsync(
            imageUrl,
            [{ resize: { width: 640, height: 1280 } }],
            { compress: 0.3 }
        );

        return resizedImage;
    }
  
    return {
        resizeProfilePicture,
        resizePostPicture,
        resizeStoryPicture,
    }
    
}

export default useResizePictures