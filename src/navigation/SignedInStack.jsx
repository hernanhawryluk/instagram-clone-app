import { Platform } from "react-native";
import BottomTabs from "./BottomTabs";
import Home from "../screens/Home";
import NewPost from "../screens/NewPost";
import EditProfile from "../screens/EditProfile";
import EditingProfile from "../components/profile/edit/EditingProfile";
import UserDetail from "../screens/UserDetail";
import Follow from "../screens/Follow";
import Likes from "../screens/Likes";
import Notifications from "../screens/Notifications";
import NewStory from "../screens/NewStory";
import NewReel from "../screens/NewReel";
import MediaLibrary from "../screens/MediaLibrary";
import Story from "../screens/Story";
import Detail from "../screens/Detail";
import EditPost from "../screens/EditPost";
import Following from "../screens/Following";
import Favorites from "../screens/Favorites";
import Share from "../screens/Share";
import About from "../screens/About";
import UserFollow from "../screens/UserFollow";
import Chat from "../screens/Chat";
import Chating from "../screens/Chating";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "../contexts/UserContext";
import { StoriesProvider } from "../contexts/StoriesContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Stack = createNativeStackNavigator();

const SignedInStack = () => {
  return (
    <StoriesProvider>
      <UserProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main Screen" component={BottomTabs} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EditingProfile"
                component={EditingProfile}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="UserDetail"
                component={UserDetail}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="UserFollow"
                component={UserFollow}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Follow"
                component={Follow}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Likes"
                component={Likes}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="EditPost"
                component={EditPost}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Following"
                component={Following}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="About"
                component={About}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="Chating"
                component={Chating}
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="ShareQR"
                component={Share}
                options={{
                  presentation: "transparentModal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="Story"
                component={Story}
                options={{
                  presentation: "transparentModal",
                  animation: Platform.OS === "android" ? "fade" : "none",
                }}
              />
              <Stack.Screen
                name="MediaLibrary"
                component={MediaLibrary}
                options={{
                  gestureEnabled: false,
                  animation: "slide_from_left",
                }}
              />
              <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="NewStory"
                component={NewStory}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
              <Stack.Screen
                name="NewReel"
                component={NewReel}
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </UserProvider>
    </StoriesProvider>
  );
};

export default SignedInStack;
