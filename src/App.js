import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
  }
}

export default App;
