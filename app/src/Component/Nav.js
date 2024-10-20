import React from 'react';
import {jwtDecode} from 'jwt-decode'; 
import Logo from '../Photos/MXM_ADRA_Logotype_January_2018_Color.png';

const Nav = () => {
    const token = localStorage.getItem('JWT'); 

    let uniqueName = '';
    if (token) {
        const decodedToken = jwtDecode(token);
        uniqueName = decodedToken.unique_name || ''; 
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-content-menu">
                    <div className="navbar-logo-icon">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="navbar-content-menu-name">
                        <p>Task Manager</p>
                    </div>
                </div>
                <div className="navbar-content-menu-options">
                    <div className="navbar-content-menu-options-new">
                        <p>{uniqueName}</p> 
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
