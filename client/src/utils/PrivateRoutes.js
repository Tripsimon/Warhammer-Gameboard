//Importy
import { Outlet, Navigate } from 'react-router-dom'
import getAuthToken from '../hooks/getToken';
import { useState, useEffect } from 'react';
import requests from '../utils/Requests';

//Utilitka pro routování admin věcí
const PrivateRoutes = () => {
    const authToken = getAuthToken();
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        if (!authToken) {
            setIsLoading(false);
            return;
        }
      
        // Odeslání tokenu k ověření
        requests.post('/verifyToken')
        .then(response => {
            if (response.data.success) {
                setIsVerified(true);
            }
        })
        .catch(error => {
            console.error('Chyba při ověření tokenu:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [authToken]);
  
    if (isLoading) {
        return //tady by se mohlo něco přidat, kdyby se to dlouho načítalo
    }

    if (isVerified) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

//Export
export default PrivateRoutes;