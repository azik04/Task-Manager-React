import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RemoveUser from './RemoveUser';
import CreateUser from './CreateUser';
import ChangeRole from './ChangeRole';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isChangeRoleOpen, setChangeRoleOpen] = useState(false);
    const [isRemoveUserOpen, setRemoveUserOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;
        const fetchAdmins = async () => {
            try {
                const adminRes = await axios.get('https://localhost:7146/api/Admin/Admins');
                setAdmins(adminRes.data.data || []);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };
        fetchAdmins();
    }, []);

    const togglePopup = () => setPopupOpen(!isPopupOpen);
    const toggleChangeRole = () => setChangeRoleOpen(!isChangeRoleOpen);
    const toggleRemoveUser = () => setRemoveUserOpen(!isRemoveUserOpen);

    return (
        <div className="more_one">
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Adminlər</h2>
                </div>
                <button className="more_one_name_btn" onClick={togglePopup}>
                    <p>Istifadəçi yarat</p>
                    <i className="fa-solid fa-user-plus"></i>
                </button>
            </div>

            {isPopupOpen && <CreateUser onClose={togglePopup} />}
            {isRemoveUserOpen && <RemoveUser onClose={toggleRemoveUser} userId={currentUserId} />}
            {isChangeRoleOpen && <ChangeRole onClose={toggleChangeRole} userId={currentUserId} />}

            <table>
                <thead>
                    <tr className="tr-header">
                        <th className="tr_owner">İstifadəçi Adı</th>
                        <th className="tr_owner">İstifadəçi E-poçtu</th>
                        <th className="tr_owner">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((user) => (
                        <tr key={user.id}>
                            <td className="tr_owner">{user.fullName}</td>
                            <td className="tr_owner">{user.email}</td>
                            <td className="tr_user">
                                <div className="tr_user_all">
                                    <button onClick={() => { setCurrentUserId(user.id); toggleChangeRole(); }}>
                                        Change Role <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={() => { setCurrentUserId(user.id); toggleRemoveUser(); }}>
                                        Remove <i className="fa-regular fa-trash-can delete-icon"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admins;
