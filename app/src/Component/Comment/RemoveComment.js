import React from 'react';
import axios from 'axios';

const RemoveComment = ({ onClose, commentId }) => {
    const remItem = async () => {
        try {
            const response = await axios.delete(`https://localhost:7146/api/Comment/${commentId}`);
            console.log('Şərh uğurla silindi', response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Şərhi silərkən xəta:", error.response ? error.response.data : error.message);
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

export default RemoveComment;
