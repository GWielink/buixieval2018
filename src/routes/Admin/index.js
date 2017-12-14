import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PanelGroup} from 'react-bootstrap';
import AuthContainer from '../../components/AuthContainer';
import BackerPanel from './BackerPanel';


class Admin extends Component {
    constructor (props) {
        super (props);

        this.state = {
            authenticated: false,
            backers: this.props.backers,
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

    render () {
        if (!this.state.authenticated) {
            return <AuthContainer grantAccess={this.authenticate} />
        }
        return (
            <div style={{ padding: 50 }}>
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
});

export default connect(mapStateToProps)(Admin)
