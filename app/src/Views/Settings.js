import React, { useState } from 'react';
import '../style.css'; 
import EditUser from '../Component/Admin/EditUser';

const Settings = () => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showChangePopup, setShowChangePopup] = useState(false);  

    const handleEditPopupOpen = () => {
        setShowEditPopup(true);
    };

    return (
        <section className="content">
            <div className="settings">
                <button
                    className="settings__button settings__button--user"
                    onClick={handleEditPopupOpen}  
                >
                    <i className="fa-solid fa-user settings__icon"></i>
                    <p className="settings__text">User Settings</p>
                </button>

            </div>

            {showEditPopup && (<EditUser onClose={() => setShowEditPopup(false)} />)}

        </section>
    );
};

export default Settings;
