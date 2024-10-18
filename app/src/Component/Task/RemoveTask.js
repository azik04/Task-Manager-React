import React from 'react';
import axios from 'axios';
// import Photo from '../Photos/Cancel.svg'; 
import { useParams, useNavigate } from 'react-router-dom';

const RemoveTask = ({ onClose }) => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const remTask = async () => {
        try {
            const res = await axios.delete(`https://localhost:7146/api/Task?id=${id}`);
            console.log(res);
            onClose(); 
            navigate('/Theme'); 
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    return (
        <section className="pop">
        <div className="pop-order">
            {/* Header with close button */}
            <div className="pop_order_nav">
                <div className="pop_order_nav_left">
                    <p>Taski Sil</p>
                </div>
                <div className="pop_order_nav_right">
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
            </div>

            <div className="pop_order_mid">
                <div className="pop_order_mid_inp">
                    <p>Bu Taski silmək istəyirsinizmi?</p>
                </div>
                <div className='pop_order_footer'>
                    <button className="rem_btn" onClick={remTask}>Sil</button>
                </div>
            </div>
        </div>
    </section>
    );
};

export default RemoveTask;
