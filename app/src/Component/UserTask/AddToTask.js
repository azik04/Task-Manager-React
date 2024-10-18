import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddToTask = ({ onClose, taskId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/${taskId}/GetUnassignedUsers`);
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
                setErrors({ general: 'İstifadəçiləri əldə edərkən xəta baş verdi.' });
            }
        };

        fetchUsers();
    }, [taskId]);

    const handleAddToTask = async () => {
        setErrors({});
        if (!selectedUserId) {
            setErrors({ userId: 'Zəhmət olmasa, istifadəçi seçin.' });
            return;
        }

        try {
            await axios.post(`https://localhost:7146/api/UserTask/${taskId}/users/${selectedUserId}`);
            setSuccess('İstifadəçi tapşırığa müvəffəqiyyətlə əlavə edildi.');
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'İstifadəçini tapşırığa əlavə edərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' });
            }
        }
    };

    return (
        
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>İstifadəçini Tapşırığa Əlavə Et</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className="pop_order_mid_inp">
                        <label htmlFor="userSelect">İstifadəçi Seçin:</label>
                        <select id="userSelect" onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                            <option value="" disabled>İstifadəçi seçin</option>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>İstifadəçi yoxdur</option>
                            )}
                        </select>
                        {errors.userId && <span className="error">{errors.userId}</span>}
                    </div>

                    <button className="pop_order_submit_btn" onClick={handleAddToTask}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default AddToTask;
