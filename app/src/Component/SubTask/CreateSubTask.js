import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

const CreateComment = ({ onClose }) => {
    const [subTask, setSubTask] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [priority, setPriority] = useState('');

    const { id } = useParams();
    const [error, setErrors] = useState({});


    const fetchPost = async () => {
        setErrors({});
        try {
            const token = localStorage.getItem('JWT');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.UserId;
    
            const commentData = {
                name: subTask.trim(),
                taskId: parseInt(id, 10),
                userId: parseInt(userId, 10),
                deadLine: deadLine || null,
                priority: priority,
            };
        
            await axios.post(`https://localhost:7146/api/SubTask`, commentData);
            onClose();
            window.location.reload();
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create SubTask</h3>
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
                                onChange={(e) => setSubTask(e.target.value)}
                            />
                             <span className={`errors ${error?.Name?.[0] ? 'visible' : ''}`}>
                                {error?.Name?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                    <div className="input-half">
                            <label>DeadLine</label>
                            <input 
                                type="date" 
                                placeholder="DeadLine" 
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                            <span className={`errors ${error?.DeadLine?.[0] ? 'visible' : ''}`}>
                                {error?.DeadLine?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label>Priority</label>
                            <select id="Priority" onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Yüksək">Yüksək</option>
                                <option value="Orta">Orta</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Ən Yüksək">Ən Yüksək</option>
                            </select>
                            <span className={`errors ${error?.Priority?.[0] ? 'visible' : ''}`}>
                                {error?.Priority?.[0]}
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
