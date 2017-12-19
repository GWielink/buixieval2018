import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from './Grid';
import Menu from '../../components/Menu';
import {backerDisplayDetails} from '../../store/actions';
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

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.props.clearDetails();
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
        return (
            <div>
                <Menu />
                <Grid
                    backers={this.props.backers}
                    height={this.state.height - 50}
                    width={this.state.width}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    backers: state.backers,
});

const mapDispatchToProps = dispatch => ({
    clearDetails: () => dispatch(backerDisplayDetails(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(BackersContainer);
