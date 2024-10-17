import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToTask from './AddToTask';
import RemoveUserFromTask from './RemoveUserFromTask';

const UserInTask = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const { id } = useParams(); // Task ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/UserTask/${id}/users`);
                setItems(res.data || []);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [id]);

    const openCreatePopup = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopup = () => {
        setCreatePopupVisible(false);
    };

    const openRemovePopup = (userId) => {
        setRemoveId(userId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopup = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="info_add">
            <div className="info_comment_header">
                <h2>Added to Task</h2>
                <button className="create-comment-button" onClick={openCreatePopup}>
                    Add User to Task
                </button>
            </div>
            <div className="info_comment_list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div className="info_comment_item" key={item.id}>
                            <div className="comment-meta-header">
                                <p className="comment-text">{item.userName}</p>
                                <div className="comment-meta-rm">
                                    <i
                                        className="fa-regular fa-trash-can delete-icon"
                                        onClick={() => openRemovePopup(item.id)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="info_comment_list_p">Heç bir comment tapılmadı</p>
                )}
            </div>
            {isCreatePopupVisible && <AddToTask onClose={closeCreatePopup} taskId={id} />}
            {isRemovePopupVisible && removeId !== null && (
                <RemoveUserFromTask onClose={closeRemovePopup} userId={removeId} taskId={id} />
            )}
        </div>
    );
};

export default UserInTask;
