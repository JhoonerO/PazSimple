import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator, TransitionSpecs, SceneStyleInterpolators } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from 'react-native';
import React from "react";
import { enableFreeze } from "react-native-screens";
import { Home, Plus, User } from "lucide-react-native"
import { COLORS, SIZES } from "../styles/globalStyles"

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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const withNavBarOptions = {
  headerShown: false,
  gestureEnabled: true,
  transitionSpec: TransitionSpecs.ShiftSpec,
  sceneStyleInterpolator: SceneStyleInterpolators.forShift,
};

const FallbackComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
    <ActivityIndicator size="small" color="#0000ff" />
  </View>
);

function MainTabs(){
  return(
    <Tab.Navigator
      screenOptions={{
        animation: 'shift',
        freezeOnBlur: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 0.5,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: SIZES.small,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Home size={size} color={color} />
          ),
          headerShown: false,
          ...withNavBarOptions,
        }}
      />
      <Tab.Screen
        name="Crear historia"
        component={CreateStoryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Plus size={size} color={color} />
          ),
          headerShown: false,
          ...withNavBarOptions,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <User size={size} color={color} />
          ),
          headerShown: false,
          ...withNavBarOptions,
        }}
      />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <React.Suspense fallback={<FallbackComponent />}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Pantallas sin NavBar */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="StoryDetail"
            component={StoryDetailScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="LikedStories"
            component={LikedStoriesScreen}
            options={withNavBarOptions}
          />
          <Stack.Screen
            name="CreateStory"
            component={CreateStoryScreen}
            options={withNavBarOptions}
          />
          
          {/* Grupo principal con NavBar */}
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
};

export default React.memo(AppNavigator);