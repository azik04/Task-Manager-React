import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import ChangeRole from './ChangeRole'; 
import RemoveUser from './RemoveUser';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isChangeEmailOpen, setChangeEmailOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const [isChangeRoleOpen, setChangeRoleOpen] = useState(false); 
    const [isRemoveUserOpen, setRemoveUserOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
        
        const fetchUsers = async () => {
            try {
                const userRes = await axios.get('https://localhost:7146/api/Admin/User');
                setUsers(userRes.data.data || []);
            } catch (error) {
                console.error('İstifadəçilərin alınmasında səhv:', error);
            }
        };
        fetchUsers();
    }, []);

    const toggleChangeEmail = () => setChangeEmailOpen(!isChangeEmailOpen);
    const toggleChangePassword = () => setChangePasswordOpen(!isChangePasswordOpen);
    const toggleChangeRole = () => setChangeRoleOpen(!isChangeRoleOpen); 
    const toggleRemoveUser = () => setRemoveUserOpen(!isRemoveUserOpen);

    return (
        <div className="more_one">
            <div className="more_one_name">
                <h2>İstifadəçilər</h2>
            </div>

            {isChangeEmailOpen && <ChangeEmail onClose={toggleChangeEmail} userId={currentUserId} />}
            {isChangePasswordOpen && <ChangePassword onClose={toggleChangePassword} userId={currentUserId} />}
            {isChangeRoleOpen && <ChangeRole onClose={toggleChangeRole} userId={currentUserId} />} 
            {isRemoveUserOpen && <RemoveUser onClose={toggleRemoveUser} userId={currentUserId} />}

            <table>
                <thead>
                    <tr>
                        <th className="tr_task">İstifadəçi Adı</th>
                        <th className="tr_owner">İstifadəçi E-poçtu</th>
                        <th className="tr_status">E-poçtu Dəyiş</th>
                        <th className="tr_psw">Şifrəni Dəyiş</th>
                        <th className="tr_role">Rolu Dəyiş</th> 
                        <th className="tr_dlt">Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="tr_task">{user.userName}</td>
                            <td className="tr_owner">{user.email}</td>
                            <td className="tr_status">
                                <button onClick={() => { setCurrentUserId(user.id); toggleChangeEmail(); }}>
                                    E-poçtu Dəyiş
                                </button>
                            </td>
                            <td className="tr_psw">
                                <button onClick={() => { setCurrentUserId(user.id); toggleChangePassword(); }}>Şifrəni Dəyiş</button>
                            </td>
                            <td className="tr_role">
                                <button onClick={() => { setCurrentUserId(user.id); toggleChangeRole(); }}>Rolu Dəyiş</button>
                            </td>
                            <td className="tr_dlt">
                                <i className="fa-regular fa-trash-can delete-icon" onClick={() => { setCurrentUserId(user.id); toggleRemoveUser(); }}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
