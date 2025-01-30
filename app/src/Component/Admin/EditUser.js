import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const EditUser = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('JWT');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;
                const response = await axios.get(`https://localhost:7146/api/User/${userId}`);

                if (response.data.data?.fullName) {
                    const nameParts = response.data.data.fullName.split(' ');
                    setFirstName(nameParts[0] || ''); 
                    setLastName(nameParts[1] || '');  
                }
                setEmail(response.data.data.email || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchPost = async () => {
        try {
            const token = localStorage.getItem('JWT');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?.UserId;
            const Data = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
            };

            await axios.put(`https://localhost:7146/api/User/${userId}`, Data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
            setErrors(error.response?.data?.errors || {});
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Edit User</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <span className={`errors ${errors?.FirstName ? 'visible' : ''}`}>
                                {errors?.FirstName}
                            </span>
                        </div>
                        <div className="input-half">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <span className={`errors ${errors?.LastName ? 'visible' : ''}`}>
                                {errors?.LastName}
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className={`errors ${errors?.Email ? 'visible' : ''}`}>
                                {errors?.Email}
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

export default EditUser;