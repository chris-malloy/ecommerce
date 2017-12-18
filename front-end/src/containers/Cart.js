import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import GetCart from '../actions/GetCart';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
        }
    }

    componentDidMount() {
        // console.log(this.props.auth);
        if(this.props.auth.token === undefined){
            // user has no token, do't give them access
            //this.props.history.push('/login');
        } else {
            // user has token, get cart
            this.props.getCart(this.props.auth.token);
        }
    }

    render() {
        // console.log(this.props.cart);
        if(this.props.cart.totalItems === 0 || this.props.cart.length === 0){
            return(
                <div>
                    <h3>Your cart is empty. Get shopping or <Link to="/login">login</Link>.</h3>
                </div>
            )
        } else {
            console.log(this.props.cart)
            var cartArray = this.props.cart.products.map((product,index)=>{
                console.log(product);
                return(
                    <h3 key={index}>{product.productName}</h3>
                )
            })
            return (

                <div className="container center">
                    <h1>Cart Page</h1>
                    {cartArray}
                </div>
            )
        }

    }
     
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCart: GetCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);