import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateSubTask from './CreateSubTaskS';
import RemoveSubTask from './RemoveSubTask';

const SubTask = () => {
    const [items, setItems] = useState([]);
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const { id } = useParams();
    const [userNames, setUserNames] = useState({}); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/SubTask/${id}/NotDone`);
                setItems(res.data.data || []);
                console.log(res.data.data);
                // Call fetchUserNames here
                fetchUserNames(res.data.data || []);
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData();
    }, [id]);

    const fetchUserNames = async (comments) => {
        const userIds = [...new Set(comments.map(comment => comment.userId))];

        if (userIds.length === 0) {
            console.log("İstifadəçi ID-ləri tapılmadı.");
            return; 
        }

        const userMap = {};

        await Promise.all(userIds.map(async (userId) => {
            try {
                const response = await axios.get(`https://localhost:7146/api/User/${userId}`);
                userMap[userId] = response.data.data.userName; 
            } catch (error) {
                console.error(`İstifadəçi ID ${userId}-ni alarkən xəta baş verdi:`, error);
            }
        }));

        setUserNames(userMap); 
    };

    const openCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopup = () => {
        setCreatePopupVisible(false);
    };

    const openRemovePopup = (subtaskId) => {
        setRemoveId(subtaskId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className='subTask_one'>
            <div className="pop_order_nav_right">
                {/* Optionally, you can place additional elements here */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th className='tr_task'>SubTask</th>
                        <th>Prioritet</th>
                        <th className='tr_deadline'>Created by</th>
                        <th className='add_sub'>
                            <i className="fa-solid fa-plus" onClick={openCreatePopup}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="4">No SubTasks available</td>
                        </tr>
                    ) : (
                        items.map(subtask => (
                            <tr key={subtask.id}>
                                <td className='tr_task'>{subtask.name}</td>
                                <td>{subtask.priority || 'Unknown'}</td>
                                <td className='tr_deadline'>{userNames[subtask.userId] || 'Yüklənir...'}</td>
                                <td className='add_sub'>
                                    <i className="fa-regular fa-trash-can delete-icon" onClick={() => openRemovePopup(subtask.id)} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {isCreatePopupVisible && <CreateSubTask onClose={closeCreatePopup} />}
            {isRemovePopupVisible && removeId !== null && <RemoveSubTask onClose={closeRemovePopup} subtaskId={removeId} />}
        </div>
    );
};

export default SubTask;
