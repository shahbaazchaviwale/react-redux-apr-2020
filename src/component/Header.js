import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const activeLink = { color: '#F15B2A' };

    return (
        <nav>
            <NavLink to="/" activeStyle={activeLink} exact>Home</NavLink> {" | "}
            <NavLink to="/about" activeStyle={activeLink} >About Us</NavLink> {" | "}
            <NavLink to="/course" activeStyle={activeLink} >Course</NavLink>
        </nav>
    )
}
