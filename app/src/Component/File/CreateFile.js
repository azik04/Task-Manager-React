import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateFile = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState({});

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError({}); // Clear errors when a new file is selected
    };

    const fetchPost = async () => {
        if (!file) {
            setError({ File: ['Yükləmək üçün bir fayl seçin.'] });
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
            onClose(); // Close the popup
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Fayl yüklənərkən xəta", error.response.data.errors);
            setError(error.response.data.errors); // Set errors from the API response
        }
    };

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Create File</h3>
                    <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>

                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label htmlFor="file">Upload File</label>
                            <input type="file" id="file" onChange={handleFileChange} />
                            {/* Display validation error for file */}
                            <span className={`errors ${error?.File?.[0] ? 'visible' : ''}`}>
                                {error?.File?.[0]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="submit-btn" onClick={fetchPost}>Submit</button>
                </div>
            </div>
        </section>
    );
};

export default CreateFile;
