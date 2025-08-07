"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING } from "../styles/globalStyles"
import BackgroundImage from "../components/BackgroundImage"
import { useNavigation } from "@react-navigation/native"

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login")
    }, 2000);

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <BackgroundImage source={require("../../assets/bgSplash.png")} overlay={true} opacity={0.3} />
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

export default SplashScreen;
