import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { SIZES } from "../constants";
import useEditPostCaption from "../hooks/useEditPostCaption";

const EditPost = ({ navigation, route }) => {
  const { post } = route.params || {};
  const [value, setValue] = useState(post.caption);
  const { editPostCaption, loading } = useEditPostCaption({ navigation, post });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[styles.optionTitle, { color: "#fff", fontWeight: "500" }]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Edit info</Text>
        <TouchableOpacity
          onPress={() => {
            value.length > 0 && editPostCaption(value);
          }}
        >
          {loading ? (
            <ActivityIndicator style={{ paddingLeft: SIZES.Width * 0.044 }} />
          ) : (
            <Text
              style={[
                styles.optionTitle,
                {
                  color: value.length > 0 ? "#08f" : "#fff",
                  fontWeight: value.length > 0 ? "700" : "500",
                },
              ]}
            >
              Done
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.rowContainer}>
          <FastImage
            source={{ uri: post.profile_picture }}
            style={styles.profileImage}
          />
          <View style={styles.userContainer}>
            <Text style={styles.username}>{post.username}</Text>
            <TouchableOpacity>
              <Text style={styles.name}>Add location...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FastImage source={{ uri: post.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          style={styles.textInput}
          placeholder="Write a caption..."
          placeholderTextColor={"#bbb"}
          maxLength={255}
          multiline
          autoFocus
        />
      </View>
    </SafeAreaView>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  textTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  optionTitle: {
    fontSize: 15,
  },
  postContainer: {},
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 100,
    marginLeft: 6,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "column",
  },
  username: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  name: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: SIZES.Height * 0.36,
  },
  inputContainer: {
    marginTop: 5,
    minHeight: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  textInput: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
