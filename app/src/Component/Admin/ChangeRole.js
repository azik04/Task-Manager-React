import React, { useState } from 'react';
import axios from 'axios';

const ChangeRole = ({ onClose, userId }) => {
    const [role, setRole] = useState('');

    const handleRoleChange = async () => {
        try {
            const response = await axios.put(`https://localhost:7146/api/Admin/${userId}/ChangeRole`, {
                role: parseInt(role),
            });
            console.log(response.data);
            onClose(); // Close the popup
            window.location.reload(); // Reload the page to reflect changes
        } catch (error) {
            console.error('Error changing role:', error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Change User Role</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
                <div className="input-group">
                        <div className="input-half">
                        <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                        </div>
                    </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={handleRoleChange}>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChangeRole;
