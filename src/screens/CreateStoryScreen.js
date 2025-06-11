"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { ArrowLeft, Image as ImageIcon, Edit3, User, Home, Plus, User as UserIcon } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"
import Toast from "../components/Toast"
import { useToast } from "../hooks/useToast"
import { globalStyles, COLORS, SPACING, RADIUS } from "../styles/globalStyles"

export default function CreateStoryScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)

  const { toastConfig, showToast, hideToast } = useToast()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      showToast({
        type: "error",
        title: "Permisos necesarios",
        message: "Necesitamos acceso a tu galería para seleccionar fotos",
        duration: 4000,
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      showToast({
        type: "info",
        title: "Imagen seleccionada",
        message: "Perfecta para tu historia!",
        duration: 2000,
      })
    }
  }

  const handleSave = () => {
    if (!title.trim()) {
      showToast({
        type: "error",
        title: "📝 Falta el título",
        message: "Por favor ingresa un título para tu historia",
        duration: 3000,
      })
      return
    }
    if (!content.trim()) {
      showToast({
        type: "error",
        title: "📖 Cuéntanos tu historia",
        message: "Por favor escribe el contenido de tu historia",
        duration: 3000,
      })
      return
    }
    if (!author.trim()) {
      showToast({
        type: "error",
        title: "👤 Falta el autor",
        message: "Por favor ingresa el nombre del autor",
        duration: 3000,
      })
      return
    }
    if (!selectedImage) {
      showToast({
        type: "error",
        title: "📸 Falta la imagen",
        message: "Selecciona una imagen de portada para tu historia",
        duration: 3000,
      })
      return
    }

    showToast({
      type: "success",
      title: "🚀 ¡Historia Publicada!",
      message: `"${title}" ya está disponible en PAZ ✨`,
      duration: 4000,
      onHide: () => {
        setTitle("")
        setContent("")
        setAuthor("")
        setSelectedImage(null)
        setTimeout(() => navigation.replace("Home"), 500)
      },
    })
  }

  const handleCancel = () => {
    Alert.alert("Cancelar Historia", "¿Estás seguro? Se perderán los cambios no guardados", [
      { text: "Continuar Editando", style: "cancel" },
      {
        text: "Descartar",
        style: "destructive",
        onPress: () => {
          setTitle("")
          setContent("")
          setAuthor("")
          setSelectedImage(null)
          navigation.replace("Home")
        },
      },
    ])
  }

  if (!fontsLoaded) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={globalStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Toast
        visible={toastConfig.visible}
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        onHide={hideToast}
        duration={toastConfig.duration}
      />

      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.replace("Home")}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitlePAZ}>PAZ</Text>
        <View style={globalStyles.placeholder} />
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={[globalStyles.centered, { flex: 1 }]}>
              <ImageIcon color={COLORS.textMuted} size={40} />
              <Text style={[globalStyles.text, { marginTop: SPACING.small }]}>Añadir Imagen de Portada</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={globalStyles.contentPadded}>
          <View style={globalStyles.inputContainer}>
            <Edit3 color={COLORS.textMuted} size={20} style={globalStyles.inputIcon} />
            <TextInput
              style={globalStyles.inputField}
              placeholder="Título de tu Historia"
              placeholderTextColor={COLORS.textMuted}
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
          </View>

          <TextInput
            style={[globalStyles.input, styles.contentInput]}
            placeholder="Cuéntanos la historia con cada detalle..."
            placeholderTextColor={COLORS.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />

          <View style={globalStyles.inputContainer}>
            <User color={COLORS.textMuted} size={20} style={globalStyles.inputIcon} />
            <TextInput
              style={globalStyles.inputField}
              placeholder="Autor"
              placeholderTextColor={COLORS.textMuted}
              value={author}
              onChangeText={setAuthor}
              maxLength={30}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={globalStyles.secondaryButton} onPress={handleCancel}>
          <Text style={globalStyles.primaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSave}>
          <Text style={globalStyles.primaryButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.bottomNav}>
        <TouchableOpacity style={globalStyles.navButton} onPress={() => navigation.replace("Home")}>
          <Home color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton}>
          <Plus color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton}>
          <UserIcon color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  imageUploadContainer: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    height: 150,
    marginHorizontal: SPACING.large,
    marginBottom: SPACING.xl,
    overflow: "hidden",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentInput: {
    minHeight: 120,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.large,
    gap: SPACING.medium,
  },
})
