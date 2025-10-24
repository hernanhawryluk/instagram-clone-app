import { StyleSheet } from "react-native";
import { useUserContext } from "../contexts/UserContext";
import StoryHighlights from "../components/profile/StoryHighlights";
import Header from "../components/profile/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({ navigation }) => {
  const { currentUser } = useUserContext();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
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
    paddingTop: 0,
  },
});
