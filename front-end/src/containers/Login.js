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
                    <Input s={12} type="email" label="Email"/>
                    <Input s={12} type="password" label="password"/>
                </Row>
            </div>
        )
    }
}

export default Login;
