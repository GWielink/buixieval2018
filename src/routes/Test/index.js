import React, {Component} from 'react';

import fetchBackers from '../../functions/fetch-backers';

export default class TestContainer extends Component {
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
          return <Grid
              backers={this.state.backers}
              height={this.state.height}
              width={this.state.width}
          />
      }

      return null;
    }
}


const Grid = ({backers, width, height}) => {
    if (backers.length === 0) {
        return <Backer
            width={width}
            height={height}
        />
    }

    const totalContributed = backers.reduce((sum, backer) => (sum + backer.contributed), 0);
    const direction = width > height ? 'row' : 'col';

    const split = () => {
        let i = 1;
        let previousDiff = 9999;
        let first = backers.slice(0, 1).reduce((sum, backer) => (sum + backer.contributed), 0);
        let diff = Math.abs(first - (totalContributed - first));

        while (diff < previousDiff) {
            first = backers.slice(0, i).reduce((sum, backer) => (sum + backer.contributed), 0);

            previousDiff = diff;
            diff = Math.abs(first - (totalContributed - first));
            i++;
        }

        return [
            backers.slice(0, i - 1),
            backers.slice(i - 1, backers.length)
        ];
    };

    
    return null;

};

const Backer = ({width, height}) => {
    return <div
        style={{
            width: width,
            height: height,
            backgroundColor: '#' + (Math.random()*0xFFFFFF<<0).toString(16)
        }}
    />
};
