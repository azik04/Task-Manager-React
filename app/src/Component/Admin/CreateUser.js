import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState({});

    const fetchPost = async () => {
        setErrors({});
        try {
            const Data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
    
            console.log('Sending commentData:', Data);
    
            const response = await axios.post(`https://localhost:7146/api/Admin/Register`, Data);
            console.log('Response:', response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error posting comment:', error.response.data.errors);
            setErrors(error.response.data.errors)
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create User</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="channel-name">FirstName</label>
                            <input
                                type="text"
                                id="channel-name"
                                placeholder="FirstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                              <span className={`errors ${error?.FirstName?.[0] ? 'visible' : ''}`}>
                                {error?.FirstName?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="channel-name">LastName</label>
                            <input
                                type="text"
                                id="channel-name"
                                placeholder="LastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <span className={`errors ${error?.LastName?.[0] ? 'visible' : ''}`}>
                                {error?.LastName?.[0]}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="channel-name">Email</label>
                            <input
                                type="text"
                                id="channel-name"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className={`errors ${error?.Email?.[0] ? 'visible' : ''}`}>
                                {error?.Email?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="channel-name">Password</label>
                            <input
                                type="text"
                                id="channel-name"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className={`errors ${error?.Password?.[0] ? 'visible' : ''}`}>
                                {error?.Password?.[0]}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit-btn" onClick={fetchPost}>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
