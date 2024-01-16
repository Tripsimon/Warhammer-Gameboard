//Import
import Cookies from 'universal-cookie';

//Hook pro JWT
const cookies = new Cookies();

// Funkce pro získání uloženého tokenu z cookies
const getAuthToken = () => {
  return cookies.get('token');
};

//Export
export default getAuthToken;