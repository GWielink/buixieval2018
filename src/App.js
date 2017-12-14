import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import store from './store';

import Router from './routes';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <AppContainer>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </AppContainer>
        </Provider>
    );
  }
}

export default App;
