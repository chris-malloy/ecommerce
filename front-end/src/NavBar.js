import React, { Component } from 'react';
import Search from './components/Search';

class NavBar extends Component{
    constructor(){
        super();
    }
    render(){
        return(
        <div id="navbar">
        <div>
        </div>
            <nav className="light-green lighten-1" role="navigation">
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
                            <li><a href="/">Sign in or Create an account</a></li>
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