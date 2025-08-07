import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    async login(email, password) {
        const response = await api.post('/login', { email, password });
        await AsyncStorage.setItem('@Auth:token', response.data.token);
        await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.data.user));
        return response.data;
    },

    async logout() {
        await AsyncStorage.removeItem('@Auth:token');
        await AsyncStorage.removeItem('@Auth:user');
    },

    async isAuthenticated() {
        const token = await AsyncStorage.getItem('@Auth:token');
        return !!token;
    },

    async getUser() {
        const user = await AsyncStorage.getItem('@Auth:user');
        return user ? JSON.parse(user) : null;
    },
};