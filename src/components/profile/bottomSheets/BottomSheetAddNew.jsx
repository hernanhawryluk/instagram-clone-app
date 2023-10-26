import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const BottomSheetAddNew = ({ bottomSheetRef, navigation }) => {
  const snapPoints = useMemo(() => [260], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => (
        <View style={styles.closeLineContainer}>
          <View style={styles.closeLine}></View>
        </View>
      )}
      enablePanDownToClose
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create</Text>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
            navigation.navigate("MediaLibrary", {
              initialSelectedType: "New Reel",
              selectorAvailable: false,
            });
          }}
          style={styles.rowContainer}
        >
          <MaterialCommunityIcons
            name="play-box-outline"
            size={28}
            color="#fff"
          />
          <Text style={styles.text}>Reel</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
            navigation.navigate("MediaLibrary", {
              initialSelectedType: "New Post",
              selectorAvailable: false,
            });
          }}
          style={styles.rowContainer}
        >
          <MaterialCommunityIcons name="grid" size={26} color="#fff" />
          <Text style={styles.text}>Post</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
            navigation.navigate("MediaLibrary", {
              initialSelectedType: "Add to story",
              selectorAvailable: false,
            });
          }}
          style={styles.rowContainer}
        >
          <Ionicons name="heart-circle-outline" size={28} color="#fff" />
          <Text style={styles.text}>Story</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetAddNew;

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
    marginBottom: 30,
  },
  container: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -5,
    marginBottom: 20,
  },
  divider: {
    height: 0.3,
    width: "100%",
    backgroundColor: "#777",
  },
  rowContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginVertical: 15,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
