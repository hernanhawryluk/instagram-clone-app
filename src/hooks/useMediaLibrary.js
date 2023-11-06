import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

const useMediaLibrary = (selectedAlbum) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
    
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant permission to access the camera roll to use this feature.",
          [{ text: "OK" }]
        );
        setPermissionGranted(false);
        return
      }
      setPermissionGranted(true);
    }
    requestPermission();
  }, []);

  

  useEffect(() => {
    const getPhotos = async () => {
      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "photo", first: 128, sortBy: ["creationTime"]
        });
        const allImages = assets.map((asset) => {
          return { id: asset.id, uri: asset.uri };
        });
        setImages(allImages);
      }
    };

    const getVideos = async () => {
      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "video", first: 24, sortBy: ["creationTime"]
        });
        const allVideos = await Promise.all(assets.map(async (asset) => {
          const  { localUri } = await MediaLibrary.getAssetInfoAsync(asset.id);
          return { id: asset.id, uri: asset.uri, localUri: localUri };
        })
        );
        setVideos(allVideos);
      }
    }

    getPhotos();
    getVideos();
  }, [permissionGranted, selectedAlbum])

  return {
    images,
    videos,
    permissionGranted
  }
}

export default useMediaLibrary