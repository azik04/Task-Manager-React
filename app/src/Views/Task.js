import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Component/Comment/Comment';
import RemoveTask from '../Component/Task/RemoveTask';
import File from '../Component/File/File';
import EditTask from '../Component/Task/UpdateTask';
import UserInTask from '../Component/UserTask/UserTask';
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
                const res = await axios.get(`https://localhost:7146/api/Task/${id}`);
                setDetails(res.data.data || {});
                if (res.data.data && res.data.data.executiveUserId) {
                    const userRes = await axios.get(`https://localhost:7146/api/User/${res.data.data.executiveUserId}`);
                    setExecutiveUserName(userRes.data.data.userName); 
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    const openEditPopup = () => setIsEditPopupVisible(true);
    const closeEditPopup = () => setIsEditPopupVisible(false);
    const openRemovePopup = () => setRemPopUp(true);
    const closeRemovePopup = () => setRemPopUp(false);

    return (
        <section className="more">
            <div className="get">
                <div className="get_header">
                    <div className="get_header_left">  
                        <p className="address">2893 Austin Secret Lane</p>
                    </div>
                    <div className="get_header_right">
                        <button className="get_header_right_edt" onClick={openEditPopup}>Edit Task</button>
                        <button className="get_header_right_rm" onClick={openRemovePopup}>Cancel Task</button>
                    </div>
                </div>
                <div className="get_middle">
                    <div className="middle_one">
                        <div className="get_middle_one">
                            <label>Task Name</label>
                            <p>{details.taskName}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Status</label>
                            <p>{details.Status}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Owner</label>
                            <p>{executiveUserName}</p>
                        </div>
                    </div>      
                    <div className="middle_one">
                        <div className="get_middle_one">
                            <label>Priority</label>
                            <p>{details.priority}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Deadline</label>
                            <p>{formatDate(details.deadLine)}</p>
                        </div>
                    </div>   
                    <div className="get_middle_one_comment">
                        <label>Comment</label>
                        <p>{details.comment}</p>
                    </div>
                </div> 
            </div>
        <div class="info">
            <Comment/>
            <File/>
            <UserInTask/>
            
        </div>  {/* Edit Task Popup */}
            {isEditPopupVisible && <EditTask id={id} onClose={closeEditPopup} />}
            
            {/* Remove Task Popup */}
            {remPopUp && <RemoveTask onClose={closeRemovePopup} />}
        
    </section>
    );
};

export default Task;
