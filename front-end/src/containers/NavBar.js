import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Search from '../components/Search';
// actions
import GetProductLines from '../actions/GetProductLines';
import LoginAction from '../actions/LoginAction'
// react-materialize
import { Row } from 'react-materialize'



class NavBar extends Component{
    // constructor(){
    //     super();
    // }

    componentDidMount(){
        this.props.getProductLines();
    }

    componentWillReceiveProps(newProps){

    }

    render(){
        console.log(this.props.cart);
        console.log(this.props.auth)
        if(this.props.auth.userName !== undefined){
            // the user is logged in
            if(this.props.cart.length > 0){
                const totalPrice = this.props.cart[0].totalPrice;
                const totalItems = this.props.cart[0].totalItems;
                var cartText = `(${totalItems}) items in your cart | ($${totalPrice})`
            } else {
                cartText = "Your cart is empty"
            }
            // console.log(this.props.auth);
            // user is logged in
        }
            if (this.props.auth.userName !== undefined) {
            var rightMenuBar = [
                <li key={1}>Welcome, {this.props.auth.userName}</li>,
                <li key={2}><Link to="/cart">{cartText}</Link></li>,
                <li key={3}><a href="/">Logout</a></li>,
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
        var shopMenu = this.props.pl.map((pl,index)=>{
            const safeLink = encodeURIComponent(pl.productLine);
            // console.log(safeLink);
            return(<Link key={index} to={`/shop/${safeLink}`}>{pl.productLine}</Link>)
        })
        // console.log(shopMenu)
        return(
            <div id="navbar">
                <Row>
                    <nav className="light-green lighten-1">
                        <div className="nav-wrapper container">
                            <ul id="nav-mobile" className="left hide-on-med-and-down">
                                <li><Link to="/">Home</Link></li>
                                <li className="dropdown">
                                    <Link to="/shop/productLines">Shop</Link>
                                    <ul>
                                        <li className="dropdown-links">
                                            {shopMenu}
                                        </li>
                                    </ul>
                                </li>
                                <li><Link to="/">About</Link></li>
                                <li><Link to="/">Contact Us</Link></li>
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
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        auth:state.auth,
        pl: state.pl,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProductLines: GetProductLines,
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// TODO 
// make a redux action to log out, remove token
// figure out why drop down stops too early
// add arrow to drop down menu (shop)

