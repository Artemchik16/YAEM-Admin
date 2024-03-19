// default imports
import React, {useState} from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Input, Ripple });

function CreateEstablishment({onClose}){
    return(
    <div className="container">
        <div className="create-establishment">
            <h2>Добавить заведение</h2>

<form className="my-4">




  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="form6Example3" class="form-control" />
    <label class="form-label" for="form6Example3">Название заведения</label>
  </div>


  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="form6Example4" class="form-control" disabled />
    <label class="form-label" for="form6Example4">Url адрес</label>
  </div>


  <button type="submit" className="btn btn-primary my-3 me-2">Добавить</button>
                {/* close this block and return base main */}
                <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button>
</form>


        </div>
        </div>
    );
}

export default CreateEstablishment;