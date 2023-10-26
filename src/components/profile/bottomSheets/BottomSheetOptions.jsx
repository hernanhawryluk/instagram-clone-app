import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";

const BottomSheetOptions = ({ bottomSheetRef, navigation, currentUser }) => {
  const snapPoints = useMemo(() => [656], []);

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
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="ios-settings-sharp" size={27} color="#fff" />
          </View>
          <Text style={styles.text}>Settings and privacy</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="ios-timer-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.text}>Your activity</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Entypo name="back-in-time" size={27} color="#fff" />
          </View>
          <Text style={styles.text}>Archive</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShareQR", { user: currentUser });
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
          </View>
          <Text style={styles.text}>QR code</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Feather name="bookmark" size={29} color="#fff" />
          </View>
          <Text style={styles.text}>Saved</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="account-supervisor-outline"
              size={30}
              color="#fff"
            />
          </View>
          <Text style={styles.text}>Supervision</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="credit-card" size={24} color="#fff" />
          </View>
          <Text style={styles.text}>Orders and payments</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Octicons name="verified" size={27} color="#fff" />
          </View>
          <Text style={styles.text}>Meta Verified</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Feather name="list" size={29} color="#fff" />
          </View>
          <Text style={styles.text}>Close Friends</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Feather name="star" size={27} color="#fff" />
          </View>
          <Text style={styles.text}>Favorites</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="adduser" size={29} color="#fff" />
          </View>
          <Text style={styles.text}>Discover people</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
          style={styles.rowContainer}
        >
          <View style={styles.iconContainer}>
            <Feather name="users" size={28} color="#fff" />
          </View>
          <Text style={styles.text}>Group profiles</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetOptions;

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
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  divider: {
    height: 0.4,
    width: "100%",
    backgroundColor: "#777",
  },
  rowContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 8,
  },
  iconContainer: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
