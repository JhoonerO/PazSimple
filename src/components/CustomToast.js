import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions,
  TouchableOpacity 
} from 'react-native';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

export default function CustomToast({ 
  visible, 
  type = 'success', 
  title, 
  message, 
  onHide,
  duration = 4000 
}) {
  const [slideAnim] = useState(new Animated.Value(-100));
  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (visible) {
      // Animar entrada
      Animated.timing(slideAnim, {
        toValue: 60,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Auto-hide después de la duración
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onHide) onHide();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#2d2d44',
          borderColor: '#4a5cdb',
          icon: CheckCircle,
          iconColor: '#4a5cdb',
        };
      case 'error':
        return {
          backgroundColor: '#2d2d44',
          borderColor: '#e74c3c',
          icon: AlertCircle,
          iconColor: '#e74c3c',
        };
      case 'info':
        return {
          backgroundColor: '#2d2d44',
          borderColor: '#3498db',
          icon: Info,
          iconColor: '#3498db',
        };
      default:
        return {
          backgroundColor: '#2d2d44',
          borderColor: '#4a5cdb',
          icon: CheckCircle,
          iconColor: '#4a5cdb',
        };
    }
  };

  if (!visible || !fontsLoaded) return null;

  const config = getToastConfig();

  return (
    <Animated.View 
      style={[
        styles.container, 
        {
          backgroundColor: config.backgroundColor,
          borderLeftColor: config.borderColor,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.content}
        activeOpacity={0.9}
        onPress={hideToast}
      >
        <config.icon 
          size={24} 
          color={config.iconColor} 
          style={styles.icon}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>

        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <X size={18} color="#888" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ccc',
    lineHeight: 18,
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
});