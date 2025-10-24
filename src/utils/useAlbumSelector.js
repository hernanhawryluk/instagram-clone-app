import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const useAlbumSelector = ({ setAlbumModalVisible }) => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [selectedAlbumTitle, setSelectedAlbumTitle] = useState("Recents");
  const [allAlbums, setAllAlbums] = useState();

  const desiredOrder = [
    "Recents",
    "Favorites",
    "WhatsApp",
    "Videos",
    "Selfies",
    "Live Photos",
    "Portrait",
    "Screenshots",
  ];

  const compareTitles = (a, b) => {
    const aValue = desiredOrder.indexOf(a.title);
    const bValue = desiredOrder.indexOf(b.title);

    if (aValue !== -1 && bValue !== -1) {
      return aValue - bValue;
    }

    if (aValue !== -1) {
      return -1;
    }

    if (bValue !== -1) {
      return 1;
    }

    return a.title.localeCompare(b.title);
  };

  useEffect(() => {
    const loadAlbums = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (permissionResponse?.status !== "granted") return;

      try {
        const albums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });
        const sortedAlbums = albums.sort(compareTitles);
        const filteredAlbums = sortedAlbums.filter(
          (album) => album.assetCount > 0
        );
        const albumWithPhotosPromises = filteredAlbums.map(async (album) => {
          const photos = await MediaLibrary.getAssetsAsync({
            album: album.id,
            mediaType: ["photo", "video"],
            first: 1,
          });
          const asset = photos.assets[0];

          if (asset) {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
            return { ...album, image: assetInfo.localUri || asset.uri };
          } else {
            return { ...album, image: null };
          }
        });
        const albumWithPhotos = await Promise.all(albumWithPhotosPromises);
        setAllAlbums(albumWithPhotos);
      } catch (error) {
        console.error("Error al obtener álbumes:", error);
      }
    };

    loadAlbums();
  }, [permissionResponse]);

  const handleAlbumSelection = (album) => {
    if (permissionResponse?.status !== "granted") return;

    setSelectedAlbum(album.id);
    setSelectedAlbumTitle(album.title);
    setAlbumModalVisible(false);
  };

  return {
    allAlbums,
    selectedAlbum,
    selectedAlbumTitle,
    handleAlbumSelection,
  };
};

export default useAlbumSelector;
