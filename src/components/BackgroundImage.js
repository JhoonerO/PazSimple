import { Image, StyleSheet, View } from "react-native"

/**
 * Componente para mostrar una imagen de fondo con opciones de overlay
 *
 * @param {Object} props - Propiedades del componente
 * @param {string|number} props.source - URI o require de la imagen
 * @param {boolean} props.overlay - Si debe mostrar un overlay oscuro sobre la imagen
 * @param {number} props.opacity - Opacidad del overlay (0-1)
 */
export default function BackgroundImage({ source, overlay = false, opacity = 0.5, style }) {
  // Determinar si la fuente es una URI o un recurso local
  const isUri = typeof source === "string"

  return (
    <View style={[styles.container, style]}>
      <Image source={isUri ? { uri: source } : source} style={styles.image} resizeMode="cover" />

      {overlay && <View style={[styles.overlay, { opacity }]} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },
})
