import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../constants";

const RenderMessageA = ({ item }) => {
  return (
    <View style={styles.userWrapper}>
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );
};

export default RenderMessageA;

const styles = StyleSheet.create({
  userWrapper: {
    marginLeft: 15,
    backgroundColor: "#333",
    borderRadius: 15,
    maxWidth: SIZES.Width * 0.68,
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 32,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
