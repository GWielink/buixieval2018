import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from '../../components/Menu';
import fetchAchievements from '../../functions/fetch-achievements';
import './site.css';

class Teaser extends Component {
	constructor (props) {
		super(props);

		this.state = {achievements: []}
	}

	componentDidMount() {
		fetchAchievements()
			.then((result) => {
				this.setState({
					achievements: result.slice(2).slice(-10).reverse(),
				})
			});
	}

	render () {
		const totalBacked = this.props.backers.reduce((sum, backer) => (sum + backer.contributed), 0);
		const { streamKey } = this.props;
		const url = `https://www.youtube.com/watch?v=${streamKey}`;

		return (
			<div style={{ height: 'calc(100vh)', textAlign: 'center'}}>
				<Menu/>
				<a href={url} target="_blank"><h1 className="animated"> Live! </h1></a>

				<h1 className="animated">{new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(totalBacked)}</h1>

				<div>
					<h1 style={{ color: '#000'}}>Last achievements</h1>
					{this.state.achievements.map(item => (
						<div style={{ backgroundColor: '#000', color: item.team === 'p' ? '#ff09ff' : '#01ffff', padding: 5, margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
							<div style={{ fontSize: 16}}>{item.description}</div>
							<div style={{ fontSize: 24}}>{item.points}</div>
						</div>
					))}
				</div>
			</div>
		)
	}
}







const mapStateToProps = state => ({
	backers: state.backers,
	streamKey: state.streamKey || '',
});

export default connect(mapStateToProps)(Teaser);
