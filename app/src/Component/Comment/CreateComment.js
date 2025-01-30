import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const CreateComment = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const [error, setErrors] = useState({});


    const fetchPost = async () => {
        setErrors({});
        try {
            const token = localStorage.getItem('JWT');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.UserId;
    
            const commentData = {
                message: message,
                taskId: id,
                userId: userId,
            };
            await axios.post(`https://localhost:7146/api/Comment`,commentData);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error posting comment:', error.response.data.errors);
            setErrors(error.response.data.errors)
        }
    };
    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create Comment</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="channel-name">Create Comment</label>
                            <input
                                type="text"
                                id="channel-name"
                                placeholder="Enter Comment"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                              <span className={`errors ${error?.Message?.[0] ? 'visible' : ''}`}>
                                {error?.Message?.[0]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={fetchPost}>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateComment;
