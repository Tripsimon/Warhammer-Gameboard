import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../stores/userSlice';
import Cookies from 'universal-cookie';

export const useLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cookies = new Cookies(null, {path: '/'});

    const login = (resultData) => {
    dispatch(loginUser(resultData))
    if (resultData.username !== 'admin') {
        navigate("/browseMatches");
    }

    cookies.set("username", resultData.username, { path: '/' });
    cookies.set("userID", resultData.userID, { path: '/' });
    cookies.set("isAdmin", resultData.isAdmin, { path: '/' });
    console.log(resultData)
}
return login

}