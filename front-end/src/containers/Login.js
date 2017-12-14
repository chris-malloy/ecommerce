import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// custom components 
import LoginAction from '../actions/LoginAction'
// react-materialize
import {Row, Input, Button} from 'react-materialize';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            msgEmail: "Email",
            msgPassword: "Password",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.auth.msg === "wrongPassword"){
            this.setState({
                error: "This password does not match.",
            })
        } else if(newProps.auth.msg === "badUser"){
            this.setState({
                error: "Email not found.",
            })
        } else if(newProps.auth.msg === "loginSuccess"){
            newProps.history.push('/')
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = {
            email: e.target[0].value,
            password: e.target[1].value,
        }
        // validation
        if(formData.email.length === 0){
            this.setState({
                msgEmail: "Email field cannot be empty.",
            })
        } else if(formData.password.length === 0){
            this.setState({
                msgPassword: "Password field cannot be empty.",
            })
        } else{
            this.props.loginAction(formData)
        }
    }
    render() {
        console.log(this.props.auth);   
        return (
            <div className="container" id="login">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <h3>Login</h3>
                        <Input s={12} type="email" label={this.state.msgEmail} />
                        <Input s={12} type="password" label={this.state.msgPassword} />
                        <Button s={12} className="btn">Login</Button>
                        <p><a href="/register">Don't have an account? Click here.</a></p>
                    </Row>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        loginAction: LoginAction,
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
