import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Divider } from "react-native-elements";

const Footer = ({ navigation }) => {
  return (
    <View>
      <Divider width={0.5} color="#333" />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.signUpBtn}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "android" ? 70 : 50,
    paddingBottom: Platform.OS === "android" ? 5 : 0,
  },
  signUpText: {
    color: "#bbb",
  },
  signUpBtn: {
    color: "#1af",
    fontWeight: "700",
  },
});
