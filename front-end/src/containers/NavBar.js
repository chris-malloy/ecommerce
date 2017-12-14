import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Search from '../components/Search';
// actions
import GetProductLines from '../actions/GetProductLines';



class NavBar extends Component{
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.getProductLines();
    }

    componentWillReceiveProps(newProps){

    }

    render(){
        // console.log(this.props.auth);
        if(this.props.auth.firstName !== undefined){
            // user is logged in
            var rightMenuBar = [
                <li key={1}>Welcome, {this.props.auth.userName}</li>,
                <li key={2}><Link to="/cart">(0) items in cart | ($0.00)</Link></li>,
                <li key={3}><Link to="/logout">Logout</Link></li>,
            ]
        } else {
            rightMenuBar = [
            <li key={1}><Link to="/login">Sign in</Link></li>,
            <li key={2}>|</li>,
            <li key={3}><Link to="/register">Create an Account</Link></li>,
            <li key={4}><a href="/">(0) items in cart | ($0.00)</a></li>,
            ]
        }
        // console.log(this.props.auth);
        console.log(this.props.getProductLines)
        return(
        <div id="navbar">
            <nav className="light-green lighten-1">
                <div className="nav-wrapper container">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><a href="/productLines/get">Shop</a></li>
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
                            {rightMenuBar}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth:state.auth,
        pl: state.pl
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProductLines: GetProductLines,
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// TODO 