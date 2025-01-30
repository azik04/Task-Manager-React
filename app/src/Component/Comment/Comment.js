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
    const { id } = useParams();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;
    
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Comment/Task/${id}`);
                const comments = res.data.data || [];
                console.log(res.data.data);
                setItems(comments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(id);
    }, [id]);

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

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="info_comment">
            <div className="info_comment_header">
                <p>Şərhlər</p>
                <button className="create-comment-button" onClick={createPopupVisible}>Şərh Yarat</button>
            </div>
            
            <div className="info_comment_list">
                <div className="comment-meta-nav">
                    <p className="comment-text-nav">Message</p>
                    <p className="username">UserName</p>
                    <p className="created-at">Created At</p>
                </div>
                {items && items.length > 0 ? (
                    items.map(item => (
                        <div className="comment-meta-header" key={item.id}>
                            <p className="comment-text">{item.message}</p>
                            <p className="username">{item.userName}</p>
                            <p className="created-at">{formatDate(item.createAt)}</p>
                            <button>
                                <i
                                    className="fa-regular fa-trash-can delete-icon"
                                    onClick={() => removePopupVisible(item.id)}
                                ></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', margin: '12px 0' }}>No comments found</div>
                )}
            </div>
            {isCreatePopupVisible && <CreateComment onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveComment onClose={closeRemovePopupVisible} commentId={removeId} />}
        </div>
    );
};

export default Comment;
