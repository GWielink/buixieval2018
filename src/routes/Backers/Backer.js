import React from 'react';
import captain from '../../img/captain.svg';
import {connect} from 'react-redux';
import {backerDisplayDetails} from '../../store/actions';
import path from '../../apiPath';

const Backer = ({width, height, backer, displayDetails, topBackers}) => {
    const className = backer.team === 'bstuur' ? 'neutral' : (backer.team === 'p' ? 'pink' : 'blue');
    const mouseEnter = () => {
        displayDetails(backer);
    };

    const isTopBacker = backer.team === 'p'? (backer === topBackers.pink) : (backer === topBackers.blue);

    return <div
        style={{
            width: width,
            height: height,
            background: 'url(' + path + '/image/' + backer.id + ') no-repeat center center',
            backgroundColor: backer.team === 'p' ? '#FF09FF' : '#00FFFF',
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}

        onMouseEnter={mouseEnter}
    >
        <div className={'overlay ' + className} >
            {isTopBacker && <img src={captain} className='captain-badge' /> }
        </div>
    </div>
};

const mapStateToProps = state => ({
    topBackers: state.topBackers,
});
const mapDispatchToProps = dispatch => ({
    displayDetails: backer => dispatch(backerDisplayDetails(backer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Backer);
