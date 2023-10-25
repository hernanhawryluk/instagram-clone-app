import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SIZES } from "../constants";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import FastImage from "react-native-fast-image";
import RenderDate from "../components/chat/RenderDate";
import RenderMessageA from "../components/chat/RenderMessageA";
import RenderMessageB from "../components/chat/RenderMessageB";
import useFetchMessages from "../hooks/useFetchMessages";
import useChatSendMessage from "../hooks/useChatSendMessage";
import RenderProfile from "../components/chat/RenderProfile";
import { ScrollView } from "react-native-gesture-handler";

const Chating = ({ navigation, route }) => {
  const { user } = route.params;
  const { currentUser } = useUserContext();
  const { messages } = useFetchMessages({ user, currentUser });
  const { chatSendMessage, loading, textMessage, setTextMessage } =
    useChatSendMessage({ user, currentUser });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.chatContainer}
        >
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.rowContainer}
            >
              <MaterialIcons name="arrow-back-ios" size={23} color={"#fff"} />
              <FastImage
                source={{ uri: user.profile_picture }}
                style={styles.profilePicture}
              />
              <View>
                <Text style={styles.textTitle}>{user.name}</Text>
                <Text style={styles.subtitle}>{user.username}</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.rowContainer, { gap: 20 }]}>
              <TouchableOpacity>
                <Feather name="phone" size={23} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather
                  name="video"
                  size={23}
                  color={"#fff"}
                  style={{ transform: [{ scaleY: 1.15 }] }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView snapToAlignment="end" style={styles.scrollView}>
            <RenderProfile navigation={navigation} user={user} />
            {messages.map((message, index) =>
              message.who === "timestamp" ? (
                <View key={index}>
                  <RenderDate item={message} />
                </View>
              ) : message.who === "user" ? (
                <View style={styles.userContainer} key={index}>
                  <FastImage
                    source={{ uri: user.profile_picture }}
                    style={styles.littleProfilePicture}
                  />
                  <RenderMessageA item={message} />
                </View>
              ) : (
                <View key={index} style={styles.currentUserContainer}>
                  <RenderMessageB item={message} />
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.searchWrapper}>
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.cameraWrapper}>
                <Ionicons
                  name="camera"
                  size={20}
                  color={"#fff"}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>

              <TextInput
                value={textMessage}
                onChangeText={setTextMessage}
                maxLength={255}
                autoCapitalize="sentences"
                autoCorrect={true}
                placeholder="Message..."
                placeholderTextColor={"#999"}
                style={styles.searchInput}
                enterKeyHint="search"
                multiline
              />
            </View>
            {loading ? (
              <ActivityIndicator style={{ marginRight: 10 }} />
            ) : textMessage.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  textMessage !== "" && chatSendMessage();
                }}
                style={styles.rowContainer}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.rowContainer, { gap: 8, marginRight: 14 }]}>
                <TouchableOpacity>
                  <Ionicons name="image-outline" size={23} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="mic" size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Chating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 45,
  },
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#000",
    marginHorizontal: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 9,
  },
  textTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 11,
    fontWeight: "300",
  },
  searchWrapper: {
    marginTop: 10,
    paddingVertical: 3,
    marginLeft: SIZES.Width * 0.04,
    marginRight: SIZES.Width * 0.04,
    backgroundColor: "#252525",
    minHeight: 36,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchInput: {
    color: "#fff",
    height: "100%",
    marginLeft: 10,
    width: SIZES.Width * 0.65,
  },
  cameraWrapper: {
    marginLeft: 3,
    height: 29,
    width: 29,
    borderRadius: 100,
    backgroundColor: "#07f",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 15,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 15,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  littleProfilePicture: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  currentUserContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 10,
  },
});
