import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const useMediaLibrary = (selectedAlbum) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (permissionResponse?.status === "granted") {
      setPermissionGranted(true);
    }
  }, [permissionResponse]);

  useEffect(() => {
    const getPhotos = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "photo",
          first: 64,
          sortBy: ["creationTime"],
        });

        const allImages = await Promise.all(
          assets.map(async (asset) => {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
            return {
              id: asset.id,
              uri: assetInfo.localUri,
            };
          })
        );

        setImages(allImages);
      }
    };

    const getVideos = async () => {
      if (permissionGranted) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: selectedAlbum,
          mediaType: "video",
          first: 24,
          sortBy: ["creationTime"],
        });

        const allVideos = await Promise.all(
          assets.map(async (asset) => {
            const { localUri } = await MediaLibrary.getAssetInfoAsync(asset.id);
            return { id: asset.id, uri: asset.uri, localUri: localUri };
          })
        );

        setVideos(allVideos);
      }
    };

    getPhotos();
    getVideos();
  }, [permissionGranted, selectedAlbum]);

  return {
    images,
    videos,
    permissionGranted,
  };
};

export default useMediaLibrary;
