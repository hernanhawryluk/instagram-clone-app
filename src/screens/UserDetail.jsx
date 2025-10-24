import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import StoryHightlights from "../components/user/StoryHighlights";
import { useUserContext } from "../contexts/UserContext";
import BottomSheetOptions from "../components/user/bottomSheets/BottomSheetOptions";
import CopyClipboardModal from "../components/shared/modals/CopyClipboardModal";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const User = ({ route, navigation }) => {
  const { email } = route.params || {};
  const [user, setUser] = useState({});
  const { currentUser } = useUserContext();
  const bottomSheetRefOptions = useRef(null);
  const [copyModalVisible, setCopyModalVisible] = useState(false);

  useEffect(() => {
    try {
      const docRef = doc(db, "users", email);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setUser(snapshot.data());
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{user?.username}</Text>
        {user?.username ? (
          <TouchableOpacity
            onPress={() => bottomSheetRefOptions.current.present()}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={"#fff"}
              style={{ marginTop: 2 }}
            />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator />
        )}
      </View>

      <StoryHightlights navigation={navigation} user={user} />

      <CopyClipboardModal copyModalVisible={copyModalVisible} />

      <BottomSheetOptions
        bottomSheetRef={bottomSheetRefOptions}
        user={user}
        currentUser={currentUser}
        navigation={navigation}
        setCopyModalVisible={setCopyModalVisible}
      />
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
