import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import useHandleSingout from "../../../hooks/useHandleSingout";

const BottomSheetLogout = ({ bottomSheetRef, navigation }) => {
  const { handleSingout } = useHandleSingout();
  const snapPoints = useMemo(() => [157], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => <View style={styles.closeLine} />}
      enablePanDownToClose
      index={0}
      snapPoints={snapPoints}
      detached={true}
      bottomInset={24}
      style={styles.sheetContainer}
    >
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Sign out of your account?</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
            handleSingout();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.logout}>Log out</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetLogout;

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 15,
  },
  closeLine: {
    marginBottom: 4,
  },
  container: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  divider: {
    height: 0.3,
    width: "100%",
    backgroundColor: "#777",
  },
  rowContainer: {
    marginHorizontal: 16,
    // marginVertical: 16,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    color: "#f00",
    fontSize: 18,
    fontWeight: "600",
  },
  cancel: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "400",
  },
});
