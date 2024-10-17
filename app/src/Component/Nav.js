import React from 'react';
import Logo from '../Photos/MXM_ADRA_Logotype_January_2018_Color.png';

const Nav = () => {
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
                        <p>Hacibalayev Əvəz</p>
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;