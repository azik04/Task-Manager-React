import React from 'react';
import axios from 'axios';

const RemoveUserTheme = ({ close, id }) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const removeUserChannel = async () => {
        try {
            console.log("Removing user with ID:", id); // Log to ensure correct ID
            if (!id) {
                console.error("Error: User ID is undefined");
                return;
            }

            const res = await axios.delete(`https://localhost:7146/api/UserTheme/${id}`);
            console.log("User Removed successfully", res);
            window.location.reload(); 
            close();  
        } catch (error) {
            console.error("Error deleting user from channel:", error);
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Remove User from Channel</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <p>Are you sure you want to remove this user from the channel?</p>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>No</button>
                    <button className="submit-btn" onClick={removeUserChannel}>Yes</button>
                </div>
            </div>
        </section>
    );
};

export default RemoveUserTheme;
