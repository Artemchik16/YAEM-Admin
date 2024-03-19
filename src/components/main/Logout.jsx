import React from "react";



function Logout(){
    return(
        <div className="col-10 col-sm-9 py-4">
            <h2 className="ms-3">Выход из аккаунта</h2>
            <p className="ms-3">Вы действительно хотите выйти ?</p>
            <button className="btn btn-danger ms-3">Да, Выйти</button>
                    {/* close this block and return base main */}
        </div>
    );
}

export default Logout
