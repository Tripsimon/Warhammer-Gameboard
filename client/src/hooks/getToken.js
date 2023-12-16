import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Funkce pro získání uloženého tokenu z cookies
const getAuthToken = () => {
  return cookies.get('token');
};

export default getAuthToken;