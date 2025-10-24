import { StyleSheet, Text, View } from "react-native";

const RenderDate = ({ item }) => {
  return (
    <View>
      <Text style={styles.dateText}>{item.timestamp}</Text>
    </View>
  );
};

export default RenderDate;

const styles = StyleSheet.create({
  dateText: {
    color: "#bbb",
    fontSize: 12,
    marginVertical: 10,
    textAlign: "center",
  },
});
