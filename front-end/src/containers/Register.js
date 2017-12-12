import React, { Component } from 'react';
// react-materialize
import { Row, Input } from 'react-materialize';

class Register extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <div className="container" id="login">
                <Row>
                    <Input s={6} label="First Name" />
                    <Input s={6} label="Last Name" />
                    <Input s={12} type="password" label="password" />
                    <Input s={12} type="email" label="Email" />
                    <Input name='group1' type='checkbox' value='green' label='Sign up for our email list!' className='filled-in' defaultChecked='checked' />                
                </Row>
            </div>
        )
    }
}

export default Register;

// TODO
// figure out how to pass ifChecked bool to database