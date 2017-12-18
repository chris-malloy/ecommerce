import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import LoginAction from '../actions/LoginAction';
import LogoutAction from '../actions/LogoutAction';
// react-materialize
import { Row, Input, Button } from 'react-materialize';

class Logout extends Component {
    constructor() {
        super();
    }

    componentDidMount(){
        console.log(this.props.match);
        this.props.logoutAction();
        this.props.history.push('/');
    }

    render() {
        // console.log(this.props.auth);
        return (
            <div className="container" id="login">
                Logging out...
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logoutAction: LogoutAction,
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Logout);
