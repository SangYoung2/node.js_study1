import React from 'react';
import {Link} from "react-router-dom";
import './NavBar.css'

function NavBar(props) {
    return (
        <div>
            <div className="navbar">
                <Link className="navbarMenu" to={'/'}>Main</Link>
                <Link className="navbarMenu" to={'/login'}>Login</Link>
                <Link className="navbarMenu" to={'/register'}>Register</Link>
            </div>
        </div>
    );
}

export default NavBar;