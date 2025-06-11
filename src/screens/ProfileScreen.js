"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { ArrowLeft, Settings, Camera, BookOpen, Heart, Home, Plus, User } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"
import Toast from "../components/Toast"
import { useToast } from "../hooks/useToast"
import { globalStyles, COLORS, FONTS, SIZES, SPACING, RADIUS } from "../styles/globalStyles"

// Datos mock del usuario
const mockUser = {
  id: 1,
  name: "Julia Martinez",
  username: "@julia_stories",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  bio: "Contadora de historias y amante de los misterios urbanos",
  stats: {
    likesGiven: 1,
  },
}

// Historias del usuario mock
const mockUserStories = [
  {
    id: 2,
    title: "El pasillo",
    author: "Julia",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    likes: 5,
    comments: 2,
    content: "Un largo corredor sin fin, donde los pasos resuenan eternamente...",
  },
  {
    id: 3,
    title: "El pasillo oscuro",
    author: "Julia",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    likes: 1,
    comments: 0,
    content: "Otra historia misteriosa del pasillo embrujado...",
  },
  {
    id: 4,
    title: "La biblioteca silenciosa",
    author: "Julia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    likes: 8,
    comments: 3,
    content: "Entre los libros polvorientos, algo se mueve en silencio...",
  },
  {
    id: 5,
    title: "El aula 301",
    author: "Julia",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    likes: 4,
    comments: 1,
    content: "Nadie sabe por qué el aula 301 siempre está cerrada...",
  },
]

export default function ProfileScreen({ navigation }) {
  const [currentUser] = useState(mockUser)
  const [currentProfileImage, setCurrentProfileImage] = useState(mockUser.avatar)

  const { toastConfig, showToast, hideToast } = useToast()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleStoryPress = (story) => {
    navigation.navigate("StoryDetail", { story })
  }

  const handleSettings = () => {
    navigation.navigate("Settings")
  }

  const changeProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      showToast({
        type: "error",
        title: "Permisos necesarios",
        message: "Necesitamos acceso a tu galería para cambiar tu foto",
        duration: 4000,
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setCurrentProfileImage(result.assets[0].uri)
      showToast({
        type: "success",
        title: "Foto actualizada",
        message: "Tu foto de perfil se ha actualizado correctamente",
        duration: 2000,
      })
    }
  }

  const goBack = () => navigation.replace("Home")
  const goToHome = () => navigation.replace("Home")
  const goToCreateStory = () => navigation.navigate("CreateStory")
  const goToLikedStories = () => navigation.navigate("LikedStories")

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

      <Toast
        visible={toastConfig.visible}
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        onHide={hideToast}
        duration={toastConfig.duration}
      />

      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Perfil</Text>
        <TouchableOpacity style={globalStyles.navButton} onPress={handleSettings}>
          <Settings color="white" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: currentProfileImage }} style={globalStyles.avatarLarge} />
            <TouchableOpacity style={styles.cameraButton} onPress={changeProfileImage}>
              <Camera color="white" size={16} />
            </TouchableOpacity>
          </View>

          <Text style={globalStyles.title}>{currentUser.name}</Text>
          <Text style={globalStyles.textMuted}>{currentUser.username}</Text>
          <Text style={[globalStyles.text, globalStyles.centeredText]}>{currentUser.bio}</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <BookOpen color={COLORS.primary} size={24} />
            <Text style={styles.statNumber}>{mockUserStories.length}</Text>
            <Text style={globalStyles.textSmall}>Mis Historias</Text>
          </View>

          <TouchableOpacity style={styles.statItem} onPress={goToLikedStories}>
            <Heart color={COLORS.secondary} size={24} />
            <Text style={styles.statNumber}>{currentUser.stats.likesGiven}</Text>
            <Text style={globalStyles.textSmall}>Me gusta</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Mis Historias</Text>

          <View style={globalStyles.gridContainer}>
            {mockUserStories.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={[globalStyles.gridItem, styles.storyCard]}
                onPress={() => handleStoryPress(story)}
              >
                <Image source={{ uri: story.image }} style={globalStyles.storyImageSmall} resizeMode="cover" />

                <View style={styles.storyOverlay}>
                  <Text style={styles.storyTitle} numberOfLines={2}>
                    {story.title}
                  </Text>

                  <View style={globalStyles.storyActions}>
                    <View style={globalStyles.actionButtonSmall}>
                      <Heart color="white" size={12} />
                      <Text style={styles.storyStatText}>{story.likes}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={globalStyles.bottomNav}>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToHome}>
          <Home color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToCreateStory}>
          <Plus color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton}>
          <User color={COLORS.primary} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userSection: {
    alignItems: "center",
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.xxl,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: SPACING.medium,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.large,
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.xxl,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginTop: SPACING.small,
    marginBottom: SPACING.xs,
  },
  storyCard: {
    height: 120,
    borderRadius: RADIUS.medium,
    overflow: "hidden",
    position: "relative",
  },
  storyOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: SPACING.small,
  },
  storyTitle: {
    fontSize: SIZES.small,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginBottom: 4,
  },
  storyStatText: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginLeft: 4,
  },
})
