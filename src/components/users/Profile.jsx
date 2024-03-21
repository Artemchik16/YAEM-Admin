import React from "react";



function Profile() {

  
  return (
    <div className="col-10 col-sm-9 py-4 px-2" style={{ maxWidth: '600px' }}>
      <h1 className="ms-4">Профиль</h1>
      <h5 className="my-4">Личные данные</h5>
      <form >
        <div className="input-group mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Телефон"
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Имя"
            aria-label="name"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Фамилия"
            aria-label="surname"
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Почта"
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </div>
        <button type="submit" className="btn btn-success">Сохранить</button>
      </form>

    </div>
  );
}

export default Profile
