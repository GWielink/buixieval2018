import React from 'react';
import {connect} from 'react-redux';
import {backerDisplayDetails} from '../../store/actions';
import path from '../../apiPath';

const Backer = ({width, height, backer, displayDetails}) => {
    const className = backer.team === 'bstuur' ? 'neutral' : (backer.team === 'p' ? 'pink' : 'blue');
    const mouseEnter = () => {
        displayDetails(backer);
    };

    return <div
        style={{
            width: width,
            height: height,
            background: 'url(' + path + '/image/' + backer.id + ') no-repeat center center',
            backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}

        onMouseEnter={mouseEnter}
    >
        <div className={'overlay ' + className} />
    </div>
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    displayDetails: backer => dispatch(backerDisplayDetails(backer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Backer);