import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import CameraNoPermission from "./CameraNoPermission";

const CameraModule = ({
  setCameraModalVisible,
  setCapturedPhoto,
  setSelectedType = null,
  selectedType = "New post",
  options = false,
}) => {
  const camRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState("off");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <CameraNoPermission
        setCameraModalVisible={setCameraModalVisible}
        selectedType={selectedType}
      />
    );
  }

  const handleTakePicture = async () => {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      const imageUri = data.uri;

      setCapturedPhoto(imageUri);
    }
    setCameraModalVisible(false);
  };

  const handleCloseModal = () => {
    setCameraModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedType === "New post" && <View style={styles.shadowBowTop} />}
      <View
        style={
          !options
            ? styles.cameraStyle
            : selectedType === "New post"
            ? styles.cameraStyle
            : styles.cameraFullStyle
        }
      >
        <CameraView
          style={styles.camera}
          facing={facing}
          flash={flashMode}
          ref={camRef}
        />
      </View>

      {selectedType === "New post" && <View style={styles.shadowBowBottom} />}
      <View style={styles.shotButtonContainer}>
        <View style={styles.shotButtonOutside}>
          <TouchableOpacity onPress={() => handleTakePicture()}>
            <View style={styles.shotButtonInside} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.titleContainer,
            { height: selectedType === "New post" ? 50 : 72 },
          ]}
        >
          <TouchableOpacity onPress={() => handleCloseModal()}>
            <Ionicons name="close" size={34} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFlashMode(flashMode === "off" ? "on" : "off");
            }}
          >
            <Ionicons
              name={flashMode === "on" ? "flash" : "flash-off"}
              size={34}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-sharp" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleCloseModal()}>
            <MaterialIcons name="photo-library" size={29} color="#fff" />
          </TouchableOpacity>

          {options && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={() => setSelectedType("New post")}>
                <Text
                  style={
                    selectedType === "New post"
                      ? styles.optionsSelectedText
                      : styles.optionText
                  }
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedType("Add to story")}>
                <Text
                  style={
                    selectedType === "Add to story"
                      ? styles.optionsSelectedText
                      : styles.optionText
                  }
                >
                  STORY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedType("New reel")}>
                <Text
                  style={
                    selectedType === "New reel"
                      ? styles.optionsSelectedText
                      : styles.optionText
                  }
                >
                  REEL
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          >
            <Ionicons name="reload-circle-outline" size={34} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CameraModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0,
  },
  shadowBowTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SIZES.Height * 0.18,
    width: SIZES.Width,
    backgroundColor: "#000",
    opacity: 0.6,
    zIndex: -1,
  },
  shadowBowBottom: {
    position: "absolute",
    bottom: SIZES.Height * 0.16,
    left: 0,
    right: 0,
    height: SIZES.Height * 0.18,
    width: SIZES.Width,
    backgroundColor: "#000",
    opacity: 0.6,
    zIndex: -1,
  },
  camera: {
    flex: 1,
  },
  cameraStyle: {
    height: SIZES.Height * 0.82,
    width: SIZES.Width,
    position: "absolute",
    zIndex: -2,
    overflow: "hidden",
    borderRadius: 20,
  },
  cameraFullStyle: {
    marginTop: 50,
    height: SIZES.Height * 0.82,
    width: SIZES.Width,
    position: "absolute",
    zIndex: -2,
    overflow: "hidden",
    borderRadius: 20,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 14,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: "flex-end",
  },
  shotButtonContainer: {
    left: 0,
    right: 0,
    top: SIZES.Height * 0.7,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  shotButtonOutside: {
    height: 78,
    width: 78,
    backgroundColor: "transparent",
    borderRadius: 100,
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 4,
    alignItems: "center",
    marginBottom: SIZES.Width * 0.19,
    zIndex: 1,
  },
  shotButtonInside: {
    height: 66,
    width: 66,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  modal: {
    flex: 1,
    backgroundColor: "#000",
  },
  uploadButton: {
    backgroundColor: "#333",
    minWidth: "90%",
    paddingVertical: "10%",
    marginBottom: "8%",
    borderRadius: 10,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  optionText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  optionsSelectedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "center",
  },
});
