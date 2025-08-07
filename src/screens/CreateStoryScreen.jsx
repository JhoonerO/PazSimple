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
import { ArrowLeft, Image as ImageIcon, Edit3, User, Grid } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"
import Toast from "../components/Toast"
import { useToast } from "../hooks/useToast"
import { useStories } from "../hooks/useStories"
import { globalStyles, COLORS, SPACING, RADIUS } from "../styles/globalStyles"
import { useNavigation } from "@react-navigation/native"

export default function CreateStoryScreen() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const { toastConfig, showToast, hideToast } = useToast()
  const { addStory } = useStories()

  const navigation = useNavigation();

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

  const handleSave = async () => {
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

    setIsPublishing(true)

    try {
      // Delay más corto para subida más rápida
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Crear el preview (primeras palabras del contenido)
      const preview = content.length > 50 ? content.substring(0, 50) + "..." : content

      const newStory = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        preview,
        image: selectedImage,
      }

      await addStory(newStory)

      showToast({
        type: "success",
        title: "🚀 ¡Historia Publicada!",
        message: `"${title}" ya está disponible en PAZ ✨`,
        duration: 2000,
      })

      // Limpiar formulario inmediatamente
      setTitle("")
      setContent("")
      setAuthor("")
      setSelectedImage(null)

      // Navegar de vuelta al Home sin delay
      setTimeout(() => navigation.navigate("Home"), 1000)
    } catch (error) {
      showToast({
        type: "error",
        title: "❌ Error",
        message: "No se pudo publicar la historia. Inténtalo de nuevo.",
        duration: 3000,
      })
    } finally {
      setIsPublishing(false)
    }
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
          navigation.navigate("Home")
        },
      },
    ])
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
        <Text style={globalStyles.headerTitlePAZ}>PAZ</Text>
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage} disabled={isPublishing}>
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
              editable={!isPublishing}
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
            editable={!isPublishing}
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
              editable={!isPublishing}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[globalStyles.secondaryButton, isPublishing && styles.disabledButton]}
          onPress={handleCancel}
          disabled={isPublishing}
        >
          <Text style={globalStyles.primaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.primaryButton, isPublishing && styles.publishingButton]}
          onPress={handleSave}
          disabled={isPublishing}
        >
          <Text style={globalStyles.primaryButtonText}>{isPublishing ? "Publicando..." : "Publicar"}</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xxs,
    gap: SPACING.xxs,
  },
  disabledButton: {
    opacity: 0.5,
  },
  publishingButton: {
    backgroundColor: COLORS.success,
  },
})
