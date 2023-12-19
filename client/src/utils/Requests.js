import axios from 'axios';
import getAuthToken from '../hooks/getToken';

const requests = axios.create({
    baseURL: 'http://localhost:3001' // Základní URL serveru
});

requests.interceptors.request.use(
    config => {
        const authToken = getAuthToken(); // Získání tokenu
        config.headers.Authorization = `Bearer ${authToken}`; // Přidání tokenu do hlavičky
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default requests;