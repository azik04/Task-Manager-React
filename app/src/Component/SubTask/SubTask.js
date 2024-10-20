import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateSubTask from './CreateSubTaskS';
import RemoveSubTask from './RemoveSubTask';

const SubTask = () => {
    const [notDoneTasks, setNotDoneTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const { id } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notDoneRes = await axios.get(`https://localhost:7146/api/SubTask/Task/${id}/NotDone`);
                setNotDoneTasks(notDoneRes.data.data || []);

                const doneRes = await axios.get(`https://localhost:7146/api/SubTask/Task/${id}/Done`);
                setDoneTasks(doneRes.data.data || []);
                console.log(doneRes.data.data);
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData();
    }, [id]);

    const completeTask = async (subtaskId) => {
        try {
            const res = await axios.put(`https://localhost:7146/api/SubTask/${subtaskId}/Complite`);
            console.log('Tapşırıq tamamlandı:', res.data);

            // Tamamlanan tapşırığı notDoneTasks-dan tapın
            const completedTask = notDoneTasks.find(task => task.id === subtaskId);
            setNotDoneTasks(prevTasks => prevTasks.filter(task => task.id !== subtaskId));
            setDoneTasks(prevDoneTasks => [...prevDoneTasks, { ...completedTask, isDone: true }]);
            
        } catch (error) {
            console.error('Tapşırığı tamamlayarkən xəta:', error.response ? error.response.data : error.message);
        }
    };

    const openCreatePopup = () => setCreatePopupVisible(true);
    const closeCreatePopup = () => setCreatePopupVisible(false);
    const openRemovePopup = (subtaskId) => {
        setRemoveId(subtaskId);
        setRemovePopupVisible(true);
    };
    const closeRemovePopup = () => setRemovePopupVisible(false);

    const handleRemoveSubTask = (subtaskId) => {
        setNotDoneTasks(prev => prev.filter(task => task.id !== subtaskId));
        setDoneTasks(prev => prev.filter(task => task.id !== subtaskId));
        closeRemovePopup();
    };

    return (
        <div className='subTask_one'>
            <div className="pop_order_nav_right"></div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Alt Tapşırıq</th>
                        <th>Prioritet</th>
                        <th className='add_sub'>
                            <i className="fa-solid fa-plus" onClick={openCreatePopup}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notDoneTasks.map(subtask => (
                        <tr key={subtask.id}>
                            <td className="tr_notdone">
                                <i className="fa-solid fa-circle-check" onClick={() => completeTask(subtask.id)}></i>
                            </td>
                            <td className="tr_task">{subtask.name}</td>
                            <td>{subtask.priority || 'Məlum deyil'}</td>
                            <td className='add_sub'>
                                <i className="fa-regular fa-trash-can delete-icon" onClick={() => openRemovePopup(subtask.id)} />
                            </td>
                        </tr>
                    ))}
                    {doneTasks.map(subtask => (
                        <tr key={subtask.id}>
                            <td className="tr_done">
                                <i className="fa-solid fa-check-circle"></i>
                            </td>
                            <td className="tr_task">{subtask.name}</td>
                            <td>{subtask.priority || 'Məlum deyil'}</td>
                            <td className='add_sub'>
                                <i className="fa-regular fa-trash-can delete-icon" onClick={() => openRemovePopup(subtask.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isCreatePopupVisible && <CreateSubTask onClose={closeCreatePopup} />}
            {isRemovePopupVisible && removeId !== null && (
                <RemoveSubTask 
                    subtaskId={removeId} 
                    onClose={closeRemovePopup} 
                    onRemove={handleRemoveSubTask}
                />
            )}
        </div>
    );
};

export default SubTask;
