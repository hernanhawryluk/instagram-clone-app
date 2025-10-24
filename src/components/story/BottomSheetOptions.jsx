import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../shared/bottomSheets/CustomBackdrop";
import useSharePost from "../../hooks/useSharePost";
import useDeletePost from "../../hooks/useDeletePost";

const BottomSheetOptions = ({
  bottomSheetRef,
  story,
  handleResume,
  navigation,
}) => {
  const { shareStory } = useSharePost();
  const { deleteStory } = useDeletePost();

  const handleDeleteStory = () => {
    Alert.alert("Delete Story", "Are you sure you want to delete this story?", [
      {
        text: "Cancel",
        onPress: () => bottomSheetRef.current.close(),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          bottomSheetRef.current.close(), navigation.goBack();
          deleteStory(story);
        },
      },
    ]);
  };

  const handleShareStory = async () => {
    await shareStory(story);
    bottomSheetRef.current.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{ borderRadius: 25, backgroundColor: "#232325" }}
      backdropComponent={CustomBackdrop}
      handleComponent={() => <View style={styles.closeLine} />}
      enablePanDownToClose
      detached={true}
      bottomInset={24}
      index={0}
      onChange={(index) => index === -1 && handleResume()}
      snapPoints={[162]}
      style={styles.sheetContainer}
    >
      <View style={styles.container}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => handleDeleteStory()}
          style={styles.rowContainer}
        >
          <Text style={styles.redText}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => handleShareStory()}
          style={styles.rowContainer}
        >
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => bottomSheetRef.current.close()}
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
    fontSize: 16,
    fontWeight: "400",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
});
