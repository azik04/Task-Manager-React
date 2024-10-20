import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddToTheme = ({ onClose, themeId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const userId = localStorage.getItem('UserId'); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (!userId) {
                    throw new Error('İstifadəçi ID-si yerli yaddaşda tapılmadı.');
                }
                const res = await axios.get(`https://localhost:7146/api/User/Theme/${themeId}/Unassigned?userId=${userId}`);
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
            }
        };

        fetchUsers();
    }, [themeId, userId]); 

    const storedUserId = localStorage.getItem("UserId");
    const handleAddToTask = async () => {
        const payload = {
            themeId: themeId,
            userId: selectedUserId, 
            createdByUserId: storedUserId
        };
        try {
            await axios.post(`https://localhost:7146/api/UserTheme`, payload);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('İstifadəçini tapşırığa əlavə edərkən xəta:', error);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>İstifadəçini Layihəyə Əlavə Et</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <label htmlFor="userSelect">İstifadəçi Seçin:</label>
                        <select 
                            id="userSelect" 
                            onChange={(e) => setSelectedUserId(e.target.value)} 
                            value={selectedUserId}
                        >
                            <option value="" disabled>Bir istifadəçi seçin</option>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>İstifadəçilər mövcud deyil</option>
                            )}
                        </select>
                    </div>

                    <button className="pop_order_submit_btn" onClick={handleAddToTask}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default AddToTheme;
