import React, { Component } from 'react';
import { HashRouter, Route, Router, Switch, BrowserRouter } from 'react-router-dom';
import '../components/admin/scss/style.scss';
import onlineAcademy from '../views/onlineAcademy';
import appp from '../App';

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)

// Containers
const TheLayout = React.lazy(() => import('../components/admin/containers/TheLayout'));

class AdminAcademy extends Component {

	render() {
		return (
			<BrowserRouter>
				<React.Suspense fallback={loading}>
					<Switch>
						<Route path="/admin" name="Home" render={props => <TheLayout {...props} />} />
						<Route exact={true} path="/home" component={appp} />
						<Route exact={true} path="/" component={appp} />
					</Switch>
				</React.Suspense>
			</BrowserRouter>
		);
	}
}

export default AdminAcademy;
