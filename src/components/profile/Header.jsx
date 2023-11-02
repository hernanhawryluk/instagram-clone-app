import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import BottomSheetAddNew from "./bottomSheets/BottomSheetAddNew";
import BottomSheetLogout from "./bottomSheets/BottomSheetLogout";
import BottomSheetOptions from "./bottomSheets/BottomSheetOptions";

const Header = ({ currentUser, navigation }) => {
  const bottomSheetRefAddNew = useRef(null);
  const bottomSheetRefLogout = useRef(null);
  const bottomSheetRefOptions = useRef(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => bottomSheetRefLogout.current.present()}
        style={styles.usernameContainer}
      >
        <Text style={styles.username}>{currentUser.username}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={"#fff"}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <View style={styles.IconsContainer}>
        <TouchableOpacity
          onPress={() => bottomSheetRefAddNew.current.present()}
        >
          <FontAwesome5 name="plus-square" size={23} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => bottomSheetRefOptions.current.present()}
        >
          <Ionicons name="md-menu" size={34} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <BottomSheetAddNew
        bottomSheetRef={bottomSheetRefAddNew}
        navigation={navigation}
      />
      <BottomSheetLogout
        bottomSheetRef={bottomSheetRefLogout}
        navigation={navigation}
      />
      <BottomSheetOptions
        bottomSheetRef={bottomSheetRefOptions}
        navigation={navigation}
        currentUser={currentUser}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 20,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    transform: [{ scaleY: 1.05 }],
  },
  arrowIcon: {
    paddingTop: 6,
  },
  IconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 8,
  },
});
