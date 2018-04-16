import React, { Component } from 'react';
import Menu from '../../components/Menu';
import fetchAchievements from '../../functions/fetch-achievements';
import fetchChallenges from '../../functions/fetch-challenges';

class Achievements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            challenges: [],
            achievements: [],
        };

        this.rules = [
            "No cap no glory",
            "No pics no proof no points",
            "Don't be a dick",
        ];
    }

    componentDidMount() {
        fetchAchievements()
            .then((result) => {

                this.setState({
                    loading: false,
                    achievements: result.map(item => Object.assign({}, item, {
                        points: parseFloat(item.points, 10),
                    })),
                })
            });

        fetchChallenges().then((challenges) => {
            console.log(challenges);
            this.setState({
                challenges
            });
        })
    }

    render () {
        const pinkPoints = this.state.achievements.filter(achievement => achievement.team === "p").reduce((sum, item) => sum + item.points, 0);
        const bluePoints = this.state.achievements.filter(achievement => achievement.team === "b").reduce((sum, item) => sum + item.points, 0);

        return (
            <div>
                <Menu/>
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{ backgroundColor: '#000', color: '#01ffff', padding: 30, fontSize: 36}}>
                        {bluePoints}
                    </div>
                    <div style={{ backgroundColor: '#000', color: '#ff09ff', padding: 30, fontSize: 36}}>
                        {pinkPoints}
                    </div>
                </div>
                <h1 style={{ textAlign: 'center', color: '#000'}}>Challenges</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {this.state.challenges.map(challenge => (
                        <div
                            key={challenge.challenge}
                            style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                width: '70%',
                                padding: 5,
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <div>
                                <p style={{
                                    fontSize: 18,
                                    marginBottom: 0
                                }}>
                                    {challenge.challenge}
                                </p>
                                {challenge.rules && (
                                    <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 1}}>
                                        * {challenge.rules}
                                    </p>
                                )}
                                {!challenge.repeatable && (
                                    <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 1}}>
                                        {challenge.rules ? '**' : '*'} not repeatable
                                    </p>
                                )}
                            </div>
                            <div>
                                <span style={{ fontSize: 32}}>
                                    {challenge.points}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 style={{ textAlign: 'center', color: '#000'}}>General rules</h1>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {this.rules.map(rule => (
                        <div key={rule} style={{ backgroundColor: '#000', color: '#fff', padding: 5, marginTop: 5, width: '70%', fontSize: 18 }}>
                            {rule}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Achievements;