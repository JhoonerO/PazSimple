import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { Bell, Heart, MessageCircle, Home, Plus, User } from "lucide-react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING } from "../styles/globalStyles"

// Datos mock temporales
const mockStories = [
  {
    id: 1,
    title: "La niña de los baños",
    author: "Andrés",
    preview: "Cuando golpeaba la puerta, no había respuesta...",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    likes: 3,
    comments: 1,
    content: "Dicen que en el baño del cuarto piso, al fondo, aparece una niña llamada Lucía...",
  },
  {
    id: 2,
    title: "El pasillo",
    author: "Julia",
    preview: "Cuando golpeaba la puerta...",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    likes: 5,
    comments: 2,
    content: "Un largo corredor sin fin, donde los pasos resuenan eternamente...",
  },
  {
    id: 3,
    title: "El pasillo",
    author: "Julia",
    preview: "Cuando golpeaba la puerta...",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    likes: 1,
    comments: 0,
    content: "Otra historia misteriosa del pasillo embrujado...",
  },
  {
    id: 4,
    title: "La niña de los baños",
    author: "Andrés",
    preview: "Cuando golpeaba la puerta, no había respuesta...",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    likes: 3,
    comments: 1,
    content:
      "Dicen que en el baño del cuarto piso, al fondo, aparece una niña llamada Lucía. Nadie sabe si fue hija de una profesora o si alguna vez fue real. Solo que entra al baño... y nunca sale. Después de las 6 p.m., se apagan las luces, el grifo gotea... Y si estás solo, puedes oír su voz susurrando: '¿Quieres jugar conmigo?' Los valientes que se quedaron... no volvieron a ser los mismos.",
  },
  {
    id: 5,
    title: "El pasillo",
    author: "Julia",
    preview: "Cuando golpeaba la puerta...",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    likes: 5,
    comments: 2,
    content: "Un largo corredor sin fin, donde los pasos resuenan eternamente...",
  },
  {
    id: 6,
    title: "El pasillo",
    author: "Julia",
    preview: "Cuando golpeaba la puerta...",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    likes: 1,
    comments: 0,
    content: "Otra historia misteriosa del pasillo embrujado...",
  },
]

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleStoryPress = (story) => navigation.navigate("StoryDetail", { story })
  const handleLike = (storyId) => console.log("Like story:", storyId)
  const handleComment = (storyId) => console.log("Comment story:", storyId)
  const goToCreateStory = () => navigation.navigate("CreateStory")
  const goToProfile = () => navigation.replace("Profile")
  const goToNotifications = () => navigation.navigate("Notifications")

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

      {/* Header */}
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitlePAZ}>PAZ</Text>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToNotifications}>
          <Bell color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Feed de historias */}
      <ScrollView style={styles.feedContainer} showsVerticalScrollIndicator={false}>
        {/* Primera historia - Grande */}
        {mockStories.length > 0 && (
          <TouchableOpacity style={globalStyles.card} onPress={() => handleStoryPress(mockStories[0])}>
            <Image source={{ uri: mockStories[0].image }} style={globalStyles.storyImage} resizeMode="cover" />
            <View style={globalStyles.cardContent}>
              <Text style={globalStyles.subtitle}>{mockStories[0].title}</Text>
              <Text style={globalStyles.author}>-{mockStories[0].author}-</Text>
              <Text style={globalStyles.text}>{mockStories[0].preview}</Text>
              <View style={globalStyles.storyActions}>
                <TouchableOpacity style={globalStyles.actionButton} onPress={() => handleLike(mockStories[0].id)}>
                  <Heart color={COLORS.textMuted} size={16} />
                  <Text style={globalStyles.actionText}>{mockStories[0].likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.actionButton} onPress={() => handleComment(mockStories[0].id)}>
                  <MessageCircle color={COLORS.textMuted} size={16} />
                  <Text style={globalStyles.actionText}>{mockStories[0].comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Grid de historias */}
        {mockStories.length > 1 && (
          <View style={globalStyles.gridContainer}>
            {mockStories.slice(1).map((story) => (
              <TouchableOpacity
                key={story.id}
                style={[globalStyles.card, globalStyles.gridItem]}
                onPress={() => handleStoryPress(story)}
              >
                <Image source={{ uri: story.image }} style={globalStyles.storyImageSmall} resizeMode="cover" />
                <View style={globalStyles.cardContent}>
                  <Text style={styles.gridTitle}>{story.title}</Text>
                  <Text style={globalStyles.textSmall}>-{story.author}-</Text>
                  <Text style={[globalStyles.textSmall, styles.preview]} numberOfLines={2}>
                    {story.preview}
                  </Text>
                  <View style={globalStyles.storyActions}>
                    <TouchableOpacity style={globalStyles.actionButtonSmall} onPress={() => handleLike(story.id)}>
                      <Heart color={COLORS.textMuted} size={14} />
                      <Text style={globalStyles.actionTextSmall}>{story.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.actionButtonSmall} onPress={() => handleComment(story.id)}>
                      <MessageCircle color={COLORS.textMuted} size={14} />
                      <Text style={globalStyles.actionTextSmall}>{story.comments}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={globalStyles.bottomNav}>
        <TouchableOpacity style={globalStyles.navButton}>
          <Home color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToCreateStory}>
          <Plus color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToProfile}>
          <User color={COLORS.textMuted} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  gridTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginBottom: 3,
  },
  preview: {
    lineHeight: 16,
    marginBottom: SPACING.small,
  },
})
