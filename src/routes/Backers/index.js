import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from './Grid';
import Menu from '../../components/Menu';

import './backer.css';
import fetchBackers from '../../functions/fetch-backers';

class BackersContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
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
            height: window.innerHeight - 50,
            direction: window.innerWidth > window.innerHeight ? 'row' : 'col'
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

    splitBackers = (backers) => {
        const pink  = backers.filter(backer => (backer.team === 'p'));
        const blue = backers.filter(backer => (backer.team === 'b'));

        const pinkTotal = backers.reduce((total, backer) => (total + backer.contributed), 0);
        const blueTotal = backers.reduce((total, backer) => (total + backer.contributed), 0);

        const total = pinkTotal + blueTotal;
        const pinkPartition = pinkTotal / total;
        const bluePartition = blueTotal / total;

        const pinkWidth = this.state.direction === 'col' ? this.state.width : this.state.width * pinkPartition;
        const blueWidth = this.state.direction === 'col' ? this.state.width : this.state.width - pinkWidth;
        const pinkHeight = this.state.direction === 'row' ? this.state.height : this.state.height * pinkPartition;
        const blueHeight = this.state.direction === 'row' ? this.state.height : this.state.height - pinkHeight;

        return ({
            pink,
            blue,
            pinkHeight,
            pinkWidth,
            blueHeight,
            blueWidth,
        })
    }

    render () {
        const {pink, blue, pinkHeight, pinkWidth, blueHeight, blueWidth} = this.splitBackers(this.props.backers);
        return (
            // <div>
            //     <Menu />
            //     <Grid
            //         backers={this.props.backers}
            //         height={this.state.height - 30}
            //         width={this.state.width}
            //     />
            // </div>
            <div>
                <Menu /> 
                <div style={{ width: this.state.width, height: this.state.height, overflow: 'hidden'}}>
                    <div style={{ display: this.state.direction === 'row' ? 'inline-block' : 'block', overflow: 'hidden'}}>
                        <Grid backers={pink} width={pinkWidth} height={pinkHeight} />
                    </div>
                    <div style={{ display: this.state.direction === 'row' ? 'inline-block' : 'block', overflow: 'hidden'}}>
                        <Grid backers={blue} width={blueWidth} height={blueHeight} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    backers: state.backers,
});

export default connect(mapStateToProps)(BackersContainer);
