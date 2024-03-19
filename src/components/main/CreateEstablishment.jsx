// default imports
import React, {useState} from 'react';



function CreateEstablishment({onClose}){
    return(
        <div className="create-establishment">
            <h2>Добавить заведение</h2>
            <form>
                <div className="form-group">
                    {/* establishment params.. */}
                    <label htmlFor="name">Название заведения:</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <button type="submit" className="btn btn-primary">Добавить</button>
                {/* close this block and return base main */}
                <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
            </form>
        </div>
    );
}

export default CreateEstablishment;