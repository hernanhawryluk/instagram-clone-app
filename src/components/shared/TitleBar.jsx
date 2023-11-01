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
        <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
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
    alignItems: "center",
    marginHorizontal: 20,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
