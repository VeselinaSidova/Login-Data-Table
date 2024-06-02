import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : null;
    });
    const navigate = useNavigate();

    const login = ({ username }) => {
        const userData = { username };
        setAuth(userData);
        localStorage.setItem('auth', JSON.stringify(userData));
        navigate('/table');
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAuthenticated: !!auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);