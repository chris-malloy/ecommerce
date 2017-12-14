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
            error: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){

    }

    handleSubmit(e){
        e.preventDefault();
        const formData = {
            email: e.target[0].value,
            password: e.target[1].value,
        }
        // validation
        if(formData.email.length === 0){

        } else if(formData.password.length === 0){
            this.setState({
                error: "Password field cannot be empty.",
            })
        } else{
            this.props.loginAction(formData);
        }
    }
    render() {
        return (
            <div className="container" id="login">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <h3>Login</h3>
                        <Input s={12} type="email" label="Email"/>
                        <Input s={12} type="password" label="password"/>
                        <Button s={12} className="btn">Login</Button>
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
