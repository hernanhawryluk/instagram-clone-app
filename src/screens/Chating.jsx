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
import React, { useState, useRef } from "react";
import { SIZES } from "../constants";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import { Image } from "expo-image";
import RenderDate from "../components/chat/RenderDate";
import RenderMessageA from "../components/chat/RenderMessageA";
import RenderMessageB from "../components/chat/RenderMessageB";
import useFetchMessages from "../hooks/useFetchMessages";
import useChatSendMessage from "../hooks/useChatSendMessage";
import RenderProfile from "../components/chat/RenderProfile";
import { ScrollView } from "react-native-gesture-handler";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../components/shared/modals/MessageModal";

const Chating = ({ navigation, route }) => {
  const { user } = route.params;
  const { currentUser } = useUserContext();
  const { messages } = useFetchMessages({ user, currentUser });
  const { chatSendMessage, loading, textMessage, setTextMessage } =
    useChatSendMessage({ user, currentUser });
  const scrollViewRef = useRef();
  const [messageModalVisible, setMessageModalVisible] = useState(false);

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
              <MaterialIcons name="arrow-back-ios" size={28} color={"#fff"} />
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.profilePicture}
              />
              <View>
                <Text style={styles.textTitle}>{user.name}</Text>
                <Text style={styles.subtitle}>{user.username}</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.rowContainer, { gap: 20 }]}>
              <TouchableOpacity
                onPress={() =>
                  handleFeatureNotImplemented(setMessageModalVisible)
                }
              >
                <Feather name="phone" size={25} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleFeatureNotImplemented(setMessageModalVisible)
                }
              >
                <Feather
                  name="video"
                  size={25}
                  color={"#fff"}
                  style={{ transform: [{ scaleY: 1.15 }] }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            snapToAlignment="end"
            ref={scrollViewRef}
            style={styles.scrollView}
          >
            <RenderProfile navigation={navigation} user={user} />
            {messages.map((message, index) =>
              message.who === "timestamp" ? (
                <View key={index}>
                  <RenderDate item={message} />
                </View>
              ) : message.who === "user" ? (
                <View style={styles.userContainer} key={index}>
                  <Image
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
              <TouchableOpacity
                onPress={() =>
                  handleFeatureNotImplemented(setMessageModalVisible)
                }
                style={styles.cameraWrapper}
              >
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
                onFocus={() =>
                  setTimeout(() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                  }, 100)
                }
                multiline
              />
            </View>
            {loading ? (
              <ActivityIndicator style={{ marginRight: 14 }} />
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
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleFeatureNotImplemented(setMessageModalVisible)
                  }
                  style={{ marginRight: 6 }}
                >
                  <Ionicons name="image-outline" size={22} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleFeatureNotImplemented(setMessageModalVisible)
                  }
                  style={{ marginRight: 12 }}
                >
                  <Feather name="mic" size={19} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
        <MessageModal
          messageModalVisible={messageModalVisible}
          message={"This feature is not yet implemented."}
          height={70}
        />
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
    height: 44,
    width: 44,
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
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 6,
  },
  searchWrapper: {
    marginTop: 10,
    paddingVertical: 3,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: "#252525",
    minHeight: 46,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchInput: {
    color: "#fff",
    height: "100%",
    fontSize: 17,
    marginBottom: 4,
    marginLeft: 10,
    width: SIZES.Width * 0.65,
  },
  cameraWrapper: {
    marginLeft: 8,
    height: 34,
    width: 34,
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
