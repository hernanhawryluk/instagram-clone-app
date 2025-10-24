import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Reels from "../screens/Reels";
import Profile from "../screens/Profile";
import Blank from "./Blank";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const screenOptions = {
    lazy: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    animation: "none",
    sceneStyle: { backgroundColor: "#000" },
    tabBarStyle: {
      position: "absolute",
      paddingTop: 12,
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      borderTopWidth: 0.3,
      borderTopColor: "#444",
      height: Platform.OS === "android" ? insets.bottom + 54 : 84,
      backgroundColor: "#000",
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <MaterialIcons name="home-filled" size={30} color={"#fff"} />
            ) : (
              <Octicons name="home" size={24} color={"#fff"} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={27}
                color={"#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Blank"
        component={Blank}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Feather name="plus-square" size={25} color={"#fff"} />;
          },
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("MediaLibrary", {
                  initialSelectedType: "New post",
                });
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? "play-box" : "play-box-outline"}
                size={27}
                color={"#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name="user-circle" size={22} color={"#fff"} />
            ) : (
              <FontAwesome5 name="user-circle" size={24} color={"#fff"} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#000",
  },
  iconContainer: {
    marginTop: 12,
    flexDirection: "row",
    marginHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
