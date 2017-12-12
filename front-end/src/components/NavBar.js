import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// components
import Search from './Search';

class NavBar extends Component{
    constructor(){
        super();
    }
    render(){
        return(
        <div id="navbar">
            <nav className="light-green lighten-1">
                <div className="nav-wrapper container">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Shop</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact Us</a></li>
                    </ul>
                    <div className="right">
                        <Search />
                    </div>
                </div>
            </nav>
            <nav>
                <div className="nav-wrapper green">
                    <div className="container">
                        <a id="logo-container" href="/" className="brand-logo">Bitty Motors</a>
                        <ul className="right">
                            <li><Link to="/login">Sign in or Create an account</Link></li>
                            <li><a href="/">(0) items in cart | ($0.00)</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

export default NavBar;