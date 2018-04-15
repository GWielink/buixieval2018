import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PanelGroup, Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import AuthContainer from '../../components/AuthContainer';
import BackerPanel from './BackerPanel';
import updateStreamKey from '../../functions/update-steam-key';
import addAchievement from '../../functions/add-achievement';

class Admin extends Component {
    constructor (props) {
        super (props);

        this.state = {
            authenticated: false,
            backers: this.props.backers,
            achievement_team: 'p',
            achievement_description: '',
            achievement_points: '',
            streamKey: this.props.streamKey,
        }
    }

    authenticate = () => {
        this.setState({authenticated: true});
    };

    addBacker = () => {
        this.setState({
            backers: this.state.backers.slice().concat({
                id: Math.random(),
                name: 'New',
                contributed: '0',
                team: 'p',
                img: '',
                new: true,
            })
        });
    };

    setField = (field, value) => {
        this.setState({
            [field]: value,
        })
    };

    handleStreamKeyChange = ({target: { value }}) => {
        this.setState({
            streamKey: value,
        })
    };

    updateStreamKey = () => {
        updateStreamKey(this.state.streamKey);
    };

    saveAchievement = () => {
        if(!this.state.achievement_team || !this.state.achievement_description || !this.state.achievement_points) {
            return;
        }

        addAchievement({
            team: this.state.achievement_team,
            description: this.state.achievement_description,
            points: this.state.achievement_points,
        }).then(() => {
            console.log('hoi');
            this.setState({
                achievement_description: '',
                achievement_points: '',
            });
        }).catch(error => console.log(error));
    };



    render () {
        if (!this.state.authenticated) {
            return <AuthContainer grantAccess={this.authenticate} />
        }
        return (
            <div style={{ padding: 50 }}>
                <Panel
                    header="Youtube video key"
                >
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.streamKey}
                            onChange={this.handleStreamKeyChange}
                        />
                    </FormGroup>
                    <button className="btn btn-primary" onClick={this.updateStreamKey}> save </button>
                </Panel>

                <Panel
                    header="Achievement toevoegen"
                    style={{ color: '#000'}}
                >
                    <FormGroup>
                        <ControlLabel>Team</ControlLabel>
                        <FormControl
                            componentClass="select" placeholder="team"
                            value={this.state.achievement_team}
                            onChange={({target: {value}}) => this.setField('achievement_team', value)}
                        >
                            <option value="p">Pink</option>
                            <option value="b">Blue</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Omschrijving</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.achievement_description}
                            onChange={({target: {value}}) => this.setField('achievement_description', value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Punten</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.achievement_points}
                            onChange={({target: {value}}) => this.setField('achievement_points', value)}
                        />
                    </FormGroup>

                    <button
                        className="btn btn-primary"
                        onClick={this.saveAchievement}
                    >
                        Opslaan
                    </button>
                </Panel>


                <PanelGroup style={{ color: 'black' }}>
                    {this.state.backers.map(backer => (
                        <BackerPanel key={backer.id} backer={backer} />
                    ))}
                </PanelGroup>
                <a
                    className="btn btn-primary"
                    onClick={this.addBacker}
                >
                    +
                </a>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    backers: state.backers,
    streamKey: state.streamKey,
});

export default connect(mapStateToProps)(Admin)
