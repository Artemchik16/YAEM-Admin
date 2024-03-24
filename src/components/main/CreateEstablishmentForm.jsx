import React from "react";


function CreateEstablishmentForm({onClose}) {
    return (
        <div className="container">
            <div className="create-establishment">
                <h2>Добавить заведение</h2>

                <form className="my-4" method=''>
                <div class="input-group mb-3">
                   <span class="input-group-text"><i class="fas fa-font fa-xs text-muted"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Название заведения"
                  />
                </div>

                <div class="input-group mb-3">
                <span class="input-group-text"><i class="fas fa-link fa-xs text-muted"></i></span>
                <span class="input-group-text text-muted fst-" id="basic-addon2">yaem.kz/</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="URL имя"
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
                    placeholder="77071112233"
                  />
                </div>
                <p className="text mb-0">Выберите город</p>
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
                <p className="text mb-0">Описание</p>
                <div class="input-group mb-3">
                  <textarea class="form-control" aria-label="With textarea"></textarea>
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
                  />
                </div>


                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success my-3 me-2">Добавить</button>
                    {/* close this block and return base main */}
                    <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button>
                </div>
                </form>

            </div>
        </div>
    );
}

export default CreateEstablishmentForm;
