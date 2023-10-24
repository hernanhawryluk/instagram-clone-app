import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
        <AuthNavigation />
        <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});