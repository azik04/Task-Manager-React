import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RemoveUserFromTheme = ({ onClose, id, onUserRemoved }) => {
    const { themeId } = useParams(); 

    const handleRemove = async () => {
        try {
            await axios.delete(`https://localhost:7146/api/UserTheme/Theme/${themeId}/User/${id}`);
            onUserRemoved(id); 
            onClose();
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Taskdan İstifadəçini Sil</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <p>Bu Taskdan İstifadəçini silmək istəyirsinizmi?</p>
                    </div>
                    <div className='pop_order_footer'>
                        <button className="rem_btn" onClick={handleRemove}>Sil</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveUserFromTheme;
