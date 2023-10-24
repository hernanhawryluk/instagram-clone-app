import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import useFetchUserPosts from "../../hooks/useFetchUserPosts";
import SubHeader from "./SubHeader";
import { Divider } from "react-native-elements";
import SkeletonDefaultPosts from "../search/Skeletons/SkeletonDefaultPosts";
import RenderItem from "../shared/RenderItem";

const StoryHighlights = ({ navigation, currentUser }) => {
  const { posts, loader, fetchOlderPosts, refreshPosts } = useFetchUserPosts(
    currentUser.email
  );

  const renderListHeaderComponent = () => (
    <View>
      <SubHeader
        navigation={navigation}
        currentUser={currentUser}
        numberOfPosts={posts.length}
      />
      <Text style={styles.title}>Story Highlights</Text>
      <Divider width={0.5} color="#222" />
      <View style={styles.gap} />
    </View>
  );

  return (
    <View style={styles.container}>
      {posts.id === "empty" ? null : posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderItem navigation={navigation} item={item} />
          )}
          numColumns={3}
          ListHeaderComponent={renderListHeaderComponent}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts}
          onEndReachedThreshold={1}
          initialNumToRender={10}
          onRefresh={() => refreshPosts()}
          refreshing={loader}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
        />
      ) : (
        <FlatList
          style={{ flex: 1, marginTop: 14 }}
          data={Array.from({ length: 30 }, (_, i) => i + 1)}
          ListHeaderComponent={renderListHeaderComponent}
          numColumns={3}
          renderItem={() => <SkeletonDefaultPosts />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default StoryHighlights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
});
