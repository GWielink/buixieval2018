import React from 'react';
import Backer from './Backer';

const Grid = ({width, height, backers}) => {
    if (backers.length === 1) {
        return <Backer
            width={width}
            height={height}
            backer={backers[0]}
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

    let sliced = split();
    if (sliced[0][0].reverse) {
        sliced.reverse();
    }
    const partition1 = sliced[0].reduce((sum, backer) => (sum + backer.contributed), 0) / totalContributed;

    const width1 = direction === 'col' ? width : width * partition1;
    const width2 = direction === 'col' ? width : width - width1;
    const height1 = direction === 'row' ? height : height * partition1;
    const height2 = direction === 'row' ? height : height - height1;

    return (
        <div style={{ width: width, height: height, overflow: 'hidden'}}>
            <div style={{ display: direction === 'row' ? 'inline-block' : 'block', overflow: 'hidden'}}>
                <Grid backers={sliced[0]} width={width1} height={height1} />
            </div>
            <div style={{ display: 'inline-block'}}>
                <Grid backers={sliced[1]} width={width2} height={height2} />
            </div>
        </div>
    );

};

export default Grid;