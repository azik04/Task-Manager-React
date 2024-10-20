import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RemoveUserFromTheme from './RemoveUserTheme';

const GetUsersByTheme = ({ onClose, themeId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showRemovePopup, setShowRemovePopup] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/UserTheme/Theme/${themeId}/Users`);
                console.log(res.data.data);
                setUsers(res.data.data || []);
            } catch (error) {
                console.error('İstifadəçiləri əldə edərkən xəta:', error);
            }
        };

        fetchUsers();
    }, [themeId]);

    const handleOpenRemovePopup = (userId) => {
        setSelectedUserId(userId);
        setShowRemovePopup(true);
    };

    const handleCloseRemovePopup = () => {
        setShowRemovePopup(false);
        setSelectedUserId('');
    };

    const handleUserRemoved = (id) => {
        setUsers(users.filter(user => user.id !== id)); 
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Layihədə İstifadəçilər</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className='pop_order_mid_user'>
                                    <p>{user.userName}</p>
                                    <i
                                        className="fa-regular fa-trash-can delete-icon"
                                        onClick={() => handleOpenRemovePopup(user.id)}
                                    ></i>
                                </div>
                            ))
                        ) : (
                            <p>İstifadəçi yoxdur</p>
                        )}
                    </div>
                </div>
            </div>

            {showRemovePopup && (
                <RemoveUserFromTheme
                    onClose={handleCloseRemovePopup}
                    id={selectedUserId}
                    onUserRemoved={handleUserRemoved}
                />
            )}
        </section>
    );
};

export default GetUsersByTheme;
