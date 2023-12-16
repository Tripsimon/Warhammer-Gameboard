import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios';
import getAuthToken from '../hooks/getToken';
import { useState, useEffect } from 'react';

const AdminRoutes = () => {
    const authToken = getAuthToken();
    const [isVerified, setIsVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authToken) {
            setIsLoading(false);
            return;
        }

        // Odeslání tokenu k ověření
        axios.post('http://localhost:3001/verifyToken', {}, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            if (response.data.success && response.data.isAdmin) {
                setIsVerified(true);
                setIsAdmin(true);
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

    if (isVerified && isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

export default AdminRoutes;