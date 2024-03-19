// default imports
import React from "react";
import { Link } from 'react-router-dom';

function Registration() {
    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form className="registration-form">
                <input type="text" className="form-control" placeholder="Enter your phone" />
                <input type="password" className="form-control" placeholder="Create a password" />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <Link to='/login'>Already have an account?</Link>
        </div>
    );
}

export default Registration;

