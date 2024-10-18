import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateComment = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const userId = localStorage.getItem('UserId');

    const fetchPost = async () => {
        setErrors({});
        const commentData = {
            message: message,
            taskId: id,
            userId: userId
        };

        try {
            const response = await axios.post(`https://localhost:7146/api/Comment`, commentData);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.description) {
                    setErrors({ general: data.description });
                }
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Şərh Yaradın</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
                    <div className="pop_order_mid_inp">
                        <label htmlFor="message">Mesaj</label>
                        <input
                            type="text"
                            id="message"
                            placeholder="Şərhinizi daxil edin"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {errors.Message && <span className="error">{errors.Message[0]}</span>}
                    </div>

                    <button className="pop_order_submit_btn" onClick={fetchPost}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default CreateComment;
