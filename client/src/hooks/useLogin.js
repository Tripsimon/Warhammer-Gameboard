import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../stores/userSlice';
import Cookies from 'universal-cookie';

export const useLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cookies = new Cookies(null, {path: '/'});

    const login = (resultData) => {
    dispatch(loginUser(resultData));
    navigate(resultData.isAdmin ? "/admin" : "/browseMatches");

    cookies.set("username", resultData.username, { path: '/' });
    cookies.set("userID", resultData.userID, { path: '/' });
    cookies.set("isAdmin", resultData.isAdmin, { path: '/' });
    cookies.set("token", resultData.token, { path: '/' });
    console.log(resultData)
}
return login

}