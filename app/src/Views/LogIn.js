import React, { useState } from 'react'; 
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import Photo from '../Photos/MXM_ADRA_Logotype_January_2018_Color.png';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [user, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const fetchPost = async () => {
        setError('');
        setErrors({}); 

        try {
            const res = await axios.post(`https://localhost:7146/api/User/login`, {
                userName: user,
                password: password
            }, { withCredentials: true });

            console.log('Cavab:', res.data); 

            if (res.data.statusCode === 200) {
                const token = res.data.data; 
                localStorage.setItem("JWT", token);

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.UserId; 

                localStorage.setItem("UserId", userId);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

                console.log('Giriş müvəffəqiyyətlidir');
                navigate(`/Theme`);
            } else {
                setError(res.data.Description || 'Giriş alınmadı.'); 
            }
        } catch (error) {
            console.error('Giriş alınmadı', error.response);
            const errorMessage = error.response?.data?.description ;
            setError(errorMessage);

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <section className="auth">
            <div className="auth_main">
                <div className="auth_main_header">
                    <img src={Photo} alt="Logo" />
                </div>
                <div className="auth_main_sect">
                    <h2>Task Manager</h2>
                    <p>Log In</p>
                    {error && <div className="error">{error}</div>}
                    <div className="login-right-main-inp">
                        <input 
                            type="text" 
                            placeholder="User Name" 
                            value={user}
                            onChange={(e) => setUserName(e.target.value)} 
                            required
                        />
                        {errors.UserName && <span className='error'>{errors.UserName[0]}</span>} 
                    </div>
                    <div className="login-right-main-inp">
                        <input 
                            type="text" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        {errors.Password && <span className='error'>{errors.Password[0]}</span>} 
                    </div>
                </div>
                <div className="auth_main_footer">
                    <button onClick={fetchPost}>Log In</button>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
