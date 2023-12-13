import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserName } from '../stores/userSlice';

const PrivateRoutes = () => {
const userName = useSelector(selectUserName);
    return(
        userName ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes