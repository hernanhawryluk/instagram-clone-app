import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import { Foundation, Feather, Ionicons } from "@expo/vector-icons";
import useImageGallery from "../../../hooks/useImageGallery";
import CameraModule from "../../shared/CameraModule";
import { Image } from "expo-image";

const ProfilePicture = ({ bottomSheetRef, currentUser, onPropChange }) => {
  const snapPoints = useMemo(() => [312], []);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { ChooseImageFromGallery } = useImageGallery({
    setSelectedImage,
  });

  useEffect(() => {
    setPreviewImage(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    setPreviewImage(capturedPhoto);
  }, [capturedPhoto]);

  useEffect(() => {
    onPropChange(previewImage);
  }, [previewImage]);

  const handleCameraPicture = () => {
    setCameraModalVisible(true);
  };

  const handleGalleryPicture = () => {
    ChooseImageFromGallery();
  };

  const handleRemovePicture = () => {
    setPreviewImage(blankUserImageUri);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => (
        <View style={styles.closeLineContainer}>
          <View style={styles.closeLine}></View>
        </View>
      )}
    >
      <View style={styles.mainContainer}>
        <Image
          source={{
            uri: previewImage ? previewImage : currentUser.profile_picture,
          }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={() => handleGalleryPicture()}
          style={styles.rowContainer}
        >
          <Foundation name="photo" size={29} color="#fff" />
          <Text style={styles.text}>Choose from library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCameraPicture()}
          style={styles.rowContainer}
        >
          <Feather name="camera" size={26} color="#fff" />
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemovePicture()}
          style={styles.rowContainer}
        >
          <Ionicons
            name="trash-outline"
            size={28}
            color="#f00"
            style={{ transform: [{ scaleX: 1.3 }] }}
          />
          <Text style={styles.redText}>Remove current picture</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraModalVisible}
      >
        <CameraModule
          setCameraModalVisible={setCameraModalVisible}
          setCapturedPhoto={setCapturedPhoto}
        />
      </Modal>
    </BottomSheetModal>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#777",
    marginTop: 9,
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    marginVertical: 28,
    contentFit: "cover",
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 18,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 16,
  },
  redText: {
    color: "#f00",
    fontSize: 16.5,
    marginLeft: 15,
  },
});
