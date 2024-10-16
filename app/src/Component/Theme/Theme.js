import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RemoveTheme from './RemoveTheme';
import CreateTheme from './CreateTheme'; 
import { Link } from 'react-router-dom';

const Theme = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [themeToRemove, setThemeToRemove] = useState(null);
    const [isCreatingTheme, setIsCreatingTheme] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("UserId"); 
        if (storedUserId) {
            setUserId(storedUserId); 
        } else {
            console.error('Yerli saxlama daxilində UserId tapılmadı');
        }
    }, []);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchThemes = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`http://test.loc/api/Theme/userId/${userId}`);
                    setData(res.data.data || []);
                } catch (error) {
                    console.error('Layihələri əldə edərkən xəta:', error);
                }
            }
        };
        fetchThemes();
    }, [userId]);

    const handleRemove = (id) => {
        setThemeToRemove(id);
        setIsPopupOpen(true);
    };

    const handleAddTheme = () => {
        setIsCreatingTheme(true);
        setIsPopupOpen(true);
    };

    return (
        <div className="header-themes">
            <div className="header-themes-name">
                <p>Themes</p>
                <button onClick={handleAddTheme}>+</button>
            </div>
            {data.map((theme) => (
                <Link to={`/Theme/${theme.id}/Task`} key={theme.id} className="header-themes-one">
                    <div className="header-themes-one-left">
                        <i className="fa-solid fa-clipboard"></i>
                        <p>{theme.name}</p>
                    </div>
                    <div className="header-themes-one-right">
                        <i className="fa-regular fa-trash-can" onClick={() => handleRemove(theme.id)}></i>
                    </div>
                </Link>
            ))}
            {isPopupOpen && isCreatingTheme && (
                <CreateTheme onClose={() => setIsPopupOpen(false)} setData={setData} />
            )}
            {isPopupOpen && themeToRemove && (
                <RemoveTheme onClose={() => setIsPopupOpen(false)} themeId={themeToRemove} setData={setData} />
            )}
        </div>
    );
};

export default Theme;
