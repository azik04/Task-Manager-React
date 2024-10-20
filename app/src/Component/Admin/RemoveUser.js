import React from 'react';
import axios from 'axios';

const RemoveUser = ({ onClose, userId }) => {
    const handleRemove = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

            await axios.delete(`https://localhost:7146/api/Admin/${userId}`); 
            console.log("İstifadəçi silindi:", userId);
            window.location.reload(); 
        } catch (error) {
            console.error('İstifadəçini silməkdə xəta:', error);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>İstifadəçini Sil</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <p>Bu istifadəçini silmək istəyirsinizmi?</p>
                    </div>
                    <div className='pop_order_footer'>
                        <button className="rem_btn" onClick={handleRemove}>Sil</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveUser;
