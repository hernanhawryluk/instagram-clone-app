import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import React from "react";

const Footer = ({ navigation }) => {
  return (
    <View>
      <Divider width={0.5} color="#333" />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpBtn}>Sign Up</Text>
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
    height: 70,
    paddingBottom: 5,
  },
  signUpText: {
    color: "#bbb",
  },
  signUpBtn: {
    color: "#1af",
    fontWeight: "700",
  },
});
