import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Importar nuestras pantallas
import SplashScreen from "../screens/SplashScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import HomeScreen from "../screens/HomeScreen"
import StoryDetailScreen from "../screens/StoryDetailScreen"
import CreateStoryScreen from "../screens/CreateStoryScreen"
import ProfileScreen from "../screens/ProfileScreen"
import SettingsScreen from "../screens/SettingsScreen"
import LikedStoriesScreen from "../screens/LikedStoriesScreen"
import NotificationsScreen from "../screens/NotificationsScreen"

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "default", // Animación por defecto más suave
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {/* Pantalla de Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade", // Fade para splash
          }}
        />

        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "slide_from_right",
          }}
        />

        {/* Pantalla de Registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_right", // Viene desde la derecha
          }}
        />

        {/* Pantalla Principal - Home Feed */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade", // Fade para pantallas principales
          }}
        />

        {/* Pantalla de Detalle de Historia */}
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_right", // Viene desde la derecha
            gestureDirection: "horizontal",
          }}
        />

        {/* Pantalla de Crear Historia */}
        <Stack.Screen
          name="CreateStory"
          component={CreateStoryScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_bottom", // Viene desde abajo (modal style)
            presentation: "modal",
          }}
        />

        {/* Pantalla de Perfil */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade", // Fade para pantallas principales
          }}
        />

        {/* Pantalla de Configuraciones */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_right", // Viene desde la derecha
          }}
        />

        {/* Pantalla de Historias que me Gustaron */}
        <Stack.Screen
          name="LikedStories"
          component={LikedStoriesScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_right", // Viene desde la derecha
          }}
        />

        {/* Pantalla de Notificaciones */}
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: "slide_from_right", // Viene desde la derecha
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
