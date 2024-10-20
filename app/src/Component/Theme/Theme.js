import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTheme from './CreateTheme';
import AddToTheme from '../UserTheme/AddToTheme'; // AddToTheme-ni idxal edin
import RemoveTheme from './RemoveTheme'; // RemoveTheme-ni idxal edin
import GetUsersByTheme from '../UserTheme/GetUsersByTheme'; // GetUsersByTheme-ni idxal edin
import { Link, useLocation } from 'react-router-dom';

const Theme = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [activePopup, setActivePopup] = useState(null); // Aktiv pop-upı idarə et
    const [gearDivPosition, setGearDivPosition] = useState(null);
    const [themeToRemove, setThemeToRemove] = useState(null); // Silinəcək mövzu üçün vəziyyət əlavə edin
    const location = useLocation();

    useEffect(() => {
        const fetchThemes = async () => {
            const storedUserId = localStorage.getItem("UserId");
            if (storedUserId) {
                setUserId(storedUserId);
                try {
                    const res = await axios.get(`https://localhost:7146/api/Theme/User/${storedUserId}`);
                    setData(res.data.data || []);
                } catch (error) {
                    console.error('Mövzuları əldə edərkən xəta:', error);
                }
            } else {
                console.error('Local storage-da UserId tapılmadı');
            }
        };

        fetchThemes();
    }, []);

    const handleAddTheme = () => {
        setActivePopup('create'); // Aktiv pop-upı CreateTheme olaraq təyin et
    };

    const handleAddUserToTheme = (themeId) => {
        setThemeToRemove(themeId); // Seçilmiş mövzu ID-sini təyin et
        setActivePopup('addUser'); // Aktiv pop-upı AddToTheme olaraq təyin et
    };

    const handleRemoveUserFromTheme = (themeId) => {
        setThemeToRemove(themeId); // Seçilmiş mövzu ID-sini təyin et
        setActivePopup('removeUser'); // Aktiv pop-upı GetUsersByTheme olaraq təyin et
    };

    // Gear ikonuna klik edərkən idarə et
    const handleGearClick = (event, themeId) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offset = 100;

        // Eyni mövzu üçün gear seçimləri açıqdırsa, bağlayın
        if (themeToRemove === themeId && gearDivPosition) {
            setGearDivPosition(null); // Gear seçimlərini bağlayın
            setThemeToRemove(null); // Seçilmiş mövzunu təmizləyin
        } else {
            // Kliklənmiş mövzu üçün gear seçimlərini açın
            setGearDivPosition({
                top: rect.bottom + window.scrollY - offset,
                left: rect.left + window.scrollX + 30
            });
            setThemeToRemove(themeId); // Seçilmiş mövzu ID-sini təyin et
        }
    };

    const closePopup = () => {
        setActivePopup(null); // Bütün pop-upları bağlayın
        setGearDivPosition(null); // Gear seçimlərini bağlayın
        setThemeToRemove(null); // Seçilmiş mövzunu təmizləyin
    };

    const handleRemoveTheme = () => {
        setActivePopup('remove'); // Aktiv pop-upı RemoveTheme olaraq təyin et
    };

    return (
        <div className="header-themes">
            <div className="header-themes-name">
                <p>Mövzular</p>
                <button onClick={handleAddTheme}>+</button>
            </div>
            {data.map((theme) => (
                <Link
                    to={`/Theme/${theme.id}/Task`}
                    key={theme.id}
                    className={`header-themes-one ${location.pathname === `/Theme/${theme.id}/Task` ? 'active' : ''}`}
                >
                    <div className="header-themes-one-left">
                        <i className="fa-solid fa-clipboard"></i>
                        <p>{theme.name}</p>
                    </div>
                    <div className="header-themes-one-right">
                        <i className="fa-solid fa-gear" onClick={(e) => handleGearClick(e, theme.id)}></i>
                    </div>
                </Link>
            ))}

            {activePopup === 'create' && (
                <CreateTheme onClose={closePopup} setData={setData} />
            )}
            {activePopup === 'addUser' && (
                <AddToTheme onClose={closePopup} themeId={themeToRemove} />
            )}
            {activePopup === 'remove' && (
                <RemoveTheme onClose={closePopup} themeId={themeToRemove} setData={setData} />
            )}
            {activePopup === 'removeUser' && (
                <GetUsersByTheme onClose={closePopup} themeId={themeToRemove} />
            )}

            {gearDivPosition && (
                <div
                    className="gear-div"
                    style={{
                        top: `${gearDivPosition.top}px`,
                        left: `${gearDivPosition.left}px`,
                        position: 'absolute'
                    }}>
                    <button onClick={() => handleAddUserToTheme(themeToRemove)}>Mövzuya İstifadəçi Əlavə Et</button>
                    <button onClick={() => handleRemoveUserFromTheme(themeToRemove)}>Mövzudakı İstifadəçilər</button>
                    <button onClick={handleRemoveTheme}>Mövzunu Sil</button>
                </div>
            )}
        </div>
    );
};

export default Theme;
