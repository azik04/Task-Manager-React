import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditTask = ({ id, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/Task/${id}`);
                const task = res.data.data;
                setTaskName(task.taskName);
                setTaskDescription(task.taskDescription);
                setStatus(task.status);
                setPriority(task.priority);
                setDeadLine(task.deadLine);
            } catch (error) {
                console.error('Vəzifə detallarını alarkən xəta', error);
                setError('Vəzifə detallarını əldə etmək mümkün olmadı.');
            }
        };

        if (id) {
            fetchTaskDetails();
        }
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError('');
        setErrors({}); 

        try {
            const res = await axios.put(`https://localhost:7146/api/Task?id=${id}`, {
                taskName,
                taskDescription,
                status,
                priority,
                deadLine,
            });
            console.log("Yeniləmə uğurlu oldu", res.data.data);
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Vəzifəni Düzəlt</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>
                <div className="pop_order_mid">
                    <form onSubmit={handleUpdate}>
                        <div className="pop_order_mid_inp">
                            <label htmlFor="taskName">Vəzifənin Adı</label>
                            <input 
                                type="text" 
                                value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)} 
                                placeholder="Vəzifənin Adı"
                            />
                            {errors.TaskName && <span className="error">{errors.TaskName[0]}</span>} 
                        </div>
                        <div className="pop_order_mid_inp">
                            <label htmlFor="taskDescription">Vəzifə Təsviri</label>
                            <textarea 
                                rows="4" 
                                value={taskDescription} 
                                onChange={(e) => setTaskDescription(e.target.value)} 
                                placeholder="Vəzifə Təsviri"
                            />
                            {errors.TaskDescription && <span className="error">{errors.TaskDescription[0]}</span>}
                        </div>
                        <div className="pop_order_mid_flex">
                            <div className="pop_order_mid_inp">
                                <label htmlFor="status">Status</label>
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)} 
                                    required
                                >
                                    <option value="" disabled>Status seçin</option>
                                    <option value="Prosesdedir">Prosesdedir</option>
                                    <option value="Riskdə">Riskdə</option>
                                    <option value="Gecikmiş">Gecikmiş</option>
                                </select>
                                {errors.Status && <span className='error'>{errors.Status[0]}</span>} 
                            </div>
                            <div className="pop_order_mid_inp">
                                <label htmlFor="priority">Prioritet</label>
                                <select 
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)} 
                                    required
                                >
                                    <option value="" disabled>Prioritet seçin</option>
                                    <option value="Aşağı">Aşağı</option>
                                    <option value="Orta">Orta</option>
                                    <option value="Yüksək">Yüksək</option>
                                </select>
                                {errors.Priority && <span className='error'>{errors.Priority[0]}</span>} 
                            </div>
                        </div>
                        <div className="pop_order_mid_inp">
                            <label htmlFor="deadLine">Son Tarix</label>
                            <input 
                                type="date" 
                                value={deadLine} 
                                onChange={(e) => setDeadLine(e.target.value)} 
                            />
                            {errors.DeadLine && <span className='error'>{errors.DeadLine[0]}</span>} 
                        </div>
                        <button className='pop_order_submit_btn' type="submit">Yenilə</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditTask;
