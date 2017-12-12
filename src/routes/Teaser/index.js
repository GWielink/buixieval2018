import React, {Component} from 'react';
import Menu from '../../components/Menu';
import fetchBackers from '../../functions/fetch-backers';

import './site.css';

export default class Teaser extends Component {
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

		fetchBackers().then(backers => {
			this.setState({
				backed: backers.reduce((sum, backer) => (sum + backer.contributed), 0),
			})
		});

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
		};

		return (
			<div style={{ height: 'calc(100vh)', backgroundColor: '#ff99ff', textAlign: 'center'}}>
				<Menu/>
				<h1 style={style} className="animated">{this.state.message}</h1>
				{this.state.backed &&
				<h1 className="animated">BACKED: &euro;{this.state.backed}</h1>
				}
			</div>
		)
	}
}
