import React from 'react';


function EditEstablishmentForm({onClose}){
    return(
        <>
        <p>Edit form</p>
        <button type="button" className="btn btn-danger my-3" onClick={onClose}>Отмена</button></>
    );
}

export default EditEstablishmentForm;
