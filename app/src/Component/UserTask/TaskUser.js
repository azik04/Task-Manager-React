import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TaskUser = () => {
    const [items, setItems] = useState([]);
    const { id } = useParams();
    const userId = localStorage.getItem('UserId'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/UserTask/${userId}/theme`);
                setItems(res.data || []); 
                console.log(res.data)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [id, userId]);

    return (
        <div className="header-themes">
            <div className="header-themes-name">
                <p>Added To Theme</p>
            </div>

            {items.map((item) => (
                <Link to={`/Task/${item.id}`} key={item.id} className="header-themes-one">
                    <div className="header-themes-one-left">
                        <i className="fa-solid fa-address-card"></i>
                        <p>{item.taskName}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TaskUser;
