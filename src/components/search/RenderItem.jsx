import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { SIZES } from "../../constants";

const RenderItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate("Detail", { item: item })}
      style={styles.imagesContainer}
      key={item.id}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  imagesContainer: {
    width: SIZES.Width * 0.335,
    height: SIZES.Width * 0.335,
    margin: -0.4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
