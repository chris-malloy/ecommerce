import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// components
import NavBar from './containers/NavBar';
import SlickSlider from './components/SlickSlider';
// containers
import Register from './containers/Register';
import Login from './containers/Login';

class App extends Component {
    render() {
		return (
			<Router>
				<div className="App">
					<NavBar />
					<Route exact path="/" component={SlickSlider} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		);
    }
}

export default App;
