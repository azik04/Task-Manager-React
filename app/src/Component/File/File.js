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
                const res = await axios.get(`https://localhost:7146/api/File/task/${id}`);
                console.log("Fayllar", res.data.data);
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
            const res = await axios.get(`https://localhost:7146/api/File/${fileId}`, {
                responseType: 'blob', 
            });
            console.log(res)
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
                <h2>File</h2>
                <button className="create-comment-button" onClick={createPopupVisible}>Create File</button>
            </div>
            <div className="info_comment_list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div className="info_comment_item" key={item.id}>
                            <div className="comment-meta-header">
                                <p className="comment-text">
                                    <a href="#" onClick={() => downloadFile(item.id, item.fileName)}>
                                        {item.fileName}
                                    </a>
                                </p>
                                <div className="comment-meta-rm">
                                    <i className="fa-regular fa-trash-can delete-icon" onClick={() => removePopupVisible(item.id)}></i>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="info_comment_list">Heç bir fayl tapılmadı</p>
                )}
            </div>
            {isCreatePopupVisible && <CreateFile onClose={closeCreatePopupVisible} />}
            {isRemovePopupVisible && removeId !== null && <RemoveFile onClose={closeRemovePopupVisible} documentId={removeId} />}
        </div>
    );
};

export default File;
