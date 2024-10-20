import React, { useState } from 'react';
import axios from 'axios';

const RemoveSubTask = ({ subtaskId, onClose, onRemove }) => {
    const [error, setError] = useState(null);

    const remItem = async () => {
        setError(null);
        
        try {
            const response = await axios.delete(`https://localhost:7146/api/SubTask/${subtaskId}`); 
            console.log('Alt tapşırıq uğurla silindi', response.data);
            onRemove(subtaskId); 
            onClose();
        } catch (error) {
            setError("Alt tapşırığı silmək alınmadı. Zəhmət olmasa, yenidən cəhd edin.");
            console.error("Xəta", error);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Alt Tapşırığı Sil</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <p>Bu alt tapşırığı silmək istəyirsinizmi?</p>
                    </div>
                    <div className='pop_order_footer'>
                        <button className="rem_btn" onClick={remItem}>Sil</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveSubTask;
