import React from 'react';
import path from '../../apiPath';

const Backer = ({width, height, backer}) => {
    const className = backer.team === 'p' ? 'pink' : 'blue';

    return <div
        style={{
            width: width,
            height: height,
            background: 'url(' + path + '/image/' + backer.id + ') no-repeat center center',
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}
    >
        <div className={'overlay ' + className} >
            <h4>{backer.name}</h4>
            <h4>&euro; {backer.contributed}</h4>
        </div>
    </div>
};


export default Backer;