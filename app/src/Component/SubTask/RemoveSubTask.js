import React from 'react';
import axios from 'axios';

const RemoveTask = ({ onClose , subtaskId }) => {

    const remTask = async () => {
        try {
            const res = await axios.delete(`https://localhost:7146/api/SubTask/${subtaskId}`);
            console.log(res);
            onClose(); 
            window.location.reload()
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    return (
    <section className="popup-overlay">
        <div className="popup-container-rem">
            <div className="popup-header">
                <h3>Alt Tapşırıgı Sil</h3>
                <i className="fa-solid fa-xmark" onClick={onClose}></i>
            </div>
            <div className="popup-content">
                <p>Bu kanalı silmək istədiyinizə əminsinizmi?</p>
            </div>
            <div className="popup-footer">
                <button className="cancel-btn" onClick={onClose}>Xeyr</button>
                <button className="submit-btn" onClick={remTask}>Bəli</button>
            </div>
        </div>
    </section>
    );
};

export default RemoveTask;
