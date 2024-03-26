// Default import
import React from "react";


function CreateEstablishmentForm({ onClose }) {


  return (
    <div className="container">
      <div className="create-establishment">
        <h2>Добавить заведение</h2>
        {/* Add establishment form */}
        <form className="my-4" method=''>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-font fa-xs text-muted"></i></span>
            {/* Handle input */}
            <input
              type="text"
              className="form-control"
              placeholder="Название заведения"
            />
          </div>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-link fa-xs text-muted"></i></span>
            <span className="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
            {/* Handle input */}
            <input
              type="text"
              className="form-control"
              placeholder="URL имя"
            />
          </div>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="far fa-file-image fa-xs text-muted"></i></span>
            {/* Handle input */}
            <input type="file" className="form-control" id="inputGroupFile01" />
          </div>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-phone fa-xs text-muted"> +</i></span>
            {/* Handle input */}
            <input
              type="number"
              className="form-control"
              placeholder="77071112233"
            />
          </div>
          {/* field name.. */}
          <p className="text mb-0">Выберите город</p>
          <select data-mdb-select-init className="select">
            <option value="1">Темиртау</option>
          </select>
          {/* field name.. */}
          <p className="text mb-0">Описание</p>
          <div className="input-group mb-3">
            <textarea className="form-control" aria-label="With textarea"></textarea>
          </div>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-wifi fa-xs text-muted"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Название Wi-Fi"
            />
          </div>
          {/* field name.. */}
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-lock fa-xs text-muted"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Пароль Wi-Fi"
            />
          </div>
          <div className="d-flex justify-content-center">
            {/* send data on backend */}
            <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
            {/* close this block and return base main */}
            <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default CreateEstablishmentForm;
