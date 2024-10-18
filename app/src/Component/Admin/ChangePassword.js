import React, { useState } from 'react';
import axios from 'axios';
// import Photo from '../Photos/Cancel.svg';

const ChangePassword = ({ onClose, userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    const chgPsw = async () => {
        setErrors({});
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`https://localhost:7146/api/User/ChangePassword?id=${userId}`, {
                oldPassword: currentPassword,
                newPassword: newPassword
            });
            console.log("Yeniləndi", res);
            if (res.status === 200) {
                onClose();
                window.location.reload();
            } else {
                setErrors({ general: res.data.description || 'Şifrəni dəyişərkən xəta baş verdi.' });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Gözlənilməz xəta baş verdi.' });
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <h2>Şifrəni Dəyişdir</h2>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>
                <div className="pop_order_mid">
                    {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>} 
                    <div className="pop_order_mid_inp">
                        <label htmlFor="currentPassword">Hazırki Şifrə</label>
                        <input
                            type="password"
                            id="currentPassword"
                            placeholder="Hazırki Şifrə"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        {errors.OldPassword && <span className="error">{errors.OldPassword[0]}</span>}
                    </div>
                    <div className="pop_order_mid_inp">
                        <label htmlFor="newPassword">Yeni Şifrə</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Yeni Şifrə"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.NewPassword && <span className="error">{errors.NewPassword[0]}</span>} 
                    </div>
                    <div className="pop_order_mid_footer">
                        <button className='pop_order_submit_btn' onClick={chgPsw}>Tamam</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
