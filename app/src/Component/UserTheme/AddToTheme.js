import React, { useState, useEffect } from "react";
import axios from "axios";

const AddToTheme = ({ close, kanalId }) => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState([]);

    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://localhost:7146/api/Admin/User");
                console.log(res.data.data)
                setData(res.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const addToChannel = async () => {
        try {
            const payload = {
                themeId: Number(kanalId), 
                userId: Number(userId),
            };
            console.log("Payload being sent:", payload);
    
            const res = await axios.post("https://localhost:7146/api/UserTheme", payload);
            console.log("User added to theme successfully:", res.data);
    
            window.location.reload();
            close();
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
        }
    };
    
    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>İstifadəçini Kanala Əlavə Et</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <select onChange={(e) => setUserId(e.target.value)} value={userId}>
                        <option value="">Select a User</option>
                        {data.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        İmtina Et
                    </button>
                    <button className="submit-btn" onClick={addToChannel}>
                        Əlavə Et
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AddToTheme;
