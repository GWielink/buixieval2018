import React from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import path from '../../apiPath';

const  style = {
    container: {
        background: 'linear-gradient(110deg, #01FFFF 50%, #FF99FF 50%)',
        width: '100%',
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'row',
        color: '#222'

    },
    captain: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const Image = ({ id }) => (
    <div
        style={{
            height: '300px',
            width: '300px',
            borderRadius: '50%',
            background: 'url(' + path + '/image/' + id + ') no-repeat center center',
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}
    >

    </div>
)

const Captains = ({ topBackers }) => {
    return (
        <div>
            <Menu />
            <div style={style.container} >
                <div style={style.captain}>
                    <Image id={topBackers.blue.id} />
                    <h1>{ topBackers.blue.name }</h1>
                </div>
                <div style={style.captain}>
                <Image id={topBackers.pink.id} />
                    <h1>{ topBackers.pink.name }</h1>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    topBackers: state.topBackers,
});

export default connect(mapStateToProps)(Captains);
