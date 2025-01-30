import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateTask from './CreateTask'; 
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

const NotDoneTasks = () => {
    const [notDoneTasks, setNotDoneTasks] = useState([]);
    const { themeId } = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const navigate = useNavigate();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('JWT');                               
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;
                const res = await axios.get(`https://localhost:7146/api/Task/Done?themeId=${themeId}&userId=${userId}`);
                console.log("Done", res.data.data)
                setNotDoneTasks(res.data.data || []);  
            } catch (error) {
                console.error('Tamamlanmamış tapşırıqları alarkən xəta:', error);
                setNotDoneTasks([]);
            }
        };
        fetchTasks();
    }, [themeId]);

    const handleTaskClick = (taskId) => {
        navigate(`/Theme/${themeId}/Task/${taskId}`);
    };

    const completeTask = async (id) => {
        try {
            const res = await axios.put(`https://localhost:7146/api/Task/${id}/Complite`);
            console.log('Tapşırıq tamamlandı:', res.data);
            window.location.reload();
        } catch (error) {
            console.error('Tapşırığı tamamlarkən xəta:', error.response ? error.response.data : error.message);
        }
    };



    return (
        <div className="more_one">
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Tamamlanmamış</h2>
                </div>
            </div>

            {isPopupOpen && <CreateTask close={() => setIsPopupOpen(false)} />}

            <table>
                <thead>
                    <tr className='tr-header'>
                        <th className="tr_notdone"></th>
                        <th className="tr_notdone">#</th>
                        <th className="tr_task">Tapşırıq</th>
                        <th className="tr_status">Status</th>
                        <th className="tr_priority">Prioritet</th>
                        <th className="tr_deadline">Son Tarix</th>
                        <th className="tr_owner">Sahib</th>
                    </tr>
                </thead>
                <tbody>
                    {notDoneTasks && notDoneTasks.length > 0 ? (
                        notDoneTasks.map(task => (
                            <tr key={task.id} onClick={() => handleTaskClick(task.id)}>
                                <td className="tr_notdone">
                                    <i 
                                        className="fa-solid fa-circle-check" 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            completeTask(task.id);
                                        }}
                                    ></i>
                                </td>
                                <td className="tr_notdone">{task.id}</td>
                                <td className="tr_task"><p>{task.taskName}</p></td>
                                <td className="tr_status">{task.status}</td>
                                <td className="tr_priority">{task.priority}</td>
                                <td className="tr_deadline">{task.deadLine}</td>
                                <td className="tr_deadline">{task.executiveUserName}  {task.userNames}</td>
                            </tr>
                        ))
                    ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>No tasks found</td>
                    </tr>
                )}
                </tbody>
            </table>  
        </div>
    );
};

export default NotDoneTasks;
