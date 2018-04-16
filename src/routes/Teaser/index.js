import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from '../../components/Menu';
import ReactPlayer from 'react-player';
import './site.css';

class Teaser extends Component {
	render () {
		const totalBacked = this.props.backers.reduce((sum, backer) => (sum + backer.contributed), 0);
		const { streamKey } = this.props;
		const url = `https://www.youtube.com/watch?v=${streamKey}`;
		console.log(url);

		return (
			<div style={{ height: 'calc(100vh)', textAlign: 'center'}}>
				<Menu/>
				<a href={url} target="_blank"><h1 className="animated"> Live! </h1></a>

				<h1 className="animated">{new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(totalBacked)}</h1>
			</div>
		)
	}
}







const mapStateToProps = state => ({
	backers: state.backers,
	streamKey: state.streamKey || '',
});

export default connect(mapStateToProps)(Teaser);
