import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../constants";

const RenderMessageB = ({ item }) => {
  return (
    <View>
      <View style={styles.currentUserWrapper}>
        <Text style={styles.text}>{item.message}</Text>
      </View>
    </View>
  );
};

export default RenderMessageB;

const styles = StyleSheet.create({
  currentUserWrapper: {
    marginLeft: 15,
    backgroundColor: "#82f",
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
