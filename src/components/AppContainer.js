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
	const bluePartition = 100 - pinkPartition;

	return (
		<div style={{ height: '100vh' }}>
			{children}
			<div style={{ position:  'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden' }}>
				<div style={{ width: pinkPartition + 'vw', height: '100%', backgroundColor: '#01ffff', display: 'inline-block' }} />
				<div style={{ width: bluePartition + 'vw', height: '100%', backgroundColor: '#ff99ff', display: 'inline-block' }} />
			</div>
		</div>
	)
};

export default AppContainer;
