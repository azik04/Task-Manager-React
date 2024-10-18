import React from 'react';
import axios from 'axios';
// import Photo from '..//Cancel.svg'; 

const RemoveTheme = ({ onClose, themeId, setData }) => {
    const remTheme = async () => {
        try {
            await axios.delete(`https://localhost:7146/api/Theme?id=${themeId}`);
            setData((prevData) => prevData.filter(theme => theme.id !== themeId));
            onClose(); 
            window.location.reload()
        } catch (error) {
            console.error('Error removing theme:', error);
        }
    };

    return (
        <section className="pop">
        <div className="pop-order">
            {/* Header with close button */}
            <div className="pop_order_nav">
                <div className="pop_order_nav_left">
                    <p>Layiheni Sil</p>
                </div>
                <div className="pop_order_nav_right">
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
            </div>

            <div className="pop_order_mid">
                <div className="pop_order_mid_inp">
                    <p>Bu Layiheni silmək istəyirsinizmi?</p>
                </div>
                <div className='pop_order_footer'>
                    <button className="rem_btn" onClick={remTheme}>Sil</button>
                </div>
            </div>
        </div>
    </section>
        
    );
};

export default RemoveTheme;
