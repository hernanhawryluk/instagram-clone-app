import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const useAlbumSelector = ({setAlbumModalVisible}) => {
    
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
          try {
            const albums = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
            const sortedAlbums = albums.sort(compareTitles);
            const filteredAlbums = sortedAlbums.filter((album) => album.assetCount > 0);
            const albumWithPhotosPromises = filteredAlbums.map(async (album) => {
              const photos = await MediaLibrary.getAssetsAsync({
                album: album.id,
                mediaType: ["photo", "video"],
                first: 1,
              });
              return { ...album, image: photos.assets[0]?.uri };
            });
            const albumWithPhotos = await Promise.all(albumWithPhotosPromises);
            setAllAlbums(albumWithPhotos);
          } catch (error) {
            console.error("Error al obtener álbumes:", error);
          }
        };
        loadAlbums();
      }, []);

      const handleAlbumSelection = (album) => {
        setSelectedAlbum(album.id);
        setSelectedAlbumTitle(album.title);
        setAlbumModalVisible(false);
      };

    return {
        allAlbums,
        selectedAlbum,
        selectedAlbumTitle,
        handleAlbumSelection
    }
}

export default useAlbumSelector;