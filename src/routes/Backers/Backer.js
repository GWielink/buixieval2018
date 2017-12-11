import React from 'react';
import './backer.css';


const Backer = ({backer, rowSum, windowDimensions, rowHeight}) => {
    const partition = backer.contributed / rowSum;
    const style = {
        height: '100%',
        background: 'url(' + backer.img + ') no-repeat center center',
        backgroundSize: 'cover',
        width: partition * windowDimensions.width + 'px',
        display: 'inline-block',
        overflow: 'hidden'
    };

    const className = backer.team === 'p' ? 'pink' : 'blue';

    return (
        <div style={style}>
            <div className={'overlay ' + className} >
                <h4>{backer.name}</h4>
                <h1>&euro; {backer.contributed}</h1>
            </div>
        </div>
    )
};

export default Backer;