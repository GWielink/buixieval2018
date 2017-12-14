import React from 'react';
import Menu from '../../components/Menu';

const Opportunities = () => {
    return (
        <div style={{ height: '100vh', textAlign: 'center'}}>
            <Menu/>
            <div style={{
                display: 'flex',
                direction: 'column',
                width: '100%',
                height: '25%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1 className="animated">COMING SOON</h1>
            </div>
        </div>
    )
};

export default Opportunities;