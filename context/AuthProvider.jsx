import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if (auth.accessToken) {
            const decoded = jwtDecode(auth.accessToken);
            setAuth(prevAuth => ({
                ...prevAuth,
                decodedInfo: decoded
            }));
        }
    }, [auth.accessToken]); 

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
