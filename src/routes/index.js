import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Teaser from './Teaser';
import Admin from './Admin';
import Opportunities from './Opportunities';
import Backers from './Backers';

import Test from './Test';

const Router = () => (
	<Switch>
		<Route exact path='/backers' component={Backers} />
		<Route exact path='/opportunities' component={Opportunities}/>
		<Route exact path='/admin' component={Admin}/>
		<Route exact path='/test' component={Test} />
		<Route path='/' component={Teaser} />
	</Switch>
);

export default Router;