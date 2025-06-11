import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle,
  Home,
  Plus,
  User
} from 'lucide-react-native';

// Historias que me gustaron (mock data)
const likedStories = [
  {
    id: 1,
    title: "La niña de los baños",
    author: "Andrés",
    preview: "Cuando golpeaba la puerta, no había respuesta...",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    likes: 3,
    comments: 1,
    content: "Dicen que en el baño del cuarto piso, al fondo, aparece una niña llamada Lucía. Nadie sabe si fue hija de una profesora o si alguna vez fue real. Solo que entra al baño... y nunca sale. Después de las 6 p.m., se apagan las luces, el grifo gotea... Y si estás solo, puedes oír su voz susurrando: '¿Quieres jugar conmigo?' Los valientes que se quedaron... no volvieron a ser los mismos."
  }
];

export default function LikedStoriesScreen({ navigation }) {
  
  // Cargar fuentes Poppins
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleStoryPress = (story) => {
    navigation.navigate('StoryDetail', { story });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToHome = () => {
    navigation.replace('Home');
  };

  const goToCreateStory = () => {
    navigation.navigate('CreateStory');
  };

  const goToProfile = () => {
    navigation.replace('Profile');
  };

  // Mostrar loading mientras cargan las fuentes
  if (!fontsLoaded) {
    return <View style={styles.container}><Text style={styles.loadingText}>Cargando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#040813" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Me gusta</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header con información */}
        <View style={styles.infoSection}>
          <Heart color="#e74c3c" size={32} />
          <Text style={styles.infoText}>Historias que te gustaron</Text>
          <Text style={styles.countText}>{likedStories.length} historia{likedStories.length !== 1 ? 's' : ''}</Text>
        </View>

        {likedStories.length > 0 ? (
          <>
            {/* Lista de historias que me gustaron */}
            {likedStories.map((story) => (
              <TouchableOpacity 
                key={story.id}
                style={styles.storyCard}
                onPress={() => handleStoryPress(story)}
              >
                {/* Imagen de la historia */}
                <Image 
                  source={{ uri: story.image }}
                  style={styles.storyImage}
                  resizeMode="cover"
                />
                
                {/* Contenido de la tarjeta */}
                <View style={styles.storyContent}>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <Text style={styles.storyAuthor}>-{story.author}-</Text>
                  <Text style={styles.storyPreview}>{story.preview}</Text>
                  
                  {/* Likes y comentarios */}
                  <View style={styles.storyActions}>
                    <View style={styles.actionButton}>
                      <Heart color="#e74c3c" size={16} fill="#e74c3c" />
                      <Text style={styles.actionText}>{story.likes}</Text>
                    </View>
                    
                    <View style={styles.actionButton}>
                      <MessageCircle color="#888" size={16} />
                      <Text style={styles.actionText}>{story.comments}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          /* Estado vacío */
          <View style={styles.emptyState}>
            <Heart color="#888" size={64} />
            <Text style={styles.emptyTitle}>No tienes likes aún</Text>
            <Text style={styles.emptyText}>
              Cuando le des like a una historia, aparecerá aquí para que puedas volver a leerla cuando quieras.
            </Text>
          </View>
        )}

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={goToHome}>
          <Home color="#888" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={goToCreateStory}>
          <Plus color="#888" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={goToProfile}>
          <User color="#4a5cdb" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040813',
  },
  
  loadingText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 50,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: 'white',
  },
  placeholder: {
    width: 34,
  },
  
  // Content
  content: {
    flex: 1,
  },
  
  // Info Section
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginTop: 15,
    marginBottom: 5,
  },
  countText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  
  // Story Card
  storyCard: {
    backgroundColor: '#111827',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: 180,
  },
  storyContent: {
    padding: 15,
  },
  storyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginBottom: 5,
  },
  storyAuthor: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginBottom: 8,
  },
  storyPreview: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  
  // Actions
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginLeft: 5,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#040813',
    borderTopColor: '#404040',
  },
  navButton: {
    padding: 10,
  },
});
