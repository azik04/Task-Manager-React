import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errors, setErrors] = useState({});

    const createUser = async () => {
        setErrors({});
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const response = await axios.post('https://localhost:7146/api/User/register', {
                email,
                password,
                userName
            });
            onClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
            if (error.response) {
                const { data } = error.response;
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.description) {
                    setErrors({ general: data.description });
                }
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>İstifadəçi Yarat</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
                    <div className="pop_order_mid_inp">
                        <label htmlFor="userName">İstifadəçi Adı</label>
                        <input type="text" id="userName" placeholder="İstifadəçi Adı" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        {errors.UserName && <span className="error">{errors.UserName[0]}</span>}
                    </div>

                    <div className="pop_order_mid_inp">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.Email && <span className="error">{errors.Email[0]}</span>}
                    </div>

                    <div className="pop_order_mid_inp">
                        <label htmlFor="password">Şifrə</label>
                        <input type="text" id="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.Password && <span className="error">{errors.Password[0]}</span>}
                    </div>

                    <button className="pop_order_submit_btn" onClick={createUser}>Tamamla</button>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
