import React, { useState } from 'react';
import axios from 'axios';
// import Photo from '../Photos/Cancel.svg';

const ChangeEmail = ({ onClose, userId }) => {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errors, setErrors] = useState({}); 

    const chgEmail = async () => {
        setErrors({}); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

        try {
            const res = await axios.put(`https://localhost:7146/api/Admin/${userId}/ChangeEmail`, {
                oldEmail,
                newEmail
            });
            setOldEmail('');
            setNewEmail('');
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } 
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>E-poçtu Dəyişdir</p>
                    </div>
                    <div className="pop_order_nav_right">
                        {/* <button onClick={onClose}><img src={Photo} alt="Bağla" /></button> */}
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    {errors.general && <p className="error" style={{ color: 'red' }}>{errors.general}</p>} 

                    <div className="pop_order_mid_inp">
                        <label htmlFor="oldEmail">Keçmiş E-poçt</label>
                        <input 
                            type="text" 
                            id="oldEmail"
                            placeholder="Keçmiş E-poçt" 
                            value={oldEmail} 
                            onChange={(e) => setOldEmail(e.target.value)} 
                        />
                        {errors.OldEmail && <span className="error">{errors.OldEmail[0]}</span>}
                    </div>

                    <div className="pop_order_mid_inp">
                        <label htmlFor="newEmail">Yeni E-poçt</label>
                        <input 
                            type="text" 
                            id="newEmail"
                            placeholder="Yeni E-poçt" 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} 
                        />
                        {errors.NewEmail && <span className="error">{errors.NewEmail[0]}</span>} 
                    </div>

                    <div className="pop_order_main_footer">
                        <button className='pop_order_submit_btn' onClick={chgEmail}>Tamam</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeEmail;
