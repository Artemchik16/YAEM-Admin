// default imports
import React from "react";
import { Link } from 'react-router-dom';


function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <input type="text" className="form-control" placeholder="Enter your phone number" />
                <input type="password" className="form-control" placeholder="Enter your password" />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to='/registration' className="registration-link">Don't have an account? Register here!</Link>
        </div>
    );
}

export default Login;

