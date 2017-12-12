import React from 'react';

const Loader = () => (
    <div
        style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        className="loader"
    >
        <h1>Loading...</h1>
    </div>
);

export default Loader;