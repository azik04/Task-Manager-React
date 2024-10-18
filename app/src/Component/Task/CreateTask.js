import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateTask = ({ onClose }) => {
    const { themeId } = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [executiveUserId, setExecutiveUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://localhost:7146/api/User');
                setUsers(res.data.data || []);
            } catch (error) {
                console.error(error.response.data.errors);
            }
        };
        fetchUsers();
    }, []);

    const createTask = async (event) => {
        event.preventDefault();
        setErrors({});
    
        const formData = {
            TaskName: taskName,
            TaskDescription: taskDescription,
            Status: status,
            Priority: priority,
            ThemeId: themeId,
            DeadLine: deadLine,
            ExecutiveUserId: executiveUserId,
        };
    
        try {
            const response = await axios.post('https://localhost:7146/api/Task', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const taskId = response.data.data.id;
            await axios.post(`https://localhost:7146/api/UserTask/${taskId}/users/${executiveUserId}`);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Unexpected error:', error);
            }
        } 
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Tapşırıq Yarat</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <label htmlFor="taskName">Tapşırıq Adı</label>
                        <input
                            type="text"
                            id="taskName"
                            placeholder="Tapşırıq Adı"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        {errors.TaskName && <span className="error">{errors.TaskName[0]}</span>}
                    </div>

                    <div className="pop_order_mid_inp">
                        <label htmlFor="taskDescription">Təsvir</label>
                        <textarea
                            id="taskDescription"
                            rows="4"
                            placeholder="Tapşırıq Təsviri"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        {errors.TaskDescription && <span className="error">{errors.TaskDescription[0]}</span>}
                    </div>

                    {/* Status and Priority */}
                    <div className="pop_order_mid_flex">
                        <div className="pop_order_mid_inp">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>Status seçin</option>
                                <option value="Prosesdedir">Prosesdedir</option>
                                <option value="Riskdə">Riskdə</option>
                                <option value="Gecikmə">Gecikmə</option>
                            </select>
                            {errors.Status && <span className="error">{errors.Status[0]}</span>}
                        </div>

                        <div className="pop_order_mid_inp">
                            <label htmlFor="priority">Prioritet</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="" disabled>Prioritet seçin</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Orta">Orta</option>
                                <option value="Yüksək">Yüksək</option>
                            </select>
                            {errors.Priority && <span className="error">{errors.Priority[0]}</span>}
                        </div>
                    </div>

                    {/* Deadline and Executive User */}
                    <div className="pop_order_mid_flex">
                        <div className="pop_order_mid_inp">
                            <label htmlFor="deadLine">Son Tarix</label>
                            <input
                                type="date"
                                id="deadLine"
                                min={today}
                                value={deadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                            {errors.DeadLine && <span className="error">{errors.DeadLine[0]}</span>}
                        </div>

                        <div className="pop_order_mid_inp">
                            <label htmlFor="executiveUserId">İcraçı</label>
                            <select
                                id="executiveUserId"
                                value={executiveUserId}
                                onChange={(e) => setExecutiveUserId(e.target.value)}
                            >
                                <option value="" disabled>İcraçı istifadəçi seçin</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button className="pop_order_submit_btn" onClick={createTask}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default CreateTask;
