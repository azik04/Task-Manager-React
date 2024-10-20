import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateFile = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setFormErrors({});
    };

    const fetchPost = async () => {
        if (!file) {
            setFormErrors({ File: ['Yükləmək üçün bir fayl seçin.'] });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('taskId', id);

        try {
            await axios.post(`https://localhost:7146/api/File/Upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Fayl müvəffəqiyyətlə yükləndi");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Fayl yüklənərkən xəta", error);
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                setFormErrors(validationErrors);
            } else {
                setError('Fayl yüklənərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.');
            }
        }
    };

    return (
        <section className="pop">
            <div className="pop-order">
                {/* Header with close button */}
                <div className="pop_order_nav">
                    <div className="pop_order_nav_left">
                        <p>Item Yarat</p>
                    </div>
                    <div className="pop_order_nav_right">
                        <i className="fa-solid fa-xmark" onClick={onClose}></i>
                    </div>
                </div>

                {/* Form content */}
                <div className="pop_order_mid">
                    {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                    <div className="pop_order_mid_inp">
                        <label htmlFor="file">Fayl</label>
                        <input type="file" id="file" onChange={handleFileChange} />
                        {formErrors.File && <span className="error">{formErrors.File[0]}</span>}
                    </div>
                    
                    <div className="pop_order_main_footer">
                        <button className="pop_order_submit_btn" onClick={fetchPost}>Tamam</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateFile;
