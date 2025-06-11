"use client"

import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, RefreshControl } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { Bell, Heart, MessageCircle, Home, Plus, User } from "lucide-react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING } from "../styles/globalStyles"
import { useStories } from "../hooks/useStories"
import { useState } from "react"

export default function HomeScreen({ navigation }) {
  const { stories, loading, refreshStories } = useStories()
  const [refreshing, setRefreshing] = useState(false)

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

  const onRefresh = async () => {
    setRefreshing(true)
    await refreshStories()
    setRefreshing(false)
  }

  if (!fontsLoaded || loading) {
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
      <ScrollView
        style={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Primera historia - Grande */}
        {stories.length > 0 && (
          <TouchableOpacity style={globalStyles.card} onPress={() => handleStoryPress(stories[0])}>
            <Image
              source={typeof stories[0].image === "string" ? { uri: stories[0].image } : stories[0].image}
              style={globalStyles.storyImage}
              resizeMode="cover"
            />
            <View style={globalStyles.cardContent}>
              <Text style={globalStyles.subtitle}>{stories[0].title}</Text>
              <Text style={globalStyles.author}>-{stories[0].author}-</Text>
              <Text style={globalStyles.text}>{stories[0].preview}</Text>
              <View style={globalStyles.storyActions}>
                <TouchableOpacity style={globalStyles.actionButton} onPress={() => handleLike(stories[0].id)}>
                  <Heart color={COLORS.textMuted} size={16} />
                  <Text style={globalStyles.actionText}>{stories[0].likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.actionButton} onPress={() => handleComment(stories[0].id)}>
                  <MessageCircle color={COLORS.textMuted} size={16} />
                  <Text style={globalStyles.actionText}>{stories[0].comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Grid de historias */}
        {stories.length > 1 && (
          <View style={globalStyles.gridContainer}>
            {stories.slice(1).map((story) => (
              <TouchableOpacity
                key={story.id}
                style={[globalStyles.card, globalStyles.gridItem]}
                onPress={() => handleStoryPress(story)}
              >
                <Image
                  source={typeof story.image === "string" ? { uri: story.image } : story.image}
                  style={globalStyles.storyImageSmall}
                  resizeMode="cover"
                />
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

        {stories.length === 0 && (
          <View style={globalStyles.emptyState}>
            <Text style={globalStyles.emptyTitle}>No hay historias</Text>
            <Text style={globalStyles.emptyText}>¡Sé el primero en compartir una historia!</Text>
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
