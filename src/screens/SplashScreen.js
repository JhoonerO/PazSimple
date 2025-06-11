"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { globalStyles, COLORS, FONTS, SIZES, SPACING } from "../styles/globalStyles"

export default function SplashScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        navigation.replace("Login")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [navigation, fontsLoaded])

  if (!fontsLoaded) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={globalStyles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={globalStyles.logoImageLarge} resizeMode="contain" />
      </View>

      <Text style={styles.pazText}>PAZ</Text>

      <View style={styles.loadingContainer}>
        <Text style={globalStyles.textMuted}>Cargando...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pazText: {
    fontSize: SIZES.splash,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: 8,
    marginBottom: SPACING.xxxl,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 100,
  },
})
