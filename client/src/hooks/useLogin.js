import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../stores/userSlice';
import Cookies from 'universal-cookie';

export const useLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cookies = new Cookies(null, {path: '/'});

    const login = (resultData) => {
    dispatch(loginUser({name: "DSADSA", id:69}))
    navigate("/browseMatches");
    cookies.set("username", "DSADSA")
    console.log(resultData)
}
return login

}