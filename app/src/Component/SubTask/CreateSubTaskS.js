import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateSubTask = ({ onClose }) => {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState({});
    const { id } = useParams(); 

    useEffect(() => {
        const storedUserId = localStorage.getItem("UserId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('Local saxlamada UserId tapılmadı');
        }
    }, []);


    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const fetchNew = async () => {
        try {
            const res = await axios.post(`https://localhost:7146/api/SubTask`, {
                name: name,
                priority: priority,
                userId: userId,
                taskId: id
            });

            console.log("Alt tapşırıq müvəffəqiyyətlə yaradıldı", res.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Alt tapşırıq yaradılarkən xəta:", error.response.data.errors);
            setErrors(error.response.data.errors);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Alt Tapşırığı Yarat</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <label htmlFor="name">Ad</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ad"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.Name && <span className="error">{errors.Name[0]}</span>} 
                    </div>

                    <div className="pop_order_mid_inp">
                        <label htmlFor="priority">Prioritet</label>
                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                            <option value="" disabled>Prioritet seçin</option>
                            <option value="Aşağı">Aşağı</option>
                            <option value="Orta">Orta</option>
                            <option value="Yüksək">Yüksək</option>
                        </select>
                        {errors.Priority && <span className="error">{errors.Priority[0]}</span>} 
                    </div>

                    <button className="pop_order_submit_btn" onClick={fetchNew}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default CreateSubTask;
