import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Messages import
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function EditEstablishmentForm({ establishmentId, onFinishEditing }) {
    const [establishmentData, setEstablishmentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstablishmentData = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:8000/api/v1/menu/clients/${establishmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEstablishmentData(response.data);
                setLoading(false);
                toast.success('Задница.', { autoClose: 2000 })
            } catch (error) {
                toast.error('Невозможно получить информацию о заведении.', { autoClose: 2000 })
                setTimeout(() => {window.location.reload()}, 2300);
            }
        };

        fetchEstablishmentData();
    }, [establishmentId]);

    if (loading) {
        return <div>Перенаправление..</div>;
    }


    return (
        <div>
            <h2>Форма редактирования заведения</h2>

            <p>Название: {establishmentData.name}</p>
            <p>Адрес: {establishmentData.description}</p>


            <button onClick={onFinishEditing}>Закрыть форму</button>
        </div>
    );
}

export default EditEstablishmentForm;
