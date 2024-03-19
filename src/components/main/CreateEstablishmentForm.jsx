import React from "react";


function CreateEstablishmentForm({onClose}) {
    return (
        <div className="container">
            <div className="create-establishment">
                <h2>Добавить заведение</h2>

                <form className="my-4" method=''>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="est-name" className="form-control" />
                        <label className="form-label" htmlFor="est-name">Название заведения</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="est-url" className="form-control" disabled />
                        <label className="form-label" htmlFor="est-url">Url адрес</label>
                    </div>

                    <button type="submit" className="btn btn-primary my-3 me-2">Добавить</button>
                    {/* close this block and return base main */}
                    <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button>
                </form>

            </div>
        </div>
    );
}

export default CreateEstablishmentForm;
