import React, {Component} from 'react';
import BackersGrid from './BackersGrid';

import fetchBackers from '../../functions/fetch-backers';

export default class BackersContainer extends Component {
    constructor (props) {
        super (props);

        this.state = {
            isReady: false,
        }
    }

    componentDidMount() {
        fetchBackers().then( (backers) => {
            this.setState({
                backers: backers,
                isReady: true,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render () {
        if (!this.state.isReady) {
            return <h1>Loading.....</h1>
        }
        return <BackersGrid backers={this.state.backers} />
    }
}