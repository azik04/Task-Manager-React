import React from 'react';
import axios from 'axios';

const RemoveComment = ({ onClose, commentId }) => {
    const remItem = async () => {
        try {
            const response = await axios.delete(`https://localhost:7146/api/Comment/${commentId}`);
            console.log('Şərh uğurla silindi', response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Şərhi silərkən xəta:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Şərhi Sil</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                <div className="pop_order_mid">
                    <div className="pop_order_mid_inp">
                        <p>Bu şərhi silmək istəyirsinizmi?</p>
                    </div>
                    <div className='pop_order_footer'>
                        <button className="rem_btn" onClick={remItem}>Sil</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RemoveComment;
