import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Component/Comment/Comment';
import RemoveTask from '../Component/Task/RemoveTask';
import File from '../Component/File/File';
import EditTask from '../Component/Task/UpdateTask';
import SubTask from '../Component/SubTask/SubTask';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear() !== 1970
        ? date.toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })
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
                console.error('Tapşırıq detalları alınarkən xəta:', error);
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
                        <p className="address">{details.taskName}</p>
                    </div>
                    <div className="get_header_right">
                        <button className="get_header_right_edt" onClick={openEditPopup}>Tapşırığı Düzəliş Et</button>
                        <button className="get_header_right_rm" onClick={openRemovePopup}>Tapşırığı Ləğv Et</button>
                    </div>
                </div>
                <div className="get_middle">
                    <div className="middle_one">
                        <div className="get_middle_one">
                            <label>Tapşırıq Adı</label>
                            <p>{details.taskName}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Status</label>
                            <p>{details.status}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Sahib</label>
                            <p>{executiveUserName}</p>
                        </div>
                    </div>      
                    <div className="middle_one">
                        <div className="get_middle_one">
                            <label>Prioritet</label>
                            <p>{details.priority}</p>
                        </div>
                        <div className="get_middle_one">
                            <label>Son Tarix</label>
                            <p>{formatDate(details.deadLine)}</p>
                        </div>
                    </div>   
                    <div className="get_middle_one_comment">
                        <label>Şərh</label>
                        <p>{details.taskDescription}</p>
                    </div>
                </div> 
            </div>
            <div className='sub_task'>
                <SubTask/>
            </div>
            <div className="info">
                <Comment/>
                <File/>
            </div>  
            {isEditPopupVisible && <EditTask id={id} onClose={closeEditPopup} />}
            {remPopUp && <RemoveTask onClose={closeRemovePopup} />}
        </section>
    );
};

export default Task;
