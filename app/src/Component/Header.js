import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Icon from '../Photos/Icon.svg';
import Theme from './Theme/Theme';
import User from '../Photos/User.svg';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();

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


    const options = [
        { src: Icon, altText: 'Icon', to: '/Theme' },
        ...(isAdmin ? [{ src: User, altText: 'User', to: '/Users' }] : []) 
    ];

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('UserId');
        navigate('/'); 
    };

    return (
        <header className="header">
            <div className="header-menu">
                <a href="/admin" className="header-menu-one">
                    <i class="fa-solid fa-users"></i>
                    <p>Admin</p>
                </a>
                <a href="/" className="header-menu-one" onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <p>Log Out</p>
                </a>
            </div>
            <Theme/>
           
        </header>
    );
};

export default Header;
