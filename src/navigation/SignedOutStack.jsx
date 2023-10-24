import Login from "../screens/Login";
import Forgot from "../screens/Forgot";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default SignedOutStack;
