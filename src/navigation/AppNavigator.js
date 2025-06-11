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
        initialRouteName="Splash" // Inicia con el Splash
        screenOptions={{
          headerShown: false, // Sin headers por defecto (nuestras pantallas ya tienen sus títulos)
          animation: "slide_from_right", // Animación suave entre pantallas
        }}
      >
        {/* Pantalla de Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No se puede swipe back desde splash
          }}
        />

        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No se puede volver al splash
          }}
        />

        {/* Pantalla de Registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            gestureEnabled: true, // Sí se puede volver al login con swipe
          }}
        />

        {/* Pantalla Principal - Home Feed */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No se puede hacer gesto back desde Home
          }}
        />

        {/* Pantalla de Detalle de Historia */}
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true, // Sí se puede volver al feed
          }}
        />

        {/* Pantalla de Crear Historia */}
        <Stack.Screen
          name="CreateStory"
          component={CreateStoryScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No se puede hacer gesto back desde CreateStory
          }}
        />

        {/* Pantalla de Perfil */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No se puede hacer gesto back desde Profile
          }}
        />

        {/* Pantalla de Configuraciones */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            gestureEnabled: true, // Sí se puede volver al Profile
          }}
        />

        {/* Pantalla de Historias que me Gustaron */}
        <Stack.Screen
          name="LikedStories"
          component={LikedStoriesScreen}
          options={{
            headerShown: false,
            gestureEnabled: true, // Sí se puede volver al Profile
          }}
        />

        {/* Pantalla de Notificaciones */}
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            gestureEnabled: true, // Sí se puede volver atrás
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
