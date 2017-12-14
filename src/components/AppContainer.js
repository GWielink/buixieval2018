import React from 'react';
import backers from '../data';

const AppContainer = ({children}) => {
	const totalContributed = backers.reduce((total, backer) => {
        return total + backer.contributed
    }, 0);

	const pinkContributed = backers.filter((backer) => {
		return backer.team === 'p'
	}).reduce((total, backer) => {
		return total + backer.contributed
	}, 0);

	const pinkPartition = Math.floor((pinkContributed / totalContributed) * 100);
	const pink = '#01ffff';
	const blue = '#ff99ff';
	
	// TODO: something with document.body.style.background = "";
	// TODO: store backers somewhere for use on all pages to minimize requests..
	
	return (
		<div style={{ 
			height: '100vh',
			background: 'linear-gradient(90deg, ' + pink + ' ' + pinkPartition + '%, ' + blue + '%), 
		 }}>
			{children}
		</div>
	)
};

export default AppContainer;
