import React, {Component} from 'react';
import Grid from './Grid';
import Loader from '../../components/Loader';
import Menu from '../../components/Menu';

import './backer.css';
import fetchBackers from '../../functions/fetch-backers';

export default class BackersContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isReady: false,
            width: 0,
            height: 0,
        }
    }

    componentDidMount () {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getBackers();
    }

    updateWindowDimensions = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    getBackers = () => {
        fetchBackers().then(backers => {
            this.setState({
                backers: backers,
                isReady: true
            })
        }).catch(error => {
            console.log(error);
        });
    };

    render () {
        if (this.state.isReady) {

            return (
                <div>
                    <Menu />
                    <Grid
                        backers={this.state.backers}
                        height={this.state.height - 30}
                        width={this.state.width}
                    />
                </div>
            )
        }

        return <Loader/>;
    }
}
