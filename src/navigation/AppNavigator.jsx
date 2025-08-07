import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from 'react-native';
import React from "react";
import { enableFreeze } from "react-native-screens";
import NavBar from "./NavBar";

enableFreeze(true);

// Importar pantallas con lazy loading para mejor performance
const SplashScreen = React.lazy(() => import("../screens/SplashScreen"));
const LoginScreen = React.lazy(() => import("../screens/LoginScreen"));
const RegisterScreen = React.lazy(() => import("../screens/RegisterScreen"));
const HomeScreen = React.lazy(() => import("../screens/HomeScreen"));
const StoryDetailScreen = React.lazy(() => import("../screens/StoryDetailScreen"));
const CreateStoryScreen = React.lazy(() => import("../screens/CreateStoryScreen"));
const ProfileScreen = React.lazy(() => import("../screens/ProfileScreen"));
const SettingsScreen = React.lazy(() => import("../screens/SettingsScreen"));
const LikedStoriesScreen = React.lazy(() => import("../screens/LikedStoriesScreen"));
const NotificationsScreen = React.lazy(() => import("../screens/NotificationsScreen"));

const Stack = createNativeStackNavigator();

// Configuración común para pantallas modales
const modalOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: "slide_from_bottom",
  presentation: "transparentModal",
  cardOverlayEnabled: true
};

const withNavBarOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: "fade",
  contentStyle: { paddingBottom: 60 } // Espacio para el NavBar
};

const FallbackComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
    <ActivityIndicator size="small" color="#0000ff" />
  </View>
);

const MainStack = () => (
  <>
    <Stack.Navigator
      screenOptions={{
        animation: 'fade',
        freezeOnBlur: true,
      }}
    >
      {/* Pantallas principales con NavBar */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={withNavBarOptions}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={withNavBarOptions}
      />
      <Stack.Screen
        name="LikedStories"
        component={LikedStoriesScreen}
        options={withNavBarOptions}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={withNavBarOptions}
      />
    </Stack.Navigator>
    <NavBar />
  </>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <React.Suspense fallback={<FallbackComponent />}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          {/* Pantallas sin NavBar */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={modalOptions}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={modalOptions}
          />
          
          {/* Pantallas modales */}
          <Stack.Screen
            name="StoryDetail"
            component={StoryDetailScreen}
            options={modalOptions}
          />
          <Stack.Screen
            name="CreateStory"
            component={CreateStoryScreen}
            options={{
              ...modalOptions,
              presentation: "modal"
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={modalOptions}
          />
          
          {/* Grupo principal con NavBar */}
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
};

export default React.memo(AppNavigator);