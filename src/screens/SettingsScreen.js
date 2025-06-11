import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Alert,
  Switch
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { 
  ArrowLeft, 
  Edit3, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info,
  LogOut,
  Moon,
  Globe,
  Home,
  Plus,
  User
} from 'lucide-react-native';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  // Cargar fuentes Poppins
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidad próximamente...');
  };

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'Configurar notificaciones próximamente...');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacidad', 'Configuraciones de privacidad próximamente...');
  };

  const handleHelp = () => {
    Alert.alert('Ayuda', 'Centro de ayuda próximamente...');
  };

  const handleAbout = () => {
    Alert.alert('Acerca de PAZ', 'Versión 1.0.0\nApp para compartir historias urbanas');
  };

  const handleLanguage = () => {
    Alert.alert('Idioma', 'Configuración de idioma próximamente...');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Configuraciones</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Sección Cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          
          <TouchableOpacity style={styles.optionItem} onPress={handleEditProfile}>
            <Edit3 color="#4a5cdb" size={20} />
            <Text style={styles.optionText}>Editar Perfil</Text>
            <ArrowLeft color="#888" size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Configuraciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuraciones</Text>
          
          <View style={styles.optionItem}>
            <Bell color="#f39c12" size={20} />
            <Text style={styles.optionText}>Notificaciones</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#404040', true: '#4a5cdb' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#888'}
            />
          </View>

          <TouchableOpacity style={styles.optionItem} onPress={handleLanguage}>
            <Globe color="#3498db" size={20} />
            <Text style={styles.optionText}>Idioma</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>Español</Text>
              <ArrowLeft color="#888" size={16} style={styles.chevronIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handlePrivacy}>
            <Shield color="#27ae60" size={20} />
            <Text style={styles.optionText}>Privacidad</Text>
            <ArrowLeft color="#888" size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Soporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          
          <TouchableOpacity style={styles.optionItem} onPress={handleHelp}>
            <HelpCircle color="#e67e22" size={20} />
            <Text style={styles.optionText}>Ayuda</Text>
            <ArrowLeft color="#888" size={16} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleAbout}>
            <Info color="#34495e" size={20} />
            <Text style={styles.optionText}>Acerca de PAZ</Text>
            <ArrowLeft color="#888" size={16} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Sección Sesión */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <LogOut color="#e74c3c" size={20} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

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
    paddingHorizontal: 20,
  },
  
  // Sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#888',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Option Items
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    marginLeft: 15,
    flex: 1,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginRight: 8,
  },
  chevronIcon: {
    transform: [{ rotate: '180deg' }], // Para que apunte a la derecha
  },
  
  // Logout
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#040813',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#e74c3c',
    marginLeft: 15,
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
