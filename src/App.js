import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { CokeMachine } from './containers';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CokeMachine {...this.props}/>
      </Provider>
    )
  }
}

export default App;
