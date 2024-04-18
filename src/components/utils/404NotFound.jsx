// Import react
import React from 'react';
// Import routers
import { Link } from 'react-router-dom';


export default function NotFound() {
    // HTML block
    return (
        <div className="container my-5 mx-3">
            <h2>404 Not Found</h2>
            <p>Страница, которую вы ищете, не найдена.</p>
            {/* Back button */}
            <Link to='/menu'>
                <button
                    className="btn btn-success btn-animate"
                >
                    <i class="fas fa-arrow-rotate-left me-1"></i> Вернуться на главную
                </button>
            </Link>
        </div>
    );
}
