import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './components/AppContainer';
import Router from './routes';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <AppContainer>
            <Router />
          </AppContainer>
        </BrowserRouter>
    );
  }
}

export default App;
