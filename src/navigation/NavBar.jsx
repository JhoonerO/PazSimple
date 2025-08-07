import { View, TouchableOpacity, StyleSheet  } from "react-native"
import { Home, Plus, User } from "lucide-react-native"
import { COLORS } from "../styles/globalStyles"
import { useNavigation, useRoute  } from '@react-navigation/native';

export default function NavBar(){
    const navigation = useNavigation();
    const route = useRoute();
  
    // Determinar qué ícono está activo
    const isActive = (routeName) => {
        return route.name === routeName;
    };
    
    const goToHome = () => navigation.navigate("Home")
    const goToCreateStory = () => navigation.navigate("CreateStory")
    const goToProfile = () => navigation.navigate("Profile")

    return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={goToHome}
      >
        <Home 
          color={isActive("Home") ? COLORS.primary : COLORS.textMuted} 
          size={24} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={goToCreateStory}
      >
        <Plus 
          color={isActive("CreateStory") ? COLORS.primary : COLORS.textMuted} 
          size={24} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={goToProfile}
      >
        <User 
          color={isActive("Profile") ? COLORS.primary : COLORS.textMuted} 
          size={24} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    padding: 10,
  },
});