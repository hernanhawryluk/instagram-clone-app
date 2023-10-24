import * as ImagePicker from "expo-image-picker";
import useResizePictures from "./useResizePictures";

const useImageGallery = ({setSelectedImage}) => {
  const { resizeProfilePicture } = useResizePictures();
      
    const ChooseImageFromGallery = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
    
          if (!result.canceled) {
            const imageUrl = result.assets[0].uri;
    
            const resizedImage = await resizeProfilePicture(imageUrl);
    
            setSelectedImage(resizedImage.uri);
          }
        } catch (error) {
          console.error("Error picking image:", error);
        }
      };

      const unselectImage = () => {
        setSelectedImage(null);
      }

      return {
        ChooseImageFromGallery,
        unselectImage
      }
}

export default useImageGallery;