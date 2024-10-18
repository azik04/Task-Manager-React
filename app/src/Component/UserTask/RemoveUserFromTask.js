import React from 'react';
import axios from 'axios';
// import Photo from '../Photos/Cancel.svg';

const RemoveUserFromTask = ({ onClose, userId, taskId }) => {
    const handleRemove = async () => {
        try {
            await axios.delete(`https://localhost:7146/api/UserTask/${taskId}/users/${userId}`);
            console.log("User removed:", userId);
            window.location.reload(); 
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <section className="pop">
        <div className="pop-order">
            {/* Header with close button */}
            <div className="pop_order_nav">
                <div className="pop_order_nav_left">
                    <p>Taskdan Isrefadecini Sil</p>
                </div>
                <div className="pop_order_nav_right">
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
            </div>

            <div className="pop_order_mid">
                <div className="pop_order_mid_inp">
                    <p>Bu Taskdan Isrefadecini silmək istəyirsinizmi?</p>
                </div>
                <div className='pop_order_footer'>
                    <button className="rem_btn" onClick={handleRemove}>Sil</button>
                </div>
            </div>
        </div>
    </section>
    );
};

export default RemoveUserFromTask;
