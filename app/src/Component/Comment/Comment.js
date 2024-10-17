import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateComment from './CreateComment';
import RemoveComment from './RemoveComment';

const Comment = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const [userNames, setUserNames] = useState({}); 
    const { id } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
    
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Comment?taskId=${id}`);
                const comments = res.data.data || [];
                setItems(comments);
                fetchUserNames(comments); 
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData(id);
    }, [id]);

    const fetchUserNames = async (comments) => {
        const userIds = [...new Set(comments.map(comment => comment.userId))];

        if (userIds.length === 0) {
            console.log("İstifadəçi ID-ləri tapılmadı.");
            return; 
        }

        const userMap = {};

        await Promise.all(userIds.map(async (userId) => {
            try {
                const response = await axios.get(`https://localhost:7146/api/User/${userId}`);
                userMap[userId] = response.data.data.userName; 
            } catch (error) {
                console.error(`İstifadəçi ID ${userId}-ni alarkən xəta baş verdi:`, error);
            }
        }));

        setUserNames(userMap); 
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const createPopupVisible = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopupVisible = () => {
        setCreatePopupVisible(false);
    };

    const removePopupVisible = (commentId) => {
        setRemoveId(commentId);
        setRemovePopupVisible(true);
    };

    const closeRemovePopupVisible = () => {
        setRemovePopupVisible(false);
    };

    return (
        <div className="info_comment">
            <div className="info_comment_header">
                <h2>Comments</h2>
                <button className="create-comment-button" onClick={createPopupVisible}>Create Comment</button>
            </div>
            
            <div className="info_comment_list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div className="info_comment_item" key={item.id}>
                            <div className="comment-meta-header">
                                <p className="comment-text">{item.message}</p>
                                <p className="username">{userNames[item.userId] || 'Yüklənir...'}</p>
                                <p className="created-at">{formatDateTime(item.createAt)}</p>
                                <div className="comment-meta-rm">
                                <i class="fa-regular fa-trash-can delete-icon" onClick={() => removePopupVisible(item.id)}></i> 
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="info_comment_list_p">Heç bir comment tapılmadı</p>

                )}
            </div>
            {isCreatePopupVisible && <CreateComment onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveComment onClose={closeRemovePopupVisible} commentId={removeId} />}
        </div>
    );
};

export default Comment;
