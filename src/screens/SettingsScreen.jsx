"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Switch, Linking } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { ArrowLeft, Edit3, Bell, Shield, HelpCircle, Info, LogOut, Globe, Home, Plus, User } from "lucide-react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING, RADIUS } from "../styles/globalStyles"

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleEditProfile = () => {
    Alert.alert("Editar Perfil", "Funcionalidad próximamente...")
  }

  const handleHelp = () => {
    Alert.alert("Centro de Ayuda", "¿Necesitas ayuda? Elige una opción:", [
      {
        text: "Preguntas Frecuentes",
        onPress: () =>
          Alert.alert(
            "Preguntas Frecuentes",
            "• ¿Cómo publico una historia?\n• ¿Cómo cambio mi foto de perfil?\n• ¿Cómo reporto contenido inapropiado?\n• ¿Cómo elimino mi cuenta?\n\nPara más ayuda, contáctanos por email.",
          ),
      },
      {
        text: "Contactar Soporte",
        onPress: () => {
          Linking.openURL("mailto:soporte@pazapp.com?subject=Ayuda PAZ App")
        },
      },
      { text: "Cancelar", style: "cancel" },
    ])
  }

  const handleAbout = () => {
    Alert.alert(
      "Acerca de PAZ",
      "PAZ - Plataforma de Historias Urbanas\n\nVersión: 1.0.0\nDesarrollado con ❤️ para compartir historias misteriosas y urbanas.\n\n© 2024 PAZ App. Todos los derechos reservados.",
      [
        {
          text: "Términos de Servicio",
          onPress: () => Alert.alert("Términos", "Funcionalidad próximamente..."),
        },
        {
          text: "Política de Privacidad",
          onPress: () => handlePrivacy(),
        },
        { text: "OK" },
      ],
    )
  }

  const handlePrivacy = () => {
    Alert.alert("Configuración de Privacidad", "Gestiona tu privacidad y datos:", [
      {
        text: "Datos Personales",
        onPress: () =>
          Alert.alert(
            "Datos Personales",
            "• Tus historias son públicas por defecto\n• Tu perfil es visible para otros usuarios\n• No compartimos tu información con terceros\n• Puedes eliminar tu cuenta en cualquier momento",
          ),
      },
      {
        text: "Configurar Privacidad",
        onPress: () =>
          Alert.alert(
            "Privacidad",
            "Opciones disponibles:\n\n• Perfil público/privado\n• Historias públicas/privadas\n• Permitir comentarios\n• Recibir notificaciones\n\nFuncionalidad completa próximamente...",
          ),
      },
      {
        text: "Eliminar Datos",
        style: "destructive",
        onPress: () =>
          Alert.alert(
            "Eliminar Datos",
            "¿Estás seguro de que quieres eliminar todos tus datos? Esta acción no se puede deshacer.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Eliminar",
                style: "destructive",
                onPress: () => Alert.alert("Datos eliminados", "Tus datos han sido eliminados correctamente."),
              },
            ],
          ),
      },
      { text: "Cancelar", style: "cancel" },
    ])
  }

  const handleLanguage = () => {
    Alert.alert("Seleccionar Idioma", "Elige tu idioma preferido:", [
      { text: "Español (Actual)", style: "default" },
      {
        text: "English",
        onPress: () => Alert.alert("Idioma", "Funcionalidad próximamente..."),
      },
      {
        text: "Português",
        onPress: () => Alert.alert("Idioma", "Funcionalidad próximamente..."),
      },
      { text: "Cancelar", style: "cancel" },
    ])
  }

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        },
      },
    ])
  }

  const goBack = () => navigation.goBack()
  const goToHome = () => navigation.replace("Home")
  const goToCreateStory = () => navigation.navigate("CreateStory")
  const goToProfile = () => navigation.replace("Profile")

  if (!fontsLoaded) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Configuraciones</Text>
        <View style={globalStyles.placeholder} />
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        {/* Sección Cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.optionItem} onPress={handleEditProfile}>
            <Edit3 color={COLORS.primary} size={20} />
            <Text style={styles.optionText}>Editar Perfil</Text>
            <ArrowLeft color={COLORS.textMuted} size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Configuraciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuraciones</Text>

          <View style={styles.optionItem}>
            <Bell color="#f39c12" size={20} />
            <Text style={styles.optionText}>Notificaciones</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={notificationsEnabled ? "#ffffff" : COLORS.textMuted}
            />
          </View>

          <TouchableOpacity style={styles.optionItem} onPress={handleLanguage}>
            <Globe color="#3498db" size={20} />
            <Text style={styles.optionText}>Idioma</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>Español</Text>
              <ArrowLeft color={COLORS.textMuted} size={16} style={styles.chevronIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handlePrivacy}>
            <Shield color="#27ae60" size={20} />
            <Text style={styles.optionText}>Privacidad</Text>
            <ArrowLeft color={COLORS.textMuted} size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Soporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>

          <TouchableOpacity style={styles.optionItem} onPress={handleHelp}>
            <HelpCircle color="#e67e22" size={20} />
            <Text style={styles.optionText}>Ayuda</Text>
            <ArrowLeft color={COLORS.textMuted} size={16} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleAbout}>
            <Info color="#9b59b6" size={20} />
            <Text style={styles.optionText}>Acerca de PAZ</Text>
            <ArrowLeft color={COLORS.textMuted} size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Sesión */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <LogOut color="#e74c3c" size={20} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={globalStyles.bottomNav}>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToHome}>
          <Home color={COLORS.textMuted} size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.navButton} onPress={goToCreateStory}>
          <Plus color={COLORS.textMuted} size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.navButton} onPress={goToProfile}>
          <User color={COLORS.primary} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.textMuted,
    marginBottom: SPACING.medium,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: SPACING.large,
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.large,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.small,
    marginHorizontal: SPACING.large,
  },
  optionText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginLeft: SPACING.medium,
    flex: 1,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionValue: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginRight: SPACING.small,
  },
  chevronIcon: {
    transform: [{ rotate: "180deg" }],
  },

  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.large,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: "#e74c3c",
    marginHorizontal: SPACING.large,
  },
  logoutText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: "#e74c3c",
    marginLeft: SPACING.medium,
  },
})
