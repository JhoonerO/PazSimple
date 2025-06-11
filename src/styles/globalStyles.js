import { StyleSheet, Dimensions } from "react-native"

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get("window")

// Colores principales de la aplicación
export const COLORS = {
  // Colores de fondo
  background: "#040813",
  card: "#111827",
  cardDark: "#0d1117",

  // Colores de texto
  text: "#ffffff",
  textSecondary: "#cccccc",
  textMuted: "#888888",

  // Colores de acento
  primary: "#4a5cdb",
  secondary: "#e74c3c",
  success: "#27ae60",
  warning: "#f39c12",
  info: "#3498db",
  error: "#e74c3c",

  // Colores de borde
  border: "#404040",
}

// Tipografía
export const FONTS = {
  regular: "Poppins_400Regular",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
}

// Tamaños de fuente
export const SIZES = {
  xs: 10,
  small: 12,
  medium: 14,
  large: 16,
  xl: 18,
  xxl: 20,
  title: 24,
  bigTitle: 32,
  splash: 48,
}

// Espaciado
export const SPACING = {
  xs: 5,
  small: 10,
  medium: 15,
  large: 20,
  xl: 25,
  xxl: 30,
  xxxl: 50,
}

// Bordes redondeados
export const RADIUS = {
  small: 8,
  medium: 12,
  large: 15,
  xl: 20,
  circle: 50,
}

// Estilos globales reutilizables
export const globalStyles = StyleSheet.create({
  // Contenedores principales
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  loadingText: {
    color: COLORS.text,
    fontFamily: FONTS.regular,
    textAlign: "center",
    marginTop: SPACING.xxxl,
  },

  // Headers universales
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.medium,
  },

  headerTitle: {
    fontSize: SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },

  headerTitleCenter: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    flex: 1,
    textAlign: "center",
  },

  headerTitlePAZ: {
    fontSize: SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    letterSpacing: 4,
  },

  backButton: {
    padding: SPACING.xs,
  },

  placeholder: {
    width: 34,
  },

  // Botones universales
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.medium,
    alignItems: "center",
    marginBottom: SPACING.large,
  },

  primaryButtonText: {
    color: COLORS.text,
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },

  secondaryButton: {
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.medium,
    alignItems: "center",
    marginBottom: SPACING.large,
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },

  // Inputs universales
  input: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    marginBottom: SPACING.medium,
    color: COLORS.text,
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
  },

  inputIcon: {
    marginRight: SPACING.small,
  },

  inputField: {
    flex: 1,
    color: COLORS.text,
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    paddingVertical: SPACING.medium,
  },

  // Tarjetas universales
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.medium,
    overflow: "hidden",
  },

  cardContent: {
    padding: SPACING.medium,
  },

  // Textos universales
  title: {
    fontSize: SIZES.title,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  subtitle: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  textMuted: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
  },

  textSmall: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
  },

  author: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginBottom: SPACING.small,
  },

  // Navegación inferior universal
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
  },

  navButton: {
    padding: SPACING.small,
  },

  // Imágenes universales
  storyImage: {
    width: "100%",
    height: 200,
  },

  storyImageSmall: {
    width: "100%",
    height: 120,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.circle,
    backgroundColor: COLORS.card,
  },

  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.circle,
    backgroundColor: COLORS.card,
  },

  // Acciones universales (likes, comentarios)
  storyActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.large,
  },

  actionButtonSmall: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.medium,
  },

  actionText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginLeft: SPACING.xs,
  },

  actionTextSmall: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginLeft: 4,
  },

  // Grids universales
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48%",
    marginBottom: SPACING.medium,
  },

  // Estados vacíos universales
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

  // Contenedores de contenido
  content: {
    flex: 1,
  },

  contentPadded: {
    flex: 1,
    paddingHorizontal: SPACING.large,
  },

  scrollContent: {
    paddingBottom: SPACING.xxl,
  },

  // Links universales
  linkText: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
  },

  linkHighlight: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },

  // Logos universales
  logoContainer: {
    marginBottom: SPACING.xxxl,
  },

  logoImage: {
    width: 80,
    height: 80,
  },

  logoImageLarge: {
    width: 120,
    height: 120,
  },

  // Formularios universales
  formContainer: {
    width: "100%",
    maxWidth: 300,
  },

  // Secciones universales
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
  },

  // Centrado universal
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

  centeredText: {
    textAlign: "center",
  },

  // Separadores
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.medium,
  },
})

// Función para aplicar un fondo global o específico
export const withBackground = (Component, backgroundImage = null) => {
  return (props) => (
    <>
      {backgroundImage && <Image source={backgroundImage} style={globalStyles.backgroundImage} />}
      <Component {...props} />
    </>
  )
}

export default {
  COLORS,
  FONTS,
  SIZES,
  SPACING,
  RADIUS,
  globalStyles,
  withBackground,
}
