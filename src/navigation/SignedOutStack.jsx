import Login from "../screens/Login";
import Forgot from "../screens/Forgot";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "../screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animation: "slide_from_right",
          animationDuration: 450,
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          animation: "slide_from_right",
          animationDuration: 450,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default SignedOutStack;
