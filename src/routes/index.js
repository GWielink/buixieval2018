import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Teaser from './Teaser';
import Admin from './Admin';
import Opportunities from './Opportunities';
import Backers from './Backers';
import Captains from './Captains';
import Calendar from './Calendar';

export const routes = [{
	path: '/backers',
	name: 'Backers',
	component: Backers,
    exact: true,
	visible: true,
}, {
	path: '/opportunities',
	name: 'Opportunities',
	component: Opportunities,
	exact: true,
	visible: true,
}, {
	path: '/admin',
	component: Admin,
	exact: true,
	visible: false,
}, {
	path: '/calendar',
	name: 'Calendar',
	component: Calendar,
	exact: true,
	visible: true,
}, {
	path: '/captains',
	name: 'Captains',
	component: Captains,
	exact: true,
	visible: true,
}, {
	path: '/',
	name: 'Home',
	component: Teaser,
	exact: false,
	visible: false,
}];

const Router = () => (
	<Switch>
		{routes.map(route => (
			<Route
				key={route.path}
				exact={route.exact}
				path={route.path}
				component={route.component}
			/>
		))}
	</Switch>
);

export default Router;