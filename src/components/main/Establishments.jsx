// default imports
import React, { useState } from 'react';

// create establishment form component import
import CreateEstablishmentForm from './CreateEstablishmentForm.jsx';

function Establishment() {
  // open establishment create form
  const [showForm, setShowForm] = useState(false)
  const handleFormIsOpen = () => { setShowForm(true); };
  const handleFormIsClose = () => { setShowForm(false); };

  // request on backend..


  return (
    <>
      {/* if user has'not any establishment, show this */}
    <div className="col-10 col-sm-9 py-4">
      {/* if showForm=False show this block */}
      {!showForm && (
        <>
          <div className="container px-0">
            <h1 className="text-center mb-4">Заведения</h1>
            <p>Здесь будет отображен список ваших заведений.</p>
            <p>Чтобы добавить заведения, нажмите кнопку "Добавить заведения".</p>
            {/* Button to open the form */}
            <button className="btn btn-primary" onClick={handleFormIsOpen}>Добавить заведение</button>
          </div>
        </>
      )}
      {/* else render the form if showForm=True */}
      {showForm && <CreateEstablishmentForm onClose={handleFormIsClose}></CreateEstablishmentForm>}
    </div>
      {/* in the else statement show establishment list */}
    <div>...</div>

    </>
  );
}

export default Establishment;
