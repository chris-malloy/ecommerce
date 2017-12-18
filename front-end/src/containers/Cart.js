import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import GetCart from '../actions/GetCart';
import CartRow from '../containers/CartRow';

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
                <div className="container center">
                    <h3>Your cart is empty. Get shopping or <Link to="/login">login</Link>.</h3>
                </div>
            )
        } else {
            console.log(this.props.cart)
            var cartArray = this.props.cart.products.map((product,index)=>{
                console.log(product);
                return(
                    <CartRow key={index} product={product} />
                )
            })
            return (
                <div className="container center">
                    <div className="row">
                        <div className="col s8">
                            <table className="bordered striped responsive-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                        <th>Save</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartArray}
                                </tbody>
                            </table>
                        </div>
                        <div className="col s4">
                            <h3>Subtotal ({this.props.cart.totalItems} items) in Your Cart: ${this.props.cart.totalPrice} <button className="btn">Checkout</button></h3>
                        </div>
                    </div>
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