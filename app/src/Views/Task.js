import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edit from '../Photos/Edit.svg';
import Comment from '../Component/Comment';
import RemoveTask from '../Component/RemoveTask';
import File from '../Component/File';
import EditTask from '../Component/EditTask';
import UserInTask from '../Component/UserInTask';
import SubTask from '../Component/SubTask';
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear() !== 1970
        ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';
};

const Task = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [executiveUserName, setExecutiveUserName] = useState('');
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [remPopUp, setRemPopUp] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://test.loc/api/Task/${id}`);
                setDetails(res.data.data || {});

                if (res.data.data && res.data.data.executiveUserId) {
                    const userRes = await axios.get(`http://test.loc/api/User/${res.data.data.executiveUserId}`);
                    setExecutiveUserName(userRes.data.data.userName); 
                }
            } catch (error) {
                console.error('Tapşırıq detallarını əldə edərkən xəta:', error);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    const popUpVisible = () => setIsEditPopupVisible(true);
    const closePopUpVisible = () => setIsEditPopupVisible(false);
    const createRemPopUp = () => setRemPopUp(true);
    const closeRemPopUp = () => setRemPopUp(false);

    return (
        <section class="more">
        <div class="get">
            <div class="get_header">
                <div class="get_header_left">  
                    <p class="address">2893 Austin Secret Lane</p>
                </div>
                <div class="get_header_right">
                    <button class="get_header_right_edt">Edit Task</button>
                    <button class="get_header_right_rm">Cancel Task</button>
                </div>
            </div>
            <div class="get_middle">
                <div class="middle_one">
                    <div class="get_middle_one">
                        <label>Task Name</label>
                        <p>It Uzre reqmsallasdirma</p>
                    </div>
                    <div class="get_middle_one">
                        <label>Status</label>
                        <p>In Progress</p>
                    </div>
                    <div class="get_middle_one">
                        <label>Owner</label>
                        <p>John Doe</p>
                    </div>
                </div>      
                <div class="middle_one">
                    <div class="get_middle_one">
                        <label>Priority</label>
                        <p>High</p>
                    </div>
                    <div class="get_middle_one">
                        <label>Deadline</label>
                        <p>2024-10-31</p>
                    </div>
                    <div class="get_middle_one">
                        <label>Owner</label>
                        <p>Jane Smith</p>
                    </div>
                </div>   
                <div class="get_middle_one_comment">
                    <label>Comment</label>
                    <p>Lorem ipsum dolor sit.</p>
                </div>
            </div> 
        </div>
        <div class="info">
            <div class="info_comment">
                <div class="info_comment_header">
                    <h2>Comments</h2>
                    <button class="create-comment-button">Create Comment</button>
                </div>
                <div class="info_comment_list">
                    <div class="info_comment_item">
                        <div class="comment-meta">
                            <p class="comment-text">Comment</p>
                            <p class="username">username</p>
                            <p class="created-at">created at</p>
                            <i class="fa-regular fa-trash-can delete-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="info_file">
            </div>
            
            <div class="info_add">
            </div>
        </div>
        
    </section>
    );
};

export default Task;
