import React, { Component } from 'react';

// components
import NavBar from './containers/NavBar';
import SlickSlider from './containers/SlickSlider';
// containers
import Register from './containers/Register';
import Login from './containers/Login';
import ProductLines from './containers/ProductLines';
import Logout from './containers/Logout';
import Cart from './containers/Cart';

class App extends Component {
    render() {
		return (
			<Router>
				<div className="App">
					<NavBar />
					<Route exact path="/" component={SlickSlider} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route path="/shop/:productLines" component={ProductLines} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/cart" component={Cart} />
				</div>
			</Router>
		);
    }
}

export default App;
