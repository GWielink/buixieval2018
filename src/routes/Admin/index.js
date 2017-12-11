import React, {Component} from 'react';
import {PanelGroup} from 'react-bootstrap';
import AuthContainer from '../../components/AuthContainer';
import BackerPanel from './BackerPanel';

import fetchBackers from '../../functions/fetch-backers';


export default class Admin extends Component {
    constructor (props) {
        super (props);

        this.state = {
            isReady: false,
            authenticated: false,
            backers: [],
        }
    }

    authenticate = () => {
        this.setState({authenticated: true});
        this.loadBackers();
    };

    loadBackers = () => {
        fetchBackers(true).then((backers) => {
            this.setState({
                backers: backers,
                isReady: true,
            });
        }).catch(e => {
            console.log(e);
        })
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
        if (!this.state.isReady) {
            return <h2>Loading...</h2>
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
