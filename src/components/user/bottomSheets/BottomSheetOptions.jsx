import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import * as Clipboard from "expo-clipboard";
import useSharePost from "../../../hooks/useSharePost";
import useReportAction from "../../../hooks/useReportAction";

const BottomSheetOptions = ({
  bottomSheetRef,
  navigation,
  user,
  currentUser,
  setCopyModalVisible,
}) => {
  const { shareUser } = useSharePost();
  const { handleReportUser } = useReportAction();
  const snapPoints = useMemo(() => ["39.2%"], []);

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
      <TouchableOpacity
        onPress={() => {
          handleReportUser(user, currentUser);
          bottomSheetRef.current.close();
        }}
        style={styles.rowContainer}
      >
        <Text style={styles.redText}>Report</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("About", {
              user: user,
            });
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>About this account</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString("http://instagram.com/" + user.username);
            bottomSheetRef.current.close();
            setCopyModalVisible(true);
            setTimeout(() => {
              setCopyModalVisible(false);
            }, 3500);
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>Copy profile URL</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            shareUser(user);
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>Share this profile</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShareQR", { user: user });
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>QR code</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetOptions;

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  closeLine: {},
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -5,
    marginBottom: 20,
  },
  divider: {
    height: 0.4,
    width: "100%",
    backgroundColor: "#777",
  },
  rowContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  redText: {
    color: "#f00",
    fontSize: 18,
    fontWeight: "700",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
