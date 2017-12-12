import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import AuthAction from '../actions/AuthAction';
// react-materialize
import { Row, Input, Button } from 'react-materialize';

class Register extends Component {
    constructor(){
        super();
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const first = document.getElementById('first').value
        const last = document.getElementById('last').value
        const password = document.getElementById('password').value
        const email = document.getElementById('email').value
        this.props.authAction(first,last,password,email);
    }

    render(){
        console.log(this.props.auth);
        return(
            <div className="container" id="register">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <h3>Register</h3>
                        <Input s={6} label="First Name" id="first" />
                        <Input s={6} label="Last Name" id="last" />
                        <Input s={12} type="password" label="password" id="password" />
                        <Input s={12} type="email" label="Email" id="email" />
                        <Input s={12} name='group1' type='checkbox' value='green' label='Sign up for our email list!' defaultChecked='checked' className="primary-color" /> 
                        <Button s={12} className="btn">Register</Button>               
                    </Row>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    // dispatch is the thing that takes any aciton
    // and sends it out to all the reducers
    return bindActionCreators({
        authAction: AuthAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// TODO
// figure out how to pass ifChecked bool to database