import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateFile from './CreateFile';
import RemoveFile from './RemoveFile';

const File = () => {
    const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
    const [isRemovePopupVisible, setRemovePopupVisible] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [items, setItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const res = await axios.get(`https://localhost:7146/api/File/Task/${id}`);
                console.log("File", res.data.data)
                setItems(res.data.data || []);  
            } catch (error) {
                console.error('Məlumat alınarkən xəta baş verdi', error);
            }
        };

        fetchData(id);
    }, [id]);

    const createPopupVisible = () => {
        setCreatePopupVisible(true);
    };

    const closeCreatePopupVisible = () => {
        setCreatePopupVisible(false);
    };

    const removePopupVisible = (id) => {
        setRemoveId(id);
        setRemovePopupVisible(true);
    };

    const closeRemovePopupVisible = () => {
        setRemovePopupVisible(false);
    };

    const downloadFile = async (fileId, fileName) => {
        try {
            const res = await axios.get(`https://localhost:7146/api/File/${fileId}/Download`, {
                responseType: 'blob', 
            });
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', fileName); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        } catch (error) {
            console.error('Fayl yüklənərkən xəta baş verdi', error);
        }
    };

    return (
        <div className="info_file">
            <div className="info_comment_header">
                <p>Fayl</p>
                <button className="create-comment-button" onClick={createPopupVisible}>Fayl Yarat</button>
            </div>
            <div className="info_comment_list">
                <div className="info_comment_item">
                {items && items.length > 0 ? (
                    items.map(item => (
                        <div className="comment-meta-header">
                            <a href="#" className="file-text"  onClick={() => downloadFile(item.id, item.fileName)}>{item.fileName}</a>
                            <button className="comment-meta-rm" onClick={() => removePopupVisible(item.id)}><i className="fa-regular fa-trash-can delete-icon"></i></button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', margin: '11px 0' }}>No file found</div>
                )}
                    
                </div>
            </div>
            {isCreatePopupVisible && <CreateFile onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveFile onClose={closeRemovePopupVisible} documentId={removeId} />}
        </div>
    );
};

export default File;
