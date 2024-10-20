import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GetThemeByUser = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const location = useLocation();
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchThemes = async () => {
            const storedUserId = localStorage.getItem("UserId");
            console.log("UserId", storedUserId);
            if (storedUserId) {
                setUserId(storedUserId);
                try {
                    const res = await axios.get(`https://localhost:7146/api/UserTheme/User/${storedUserId}/Theme`);
                    console.log(res.data.data);
                    setData(res.data.data || []);

                    const userRes = await axios.get(`https://localhost:7146/api/User/${storedUserId}`);
                    console.log(userRes);
                    setUserName(userRes.data.data.userName);

                } catch (error) {
                    console.error('Temaların alınmasında səhv:', error);
                }
            } else {
                console.error('UserId yerli saxlamada tapılmadı');
            }
        };

        fetchThemes();
    }, []);

    return (
        <div className="header-themes">
            <div className="header-themes-name">
                <p>Mövzulara əlavə edilib</p>
            </div>
            {data.map((theme) => (
                <Link 
                    to={`/Theme/${theme.id}/Task`} 
                    key={theme.id} 
                    className={`header-themes-one ${location.pathname === `/Theme/${theme.id}/Task` ? 'active' : ''}`} 
                >
                    <div className="header-themes-one-left">
                        <i className="fa-solid fa-clipboard"></i>
                        <p>{theme.name} ({userName})</p>
                    </div>
                    <div className="header-themes-one-right">
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GetThemeByUser;
