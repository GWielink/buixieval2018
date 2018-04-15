import React, { Component } from 'react';
import Menu from '../../components/Menu';
import fetchAchievements from '../../functions/fetch-achievements';

class Achievements extends Component {
    constructor(props) {
        super(props);

        this.state = {loading: true};
    }

    componentDidMount() {
        fetchAchievements()
            .then((result) => {
                const pinkPoints = result
                    .map(item => Object.assign({}, item, {
                        points: parseInt(item.points, 10),
                    }))
                    .filter(item => item.team === 'p')
                    .reduce((sum, item) => sum + item.points, 0);
                const bluePoints = result
                    .filter(item => item.team === 'b')
                    .map(item => Object.assign({}, item, {
                        points: parseInt(item.points, 10),
                    }))
                    .reduce((sum, item) => sum + item.points, 0);

                this.setState({
                    loading: false,
                    pink: pinkPoints,
                    blue: bluePoints,
                })
            });
    }

    render () {
        return (
            <div>
                <Menu/>
                {!this.state.loading &&
                    <div>
                        <h1>Pink: {this.state.pink}</h1>
                        <h1>Blue: {this.state.blue}</h1>
                    </div>
                }
            </div>
        );
    }
}

export default Achievements;