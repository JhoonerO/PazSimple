"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert, Image } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { globalStyles, COLORS } from "../styles/globalStyles"
import BackgroundImage from "../components/BackgroundImage"

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }
    console.log("Login attempt:", { username, password })
    navigation.replace("Home")
  }

  const goToRegister = () => navigation.navigate("Register")

  if (!fontsLoaded) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <BackgroundImage source={require("../../assets/bgLoginRegister.png")} overlay={true} opacity={0.4} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={[globalStyles.headerTitle, { position: "absolute", top: 60 }]}>Login</Text>

      <View style={globalStyles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={globalStyles.logoImage} resizeMode="contain" />
      </View>

      <View style={globalStyles.formContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre de Usuario"
          placeholderTextColor={COLORS.textMuted}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Contraseña"
          placeholderTextColor={COLORS.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={globalStyles.primaryButton} onPress={handleLogin}>
          <Text style={globalStyles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToRegister}>
          <Text style={globalStyles.linkText}>
            ¿No tienes una cuenta? <Text style={globalStyles.linkHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
