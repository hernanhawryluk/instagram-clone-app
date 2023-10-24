import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const TitleBar = ({ navigation, name, activity }) => {
  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={23} color={"#fff"} />
      </TouchableOpacity>
      <Text style={styles.textTitle}>{name}</Text>
      {activity ? <ActivityIndicator /> : <Text>Done</Text>}
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 9,
    marginBottom: 14,
  },
  textTitle: {
    marginTop: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
