import React, {Component} from 'react';
import { connect } from 'react-redux';
// react-materialize
import {Row, Input} from 'react-materialize';

class Login extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <div className="container" id="login">
                <Row>
                    <h3>Login</h3>
                    <Input s={12} type="password" label="password"/>
                    <Input s={12} type="email" label="Email"/>
                </Row>
            </div>
        )
    }
}

export default Login;
