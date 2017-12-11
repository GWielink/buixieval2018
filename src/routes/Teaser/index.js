import React, {Component} from 'react';
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

		this.setState({
			interval: interval
		});
	}

	componentWillUnmount () {
		clearInterval(this.state.interval);
	}

	render () {
		const styles = {
			header: {
				fontSize: '19vw'
			}
		};

		return (
			<div className="animated" >
				<h1 style={styles.header}>{this.state.message}</h1>
			</div>	
		)
	}
}