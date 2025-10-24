import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
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
    height: 34,
    marginTop: 10,
    marginBottom: Platform.OS === "android" ? 10 : 4,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
});
