import {
  StyleSheet,
  SafeAreaView,
  Animated,
  FlatList,
  View,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import useHeaderScrollAnim from "../utils/useHeaderScrollAnim";
import useFetchPosts from "../hooks/useFetchPosts";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Posts from "../components/home/Posts";
import PostsSkeleton from "../components/home/skeletons/PostsSkeleton";

const Home = ({ navigation }) => {
  const { currentUser } = useUserContext();
  const { headerTranslate, headerOpacity, scrollY } = useHeaderScrollAnim(42);
  const { posts, isLoading, fetchOlderPosts } = useFetchPosts();

  const renderPostItem = ({ item }) => (
    <Posts navigation={navigation} post={item} currentUser={currentUser} />
  );

  const renderHeaderComponent = () => (
    <Stories navigation={navigation} currentUser={currentUser} />
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.header(65),
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Header
          navigation={navigation}
          headerOpacity={headerOpacity}
          currentUser={currentUser}
        />
      </Animated.View>

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPostItem}
          ListHeaderComponent={renderHeaderComponent}
          contentContainerStyle={styles.contentContainer(52)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onEndReached={() => fetchOlderPosts()}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ height: 80 }} />}
          windowSize={13}
        />
      ) : (
        <View style={{ marginTop: 50 }}>
          <FlatList
            data={["", "", "", ""]}
            ListHeaderComponent={renderHeaderComponent}
            renderItem={() => <PostsSkeleton />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: (ContainerHeight) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 36, // 50
    height: ContainerHeight,
    zIndex: 1,
    backgroundColor: "#000",
  }),
  contentContainer: (ContainerHeight) => ({
    paddingTop: ContainerHeight,
  }),
});
