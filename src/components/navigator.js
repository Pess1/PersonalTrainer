import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navigator() {

    return(
        <div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Customers</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Trainings">Trainings</Link>
                </li>
            </ul >
        </div>
        
    )
}
