"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, FlatList } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { ArrowLeft, Bell, Heart, MessageCircle, Home, Plus, User, Clock, CheckCircle } from "lucide-react-native"
import { globalStyles, COLORS, FONTS, SIZES, SPACING, RADIUS } from "../styles/globalStyles"
import { useToast } from "../hooks/useToast"
import Toast from "../components/Toast"

// Datos mock de notificaciones que coinciden con las historias reales
const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    story: {
      title: "El pasillo",
      id: 2,
      image: require("../../assets/tecnico1.jpg"),
      author: "Julia",
      content: "Un largo corredor sin fin, donde los pasos resuenan eternamente...",
      likes: 5,
      comments: 2,
    },
    time: "2h",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Laura Gómez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    story: {
      title: "La niña de los baños",
      id: 1,
      image: require("../../assets/tecnico1.1.jpg"),
      author: "Andrés",
      content: "Dicen que en el baño del cuarto piso, al fondo, aparece una niña llamada Lucía...",
      likes: 3,
      comments: 1,
    },
    comment: "Me encantó tu historia, muy bien narrada!",
    time: "5h",
    read: true,
  },
  {
    id: 3,
    type: "like",
    user: {
      name: "Miguel Ángel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    story: {
      title: "Misterio en UniPaz",
      id: 3,
      image: require("../../assets/unipaz1.jpg"),
      author: "Carlos",
      content: "Otra historia misteriosa del campus universitario...",
      likes: 1,
      comments: 0,
    },
    time: "1d",
    read: true,
  },
  {
    id: 4,
    type: "comment",
    user: {
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    story: {
      title: "El laboratorio abandonado",
      id: 4,
      image: require("../../assets/tecnico2.jpg"),
      author: "María",
      content: "Dicen que en el laboratorio del segundo piso, después de medianoche, los equipos se encienden solos...",
      likes: 3,
      comments: 1,
    },
    comment: "Esto me recuerda a mi escuela, también había historias similares",
    time: "2d",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Bienvenido a PAZ",
    message: "Gracias por unirte a nuestra comunidad de historias urbanas",
    time: "3d",
    read: true,
  },
]

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const { toastConfig, showToast, hideToast } = useToast()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
    showToast({
      type: "success",
      title: "Notificaciones",
      message: "Todas las notificaciones marcadas como leídas",
    })
  }

  const handleNotificationPress = (notification) => {
    // Marcar como leída
    const updatedNotifications = notifications.map((item) =>
      item.id === notification.id ? { ...item, read: true } : item,
    )
    setNotifications(updatedNotifications)

    // Navegar según el tipo de notificación
    if (notification.type === "like" || notification.type === "comment") {
      // Pasar la historia completa en lugar de solo el ID
      navigation.navigate("StoryDetail", { story: notification.story })
    }
  }

  const goBack = () => navigation.goBack()
  const goToHome = () => navigation.replace("Home")
  const goToCreateStory = () => navigation.navigate("CreateStory")
  const goToProfile = () => navigation.replace("Profile")

  const renderNotificationItem = ({ item }) => {
    const unreadStyle = !item.read ? styles.unreadNotification : {}

    return (
      <TouchableOpacity style={[styles.notificationItem, unreadStyle]} onPress={() => handleNotificationPress(item)}>
        {!item.read && <View style={styles.unreadIndicator} />}

        {item.type === "system" ? (
          <View style={styles.systemIconContainer}>
            <Bell color={COLORS.primary} size={24} />
          </View>
        ) : (
          <Image source={item.user.avatar} style={styles.avatar} />
        )}

        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            {item.type === "system" ? (
              <Text style={styles.notificationTitle}>{item.title}</Text>
            ) : (
              <Text style={styles.userName}>{item.user.name} </Text>
            )}

            {item.type === "like" && (
              <Text style={styles.notificationAction}>
                le dio me gusta a tu historia <Text style={styles.storyTitle}>"{item.story.title}"</Text>
              </Text>
            )}

            {item.type === "comment" && (
              <Text style={styles.notificationAction}>
                comentó en tu historia <Text style={styles.storyTitle}>"{item.story.title}"</Text>
              </Text>
            )}

            {item.type === "system" && <Text style={styles.notificationAction}>{item.message}</Text>}
          </Text>

          {item.type === "comment" && item.comment && <Text style={styles.commentText}>"{item.comment}"</Text>}

          <View style={styles.timeContainer}>
            <Clock color={COLORS.textMuted} size={12} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.notificationTypeIcon}>
          {item.type === "like" && <Heart size={16} color="#e74c3c" fill="#e74c3c" />}
          {item.type === "comment" && <MessageCircle size={16} color={COLORS.info} />}
          {item.type === "system" && <CheckCircle size={16} color={COLORS.success} />}
        </View>
      </TouchableOpacity>
    )
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

      <Toast
        visible={toastConfig.visible}
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        onHide={hideToast}
        duration={toastConfig.duration}
      />

      <View style={globalStyles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Marcar todo</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Bell color={COLORS.textMuted} size={64} />
          <Text style={styles.emptyTitle}>No hay notificaciones</Text>
          <Text style={styles.emptyText}>Cuando tengas nuevas notificaciones, aparecerán aquí.</Text>
        </View>
      )}

      <View style={globalStyles.bottomNav}>
        <TouchableOpacity style={globalStyles.navButton} onPress={goToHome}>
          <Home color={COLORS.textMuted} size={24} />
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
  backButton: {
    padding: SPACING.xs,
  },
  markAllText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
  },
  notificationsList: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.xxl,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    position: "relative",
  },
  unreadNotification: {
    backgroundColor: COLORS.cardDark,
    borderLeftColor: COLORS.primary,
    borderLeftWidth: 3,
  },
  unreadIndicator: {
    position: "absolute",
    top: SPACING.medium,
    left: -1.5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.circle,
    marginRight: SPACING.medium,
  },
  systemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.circle,
    backgroundColor: "rgba(74, 92, 219, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.medium,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  userName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  notificationTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  notificationAction: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  storyTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  commentText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    fontStyle: "italic",
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  timeText: {
    fontSize: SIZES.xs,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  notificationTypeIcon: {
    marginLeft: SPACING.small,
    alignSelf: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginTop: SPACING.large,
    marginBottom: SPACING.small,
  },
  emptyText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
})
