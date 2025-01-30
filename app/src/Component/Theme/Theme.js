import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateChanal from './CreateTheme';
import RemoveChanal from './RemoveTheme';
import EditChanal from './EditTheme';
import GetThemeByUser from '../UserTheme/GetUsersByTheme';
import { jwtDecode } from 'jwt-decode'; 

const Chanal = () => {
    const [data, setData] = useState([]);
    const [isUserKanalOpen, setIsUserKanalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [channelToRemove, setChannelToRemove] = useState(null);
    const [activeGearChannel, setActiveGearChannel] = useState(null);
    const location = useLocation();
    const [isEditChanalOpen, setIsEditChanalOpen] = useState(false);
    const [channelToEdit, setChannelToEdit] = useState(null);

    const [isCreateChanalOpen, setIsCreateChanalOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('JWT');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;
                const response = await axios.get(`https://localhost:7146/api/Theme?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }
                });
                console.log(response.data.data)
                setData(response.data.data || []);
            } catch (error) {
                console.error('Error fetching channels:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);    

    return (
        <div className="sidebar__channels">
            <div className="sidebar__channels-header">
                <p>Layiheler</p>
                <button className="sidebar__add-channel-btn" onClick={() => setIsCreateChanalOpen(true) }>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            {data.map((channel) => (
                <div key={channel.id} className="sidebar__menu-item-wrapper">
                    <div onClick={() => navigate(`/Theme/${channel.id}/Task`)} className={`sidebar__menu-item ${location.pathname.includes(`/Theme/${channel.id}`) ? 'active' : ''}` }>
                        <div className="sidebar__menu-item-one">
                            <i class="fa-solid fa-list-check"></i>
                            <p>{channel.name}</p>
                        </div>
                        <div className="sidebar__menu-item-one">
                                <i
                                    className={`fa-solid fa-gear ${activeGearChannel === channel.id ? 'gear-spin' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveGearChannel(prev => (prev === channel.id ? null : channel.id));
                                    }}
                                ></i>
                        </div>
                    </div>
                    {activeGearChannel === channel.id && (
                        <div className="gear-div">
                            <button className="gear-div__button" onClick={(e) => { e.stopPropagation(); setIsRemoveModalOpen(true); setChannelToRemove(channel.id); }}>Kanalı Sil</button>
                            <button  className="gear-div__button"  onClick={(e) => {  e.stopPropagation();  setIsUserKanalOpen(true);  setChannelToRemove(channel.id);}}>Kanal Ayarları</button>                        
                        </div>
                    )}
                </div>
            ))}

            {isCreateChanalOpen && <CreateChanal close={() => setIsCreateChanalOpen(false)} />}
            {isUserKanalOpen && <GetThemeByUser close={() => setIsUserKanalOpen(false)} id={channelToRemove} />}
            {isRemoveModalOpen && <RemoveChanal close={() => setIsRemoveModalOpen(false)} id={channelToRemove} />}
            {isEditChanalOpen && <EditChanal close={() => setIsEditChanalOpen(false)} kanalId={channelToEdit} />}
        </div>
    );
};

export default Chanal;
