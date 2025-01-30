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
                const res = await axios.get(`https://localhost:7146/api/Task/NotDone?themeId=${themeId}&userId=${userId}`);
                console.log("Not Done" , res)
                setNotDoneTasks(res.data || []); 
            } catch (error) {
                console.error('Tamamlanmamış tapşırıqları alarkən xəta:', error);
                setNotDoneTasks([]);  
            }
        };
        fetchTasks();
    }, [themeId]);

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
    const handleTaskClick = (taskId) => {
        navigate(`/Theme/${themeId}/Task/${taskId}`);
    };

    return (
        <div className="more_one">
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Görüləcək</h2>
                </div>
                <button className="more_one_name_btn" onClick={() => setIsPopupOpen(true)}>
                    <p>Tapşırıq Yarat</p>
                    <i className="fa-solid fa-thumbtack"></i>
                </button>
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
                                <td className="tr_notdone"> 
                                    <div className="tr_notdone_all">
                                        {task.isSeen && <div className="blue-indicator"></div>}{task.id}
                                    </div>
                                </td>
                                <td className="tr_task"><p>{task.taskName}</p></td>
                                <td className="tr_status">{task.status}</td>
                                <td className="tr_priority">{task.priority}</td>
                                <td className="tr_deadline">{task.deadLine}</td>
                                <td className="tr_deadline">
                                    <p>
                                        {task.executiveUserName}  {task.userNames}
                                    </p>        
                                </td>
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
