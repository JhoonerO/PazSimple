import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: process.env.API_URL,
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('@Auth:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;