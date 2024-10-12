import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import React from "react";
import useFetchUserPosts from "../../hooks/useFetchUserPosts";
import { Divider } from "react-native-elements";
import SubHeader from "./SubHeader";
import { SIZES } from "../../constants";
import RenderItem from "../shared/RenderItem";
import SkeletonDefaultPosts from "../search/Skeletons/SkeletonDefaultPosts";

const StoryHightlights = ({ navigation, user }) => {
  const { posts, loader, fetchOlderPosts, refreshPosts } = useFetchUserPosts(
    user.email
  );

  ListHeaderComponent = () => (
    <View>
      <SubHeader
        user={user}
        navigation={navigation}
        numberOfPosts={posts.length}
      />
      <Text style={styles.title}>Story Hightlights</Text>
      <Divider width={0.5} color="#222" />
      <View style={styles.gap} />
    </View>
  );

  return (
    <View>
      {posts.id === "empty" ? null : posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          numColumns={3}
          ListHeaderComponent={ListHeaderComponent}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          onRefresh={() => refreshPosts()}
          refreshing={loader}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
        />
      ) : (
        <View>
          <SubHeader
            user={user}
            navigation={navigation}
            numberOfPosts={posts.length}
          />
          <FlatList
            style={{ marginTop: 14 }}
            data={Array.from({ length: 30 }, (_, i) => i + 1)}
            renderItem={() => <SkeletonDefaultPosts />}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default StoryHightlights;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 15,
    marginBottom: 10,
  },
  imagesContainer: {
    width: SIZES.Width * 0.335,
    height: SIZES.Width * 0.335,
    margin: -0.4,
  },
  images: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    zIndex: -1,
  },
  Images: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
