import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DoneTasks = () => {
    const [doneTasks, setDoneTasks] = useState([]);
    const [userNames, setUserNames] = useState({});
    const { themeId } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/Done?themeId=${themeId}`);
                setDoneTasks(res.data.data);
                fetchUserNames(res.data.data);
            } catch (error) {
                console.error('Tamamlanmış tapşırıqları alarkən xəta:', error);
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

    return (
        <div className="more_one">
            <div className="more_one_name">
                <h2>Tamamlanmış</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="tr_done"></th>
                        <th className="tr_task">Tapşırıq</th>
                        <th className="tr_owner">Sahib</th>
                        <th className="tr_status">Status</th>
                        <th className="tr_priority">Prioritet</th>
                        <th className="tr_deadline">Son Tarix</th>
                        <th className="tr_more"></th>
                    </tr>
                </thead>
                <tbody>
                    {doneTasks.map(task => (
                        <tr key={task.id}>
                            <td className="tr_done">
                                <i className="fa-solid fa-circle-check"></i> 
                            </td>
                            <td className="tr_task">{task.taskName}</td>
                            <td className="tr_owner">{userNames[task.executiveUserId]?.userName || 'Naməlum'}</td>
                            <td className="tr_status">{task.status}</td>
                            <td className="tr_priority">{task.priority}</td>
                            <td className="tr_deadline">{task.deadLine}</td>
                            <td className="tr_more"><Link to={`Theme/:themeId/Task/${task.id}`}>More</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoneTasks;
