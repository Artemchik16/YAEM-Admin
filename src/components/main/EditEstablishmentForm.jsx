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

            <form className="my-4" method=''>
                <div class="input-group mb-3">
                   <span class="input-group-text"><i class="fas fa-font fa-xs text-muted"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={establishmentData.name}
                  />
                </div>

                <div class="input-group mb-3">
                <span class="input-group-text"><i class="fas fa-link fa-xs text-muted"></i></span>
                <span class="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="URL_NAME"
                  />
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="far fa-file-image fa-xs text-muted"></i></span>
                    <input type="file" class="form-control" id="inputGroupFile01"/>
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="fas fa-phone fa-xs text-muted"> +</i></span>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="PHONE NUMBER"
                  />
                </div>
                <p className="text mb-0">Выберите город</p>
                <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
                <select data-mdb-select-init class="select">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option>
                </select>

                <p className="text mb-0 mt-3">Описание</p>
                <div class="input-group mb-3">
                  <textarea class="form-control" aria-label="With textarea" placeholder="DESCRIPTION"></textarea>
                </div>

                <div class="input-group mb-3">
                   <span class="input-group-text"><i class="fas fa-wifi fa-xs text-muted"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Название Wi-Fi"
                  />
                </div>

                <div class="input-group mb-3">
                   <span class="input-group-text"><i class="fas fa-lock fa-xs text-muted"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Пароль Wi-Fi"
                    value-aria-invalid="true"
                    value="123"
                  />
                </div>

                </form>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success me-2 btn-animate">Сохранить</button>
                <button className="btn btn-danger" onClick={onFinishEditing}>Отменить</button>
            </div>
        </div>

    );
}

export default EditEstablishmentForm;
