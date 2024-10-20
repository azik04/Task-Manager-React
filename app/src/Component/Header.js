import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import Theme from './Theme/Theme';
import GetThemeByUser from './UserTheme/GetThemeByUser';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        const token = localStorage.getItem('JWT');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.role === 'Admin');
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('UserId');
        navigate('/'); 
    };

    return (
        <header className="header">
            <div className="header-menu">
                <a 
                    href="/Admin" 
                    className={`header-menu-one ${location.pathname === '/Admin' ? 'active' : ''}`}
                >
                    <i className="fa-solid fa-users"></i>
                    <p>Admin</p>
                </a>
                <a 
                    href="/" 
                    className={`header-menu-one ${location.pathname === '/' ? 'active' : ''}`} 
                    onClick={handleLogout}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <p>Log Out</p>
                </a>
            </div>
            <Theme />
            <GetThemeByUser />
        </header>
    );
};

export default Header;
