import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { jwtDecode } from 'jwt-decode';

const EditTask = ({ onClose }) => {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [executiveUser, setExecutiveUser] = useState(null);
    const [elage, setElage] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { themeId, id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('JWT');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;
                const res = await axios.get(`https://localhost:7146/api/Task/${id}?userId=${userId}`);
                const taskData = res.data.data;

                setName(taskData.taskName);
                setDetail(taskData.taskDescription);
                setStatus(taskData.status);
                setPriority(taskData.priority);
                setDeadLine(taskData.deadLine);
                setElage(taskData.elage);
                setExecutiveUser(taskData.executiveUserId);
                console.log(taskData);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/UserTheme/Theme/${themeId}/Users`);
                setUsers(res.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
        fetchUsers();
    }, [themeId, id]);

    const handleSubmit = async () => {
        try {
            const payload = {
                taskName: name,
                taskDescription: detail,
                status: status,
                priority: priority,
                deadLine: deadLine || null,
                contact: elage|| null,
                executiveUserId: executiveUser ? parseInt(executiveUser) : null,
                UserTasks: selectedUsers.map((user) => parseInt(user.value)),
            };
            console.log('Payload:', payload);

            await axios.put(`https://localhost:7146/api/Task/${id}`, payload);
            onClose();
            window.location.reload()
        } catch (error) {
            console.error('Error creating task:', error.response?.data?.errors);
            setError(error.response?.data?.errors || {});
        }
    };

    const userOptions = users.map((user) => ({
        value: user.userId,
        label: user.userName,
    }));

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Task Edit</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label>Task Name</label>
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className={`errors ${error?.TaskName?.[0] ? 'visible' : ''}`}>
                                {error?.TaskName?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={deadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                            <span className={`errors ${error?.DeadLine?.[0] ? 'visible' : ''}`}>
                                {error?.DeadLine?.[0]}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value={priority}>{priority}</option>
                                <option value="0">Yüksək</option>
                                <option value="1">Orta</option>
                                <option value="2">Aşağı</option>
                                <option value="3">Ən Yüksək</option>
                            </select>
                        </div>
                        <div className="input-half">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value={status}>{status}</option>
                                <option value="Prosesdə">Prosesdə</option>
                                <option value="Riskdə">Riskdə</option>
                                <option value="Gecikir">Gecikir</option>
                            </select>
                        </div>
                        <div className="input-half">
                            <label>Əlaqə</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={elage}
                                onChange={(e) => setElage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Executive User</label>
                            <select
                                value={executiveUser || ''}
                                onChange={(e) => setExecutiveUser(e.target.value)}
                            >
                                <option value="">Select Executive User</option>
                                {users.map((user) => (
                                    <option key={user.userId} value={user.userId}>
                                        {user.userName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-half">
                            <label>Select Users</label>
                            <Select
                                options={userOptions}
                                isMulti
                                value={selectedUsers}
                                onChange={(selected) => setSelectedUsers(selected)}
                                placeholder="Select Users"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Task Description</label>
                            <textarea
                                placeholder="Details Content"
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                            />
                            <span className={`errors ${error?.TaskDescription?.[0] ? 'visible' : ''}`}>
                                {error?.TaskDescription?.[0]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        İmtina et
                    </button>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Təsdiq et
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditTask;
