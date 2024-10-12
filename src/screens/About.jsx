import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import TitleBar from "../components/shared/TitleBar";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const About = ({ navigation, route }) => {
  const { user } = route.params || {};
  const [dateJoined, setDateJoined] = useState("");

  useEffect(() => {
    if (user?.createdAt?.seconds) {
      const timestamp = user.createdAt;
      const date = new Date(timestamp.seconds * 1000);
      const options = { year: "numeric", month: "long" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      setDateJoined(formattedDate);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar name="About this account" navigation={navigation} />
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.profile_picture }} style={styles.image} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.smallText}>
          To help keep our community authentic, we're showing information about
          accounts on Instagram.
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>
            See why this information is important.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={30}
          color={"#fff"}
        />
        <View style={styles.columnContainer}>
          <Text style={styles.textTitle}>Date joined</Text>
          <Text style={styles.textSubtitle}>{dateJoined}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Ionicons name="location-outline" size={32} color={"#fff"} />
        <View style={styles.columnContainer}>
          <Text style={styles.textTitle}>Account based in</Text>
          <Text style={styles.textSubtitle}>{user.country}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 15,
  },
  username: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
  smallText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 12,
  },
  linkText: {
    color: "#def",
    fontSize: 13,
    fontWeight: "400",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 15,
    gap: 15,
  },
  columnContainer: {
    justifyContent: "center",
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  textSubtitle: {
    color: "#bbb",
    fontSize: 15,
    fontWeight: "400",
  },
});
