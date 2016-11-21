
/*
  Created by Uncle Charlie 2016/11/15

  @flow
*/
import React from 'react'
import { Provider } from 'react-redux'
import DribbbleApp from './DribbbleApp'
import configureStore from './store/configureStore'

function setup(): ReactClass<{}> {
  class Root extends React.Component {
    state: {isLoading: boolean, store: any}

    constructor() {
      super()
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false}))
      }
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <DribbbleApp />
        </Provider>
      );
    }
  }

  return Root
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
}

export default {setup}
