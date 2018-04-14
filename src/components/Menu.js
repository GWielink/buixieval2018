import React from 'react';
import ResponsiveMenu from 'react-responsive-navbar';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {routes} from '../routes';

const NewMenu = ({match, activeBacker, dominant}) => (<ResponsiveMenu
    menuOpenButton={<span>o</span>}
    menuCloseButton={<span>c</span>}
    changeMenuOn="700px"
    menu={<Menu match={match} activeBacker={activeBacker} dominant={dominant} />}
/>);


const Menu = ({match, activeBacker, dominant}) => {
    const style={
        display: 'flex',
        direction: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        height: '50px',
    };

    return (
        <div style={style}>
            <div style={{ display: 'block', direction: 'column'}}>
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
        height: '40px',
        lineHeight: '40px',
        display: 'inline-block',
        direction: 'column',
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