import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetCart from '../actions/GetCart';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
        }
    }

    componentDidMount() {
        console.log(this.props.auth);
        if(this.props.auth.token === undefined){
            // user has no token, do't give them access
            //this.props.history.push('/login');
        } else {
            // user has token, get cart
            this.props.getCart(this.props.auth.token);
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        console.log(this.props.cart);
        return(
            <div className="container">
                <h1>Cart Page</h1>
            </div>
        )
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