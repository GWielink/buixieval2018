import React, {Component} from 'react';
import Row from './Row';

export default class Backers extends Component {
    constructor (props) {
        super (props);

        this.state = {
            windowDimensions: {
                width: '0',
                height: '0'
            }
        };
    }

    componentDidMount () {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    totalBacked = this.props.backers.reduce((total, backer) => {
        return total + backer.contributed
    }, 0);


    updateWindowDimensions = () => {
        this.setState({
            windowDimensions: {
                width: window.innerWidth,
                height: window.innerHeight,
            }
        });
    };

    divideBackers = backers => {
        let n = 1;
        let index = 0;
        let rows = [];

        while (index < backers.length) {
            let rowLength = Math.floor(Math.random() * (n * 2)) + 1;
            rows.push(
                backers.slice(index, index + rowLength <= backers.length ? index + rowLength : backers.length)
            );
            index += rowLength;
            n += 1;
        }

        return rows;
    };

    rows = this.divideBackers(this.props.backers);

    render () {
        const style = {
            height: this.state.windowDimensions.height,
            width: this.state.windowDimensions.width,
            overflow: 'hidden'
        };

        return (
            <div style={ style }>
                {this.rows.map((row, i) => (
                    <Row
                        key={i}
                        windowDimensions={this.state.windowDimensions}
                        backers={row}
                        totalBacked={this.totalBacked}
                    />
                ))}
            </div>
        )
    }
};
