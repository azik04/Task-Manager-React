import React, { useState } from 'react';
import axios from 'axios';
// import Photo from '../Photos/Cancel.svg';

const ChangeRole = ({ onClose, userId }) => {
    const [newRole, setNewRole] = useState('');

    const chgRole = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`https://localhost:7146/api/User/ChangeRole?id=${userId}`, {
                newRole: newRole,
            });
            console.log(res);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Rol dəyişdirərkən xəta:', error);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Rolu Dəyişdir</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <p>Bu İstifadəçini Admin etmək istəyirsiniz?</p>
                    </div>

                    <div className='pop_order_footer'>
                        <button className="rem_btn" onClick={chgRole}>Testiqle</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeRole;
