import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Component/Comment/Comment';
import RemoveTask from '../Component/Task/RemoveTask';
import File from '../Component/File/File';
import EditTask from '../Component/Task/EditTask';
import SubTask from '../Component/SubTask/SubTask';
import DoneSubTask from '../Component/SubTask/DoneSubTask';
import { jwtDecode } from 'jwt-decode'; 

const Task = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [remPopUp, setRemPopUp] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('JWT');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken?.UserId;
    
                const res = await axios.get(`https://localhost:7146/api/Task/${id}?userId=${userId}`);
                console.log("id", res);
                setDetails(res.data.data || {});
            } catch (error) {
                console.error('Tapşırıq detalları alınarkən xəta:', error);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const openEditPopup = () => setIsEditPopupVisible(true);
    const closeEditPopup = () => setIsEditPopupVisible(false);
    const openRemovePopup = () => setRemPopUp(true);
    const closeRemovePopup = () => setRemPopUp(false);

    return (
        <section className="content">
            <div className='task_container'>
                <div className='task_header'>
                    <div className='task_header-info'>
                        <p>Task : {details.taskName}</p>
                    </div>
                    <div className='task_header-btn'>
                        <button onClick={() => openEditPopup()}>
                            <i className="fa-solid fa-pen-to-square"></i>Edit
                        </button>
                        <button onClick={() => openRemovePopup()}>
                            <i className="fa-solid fa-trash-can"></i>Remove
                        </button>
                    </div>
                </div>

                <div className="order-info">
                    <div className="order-info__section order-info__details">
                        <h3 className="order-info__title">Order Info</h3>
                        <p className="order-info__text">Status: <span className="order-info__highlight">{details.status}</span></p>
                        <p className="order-info__text">DeadLine: <span className="order-info__highlight">{details.deadLine}</span></p>
                        <p className="order-info__text">Priority: <span className="order-info__highlight">{details.priority}</span></p>
                        <p className="order-info__text">Executive User: <span className="order-info__highlight">{details.executiveUserName}</span></p>
                        <p className="order-info__text">Users in Task: <span className="order-info__highlight">{details.userNames}</span></p>
                        <p className="order-info__text">Elage: <span className="order-info__highlight">{details.contact}</span></p>
                        <p className="order-info__text">Date of Complitment: <span className="order-info__highlight">{formatDate(details.dateOfCompletion)}</span></p>
                    </div>

                    <div className="order-info__section order-info__comments">    
                        <h3 className="order-info__title">Comments</h3>
                        <p className="order-info__text">{details.taskDescription}</p>
                    </div>
                </div>
            </div>
            <div className='sub_task'>
                    <div className='sub_task_name'>
                        <p>Alt Tapşırıqlar</p>
                    </div>
                <SubTask />
                <DoneSubTask />
            </div>
            
            <div className="comment-fayl">
                <Comment />
                <File />
            </div>  
            {isEditPopupVisible && <EditTask id={id} onClose={closeEditPopup} />}
            {remPopUp && <RemoveTask onClose={closeRemovePopup} />}
        </section>
    );
};

export default Task;
