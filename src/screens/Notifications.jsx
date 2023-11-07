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
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Requests from "../components/follow/Requests";
import Interaction from "../components/notifications/Interaction";
import useFetchRequests from "../hooks/useFetchRequests";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES } from "../constants";
import firebase from "firebase/compat";

const Notifications = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const { posts } = useFetchUserPosts(currentUser.email);
  const { requests } = useFetchRequests({ user: currentUser });
  const [notificationCounter, setNotificationCounter] = useState(0);

  useEffect(() => {
    if (currentUser.event_notification > 0) {
      try {
        firebase.firestore().collection("users").doc(currentUser.email).update({
          event_notification: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    counter = 0;

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].comments && posts[i].comments.length > 0) {
        if (
          posts[i].comments[posts[i].comments.length - 1].email !==
          currentUser.email
        ) {
          counter++;
        }
      }
      if (posts[i].new_likes.length > 0) {
        counter++;
      }
    }

    if (
      currentUser.followers_request &&
      currentUser.followers_request.length > 0
    ) {
      counter = counter + currentUser.followers_request.length;
    }

    setNotificationCounter(counter);
  }, [posts]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.titleContainer}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color={"#fff"} />
        <Text style={styles.textTitle}>Notifications</Text>
      </TouchableOpacity>
      {notificationCounter > 0 ? (
        <View>
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
                  currentUser.username ? (
                  <Interaction
                    navigation={navigation}
                    item={item}
                    currentUser={currentUser}
                    text={"commented"}
                  />
                ) : (
                  item.id !== "empty" &&
                  item.new_likes.length > 0 && (
                    <Interaction
                      navigation={navigation}
                      item={item}
                      currentUser={currentUser}
                      text={"liked"}
                    />
                  )
                )
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <LinearGradient
            start={[0.9, 0.45]}
            end={[0.07, 1.03]}
            colors={["#ff00ff", "#ff4400", "#ffff00"]}
            style={styles.rainbowBorder}
          >
            <AntDesign name="checkcircle" size={58} color={"#000"} />
          </LinearGradient>
          <Text style={styles.title}>No notifications for now</Text>
          <Text style={styles.text}>
            There are no notifications from the past 30 days.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.button}>Back to home</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: Platform.OS === "android" ? 20 : 4,
    gap: 3,
  },
  textTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
    transform: [{ scaleY: 1.1 }],
  },
  subtitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginHorizontal: 20,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: SIZES.Height * 0.18,
    gap: 10,
  },
  rainbowBorder: {
    padding: 3,
    height: 63.5,
    width: 63.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    color: "#09f",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyContainer: {
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 60,
    gap: 15,
  },
  emptyIcon: {
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 94,
    width: 94,
  },
  emptyTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  emptyButton: {
    color: "#09f",
    fontSize: 16,
    fontWeight: "700",
  },
});
