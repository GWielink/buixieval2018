import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {routes} from '../routes';

const Menu = ({match}) => {
    const style={
        height: '30px',
        display: 'flex',
        direction: 'row',
        backgroundColor: '#ff99ff'

    };

    return (
        <div style={style}>
            <NavButton route={{ path: '/', name: 'Buixieval' }} active={match.path === '/'}/>
            {routes.filter(route => route.visible).map(route => (
                <NavButton key={route.path} route={route} active={match.path === route.path} />
            ))}
        </div>
    );
};

const NavButton = ({route, active}) => {
    const style = {
        backgroundColor: active ? '#01ffff' : '#ff99ff',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        color: active ? '#ff99ff' : '#01ffff'
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

export default withRouter(Menu);