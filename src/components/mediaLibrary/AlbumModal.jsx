import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

const AlbumModal = ({
  setAlbumModalVisible,
  handleAlbumSelection,
  allAlbums,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setAlbumModalVisible(false)}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Select album</Text>

        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Divider color="#222" width={0.2} />
      <View style={styles.mainContainer}>
        <View style={styles.spaceBetween} />
        <FlatList
          data={allAlbums}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              {item.image !== undefined && (
                <View>
                  {item.title === "WhatsApp" && (
                    <View>
                      <Text style={styles.subtitle}>MY ALBUMS</Text>
                    </View>
                  )}
                  {item.title === "Videos" && (
                    <View>
                      <Text style={styles.subtitle}>MEDIA TYPES</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => handleAlbumSelection(item)}
                    style={styles.rowContainer}
                  >
                    <View>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.albumImage}
                      />
                    </View>
                    <View>
                      <Text style={styles.albumName}>{item.title}</Text>
                      <Text style={styles.albumCount}>{item.assetCount}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AlbumModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    backgroundColor: "#000",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 50,
  },
  cancelButton: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 15,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  mainContainer: {
    marginHorizontal: 15,
    backgroundColor: "#050505",
  },
  spaceBetween: {
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  albumImage: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
  albumName: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  albumCount: {
    color: "#fff",
    fontSize: 12,
  },
  subtitle: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 15,
  },
});
