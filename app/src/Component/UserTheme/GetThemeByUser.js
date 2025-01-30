import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';

const GetThemeByUser = () => {
    const [data, setData] = useState([]);
    const location = useLocation(); 
    const navigate = useNavigate();
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const token = localStorage.getItem('JWT');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;

                const response = await axios.get(`https://localhost:7146/api/UserTheme/User/${userId}/Theme`);
                console.log(response)
                setData(response.data.data);
                console.log("tasks by user", response.data.data);
            } catch (error) {
                console.error('Temaların alınmasında səhv:', error);
            }
        };

        fetchThemes();
    }, []);

    return (
        <div className="sidebar__channels">

               {data.map((channel) => (
                <div key={channel.id} className="sidebar__menu-item-wrapper">
                    <div onClick={() => navigate(`/Theme/${channel.themeId}/Task`)} className={`sidebar__menu-item ${location.pathname.includes(`/Theme/${channel.id}`) ? 'active' : ''}` }>
                        <div className="sidebar__menu-item-one">
                            <i class="fa-solid fa-list-check"></i>
                            <p>{channel.themeName}  ({channel.createdBy})</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
    );
};

export default GetThemeByUser;
