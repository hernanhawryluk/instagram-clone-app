import { View, StyleSheet, FlatList, Text } from "react-native";
import { useMemo, useState } from "react";
import SearchBar from "../SearchBar";
import useFetchLikes from "../../../hooks/useFetchLikes";
import LikedBy from "../../likes/LikedBy";
import { useUserContext } from "../../../contexts/UserContext";
import SIZES from "../../../constants/SIZES";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../shared/bottomSheets/CustomBackdrop";

const LikesBottomSheet = ({ bottomSheetRef, likesByEmail, navigation }) => {
  const insets = useSafeAreaInsets();
  const { currentUser } = useUserContext();
  const { likesByUsers, loader } = useFetchLikes({ likesByEmail });
  const [onSearch, setOnSearch] = useState(false);
  const [filteredLikes, setFilteredLikes] = useState({});

  const snapPoints = useMemo(() => [
    "60%",
    SIZES.Height - insets.top - insets.bottom,
  ]);

  const childPropChange = (searchKey) => {
    if (likesByUsers.length > 0) {
      setOnSearch(true);
      const filteredData = likesByUsers.filter(
        (userLike) =>
          userLike.username.includes(searchKey) ||
          userLike.name.toLowerCase().includes(searchKey) ||
          userLike.email.includes(searchKey)
      );
      setFilteredLikes(filteredData);
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      bottomInset={insets.bottom}
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
      <View style={styles.titleContainer}>
        <View style={styles.handle} />
        <Text style={styles.textTitle}>Likes</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        ListHeaderComponent={<SearchBar onPropChange={childPropChange} />}
        data={onSearch === true ? filteredLikes : likesByUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LikedBy
            navigation={navigation}
            user={item}
            currentUser={currentUser}
          />
        )}
      />
    </BottomSheetModal>
  );
};

export default LikesBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212428",
    height: SIZES.Height,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    gap: 12,
    paddingBottom: 12,
  },
  handle: {
    height: 2,
    width: 36,
    backgroundColor: "#AAA",
    borderRadius: 5,
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
