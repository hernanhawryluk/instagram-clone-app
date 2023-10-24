import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";
import { useUserContext } from "../contexts/UserContext";
import StoryHighlights from "../components/profile/StoryHighlights";
import Header from "../components/profile/Header";

const Profile = ({ navigation }) => {
  const { currentUser } = useUserContext();

  return (
    <SafeAreaView style={styles.container}>
      <Header currentUser={currentUser} navigation={navigation} />
      <StoryHighlights navigation={navigation} currentUser={currentUser} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
