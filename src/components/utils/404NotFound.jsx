import React from 'react';

function NotFound() {
    return (
        <div className="container my-5 mx-3">
            <h2>404 Not Found</h2>
            <p>Страница, которую вы ищете, не найдена.</p>
            <button className="btn btn-success btn-animate"><i class="fas fa-arrow-rotate-left me-1"></i> Вернуться на главную</button>
        </div>
    );
}

export default NotFound;