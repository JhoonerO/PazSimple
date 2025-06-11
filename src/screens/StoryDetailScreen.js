"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, TextInput } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { ArrowLeft, Heart, MessageCircle, Send } from "lucide-react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING, RADIUS } from "../styles/globalStyles"

// Comentarios mock
const mockComments = [
  {
    id: 1,
    author: "Luis C.",
    text: "Yo creí escuchar algo también por el segundo piso que miedo pana",
    liked: false,
  },
  {
    id: 2,
    author: "Juan Ing",
    text: "Buena historia 👍",
    liked: true,
  },
  {
    id: 3,
    author: "Julio Profe",
    text: "Así de miedo dan las matemáticas cuando no estudio😅",
    liked: false,
  },
]

export default function StoryDetailScreen({ navigation, route }) {
  const { story } = route.params
  const [liked, setLiked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(mockComments)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const handleLike = () => {
    setLiked(!liked)
    console.log("Toggle like for story:", story.id)
  }

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Tú",
        text: newComment,
        liked: false,
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

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
        <TouchableOpacity style={globalStyles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>{story.title}</Text>
        <View style={globalStyles.placeholder} />
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        {/* Imagen de la historia - Más pequeña y redondeada */}
        <View style={styles.imageContainer}>
          <Image
            source={typeof story.image === "string" ? { uri: story.image } : story.image}
            style={styles.storyImage}
            resizeMode="cover"
          />
        </View>

        {/* Contenido de la historia */}
        <View style={styles.storyContent}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyAuthor}>-{story.author}-</Text>
          <Text style={styles.storyText}>{story.content}</Text>

          {/* Likes y comentarios */}
          <View style={styles.storyActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Heart size={20} color={liked ? "#e74c3c" : "#888"} fill={liked ? "#e74c3c" : "none"} />
              <Text style={[styles.actionText, liked && styles.likedText]}>{story.likes + (liked ? 1 : 0)}</Text>
            </TouchableOpacity>

            <View style={styles.actionButton}>
              <MessageCircle color="#888" size={20} />
              <Text style={styles.actionText}>{comments.length}</Text>
            </View>
          </View>
        </View>

        {/* Sección de comentarios */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentarios</Text>

          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input para nuevo comentario */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Agrega un comentario 💭 ✨"
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <Send color="#4a5cdb" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Contenedor de imagen más pequeño y redondeado
  imageContainer: {
    marginHorizontal: SPACING.large,
    marginBottom: SPACING.large,
    borderRadius: RADIUS.large,
    overflow: "hidden",
    backgroundColor: COLORS.card,
  },
  storyImage: {
    width: "100%",
    height: 200, // Más pequeña que antes (era 250)
    borderRadius: RADIUS.large,
  },
  storyContent: {
    paddingHorizontal: SPACING.large,
  },
  storyTitle: {
    fontSize: SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  storyAuthor: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginBottom: SPACING.large,
  },
  storyText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },

  // Actions
  storyActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: SPACING.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.xl,
  },
  actionText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginLeft: SPACING.small,
  },
  likedText: {
    color: "#e74c3c",
  },

  // Comments
  commentsSection: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.xl,
  },
  commentsTitle: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginBottom: SPACING.large,
  },
  commentItem: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  commentAuthor: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  commentText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // Comment Input
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    maxHeight: 100,
    marginRight: SPACING.small,
  },
  sendButton: {
    padding: SPACING.small,
  },
})
