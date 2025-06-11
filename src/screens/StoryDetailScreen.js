import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  TextInput 
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { ArrowLeft, Heart, MessageCircle, Send } from 'lucide-react-native';

// Comentarios mock
const mockComments = [
  {
    id: 1,
    author: "Luis C.",
    text: "Yo creí escuchar algo también por el segundo piso que miedo pana",
    liked: false
  },
  {
    id: 2,
    author: "Juan Ing",
    text: "Buena historia 👍",
    liked: true
  },
  {
    id: 3,
    author: "Julio Profe",
    text: "Así de miedo dan las matemáticas cuando no estudio😅",
    liked: false
  }
];

export default function StoryDetailScreen({ navigation, route }) {
  const { story } = route.params;
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);

  // Cargar fuentes Poppins
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleLike = () => {
    setLiked(!liked);
    console.log('Toggle like for story:', story.id);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Tú", // Después será el usuario actual
        text: newComment,
        liked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  // Mostrar loading mientras cargan las fuentes
  if (!fontsLoaded) {
    return <View style={styles.container}><Text style={styles.loadingText}>Cargando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="# 040813" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{story.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Imagen de la historia */}
        <Image 
          source={{ uri: story.image }}
          style={styles.storyImage}
          resizeMode="cover"
        />
        
        {/* Contenido de la historia */}
        <View style={styles.storyContent}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyAuthor}>-{story.author}-</Text>
          <Text style={styles.storyText}>{story.content}</Text>
          
          {/* Likes y comentarios */}
          <View style={styles.storyActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleLike}
            >
              <Heart 
                size={20} 
                color={liked ? "#e74c3c" : "#888"} 
                fill={liked ? "#e74c3c" : "none"}
              />
              <Text style={[styles.actionText, liked && styles.likedText]}>
                {story.likes + (liked ? 1 : 0)}
              </Text>
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
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendComment}
        >
          <Send color="#4a5cdb" size={20} />
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
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34, // Para centrar el título
  },
  
  // Content
  content: {
    flex: 1,
  },
  storyImage: {
    width: '100%',
    height: 250,
  },
  storyContent: {
    padding: 20,
  },
  storyTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: 'white',
    marginBottom: 8,
  },
  storyAuthor: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginBottom: 20,
  },
  storyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 25,
  },
  
  // Actions
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginLeft: 8,
  },
  likedText: {
    color: '#e74c3c',
  },
  
  // Comments
  commentsSection: {
    padding: 20,
    paddingTop: 25,
  },
  commentsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginBottom: 20,
  },
  commentItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  commentAuthor: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#4a5cdb',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ccc',
    lineHeight: 20,
  },
  
  // Comment Input
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#040813',
    borderTopColor: '#404040',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
});
