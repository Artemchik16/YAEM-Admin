import React from "react";



function Profile(){
    return(
        <div className="col-10 col-sm-9 py-4 px-2" style={{maxWidth: '600px'}}>
            <h1 className="text-center">Профиль</h1>
                <h5 className="my-4">Личные данные</h5>
                <form >
            <div class="input-group mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="Телефон"
                aria-label="phone"
                aria-describedby="basic-addon1"
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Имя"
                aria-label="name"
              />
              <input
                type="text"
                class="form-control"
                placeholder="Фамилия"
                aria-label="surname"
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="tel"
                class="form-control"
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
