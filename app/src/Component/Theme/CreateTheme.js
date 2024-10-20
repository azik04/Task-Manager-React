import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTheme = ({ onClose }) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState([]);

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
        setErrors([]);
        if (!name.trim()) {
            setErrors(['Mövzu adı tələb olunur.']);
            return;
        }
        try {
            const res = await axios.post(`https://localhost:7146/api/Theme`, {
                name,
                userId
            });
            console.log("Mövzu müvəffəqiyyətlə yaradıldı", res.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Mövzu yaradılarkən xəta:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors.Name || ['Mövzu yaradılarkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.']);
            } else {
                setErrors(['Mövzu yaradılarkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.']);
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Layihəni Yarat</p>
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
                            placeholder="Mövzu adı"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                             {errors.map((error, index) => (
                                <span key={index} style={{ color: 'red' ,  fontSize: "13px"  }}>{error}</span>
                            ))}
                    </div>

                    <button className="pop_order_submit_btn" onClick={fetchNew}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default CreateTheme;
