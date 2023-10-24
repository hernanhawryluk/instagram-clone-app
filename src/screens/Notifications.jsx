import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Requests from "../components/follow/Requests";
import Interaction from "../components/notifications/Interaction";
import useFetchRequests from "../hooks/useFetchRequests";
import useFetchUserPosts from "../hooks/useFetchUserPosts";

const Notifications = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const { posts } = useFetchUserPosts(currentUser.email);
  const { requests } = useFetchRequests({ user: currentUser });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.titleContainer}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color={"#fff"} />
        <Text style={styles.textTitle}>Notifications</Text>
      </TouchableOpacity>

      {currentUser.followers_request &&
        currentUser.followers_request.length > 0 && (
          <View>
            <Text style={styles.subtitle}>Followers Requests:</Text>
            <FlatList
              style={{}}
              data={requests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Requests user={item} />}
            />
          </View>
        )}
      <View>
        <FlatList
          style={{}}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item.id !== "empty" &&
            item.comments.length > 0 &&
            item.comments[item.comments.length - 1].username !==
              currentUser.username && (
              <Interaction
                navigation={navigation}
                item={item}
                currentUser={currentUser}
              />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 20,
    gap: 3,
  },
  textTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginHorizontal: 20,
  },
});
