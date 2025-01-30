import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

const CreateTheme = ({ close }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState({}); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    const crtChanal = async () => {
        try {
            const token = localStorage.getItem('JWT');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.UserId;
            console.log(userId)
            const res = await axios.post('https://localhost:7146/api/Theme', {
                name: name,
                createdBy : userId
            });
            console.log("Channel Created:", res);
            window.location.reload();
            close();
        } catch (error) {
            console.error('Error creating channel:', error.response?.data?.errors);
            setError(error.response?.data?.errors || {});
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container-rem">
                <div className="popup-header">
                    <h3>Create Channel</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="channel-name">Channel Name</label>
                            <input 
                                type="text" 
                                id="channel-name" 
                                placeholder="Enter Channel Name" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <span className={`errors ${error?.Name?.[0] ? 'visible' : ''}`}>
                                {error?.Name?.[0]}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>Cancel</button>
                    <button className="submit-btn" onClick={crtChanal}>Submit</button>
                </div>
            </div>
        </section>
    );
};

export default CreateTheme;
