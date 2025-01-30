import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUserKanal from "./AddToTheme";
import RemoveUserKanal from "./RemoveUserTheme";

const GetUsersByTheme = ({ close, id }) => {
    const [userTask, setUserTask] = useState([]);
    const [showCreateUserKanal, setShowCreateUserKanal] = useState(false);
    const [showRemoveUserKanal, setShowRemoveUserKanal] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null); 

    useEffect(() => {
        const fetchUserKanal = async () => {
            try {
                console.log(id)
                const res = await axios.get(`https://localhost:7146/api/UserTheme/Theme/${id}/Users`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
                });
                console.log("Fetch Users in Channel", res.data.data);
                setUserTask(res.data.data || []);
            } catch (error) {
                console.error("Error fetching users for channel:", error);
            }
        };

        fetchUserKanal();
    }, [id]);

    const handleRemoveUser = (userId) => {
        setUserToRemove(userId);
        setShowRemoveUserKanal(true);
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Kanal Ayarlrı</h3>
                    <i className="fa-solid fa-xmark close-icon" onClick={close}></i>
                </div>
                <div className="popup-user-header">
                    <h4>Kanalda İstifadəçilər</h4>
                    <button className="add-btn" onClick={() => setShowCreateUserKanal(true)}>Kanala Əlavə Et</button>
                </div>
                <div className="popup-users">
                    <div className="popup-users-main header">
                        <p>İstifadəçi Adı</p>
                        <p>Əməliyyatlar</p>
                    </div>
                    {userTask.map((user, index) => (
                        <div key={index} className="popup-users-main">
                            <p>{user.userName}</p>
                            <button 
                                className="remove-btn"
                                onClick={() => handleRemoveUser(user.id)} // Pass the user id here
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Bağla</button>
                </div>
            </div>

            {showCreateUserKanal && (
                <CreateUserKanal close={() => setShowCreateUserKanal(false)} kanalId={id}/>
            )}

            {showRemoveUserKanal && userToRemove && (
                <RemoveUserKanal close={() => setShowRemoveUserKanal(false)} id={userToRemove} kanalId={id} />
            )}
        </section>
    );
};

export default GetUsersByTheme;
