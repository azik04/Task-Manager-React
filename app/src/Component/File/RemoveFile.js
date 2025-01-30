import axios from 'axios';
import React, { useState } from 'react';

const RemoveFile = ({ onClose, documentId }) => {
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
        <section className="popup-overlay">
        <div className="popup-container-rem">
            <div className="popup-header">
                <h3>Kanalı Sil</h3>
                <i className="fa-solid fa-xmark" onClick={onClose}></i>
            </div>
            <div className="popup-content">
                <p>Bu kanalı silmək istədiyinizə əminsinizmi?</p>
            </div>
            <div className="popup-footer">
                <button className="cancel-btn" onClick={onClose}>Xeyr</button>
                <button className="submit-btn" onClick={remItem}>Bəli</button>
            </div>
        </div>
    </section>
    );
};

export default RemoveFile;
