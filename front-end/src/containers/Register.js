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
        var formData = {
            first: e.target[0].value,
            last: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        }
        console.log(formData);
        this.props.authAction(formData);
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
                        <Input s={12} type="email" label="Email" id="email" />
                        <Input s={6} type="" label="Address Line 1" /> 
                        <Input s={6} type="" label="Address Line 2" />
                        <Input s={6} type="select" label="State" defaultValue="1">
                           <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Input>
                        <Input s={6} label="ZipCode" />
                        <Input s={12} type="phone" label="Phone Number" />
                        <Input s={12} type="password" label="password" id="password" />
                        <Input s={12} name='group1' type='checkbox' value='green' label='Sign up for our email list!' defaultChecked='checked' className="primary-color" /> 
                        <Button s={12} className="btn">Register</Button>
                        <p><a href="/login">Already have an account? Click here.</a></p>               
                    </Row>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    // dispatch is the thing that takes any aciton
    // and sends it out to all the reducers
    // authAction is a function
    return bindActionCreators({
        authAction: AuthAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// TODO
// figure out how to pass ifChecked bool to database
// add location fields to form