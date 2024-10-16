import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NotDoneTasks = () => {
    const [notDoneTasks, setNotDoneTasks] = useState([]);
    const [userNames, setUserNames] = useState({});
    const { themeId } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/Task/notdone?themeId=${themeId}`);
                setNotDoneTasks(res.data.data);
                fetchUserNames(res.data.data);
            } catch (error) {
                console.error('Error fetching not done tasks:', error);
            }
        };
        fetchTasks();
    }, [themeId]);

    const fetchUserNames = async (tasks) => {
        const userIds = [...new Set(tasks.map(task => task.executiveUserId))];

        if (userIds.length === 0) {
            console.log("No user IDs found.");
            return;
        }

        const userMap = {};
        await Promise.all(userIds.map(async (id) => {
            try {
                const response = await axios.get(`http://test.loc/api/User/${id}`);
                userMap[id] = response.data.data;
            } catch (error) {
                console.error(`Error fetching user ID ${id}:`, error);
            }
        }));

        setUserNames(userMap);
    };

    const completeTask = async (id) => {
        try {
            await axios.put(`http://test.loc/api/Task/complete/${id}`);
            setNotDoneTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className='more'>
            <h2>Not Done Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Task</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {notDoneTasks.map(task => (
                        <tr key={task.id}>
                            <td onClick={() => completeTask(task.id)}>
                                <i className="fa-solid fa-square-check"></i>
                            </td>
                            <td>{task.name}</td>
                            <td>{userNames[task.executiveUserId]?.name || 'Unknown'}</td>
                            <td>On Going</td>
                            <td>{task.priority}</td>
                            <td>{task.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotDoneTasks;
