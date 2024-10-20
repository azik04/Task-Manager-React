import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddToTheme = ({ onClose, themeId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const userId = localStorage.getItem('UserId'); 
    const {id} = useParams

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (!userId) {
                    throw new Error('User ID is not found in local storage.');
                }
                console.log(themeId, userId);
                const res = await axios.get(`https://localhost:7146/api/User/Theme/${themeId}/Unassigned?userId=${userId}`);
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
                setErrors({ general: 'Error fetching users.' });
            }
        };

        fetchUsers();
    }, [themeId, userId]); 

    const storedUserId = localStorage.getItem("UserId");
    const handleAddToTask = async () => {
        const payload = {
            themeId: themeId,
            userId: selectedUserId, // Corrected from selectedUserIdm to selectedUserId
            createdByUserId: storedUserId
        };

        console.log('Payload:', payload);

        try {
            await axios.post(`https://localhost:7146/api/UserTheme`, payload);
            setSuccess('User successfully added to the task.');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error while adding user to task:', error);
            setErrors({ general: 'Error while adding user to task.' });
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Add User to Theme</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className="pop_order_mid_inp">
                        <label htmlFor="userSelect">Select User:</label>
                        <select 
                            id="userSelect" 
                            onChange={(e) => setSelectedUserId(e.target.value)} 
                            value={selectedUserId}
                        >
                            <option value="" disabled>Select a user</option>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No users available</option>
                            )}
                        </select>
                        {errors.userId && <span className="error">{errors.userId}</span>}
                    </div>

                    <button className="pop_order_submit_btn" onClick={handleAddToTask}>Complete</button>
                </div>
            </div>
        </section>
    );
};

export default AddToTheme;
