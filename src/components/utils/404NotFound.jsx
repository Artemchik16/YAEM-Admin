// Import react
import React from 'react';

export default function NotFound() {
    // HTML block
    return (
        <div className="container my-5 mx-3">
            <h2>404 Not Found</h2>
            <p>Страница, которую вы ищете, не найдена.</p>
            {/* Back button */}
            <button
                className="btn btn-success btn-animate"
                onClick={() => window.location.reload()}
            >
                <i class="fas fa-arrow-rotate-left me-1"></i> Вернуться на главную
            </button>
        </div>
    );
}
