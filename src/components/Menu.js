import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {routes} from '../routes';

const Menu = ({match, activeBacker, dominant}) => {
    const style={
        height: '50px',
        display: 'flex',
        direction: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000'

    };

    return (
        <div style={style}>
            <div style={{ display: 'flex', direction: ''}}>
                <NavButton route={{ path: '/', name: 'Buixieval' }} active={match.path === '/'} dominant={dominant} />
                {routes.filter(route => route.visible).map(route => (
                    <NavButton key={route.path} route={route} active={match.path === route.path} dominant={dominant} />
                ))}
            </div>
            {activeBacker &&
            <div
                style={{
                    margin: 5,
                    paddingRight: 10,
                    display: 'flex',
                    direction: 'column',
                    justifyItems: 'center',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    paddingLeft: 10,
                    color: '#000',
                    backgroundColor: activeBacker.team === 'bstuur' ? '#FFF' : (activeBacker.team === 'p' ? '#FF99FF' : '#01ffff')
                }}
            >
                {activeBacker.name}: &euro;{activeBacker.contributed}
            </div>}
        </div>
    );
};

const NavButton = ({route, active, dominant}) => {
    const style = {
        backgroundColor: active ? (dominant === 'p' ? '#FF99FF' : '#01FFFF') : '#000',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        color: active  ? '#000' : (dominant === 'p' ? '#FF99FF' : '#01FFFF'),
    };

    return (
        <div
            style={style}
        >
            <Link
                to={route.path}
                style={{
                    color: style.color,
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                }}
            >
                {route.name}
            </Link>
        </div>
    )
};

const mapStateToProps = state => ({
    activeBacker: state.activeBacker,
    dominant: state.dominantTeam,
});

export default connect(mapStateToProps)(withRouter(Menu));