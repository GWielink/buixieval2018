import React from 'react';
import Backer from './Backer';

const Row = ({backers, totalBacked, windowDimensions}) => {
    const rowSum = backers.reduce((sum, backer) => sum + backer.contributed, 0);
    const partition = rowSum / totalBacked;

    const style = {
        width: windowDimensions.width,
        height: partition * windowDimensions.height + 'px',
    };

    return (
        <div style={style}>
            {backers.map((backer, i) => (
                <Backer key={i} windowDimensions={windowDimensions} backer={backer} rowHeight={partition * windowDimensions.height} rowSum={rowSum} />
            ))}
        </div>
    )
};

export default Row;
