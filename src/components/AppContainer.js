import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import {setBackers} from '../store/actions';
import fetchBackers from '../functions/fetch-backers';

class AppContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {isReady: false};
	}

	componentDidMount () {
		fetchBackers().then(backers => {
			this.props.setBackers(backers);
			this.setBackground(backers);
			this.setState({isReady: true});
		})
	}

	setBackground (backers) {
		const total = backers.reduce((sum, backer) => (
			sum + backer.contributed
		), 0);

		const pinkPartition = (backers.filter(backer => (backer.team === 'p')).reduce((sum, backer) => (
			sum + backer.contributed
		), 0) / total) * 100;

		const {first, second, partition} = pinkPartition < 50 ?
			{first: "01FFFF", second: "FF99FF", partition: 100 - pinkPartition}
			:
			{first: "FF99FF", second: "01FFFF", partition: pinkPartition};

		document.body.style.background = 'linear-gradient(90deg, #' + first
			+ ' ' + partition + '%, #'+ second + ' ' + partition + '%)';
	}

	render () {
		if (!this.state.isReady) {
			return <Loader/>
		}

        return (
			<div style={{ height: '100vh' }}>
				{this.props.children}
			</div>
        )
	}
};

const mapStateToProps = state => ({
	backers: state.backers
});

const mapDispatchToProps = dispatch => ({
	setBackers: backers => dispatch(setBackers(backers))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);