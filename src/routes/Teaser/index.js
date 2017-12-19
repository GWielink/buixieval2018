import React, {Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../../components/Menu';
import fetchBackers from '../../functions/fetch-backers';

import './site.css';

class Teaser extends Component {
	constructor (props) {
		super(props);

		this.state = {message: "BUIXIEVAL"}
	}

	componentDidMount () {
		const that = this;
		const interval = setInterval (() => {
			this.setState({
				message: that.state.message === "BUIXIEVAL" ? "#TEASER?" : "BUIXIEVAL"
			})
		}, 5000);

		this.setState({
			interval: interval
		});
	}

	componentWillUnmount () {
		clearInterval(this.state.interval);
	}

	render () {
		const style = {
			fontSize: '19vw',
			marginTop: 50,
		};

		const totalBacked = this.props.backers.reduce((sum, backer) => (sum + backer.contributed), 0);

		return (
			<div style={{ height: 'calc(100vh)', textAlign: 'center'}}>
				<Menu/>
				<h1 style={style} className="animated">{this.state.message}</h1>
				<h1 className="animated">{new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(totalBacked)}</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	backers: state.backers,
});

export default connect(mapStateToProps)(Teaser);
