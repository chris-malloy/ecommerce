import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import LogoutAction from '../actions/LogoutAction';

class Logout extends Component {

    componentDidMount(){
        // console.log(this.props.match);
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
