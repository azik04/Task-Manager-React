import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateSubTask from './CreateSubTask';
import RemoveSubTask from './RemoveSubTask';
import EditSubTask from './EditSubTask';

const SubTask = () => {
    const [notDoneTasks, setNotDoneTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const { id } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notDoneRes = await axios.get(`https://localhost:7146/api/SubTask/Task/${id}/Done`);
                setNotDoneTasks(notDoneRes.data.data || []);
                console.log(notDoneRes.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const completeTask = async (subtaskId) => {
        try {
            const res = await axios.put(`https://localhost:7146/api/SubTask/${subtaskId}/Complite`);
            console.log('Task completed:', res.data);
            setNotDoneTasks(prevTasks => prevTasks.filter(task => task.id !== subtaskId));
            window.location.reload()
        } catch (error) {
            console.error('Error completing task:', error.response ? error.response.data : error.message);
        }
    };

    const openRemovePopup = (subtaskId) => {
        setRemoveId(subtaskId);
        setRemovePopupVisible(true);
    };
    const closeRemovePopup = () => setRemovePopupVisible(false);

    return (
        <div className='subTask_one'>
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Tamamlanmamış</h2>
                </div>
            </div>

            <table>
                <thead>
                    <tr className='tr-header'>
                        <th className="tr_notdone"></th>
                        <th className="tr_notdone">#</th>
                        <th className="">Alt Tapşırıq</th>
                        <th className="tr_priority">Prioritet</th>
                        <th className="tr_deadline">Son Tarix</th>
                        <th className="tr_status">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notDoneTasks && notDoneTasks.length > 0 ? (
                        notDoneTasks.map(task => (
                            <tr key={task.id}>
                                <td className="tr_notdone">
                                    <i className="fa-solid fa-circle-check" onClick={() => completeTask(task.id)}></i>
                                </td>
                                <td className="tr_notdone">{task.id}</td>
                                <td className="tr_subtask"><p>{task.name}</p></td>
                                <td className="tr_status">{task.priority}</td>
                                <td className="tr_priority">{task.deadLine}</td>
                                <td className="tr_status">
                                    <button onClick={() => openRemovePopup(task.id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button onClick={() => { setEditPopupVisible(true); setEditTaskId(task.id); }}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
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


            {isEditPopupVisible && editTaskId && (
                <EditSubTask
                    id={editTaskId}
                    onClose={() => { setEditPopupVisible(false); setEditTaskId(null); }}
                />
            )}
            {isRemovePopupVisible && removeId !== null && (
                <RemoveSubTask
                    subtaskId={removeId}
                    onClose={closeRemovePopup}
                />
            )}
        </div>
    );
};

export default SubTask;
