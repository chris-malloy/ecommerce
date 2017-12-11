import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import SlickSlider from './components/SlickSlider';

class App extends Component {
    render() {
		return (
			<Router>
				<div className="App">
					<NavBar />
					<Route exact path="/" component={SlickSlider} />
				</div>
			</Router>
		);
    }
}

export default App;
