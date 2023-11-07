import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { Divider } from "react-native-elements";
import { useUserContext } from "../contexts/UserContext";
import React, { useState, useRef } from "react";
import ProfilePicture from "../components/profile/edit/ProfilePicture";
import useUploadPicture from "../hooks/useUploadPicture";
import useUploadProfilePicture from "../hooks/useUploadProfilePicture";
import FastImage from "react-native-fast-image";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfile = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { uploadPicture, uploading } = useUploadPicture();
  const { uploadProfilePicture, loader } = useUploadProfilePicture();
  const [previewImage, setPreviewImage] = useState(null);

  const bottomSheetRef = useRef(null);

  const childPropChange = (newImage) => {
    setPreviewImage(newImage);
  };

  const handleUploadPicture = async () => {
    const uploadedImageUri = await uploadPicture(
      previewImage,
      currentUser.email,
      "profile_picture"
    );
    await uploadProfilePicture(uploadedImageUri, currentUser.email);
  };

  const handlePictureModal = () => {
    bottomSheetRef.current.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={26} color={"#fff"} />
        </TouchableOpacity>

        <Text style={styles.textTitle}>Edit profile</Text>
        {uploading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : previewImage ? (
          <TouchableOpacity
            onPress={async () => {
              await handleUploadPicture();
              navigation.goBack();
            }}
          >
            <Text style={styles.doneBtn}>Done</Text>
          </TouchableOpacity>
        ) : (
          <Text>Done</Text>
        )}
      </View>
      <Divider width={0.4} color={"#222"} />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePictureModal()}>
          <FastImage
            source={{
              uri: previewImage ? previewImage : currentUser.profile_picture,
            }}
            style={styles.image}
          />
          <Text style={styles.imageText}>Edit picture</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Divider width={0.4} color={"#222"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditingProfile", { module: "Name" })
          }
          style={styles.rowContainer}
        >
          <Text style={styles.descriptiveText}>Name</Text>
          <Text
            style={
              currentUser.name.length > 0
                ? styles.editableText
                : styles.editableBlurText
            }
          >
            {currentUser.name.length > 0 ? currentUser.name : "Name"}
          </Text>
        </TouchableOpacity>
        <Divider width={0.4} color={"#222"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditingProfile", { module: "Username" })
          }
          style={styles.rowContainer}
        >
          <Text style={styles.descriptiveText}>Username</Text>
          <Text style={styles.editableText}>{currentUser.username}</Text>
        </TouchableOpacity>
        <Divider width={0.4} color={"#222"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditingProfile", { module: "Bio" })
          }
          style={styles.rowContainer}
        >
          <Text style={styles.descriptiveText}>Bio</Text>
          <Text
            style={
              currentUser.bio.length > 0
                ? styles.editableText
                : styles.editableBlurText
            }
          >
            {currentUser.bio.length > 0 ? currentUser.bio : "Bio"}
          </Text>
        </TouchableOpacity>
        <Divider width={0.4} color={"#222"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditingProfile", { module: "Link" })
          }
          style={styles.rowContainer}
        >
          <Text style={styles.descriptiveText}>Link</Text>
          <Text
            numberOfLines={1}
            style={
              currentUser.link.length > 0
                ? styles.editableText
                : styles.editableBlurText
            }
          >
            {currentUser.link.length > 0 ? currentUser.link : "Add a Link"}
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
        </TouchableOpacity>
        <Divider width={0.4} color={"#222"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditingProfile", { module: "Gender" })
          }
          style={styles.rowContainer}
        >
          <Text style={styles.descriptiveText}>Gender</Text>
          <Text style={styles.editableText}>
            {currentUser.gender[0] == "Custom"
              ? currentUser.gender[1]
              : currentUser.gender[0]}
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
        </TouchableOpacity>
        <Divider width={0.4} color={"#222"} />
      </View>
      <ProfilePicture
        bottomSheetRef={bottomSheetRef}
        currentUser={currentUser}
        navigation={navigation}
        onPropChange={childPropChange}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  doneBtn: {
    fontSize: 16,
    fontWeight: "700",
    color: "#19f",
  },
  activityIndicator: {
    alignSelf: "center",
    marginHorizontal: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: Platform.OS === "android" ? 20 : 16,
  },
  image: {
    height: 90,
    width: 90,
    resizeMode: "cover",
    borderRadius: 100,
  },
  imageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#09f",
    marginTop: 16,
    paddingLeft: 7,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  descriptiveText: {
    color: "#fff",
    minWidth: Platform.OS === "android" ? 110 : 100,
    marginVertical: 15,
    fontSize: 16,
  },
  editableText: {
    color: "#fff",
    minWidth: 96,
    marginVertical: 15,
    fontSize: 16,
    flex: 1,
  },
  editableBlurText: {
    color: "#444",
    minWidth: 96,
    marginVertical: 15,
    fontSize: 16,
    flex: 1,
  },
});
