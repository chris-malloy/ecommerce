import React, { Component } from 'react';

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
                    <a id="logo-container" href="/" className="brand-logo">Ecommerce</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/">Thing 1</a></li>
                        <li><a href="/">Thing 2</a></li>
                        <li><a href="/">Thing 3</a></li>
                        <li><a href="/">Thing </a></li>
                    </ul>
                </div>
            </nav>
            <nav>
                <div className="nav-wrapper green">
                        <div className="container">
                            ClassicModels Logo
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