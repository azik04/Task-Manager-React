import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoneTasks = () => {
    const [doneTasks, setDoneTasks] = useState([]);
    const [userNames, setUserNames] = useState({});
    const { themeId } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/Task/done?themeId=${themeId}`);
                setDoneTasks(res.data.data);
                fetchUserNames(res.data.data);
            } catch (error) {
                console.error('Error fetching done tasks:', error);
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

    return (
        <div class="more">
            <h2>Done Tasks</h2>
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
                    {doneTasks.map(task => (
                        <tr key={task.id}>
                            <td>
                                <i className="fa-solid fa-square-check"></i>
                            </td>
                            <td>{task.name}</td>
                            <td>{userNames[task.executiveUserId]?.name || 'Unknown'}</td>
                            <td>Done</td>
                            <td>{task.priority}</td>
                            <td>{task.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoneTasks;
