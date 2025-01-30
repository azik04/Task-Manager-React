import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RemoveTask = ({ onClose }) => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const remTask = async () => {
        try {
            const res = await axios.delete(`https://localhost:7146/api/Task/${id}`);
            console.log(res);
            onClose(); 
            navigate('/Theme'); 
        } catch (error) {
            console.error('Error removing task:', error);
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
                <button className="submit-btn" onClick={remTask}>Bəli</button>
            </div>
        </div>
    </section>
    );
};

export default RemoveTask;
