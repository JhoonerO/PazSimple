"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert, Image } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { globalStyles, COLORS } from "../styles/globalStyles"
import BackgroundImage from "../components/BackgroundImage"

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }
    if (username.length < 3) {
      Alert.alert("Error", "El nombre de usuario debe tener al menos 3 caracteres")
      return
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    Alert.alert("Registro exitoso", `¡Bienvenido ${username}! Tu cuenta ha sido creada.`, [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ])
  }

  const goToLogin = () => navigation.navigate("Login")

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

      <Text style={[globalStyles.headerTitle, { position: "absolute", top: 60 }]}>Registro</Text>

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

        <TextInput
          style={globalStyles.input}
          placeholder="Confirmar Contraseña"
          placeholderTextColor={COLORS.textMuted}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={globalStyles.primaryButton} onPress={handleRegister}>
          <Text style={globalStyles.primaryButtonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={globalStyles.linkText}>
            ¿Ya tienes cuenta? <Text style={globalStyles.linkHighlight}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
