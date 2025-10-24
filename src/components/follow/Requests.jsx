import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useUserContext } from "../../contexts/UserContext";
import useHandleRequests from "../../hooks/useHandleRequests";
import { Image } from "expo-image";
import { SIZES } from "../../constants";

const Requests = ({ user, navigation }) => {
  const { currentUser } = useUserContext();
  const { handleRequests } = useHandleRequests({ currentUser, user });

  const handleViewProfile = () => {
    navigation.navigate("UserDetail", {
      email: user.email,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleViewProfile()}>
        <View style={styles.rowContainer}>
          <Image source={{ uri: user.profile_picture }} style={styles.image} />
          <View style={styles.userContainer}>
            <Text numberOfLines={1} style={styles.username}>
              {user.username}
            </Text>
            <Text numberOfLines={1} style={styles.name}>
              {user.name}
            </Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleRequests(true)}>
          <View style={styles.blueButton}>
            <Text style={styles.blueText}>Accept</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleRequests(false)}>
          <View style={styles.grayButton}>
            <Text style={styles.grayText}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: 3,
    height: 53,
    width: 53,
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
    width: SIZES.Width * 0.34,
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    width: "95%",
    fontSize: 14,
  },
  name: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
  },
  blueButton: {
    backgroundColor: "#07f",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 80,
    borderRadius: 10,
  },
  grayButton: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 80,
    borderRadius: 10,
  },
  blueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  grayText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
