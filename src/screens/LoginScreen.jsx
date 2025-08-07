"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert, Image } from "react-native"
import { globalStyles, COLORS } from "../styles/globalStyles"
import BackgroundImage from "../components/BackgroundImage"
import { useNavigation } from "@react-navigation/native"

export default function LoginScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }
    console.log("Login attempt:", { username, password })
    navigation.navigate("Main")
  }

  // Temporal
  setTimeout(() => {
    navigation.navigate("Main")
  }, 1000)

  const goToRegister = () => navigation.navigate("Register")

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
