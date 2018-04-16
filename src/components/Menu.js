import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {routes} from '../routes';


const SmallMenu = ({match, activeBacker, dominant}) => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#000',
        width: '100%'
    };

    return (
        <div style={style}>
            {routes.filter(route => route.visible).map(route => (
                <NavButton key={route.path} route={route} active={match.path === route.path} dominant={dominant} small={true} />
            ))}
        </div>
    )
};

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

const NavButton = ({route, active, dominant, small=false}) => {
    const style = {
        backgroundColor: active ? (dominant === 'p' ? '#FF99FF' : '#01FFFF') : '#000',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        height: '40px',
        lineHeight: '40px',
        display: small ? 'block' : 'inline-block',
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

class MenuResponsive extends Component {
    constructor (props) {
        super(props);

        this.state = {width: 1200};
    }

    updateWindowDimensions = () => {
        this.setState({
            width: window.innerWidth,
        });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render () {
        if (this.state.width > 1000) {
            return <Menu {...this.props}/>;
        }

        return <SmallMenu {...this.props}/>;
    }

}

const mapStateToProps = state => ({
    activeBacker: state.activeBacker,
    dominant: state.dominantTeam,
});

export default connect(mapStateToProps)(withRouter(MenuResponsive));