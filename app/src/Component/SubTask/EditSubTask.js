import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditSubTask = ({ onClose, id }) => {
    const [name, setName] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [priority, setPriority] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7146/api/SubTask/${id}`);
                const subtask = response.data.data;
                setName(subtask.name);
                setDeadLine(subtask.deadLine);
                setPriority(subtask.priority);
            } catch (error) {
                console.error('Error fetching subtask data:', error);
            }
        };

        fetchData();
    }, [id]);

    const fetchPost = async () => {
        setErrors({});
        try {
            const updatedData = {
                name: name,
                deadLine: deadLine || null,
                priority: priority,
            };
            const response = await axios.put(`https://localhost:7146/api/SubTask?taskId=${id}`, updatedData);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating subtask:', error.response.data.errors)
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Edit SubTask</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="subtask-name">SubTask Name</label>
                            <input
                                type="text"
                                id="subtask-name"
                                placeholder="Enter SubTask Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={deadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                            {errors.deadLine && <span className="error">{errors.deadLine}</span>}
                        </div>
                        <div className="input-half">
                            <label>Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value={priority}>{priority}</option>
                                <option value="Yüksək">Yüksək</option>
                                <option value="Orta">Orta</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Ən Yüksək">Ən Yüksək</option>
                            </select>
                            {errors.priority && <span className="error">{errors.priority}</span>}
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={fetchPost}>
                        Update
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditSubTask;
