import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import CreateTask from './CreateTask'; // Yolunuzu lazımi olaraq düzəldin

const NotDoneTasks = () => {
    const [notDoneTasks, setNotDoneTasks] = useState([]);
    const [userNames, setUserNames] = useState({});
    const { themeId } = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/NotDone?themeId=${themeId}`);
                setNotDoneTasks(res.data.data);
                fetchUserNames(res.data.data);
            } catch (error) {
                console.error('Tamamlanmamış tapşırıqları alarkən xəta:', error);
            }
        };
        fetchTasks();
    }, [themeId]);

    const fetchUserNames = async (tasks) => {
        const userIds = [...new Set(tasks.map(task => task.executiveUserId))];

        if (userIds.length === 0) {
            console.log("İstifadəçi ID-ləri tapılmadı.");
            return;
        }

        const userMap = {};
        await Promise.all(userIds.map(async (id) => {
            try {
                const response = await axios.get(`https://localhost:7146/api/User/${id}`);
                userMap[id] = response.data.data;
            } catch (error) {
                console.error(`İstifadəçi ID ${id} alınarkən xəta baş verdi:`, error);
            }
        }));

        setUserNames(userMap);
    };

    const completeTask = async (id) => {
        try {
            const res = await axios.put(`https://localhost:7146/api/Task/${id}/Complite`);
            console.log('Tapşırıq tamamlandı:', res.data);
            setNotDoneTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            window.location.reload();
        } catch (error) {
            console.error('Tapşırığı tamamlarkən xəta:', error.response ? error.response.data : error.message);
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    return (
        <div className="more_one">
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Görüləcək</h2>
                </div>
                <button className="more_one_name_btn" onClick={togglePopup}>
                    <p>Tapşırıq Yarat</p>
                    <i className="fa-solid fa-thumbtack"></i>
                </button>
            </div>

            {isPopupOpen && <CreateTask onClose={togglePopup} />}

            <table>
                <thead>
                    <tr>
                        <th className="tr_notdone"></th>
                        <th className="tr_task">Tapşırıq</th>
                        <th className="tr_owner">Sahib</th>
                        <th className="tr_status">Status</th>
                        <th className="tr_priority">Prioritet</th>
                        <th className="tr_deadline">Son Tarix</th>
                        <th className="tr_more"></th>
                    </tr>
                </thead>
                <tbody>
                    {notDoneTasks.map(task => (
                        <tr key={task.id}>
                            <td className="tr_notdone">
                                <i className="fa-solid fa-circle-check" onClick={() => completeTask(task.id)}></i>
                            </td>
                            <td className="tr_task">{task.taskName}</td>
                            <td className="tr_owner">{userNames[task.executiveUserId]?.userName || 'Naməlum'}</td>
                            <td className="tr_status">{task.status}</td>
                            <td className="tr_priority">{task.priority}</td>
                            <td className="tr_deadline">{task.deadLine}</td>
                            <td className="tr_more"><Link to={`/Theme/${themeId}/Task/${task.id}`}>More</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotDoneTasks;
