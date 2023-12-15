import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserName } from '../stores/userSlice';
import Cookies from 'universal-cookie';

const PrivateRoutes = () => {
const userName = useSelector(selectUserName);
const cookies = new Cookies(null, {path: '/'});
const usernameCookie = cookies.get("username")
const isLoggedIn = userName || usernameCookie

    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes