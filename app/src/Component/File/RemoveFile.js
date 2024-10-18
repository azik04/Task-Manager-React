import axios from 'axios';
import React, { useState } from 'react';
// import Photo from '../Photos/Cancel.svg';

const RemoveFile = ({ onClose, documentId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const remItem = async () => {

        try {
            const response = await axios.delete(`https://localhost:7146/api/File/${documentId}`);
            onClose();
            window.location.reload(); 
        } catch (error) {
            setError("Faylı silmək alınmadı. Zəhmət olmasa, yenidən cəhd edin.");
            console.log("Xəta", error);
        }
    };

    return (
        <section className="pop">
        <div className="pop-order">
            {/* Header with close button */}
            <div className="pop_order_nav">
                <div className="pop_order_nav_left">
                    <p>Fayli Sil</p>
                </div>
                <div className="pop_order_nav_right">
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
            </div>

            <div className="pop_order_mid">
                <div className="pop_order_mid_inp">
                    <p>Bu Fayli silmək istəyirsinizmi?</p>
                </div>
                <div className='pop_order_footer'>
                    <button className="rem_btn" onClick={remItem}>Sil</button>
                </div>
            </div>
        </div>
    </section>
    );
};

export default RemoveFile;
